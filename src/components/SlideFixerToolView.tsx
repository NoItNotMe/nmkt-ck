import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, Lightbulb, RefreshCw } from 'lucide-react';
import {
  countFixedErrors,
  createAllFixedFlags,
  createInitialFixedFlags,
  FLOW_BAD_COLORS,
  FLOW_BAD_FONTS,
  FLOW_BAD_POSITIONS,
  pickHintErrorId,
  pickNextSlideTopic,
  RAINBOW_COLORS,
  SCATTERED_EMOJIS,
  type SlideTopic,
  type SlideTopicA,
  type SlideTopicB,
  type SlideTopicC,
  type SlideTopicD,
  type SlideTopicE,
} from '../utils/slideFixer';

interface SlideFixerToolViewProps {
  onBackToList?: () => void;
}

interface InteractiveAttrs {
  'data-e'?: number;
  'data-d'?: number;
  role?: 'button';
  tabIndex?: number;
  'aria-label'?: string;
  className: string;
}

function makeInteractiveAttrs(
  fixedFlags: readonly boolean[],
  live: boolean,
  lastFixedId: number | null,
  hintErrorId: number | null
) {
  return (errorId: number, baseClass = ''): InteractiveAttrs => {
    if (!live) {
      return { className: baseClass };
    }
    if (fixedFlags[errorId]) {
      return {
        'data-d': 1,
        className: `${baseClass}${lastFixedId === errorId ? ' sf-nw' : ''}`.trim(),
      };
    }
    return {
      'data-e': errorId,
      role: 'button',
      tabIndex: 0,
      'aria-label': 'Vùng slide cần kiểm tra',
      className: `${baseClass}${hintErrorId === errorId ? ' sf-hn' : ''}`.trim(),
    };
  };
}

function SlideChartA({
  topic,
  showLabels,
}: {
  topic: SlideTopicA;
  showLabels: boolean;
}) {
  const x0 = 34;
  const y0 = 118;
  const pw = 170;
  const ph = 84;
  const bw = 26;
  const gap = (pw - 4 * bw) / 5;

  return (
    <svg viewBox="0 0 220 150" width="100%" role="img" aria-label="Biểu đồ cột">
      <line x1={x0} y1={y0} x2={x0 + pw} y2={y0} stroke="#16202b" />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - ph} stroke="#16202b" />
      {topic.chartValues.map((val, idx) => {
        const h = (val / topic.chartYMax) * ph;
        const x = x0 + gap + idx * (bw + gap);
        return (
          <g key={topic.chartXLabels[idx]}>
            <rect
              x={x}
              y={y0 - h}
              width={bw}
              height={h}
              fill="#2563eb"
            />
            {showLabels && (
              <text
                x={x + bw / 2}
                y={y0 + 12}
                fontSize="9"
                textAnchor="middle"
                fill="#16202b"
              >
                {topic.chartXLabels[idx]}
              </text>
            )}
          </g>
        );
      })}
      {showLabels && (
        <>
          <text
            x="110"
            y="14"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
            fill="#16202b"
          >
            {topic.chartTitle}
          </text>
          {[0, 0.5, 1].map((k) => (
            <text
              key={k}
              x={x0 - 4}
              y={y0 - k * ph + 3}
              fontSize="9"
              textAnchor="end"
              fill="#16202b"
            >
              {Math.round(topic.chartYMax * k)}
            </text>
          ))}
          <text
            x="8"
            y={y0 - ph / 2}
            fontSize="9"
            textAnchor="middle"
            fill="#16202b"
            transform={`rotate(-90 8 ${y0 - ph / 2})`}
          >
            {topic.chartYLabel}
          </text>
        </>
      )}
    </svg>
  );
}

