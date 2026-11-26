import { ArrowLeft } from 'lucide-react';
import { NAV_ITEMS, type NavSection } from '../utils/navigation';

interface TopBarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  canGoBack: boolean;
  onGoBack: () => void;
}

export function TopBar({
  activeSection,
  onSelectSection,
  canGoBack,
  onGoBack,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 h-14 w-full border-b border-slate-300/80 bg-slate-100/95 shadow-[0_1px_2px_rgba(15,23,42,0.05)] backdrop-blur-sm">
      <div className="grid h-full w-full grid-cols-[auto_1fr_auto] items-center pl-1 pr-2 sm:grid-cols-[1fr_auto_1fr] sm:pl-2 sm:pr-5">
        {/* Left zone: flush-left back navigation button */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={onGoBack}
            disabled={!canGoBack}
            aria-label="Quay lại trang trước"
            title="Quay lại trang trước"
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
              canGoBack
                ? 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-950'
                : 'cursor-default text-slate-300'
            }`}
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {/* Center zone: Trang chủ, Công cụ, Tham khảo with rounded frame for active page */}
        <nav
          aria-label="Điều hướng chính"
          className="flex items-center justify-center gap-0.5 sm:gap-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.hash}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onSelectSection(item.id);
                }}
                className={`inline-flex h-8 shrink-0 items-center rounded-full px-2.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 sm:h-9 sm:px-4 sm:text-sm ${
                  isActive
                    ? 'border border-slate-300 bg-white font-semibold text-slate-950 shadow-xs'
                    : 'border border-transparent text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right spacer to keep center navigation balanced */}
        <div aria-hidden="true" className="w-10 sm:w-auto" />
      </div>
    </header>
  );
}
