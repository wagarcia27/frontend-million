import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropertyTraceModal from '../app/components/PropertyTraceModal'

describe('PropertyTraceModal Component', () => {
  const mockOnClose = jest.fn()
  const mockPropertyId = 'prop1'
  const mockPropertyName = 'Test Property'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders modal title correctly', () => {
    render(
      <PropertyTraceModal
        propertyId={mockPropertyId}
        propertyName={mockPropertyName}
        isOpen={true}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Property History')).toBeInTheDocument()
  })

  test('renders property name correctly', () => {
    render(
      <PropertyTraceModal
        propertyId={mockPropertyId}
        propertyName={mockPropertyName}
        isOpen={true}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Test Property')).toBeInTheDocument()
  })

  test('renders close button correctly', () => {
    render(
      <PropertyTraceModal
        propertyId={mockPropertyId}
        propertyName={mockPropertyName}
        isOpen={true}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Close')).toBeInTheDocument()
  })

  test('does not render modal when isOpen is false', () => {
    render(
      <PropertyTraceModal
        propertyId={mockPropertyId}
        propertyName={mockPropertyName}
        isOpen={false}
        onClose={mockOnClose}
      />
    )

    expect(screen.queryByText('Property History')).not.toBeInTheDocument()
  })
})