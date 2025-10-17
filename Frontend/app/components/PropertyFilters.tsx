'use client';

import { useState, useEffect } from 'react';
import { PropertyFilter } from '../types';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilter) => void;
  showFavoritesOnly?: boolean; // New prop to know if we're showing favorites
  onClearFavorites?: () => void; // New prop to clear favorites
}

export default function PropertyFilters({ onFilterChange, showFavoritesOnly = false, onClearFavorites }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [isExpanded, setIsExpanded] = useState(showFavoritesOnly); // Auto-expand if showing favorites

  // Auto-expand filters when showing favorites
  useEffect(() => {
    setIsExpanded(showFavoritesOnly);
  }, [showFavoritesOnly]);

  const handleInputChange = (field: keyof PropertyFilter, value: string) => {
    const newFilters = { ...filters };
    
    if (field === 'minPrice' || field === 'maxPrice') {
      newFilters[field] = value ? parseFloat(value) : undefined;
    } else {
      newFilters[field] = value || undefined;
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
    // Also clear favorites if we're showing favorites
    if (showFavoritesOnly && onClearFavorites) {
      onClearFavorites();
    }
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');
  const shouldEnableClearButton = hasActiveFilters || showFavoritesOnly;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filter Properties</h2>
          {shouldEnableClearButton && (
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg
            className={`w-5 h-5 text-gray-600 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${isExpanded ? 'block' : 'hidden lg:grid'}`}>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search by Name or Address
          </label>
          <input
            type="text"
            value={filters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Downtown Apartment..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Min Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handleInputChange('minPrice', e.target.value)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              placeholder="999999999"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Actions
          </label>
          <button
            onClick={clearFilters}
            disabled={!shouldEnableClearButton}
            className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

