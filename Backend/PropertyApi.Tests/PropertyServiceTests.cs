using NUnit.Framework;
using PropertyApi.DTOs;
using PropertyApi.Services;
using PropertyApi.Configuration;
using Microsoft.Extensions.Options;

namespace PropertyApi.Tests;

[TestFixture]
public class PropertyServiceTests
{
    private IPropertyService _propertyService = null!;

    [SetUp]
    public void Setup()
    {
        var mongoSettings = Options.Create(new MongoDbSettings
        {
            ConnectionString = "mongodb://localhost:27017",
            DatabaseName = "PropertyDbTest",
            PropertiesCollectionName = "Properties",
            OwnersCollectionName = "Owners"
        });

        _propertyService = new PropertyService(mongoSettings);
    }

    [Test]
    public async Task GetAllPropertiesAsync_ReturnsListOfProperties()
    {
        // Arrange
        var filter = new PropertyFilterDto();

        // Act
        var result = await _propertyService.GetAllPropertiesAsync(filter);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.InstanceOf<List<PropertyDto>>());
    }

    [Test]
    public async Task GetAllPropertiesAsync_WithNameFilter_ReturnsFilteredProperties()
    {
        // Arrange
        var filter = new PropertyFilterDto { Name = "Test" };

        // Act
        var result = await _propertyService.GetAllPropertiesAsync(filter);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.InstanceOf<List<PropertyDto>>());
    }

    [Test]
    public async Task GetAllPropertiesAsync_WithPriceRange_ReturnsFilteredProperties()
    {
        // Arrange
        var filter = new PropertyFilterDto 
        { 
            MinPrice = 100000, 
            MaxPrice = 500000 
        };

        // Act
        var result = await _propertyService.GetAllPropertiesAsync(filter);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.InstanceOf<List<PropertyDto>>());
        
        if (result.Any())
        {
            Assert.That(result.All(p => p.Price >= 100000 && p.Price <= 500000), Is.True);
        }
    }

    [Test]
    public async Task CreatePropertyAsync_ValidProperty_ReturnsCreatedProperty()
    {
        // Arrange
        var newProperty = new PropertyDto
        {
            Name = "Test Property",
            Address = "123 Test St",
            Price = 250000,
            CodeInternal = "TEST001",
            Year = 2024,
            IdOwner = "owner1",
            ImageUrl = "https://example.com/image.jpg"
        };

        // Act
        var result = await _propertyService.CreatePropertyAsync(newProperty);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.IdProperty, Is.Not.Null.And.Not.Empty);
        Assert.That(result.Name, Is.EqualTo("Test Property"));
    }

    [Test]
    public async Task GetPropertyByIdAsync_NonExistentId_ReturnsNull()
    {
        // Arrange
        var nonExistentId = "nonexistent-id-12345";

        // Act
        var result = await _propertyService.GetPropertyByIdAsync(nonExistentId);

        // Assert
        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task UpdatePropertyAsync_NonExistentId_ReturnsFalse()
    {
        // Arrange
        var nonExistentId = "nonexistent-id-12345";
        var propertyDto = new PropertyDto
        {
            Name = "Updated Property",
            Address = "456 Updated St",
            Price = 300000,
            CodeInternal = "UPD001",
            Year = 2024,
            IdOwner = "owner1",
            ImageUrl = "https://example.com/updated.jpg"
        };

        // Act
        var result = await _propertyService.UpdatePropertyAsync(nonExistentId, propertyDto);

        // Assert
        Assert.That(result, Is.False);
    }

    [Test]
    public async Task DeletePropertyAsync_NonExistentId_ReturnsFalse()
    {
        // Arrange
        var nonExistentId = "nonexistent-id-12345";

        // Act
        var result = await _propertyService.DeletePropertyAsync(nonExistentId);

        // Assert
        Assert.That(result, Is.False);
    }
}

