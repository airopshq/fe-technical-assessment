import type { WorkflowItem } from '@/types/workflows';

export type SortKey = 'name' | 'lastUpdated' | 'type' | '';

/**
 * Filter workflows based on search query
 */
export function filterWorkflows(
  workflows: WorkflowItem[],
  searchQuery: string
): WorkflowItem[] {
  if (!searchQuery.trim()) {
    return workflows;
  }

  const query = searchQuery.toLowerCase();
  return workflows.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.name.toLowerCase().includes(query))
  );
}

/**
 * Sort workflows based on sort key
 */
export function sortWorkflows(
  workflows: WorkflowItem[],
  sortBy: SortKey
): WorkflowItem[] {
  if (!sortBy) {
    return workflows;
  }

  const sorted = [...workflows];
  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'lastUpdated':
        return b.lastUpdated - a.lastUpdated; // Newest first
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });
  return sorted;
}

