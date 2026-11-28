import { ArrowLeft, Sparkles, Wrench } from 'lucide-react';
import { PLACEHOLDER_ITEMS } from '../utils/groupData';
import { DesignDecisionToolView } from './DesignDecisionToolView';
import { EngineeringQuizView } from './EngineeringQuizView';
import { EthicsSimulationToolView } from './EthicsSimulationToolView';
import { GroupBarButton } from './GroupBarButton';
import { GanttChartToolView } from './GanttChartToolView';
import { ProblemSolvingGuideView } from './ProblemSolvingGuideView';
import { SiConverterToolView } from './SiConverterToolView';
import { SlideFixerToolView } from './SlideFixerToolView';
import { TeamAssignmentToolView } from './TeamAssignmentToolView';
import { TimeManagementToolView } from './TimeManagementToolView';

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

  // If muc-2 is selected, render the Chapter 2 design alternative selector
  if (selectedSubpage === 'muc-2') {
    return <DesignDecisionToolView />;
  }

  // If muc-3 is selected, render the Chapter 3 time management simulator
  if (selectedSubpage === 'muc-3') {
    return <TimeManagementToolView />;
  }

  // If muc-4 is selected, render the Chapter 4 Gantt chart planner
  if (selectedSubpage === 'muc-4') {
    return <GanttChartToolView />;
  }

  // If muc-5 is selected, render the Chapter 5 team assignment capability matrix
  if (selectedSubpage === 'muc-5') {
    return <TeamAssignmentToolView onBackToList={onBackToList} />;
  }

  // If muc-6 is selected, render the Chapter 6 problem solving guide
  if (selectedSubpage === 'muc-6') {
    return <ProblemSolvingGuideView />;
  }

  // If muc-7 is selected, render the Chapter 7 minimalist SI unit converter
  if (selectedSubpage === 'muc-7') {
    return <SiConverterToolView onBackToList={onBackToList} />;
  }

  // If muc-8 is selected, render the Chapter 8 Chữa slide tool
  if (selectedSubpage === 'muc-8') {
    return <SlideFixerToolView onBackToList={onBackToList} />;
  }

  // If muc-9 is selected, render the Chapter 9 Tình huống đạo đức simulator
  if (selectedSubpage === 'muc-9') {
    return <EthicsSimulationToolView onBackToList={onBackToList} />;
  }

  // If another subpage is selected, render a clean empty/in-progress placeholder page
  if (selectedSubpage) {
    const currentItem = PLACEHOLDER_ITEMS.find(
      (item) => item.id === selectedSubpage
    );
    const pageTitle = currentItem ? currentItem.title : selectedSubpage;
    const pageSubtitle = currentItem?.subtitle;

    return (
      <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Empty page canvas / Placeholder tool */}
        <div className="flex min-h-[55vh] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-xs">
            <Wrench className="h-7 w-7 stroke-[1.75]" />
          </div>

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Mục đang chuẩn bị nội dung</span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="mt-1 text-sm font-medium text-blue-700">
              {pageSubtitle}
            </p>
          )}

          {currentItem?.description ? (
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
              {currentItem.description}
            </p>
          ) : (
            <p className="mt-2 text-xs text-slate-400">Trang trống</p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBackToList}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-xs transition-colors hover:border-slate-900 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Xem các công cụ khác</span>
            </button>
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
