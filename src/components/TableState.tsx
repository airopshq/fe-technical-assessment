interface TableStateProps {
  type: 'loading' | 'error' | 'empty';
  message?: string;
}

export function TableState({ type, message }: TableStateProps) {
  const defaultMessages = {
    loading: 'Loading workflows...',
    error: message || 'An error occurred while loading workflows',
    empty: 'No workflows found',
  };

  const textColor = type === 'error' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="flex items-center justify-center py-12">
      <div className={textColor}>{defaultMessages[type]}</div>
    </div>
  );
}

