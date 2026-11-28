import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildResourceGroups,
  canIndentTask,
  canOutdentTask,
  computeDurationDays,
  computeEndDateFromDuration,
  createBlankProjectState,
  createDefaultSettings,
  createEmptyProjectState,
  createSampleProjectState,
  deleteTaskAndDescendants,
  exportTasksToCsv,
  flattenVisibleTasks,
  indentTask,
  insertNewTask,
  outdentTask,
  parseCsvToTasks,
  parseDependencyString,
  parseGanttFile,
  recalculateProjectTasks,
  serializeGanttFile,
} from './ganttEngine';

test('working day duration and end date math skip weekends in weekdays mode', () => {
  // 2026-11-23 is Monday, 2026-11-27 is Friday -> 5 working days
  assert.equal(
    computeDurationDays('2026-11-23', '2026-11-27', 'weekdays'),
    5
  );
  assert.equal(
    computeEndDateFromDuration('2026-11-23', 5, 'weekdays'),
    '2026-11-27'
  );
  // 6 working days from Monday 2026-11-23 lands on Monday 2026-11-30
  assert.equal(
    computeEndDateFromDuration('2026-11-23', 6, 'weekdays'),
    '2026-11-30'
  );
  // All-days mode includes Saturday & Sunday
  assert.equal(
    computeEndDateFromDuration('2026-11-23', 6, 'all-days'),
    '2026-11-28'
  );
});

test('parseDependencyString parses FS, SS, FF, SF with optional lag', () => {
  assert.deepEqual(parseDependencyString('2FS, 3SS+2, 4FF-1, 5'), [
    { predecessorId: 2, type: 'FS', lagDays: 0 },
    { predecessorId: 3, type: 'SS', lagDays: 2 },
    { predecessorId: 4, type: 'FF', lagDays: -1 },
    { predecessorId: 5, type: 'FS', lagDays: 0 },
  ]);
});

test('recalculateProjectTasks cascades FS dependencies and rolls up summary parent', () => {
  const settings = createDefaultSettings();
  const tasks = recalculateProjectTasks(
    [
      {
        id: 1,
        parentId: null,
        name: 'Summary',
        start: '2026-11-23',
        end: '2026-11-23',
        duration: 1,
        dependency: '',
        resources: [],
        color: '#64748b',
        notes: '',
        expanded: true,
      },
      {
        id: 2,
        parentId: 1,
        name: 'Task A',
        start: '2026-11-23',
        end: '2026-11-27',
        duration: 5,
        dependency: '',
        resources: ['Vũ Duy Mạnh'],
        color: '#16a34a',
        notes: '',
      },
      {
        id: 3,
        parentId: 1,
        name: 'Task B',
        start: '2026-11-23',
        end: '2026-11-25',
        duration: 3,
        dependency: '2FS',
        resources: ['Hoàng Ngọc Minh'],
        color: '#2563eb',
        notes: '',
      },
    ],
    settings
  );

  const taskB = tasks.find((t) => t.id === 3)!;
  assert.equal(taskB.start, '2026-11-30');
  assert.equal(taskB.end, '2026-12-02');

  const summary = tasks.find((t) => t.id === 1)!;
  assert.equal(summary.start, '2026-11-23');
  assert.equal(summary.end, '2026-12-02');
  assert.equal(summary.duration, 8);
});

test('indent, outdent, insert, and delete maintain WBS hierarchy cleanly', () => {
  const settings = createDefaultSettings();
  const base = createSampleProjectState().tasks;

  const { tasks: withAdded, createdId } = insertNewTask(
    base,
    {
      parentId: null,
      name: 'Hậu kiểm',
      start: '2026-12-24',
      end: '2026-12-25',
      duration: 2,
      dependency: '8FS',
      resources: ['Vũ Duy Mạnh'],
      color: '#4f46e5',
      notes: '',
    },
    settings
  );
  assert.equal(createdId, 9);
  assert.equal(canIndentTask(withAdded, 9), true);

  const indented = indentTask(withAdded, 9, settings);
  const task9Indented = indented.find((t) => t.id === 9)!;
  assert.equal(task9Indented.parentId, 6);
  assert.equal(canOutdentTask(indented, 9), true);

  const outdented = outdentTask(indented, 9, settings);
  assert.equal(outdented.find((t) => t.id === 9)!.parentId, null);

  const afterDelete = deleteTaskAndDescendants(outdented, 6, settings);
  assert.equal(afterDelete.some((t) => t.id === 6 || t.id === 7 || t.id === 8), false);
});

test('filtering, search, and resource view grouping work accurately', () => {
  const sample = createSampleProjectState();
  const milestones = flattenVisibleTasks(
    sample.tasks,
    'milestones',
    '',
    '2026-11-27'
  );
  // Retains milestone id=5 and its summary parent id=1
  assert.deepEqual(
    milestones.map((r) => r.task.id),
    [1, 5]
  );

  const searchResult = flattenVisibleTasks(
    sample.tasks,
    'all',
    'firmware',
    '2026-11-27'
  );
  // Retains summary parent id=1 and matching child id=4
  assert.deepEqual(
    searchResult.map((r) => r.task.id),
    [1, 4]
  );

  const overdue = flattenVisibleTasks(
    sample.tasks,
    'overdue',
    '',
    '2026-12-01'
  );
  // Task 2 ended 2026-11-27 (< 2026-12-01) -> overdue, plus parent 1
  assert.deepEqual(
    overdue.map((r) => r.task.id),
    [1, 2]
  );

  assert.equal(sample.resources.length, 0);
  assert.equal(createEmptyProjectState().resources.length, 0);

  const tasksWithResources = sample.tasks.map((t) =>
    t.id === 2 || t.id === 8 ? { ...t, resources: ['Vũ Duy Mạnh'] } : t
  );
  const resourceGroups = buildResourceGroups(
    tasksWithResources,
    [{ id: 'res-1', name: 'Vũ Duy Mạnh', role: 'Trưởng nhóm' }],
    'all',
    '',
    '2026-11-27'
  );
  const manh = resourceGroups.find((g) => g.resourceName === 'Vũ Duy Mạnh')!;
  assert.equal(manh.tasks.length, 2);
});

test('.gantt JSON and CSV roundtrip serialization preserves tasks', () => {
  const sample = createSampleProjectState();
  const json = serializeGanttFile(sample);
  const restored = parseGanttFile(json);
  assert.equal(restored.tasks.length, sample.tasks.length);
  assert.equal(restored.settings.projectName, sample.settings.projectName);

  const csv = exportTasksToCsv(sample.tasks);
  const parsedCsv = parseCsvToTasks(csv, sample.settings);
  assert.equal(parsedCsv.length, sample.tasks.length);
  assert.equal(parsedCsv[1].dependency, '2FS'.replace('2FS', '')); // task 2 has no dep
  assert.equal(parsedCsv[2].dependency, '2FS');
});

test('createBlankProjectState starts empty with 0 tasks and roundtrips cleanly', () => {
  const blank = createBlankProjectState();
  assert.equal(blank.tasks.length, 0);
  assert.equal(blank.resources.length, 0);
  const restored = parseGanttFile(serializeGanttFile(blank));
  assert.equal(restored.tasks.length, 0);
});
