import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDesignDecisionTsv,
  calculateOptionWeightedAverage,
  calculateOptionWeightedSum,
  clampScaleValue,
  computeSensitivityFlips,
  createDemoDesignState,
  createUniqueDesignId,
  formatScoreVi,
  getNextOptionName,
  getRadarCriterionLabelLayout,
  getTopOptionIndices,
  getUniqueWinnerIndex,
  MAX_DESIGN_OPTIONS,
  OPTION_COLOR_THEMES,
  rankDesignOptions,
  resolveHighlightedOptionIndices,
  wrapRadarLabelText,
} from './designDecision';

test('demo data computes expected weighted averages and ranks Phương án B first', () => {
  const demo = createDemoDesignState();
  const sumA = calculateOptionWeightedSum(demo.criteria, 0);
  const sumB = calculateOptionWeightedSum(demo.criteria, 1);
  const sumC = calculateOptionWeightedSum(demo.criteria, 2);

  assert.equal(sumA, 58);
  assert.equal(sumB, 65);
  assert.equal(sumC, 63);

  assert.equal(formatScoreVi(calculateOptionWeightedAverage(demo.criteria, 0)), '3,41');
  assert.equal(formatScoreVi(calculateOptionWeightedAverage(demo.criteria, 1)), '3,82');
  assert.equal(formatScoreVi(calculateOptionWeightedAverage(demo.criteria, 2)), '3,71');

  const ranked = rankDesignOptions(demo.options, demo.criteria);
  assert.deepEqual(
    ranked.map((r) => r.option.name),
    ['Phương án B', 'Phương án C', 'Phương án A']
  );
  assert.deepEqual(getTopOptionIndices(ranked), [1]);
  assert.equal(getUniqueWinnerIndex(demo.options, demo.criteria), 1);
});

test('computeSensitivityFlips detects weight sensitivity flip for Tiết kiệm chi phí', () => {
  const demo = createDemoDesignState();
  const flips = computeSensitivityFlips(demo.options, demo.criteria);

  assert.equal(flips.length, 1);
  assert.deepEqual(flips[0], {
    criterionId: 'crit-4',
    criterionName: 'Tiết kiệm chi phí',
    direction: 'decrease',
    nextWeight: 2,
    newWinnerName: 'Phương án C',
  });
});

test('getTopOptionIndices handles ties accurately', () => {
  const state = createDemoDesignState();
  state.criteria = state.criteria.map((c) => ({
    ...c,
    scores: [4, 4, 2],
  }));

  const ranked = rankDesignOptions(state.options, state.criteria);
  assert.deepEqual(getTopOptionIndices(ranked), [0, 1]);
  assert.equal(getUniqueWinnerIndex(state.options, state.criteria), -1);
});

test('buildDesignDecisionTsv produces Excel/Word compatible tab-separated matrix', () => {
  const demo = createDemoDesignState();
  const tsv = buildDesignDecisionTsv(demo);
  const lines = tsv.split('\n');

  assert.equal(lines[0], 'Đề tài: Xe robot dò đường');
  assert.equal(
    lines[1],
    'Phương án\tĐáp ứng chức năng\tĐộ bền\tHiệu năng\tTiết kiệm chi phí\tDễ chế tạo\tTổng cộng\tTrung bình'
  );
  assert.equal(lines[2], 'Độ quan trọng\t5\t4\t3\t3\t2\t\t');
  assert.equal(lines[3], 'Phương án A\t3\t3\t2\t5\t5\t58\t3,41');
  assert.equal(lines[4], 'Phương án B\t4\t4\t3\t4\t4\t65\t3,82');
  assert.equal(lines[5], 'Phương án C\t5\t4\t5\t1\t2\t63\t3,71');
  assert.equal(
    lines[6],
    'Ghi chú: Tổng cộng và Trung bình đã nhân độ quan trọng của từng tiêu chí.'
  );
});

test('clampScaleValue keeps values bounded between 1 and 5', () => {
  assert.equal(clampScaleValue(0), 1);
  assert.equal(clampScaleValue(7), 5);
  assert.equal(clampScaleValue(3.4), 3);
  assert.equal(clampScaleValue(Number.NaN), 1);
});

test('resolveHighlightedOptionIndices defaults to highest option and switches on click selection', () => {
  const demo = createDemoDesignState();
  const ranked = rankDesignOptions(demo.options, demo.criteria);
  const topIndices = getTopOptionIndices(ranked);

  assert.deepEqual(
    resolveHighlightedOptionIndices(demo.options, topIndices, null),
    [1]
  );
  assert.deepEqual(
    resolveHighlightedOptionIndices(demo.options, topIndices, 'opt-a'),
    [0]
  );
  assert.deepEqual(
    resolveHighlightedOptionIndices(demo.options, topIndices, 'opt-c'),
    [2]
  );
  assert.deepEqual(
    resolveHighlightedOptionIndices(demo.options, topIndices, 'deleted-id'),
    [1]
  );
});

