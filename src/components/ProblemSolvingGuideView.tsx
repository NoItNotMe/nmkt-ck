import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  Copy,
  ExternalLink,
  Layers,
  Maximize2,
  X,
} from 'lucide-react';
import {
  AI_ASSISTANTS,
  PROBLEM_SOLVING_DIAGRAMS,
  SUGGESTED_PROMPTS,
  type ProblemSolvingDiagram,
} from '../utils/problemSolvingGuide';
import { buildReferenceChapterHash, buildReferencePostHash } from '../utils/navigation';
import { getReferencePostsByChapter } from '../utils/referencePosts';

export function ProblemSolvingGuideView() {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [previewDiagram, setPreviewDiagram] =
    useState<ProblemSolvingDiagram | null>(null);

  const chapter6Posts = getReferencePostsByChapter(6);

  async function handleCopyPrompt(id: string, text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedPromptId(id);
        window.setTimeout(() => {
          setCopiedPromptId((prev) => (prev === id ? null : prev));
        }, 1800);
      }
    } catch {
      // ignore clipboard failures
    }
  }

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <header className="border-b border-slate-200 pb-6 sm:pb-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="font-semibold text-blue-700">
            Chương 6: Kỹ năng giải quyết vấn đề
          </span>
          <span aria-hidden="true">·</span>
          <span>Hướng dẫn giải quyết vấn đề</span>
        </div>

        <h1 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Hướng dẫn giải quyết vấn đề
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Tổng hợp các mô hình tư duy trực quan (5W1H, SCAMPER, Sáu chiếc mũ tư
          duy, Ishikawa), liên kết hỏi đáp cùng các trợ lý AI và tài liệu đọc
          chuyên sâu giúp làm rõ bài toán và chọn phương án tối ưu.
        </p>
      </header>

      <div className="mt-8 space-y-12">
        {/* Section 1: Visual Framework Diagrams (User Uploaded Images) */}
        <section aria-labelledby="frameworks-heading">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Layers className="h-4 w-4" aria-hidden="true" />
            <span>Khung phương pháp</span>
          </div>
          <h2
            id="frameworks-heading"
            className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
          >
            Các mô hình trực quan
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Bốn khung tư duy tiêu chuẩn giúp xác định bản chất sự việc, phân rã
            nguyên nhân và mở rộng giải pháp. Bấm vào ảnh để xem chi tiết.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PROBLEM_SOLVING_DIAGRAMS.map((diagram) => (
              <div
                key={diagram.id}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setPreviewDiagram(diagram)}
                  aria-label={`Xem ảnh lớn: ${diagram.title}`}
                  className="group relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <img
                    src={diagram.src}
                    alt={diagram.alt}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md border border-slate-200/80 bg-white/95 px-2 py-1 text-[11px] font-medium text-slate-700 shadow-xs opacity-90 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" />
                    <span>Phóng to</span>
                  </span>
                </button>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <span className="text-xs font-semibold text-blue-700">
                      {diagram.subtitle}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      {diagram.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {diagram.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Read More (Links to Articles) */}
        <section aria-labelledby="read-more-heading">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>Tài liệu chuyên sâu</span>
          </div>
          <h2
            id="read-more-heading"
            className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
          >
            Đọc thêm các bài báo liên quan
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Các bài viết chuyên đề thuộc Chương 6 trong mục Tham khảo phân tích
            chi tiết lý thuyết và các tình huống áp dụng thực tế.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {chapter6Posts.map((post) => (
              <a
                key={post.id}
                href={buildReferencePostHash(post.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-slate-900 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 sm:text-base">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {post.sapo}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-700 transition-transform group-hover:translate-x-0.5">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href={buildReferenceChapterHash(6)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <span>Xem toàn bộ chuyên đề Chương 6 trong Tham khảo</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Section 3: Ask AI (3 Boxes at bottom) */}
        <section aria-labelledby="ai-assistants-heading">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Bot className="h-4 w-4" aria-hidden="true" />
            <span>Trợ lý AI hỗ trợ</span>
          </div>
          <h2
            id="ai-assistants-heading"
            className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
          >
            Hỏi AI hỗ trợ tư duy
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Mở nhanh các mô hình trí tuệ nhân tạo để trao đổi ý tưởng, kiểm tra
            lập luận phản biện hoặc phân tích nguyên nhân lỗi kỹ thuật.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {AI_ASSISTANTS.map((assistant) => (
              <div
                key={assistant.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <img
                      src={assistant.logoSrc}
                      alt={`Logo ${assistant.name}`}
                      className="h-10 w-10 shrink-0 rounded-lg border border-slate-100 bg-slate-50 object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-base font-bold text-slate-900">
                          {assistant.name}
                        </span>
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-500">
                          {assistant.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">
                        Phát triển bởi {assistant.provider}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3">
                  <a
                    href={assistant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    <span>Mở {assistant.name}</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Templates to copy */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-700">
              Gợi ý mẫu câu hỏi cho AI khi phân tích kỹ thuật
            </p>
            <div className="mt-3 space-y-2.5">
              {SUGGESTED_PROMPTS.map((item) => {
                const isCopied = copiedPromptId === item.id;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-slate-900">
                        {item.label}
                      </span>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                        {item.prompt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(item.id, item.prompt)}
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">
                            Đã chép
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-500" />
                          <span>Sao chép câu hỏi</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal for Diagram Preview */}
      {previewDiagram ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewDiagram.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 sm:p-6"
          onClick={() => setPreviewDiagram(null)}
        >
          <div
            className="relative flex max-h-[92vh] max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                  {previewDiagram.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {previewDiagram.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDiagram(null)}
                aria-label="Đóng xem ảnh"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-auto bg-slate-50 p-4 sm:p-6">
              <img
                src={previewDiagram.src}
                alt={previewDiagram.alt}
                className="max-h-[72vh] max-w-full object-contain"
              />
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-3">
              <p className="text-xs text-slate-600">
                {previewDiagram.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
