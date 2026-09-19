import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  applyI18n,
  injectHead,
  localeToggleToLinks,
  rewriteLocaleHrefs,
  sitemapXml,
} from './seo-html.js';

describe('seo HTML transforms', () => {
  test('rewrites unprefixed internal hrefs onto the locale', () => {
    const html =
      '<a href="/">Home</a><a href="/#contact">Contact</a><a href="/cv.html">CV</a><a href="/underhood.html#agent-skills">Skills</a>';
    assert.equal(
      rewriteLocaleHrefs(html, 'nl'),
      '<a href="/nl/">Home</a><a href="/nl/#contact">Contact</a><a href="/nl/cv">CV</a><a href="/nl/underhood#agent-skills">Skills</a>',
    );
  });

  test('bakes Dutch copy into data-i18n nodes before JavaScript', () => {
    const html =
      '<html><head><title>Thanks — Mike Pattyn</title></head><body data-i18n-title="thanks.meta.title"><h1 data-i18n="thanks.title">Thanks</h1></body></html>';
    const out = applyI18n(html, 'nl');
    assert.match(out, /<title>Dank — Mike Pattyn<\/title>/);
    assert.match(out, /<h1 data-i18n="thanks.title">Dank<\/h1>/);
  });

  test('turns the locale toggle into crawlable links', () => {
    const html = `<div
          class="locale-toggle"
          role="group"
          aria-label="Language"
        >
          <button type="button" class="locale-toggle__btn" data-locale="en">EN</button>
          <button type="button" class="locale-toggle__btn" data-locale="nl">NL</button>
        </div>`;
    const out = localeToggleToLinks(html, 'nl', 'thanks');
    assert.match(out, /href="\/nl\/thanks"[^>]*hreflang="nl"/);
    assert.match(out, /href="\/en\/thanks"[^>]*hreflang="en"/);
    assert.match(out, /aria-current="true"/);
    assert.doesNotMatch(out, /<button/);
  });

  test('injects a self-canonical and reciprocal hreflang', () => {
    const html =
      '<html lang="en"><head><meta charset="UTF-8" /><title>Old</title><meta name="description" content="old" /></head></html>';
    const out = injectHead(html, {
      lang: 'nl',
      title: 'CV van Mike Pattyn',
      description: 'Producten die ik opleverde.',
      canonical: 'https://mikepattyn.nl/nl/cv',
      page: 'cv',
    });
    assert.match(out, /<html lang="nl">/);
    assert.match(out, /rel="canonical" href="https:\/\/mikepattyn.nl\/nl\/cv"/);
    assert.match(out, /hreflang="en" href="https:\/\/mikepattyn.nl\/en\/cv"/);
    assert.match(out, /hreflang="nl" href="https:\/\/mikepattyn.nl\/nl\/cv"/);
  });

  test('sitemap emits loc and lastmod only', () => {
    const xml = sitemapXml([{ loc: 'https://mikepattyn.nl/en/', lastmod: '2026-09-17' }]);
    assert.match(xml, /<loc>https:\/\/mikepattyn.nl\/en\/<\/loc>/);
    assert.match(xml, /<lastmod>2026-09-17<\/lastmod>/);
    assert.doesNotMatch(xml, /priority|changefreq/);
  });
});
