import { type ArticleTeamEvaluationBlock } from '../utils/referencePosts';

interface ArticleTeamEvaluationFigureProps {
  block: ArticleTeamEvaluationBlock;
}

export function ArticleTeamEvaluationFigure({
  block,
}: ArticleTeamEvaluationFigureProps) {
  return (
    <figure className="my-7">
      <div className="border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">
            {block.formLabel}
          </span>
          <span className="text-xs text-slate-500">{block.period}</span>
        </div>

        <h3 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">
          {block.projectTitle}
        </h3>

        <div className="mt-4 overflow-x-auto border-t border-slate-100 pt-3">
          <table className="w-full min-w-[460px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-3">Tiêu chí</th>
                <th className="py-2 pr-3">Kế hoạch</th>
                <th className="py-2 pr-3">Thực tế</th>
                <th className="py-2">Ghi chú theo dõi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {block.rows.map((row) => (
                <tr key={row.criterion}>
                  <td className="py-2.5 pr-3 font-semibold text-slate-900">
                    {row.criterion}
                  </td>
                  <td className="py-2.5 pr-3 text-slate-600">{row.planned}</td>
                  <td className="py-2.5 pr-3 font-medium text-slate-800">
                    {row.actual}
                  </td>
                  <td className="py-2.5 text-slate-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <figcaption className="mt-2 text-center text-xs italic text-slate-500">
        {block.caption}
      </figcaption>
    </figure>
  );
}
