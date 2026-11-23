import { type ArticleBarChartBlock } from '../utils/referencePosts';

export interface ComputedChartRow {
  label: string;
  value: number;
  highlight: boolean;
  widthPercent: number;
}

export function computeSortedChartRows(
  items: ArticleBarChartBlock['items']
): ComputedChartRow[] {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const maxValue = sorted.reduce(
    (max, item) => (item.value > max ? item.value : max),
    0
  );

  return sorted.map((item) => ({
    label: item.label,
    value: item.value,
    highlight: Boolean(item.highlight),
    widthPercent:
      maxValue > 0
        ? Math.max(4, Math.round((item.value / maxValue) * 1000) / 10)
        : 0,
  }));
}

interface ArticleBarChartFigureProps {
  block: ArticleBarChartBlock;
}

export function ArticleBarChartFigure({ block }: ArticleBarChartFigureProps) {
  const rows = computeSortedChartRows(block.items);
  const totalCount = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <figure className="my-7 border-y border-slate-200 py-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
          {block.title}
        </h3>
        <span className="text-xs tabular-nums text-slate-500">
          {block.subtitle
            ? `${block.subtitle} · Tổng: ${totalCount.toLocaleString('vi-VN')}`
            : `Tổng: ${totalCount.toLocaleString('vi-VN')}`}
        </span>
      </div>

      <div className="space-y-2.5" role="list" aria-label={block.title}>
        {rows.map((row) => (
          <div
            key={row.label}
            role="listitem"
            className="flex items-center gap-2 sm:gap-3"
          >
            <span
              className={`w-[136px] shrink-0 text-xs leading-snug sm:w-[204px] sm:text-[13px] ${
                row.highlight
                  ? 'font-semibold text-blue-700'
                  : 'text-slate-700'
              }`}
            >
              {row.label}
            </span>

            <div className="min-w-0 flex-1">
              <svg className="block h-3.5 w-full" aria-hidden="true">
                <rect
                  x="0"
                  y="1"
                  width="100%"
                  height="12"
                  rx="2"
                  className="fill-slate-100"
                />
                <rect
                  x="0"
                  y="1"
                  width={`${row.widthPercent}%`}
                  height="12"
                  rx="2"
                  className={row.highlight ? 'fill-blue-700' : 'fill-slate-700'}
                />
              </svg>
            </div>

            <span
              className={`w-9 shrink-0 text-right text-xs tabular-nums sm:w-10 sm:text-[13px] ${
                row.highlight
                  ? 'font-bold text-blue-700'
                  : 'font-medium text-slate-800'
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <figcaption className="mt-4 text-center text-xs italic text-slate-500">
        {block.caption}
      </figcaption>
    </figure>
  );
}
