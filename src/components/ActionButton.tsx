import { memo } from 'react';
import type { ReactNode } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  ariaLabel: string;
  icon: ReactNode;
}

export const ActionButton = memo(function ActionButton({
  onClick,
  ariaLabel,
  icon,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
      aria-label={ariaLabel}
      type="button"
    >
      {icon}
    </button>
  );
});

