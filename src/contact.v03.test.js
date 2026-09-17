import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const home = readFileSync(join(root, 'index.html'), 'utf8');
const form = readFileSync(join(root, 'src/routes/home.tsx'), 'utf8');
const turnstile = readFileSync(join(root, 'src/lib/turnstile.ts'), 'utf8');
const chrome = readFileSync(join(root, 'src/components/site-chrome.tsx'), 'utf8');

describe('V03 contact form', () => {
  test('exposes the production Turnstile site key', () => {
    assert.match(home, /name="turnstile-site-key"/);
    assert.match(home, /0x4AAAAAAEM87e-TffCeAaTl/);
    assert.match(turnstile, /0x4AAAAAAEM87e-TffCeAaTl/);
  });

  test('posts JSON to same-origin /api/contact with Turnstile and honeypot', () => {
    assert.match(form, /CONTACT_ENDPOINT/);
    assert.match(turnstile, /export const CONTACT_ENDPOINT = "\/api\/contact"/);
    assert.match(form, /turnstileToken/);
    assert.match(form, /name="_honey"/);
    assert.match(form, /method: "POST"/);
    assert.match(form, /application\/json/);
    assert.doesNotMatch(form, /formsubmit\.co/i);
  });
});

describe('V03 CV downloads', () => {
  test('locale-aware PDFs live on the Pattynologies CDN', () => {
    const links = readFileSync(join(root, 'src/lib/links.ts'), 'utf8');
    assert.match(links, /cdn\.pattynologies\.com\/cv\/Mike-Pattyn-CV\.pdf/);
    assert.match(links, /cdn\.pattynologies\.com\/cv\/Mike-Pattyn-CV-NL\.pdf/);
    assert.match(chrome, /cvPdfUrl\(locale\)/);
  });
});
