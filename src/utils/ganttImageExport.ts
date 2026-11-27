import {
  addCalendarDays,
  diffCalendarDays,
  isWeekendDate,
  parseDependencyString,
  parseIsoDate,
  SUMMARY_BAR_COLOR,
  ZOOM_DAY_WIDTH,
  type FlattenedTaskRow,
  type GanttSettings,
  type GanttTask,
  type GanttViewMode,
  type ResourceGroupRow,
  type TimelineZoomLevel,
} from './ganttEngine';

export interface ExportTimelineBucket {
  label: string;
  startIndex: number;
  spanDays: number;
  key: string;
}

export interface GanttImageExportLayout {
  bannerHeight: number;
  headerHeight: number;
  rowHeight: number;
  leftTableWidth: number;
  timelineWidth: number;
  totalWidth: number;
  totalHeight: number;
  dayWidth: number;
  rowCount: number;
}

export function buildExportImageFilename(projectName: string): string {
  const safeSlug = projectName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${safeSlug || 'bieu-do-gantt'}.png`;
}

export function buildExportTimelineBuckets(
  rangeStartIso: string,
  totalDays: number,
  zoomLevel: TimelineZoomLevel
): { topBuckets: ExportTimelineBucket[]; bottomBuckets: ExportTimelineBucket[] } {
  const days: string[] = [];
  for (let i = 0; i < totalDays; i++) {
    days.push(addCalendarDays(rangeStartIso, i));
  }

  if (zoomLevel === 'month') {
    const yearBuckets: ExportTimelineBucket[] = [];
    const monthBuckets: ExportTimelineBucket[] = [];
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
    const monthBuckets: ExportTimelineBucket[] = [];
    const weekBuckets: ExportTimelineBucket[] = [];
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

  const weekBuckets: ExportTimelineBucket[] = [];
  const dayBuckets: ExportTimelineBucket[] = [];
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

export function computeExportTimelineRange(
  tasks: readonly GanttTask[],
  todayIso: string,
  zoomLevel: TimelineZoomLevel
): { startIso: string; endIso: string; totalDays: number } {
  if (tasks.length === 0) {
    const startIso = addCalendarDays(todayIso, -5);
    const endIso = addCalendarDays(todayIso, 25);
    return {
      startIso,
      endIso,
      totalDays: diffCalendarDays(startIso, endIso) + 1,
    };
  }

  let minStart = tasks[0].start;
  let maxEnd = tasks[0].end;
  for (const t of tasks) {
    if (t.start < minStart) minStart = t.start;
    if (t.end > maxEnd) maxEnd = t.end;
  }

  if (todayIso < minStart && diffCalendarDays(todayIso, minStart) <= 7) {
    minStart = todayIso;
  }
  if (todayIso > maxEnd && diffCalendarDays(maxEnd, todayIso) <= 7) {
    maxEnd = todayIso;
  }

  const paddedStart = addCalendarDays(minStart, -2);
  const dayWidth = ZOOM_DAY_WIDTH[zoomLevel];
  const labelDaysNeeded = Math.ceil(200 / dayWidth);
  const paddedEnd = addCalendarDays(maxEnd, Math.max(6, labelDaysNeeded));
  const totalDays = Math.max(14, diffCalendarDays(paddedStart, paddedEnd) + 1);

  return {
    startIso: paddedStart,
    endIso: addCalendarDays(paddedStart, totalDays - 1),
    totalDays,
  };
}

export function computeGanttExportLayout(params: {
  rowCount: number;
  totalDays: number;
  zoomLevel: TimelineZoomLevel;
}): GanttImageExportLayout {
  const bannerHeight = 64;
  const headerHeight = 56;
  const rowHeight = 40;
  const leftTableWidth = 0; // Only right calendar is exported
  const dayWidth = ZOOM_DAY_WIDTH[params.zoomLevel];
  const timelineWidth = Math.max(640, params.totalDays * dayWidth);
  const rows = Math.max(1, params.rowCount);
  const totalWidth = timelineWidth;
  const totalHeight = bannerHeight + headerHeight + rows * rowHeight + 16;
  return {
    bannerHeight,
    headerHeight,
    rowHeight,
    leftTableWidth: 0,
    timelineWidth,
    totalWidth,
    totalHeight,
    dayWidth,
    rowCount: rows,
  };
}

function truncateTextToFit(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  if (maxWidth <= 8) return '';
  if (ctx.measureText(text).width <= maxWidth) return text;
  let trimmed = text;
  while (trimmed.length > 1 && ctx.measureText(`${trimmed}…`).width > maxWidth) {
    trimmed = trimmed.slice(0, -1);
  }
  return `${trimmed}…`;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export interface RenderGanttImageOptions {
  viewMode: GanttViewMode;
  projectRows: readonly FlattenedTaskRow[];
  resourceGroups: readonly ResourceGroupRow[];
  settings: GanttSettings;
  zoomLevel: TimelineZoomLevel;
  rangeStartIso: string;
  totalDays: number;
  todayIso: string;
}

export function renderGanttChartToCanvas(
  options: RenderGanttImageOptions
): HTMLCanvasElement {
  const {
    viewMode,
    projectRows,
    resourceGroups,
    settings,
    zoomLevel,
    rangeStartIso,
    totalDays,
    todayIso,
  } = options;

  type VisualRow =
    | {
        kind: 'project-task';
        task: GanttTask;
        depth: number;
        isSummary: boolean;
      }
    | {
        kind: 'resource-group';
        label: string;
        count: number;
        totalDuration: number;
      }
    | {
        kind: 'resource-task';
        task: GanttTask;
      };

  const visualRows: VisualRow[] = [];
  if (viewMode === 'project') {
    for (const row of projectRows) {
      visualRows.push({
        kind: 'project-task',
        task: row.task,
        depth: row.depth,
        isSummary: row.isSummary,
      });
    }
  } else {
    for (const grp of resourceGroups) {
      visualRows.push({
        kind: 'resource-group',
        label: grp.resourceName,
        count: grp.tasks.length,
        totalDuration: grp.totalDuration,
      });
      for (const t of grp.tasks) {
        visualRows.push({ kind: 'resource-task', task: t });
      }
    }
  }

  const layout = computeGanttExportLayout({
    rowCount: visualRows.length,
    totalDays,
    zoomLevel,
  });

  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = layout.totalWidth * scale;
  canvas.height = layout.totalHeight * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Trình duyệt không hỗ trợ tạo ngữ cảnh vẽ ảnh Canvas 2D.');
  }
  ctx.scale(scale, scale);

  const fontSans = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';

  // Canvas background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, layout.totalWidth, layout.totalHeight);

  // Top Banner
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, layout.totalWidth, layout.bannerHeight);
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, layout.bannerHeight);
  ctx.lineTo(layout.totalWidth, layout.bannerHeight);
  ctx.stroke();

  ctx.fillStyle = '#1d4ed8';
  ctx.font = `600 11px ${fontSans}`;
  ctx.fillText(
    `Chương 4: Quản lý dự án · ${
      viewMode === 'resource' ? 'Chế độ Nhân sự' : 'Lập biểu đồ Gantt'
    }`,
    16,
    22
  );

  ctx.fillStyle = '#0f172a';
  ctx.font = `700 18px ${fontSans}`;
  ctx.fillText(
    truncateTextToFit(ctx, settings.projectName, layout.totalWidth - 220),
    16,
    46
  );

  ctx.fillStyle = '#64748b';
  ctx.font = `500 11px ${fontSans}`;
  const exportMeta = `Xuất ngày ${todayIso}`;
  const metaW = ctx.measureText(exportMeta).width;
  ctx.fillText(exportMeta, layout.totalWidth - metaW - 16, 44);

  const gridTop = layout.bannerHeight;
  const bodyTop = gridTop + layout.headerHeight;

  // Timeline Header (Calendar tiers spanning full width)
  const { topBuckets, bottomBuckets } = buildExportTimelineBuckets(
    rangeStartIso,
    totalDays,
    zoomLevel
  );

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, gridTop, layout.totalWidth, layout.headerHeight);

  // Tier 1 buckets (Months / Years)
  ctx.font = `600 11px ${fontSans}`;
  for (const bucket of topBuckets) {
    const bx = bucket.startIndex * layout.dayWidth;
    const bw = bucket.spanDays * layout.dayWidth;
    ctx.fillStyle = '#334155';
    ctx.fillText(
      truncateTextToFit(ctx, bucket.label, bw - 8),
      bx + 6,
      gridTop + 18
    );
    ctx.strokeStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(bx + bw, gridTop);
    ctx.lineTo(bx + bw, gridTop + 28);
    ctx.stroke();
  }

  // Tier divider
  ctx.strokeStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(0, gridTop + 28);
  ctx.lineTo(layout.totalWidth, gridTop + 28);
  ctx.stroke();

  // Tier 2 buckets + vertical day/weekend gridlines
  const bodyHeight = layout.rowCount * layout.rowHeight;
  for (const bucket of bottomBuckets) {
    const bx = bucket.startIndex * layout.dayWidth;
    const bw = bucket.spanDays * layout.dayWidth;
    const isDayZoom = zoomLevel === 'day' || zoomLevel === 'day-wide';
    const isTodayCol = isDayZoom && bucket.key === todayIso;
    const isWeekend = isDayZoom && isWeekendDate(bucket.key);

    if (isTodayCol && settings.showTodayLine) {
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(bx, gridTop + 28, bw, 28);
      ctx.fillStyle = '#ffffff';
      ctx.font = `700 11px ${fontSans}`;
    } else if (isWeekend) {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(bx, gridTop + 28, bw, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.font = `500 11px ${fontSans}`;
    } else {
      ctx.fillStyle = '#475569';
      ctx.font = `500 11px ${fontSans}`;
    }

    const labelStr = truncateTextToFit(ctx, bucket.label, bw - 4);
    const labelW = ctx.measureText(labelStr).width;
    ctx.fillText(labelStr, bx + (bw - labelW) / 2, gridTop + 46);

    // Column shading in chart body
    if (isWeekend) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(bx, bodyTop, bw, bodyHeight);
    }

    ctx.strokeStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(bx + bw, gridTop + 28);
    ctx.lineTo(bx + bw, bodyTop + bodyHeight);
    ctx.stroke();
  }

  // Header bottom border
  ctx.strokeStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(0, bodyTop);
  ctx.lineTo(layout.totalWidth, bodyTop);
  ctx.stroke();

  // Rows: Backgrounds and horizontal row dividers
  visualRows.forEach((row, idx) => {
    const ry = bodyTop + idx * layout.rowHeight;
    if (row.kind === 'resource-group') {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, ry, layout.totalWidth, layout.rowHeight);

      ctx.fillStyle = '#0f172a';
      ctx.font = `700 12px ${fontSans}`;
      ctx.fillText(
        `${row.label} (${row.count} công việc · ${row.totalDuration} ngày)`,
        16,
        ry + 25
      );
    }

    ctx.strokeStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(0, ry + layout.rowHeight);
    ctx.lineTo(layout.totalWidth, ry + layout.rowHeight);
    ctx.stroke();
  });

  // Dependency Arrows (Project View)
  if (viewMode === 'project') {
    const rowIndexById = new Map<number, number>();
    const taskById = new Map<number, GanttTask>();
    projectRows.forEach((row, idx) => {
      rowIndexById.set(row.task.id, idx);
      taskById.set(row.task.id, row.task);
    });

    for (const row of projectRows) {
      const succ = row.task;
      const succIdx = rowIndexById.get(succ.id);
      if (succIdx === undefined) continue;
      for (const dep of parseDependencyString(succ.dependency)) {
        const pred = taskById.get(dep.predecessorId);
        const predIdx = rowIndexById.get(dep.predecessorId);
        if (!pred || predIdx === undefined) continue;

        const predStartX =
          diffCalendarDays(rangeStartIso, pred.start) * layout.dayWidth;
        const predEndX =
          (diffCalendarDays(rangeStartIso, pred.end) + 1) * layout.dayWidth;
        const succStartX =
          diffCalendarDays(rangeStartIso, succ.start) * layout.dayWidth;
        const succEndX =
          (diffCalendarDays(rangeStartIso, succ.end) + 1) * layout.dayWidth;

        const predMidX = pred.isMilestone
          ? predStartX + layout.dayWidth / 2
          : undefined;
        const succMidX = succ.isMilestone
          ? succStartX + layout.dayWidth / 2
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

        const fromY =
          bodyTop + predIdx * layout.rowHeight + layout.rowHeight / 2;
        const toY =
          bodyTop + succIdx * layout.rowHeight + layout.rowHeight / 2;

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);

        if (dep.type === 'FS' || dep.type === 'SS') {
          if (toX >= fromX + 12) {
            const elbowX = fromX + Math.min(12, Math.max(6, (toX - fromX) / 2));
            ctx.lineTo(elbowX, fromY);
            ctx.lineTo(elbowX, toY);
            ctx.lineTo(toX, toY);
          } else {
            const outX = fromX + 10;
            const midY =
              toY > fromY
                ? fromY + layout.rowHeight / 2
                : fromY - layout.rowHeight / 2;
            const entryX = toX - 10;
            ctx.lineTo(outX, fromY);
            ctx.lineTo(outX, midY);
            ctx.lineTo(entryX, midY);
            ctx.lineTo(entryX, toY);
            ctx.lineTo(toX, toY);
          }
        } else {
          const outX = Math.max(fromX, toX) + 12;
          ctx.lineTo(outX, fromY);
          ctx.lineTo(outX, toY);
          ctx.lineTo(toX, toY);
        }
        ctx.stroke();

        // Arrowhead pointing right at (toX, toY)
        const dir = dep.type === 'FF' || dep.type === 'SF' ? -1 : 1;
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - dir * 6, toY - 3.5);
        ctx.lineTo(toX - dir * 6, toY + 3.5);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  // Gantt Task Bars & Milestones
  visualRows.forEach((row, idx) => {
    if (row.kind === 'resource-group') return;
    const task = row.task;
    const isSummary = row.kind === 'project-task' && row.isSummary;
    const ry = bodyTop + idx * layout.rowHeight;
    const startOffset = diffCalendarDays(rangeStartIso, task.start);
    const spanDays = Math.max(1, diffCalendarDays(task.start, task.end) + 1);
    const leftPx = startOffset * layout.dayWidth;
    const widthPx = Math.max(spanDays * layout.dayWidth, 10);
    const taskLabel = `#${task.id} · ${task.name}`;

    if (task.isMilestone) {
      const cx = leftPx + layout.dayWidth / 2;
      const cy = ry + layout.rowHeight / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fillRect(-8, -8, 16, 16);
      ctx.strokeRect(-8, -8, 16, 16);
      ctx.restore();

      // Draw milestone name to the right of the diamond
      ctx.fillStyle = '#0f172a';
      ctx.font = `italic 600 11px ${fontSans}`;
      ctx.fillText(taskLabel, cx + 14, cy + 4);
      return;
    }

    const barColor = isSummary ? SUMMARY_BAR_COLOR : task.color;
    const barY = ry + 9;
    const barH = 22;

    // Bar background
    ctx.save();
    drawRoundedRect(ctx, leftPx, barY, widthPx, barH, 4);
    ctx.fillStyle = barColor;
    ctx.fill();
    ctx.clip();

    ctx.font = `600 11px ${fontSans}`;
    const textW = ctx.measureText(taskLabel).width;

    if (widthPx >= textW + 16) {
      ctx.fillStyle = '#ffffff';
      ctx.fillText(taskLabel, leftPx + 8, barY + 15);
      ctx.restore();
    } else {
      ctx.restore();
      // Draw label cleanly to the right of the bar if bar is too narrow
      ctx.fillStyle = isSummary ? '#0f172a' : '#1e293b';
      ctx.font = isSummary ? `700 11px ${fontSans}` : `600 11px ${fontSans}`;
      ctx.fillText(taskLabel, leftPx + widthPx + 8, barY + 15);
    }
  });

  // Today vertical marker line
  const todayOffset = diffCalendarDays(rangeStartIso, todayIso);
  if (settings.showTodayLine && todayOffset >= 0 && todayOffset < totalDays) {
    const todayX = todayOffset * layout.dayWidth + layout.dayWidth / 2;
    ctx.strokeStyle = 'rgba(225, 29, 72, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(todayX, bodyTop);
    ctx.lineTo(todayX, bodyTop + bodyHeight);
    ctx.stroke();
  }

  return canvas;
}

export async function exportGanttChartToPng(
  options: RenderGanttImageOptions
): Promise<{ filename: string; width: number; height: number }> {
  const canvas = renderGanttChartToCanvas(options);
  const filename = buildExportImageFilename(options.settings.projectName);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) {
        resolve(result);
      } else {
        reject(new Error('Không thể tạo tệp ảnh PNG từ biểu đồ.'));
      }
    }, 'image/png');
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return {
    filename,
    width: canvas.width,
    height: canvas.height,
  };
}
