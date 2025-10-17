'use client';

import { useEffect, useState } from 'react';
import { Property } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onLoginRequired?: () => void;
}

export default function PropertyModal({ property, onClose, onLoginRequired }: PropertyModalProps) {
  // Early return if property is null
  if (!property) {
    return null;
  }
  const { isAuthenticated, isFavorite, toggleFavorite } = useAuth();
  const [isFavoriting, setIsFavoriting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.name}
            className="w-full h-96 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Price and Heart grouped together on the left */}
          <div className="absolute top-4 left-4 flex flex-col space-y-3">
            {/* Heart button */}
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
                className={`w-6 h-6 transition-all duration-200 ${isFavoriting ? 'animate-pulse scale-110' : ''}`}
                fill={isAuthenticated && isFavorite(property.idProperty) ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            {/* Price badge */}
            <div className="bg-primary-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-xl">
              {formatPrice(property.price)}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Code: {property.codeInternal}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{property.name}</h2>
            <div className="flex items-start space-x-2 text-gray-600">
              <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-lg">{property.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Year Built</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{property.year}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Property ID</span>
              </div>
              <p className="text-lg font-bold text-gray-900 truncate">{property.idProperty}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg col-span-2">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Price</span>
              </div>
              <p className="text-2xl font-bold text-primary-600">{formatPrice(property.price)}</p>
            </div>
          </div>

          {property.owner && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Owner</h3>
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <img
                    src={property.owner.photo}
                    alt={property.owner.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{property.owner.name}</h4>
                    <div className="flex items-start space-x-2 text-gray-600 mb-2">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{property.owner.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Born on {formatDate(property.owner.birthday)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Contact Owner</span>
            </button>
            <button className="flex-1 bg-white border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg hover:bg-primary-50 font-bold text-lg transition flex items-center justify-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Schedule Visit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

