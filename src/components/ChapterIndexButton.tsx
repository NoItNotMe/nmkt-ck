import { useEffect, useRef, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { buildReferenceChapterHash } from '../utils/navigation';
import {
  getReferencePostsByChapter,
  REFERENCE_CHAPTERS,
} from '../utils/referencePosts';

interface ChapterIndexButtonProps {
  activeChapterNumber?: number | null;
  align?: 'center' | 'right';
  onSelectChapter: (chapterNumber: number) => void;
}

export function ChapterIndexButton({
  activeChapterNumber = null,
  align = 'center',
  onSelectChapter,
}: ChapterIndexButtonProps) {
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [isClickOpen, setIsClickOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = isHoverOpen || isClickOpen;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsHoverOpen(false);
        setIsClickOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsHoverOpen(false);
        setIsClickOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') {
          setIsHoverOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') {
          setIsHoverOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-label="Mục lục các chương"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="Mục lục Chương 1 – Chương 9"
        onClick={() => setIsClickOpen((prev) => !prev)}
        className={`flex h-11 w-11 items-center justify-center border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
          isOpen
            ? 'border-slate-900 text-slate-900'
            : 'border-slate-300 text-slate-600 hover:border-slate-900 hover:text-slate-900'
        }`}
      >
        <LayoutGrid className="h-4 w-4" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Chọn chương từ Chương 1 đến Chương 9"
          className={`absolute top-full z-30 w-72 pt-2 sm:w-80 ${
            align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'
          }`}
        >
          <div className="border border-slate-200 bg-white p-2 shadow-sm">
            <p className="px-2.5 pb-1.5 pt-1 text-[11px] font-medium text-slate-400">
              Mục lục theo chương
            </p>
            <div className="grid grid-cols-2 gap-1">
              {REFERENCE_CHAPTERS.map((chapter) => {
                const postCount = getReferencePostsByChapter(
                  chapter.chapterNumber
                ).length;
                const isSelected =
                  activeChapterNumber === chapter.chapterNumber;

                return (
                  <a
                    key={chapter.chapterNumber}
                    role="menuitem"
                    href={buildReferenceChapterHash(chapter.chapterNumber)}
                    onClick={(event) => {
                      event.preventDefault();
                      setIsHoverOpen(false);
                      setIsClickOpen(false);
                      onSelectChapter(chapter.chapterNumber);
                    }}
                    className={`flex min-h-[40px] items-center justify-between whitespace-nowrap px-2.5 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      isSelected
                        ? 'bg-slate-900 font-semibold text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{chapter.label}</span>
                    <span
                      className={`tabular-nums text-[11px] ${
                        isSelected ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {postCount}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