function SlideLayoutA({
  topic,
  fixedFlags,
  live,
  lastFixedId,
  hintErrorId,
}: {
  topic: SlideTopicA;
  fixedFlags: readonly boolean[];
  live: boolean;
  lastFixedId: number | null;
  hintErrorId: number | null;
}) {
  const a = makeInteractiveAttrs(fixedFlags, live, lastFixedId, hintErrorId);
  const flagClasses = [1, 2, 3, 4, 5, 6, 7]
    .filter((k) => fixedFlags[k])
    .map((k) => `sf-f${k}`)
    .join(' ');

  return (
    <div className={`sf-sl ${flagClasses}`.trim()}>
      <div className="sf-in">
        <div {...a(4, 'sf-ti')}>
          {fixedFlags[4]
            ? topic.title
            : topic.title.split('').map((ch, idx) =>
                ch === ' ' ? (
                  ' '
                ) : (
                  <span
                    key={idx}
                    style={{
                      color: RAINBOW_COLORS[idx % RAINBOW_COLORS.length],
                    }}
                  >
                    {ch}
                  </span>
                )
              )}
        </div>

        <div {...a(3, 'sf-su')}>{topic.subtitle}</div>

        <div className="sf-bd">
          <div>
            <div {...a(1, 'sf-tx')}>
              {fixedFlags[1] ? (
                <ul>
                  {topic.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p>{topic.paragraph}</p>
              )}
            </div>

            <div {...a(5, 'sf-tg')}>
              {fixedFlags[5] ? (
                `${topic.tags[0]} · ${topic.tags[1]}`
              ) : (
                <>
                  <span className="sf-g1">{topic.tags[0]}</span>{' '}
                  <span className="sf-g2">{topic.tags[1]}</span>
                </>
              )}
            </div>
          </div>

          <div {...a(6)}>
            <SlideChartA topic={topic} showLabels={Boolean(fixedFlags[6])} />
          </div>
        </div>

        <div {...a(2, 'sf-sp')}>{topic.specs}</div>
      </div>

      {!fixedFlags[7] && <div {...a(7, 'sf-stk')}>⭐ MỚI!!! 🔊</div>}
    </div>
  );
}

function SlideLayoutB({
  topic,
  fixedFlags,
  live,
  lastFixedId,
  hintErrorId,
}: {
  topic: SlideTopicB;
  fixedFlags: readonly boolean[];
  live: boolean;
  lastFixedId: number | null;
  hintErrorId: number | null;
}) {
  const a = makeInteractiveAttrs(fixedFlags, live, lastFixedId, hintErrorId);
  const flagClasses = fixedFlags
    .map((v, i) => (i > 0 && v ? `sf-f${i}` : ''))
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`sf-sl sf-bB ${flagClasses}`.trim()}>
      <div className="sf-in">
        <div {...a(4, 'sf-t')}>{topic.title}</div>
        <div {...a(1, 'sf-bb')}>
          {fixedFlags[1] ? (
            <ul>
              {topic.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : (
            topic.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
          )}
        </div>
        <div {...a(3, fixedFlags[3] ? 'sf-ct' : 'sf-sc')}>
          {fixedFlags[3] ? topic.sourceText : topic.scriptText}
        </div>
        <div {...a(2, 'sf-s2')}>{topic.specs}</div>
      </div>
    </div>
  );
}

function SlideLayoutC({
  topic,
  fixedFlags,
  live,
  lastFixedId,
  hintErrorId,
}: {
  topic: SlideTopicC;
  fixedFlags: readonly boolean[];
  live: boolean;
  lastFixedId: number | null;
  hintErrorId: number | null;
}) {
  const a = makeInteractiveAttrs(fixedFlags, live, lastFixedId, hintErrorId);
  const flagClasses = fixedFlags
    .map((v, i) => (i > 0 && v ? `sf-f${i}` : ''))
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`sf-sl sf-bC ${flagClasses}`.trim()}>
      <div className="sf-in">
        <div {...a(2, 'sf-t')}>{topic.title}</div>
        {fixedFlags[3] ? (
          <div {...a(3, 'sf-su2')}>{topic.subtitle}</div>
        ) : (
          <div {...a(3, 'sf-bn')}>WELCOME ✨ 👀</div>
        )}
        <div className="sf-bd">
          <div {...a(1, 'sf-pic')}>
            {fixedFlags[1] ? (
              <>
                <span>🤖</span>
                <span>⚙️</span>
              </>
            ) : (
              SCATTERED_EMOJIS.map((emoji, idx) => (
                <span
                  key={idx}
                  style={{
                    left: `${(idx * 37) % 78}%`,
                    top: `${(idx * 53) % 66}%`,
                    fontSize: `${5 + ((idx * 7) % 6)}cqw`,
                    transform: `rotate(${((idx * 47) % 70) - 35}deg)`,
                  }}
                >
                  {emoji}
                </span>
              ))
            )}
          </div>
          <div {...a(4, 'sf-cx')}>
            {fixedFlags[4] ? (
              <ul>
                {topic.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : (
              'Xem hình.'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideLayoutD({
  topic,
  fixedFlags,
  live,
  lastFixedId,
  hintErrorId,
}: {
  topic: SlideTopicD;
  fixedFlags: readonly boolean[];
  live: boolean;
  lastFixedId: number | null;
  hintErrorId: number | null;
}) {
  const a = makeInteractiveAttrs(fixedFlags, live, lastFixedId, hintErrorId);
  const flagClasses = fixedFlags
    .map((v, i) => (i > 0 && v ? `sf-f${i}` : ''))
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`sf-sl sf-bD ${flagClasses}`.trim()}>
      <div {...a(1, 'sf-in')}>
        <div className="sf-t">{topic.title}</div>
        <div {...a(2, 'sf-dl')}>
          {topic.rows.map(([label, isGood], idx) => (
            <div className="sf-r" key={idx}>
              <span>{label}</span>
              <span {...a(3, `sf-st${isGood ? ' sf-g' : ''}`)}>
                {fixedFlags[3] ? (isGood ? '✔ Tốt' : '✘ Kém') : '●'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideLayoutE({
  topic,
  fixedFlags,
  live,
  lastFixedId,
  hintErrorId,
}: {
  topic: SlideTopicE;
  fixedFlags: readonly boolean[];
  live: boolean;
  lastFixedId: number | null;
  hintErrorId: number | null;
}) {
  const a = makeInteractiveAttrs(fixedFlags, live, lastFixedId, hintErrorId);
  const flagClasses = fixedFlags
    .map((v, i) => (i > 0 && v ? `sf-f${i}` : ''))
    .filter(Boolean)
    .join(' ');

  const positions = topic.steps.map((_, idx) =>
    fixedFlags[1]
      ? ([2 + 20 * idx, 38, 16, 24] as const)
      : FLOW_BAD_POSITIONS[idx]
  );

  return (
    <div className={`sf-sl sf-bE ${flagClasses}`.trim()}>
      <div className="sf-in">
        <div {...a(3, 'sf-t')}>
          {fixedFlags[3] ? topic.title : topic.badTitle}
        </div>
        <div className="sf-fl">
          {fixedFlags[1] ? (
            positions.slice(1).map((_, idx) => (
              <div
                key={idx}
                {...a(1, 'sf-ar')}
                style={{
                  left: `${18 + 20 * idx}%`,
                  top: '46%',
                  width: '4%',
                }}
              >
                ➜
              </div>
            ))
          ) : (
            <svg
              {...a(1)}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {positions.slice(1).map((pos, idx) => {
                const prev = positions[idx];
                return (
                  <line
                    key={idx}
                    x1={prev[0] + prev[2] / 2}
                    y1={prev[1] + prev[3] / 2}
                    x2={pos[0] + pos[2] / 2}
                    y2={pos[1] + pos[3] / 2}
                    stroke="#6b7280"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
          )}

          {topic.steps.map((step, idx) => {
            const pos = positions[idx];
            const boxStyle = fixedFlags[2]
              ? {
                  left: `${pos[0]}%`,
                  top: `${pos[1]}%`,
                  width: `${pos[2]}%`,
                  height: `${pos[3]}%`,
                }
              : {
                  left: `${pos[0]}%`,
                  top: `${pos[1]}%`,
                  width: `${pos[2]}%`,
                  height: `${pos[3]}%`,
                  background: FLOW_BAD_COLORS[idx],
                  color: '#ffffff',
                  fontFamily: FLOW_BAD_FONTS[idx],
                };
            return (
              <div
                key={step}
                {...a(2, `sf-bx${fixedFlags[2] ? ' sf-u' : ''}`)}
                style={boxStyle}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SlideStage({
  topic,
  fixedFlags,
  live,
  lastFixedId,
  hintErrorId,
}: {
  topic: SlideTopic;
  fixedFlags: readonly boolean[];
  live: boolean;
  lastFixedId: number | null;
  hintErrorId: number | null;
}) {
  switch (topic.layout) {
    case 'A':
      return (
        <SlideLayoutA
          topic={topic}
          fixedFlags={fixedFlags}
          live={live}
          lastFixedId={lastFixedId}
          hintErrorId={hintErrorId}
        />
      );
    case 'B':
      return (
        <SlideLayoutB
          topic={topic}
          fixedFlags={fixedFlags}
          live={live}
          lastFixedId={lastFixedId}
          hintErrorId={hintErrorId}
        />
      );
    case 'C':
      return (
        <SlideLayoutC
          topic={topic}
          fixedFlags={fixedFlags}
          live={live}
          lastFixedId={lastFixedId}
          hintErrorId={hintErrorId}
        />
      );
    case 'D':
      return (
        <SlideLayoutD
          topic={topic}
          fixedFlags={fixedFlags}
          live={live}
          lastFixedId={lastFixedId}
          hintErrorId={hintErrorId}
        />
      );
    case 'E':
      return (
        <SlideLayoutE
          topic={topic}
          fixedFlags={fixedFlags}
          live={live}
          lastFixedId={lastFixedId}
          hintErrorId={hintErrorId}
        />
      );
  }
}

export function SlideFixerToolView({ onBackToList }: SlideFixerToolViewProps) {
  const [topic, setTopic] = useState<SlideTopic>(() =>
    pickNextSlideTopic(null)
  );
  const [fixedFlags, setFixedFlags] = useState<boolean[]>(() =>
    createInitialFixedFlags(topic)
  );
  const [missCount, setMissCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [lastFixedId, setLastFixedId] = useState<number | null>(null);
  const [hintErrorId, setHintErrorId] = useState<number | null>(null);

  const slideStageWrapRef = useRef<HTMLDivElement | null>(null);
  const hintTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current !== null) {
        window.clearTimeout(hintTimerRef.current);
      }
    };
  }, []);

  const totalErrors = topic.errors.length;
  const fixedCount = countFixedErrors(fixedFlags, topic);
  const isComplete = fixedCount === totalErrors;
  const lastRule =
    lastFixedId !== null
      ? topic.errors.find((err) => err.id === lastFixedId) ?? null
      : null;

  function startNewSlide(scrollToSlide = false) {
    if (hintTimerRef.current !== null) {
      window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }
    const nextTopic = pickNextSlideTopic(topic.id);
    setTopic(nextTopic);
    setFixedFlags(createInitialFixedFlags(nextTopic));
    setMissCount(0);
    setHintCount(0);
    setStatusMessage('');
    setLastFixedId(null);
    setHintErrorId(null);

    if (scrollToSlide && slideStageWrapRef.current) {
      window.setTimeout(() => {
        slideStageWrapRef.current?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      }, 40);
    }
  }

  function pickElement(target: EventTarget | null) {
    if (!(target instanceof Element)) return;
    const interactiveEl = target.closest('[data-e],[data-d]');
    const errorAttr = interactiveEl?.getAttribute('data-e');
    if (errorAttr) {
      const errorId = Number(errorAttr);
      if (!Number.isNaN(errorId) && !fixedFlags[errorId]) {
        if (hintTimerRef.current !== null) {
          window.clearTimeout(hintTimerRef.current);
          hintTimerRef.current = null;
        }
        setFixedFlags((prev) => {
          const next = [...prev];
          next[errorId] = true;
          return next;
        });
        setLastFixedId(errorId);
        setStatusMessage('');
        setHintErrorId(null);
      }
      return;
    }

    if (interactiveEl?.hasAttribute('data-d') || target.closest('[data-d]')) {
      setStatusMessage('Chỗ này đã được sửa rồi.');
      return;
    }

    if (target.closest('.sf-sl')) {
      setMissCount((prev) => prev + 1);
      setStatusMessage('Chỗ này chưa có lỗi. Hãy thử vùng khác.');
    }
  }

  function handleShowHint() {
    const candidate = pickHintErrorId(fixedFlags, topic);
    if (candidate === null) return;
    if (hintTimerRef.current !== null) {
      window.clearTimeout(hintTimerRef.current);
    }
    setHintErrorId(candidate);
    setHintCount((prev) => prev + 1);
    setStatusMessage('');
    hintTimerRef.current = window.setTimeout(() => {
      setHintErrorId(null);
      hintTimerRef.current = null;
    }, 2500);
  }

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {onBackToList && (
        <div className="mb-6">
          <button
            type="button"
            onClick={onBackToList}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Quay lại danh sách công cụ</span>
          </button>
        </div>
      )}

      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="font-semibold text-blue-700">
            Chương 8: Giao tiếp trong kỹ thuật
          </span>
          <span aria-hidden="true">·</span>
          <span>Chữa slide</span>
        </div>

        <h1 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Chữa slide
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Slide dưới đây vi phạm nhiều quy tắc thuyết trình. Bấm vào từng chỗ
          bạn thấy sai. Tìm đúng thì slide tự sửa và hiện quy tắc tương ứng. Mỗi
          slide có 3–7 lỗi, bí thì bấm “Gợi ý”.
        </p>
      </header>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <b className="text-sm font-bold text-slate-900 tabular-nums">
            Đã sửa {fixedCount} / {totalErrors} lỗi
          </b>
          <div
            className="h-2 min-w-[120px] flex-1 overflow-hidden rounded-full bg-slate-200"
            aria-hidden="true"
          >
            <div
              className="h-full bg-emerald-700 transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${(fixedCount / totalErrors) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShowHint}
              disabled={isComplete}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
              <span>Gợi ý</span>
            </button>
            <button
              type="button"
              onClick={() => startNewSlide(false)}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-600" />
              <span>Slide khác</span>
            </button>
          </div>
        </div>

        <div
          ref={slideStageWrapRef}
          className="overflow-x-auto pb-1"
          onClick={(e) => pickElement(e.target)}
          onKeyDown={(e) => {
            if (
              (e.key === 'Enter' || e.key === ' ') &&
              e.target instanceof Element &&
              e.target.hasAttribute('data-e')
            ) {
              e.preventDefault();
              pickElement(e.target);
            }
          }}
        >
          <SlideStage
            topic={topic}
            fixedFlags={fixedFlags}
            live={true}
            lastFixedId={lastFixedId}
            hintErrorId={hintErrorId}
          />
        </div>

        <div aria-live="polite" className="mt-3">
          {statusMessage ? (
            <p className="text-sm text-slate-500">{statusMessage}</p>
          ) : lastRule ? (
            <div className="rounded-xl border border-emerald-600/80 bg-emerald-50/70 px-3.5 py-2.5 text-sm text-emerald-950">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Đã sửa: {lastRule.name}</span>
              </div>
              <p className="mt-1 text-slate-700">{lastRule.rule}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Bấm vào chỗ bạn thấy sai trên slide.
            </p>
          )}
        </div>
      </section>

      {isComplete && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Bạn đã cứu cả slide
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Bấm nhầm {missCount} lần, dùng gợi ý {hintCount} lần.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                Trước
              </p>
              <div className="overflow-x-auto">
                <SlideStage
                  topic={topic}
                  fixedFlags={createInitialFixedFlags(topic)}
                  live={false}
                  lastFixedId={null}
                  hintErrorId={null}
                />
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
                Sau
              </p>
              <div className="overflow-x-auto">
                <SlideStage
                  topic={topic}
                  fixedFlags={createAllFixedFlags(topic)}
                  live={false}
                  lastFixedId={null}
                  hintErrorId={null}
                />
              </div>
            </div>
          </div>

          <ul className="mt-4 divide-y divide-slate-200 border-t border-slate-200 text-sm text-slate-700">
            {topic.errors.map((err) => (
              <li key={err.id} className="py-2.5">
                <b className="text-slate-900">{err.name}.</b> {err.rule}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => startNewSlide(true)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-emerald-600"
            >
              <span>Thử slide khác</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
