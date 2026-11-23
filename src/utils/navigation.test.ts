import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildReferenceChapterHash,
  buildReferencePostHash,
  getNavItemById,
  NAV_ITEMS,
  parseReferenceChapterFromHash,
  parseReferencePostIdFromHash,
  parseSectionFromHash,
} from './navigation';

test('NAV_ITEMS contains the three required Vietnamese sections in order', () => {
  assert.deepEqual(
    NAV_ITEMS.map((item) => item.label),
    ['Trang chủ', 'Nhóm', 'Tham khảo']
  );
});

test('parseSectionFromHash resolves valid hashes including article and chapter subroutes and falls back to home', () => {
  assert.equal(parseSectionFromHash('#trang-chu'), 'home');
  assert.equal(parseSectionFromHash('#nhom'), 'groups');
  assert.equal(parseSectionFromHash('#tham-khao'), 'reference');
  assert.equal(parseSectionFromHash('#tham-khao/featured-1'), 'reference');
  assert.equal(parseSectionFromHash('#tham-khao/chuong/1'), 'reference');
  assert.equal(parseSectionFromHash('#unknown'), 'home');
  assert.equal(parseSectionFromHash(''), 'home');
});

test('parseReferencePostIdFromHash and buildReferencePostHash handle per-article routes', () => {
  assert.equal(buildReferencePostHash('featured-1'), '#tham-khao/featured-1');
  assert.equal(parseReferencePostIdFromHash('#tham-khao/featured-1'), 'featured-1');
  assert.equal(parseReferencePostIdFromHash('#tham-khao/other-3'), 'other-3');
  assert.equal(parseReferencePostIdFromHash('#tham-khao/chuong/1'), null);
  assert.equal(parseReferencePostIdFromHash('#tham-khao'), null);
  assert.equal(parseReferencePostIdFromHash('#tham-khao/'), null);
  assert.equal(parseReferencePostIdFromHash('#trang-chu'), null);
});

test('parseReferenceChapterFromHash and buildReferenceChapterHash handle Chương 1–10 routes', () => {
  assert.equal(buildReferenceChapterHash(1), '#tham-khao/chuong/1');
  assert.equal(buildReferenceChapterHash(10), '#tham-khao/chuong/10');
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/1'), 1);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/10'), 10);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/0'), null);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/11'), null);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/featured-1'), null);
});

test('getNavItemById returns matching item', () => {
  assert.equal(getNavItemById('groups').label, 'Nhóm');
  assert.equal(getNavItemById('reference').hash, '#tham-khao');
});
