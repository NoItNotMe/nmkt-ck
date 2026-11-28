/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { GroupPage } from './components/GroupPage';
import { HomePage } from './components/HomePage';
import { ReferencePage } from './components/ReferencePage';
import { TopBar } from './components/TopBar';
import {
  buildGroupSubpageHash,
  buildHomeAnchorHash,
  buildReferenceChapterHash,
  buildReferencePostHash,
  canNavigateBack,
  getNavItemById,
  normalizeAppHash,
  parseGroupSubpageFromHash,
  parseHomeAnchorFromHash,
  parseReferenceChapterFromHash,
  parseReferencePostIdFromHash,
  parseSectionFromHash,
  pushRouteHistory,
  resolvePreviousRoute,
  syncRouteHistoryOnExternalNavigation,
  type NavSection,
} from './utils/navigation';
import {
  getSubsectionByAnchor,
  MAJOR_KEY_TO_HOME_ANCHOR,
} from './utils/homeSections';
import { PLACEHOLDER_ITEMS } from './utils/groupData';
import type { MajorKey } from './utils/quizData';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>(() =>
    typeof window !== 'undefined'
      ? parseSectionFromHash(window.location.hash)
      : 'home'
  );
  const [selectedHomeAnchor, setSelectedHomeAnchor] = useState<string | null>(
    () =>
      typeof window !== 'undefined'
        ? parseHomeAnchorFromHash(window.location.hash)
        : null
  );
  const [selectedGroupSubpage, setSelectedGroupSubpage] = useState<
    string | null
  >(() =>
    typeof window !== 'undefined'
      ? parseGroupSubpageFromHash(window.location.hash)
      : null
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

  function applyHashState(targetHash: string) {
    setActiveSection(parseSectionFromHash(targetHash));
    setSelectedHomeAnchor(parseHomeAnchorFromHash(targetHash));
    setSelectedReferencePostId(parseReferencePostIdFromHash(targetHash));
    setSelectedReferenceChapter(parseReferenceChapterFromHash(targetHash));
    setSelectedGroupSubpage(parseGroupSubpageFromHash(targetHash));
  }

  useEffect(() => {
    if (activeSection === 'groups' && selectedGroupSubpage === 'muc-1') {
      document.title = 'Định hướng ngành · Khám phá thiên hướng kỹ thuật';
    } else if (activeSection === 'groups' && selectedGroupSubpage === 'muc-2') {
      document.title = 'Chọn phương án thiết kế · Chương 2: Thiết kế kỹ thuật';
    } else if (activeSection === 'groups' && selectedGroupSubpage === 'muc-3') {
      document.title =
        'Một ngày của bạn · Chương 3: Quản lý thời gian hiệu quả';
    } else if (activeSection === 'groups' && selectedGroupSubpage === 'muc-4') {
      document.title = 'Lập biểu đồ Gantt · Chương 4: Quản lý dự án';
    } else if (activeSection === 'groups' && selectedGroupSubpage === 'muc-5') {
      document.title = 'Hỗ trợ phân công · Chương 5: Kỹ năng làm việc nhóm';
    } else if (activeSection === 'groups' && selectedGroupSubpage === 'muc-8') {
      document.title = 'Chữa slide · Chương 8: Giao tiếp trong kỹ thuật';
    } else if (activeSection === 'groups' && selectedGroupSubpage) {
      const currentItem = PLACEHOLDER_ITEMS.find(
        (item) => item.id === selectedGroupSubpage
      );
      document.title = currentItem
        ? `${currentItem.title} · ${currentItem.subtitle ?? 'Công cụ'}`
        : 'Công cụ · Trang web cá nhân';
    } else if (activeSection === 'groups') {
      document.title = 'Công cụ · Trang web cá nhân';
    } else if (activeSection === 'reference') {
      document.title = 'Tham khảo · Trang web cá nhân';
    } else {
      document.title = 'Trang web cá nhân';
    }
  }, [activeSection, selectedGroupSubpage]);

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
    if (!parseHomeAnchorFromHash(targetHash)) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
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

  function handleOpenGroupSubpage(subpageId: string) {
    navigateToHash(buildGroupSubpageHash(subpageId));
  }

  function handleBackToGroupList() {
    navigateToHash(getNavItemById('groups').hash);
  }

  function handleOpenHomeMajor(majorKey: MajorKey) {
    const anchor = MAJOR_KEY_TO_HOME_ANCHOR[majorKey];
    navigateToHash(buildHomeAnchorHash(anchor));
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
    if (!parseHomeAnchorFromHash(targetHash)) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  const currentItem = getNavItemById(activeSection);
  const currentHash =
    typeof window !== 'undefined' ? window.location.hash : '#trang-chu';
  const canGoBack = canNavigateBack(routeHistory, currentHash);
  const targetSpecializationId =
    getSubsectionByAnchor(selectedHomeAnchor)?.id ?? null;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopBar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        canGoBack={canGoBack}
        onGoBack={handleGoBack}
      />

      <main
        aria-label={currentItem.label}
        data-active-section={activeSection}
        className="w-full"
      >
        {activeSection === 'home' ? (
          <HomePage targetSpecializationId={targetSpecializationId} />
        ) : activeSection === 'reference' ? (
          <ReferencePage
            selectedPostId={selectedReferencePostId}
            selectedChapter={selectedReferenceChapter}
            onOpenPost={handleOpenReferencePost}
            onOpenChapter={handleOpenReferenceChapter}
            onBackToList={handleBackToReferenceList}
          />
        ) : (
          <GroupPage
            selectedSubpage={selectedGroupSubpage}
            onOpenSubpage={handleOpenGroupSubpage}
            onBackToList={handleBackToGroupList}
            onOpenHomeMajor={handleOpenHomeMajor}
          />
        )}
      </main>
    </div>
  );
}
