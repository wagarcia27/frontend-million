using MongoDB.Driver;
using PropertyApi.Configuration;
using PropertyApi.DTOs;
using PropertyApi.Models;
using Microsoft.Extensions.Options;

namespace PropertyApi.Services;

public class PropertyService : IPropertyService
{
    private readonly IMongoCollection<Property> _properties;
    private readonly IMongoCollection<Owner> _owners;

    public PropertyService(IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

        _properties = mongoDatabase.GetCollection<Property>(mongoDbSettings.Value.PropertiesCollectionName);
        _owners = mongoDatabase.GetCollection<Owner>(mongoDbSettings.Value.OwnersCollectionName);
    }

    public async Task<List<PropertyDto>> GetAllPropertiesAsync(PropertyFilterDto? filter = null)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filterDefinition = filterBuilder.Empty;

        if (filter != null)
        {
            if (!string.IsNullOrEmpty(filter.Name))
            {
                filterDefinition &= filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(filter.Name, "i"));
            }

            if (!string.IsNullOrEmpty(filter.Address))
            {
                filterDefinition &= filterBuilder.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(filter.Address, "i"));
            }

            if (filter.MinPrice.HasValue)
            {
                filterDefinition &= filterBuilder.Gte(p => p.Price, filter.MinPrice.Value);
            }

            if (filter.MaxPrice.HasValue)
            {
                filterDefinition &= filterBuilder.Lte(p => p.Price, filter.MaxPrice.Value);
            }
        }

        var properties = await _properties.Find(filterDefinition).ToListAsync();
        var propertyDtos = new List<PropertyDto>();

        foreach (var property in properties)
        {
            var owner = await _owners.Find(o => o.IdOwner == property.IdOwner).FirstOrDefaultAsync();
            
            propertyDtos.Add(new PropertyDto
            {
                IdProperty = property.IdProperty,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                CodeInternal = property.CodeInternal,
                Year = property.Year,
                IdOwner = property.IdOwner,
                ImageUrl = property.ImageUrl,
                Owner = owner != null ? new OwnerDto
                {
                    IdOwner = owner.IdOwner,
                    Name = owner.Name,
                    Address = owner.Address,
                    Photo = owner.Photo,
                    Birthday = owner.Birthday
                } : null
            });
        }

        return propertyDtos;
    }

    public async Task<PropertyDto?> GetPropertyByIdAsync(string id)
    {
        var property = await _properties.Find(p => p.IdProperty == id).FirstOrDefaultAsync();
        
        if (property == null)
            return null;

        var owner = await _owners.Find(o => o.IdOwner == property.IdOwner).FirstOrDefaultAsync();

        return new PropertyDto
        {
            IdProperty = property.IdProperty,
            Name = property.Name,
            Address = property.Address,
            Price = property.Price,
            CodeInternal = property.CodeInternal,
            Year = property.Year,
            IdOwner = property.IdOwner,
            ImageUrl = property.ImageUrl,
            Owner = owner != null ? new OwnerDto
            {
                IdOwner = owner.IdOwner,
                Name = owner.Name,
                Address = owner.Address,
                Photo = owner.Photo,
                Birthday = owner.Birthday
            } : null
        };
    }

    public async Task<PropertyDto> CreatePropertyAsync(PropertyDto propertyDto)
    {
        var property = new Property
        {
            IdProperty = Guid.NewGuid().ToString(),
            Name = propertyDto.Name,
            Address = propertyDto.Address,
            Price = propertyDto.Price,
            CodeInternal = propertyDto.CodeInternal,
            Year = propertyDto.Year,
            IdOwner = propertyDto.IdOwner,
            ImageUrl = propertyDto.ImageUrl
        };

        await _properties.InsertOneAsync(property);
        propertyDto.IdProperty = property.IdProperty;

        return propertyDto;
    }

    public async Task<bool> UpdatePropertyAsync(string id, PropertyDto propertyDto)
    {
        var property = new Property
        {
            IdProperty = id,
            Name = propertyDto.Name,
            Address = propertyDto.Address,
            Price = propertyDto.Price,
            CodeInternal = propertyDto.CodeInternal,
            Year = propertyDto.Year,
            IdOwner = propertyDto.IdOwner,
            ImageUrl = propertyDto.ImageUrl
        };

        var result = await _properties.ReplaceOneAsync(p => p.IdProperty == id, property);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeletePropertyAsync(string id)
    {
        var result = await _properties.DeleteOneAsync(p => p.IdProperty == id);
        return result.DeletedCount > 0;
    }
}

