using PropertyApi.DTOs;

namespace PropertyApi.Services;

public interface IPropertyService
{
    Task<List<PropertyDto>> GetAllPropertiesAsync(PropertyFilterDto? filter = null);
    Task<PropertyDto?> GetPropertyByIdAsync(string id);
    Task<PropertyDto> CreatePropertyAsync(PropertyDto propertyDto);
    Task<bool> UpdatePropertyAsync(string id, PropertyDto propertyDto);
    Task<bool> DeletePropertyAsync(string id);
    
    // Pagination methods
    Task<PagedResultDto<PropertyDto>> GetPropertiesPaginatedAsync(int page = 1, int pageSize = 12, PropertyFilterDto? filter = null);
    Task<int> GetTotalPropertiesCountAsync(PropertyFilterDto? filter = null);
}

