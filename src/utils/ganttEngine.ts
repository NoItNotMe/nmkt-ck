export type DependencyType = 'FS' | 'SS' | 'FF' | 'SF';

export interface GanttDependency {
  predecessorId: number;
  type: DependencyType;
  lagDays: number;
}

export interface GanttTask {
  id: number;
  parentId: number | null;
  name: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  duration: number; // working days (0 = milestone)
  dependency: string; // e.g. "2FS" or "2FS,3SS+1"
  resources: string[];
  color: string; // hex color
  notes: string;
  isMilestone?: boolean;
  expanded?: boolean;
}

export interface GanttResource {
  id: string;
  name: string;
  role: string;
}

export type WorkWeekMode = 'weekdays' | 'all-days';
export type TaskFilterMode = 'all' | 'milestones' | 'overdue';
export type GanttViewMode = 'project' | 'resource';
export type TimelineZoomLevel = 'day-wide' | 'day' | 'week' | 'month';

export interface GanttColumnVisibility {
  id: boolean;
  start: boolean;
  end: boolean;
  duration: boolean;
  dependency: boolean;
  resources: boolean;
  color: boolean;
  notes: boolean;
}

export interface GanttSettings {
  projectName: string;
  workWeekMode: WorkWeekMode;
  autoScheduleDependencies: boolean;
  showTodayLine: boolean;
  columns: GanttColumnVisibility;
}

export interface GanttProjectState {
  tasks: GanttTask[];
  resources: GanttResource[];
  settings: GanttSettings;
}

export interface FlattenedTaskRow {
  task: GanttTask;
  depth: number;
  hasChildren: boolean;
  isSummary: boolean;
}

export interface ResourceGroupRow {
  resourceName: string;
  role: string;
  tasks: GanttTask[];
  totalDuration: number;
}

export const GANTT_COLOR_PALETTE: readonly {
  name: string;
  bar: string;
}[] = [
  { name: 'Xanh lá', bar: '#16a34a' },
  { name: 'Xanh dương', bar: '#2563eb' },
  { name: 'Tím hồng', bar: '#c026d3' },
  { name: 'Cam hổ phách', bar: '#d97706' },
  { name: 'Xanh ngọc', bar: '#0d9488' },
  { name: 'Đỏ thẫm', bar: '#e11d48' },
  { name: 'Chàm', bar: '#4f46e5' },
  { name: 'Xám đá', bar: '#64748b' },
] as const;

export const SUMMARY_BAR_COLOR = '#64748b';

export const ZOOM_LEVELS: readonly TimelineZoomLevel[] = [
  'month',
  'week',
  'day',
  'day-wide',
] as const;

export const ZOOM_DAY_WIDTH: Record<TimelineZoomLevel, number> = {
  'day-wide': 44,
  day: 28,
  week: 16,
  month: 6,
};

export function parseIsoDate(iso: string): Date {
  const parts = iso.split('-').map(Number);
  const year = parts[0] || 2026;
  const month = (parts[1] || 1) - 1;
  const day = parts[2] || 1;
  return new Date(Date.UTC(year, month, day));
}

export function formatIsoDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayIsoDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isWeekendDate(iso: string): boolean {
  const day = parseIsoDate(iso).getUTCDay();
  return day === 0 || day === 6;
}

export function addCalendarDays(iso: string, days: number): string {
  const date = parseIsoDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return formatIsoDate(date);
}

