import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeNextHomeStep,
  createInitialWheelGateState,
  evaluateWheelStep,
  TOTAL_HOME_STEPS,
  WHEEL_STEP_LOCK_MS,
} from './scrollStepper';

test('computeNextHomeStep clamps between 0 and TOTAL_HOME_STEPS - 1', () => {
  assert.equal(computeNextHomeStep(0, -1), 0);
  assert.equal(computeNextHomeStep(0, 1), 1);
  assert.equal(computeNextHomeStep(TOTAL_HOME_STEPS - 1, 1), TOTAL_HOME_STEPS - 1);
  assert.equal(computeNextHomeStep(2, -1), 1);
});

test('evaluateWheelStep allows only 1 step when user scrolls rapidly multiple times', () => {
  let gate = createInitialWheelGateState();
  let step = 0;

  // First wheel tick at t=1000ms -> accepted (moves 0 -> 1)
  const first = evaluateWheelStep({
    deltaY: 120,
    now: 1000,
    hasOpenOverlay: false,
    state: gate,
  });
  assert.equal(first.accept, true);
  assert.equal(first.direction, 1);
  gate = first.nextState;
  step = computeNextHomeStep(step, first.direction as 1);
  assert.equal(step, 1);

  // Rapid consecutive wheel ticks at t=1100, 1250, 1450 -> all blocked
  for (const ts of [1100, 1250, 1450]) {
    const res = evaluateWheelStep({
      deltaY: 120,
      now: ts,
      hasOpenOverlay: false,
      state: gate,
    });
    assert.equal(res.accept, false);
    gate = res.nextState;
  }
  assert.equal(step, 1);

  // After lock expires and user pauses briefly -> next wheel tick moves 1 -> 2
  const next = evaluateWheelStep({
    deltaY: 120,
    now: 1000 + WHEEL_STEP_LOCK_MS + 250,
    hasOpenOverlay: false,
    state: gate,
  });
  assert.equal(next.accept, true);
  step = computeNextHomeStep(step, next.direction as 1);
  assert.equal(step, 2);
});

test('evaluateWheelStep suppresses decaying trackpad inertia tail and open overlays', () => {
  const initial = createInitialWheelGateState();

  const overlayBlocked = evaluateWheelStep({
    deltaY: 120,
    now: 1000,
    hasOpenOverlay: true,
    state: initial,
  });
  assert.equal(overlayBlocked.accept, false);

  const first = evaluateWheelStep({
    deltaY: 100,
    now: 1000,
    hasOpenOverlay: false,
    state: initial,
  });
  let gate = first.nextState;

  // Inertia continues through lock expiry with decaying delta every 30ms
  const midTail = evaluateWheelStep({
    deltaY: 40,
    now: 1650,
    hasOpenOverlay: false,
    state: gate,
  });
  assert.equal(midTail.accept, false);
  gate = midTail.nextState;

  const afterLockTail = evaluateWheelStep({
    deltaY: 20,
    now: 1750,
    hasOpenOverlay: false,
    state: gate,
  });
  assert.equal(afterLockTail.accept, false);
});
