import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Cpu } from 'lucide-react';
import { LayoutGroup, MotionConfig, motion } from 'motion/react';
import {
  formatMemberLine,
  getDetailStageIndexForId,
  getSubsectionById,
  HOME_HERO_CONTENT,
  HOME_SUBSECTIONS,
  SCROLL_STAGES,
  type SpecializationId,
} from '../utils/homeSections';
import { PcbVectorBackground } from './PcbVectorBackground';

interface SpecializationImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

function SpecializationImage({
  src,
  alt,
  title,
  className = '',
}: SpecializationImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-4 text-center text-white ${className}`}
      >
        <Cpu className="h-6 w-6 text-sky-300" aria-hidden="true" />
        <span className="text-xs font-medium text-sky-100">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

const SMOOTH_TRANSITION = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function HomePage() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [visibleTitles, setVisibleTitles] = useState<
    Record<SpecializationId, boolean>
  >({
    'part-2': false,
    'part-3': false,
    'part-4': false,
    'part-5': false,
  });

  const heroRef = useRef<HTMLElement>(null);
  const peekRef = useRef<HTMLElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observe Hero, Peek Titles, and Scroll Sentinels via Intersection Observer API
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroRef.current) {
            setHeroVisible(entry.isIntersecting);
          }
          if (entry.target === peekRef.current && entry.isIntersecting) {
            setVisibleTitles({
              'part-2': true,
              'part-3': true,
              'part-4': true,
              'part-5': true,
            });
          }
        }
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }
    if (peekRef.current) {
      heroObserver.observe(peekRef.current);
    }

    const stageObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const rawIndex = entry.target.getAttribute('data-stage-index');
          const parsedIndex = rawIndex ? Number(rawIndex) : NaN;
          if (!Number.isNaN(parsedIndex)) {
            setActiveStageIndex(parsedIndex);
            const stage = SCROLL_STAGES[parsedIndex];
            if (stage?.mode === 'detail' && stage.activeId) {
              setVisibleTitles({
                'part-2': stage.activeId === 'part-2',
                'part-3': stage.activeId === 'part-3',
                'part-4': stage.activeId === 'part-4',
                'part-5': stage.activeId === 'part-5',
              });
            } else {
              setVisibleTitles({
                'part-2': true,
                'part-3': true,
                'part-4': true,
                'part-5': true,
              });
            }
          }
        }
      },
      {
        rootMargin: '-42% 0px -42% 0px',
        threshold: 0,
      }
    );

    for (const el of sentinelRefs.current) {
      if (el) {
        stageObserver.observe(el);
      }
    }

    return () => {
      heroObserver.disconnect();
      stageObserver.disconnect();
    };
  }, []);

  function scrollToStage(stageIndex: number) {
    const target = sentinelRefs.current[stageIndex];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  const currentStage = SCROLL_STAGES[activeStageIndex] ?? SCROLL_STAGES[0];
  const expandedSection = getSubsectionById(currentStage.activeId);

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full">
        {/* Phần 1: Title Hero with Blue PCB Board Vector Background */}
        <section
          ref={heroRef}
          id="phan-1"
          aria-labelledby="hero-title"
          className="relative flex min-h-[430px] h-[calc(100svh_-_3.5rem_-_4.5rem)] w-full snap-start scroll-mt-14 flex-col items-center justify-center overflow-hidden px-4 py-10 text-center text-white sm:px-8"
        >
          <PcbVectorBackground />

          <motion.div
            animate={{
              opacity: heroVisible ? 1 : 0.72,
              y: heroVisible ? 0 : -8,
            }}
            transition={SMOOTH_TRANSITION}
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center"
          >
            <p className="text-sm font-medium tracking-wide text-sky-200 sm:text-base">
              {HOME_HERO_CONTENT.subtitle}
            </p>

            <h1
              id="hero-title"
              className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {HOME_HERO_CONTENT.title}
            </h1>

            <p className="mt-5 text-sm font-medium text-blue-100/90 sm:text-base">
              {HOME_HERO_CONTENT.note}
            </p>

            <p className="mt-2 max-w-3xl text-balance text-sm leading-relaxed text-slate-200 sm:text-base">
              {formatMemberLine(HOME_HERO_CONTENT.members)}
            </p>
          </motion.div>
        </section>

        {/* Bottom Peek Strip showing only the 4 titles at initial load */}
        <section
          ref={peekRef}
          id="peek-titles"
          aria-label="Danh mục các lĩnh vực"
          className="w-full border-t border-b border-slate-200 bg-white"
        >
          <div className="mx-auto grid min-h-[4.5rem] w-full max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0">
            {HOME_SUBSECTIONS.map((section) => {
              const isVisible = visibleTitles[section.id];
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToStage(getDetailStageIndexForId(section.id))}
                  className="group flex items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700 sm:px-6"
                >
                  <span
                    className={`text-sm font-semibold transition-all duration-300 sm:text-base ${
                      isVisible
                        ? 'translate-y-0 text-slate-900 opacity-100'
                        : 'translate-y-1 text-slate-400 opacity-60'
                    } group-hover:text-blue-700`}
                  >
                    {section.title}
                  </span>
                  <ArrowDownRight
                    className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-blue-700"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* Sticky Scrollytelling Showcase: Summary (4 vertical 1/4 rows) <-> Morphed Detail */}
        <section
          id="summary-showcase"
          aria-label="Tổng quan và chi tiết các lĩnh vực"
          data-stage-mode={currentStage.mode}
          data-active-specialization={currentStage.activeId ?? 'summary'}
          className="relative w-full bg-white"
        >
          <div className="sticky top-14 z-10 flex h-[calc(100svh_-_3.5rem)] w-full flex-col overflow-hidden bg-white">

            {/* Morphing Content Viewport */}
            <div className="relative flex-1 overflow-y-auto md:overflow-hidden">
              <LayoutGroup id="home-summary-morph">
                {currentStage.mode === 'overview' || !expandedSection ? (
                  <motion.div
                    key="summary-grid"
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    transition={SMOOTH_TRANSITION}
                    className="grid h-full min-h-[680px] w-full grid-cols-1 grid-rows-4 divide-y divide-slate-200 md:min-h-0"
                  >
                      {HOME_SUBSECTIONS.map((section) => {
                        const isImageLeft = section.imageSide === 'left';
                        const isObserved = visibleTitles[section.id];
                        return (
                          <motion.article
                            key={section.id}
                            layoutId={`card-${section.id}`}
                            transition={SMOOTH_TRANSITION}
                            className="group relative flex h-full w-full items-stretch bg-white transition-colors hover:bg-slate-50/80"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                scrollToStage(
                                  getDetailStageIndexForId(section.id)
                                )
                              }
                              aria-label={`Xem chi tiết ${section.title}`}
                              className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700 sm:gap-8 sm:px-8 sm:py-3"
                            >
                              {/* Text + Bullets Block */}
                              <div
                                className={`flex min-w-0 flex-1 flex-col justify-center ${
                                  isImageLeft ? 'order-2' : 'order-1'
                                }`}
                              >
                                <motion.h2
                                  layoutId={`title-${section.id}`}
                                  transition={SMOOTH_TRANSITION}
                                  className={`text-base font-bold tracking-tight transition-all duration-300 sm:text-xl ${
                                    isObserved
                                      ? 'translate-x-0 text-slate-900 opacity-100'
                                      : 'translate-x-2 text-slate-400 opacity-60'
                                  } group-hover:text-blue-700`}
                                >
                                  {section.title}
                                </motion.h2>

                                <ul className="mt-1.5 space-y-0.5 text-xs leading-snug text-slate-600 sm:mt-2 sm:space-y-1 sm:text-sm">
                                  {section.bullets.map((bullet) => (
                                    <li
                                      key={bullet}
                                      className="flex items-start gap-2"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-700"
                                      />
                                      <span className="line-clamp-1 sm:line-clamp-2">
                                        {bullet}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Alternating Right / Left Photo */}
                              <motion.div
                                layoutId={`image-${section.id}`}
                                transition={SMOOTH_TRANSITION}
                                className={`relative h-[108px] w-[144px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 sm:h-[82%] sm:max-h-[168px] sm:w-[240px] lg:w-[280px] ${
                                  isImageLeft ? 'order-1' : 'order-2'
                                }`}
                              >
                                <SpecializationImage
                                  src={section.imageSrc}
                                  alt={section.imageAlt}
                                  title={section.title}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                />
                              </motion.div>
                            </button>
                          </motion.article>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.article
                      key={`detail-${expandedSection.id}`}
                      layoutId={`card-${expandedSection.id}`}
                      initial={{ opacity: 0.92, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={SMOOTH_TRANSITION}
                      className="flex h-full w-full flex-col justify-center overflow-y-auto bg-white px-4 py-6 sm:px-8 sm:py-10"
                    >
                      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12">
                        {/* Detailed Copy Column */}
                        <div
                          className={`flex flex-col justify-center lg:col-span-7 ${
                            expandedSection.imageSide === 'left'
                              ? 'lg:order-2'
                              : 'lg:order-1'
                          }`}
                        >
                          <motion.h2
                            layoutId={`title-${expandedSection.id}`}
                            transition={SMOOTH_TRANSITION}
                            className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                          >
                            {expandedSection.title}
                          </motion.h2>

                          <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...SMOOTH_TRANSITION, delay: 0.08 }}
                            className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base"
                          >
                            {expandedSection.detailLead}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...SMOOTH_TRANSITION, delay: 0.14 }}
                            className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3"
                          >
                            {expandedSection.detailHighlights.map((item) => (
                              <div key={item.heading} className="space-y-1.5">
                                <h3 className="text-sm font-semibold text-slate-900">
                                  {item.heading}
                                </h3>
                                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                                  {item.body}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        </div>

                        {/* Morphed Larger Image */}
                        <motion.div
                          layoutId={`image-${expandedSection.id}`}
                          transition={SMOOTH_TRANSITION}
                          className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm lg:col-span-5 ${
                            expandedSection.imageSide === 'left'
                              ? 'lg:order-1'
                              : 'lg:order-2'
                          }`}
                        >
                          <SpecializationImage
                            src={expandedSection.imageSrc}
                            alt={expandedSection.imageAlt}
                            title={expandedSection.title}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                    </motion.article>
                  )}
              </LayoutGroup>
            </div>
          </div>

          {/* Invisible scroll sentinels observed by IntersectionObserver */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-0 -mt-[calc(100svh_-_3.5rem)]"
          >
            {SCROLL_STAGES.map((stage, index) => {
              const isFirstOrLast =
                index === 0 || index === SCROLL_STAGES.length - 1;
              return (
                <div
                  key={stage.key}
                  ref={(el) => {
                    sentinelRefs.current[index] = el;
                  }}
                  data-stage-index={index}
                  data-stage-mode={stage.mode}
                  data-stage-target={stage.activeId ?? 'overview'}
                  className={`w-full snap-start scroll-mt-14 ${
                    isFirstOrLast
                      ? 'h-[calc(100svh_-_3.5rem)]'
                      : 'h-[72svh]'
                  }`}
                />
              );
            })}
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
