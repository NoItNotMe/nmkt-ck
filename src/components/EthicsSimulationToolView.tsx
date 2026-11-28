import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  RotateCcw,
  Shuffle,
} from 'lucide-react';
import {
  buildEightStepExportText,
  computeBalanceAngleDegrees,
  computeEthicsStats,
  countEthicsCategoryCases,
  ETHICS_CASES,
  ETHICS_CATEGORIES,
  ETHICS_STORAGE_KEY,
  ETHICS_TEST_META,
  filterEthicsCasesByCategory,
  getEthicsCaseById,
  getNextEthicsCaseId,
  OPTION_LABELS,
  pickRandomEthicsCaseId,
  sanitizeEthicsProgress,
  type EthicsCategory,
  type EthicsProgressMap,
} from '../utils/ethicsCases';

interface EthicsSimulationToolViewProps {
  onBackToList?: () => void;
}

const TEST_SCORE_LABELS = ['Không đạt', 'Rủi ro', 'Đạt'] as const;

const BEAM_ROTATE_CLASSES: Record<number, string> = {
  [-12]: '-rotate-[12deg]',
  [-11]: '-rotate-[11deg]',
  [-10]: '-rotate-[10deg]',
  [-9]: '-rotate-[9deg]',
  [-8]: '-rotate-[8deg]',
  [-7]: '-rotate-[7deg]',
  [-6]: '-rotate-[6deg]',
  [-5]: '-rotate-[5deg]',
  [-4]: '-rotate-[4deg]',
  [-3]: '-rotate-[3deg]',
  [-2]: '-rotate-[2deg]',
  [-1]: '-rotate-[1deg]',
  [0]: 'rotate-0',
  [1]: 'rotate-[1deg]',
  [2]: 'rotate-[2deg]',
  [3]: 'rotate-[3deg]',
  [4]: 'rotate-[4deg]',
  [5]: 'rotate-[5deg]',
  [6]: 'rotate-[6deg]',
  [7]: 'rotate-[7deg]',
  [8]: 'rotate-[8deg]',
  [9]: 'rotate-[9deg]',
  [10]: 'rotate-[10deg]',
  [11]: 'rotate-[11deg]',
  [12]: 'rotate-[12deg]',
};

function getBeamRotationClass(angleDeg: number): string {
  return BEAM_ROTATE_CLASSES[angleDeg] ?? 'rotate-0';
}

