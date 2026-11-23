export const TOTAL_HOME_STEPS = 6;
export const WHEEL_STEP_LOCK_MS = 700;
export const INERTIA_TAIL_GAP_MS = 180;
export const MIN_WHEEL_DELTA = 6;

export interface WheelGateState {
  lockedUntil: number;
  lastWheelAt: number;
  lastWheelDelta: number;
}

export interface WheelDecisionInput {
  deltaY: number;
  now: number;
  hasOpenOverlay: boolean;
  state: WheelGateState;
}

export interface WheelDecisionResult {
  accept: boolean;
  direction: -1 | 0 | 1;
  nextState: WheelGateState;
}

export function createInitialWheelGateState(): WheelGateState {
  return {
    lockedUntil: 0,
    lastWheelAt: 0,
    lastWheelDelta: 0,
  };
}

export function clampHomeStep(step: number, totalSteps = TOTAL_HOME_STEPS): number {
  if (totalSteps <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(totalSteps - 1, Math.round(step)));
}

export function computeNextHomeStep(
  currentStep: number,
  direction: -1 | 1,
  totalSteps = TOTAL_HOME_STEPS
): number {
  return clampHomeStep(currentStep + direction, totalSteps);
}

export function evaluateWheelStep({
  deltaY,
  now,
  hasOpenOverlay,
  state,
}: WheelDecisionInput): WheelDecisionResult {
  const absDelta = Math.abs(deltaY);

  if (hasOpenOverlay || absDelta < MIN_WHEEL_DELTA) {
    return {
      accept: false,
      direction: 0,
      nextState: state,
    };
  }

  // While transition lock is active, ignore all rapid wheel clicks
  if (now < state.lockedUntil) {
    return {
      accept: false,
      direction: 0,
      nextState: {
        lockedUntil: state.lockedUntil,
        lastWheelAt: now,
        lastWheelDelta: absDelta,
      },
    };
  }

  // Suppress continuous decaying trackpad inertia tail after lock expires
  const gapSinceLastEvent = now - state.lastWheelAt;
  const isDecayingInertiaTail =
    state.lastWheelAt > 0 &&
    gapSinceLastEvent < INERTIA_TAIL_GAP_MS &&
    absDelta <= state.lastWheelDelta;

  if (isDecayingInertiaTail) {
    return {
      accept: false,
      direction: 0,
      nextState: {
        lockedUntil: state.lockedUntil,
        lastWheelAt: now,
        lastWheelDelta: absDelta,
      },
    };
  }

  const direction: -1 | 1 = deltaY > 0 ? 1 : -1;

  return {
    accept: true,
    direction,
    nextState: {
      lockedUntil: now + WHEEL_STEP_LOCK_MS,
      lastWheelAt: now,
      lastWheelDelta: absDelta,
    },
  };
}
