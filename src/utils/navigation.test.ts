import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGroupSubpageHash,
  buildHomeAnchorHash,
  buildReferenceChapterHash,
  buildReferencePostHash,
  canNavigateBack,
  getNavItemById,
  NAV_ITEMS,
  normalizeAppHash,
  parseGroupSubpageFromHash,
  parseHomeAnchorFromHash,
  parseReferenceChapterFromHash,
  parseReferencePostIdFromHash,
  parseSectionFromHash,
  pushRouteHistory,
  resolvePreviousRoute,
  syncRouteHistoryOnExternalNavigation,
} from './navigation';

test('NAV_ITEMS contains the three required Vietnamese sections in order', () => {
  assert.deepEqual(
    NAV_ITEMS.map((item) => item.label),
    ['Trang chủ', 'Công cụ', 'Tham khảo']
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

test('parseReferenceChapterFromHash and buildReferenceChapterHash handle Chương 1–9 routes', () => {
  assert.equal(buildReferenceChapterHash(1), '#tham-khao/chuong/1');
  assert.equal(buildReferenceChapterHash(9), '#tham-khao/chuong/9');
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/1'), 1);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/9'), 9);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/0'), null);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/10'), null);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/chuong/11'), null);
  assert.equal(parseReferenceChapterFromHash('#tham-khao/featured-1'), null);
});

test('getNavItemById returns matching item', () => {
  assert.equal(getNavItemById('groups').label, 'Công cụ');
  assert.equal(getNavItemById('reference').hash, '#tham-khao');
});

test('route history helpers track navigation stack and resolve previous routes', () => {
  assert.equal(normalizeAppHash(''), '#trang-chu');
  assert.equal(normalizeAppHash('#unknown'), '#trang-chu');
  assert.equal(normalizeAppHash('#tham-khao/ch2-ten-steps'), '#tham-khao/ch2-ten-steps');

  let stack = ['#trang-chu'];
  stack = pushRouteHistory(stack, '#tham-khao');
  stack = pushRouteHistory(stack, '#tham-khao/chuong/2');
  stack = pushRouteHistory(stack, '#tham-khao/ch2-ten-steps');
  stack = pushRouteHistory(stack, '#tham-khao/ch2-ten-steps');
  assert.deepEqual(stack, [
    '#trang-chu',
    '#tham-khao',
    '#tham-khao/chuong/2',
    '#tham-khao/ch2-ten-steps',
  ]);
  assert.equal(canNavigateBack(stack, '#tham-khao/ch2-ten-steps'), true);

  const step1 = resolvePreviousRoute(stack);
  assert.equal(step1.targetHash, '#tham-khao/chuong/2');
  const step2 = resolvePreviousRoute(step1.nextStack);
  assert.equal(step2.targetHash, '#tham-khao');
  const step3 = resolvePreviousRoute(step2.nextStack);
  assert.equal(step3.targetHash, '#trang-chu');
  const step4 = resolvePreviousRoute(step3.nextStack);
  assert.equal(step4.targetHash, null);
  assert.equal(canNavigateBack(step3.nextStack, '#trang-chu'), false);

  // External popstate back pops stack
  const popped = syncRouteHistoryOnExternalNavigation(
    ['#trang-chu', '#tham-khao'],
    '#trang-chu'
  );
  assert.deepEqual(popped, ['#trang-chu']);

  // Direct deep-link fallback parent navigation
  assert.equal(
    resolvePreviousRoute(['#tham-khao/ch2-ten-steps']).targetHash,
    '#tham-khao'
  );
  assert.equal(
    resolvePreviousRoute(['#tham-khao/chuong/2']).targetHash,
    '#tham-khao'
  );
  assert.equal(resolvePreviousRoute(['#tham-khao']).targetHash, '#trang-chu');
  assert.equal(resolvePreviousRoute(['#nhom/thanh-vien']).targetHash, '#nhom');
  assert.equal(resolvePreviousRoute(['#nhom']).targetHash, '#trang-chu');
});

test('parseGroupSubpageFromHash and buildGroupSubpageHash handle group subpage routes', () => {
  assert.equal(buildGroupSubpageHash('thanh-vien'), '#nhom/thanh-vien');
  assert.equal(buildGroupSubpageHash('de-tai'), '#nhom/de-tai');
  assert.equal(buildGroupSubpageHash('thanh-vien/vu-duy-manh'), '#nhom/thanh-vien/vu-duy-manh');
  assert.equal(parseGroupSubpageFromHash('#nhom/thanh-vien'), 'thanh-vien');
  assert.equal(parseGroupSubpageFromHash('#nhom/de-tai'), 'de-tai');
  assert.equal(parseGroupSubpageFromHash('#nhom/thanh-vien/vu-duy-manh'), 'thanh-vien/vu-duy-manh');
  assert.equal(parseGroupSubpageFromHash('#nhom'), null);
  assert.equal(parseGroupSubpageFromHash('#nhom/'), null);
  assert.equal(parseGroupSubpageFromHash('#trang-chu'), null);
  assert.equal(parseGroupSubpageFromHash('#tham-khao/featured-1'), null);
  assert.equal(parseSectionFromHash('#nhom/thanh-vien'), 'groups');
  assert.equal(parseSectionFromHash('#nhom/de-tai'), 'groups');
});

test('parseHomeAnchorFromHash and buildHomeAnchorHash handle home specialization subroutes', () => {
  assert.equal(
    buildHomeAnchorHash('thiet-ke-vi-mach'),
    '#trang-chu/thiet-ke-vi-mach'
  );
  assert.equal(
    parseHomeAnchorFromHash('#trang-chu/thiet-ke-vi-mach'),
    'thiet-ke-vi-mach'
  );
  assert.equal(
    parseHomeAnchorFromHash('#trang-chu/dieu-khien-va-tu-dong-hoa'),
    'dieu-khien-va-tu-dong-hoa'
  );
  assert.equal(parseHomeAnchorFromHash('#trang-chu'), null);
  assert.equal(parseHomeAnchorFromHash('#trang-chu/'), null);
  assert.equal(parseSectionFromHash('#trang-chu/thiet-ke-vi-mach'), 'home');
  assert.equal(
    normalizeAppHash('#trang-chu/thiet-ke-vi-mach'),
    '#trang-chu/thiet-ke-vi-mach'
  );
});



