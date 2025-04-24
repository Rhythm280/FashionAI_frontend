import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';

export const useSearch = (query: string, selectedCategory: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/fashion-advice', {
          query,
          category: selectedCategory,
        });
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() !== '') {
      searchProducts();
    } else {
      setResults([]);  // clear results if query is empty
    }
  }, [query, selectedCategory]);

  return { results, loading };
};
