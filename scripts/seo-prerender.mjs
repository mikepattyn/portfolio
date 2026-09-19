#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import {
  INDEXABLE_PAGES,
  LOCALES,
  PAGE_SLUG,
  absoluteUrl,
  pagePath,
} from '../src/lib/paths.js';
import {
  applyI18n,
  articleJsonLd,
  injectHead,
  injectRoot,
  localeToggleToLinks,
  organizationJsonLd,
  pageMeta,
  rewriteLocaleHrefs,
  robotsTxt,
  selectorHtml,
  sitemapXml,
} from '../src/lib/seo-html.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const SHELL = {
  home: 'index.html',
  cv: 'cv.html',
  underhood: 'underhood.html',
  thanks: 'thanks.html',
  workflows: 'workflows.html',
  rabbithole: 'rabbithole.html',
};

const LASTMOD_FILES = {
  home: ['src/routes/home.tsx', 'src/lib/i18n.ts'],
  cv: ['src/routes/cv-page.tsx', 'src/lib/i18n.ts', 'src/i18n/en.js', 'src/i18n/nl.js'],
  thanks: ['thanks.html', 'src/i18n/en.js', 'src/i18n/nl.js'],
  underhood: ['src/routes/underhood-page.tsx', 'src/lib/i18n.ts', 'src/i18n/en.js', 'src/i18n/nl.js'],
  workflows: ['workflows.html', 'src/i18n/en.js', 'src/i18n/nl.js'],
  rabbithole: ['rabbithole.html', 'src/i18n/en.js', 'src/i18n/nl.js'],
};

const VANILLA = new Set(['thanks', 'workflows', 'rabbithole']);

function lastmodFor(page) {
  let latest = '';
  for (const file of LASTMOD_FILES[page] ?? []) {
    try {
      const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
        cwd: root,
        encoding: 'utf8',
      }).trim();
      if (out && out > latest) latest = out;
    } catch {
      /* untracked or no git */
    }
  }
  return latest;
}

function outFile(locale, page) {
  const slug = PAGE_SLUG[page];
  return slug ? join(dist, locale, slug, 'index.html') : join(dist, locale, 'index.html');
}

function jsonLdFor(locale, page) {
  if (page === 'home') return organizationJsonLd();
  if (page === 'underhood' || page === 'workflows') return articleJsonLd(locale, page);
  return null;
}

async function prerender() {
  const vite = await createServer({
    root,
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    logLevel: 'error',
  });
  try {
    const { render } = await vite.ssrLoadModule('/src/ssr.tsx');
    const lastmods = Object.fromEntries(
      [...INDEXABLE_PAGES, 'rabbithole'].map((page) => [page, lastmodFor(page)]),
    );

    for (const locale of LOCALES) {
      for (const page of [...INDEXABLE_PAGES, 'rabbithole']) {
        const shellName = SHELL[page];
        const shellPath = join(dist, shellName);
        let html = readFileSync(shellPath, 'utf8');
        const meta = pageMeta(locale, page);
        const noindex = page === 'rabbithole';
        const canonical = noindex ? '' : absoluteUrl(pagePath(locale, page));

        if (VANILLA.has(page)) {
          html = applyI18n(html, locale);
          html = localeToggleToLinks(html, locale, page);
          html = rewriteLocaleHrefs(html, locale);
        } else {
          const url = page === 'home' ? `/${locale}` : pagePath(locale, page);
          const markup = await render(url);
          html = injectRoot(html, markup);
        }

        html = injectHead(html, {
          lang: locale,
          title: meta.title,
          description: meta.description,
          canonical,
          page,
          jsonLd: noindex ? null : jsonLdFor(locale, page),
          noindex,
        });

        const target = outFile(locale, page);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, html);
      }
    }

    writeFileSync(join(dist, 'index.html'), selectorHtml());
    writeFileSync(join(dist, 'robots.txt'), robotsTxt());
    writeFileSync(
      join(dist, 'sitemap.xml'),
      sitemapXml(
        INDEXABLE_PAGES.flatMap((page) =>
          LOCALES.map((locale) => ({
            loc: absoluteUrl(pagePath(locale, page)),
            lastmod: lastmods[page],
          })),
        ),
      ),
    );

    for (const stale of ['cv.html', 'underhood.html', 'thanks.html', 'workflows.html', 'rabbithole.html']) {
      rmSync(join(dist, stale), { force: true });
    }
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
