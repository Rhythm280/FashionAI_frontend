import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from './SearchBar';
import { Sun, Moon, Shirt } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch 
}) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Shirt className="h-8 w-8 text-pink-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Fashion<span className="text-pink-500">AI</span>
            </h1>
          </div>
          
          <div className="w-full md:w-2/3 lg:w-1/2">
            <SearchBar 
              query={searchQuery} 
              setQuery={setSearchQuery} 
              onSearch={onSearch} 
            />
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-700" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};