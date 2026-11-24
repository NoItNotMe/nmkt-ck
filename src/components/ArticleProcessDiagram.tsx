import { ArrowRight, RefreshCw, Radio } from 'lucide-react';
import { type ArticleProcessDiagramBlock } from '../utils/referencePosts';

interface ArticleProcessDiagramProps {
  block: ArticleProcessDiagramBlock;
}

export function ArticleProcessDiagram({ block }: ArticleProcessDiagramProps) {
  const isDark = block.theme !== 'light';

  const containerClass = isDark
    ? 'my-8 border border-slate-800 bg-slate-950 p-5 text-slate-100 sm:p-7'
    : 'my-8 border border-slate-200 bg-slate-50 p-5 text-slate-900 sm:p-7';

  const headerBorderClass = isDark
    ? 'border-b border-slate-800 pb-4'
    : 'border-b border-slate-200 pb-4';

  const subtitleClass = isDark ? 'text-slate-400' : 'text-slate-600';

  const stepCardClass = isDark
    ? 'relative flex flex-col justify-between border border-slate-800 bg-slate-900/90 p-3.5'
    : 'relative flex flex-col justify-between border border-slate-200 bg-white p-3.5';

  const stepNumClass = isDark ? 'text-amber-300' : 'text-blue-700';
  const stepDetailClass = isDark ? 'text-slate-300' : 'text-slate-600';
  const badgeClass = isDark
    ? 'border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300'
    : 'border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600';

  const gridColsClass =
    block.steps.length <= 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : block.steps.length === 5
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section aria-label={block.title} className={containerClass}>
      <div className={headerBorderClass}>
        <div className="text-[11px] font-bold uppercase tracking-widest text-blue-500">
          Sơ đồ quy trình trực quan
        </div>
        <h3 className="mt-1 text-base font-bold tracking-tight sm:text-lg">
          {block.title}
        </h3>
        {block.subtitle ? (
          <p className={`mt-1 text-xs leading-relaxed sm:text-sm ${subtitleClass}`}>
            {block.subtitle}
          </p>
        ) : null}
      </div>

      <ol className={`mt-5 grid gap-3 ${gridColsClass}`}>
        {block.steps.map((step, index) => {
          const isLast = index === block.steps.length - 1;
          return (
            <li key={`${step.label}-${index}`} className={stepCardClass}>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-extrabold tabular-nums tracking-wider ${stepNumClass}`}
                  >
                    BƯỚC {String(index + 1).padStart(2, '0')}
                  </span>
                  {!isLast ? (
                    <ArrowRight
                      className={`h-3.5 w-3.5 shrink-0 ${
                        isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <div className="mt-2 text-sm font-bold leading-snug">
                  {step.label}
                </div>
                {step.detail ? (
                  <p className={`mt-1.5 text-xs leading-relaxed ${stepDetailClass}`}>
                    {step.detail}
                  </p>
                ) : null}
              </div>

              {step.badge ? (
                <div className="mt-3 pt-2">
                  <span className={badgeClass}>{step.badge}</span>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {block.loopNote || block.noiseNote ? (
        <div
          className={`mt-4 grid grid-cols-1 gap-2.5 border-t pt-4 text-xs sm:grid-cols-2 ${
            isDark
              ? 'border-slate-800 text-slate-300'
              : 'border-slate-200 text-slate-700'
          }`}
        >
          {block.loopNote ? (
            <div className="flex items-start gap-2">
              <RefreshCw
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}
                aria-hidden="true"
              />
              <span>{block.loopNote}</span>
            </div>
          ) : null}
          {block.noiseNote ? (
            <div className="flex items-start gap-2">
              <Radio
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                  isDark ? 'text-amber-300' : 'text-amber-700'
                }`}
                aria-hidden="true"
              />
              <span>{block.noiseNote}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
