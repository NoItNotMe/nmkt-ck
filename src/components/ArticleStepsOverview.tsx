import { type ArticleStepsBlock } from '../utils/referencePosts';

interface ArticleStepsOverviewProps {
  block: ArticleStepsBlock;
}

export function ArticleStepsOverview({ block }: ArticleStepsOverviewProps) {
  return (
    <section
      aria-label={block.title}
      className="my-7 border-y border-slate-200 py-6"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
          {block.title}
        </h3>
        {block.subtitle ? (
          <span className="text-xs font-medium text-slate-500">
            {block.subtitle}
          </span>
        ) : null}
      </div>

      {block.phases.length >= 4 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <div className="space-y-5">
            {block.phases.slice(0, 3).map((phase) => (
              <div key={phase.phaseLabel} className="space-y-2.5">
                <div className="border-b border-slate-100 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {phase.phaseLabel}
                </div>
                <ol className="space-y-2.5">
                  {phase.steps.map((step) => (
                    <li key={step.number} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-6 shrink-0 text-xs font-bold tabular-nums text-blue-700">
                        {String(step.number).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold leading-snug text-slate-900">
                          {step.title}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                          {step.summary}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {block.phases.slice(3).map((phase) => (
              <div key={phase.phaseLabel} className="space-y-2.5">
                <div className="border-b border-slate-100 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {phase.phaseLabel}
                </div>
                <ol className="space-y-2.5">
                  {phase.steps.map((step) => (
                    <li key={step.number} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-6 shrink-0 text-xs font-bold tabular-nums text-blue-700">
                        {String(step.number).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold leading-snug text-slate-900">
                          {step.title}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                          {step.summary}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          {block.phases.map((phase) => (
            <div key={phase.phaseLabel} className="space-y-2.5">
              <div className="border-b border-slate-100 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {phase.phaseLabel}
              </div>
              <ol className="space-y-2.5">
                {phase.steps.map((step) => (
                  <li key={step.number} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-6 shrink-0 text-xs font-bold tabular-nums text-blue-700">
                      {String(step.number).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-snug text-slate-900">
                        {step.title}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                        {step.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
