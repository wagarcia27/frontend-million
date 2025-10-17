using MongoDB.Driver;
using PropertyApi.Models;
using PropertyApi.Configuration;
using Microsoft.Extensions.Options;

namespace PropertyApi.Services
{
    public interface IPropertyTraceService
    {
        Task<List<PropertyTrace>> GetTracesByPropertyAsync(string propertyId);
        Task<PropertyTrace> CreateTraceAsync(PropertyTrace trace);
        Task<bool> DeleteTraceAsync(string traceId);
        Task<List<PropertyTrace>> GetAllTracesAsync();
    }

    public class PropertyTraceService : IPropertyTraceService
    {
        private readonly IMongoCollection<PropertyTrace> _traces;

        public PropertyTraceService(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _traces = mongoDatabase.GetCollection<PropertyTrace>("propertyTraces");
        }

        public async Task<List<PropertyTrace>> GetTracesByPropertyAsync(string propertyId)
        {
            return await _traces.Find(t => t.IdProperty == propertyId)
                               .SortByDescending(t => t.DateSale)
                               .ToListAsync();
        }

        public async Task<PropertyTrace> CreateTraceAsync(PropertyTrace trace)
        {
            await _traces.InsertOneAsync(trace);
            return trace;
        }

        public async Task<bool> DeleteTraceAsync(string traceId)
        {
            var result = await _traces.DeleteOneAsync(t => t.Id == traceId);
            return result.DeletedCount > 0;
        }

        public async Task<List<PropertyTrace>> GetAllTracesAsync()
        {
            return await _traces.Find(_ => true)
                               .SortByDescending(t => t.DateSale)
                               .ToListAsync();
        }
    }
}
