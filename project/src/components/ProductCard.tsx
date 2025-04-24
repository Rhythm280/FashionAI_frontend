import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-900 opacity-70 hover:opacity-100 transition-opacity duration-200"
          aria-label="Add to favorites"
        >
          <Heart className="h-5 w-5 text-pink-500" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-medium">Quick view</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white line-clamp-1">
            {product.name}
          </h3>
          <span className="font-bold text-pink-500">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {product.description}
        </p>
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
          {product.category}
        </span>
      </div>
    </div>
  );
};