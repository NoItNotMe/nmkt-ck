export type QuadrantId = 1 | 2 | 3 | 4;

export interface QuadrantMeta {
  id: QuadrantId;
  code: 'UT1' | 'UT2' | 'UT3' | 'UT4';
  description: string;
  hex: string;
  badgeClass: string;
  barClass: string;
  dotClass: string;
}

export interface TimeActivity {
  index: number;
  title: string;
  emoji: string;
  quadrant: QuadrantId;
  tip: string;
  isEssentialRoutine?: boolean;
}

export interface TimeBenchmark {
  label: string;
  subtitle: string;
  percentages: readonly [number, number, number, number];
}

export interface TimeScheduleState {
  hoursByIndex: Record<number, number>;
  order: number[];
  adjustedHoursByIndex: Record<number, number> | null;
}

export interface ActivityAdvice {
  isWarning: boolean;
  text: string;
}

export interface RebalancePlan {
  removeByIndex: Record<number, number>;
  addByIndex: Record<number, number>;
}

export interface TimeManagementVerdict {
  title: string;
  description: string;
  wastedHours: number;
  wastedYearsText: string;
  wastedExplanation: string;
  ut2Hours: number;
  ut2Guidance: string;
}

export const MAX_DAILY_HOURS = 12;

export const QUADRANT_META: Record<QuadrantId, QuadrantMeta> = {
  1: {
    id: 1,
    code: 'UT1',
    description: 'Khẩn cấp, hướng mục tiêu',
    hex: '#c2410c',
    badgeClass: 'bg-orange-700 text-white',
    barClass: 'bg-orange-700',
    dotClass: 'bg-orange-700',
  },
  2: {
    id: 2,
    code: 'UT2',
    description: 'Không khẩn cấp, hướng mục tiêu',
    hex: '#15803d',
    badgeClass: 'bg-emerald-700 text-white',
    barClass: 'bg-emerald-700',
    dotClass: 'bg-emerald-700',
  },
  3: {
    id: 3,
    code: 'UT3',
    description: 'Khẩn cấp, không hướng mục tiêu',
    hex: '#1d4ed8',
    badgeClass: 'bg-blue-700 text-white',
    barClass: 'bg-blue-700',
    dotClass: 'bg-blue-700',
  },
  4: {
    id: 4,
    code: 'UT4',
    description: 'Không khẩn cấp, không hướng mục tiêu',
    hex: '#6b7280',
    badgeClass: 'bg-slate-500 text-white',
    barClass: 'bg-slate-500',
    dotClass: 'bg-slate-500',
  },
};

export const QUADRANT_ORDER: readonly QuadrantId[] = [1, 2, 3, 4] as const;

