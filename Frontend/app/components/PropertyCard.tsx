'use client';

import { useState } from 'react';
import { Property } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
  onLoginRequired?: () => void;
}

export default function PropertyCard({ property, onClick, onLoginRequired }: PropertyCardProps) {
  const { isAuthenticated, isFavorite, toggleFavorite } = useAuth();
  const [isFavoriting, setIsFavoriting] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    if (!isAuthenticated) {
      // Open login modal immediately
      onLoginRequired?.();
      return;
    }
    
    try {
      setIsFavoriting(true);
      await toggleFavorite(property.idProperty);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsFavoriting(false);
    }
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="bg-primary-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
            {formatPrice(property.price)}
          </div>
          <button
            onClick={handleFavoriteClick}
            disabled={isFavoriting}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isAuthenticated && isFavorite(property.idProperty)
                ? 'bg-red-500/90 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-red-50/90 hover:text-red-500'
            } ${isFavoriting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg 
              className={`w-4 h-4 transition-all duration-200 ${isFavoriting ? 'animate-pulse scale-110' : ''}`}
              fill={isAuthenticated && isFavorite(property.idProperty) ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-2 text-white text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Built in {property.year}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
          {property.name}
        </h3>
        
        <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-300 mb-4">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm line-clamp-2">{property.address}</span>
        </div>

        {property.owner && (
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <img
              src={property.owner.photo}
              alt={property.owner.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary-200 dark:border-primary-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{property.owner.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Property Owner</p>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            Code: {property.codeInternal}
          </span>
          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1 group">
            <span>View Details</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

