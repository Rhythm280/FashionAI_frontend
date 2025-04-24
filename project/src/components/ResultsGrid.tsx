import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Loader } from 'lucide-react';

interface ResultsGridProps {
  results: Product[];
  loading: boolean;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 text-pink-500 animate-spin" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Finding the perfect style...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">No results found</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or category filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};