export function diffCalendarDays(startIso: string, endIso: string): number {
  const start = parseIsoDate(startIso).getTime();
  const end = parseIsoDate(endIso).getTime();
  return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

export function normalizeWorkStart(
  iso: string,
  workWeekMode: WorkWeekMode,
  direction: 1 | -1 = 1
): string {
  if (workWeekMode === 'all-days') {
    return iso;
  }
  let current = iso;
  let guard = 0;
  while (isWeekendDate(current) && guard < 10) {
    current = addCalendarDays(current, direction);
    guard += 1;
  }
  return current;
}

export function computeDurationDays(
  startIso: string,
  endIso: string,
  workWeekMode: WorkWeekMode,
  isMilestone?: boolean
): number {
  if (isMilestone) {
    return 0;
  }
  if (endIso < startIso) {
    return 1;
  }
  if (workWeekMode === 'all-days') {
    return diffCalendarDays(startIso, endIso) + 1;
  }
  let count = 0;
  let cursor = startIso;
  let guard = 0;
  while (cursor <= endIso && guard < 3650) {
    if (!isWeekendDate(cursor)) {
      count += 1;
    }
    cursor = addCalendarDays(cursor, 1);
    guard += 1;
  }
  return Math.max(0, count);
}

export function computeEndDateFromDuration(
  startIso: string,
  duration: number,
  workWeekMode: WorkWeekMode
): string {
  if (duration <= 0) {
    return startIso;
  }
  if (workWeekMode === 'all-days') {
    return addCalendarDays(startIso, duration - 1);
  }
  let cursor = normalizeWorkStart(startIso, workWeekMode, 1);
  let remaining = duration - 1;
  let guard = 0;
  while (remaining > 0 && guard < 3650) {
    cursor = addCalendarDays(cursor, 1);
    if (!isWeekendDate(cursor)) {
      remaining -= 1;
    }
    guard += 1;
  }
  return cursor;
}

export function computeStartDateFromEndAndDuration(
  endIso: string,
  duration: number,
  workWeekMode: WorkWeekMode
): string {
  if (duration <= 0) {
    return endIso;
  }
  if (workWeekMode === 'all-days') {
    return addCalendarDays(endIso, -(duration - 1));
  }
  let cursor = normalizeWorkStart(endIso, workWeekMode, -1);
  let remaining = duration - 1;
  let guard = 0;
  while (remaining > 0 && guard < 3650) {
    cursor = addCalendarDays(cursor, -1);
    if (!isWeekendDate(cursor)) {
      remaining -= 1;
    }
    guard += 1;
  }
  return cursor;
}

export function addWorkingDays(
  iso: string,
  delta: number,
  workWeekMode: WorkWeekMode
): string {
  if (delta === 0) {
    return iso;
  }
  if (workWeekMode === 'all-days') {
    return addCalendarDays(iso, delta);
  }
  const step = delta > 0 ? 1 : -1;
  let remaining = Math.abs(delta);
  let cursor = iso;
  let guard = 0;
  while (remaining > 0 && guard < 3650) {
    cursor = addCalendarDays(cursor, step);
    if (!isWeekendDate(cursor)) {
      remaining -= 1;
    }
    guard += 1;
  }
  return cursor;
}

export function parseDependencyString(raw: string): GanttDependency[] {
  if (!raw || !raw.trim()) {
    return [];
  }
  const tokens = raw
    .split(/[,;]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const result: GanttDependency[] = [];
  for (const token of tokens) {
    const match = token.match(/^(\d+)\s*(FS|SS|FF|SF)?\s*([+-]\s*\d+)?$/i);
    if (!match) {
      continue;
    }
    const predecessorId = Number(match[1]);
    if (!Number.isInteger(predecessorId) || predecessorId <= 0) {
      continue;
    }
    const type = ((match[2] ?? 'FS').toUpperCase() as DependencyType);
    const lagRaw = match[3] ? match[3].replace(/\s+/g, '') : '0';
    const lagDays = Number(lagRaw) || 0;
    result.push({ predecessorId, type, lagDays });
  }
  return result;
}

export function formatDependencies(deps: readonly GanttDependency[]): string {
  return deps
    .map((d) => {
      const lag =
        d.lagDays > 0 ? `+${d.lagDays}` : d.lagDays < 0 ? `${d.lagDays}` : '';
      return `${d.predecessorId}${d.type}${lag}`;
    })
    .join(', ');
}

export function createDefaultSettings(): GanttSettings {
  return {
    projectName: 'Kế hoạch Dự án Nhập môn Kỹ thuật — Nhóm 3',
    workWeekMode: 'weekdays',
    autoScheduleDependencies: true,
    showTodayLine: true,
    columns: {
      id: true,
      start: true,
      end: true,
      duration: true,
      dependency: true,
      resources: true,
      color: true,
      notes: true,
    },
  };
}

export function createSampleProjectState(): GanttProjectState {
  const resources: GanttResource[] = [];

  const rawTasks: GanttTask[] = [
    {
      id: 1,
      parentId: null,
      name: 'Giai đoạn 1: Khởi tạo & Thiết kế',
      start: '2026-11-23',
      end: '2026-12-11',
      duration: 15,
      dependency: '',
      resources: [],
      color: '#64748b',
      notes: 'Nhóm công việc tổng hợp giai đoạn đầu',
      expanded: true,
    },
    {
      id: 2,
      parentId: 1,
      name: 'Xác định bài toán & Tuyên bố dự án',
      start: '2026-11-23',
      end: '2026-11-27',
      duration: 5,
      dependency: '',
      resources: [],
      color: '#16a34a',
      notes: 'Hoàn thiện Project Charter và phân công vai trò',
      expanded: true,
    },
    {
      id: 3,
      parentId: 1,
      name: 'Thiết kế sơ đồ khối & Chọn phương án',
      start: '2026-11-30',
      end: '2026-12-04',
      duration: 5,
      dependency: '2FS',
      resources: [],
      color: '#2563eb',
      notes: 'Đánh giá ma trận tiêu chí tại Mục 2',
      expanded: true,
    },
    {
      id: 4,
      parentId: 1,
      name: 'Mô phỏng mạch & Viết firmware thử nghiệm',
      start: '2026-12-07',
      end: '2026-12-11',
      duration: 5,
      dependency: '3FS',
      resources: [],
      color: '#c026d3',
      notes: 'Kiểm tra tín hiệu cảm biến và giao tiếp UART',
      expanded: true,
    },
    {
      id: 5,
      parentId: 1,
      name: 'Cột mốc: Duyệt thiết kế chi tiết',
      start: '2026-12-11',
      end: '2026-12-11',
      duration: 0,
      dependency: '4FS',
      resources: [],
      color: '#334155',
      notes: 'Chốt bản vẽ trước khi lắp ráp nguyên mẫu',
      isMilestone: true,
      expanded: true,
    },
    {
      id: 6,
      parentId: null,
      name: 'Giai đoạn 2: Chế tạo & Nghiệm thu',
      start: '2026-12-14',
      end: '2026-12-23',
      duration: 8,
      dependency: '',
      resources: [],
      color: '#64748b',
      notes: 'Lắp ráp, chạy thử và hoàn thiện báo cáo',
      expanded: true,
    },
    {
      id: 7,
      parentId: 6,
      name: 'Lắp ráp nguyên mẫu & Đo kiểm thực tế',
      start: '2026-12-14',
      end: '2026-12-18',
      duration: 5,
      dependency: '5FS',
      resources: [],
      color: '#0d9488',
      notes: 'Đo dòng tiêu thụ và độ ổn định nhiệt',
      expanded: true,
    },
    {
      id: 8,
      parentId: 6,
      name: 'Tổng hợp báo cáo & Thuyết trình',
      start: '2026-12-21',
      end: '2026-12-23',
      duration: 3,
      dependency: '7FS',
      resources: [],
      color: '#d97706',
      notes: 'Chuẩn bị slide bảo vệ trước giảng viên',
      expanded: true,
    },
  ];

  const settings = createDefaultSettings();
  return {
    tasks: recalculateProjectTasks(rawTasks, settings),
    resources,
    settings,
  };
}

export function createEmptyProjectState(): GanttProjectState {
  const today = normalizeWorkStart(getTodayIsoDate(), 'weekdays', 1);
  const end = computeEndDateFromDuration(today, 3, 'weekdays');
  const settings = {
    ...createDefaultSettings(),
    projectName: 'Dự án mới',
  };
  return {
    tasks: [
      {
        id: 1,
        parentId: null,
        name: 'Công việc đầu tiên',
        start: today,
        end,
        duration: 3,
        dependency: '',
        resources: [],
        color: '#2563eb',
        notes: '',
        expanded: true,
      },
    ],
    resources: [],
    settings,
  };
}

export function createBlankProjectState(): GanttProjectState {
  const settings = {
    ...createDefaultSettings(),
    projectName: 'Dự án mới',
  };
  return {
    tasks: [],
    resources: [],
    settings,
  };
}

export function hasTaskChildren(
  tasks: readonly GanttTask[],
  taskId: number
): boolean {
  return tasks.some((t) => t.parentId === taskId);
}

export function getDescendantIds(
  tasks: readonly GanttTask[],
  rootId: number
): Set<number> {
  const result = new Set<number>();
  const queue = [rootId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const task of tasks) {
      if (task.parentId === current && !result.has(task.id)) {
        result.add(task.id);
        queue.push(task.id);
      }
    }
  }
  return result;
}

export function recalculateProjectTasks(
  inputTasks: readonly GanttTask[],
  settings: GanttSettings
): GanttTask[] {
  const workWeek = settings.workWeekMode;
  const tasks = inputTasks.map((t) => ({
    ...t,
    resources: [...t.resources],
  }));
  const byId = new Map<number, GanttTask>();
  for (const t of tasks) {
    byId.set(t.id, t);
  }

  // Normalize leaf durations & dates first
  for (const task of tasks) {
    if (!hasTaskChildren(tasks, task.id)) {
      if (task.isMilestone || task.duration === 0) {
        task.isMilestone = true;
        task.duration = 0;
        task.end = task.start;
      } else {
        const dur = Math.max(1, Math.round(task.duration));
        task.duration = dur;
        task.end = computeEndDateFromDuration(task.start, dur, workWeek);
      }
    }
  }

  // Auto-schedule dependencies on leaf tasks (topological relaxation, cycle-safe)
  if (settings.autoScheduleDependencies) {
    const maxPasses = Math.min(tasks.length + 2, 30);
    for (let pass = 0; pass < maxPasses; pass++) {
      let changed = false;
      for (const task of tasks) {
        if (hasTaskChildren(tasks, task.id)) {
          continue;
        }
        const deps = parseDependencyString(task.dependency);
        if (deps.length === 0) {
          continue;
        }
        let requiredStart: string | null = null;
        for (const dep of deps) {
          if (dep.predecessorId === task.id) {
            continue;
          }
          const pred = byId.get(dep.predecessorId);
          if (!pred) {
            continue;
          }
          let candidateStart = task.start;
          if (dep.type === 'FS') {
            const base = pred.isMilestone
              ? pred.end
              : addWorkingDays(pred.end, 1, workWeek);
            candidateStart =
              dep.lagDays === 0
                ? normalizeWorkStart(base, workWeek, 1)
                : addWorkingDays(base, dep.lagDays, workWeek);
          } else if (dep.type === 'SS') {
            candidateStart = addWorkingDays(pred.start, dep.lagDays, workWeek);
          } else if (dep.type === 'FF') {
            const targetEnd = addWorkingDays(pred.end, dep.lagDays, workWeek);
            candidateStart = task.isMilestone
              ? targetEnd
              : computeStartDateFromEndAndDuration(
                  targetEnd,
                  task.duration,
                  workWeek
                );
          } else if (dep.type === 'SF') {
            const targetEnd = addWorkingDays(pred.start, dep.lagDays, workWeek);
            candidateStart = task.isMilestone
              ? targetEnd
              : computeStartDateFromEndAndDuration(
                  targetEnd,
                  task.duration,
                  workWeek
                );
          }
          if (!requiredStart || candidateStart > requiredStart) {
            requiredStart = candidateStart;
          }
        }
        if (requiredStart && requiredStart > task.start) {
          task.start = requiredStart;
          task.end = task.isMilestone
            ? requiredStart
            : computeEndDateFromDuration(requiredStart, task.duration, workWeek);
          changed = true;
        }
      }
      if (!changed) {
        break;
      }
    }
  }

  // Roll up summary parent tasks bottom-up
  const depthOf = (task: GanttTask): number => {
    let depth = 0;
    let curr: GanttTask | undefined = task;
    const seen = new Set<number>();
    while (curr && curr.parentId !== null && !seen.has(curr.id)) {
      seen.add(curr.id);
      curr = byId.get(curr.parentId);
      depth += 1;
    }
    return depth;
  };

  const sortedByDepthDesc = [...tasks].sort((a, b) => depthOf(b) - depthOf(a));
  for (const task of sortedByDepthDesc) {
    const children = tasks.filter((t) => t.parentId === task.id);
    if (children.length === 0) {
      continue;
    }
    let minStart = children[0].start;
    let maxEnd = children[0].end;
    for (const child of children) {
      if (child.start < minStart) minStart = child.start;
      if (child.end > maxEnd) maxEnd = child.end;
    }
    task.isMilestone = false;
    task.start = minStart;
    task.end = maxEnd;
    task.duration = computeDurationDays(minStart, maxEnd, workWeek, false);
  }

  return tasks;
}

export function flattenVisibleTasks(
  tasks: readonly GanttTask[],
  filterMode: TaskFilterMode,
  searchQuery: string,
  todayIso: string
): FlattenedTaskRow[] {
  const byId = new Map<number, GanttTask>();
  for (const t of tasks) {
    byId.set(t.id, t);
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesDirectCriteria = (task: GanttTask): boolean => {
    if (filterMode === 'milestones' && !task.isMilestone) {
      return false;
    }
    if (filterMode === 'overdue' && !(task.end < todayIso)) {
      return false;
    }
    if (normalizedQuery) {
      const haystack = `${task.id} ${task.name} ${task.resources.join(' ')} ${task.notes}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  };

  const hasFilter = filterMode !== 'all' || normalizedQuery.length > 0;
  const visibleIds = new Set<number>();

  if (!hasFilter) {
    for (const t of tasks) {
      visibleIds.add(t.id);
    }
  } else {
    for (const t of tasks) {
      if (matchesDirectCriteria(t)) {
        visibleIds.add(t.id);
        let currParent = t.parentId;
        const guard = new Set<number>();
        while (currParent !== null && !guard.has(currParent)) {
          guard.add(currParent);
          visibleIds.add(currParent);
          currParent = byId.get(currParent)?.parentId ?? null;
        }
      }
    }
  }

  const result: FlattenedTaskRow[] = [];

  function walk(parentId: number | null, depth: number) {
    const children = tasks.filter(
      (t) => t.parentId === parentId && visibleIds.has(t.id)
    );
    for (const task of children) {
      const allChildren = tasks.filter((t) => t.parentId === task.id);
      const isSummary = allChildren.length > 0;
      const visibleChildren = allChildren.filter((c) => visibleIds.has(c.id));
      result.push({
        task,
        depth,
        hasChildren: visibleChildren.length > 0,
        isSummary,
      });
      const isExpanded = hasFilter ? true : task.expanded !== false;
      if (visibleChildren.length > 0 && isExpanded) {
        walk(task.id, depth + 1);
      }
    }
  }

  walk(null, 0);
  return result;
}

export function canIndentTask(
  tasks: readonly GanttTask[],
  taskId: number
): boolean {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index <= 0) return false;
  const task = tasks[index];
  // Find preceding sibling with the same parentId
  for (let i = index - 1; i >= 0; i--) {
    if (tasks[i].parentId === task.parentId) {
      return true;
    }
  }
  return false;
}

export function indentTask(
  tasks: readonly GanttTask[],
  taskId: number,
  settings: GanttSettings
): GanttTask[] {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index <= 0) return [...tasks];
  const target = tasks[index];
  let newParent: GanttTask | null = null;
  for (let i = index - 1; i >= 0; i--) {
    if (tasks[i].parentId === target.parentId) {
      newParent = tasks[i];
      break;
    }
  }
  if (!newParent) return [...tasks];

  const updated = tasks.map((t) => {
    if (t.id === taskId) {
      return { ...t, parentId: newParent!.id };
    }
    if (t.id === newParent!.id) {
      return { ...t, expanded: true };
    }
    return t;
  });
  return recalculateProjectTasks(updated, settings);
}

export function canOutdentTask(
  tasks: readonly GanttTask[],
  taskId: number
): boolean {
  const task = tasks.find((t) => t.id === taskId);
  return Boolean(task && task.parentId !== null);
}

export function outdentTask(
  tasks: readonly GanttTask[],
  taskId: number,
  settings: GanttSettings
): GanttTask[] {
  const task = tasks.find((t) => t.id === taskId);
  if (!task || task.parentId === null) return [...tasks];
  const currentParent = tasks.find((t) => t.id === task.parentId);
  const nextParentId = currentParent ? currentParent.parentId : null;

  const updated = tasks.map((t) =>
    t.id === taskId ? { ...t, parentId: nextParentId } : t
  );
  return recalculateProjectTasks(updated, settings);
}

export function deleteTaskAndDescendants(
  tasks: readonly GanttTask[],
  taskId: number,
  settings: GanttSettings
): GanttTask[] {
  const descendants = getDescendantIds(tasks, taskId);
  descendants.add(taskId);
  const remaining = tasks
    .filter((t) => !descendants.has(t.id))
    .map((t) => {
      const deps = parseDependencyString(t.dependency).filter(
        (d) => !descendants.has(d.predecessorId)
      );
      return { ...t, dependency: formatDependencies(deps) };
    });
  return recalculateProjectTasks(remaining, settings);
}

export function getNextTaskId(tasks: readonly GanttTask[]): number {
  let maxId = 0;
  for (const t of tasks) {
    if (t.id > maxId) maxId = t.id;
  }
  return maxId + 1;
}

export function insertNewTask(
  tasks: readonly GanttTask[],
  draft: Omit<GanttTask, 'id'>,
  settings: GanttSettings,
  afterTaskId?: number | null
): { tasks: GanttTask[]; createdId: number } {
  const createdId = getNextTaskId(tasks);
  const newTask: GanttTask = {
    ...draft,
    id: createdId,
    expanded: true,
  };

  let nextList: GanttTask[];
  if (afterTaskId != null) {
    const idx = tasks.findIndex((t) => t.id === afterTaskId);
    if (idx !== -1) {
      const descendants = getDescendantIds(tasks, afterTaskId);
      let insertAt = idx + 1;
      while (insertAt < tasks.length && descendants.has(tasks[insertAt].id)) {
        insertAt += 1;
      }
      nextList = [
        ...tasks.slice(0, insertAt),
        newTask,
        ...tasks.slice(insertAt),
      ];
    } else {
      nextList = [...tasks, newTask];
    }
  } else {
    nextList = [...tasks, newTask];
  }

  return {
    tasks: recalculateProjectTasks(nextList, settings),
    createdId,
  };
}

export function buildResourceGroups(
  tasks: readonly GanttTask[],
  resources: readonly GanttResource[],
  filterMode: TaskFilterMode,
  searchQuery: string,
  todayIso: string
): ResourceGroupRow[] {
  const visibleLeaves = flattenVisibleTasks(
    tasks,
    filterMode,
    searchQuery,
    todayIso
  )
    .filter((row) => !row.isSummary)
    .map((row) => row.task);

  const roleMap = new Map<string, string>();
  for (const r of resources) {
    roleMap.set(r.name, r.role);
  }

  const groupOrder: string[] = resources.map((r) => r.name);
  for (const task of visibleLeaves) {
    for (const resName of task.resources) {
      if (!groupOrder.includes(resName)) {
        groupOrder.push(resName);
      }
    }
  }

  const groups: ResourceGroupRow[] = [];
  for (const resName of groupOrder) {
    const assigned = visibleLeaves.filter((t) => t.resources.includes(resName));
    if (assigned.length === 0 && searchQuery.trim().length > 0) {
      continue;
    }
    const totalDuration = assigned.reduce((acc, t) => acc + t.duration, 0);
    groups.push({
      resourceName: resName,
      role: roleMap.get(resName) ?? 'Thành viên',
      tasks: assigned,
      totalDuration,
    });
  }

  const unassigned = visibleLeaves.filter((t) => t.resources.length === 0);
  if (unassigned.length > 0) {
    const totalDuration = unassigned.reduce((acc, t) => acc + t.duration, 0);
    groups.push({
      resourceName: 'Chưa phân công',
      role: 'Chưa gán nhân sự',
      tasks: unassigned,
      totalDuration,
    });
  }

  return groups;
}

export function getTimelineRange(
  tasks: readonly GanttTask[],
  todayIso: string
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
  if (todayIso < minStart) {
    // Keep project centered unless today is close
    if (diffCalendarDays(todayIso, minStart) <= 10) {
      minStart = todayIso;
    }
  }
  if (todayIso > maxEnd && diffCalendarDays(maxEnd, todayIso) <= 10) {
    maxEnd = todayIso;
  }
  const paddedStart = addCalendarDays(minStart, -2);
  const paddedEnd = addCalendarDays(maxEnd, 5);
  const totalDays = Math.max(21, diffCalendarDays(paddedStart, paddedEnd) + 1);
  return {
    startIso: paddedStart,
    endIso: addCalendarDays(paddedStart, totalDays - 1),
    totalDays,
  };
}

export function serializeGanttFile(state: GanttProjectState): string {
  return JSON.stringify(
    {
      version: 1,
      format: 'onlinegantt-compatible',
      exportedAt: new Date().toISOString(),
      ...state,
    },
    null,
    2
  );
}

export function parseGanttFile(rawJson: string): GanttProjectState {
  const parsed = JSON.parse(rawJson) as Partial<GanttProjectState>;
  if (!parsed || !Array.isArray(parsed.tasks)) {
    throw new Error('Tệp .gantt không hợp lệ hoặc thiếu danh sách công việc.');
  }
  const defaultSettings = createDefaultSettings();
  const settings: GanttSettings = {
    ...defaultSettings,
    ...(parsed.settings ?? {}),
    columns: {
      ...defaultSettings.columns,
      ...(parsed.settings?.columns ?? {}),
    },
  };
  const resources: GanttResource[] = Array.isArray(parsed.resources)
    ? parsed.resources.map((r, idx) => ({
        id: String(r.id ?? `res-${idx + 1}`),
        name: String(r.name ?? `Thành viên ${idx + 1}`),
        role: String(r.role ?? 'Thành viên'),
      }))
    : [];

  const tasks: GanttTask[] = parsed.tasks.map((t, idx) => ({
    id: Number(t.id) || idx + 1,
    parentId: t.parentId === null || t.parentId === undefined ? null : Number(t.parentId),
    name: String(t.name ?? `Công việc ${idx + 1}`),
    start: String(t.start ?? getTodayIsoDate()),
    end: String(t.end ?? t.start ?? getTodayIsoDate()),
    duration: Number.isFinite(Number(t.duration)) ? Number(t.duration) : 1,
    dependency: String(t.dependency ?? ''),
    resources: Array.isArray(t.resources) ? t.resources.map(String) : [],
    color: String(t.color ?? '#2563eb'),
    notes: String(t.notes ?? ''),
    isMilestone: Boolean(t.isMilestone) || Number(t.duration) === 0,
    expanded: t.expanded !== false,
  }));

  return {
    tasks: recalculateProjectTasks(tasks, settings),
    resources,
    settings,
  };
}

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportTasksToCsv(tasks: readonly GanttTask[]): string {
  const header = [
    'ID',
    'ParentID',
    'Task Name',
    'Start',
    'End',
    'Duration',
    'Dependency',
    'Resources',
    'Color',
    'Notes',
  ];
  const lines = [header.join(',')];
  for (const t of tasks) {
    lines.push(
      [
        String(t.id),
        t.parentId === null ? '' : String(t.parentId),
        escapeCsvCell(t.name),
        t.start,
        t.end,
        String(t.duration),
        escapeCsvCell(t.dependency),
        escapeCsvCell(t.resources.join('; ')),
        t.color,
        escapeCsvCell(t.notes),
      ].join(',')
    );
  }
  return lines.join('\n');
}

function splitCsvRow(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      cells.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  cells.push(current);
  return cells;
}

export function parseCsvToTasks(
  csvText: string,
  settings: GanttSettings
): GanttTask[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) {
    throw new Error('Tệp CSV cần có dòng tiêu đề và ít nhất 1 công việc.');
  }
  const headerCols = splitCsvRow(lines[0]).map((c) => c.trim().toLowerCase());
  const hasProgressCol = headerCols.some((c) => c.includes('progress'));
  const offset = hasProgressCol ? 1 : 0;

  const tasks: GanttTask[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvRow(lines[i]);
    if (cols.length < 5) continue;
    const id = Number(cols[0]) || i;
    const parentRaw = cols[1]?.trim();
    const parentId = parentRaw ? Number(parentRaw) : null;
    const name = cols[2]?.trim() || `Công việc ${id}`;
    const start = /^\d{4}-\d{2}-\d{2}$/.test(cols[3]?.trim() ?? '')
      ? cols[3].trim()
      : getTodayIsoDate();
    const end = /^\d{4}-\d{2}-\d{2}$/.test(cols[4]?.trim() ?? '')
      ? cols[4].trim()
      : start;
    const duration = Number.isFinite(Number(cols[5]))
      ? Math.max(0, Number(cols[5]))
      : computeDurationDays(start, end, settings.workWeekMode);
    const dependency = cols[6 + offset]?.trim() ?? '';
    const resources = (cols[7 + offset] ?? '')
      .split(/[;,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const color = /^#[0-9a-fA-F]{6}$/.test(cols[8 + offset]?.trim() ?? '')
      ? cols[8 + offset].trim()
      : '#2563eb';
    const notes = cols[9 + offset]?.trim() ?? '';

    tasks.push({
      id,
      parentId: parentId && Number.isFinite(parentId) ? parentId : null,
      name,
      start,
      end,
      duration,
      dependency,
      resources,
      color,
      notes,
      isMilestone: duration === 0,
      expanded: true,
    });
  }
  if (tasks.length === 0) {
    throw new Error('Không đọc được công việc nào từ tệp CSV.');
  }
  return recalculateProjectTasks(tasks, settings);
}
