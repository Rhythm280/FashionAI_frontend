import React, { useEffect, useState } from 'react';

interface SearchAnimationProps {
  show: boolean;
}

export const SearchAnimation: React.FC<SearchAnimationProps> = ({ show }) => {
  const [visible, setVisible] = useState(show);
  
  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300); // Match the duration of the fade out animation
      return () => clearTimeout(timer);
    }
  }, [show]);
  
  if (!visible) return null;
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl max-w-md w-full text-center">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-indigo-300 border-b-indigo-500 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
            Finding your perfect style...
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI is curating fashion items based on your mood
          </p>
        </div>
      </div>
    </div>
  );
};