test('wrapRadarLabelText preserves full criterion text without ellipsis and avoids orphan weight token', () => {
  const shortWrapped = wrapRadarLabelText('Tiết kiệm chi phí', 3, 17);
  assert.equal(shortWrapped.join(' '), 'Tiết kiệm chi phí ×3');
  assert.equal(shortWrapped.includes('×3'), false);

  const longName = 'Khả năng mở rộng và tích hợp cảm biến mới';
  const longWrapped = wrapRadarLabelText(longName, 5, 18);
  assert.ok(longWrapped.length >= 2);
  assert.equal(longWrapped.join(' '), `${longName} ×5`);

  const threeLineWrapped = wrapRadarLabelText(
    'Độ bền cơ khí và khả năng chịu tải',
    4,
    17
  );
  assert.equal(threeLineWrapped.join(' '), 'Độ bền cơ khí và khả năng chịu tải ×4');
  assert.notEqual(threeLineWrapped[threeLineWrapped.length - 1], '×4');
});

test('getRadarCriterionLabelLayout pushes wrapped labels outward and keeps top labels above the vertex', () => {
  const shortTop = getRadarCriterionLabelLayout(0, 5, 'Độ bền', 4);
  const longTop = getRadarCriterionLabelLayout(
    0,
    5,
    'Đáp ứng chức năng và độ tin cậy vận hành',
    5
  );
  assert.equal(shortTop.lines.join(' '), 'Độ bền ×4');
  assert.equal(
    longTop.lines.join(' '),
    'Đáp ứng chức năng và độ tin cậy vận hành ×5'
  );
  assert.ok(longTop.lines.length >= 2);
  assert.ok(longTop.y < shortTop.y);

  const longLeft = getRadarCriterionLabelLayout(
    3,
    5,
    'Tiết kiệm chi phí linh kiện chế tạo',
    3
  );
  assert.equal(longLeft.textAnchor, 'end');
  assert.equal(longLeft.lines.join(' '), 'Tiết kiệm chi phí linh kiện chế tạo ×3');
  const distLongLeft = Math.hypot(longLeft.x - 280, longLeft.y - 172);
  assert.ok(distLongLeft > 114);
});

test('supports up to 5 design options with distinct themes and unique next option names', () => {
  assert.equal(MAX_DESIGN_OPTIONS, 5);
  assert.equal(OPTION_COLOR_THEMES.length, 5);
  const uniqueHexes = new Set(OPTION_COLOR_THEMES.map((t) => t.hex));
  assert.equal(uniqueHexes.size, 5);

  const demo = createDemoDesignState();
  assert.equal(getNextOptionName(demo.options), 'Phương án D');
  const fourOptions = [
    ...demo.options,
    { id: 'opt-d', name: 'Phương án D' },
  ];
  assert.equal(getNextOptionName(fourOptions), 'Phương án E');

  const withoutB = demo.options.filter((o) => o.id !== 'opt-b');
  assert.equal(getNextOptionName(withoutB), 'Phương án B');

  const fiveOptionCriteria = demo.criteria.map((c) => ({
    ...c,
    scores: [...c.scores, 5, 1],
  }));
  const fiveOptions = [
    ...fourOptions,
    { id: 'opt-e', name: 'Phương án E' },
  ];
  const ranked = rankDesignOptions(fiveOptions, fiveOptionCriteria);
  assert.equal(ranked.length, 5);
  assert.equal(ranked[0].option.name, 'Phương án D');
  assert.equal(ranked[0].weightedScore, 5);
  assert.equal(ranked[4].option.name, 'Phương án E');
  assert.equal(ranked[4].weightedScore, 1);
});

test('createUniqueDesignId never collides with existing demo criterion or option IDs', () => {
  const demo = createDemoDesignState();
  const existingCritIds = demo.criteria.map((c) => c.id);

  // Even when starting counter at 1 or 3 (after adding 2 options), crit-1..crit-5 are skipped
  const fromOne = createUniqueDesignId('crit', existingCritIds, 1);
  assert.equal(fromOne.id, 'crit-6');
  assert.equal(fromOne.nextCounter, 7);

  const fromThree = createUniqueDesignId('crit', existingCritIds, 3);
  assert.equal(fromThree.id, 'crit-6');
  assert.equal(fromThree.nextCounter, 7);

  // If crit-1 and crit-2 were removed (leaving crit-3, crit-4, crit-5), sequential adds never hit crit-3
  const remainingCritIds = ['crit-3', 'crit-4', 'crit-5'];
  const firstAdd = createUniqueDesignId('crit', remainingCritIds, 1);
  const secondAdd = createUniqueDesignId(
    'crit',
    [...remainingCritIds, firstAdd.id],
    firstAdd.nextCounter
  );
  const thirdAdd = createUniqueDesignId(
    'crit',
    [...remainingCritIds, firstAdd.id, secondAdd.id],
    secondAdd.nextCounter
  );

  const allIds = [...remainingCritIds, firstAdd.id, secondAdd.id, thirdAdd.id];
  assert.equal(new Set(allIds).size, allIds.length);
  assert.equal(thirdAdd.id, 'crit-6');
});

