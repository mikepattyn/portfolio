import { en } from '../i18n/en.js';
import { nl } from '../i18n/nl.js';
import { absoluteUrl, pagePath } from './paths.js';

const DICT = { en, nl };

export function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function pageMeta(locale, page) {
  const dict = DICT[locale];
  if (!dict) throw new Error(`unknown locale '${locale}'`);
  if (page === 'home') return dict.meta;
  if (page === 'cv') return dict.cv.meta;
  if (page === 'thanks') return dict.thanks.meta;
  if (page === 'underhood') return dict.underhood.meta;
  if (page === 'workflows') return dict.workflows.meta;
  if (page === 'rabbithole') return dict.echo.meta;
  throw new Error(`unknown page '${page}'`);
}

export function pageHeadline(locale, page) {
  const dict = DICT[locale];
  if (page === 'home') return locale === 'nl' ? 'Van idee tot draaiend product.' : 'From idea to running product.';
  if (page === 'cv') return dict.cv.title;
  if (page === 'thanks') return dict.thanks.title;
  if (page === 'underhood') return dict.underhood.title;
  if (page === 'workflows') return dict.workflows.title;
  if (page === 'rabbithole') return dict.echo.title;
  return pageMeta(locale, page).title;
}

export function applyI18n(html, locale) {
  const dict = DICT[locale];
  let out = html;
  const titleKey = out.match(/data-i18n-title="([^"]+)"/);
  const descKey = out.match(/data-i18n-description="([^"]+)"/);
  if (titleKey) {
    const title = getByPath(dict, titleKey[1]);
    if (typeof title === 'string') {
      out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
    }
  }
  if (descKey) {
    const description = getByPath(dict, descKey[1]);
    if (typeof description === 'string') {
      out = out.replace(
        /(<meta\s+[^>]*name=["']description["'][^>]*content=["'])([^"']*)(["'][^>]*>)/i,
        `$1${escapeAttr(description)}$3`,
      );
    }
  }
  out = out.replace(/<([a-zA-Z0-9]+)([^>]*?)\sdata-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g, (full, tag, pre, key, post) => {
    const value = getByPath(dict, key);
    if (typeof value !== 'string') return full;
    return `<${tag}${pre} data-i18n="${key}"${post}>${value}</${tag}>`;
  });
  out = out.replace(/data-i18n-aria="([^"]+)"/g, (full, key) => {
    const value = getByPath(dict, key);
    if (typeof value !== 'string') return full;
    return `data-i18n-aria="${key}" aria-label="${escapeAttr(value)}"`;
  });
  return out;
}

export function rewriteLocaleHrefs(html, locale) {
  return html
    .replaceAll('href="/underhood.html', `href="/${locale}/underhood`)
    .replaceAll("href='/underhood.html", `href='/${locale}/underhood`)
    .replaceAll('href="/cv.html', `href="/${locale}/cv`)
    .replaceAll("href='/cv.html", `href='/${locale}/cv`)
    .replaceAll('href="/thanks.html', `href="/${locale}/thanks`)
    .replaceAll("href='/thanks.html", `href='/${locale}/thanks`)
    .replaceAll('href="/workflows.html', `href="/${locale}/workflows`)
    .replaceAll("href='/workflows.html", `href='/${locale}/workflows`)
    .replaceAll('href="/rabbithole.html', `href="/${locale}/rabbithole`)
    .replaceAll("href='/rabbithole.html", `href='/${locale}/rabbithole`)
    .replaceAll('href="/#', `href="/${locale}/#`)
    .replaceAll('href="/"', `href="/${locale}/"`);
}

