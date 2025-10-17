import axios from 'axios';
import { Property, PropertyFilter } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
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

export const getProperties = async (filters?: PropertyFilter): Promise<Property[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters?.name) params.append('name', filters.name);
    if (filters?.address) params.append('address', filters.address);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

    const response = await api.get<Property[]>('/properties', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const getPropertyById = async (id: string): Promise<Property> => {
  try {
    const response = await api.get<Property>(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    throw error;
  }
};

export const createProperty = async (property: Omit<Property, 'idProperty'>): Promise<Property> => {
  try {
    const response = await api.post<Property>('/properties', property);
    return response.data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

export const updateProperty = async (id: string, property: Partial<Property>): Promise<void> => {
  try {
    await api.put(`/properties/${id}`, property);
  } catch (error) {
    console.error(`Error updating property ${id}:`, error);
    throw error;
  }
};

export const deleteProperty = async (id: string): Promise<void> => {
  try {
    await api.delete(`/properties/${id}`);
  } catch (error) {
    console.error(`Error deleting property ${id}:`, error);
    throw error;
  }
};

