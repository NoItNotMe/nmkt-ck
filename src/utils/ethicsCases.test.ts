import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildEightStepExportText,
  computeBalanceAngleDegrees,
  computeEthicsStats,
  countEthicsCategoryCases,
  ETHICS_CASES,
  ETHICS_CATEGORIES,
  ETHICS_TEST_META,
  filterEthicsCasesByCategory,
  getEthicsCaseById,
  getNextEthicsCaseId,
  pickRandomEthicsCaseId,
  sanitizeEthicsProgress,
} from './ethicsCases';

test('ETHICS_CASES contains all 33 sequential SCU cases with valid fields', () => {
  assert.equal(ETHICS_CASES.length, 33);
  ETHICS_CASES.forEach((c, idx) => {
    assert.equal(c.id, idx + 1);
    assert.ok(ETHICS_CATEGORIES.includes(c.cat));
    assert.ok(c.title.length > 0);
    assert.ok(c.en.length > 0);
    assert.ok(c.story.length > 0);
    assert.ok(c.s1 && c.s2 && c.s3 && c.s7 && c.s8);
    assert.equal(c.opts.length, 3);
    c.opts.forEach((opt) => {
      assert.equal(opt.t.length, ETHICS_TEST_META.length);
      assert.ok(['good', 'mid', 'bad'].includes(opt.level));
      opt.t.forEach((score) => {
        assert.ok(score === 0 || score === 1 || score === 2);
      });
    });
  });
});

test('filterEthicsCasesByCategory and countEthicsCategoryCases cover all 33 cases cleanly', () => {
  assert.equal(countEthicsCategoryCases('Tất cả'), 33);
  const subCategories = ETHICS_CATEGORIES.filter((c) => c !== 'Tất cả');
  const sum = subCategories.reduce(
    (acc, cat) => acc + countEthicsCategoryCases(cat),
    0
  );
  assert.equal(sum, 33);
  const ySinh = filterEthicsCasesByCategory('Kỹ thuật y sinh');
  assert.equal(ySinh.length, 5);
  assert.ok(ySinh.every((c) => c.cat === 'Kỹ thuật y sinh'));
});

test('getEthicsCaseById returns matching case or falls back to case 1', () => {
  assert.equal(getEthicsCaseById(18).id, 18);
  assert.equal(getEthicsCaseById(999).id, 1);
});

test('computeEthicsStats and sanitizeEthicsProgress accurately compute progress', () => {
  const sanitized = sanitizeEthicsProgress({
    '1': 'good',
    '2': 'mid',
    '99': 'good',
    '3': 'invalid',
  });
  assert.deepEqual(sanitized, { '1': 'good', '2': 'mid' });
  const stats = computeEthicsStats(sanitized);
  assert.deepEqual(stats, {
    analyzedCount: 2,
    goodCount: 1,
    totalCount: 33,
  });
});

test('computeBalanceAngleDegrees starts balanced at 0 and tilts gradually per answered case within ±12 deg', () => {
  assert.equal(computeBalanceAngleDegrees({}), 0);
  assert.equal(computeBalanceAngleDegrees({ '1': 'good' }), -2);
  assert.equal(computeBalanceAngleDegrees({ '1': 'good', '2': 'good' }), -4);
  assert.equal(computeBalanceAngleDegrees({ '1': 'mid' }), 1);
  assert.equal(computeBalanceAngleDegrees({ '1': 'bad' }), 2);
  assert.equal(computeBalanceAngleDegrees({ '1': 'good', '2': 'bad' }), 0);

  const manyGood = Object.fromEntries(
    Array.from({ length: 10 }, (_, idx) => [String(idx + 1), 'good' as const])
  );
  assert.equal(computeBalanceAngleDegrees(manyGood), -12);

  const manyBad = Object.fromEntries(
    Array.from({ length: 10 }, (_, idx) => [String(idx + 1), 'bad' as const])
  );
  assert.equal(computeBalanceAngleDegrees(manyBad), 12);
});

test('getNextEthicsCaseId wraps from 33 back to 1 and pickRandomEthicsCaseId skips currentId', () => {
  assert.equal(getNextEthicsCaseId(1), 2);
  assert.equal(getNextEthicsCaseId(33), 1);
  assert.notEqual(pickRandomEthicsCaseId(1, 0), 1);
  assert.notEqual(pickRandomEthicsCaseId(33, 0.99), 33);
});

test('buildEightStepExportText formats both unpicked and picked states cleanly', () => {
  const case1 = getEthicsCaseById(1);
  const unpicked = buildEightStepExportText(case1, null);
  assert.match(unpicked, /SCU #1/);
  assert.match(unpicked, /\(Chưa chọn phương án\)/);

  const picked = buildEightStepExportText(case1, 1);
  assert.match(picked, /1\. Gây hại \(Đạt\)/);
  assert.match(picked, /Phương án B - Lập báo cáo dữ liệu lỗi cụ thể/);
});
