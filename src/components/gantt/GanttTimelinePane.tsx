import { useMemo, useRef, useState } from 'react';
import {
  addCalendarDays,
  diffCalendarDays,
  isWeekendDate,
  parseDependencyString,
  parseIsoDate,
  SUMMARY_BAR_COLOR,
  ZOOM_DAY_WIDTH,
  type FlattenedTaskRow,
  type GanttTask,
  type GanttViewMode,
  type ResourceGroupRow,
  type TimelineZoomLevel,
} from '../../utils/ganttEngine';

export const GANTT_HEADER_HEIGHT = 56;
export const GANTT_ROW_HEIGHT = 40;

interface TimelineBucket {
  label: string;
  startIndex: number;
  spanDays: number;
  key: string;
}

interface DragState {
  taskId: number;
  mode: 'move' | 'resize-end';
  originClientX: number;
  initialStart: string;
  initialEnd: string;
  deltaDays: number;
}

interface GanttTimelinePaneProps {
  timelineRef: React.RefObject<HTMLDivElement | null>;
  viewMode: GanttViewMode;
  projectRows: readonly FlattenedTaskRow[];
  resourceGroups: readonly ResourceGroupRow[];
  selectedTaskId: number | null;
  zoomLevel: TimelineZoomLevel;
  rangeStartIso: string;
  totalDays: number;
  todayIso: string;
  showTodayLine: boolean;
  onSelectTask: (taskId: number) => void;
  onEditTask: (task: GanttTask) => void;
  onDragCommit: (
    taskId: number,
    mode: 'move' | 'resize-end',
    deltaDays: number
  ) => void;
  onScrollSync: (scrollTop: number) => void;
}

function buildTopBuckets(
  rangeStartIso: string,
  totalDays: number,
  zoomLevel: TimelineZoomLevel
): { topBuckets: TimelineBucket[]; bottomBuckets: TimelineBucket[] } {
  const days: string[] = [];
  for (let i = 0; i < totalDays; i++) {
    days.push(addCalendarDays(rangeStartIso, i));
  }

  if (zoomLevel === 'month') {
    const yearBuckets: TimelineBucket[] = [];
    const monthBuckets: TimelineBucket[] = [];

    for (let i = 0; i < days.length; i++) {
      const iso = days[i];
      const y = iso.slice(0, 4);
      const ym = iso.slice(0, 7);
      const mNum = Number(iso.slice(5, 7));

      const lastYear = yearBuckets[yearBuckets.length - 1];
      if (!lastYear || lastYear.key !== y) {
        yearBuckets.push({ label: y, startIndex: i, spanDays: 1, key: y });
      } else {
        lastYear.spanDays += 1;
      }

      const lastMonth = monthBuckets[monthBuckets.length - 1];
      if (!lastMonth || lastMonth.key !== ym) {
        monthBuckets.push({
          label: `Thg ${mNum}`,
          startIndex: i,
          spanDays: 1,
          key: ym,
        });
      } else {
        lastMonth.spanDays += 1;
      }
    }
    return { topBuckets: yearBuckets, bottomBuckets: monthBuckets };
  }

  if (zoomLevel === 'week') {
    const monthBuckets: TimelineBucket[] = [];
    const weekBuckets: TimelineBucket[] = [];

    for (let i = 0; i < days.length; i++) {
      const iso = days[i];
      const ym = iso.slice(0, 7);
      const mNum = Number(iso.slice(5, 7));
      const yNum = iso.slice(0, 4);
      const lastMonth = monthBuckets[monthBuckets.length - 1];
      if (!lastMonth || lastMonth.key !== ym) {
        monthBuckets.push({
          label: `Tháng ${mNum}/${yNum}`,
          startIndex: i,
          spanDays: 1,
          key: ym,
        });
      } else {
        lastMonth.spanDays += 1;
      }

      const dow = parseIsoDate(iso).getUTCDay();
      const lastWeek = weekBuckets[weekBuckets.length - 1];
      if (!lastWeek || dow === 1 || lastWeek.spanDays >= 7) {
        weekBuckets.push({
          label: `${iso.slice(8, 10)}/${iso.slice(5, 7)}`,
          startIndex: i,
          spanDays: 1,
          key: `w-${iso}`,
        });
      } else {
        lastWeek.spanDays += 1;
      }
    }
    return { topBuckets: monthBuckets, bottomBuckets: weekBuckets };
  }

  // 'day' or 'day-wide': Top tier = weeks (Sunday start like onlinegantt.com), bottom tier = individual days
  const weekBuckets: TimelineBucket[] = [];
  const dayBuckets: TimelineBucket[] = [];
  const weekdayShort = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  for (let i = 0; i < days.length; i++) {
    const iso = days[i];
    const dow = parseIsoDate(iso).getUTCDay();
    const lastWeek = weekBuckets[weekBuckets.length - 1];
    if (!lastWeek || dow === 0 || lastWeek.spanDays >= 7) {
      weekBuckets.push({
        label: iso,
        startIndex: i,
        spanDays: 1,
        key: `wk-${iso}`,
      });
    } else {
      lastWeek.spanDays += 1;
    }

    const dayNum = String(Number(iso.slice(8, 10)));
    dayBuckets.push({
      label: zoomLevel === 'day-wide' ? `${weekdayShort[dow]} ${dayNum}` : dayNum,
      startIndex: i,
      spanDays: 1,
      key: iso,
    });
  }

  return { topBuckets: weekBuckets, bottomBuckets: dayBuckets };
}

