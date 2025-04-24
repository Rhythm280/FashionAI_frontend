import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../data/mockData';

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-sm rounded-lg mb-6 transition-colors duration-300">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <span>Categories</span>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white font-medium'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};