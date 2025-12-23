import SearchIcon from '@/assets/search-icon.svg';

interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchInput({
  searchQuery,
  handleSearchChange,
  placeholder = 'Search workflows',
}: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-transparent shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1)]"
        aria-label="Search workflows"
      />
      <img
        src={SearchIcon}
        alt=""
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
        aria-hidden="true"
      />
    </div>
  );
}

