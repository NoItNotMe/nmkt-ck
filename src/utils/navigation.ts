export type NavSection = 'home' | 'groups' | 'reference';

export interface NavItem {
  id: NavSection;
  label: string;
  hash: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Trang chủ', hash: '#trang-chu' },
  { id: 'groups', label: 'Nhóm', hash: '#nhom' },
  { id: 'reference', label: 'Tham khảo', hash: '#tham-khao' },
] as const;

export const REFERENCE_HASH_PREFIX = '#tham-khao/';
export const REFERENCE_CHAPTER_HASH_PREFIX = '#tham-khao/chuong/';

export function parseSectionFromHash(hash: string): NavSection {
  const normalized = hash.trim().toLowerCase();
  if (
    normalized === '#tham-khao' ||
    normalized.startsWith(REFERENCE_HASH_PREFIX)
  ) {
    return 'reference';
  }
  const matched = NAV_ITEMS.find((item) => item.hash === normalized);
  return matched ? matched.id : 'home';
}

export function parseReferenceChapterFromHash(hash: string): number | null {
  const trimmed = hash.trim();
  const lower = trimmed.toLowerCase();
  if (!lower.startsWith(REFERENCE_CHAPTER_HASH_PREFIX)) {
    return null;
  }
  const raw = trimmed.slice(REFERENCE_CHAPTER_HASH_PREFIX.length).trim();
  const num = Number(raw);
  if (!Number.isInteger(num) || num < 1 || num > 10) {
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

export function getNavItemById(id: NavSection): NavItem {
  return NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0];
}
