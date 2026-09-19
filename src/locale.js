/**
 * EN/NL locale for the vanilla pages. The URL prefix is the source of
 * truth (`/en/…`, `/nl/…`). localStorage is not used for language.
 */
import { en } from './i18n/en.js';
import { nl } from './i18n/nl.js';
import { localeFromPath, swapLocalePath } from './lib/paths.js';
import { getByPath, rewriteLocaleHrefs } from './lib/seo-html.js';

const I18N = { en, nl };

function pathname() {
  try {
    return globalThis.location?.pathname || '/en/';
  } catch {
    return '/en/';
  }
}

let active = localeFromPath(pathname()) ?? 'en';

export function t(key) {
  const value = getByPath(I18N[active], key);
  return value == null ? key : value;
}

export function getLocale() {
  return active;
}

function apply() {
  document.documentElement.lang = active;
  document.title = rewriteLocaleHrefs(t(document.body.dataset.i18nTitle || 'meta.title'), active);

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute(
      'content',
      rewriteLocaleHrefs(t(document.body.dataset.i18nDescription || 'meta.description'), active),
    );
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.innerHTML = rewriteLocaleHrefs(t(el.getAttribute('data-i18n')), active);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });

  document.querySelectorAll('[data-locale]').forEach((btn) => {
    const isActive = btn.getAttribute('data-locale') === active;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    btn.classList.toggle('is-active', isActive);
  });
  document.querySelectorAll('.locale-toggle a[hreflang]').forEach((link) => {
    const isActive = link.getAttribute('hreflang') === active;
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

export function setLocale(locale) {
  if (locale !== 'en' && locale !== 'nl') return;
  if (locale === active) return;
  const next = swapLocalePath(pathname(), locale);
  if (typeof globalThis.location?.assign === 'function') {
    globalThis.location.assign(`${next}${globalThis.location.search || ''}${globalThis.location.hash || ''}`);
  }
}

export function initLocale() {
  apply();
  document.querySelectorAll('[data-locale]').forEach((btn) => {
    btn.addEventListener('click', () => setLocale(btn.getAttribute('data-locale')));
  });
}
