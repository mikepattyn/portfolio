const DPR_CAP = 1.5;
const VERTEX = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
const FRAGMENT = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = v_texCoord;

    vec2 grid = fract(uv * vec2(20.0, 10.0) + vec2(u_time * 0.1, 0.0));
    float lines = smoothstep(0.0, 0.02, grid.x) * smoothstep(1.0, 0.98, grid.x);

    float n = random(vec2(floor(uv.y * 80.0), u_time * 0.5));
    float glitch = step(0.98, n) * random(vec2(uv.x, u_time));

    vec3 bgColor = vec3(0.02, 0.03, 0.02);
    vec3 scanColor = vec3(0.0, 1.0, 0.3);
    vec3 accentColor = vec3(0.5, 0.0, 1.0);

    vec3 color = bgColor;
    color += scanColor * (0.05 * sin(uv.y * 100.0 + u_time * 5.0) + 0.05);
    color = mix(color, scanColor, glitch * 0.3);
    color += accentColor * lines * 0.08;

    float rain = step(0.95, random(vec2(floor(uv.x * 40.0), floor(uv.y * 20.0 - u_time * 10.0))));
    color += scanColor * rain * 0.15;

    float vignette = 1.0 - length(uv - 0.5) * 1.5;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}`;

export function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function compile(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

function mountCanvas() {
  let canvas = document.getElementById('site-shader');
  if (canvas) return canvas;

  canvas = document.createElement('canvas');
  canvas.id = 'site-shader';
  canvas.className = 'site-shader';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  return canvas;
}

function paintStatic() {
  document.documentElement.classList.add('has-shader-static');
}

function removeCanvas() {
  const canvas = document.getElementById('site-shader');
  if (canvas) canvas.remove();
  document.documentElement.classList?.remove('has-shader-static');
}

let dispose = null;

function bootShader() {
  const canvas = mountCanvas();

  if (prefersReducedMotion()) {
    paintStatic();
    return removeCanvas;
  }

  const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
  if (!gl) {
    paintStatic();
    return removeCanvas;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    paintStatic();
    return;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'u_time');
  const uRes = gl.getUniformLocation(program, 'u_resolution');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');

  let mouseX = 0;
  let mouseY = 0;
  let rafId = 0;
  let running = false;

  function syncSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    if (!mouseX && !mouseY) {
      mouseX = width / 2;
      mouseY = height / 2;
    }
  }

  function render(time) {
    if (!running) return;
    syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, time * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafId = requestAnimationFrame(render);
  }

  function start() {
    if (running || document.hidden || prefersReducedMotion()) return;
    running = true;
    rafId = requestAnimationFrame(render);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function onMouse(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = 1 - (event.clientY - rect.top) / rect.height;
    mouseX = nx * canvas.width;
    mouseY = ny * canvas.height;
  }

  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }

  const motion =
    typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  function onMotion() {
    if (!motion) return;
    if (motion.matches) {
      stop();
      paintStatic();
    } else {
      document.documentElement.classList.remove('has-shader-static');
      start();
    }
  }

  window.addEventListener('mousemove', onMouse, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  if (motion) {
    if (typeof motion.addEventListener === 'function') {
      motion.addEventListener('change', onMotion);
    } else if (typeof motion.addListener === 'function') {
      motion.addListener(onMotion);
    }
  }

  syncSize();
  start();

  return () => {
    stop();
    window.removeEventListener('mousemove', onMouse);
    document.removeEventListener('visibilitychange', onVisibility);
    if (typeof matchMedia === 'function') {
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      if (typeof motion.removeEventListener === 'function') {
        motion.removeEventListener('change', onMotion);
      } else if (typeof motion.removeListener === 'function') {
        motion.removeListener(onMotion);
      }
    }
    removeCanvas();
  };
}

export function setShaderEnabled(on) {
  if (typeof document === 'undefined') return;
  if (!on) {
    if (dispose) {
      dispose();
      dispose = null;
    } else {
      removeCanvas();
    }
    return;
  }
  if (dispose) return;
  if (!document.body || typeof document.createElement !== 'function') return;
  dispose = bootShader();
}

export function initShader() {
  setShaderEnabled(true);
}
