import { useId, useRef, useState } from 'react';
import { Check, Copy, Plus, RotateCcw, X } from 'lucide-react';
import {
  buildDesignDecisionTsv,
  clampScaleValue,
  computeSensitivityFlips,
  createDemoDesignState,
  createUniqueDesignId,
  type DesignDecisionState,
  formatScoreVi,
  getNextOptionName,
  getRadarCriterionLabelLayout,
  getRadarPoint,
  getTopOptionIndices,
  MAX_DESIGN_CRITERIA,
  MAX_DESIGN_OPTIONS,
  MIN_DESIGN_CRITERIA,
  MIN_DESIGN_OPTIONS,
  OPTION_COLOR_THEMES,
  rankDesignOptions,
  resolveHighlightedOptionIndices,
  SCORE_MAX,
  SCORE_MIN,
} from '../utils/designDecision';

export function DesignDecisionToolView() {
  const [state, setState] = useState<DesignDecisionState>(() =>
    createDemoDesignState()
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );
  const nextIdCounterRef = useRef(1);
  const projectInputId = useId();

  function handleToggleOptionFocus(optionId: string) {
    setSelectedOptionId((prev) => (prev === optionId ? null : optionId));
  }

  function handleProjectNameChange(projectName: string) {
    setState((prev) => ({ ...prev, projectName }));
    setCopyStatus('idle');
  }

  function handleOptionNameChange(optionIndex: number, name: string) {
    setState((prev) => ({
      ...prev,
      options: prev.options.map((opt, idx) =>
        idx === optionIndex ? { ...opt, name } : opt
      ),
    }));
    setCopyStatus('idle');
  }

  function handleAddOption() {
    const candidateMin = nextIdCounterRef.current;
    setState((prev) => {
      if (prev.options.length >= MAX_DESIGN_OPTIONS) {
        return prev;
      }
      const { id, nextCounter } = createUniqueDesignId(
        'opt',
        prev.options.map((opt) => opt.id),
        candidateMin
      );
      nextIdCounterRef.current = Math.max(nextIdCounterRef.current, nextCounter);
      return {
        ...prev,
        options: [
          ...prev.options,
          { id, name: getNextOptionName(prev.options) },
        ],
        criteria: prev.criteria.map((criterion) => ({
          ...criterion,
          scores: [...criterion.scores, 3],
        })),
      };
    });
    setCopyStatus('idle');
  }

  function handleRemoveOption(optionIndex: number) {
    const removedId = state.options[optionIndex]?.id;
    setState((prev) => {
      if (prev.options.length <= MIN_DESIGN_OPTIONS) {
        return prev;
      }
      return {
        ...prev,
        options: prev.options.filter((_, idx) => idx !== optionIndex),
        criteria: prev.criteria.map((criterion) => ({
          ...criterion,
          scores: criterion.scores.filter((_, idx) => idx !== optionIndex),
        })),
      };
    });
    if (removedId && selectedOptionId === removedId) {
      setSelectedOptionId(null);
    }
    setCopyStatus('idle');
  }

  function handleCriterionNameChange(criterionIndex: number, name: string) {
    setState((prev) => ({
      ...prev,
      criteria: prev.criteria.map((c, idx) =>
        idx === criterionIndex ? { ...c, name } : c
      ),
    }));
    setCopyStatus('idle');
  }

  function handleCriterionWeightChange(
    criterionIndex: number,
    rawWeight: number
  ) {
    const weight = clampScaleValue(rawWeight);
    setState((prev) => ({
      ...prev,
      criteria: prev.criteria.map((c, idx) =>
        idx === criterionIndex ? { ...c, weight } : c
      ),
    }));
    setCopyStatus('idle');
  }

  function handleOptionScoreChange(
    criterionIndex: number,
    optionIndex: number,
    rawScore: number
  ) {
    const nextScore = clampScaleValue(rawScore);
    setState((prev) => ({
      ...prev,
      criteria: prev.criteria.map((c, idx) => {
        if (idx !== criterionIndex) {
          return c;
        }
        return {
          ...c,
          scores: c.scores.map((s, oIdx) =>
            oIdx === optionIndex ? nextScore : s
          ),
        };
      }),
    }));
    setCopyStatus('idle');
  }

  function handleAddCriterion() {
    const candidateMin = nextIdCounterRef.current;
    setState((prev) => {
      if (prev.criteria.length >= MAX_DESIGN_CRITERIA) {
        return prev;
      }
      const { id, nextCounter } = createUniqueDesignId(
        'crit',
        prev.criteria.map((criterion) => criterion.id),
        candidateMin
      );
      nextIdCounterRef.current = Math.max(nextIdCounterRef.current, nextCounter);
      return {
        ...prev,
        criteria: [
          ...prev.criteria,
          {
            id,
            name: 'Tiêu chí mới',
            weight: 3,
            scores: prev.options.map(() => 3),
          },
        ],
      };
    });
    setCopyStatus('idle');
  }

  function handleRemoveCriterion(criterionIndex: number) {
    setState((prev) => {
      if (prev.criteria.length <= MIN_DESIGN_CRITERIA) {
        return prev;
      }
      return {
        ...prev,
        criteria: prev.criteria.filter((_, idx) => idx !== criterionIndex),
      };
    });
    setCopyStatus('idle');
  }

  function handleResetDemo() {
    setState(createDemoDesignState());
    setSelectedOptionId(null);
    setCopyStatus('idle');
  }

  async function handleCopyTsv() {
    const tsvText = buildDesignDecisionTsv(state);

    const fallbackCopy = (): boolean => {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = tsvText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        return ok;
      } catch {
        return false;
      }
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(tsvText);
        setCopyStatus('copied');
        return;
      }
      setCopyStatus(fallbackCopy() ? 'copied' : 'error');
    } catch {
      setCopyStatus(fallbackCopy() ? 'copied' : 'error');
    }
  }

  const rankedOptions = rankDesignOptions(state.options, state.criteria);
  const topOptionIndices = getTopOptionIndices(rankedOptions);
  const highlightedOptionIndices = resolveHighlightedOptionIndices(
    state.options,
    topOptionIndices,
    selectedOptionId
  );
  const isTie = topOptionIndices.length > 1;
  const topEntry = rankedOptions[0];
  const secondEntry = rankedOptions[1];
  const sensitivityFlips = computeSensitivityFlips(
    state.options,
    state.criteria
  );

  const totalCriteria = state.criteria.length;
  const radarLevels = [1, 2, 3, 4, 5] as const;

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      {/* Editorial Header aligned with EngineeringQuizView */}
      <header className="border-b border-slate-200 pb-6 sm:pb-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="font-semibold text-blue-700">
            Chương 2: Thiết kế kỹ thuật
          </span>
          <span aria-hidden="true">·</span>
          <span>Chọn phương án thiết kế</span>
        </div>

        <h1 className="mt-2.5 max-w-3xl text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          Chọn phương án thiết kế
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          Nhập 2–5 phương án và các tiêu chí của đồ án, kéo thanh điểm 1–5 cho
          từng ô, rồi kéo độ quan trọng của từng tiêu chí. Biểu đồ và thứ hạng
          thay đổi ngay khi bạn kéo. Công cụ cũng cho biết kết quả sẽ đảo chiều
          ở đâu.
        </p>
      </header>

      {/* Two-Zone Workspace: Inputs (Left) + Sticky Radar, Ranking & Sensitivity (Right) */}
      <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:mt-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Zone: Project, Options, Criteria, and Report Export */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Card 1: Project Name & Options */}
          <section
            aria-labelledby="design-options-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
              <h2
                id="design-options-heading"
                className="text-base font-bold tracking-tight text-slate-900"
              >
                Đề tài và phương án
              </h2>
              <span className="text-xs tabular-nums text-slate-500">
                {state.options.length} / {MAX_DESIGN_OPTIONS} phương án
              </span>
            </div>

            <div className="mt-4">
              <label
                htmlFor={projectInputId}
                className="block text-xs font-semibold text-slate-700"
              >
                Tên đề tài
              </label>
              <input
                id={projectInputId}
                type="text"
                value={state.projectName}
                maxLength={60}
                onChange={(e) => handleProjectNameChange(e.target.value)}
                placeholder="Nhập tên đề tài đồ án"
                aria-label="Tên đề tài"
                className="mt-1.5 min-h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-sm font-medium text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            <div className="mt-4 space-y-2.5">
              {state.options.map((option, optionIndex) => {
                const theme =
                  OPTION_COLOR_THEMES[optionIndex] ?? OPTION_COLOR_THEMES[0];
                return (
                  <div key={option.id} className="flex items-center gap-2.5">
                    <span
                      className={`h-3 w-3 shrink-0 rounded-xs ${theme.swatchClass}`}
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      value={option.name}
                      maxLength={40}
                      onChange={(e) =>
                        handleOptionNameChange(optionIndex, e.target.value)
                      }
                      aria-label={`Tên phương án ${optionIndex + 1}`}
                      className="min-h-[42px] min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-sm text-slate-900 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(optionIndex)}
                      disabled={state.options.length <= MIN_DESIGN_OPTIONS}
                      aria-label={`Xóa ${option.name || `phương án ${optionIndex + 1}`}`}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddOption}
                disabled={state.options.length >= MAX_DESIGN_OPTIONS}
                className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Thêm phương án</span>
              </button>
            </div>
          </section>

          {/* Card 2: Criteria & 1-5 Sliders */}
          <section
            aria-labelledby="design-criteria-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
              <div>
                <h2
                  id="design-criteria-heading"
                  className="text-base font-bold tracking-tight text-slate-900"
                >
                  Tiêu chí và điểm (1 = kém, 5 = tốt nhất)
                </h2>
              </div>
              <button
                type="button"
                onClick={handleResetDemo}
                className="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Về dữ liệu mẫu</span>
              </button>
            </div>

            <div className="divide-y divide-slate-200">
              {state.criteria.map((criterion, criterionIndex) => (
                <div key={criterion.id} className="py-4 first:pt-4 last:pb-2">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="text"
                      value={criterion.name}
                      maxLength={40}
                      onChange={(e) =>
                        handleCriterionNameChange(
                          criterionIndex,
                          e.target.value
                        )
                      }
                      aria-label={`Tên tiêu chí ${criterionIndex + 1}`}
                      className="min-h-[40px] min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-sm font-semibold text-slate-900 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCriterion(criterionIndex)}
                      disabled={state.criteria.length <= MIN_DESIGN_CRITERIA}
                      aria-label={`Xóa tiêu chí ${criterion.name || criterionIndex + 1}`}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    {/* Criterion Weight Slider */}
                    <label className="grid grid-cols-[minmax(108px,156px)_1fr_28px] items-center gap-3 text-xs font-medium text-slate-600 sm:text-[13px]">
                      <span className="truncate">Độ quan trọng</span>
                      <input
                        type="range"
                        min={SCORE_MIN}
                        max={SCORE_MAX}
                        step={1}
                        value={criterion.weight}
                        onChange={(e) =>
                          handleCriterionWeightChange(
                            criterionIndex,
                            Number(e.target.value)
                          )
                        }
                        aria-label={`Độ quan trọng của ${criterion.name || `tiêu chí ${criterionIndex + 1}`}`}
                        className="h-6 w-full cursor-pointer accent-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                      />
                      <span className="text-right font-bold tabular-nums text-slate-900">
                        {criterion.weight}
                      </span>
                    </label>

                    {/* Per-Option Score Sliders */}
                    {state.options.map((option, optionIndex) => {
                      const theme =
                        OPTION_COLOR_THEMES[optionIndex] ??
                        OPTION_COLOR_THEMES[0];
                      const optionScore =
                        criterion.scores[optionIndex] ?? SCORE_MIN;
                      return (
                        <label
                          key={option.id}
                          className="grid grid-cols-[minmax(108px,156px)_1fr_28px] items-center gap-3 text-xs text-slate-700 sm:text-[13px]"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 shrink-0 rounded-xs ${theme.swatchClass}`}
                              aria-hidden="true"
                            />
                            <span className="truncate font-medium">
                              {option.name || `Phương án ${optionIndex + 1}`}
                            </span>
                          </span>
                          <input
                            type="range"
                            min={SCORE_MIN}
                            max={SCORE_MAX}
                            step={1}
                            value={optionScore}
                            onChange={(e) =>
                              handleOptionScoreChange(
                                criterionIndex,
                                optionIndex,
                                Number(e.target.value)
                              )
                            }
                            style={{ accentColor: theme.accentStyle }}
                            aria-label={`Điểm ${option.name || `Phương án ${optionIndex + 1}`} cho tiêu chí ${criterion.name || criterionIndex + 1}`}
                            className="h-6 w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                          />
                          <span className="text-right font-semibold tabular-nums text-slate-900">
                            {optionScore}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={handleAddCriterion}
                disabled={state.criteria.length >= MAX_DESIGN_CRITERIA}
                className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Thêm tiêu chí</span>
              </button>

              <span className="text-xs tabular-nums text-slate-500">
                {state.criteria.length} / {MAX_DESIGN_CRITERIA} tiêu chí
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Với tiêu chí chi phí, hãy tính điểm theo hướng “càng rẻ càng cao”.
            </p>
          </section>

          {/* Card 3: Report Export (Copy TSV) */}
          <section
            aria-labelledby="design-report-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <h2
              id="design-report-heading"
              className="text-base font-bold tracking-tight text-slate-900"
            >
              Đưa vào báo cáo
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Sao chép bảng đánh giá (có thêm độ quan trọng) rồi dán vào Excel
              hoặc Word.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyTsv}
                className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                {copyStatus === 'copied' ? (
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                <span>Sao chép bảng</span>
              </button>

              {copyStatus === 'copied' && (
                <span
                  role="status"
                  className="text-xs font-medium text-emerald-700 sm:text-sm"
                >
                  Đã sao chép. Dán vào Excel hoặc Word.
                </span>
              )}
              {copyStatus === 'error' && (
                <span
                  role="status"
                  className="text-xs font-medium text-rose-600 sm:text-sm"
                >
                  Không sao chép được, hãy thử lại.
                </span>
              )}
            </div>
          </section>
        </div>

        {/* Right Zone: Live Results, Radar Chart, Ranking Bars & Sensitivity */}
        <aside
          aria-live="polite"
          aria-label="Kết quả phân tích phương án thiết kế"
          className="flex flex-col gap-5 lg:sticky lg:top-20 lg:col-span-5"
        >
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            {/* Winner / Tie Summary Headline */}
            <div className="border-b border-slate-100 pb-3.5">
              {isTie ? (
                <>
                  <h2 className="text-balance text-lg font-bold leading-snug text-slate-900">
                    {topOptionIndices
                      .map((idx) => state.options[idx]?.name || `Phương án ${idx + 1}`)
                      .join(' và ')}{' '}
                    đang hòa điểm ở đầu bảng
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Hãy thêm tiêu chí hoặc chỉnh độ quan trọng để phân biệt.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-balance text-lg font-bold leading-snug text-slate-900">
                    {topEntry.option.name} có điểm cao nhất:{' '}
                    <span className="tabular-nums text-blue-700">
                      {formatScoreVi(topEntry.weightedScore)} / 5
                    </span>
                    {secondEntry
                      ? `, hơn ${secondEntry.option.name} ${formatScoreVi(
                          topEntry.weightedScore - secondEntry.weightedScore
                        )} điểm`
                      : ''}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Điểm xếp hạng là trung bình có nhân độ quan trọng. Biểu đồ
                    radar vẽ điểm gốc 1–5 của từng tiêu chí (số ×n cạnh tên là
                    độ quan trọng).
                  </p>
                </>
              )}
            </div>

            {/* SVG Radar Chart */}
            <div className="mt-3">
              <svg
                viewBox="0 0 560 345"
                role="img"
                aria-label="Biểu đồ radar so sánh các phương án"
                className="mx-auto block w-full max-w-[460px] overflow-visible"
              >
                {/* Concentric pentagon/polygon levels 1..5 */}
                {radarLevels.map((level) => {
                  const points = state.criteria
                    .map((_, i) =>
                      getRadarPoint(i, totalCriteria, level, 280, 172, 94).join(',')
                    )
                    .join(' ');
                  return (
                    <polygon
                      key={level}
                      points={points}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth={level === 5 ? 1.4 : 1}
                    />
                  );
                })}

                {/* Axes and Criterion Labels */}
                {state.criteria.map((criterion, i) => {
                  const endPoint = getRadarPoint(i, totalCriteria, 5, 280, 172, 94);
                  const labelLayout = getRadarCriterionLabelLayout(
                    i,
                    totalCriteria,
                    criterion.name,
                    criterion.weight,
                    280,
                    172,
                    114
                  );

                  return (
                    <g key={criterion.id}>
                      <line
                        x1={280}
                        y1={172}
                        x2={endPoint[0]}
                        y2={endPoint[1]}
                        stroke="#e2e8f0"
                        strokeWidth={1}
                      />
                      <text
                        x={labelLayout.x}
                        y={labelLayout.y}
                        fontSize={12.5}
                        fontWeight={500}
                        fill="#1e293b"
                        textAnchor={labelLayout.textAnchor}
                      >
                        {labelLayout.lines.map((line, lineIdx) => (
                          <tspan
                            key={lineIdx}
                            x={labelLayout.x}
                            dy={lineIdx === 0 ? 0 : labelLayout.lineHeight}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                {/* Option Score Polygons (render highlighted option last so bold stroke sits on top) */}
                {state.options
                  .map((option, optionIndex) => ({
                    option,
                    optionIndex,
                    isHighlighted: highlightedOptionIndices.includes(optionIndex),
                  }))
                  .sort((a, b) => Number(a.isHighlighted) - Number(b.isHighlighted))
                  .map(({ option, optionIndex, isHighlighted }) => {
                    const theme =
                      OPTION_COLOR_THEMES[optionIndex] ??
                      OPTION_COLOR_THEMES[0];
                    const vertexPoints = state.criteria.map((criterion, i) =>
                      getRadarPoint(
                        i,
                        totalCriteria,
                        criterion.scores[optionIndex] ?? SCORE_MIN,
                        280,
                        172,
                        94
                      )
                    );
                    const points = vertexPoints
                      .map((pt) => pt.join(','))
                      .join(' ');

                    return (
                      <g key={option.id}>
                        <polygon
                          points={points}
                          fill={theme.hex}
                          fillOpacity={isHighlighted ? 0.28 : 0.04}
                          stroke={theme.hex}
                          strokeOpacity={isHighlighted ? 1 : 0.65}
                          strokeWidth={isHighlighted ? 3.75 : 1.5}
                          strokeDasharray={isHighlighted ? undefined : '5 4'}
                          strokeLinejoin="round"
                        />
                        {isHighlighted &&
                          vertexPoints.map(([vx, vy], vIdx) => (
                            <circle
                              key={vIdx}
                              cx={vx}
                              cy={vy}
                              r={3.5}
                              fill={theme.hex}
                              stroke="#ffffff"
                              strokeWidth={1.5}
                            />
                          ))}
                      </g>
                    );
                  })}
              </svg>

              {/* Clickable Chart Legend: click to bold an option, defaults to highest */}
              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1.5 text-xs">
                {state.options.map((option, optionIndex) => {
                  const theme =
                    OPTION_COLOR_THEMES[optionIndex] ?? OPTION_COLOR_THEMES[0];
                  const isHighlighted =
                    highlightedOptionIndices.includes(optionIndex);
                  const label = option.name || `Phương án ${optionIndex + 1}`;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleToggleOptionFocus(option.id)}
                      aria-pressed={isHighlighted}
                      aria-label={`Tô đậm ${label} trên biểu đồ`}
                      className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                        isHighlighted
                          ? 'border-slate-300 bg-slate-100 font-bold text-slate-950'
                          : 'border-transparent font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-xs ${theme.swatchClass}`}
                        aria-hidden="true"
                      />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ranked Weighted Score Bars (fixed right column width so every track has identical pixel width) */}
            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
              {rankedOptions.map((entry) => {
                const theme =
                  OPTION_COLOR_THEMES[entry.optionIndex] ??
                  OPTION_COLOR_THEMES[0];
                const isTop = topOptionIndices.includes(entry.optionIndex);
                const isHighlighted = highlightedOptionIndices.includes(
                  entry.optionIndex
                );
                const widthPercent = Math.max(
                  0,
                  Math.min(100, (entry.weightedScore / SCORE_MAX) * 100)
                );
                const label =
                  entry.option.name || `Phương án ${entry.optionIndex + 1}`;

                return (
                  <button
                    key={entry.option.id}
                    type="button"
                    onClick={() => handleToggleOptionFocus(entry.option.id)}
                    aria-pressed={isHighlighted}
                    aria-label={`Tô đậm ${label}`}
                    className={`grid w-full grid-cols-[minmax(88px,118px)_1fr_5.75rem] items-center gap-3 rounded-lg px-2 py-1.5 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 sm:text-sm ${
                      isHighlighted
                        ? 'bg-slate-100/80 ring-1 ring-slate-200'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-xs ${theme.swatchClass}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`truncate ${
                          isHighlighted
                            ? 'font-bold text-slate-950'
                            : 'font-medium text-slate-700'
                        }`}
                      >
                        {label}
                      </span>
                    </span>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/70">
                      <div
                        style={{ width: `${widthPercent}%` }}
                        className={`h-full rounded-full transition-all duration-300 motion-reduce:transition-none ${
                          theme.barClass
                        } ${isHighlighted ? 'opacity-100' : 'opacity-75'}`}
                      />
                    </div>

                    <div className="flex items-center justify-end gap-1.5 whitespace-nowrap tabular-nums">
                      <span
                        className={
                          isHighlighted
                            ? 'font-extrabold text-slate-950'
                            : 'font-semibold text-slate-800'
                        }
                      >
                        {formatScoreVi(entry.weightedScore)}
                      </span>
                      {isTop && (
                        <span className="text-[11px] font-semibold text-emerald-700">
                          {isTie ? 'Hòa' : 'Cao nhất'}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sensitivity Check */}
            <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 text-xs leading-relaxed text-slate-700">
              <p className="text-sm font-bold text-slate-900">Kết quả có vững không?</p>
              {sensitivityFlips.length > 0 ? (
                <div className="mt-1.5 space-y-1">
                  {sensitivityFlips.map((flip) => (
                    <p key={`${flip.criterionId}-${flip.nextWeight}`}>
                      Nếu độ quan trọng của “{flip.criterionName}”{' '}
                      {flip.direction === 'increase' ? 'tăng lên' : 'giảm xuống'}{' '}
                      <span className="font-semibold tabular-nums">
                        {flip.nextWeight}
                      </span>
                      ,{' '}
                      <span className="font-semibold text-slate-900">
                        {flip.newWinnerName}
                      </span>{' '}
                      sẽ thắng.
                    </p>
                  ))}
                  <p className="pt-0.5 text-slate-500">
                    Vì vậy hãy chắc chắn độ quan trọng bạn chọn phản ánh đúng
                    yêu cầu của đề tài.
                  </p>
                </div>
              ) : (
                <p className="mt-1.5">
                  Đổi độ quan trọng của bất kỳ tiêu chí nào đi 1 bậc cũng không
                  đổi người thắng. Lựa chọn này khá vững.
                </p>
              )}
            </div>
          </section>
        </aside>
      </div>

    </div>
  );
}
