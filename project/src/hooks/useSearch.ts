import { useState, useEffect } from 'react';
import { Product } from '../types';
import { products } from '../data/mockData';

export const useSearch = (query: string, selectedCategory: string) => {
  const [results, setResults] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Filter products based on search query and category
        let filteredProducts = products;
        
        if (query.trim()) {
          const lowercaseQuery = query.toLowerCase();
          
          // Search by query in name, description
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery)
          );
        }
        
        // Filter by category if not "All"
        if (selectedCategory && selectedCategory !== 'All') {
          filteredProducts = filteredProducts.filter(
            product => product.category === selectedCategory
          );
        }
        
        setResults(filteredProducts);
        setLoading(false);
      }, 500); // Simulated delay for search
    };
    
    searchProducts();
  }, [query, selectedCategory]);

  return { results, loading };
};