import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Plus, Trash2, X } from 'lucide-react';
import {
  computeDurationDays,
  computeEndDateFromDuration,
  formatDependencies,
  GANTT_COLOR_PALETTE,
  getDescendantIds,
  getTodayIsoDate,
  parseDependencyString,
  type DependencyType,
  type GanttColumnVisibility,
  type GanttDependency,
  type GanttResource,
  type GanttSettings,
  type GanttTask,
} from '../../utils/ganttEngine';

interface TaskEditorModalProps {
  mode: 'add' | 'edit';
  initialTask: Partial<GanttTask> | null;
  allTasks: readonly GanttTask[];
  resources: readonly GanttResource[];
  settings: GanttSettings;
  onSave: (
    draft: Omit<GanttTask, 'id'>,
    existingId?: number,
    updatedResources?: GanttResource[]
  ) => void;
  onClose: () => void;
}

export function TaskEditorModal({
  mode,
  initialTask,
  allTasks,
  resources,
  settings,
  onSave,
  onClose,
}: TaskEditorModalProps) {
  const existingId = mode === 'edit' ? initialTask?.id : undefined;
  const isEditingSummary =
    existingId !== undefined &&
    allTasks.some((t) => t.parentId === existingId);

  const defaultStart = initialTask?.start ?? getTodayIsoDate();
  const defaultDuration =
    initialTask?.isMilestone || initialTask?.duration === 0
      ? 0
      : initialTask?.duration ?? 3;
  const defaultEnd =
    defaultDuration === 0
      ? defaultStart
      : initialTask?.end ??
        computeEndDateFromDuration(
          defaultStart,
          defaultDuration,
          settings.workWeekMode
        );

  const [name, setName] = useState(initialTask?.name ?? '');
  const [parentId, setParentId] = useState<number | null>(
    initialTask?.parentId ?? null
  );
  const [isMilestone, setIsMilestone] = useState<boolean>(
    Boolean(initialTask?.isMilestone) || defaultDuration === 0
  );
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const [duration, setDuration] = useState(defaultDuration);
  const [selectedDeps, setSelectedDeps] = useState<GanttDependency[]>(() =>
    parseDependencyString(initialTask?.dependency ?? '')
  );
  const [depDropdownOpen, setDepDropdownOpen] = useState(false);
  const [localResources, setLocalResources] = useState<GanttResource[]>(() =>
    resources.map((r) => ({ ...r }))
  );
  const [selectedResources, setSelectedResources] = useState<string[]>(
    initialTask?.resources ?? []
  );
  const [addingResource, setAddingResource] = useState(false);
  const [newResourceName, setNewResourceName] = useState('');
  const [resourceError, setResourceError] = useState<string | null>(null);
  const [color, setColor] = useState(initialTask?.color ?? '#2563eb');
  const [notes, setNotes] = useState(initialTask?.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const depContainerRef = useRef<HTMLDivElement | null>(null);
  const newResourceInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (depDropdownOpen) {
          setDepDropdownOpen(false);
          return;
        }
        onClose();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [depDropdownOpen, onClose]);

  useEffect(() => {
    if (!depDropdownOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      if (
        depContainerRef.current &&
        !depContainerRef.current.contains(e.target as Node)
      ) {
        setDepDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [depDropdownOpen]);

  useEffect(() => {
    if (addingResource) {
      newResourceInputRef.current?.focus();
    }
  }, [addingResource]);

  const forbiddenParentIds =
    existingId !== undefined
      ? new Set([existingId, ...getDescendantIds(allTasks, existingId)])
      : new Set<number>();

  const parentCandidates = allTasks.filter((t) => !forbiddenParentIds.has(t.id));
  const dependencyCandidates = allTasks.filter((t) => t.id !== existingId);

  function handleStartChange(nextStart: string) {
    setStart(nextStart);
    if (isMilestone) {
      setEnd(nextStart);
      setDuration(0);
    } else {
      const nextEnd = computeEndDateFromDuration(
        nextStart,
        Math.max(1, duration),
        settings.workWeekMode
      );
      setEnd(nextEnd);
    }
  }

  function handleEndChange(nextEnd: string) {
    if (nextEnd < start) {
      setEnd(start);
      setDuration(isMilestone ? 0 : 1);
      return;
    }
    setEnd(nextEnd);
    if (!isMilestone) {
      setDuration(
        computeDurationDays(start, nextEnd, settings.workWeekMode, false)
      );
    }
  }

  function handleDurationChange(raw: number) {
    const val = Math.max(0, Math.round(raw || 0));
    if (val === 0) {
      setIsMilestone(true);
      setDuration(0);
      setEnd(start);
    } else {
      setIsMilestone(false);
      setDuration(val);
      setEnd(computeEndDateFromDuration(start, val, settings.workWeekMode));
    }
  }

  function handleMilestoneToggle(checked: boolean) {
    setIsMilestone(checked);
    if (checked) {
      setDuration(0);
      setEnd(start);
    } else {
      const nextDur = Math.max(1, duration || 3);
      setDuration(nextDur);
      setEnd(computeEndDateFromDuration(start, nextDur, settings.workWeekMode));
    }
  }

  function toggleDependencyTask(taskId: number) {
    setSelectedDeps((prev) => {
      if (prev.some((d) => d.predecessorId === taskId)) {
        return prev.filter((d) => d.predecessorId !== taskId);
      }
      return [...prev, { predecessorId: taskId, type: 'FS', lagDays: 0 }];
    });
  }

  function changeDependencyType(taskId: number, nextType: DependencyType) {
    setSelectedDeps((prev) =>
      prev.map((d) =>
        d.predecessorId === taskId ? { ...d, type: nextType } : d
      )
    );
  }

  function toggleResource(resName: string) {
    setSelectedResources((prev) =>
      prev.includes(resName)
        ? prev.filter((item) => item !== resName)
        : [...prev, resName]
    );
  }

  function handleAddInlineResource() {
    const trimmed = newResourceName.trim();
    if (!trimmed) {
      setResourceError('Vui lòng nhập tên nhân sự.');
      newResourceInputRef.current?.focus();
      return;
    }

    const existing = localResources.find(
      (r) => r.name.toLowerCase() === trimmed.toLowerCase()
    );
    const targetName = existing ? existing.name : trimmed;

    if (!existing) {
      setLocalResources((prev) => [
        ...prev,
        {
          id: `res-${Date.now()}-${prev.length + 1}`,
          name: trimmed,
          role: 'Thành viên',
        },
      ]);
    }

    setSelectedResources((prev) =>
      prev.includes(targetName) ? prev : [...prev, targetName]
    );
    setNewResourceName('');
    setResourceError(null);
    setAddingResource(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Vui lòng nhập tên công việc.');
      return;
    }
    onSave(
      {
        parentId,
        name: trimmed,
        start,
        end: isMilestone ? start : end,
        duration: isMilestone ? 0 : Math.max(1, duration),
        dependency: formatDependencies(selectedDeps),
        resources: selectedResources,
        color,
        notes: notes.trim(),
        isMilestone,
        expanded: initialTask?.expanded ?? true,
      },
      existingId,
      localResources
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gantt-task-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2
            id="gantt-task-modal-title"
            className="text-base font-bold text-slate-900"
          >
            {mode === 'add'
              ? 'Thêm công việc mới'
              : `Chỉnh sửa công việc #${existingId}`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng hộp thoại công việc"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            <div className="sm:col-span-8">
              <label
                htmlFor="gantt-task-name"
                className="mb-1 block text-xs font-semibold text-slate-700"
              >
                Tên công việc
              </label>
              <input
                id="gantt-task-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Ví dụ: Thiết kế mạch nguồn 5V"
                autoFocus
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
              />
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="gantt-task-parent"
                className="mb-1 block text-xs font-semibold text-slate-700"
              >
                Bậc (WBS)
              </label>
              <select
                id="gantt-task-parent"
                value={parentId === null ? '' : String(parentId)}
                onChange={(e) =>
                  setParentId(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
              >
                <option value="">Cấp cao nhất</option>
                {parentCandidates.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    #{candidate.id} — {candidate.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isEditingSummary ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600">
              Đây là công việc tổng hợp (có công việc con). Ngày bắt đầu, kết
              thúc, thời lượng và tiến độ được tự động tính từ các công việc
              con.
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <input
                  id="gantt-task-milestone"
                  type="checkbox"
                  checked={isMilestone}
                  onChange={(e) => handleMilestoneToggle(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                />
                <label
                  htmlFor="gantt-task-milestone"
                  className="text-xs font-medium text-slate-700"
                >
                  Đánh dấu là Cột mốc (Milestone · 0 ngày)
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="gantt-task-start"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    Ngày bắt đầu
                  </label>
                  <input
                    id="gantt-task-start"
                    type="date"
                    value={start}
                    onChange={(e) => handleStartChange(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs tabular-nums text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gantt-task-end"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    Ngày kết thúc
                  </label>
                  <input
                    id="gantt-task-end"
                    type="date"
                    value={end}
                    disabled={isMilestone}
                    onChange={(e) => handleEndChange(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs tabular-nums text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20 disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gantt-task-duration"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    Thời lượng (ngày)
                  </label>
                  <input
                    id="gantt-task-duration"
                    type="number"
                    min={0}
                    max={365}
                    value={duration}
                    onChange={(e) =>
                      handleDurationChange(Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs tabular-nums text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                  />
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div ref={depContainerRef} className="relative">
              <label
                htmlFor="gantt-task-dependency"
                className="mb-1 block text-xs font-semibold text-slate-700"
              >
                Phụ thuộc
              </label>
              <button
                id="gantt-task-dependency"
                type="button"
                aria-expanded={depDropdownOpen}
                aria-haspopup="listbox"
                onClick={() => setDepDropdownOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-xs text-slate-900 transition-colors hover:border-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
              >
                <span
                  className={`truncate ${
                    selectedDeps.length === 0
                      ? 'text-slate-400'
                      : 'font-mono font-medium text-slate-900'
                  }`}
                >
                  {selectedDeps.length === 0
                    ? 'Chọn công việc phụ thuộc...'
                    : formatDependencies(selectedDeps)}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                    depDropdownOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {depDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Danh sách công việc phụ thuộc"
                  aria-multiselectable="true"
                  className="absolute left-0 right-0 z-20 mt-1 max-h-52 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                >
                  {dependencyCandidates.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-slate-500">
                      Chưa có công việc nào khác để chọn.
                    </div>
                  ) : (
                    dependencyCandidates.map((candidate) => {
                      const activeDep = selectedDeps.find(
                        (d) => d.predecessorId === candidate.id
                      );
                      const checked = Boolean(activeDep);
                      return (
                        <div
                          key={candidate.id}
                          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs transition-colors ${
                            checked ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                          }`}
                        >
                          <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                toggleDependencyTask(candidate.id)
                              }
                              className="h-3.5 w-3.5 shrink-0 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                            />
                            <span className="truncate text-slate-800">
                              <span className="font-mono text-slate-500">
                                #{candidate.id}
                              </span>{' '}
                              · {candidate.name}
                            </span>
                          </label>
                          {checked && activeDep && (
                            <select
                              aria-label={`Loại phụ thuộc công việc #${candidate.id}`}
                              value={activeDep.type}
                              onChange={(e) =>
                                changeDependencyType(
                                  candidate.id,
                                  e.target.value as DependencyType
                                )
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="shrink-0 rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-700 focus:border-blue-700 focus:outline-none"
                            >
                              <option value="FS">FS</option>
                              <option value="SS">SS</option>
                              <option value="FF">FF</option>
                              <option value="SF">SF</option>
                            </select>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            <div>
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">
                Màu thanh tiến độ
              </span>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {GANTT_COLOR_PALETTE.map((swatch) => {
                  const active =
                    swatch.bar.toLowerCase() === color.toLowerCase();
                  return (
                    <button
                      key={swatch.bar}
                      type="button"
                      onClick={() => setColor(swatch.bar)}
                      aria-label={`Chọn màu ${swatch.name}`}
                      title={swatch.name}
                      style={{ backgroundColor: swatch.bar }}
                      className={`flex h-7 w-7 items-center justify-center rounded-md border transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                        active
                          ? 'scale-110 border-slate-900 ring-2 ring-slate-900/20'
                          : 'border-black/15 hover:scale-105'
                      }`}
                    >
                      {active && (
                        <Check
                          className="h-3.5 w-3.5 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700">
                Phân công nhân sự
              </span>
              <button
                type="button"
                aria-label="Thêm nhân sự mới"
                onClick={() => {
                  setAddingResource(true);
                  setResourceError(null);
                }}
                className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Thêm nhân sự</span>
              </button>
            </div>

            {localResources.length === 0 && !addingResource ? (
              <p className="text-xs text-slate-500">
                Chưa có nhân sự. Bấm nút + để thêm nhân sự mới.
              </p>
            ) : null}

            {localResources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {localResources.map((res) => {
                  const checked = selectedResources.includes(res.name);
                  return (
                    <label
                      key={res.id}
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                        checked
                          ? 'border-blue-700 bg-blue-50 font-semibold text-blue-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleResource(res.name)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                      />
                      <span>{res.name}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {addingResource && (
              <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                <div className="flex items-center gap-2">
                  <input
                    ref={newResourceInputRef}
                    type="text"
                    value={newResourceName}
                    onChange={(e) => {
                      setNewResourceName(e.target.value);
                      if (resourceError) setResourceError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInlineResource();
                      }
                    }}
                    placeholder="Nhập tên nhân sự..."
                    aria-label="Tên nhân sự mới"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                  />
                  <button
                    type="button"
                    onClick={handleAddInlineResource}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    Thêm
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddingResource(false);
                      setNewResourceName('');
                      setResourceError(null);
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    Hủy
                  </button>
                </div>
                {resourceError && (
                  <p
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-rose-600"
                  >
                    {resourceError}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="gantt-task-notes"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Ghi chú
            </label>
            <textarea
              id="gantt-task-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi chú chi tiết về yêu cầu, tài liệu hoặc đầu ra..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              {mode === 'add' ? 'Thêm công việc' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ResourceManagerModalProps {
  resources: readonly GanttResource[];
  onSave: (nextResources: GanttResource[]) => void;
  onClose: () => void;
}

export function ResourceManagerModal({
  resources,
  onSave,
  onClose,
}: ResourceManagerModalProps) {
  const [drafts, setDrafts] = useState<GanttResource[]>(() =>
    resources.map((r) => ({ ...r }))
  );
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  function handleAddResource() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setDrafts((prev) => [
      ...prev,
      {
        id: `res-${Date.now()}`,
        name: trimmed,
        role: newRole.trim() || 'Thành viên',
      },
    ]);
    setNewName('');
    setNewRole('');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gantt-resource-modal-title"
    >
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2
            id="gantt-resource-modal-title"
            className="text-base font-bold text-slate-900"
          >
            Quản lý nhân sự dự án
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng quản lý nhân sự"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-2">
            {drafts.length === 0 ? (
              <p className="text-xs text-slate-500">
                Chưa có nhân sự nào trong danh sách.
              </p>
            ) : (
              drafts.map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_1fr_auto] items-center gap-2"
                >
                  <input
                    type="text"
                    value={item.name}
                    aria-label={`Tên nhân sự ${idx + 1}`}
                    onChange={(e) =>
                      setDrafts((prev) =>
                        prev.map((r, i) =>
                          i === idx ? { ...r, name: e.target.value } : r
                        )
                      )
                    }
                    className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.role}
                    aria-label={`Vai trò nhân sự ${idx + 1}`}
                    onChange={(e) =>
                      setDrafts((prev) =>
                        prev.map((r, i) =>
                          i === idx ? { ...r, role: e.target.value } : r
                        )
                      )
                    }
                    className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-600 focus:border-blue-700 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setDrafts((prev) => prev.filter((_, i) => i !== idx))
                    }
                    aria-label={`Xóa nhân sự ${item.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-200 pt-3">
            <span className="mb-2 block text-xs font-semibold text-slate-700">
              Thêm thành viên mới
            </span>
            <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Họ và tên"
                aria-label="Họ và tên nhân sự mới"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-700 focus:outline-none"
              />
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Vai trò"
                aria-label="Vai trò nhân sự mới"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-600 focus:border-blue-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddResource}
                aria-label="Thêm nhân sự mới"
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Thêm</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() =>
                onSave(
                  drafts
                    .map((d) => ({ ...d, name: d.name.trim() }))
                    .filter((d) => d.name.length > 0)
                )
              }
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Lưu danh sách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectSettingsModalProps {
  settings: GanttSettings;
  onSave: (nextSettings: GanttSettings) => void;
  onClose: () => void;
}

const COLUMN_LABELS: { key: keyof GanttColumnVisibility; label: string }[] = [
  { key: 'id', label: 'Mã (ID)' },
  { key: 'start', label: 'Ngày bắt đầu' },
  { key: 'end', label: 'Ngày kết thúc' },
  { key: 'duration', label: 'Thời lượng' },
  { key: 'dependency', label: 'Phụ thuộc' },
  { key: 'resources', label: 'Nhân sự' },
  { key: 'color', label: 'Màu sắc' },
  { key: 'notes', label: 'Ghi chú' },
];

export function ProjectSettingsModal({
  settings,
  onSave,
  onClose,
}: ProjectSettingsModalProps) {
  const [draft, setDraft] = useState<GanttSettings>(() => ({
    ...settings,
    columns: { ...settings.columns },
  }));

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gantt-settings-modal-title"
    >
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2
            id="gantt-settings-modal-title"
            className="text-base font-bold text-slate-900"
          >
            Cài đặt dự án
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cài đặt dự án"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label
              htmlFor="gantt-settings-title"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Tên dự án
            </label>
            <input
              id="gantt-settings-title"
              type="text"
              value={draft.projectName}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, projectName: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="gantt-settings-workweek"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Ngày làm việc trong tuần
            </label>
            <select
              id="gantt-settings-workweek"
              value={draft.workWeekMode}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  workWeekMode: e.target.value as GanttSettings['workWeekMode'],
                }))
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
            >
              <option value="weekdays">Thứ 2 – Thứ 6 (bỏ cuối tuần)</option>
              <option value="all-days">Cả tuần (7 ngày / tuần)</option>
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={draft.autoScheduleDependencies}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  autoScheduleDependencies: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
            />
            <span>
              Tự động dời lịch công việc phụ thuộc khi công việc trước thay đổi
            </span>
          </label>

          <div className="border-t border-slate-200 pt-3">
            <span className="mb-2 block text-xs font-semibold text-slate-700">
              Các cột hiển thị trong bảng
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COLUMN_LABELS.map((col) => (
                <label
                  key={col.key}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={draft.columns[col.key]}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        columns: {
                          ...prev.columns,
                          [col.key]: e.target.checked,
                        },
                      }))
                    }
                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={() => onSave(draft)}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Áp dụng cài đặt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ConfirmActionModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmActionModal({
  title,
  message,
  confirmLabel,
  onConfirm,
  onClose,
}: ConfirmActionModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gantt-confirm-modal-title"
    >
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
        <h2
          id="gantt-confirm-modal-title"
          className="text-base font-bold text-slate-900"
        >
          {title}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
