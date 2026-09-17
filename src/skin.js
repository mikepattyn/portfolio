/**
 * Classic vs ElectricEmerald skin. Classic is the first-visit default.
 * Only the SiteFooter toggle writes the choice; stitch persists in localStorage.
 */
import { t } from './locale.js';
import { prefersReducedMotion, setShaderEnabled } from './shader.js';

const STORAGE_KEY = 'skin';

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'stitch' ? 'stitch' : null;
  } catch {
    return null;
  }
}

function persist(skin) {
  try {
    if (skin === 'stitch') localStorage.setItem(STORAGE_KEY, 'stitch');
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function resolveInitial() {
  return readStored() ?? 'classic';
}

let active = 'classic';

function applySheets(skin) {
  const classic = document.getElementById('skin-classic');
  const stitch = document.getElementById('skin-stitch');
  if (classic) classic.disabled = skin === 'stitch';
  if (stitch) stitch.disabled = skin !== 'stitch';
}

function applyToggle(skin) {
  const toStitch = skin !== 'stitch';
  document.querySelectorAll('[data-skin-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', skin === 'stitch' ? 'true' : 'false');
    btn.setAttribute('data-i18n', toStitch ? 'footer.skinToStitch' : 'footer.skinToClassic');
    btn.textContent = t(toStitch ? 'footer.skinToStitch' : 'footer.skinToClassic');
  });
}

function apply() {
  document.documentElement.dataset.skin = active;
  applySheets(active);
  applyToggle(active);
  setShaderEnabled(active === 'stitch');
}

export function getSkin() {
  return active;
}

export function setSkin(skin) {
  if (skin !== 'classic' && skin !== 'stitch') return;
  if (skin === active) {
    apply();
    return;
  }
  active = skin;
  persist(skin);
  apply();
}

export function initSkin() {
  active = resolveInitial();
  apply();
  document.querySelectorAll('[data-skin-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setSkin(active === 'stitch' ? 'classic' : 'stitch');
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    });
  });
}
