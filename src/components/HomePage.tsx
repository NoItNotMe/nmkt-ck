import { useCallback, useEffect, useRef, useState } from 'react';
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
import {
  clampHomeStep,
  computeNextHomeStep,
  createInitialWheelGateState,
  evaluateWheelStep,
  TOTAL_HOME_STEPS,
} from '../utils/scrollStepper';
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

interface HomePageProps {
  hasOpenOverlay?: boolean;
}

export function HomePage({ hasOpenOverlay = false }: HomePageProps) {
  // Step 0: Hero (Phần 1), Step 1: 4-row Overview, Steps 2..5: Specializations 2..5
  const [activeStep, setActiveStep] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [visibleTitles, setVisibleTitles] = useState<
    Record<SpecializationId, boolean>
  >({
    'part-2': false,
    'part-3': false,
    'part-4': false,
    'part-5': false,
  });

  const activeStepRef = useRef(0);
  const programmaticScrollUntilRef = useRef(0);
  const wheelGateRef = useRef(createInitialWheelGateState());
  const touchStartYRef = useRef<number | null>(null);

  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const peekRef = useRef<HTMLElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const applyStepState = useCallback((step: number) => {
    const clamped = clampHomeStep(step, TOTAL_HOME_STEPS);
    activeStepRef.current = clamped;
    setActiveStep(clamped);

    if (clamped <= 1) {
      setVisibleTitles({
        'part-2': true,
        'part-3': true,
        'part-4': true,
        'part-5': true,
      });
    } else {
      const stage = SCROLL_STAGES[clamped - 1];
      if (stage?.activeId) {
        setVisibleTitles({
          'part-2': stage.activeId === 'part-2',
          'part-3': stage.activeId === 'part-3',
          'part-4': stage.activeId === 'part-4',
          'part-5': stage.activeId === 'part-5',
        });
      }
    }
  }, []);

  const goToStep = useCallback(
    (nextStep: number) => {
      const targetStep = clampHomeStep(nextStep, TOTAL_HOME_STEPS);
      programmaticScrollUntilRef.current = Date.now() + 750;
      applyStepState(targetStep);

      if (targetStep === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const sentinel = sentinelRefs.current[targetStep - 1];
      if (sentinel) {
        const headerOffset = 56;
        const targetTop =
          sentinel.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      }
    },
    [applyStepState]
  );

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

    const stepObserver = new IntersectionObserver(
      (entries) => {
        if (Date.now() < programmaticScrollUntilRef.current) {
          return;
        }
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const rawStep = entry.target.getAttribute('data-home-step');
          const parsedStep = rawStep ? Number(rawStep) : NaN;
          if (!Number.isNaN(parsedStep)) {
            applyStepState(parsedStep);
          }
        }
      },
      {
        rootMargin: '-42% 0px -42% 0px',
        threshold: 0,
      }
    );

    if (heroWrapperRef.current) {
      stepObserver.observe(heroWrapperRef.current);
    }
    for (const el of sentinelRefs.current) {
      if (el) {
        stepObserver.observe(el);
      }
    }

    return () => {
      heroObserver.disconnect();
      stepObserver.disconnect();
    };
  }, [applyStepState]);

  // Discrete single-page-per-wheel-gesture navigation
  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      if (event.ctrlKey || event.metaKey) {
        return;
      }

      if (!hasOpenOverlay) {
        event.preventDefault();
      }

      const decision = evaluateWheelStep({
        deltaY: event.deltaY,
        now: Date.now(),
        hasOpenOverlay,
        state: wheelGateRef.current,
      });
      wheelGateRef.current = decision.nextState;

      if (!decision.accept || decision.direction === 0) {
        return;
      }

      const nextStep = computeNextHomeStep(
        activeStepRef.current,
        decision.direction,
        TOTAL_HOME_STEPS
      );
      if (nextStep !== activeStepRef.current) {
        goToStep(nextStep);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (hasOpenOverlay) {
        return;
      }
      const targetTag = (event.target as HTMLElement | null)?.tagName;
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT') {
        return;
      }

      let direction: -1 | 1 | 0 = 0;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        direction = 1;
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        direction = -1;
      }

      if (direction === 0) {
        return;
      }

      event.preventDefault();
      const now = Date.now();
      const decision = evaluateWheelStep({
        deltaY: direction * 100,
        now,
        hasOpenOverlay,
        state: wheelGateRef.current,
      });
      wheelGateRef.current = decision.nextState;
      if (!decision.accept) {
        return;
      }

      const nextStep = computeNextHomeStep(
        activeStepRef.current,
        direction,
        TOTAL_HOME_STEPS
      );
      if (nextStep !== activeStepRef.current) {
        goToStep(nextStep);
      }
    }

    function handleTouchStart(event: TouchEvent) {
      if (hasOpenOverlay || event.touches.length !== 1) {
        touchStartYRef.current = null;
        return;
      }
      touchStartYRef.current = event.touches[0].clientY;
    }

    function handleTouchEnd(event: TouchEvent) {
      if (
        hasOpenOverlay ||
        touchStartYRef.current === null ||
        event.changedTouches.length !== 1
      ) {
        touchStartYRef.current = null;
        return;
      }
      const deltaY = touchStartYRef.current - event.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) < 36) {
        return;
      }

      const decision = evaluateWheelStep({
        deltaY,
        now: Date.now(),
        hasOpenOverlay,
        state: wheelGateRef.current,
      });
      wheelGateRef.current = decision.nextState;
      if (!decision.accept || decision.direction === 0) {
        return;
      }

      const nextStep = computeNextHomeStep(
        activeStepRef.current,
        decision.direction,
        TOTAL_HOME_STEPS
      );
      if (nextStep !== activeStepRef.current) {
        goToStep(nextStep);
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToStep, hasOpenOverlay]);

  const showcaseStageIndex = Math.max(0, activeStep - 1);
  const currentStage = SCROLL_STAGES[showcaseStageIndex] ?? SCROLL_STAGES[0];
  const expandedSection = getSubsectionById(currentStage.activeId);

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full" data-home-active-step={activeStep}>
        {/* Step 0: Phần 1 Hero + 4-title bottom peek strip (exact 1 screen below TopBar) */}
        <div
          ref={heroWrapperRef}
          data-home-step={0}
          className="w-full snap-start scroll-mt-14"
        >
          <section
            ref={heroRef}
            id="phan-1"
            aria-labelledby="hero-title"
            className="relative flex min-h-[430px] h-[calc(100svh_-_3.5rem_-_4.5rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-10 text-center text-white sm:px-8"
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
                    onClick={() =>
                      goToStep(getDetailStageIndexForId(section.id) + 1)
                    }
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
        </div>

        {/* Sticky Scrollytelling Showcase: Steps 1..5 */}
        <section
          id="summary-showcase"
          aria-label="Tổng quan và chi tiết các lĩnh vực"
          data-stage-mode={currentStage.mode}
          data-active-specialization={currentStage.activeId ?? 'overview'}
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
                              goToStep(getDetailStageIndexForId(section.id) + 1)
                            }
                            aria-label={`Xem chi tiết ${section.title}`}
                            className="flex h-full w-full items-stretch justify-between gap-4 py-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700 sm:gap-8"
                          >
                            {/* Text + Bullets Block */}
                            <div
                              className={`flex min-w-0 flex-1 flex-col justify-center py-2.5 sm:py-3 ${
                                isImageLeft
                                  ? 'order-2 items-end pr-4 text-right sm:pr-8 lg:pr-16'
                                  : 'order-1 items-start pl-4 text-left sm:pl-8 lg:pl-16'
                              }`}
                            >
                              <motion.h2
                                layoutId={`title-${section.id}`}
                                transition={SMOOTH_TRANSITION}
                                className={`text-base font-bold tracking-tight transition-all duration-300 sm:text-xl ${
                                  isObserved
                                    ? 'translate-x-0 text-slate-900 opacity-100'
                                    : isImageLeft
                                      ? '-translate-x-2 text-slate-400 opacity-60'
                                      : 'translate-x-2 text-slate-400 opacity-60'
                                } group-hover:text-blue-700`}
                              >
                                {section.title}
                              </motion.h2>

                              <ul
                                className={`mt-1.5 flex flex-col space-y-0.5 text-xs leading-snug text-slate-600 sm:mt-2 sm:space-y-1 sm:text-sm ${
                                  isImageLeft ? 'items-end' : 'items-start'
                                }`}
                              >
                                {section.bullets.map((bullet) => (
                                  <li
                                    key={bullet}
                                    className={`flex items-start gap-2 ${
                                      isImageLeft
                                        ? 'flex-row-reverse text-right'
                                        : 'text-left'
                                    }`}
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

                            {/* Alternating Right / Left Photo flush to viewport edge */}
                            <motion.div
                              layoutId={`image-${section.id}`}
                              transition={SMOOTH_TRANSITION}
                              className={`relative h-full w-[160px] shrink-0 overflow-hidden border-slate-200 bg-slate-100 sm:w-[280px] lg:w-[340px] ${
                                isImageLeft
                                  ? 'order-1 border-r'
                                  : 'order-2 border-l'
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
                    className="relative flex h-full w-full flex-col overflow-y-auto bg-white px-4 py-5 sm:px-8 sm:py-8"
                  >
                    {/* Full-bleed Morphed Background Image with Directional Fade Reveal */}
                    <motion.div
                      layoutId={`image-${expandedSection.id}`}
                      transition={SMOOTH_TRANSITION}
                      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden bg-slate-100"
                    >
                      <motion.div
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full w-full"
                      >
                        <SpecializationImage
                          src={expandedSection.imageSrc}
                          alt={expandedSection.imageAlt}
                          title={expandedSection.title}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>

                      {/* Directional gradient veil: opens gradually from image side, leaving a clean corner for text */}
                      <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0.35 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute inset-0 ${
                          expandedSection.imageSide === 'left'
                            ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.93)_72%,rgba(255,255,255,0.68)_100%)] lg:bg-[linear-gradient(78deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_16%,rgba(255,255,255,0.78)_30%,rgba(255,255,255,0.94)_40%,rgba(255,255,255,0.98)_55%,rgba(255,255,255,1)_100%)]'
                            : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.93)_72%,rgba(255,255,255,0.68)_100%)] lg:bg-[linear-gradient(282deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_16%,rgba(255,255,255,0.78)_30%,rgba(255,255,255,0.94)_40%,rgba(255,255,255,0.98)_55%,rgba(255,255,255,1)_100%)]'
                        }`}
                      />
                    </motion.div>

                    <div
                      className={`relative z-10 mx-auto my-auto grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10 ${
                        expandedSection.detailHighlights.length === 2
                          ? 'max-w-7xl'
                          : 'max-w-6xl'
                      }`}
                    >
                      {/* Detailed Copy Column */}
                      <div
                        className={`flex flex-col justify-center ${
                          expandedSection.detailHighlights.length === 2
                            ? expandedSection.imageSide === 'left'
                              ? 'lg:col-span-8 lg:col-start-5 lg:items-start lg:text-left'
                              : 'lg:col-span-8 lg:col-start-1 lg:items-start lg:text-left'
                            : expandedSection.imageSide === 'left'
                              ? 'lg:col-span-7 lg:col-start-6 lg:items-end lg:text-right'
                              : 'lg:col-span-7 lg:col-start-1 lg:items-start lg:text-left'
                        }`}
                      >
                        <motion.h2
                          layoutId={`title-${expandedSection.id}`}
                          transition={SMOOTH_TRANSITION}
                          className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
                        >
                          {expandedSection.title}
                        </motion.h2>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ ...SMOOTH_TRANSITION, delay: 0.08 }}
                          className={`mt-3 space-y-2 text-slate-700 ${
                            expandedSection.detailHighlights.length === 2
                              ? 'max-w-none text-[13px] leading-relaxed sm:text-[13.5px]'
                              : `max-w-2xl text-sm leading-relaxed sm:text-base ${
                                  expandedSection.imageSide === 'left'
                                    ? 'lg:ml-auto'
                                    : ''
                                }`
                          }`}
                        >
                          {expandedSection.detailLead
                            .split('\n\n')
                            .map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ ...SMOOTH_TRANSITION, delay: 0.14 }}
                          className={`mt-4 grid w-full grid-cols-1 gap-4 border-t border-slate-300/80 pt-4 sm:gap-6 ${
                            expandedSection.detailHighlights.length === 2
                              ? 'sm:grid-cols-2'
                              : 'sm:grid-cols-3'
                          }`}
                        >
                          {expandedSection.detailHighlights.map((item) => (
                            <div key={item.heading} className="space-y-1.5">
                              <h3 className="text-sm font-semibold text-slate-900">
                                {item.heading}
                              </h3>
                              <div
                                className={`space-y-2 leading-relaxed text-slate-700 ${
                                  expandedSection.detailHighlights.length === 2
                                    ? 'text-xs sm:text-[13px]'
                                    : 'text-xs sm:text-sm'
                                }`}
                              >
                                {item.body
                                  .split('\n\n')
                                  .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                )}
              </LayoutGroup>
            </div>
          </div>

          {/* 1-screen-per-step sentinels observed by IntersectionObserver */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-0 -mt-[calc(100svh_-_3.5rem)]"
          >
            {SCROLL_STAGES.map((stage, index) => (
              <div
                key={stage.key}
                ref={(el) => {
                  sentinelRefs.current[index] = el;
                }}
                data-home-step={index + 1}
                data-stage-index={index}
                data-stage-mode={stage.mode}
                data-stage-target={stage.activeId ?? 'overview'}
                className="h-[calc(100svh_-_3.5rem)] w-full snap-start scroll-mt-14"
              />
            ))}
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
