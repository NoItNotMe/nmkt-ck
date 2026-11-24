import { type ArticleComparisonTableBlock } from '../utils/referencePosts';

interface ArticleComparisonTableProps {
  block: ArticleComparisonTableBlock;
}

export function ArticleComparisonTable({
  block,
}: ArticleComparisonTableProps) {
  return (
    <figure className="my-6">
      <div className="overflow-x-auto border border-slate-200 bg-white">
        {block.title ? (
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-700">
            {block.title}
          </div>
        ) : null}
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              {block.headers.map((header) => (
                <th key={header} scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {block.rows.map((row, rowIdx) => (
              <tr key={`${row[0] ?? 'row'}-${rowIdx}`} className="align-top">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`px-3 py-2.5 leading-relaxed sm:px-4 sm:py-3 ${
                      cellIdx === 0
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-700'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption ? (
        <figcaption className="mt-2 text-center text-xs italic text-slate-500">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
