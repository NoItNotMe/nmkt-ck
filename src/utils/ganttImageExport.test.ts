import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildExportImageFilename,
  buildExportTimelineBuckets,
  computeExportTimelineRange,
  computeGanttExportLayout,
} from './ganttImageExport';
import { createSampleProjectState } from './ganttEngine';

test('buildExportImageFilename normalizes Vietnamese project titles into safe PNG filenames', () => {
  assert.equal(
    buildExportImageFilename('Kế hoạch Dự án Nhập môn Kỹ thuật — Nhóm 3'),
    'ke-hoach-du-an-nhap-mon-ky-thuat-nhom-3.png'
  );
  assert.equal(buildExportImageFilename('   '), 'bieu-do-gantt.png');
});

test('computeGanttExportLayout computes positive HiDPI dimensions for timeline-only export', () => {
  const layout = computeGanttExportLayout({
    rowCount: 8,
    totalDays: 35,
    zoomLevel: 'day',
  });
  assert.equal(layout.dayWidth, 28);
  assert.equal(layout.leftTableWidth, 0);
  assert.equal(layout.timelineWidth, 980);
  assert.equal(layout.totalWidth, 980);
  assert.equal(layout.totalHeight, 64 + 56 + 8 * 40 + 16);
});

test('buildExportTimelineBuckets generates matching top and bottom calendar tiers', () => {
  const { topBuckets, bottomBuckets } = buildExportTimelineBuckets(
    '2026-11-23',
    14,
    'day'
  );
  assert.equal(bottomBuckets.length, 14);
  assert.equal(topBuckets.length >= 2, true);
  assert.equal(
    topBuckets.reduce((sum, b) => sum + b.spanDays, 0),
    14
  );
});

test('computeExportTimelineRange pads start and adds end space for task labels', () => {
  const sample = createSampleProjectState();
  const range = computeExportTimelineRange(sample.tasks, '2026-11-27', 'day');
  assert.equal(range.startIso, '2026-11-21');
  assert.equal(range.totalDays >= 38, true);
});
