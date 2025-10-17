import axios from 'axios';
import { Property, PropertyFilter } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const propertiesApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
propertiesApi.interceptors.request.use(
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

export interface PagedResult<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const propertyService = {
  // Get all properties (legacy method)
  async getAllProperties(): Promise<Property[]> {
    const response = await propertiesApi.get<Property[]>('/properties');
    return response.data;
  },

  // Get paginated properties
  async getPropertiesPaginated(
    page: number = 1, 
    pageSize: number = 12, 
    filters?: PropertyFilter
  ): Promise<PagedResult<Property>> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters) {
      if (filters.name) params.append('name', filters.name);
      if (filters.address) params.append('address', filters.address);
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    }

    const response = await propertiesApi.get<PagedResult<Property>>(`/properties/paginated?${params}`);
    return response.data;
  },

  // Get property by ID
  async getPropertyById(id: string): Promise<Property> {
    const response = await propertiesApi.get<Property>(`/properties/${id}`);
    return response.data;
  }
};
