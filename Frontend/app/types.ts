export interface Owner {
  idOwner: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface Property {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  idOwner: string;
  imageUrl: string;
  owner?: Owner;
}

export interface PropertyFilter {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Authentication Types
export interface User {
  idUser: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  favoriteProperties: string[];
  preferences: UserPreferences;
  createdAt: string;
  lastLogin?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showFavoritesOnly: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  updateUserProfile: (profileData: { firstName: string; lastName: string; avatar?: string }) => Promise<void>;
  addFavorite: (propertyId: string) => Promise<void>;
  removeFavorite: (propertyId: string) => Promise<void>;
  toggleFavorite: (propertyId: string) => Promise<void>;
  isFavorite: (propertyId: string) => boolean;
  toggleFavoritesFilter: () => void;
  clearFavoritesFilter: () => void;
}

