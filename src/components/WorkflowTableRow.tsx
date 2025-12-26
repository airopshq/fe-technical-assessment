import { memo, useMemo, useCallback } from 'react';
import type { WorkflowItem } from '@/types/workflows';
import { TABLE_COLUMNS } from '@/constants/tableColumns';
import { formatRelativeTime } from '@/utils/dateFormatter';
import { TagDisplay } from '@/components/TagDisplay';
import { ActionButton } from '@/components/ActionButton';
import EditIcon from '@/assets/edit-icon.svg';
import DeleteIcon from '@/assets/delete-icon.svg';

interface WorkflowTableRowProps {
  item: WorkflowItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddTag?: (id: string) => void;
}

function WorkflowTableRowComponent({
  item,
  onEdit,
  onDelete,
  onAddTag,
}: WorkflowTableRowProps) {
  const handleEdit = useCallback(() => {
    onEdit(item.id);
  }, [item.id, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(item.id);
  }, [item.id, onDelete]);

  const handleAddTag = useCallback(() => {
    onAddTag?.(item.id);
  }, [item.id, onAddTag]);

  const formattedLastUpdated = useMemo(
    () => formatRelativeTime(item.lastUpdated),
    [item.lastUpdated]
  );

  const renderCellContent = (columnKey: string) => {
    switch (columnKey) {
      case 'type':
        return (
          <span className="text-sm text-gray-400 capitalize">{item.type}</span>
        );
      case 'name':
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900">{item.name}</span>
          </div>
        );
      case 'tags':
        return (
          <div className="flex items-center gap-2 flex-wrap">
            <TagDisplay tags={item.tags} onAddTag={onAddTag ? handleAddTag : undefined} />
          </div>
        );
      case 'lastUpdated':
        return (
          <span className="text-sm text-gray-400">{formattedLastUpdated}</span>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-3">
            <ActionButton
              onClick={handleEdit}
              ariaLabel="Edit"
              icon={<img src={EditIcon} alt="" className="w-4 h-4" />}
            />
            <ActionButton
              onClick={handleDelete}
              ariaLabel="Delete"
              icon={<img src={DeleteIcon} alt="" className="w-4 h-4" />}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors h-[64px] items-center"
      role="row"
      style={{
        minWidth: 'max-content',
      }}
    >
      {TABLE_COLUMNS.map((column) => (
        <div
          key={column.key}
          className="py-4 px-6 flex-shrink-0"
          role="cell"
          style={{
            flex: column.flex ?? 0,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
          }}
        >
          {renderCellContent(column.key)}
        </div>
      ))}
    </div>
  );
}

export const WorkflowTableRow = memo(WorkflowTableRowComponent);

