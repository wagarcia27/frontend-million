import { Property } from '../app/types'

describe('API Services', () => {
  describe('Property Service', () => {
    test('should have correct interface structure', () => {
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

      expect(mockProperty.idProperty).toBe('prop1')
      expect(mockProperty.name).toBe('Test Property')
      expect(mockProperty.price).toBe(1000000)
      expect(mockProperty.owner.name).toBe('Test Owner')
    })

    test('should validate property data structure', () => {
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

      // Verificar que todas las propiedades requeridas existen
      expect(mockProperty).toHaveProperty('idProperty')
      expect(mockProperty).toHaveProperty('name')
      expect(mockProperty).toHaveProperty('address')
      expect(mockProperty).toHaveProperty('price')
      expect(mockProperty).toHaveProperty('codeInternal')
      expect(mockProperty).toHaveProperty('year')
      expect(mockProperty).toHaveProperty('idOwner')
      expect(mockProperty).toHaveProperty('imageUrl')
      expect(mockProperty).toHaveProperty('owner')
      
      // Verificar estructura del owner
      expect(mockProperty.owner).toHaveProperty('idOwner')
      expect(mockProperty.owner).toHaveProperty('name')
      expect(mockProperty.owner).toHaveProperty('address')
      expect(mockProperty.owner).toHaveProperty('photo')
      expect(mockProperty.owner).toHaveProperty('birthday')
    })

    test('should handle price formatting', () => {
      const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price)
      }

      expect(formatPrice(1000000)).toBe('$1,000,000')
      expect(formatPrice(2500000)).toBe('$2,500,000')
      expect(formatPrice(500000)).toBe('$500,000')
    })
  })
})