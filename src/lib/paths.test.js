import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  INDEXABLE_PAGES,
  absoluteUrl,
  localeFromPath,
  pageFromPath,
  pagePath,
  swapLocalePath,
} from './paths.js';

describe('locale paths', () => {
  test('builds locale-prefixed home and inner pages', () => {
    assert.equal(pagePath('en', 'home'), '/en/');
    assert.equal(pagePath('nl', 'home'), '/nl/');
    assert.equal(pagePath('en', 'cv'), '/en/cv');
    assert.equal(pagePath('nl', 'thanks'), '/nl/thanks');
  });

  test('reads locale and page from a pathname', () => {
    assert.equal(localeFromPath('/nl/underhood'), 'nl');
    assert.equal(pageFromPath('/en/'), 'home');
    assert.equal(pageFromPath('/en'), 'home');
    assert.equal(pageFromPath('/nl/workflows/'), 'workflows');
    assert.equal(pageFromPath('/cv.html'), null);
  });

  test('swaps the locale without using storage', () => {
    assert.equal(swapLocalePath('/en/cv', 'nl'), '/nl/cv');
    assert.equal(swapLocalePath('/nl/thanks', 'en'), '/en/thanks');
  });

  test('absolute URLs stay on the apex host', () => {
    assert.equal(absoluteUrl(pagePath('en', 'home')), 'https://mikepattyn.nl/en/');
    assert.equal(absoluteUrl(pagePath('nl', 'cv')), 'https://mikepattyn.nl/nl/cv');
  });

  test('caps this run at five indexable pages', () => {
    assert.deepEqual(INDEXABLE_PAGES, ['home', 'cv', 'thanks', 'underhood', 'workflows']);
  });
});
