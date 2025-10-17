import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropertyCard from '../app/components/PropertyCard'
import { Property } from '../app/types'

// Mock del contexto de autenticación
const mockAuthContext = {
  isAuthenticated: true,
  isFavorite: jest.fn(() => false),
  toggleFavorite: jest.fn(),
}

jest.mock('../app/contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}))

describe('PropertyCard Component', () => {
  const mockProperty: Property = {
    idProperty: 'prop1',
    name: 'Test Property',
    address: '123 Test Street',
    price: 1000000,
    codeInternal: 'TEST-001',
    year: 2020,
    idOwner: 'owner1',
    imageUrl: 'https://example.com/image.jpg',
    owner: {
      idOwner: 'owner1',
      name: 'Test Owner',
      address: '456 Owner Street',
      photo: 'https://example.com/owner.jpg',
      birthday: '1990-01-01'
    }
  }

  const mockOnClick = jest.fn()
  const mockOnLoginRequired = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders property name correctly', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        onClick={mockOnClick}
        onLoginRequired={mockOnLoginRequired}
      />
    )

    expect(screen.getByText('Test Property')).toBeInTheDocument()
  })

  test('renders property address correctly', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        onClick={mockOnClick}
        onLoginRequired={mockOnLoginRequired}
      />
    )

    expect(screen.getByText('123 Test Street')).toBeInTheDocument()
  })

  test('renders property price correctly', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        onClick={mockOnClick}
        onLoginRequired={mockOnLoginRequired}
      />
    )

    expect(screen.getByText('$1,000,000')).toBeInTheDocument()
  })

  test('renders property code correctly', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        onClick={mockOnClick}
        onLoginRequired={mockOnLoginRequired}
      />
    )

    expect(screen.getByText('Code: TEST-001')).toBeInTheDocument()
  })

  test('renders owner name correctly', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        onClick={mockOnClick}
        onLoginRequired={mockOnLoginRequired}
      />
    )

    expect(screen.getByText('Test Owner')).toBeInTheDocument()
  })
})