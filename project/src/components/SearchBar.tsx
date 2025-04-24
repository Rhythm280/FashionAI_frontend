import React, { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div 
      className={`flex items-center w-full p-2 border-2 rounded-full transition-all duration-300 ${
        isFocused 
          ? 'border-pink-500 shadow-md' 
          : 'border-gray-200 dark:border-gray-700'
      } bg-white dark:bg-gray-800`}
    >
      <Search className="ml-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What's your mood today?"
        className="w-full px-3 py-2 text-gray-700 dark:text-gray-100 bg-transparent outline-none"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full transition-colors duration-200"
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
};