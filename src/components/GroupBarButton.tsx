import { ChevronRight } from 'lucide-react';

interface GroupBarButtonProps {
  title: string;
  subtitle?: string;
  badge?: string;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export function GroupBarButton({
  title,
  subtitle,
  badge,
  onClick,
  className = '',
  ariaLabel,
}: GroupBarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? title}
      className={`group relative flex w-full items-center justify-between gap-4 rounded-full border-2 border-slate-900 bg-white px-5 py-3.5 sm:px-8 sm:py-4.5 text-left transition-all duration-200 hover:bg-slate-50 hover:border-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 active:scale-[0.99] ${className}`}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-2 sm:gap-3">
        <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
          {title}
        </span>
        {subtitle && (
          <span className="text-xs sm:text-sm font-normal text-slate-500 transition-colors group-hover:text-slate-700">
            · {subtitle}
          </span>
        )}
        {badge && (
          <span className="text-xs font-normal text-slate-500 whitespace-nowrap">
            · {badge}
          </span>
        )}
      </div>

      <div
        className="flex shrink-0 items-center justify-center pl-2 text-slate-900 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-700"
        aria-hidden="true"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.25]" />
      </div>
    </button>
  );
}