export function EthicsSimulationToolView({
  onBackToList,
}: EthicsSimulationToolViewProps) {
  const [progress, setProgress] = useState<EthicsProgressMap>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(ETHICS_STORAGE_KEY);
      return raw ? sanitizeEthicsProgress(JSON.parse(raw)) : {};
    } catch {
      return {};
    }
  });

  const [currentId, setCurrentId] = useState<number>(1);
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState<EthicsCategory>('Tất cả');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ETHICS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }, [progress]);

  const currentCase = getEthicsCaseById(currentId);
  const selectedOpt =
    pickedIdx !== null ? (currentCase.opts[pickedIdx] ?? null) : null;
  const balanceAngle = computeBalanceAngleDegrees(progress);
  const stats = computeEthicsStats(progress);
  const filteredCases = filterEthicsCasesByCategory(activeCat);

  function selectCase(id: number) {
    setCurrentId(id);
    setPickedIdx(null);
    setCopyStatus('idle');
  }

  function handleSelectOption(idx: number) {
    const opt = currentCase.opts[idx];
    if (!opt) return;
    setPickedIdx(idx);
    setProgress((prev) => ({
      ...prev,
      [String(currentCase.id)]: opt.level,
    }));
  }

  function handleRandomCase() {
    selectCase(pickRandomEthicsCaseId(currentId));
  }

  function handleNextCase() {
    selectCase(getNextEthicsCaseId(currentId));
  }

  function handleResetProgress() {
    setProgress({});
    setPickedIdx(null);
    setCopyStatus('idle');
  }

  async function handleCopyReport() {
    const text = buildEightStepExportText(currentCase, pickedIdx);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard unavailable');
      }
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopyStatus('idle');
      copyTimerRef.current = null;
    }, 2200);
  }

  const stepsData = [
    { n: 1, b: 'Vấn đề đạo đức:', t: currentCase.s1, act: false },
    { n: 2, b: 'Dữ kiện cần kiểm tra:', t: currentCase.s2, act: false },
    { n: 3, b: 'Các bên liên quan:', t: currentCase.s3, act: false },
    {
      n: 4,
      b: 'Đề xuất phương án:',
      t: 'Đã liệt kê 3 hướng xử lý A, B, C ở cột bên trái.',
      act: false,
    },
    {
      n: 5,
      b: 'Kiểm tra 5 phép thử:',
      t: selectedOpt
        ? `Phương án ${OPTION_LABELS[pickedIdx!]} đạt ${
            selectedOpt.t.filter((x) => x === 2).length
          }/5 phép thử đạo đức.`
        : 'Đối chiếu từng phương án qua 5 tiêu chí ở bảng trên.',
      act: Boolean(selectedOpt),
    },
    {
      n: 6,
      b: 'Lựa chọn quyết định:',
      t: selectedOpt
        ? `Bạn đang chọn Phương án ${OPTION_LABELS[pickedIdx!]} (${selectedOpt.verdict}).`
        : 'Chọn phương án vượt qua tốt nhất 5 phép thử.',
      act: Boolean(selectedOpt),
    },
    { n: 7, b: 'Cách thực thi:', t: currentCase.s7, act: false },
    { n: 8, b: 'Bài học phòng ngừa:', t: currentCase.s8, act: false },
  ];

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">


      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="font-semibold text-blue-700">
            Chương 9: Đạo đức nghề nghiệp
          </span>
          <span aria-hidden="true">·</span>
          <span>Tình huống đạo đức</span>
        </div>

        <h1 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Tình huống đạo đức
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Chọn một tình huống thực tế bên dưới, thử đưa ra quyết định ở cột trái
          để kiểm tra kết quả qua <strong>5 phép thử đạo đức</strong> và đối
          chiếu trọn vẹn <strong>quy trình 8 bước</strong> ở cột phải.
        </p>
      </header>

      {/* Progress & Navigation Bar */}
      <section
        aria-label="Tiến độ và điều hướng"
        className="mt-6 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 border border-blue-200 tabular-nums">
            Đã phân tích: {stats.analyzedCount}/{stats.totalCount} tình huống
          </span>
          <span className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-200 tabular-nums">
            Đạt chuẩn 5 phép thử: {stats.goodCount} vụ
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleRandomCase}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-50"
          >
            <Shuffle className="h-3.5 w-3.5 text-slate-600" />
            <span>Bốc thăm ngẫu nhiên</span>
          </button>
          <button
            type="button"
            onClick={handleNextCase}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <span>Tình huống tiếp theo</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetProgress}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Xóa tiến độ</span>
          </button>
        </div>
      </section>

      {/* Main Two-Column Simulation Stage */}
      <section
        aria-label="Khu vực mô phỏng và phân tích"
        className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-2"
      >
        {/* Left Card: Case, Gauge & Choices */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
              {currentCase.cat}
            </span>
            <span className="text-xs font-semibold text-slate-500 tabular-nums">
              Tình huống {currentCase.id} / {ETHICS_CASES.length}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
              {currentCase.title}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              SCU Case: {currentCase.en}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">
            {currentCase.story}
          </p>

          {/* Ethical Balance Scale Gauge */}
          <div
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
            aria-hidden="true"
          >
            <svg viewBox="0 0 600 116" className="block h-auto max-h-[108px] w-full">
              <text
                x="14"
                y="18"
                className="fill-emerald-700 text-[11px] font-bold"
              >
                LIÊM CHÍNH &amp; AN TOÀN
              </text>
              <text
                x="586"
                y="18"
                textAnchor="end"
                className="fill-red-600 text-[11px] font-bold"
              >
                ÁP LỰC &amp; LỢI NHUẬN
              </text>
              <line
                x1="300"
                y1="66"
                x2="300"
                y2="106"
                stroke="#64748b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <polygon points="282,108 318,108 300,92" fill="#64748b" />
              <g
                className={`origin-[300px_66px] transition-transform duration-400 ease-out motion-reduce:transition-none ${getBeamRotationClass(
                  balanceAngle
                )}`}
              >
                <line
                  x1="130"
                  y1="66"
                  x2="470"
                  y2="66"
                  stroke="#0f172a"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="130" cy="66" r="8" className="fill-emerald-600" />
                <circle cx="470" cy="66" r="8" className="fill-red-600" />
                <circle
                  cx="300"
                  cy="66"
                  r="7"
                  className={
                    balanceAngle < 0
                      ? 'fill-emerald-600 stroke-emerald-700'
                      : balanceAngle >= 2
                      ? 'fill-red-600 stroke-red-700'
                      : balanceAngle > 0
                      ? 'fill-amber-500 stroke-amber-600'
                      : 'fill-white stroke-slate-900'
                  }
                  strokeWidth="3"
                />
              </g>
            </svg>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Bước 4 · Chọn một phương án để kiểm tra 5 phép thử
            </p>
            <div className="flex flex-col gap-2.5">
              {currentCase.opts.map((opt, idx) => {
                const isPicked = pickedIdx === idx;
                const pickedStyles = isPicked
                  ? opt.level === 'good'
                    ? 'border-2 border-emerald-600 bg-emerald-50/80'
                    : opt.level === 'mid'
                    ? 'border-2 border-amber-500 bg-amber-50/80'
                    : 'border-2 border-red-600 bg-red-50/80'
                  : 'border border-slate-200 bg-slate-50/70 hover:border-slate-400 hover:bg-slate-50';

                const keyStyles = isPicked
                  ? opt.level === 'good'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : opt.level === 'mid'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-slate-800 border-slate-300';

                return (
                  <button
                    key={OPTION_LABELS[idx]}
                    type="button"
                    aria-pressed={isPicked}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex w-full items-start gap-3 rounded-xl p-3 text-left text-sm leading-relaxed text-slate-900 transition-colors ${pickedStyles}`}
                  >
                    <span
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border text-xs font-bold ${keyStyles}`}
                    >
                      {OPTION_LABELS[idx]}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Card: 5 Tests Evaluation & 8-Step Process */}
        <article
          aria-live="polite"
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                selectedOpt
                  ? selectedOpt.level === 'good'
                    ? 'bg-emerald-600 text-white'
                    : selectedOpt.level === 'mid'
                    ? 'bg-amber-600 text-white'
                    : 'bg-red-600 text-white'
                  : 'bg-slate-700 text-white'
              }`}
            >
              {selectedOpt
                ? `Bước 5 & 6 · ${selectedOpt.verdict}`
                : 'Bước 5 · Chấm điểm 5 phép thử'}
            </span>

            <button
              type="button"
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-700"
            >
              {copyStatus === 'copied' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>
                    {copyStatus === 'error'
                      ? 'Không thể chép'
                      : 'Sao chép phiếu 8 bước'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* 5 Ethical Tests Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {ETHICS_TEST_META.map((tm, idx) => {
              const score = selectedOpt ? selectedOpt.t[idx] : null;
              const cardClasses =
                score === 2
                  ? 'border-emerald-200 bg-emerald-50/80'
                  : score === 1
                  ? 'border-amber-200 bg-amber-50/80'
                  : score === 0
                  ? 'border-red-200 bg-red-50/80'
                  : 'border-slate-200 bg-slate-50';
              const valueClasses =
                score === 2
                  ? 'text-emerald-700'
                  : score === 1
                  ? 'text-amber-700'
                  : score === 0
                  ? 'text-red-700'
                  : 'text-slate-500';

              return (
                <div
                  key={tm.name}
                  className={`flex flex-col justify-between gap-1 rounded-xl border p-2.5 text-center ${cardClasses}`}
                >
                  <div>
                    <p className="text-xs font-bold leading-tight text-slate-900">
                      {tm.name}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-tight text-slate-500">
                      {tm.desc}
                    </p>
                  </div>
                  <span
                    className={`mt-1 text-[11px] font-bold ${valueClasses}`}
                  >
                    {score !== null ? TEST_SCORE_LABELS[score] : 'Chờ chọn'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Consequence Feedback Box */}
          <div
            className={`rounded-lg border-l-4 px-3.5 py-2.5 text-sm leading-relaxed text-slate-800 ${
              selectedOpt
                ? selectedOpt.level === 'good'
                  ? 'border-l-emerald-600 bg-emerald-50/60'
                  : selectedOpt.level === 'mid'
                  ? 'border-l-amber-500 bg-amber-50/60'
                  : 'border-l-red-600 bg-red-50/60'
                : 'border-l-blue-600 bg-slate-50'
            }`}
          >
            {selectedOpt ? (
              <>
                <strong className="text-slate-950">
                  Hệ quả phương án {OPTION_LABELS[pickedIdx!]}:
                </strong>{' '}
                {selectedOpt.note}
              </>
            ) : (
              'Hãy chọn một phương án (A, B hoặc C) bên trái để xem đánh giá chi tiết qua 5 phép thử đạo đức.'
            )}
          </div>

          {/* 8-Step Process List */}
          <div className="border-t border-slate-200 pt-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Áp dụng Quy trình 8 Bước vào tình huống này
            </p>
            <ul className="flex flex-col gap-1.5">
              {stepsData.map((st) => (
                <li
                  key={st.n}
                  className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs leading-relaxed sm:text-[13px] ${
                    st.act
                      ? 'bg-blue-50 text-slate-900'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${
                      st.act
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    {st.n}
                  </span>
                  <span>
                    <strong className="text-slate-900">{st.b}</strong> {st.t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* 33-Case Library & Category Filters */}
      <section
        aria-label="Danh sách 33 tình huống"
        className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-base font-bold text-slate-900">
            Kho 33 tình huống thực tế (SCU)
          </h2>
          <span className="text-xs text-slate-500">
            Chấm màu trên nút thể hiện lựa chọn gần nhất của bạn
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ETHICS_CATEGORIES.map((cat) => {
            const isSelected = activeCat === cat;
            const count = countEthicsCategoryCases(cat);
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'border-blue-700 bg-blue-700 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4">
          {filteredCases.map((item) => {
            const isActive = item.id === currentId;
            const level = progress[String(item.id)];
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectCase(item.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 font-semibold text-white'
                    : 'border-slate-200 bg-slate-50 font-medium text-slate-800 hover:border-slate-400 hover:bg-slate-100'
                }`}
              >
                {level && (
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${
                      level === 'good'
                        ? 'bg-emerald-500'
                        : level === 'mid'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                  />
                )}
                <span>
                  {item.id}. {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <p className="mt-4 text-xs text-slate-500">
        Nguồn tình huống: Markkula Center for Applied Ethics – Đại học Santa
        Clara (SCU). Khung phân tích áp dụng Quy trình 8 bước giải quyết vấn đề
        đạo đức và 5 phép thử đạo đức kỹ sư (Michael Davis / NSPE).
      </p>
    </div>
  );
}
