import test from 'node:test';
import assert from 'node:assert/strict';
import { getNavItemById, NAV_ITEMS, parseSectionFromHash } from './navigation';

test('NAV_ITEMS contains the three required Vietnamese sections in order', () => {
  assert.deepEqual(
    NAV_ITEMS.map((item) => item.label),
    ['Trang chủ', 'Nhóm', 'Tham khảo']
  );
});

test('parseSectionFromHash resolves valid hashes and falls back to home', () => {
  assert.equal(parseSectionFromHash('#trang-chu'), 'home');
  assert.equal(parseSectionFromHash('#nhom'), 'groups');
  assert.equal(parseSectionFromHash('#tham-khao'), 'reference');
  assert.equal(parseSectionFromHash('#unknown'), 'home');
  assert.equal(parseSectionFromHash(''), 'home');
});

test('getNavItemById returns matching item', () => {
  assert.equal(getNavItemById('groups').label, 'Nhóm');
  assert.equal(getNavItemById('reference').hash, '#tham-khao');
});
