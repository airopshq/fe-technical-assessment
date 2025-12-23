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

