import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 md:h-56 bg-gray-200 dark:bg-gray-800 w-full"></div>
      
      <div className="p-5">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
        
        {/* Address/Details Placeholders */}
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6 mb-6"></div>
        
        {/* Button & Price Placeholders */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
          <div className="h-10 bg-green-100 dark:bg-green-900/20 rounded-xl w-1/3"></div>
        </div>
      </div>
    </div>
  );
}