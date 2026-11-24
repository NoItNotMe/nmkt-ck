import { type ArticleProjectCharterBlock } from '../utils/referencePosts';

interface ArticleProjectCharterFigureProps {
  block: ArticleProjectCharterBlock;
}

export function ArticleProjectCharterFigure({
  block,
}: ArticleProjectCharterFigureProps) {
  return (
    <figure className="my-7">
      <div className="border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">
            {block.formLabel}
          </span>
          <span className="text-xs text-slate-500">{block.duration}</span>
        </div>

        <h3 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">
          {block.projectTitle}
        </h3>

        <dl className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Mục tiêu dự án
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-slate-700">
              {block.objective}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Kết quả bàn giao
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-slate-700">
              {block.deliverables}
            </dd>
          </div>
        </dl>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Thành viên và vai trò
          </p>
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {block.roles.map((item) => (
              <div
                key={item.role}
                className="border border-slate-100 bg-slate-50/70 px-3 py-2.5"
              >
                <p className="text-xs font-semibold text-slate-900">
                  {item.role}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                  {item.responsibility}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="mt-2 text-center text-xs italic text-slate-500">
        {block.caption}
      </figcaption>
    </figure>
  );
}
