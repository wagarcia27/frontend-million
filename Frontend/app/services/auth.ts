import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, UserPreferences } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

  // Get user profile
  async getProfile(): Promise<any> {
    const response = await authApi.get('/auth/profile');
    return response.data;
  },

  // Update preferences
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    await authApi.put('/auth/preferences', preferences);
  },

  // Update user profile
  async updateUserProfile(profileData: { firstName: string; lastName: string; avatar?: string }): Promise<any> {
    const response = await authApi.put('/auth/profile/update', profileData);
    return response.data;
  },

  // Add favorite property
  async addFavorite(propertyId: string): Promise<void> {
    await authApi.post(`/auth/favorites/${propertyId}`);
  },

  // Remove favorite property
  async removeFavorite(propertyId: string): Promise<void> {
    await authApi.delete(`/auth/favorites/${propertyId}`);
  },

  // Get favorite properties
  async getFavorites(): Promise<any[]> {
    const response = await authApi.get('/auth/favorites');
    return response.data;
  },

  // Validate token
  async validateToken(): Promise<boolean> {
    try {
      await authApi.get('/auth/profile');
      return true;
    } catch {
      return false;
    }
  }
};

// Token management utilities
export const tokenUtils = {
  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  setUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: (): any | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem('user');
  },

  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

