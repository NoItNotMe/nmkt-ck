import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Lock,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  calculateQuizScores,
  clampRobotScore,
  getRobotTotalPoints,
  INITIAL_ROBOT_SCORES,
  isMajorDeterminationUnlocked,
  MAJORS,
  QUIZ_QUESTIONS,
  ROBOT_ATTRIBUTES,
  ROBOT_MAX_PER_ATTRIBUTE,
  ROBOT_MAX_TOTAL_POINTS,
  type MajorKey,
  type OptionLetter,
  type QuizCalculationResult,
  type RobotAttributeKey,
  type RobotScores,
} from '../utils/quizData';

const OPTION_HOVER_STYLES: Record<
  OptionLetter,
  { card: string; badge: string }
> = {
  A: {
    card: 'border-slate-200 bg-white hover:border-sky-500 hover:bg-sky-50/70',
    badge:
      'border border-slate-200 bg-slate-100 text-slate-700 group-hover:border-sky-600 group-hover:bg-sky-600 group-hover:text-white',
  },
  B: {
    card: 'border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/70',
    badge:
      'border border-slate-200 bg-slate-100 text-slate-700 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
  },
  C: {
    card: 'border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-50/70',
    badge:
      'border border-slate-200 bg-slate-100 text-slate-700 group-hover:border-amber-600 group-hover:bg-amber-600 group-hover:text-white',
  },
  D: {
    card: 'border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50/70',
    badge:
      'border border-slate-200 bg-slate-100 text-slate-700 group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
  },
};

const RESULT_ACCENT_THEMES: Record<
  MajorKey,
  {
    cardBorder: string;
    topStrip: string;
    bgWash: string;
    eyebrow: string;
    ctaButton: string;
    focusCard: string;
    focusDot: string;
  }
> = {
  tkvm: {
    cardBorder: 'border-amber-200/90',
    topStrip: 'bg-gradient-to-r from-amber-500 via-orange-500 to-blue-600',
    bgWash: 'bg-gradient-to-b from-amber-50/80 via-white to-white',
    eyebrow: 'text-amber-700',
    ctaButton: 'bg-amber-700 hover:bg-amber-800',
    focusCard: 'border-amber-200/70 bg-amber-50/45',
    focusDot: 'bg-amber-600',
  },
  tdh: {
    cardBorder: 'border-sky-200/90',
    topStrip: 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600',
    bgWash: 'bg-gradient-to-b from-sky-50/80 via-white to-white',
    eyebrow: 'text-sky-700',
    ctaButton: 'bg-sky-700 hover:bg-sky-800',
    focusCard: 'border-sky-200/70 bg-sky-50/45',
    focusDot: 'bg-sky-600',
  },
  dtvt: {
    cardBorder: 'border-indigo-200/90',
    topStrip: 'bg-gradient-to-r from-indigo-500 via-blue-600 to-violet-600',
    bgWash: 'bg-gradient-to-b from-indigo-50/80 via-white to-white',
    eyebrow: 'text-indigo-700',
    ctaButton: 'bg-indigo-700 hover:bg-indigo-800',
    focusCard: 'border-indigo-200/70 bg-indigo-50/45',
    focusDot: 'bg-indigo-600',
  },
  ktd: {
    cardBorder: 'border-emerald-200/90',
    topStrip: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600',
    bgWash: 'bg-gradient-to-b from-emerald-50/80 via-white to-white',
    eyebrow: 'text-emerald-700',
    ctaButton: 'bg-emerald-700 hover:bg-emerald-800',
    focusCard: 'border-emerald-200/70 bg-emerald-50/45',
    focusDot: 'bg-emerald-600',
  },
};

interface EngineeringQuizViewProps {
  onOpenHomeMajor?: (majorKey: MajorKey) => void;
}