export const TIME_ACTIVITIES: readonly TimeActivity[] = [
  {
    index: 0,
    title: 'Đi học, nghe giảng thêm',
    emoji: '🎓',
    quadrant: 2,
    tip: 'Ghi chép ý chính và đặt câu hỏi ngay trên lớp để hiểu sâu hơn.',
  },
  {
    index: 1,
    title: 'Làm bài tập ngay khi được giao',
    emoji: '✅',
    quadrant: 2,
    tip: 'Làm sớm biến việc gấp thành việc không gấp.',
  },
  {
    index: 2,
    title: 'Làm bài tập để kịp nộp vào ngày mai',
    emoji: '📝',
    quadrant: 1,
    tip: 'Làm xong sớm sẽ không phải thức khuya.',
  },
  {
    index: 3,
    title: 'Đọc trước chương sắp học',
    emoji: '📖',
    quadrant: 2,
    tip: 'Đọc trước giúp nghe giảng hiểu nhanh hơn.',
  },
  {
    index: 4,
    title: 'Ôn tập thường xuyên cho kỳ thi sắp tới',
    emoji: '🗓️',
    quadrant: 2,
    tip: 'Ôn đều mỗi tuần giúp nhớ lâu và tránh áp lực sát ngày thi.',
  },
  {
    index: 5,
    title: 'Ôn gấp bài kiểm tra vào ngày mai',
    emoji: '⏰',
    quadrant: 1,
    tip: 'Ôn gấp cho điểm thấp hơn ôn sớm. Lần sau chia nhỏ từ tuần trước.',
  },
  {
    index: 6,
    title: 'Làm báo cáo nhóm sát deadline',
    emoji: '🔥',
    quadrant: 1,
    tip: 'Chia việc từ đầu tuần để khỏi dồn vào giờ chót.',
  },
  {
    index: 7,
    title: 'Soạn bài thuyết trình để kịp nộp',
    emoji: '🎤',
    quadrant: 1,
    tip: 'Chia nhỏ để làm dần, đừng dồn đến sát giờ.',
  },
  {
    index: 8,
    title: 'Vẽ sơ đồ tư duy để hệ thống kiến thức bài học',
    emoji: '🧠',
    quadrant: 2,
    tip: 'Ghi chú bằng sơ đồ giúp nhớ lâu và ôn nhanh.',
  },
  {
    index: 9,
    title: 'Học nhóm với bạn cùng lớp',
    emoji: '👥',
    quadrant: 2,
    tip: 'Học chung giúp bạn thấy chỗ mình còn bỏ sót.',
  },
  {
    index: 10,
    title: 'Lập thời gian biểu cho tuần mới',
    emoji: '✏️',
    quadrant: 2,
    tip: 'Lập vào cuối tuần và ưu tiên khung giờ cho việc quan trọng.',
  },
  {
    index: 11,
    title: 'Trả lời tin nhắn, email',
    emoji: '💬',
    quadrant: 3,
    tip: 'Gộp vào 1 hoặc 2 khung giờ cố định trong ngày.',
  },
  {
    index: 12,
    title: 'Nói chuyện điện thoại với bạn bè',
    emoji: '📞',
    quadrant: 4,
    tip: 'Báo trước giờ kết thúc để cuộc gọi không kéo dài.',
  },
  {
    index: 13,
    title: 'Bị tin nhắn, thông báo làm gián đoạn việc học',
    emoji: '🔔',
    quadrant: 3,
    tip: 'Tắt thông báo khi làm việc chính.',
  },
  {
    index: 14,
    title: 'Lướt mạng xã hội không mục đích',
    emoji: '📱',
    quadrant: 4,
    tip: 'Đặt hẹn giờ 30 phút và xếp vào cuối ngày.',
  },
  {
    index: 15,
    title: 'Chơi game giải trí',
    emoji: '🎮',
    quadrant: 4,
    tip: 'Đặt giới hạn thời gian trước khi bắt đầu chơi.',
  },
  {
    index: 16,
    title: 'Xem tivi, xem phim tại nhà',
    emoji: '📺',
    quadrant: 3,
    tip: 'Chỉ xem sau khi đã xong việc UT1 và UT2.',
  },
  {
    index: 17,
    title: 'Đi xem phim mới ra rạp',
    emoji: '🎬',
    quadrant: 3,
    tip: 'Chỉ đi sau khi đã xong việc quan trọng.',
  },
  {
    index: 18,
    title: 'Đi chơi, ăn uống cùng bạn bè',
    emoji: '🧋',
    quadrant: 4,
    tip: 'Chỉ nên là phần thưởng sau khi xong việc.',
  },
  {
    index: 19,
    title: 'Tập thể dục, chơi thể thao',
    emoji: '🏃',
    quadrant: 2,
    tip: 'Giữ đều mỗi ngày sẽ tỉnh táo hơn khi học.',
  },
  {
    index: 20,
    title: 'Ăn uống, nghỉ giải lao',
    emoji: '🍽️',
    quadrant: 2,
    tip: 'Ăn đủ bữa và nghỉ ngắn hợp lý giúp tái tạo năng lượng.',
    isEssentialRoutine: true,
  },
  {
    index: 21,
    title: 'Tắm rửa, vệ sinh cá nhân',
    emoji: '🚿',
    quadrant: 2,
    tip: 'Giữ nhịp sinh hoạt gọn gàng và đúng giờ.',
    isEssentialRoutine: true,
  },
  {
    index: 22,
    title: 'Làm việc nhà, phụ giúp gia đình',
    emoji: '🧹',
    quadrant: 3,
    tip: 'Sắp xếp vào khung giờ cố định để không ngắt quãng việc học.',
  },
  {
    index: 23,
    title: 'Dành thời gian cho sở thích cá nhân',
    emoji: '🎨',
    quadrant: 4,
    tip: 'Giữ ở mức vừa phải như phần thưởng cuối ngày.',
  },
  {
    index: 24,
    title: 'Thức khuya để sử dụng điện thoại hoặc giải trí',
    emoji: '🌙',
    quadrant: 4,
    tip: 'Ngủ sớm để giữ sự tập trung cho buổi học ngày hôm sau.',
  },
  {
    index: 25,
    title: 'Ngủ nướng, thức dậy muộn',
    emoji: '😴',
    quadrant: 4,
    tip: 'Ngủ đủ giấc là cần, ngủ thừa là lãng phí.',
  },
] as const;

