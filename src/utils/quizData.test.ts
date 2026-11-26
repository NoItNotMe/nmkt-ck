import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateQuizScores,
  clampRobotScore,
  getRobotTotalPoints,
  INITIAL_ROBOT_SCORES,
  isMajorDeterminationUnlocked,
  MAJORS,
  QUIZ_QUESTIONS,
  ROBOT_ATTRIBUTES,
  ROBOT_MAX_TOTAL_POINTS,
  type OptionLetter,
} from './quizData';

test('QUIZ_QUESTIONS contains exactly 20 questions without title and with options A, B, C, D', () => {
  assert.equal(QUIZ_QUESTIONS.length, 20);
  for (let i = 0; i < 20; i++) {
    const q = QUIZ_QUESTIONS[i];
    assert.equal(q.id, i + 1);
    assert.equal('title' in q, false);
    assert.ok(q.context.trim().length > 0);
    assert.equal(q.options.length, 4);
    assert.deepEqual(
      q.options.map((o) => o.letter),
      ['A', 'B', 'C', 'D']
    );
  }
});

test('calculateQuizScores handles empty answers gracefully', () => {
  const result = calculateQuizScores({});
  assert.equal(result.totalAnswered, 0);
  assert.equal(result.robotTotalPoints, 0);
  assert.equal(result.totalPoints, 0);
  assert.deepEqual(result.percentages, {
    tdh: 25,
    dtvt: 25,
    ktd: 25,
    tkvm: 25,
  });
  assert.ok(result.topMajor);
});

test('calculateQuizScores accurately accumulates 50% quiz and 50% robot weights', () => {
  // Question 1:
  // A -> ktd (y)
  // B -> tkvm + dtvt + tdh (x + z + t)
  // C -> tkvm + tdh (x + t)
  // D -> ktd + tdh (y + t)
  const resultA = calculateQuizScores({ 1: 'A' });
  assert.equal(resultA.scores.ktd, 0.5);
  assert.equal(resultA.scores.tdh, 0);
  assert.equal(resultA.scores.dtvt, 0);
  assert.equal(resultA.scores.tkvm, 0);
  assert.equal(resultA.percentages.ktd, 100);

  const resultB = calculateQuizScores({ 1: 'B' });
  assert.equal(resultB.scores.tkvm, 0.5);
  assert.equal(resultB.scores.dtvt, 0.5);
  assert.equal(resultB.scores.tdh, 0.5);
  assert.equal(resultB.scores.ktd, 0);

  const combined = calculateQuizScores(
    { 1: 'A' },
    { tkvm: 10, tdh: 5, dtvt: 0, ktd: 0 }
  );
  assert.ok(Math.abs(combined.scores.ktd - 0.5) < 1e-9);
  assert.ok(Math.abs(combined.scores.tkvm - 5.0) < 1e-9);
  assert.ok(Math.abs(combined.scores.tdh - 2.5) < 1e-9);
});

test('calculateQuizScores determines highest major and correctly sums percentages to 100', () => {
  const answers: Record<number, OptionLetter> = {
    1: 'A',
    2: 'D',
    3: 'C',
    7: 'A',
    8: 'C',
    11: 'B',
    14: 'A',
    17: 'A',
    20: 'A',
  };
  const result = calculateQuizScores(answers);
  assert.equal(result.totalAnswered, 9);
  assert.equal(result.topMajor.major.key, 'ktd');
  const sumPercent =
    result.percentages.tdh +
    result.percentages.dtvt +
    result.percentages.ktd +
    result.percentages.tkvm;
  assert.equal(sumPercent, 100);
});

test('MAJORS contains all 4 technical specializations', () => {
  assert.ok(MAJORS.tdh);
  assert.ok(MAJORS.dtvt);
  assert.ok(MAJORS.ktd);
  assert.ok(MAJORS.tkvm);
  assert.equal(MAJORS.tdh.code, 'TDH');
  assert.equal(MAJORS.dtvt.code, 'DTVT');
  assert.equal(MAJORS.ktd.code, 'KTD');
  assert.equal(MAJORS.tkvm.code, 'TKVM');
});

