import test from 'node:test';
import assert from 'node:assert/strict';
import {
  adjustActivityHours,
  applyRebalancePlan,
  buildRebalancePlan,
  buildScheduleStripSegments,
  createInitialScheduleState,
  getActivityAdvice,
  getAdjustedOrder,
  getQuadrantHours,
  getQuadrantPercentages,
  getTimeManagementVerdict,
  getTotalScheduledHours,
  MAX_DAILY_HOURS,
  TIME_ACTIVITIES,
} from './timeManagement';

test('TIME_ACTIVITIES contains all 26 Chapter 3 activities with valid quadrants 1-4', () => {
  assert.equal(TIME_ACTIVITIES.length, 26);
  const quadrants = new Set(TIME_ACTIVITIES.map((a) => a.quadrant));
  assert.deepEqual([...quadrants].sort(), [1, 2, 3, 4]);
});

test('adjustActivityHours enforces 12-hour cap, tracks order, and removes zero-hour entries', () => {
  let state = createInitialScheduleState();
  state = adjustActivityHours(state, 2, 1); // UT1
  state = adjustActivityHours(state, 3, 1); // UT2
  state = adjustActivityHours(state, 2, 1);

  assert.deepEqual(state.order, [2, 3]);
  assert.equal(state.hoursByIndex[2], 2);
  assert.equal(state.hoursByIndex[3], 1);
  assert.equal(getTotalScheduledHours(state.hoursByIndex), 3);

  // Decrementing activity 3 to 0 removes it from order
  state = adjustActivityHours(state, 3, -1);
  assert.deepEqual(state.order, [2]);
  assert.equal(state.hoursByIndex[3], undefined);

  // Cannot exceed MAX_DAILY_HOURS (12)
  state = adjustActivityHours(state, 14, 10);
  assert.equal(getTotalScheduledHours(state.hoursByIndex), 12);
  const blocked = adjustActivityHours(state, 11, 1);
  assert.equal(getTotalScheduledHours(blocked.hoursByIndex), MAX_DAILY_HOURS);
  assert.equal(blocked.hoursByIndex[11], undefined);
});

test('getActivityAdvice flags warnings on high UT1, low UT2, high UT3, and high UT4 while skipping essential routine warnings', () => {
  const ut1 = TIME_ACTIVITIES[2]; // Làm bài tập để kịp nộp vào ngày mai
  const ut2 = TIME_ACTIVITIES[3]; // Đọc trước chương sắp học
  const ut3 = TIME_ACTIVITIES[11]; // Trả lời tin nhắn, email
  const ut4 = TIME_ACTIVITIES[14]; // Lướt mạng xã hội không mục đích
  const essential = TIME_ACTIVITIES[20]; // Ăn uống, nghỉ giải lao

  assert.equal(getActivityAdvice(ut1, 2).isWarning, false);
  assert.equal(getActivityAdvice(ut1, 3).isWarning, true);

  assert.equal(getActivityAdvice(ut2, 1).isWarning, true);
  assert.equal(getActivityAdvice(ut2, 2).isWarning, false);

  assert.equal(getActivityAdvice(essential, 1).isWarning, false);

  assert.equal(getActivityAdvice(ut3, 1).isWarning, false);
  assert.equal(getActivityAdvice(ut3, 2).isWarning, true);

  assert.equal(getActivityAdvice(ut4, 1).isWarning, false);
  assert.equal(getActivityAdvice(ut4, 2).isWarning, true);
});

test('getTimeManagementVerdict evaluates all 4 classification outcomes and wasted years accurately', () => {
  // 1. Wasted > 45% (6h UT4 + 6h UT1 = 50% waste -> 6/24*80 = 20 years)
  const highWaste = { 14: 6, 2: 6 };
  const wasteVerdict = getTimeManagementVerdict(highWaste);
  assert.equal(
    wasteVerdict.title,
    'Ngày này lãng phí nhiều hơn cả học sinh trung bình'
  );
  assert.equal(wasteVerdict.wastedHours, 6);
  assert.equal(wasteVerdict.wastedYearsText, '20 năm');
  assert.equal(
    wasteVerdict.wastedExplanation,
    'Trong 80 năm, bạn sẽ lãng phí 20 năm.'
  );

  // 2. Average student profile (~50% UT1, 5% UT2, 30% UT3, 15% UT4 -> 6h UT1, 1h UT2, 3h UT3, 2h UT4)
  const avgProfile = { 2: 6, 3: 1, 11: 3, 14: 2 };
  const avgVerdict = getTimeManagementVerdict(avgProfile);
  assert.equal(avgVerdict.title, 'Ngày này giống học sinh trung bình');
  assert.equal(avgVerdict.wastedHours, 5);
  assert.equal(avgVerdict.wastedYearsText, '16,7 năm');

  // 3. Excellent student profile (~20% UT1, 60% UT2, 15% UT3, 5% UT4 -> 3h UT1, 7h UT2, 1h UT3, 1h UT4)
  const goodProfile = { 2: 3, 3: 7, 11: 1, 14: 1 };
  const goodVerdict = getTimeManagementVerdict(goodProfile);
  assert.equal(goodVerdict.title, 'Ngày này giống học sinh giỏi');
  assert.equal(goodVerdict.wastedHours, 2);
  assert.equal(goodVerdict.wastedYearsText, '6,7 năm');
  assert.equal(
    goodVerdict.ut2Guidance,
    'Bạn đã dành đủ giờ cho UT2. Hãy giữ thói quen này mỗi ngày.'
  );

  // 4. Balanced/middle profile (4h UT1, 4h UT2, 2h UT3, 2h UT4)
  const midProfile = { 2: 4, 3: 4, 11: 2, 14: 2 };
  const midVerdict = getTimeManagementVerdict(midProfile);
  assert.equal(midVerdict.title, 'Bạn đang ở giữa hai nhóm');
});

test('buildRebalancePlan trims excess UT4 (>1h) and UT3 (>2h) and redistributes to non-routine UT2 up to 3h', () => {
  // 4h UT4 (index 14: 3h, index 15: 1h), 4h UT3 (index 11: 4h), 1h UT2 (index 3: 1h), 3h UT1 (index 2: 3h)
  const hours = { 14: 3, 15: 1, 11: 4, 3: 1, 2: 3 };
  const order = [14, 15, 11, 3, 2];

  const plan = buildRebalancePlan(hours, order);
  assert.ok(plan);

  assert.equal(plan.removeByIndex[14], 3);
  assert.equal(plan.removeByIndex[11], 2);

  const after = applyRebalancePlan(hours, plan);
  assert.equal(getTotalScheduledHours(after), 12);

  const afterQuadrants = getQuadrantHours(after);
  assert.equal(afterQuadrants[4], 1);
  assert.equal(afterQuadrants[3], 2);
  assert.equal(afterQuadrants[2], 6); // 1 + 5 freed hours
  assert.equal(after[3], 3); // capped at 3h
  assert.equal(after[20], undefined); // never suggests adding eating/bathing
  assert.equal(after[21], undefined);

  const pct = getQuadrantPercentages(after);
  assert.equal(Math.round(pct[1]), 50);

  const strip = buildScheduleStripSegments(after, getAdjustedOrder(order, after));
  assert.equal(strip.length, 12);
  assert.equal(strip.includes(0), false);
});

test('buildRebalancePlan returns null when UT4 <= 1 and UT3 <= 2', () => {
  const cleanHours = { 2: 4, 3: 6, 11: 1, 14: 1 };
  const plan = buildRebalancePlan(cleanHours, [2, 3, 11, 14]);
  assert.equal(plan, null);
});
