import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { buildReferencePostHash } from '../utils/navigation';
import {
  addArticleComment,
  type EngagementMap,
  findReferencePostById,
  getEngagementForPost,
  INITIAL_GRID_VISIBLE_COUNT,
  loadEngagementMap,
  PAGE_LOAD_REFERENCE_FEED,
  type ReferencePost,
  saveEngagementMap,
  stepReferenceIndex,
  toggleArticleLike,
  VISITOR_ENGAGEMENT_ID,
} from '../utils/referencePosts';
import { ChapterIndexButton } from './ChapterIndexButton';
import { ReferenceArticlePage } from './ReferenceArticlePage';
import { ReferenceChapterPage } from './ReferenceChapterPage';

interface ReferencePageProps {
  selectedPostId: string | null;
  selectedChapter: number | null;
  onOpenPost: (postId: string) => void;
  onOpenChapter: (chapterNumber: number) => void;
  onBackToList: () => void;
}

export function ReferencePage({
  selectedPostId,
  selectedChapter,
  onOpenPost,
  onOpenChapter,
  onBackToList,
}: ReferencePageProps) {
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [focusCommentsOnOpen, setFocusCommentsOnOpen] = useState(false);
  const [isGridExpanded, setIsGridExpanded] = useState(false);
  const [engagementMap, setEngagementMap] = useState<EngagementMap>(() =>
    typeof window !== 'undefined' ? loadEngagementMap(window.localStorage) : {}
  );

  useEffect(() => {
    if (!selectedPostId) {
      setFocusCommentsOnOpen(false);
    }
  }, [selectedPostId]);

  const activePost = findReferencePostById(selectedPostId);

  const { featuredPosts, sidebarPosts, gridPosts } = PAGE_LOAD_REFERENCE_FEED;

  const featuredPost =
    featuredPosts[activeFeaturedIndex] ?? featuredPosts[0];
  const featuredEngagement = getEngagementForPost(
    engagementMap,
    featuredPost,
    VISITOR_ENGAGEMENT_ID
  );
  const visibleGridPosts = isGridExpanded
    ? gridPosts
    : gridPosts.slice(0, INITIAL_GRID_VISIBLE_COUNT);
  const hasMoreGridPosts = gridPosts.length > INITIAL_GRID_VISIBLE_COUNT;

  function handlePrevFeatured() {
    setActiveFeaturedIndex((prev) =>
      stepReferenceIndex(prev, -1, featuredPosts.length)
    );
  }

  function handleNextFeatured() {
    setActiveFeaturedIndex((prev) =>
      stepReferenceIndex(prev, 1, featuredPosts.length)
    );
  }

  function openArticlePage(post: ReferencePost, jumpToComments = false) {
    setFocusCommentsOnOpen(jumpToComments);
    onOpenPost(post.id);
  }

  function handleToggleLike(post: ReferencePost) {
    setEngagementMap((prev) => {
      const next = toggleArticleLike(prev, post.id, VISITOR_ENGAGEMENT_ID);
      saveEngagementMap(window.localStorage, next);
      return next;
    });
  }

  function handleSubmitComment(
    post: ReferencePost,
    authorName: string,
    rawText: string
  ): boolean {
    const result = addArticleComment(
      engagementMap,
      post.id,
      authorName,
      rawText
    );
    if (!result.added) {
      return false;
    }
    setEngagementMap(result.nextMap);
    saveEngagementMap(window.localStorage, result.nextMap);
    return true;
  }

  if (activePost) {
    const activeEngagement = getEngagementForPost(
      engagementMap,
      activePost,
      VISITOR_ENGAGEMENT_ID
    );

    return (
      <ReferenceArticlePage
        post={activePost}
        likeCount={activeEngagement.likeCount}
        isLiked={activeEngagement.isLiked}
        comments={activeEngagement.comments}
        commentCount={activeEngagement.commentCount}
        focusCommentsOnMount={focusCommentsOnOpen}
        onBack={onBackToList}
        onToggleLike={() => handleToggleLike(activePost)}
        onSubmitComment={(authorName, text) =>
          handleSubmitComment(activePost, authorName, text)
        }
      />
    );
  }

  if (selectedChapter !== null) {
    return (
      <ReferenceChapterPage
        chapterNumber={selectedChapter}
        engagementMap={engagementMap}
        onOpenPost={openArticlePage}
        onSelectChapter={onOpenChapter}
        onBackToList={onBackToList}
        onToggleLike={handleToggleLike}
      />
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
      {/* Top 2-Column Split: Spotlight Carousel (Left) + Sidebar Posts (Right) */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left: Featured Spotlight Carousel (8 cols) */}
        <section
          aria-labelledby="featured-spotlight-heading"
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-8 sm:p-8"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {featuredPost.detailCategory ?? featuredPost.category}
              </span>
              <span className="bg-slate-900 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-yellow-300">
                Tiêu điểm
              </span>
            </div>

            <h2
              id="featured-spotlight-heading"
              className="mt-3 text-balance font-['Playfair_Display',Georgia,serif] text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl"
            >
              {featuredPost.title}
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {featuredPost.sapo}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            <a
              href={buildReferencePostHash(featuredPost.id)}
              onClick={(event) => {
                event.preventDefault();
                openArticlePage(featuredPost, false);
              }}
              aria-label={`Đọc bài viết ${featuredPost.title}`}
              className="group relative block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700"
            >
              <img
                src={featuredPost.imageSrc}
                alt={featuredPost.imageAlt}
                referrerPolicy="no-referrer"
                className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${
                  featuredPost.imageFit === 'contain'
                    ? 'object-contain p-3 pb-8'
                    : 'object-cover'
                }`}
              />
              {featuredPost.imageFit === 'contain' ? null : (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/30 to-transparent"
                />
              )}
            </a>

            {/* 4 Minimal Pagination Dots inside bottom of image */}
            <div
              role="tablist"
              aria-label="Chọn bài báo chính"
              className="flex items-center justify-between border-t border-slate-100 pt-4"
            >
              <div className="flex items-center gap-1.5" role="tablist">
                {featuredPosts.map((post, idx) => {
                  const isActive = idx === activeFeaturedIndex;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Chuyển đến tiêu điểm ${idx + 1}`}
                      onClick={() => setActiveFeaturedIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        isActive
                          ? 'w-8 bg-slate-900'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevFeatured}
                  aria-label="Tiêu điểm trước"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextFeatured}
                  aria-label="Tiêu điểm tiếp theo"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Sidebar Posts (4 cols) */}
        <aside
          aria-label="Bài viết bên lề"
          className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-4"
        >
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Góc nhìn chuyên sâu
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {sidebarPosts.map((post) => {
              const stats = getEngagementForPost(
                engagementMap,
                post,
                VISITOR_ENGAGEMENT_ID
              );
              return (
                <a
                  key={post.id}
                  href={buildReferencePostHash(post.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    openArticlePage(post, false);
                  }}
                  className="group flex w-full items-start gap-4 py-4 text-left first:pt-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <div
                    className={`aspect-[16/10] w-32 shrink-0 overflow-hidden sm:w-36 ${
                      post.imageFit === 'contain'
                        ? 'border border-slate-200/80 bg-white'
                        : 'bg-slate-100'
                    }`}
                  >
                    <img
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      referrerPolicy="no-referrer"
                      className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                        post.imageFit === 'contain'
                          ? 'object-contain p-1'
                          : 'object-cover'
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium text-slate-500">
                      {post.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 sm:text-[15px]">
                      {post.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-400">
                      <span>{post.readTime}</span>
                      <span className="inline-flex items-center gap-1">
                        <Heart
                          className={`h-3 w-3 ${
                            stats.isLiked ? 'fill-rose-600 text-rose-600' : ''
                          }`}
                          aria-hidden="true"
                        />
                        {stats.likeCount}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" aria-hidden="true" />
                        {stats.commentCount}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Small Square Chapter Index Control between main spotlight and remaining chapters */}
      <div className="my-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" aria-hidden="true" />
        <ChapterIndexButton onSelectChapter={onOpenChapter} />
        <div className="h-px flex-1 bg-slate-200" aria-hidden="true" />
      </div>

      {/* Bottom 4-Column Grid for Remaining Articles + Xem thêm */}
      {gridPosts.length > 0 ? (
        <div
          aria-label="Danh sách các chương tiếp theo"
          className="mt-2"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {visibleGridPosts.map((post) => {
              const stats = getEngagementForPost(
                engagementMap,
                post,
                VISITOR_ENGAGEMENT_ID
              );
              return (
                <a
                  key={post.id}
                  href={buildReferencePostHash(post.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    openArticlePage(post, false);
                  }}
                  className="group flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <div
                    className={`aspect-[16/10] w-full overflow-hidden ${
                      post.imageFit === 'contain'
                        ? 'border border-slate-200/80 bg-white'
                        : 'bg-slate-100'
                    }`}
                  >
                    <img
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      referrerPolicy="no-referrer"
                      className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                        post.imageFit === 'contain'
                          ? 'object-contain p-1.5'
                          : 'object-cover'
                      }`}
                    />
                  </div>

                  <span className="mt-3 block text-xs font-medium text-slate-500">
                    {post.category}
                  </span>
                  <h3 className="mt-1.5 line-clamp-3 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {post.sapo}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{post.readTime}</span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            stats.isLiked ? 'fill-rose-600 text-rose-600' : ''
                          }`}
                          aria-hidden="true"
                        />
                        {stats.likeCount}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {stats.commentCount}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {hasMoreGridPosts && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setIsGridExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <span>{isGridExpanded ? 'Thu gọn bớt bài viết' : 'Xem thêm bài viết tham khảo'}</span>
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
