import { type ArticlePullQuoteBlock } from '../utils/referencePosts';

interface ArticlePullQuoteProps {
  block: ArticlePullQuoteBlock;
}

export function ArticlePullQuote({ block }: ArticlePullQuoteProps) {
  const isBlue = block.tone !== 'ink';
  const markColor = isBlue ? 'text-blue-700' : 'text-slate-900';
  const barColor = isBlue ? 'bg-blue-700' : 'bg-slate-900';

  const quoteRail = (
    <div className="flex flex-col justify-between border-y border-slate-200 py-5">
      <div>
        <span
          aria-hidden="true"
          className={`block select-none font-['Playfair_Display',Georgia,serif] text-6xl font-bold leading-[0.75] sm:text-7xl ${markColor}`}
        >
          “
        </span>
        <blockquote className="mt-3 border-t border-dotted border-slate-300 pt-3 font-['Playfair_Display',Georgia,serif] text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
          {block.quote}
        </blockquote>
        {block.attribution ? (
          <p className="mt-3 border-t border-dotted border-slate-300 pt-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            {block.attribution}
          </p>
        ) : null}
      </div>
      <div className={`mt-5 h-2 w-20 ${barColor}`} aria-hidden="true" />
    </div>
  );

  if (block.pairedParagraph) {
    return (
      <section
        aria-label="Trích dẫn nổi bật"
        className="my-8 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-5">{quoteRail}</div>
        <div className="md:col-span-7">
          <p className="text-base leading-relaxed text-slate-700">
            {block.pairedParagraph}
          </p>
        </div>
      </section>
    );
  }

  return (
    <aside
      aria-label="Trích dẫn nổi bật"
      className="my-8 border-y border-slate-200 bg-slate-50/60 px-5 py-7 sm:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <span
          aria-hidden="true"
          className={`block select-none font-['Playfair_Display',Georgia,serif] text-6xl font-bold leading-[0.7] ${markColor}`}
        >
          “
        </span>
        <blockquote className="mt-3 font-['Playfair_Display',Georgia,serif] text-xl font-semibold italic leading-relaxed text-slate-900 sm:text-2xl">
          {block.quote}
        </blockquote>
        {block.attribution ? (
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            — {block.attribution}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