export const TIME_BENCHMARKS: readonly TimeBenchmark[] = [
  {
    label: 'Học sinh trung bình',
    subtitle: 'hay bận mà kết quả kém',
    percentages: [50, 5, 30, 15],
  },
  {
    label: 'Học sinh giỏi',
    subtitle: 'đầu tư vào việc chưa gấp',
    percentages: [20, 60, 15, 5],
  },
] as const;

export function createInitialScheduleState(): TimeScheduleState {
  return {
    hoursByIndex: {},
    order: [],
    adjustedHoursByIndex: null,
  };
}

export function getTotalScheduledHours(
  hoursByIndex: Readonly<Record<number, number>>,
  order?: readonly number[]
): number {
  if (order) {
    return order.reduce((sum, idx) => sum + (hoursByIndex[idx] ?? 0), 0);
  }
  return Object.values(hoursByIndex).reduce((sum, hours) => sum + hours, 0);
}

export function getQuadrantHours(
  hoursByIndex: Readonly<Record<number, number>>
): [number, number, number, number, number] {
  const totals: [number, number, number, number, number] = [0, 0, 0, 0, 0];
  for (const [key, hours] of Object.entries(hoursByIndex)) {
    const idx = Number(key);
    const activity = TIME_ACTIVITIES[idx];
    if (activity && hours > 0) {
      totals[activity.quadrant] += hours;
    }
  }
  return totals;
}

export function getQuadrantPercentages(
  hoursByIndex: Readonly<Record<number, number>>
): [number, number, number, number] {
  const qHours = getQuadrantHours(hoursByIndex);
  const sum = qHours[1] + qHours[2] + qHours[3] + qHours[4];
  if (sum <= 0) {
    return [0, 0, 0, 0];
  }
  return [
    (qHours[1] / sum) * 100,
    (qHours[2] / sum) * 100,
    (qHours[3] / sum) * 100,
    (qHours[4] / sum) * 100,
  ];
}

export function adjustActivityHours(
  state: TimeScheduleState,
  activityIndex: number,
  delta: number
): TimeScheduleState {
  if (activityIndex < 0 || activityIndex >= TIME_ACTIVITIES.length) {
    return state;
  }
  const currentTotal = getTotalScheduledHours(state.hoursByIndex);
  if (delta > 0 && currentTotal + delta > MAX_DAILY_HOURS) {
    return state;
  }

  const currentHours = state.hoursByIndex[activityIndex] ?? 0;
  if (currentHours === 0 && delta < 0) {
    return state;
  }

  const nextHours = currentHours + delta;
  const nextHoursMap = { ...state.hoursByIndex };
  let nextOrder = state.order;

  if (nextHours <= 0) {
    delete nextHoursMap[activityIndex];
    nextOrder = state.order.filter((idx) => idx !== activityIndex);
  } else {
    nextHoursMap[activityIndex] = nextHours;
    if (currentHours === 0) {
      nextOrder = [...state.order, activityIndex];
    }
  }

  return {
    hoursByIndex: nextHoursMap,
    order: nextOrder,
    adjustedHoursByIndex: null,
  };
}

