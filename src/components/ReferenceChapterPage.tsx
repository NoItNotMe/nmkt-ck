import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { type UserAccount } from '../utils/auth';
import { buildReferencePostHash } from '../utils/navigation';
import {
  type EngagementMap,
  getEngagementForPost,
  getReferenceChapterInfo,
  getReferencePostsByChapter,
  type ReferencePost,
} from '../utils/referencePosts';
import { ChapterIndexButton } from './ChapterIndexButton';

interface ReferenceChapterPageProps {
  chapterNumber: number;
  user: UserAccount | null;
  engagementMap: EngagementMap;
  failedImages: Record<string, boolean>;
  onImageError: (postId: string) => void;
  onOpenPost: (post: ReferencePost, jumpToComments?: boolean) => void;
  onSelectChapter: (chapterNumber: number) => void;
  onBackToList: () => void;
  onToggleLike: (post: ReferencePost) => void;
}

export function ReferenceChapterPage({
  chapterNumber,
  user,
  engagementMap,
  failedImages,
  onImageError,
  onOpenPost,
  onSelectChapter,
  onBackToList,
  onToggleLike,
}: ReferenceChapterPageProps) {
  const chapterInfo = getReferenceChapterInfo(chapterNumber);
  const posts = getReferencePostsByChapter(chapterNumber);

  return (
    <section
      aria-labelledby="reference-chapter-heading"
      className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10"
    >
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <button
            type="button"
            onClick={onBackToList}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Quay lại Tham khảo</span>
          </button>

          <h1
            id="reference-chapter-heading"
            className="mt-3 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {chapterInfo.detailLabel}
          </h1>
          <p className="mt-1.5 text-xs tabular-nums text-slate-500">
            {posts.length} bài viết thuộc {chapterInfo.label}
          </p>
        </div>

        <ChapterIndexButton
          activeChapterNumber={chapterNumber}
          align="right"
          onSelectChapter={onSelectChapter}
        />
      </div>

      {posts.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">
          Chưa có bài viết nào trong {chapterInfo.label}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const stats = getEngagementForPost(
              engagementMap,
              post,
              user?.email
            );

            return (
              <article key={post.id} className="group flex flex-col">
                <a
                  href={buildReferencePostHash(post.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenPost(post, false);
                  }}
                  aria-label={`Đọc bài viết ${post.title}`}
                  className={`block aspect-[16/10] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                    post.imageFit === 'contain'
                      ? 'border border-slate-200/80 bg-white'
                      : 'bg-slate-100'
                  }`}
                >
                  {failedImages[post.id] ? (
                    <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-slate-500">
                      {post.imageLabel}
                    </div>
                  ) : (
                    <img
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => onImageError(post.id)}
                      className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                        post.imageFit === 'contain'
                          ? 'object-contain p-1.5'
                          : 'object-cover'
                      }`}
                    />
                  )}
                </a>

                <span className="mt-3 block text-xs font-medium text-slate-500">
                  {post.category}
                </span>

                <a
                  href={buildReferencePostHash(post.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenPost(post, false);
                  }}
                  className="mt-1.5 block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <h2 className="text-balance text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                    {post.title}
                  </h2>
                </a>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {post.sapo}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span>{post.readTime}</span>

                  <button
                    type="button"
                    onClick={() => onToggleLike(post)}
                    aria-pressed={stats.isLiked}
                    aria-label={`Thích bài viết (${stats.likeCount} lượt thích)`}
                    className={`inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      stats.isLiked
                        ? 'font-medium text-rose-600'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        stats.isLiked ? 'fill-rose-600 text-rose-600' : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span>{stats.likeCount}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenPost(post, true)}
                    aria-label={`Bình luận bài viết (${stats.commentCount} bình luận)`}
                    className="inline-flex items-center gap-1 text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{stats.commentCount}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
