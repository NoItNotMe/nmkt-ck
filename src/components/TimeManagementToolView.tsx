import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw, Sparkles, X } from 'lucide-react';
import {
  adjustActivityHours,
  applyRebalancePlan,
  buildRebalancePlan,
  buildScheduleStripSegments,
  createInitialScheduleState,
  getActivityAdvice,
  getAdjustedOrder,
  getQuadrantPercentages,
  getTimeManagementVerdict,
  getTotalScheduledHours,
  MAX_DAILY_HOURS,
  QUADRANT_META,
  QUADRANT_ORDER,
  type QuadrantId,
  TIME_ACTIVITIES,
  TIME_BENCHMARKS,
  type TimeScheduleState,
} from '../utils/timeManagement';

function SegmentedTimeBar({
  label,
  subtitle,
  percentages,
  isEmpty = false,
}: {
  label: string;
  subtitle: string;
  percentages: readonly [number, number, number, number];
  isEmpty?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2 text-xs sm:text-[13px]">
        <span className="font-semibold text-slate-900">{label}</span>
        <span className="text-right text-slate-500">{subtitle}</span>
      </div>
      <div
        className="flex h-8 w-full overflow-hidden rounded-lg bg-slate-200/80"
        role="img"
        aria-label={`${label}: ${
          isEmpty
            ? 'chưa có dữ liệu'
            : QUADRANT_ORDER.map(
                (q, idx) =>
                  `${QUADRANT_META[q].code} ${Math.round(percentages[idx])}%`
              ).join(', ')
        }`}
      >
        {!isEmpty &&
          QUADRANT_ORDER.map((quadrantId, idx) => {
            const percent = percentages[idx];
            if (percent <= 0) {
              return null;
            }
            const meta = QUADRANT_META[quadrantId];
            return (
              <div
                key={quadrantId}
                style={{ width: `${percent}%` }}
                className={`flex items-center justify-center text-[11px] font-bold tabular-nums text-white transition-[width] duration-300 motion-reduce:transition-none ${meta.barClass}`}
              >
                {percent >= 8 ? `${Math.round(percent)}%` : ''}
              </div>
            );
          })}
      </div>
    </div>
  );
}