export function getActivityAdvice(
  activity: TimeActivity,
  hours: number
): ActivityAdvice {
  if (activity.quadrant === 1 && hours >= 3) {
    return {
      isWarning: true,
      text: `Dành ${hours} giờ chạy việc gấp là dấu hiệu dồn việc. Lần sau bắt đầu ngay khi được giao để nó thành việc UT2.`,
    };
  }
  if (activity.quadrant === 2 && hours === 1 && !activity.isEssentialRoutine) {
    return {
      isWarning: true,
      text: `Mới 1 giờ cho việc đáng đầu tư nhất. Thử tăng lên 2 giờ. ${activity.tip}`,
    };
  }
  if (activity.quadrant === 3 && hours >= 2) {
    return {
      isWarning: true,
      text: `Giảm xuống 1 giờ và chỉ làm sau khi xong UT1, UT2. ${activity.tip}`,
    };
  }
  if (activity.quadrant === 4 && hours >= 2) {
    return {
      isWarning: true,
      text: `Cắt còn 1 giờ, xem như phần thưởng sau khi xong việc. ${activity.tip}`,
    };
  }
  return {
    isWarning: false,
    text: activity.tip,
  };
}

export function buildRebalancePlan(
  hoursByIndex: Readonly<Record<number, number>>,
  order: readonly number[]
): RebalancePlan | null {
  const qHours = getQuadrantHours(hoursByIndex);
  const removeByIndex: Record<number, number> = {};
  const addByIndex: Record<number, number> = {};
  let freed = 0;

  const caps: readonly [QuadrantId, number][] = [
    [4, 1],
    [3, 2],
  ];

  for (const [quadrant, maxHours] of caps) {
    let over = qHours[quadrant] - maxHours;
    if (over <= 0) {
      continue;
    }
    const ids = order.filter((idx) => TIME_ACTIVITIES[idx]?.quadrant === quadrant);
    const temp: Record<number, number> = {};
    for (const idx of ids) {
      temp[idx] = hoursByIndex[idx] ?? 0;
    }
    while (over > 0) {
      const target = ids
        .filter((idx) => (temp[idx] ?? 0) > 0)
        .sort((a, b) => (temp[b] ?? 0) - (temp[a] ?? 0))[0];
      if (target === undefined) {
        break;
      }
      temp[target] -= 1;
      removeByIndex[target] = (removeByIndex[target] ?? 0) + 1;
      over -= 1;
      freed += 1;
    }
  }

  if (freed <= 0) {
    return null;
  }

  const ut2Indices = TIME_ACTIVITIES.filter(
    (act) => act.quadrant === 2 && !act.isEssentialRoutine
  ).map((act) => act.index);
  const currentUt2: Record<number, number> = {};
  for (const idx of ut2Indices) {
    currentUt2[idx] = hoursByIndex[idx] ?? 0;
  }

  for (let k = 0; k < freed; k += 1) {
    const underCap = ut2Indices.filter((idx) => currentUt2[idx] < 3);
    const existingPool = underCap.filter((idx) => currentUt2[idx] > 0);
    const candidates = (existingPool.length > 0 ? existingPool : underCap).sort(
      (a, b) => currentUt2[a] - currentUt2[b]
    );
    const chosen = candidates[0] ?? ut2Indices[0];
    currentUt2[chosen] += 1;
    addByIndex[chosen] = (addByIndex[chosen] ?? 0) + 1;
  }

  return {
    removeByIndex,
    addByIndex,
  };
}

export function applyRebalancePlan(
  hoursByIndex: Readonly<Record<number, number>>,
  plan: RebalancePlan
): Record<number, number> {
  const next: Record<number, number> = { ...hoursByIndex };
  for (const [key, amount] of Object.entries(plan.removeByIndex)) {
    const idx = Number(key);
    const updated = (next[idx] ?? 0) - amount;
    if (updated <= 0) {
      delete next[idx];
    } else {
      next[idx] = updated;
    }
  }
  for (const [key, amount] of Object.entries(plan.addByIndex)) {
    const idx = Number(key);
    next[idx] = (next[idx] ?? 0) + amount;
  }
  return next;
}

