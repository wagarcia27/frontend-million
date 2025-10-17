'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './components/PropertyCard';
import PropertyFilters from './components/PropertyFilters';
import PropertyModal from './components/PropertyModal';
import Header from './components/Header';
import { Property, PropertyFilter } from './types';
import { getProperties } from './services/api';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error loading properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (filters.name) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.name!.toLowerCase()) ||
        p.address.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (newFilters: PropertyFilter) => {
    setFilters(newFilters);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const scrollToProperties = () => {
    const propertiesSection = document.getElementById('properties-section');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToFilters = () => {
    const filtersSection = document.getElementById('filters-section');
    if (filtersSection) {
      filtersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Header onScrollToProperties={scrollToProperties} onScrollToFilters={scrollToFilters} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Your <span className="text-primary-600">Dream Home</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our exclusive collection of luxury properties tailored to your lifestyle
          </p>
        </div>

        <div id="filters-section">
          <PropertyFilters onFilterChange={handleFilterChange} />
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
        ) : filteredProperties.length === 0 ? (
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
            <div id="properties-section" className="mb-6 text-gray-600">
              <p className="text-lg">
                Showing <span className="font-semibold text-primary-600">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.idProperty}
                  property={property}
                  onClick={() => handlePropertyClick(property)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