export function EngineeringQuizView({
  onOpenHomeMajor,
}: EngineeringQuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OptionLetter>>({});
  const [robotScores, setRobotScores] = useState<RobotScores>(
    INITIAL_ROBOT_SCORES
  );
  const [showResult, setShowResult] = useState(false);
  const [validationNotice, setValidationNotice] = useState<string | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const robotTotalPoints = getRobotTotalPoints(robotScores);
  const remainingRobotPoints = ROBOT_MAX_TOTAL_POINTS - robotTotalPoints;
  const canDetermineMajor = isMajorDeterminationUnlocked(
    robotScores,
    answeredCount
  );
  const selectedLetter = answers[currentQuestion.id];
  const progressPercent = Math.round(
    (answeredCount / QUIZ_QUESTIONS.length) * 100
  );
  const robotProgressPercent = Math.round(
    (robotTotalPoints / ROBOT_MAX_TOTAL_POINTS) * 100
  );
  const formattedQuestionNumber = String(currentQuestionIndex + 1).padStart(
    2,
    '0'
  );

  function handleSelectOption(letter: OptionLetter) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: letter,
    }));
    setValidationNotice(null);
  }

  function handleRobotSliderChange(key: RobotAttributeKey, rawValue: number) {
    setRobotScores((prev) => clampRobotScore(prev, key, rawValue));
    setValidationNotice(null);
  }

  function handleResetRobotSliders() {
    setRobotScores(INITIAL_ROBOT_SCORES);
  }

  function handleNext() {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }

  function handleDetermineMajor() {
    if (!canDetermineMajor) {
      setValidationNotice(
        'Vui lòng hoàn thành ít nhất 1 câu trắc nghiệm và phân bổ đủ 15 / 15 điểm ở phần robot hình người lý tưởng để mở khóa xác định ngành.'
      );
      return;
    }
    setValidationNotice(null);
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function handleResetQuiz() {
    setAnswers({});
    setRobotScores(INITIAL_ROBOT_SCORES);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setValidationNotice(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  const calculationResult: QuizCalculationResult = calculateQuizScores(
    answers,
    robotScores
  );

  const {
    topMajor,
    secondMajor,
    percentages,
    totalAnswered,
    robotTotalPoints: calcRobotPoints,
  } = calculationResult;

  const displayMajorKeys: MajorKey[] = ['tdh', 'dtvt', 'ktd', 'tkvm'];
  const resultTheme = RESULT_ACCENT_THEMES[topMajor.major.key];

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      {/* Editorial Section Header */}
      <header className="border-b border-slate-200 pb-6 sm:pb-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="font-semibold text-blue-700">
            Chương 1: Giới thiệu
          </span>
          <span aria-hidden="true">·</span>
          <span>Định hướng ngành</span>
        </div>

        <h1 className="mt-2.5 max-w-3xl text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          {showResult ? 'Kết quả phân tích thiên hướng kỹ thuật' : 'Khám phá thiên hướng kỹ thuật'}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {showResult
            ? 'Tổng hợp đánh giá dựa trên phản hồi tình huống và mô hình robot hình người lý tưởng của bạn.'
            : 'Đọc từng tình huống và chọn một phương án mà bạn thấy hứng thú hoặc muốn trực tiếp tham gia giải quyết nhất. Không có đáp án đúng hay sai; kết quả phản ánh sự phù hợp giữa sở thích cá nhân với bốn chuyên ngành kỹ thuật.'}
        </p>
      </header>

      {validationNotice && (
        <div
          role="alert"
          className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-950 sm:text-sm"
        >
          <span>{validationNotice}</span>
          <button
            type="button"
            onClick={() => setValidationNotice(null)}
            aria-label="Đóng thông báo"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-amber-800 transition-colors hover:bg-amber-100 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {showResult ? (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 text-xs text-slate-500 sm:text-sm">
            <span className="tabular-nums">
              Phân tích dựa trên {totalAnswered} / {QUIZ_QUESTIONS.length} tình huống đã chọn
              {calcRobotPoints > 0
                ? ` · ${calcRobotPoints} / ${ROBOT_MAX_TOTAL_POINTS} điểm robot lý tưởng`
                : ''}
            </span>
          </div>

          {/* Section 1: Primary Recommended Major */}
          <section
            aria-labelledby="result-heading"
            className={`mt-6 overflow-hidden rounded-2xl border shadow-xs ${resultTheme.cardBorder} ${resultTheme.bgWash}`}
          >
            <div className={`h-1.5 w-full ${resultTheme.topStrip}`} aria-hidden="true" />

            <div className="px-6 pt-5 pb-9 text-center sm:px-10 sm:pt-6 sm:pb-11">
              <p className={`text-sm font-semibold tracking-wide sm:text-base ${resultTheme.eyebrow}`}>
                Ngành phù hợp của bạn
              </p>

              <h2
                id="result-heading"
                className="mx-auto mt-3.5 max-w-4xl text-balance text-3xl font-extrabold uppercase tracking-tight text-slate-950 sm:text-5xl"
              >
                {topMajor.major.name}
              </h2>

              <div
                className={`mx-auto mt-4 h-1 w-14 rounded-full ${resultTheme.topStrip}`}
                aria-hidden="true"
              />

              <p className="mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-slate-600 sm:text-base">
                {topMajor.major.shortDesc}
              </p>

              {onOpenHomeMajor && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => onOpenHomeMajor(topMajor.major.key)}
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${resultTheme.ctaButton}`}
                  >
                    <span>Giới thiệu {topMajor.major.name}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200/80 pt-6 text-left sm:grid-cols-2">
                {topMajor.major.focusAreas.map((area, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-xs leading-relaxed text-slate-700 sm:text-sm ${resultTheme.focusCard}`}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-xs ${resultTheme.focusDot}`}
                      aria-hidden="true"
                    />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Secondary Intersecting Major */}
          <section
            aria-labelledby="secondary-major-title"
            className={`mt-6 rounded-2xl border border-slate-200 bg-white p-6 ${
              secondMajor && secondMajor.rawScore > 0 ? '' : 'opacity-60'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>Bạn cũng có thể phù hợp với</span>
              {secondMajor && onOpenHomeMajor ? (
                <button
                  type="button"
                  onClick={() => onOpenHomeMajor(secondMajor.major.key)}
                  aria-label={`Giới thiệu ${secondMajor.major.name}`}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-slate-800 transition-colors hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <span>{secondMajor.major.code}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <span className="font-semibold text-slate-900">
                  {secondMajor ? secondMajor.major.code : '—'}
                </span>
              )}
            </div>
            <h2
              id="secondary-major-title"
              className="mt-2 text-lg font-bold text-slate-900 sm:text-xl"
            >
              {secondMajor ? secondMajor.major.fullName : 'Chưa đủ dữ liệu giao thoa'}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {secondMajor
                ? secondMajor.major.shortDesc
                : 'Hoàn thiện thêm các tình huống để xác định rõ ngành giao thoa thứ hai.'}
            </p>
          </section>

          {/* Section 3: 4 Vertical Bars Chart */}
          <section
            aria-labelledby="barchart-title"
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <div className="border-b border-slate-100 pb-4">
              <h2
                id="barchart-title"
                className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
              >
                Cách bạn lựa chọn
              </h2>
            </div>

            <div className="mt-8 grid h-64 w-full grid-cols-4 items-end gap-2 border-b-2 border-slate-900 px-1 pt-8 sm:h-72 sm:gap-6 sm:px-4">
              {displayMajorKeys.map((key) => {
                const percent = percentages[key] ?? 25;
                const isHighest = topMajor.major.key === key;
                const barHeightPercent = Math.max(
                  16,
                  Math.min(88, percent * 1.85)
                );

                return (
                  <div
                    key={key}
                    className="flex h-full flex-col items-center justify-end"
                  >
                    <div className="mb-2 flex h-6 items-center justify-center">
                      {isHighest && (
                        <span className="whitespace-nowrap text-xs font-semibold text-blue-700">
                          Cao nhất
                        </span>
                      )}
                    </div>

                    <div
                      style={{ height: `${barHeightPercent}%` }}
                      aria-label={`${MAJORS[key].code}${isHighest ? ' — cao nhất' : ''}`}
                      className={`rounded-t-xl transition-all duration-300 ${
                        isHighest
                          ? 'w-16 border-t-4 border-blue-600 bg-slate-950 sm:w-28'
                          : 'w-9 bg-slate-200 sm:w-14'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 px-1 text-center sm:gap-6 sm:px-4">
              {displayMajorKeys.map((key) => {
                const majorInfo = MAJORS[key];
                const isHighest = topMajor.major.key === key;
                return (
                  <div key={key} className="flex flex-col items-center px-1">
                    <span
                      className={`text-sm sm:text-base ${
                        isHighest
                          ? 'font-bold text-blue-700'
                          : 'font-semibold text-slate-800'
                      }`}
                    >
                      {majorInfo.code}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-500 sm:text-xs">
                      {majorInfo.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* (Section 4 "Tổng quan 4 ngành kỹ thuật" has been removed per user request) */}

          {/* Footer Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-slate-200 pt-6 pb-8">
            <button
              type="button"
              onClick={() => setShowResult(false)}
              className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              Xem lại câu trả lời
            </button>

            <button
              type="button"
              onClick={handleResetQuiz}
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Làm lại trắc nghiệm</span>
            </button>
          </div>
        </div>
      ) : (
        /* Two-Zone Workspace: Situation Reader (Left) + Navigation & Action Deck (Right) */
        <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:mt-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Zone: Single Situation Stage + Robot Sliders Div */}
          <div className="flex flex-col gap-7 lg:col-span-8">
            <section
              aria-label={`Tình huống ${currentQuestionIndex + 1}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <span className="text-sm font-semibold tabular-nums text-slate-900">
                  Tình huống {formattedQuestionNumber} / {QUIZ_QUESTIONS.length}
                </span>

                {selectedLetter ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <Check
                      className="h-3.5 w-3.5 stroke-[2.5]"
                      aria-hidden="true"
                    />
                    <span>Đã chọn phương án {selectedLetter}</span>
                  </span>
                ) : (
                  <span className="text-xs font-medium text-slate-400">
                    Chưa chọn phương án
                  </span>
                )}
              </div>

              {/* Situation Prose Only (No Question Title) */}
              <p className="mt-5 text-[15px] leading-[1.7] text-slate-800 sm:mt-6 sm:text-[17px]">
                {currentQuestion.context}
              </p>

              {currentQuestion.promptQuestion && (
                <p className="mt-3 text-sm font-semibold text-slate-900 sm:text-[15px]">
                  {currentQuestion.promptQuestion}
                </p>
              )}

              {/* 4 Options A, B, C, D with distinct per-option hover colors */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:gap-3.5">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedLetter === option.letter;
                  const hoverStyle = OPTION_HOVER_STYLES[option.letter];
                  return (
                    <button
                      key={option.letter}
                      type="button"
                      onClick={() => handleSelectOption(option.letter)}
                      aria-pressed={isSelected}
                      className={`group flex min-h-[52px] w-full items-start gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-1 ${
                        isSelected
                          ? 'border-blue-700 bg-blue-50/70'
                          : hoverStyle.card
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular-nums ${
                          isSelected ? 'bg-blue-700 text-white' : hoverStyle.badge
                        }`}
                      >
                        {option.letter}
                      </span>

                      <span
                        className={`flex-1 text-sm leading-relaxed sm:text-[15px] ${
                          isSelected
                            ? 'font-semibold text-slate-950'
                            : 'text-slate-700 group-hover:text-slate-950'
                        }`}
                      >
                        {option.text}
                      </span>

                      {isSelected && (
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-blue-700"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Situation Sequential Controls */}
              <div className="mt-7 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 sm:mt-8">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Câu trước</span>
                </button>

                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-slate-900 bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 sm:px-5 sm:text-sm"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : (
                  <span className="text-xs font-medium text-slate-500">
                    Tình huống cuối cùng
                  </span>
                )}
              </div>
            </section>

            {/* Ideal Humanoid Robot Slider Allocation Section (Max 10 each, 15 total) */}
            <div
              aria-labelledby="robot-builder-heading"
              className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h2
                    id="robot-builder-heading"
                    className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
                  >
                    Nếu cho bạn tạo một robot hình người lý tưởng
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Phân bổ điểm từ 0 đến 10 cho mỗi yếu tố bên dưới với tổng ngân sách tối đa 15 điểm.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold tabular-nums text-slate-900 sm:text-sm">
                    {robotTotalPoints} / {ROBOT_MAX_TOTAL_POINTS} điểm
                  </span>
                  {robotTotalPoints > 0 && (
                    <button
                      type="button"
                      onClick={handleResetRobotSliders}
                      className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                    >
                      Đặt lại
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-5 sm:mt-6 sm:gap-6">
                {ROBOT_ATTRIBUTES.map((attr) => {
                  const value = robotScores[attr.key];
                  const fillPercentage =
                    (value / ROBOT_MAX_PER_ATTRIBUTE) * 100;
                  const sliderId = `robot-slider-${attr.key}`;

                  return (
                    <div
                      key={attr.key}
                      className={`rounded-xl border p-4 sm:p-5 ${attr.borderClass} ${attr.softBgClass}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label
                          htmlFor={sliderId}
                          className="flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-base"
                        >
                          <span
                            className="inline-block h-2.5 w-2.5 shrink-0 rounded-xs"
                            style={{ backgroundColor: attr.color }}
                            aria-hidden="true"
                          />
                          <span>{attr.label}</span>
                        </label>

                        <span
                          className={`text-sm font-bold tabular-nums sm:text-base ${attr.badgeTextClass}`}
                        >
                          {value} / {ROBOT_MAX_PER_ATTRIBUTE}
                        </span>
                      </div>

                      <div className="mt-3.5">
                        <input
                          id={sliderId}
                          type="range"
                          min={0}
                          max={ROBOT_MAX_PER_ATTRIBUTE}
                          step={1}
                          value={value}
                          onChange={(event) =>
                            handleRobotSliderChange(
                              attr.key,
                              Number(event.target.value)
                            )
                          }
                          aria-valuemin={0}
                          aria-valuemax={ROBOT_MAX_PER_ATTRIBUTE}
                          aria-valuenow={value}
                          aria-valuetext={`${value} trên 10 điểm`}
                          style={{
                            accentColor: attr.color,
                            background: `linear-gradient(to right, ${attr.color} 0%, ${attr.color} ${fillPercentage}%, #cbd5e1 ${fillPercentage}%, #cbd5e1 100%)`,
                          }}
                          className="h-2.5 w-full cursor-pointer appearance-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                        />

                        <div className="mt-1.5 flex justify-between text-[11px] font-medium tabular-nums text-slate-500">
                          <span>0</span>
                          <span>5</span>
                          <span>10</span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-200/70 pt-3 text-xs leading-relaxed text-slate-600 sm:grid-cols-2 sm:gap-4">
                        <div>
                          <span className="font-semibold text-slate-800">
                            0 điểm:{' '}
                          </span>
                          <span>{attr.zeroDesc}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">
                            10 điểm:{' '}
                          </span>
                          <span>{attr.tenDesc}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="tabular-nums">
                  Còn lại {remainingRobotPoints} điểm có thể phân bổ
                </span>
                {remainingRobotPoints === 0 && (
                  <span className="font-medium text-blue-700">
                    Đã phân bổ đủ 15 / 15 điểm
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Zone: Progress Tracker, Jump Grid & Primary Action */}
          <aside
            aria-label="Tiến độ và điều hướng tình huống"
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 lg:sticky lg:top-20 lg:col-span-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">Tiến độ</h2>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {answeredCount} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={answeredCount}
              aria-valuemin={0}
              aria-valuemax={QUIZ_QUESTIONS.length}
              aria-label="Số tình huống đã trả lời"
            >
              <div
                className="h-full bg-blue-700 transition-[width] duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Second progress bar in the same Progress card: Robot 0/15 */}
            <div className="mt-4 flex items-baseline justify-end gap-2">
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {robotTotalPoints} / {ROBOT_MAX_TOTAL_POINTS}
              </span>
            </div>

            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={robotTotalPoints}
              aria-valuemin={0}
              aria-valuemax={ROBOT_MAX_TOTAL_POINTS}
              aria-label="Điểm robot hình người lý tưởng đã phân bổ"
            >
              <div
                className="h-full bg-emerald-600 transition-[width] duration-200"
                style={{ width: `${robotProgressPercent}%` }}
              />
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-500">
                Danh sách tình huống
              </p>
              <div className="mt-2.5 grid grid-cols-5 gap-2">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = Boolean(answers[q.id]);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      aria-label={`Tình huống ${q.id}`}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`flex h-10 w-full items-center justify-center rounded-lg border text-xs font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                        isCurrent
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : isAnswered
                            ? 'border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {String(q.id).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-xs leading-relaxed text-slate-500">
                {canDetermineMajor
                  ? 'Đã hoàn thành điều kiện (>=1 câu trắc nghiệm & đủ 15 điểm robot). Bạn có thể bấm xác định ngành.'
                  : 'Cần hoàn thành ít nhất 1 câu trắc nghiệm và đủ 15 điểm robot lý tưởng để mở khóa xác định ngành.'}
              </p>

              <button
                type="button"
                onClick={handleDetermineMajor}
                disabled={!canDetermineMajor}
                className={`mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                  canDetermineMajor
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'cursor-not-allowed bg-slate-200 text-slate-600'
                }`}
              >
                {!canDetermineMajor && (
                  <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                <span>Xác định ngành</span>
              </button>

              {(answeredCount > 0 || robotTotalPoints > 0) && (
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="mt-2.5 inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Làm lại từ đầu</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
