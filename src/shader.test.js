import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { prefersReducedMotion, setShaderEnabled } from './shader.js';

describe('shader', () => {
  test('treats missing matchMedia as motion allowed', () => {
    assert.equal(typeof prefersReducedMotion, 'function');
    assert.equal(prefersReducedMotion(), false);
  });

  test('setShaderEnabled(false) does not leave a site-shader', () => {
    const html = { classList: { add() {}, remove() {} } };
    globalThis.document = {
      documentElement: html,
      getElementById() {
        return null;
      },
      body: null,
    };
    setShaderEnabled(false);
    assert.equal(document.getElementById('site-shader'), null);
    delete globalThis.document;
  });
});