function ScheduleHourStrip({
  segments,
  compact = false,
}: {
  segments: readonly (0 | QuadrantId)[];
  compact?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-12 gap-1 ${compact ? 'my-2.5' : 'mb-3.5'}`}
      aria-hidden="true"
    >
      {segments.map((quadrant, idx) => (
        <span
          key={idx}
          className={`h-3.5 rounded-sm transition-colors duration-200 ${
            quadrant === 0
              ? 'bg-slate-200/80'
              : QUADRANT_META[quadrant].barClass
          }`}
        />
      ))}
    </div>
  );
}

export function TimeManagementToolView() {
  const [schedule, setSchedule] = useState<TimeScheduleState>(() =>
    createInitialScheduleState()
  );
  const verdictRef = useRef<HTMLElement | null>(null);
  const hasScrolledVerdictRef = useRef(false);

  const totalHours = getTotalScheduledHours(schedule.hoursByIndex);
  const isFull = totalHours >= MAX_DAILY_HOURS;
  const userPercentages = getQuadrantPercentages(schedule.hoursByIndex);
  const stripSegments = buildScheduleStripSegments(
    schedule.hoursByIndex,
    schedule.order
  );

  const verdict = isFull
    ? getTimeManagementVerdict(schedule.hoursByIndex)
    : null;
  const rebalancePlan = isFull
    ? buildRebalancePlan(schedule.hoursByIndex, schedule.order)
    : null;

  useEffect(() => {
    if (!isFull) {
      hasScrolledVerdictRef.current = false;
      return;
    }
    if (!hasScrolledVerdictRef.current && verdictRef.current) {
      hasScrolledVerdictRef.current = true;
      const timer = window.setTimeout(() => {
        verdictRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [isFull]);

  function handleAdjustHours(activityIndex: number, delta: number) {
    setSchedule((prev) => adjustActivityHours(prev, activityIndex, delta));
  }

  function handleRemoveActivity(activityIndex: number) {
    setSchedule((prev) => {
      const current = prev.hoursByIndex[activityIndex] ?? 0;
      if (current <= 0) {
        return prev;
      }
      return adjustActivityHours(prev, activityIndex, -current);
    });
  }

  function handleApplyPlan() {
    if (!rebalancePlan) {
      return;
    }
    setSchedule((prev) => ({
      ...prev,
      adjustedHoursByIndex: applyRebalancePlan(
        prev.hoursByIndex,
        rebalancePlan
      ),
    }));
  }

  function handleUndoPlan() {
    setSchedule((prev) => ({
      ...prev,
      adjustedHoursByIndex: null,
    }));
  }

  function handleReset() {
    hasScrolledVerdictRef.current = false;
    setSchedule(createInitialScheduleState());
  }

  const adjustedHours = schedule.adjustedHoursByIndex;
  const adjustedPercentages = adjustedHours
    ? getQuadrantPercentages(adjustedHours)
    : null;
  const adjustedStripSegments = adjustedHours
    ? buildScheduleStripSegments(
        adjustedHours,
        getAdjustedOrder(schedule.order, adjustedHours)
      )
    : null;

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      {/* Editorial Header aligned with Muc 1 & Muc 2 */}
      <header className="border-b border-slate-200 pb-6 sm:pb-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="font-semibold text-blue-700">
            Chương 3: Quản lý thời gian hiệu quả
          </span>
          <span aria-hidden="true">·</span>
          <span>Một ngày của bạn</span>
        </div>

        <h1 className="mt-2.5 max-w-3xl text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          Một ngày của bạn
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          Hôm nay bạn có 12 giờ tự do sau giờ học. Chạm vào hoạt động để thêm 1
          giờ, rồi tăng giảm số giờ từng việc ở bên dưới. Công cụ phân loại, góp
          ý từng việc và đề xuất cách chỉnh ngày cho hợp lý.
        </p>
      </header>

      {/* Two-Zone Workspace */}
      <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:mt-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Zone: Activity Picker + Daily Schedule */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Card 1: Activity Picker */}
          <section
            aria-labelledby="time-picker-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
              <h2
                id="time-picker-heading"
                className="text-base font-bold tracking-tight text-slate-900"
              >
                Chọn hoạt động
              </h2>
              <span className="text-xs font-medium tabular-nums text-slate-500">
                {isFull
                  ? 'Đã đủ 12 / 12 giờ'
                  : `Chạm để thêm 1 giờ (còn ${MAX_DAILY_HOURS - totalHours} giờ)`}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TIME_ACTIVITIES.map((activity) => {
                const count = schedule.hoursByIndex[activity.index] ?? 0;
                return (
                  <button
                    key={activity.index}
                    type="button"
                    disabled={isFull}
                    onClick={() => handleAdjustHours(activity.index, 1)}
                    aria-label={`Thêm 1 giờ cho ${activity.title}${
                      count > 0 ? ` (đang có ${count} giờ)` : ''
                    }`}
                    className={`flex min-h-[48px] items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-45 ${
                      count > 0
                        ? 'border-slate-300 bg-slate-50 font-medium text-slate-950 hover:border-slate-400'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50/80'
                    }`}
                  >
                    <span className="text-lg leading-none" aria-hidden="true">
                      {activity.emoji}
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">
                      {activity.title}
                    </span>
                    {count > 0 && (
                      <span className="inline-flex h-5 min-w-[22px] shrink-0 items-center justify-center rounded-full bg-slate-900 px-1.5 text-xs font-bold tabular-nums text-white">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Card 2: Your Day */}
          <section
            aria-labelledby="time-day-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
              <h2
                id="time-day-heading"
                className="text-base font-bold tracking-tight text-slate-900"
              >
                Ngày của bạn
              </h2>
              <span className="text-xs font-semibold tabular-nums text-slate-700">
                {totalHours} / {MAX_DAILY_HOURS} giờ
              </span>
            </div>

            <div className="mt-4">
              <ScheduleHourStrip segments={stripSegments} />
            </div>

            {schedule.order.length === 0 ? (
              <p className="py-3 text-sm text-slate-500">
                Chưa có giờ nào. Chạm vào một hoạt động ở trên để bắt đầu.
              </p>
            ) : (
              <div className="divide-y divide-slate-200">
                {schedule.order.map((activityIndex) => {
                  const activity = TIME_ACTIVITIES[activityIndex];
                  const hours = schedule.hoursByIndex[activityIndex] ?? 0;
                  if (!activity || hours <= 0) {
                    return null;
                  }
                  const quadrantMeta = QUADRANT_META[activity.quadrant];
                  const advice = getActivityAdvice(activity, hours);

                  return (
                    <div
                      key={activity.index}
                      className="py-3.5 first:pt-2 last:pb-2"
                    >
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className="text-xl leading-none"
                          aria-hidden="true"
                        >
                          {activity.emoji}
                        </span>
                        <span className="min-w-[150px] flex-1 text-sm font-medium text-slate-900">
                          {activity.title}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide ${quadrantMeta.badgeClass}`}
                        >
                          {quadrantMeta.code}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleAdjustHours(activity.index, -1)
                            }
                            aria-label={`Giảm 1 giờ ${activity.title}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="min-w-[52px] text-center text-xs font-semibold tabular-nums text-slate-800">
                            {hours} giờ
                          </span>
                          <button
                            type="button"
                            disabled={isFull}
                            onClick={() => handleAdjustHours(activity.index, 1)}
                            aria-label={`Tăng 1 giờ ${activity.title}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveActivity(activity.index)}
                            aria-label={`Bỏ hoạt động ${activity.title}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                          >
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <p
                        className={`mt-2 text-xs leading-relaxed sm:text-[13px] ${
                          advice.isWarning
                            ? 'font-medium text-amber-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {advice.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3.5 text-xs text-slate-500">
              <span className="font-medium tabular-nums">
                {totalHours} / {MAX_DAILY_HOURS} giờ
              </span>
              <button
                type="button"
                onClick={handleReset}
                disabled={schedule.order.length === 0}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Xếp lại từ đầu</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Zone: Live Benchmark Comparison + Verdict & Rebalance Plan */}
        <aside
          aria-label="Phân tích thời gian trong ngày"
          className="flex flex-col gap-5 lg:sticky lg:top-20 lg:col-span-5"
        >
          {/* Card 3: Comparison Bars */}
          <section
            aria-labelledby="time-comparison-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <h2
              id="time-comparison-heading"
              className="border-b border-slate-100 pb-3 text-base font-bold tracking-tight text-slate-900"
            >
              Thời gian của bạn so với hai nhóm
            </h2>

            <div className="mt-4 space-y-3.5">
              <SegmentedTimeBar
                label="Bạn"
                subtitle={
                  totalHours > 0
                    ? `đã xếp ${totalHours} giờ`
                    : 'chưa xếp giờ nào'
                }
                percentages={userPercentages}
                isEmpty={totalHours === 0}
              />

              {TIME_BENCHMARKS.map((benchmark) => (
                <SegmentedTimeBar
                  key={benchmark.label}
                  label={benchmark.label}
                  subtitle={benchmark.subtitle}
                  percentages={benchmark.percentages}
                />
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-100 pt-3.5 text-xs text-slate-600">
              {QUADRANT_ORDER.map((quadrantId) => {
                const meta = QUADRANT_META[quadrantId];
                return (
                  <span
                    key={quadrantId}
                    className="inline-flex items-center gap-1.5"
                  >
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-xs ${meta.dotClass}`}
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-slate-800">
                        {meta.code}
                      </strong>
                      : {meta.description.toLowerCase()}
                    </span>
                  </span>
                );
              })}
            </div>
          </section>

          {/* Card 4: Verdict & Rebalance Plan */}
          {verdict ? (
            <section
              ref={verdictRef}
              aria-live="polite"
              aria-labelledby="time-verdict-heading"
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <h2
                id="time-verdict-heading"
                className="text-lg font-bold leading-snug text-slate-900"
              >
                {verdict.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {verdict.description}
              </p>

              <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
                <p className="text-3xl font-extrabold tracking-tight tabular-nums text-slate-950">
                  {verdict.wastedYearsText}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-700 sm:text-[13px]">
                  {verdict.wastedExplanation}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-[13px]">
                  {verdict.ut2Guidance}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm">
                {rebalancePlan ? (
                  <>
                    <p className="font-semibold text-slate-900">
                      Gợi ý chỉnh ngày:{' '}
                      <span className="font-normal text-slate-700">
                        cắt bớt việc không hướng mục tiêu và chuyển sang việc
                        đáng đầu tư.
                      </span>
                    </p>
                    <ul className="mt-2.5 space-y-1 pl-4 text-xs leading-relaxed text-slate-700 sm:text-[13px] list-disc">
                      {Object.entries(rebalancePlan.removeByIndex).map(
                        ([key, amount]) => {
                          const act = TIME_ACTIVITIES[Number(key)];
                          if (!act) return null;
                          return (
                            <li key={`rm-${act.index}`}>
                              − {amount} giờ {act.emoji} {act.title}
                            </li>
                          );
                        }
                      )}
                      {Object.entries(rebalancePlan.addByIndex).map(
                        ([key, amount]) => {
                          const act = TIME_ACTIVITIES[Number(key)];
                          if (!act) return null;
                          return (
                            <li key={`add-${act.index}`}>
                              + {amount} giờ {act.emoji} {act.title}
                            </li>
                          );
                        }
                      )}
                    </ul>

                    {adjustedPercentages && adjustedStripSegments ? (
                      <div className="mt-4 border-t border-slate-200 pt-3.5">
                        <SegmentedTimeBar
                          label="Sau khi chỉnh"
                          subtitle="nếu làm theo gợi ý"
                          percentages={adjustedPercentages}
                        />
                        <ScheduleHourStrip
                          segments={adjustedStripSegments}
                          compact
                        />
                        <button
                          type="button"
                          onClick={handleUndoPlan}
                          className="mt-1 inline-flex min-h-[36px] items-center rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                        >
                          Xóa sau khi chỉnh
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyPlan}
                        className="mt-3.5 inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:text-sm"
                      >
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        <span>Áp dụng gợi ý</span>
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-xs leading-relaxed text-slate-700 sm:text-[13px]">
                    Không có giờ UT3 hay UT4 nào cần cắt.{' '}
                    {verdict.ut2Hours < 7
                      ? 'Nếu muốn thêm giờ cho UT2, hãy giảm bớt giờ UT1 bằng cách làm bài sớm hơn trong những ngày tới.'
                      : 'Ngày của bạn đã cân đối.'}
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section
              aria-live="polite"
              className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-xs leading-relaxed text-slate-600 sm:text-[13px]"
            >
              Xếp đủ{' '}
              <strong className="font-semibold text-slate-900">12 giờ</strong>{' '}
              (còn {MAX_DAILY_HOURS - totalHours} giờ) để xem nhận xét nhóm, số
              năm lãng phí quy đổi trong 80 năm và gợi ý chỉnh lại ngày.
            </section>
          )}
        </aside>
      </div>

    </div>
  );
}
