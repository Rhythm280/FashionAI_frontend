import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { ResultsGrid } from './components/ResultsGrid';
import { SearchAnimation } from './components/SearchAnimation';
import { useSearch } from './hooks/useSearch';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryToSearch, setQueryToSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSearchAnimation, setShowSearchAnimation] = useState(false);

  // Get search results
  const { results, loading } = useSearch(queryToSearch, selectedCategory);

  const handleSearch = () => {
    setQueryToSearch(searchQuery);
    
    // Show animation for a minimum duration
    setShowSearchAnimation(true);
    setTimeout(() => {
      setShowSearchAnimation(false);
    }, 1500);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onSearch={handleSearch} 
        />
        
        <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
          <Categories 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          
          <div className="min-h-[50vh]">
            <ResultsGrid results={results} loading={loading} />
          </div>
        </main>
        
        <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Fashion AI. All rights reserved.</p>
          </div>
        </footer>
        
        {/* Search animation overlay */}
        <SearchAnimation show={showSearchAnimation} />
      </div>
    </ThemeProvider>
  );
}

import axios from './api/axios'; // adjust the path to where you placed axios.ts

axios.get('/fashion')
  .then((res) => {
    console.log(res.data); // replace with setState or your logic
  })
  .catch((err) => {
    console.error('Error fetching fashion items:', err);
  });


export default App;