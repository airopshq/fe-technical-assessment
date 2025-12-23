export const SORT_KEYS = {
  NAME: 'name',
  LAST_UPDATED: 'lastUpdated',
  TYPE: 'type',
} as const;

export type SortKey = typeof SORT_KEYS[keyof typeof SORT_KEYS] | '';

export interface SortOption {
  value: SortKey;
  label: string;
  disabled?: boolean;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: '', label: 'Sort', disabled: true },
  { value: SORT_KEYS.NAME, label: 'Name' },
  { value: SORT_KEYS.LAST_UPDATED, label: 'Last Updated' },
  { value: SORT_KEYS.TYPE, label: 'Type' },
];

