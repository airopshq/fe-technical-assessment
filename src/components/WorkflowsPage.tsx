import { useState, useMemo, useCallback } from 'react';
import { useAirOps } from '@/hooks/useAirOps';
import { useDebounce } from '@/hooks/useDebounce';
import { filterWorkflows, sortWorkflows } from '@/utils/workflowFilters';
import type { SortKey } from '@/types/sort';
import { SORT_OPTIONS } from '@/constants/sortOptions';
import { TABLE_COLUMNS } from '@/constants/tableColumns';
import { WorkflowTableRow } from '@/components/WorkflowTableRow';
import { SearchInput } from '@/components/SearchInput';
import { TableState } from '@/components/TableState';
import ChevronDownIcon from '@/assets/chevron-down-icon.svg';

export function WorkflowsPage() {
  const { workflowsData, loading, error, initError, deleteWorkflow, addTag } = useAirOps();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sortBy, setSortBy] = useState('');

  // Filter and sort workflows
  const filteredAndSortedItems = useMemo(() => {
    const filtered = filterWorkflows(workflowsData, debouncedSearchQuery);
    return sortWorkflows(filtered, sortBy as SortKey);
  }, [workflowsData, debouncedSearchQuery, sortBy]);

  const handleEdit = useCallback((_id: string) => {
    // TODO: Implement edit functionality
    // For now, this is a placeholder for future implementation
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      deleteWorkflow(id);
    },
    [deleteWorkflow]
  );

  const handleAddTag = useCallback((id: string) => {
    addTag(id);
  }, [addTag]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <div className="border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-5 gap-6 border-b border-gray-200 flex-shrink-0">
        <div>
          <h1 className="text-[30px] font-bold text-gray-900 leading-9 tracking-[-0.02em]">Workflows</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none border border-gray-300 rounded-md pl-4 pr-8 py-2 text-[13px] font-semibold text-gray-700 leading-5 cursor-pointer hover:border-gray-400 focus:outline-none bg-white"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            <img
              src={ChevronDownIcon}
              alt=""
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-1.5 pointer-events-none"
            />
          </div>

          <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        </div>
      </div>

      {/* Content: fills remaining height under header */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Initialization Error State */}
        {initError && (
          <div className="flex-1 overflow-y-auto">
            <TableState type="error" message={`Error: ${initError.message}`} />
          </div>
        )}

        {/* Loading State */}
        {!initError && loading && (
          <div className="flex-1 overflow-y-auto">
            <TableState type="loading" />
          </div>
        )}

        {/* Error State */}
        {!initError && error && (
          <div className="flex-1 overflow-y-auto">
            <TableState type="error" message={error.message} />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedItems.length === 0 && (
          <div className="flex-1 overflow-y-auto">
            <TableState type="empty" />
          </div>
        )}

        {/* Table: header fixed, rows scroll */}
        {!loading && !error && filteredAndSortedItems.length > 0 && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden ml-5 mr-5">
            <div className="w-full h-full flex flex-col overflow-hidden" role="table" aria-label="Workflows table">
              {/* Header */}
              <div
                className="flex-shrink-0 flex border-b border-gray-200 h-[56px] justify-between items-center bg-white"
                role="row"
                style={{
                  minWidth: 'max-content',
                }}
              >
                {TABLE_COLUMNS.map((column) => (
                  <div
                    key={column.key}
                    className="text-left py-3 px-6 text-sm font-medium text-gray-700 flex-shrink-0"
                    role="columnheader"
                    style={{
                      flex: column.flex ?? 0,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </div>
                ))}
              </div>
              {/* Rows: only this area scrolls */}
              <div
                className="flex-1 min-h-0 overflow-y-auto overflow-x-auto"
                role="rowgroup"
                style={{
                  minWidth: 'max-content',
                }}
              >
                {filteredAndSortedItems.map((item) => (
                  <WorkflowTableRow
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    columns={TABLE_COLUMNS}
                    onAddTag={handleAddTag}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
