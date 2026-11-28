import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { groupArticleBodySegments } from '../utils/referenceArticleLayout';
import {
  type ArticleContentBlock,
  type ReferenceComment,
  type ReferencePost,
  validateArticleCommentInput,
} from '../utils/referencePosts';
import { ArticleBarChartFigure } from './ArticleBarChartFigure';
import { ArticleCarouselFigure } from './ArticleCarouselFigure';
import { ArticleComparisonPanel } from './ArticleComparisonPanel';
import { ArticleComparisonTable } from './ArticleComparisonTable';
import { ArticleProcessDiagram } from './ArticleProcessDiagram';
import { ArticleProjectCharterFigure } from './ArticleProjectCharterFigure';
import { ArticlePullQuote } from './ArticlePullQuote';
import { ArticleStatSpotlight } from './ArticleStatSpotlight';
import { ArticleStepsOverview } from './ArticleStepsOverview';
import { ArticleTeamEvaluationFigure } from './ArticleTeamEvaluationFigure';

interface ReferenceArticlePageProps {
  post: ReferencePost;
  likeCount: number;
  isLiked: boolean;
  comments: ReferenceComment[];
  commentCount: number;
  focusCommentsOnMount: boolean;
  onBack: () => void;
  onToggleLike: () => void;
  onSubmitComment: (authorName: string, text: string) => boolean;
}

