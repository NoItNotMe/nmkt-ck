import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { type UserAccount } from '../utils/auth';
import { buildReferencePostHash } from '../utils/navigation';
import {
  addArticleComment,
  type EngagementMap,
  FEATURED_REFERENCE_POSTS,
  findReferencePostById,
  getEngagementForPost,
  getGridReferencePosts,
  getSidebarReferencePosts,
  INITIAL_GRID_VISIBLE_COUNT,
  loadEngagementMap,
  type ReferencePost,
  saveEngagementMap,
  stepReferenceIndex,
  toggleArticleLike,
} from '../utils/referencePosts';
import { ChapterIndexButton } from './ChapterIndexButton';
import { ReferenceArticlePage } from './ReferenceArticlePage';
import { ReferenceChapterPage } from './ReferenceChapterPage';

interface ReferencePageProps {
  user: UserAccount | null;
  selectedPostId: string | null;
  selectedChapter: number | null;
  onOpenPost: (postId: string) => void;
  onOpenChapter: (chapterNumber: number) => void;
  onBackToList: () => void;
  onRequireAuth: () => void;
}

export function ReferencePage({
  user,
  selectedPostId,
  selectedChapter,
  onOpenPost,
  onOpenChapter,
  onBackToList,
  onRequireAuth,
}: ReferencePageProps) {
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [focusCommentsOnOpen, setFocusCommentsOnOpen] = useState(false);
  const [isGridExpanded, setIsGridExpanded] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [engagementMap, setEngagementMap] = useState<EngagementMap>(() =>
    typeof window !== 'undefined' ? loadEngagementMap(window.localStorage) : {}
  );
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setAuthNotice(null);
    }
  }, [user]);

  useEffect(() => {
    if (!selectedPostId) {
      setFocusCommentsOnOpen(false);
    }
  }, [selectedPostId]);

  const activePost = findReferencePostById(selectedPostId);

  const featuredPost =
    FEATURED_REFERENCE_POSTS[activeFeaturedIndex] ?? FEATURED_REFERENCE_POSTS[0];
  const featuredEngagement = getEngagementForPost(
    engagementMap,
    featuredPost,
    user?.email
  );
  const sidebarPosts = getSidebarReferencePosts();
  const gridPosts = getGridReferencePosts();
  const visibleGridPosts = isGridExpanded
    ? gridPosts
    : gridPosts.slice(0, INITIAL_GRID_VISIBLE_COUNT);
  const hasMoreGridPosts = gridPosts.length > INITIAL_GRID_VISIBLE_COUNT;

  function handlePrevFeatured() {
    setActiveFeaturedIndex((prev) =>
      stepReferenceIndex(prev, -1, FEATURED_REFERENCE_POSTS.length)
    );
  }

  function handleNextFeatured() {
    setActiveFeaturedIndex((prev) =>
      stepReferenceIndex(prev, 1, FEATURED_REFERENCE_POSTS.length)
    );
  }

  function markImageFailed(postId: string) {
    setFailedImages((prev) => ({ ...prev, [postId]: true }));
  }

  function openArticlePage(post: ReferencePost, jumpToComments = false) {
    setFocusCommentsOnOpen(jumpToComments);
    onOpenPost(post.id);
  }

  function handleToggleLike(post: ReferencePost) {
    if (!user) {
      setAuthNotice('Vui lòng đăng nhập để thích hoặc bình luận bài viết.');
      onRequireAuth();
      return;
    }
    setEngagementMap((prev) => {
      const next = toggleArticleLike(prev, post.id, user.email);
      saveEngagementMap(window.localStorage, next);
      return next;
    });
  }

  function handleSubmitComment(post: ReferencePost, rawText: string): boolean {
    if (!user) {
      setAuthNotice('Vui lòng đăng nhập để thích hoặc bình luận bài viết.');
      onRequireAuth();
      return false;
    }
    const result = addArticleComment(
      engagementMap,
      post.id,
      user.name,
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
      user?.email
    );

    return (
      <ReferenceArticlePage
        post={activePost}
        user={user}
        likeCount={activeEngagement.likeCount}
        isLiked={activeEngagement.isLiked}
        comments={activeEngagement.comments}
        commentCount={activeEngagement.commentCount}
        focusCommentsOnMount={focusCommentsOnOpen}
        hasFailedImage={Boolean(failedImages[activePost.id])}
        onImageError={() => markImageFailed(activePost.id)}
        onBack={onBackToList}
        onToggleLike={() => handleToggleLike(activePost)}
        onSubmitComment={(text) => handleSubmitComment(activePost, text)}
        onRequireAuth={onRequireAuth}
      />
    );
  }

  if (selectedChapter !== null) {
    return (
      <ReferenceChapterPage
        chapterNumber={selectedChapter}
        user={user}
        engagementMap={engagementMap}
        failedImages={failedImages}
        onImageError={markImageFailed}
        onOpenPost={openArticlePage}
        onSelectChapter={onOpenChapter}
        onBackToList={onBackToList}
        onToggleLike={handleToggleLike}
      />
    );
  }

  return (
    <section
      aria-label="Khu vực đọc bài viết tham khảo"
      className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-10"
    >
      <h1 className="sr-only">Tham khảo</h1>

      {authNotice ? (
        <div
          role="status"
          className="mb-5 flex items-center justify-between text-xs text-slate-600"
        >
          <span>{authNotice}</span>
          <button
            type="button"
            onClick={() => setAuthNotice(null)}
            className="text-slate-400 hover:text-slate-800"
          >
            Ẩn
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left/Center Column: 2 Main Featured Articles (< [ Image + 2 Dots ] >) without category */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrevFeatured}
              aria-label="Bài báo chính trước"
              className="flex h-10 w-7 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 sm:w-8"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <a
                href={buildReferencePostHash(featuredPost.id)}
                onClick={(event) => {
                  event.preventDefault();
                  openArticlePage(featuredPost, false);
                }}
                aria-label={`Đọc bài viết ${featuredPost.title}`}
                className="group relative block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700"
              >
                {failedImages[featuredPost.id] ? (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 p-6 text-center text-sm text-slate-500">
                    {featuredPost.imageLabel}
                  </div>
                ) : (
                  <img
                    src={featuredPost.imageSrc}
                    alt={featuredPost.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => markImageFailed(featuredPost.id)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/30 to-transparent"
                />
              </a>

              {/* 2 Minimal Pagination Dots inside bottom of image */}
              <div
                role="tablist"
                aria-label="Chọn bài báo chính"
                className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2"
              >
                {FEATURED_REFERENCE_POSTS.map((post, index) => {
                  const isActive = index === activeFeaturedIndex;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Chuyển đến ${post.title}`}
                      onClick={() => setActiveFeaturedIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isActive
                          ? 'scale-110 bg-white'
                          : 'bg-white/55 hover:bg-white/85'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextFeatured}
              aria-label="Bài báo chính tiếp theo"
              className="flex h-10 w-7 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 sm:w-8"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Minimalist Text Block directly beneath Featured Image (with category, no borders, no author/date) */}
          <div className="mt-4 px-9 sm:px-11">
            <span className="mb-1.5 block text-xs font-medium text-slate-500">
              {featuredPost.category}
            </span>

            <a
              href={buildReferencePostHash(featuredPost.id)}
              onClick={(event) => {
                event.preventDefault();
                openArticlePage(featuredPost, false);
              }}
              className="block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <h2 className="text-balance text-2xl font-bold leading-snug tracking-tight text-slate-900 transition-colors hover:text-blue-700 sm:text-3xl">
                {featuredPost.title}
              </h2>
            </a>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {featuredPost.sapo}
            </p>

            {/* Directly under Sapo: reading minutes + Like & Comment actions */}
            <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-slate-500">
              <span>{featuredPost.readTime}</span>

              <button
                type="button"
                onClick={() => handleToggleLike(featuredPost)}
                aria-pressed={featuredEngagement.isLiked}
                aria-label={`Thích bài viết (${featuredEngagement.likeCount} lượt thích)`}
                className={`inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                  featuredEngagement.isLiked
                    ? 'font-medium text-rose-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${
                    featuredEngagement.isLiked ? 'fill-rose-600 text-rose-600' : ''
                  }`}
                  aria-hidden="true"
                />
                <span>{featuredEngagement.likeCount}</span>
              </button>

              <button
                type="button"
                onClick={() => openArticlePage(featuredPost, true)}
                aria-label={`Bình luận bài viết (${featuredEngagement.commentCount} bình luận)`}
                className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{featuredEngagement.commentCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Exactly 5 Chapter Articles (Chương 1..5) */}
        <aside
          aria-label="Các bài báo khác"
          className="flex flex-col gap-5 lg:col-span-5"
        >
          {sidebarPosts.map((post) => {
            const stats = getEngagementForPost(engagementMap, post, user?.email);
            return (
              <a
                key={post.id}
                href={buildReferencePostHash(post.id)}
                onClick={(event) => {
                  event.preventDefault();
                  openArticlePage(post, false);
                }}
                className="group flex w-full items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <div className="aspect-[16/10] w-32 shrink-0 overflow-hidden bg-slate-100 sm:w-36">
                  {failedImages[post.id] ? (
                    <div className="flex h-full w-full items-center justify-center p-2 text-center text-[11px] text-slate-500">
                      {post.imageLabel}
                    </div>
                  ) : (
                    <img
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => markImageFailed(post.id)}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
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
              const stats = getEngagementForPost(engagementMap, post, user?.email);
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
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {failedImages[post.id] ? (
                      <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-slate-500">
                        {post.imageLabel}
                      </div>
                    ) : (
                      <img
                        src={post.imageSrc}
                        alt={post.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() => markImageFailed(post.id)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>

                  <span className="mt-3 block text-xs font-medium text-slate-500">
                    {post.category}
                  </span>
                  <h3 className="mt-1.5 line-clamp-3 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                    {post.title}
                  </h3>
                  <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-400">
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
                </a>
              );
            })}
          </div>

          {hasMoreGridPosts ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setIsGridExpanded((prev) => !prev)}
                className="border border-slate-900 bg-white px-5 py-2 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                {isGridExpanded ? 'Thu gọn' : 'Xem thêm'}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
