import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type ArticleCarouselBlock,
  stepReferenceIndex,
} from '../utils/referencePosts';

interface ArticleCarouselFigureProps {
  block: ArticleCarouselBlock;
  postId: string;
}

const SLIDE_SLOT_PERCENT = 78;

export function getCarouselTrackOffsetPercent(
  activeIndex: number,
  totalSlides: number
): number {
  if (totalSlides <= 1) {
    return 0;
  }
  const safeIndex = Math.max(0, Math.min(totalSlides - 1, activeIndex));
  if (safeIndex === 0) {
    return 0;
  }
  const maxOffset = safeIndex * SLIDE_SLOT_PERCENT - (100 - SLIDE_SLOT_PERCENT);
  if (safeIndex === totalSlides - 1) {
    return -maxOffset;
  }
  const centerPad = (100 - SLIDE_SLOT_PERCENT) / 2;
  return -(safeIndex * SLIDE_SLOT_PERCENT - centerPad);
}

export function ArticleCarouselFigure({
  block,
  postId,
}: ArticleCarouselFigureProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveIndex(0);
    setFailedSlides({});
  }, [postId]);

  const slides = block.slides;
  if (slides.length === 0) {
    return null;
  }

  const currentIndex = activeIndex % slides.length;
  const activeSlide = slides[currentIndex] ?? slides[0];
  const hasMultiple = slides.length > 1;
  const trackOffsetPercent = getCarouselTrackOffsetPercent(
    currentIndex,
    slides.length
  );

  function handlePrev() {
    setActiveIndex((prev) => stepReferenceIndex(prev, -1, slides.length));
  }

  function handleNext() {
    setActiveIndex((prev) => stepReferenceIndex(prev, 1, slides.length));
  }

  return (
    <figure className="my-7" aria-label="Bộ ảnh minh họa trong bài viết">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Ảnh trước"
          className="flex h-11 w-8 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 sm:w-9"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${trackOffsetPercent}%, 0, 0)`,
            }}
          >
            {slides.map((slide, slideIdx) => {
              const isActive = slideIdx === currentIndex;
              return (
                <div
                  key={`${slide.src}-${slideIdx}`}
                  style={{
                    flex: hasMultiple
                      ? `0 0 ${SLIDE_SLOT_PERCENT}%`
                      : '0 0 100%',
                  }}
                  className={hasMultiple ? 'pr-3' : ''}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(slideIdx)}
                    aria-label={`Xem ảnh ${slideIdx + 1}: ${slide.alt}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group block w-full overflow-hidden bg-slate-100 text-left transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      isActive ? 'opacity-100' : 'opacity-65 hover:opacity-90'
                    }`}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      {failedSlides[slideIdx] ? (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 p-4 text-center text-xs text-slate-500">
                          {slide.alt}
                        </div>
                      ) : (
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedSlides((prev) => ({
                              ...prev,
                              [slideIdx]: true,
                            }))
                          }
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {hasMultiple ? (
            <div
              role="tablist"
              aria-label="Chọn ảnh trong danh sách"
              className="mt-3 flex items-center justify-center gap-2"
            >
              {slides.map((slide, slideIdx) => {
                const isActive = slideIdx === currentIndex;
                return (
                  <button
                    key={`dot-${slide.src}-${slideIdx}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ảnh ${slideIdx + 1}: ${slide.alt}`}
                    onClick={() => setActiveIndex(slideIdx)}
                    className={`h-2 w-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      isActive
                        ? 'scale-110 bg-slate-900'
                        : 'bg-slate-300 hover:bg-slate-500'
                    }`}
                  />
                );
              })}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Ảnh tiếp theo"
          className="flex h-11 w-8 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 sm:w-9"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <figcaption className="mt-2 px-10 text-center text-xs italic text-slate-500 sm:px-12">
        <span>{activeSlide.caption}</span>
        <span className="ml-2 not-italic tabular-nums text-slate-400">
          ({currentIndex + 1}/{slides.length})
        </span>
      </figcaption>
    </figure>
  );
}