export function localeToggleToLinks(html, locale, page) {
  const enHref = pagePath('en', page);
  const nlHref = pagePath('nl', page);
  const enCurrent = locale === 'en' ? ' is-active" aria-current="true"' : '"';
  const nlCurrent = locale === 'nl' ? ' is-active" aria-current="true"' : '"';
  return html.replace(
    /<div\s+class="locale-toggle"[\s\S]*?<\/div>/,
    `<div
          class="locale-toggle"
          role="group"
          aria-label="${locale === 'nl' ? 'Taal' : 'Language'}"
        >
          <a class="locale-toggle__btn${enCurrent} href="${enHref}" hreflang="en" lang="en">EN</a>
          <a class="locale-toggle__btn${nlCurrent} href="${nlHref}" hreflang="nl" lang="nl">NL</a>
        </div>`,
  );
}

export function hreflangTags(page) {
  const en = absoluteUrl(pagePath('en', page));
  const nl = absoluteUrl(pagePath('nl', page));
  return [
    `<link rel="alternate" hreflang="en" href="${en}" />`,
    `<link rel="alternate" hreflang="nl" href="${nl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${en}" />`,
  ].join('\n    ');
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mike Pattyn',
    email: 'info@mikepattyn.nl',
  };
}

export function articleJsonLd(locale, page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageHeadline(locale, page),
  };
}

export function injectHead(html, options) {
  const { lang, title, description, canonical, page, jsonLd, noindex } = options;
  let out = html.replace(/<html\b([^>]*)>/i, (full, attrs) => {
    const cleaned = attrs.replace(/\slang=["'][^"']*["']/, '');
    return `<html lang="${lang}"${cleaned}>`;
  });
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  if (/<meta\s+[^>]*name=["']description["'][^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+[^>]*name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    );
  } else {
    out = out.replace(
      /<meta charset="UTF-8" \/>/i,
      `<meta charset="UTF-8" />\n    <meta name="description" content="${escapeAttr(description)}" />`,
    );
  }
  out = out.replace(/\s*<link\s+[^>]*rel=["']canonical["'][^>]*>/gi, '');
  out = out.replace(/\s*<link\s+[^>]*rel=["']alternate["'][^>]*>/gi, '');
  out = out.replace(/\s*<meta\s+[^>]*name=["']robots["'][^>]*>/gi, '');
  out = out.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

  const extra = [];
  if (noindex) extra.push('    <meta name="robots" content="noindex" />');
  if (canonical) extra.push(`    <link rel="canonical" href="${canonical}" />`);
  if (page && !noindex) extra.push(`    ${hreflangTags(page)}`);
  if (jsonLd) {
    extra.push(
      `    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return out.replace('</head>', `${extra.join('\n')}\n  </head>`);
}

export function injectRoot(html, markup) {
  if (/<div id="root"><\/div>/.test(html)) {
    return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  }
  return html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${markup}</div>`);
}

export function robotsTxt() {
  return 'Sitemap: https://mikepattyn.nl/sitemap.xml\n';
}

export function sitemapXml(entries) {
  const urls = entries
    .map(
      ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function selectorHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Mike Pattyn</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <style>
      body {
        margin: 0;
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.25rem;
        padding: clamp(1.25rem, 4vw, 3rem);
        font-family: Georgia, "Times New Roman", serif;
        background: #f4f1ea;
        color: #16150f;
      }
      h1 { font-size: clamp(1.6rem, 4vw, 2.2rem); margin: 0; }
      p { margin: 0; max-width: 42ch; line-height: 1.5; }
      ul { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.75rem; }
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.75rem;
        padding: 0.35rem 1rem;
        border-radius: 999px;
        background: #16150f;
        color: #f4f1ea;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <h1>Mike Pattyn</h1>
    <p lang="en">From idea to running product. One engineer, the whole chain.</p>
    <p lang="nl">Van idee tot draaiend product. Eén engineer, de hele keten.</p>
    <ul>
      <li><a href="/en/" hreflang="en" lang="en">English</a></li>
      <li><a href="/nl/" hreflang="nl" lang="nl">Nederlands</a></li>
    </ul>
  </body>
</html>
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', '&quot;');
}
