import { CheckCircle2, XCircle } from 'lucide-react';
import { type ArticleComparisonBlock } from '../utils/referencePosts';

interface ArticleComparisonPanelProps {
  block: ArticleComparisonBlock;
}

export function ArticleComparisonPanel({ block }: ArticleComparisonPanelProps) {
  return (
    <section
      aria-label={block.title ?? 'So sánh cách làm đúng và sai'}
      className="my-8 border border-slate-200 bg-white"
    >
      {block.title ? (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Đối chiếu thực hành
          </div>
          <h3 className="mt-0.5 text-sm font-bold text-slate-900 sm:text-base">
            {block.title}
          </h3>
        </div>
      ) : null}

      <div className="hidden grid-cols-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider md:grid">
        <div className="flex items-center gap-2 border-r border-slate-200 bg-emerald-50/70 px-5 py-3 text-emerald-900">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
          <span>{block.goodTitle}</span>
        </div>
        <div className="flex items-center gap-2 bg-rose-50/70 px-5 py-3 text-rose-900">
          <XCircle className="h-4 w-4 shrink-0 text-rose-700" aria-hidden="true" />
          <span>{block.badTitle}</span>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {block.pairs.map((pair, idx) => (
          <div key={`${pair.topic ?? 'pair'}-${idx}`}>
            {pair.topic ? (
              <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 md:px-5">
                {pair.topic}
              </div>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b border-slate-100 p-4 md:border-b-0 md:border-r md:border-slate-200 md:p-5">
                <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 md:hidden">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>{block.goodTitle}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-800">
                  {pair.good}
                </p>
              </div>

              <div className="bg-slate-50/40 p-4 md:p-5">
                <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-800 md:hidden">
                  <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-700" aria-hidden="true" />
                  <span>{block.badTitle}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  {pair.bad}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
