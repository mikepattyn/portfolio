import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { nearestItemIndex } from './toolkit.js';

describe('ToolkitBanner nearest item', () => {
  test('picks the item whose center is closest to the pointer', () => {
    assert.equal(nearestItemIndex(40, [10, 50, 90]), 1);
    assert.equal(nearestItemIndex(12, [10, 50, 90]), 0);
    assert.equal(nearestItemIndex(88, [10, 50, 90]), 2);
  });

  test('returns -1 when there are no centers', () => {
    assert.equal(nearestItemIndex(0, []), -1);
  });
});
