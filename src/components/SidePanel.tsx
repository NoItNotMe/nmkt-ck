import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidePanel({ isOpen, onClose }: SidePanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/20 transition-opacity duration-200"
      />

      <aside
        id="side-panel-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu bên"
        className="relative z-10 flex h-full w-72 max-w-[82vw] flex-col border-r border-slate-200 bg-white shadow-sm"
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-3">
          <span className="text-sm font-semibold text-slate-900">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Đóng menu bên"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {/* Intentionally left blank for future menu items */}
        <div className="flex-1 overflow-y-auto p-4" />
      </aside>
    </div>
  );
}
