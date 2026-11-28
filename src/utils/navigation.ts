export type NavSection = 'home' | 'groups' | 'reference';

export interface NavItem {
  id: NavSection;
  label: string;
  hash: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Trang chủ', hash: '#trang-chu' },
  { id: 'groups', label: 'Công cụ', hash: '#nhom' },
  { id: 'reference', label: 'Tham khảo', hash: '#tham-khao' },
] as const;

export const HOME_HASH_PREFIX = '#trang-chu/';
export const REFERENCE_HASH_PREFIX = '#tham-khao/';
export const REFERENCE_CHAPTER_HASH_PREFIX = '#tham-khao/chuong/';
export const GROUPS_HASH_PREFIX = '#nhom/';

export function parseSectionFromHash(hash: string): NavSection {
  const normalized = hash.trim().toLowerCase();
  if (
    normalized === '#tham-khao' ||
    normalized.startsWith(REFERENCE_HASH_PREFIX)
  ) {
    return 'reference';
  }
  if (
    normalized === '#nhom' ||
    normalized.startsWith(GROUPS_HASH_PREFIX)
  ) {
    return 'groups';
  }
  if (
    normalized === '#trang-chu' ||
    normalized.startsWith(HOME_HASH_PREFIX)
  ) {
    return 'home';
  }
  const matched = NAV_ITEMS.find((item) => item.hash === normalized);
  return matched ? matched.id : 'home';
}

export function parseHomeAnchorFromHash(hash: string): string | null {
  const trimmed = hash.trim();
  const lower = trimmed.toLowerCase();
  if (!lower.startsWith(HOME_HASH_PREFIX)) {
    return null;
  }
  const anchor = trimmed.slice(HOME_HASH_PREFIX.length).trim();
  return anchor ? decodeURIComponent(anchor) : null;
}

export function buildHomeAnchorHash(anchor: string): string {
  return `${HOME_HASH_PREFIX}${encodeURIComponent(anchor)}`;
}

export function parseReferenceChapterFromHash(hash: string): number | null {
  const trimmed = hash.trim();
  const lower = trimmed.toLowerCase();
  if (!lower.startsWith(REFERENCE_CHAPTER_HASH_PREFIX)) {
    return null;
  }
  const raw = trimmed.slice(REFERENCE_CHAPTER_HASH_PREFIX.length).trim();
  const num = Number(raw);
  if (!Number.isInteger(num) || num < 1 || num > 9) {
    return null;
  }
  return num;
}

export function buildReferenceChapterHash(chapterNumber: number): string {
  return `${REFERENCE_CHAPTER_HASH_PREFIX}${chapterNumber}`;
}

export function parseReferencePostIdFromHash(hash: string): string | null {
  const trimmed = hash.trim();
  const lower = trimmed.toLowerCase();
  if (
    !lower.startsWith(REFERENCE_HASH_PREFIX) ||
    lower.startsWith(REFERENCE_CHAPTER_HASH_PREFIX)
  ) {
    return null;
  }
  const postId = trimmed.slice(REFERENCE_HASH_PREFIX.length).trim();
  return postId ? decodeURIComponent(postId) : null;
}

export function buildReferencePostHash(postId: string): string {
  return `${REFERENCE_HASH_PREFIX}${encodeURIComponent(postId)}`;
}

export function parseGroupSubpageFromHash(hash: string): string | null {
  const trimmed = hash.trim();
  const lower = trimmed.toLowerCase();
  if (!lower.startsWith(GROUPS_HASH_PREFIX)) {
    return null;
  }
  const raw = trimmed.slice(GROUPS_HASH_PREFIX.length).trim();
  if (!raw) {
    return null;
  }
  const decoded = raw
    .split('/')
    .map((segment) => decodeURIComponent(segment))
    .join('/');
  return decoded || null;
}

export function buildGroupSubpageHash(subpageId: string): string {
  const sanitized = subpageId
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${GROUPS_HASH_PREFIX}${sanitized}`;
}

export function getNavItemById(id: NavSection): NavItem {
  return NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0];
}

export function normalizeAppHash(hash: string): string {
  const trimmed = hash.trim();
  const postId = parseReferencePostIdFromHash(trimmed);
  if (postId) {
    return buildReferencePostHash(postId);
  }
  const chapter = parseReferenceChapterFromHash(trimmed);
  if (chapter !== null) {
    return buildReferenceChapterHash(chapter);
  }
  const groupSubpage = parseGroupSubpageFromHash(trimmed);
  if (groupSubpage) {
    return buildGroupSubpageHash(groupSubpage);
  }
  const homeAnchor = parseHomeAnchorFromHash(trimmed);
  if (homeAnchor) {
    return buildHomeAnchorHash(homeAnchor);
  }
  const section = parseSectionFromHash(trimmed);
  return getNavItemById(section).hash;
}

export function pushRouteHistory(
  stack: readonly string[],
  nextHash: string
): string[] {
  const normalized = normalizeAppHash(nextHash);
  if (stack.length === 0) {
    return [normalized];
  }
  if (stack[stack.length - 1] === normalized) {
    return [...stack];
  }
  return [...stack, normalized];
}

export function syncRouteHistoryOnExternalNavigation(
  stack: readonly string[],
  nextHash: string
): string[] {
  const normalized = normalizeAppHash(nextHash);
  if (stack.length >= 2 && stack[stack.length - 2] === normalized) {
    return stack.slice(0, -1);
  }
  return pushRouteHistory(stack, normalized);
}

export function resolvePreviousRoute(stack: readonly string[]): {
  nextStack: string[];
  targetHash: string | null;
} {
  if (stack.length > 1) {
    const nextStack = stack.slice(0, -1);
    return {
      nextStack,
      targetHash: nextStack[nextStack.length - 1] ?? null,
    };
  }

  const currentHash = normalizeAppHash(stack[0] ?? '#trang-chu');
  if (
    parseReferencePostIdFromHash(currentHash) !== null ||
    parseReferenceChapterFromHash(currentHash) !== null
  ) {
    return {
      nextStack: ['#tham-khao'],
      targetHash: '#tham-khao',
    };
  }

  if (parseGroupSubpageFromHash(currentHash) !== null) {
    return {
      nextStack: ['#nhom'],
      targetHash: '#nhom',
    };
  }

  if (currentHash !== '#trang-chu') {
    return {
      nextStack: ['#trang-chu'],
      targetHash: '#trang-chu',
    };
  }

  return {
    nextStack: ['#trang-chu'],
    targetHash: null,
  };
}

export function canNavigateBack(
  stack: readonly string[],
  currentHash: string
): boolean {
  const effectiveStack =
    stack.length > 0 ? stack : [normalizeAppHash(currentHash)];
  return resolvePreviousRoute(effectiveStack).targetHash !== null;
}

