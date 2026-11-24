/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './components/HomePage';
import { ReferencePage } from './components/ReferencePage';
import { TopBar } from './components/TopBar';
import {
  clearStoredUser,
  loadStoredUser,
  type AuthMode,
  type UserAccount,
} from './utils/auth';
import {
  buildReferenceChapterHash,
  buildReferencePostHash,
  canNavigateBack,
  getNavItemById,
  normalizeAppHash,
  parseReferenceChapterFromHash,
  parseReferencePostIdFromHash,
  parseSectionFromHash,
  pushRouteHistory,
  resolvePreviousRoute,
  syncRouteHistoryOnExternalNavigation,
  type NavSection,
} from './utils/navigation';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>(() =>
    typeof window !== 'undefined'
      ? parseSectionFromHash(window.location.hash)
      : 'home'
  );
  const [selectedReferencePostId, setSelectedReferencePostId] = useState<
    string | null
  >(() =>
    typeof window !== 'undefined'
      ? parseReferencePostIdFromHash(window.location.hash)
      : null
  );
  const [selectedReferenceChapter, setSelectedReferenceChapter] = useState<
    number | null
  >(() =>
    typeof window !== 'undefined'
      ? parseReferenceChapterFromHash(window.location.hash)
      : null
  );
  const [routeHistory, setRouteHistory] = useState<string[]>(() =>
    typeof window !== 'undefined'
      ? [normalizeAppHash(window.location.hash)]
      : ['#trang-chu']
  );
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

  function applyHashState(targetHash: string) {
    setActiveSection(parseSectionFromHash(targetHash));
    setSelectedReferencePostId(parseReferencePostIdFromHash(targetHash));
    setSelectedReferenceChapter(parseReferenceChapterFromHash(targetHash));
  }

  useEffect(() => {
    function syncFromLocationHash() {
      const currentHash = window.location.hash;
      applyHashState(currentHash);
      setRouteHistory((prev) =>
        syncRouteHistoryOnExternalNavigation(prev, currentHash)
      );
    }

    window.addEventListener('hashchange', syncFromLocationHash);
    window.addEventListener('popstate', syncFromLocationHash);
    return () => {
      window.removeEventListener('hashchange', syncFromLocationHash);
      window.removeEventListener('popstate', syncFromLocationHash);
    };
  }, []);

  function navigateToHash(targetHash: string) {
    applyHashState(targetHash);
    setRouteHistory((prev) => pushRouteHistory(prev, targetHash));
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function handleSelectSection(section: NavSection) {
    navigateToHash(getNavItemById(section).hash);
  }

  function handleOpenReferencePost(postId: string) {
    navigateToHash(buildReferencePostHash(postId));
  }

  function handleOpenReferenceChapter(chapterNumber: number) {
    navigateToHash(buildReferenceChapterHash(chapterNumber));
  }

  function handleBackToReferenceList() {
    navigateToHash(getNavItemById('reference').hash);
  }

  function handleGoBack() {
    const { nextStack, targetHash } = resolvePreviousRoute(routeHistory);
    if (!targetHash) {
      return;
    }
    setRouteHistory(nextStack);
    applyHashState(targetHash);
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
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
  const currentHash =
    typeof window !== 'undefined' ? window.location.hash : '#trang-chu';
  const canGoBack = canNavigateBack(routeHistory, currentHash);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopBar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        canGoBack={canGoBack}
        onGoBack={handleGoBack}
        user={user}
        onOpenAuthModal={handleOpenAuthModal}
        onSignOut={handleSignOut}
      />

      <main
        aria-label={currentItem.label}
        data-active-section={activeSection}
        className="w-full"
      >
        {activeSection === 'home' ? (
          <HomePage hasOpenOverlay={authModalState.isOpen} />
        ) : activeSection === 'reference' ? (
          <ReferencePage
            user={user}
            selectedPostId={selectedReferencePostId}
            selectedChapter={selectedReferenceChapter}
            onOpenPost={handleOpenReferencePost}
            onOpenChapter={handleOpenReferenceChapter}
            onBackToList={handleBackToReferenceList}
            onRequireAuth={() => handleOpenAuthModal('login')}
          />
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
