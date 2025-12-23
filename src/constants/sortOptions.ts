import { SORT_KEYS, type SortKey, type SortOption } from '@/types/sort';

export { SORT_KEYS, type SortKey, type SortOption };

export const SORT_OPTIONS: SortOption[] = [
  { value: '', label: 'Sort', disabled: true },
  { value: SORT_KEYS.NAME, label: 'Name' },
  { value: SORT_KEYS.LAST_UPDATED, label: 'Last Updated' },
  { value: SORT_KEYS.TYPE, label: 'Type' },
];

