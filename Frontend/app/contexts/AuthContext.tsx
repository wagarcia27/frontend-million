'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterCredentials, UserPreferences } from '../types';
import { authService, tokenUtils } from '../services/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = tokenUtils.getToken();
        const storedUser = tokenUtils.getUser();

        if (storedToken && storedUser) {
          // Validate token with backend
          const isValid = await authService.validateToken();
          if (isValid) {
            setToken(storedToken);
            setUser(storedUser);
            // Apply user's saved theme
            applyTheme(storedUser.preferences.theme);
          } else {
            tokenUtils.clearAuth();
            // Apply default light theme when user is not authenticated
            applyTheme('light');
          }
        } else {
          // Apply default light theme when user is not authenticated
          applyTheme('light');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        tokenUtils.clearAuth();
        // Apply default light theme on error
        applyTheme('light');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Apply theme to document
  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    console.log(`Applying theme: ${theme}`); // Debug log
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Added dark class to root'); // Debug log
    } else {
      root.classList.remove('dark');
      console.log('Removed dark class from root'); // Debug log
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      
      // Store token and user data
      tokenUtils.setToken(response.token);
      tokenUtils.setUser(response.user);
      
      setToken(response.token);
      setUser(response.user);
      
      // Apply user's theme after login
      applyTheme(response.user.preferences.theme);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.register(credentials);
      
      // Store token and user data
      tokenUtils.setToken(response.token);
      tokenUtils.setUser(response.user);
      
      setToken(response.token);
      setUser(response.user);
      
      // Apply user's theme after registration
      applyTheme(response.user.preferences.theme);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    tokenUtils.clearAuth();
    setToken(null);
    setUser(null);
    applyTheme('light'); // Apply default light theme on logout
    setShowFavoritesOnly(false); // Clear favorites filter on logout
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      await authService.updatePreferences(preferences);
      
      // Update local user state
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      
      tokenUtils.setUser(updatedUser);
      setUser(updatedUser);

      // Apply theme if changed
      if (preferences.theme) {
        applyTheme(preferences.theme);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update preferences');
    }
  };

  const updateUserProfile = async (profileData: { firstName: string; lastName: string; avatar?: string }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const response = await authService.updateUserProfile(profileData);
      
      // Update local user state with the response from the server
      const updatedUser = {
        ...user,
        firstName: response.firstName,
        lastName: response.lastName,
        avatar: response.avatar // Use the server response directly
      };
      
      tokenUtils.setUser(updatedUser);
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const addFavorite = async (propertyId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      await authService.addFavorite(propertyId);
      
      // Update local user state
      const updatedUser = {
        ...user,
        favoriteProperties: [...user.favoriteProperties, propertyId]
      };
      
      tokenUtils.setUser(updatedUser);
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add favorite');
    }
  };

  const removeFavorite = async (propertyId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      await authService.removeFavorite(propertyId);
      
      // Update local user state
      const updatedUser = {
        ...user,
        favoriteProperties: user.favoriteProperties.filter(id => id !== propertyId)
      };
      
      tokenUtils.setUser(updatedUser);
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove favorite');
    }
  };

  const toggleFavorite = async (propertyId: string) => {
    if (isFavorite(propertyId)) {
      await removeFavorite(propertyId);
    } else {
      await addFavorite(propertyId);
    }
  };

  const isFavorite = (propertyId: string): boolean => {
    return user?.favoriteProperties.includes(propertyId) || false;
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const clearFavoritesFilter = () => {
    setShowFavoritesOnly(false);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    showFavoritesOnly,
    login,
    register,
    logout,
    updatePreferences,
    updateUserProfile,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    toggleFavoritesFilter,
    clearFavoritesFilter
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

