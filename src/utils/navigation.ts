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

export function parseSectionFromHash(hash: string): NavSection {
  const normalized = hash.trim().toLowerCase();
  const matched = NAV_ITEMS.find((item) => item.hash === normalized);
  return matched ? matched.id : 'home';
}

export function getNavItemById(id: NavSection): NavItem {
  return NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0];
}