export function GanttTimelinePane({
  timelineRef,
  viewMode,
  projectRows,
  resourceGroups,
  selectedTaskId,
  zoomLevel,
  rangeStartIso,
  totalDays,
  todayIso,
  showTodayLine,
  onSelectTask,
  onEditTask,
  onDragCommit,
  onScrollSync,
}: GanttTimelinePaneProps) {
  const dayWidth = ZOOM_DAY_WIDTH[zoomLevel];
  const chartWidth = totalDays * dayWidth;

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [hoveredTask, setHoveredTask] = useState<{
    task: GanttTask;
    x: number;
    y: number;
  } | null>(null);
  const didDragRef = useRef(false);

  const { topBuckets, bottomBuckets } = useMemo(
    () => buildTopBuckets(rangeStartIso, totalDays, zoomLevel),
    [rangeStartIso, totalDays, zoomLevel]
  );

  // Build flat visual rows for timeline matching left pane 1:1
  const timelineVisualRows = useMemo(() => {
    if (viewMode === 'project') {
      return projectRows.map((row) => ({
        kind: 'task' as const,
        key: `task-${row.task.id}`,
        task: row.task,
        isSummary: row.isSummary,
      }));
    }
    const rows: Array<
      | { kind: 'group'; key: string; label: string }
      | { kind: 'task'; key: string; task: GanttTask; isSummary: boolean }
    > = [];
    for (const grp of resourceGroups) {
      rows.push({
        kind: 'group',
        key: `grp-${grp.resourceName}`,
        label: grp.resourceName,
      });
      for (const t of grp.tasks) {
        rows.push({
          kind: 'task',
          key: `res-${grp.resourceName}-${t.id}`,
          task: t,
          isSummary: false,
        });
      }
    }
    return rows;
  }, [viewMode, projectRows, resourceGroups]);

  function getPreviewDates(task: GanttTask): { start: string; end: string } {
    if (!dragState || dragState.taskId !== task.id) {
      return { start: task.start, end: task.end };
    }
    if (dragState.mode === 'move') {
      return {
        start: addCalendarDays(dragState.initialStart, dragState.deltaDays),
        end: addCalendarDays(dragState.initialEnd, dragState.deltaDays),
      };
    }
    const nextEnd = addCalendarDays(dragState.initialEnd, dragState.deltaDays);
    return {
      start: dragState.initialStart,
      end: nextEnd < dragState.initialStart ? dragState.initialStart : nextEnd,
    };
  }

  function startDrag(
    e: React.MouseEvent,
    task: GanttTask,
    mode: 'move' | 'resize-end'
  ) {
    e.stopPropagation();
    e.preventDefault();
    onSelectTask(task.id);
    didDragRef.current = false;

    const originX = e.clientX;
    const initStart = task.start;
    const initEnd = task.end;

    setDragState({
      taskId: task.id,
      mode,
      originClientX: originX,
      initialStart: initStart,
      initialEnd: initEnd,
      deltaDays: 0,
    });

    function onMouseMove(moveEvent: MouseEvent) {
      const pxDelta = moveEvent.clientX - originX;
      if (Math.abs(pxDelta) > 3) {
        didDragRef.current = true;
      }
      const nextDays = Math.round(pxDelta / dayWidth);
      setDragState((prev) =>
        prev ? { ...prev, deltaDays: nextDays } : null
      );
    }

    function onMouseUp(upEvent: MouseEvent) {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      const pxDelta = upEvent.clientX - originX;
      const finalDays = Math.round(pxDelta / dayWidth);
      setDragState(null);
      if (finalDays !== 0) {
        onDragCommit(task.id, mode, finalDays);
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  // Compute SVG dependency connector paths in Project View
  const dependencyPaths = useMemo(() => {
    if (viewMode !== 'project') return [];
    const rowIndexById = new Map<number, number>();
    const taskById = new Map<number, GanttTask>();
    projectRows.forEach((row, idx) => {
      rowIndexById.set(row.task.id, idx);
      taskById.set(row.task.id, row.task);
    });

    const paths: Array<{
      key: string;
      d: string;
      label: string;
      highlighted: boolean;
    }> = [];

    for (const row of projectRows) {
      const succ = row.task;
      const succRowIdx = rowIndexById.get(succ.id);
      if (succRowIdx === undefined) continue;
      const deps = parseDependencyString(succ.dependency);
      for (const dep of deps) {
        const pred = taskById.get(dep.predecessorId);
        const predRowIdx = rowIndexById.get(dep.predecessorId);
        if (!pred || predRowIdx === undefined) continue;

        const predDates = getPreviewDates(pred);
        const succDates = getPreviewDates(succ);

        const predStartX =
          diffCalendarDays(rangeStartIso, predDates.start) * dayWidth;
        const predEndX =
          (diffCalendarDays(rangeStartIso, predDates.end) + 1) * dayWidth;
        const succStartX =
          diffCalendarDays(rangeStartIso, succDates.start) * dayWidth;
        const succEndX =
          (diffCalendarDays(rangeStartIso, succDates.end) + 1) * dayWidth;

        const predMidX = pred.isMilestone
          ? predStartX + dayWidth / 2
          : undefined;
        const succMidX = succ.isMilestone
          ? succStartX + dayWidth / 2
          : undefined;

        const fromX =
          dep.type === 'SS' || dep.type === 'SF'
            ? predMidX ?? predStartX
            : predMidX !== undefined
              ? predMidX + 8
              : predEndX;
        const toX =
          dep.type === 'FF' || dep.type === 'SF'
            ? succMidX !== undefined
              ? succMidX + 8
              : succEndX
            : succMidX !== undefined
              ? succMidX - 9
              : succStartX;

        const fromY = predRowIdx * GANTT_ROW_HEIGHT + GANTT_ROW_HEIGHT / 2;
        const toY = succRowIdx * GANTT_ROW_HEIGHT + GANTT_ROW_HEIGHT / 2;

        const goingRight = toX >= fromX + 12;
        let d = '';
        if (dep.type === 'FS' || dep.type === 'SS') {
          if (goingRight) {
            const elbowX = fromX + Math.min(12, Math.max(6, (toX - fromX) / 2));
            d = `M ${fromX} ${fromY} L ${elbowX} ${fromY} L ${elbowX} ${toY} L ${toX} ${toY}`;
          } else {
            const outX = fromX + 10;
            const midY =
              toY > fromY
                ? fromY + GANTT_ROW_HEIGHT / 2
                : fromY - GANTT_ROW_HEIGHT / 2;
            const entryX = toX - 10;
            d = `M ${fromX} ${fromY} L ${outX} ${fromY} L ${outX} ${midY} L ${entryX} ${midY} L ${entryX} ${toY} L ${toX} ${toY}`;
          }
        } else {
          const outX = Math.max(fromX, toX) + 12;
          d = `M ${fromX} ${fromY} L ${outX} ${fromY} L ${outX} ${toY} L ${toX} ${toY}`;
        }

        const highlighted =
          selectedTaskId === succ.id || selectedTaskId === pred.id;

        paths.push({
          key: `${pred.id}-${succ.id}-${dep.type}`,
          d,
          label: `${pred.name} (${dep.type}) → ${succ.name}`,
          highlighted,
        });
      }
    }
    return paths;
  }, [
    viewMode,
    projectRows,
    rangeStartIso,
    dayWidth,
    selectedTaskId,
    dragState,
  ]);

  const todayOffsetDays = diffCalendarDays(rangeStartIso, todayIso);
  const todayVisible =
    showTodayLine && todayOffsetDays >= 0 && todayOffsetDays < totalDays;
  const todayLeftPx = todayOffsetDays * dayWidth + dayWidth / 2;

  const contentHeight = Math.max(
    timelineVisualRows.length * GANTT_ROW_HEIGHT,
    GANTT_ROW_HEIGHT * 6
  );

  return (
    <div
      ref={timelineRef}
      onScroll={(e) => onScrollSync(e.currentTarget.scrollTop)}
      data-testid="gantt-timeline-pane"
      className="relative flex-1 overflow-auto bg-white select-none"
    >
      <div style={{ width: chartWidth, minWidth: '100%' }}>
        {/* Sticky 2-Tier Timeline Header */}
        <div
          className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50"
          style={{ height: GANTT_HEADER_HEIGHT }}
        >
          {/* Tier 1 */}
          <div className="relative flex h-7 border-b border-slate-200 text-[11px] font-semibold tabular-nums text-slate-700">
            {topBuckets.map((bucket) => (
              <div
                key={bucket.key}
                style={{ width: bucket.spanDays * dayWidth }}
                className="flex shrink-0 items-center truncate border-r border-slate-200 px-2"
              >
                {bucket.label}
              </div>
            ))}
          </div>

          {/* Tier 2 */}
          <div className="relative flex h-7 text-[11px] font-medium tabular-nums text-slate-600">
            {bottomBuckets.map((bucket) => {
              const isTodayCol =
                (zoomLevel === 'day' || zoomLevel === 'day-wide') &&
                bucket.key === todayIso;
              const isWeekend =
                (zoomLevel === 'day' || zoomLevel === 'day-wide') &&
                isWeekendDate(bucket.key);
              return (
                <div
                  key={bucket.key}
                  style={{ width: bucket.spanDays * dayWidth }}
                  className={`flex shrink-0 items-center justify-center border-r border-slate-200/80 ${
                    isTodayCol && showTodayLine
                      ? 'bg-rose-600 font-bold text-white'
                      : isWeekend
                        ? 'bg-slate-100 text-slate-400'
                        : ''
                  }`}
                  title={isTodayCol ? `Hôm nay (${todayIso})` : undefined}
                >
                  {bucket.label}
                </div>
              );
            })}
            {todayVisible && zoomLevel !== 'day' && zoomLevel !== 'day-wide' && (
              <span
                style={{ left: todayLeftPx }}
                className="pointer-events-none absolute bottom-0 -translate-x-1/2 rounded-t bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold whitespace-nowrap text-white"
              >
                Hôm nay
              </span>
            )}
          </div>
        </div>

        {/* Chart Body */}
        <div
          className="relative"
          style={{ height: contentHeight, width: chartWidth }}
        >
          {/* Background Vertical Columns + Weekend Shading */}
          <div className="pointer-events-none absolute inset-0 flex">
            {zoomLevel === 'day' || zoomLevel === 'day-wide'
              ? bottomBuckets.map((bucket) => {
                  const weekend = isWeekendDate(bucket.key);
                  return (
                    <div
                      key={`col-${bucket.key}`}
                      style={{ width: dayWidth }}
                      className={`h-full shrink-0 border-r border-slate-100 ${
                        weekend ? 'bg-slate-50/90' : ''
                      }`}
                    />
                  );
                })
              : bottomBuckets.map((bucket) => (
                  <div
                    key={`col-${bucket.key}`}
                    style={{ width: bucket.spanDays * dayWidth }}
                    className="h-full shrink-0 border-r border-slate-100"
                  />
                ))}
          </div>

          {/* Horizontal Row Stripes */}
          {timelineVisualRows.map((row, rowIdx) => (
            <div
              key={row.key}
              onClick={() => {
                if (row.kind === 'task') {
                  onSelectTask(row.task.id);
                }
              }}
              style={{
                top: rowIdx * GANTT_ROW_HEIGHT,
                height: GANTT_ROW_HEIGHT,
              }}
              className={`absolute inset-x-0 border-b border-slate-100 ${
                row.kind === 'group'
                  ? 'bg-slate-100/75'
                  : selectedTaskId === row.task.id
                    ? 'bg-blue-50/45'
                    : 'hover:bg-slate-50/50'
              }`}
            />
          ))}

          {/* SVG Dependency Connector Lines */}
          {dependencyPaths.length > 0 && (
            <svg
              width={chartWidth}
              height={contentHeight}
              className="pointer-events-none absolute inset-0 z-10"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="gantt-arrow-default"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#2563eb" />
                </marker>
                <marker
                  id="gantt-arrow-active"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#0f172a" />
                </marker>
              </defs>
              {dependencyPaths.map((edge) => (
                <path
                  key={edge.key}
                  d={edge.d}
                  fill="none"
                  stroke={edge.highlighted ? '#0f172a' : '#3b82f6'}
                  strokeWidth={edge.highlighted ? 1.75 : 1.25}
                  markerEnd={
                    edge.highlighted
                      ? 'url(#gantt-arrow-active)'
                      : 'url(#gantt-arrow-default)'
                  }
                />
              ))}
            </svg>
          )}

          {/* Task Bars & Milestones */}
          {timelineVisualRows.map((row, rowIdx) => {
            if (row.kind !== 'task') return null;
            const task = row.task;
            const { start, end } = getPreviewDates(task);
            const startOffset = diffCalendarDays(rangeStartIso, start);
            const spanDays = Math.max(1, diffCalendarDays(start, end) + 1);
            const leftPx = startOffset * dayWidth;
            const widthPx = spanDays * dayWidth;
            const topPx = rowIdx * GANTT_ROW_HEIGHT;
            const isSelected = selectedTaskId === task.id;

            if (task.isMilestone) {
              const centerLeft = leftPx + dayWidth / 2;
              return (
                <div
                  key={`bar-${row.key}`}
                  style={{
                    top: topPx + GANTT_ROW_HEIGHT / 2 - 9,
                    left: centerLeft - 9,
                  }}
                  onMouseDown={(e) => startDrag(e, task, 'move')}
                  onDoubleClick={() => onEditTask(task)}
                  onMouseEnter={(e) =>
                    setHoveredTask({
                      task,
                      x: e.currentTarget.offsetLeft + 24,
                      y: topPx,
                    })
                  }
                  onMouseLeave={() => setHoveredTask(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Cột mốc ${task.name}, ngày ${start}`}
                  className={`absolute z-10 h-[18px] w-[18px] rotate-45 cursor-grab rounded-[2px] border-2 transition-shadow active:cursor-grabbing ${
                    isSelected
                      ? 'border-blue-700 bg-slate-900 ring-2 ring-blue-500/40'
                      : 'border-white bg-slate-700 shadow-xs hover:bg-slate-900'
                  }`}
                />
              );
            }

            const barColor = row.isSummary ? SUMMARY_BAR_COLOR : task.color;

            return (
              <div
                key={`bar-${row.key}`}
                style={{
                  top: topPx + 9,
                  left: leftPx,
                  width: Math.max(widthPx, 10),
                  height: 22,
                  backgroundColor: barColor,
                }}
                onMouseDown={
                  row.isSummary
                    ? (e) => {
                        e.stopPropagation();
                        onSelectTask(task.id);
                      }
                    : (e) => startDrag(e, task, 'move')
                }
                onDoubleClick={() => onEditTask(task)}
                onMouseEnter={() =>
                  setHoveredTask({
                    task,
                    x: leftPx + Math.max(widthPx, 10) + 10,
                    y: topPx,
                  })
                }
                onMouseLeave={() => setHoveredTask(null)}
                role="button"
                tabIndex={0}
                aria-label={`${task.name}: ${start} đến ${end}`}
                className={`group absolute z-10 flex items-center overflow-hidden rounded-[4px] shadow-xs transition-shadow ${
                  row.isSummary ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
                } ${
                  isSelected ? 'ring-2 ring-slate-900 ring-offset-1' : ''
                }`}
              >
                {/* Inline Bar Label when wide enough */}
                {widthPx >= 76 && (
                  <span className="pointer-events-none absolute inset-x-2 truncate text-[11px] font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                    {task.name}
                  </span>
                )}

                {/* Right-edge resize handle for non-summary tasks */}
                {!row.isSummary && (
                  <div
                    onMouseDown={(e) => startDrag(e, task, 'resize-end')}
                    title="Kéo để thay đổi thời lượng"
                    className="absolute inset-y-0 right-0 w-2 cursor-ew-resize opacity-0 transition-opacity group-hover:bg-white/40 group-hover:opacity-100"
                  />
                )}
              </div>
            );
          })}

          {/* Today Marker Line */}
          {todayVisible && (
            <div
              data-testid="gantt-today-line"
              aria-label={`Đường mốc hôm nay ${todayIso}`}
              style={{ left: todayLeftPx }}
              className="pointer-events-none absolute inset-y-0 z-20 w-[1.5px] bg-rose-600/85"
            />
          )}

          {/* Hover Tooltip */}
          {hoveredTask && !dragState && (
            <div
              style={{
                left: Math.min(hoveredTask.x, Math.max(12, chartWidth - 240)),
                top: Math.max(4, hoveredTask.y - 4),
              }}
              className="pointer-events-none absolute z-30 w-56 rounded-lg border border-slate-200 bg-white/95 p-2.5 text-xs shadow-lg backdrop-blur-xs"
            >
              <p className="font-bold text-slate-900">
                #{hoveredTask.task.id} · {hoveredTask.task.name}
              </p>
              <div className="mt-1 space-y-0.5 text-[11px] tabular-nums text-slate-600">
                <p>
                  Thời gian: {hoveredTask.task.start} → {hoveredTask.task.end}
                </p>
                <p>
                  Thời lượng: {hoveredTask.task.duration} ngày
                </p>
                {hoveredTask.task.resources.length > 0 && (
                  <p className="truncate">
                    Nhân sự: {hoveredTask.task.resources.join(', ')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
