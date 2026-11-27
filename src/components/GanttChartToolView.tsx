import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpLeft,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Download,
  FilePlus2,
  FolderOpen,
  Image as ImageIcon,
  Maximize2,
  Pencil,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Search,
  Trash2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  addWorkingDays,
  buildResourceGroups,
  canIndentTask,
  canOutdentTask,
  computeDurationDays,
  computeEndDateFromDuration,
  createEmptyProjectState,
  createSampleProjectState,
  deleteTaskAndDescendants,
  diffCalendarDays,
  exportTasksToCsv,
  flattenVisibleTasks,
  GANTT_COLOR_PALETTE,
  getTimelineRange,
  getTodayIsoDate,
  indentTask,
  insertNewTask,
  normalizeWorkStart,
  outdentTask,
  parseCsvToTasks,
  parseGanttFile,
  recalculateProjectTasks,
  serializeGanttFile,
  ZOOM_DAY_WIDTH,
  ZOOM_LEVELS,
  type GanttProjectState,
  type GanttResource,
  type GanttSettings,
  type GanttTask,
  type GanttViewMode,
  type TaskFilterMode,
  type TimelineZoomLevel,
} from '../utils/ganttEngine';
import {
  computeExportTimelineRange,
  exportGanttChartToPng,
} from '../utils/ganttImageExport';
import {
  ConfirmActionModal,
  ProjectSettingsModal,
  ResourceManagerModal,
  TaskEditorModal,
} from './gantt/GanttModals';
import {
  GANTT_HEADER_HEIGHT,
  GANTT_ROW_HEIGHT,
  GanttTimelinePane,
} from './gantt/GanttTimelinePane';

const STORAGE_KEY = 'hcmut-gantt-project-v2';

function loadInitialProjectState(): GanttProjectState {
  if (typeof window === 'undefined') {
    return createSampleProjectState();
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createSampleProjectState();
    }
    return parseGanttFile(saved);
  } catch {
    return createSampleProjectState();
  }
}

