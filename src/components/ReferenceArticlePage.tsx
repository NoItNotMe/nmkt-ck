import { type FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Send } from 'lucide-react';
import { type UserAccount } from '../utils/auth';
import { type ReferenceComment, type ReferencePost } from '../utils/referencePosts';
import { ArticleCarouselFigure } from './ArticleCarouselFigure';

interface ReferenceArticlePageProps {
  post: ReferencePost;
  user: UserAccount | null;
  likeCount: number;
  isLiked: boolean;
  comments: ReferenceComment[];
  commentCount: number;
  focusCommentsOnMount: boolean;
  hasFailedImage: boolean;
  onImageError: () => void;
  onBack: () => void;
  onToggleLike: () => void;
  onSubmitComment: (text: string) => boolean;
  onRequireAuth: () => void;
}

export function ReferenceArticlePage({
  post,
  user,
  likeCount,
  isLiked,
  comments,
  commentCount,
  focusCommentsOnMount,
  hasFailedImage,
  onImageError,
  onBack,
  onToggleLike,
  onSubmitComment,
  onRequireAuth,
}: ReferenceArticlePageProps) {
  const [commentInput, setCommentInput] = useState('');
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCommentInput('');
  }, [post.id]);

  useEffect(() => {
    if (!focusCommentsOnMount) {
      return;
    }
    const timer = window.setTimeout(() => {
      commentSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      commentInputRef.current?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [post.id, focusCommentsOnMount]);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }
    const added = onSubmitComment(commentInput);
    if (added) {
      setCommentInput('');
    }
  }

  return (
    <article
      aria-labelledby="reference-article-title"
      className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-3xl px-4 py-8 sm:px-8 sm:py-10"
    >
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Quay lại Tham khảo</span>
        </button>
      </div>

      <span className="block text-xs font-medium text-slate-500">
        {post.detailCategory ?? post.category}
      </span>

      <h1
        id="reference-article-title"
        className="mt-2 text-balance text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-4xl"
      >
        {post.title}
      </h1>

      <p className="mt-3.5 text-base leading-relaxed text-slate-600 sm:text-lg">
        {post.sapo}
      </p>

      {/* Metadata directly under Sapo: reading minutes + Like & Comment counts */}
      <div className="mt-4 flex flex-wrap items-center gap-5 border-b border-slate-100 pb-5 text-xs text-slate-500">
        <span>{post.readTime}</span>

        <button
          type="button"
          onClick={onToggleLike}
          aria-pressed={isLiked}
          aria-label={`Thích bài viết (${likeCount} lượt thích)`}
          className={`inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
            isLiked
              ? 'font-medium text-rose-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              isLiked ? 'fill-rose-600 text-rose-600' : ''
            }`}
            aria-hidden="true"
          />
          <span>{likeCount} lượt thích</span>
        </button>

        <span className="inline-flex items-center gap-1.5 text-slate-500">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{commentCount} bình luận</span>
        </span>
      </div>

      <div className="mt-6 overflow-hidden bg-slate-100">
        {hasFailedImage ? (
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-slate-100 p-6 text-center text-sm text-slate-500">
            {post.imageLabel}
          </div>
        ) : (
          <img
            src={post.imageSrc}
            alt={post.imageAlt}
            referrerPolicy="no-referrer"
            onError={onImageError}
            className="aspect-[16/9] w-full object-cover"
          />
        )}
      </div>

      <div className="mt-7 space-y-4 text-base leading-relaxed text-slate-700">
        {post.bodyParagraphs.map((block, idx) => {
          if (typeof block !== 'string') {
            if (block.type === 'carousel') {
              return (
                <ArticleCarouselFigure
                  key={idx}
                  block={block}
                  postId={post.id}
                />
              );
            }
            return (
              <figure key={idx} className="my-6">
                <div className="overflow-hidden bg-slate-100">
                  <img
                    src={block.src}
                    alt={block.alt}
                    referrerPolicy="no-referrer"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs italic text-slate-500">
                  {block.caption}
                </figcaption>
              </figure>
            );
          }
          if (block === '---') {
            return (
              <hr
                key={idx}
                aria-hidden="true"
                className="mx-auto my-6 w-12 border-t border-slate-200"
              />
            );
          }
          if (block.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-slate-300 pl-4 italic text-slate-800"
              >
                {block.slice(2)}
              </blockquote>
            );
          }
          return <p key={idx}>{block}</p>;
        })}
      </div>

      {post.sourceUrl ? (
        <p className="mt-7 border-t border-slate-100 pt-4 text-xs text-slate-500">
          Nguồn:{' '}
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-slate-700 underline underline-offset-4 hover:text-blue-700"
          >
            {post.sourceUrl}
          </a>
        </p>
      ) : null}

      {/* Comments Section (Login Required to Like or Comment) */}
      <div
        ref={commentSectionRef}
        className="mt-8 border-t border-slate-100 pt-6"
      >
        <h2 className="text-sm font-semibold text-slate-900">
          Bình luận ({commentCount})
        </h2>

        {user ? (
          <form
            onSubmit={handleFormSubmit}
            className="mt-3 flex items-center gap-2"
          >
            <input
              ref={commentInputRef}
              type="text"
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              placeholder={`Bình luận với tên ${user.name}...`}
              aria-label="Nội dung bình luận"
              className="flex-1 border-b border-slate-300 bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Gửi bình luận"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Gửi</span>
            </button>
          </form>
        ) : (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600">
            <span>Bạn cần đăng nhập để thích hoặc bình luận bài viết này.</span>
            <button
              type="button"
              onClick={onRequireAuth}
              className="font-semibold text-slate-900 underline underline-offset-4 hover:text-blue-700"
            >
              Đăng nhập ngay
            </button>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận.
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold text-slate-900">
                  {comment.authorName}
                </span>
                <p className="mt-0.5 text-slate-700">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
