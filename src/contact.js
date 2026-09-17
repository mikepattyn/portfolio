/**
 * Contact form → POST /api/contact → info@mikepattyn.nl via Zoho SMTP Lambda.
 * Includes honeypot spam protection and Cloudflare Turnstile verification.
 */
import { t } from './locale.js';

const ENDPOINT = '/api/contact';

function setText(el, key) {
  if (key) {
    el.setAttribute('data-i18n', key);
    el.innerHTML = t(key);
  } else {
    el.removeAttribute('data-i18n');
    el.innerHTML = '';
  }
}

function setFeedback(status, { tone, key } = {}) {
  status.classList.remove('is-success', 'is-error');

  if (!key) {
    status.removeAttribute('data-i18n');
    status.innerHTML = '';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    return;
  }

  if (tone === 'error') {
    status.setAttribute('role', 'alert');
    status.removeAttribute('aria-live');
    status.classList.add('is-error');
  } else {
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    if (tone === 'success') status.classList.add('is-success');
  }

  setText(status, key);

  if (tone === 'error') status.focus();
}

function getTurnstileSiteKey() {
  return document.querySelector('meta[name="turnstile-site-key"]')?.content?.trim() ?? '';
}

function loadTurnstileScript() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Turnstile'));
    document.head.appendChild(script);
  });
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.contact-form__status');
  const turnstileHost = form.querySelector('.contact-form__turnstile');
  const siteKey = getTurnstileSiteKey();
  let turnstileWidgetId = null;

  if (siteKey && turnstileHost) {
    loadTurnstileScript()
      .then(() => {
        turnstileWidgetId = window.turnstile.render(turnstileHost, {
          sitekey: siteKey,
          theme: 'dark',
        });
      })
      .catch(() => {
        setFeedback(status, { tone: 'error', key: 'contact.form.error' });
      });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;

    const turnstileToken =
      form.querySelector('[name="cf-turnstile-response"]')?.value?.trim() ?? '';

    if (siteKey && !turnstileToken) {
      setFeedback(status, { tone: 'error', key: 'contact.form.error' });
      return;
    }

    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    setText(button, 'contact.form.sending');
    setFeedback(status, { tone: 'status', key: 'contact.form.sending' });

    const payload = {
      name: form.querySelector('[name="name"]')?.value?.trim() ?? '',
      email: form.querySelector('[name="email"]')?.value?.trim() ?? '',
      message: form.querySelector('[name="message"]')?.value?.trim() ?? '',
      turnstileToken,
      _honey: form.querySelector('[name="_honey"]')?.value ?? '',
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      // CloudFront rewrites origin 403/404 to the SPA index.html with status 200, so a
      // JSON content type is required to distinguish a real API success from that fallback.
      const contentType = response.headers.get('content-type') ?? '';
      if (!response.ok || !contentType.includes('application/json')) {
        throw new Error(
          `Contact API responded ${response.status} (${contentType || 'no content type'})`,
        );
      }
      form.reset();
      if (siteKey && turnstileWidgetId !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
      setFeedback(status, { tone: 'success', key: 'contact.form.success' });
    } catch {
      setFeedback(status, { tone: 'error', key: 'contact.form.error' });
    } finally {
      button.disabled = false;
      form.removeAttribute('aria-busy');
      setText(button, 'contact.form.send');
    }
  });
}