export function GanttChartToolView() {
  const [project, setProject] = useState<GanttProjectState>(() =>
    loadInitialProjectState()
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(
    () => project.tasks[1]?.id ?? project.tasks[0]?.id ?? null
  );
  const [filterMode, setFilterMode] = useState<TaskFilterMode>('all');
  const [viewMode, setViewMode] = useState<GanttViewMode>('project');
  const [zoomLevel, setZoomLevel] = useState<TimelineZoomLevel>('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [leftPaneWidth, setLeftPaneWidth] = useState(468);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [inlineColorTaskId, setInlineColorTaskId] = useState<number | null>(
    null
  );
  const [editingDateCell, setEditingDateCell] = useState<{
    taskId: number;
    field: 'start' | 'end';
  } | null>(null);

  // Modal states
  const [taskModal, setTaskModal] = useState<{
    mode: 'add' | 'edit';
    task: Partial<GanttTask> | null;
  } | null>(null);
  const [resourcesModalOpen, setResourcesModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
  } | null>(null);

  const ganttFileInputRef = useRef<HTMLInputElement | null>(null);
  const csvFileInputRef = useRef<HTMLInputElement | null>(null);
  const importExportMenuRef = useRef<HTMLDivElement | null>(null);
  const leftPaneRef = useRef<HTMLDivElement | null>(null);
  const timelinePaneRef = useRef<HTMLDivElement | null>(null);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);
  const isSyncingScrollRef = useRef(false);

  const todayIso = useMemo(() => getTodayIsoDate(), []);

  // Persist changes to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, serializeGanttFile(project));
    } catch {
      // Ignore storage quota errors
    }
  }, [project]);

  // Auto-dismiss transient status notice
  useEffect(() => {
    if (!statusNotice) return;
    const timer = window.setTimeout(() => setStatusNotice(null), 3200);
    return () => window.clearTimeout(timer);
  }, [statusNotice]);

  // Close Import/Export dropdown or inline color popover on outside click
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (
        importExportOpen &&
        importExportMenuRef.current &&
        !importExportMenuRef.current.contains(e.target as Node)
      ) {
        setImportExportOpen(false);
      }
      if (inlineColorTaskId !== null) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-color-popover]')) {
          setInlineColorTaskId(null);
        }
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [importExportOpen, inlineColorTaskId]);

  const visibleProjectRows = useMemo(
    () =>
      flattenVisibleTasks(project.tasks, filterMode, searchQuery, todayIso),
    [project.tasks, filterMode, searchQuery, todayIso]
  );

  const resourceGroups = useMemo(
    () =>
      buildResourceGroups(
        project.tasks,
        project.resources,
        filterMode,
        searchQuery,
        todayIso
      ),
    [project.tasks, project.resources, filterMode, searchQuery, todayIso]
  );

  const { startIso: rangeStartIso, totalDays } = useMemo(
    () => getTimelineRange(project.tasks, todayIso),
    [project.tasks, todayIso]
  );

  const selectedTask =
    project.tasks.find((t) => t.id === selectedTaskId) ?? null;
  const allowIndent =
    viewMode === 'project' &&
    selectedTaskId !== null &&
    canIndentTask(project.tasks, selectedTaskId);
  const allowOutdent =
    viewMode === 'project' &&
    selectedTaskId !== null &&
    canOutdentTask(project.tasks, selectedTaskId);

  function syncScrollFromLeft(scrollTop: number) {
    if (isSyncingScrollRef.current) return;
    isSyncingScrollRef.current = true;
    if (timelinePaneRef.current) {
      timelinePaneRef.current.scrollTop = scrollTop;
    }
    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  }

  function syncScrollFromTimeline(scrollTop: number) {
    if (isSyncingScrollRef.current) return;
    isSyncingScrollRef.current = true;
    if (leftPaneRef.current) {
      leftPaneRef.current.scrollTop = scrollTop;
    }
    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  }

  function handleSplitterMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftPaneWidth;
    const containerWidth =
      splitContainerRef.current?.clientWidth ?? window.innerWidth;
    const maxLeft = Math.max(300, containerWidth - 260);

    function onMove(ev: MouseEvent) {
      const next = Math.max(260, Math.min(maxLeft, startWidth + (ev.clientX - startX)));
      setLeftPaneWidth(next);
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function scrollToDate(iso: string) {
    const pane = timelinePaneRef.current;
    if (!pane) return;
    const dayWidth = ZOOM_DAY_WIDTH[zoomLevel];
    const offset = diffCalendarDays(rangeStartIso, iso) * dayWidth;
    pane.scrollTo({
      left: Math.max(0, offset - pane.clientWidth / 3),
      behavior: 'smooth',
    });
  }

  function handleToggleToday(checked: boolean) {
    setProject((prev) => ({
      ...prev,
      settings: { ...prev.settings, showTodayLine: checked },
    }));
    if (checked) {
      scrollToDate(todayIso);
    }
  }

  function handleAddClick() {
    const baseStart = selectedTask
      ? selectedTask.start
      : normalizeWorkStart(todayIso, project.settings.workWeekMode, 1);
    setTaskModal({
      mode: 'add',
      task: {
        parentId: selectedTask?.parentId ?? null,
        name: '',
        start: baseStart,
        duration: 3,
        dependency: '',
        resources: [],
        color: '#2563eb',
        notes: '',
      },
    });
  }

  function handleEditClick(taskToEdit?: GanttTask) {
    const target = taskToEdit ?? selectedTask;
    if (!target) return;
    setTaskModal({ mode: 'edit', task: target });
  }

  function handleSaveTaskModal(
    draft: Omit<GanttTask, 'id'>,
    existingId?: number,
    updatedResources?: GanttResource[]
  ) {
    if (existingId !== undefined) {
      setProject((prev) => {
        const updated = prev.tasks.map((t) =>
          t.id === existingId ? { ...t, ...draft, id: existingId } : t
        );
        return {
          ...prev,
          tasks: recalculateProjectTasks(updated, prev.settings),
          resources: updatedResources ?? prev.resources,
        };
      });
      setStatusNotice(`Đã cập nhật công việc #${existingId}.`);
    } else {
      setProject((prev) => {
        const { tasks, createdId } = insertNewTask(
          prev.tasks,
          draft,
          prev.settings,
          selectedTaskId
        );
        setSelectedTaskId(createdId);
        return {
          ...prev,
          tasks,
          resources: updatedResources ?? prev.resources,
        };
      });
      setStatusNotice('Đã thêm công việc mới.');
    }
    setTaskModal(null);
  }

  function handleDeleteClick() {
    if (!selectedTask) return;
    const hasChildren = project.tasks.some(
      (t) => t.parentId === selectedTask.id
    );
    const executeDelete = () => {
      setProject((prev) => ({
        ...prev,
        tasks: deleteTaskAndDescendants(
          prev.tasks,
          selectedTask.id,
          prev.settings
        ),
      }));
      setSelectedTaskId(null);
      setConfirmModal(null);
      setStatusNotice(`Đã xóa "${selectedTask.name}".`);
    };

    if (hasChildren) {
      setConfirmModal({
        title: 'Xóa nhóm công việc?',
        message: `"${selectedTask.name}" đang chứa các công việc con. Xóa mục này sẽ xóa toàn bộ công việc con bên trong.`,
        confirmLabel: 'Xóa toàn bộ',
        onConfirm: executeDelete,
      });
    } else {
      executeDelete();
    }
  }

  function handleIndent() {
    if (!allowIndent || selectedTaskId === null) return;
    setProject((prev) => ({
      ...prev,
      tasks: indentTask(prev.tasks, selectedTaskId, prev.settings),
    }));
  }

  function handleOutdent() {
    if (!allowOutdent || selectedTaskId === null) return;
    setProject((prev) => ({
      ...prev,
      tasks: outdentTask(prev.tasks, selectedTaskId, prev.settings),
    }));
  }

  function handleExpandAll(expanded: boolean) {
    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => ({ ...t, expanded })),
    }));
  }

  function handleToggleExpandRow(taskId: number) {
    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === taskId ? { ...t, expanded: t.expanded === false } : t
      ),
    }));
  }

  function handleZoom(direction: 1 | -1) {
    const idx = ZOOM_LEVELS.indexOf(zoomLevel);
    const nextIdx = Math.max(0, Math.min(ZOOM_LEVELS.length - 1, idx + direction));
    setZoomLevel(ZOOM_LEVELS[nextIdx]);
  }

  function handleZoomToFit() {
    const paneWidth = timelinePaneRef.current?.clientWidth ?? 720;
    const span = Math.max(10, totalDays);
    const idealPxPerDay = paneWidth / span;
    if (idealPxPerDay >= 40) {
      setZoomLevel('day-wide');
    } else if (idealPxPerDay >= 22) {
      setZoomLevel('day');
    } else if (idealPxPerDay >= 10) {
      setZoomLevel('week');
    } else {
      setZoomLevel('month');
    }
    if (timelinePaneRef.current) {
      timelinePaneRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  function handleInlineFieldUpdate(
    taskId: number,
    patch: Partial<GanttTask>
  ) {
    setProject((prev) => {
      const workWeek = prev.settings.workWeekMode;
      const updated = prev.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const merged = { ...t, ...patch };
        if (patch.start !== undefined && patch.end === undefined) {
          merged.end = merged.isMilestone
            ? merged.start
            : computeEndDateFromDuration(
                merged.start,
                merged.duration,
                workWeek
              );
        } else if (patch.end !== undefined && patch.duration === undefined) {
          merged.duration = computeDurationDays(
            merged.start,
            merged.end,
            workWeek,
            merged.isMilestone
          );
        } else if (patch.duration !== undefined) {
          const dur = Math.max(0, Math.round(patch.duration));
          merged.duration = dur;
          merged.isMilestone = dur === 0;
          merged.end =
            dur === 0
              ? merged.start
              : computeEndDateFromDuration(merged.start, dur, workWeek);
        }
        return merged;
      });
      return {
        ...prev,
        tasks: recalculateProjectTasks(updated, prev.settings),
      };
    });
  }

  function handleTimelineDragCommit(
    taskId: number,
    mode: 'move' | 'resize-end',
    deltaDays: number
  ) {
    setProject((prev) => {
      const workWeek = prev.settings.workWeekMode;
      const updated = prev.tasks.map((t) => {
        if (t.id !== taskId) return t;
        if (mode === 'move') {
          const nextStart = normalizeWorkStart(
            addWorkingDays(t.start, deltaDays, 'all-days'),
            workWeek,
            deltaDays >= 0 ? 1 : -1
          );
          const nextEnd = t.isMilestone
            ? nextStart
            : computeEndDateFromDuration(nextStart, t.duration, workWeek);
          return { ...t, start: nextStart, end: nextEnd };
        }
        // resize-end
        const nextDur = Math.max(1, t.duration + deltaDays);
        const nextEnd = computeEndDateFromDuration(t.start, nextDur, workWeek);
        return {
          ...t,
          duration: nextDur,
          isMilestone: false,
          end: nextEnd,
        };
      });
      return {
        ...prev,
        tasks: recalculateProjectTasks(updated, prev.settings),
      };
    });
  }

  function triggerDownload(filename: string, content: string, mime: string) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleSaveGanttFile() {
    const safeSlug =
      project.settings.projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'du-an-gantt';
    triggerDownload(
      `${safeSlug}.gantt`,
      serializeGanttFile(project),
      'application/json;charset=utf-8'
    );
    setStatusNotice(`Đã tải xuống tệp ${safeSlug}.gantt.`);
  }

  async function handleExportImage() {
    try {
      const allExportTasks = project.tasks.map((t) => ({
        ...t,
        expanded: true,
      }));
      const exportProjectRows = flattenVisibleTasks(
        allExportTasks,
        filterMode,
        searchQuery,
        todayIso
      );
      const { startIso: exportStartIso, totalDays: exportTotalDays } =
        computeExportTimelineRange(allExportTasks, todayIso, zoomLevel);

      const { filename } = await exportGanttChartToPng({
        viewMode,
        projectRows: exportProjectRows,
        resourceGroups,
        settings: project.settings,
        zoomLevel,
        rangeStartIso: exportStartIso,
        totalDays: exportTotalDays,
        todayIso,
      });
      setStatusNotice(`Đã xuất ảnh biểu đồ (${filename}).`);
    } catch (err) {
      setStatusNotice(
        err instanceof Error ? err.message : 'Không thể xuất ảnh biểu đồ.'
      );
    }
  }

  function handleOpenGanttFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseGanttFile(String(reader.result ?? ''));
        setProject(parsed);
        setSelectedTaskId(parsed.tasks[0]?.id ?? null);
        setStatusNotice(`Đã mở tệp "${file.name}".`);
      } catch (err) {
        setStatusNotice(
          err instanceof Error ? err.message : 'Không thể đọc tệp .gantt.'
        );
      }
    };
    reader.readAsText(file);
  }

  function handleImportCsvFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedTasks = parseCsvToTasks(
          String(reader.result ?? ''),
          project.settings
        );
        setProject((prev) => ({ ...prev, tasks: importedTasks }));
        setSelectedTaskId(importedTasks[0]?.id ?? null);
        setStatusNotice(
          `Đã nhập ${importedTasks.length} công việc từ "${file.name}".`
        );
      } catch (err) {
        setStatusNotice(
          err instanceof Error ? err.message : 'Không thể đọc tệp CSV.'
        );
      }
    };
    reader.readAsText(file);
  }

  function handleNewProject() {
    setConfirmModal({
      title: 'Tạo dự án mới?',
      message:
        'Thao tác này sẽ thay thế bảng tiến độ hiện tại bằng một dự án mới trống. Bạn có thể lưu tệp .gantt trước nếu cần giữ lại.',
      confirmLabel: 'Tạo dự án mới',
      onConfirm: () => {
        const fresh = createEmptyProjectState();
        setProject(fresh);
        setSelectedTaskId(fresh.tasks[0]?.id ?? null);
        setConfirmModal(null);
        setStatusNotice('Đã tạo dự án mới.');
      },
    });
  }

  function handleViewSelectChange(val: string) {
    if (val === 'project' || val === 'resource') {
      setViewMode(val);
    } else if (val === 'edit-resources') {
      setResourcesModalOpen(true);
    } else if (val === 'edit-settings') {
      setSettingsModalOpen(true);
    }
  }

  function handleSaveResources(nextResources: GanttResource[]) {
    setProject((prev) => ({ ...prev, resources: nextResources }));
    setResourcesModalOpen(false);
    setStatusNotice('Đã cập nhật danh sách nhân sự.');
  }

  function handleSaveSettings(nextSettings: GanttSettings) {
    setProject((prev) => ({
      ...prev,
      settings: nextSettings,
      tasks: recalculateProjectTasks(prev.tasks, nextSettings),
    }));
    setSettingsModalOpen(false);
    setStatusNotice('Đã cập nhật cài đặt dự án.');
  }

  const cols = project.settings.columns;
  const totalSummaryCount = project.tasks.filter(
    (t) => !project.tasks.some((c) => c.parentId === t.id)
  ).length;

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8">
      {/* Editorial Header aligned with Muc 1, Muc 2, Muc 3 */}
      <header className="border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
            <span className="font-semibold text-blue-700">
              Chương 4: Quản lý dự án
            </span>
            <span aria-hidden="true">·</span>
            <span>Lập biểu đồ Gantt</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium tabular-nums text-slate-500">
            {statusNotice && (
              <span role="status" className="text-emerald-700">
                {statusNotice}
              </span>
            )}
            <span>{totalSummaryCount} công việc</span>
          </div>
        </div>

        <h1 className="mt-2 max-w-4xl text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {project.settings.projectName}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Lập bảng phân rã công việc (WBS), kéo thả thanh tiến độ, thiết lập
          ràng buộc phụ thuộc (<span className="font-mono text-xs">FS/SS/FF/SF</span>),
          theo dõi theo nhân sự và lưu hoặc mở trực tiếp tệp{' '}
          <span className="font-mono text-xs">.gantt</span> hoặc CSV.
        </p>
      </header>

      {/* Hidden File Inputs */}
      <input
        ref={ganttFileInputRef}
        type="file"
        accept=".gantt,.json"
        onChange={handleOpenGanttFile}
        className="hidden"
        aria-hidden="true"
      />
      <input
        ref={csvFileInputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleImportCsvFile}
        className="hidden"
        aria-hidden="true"
      />

      {/* Primary Action Toolbar (faithful to onlinegantt.com top action bar) */}
      <div
        role="toolbar"
        aria-label="Thanh công cụ tệp và chế độ xem"
        className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-t-xl border border-b-0 border-slate-200 bg-white px-3.5 py-2.5"
      >
        {/* File Operations */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleNewProject}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-semibold whitespace-nowrap shrink-0 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <FilePlus2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Tạo mới</span>
          </button>

          <button
            type="button"
            onClick={() => ganttFileInputRef.current?.click()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-semibold whitespace-nowrap shrink-0 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Mở (.gantt)</span>
          </button>

          <button
            type="button"
            onClick={handleSaveGanttFile}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-semibold whitespace-nowrap shrink-0 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lưu (.gantt)</span>
          </button>

          <button
            type="button"
            onClick={() => void handleExportImage()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-semibold whitespace-nowrap shrink-0 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Xuất ảnh (.png)</span>
          </button>

          <div ref={importExportMenuRef} className="relative">
            <button
              type="button"
              aria-expanded={importExportOpen}
              aria-haspopup="menu"
              onClick={() => setImportExportOpen((prev) => !prev)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-semibold whitespace-nowrap shrink-0 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <span>Nhập / Xuất</span>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            {importExportOpen && (
              <div
                role="menu"
                className="absolute left-0 top-10 z-40 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setImportExportOpen(false);
                    csvFileInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                >
                  <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Nhập từ CSV (.csv)</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setImportExportOpen(false);
                    void handleExportImage();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                >
                  <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Xuất ra ảnh (.png)</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setImportExportOpen(false);
                    triggerDownload(
                      'gantt-export.csv',
                      exportTasksToCsv(project.tasks),
                      'text/csv;charset=utf-8'
                    );
                    setStatusNotice('Đã xuất bảng công việc ra tệp CSV.');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Xuất ra CSV (.csv)</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setImportExportOpen(false);
                    handleSaveGanttFile();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Xuất ra JSON (.gantt)</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setImportExportOpen(false);
                    window.print();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>In / Xuất PDF</span>
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setImportExportOpen(false);
                    const sample = createSampleProjectState();
                    setProject(sample);
                    setSelectedTaskId(sample.tasks[1]?.id ?? null);
                    setStatusNotice('Đã khôi phục dự án mẫu.');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tải lại dữ liệu mẫu</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Controls: Today + Filter + View Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100">
            <input
              type="checkbox"
              checked={project.settings.showTodayLine}
              onChange={(e) => handleToggleToday(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
            />
            <span className="whitespace-nowrap">Hôm nay</span>
          </label>

          <select
            aria-label="Lọc công việc"
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as TaskFilterMode)}
            className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-800 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          >
            <option value="all">Tất cả công việc</option>
            <option value="milestones">Chỉ cột mốc (Milestone)</option>
            <option value="overdue">Đã qua hạn kết thúc</option>
          </select>

          <select
            aria-label="Chế độ hiển thị và cài đặt"
            value={viewMode}
            onChange={(e) => handleViewSelectChange(e.target.value)}
            className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-800 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          >
            <option value="project">Chế độ Dự án</option>
            <option value="resource">Chế độ Nhân sự</option>
            <option value="edit-resources">Quản lý nhân sự...</option>
            <option value="edit-settings">Cài đặt dự án...</option>
          </select>
        </div>
      </div>

      {/* Main Framed Gantt Workspace */}
      <div className="overflow-hidden rounded-b-xl border border-slate-200 bg-white shadow-xs">
        {/* Secondary Gantt Toolbar */}
        <div
          role="toolbar"
          aria-label="Thao tác biểu đồ Gantt"
          className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2"
        >
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={handleAddClick}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-semibold whitespace-nowrap text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <Plus className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
              <span>Thêm</span>
            </button>

            <button
              type="button"
              disabled={!selectedTask}
              onClick={() => handleEditClick()}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Sửa</span>
            </button>

            <button
              type="button"
              disabled={!selectedTask}
              onClick={handleDeleteClick}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Xóa</span>
            </button>

            <span className="mx-1 h-4 w-px bg-slate-200" aria-hidden="true" />

            <button
              type="button"
              disabled={!allowIndent}
              onClick={handleIndent}
              title="Thụt lề thành công việc con"
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Thụt lề</span>
            </button>

            <button
              type="button"
              disabled={!allowOutdent}
              onClick={handleOutdent}
              title="Bỏ thụt lề ra cấp cha"
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Bỏ thụt lề</span>
            </button>

            <span className="mx-1 h-4 w-px bg-slate-200" aria-hidden="true" />

            <button
              type="button"
              onClick={() => handleExpandAll(true)}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <ChevronsUpDown className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Mở tất cả</span>
            </button>

            <button
              type="button"
              onClick={() => handleExpandAll(false)}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <ChevronsDownUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Thu gọn</span>
            </button>

            <span className="mx-1 h-4 w-px bg-slate-200" aria-hidden="true" />

            <button
              type="button"
              disabled={zoomLevel === 'day-wide'}
              onClick={() => handleZoom(1)}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Phóng to</span>
            </button>

            <button
              type="button"
              disabled={zoomLevel === 'month'}
              onClick={() => handleZoom(-1)}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Thu nhỏ</span>
            </button>

            <button
              type="button"
              onClick={handleZoomToFit}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Vừa khung</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-56">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm công việc, nhân sự..."
              aria-label="Tìm kiếm công việc"
              className="h-8 w-full rounded-md border border-slate-300 bg-white pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Xóa từ khóa tìm kiếm"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-700"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Split-Pane Grid + Timeline */}
        <div
          ref={splitContainerRef}
          className="flex h-[540px] flex-col md:flex-row"
        >
          {/* Left Pane: TreeGrid Table */}
          <div
            ref={leftPaneRef}
            onScroll={(e) => syncScrollFromLeft(e.currentTarget.scrollTop)}
            style={{ width: undefined }}
            className="h-[260px] w-full shrink-0 overflow-auto border-b border-slate-200 bg-white md:h-full md:w-[var(--left-pane-w)] md:border-b-0 md:border-r"
            data-testid="gantt-grid-pane"
          >
            <style>{`@media (min-width: 768px) { [data-testid="gantt-grid-pane"] { width: ${leftPaneWidth}px !important; } }`}</style>

            {viewMode === 'project' ? (
              <table className="w-max min-w-full border-collapse text-left text-xs">
                <thead
                  className="sticky top-0 z-20 bg-slate-50 text-[11px] font-semibold text-slate-700"
                  style={{ height: GANTT_HEADER_HEIGHT }}
                >
                  <tr className="border-b border-slate-200">
                    {cols.id && (
                      <th className="w-11 border-r border-slate-200 px-2 text-center">
                        ID
                      </th>
                    )}
                    <th className="min-w-[220px] border-r border-slate-200 px-3">
                      Tên công việc
                    </th>
                    {cols.start && (
                      <th className="w-28 border-r border-slate-200 px-2.5">
                        Bắt đầu
                      </th>
                    )}
                    {cols.end && (
                      <th className="w-28 border-r border-slate-200 px-2.5">
                        Kết thúc
                      </th>
                    )}
                    {cols.duration && (
                      <th className="w-22 border-r border-slate-200 px-2.5 text-right">
                        Thời lượng
                      </th>
                    )}
                    {cols.dependency && (
                      <th className="w-24 border-r border-slate-200 px-2.5">
                        Phụ thuộc
                      </th>
                    )}
                    {cols.resources && (
                      <th className="min-w-[140px] border-r border-slate-200 px-2.5">
                        Nhân sự
                      </th>
                    )}
                    {cols.color && (
                      <th className="w-16 border-r border-slate-200 px-2 text-center">
                        Màu
                      </th>
                    )}
                    {cols.notes && (
                      <th className="min-w-[180px] px-2.5">Ghi chú</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {visibleProjectRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-10 text-center text-xs text-slate-500"
                      >
                        Không có công việc nào khớp bộ lọc hiện tại.
                      </td>
                    </tr>
                  ) : (
                    visibleProjectRows.map((row) => {
                      const { task, depth, hasChildren, isSummary } = row;
                      const isSelected = selectedTaskId === task.id;
                      const isExpanded = task.expanded !== false;

                      return (
                        <tr
                          key={task.id}
                          onClick={() => setSelectedTaskId(task.id)}
                          onDoubleClick={() => handleEditClick(task)}
                          style={{ height: GANTT_ROW_HEIGHT }}
                          className={`cursor-pointer border-b border-slate-100 transition-colors ${
                            isSelected
                              ? 'bg-blue-50/75 text-slate-950'
                              : 'hover:bg-slate-50/90'
                          }`}
                        >
                          {cols.id && (
                            <td className="border-r border-slate-100 px-2 text-center font-mono text-[11px] tabular-nums text-slate-500">
                              {task.id}
                            </td>
                          )}

                          <td className="border-r border-slate-100 px-2.5">
                            <div
                              className="flex items-center gap-1.5"
                              style={{ paddingLeft: depth * 16 }}
                            >
                              {hasChildren ? (
                                <button
                                  type="button"
                                  aria-label={
                                    isExpanded
                                      ? `Thu gọn ${task.name}`
                                      : `Mở rộng ${task.name}`
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleExpandRow(task.id);
                                  }}
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-200/70 hover:text-slate-900"
                                >
                                  {isExpanded ? (
                                    <ChevronDown
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ChevronRight
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </button>
                              ) : (
                                <span
                                  className="inline-block w-5 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                className={`truncate ${
                                  isSummary
                                    ? 'font-semibold text-slate-900'
                                    : task.isMilestone
                                      ? 'font-medium text-slate-800 italic'
                                      : 'text-slate-800'
                                }`}
                              >
                                {task.name}
                              </span>
                            </div>
                          </td>

                          {cols.start && (
                            <td
                              className="border-r border-slate-100 px-2.5 font-mono text-[11px] tabular-nums text-slate-600"
                              onClick={(e) => {
                                if (!isSummary) {
                                  e.stopPropagation();
                                  setSelectedTaskId(task.id);
                                  setEditingDateCell({
                                    taskId: task.id,
                                    field: 'start',
                                  });
                                }
                              }}
                            >
                              {!isSummary &&
                              editingDateCell?.taskId === task.id &&
                              editingDateCell.field === 'start' ? (
                                <input
                                  type="date"
                                  autoFocus
                                  aria-label={`Ngày bắt đầu ${task.name}`}
                                  value={task.start}
                                  onBlur={() => setEditingDateCell(null)}
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      handleInlineFieldUpdate(task.id, {
                                        start: e.target.value,
                                      });
                                    }
                                    setEditingDateCell(null);
                                  }}
                                  className="w-full rounded bg-white text-[11px] tabular-nums focus:outline-none focus:ring-1 focus:ring-blue-700"
                                />
                              ) : (
                                <span
                                  title={
                                    isSummary
                                      ? undefined
                                      : 'Nhấp để sửa ngày bắt đầu'
                                  }
                                >
                                  {task.start}
                                </span>
                              )}
                            </td>
                          )}

                          {cols.end && (
                            <td
                              className="border-r border-slate-100 px-2.5 font-mono text-[11px] tabular-nums text-slate-600"
                              onClick={(e) => {
                                if (!isSummary && !task.isMilestone) {
                                  e.stopPropagation();
                                  setSelectedTaskId(task.id);
                                  setEditingDateCell({
                                    taskId: task.id,
                                    field: 'end',
                                  });
                                }
                              }}
                            >
                              {!isSummary &&
                              !task.isMilestone &&
                              editingDateCell?.taskId === task.id &&
                              editingDateCell.field === 'end' ? (
                                <input
                                  type="date"
                                  autoFocus
                                  aria-label={`Ngày kết thúc ${task.name}`}
                                  value={task.end}
                                  onBlur={() => setEditingDateCell(null)}
                                  onChange={(e) => {
                                    if (
                                      e.target.value &&
                                      e.target.value >= task.start
                                    ) {
                                      handleInlineFieldUpdate(task.id, {
                                        end: e.target.value,
                                      });
                                    }
                                    setEditingDateCell(null);
                                  }}
                                  className="w-full rounded bg-white text-[11px] tabular-nums focus:outline-none focus:ring-1 focus:ring-blue-700"
                                />
                              ) : (
                                <span
                                  title={
                                    isSummary || task.isMilestone
                                      ? undefined
                                      : 'Nhấp để sửa ngày kết thúc'
                                  }
                                >
                                  {task.end}
                                </span>
                              )}
                            </td>
                          )}

                          {cols.duration && (
                            <td className="border-r border-slate-100 px-2.5 text-right tabular-nums text-slate-600">
                              {task.duration} ngày
                            </td>
                          )}

                          {cols.dependency && (
                            <td className="border-r border-slate-100 px-2.5 font-mono text-[11px] text-slate-600">
                              {task.dependency || '—'}
                            </td>
                          )}

                          {cols.resources && (
                            <td className="max-w-[160px] truncate border-r border-slate-100 px-2.5 text-slate-700">
                              {task.resources.length > 0
                                ? task.resources.join(', ')
                                : '—'}
                            </td>
                          )}

                          {cols.color && (
                            <td
                              data-color-popover
                              className="relative border-r border-slate-100 px-2 text-center"
                            >
                              {isSummary ? (
                                <span
                                  className="inline-block h-4 w-4 rounded-sm bg-slate-500"
                                  title="Màu mặc định nhóm tổng hợp"
                                />
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    aria-label={`Đổi màu cho ${task.name}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setInlineColorTaskId((prev) =>
                                        prev === task.id ? null : task.id
                                      );
                                    }}
                                    style={{ backgroundColor: task.color }}
                                    className="inline-block h-4 w-4 rounded-sm border border-black/15 align-middle transition-transform hover:scale-110"
                                  />
                                  {inlineColorTaskId === task.id && (
                                    <div className="absolute right-1 top-9 z-40 flex gap-1 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
                                      {GANTT_COLOR_PALETTE.map((swatch) => (
                                        <button
                                          key={swatch.bar}
                                          type="button"
                                          aria-label={`Chọn ${swatch.name}`}
                                          style={{ backgroundColor: swatch.bar }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleInlineFieldUpdate(task.id, {
                                              color: swatch.bar,
                                            });
                                            setInlineColorTaskId(null);
                                          }}
                                          className="h-5 w-5 rounded-sm border border-black/15 hover:scale-110"
                                        />
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </td>
                          )}

                          {cols.notes && (
                            <td className="max-w-[200px] truncate px-2.5 text-slate-500">
                              {task.notes || ''}
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            ) : (
              /* Resource View Table */
              <table className="w-max min-w-full border-collapse text-left text-xs">
                <thead
                  className="sticky top-0 z-20 bg-slate-50 text-[11px] font-semibold text-slate-700"
                  style={{ height: GANTT_HEADER_HEIGHT }}
                >
                  <tr className="border-b border-slate-200">
                    <th className="min-w-[230px] border-r border-slate-200 px-3">
                      Nhân sự / Công việc
                    </th>
                    <th className="w-24 border-r border-slate-200 px-2.5">
                      Bắt đầu
                    </th>
                    <th className="w-24 border-r border-slate-200 px-2.5">
                      Kết thúc
                    </th>
                    <th className="w-20 px-2.5 text-right">
                      Thời lượng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resourceGroups.map((grp) => (
                    <FragmentResourceRows
                      key={grp.resourceName}
                      group={grp}
                      selectedTaskId={selectedTaskId}
                      onSelectTask={setSelectedTaskId}
                      onEditTask={handleEditClick}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Draggable Splitter (Desktop) */}
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Kéo để thay đổi chiều rộng bảng công việc"
            onMouseDown={handleSplitterMouseDown}
            className="hidden w-1.5 shrink-0 cursor-col-resize items-center justify-center border-r border-slate-200 bg-slate-100 transition-colors hover:bg-blue-200 md:flex"
          >
            <div className="h-8 w-0.5 rounded-full bg-slate-400" />
          </div>

          {/* Right Pane: Timeline Chart */}
          <GanttTimelinePane
            timelineRef={timelinePaneRef}
            viewMode={viewMode}
            projectRows={visibleProjectRows}
            resourceGroups={resourceGroups}
            selectedTaskId={selectedTaskId}
            zoomLevel={zoomLevel}
            rangeStartIso={rangeStartIso}
            totalDays={totalDays}
            todayIso={todayIso}
            showTodayLine={project.settings.showTodayLine}
            onSelectTask={setSelectedTaskId}
            onEditTask={(task) => handleEditClick(task)}
            onDragCommit={handleTimelineDragCommit}
            onScrollSync={syncScrollFromTimeline}
          />
        </div>
      </div>

      {/* Modals */}
      {taskModal && (
        <TaskEditorModal
          mode={taskModal.mode}
          initialTask={taskModal.task}
          allTasks={project.tasks}
          resources={project.resources}
          settings={project.settings}
          onSave={handleSaveTaskModal}
          onClose={() => setTaskModal(null)}
        />
      )}

      {resourcesModalOpen && (
        <ResourceManagerModal
          resources={project.resources}
          onSave={handleSaveResources}
          onClose={() => setResourcesModalOpen(false)}
        />
      )}

      {settingsModalOpen && (
        <ProjectSettingsModal
          settings={project.settings}
          onSave={handleSaveSettings}
          onClose={() => setSettingsModalOpen(false)}
        />
      )}

      {confirmModal && (
        <ConfirmActionModal
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel={confirmModal.confirmLabel}
          onConfirm={confirmModal.onConfirm}
          onClose={() => setConfirmModal(null)}
        />
      )}
    </div>
  );
}

function FragmentResourceRows({
  group,
  selectedTaskId,
  onSelectTask,
  onEditTask,
}: {
  group: {
    resourceName: string;
    role: string;
    tasks: GanttTask[];
    totalDuration: number;
  };
  selectedTaskId: number | null;
  onSelectTask: (id: number) => void;
  onEditTask: (task: GanttTask) => void;
}) {
  return (
    <>
      <tr
        style={{ height: GANTT_ROW_HEIGHT }}
        className="border-b border-slate-200 bg-slate-100/80 font-semibold text-slate-900"
      >
        <td className="border-r border-slate-200 px-3">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate">{group.resourceName}</span>
            <span className="text-[11px] font-normal text-slate-500">
              {group.tasks.length} việc
            </span>
          </div>
        </td>
        <td className="border-r border-slate-200 px-2.5 text-slate-500">—</td>
        <td className="border-r border-slate-200 px-2.5 text-slate-500">—</td>
        <td className="px-2.5 text-right tabular-nums text-slate-700">
          {group.totalDuration} ngày
        </td>
      </tr>
      {group.tasks.map((task) => {
        const isSelected = selectedTaskId === task.id;
        return (
          <tr
            key={`${group.resourceName}-${task.id}`}
            onClick={() => onSelectTask(task.id)}
            onDoubleClick={() => onEditTask(task)}
            style={{ height: GANTT_ROW_HEIGHT }}
            className={`cursor-pointer border-b border-slate-100 transition-colors ${
              isSelected ? 'bg-blue-50/75' : 'hover:bg-slate-50'
            }`}
          >
            <td className="border-r border-slate-100 pl-7 pr-2.5 text-slate-800">
              <span className="truncate">
                #{task.id} · {task.name}
              </span>
            </td>
            <td className="border-r border-slate-100 px-2.5 font-mono text-[11px] tabular-nums text-slate-600">
              {task.start}
            </td>
            <td className="border-r border-slate-100 px-2.5 font-mono text-[11px] tabular-nums text-slate-600">
              {task.end}
            </td>
            <td className="px-2.5 text-right tabular-nums text-slate-600">
              {task.duration} ngày
            </td>
          </tr>
        );
      })}
    </>
  );
}
