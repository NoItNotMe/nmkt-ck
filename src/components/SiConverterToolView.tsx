import { useEffect, useId, useRef, useState } from 'react';

import { evaluateSiInput, SI_EXAMPLES } from '../utils/siConverter';

interface SiConverterToolViewProps {
  onBackToList?: () => void;
}

export function SiConverterToolView({
  onBackToList,
}: SiConverterToolViewProps) {
  const [query, setQuery] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const inputId = useId();

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const result = evaluateSiInput(query);

  async function handleCopy(text: string) {
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard unavailable');
      }
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopyStatus('idle');
      copyTimerRef.current = null;
    }, 1400);
  }

  function handleChipClick(example: string) {
    setQuery(example);
    setCopyStatus('idle');
    inputRef.current?.focus();
  }

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-[600px] px-6 pt-10 pb-14 sm:pt-14">


      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-x-2 text-xs font-medium text-slate-500">
          <span className="font-semibold text-blue-700">
            Chương 7: Cơ sở kỹ thuật
          </span>
          <span aria-hidden="true">·</span>
          <span>Hệ SI</span>
        </div>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Quy đổi đơn vị về hệ SI
        </h1>
      </header>

      <label htmlFor={inputId} className="sr-only">
        Nhập giá trị và đơn vị
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCopyStatus('idle');
        }}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="36 km/h"
        className="w-full rounded-none border-0 border-b-2 border-slate-200 bg-transparent pt-2 pb-3 font-mono text-[28px] font-medium leading-tight text-slate-900 placeholder:text-slate-300 focus:border-blue-700 focus:outline-none sm:text-[32px]"
      />

      <section aria-live="polite" className="min-h-[190px] pt-7">
        {result.kind === 'empty' && (
          <p className="text-base text-slate-500">
            Nhập một đại lượng, ví dụ{' '}
            <strong className="font-semibold text-slate-800">36 km/h</strong>,
            để xem giá trị theo đơn vị SI.
          </p>
        )}

        {result.kind === 'error' && (
          <p className="text-[15px] text-red-700">{result.message}</p>
        )}

        {result.kind === 'single' && (
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-0 break-words">
              <span className="font-mono text-[clamp(36px,9vw,54px)] font-light leading-[1.15] tracking-[-0.02em] text-slate-900">
                {result.num}
              </span>
              {result.unit && (
                <span className="font-mono text-[clamp(22px,5vw,28px)] font-normal leading-[1.2] text-blue-700">
                  {result.unit}
                </span>
              )}
            </div>

            {result.nameDesc && (
              <p className="mt-3.5 text-sm text-slate-500">
                {result.nameDesc}
                {result.baseUnitText && (
                  <>
                    {' '}
                    ·{' '}
                    <span className="font-mono text-slate-900">
                      {result.baseUnitText}
                    </span>
                  </>
                )}
              </p>
            )}

            {result.dimensionless && (
              <p className="mt-3.5 text-sm text-slate-500">
                Đại lượng không có thứ nguyên
              </p>
            )}

            {result.offsetFormula && (
              <p className="mt-3.5 text-sm text-slate-500">
                <span className="font-mono text-slate-900">
                  {result.offsetFormula}
                </span>
              </p>
            )}

            {result.unitReference && (
              <p className="mt-3.5 text-sm text-slate-500">
                1{' '}
                <span className="font-mono text-slate-900">
                  {result.unitReference.unitExpr}
                </span>{' '}
                ={' '}
                <span className="font-mono text-slate-900">
                  {result.unitReference.perOneText}
                </span>
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleCopy(result.copyText)}
              className="mt-4 rounded-md border border-slate-200 bg-transparent px-2.5 py-1 text-[13px] text-slate-500 transition-colors hover:border-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              {copyStatus === 'copied'
                ? 'Đã sao chép'
                : copyStatus === 'error'
                ? 'Không sao chép được'
                : 'Sao chép'}
            </button>
          </div>
        )}

        {result.kind === 'multi' && (
          <div>
            {result.rows.map((row, idx) => {
              const isLastNonTotal =
                !result.total && idx === result.rows.length - 1;
              return (
                <div
                  key={`${row.label}-${idx}`}
                  className={`flex flex-wrap items-baseline gap-x-3 gap-y-0 py-3 ${
                    isLastNonTotal ? '' : 'border-b border-slate-200'
                  }`}
                >
                  <span className="w-full text-[13px] text-slate-500">
                    {row.label}
                  </span>
                  <span className="font-mono text-[clamp(24px,6vw,32px)] font-light leading-[1.15] tracking-[-0.02em] text-slate-900">
                    {row.num}
                  </span>
                  {row.unit && (
                    <span className="font-mono text-[clamp(16px,4vw,20px)] font-normal leading-[1.2] text-blue-700">
                      {row.unit}
                    </span>
                  )}
                </div>
              );
            })}

            {result.total && (
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0 py-3">
                <span className="w-full text-[13px] font-medium text-blue-700">
                  {result.total.label}
                </span>
                <span className="font-mono text-[clamp(24px,6vw,32px)] font-light leading-[1.15] tracking-[-0.02em] text-slate-900">
                  {result.total.num}
                </span>
                {result.total.unit && (
                  <span className="font-mono text-[clamp(16px,4vw,20px)] font-normal leading-[1.2] text-blue-700">
                    {result.total.unit}
                  </span>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => void handleCopy(result.copyText)}
              className="mt-4 rounded-md border border-slate-200 bg-transparent px-2.5 py-1 text-[13px] text-slate-500 transition-colors hover:border-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              {copyStatus === 'copied'
                ? 'Đã sao chép'
                : copyStatus === 'error'
                ? 'Không sao chép được'
                : 'Sao chép'}
            </button>
          </div>
        )}
      </section>

      <div className="mt-9 flex flex-wrap gap-2">
        {SI_EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleChipClick(example)}
            className="rounded-md bg-slate-100 px-3 py-1.5 font-mono text-sm text-slate-900 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            {example}
          </button>
        ))}
      </div>

      <p className="mt-7 max-w-[60ch] text-[13px] leading-relaxed text-slate-500">
        Gõ số kèm đơn vị. Hiểu tiền tố (k, m, µ, n…), tích và thương (kg·m/s²,
        kg/m3), số mũ (m^2, m², s⁻¹), cùng đơn vị tiếng Việt (tạ, yến, giờ,
        phút, vòng/phút…). Dùng dấu phẩy hoặc dấu chấm làm dấu thập phân. Mọi
        đơn vị đứng sau dấu / đều nằm ở mẫu: C²/N·m² được hiểu là C²/(N·m²). Dấu
        *, · và × đều là dấu nhân, ví dụ 8,854*10^-12*C^2/N*m^2. Có thể nhập
        nhiều đại lượng cùng lúc, ví dụ 8 kg 3 km; nếu cùng loại (1 giờ 30 phút)
        app sẽ cộng thành tổng.
      </p>
    </div>
  );
}
