export interface PlaceholderItem {
  id: string;
  title: string;
  subtitle?: string;
}

export const PLACEHOLDER_ITEMS: readonly PlaceholderItem[] = [
  {
    id: 'muc-1',
    title: 'Định hướng ngành',
    subtitle: 'Chương 1: Giới thiệu',
  },
  { id: 'muc-2', title: 'Mục 2' },
  { id: 'muc-3', title: 'Mục 3' },
  { id: 'muc-4', title: 'Mục 4' },
] as const;
