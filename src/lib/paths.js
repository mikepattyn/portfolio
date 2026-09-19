export const CANONICAL_HOST = 'https://mikepattyn.nl';
export const LOCALES = ['en', 'nl'];

export const PAGE_SLUG = {
  home: '',
  cv: 'cv',
  thanks: 'thanks',
  underhood: 'underhood',
  workflows: 'workflows',
  rabbithole: 'rabbithole',
};

export const INDEXABLE_PAGES = ['home', 'cv', 'thanks', 'underhood', 'workflows'];
export const EXCLUDED_PAGES = ['rabbithole'];

export function isLocale(value) {
  return value === 'en' || value === 'nl';
}

export function pagePath(locale, page) {
  const slug = PAGE_SLUG[page];
  if (slug == null) throw new Error(`unknown page '${page}'`);
  return slug ? `/${locale}/${slug}` : `/${locale}/`;
}

export function localeFromPath(pathname) {
  const match = String(pathname || '').match(/^\/(en|nl)(?=\/|$)/);
  return match ? match[1] : null;
}

export function pageFromPath(pathname) {
  const match = String(pathname || '').match(/^\/(en|nl)(?:\/([^/]+))?\/?$/);
  if (!match) return null;
  const slug = match[2] || '';
  const found = Object.entries(PAGE_SLUG).find(([, value]) => value === slug);
  return found ? found[0] : null;
}

export function swapLocalePath(pathname, locale) {
  if (!isLocale(locale)) return pathname;
  const page = pageFromPath(pathname);
  if (page) return pagePath(locale, page);
  const stripped = String(pathname || '/').replace(/^\/(en|nl)(?=\/|$)/, '');
  const rest = stripped === '' ? '/' : stripped;
  if (rest === '/') return pagePath(locale, 'home');
  return `/${locale}${rest.startsWith('/') ? rest : `/${rest}`}`.replace(/\.html$/, '');
}

export function absoluteUrl(path) {
  const host = CANONICAL_HOST.replace(/\/+$/, '');
  if (!path || path === '/') return `${host}/`;
  return `${host}${path.startsWith('/') ? path : `/${path}`}`;
}