test('ROBOT_ATTRIBUTES has 4 distinct colored criteria and clampRobotScore enforces max 10 per bar and 15 total', () => {
  assert.equal(ROBOT_ATTRIBUTES.length, 4);
  const uniqueColors = new Set(ROBOT_ATTRIBUTES.map((a) => a.color));
  assert.equal(uniqueColors.size, 4);

  let scores = { ...INITIAL_ROBOT_SCORES };
  assert.equal(isMajorDeterminationUnlocked(scores, 0), false);
  assert.equal(isMajorDeterminationUnlocked(scores, 1), false);

  scores = clampRobotScore(scores, 'tkvm', 12);
  assert.equal(scores.tkvm, 10);
  assert.equal(isMajorDeterminationUnlocked(scores, 1), false);

  scores = clampRobotScore(scores, 'tdh', 8);
  assert.equal(scores.tdh, 5);
  assert.equal(getRobotTotalPoints(scores), ROBOT_MAX_TOTAL_POINTS);
  assert.equal(isMajorDeterminationUnlocked(scores, 0), false);
  assert.equal(isMajorDeterminationUnlocked(scores, 1), true);

  scores = clampRobotScore(scores, 'dtvt', 4);
  assert.equal(scores.dtvt, 0);
  assert.equal(getRobotTotalPoints(scores), 15);
  assert.equal(isMajorDeterminationUnlocked(scores, 1), true);
});

test('calculateQuizScores incorporates robot slider scores into major rankings', () => {
  const result = calculateQuizScores(
    {},
    { tkvm: 9, tdh: 3, dtvt: 2, ktd: 1 }
  );
  assert.equal(result.robotTotalPoints, 15);
  assert.equal(result.topMajor.major.key, 'tkvm');
  assert.equal(result.interpretationType, 'dominant');
  assert.equal(
    result.percentages.tdh +
      result.percentages.dtvt +
      result.percentages.ktd +
      result.percentages.tkvm,
    100
  );
});

test('QUIZ_QUESTIONS matches the exact 20x4 scoring matrix (x=tkvm, y=ktd, z=dtvt, t=tdh)', () => {
  const map = { x: 'tkvm', y: 'ktd', z: 'dtvt', t: 'tdh' } as const;
  const expectedTable: Record<
    number,
    Record<OptionLetter, (keyof typeof map)[]>
  > = {
    1: { A: ['y'], B: ['x', 'z', 't'], C: ['x', 't'], D: ['y', 't'] },
    2: { A: ['x'], B: ['z', 't'], C: ['t'], D: ['y'] },
    3: { A: ['z'], B: ['x', 'z'], C: ['y'], D: ['x', 't'] },
    4: { A: ['t'], B: ['x', 'z'], C: ['y', 't'], D: ['x'] },
    5: { A: ['x'], B: ['x', 'y'], C: ['z'], D: ['x', 't'] },
    6: { A: ['z'], B: ['x', 't'], C: ['x', 'z'], D: ['y', 'z'] },
    7: { A: ['y'], B: ['x', 'y'], C: ['y', 't'], D: ['x', 'z', 't'] },
    8: { A: ['z'], B: ['x'], C: ['x', 'y'], D: ['t'] },
    9: { A: ['z'], B: ['x', 'z'], C: ['z', 't'], D: ['y', 'z'] },
    10: { A: ['y', 't'], B: ['z', 't'], C: ['y'], D: ['x', 'y', 'z', 't'] },
    11: { A: ['z'], B: ['y'], C: ['x', 'z', 't'], D: ['x', 'z'] },
    12: { A: ['y'], B: ['y', 't'], C: ['z', 't'], D: ['x', 'z'] },
    13: { A: ['z', 't'], B: ['t'], C: ['x', 'z'], D: ['y', 't'] },
    14: { A: ['y'], B: ['z'], C: ['y', 'z', 't'], D: ['x', 't'] },
    15: { A: ['t'], B: ['z', 't'], C: ['y', 't'], D: ['x'] },
    16: { A: ['x', 'z'], B: ['z', 't'], C: ['x', 'y'], D: ['y', 't'] },
    17: { A: ['y'], B: ['y', 'z', 't'], C: ['y', 't'], D: ['x', 'z'] },
    18: { A: ['x', 'z', 't'], B: ['x', 'z'], C: ['t'], D: ['y', 'z'] },
    19: { A: ['x'], B: ['z'], C: ['y', 't'], D: ['t'] },
    20: { A: ['y'], B: ['z'], C: ['x'], D: ['t'] },
  };

  for (const q of QUIZ_QUESTIONS) {
    for (const opt of q.options) {
      const expected = expectedTable[q.id][opt.letter]
        .map((code) => map[code])
        .sort();
      const actual = [...opt.majors].sort();
      assert.deepEqual(
        actual,
        expected,
        `Question ${q.id} option ${opt.letter} mismatch`
      );
    }
  }
});