export function ReferenceArticlePage({
  post,
  likeCount,
  isLiked,
  comments,
  commentCount,
  focusCommentsOnMount,
  onBack,
  onToggleLike,
  onSubmitComment,
}: ReferenceArticlePageProps) {
  const [authorInput, setAuthorInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);

  const layoutVariant = post.layoutVariant ?? 'default';
  const isMagazine =
    layoutVariant === 'magazine-dropcap' || layoutVariant === 'magazine-dossier';

  const bodySegments = useMemo(
    () => groupArticleBodySegments(post.bodyParagraphs, isMagazine),
    [post.bodyParagraphs, isMagazine]
  );

  useEffect(() => {
    setCommentInput('');
    setCommentError(null);
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
      authorInputRef.current?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [post.id, focusCommentsOnMount]);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateArticleCommentInput(
      authorInput,
      commentInput
    );
    if (validationError) {
      setCommentError(validationError);
      return;
    }
    const added = onSubmitComment(authorInput, commentInput);
    if (added) {
      setCommentInput('');
      setCommentError(null);
    }
  }

  const isHeroImageInBody = useMemo(() => {
    return post.bodyParagraphs.some((b) => {
      if (typeof b === 'string') return false;
      if (b.type === 'figure' && b.src === post.imageSrc) return true;
      if (
        b.type === 'carousel' &&
        b.slides.some((s) => s.src === post.imageSrc)
      ) {
        return true;
      }
      return false;
    });
  }, [post.bodyParagraphs, post.imageSrc]);

  const shouldRenderHeroImage = !isHeroImageInBody;
  const renderedImages = new Set<string>();
  if (shouldRenderHeroImage) {
    renderedImages.add(post.imageSrc);
  }

  function renderSingleBlock(block: ArticleContentBlock, idx: number) {
    if (typeof block !== 'string') {
      if (block.type === 'pullQuote') {
        return <ArticlePullQuote key={idx} block={block} />;
      }
      if (block.type === 'processDiagram') {
        return <ArticleProcessDiagram key={idx} block={block} />;
      }
      if (block.type === 'statSpotlight') {
        return <ArticleStatSpotlight key={idx} block={block} />;
      }
      if (block.type === 'comparison') {
        return <ArticleComparisonPanel key={idx} block={block} />;
      }
      if (block.type === 'carousel') {
        const uniqueSlides = block.slides.filter((slide) => {
          if (renderedImages.has(slide.src)) {
            return false;
          }
          renderedImages.add(slide.src);
          return true;
        });
        if (uniqueSlides.length === 0) {
          return null;
        }
        const cleanBlock =
          uniqueSlides.length === block.slides.length
            ? block
            : { ...block, slides: uniqueSlides };
        return (
          <ArticleCarouselFigure
            key={idx}
            block={cleanBlock}
            postId={post.id}
          />
        );
      }
      if (block.type === 'chart') {
        return <ArticleBarChartFigure key={idx} block={block} />;
      }
      if (block.type === 'steps') {
        return <ArticleStepsOverview key={idx} block={block} />;
      }
      if (block.type === 'charter') {
        return <ArticleProjectCharterFigure key={idx} block={block} />;
      }
      if (block.type === 'evaluation') {
        return <ArticleTeamEvaluationFigure key={idx} block={block} />;
      }
      if (block.type === 'table') {
        return <ArticleComparisonTable key={idx} block={block} />;
      }
      if (block.type === 'formula') {
        return (
          <div
            key={idx}
            className="my-5 overflow-x-auto border border-slate-200 bg-slate-50 px-4 py-3 text-center font-mono text-sm font-semibold tracking-wide text-slate-900 sm:text-base"
          >
            {block.expression}
          </div>
        );
      }
      if (block.type === 'step-heading') {
        return (
          <div
            key={idx}
            className="mt-6 flex items-baseline gap-3 pt-1"
          >
            <span className="shrink-0 text-sm font-bold tabular-nums text-blue-700">
              Bước {block.number}
            </span>
            <h3 className="text-base font-semibold leading-snug text-slate-900">
              {block.title}
            </h3>
          </div>
        );
      }
      if (block.type === 'figure') {
        if (renderedImages.has(block.src)) {
          return null;
        }
        renderedImages.add(block.src);
        const isContain = block.fit === 'contain';
        return (
          <figure key={idx} className="my-6">
            <div
              className={
                isContain
                  ? 'overflow-hidden border border-slate-200 bg-white'
                  : 'overflow-hidden bg-slate-100'
              }
            >
              <img
                src={block.src}
                alt={block.alt}
                referrerPolicy="no-referrer"
                className={
                  isContain
                    ? 'max-h-[480px] w-full object-contain'
                    : 'aspect-[16/10] w-full object-cover'
                }
              />
            </div>
            <figcaption className="mt-2 text-center text-xs italic text-slate-500">
              {block.caption}
            </figcaption>
          </figure>
        );
      }
      return null;
    }

    if (block === '---') {
      return (
        <hr
          key={idx}
          aria-hidden="true"
          className={
            isMagazine
              ? 'my-7 border-t border-slate-200'
              : 'mx-auto my-6 w-12 border-t border-slate-200'
          }
        />
      );
    }

    if (block.startsWith('### ')) {
      if (layoutVariant === 'magazine-dossier') {
        return (
          <div key={idx} className="pt-5">
            <span className="inline-block bg-slate-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              Chuyên mục phân tích
            </span>
            <h2 className="mt-2.5 font-['Playfair_Display',Georgia,serif] text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              {block.slice(4)}
            </h2>
          </div>
        );
      }
      if (layoutVariant === 'magazine-dropcap') {
        return (
          <h2
            key={idx}
            className="border-t border-slate-900 pt-4 font-['Playfair_Display',Georgia,serif] text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl"
          >
            {block.slice(4)}
          </h2>
        );
      }
      return (
        <h2
          key={idx}
          className="pt-4 text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl"
        >
          {block.slice(4)}
        </h2>
      );
    }

    if (block.startsWith('> ')) {
      return (
        <blockquote
          key={idx}
          className="whitespace-pre-line border-y border-slate-200 bg-slate-50/70 px-5 py-4 font-['Playfair_Display',Georgia,serif] text-lg italic leading-relaxed text-slate-800"
        >
          {block.slice(2)}
        </blockquote>
      );
    }

    return <p key={idx}>{block}</p>;
  }

  const metadataRow = (
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
  );

  const heroImage = (
    <div
      className={`mt-6 overflow-hidden ${
        post.imageFit === 'contain'
          ? 'border border-slate-200 bg-white'
          : 'bg-slate-100'
      }`}
    >
      <img
        src={post.imageSrc}
        alt={post.imageAlt}
        referrerPolicy="no-referrer"
        className={`aspect-[16/9] w-full ${
          post.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'
        }`}
      />
    </div>
  );

  return (
    <article
      aria-labelledby="reference-article-title"
      data-layout={layoutVariant}
      className={`mx-auto min-h-[calc(100svh_-_3.5rem)] w-full px-4 py-8 sm:px-8 sm:py-10 ${
        isMagazine ? 'max-w-4xl' : 'max-w-3xl'
      }`}
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

      {layoutVariant === 'magazine-dossier' ? (
        <header className="border-b-2 border-slate-900 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {post.detailCategory ?? post.category}
            </span>
            <span className="bg-slate-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              {post.editorialBadge ?? 'Hồ sơ chuyên đề'}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 items-stretch gap-5 md:grid-cols-12 md:gap-7">
            <div className="flex items-center border-2 border-slate-900 bg-white p-5 sm:p-6 md:col-span-7">
              <h1
                id="reference-article-title"
                className="text-balance font-['Playfair_Display',Georgia,serif] text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl"
              >
                {post.title}
              </h1>
            </div>
            <div className="flex flex-col justify-center border-t border-slate-200 pt-4 md:col-span-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div className="inline-block self-start bg-slate-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-yellow-300">
                {post.dossierSummary?.label ?? 'Tóm lược trọng tâm'}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                {post.dossierSummary?.text ?? post.sapo}
              </p>
            </div>
          </div>

          {post.dossierSummary ? (
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {post.sapo}
            </p>
          ) : null}

          {metadataRow}
          {shouldRenderHeroImage ? heroImage : null}
        </header>
      ) : layoutVariant === 'magazine-dropcap' ? (
        <header>
          <div className="flex items-center justify-between gap-4 border-t-4 border-slate-900 pt-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {post.detailCategory ?? post.category}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-700">
              {post.editorialBadge ?? 'Tạp chí chuyên sâu'}
            </span>
          </div>

          <h1
            id="reference-article-title"
            className="mt-3 text-balance font-['Playfair_Display',Georgia,serif] text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
          >
            {post.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {post.sapo}
          </p>

          {metadataRow}
          {shouldRenderHeroImage ? heroImage : null}
        </header>
      ) : (
        <header>
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

          {metadataRow}
          {shouldRenderHeroImage ? heroImage : null}
        </header>
      )}

      <div className="mt-7 space-y-5 text-base leading-relaxed text-slate-700">
        {bodySegments.map((segment) => {
          if (segment.kind === 'block') {
            return renderSingleBlock(segment.block, segment.index);
          }

          const containerClasses = segment.useTwoColumns
            ? 'space-y-4 md:columns-2 md:gap-8 md:space-y-0 md:[&_p+p]:mt-4'
            : 'space-y-4';

          return (
            <div key={`prose-${segment.startIndex}`} className={containerClasses}>
              {segment.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={`${segment.startIndex}-${pIdx}`}
                  className={
                    segment.hasDropCap && pIdx === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-['Playfair_Display',Georgia,serif] first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.82] first-letter:text-slate-900"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          );
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

      {/* Comments Section (Name + Comment without login) */}
      <div
        ref={commentSectionRef}
        className="mt-8 border-t border-slate-200 pt-6"
      >
        <h2 className="text-base font-semibold text-slate-900">
          Bình luận ({commentCount})
        </h2>

        <form
          noValidate
          onSubmit={handleFormSubmit}
          className="mt-4 space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
        >
          <div>
            <label
              htmlFor="article-comment-author"
              className="block text-sm font-medium text-slate-800"
            >
              Tên{' '}
              <span className="text-rose-600" aria-hidden="true">
                *
              </span>
            </label>
            <input
              ref={authorInputRef}
              id="article-comment-author"
              name="authorName"
              type="text"
              required
              value={authorInput}
              onChange={(event) => {
                setAuthorInput(event.target.value);
                if (commentError) {
                  setCommentError(null);
                }
              }}
              placeholder="Nhập tên của bạn"
              className="mt-1.5 block w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="article-comment-body"
              className="block text-sm font-medium text-slate-800"
            >
              Bình luận{' '}
              <span className="text-rose-600" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="article-comment-body"
              name="commentBody"
              rows={4}
              required
              value={commentInput}
              onChange={(event) => {
                setCommentInput(event.target.value);
                if (commentError) {
                  setCommentError(null);
                }
              }}
              placeholder="Chia sẻ cảm nhận hoặc góp ý của bạn về bài viết..."
              className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {commentError ? (
            <p role="alert" className="text-xs font-medium text-rose-600">
              {commentError}
            </p>
          ) : null}

          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Gửi bình luận
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3.5">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận.
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-slate-100 bg-white px-4 py-3 text-sm"
              >
                <span className="font-semibold text-slate-900">
                  {comment.authorName}
                </span>
                <p className="mt-1 whitespace-pre-line text-slate-700">
                  {comment.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
