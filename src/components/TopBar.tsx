import { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, Menu } from 'lucide-react';
import { getUserInitials, type AuthMode, type UserAccount } from '../utils/auth';
import { NAV_ITEMS, type NavSection } from '../utils/navigation';

interface TopBarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isSidePanelOpen: boolean;
  onOpenSidePanel: () => void;
  user: UserAccount | null;
  onOpenAuthModal: (mode: AuthMode) => void;
  onSignOut: () => void;
}

export function TopBar({
  activeSection,
  onSelectSection,
  isSidePanelOpen,
  onOpenSidePanel,
  user,
  onOpenAuthModal,
  onSignOut,
}: TopBarProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const rightActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        rightActionsRef.current &&
        !rightActionsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
        setIsAccountMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsNotificationsOpen(false);
        setIsAccountMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 h-14 w-full border-b border-slate-300/80 bg-slate-100/95 shadow-[0_1px_2px_rgba(15,23,42,0.05)] backdrop-blur-sm">
      <div className="grid h-full w-full grid-cols-[auto_1fr_auto] items-center pl-1 pr-2 sm:grid-cols-[1fr_auto_1fr] sm:pl-2 sm:pr-5">
        {/* Left zone: flush-left 3-bar menu trigger */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={onOpenSidePanel}
            aria-label="Mở menu bên"
            aria-expanded={isSidePanelOpen}
            aria-controls="side-panel-menu"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-200/80 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {/* Center zone: Trang chủ, Nhóm, Tham khảo with rounded frame for active page */}
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
                className={`inline-flex h-8 shrink-0 items-center rounded-full px-2 text-[11px] font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 sm:h-9 sm:px-4 sm:text-sm ${
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

        {/* Right zone: Avatar + Notification Bell OR framed Sign In / Sign Up */}
        <div
          ref={rightActionsRef}
          className="relative flex items-center justify-end gap-1 sm:gap-2"
        >
          {user ? (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsNotificationsOpen((prev) => !prev);
                    setIsAccountMenuOpen(false);
                  }}
                  aria-label="Thông báo"
                  aria-expanded={isNotificationsOpen}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-200/80 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <Bell className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </button>

                {isNotificationsOpen && (
                  <div
                    role="region"
                    aria-label="Danh sách thông báo"
                    className="absolute right-0 top-full z-40 mt-3 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm font-semibold text-slate-900">
                        Thông báo
                      </span>
                    </div>
                    <p className="py-6 text-center text-xs text-slate-500">
                      Chưa có thông báo nào.
                    </p>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountMenuOpen((prev) => !prev);
                    setIsNotificationsOpen(false);
                  }}
                  aria-label={`Tài khoản ${user.name}`}
                  aria-expanded={isAccountMenuOpen}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  {getUserInitials(user.name)}
                </button>

                {isAccountMenuOpen && (
                  <div
                    role="menu"
                    aria-label="Menu tài khoản"
                    className="absolute right-0 top-full z-40 mt-3 w-60 rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
                  >
                    <div className="border-b border-slate-100 px-3 py-2.5">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                    <div className="pt-1.5">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          onSignOut();
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                      >
                        <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="whitespace-nowrap">Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => onOpenAuthModal('login')}
                className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-slate-300/90 bg-slate-200/80 px-2 text-[11px] font-medium whitespace-nowrap text-slate-800 transition-colors hover:bg-slate-200 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 sm:h-9 sm:px-3.5 sm:text-sm"
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => onOpenAuthModal('register')}
                className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-slate-900 bg-slate-900 px-2 text-[11px] font-medium whitespace-nowrap text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:h-9 sm:px-4 sm:text-sm"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
