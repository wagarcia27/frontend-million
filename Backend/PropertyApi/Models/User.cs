using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace PropertyApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("idUser")]
        public string IdUser { get; set; } = string.Empty;

        [BsonElement("username")]
        [Required]
        public string Username { get; set; } = string.Empty;

        [BsonElement("email")]
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [BsonElement("passwordHash")]
        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [BsonElement("firstName")]
        public string FirstName { get; set; } = string.Empty;

        [BsonElement("lastName")]
        public string LastName { get; set; } = string.Empty;

        [BsonElement("avatar")]
        public string? Avatar { get; set; }

        [BsonElement("favoriteProperties")]
        public List<string> FavoriteProperties { get; set; } = new List<string>();

        [BsonElement("preferences")]
        public UserPreferences Preferences { get; set; } = new UserPreferences();

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("lastLogin")]
        public DateTime? LastLogin { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;
    }

    public class UserPreferences
    {
        [BsonElement("theme")]
        public string Theme { get; set; } = "light"; // light, dark

        [BsonElement("notifications")]
        public bool Notifications { get; set; } = true;

        [BsonElement("language")]
        public string Language { get; set; } = "en";
    }
}
