import { memo } from 'react';
import type { Tag } from '@/types/workflows';

interface TagDisplayProps {
  tags: Tag[];
  onAddTag?: () => void;
}

export const TagDisplay = memo(function TagDisplay({
  tags,
  onAddTag,
}: TagDisplayProps) {
  if (tags.length === 0) {
    return (
      <button
        onClick={onAddTag}
        className="border border-gray-300 inline-flex items-center gap-1 px-2 py-1 rounded-full  text-xs text-gray-700 hover:bg-gray-200 transition-colors"
      >
        + Add Tag
      </button>
    );
  }

  if (tags.length === 1) {
    return (
      <span className="border border-gray-300 inline-flex items-center gap-1 px-2 py-1 rounded-full  text-xs text-gray-700">
        <span
          className="w-2 h-2 rounded-sm"
          style={{ backgroundColor: tags[0].color }}
          aria-hidden="true"
        />
        {tags[0].name}
      </span>
    );
  }

  return (
    <span className="border border-gray-300 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-gray-700">
      <div className="flex items-center gap-1" aria-hidden="true">
        {tags.slice(0, 2).map((tag, index) => (
          <span
            key={`${tag.name}-${index}`}
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: tag.color }}
          />
        ))}
      </div>
      <span>{tags.length} tags</span>
    </span>
  );
});

