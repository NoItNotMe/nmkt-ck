import { ArrowLeft } from 'lucide-react';
import { PLACEHOLDER_ITEMS } from '../utils/groupData';
import { EngineeringQuizView } from './EngineeringQuizView';
import { GroupBarButton } from './GroupBarButton';

import type { MajorKey } from '../utils/quizData';

interface GroupPageProps {
  selectedSubpage: string | null;
  onOpenSubpage: (subpageId: string) => void;
  onBackToList: () => void;
  onOpenHomeMajor?: (majorKey: MajorKey) => void;
}

export function GroupPage({
  selectedSubpage,
  onOpenSubpage,
  onBackToList,
  onOpenHomeMajor,
}: GroupPageProps) {
  // If muc-1 is selected, render the full vocational engineering quiz
  if (selectedSubpage === 'muc-1') {
    return <EngineeringQuizView onOpenHomeMajor={onOpenHomeMajor} />;
  }

  // If another subpage is selected, render a clean empty page
  if (selectedSubpage) {
    const currentItem = PLACEHOLDER_ITEMS.find(
      (item) => item.id === selectedSubpage
    );
    const pageTitle = currentItem ? currentItem.title : selectedSubpage;
    const pageSubtitle = currentItem?.subtitle;

    return (
      <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6">
          <button
            type="button"
            onClick={onBackToList}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Quay lại</span>
          </button>
        </div>

        {/* Empty page canvas */}
        <div className="flex min-h-[55vh] w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
          <div>
            <h1 className="text-xl font-medium text-slate-700">{pageTitle}</h1>
            {pageSubtitle && (
              <p className="mt-1 text-sm text-slate-500">{pageSubtitle}</p>
            )}
            <p className="mt-2 text-xs text-slate-400">Trang trống</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Group page: only the placeholder buttons
  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-3.5 sm:gap-4">
        {PLACEHOLDER_ITEMS.map((item) => (
          <GroupBarButton
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            onClick={() => onOpenSubpage(item.id)}
            ariaLabel={`Mở ${item.title}`}
          />
        ))}
      </div>
    </div>
  );
}
