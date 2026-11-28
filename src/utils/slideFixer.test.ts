import test from 'node:test';
import assert from 'node:assert/strict';
import {
  countFixedErrors,
  createAllFixedFlags,
  createInitialFixedFlags,
  getUnfixedErrorIds,
  pickHintErrorId,
  pickNextSlideTopic,
  SLIDE_TOPICS,
} from './slideFixer';

test('SLIDE_TOPICS includes all 5 slide layouts A through E with 3-7 errors each', () => {
  assert.equal(SLIDE_TOPICS.length, 5);
  assert.deepEqual(
    SLIDE_TOPICS.map((t) => t.layout),
    ['A', 'B', 'C', 'D', 'E']
  );

  SLIDE_TOPICS.forEach((topic) => {
    assert.ok(topic.errors.length >= 3 && topic.errors.length <= 7);
    topic.errors.forEach((err, index) => {
      assert.equal(err.id, index + 1);
      assert.ok(err.name.length > 0);
      assert.ok(err.rule.length > 0);
    });
  });
});

test('createInitialFixedFlags and countFixedErrors track progress accurately', () => {
  const topicA = SLIDE_TOPICS[0]; // 7 errors
  const flags = createInitialFixedFlags(topicA);
  assert.equal(countFixedErrors(flags, topicA), 0);
  assert.deepEqual(getUnfixedErrorIds(flags, topicA), [1, 2, 3, 4, 5, 6, 7]);

  flags[2] = true;
  flags[5] = true;
  assert.equal(countFixedErrors(flags, topicA), 2);
  assert.deepEqual(getUnfixedErrorIds(flags, topicA), [1, 3, 4, 6, 7]);

  const allFixed = createAllFixedFlags(topicA);
  assert.equal(countFixedErrors(allFixed, topicA), 7);
  assert.deepEqual(getUnfixedErrorIds(allFixed, topicA), []);
});

test('pickHintErrorId selects only from unfixed error ids and returns null when complete', () => {
  const topicD = SLIDE_TOPICS[3]; // 3 errors
  const flags = createInitialFixedFlags(topicD);
  flags[1] = true;
  flags[3] = true;

  assert.equal(pickHintErrorId(flags, topicD, () => 0), 2);

  flags[2] = true;
  assert.equal(pickHintErrorId(flags, topicD, () => 0), null);
});

test('pickNextSlideTopic avoids repeating the current slide topic', () => {
  const current = SLIDE_TOPICS[0];
  for (let i = 0; i < 10; i += 1) {
    const next = pickNextSlideTopic(current.id, () => i / 10);
    assert.notEqual(next.id, current.id);
  }
});
