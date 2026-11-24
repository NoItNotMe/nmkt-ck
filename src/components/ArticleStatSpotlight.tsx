import { type ArticleStatSpotlightBlock } from '../utils/referencePosts';

interface ArticleStatSpotlightProps {
  block: ArticleStatSpotlightBlock;
}

export function ArticleStatSpotlight({ block }: ArticleStatSpotlightProps) {
  const theme = block.theme ?? 'yellow';

  const wrapperClass =
    theme === 'yellow'
      ? 'my-8 border-2 border-slate-900 bg-yellow-300 p-5 text-slate-950 sm:p-7'
      : theme === 'ink'
      ? 'my-8 border border-slate-800 bg-slate-900 p-5 text-white sm:p-7'
      : 'my-8 border border-slate-200 bg-slate-100 p-5 text-slate-900 sm:p-7';

  const dividerClass =
    theme === 'yellow'
      ? 'border-slate-900/25'
      : theme === 'ink'
      ? 'border-slate-700'
      : 'border-slate-300';

  const subtextClass =
    theme === 'yellow'
      ? 'text-slate-900/85'
      : theme === 'ink'
      ? 'text-slate-300'
      : 'text-slate-600';

  const kickerClass =
    theme === 'yellow'
      ? 'bg-slate-950 text-yellow-300'
      : theme === 'ink'
      ? 'bg-yellow-300 text-slate-950'
      : 'bg-slate-900 text-white';

  const itemGridCols =
    block.items && block.items.length === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : block.items && block.items.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-3';

  return (
    <aside aria-label={block.label} className={wrapperClass}>
      <div className={`flex flex-wrap items-baseline justify-between gap-3 border-b pb-3 ${dividerClass}`}>
        <span
          className={`inline-block px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest ${kickerClass}`}
        >
          {block.label}
        </span>
      </div>

      <div className="mt-3.5">
        <div className="text-3xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
          {block.headline}
        </div>
        {block.summary ? (
          <p className={`mt-2.5 max-w-2xl text-sm leading-relaxed sm:text-base ${subtextClass}`}>
            {block.summary}
          </p>
        ) : null}
      </div>

      {block.items && block.items.length > 0 ? (
        <dl
          className={`mt-6 grid gap-4 border-t pt-5 ${dividerClass} ${itemGridCols}`}
        >
          {block.items.map((item, idx) => (
            <div key={`${item.value}-${idx}`} className="min-w-0">
              <dt className="text-xl font-extrabold tracking-tight tabular-nums sm:text-2xl">
                {item.value}
              </dt>
              <dd className={`mt-1 text-xs leading-relaxed sm:text-sm ${subtextClass}`}>
                {item.caption}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </aside>
  );
}
