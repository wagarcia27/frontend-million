namespace PropertyApi.Configuration;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = string.Empty;
    public string PropertiesCollectionName { get; set; } = string.Empty;
    public string OwnersCollectionName { get; set; } = string.Empty;
}

