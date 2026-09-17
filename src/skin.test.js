import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

const STORAGE_KEY = 'skin';

function mockDom({ stored = null } = {}) {
  const store = {};
  if (stored != null) store[STORAGE_KEY] = stored;

  const classic = { id: 'skin-classic', disabled: false };
  const stitch = { id: 'skin-stitch', disabled: true };
  const html = { dataset: { skin: 'classic' } };
  const toggle = {
    attrs: {
      'aria-pressed': 'false',
      'data-i18n': 'footer.skinToStitch',
    },
    listeners: [],
    getAttribute(name) {
      return this.attrs[name];
    },
    setAttribute(name, value) {
      this.attrs[name] = value;
    },
    addEventListener(type, handler) {
      this.listeners.push({ type, handler });
    },
    click() {
      this.listeners.filter((item) => item.type === 'click').forEach((item) => item.handler());
    },
    textContent: 'Electric Emerald',
  };

  globalThis.localStorage = {
    getItem(key) {
      return Object.hasOwn(store, key) ? store[key] : null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
  };

  globalThis.document = {
    documentElement: html,
    hidden: false,
    getElementById(id) {
      if (id === 'skin-classic') return classic;
      if (id === 'skin-stitch') return stitch;
      return null;
    },
    querySelectorAll(selector) {
      return selector === '[data-skin-toggle]' ? [toggle] : [];
    },
    querySelector() {
      return null;
    },
    addEventListener() {},
  };

  const scrollToCalls = [];
  globalThis.window = {
    scrollTo(options) {
      scrollToCalls.push(options);
    },
  };

  return { html, classic, stitch, toggle, store, scrollToCalls };
}

describe('skin', () => {
  beforeEach(() => {
    delete globalThis.localStorage;
    delete globalThis.document;
    delete globalThis.window;
  });

  test('defaults to classic when the visitor has never chosen a skin', async () => {
    const { html, classic, stitch } = mockDom();
    const { getSkin, initSkin } = await import(`./skin.js?default=${Date.now()}`);
    initSkin();
    assert.equal(getSkin(), 'classic');
    assert.equal(html.dataset.skin, 'classic');
    assert.equal(classic.disabled, false);
    assert.equal(stitch.disabled, true);
    assert.equal(globalThis.localStorage.getItem(STORAGE_KEY), null);
  });

  test('restores stitch from localStorage and enables the stitch sheet', async () => {
    const { html, classic, stitch } = mockDom({ stored: 'stitch' });
    const { getSkin, initSkin } = await import(`./skin.js?stored=${Date.now()}`);
    initSkin();
    assert.equal(getSkin(), 'stitch');
    assert.equal(html.dataset.skin, 'stitch');
    assert.equal(classic.disabled, true);
    assert.equal(stitch.disabled, false);
  });

  test('setSkin classic clears the stored choice and disables stitch', async () => {
    mockDom({ stored: 'stitch' });
    const { setSkin, getSkin, initSkin } = await import(`./skin.js?clear=${Date.now()}`);
    initSkin();
    setSkin('classic');
    assert.equal(getSkin(), 'classic');
    assert.equal(globalThis.localStorage.getItem(STORAGE_KEY), null);
    assert.equal(document.getElementById('skin-stitch').disabled, true);
    assert.equal(document.getElementById('skin-classic').disabled, false);
  });

  test('footer toggle scrolls the viewport to the top', async () => {
    const { toggle, scrollToCalls } = mockDom();
    const { initSkin } = await import(`./skin.js?scroll=${Date.now()}`);
    initSkin();
    toggle.click();
    assert.equal(scrollToCalls.length, 1);
    assert.deepEqual(scrollToCalls[0], { top: 0, left: 0, behavior: 'smooth' });
  });

  test('footer toggle is the only way to persist stitch', async () => {
    const { toggle, store } = mockDom();
    const { getSkin, initSkin } = await import(`./skin.js?toggle=${Date.now()}`);
    initSkin();
    assert.equal(store[STORAGE_KEY], undefined);
    toggle.click();
    assert.equal(getSkin(), 'stitch');
    assert.equal(store[STORAGE_KEY], 'stitch');
    assert.equal(toggle.getAttribute('aria-pressed'), 'true');
    assert.equal(toggle.getAttribute('data-i18n'), 'footer.skinToClassic');
  });
});
