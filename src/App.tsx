/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './components/HomePage';
import { SidePanel } from './components/SidePanel';
import { TopBar } from './components/TopBar';
import {
  clearStoredUser,
  loadStoredUser,
  type AuthMode,
  type UserAccount,
} from './utils/auth';
import {
  getNavItemById,
  parseSectionFromHash,
  type NavSection,
} from './utils/navigation';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>(() =>
    typeof window !== 'undefined'
      ? parseSectionFromHash(window.location.hash)
      : 'home'
  );
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(() =>
    typeof window !== 'undefined' ? loadStoredUser(window.localStorage) : null
  );
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: AuthMode;
  }>({
    isOpen: false,
    mode: 'login',
  });

  useEffect(() => {
    function handleHashChange() {
      setActiveSection(parseSectionFromHash(window.location.hash));
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function handleSelectSection(section: NavSection) {
    setActiveSection(section);
    const targetHash = getNavItemById(section).hash;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function handleOpenAuthModal(mode: AuthMode) {
    setAuthModalState({ isOpen: true, mode });
  }

  function handleAuthSuccess(loggedInUser: UserAccount) {
    setUser(loggedInUser);
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  }

  function handleSignOut() {
    clearStoredUser(window.localStorage);
    setUser(null);
  }

  const currentItem = getNavItemById(activeSection);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopBar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        isSidePanelOpen={isSidePanelOpen}
        onOpenSidePanel={() => setIsSidePanelOpen(true)}
        user={user}
        onOpenAuthModal={handleOpenAuthModal}
        onSignOut={handleSignOut}
      />

      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
      />

      <main
        aria-label={currentItem.label}
        data-active-section={activeSection}
        className="w-full"
      >
        {activeSection === 'home' ? (
          <HomePage />
        ) : (
          <div className="mx-auto min-h-[calc(100vh_-_3.5rem)] w-full max-w-6xl px-4 py-8 sm:px-6">
            <h1 className="sr-only">{currentItem.label}</h1>
          </div>
        )}
      </main>

      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState((prev) => ({ ...prev, isOpen: false }))}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
