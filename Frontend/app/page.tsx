'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import PropertyCard from './components/PropertyCard';
import PropertyFilters from './components/PropertyFilters';
import PropertyModal from './components/PropertyModal';
import Pagination from './components/Pagination';
import { Property, PropertyFilter } from './types';
import { propertyService, PagedResult } from './services/properties';
import { useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';

export default function Home() {
  const { user, isAuthenticated, showFavoritesOnly, clearFavoritesFilter } = useAuth();
  const [pagedResult, setPagedResult] = useState<PagedResult<Property> | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<PropertyFilter>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const pageSize = 12;

  const fetchProperties = useCallback(async (page: number = 1, filters: PropertyFilter = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      // For favorites, we need to get ALL properties to filter them properly
      if (showFavoritesOnly && user) {
        // Get all properties by requesting multiple pages until we get everything
        let allProperties: Property[] = [];
        let currentPageNum = 1;
        let hasMorePages = true;
        
        while (hasMorePages) {
          const result = await propertyService.getPropertiesPaginated(currentPageNum, 100, filters);
          allProperties = [...allProperties, ...result.data];
          
          // Check if we've reached the last page correctly
          if (currentPageNum >= result.totalPages || result.data.length === 0) {
            hasMorePages = false;
          } else {
            currentPageNum++;
          }
        }
        
        // Filter favorites
        const favorites = allProperties.filter(p => user.favoriteProperties.includes(p.idProperty));
        
        // Create a mock paged result with all properties
        setPagedResult({
          data: allProperties,
          totalItems: allProperties.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: allProperties.length,
          hasNextPage: false,
          hasPreviousPage: false
        });
      } else {
        const result = await propertyService.getPropertiesPaginated(page, pageSize, filters);
        setPagedResult(result);
      }
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [showFavoritesOnly, user]);

  useEffect(() => {
    fetchProperties(currentPage, currentFilters);
  }, [fetchProperties, currentPage, currentFilters]);

  useEffect(() => {
    // Reset to page 1 when filters change
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchProperties(1, currentFilters);
    }
  }, [currentFilters]);

  const handleFilterChange = useCallback((filters: PropertyFilter) => {
    setCurrentFilters(filters);
    // If new filters are applied, clear the favorites filter
    if (Object.keys(filters).length > 0 && showFavoritesOnly) {
      clearFavoritesFilter();
    }
  }, [showFavoritesOnly, clearFavoritesFilter]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const handleLoginRequired = () => {
    setShowLoginModal(true);
  };

  const scrollToProperties = () => {
    const propertiesSection = document.getElementById('properties-section');
    if (propertiesSection) {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // On mobile, use scrollIntoView with center positioning
        propertiesSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      } else {
        // On desktop, use custom offset for better spacing
        const elementPosition = propertiesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToFilters = () => {
    const filtersSection = document.getElementById('filters-section');
    if (filtersSection) {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // On mobile, use scrollIntoView with center positioning
        filtersSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      } else {
        // On desktop, use custom offset for better spacing
        const elementPosition = filtersSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Filter properties for favorites if needed
  const allFavorites = showFavoritesOnly && user 
    ? pagedResult?.data.filter(p => user.favoriteProperties.includes(p.idProperty)) || []
    : [];

  const displayProperties = showFavoritesOnly && user 
    ? allFavorites
    : pagedResult?.data || [];

  const totalItems = showFavoritesOnly && user 
    ? allFavorites.length 
    : pagedResult?.totalItems || 0;

  const totalPages = showFavoritesOnly && user 
    ? Math.ceil(allFavorites.length / pageSize)
    : pagedResult?.totalPages || 1;

  // For favorites, we need to paginate the filtered results
  const paginatedFavorites = showFavoritesOnly && user 
    ? displayProperties.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : displayProperties;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header onScrollToProperties={scrollToProperties} onScrollToFilters={scrollToFilters} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Your <span className="text-primary-600 dark:text-primary-400">Dream Home</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our exclusive collection of luxury properties tailored to your lifestyle
          </p>
        </div>

        <div id="filters-section">
          <PropertyFilters 
            onFilterChange={handleFilterChange} 
            showFavoritesOnly={showFavoritesOnly}
            onClearFavorites={clearFavoritesFilter}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
          </div>
        ) : paginatedFavorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-white rounded-full shadow-lg mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <>
            <div id="properties-section" className="mb-6 text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between">
                <p className="text-lg">
                  {showFavoritesOnly ? (
                    <>Showing <span className="font-semibold text-primary-600 dark:text-primary-400">{paginatedFavorites.length}</span> of <span className="font-semibold text-primary-600 dark:text-primary-400">{totalItems}</span> favorite properties</>
                  ) : (
                    <>Showing <span className="font-semibold text-primary-600 dark:text-primary-400">{paginatedFavorites.length}</span> of <span className="font-semibold text-primary-600 dark:text-primary-400">{totalItems}</span> properties</>
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedFavorites.map((property) => (
                <PropertyCard
                  key={property.idProperty}
                  property={property}
                  onClick={() => handlePropertyClick(property)}
                  onLoginRequired={handleLoginRequired}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>

      {selectedProperty && (
        <PropertyModal
          onClose={handleCloseModal}
          property={selectedProperty}
          onLoginRequired={handleLoginRequired}
        />
      )}

      <AuthModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </main>
  );
}