export function buildScheduleStripSegments(
  hoursByIndex: Readonly<Record<number, number>>,
  order: readonly number[]
): (0 | QuadrantId)[] {
  const segments: (0 | QuadrantId)[] = [];
  for (const idx of order) {
    const activity = TIME_ACTIVITIES[idx];
    const count = hoursByIndex[idx] ?? 0;
    if (!activity || count <= 0) {
      continue;
    }
    for (let k = 0; k < count; k += 1) {
      if (segments.length < MAX_DAILY_HOURS) {
        segments.push(activity.quadrant);
      }
    }
  }
  while (segments.length < MAX_DAILY_HOURS) {
    segments.push(0);
  }
  return segments;
}

export function getAdjustedOrder(
  order: readonly number[],
  adjustedHoursByIndex: Readonly<Record<number, number>>
): number[] {
  const extraIndices = Object.keys(adjustedHoursByIndex)
    .map(Number)
    .filter((idx) => !order.includes(idx));
  return [...order, ...extraIndices];
}

export function getTimeManagementVerdict(
  hoursByIndex: Readonly<Record<number, number>>
): TimeManagementVerdict {
  const p = getQuadrantPercentages(hoursByIndex);
  const qHours = getQuadrantHours(hoursByIndex);

  const distances = TIME_BENCHMARKS.map((bench) =>
    bench.percentages.reduce((sum, val, k) => sum + Math.abs(val - p[k]), 0)
  );
  const wastePercent = p[2] + p[3];

  let title: string;
  let description: string;

  if (wastePercent > 45) {
    title = 'Ngày này lãng phí nhiều hơn cả học sinh trung bình';
    description = `UT3 và UT4 chiếm ${Math.round(wastePercent)}% ngày của bạn, trong khi học sinh trung bình khoảng 45% và học sinh giỏi khoảng 20%. Gợi ý bên dưới giúp chuyển bớt sang UT2.`;
  } else if (distances[0] < distances[1] - 10) {
    title = 'Ngày này giống học sinh trung bình';
    description =
      'Học sinh trung bình dành khoảng một nửa thời gian cho việc gấp (UT1) và rất ít cho việc chuẩn bị sớm (UT2), nên luôn thấy bận mà kết quả vẫn kém.';
  } else if (distances[1] < distances[0] - 10 && wastePercent <= 30) {
    title = 'Ngày này giống học sinh giỏi';
    description =
      'Học sinh giỏi dành khoảng 60% thời gian cho việc quan trọng nhưng chưa gấp (UT2), nên việc gấp (UT1) tự nhiên giảm xuống.';
  } else {
    title = 'Bạn đang ở giữa hai nhóm';
    description = `Cách xếp ngày của bạn không nghiêng hẳn về nhóm nào. UT2 đang chiếm ${Math.round(p[1])}%, trong khi học sinh giỏi khoảng 60%.`;
  }

  const wastedHours = qHours[3] + qHours[4];
  const yearsNumber = Math.round(((wastedHours / 24) * 80) * 10) / 10;
  const wastedYearsValue = String(yearsNumber).replace('.', ',');
  const wastedYearsText = wastedHours > 0 ? `${wastedYearsValue} năm` : '0 năm';

  const wastedExplanation =
    wastedHours > 0
      ? `Trong 80 năm, bạn sẽ lãng phí ${wastedYearsValue} năm.`
      : 'Trong 80 năm, bạn không lãng phí năm nào.';

  const ut2Hours = qHours[2];
  const ut2Guidance =
    ut2Hours < 7
      ? `Học sinh giỏi dành khoảng 7 trong 12 giờ cho UT2. Bạn đang có ${ut2Hours} giờ.`
      : 'Bạn đã dành đủ giờ cho UT2. Hãy giữ thói quen này mỗi ngày.';

  return {
    title,
    description,
    wastedHours,
    wastedYearsText,
    wastedExplanation,
    ut2Hours,
    ut2Guidance,
  };
}
