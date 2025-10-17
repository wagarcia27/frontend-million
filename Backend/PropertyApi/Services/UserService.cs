using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PropertyApi.Configuration;
using PropertyApi.DTOs;
using PropertyApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace PropertyApi.Services
{
    public interface IUserService
    {
        Task<User?> ValidateUserAsync(string username, string password);
        Task<User?> GetUserByIdAsync(string idUser);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(RegisterDto registerDto);
        Task<bool> UpdateUserPreferencesAsync(string idUser, UpdatePreferencesDto preferences);
        Task<bool> AddFavoritePropertyAsync(string idUser, string propertyId);
        Task<bool> RemoveFavoritePropertyAsync(string idUser, string propertyId);
        Task<List<PropertyDto>> GetFavoritePropertiesAsync(string idUser);
        Task<bool> UpdateLastLoginAsync(string idUser);
        Task<bool> UpdateUserProfileAsync(string idUser, UpdateProfileDto profileDto);
    }

    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly IPropertyService _propertyService;

        public UserService(IOptions<MongoDbSettings> settings, IPropertyService propertyService)
        {
            var mongoSettings = settings.Value;
            var client = new MongoClient(mongoSettings.ConnectionString);
            var database = client.GetDatabase(mongoSettings.DatabaseName);
            _users = database.GetCollection<User>("Users");
            _propertyService = propertyService;
        }

        public async Task<User?> ValidateUserAsync(string username, string password)
        {
            var user = await _users.Find(u => u.Username == username && u.IsActive).FirstOrDefaultAsync();
            if (user == null) return null;

            if (VerifyPassword(password, user.PasswordHash))
            {
                await UpdateLastLoginAsync(user.IdUser);
                return user;
            }

            return null;
        }

        public async Task<User?> GetUserByIdAsync(string idUser)
        {
            return await _users.Find(u => u.IdUser == idUser && u.IsActive).FirstOrDefaultAsync();
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _users.Find(u => u.Username == username && u.IsActive).FirstOrDefaultAsync();
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _users.Find(u => u.Email == email && u.IsActive).FirstOrDefaultAsync();
        }

        public async Task<User> CreateUserAsync(RegisterDto registerDto)
        {
            // Verificar si el usuario ya existe
            var existingUser = await GetUserByUsernameAsync(registerDto.Username);
            if (existingUser != null)
                throw new InvalidOperationException("Username already exists");

            existingUser = await GetUserByEmailAsync(registerDto.Email);
            if (existingUser != null)
                throw new InvalidOperationException("Email already exists");

            var user = new User
            {
                IdUser = Guid.NewGuid().ToString(),
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = HashPassword(registerDto.Password),
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            await _users.InsertOneAsync(user);
            return user;
        }

        public async Task<bool> UpdateUserPreferencesAsync(string idUser, UpdatePreferencesDto preferences)
        {
            var update = Builders<User>.Update
                .Set(u => u.Preferences.Theme, preferences.Theme ?? "light")
                .Set(u => u.Preferences.Notifications, preferences.Notifications ?? true)
                .Set(u => u.Preferences.Language, preferences.Language ?? "en");

            var result = await _users.UpdateOneAsync(u => u.IdUser == idUser, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> AddFavoritePropertyAsync(string idUser, string propertyId)
        {
            var update = Builders<User>.Update.AddToSet(u => u.FavoriteProperties, propertyId);
            var result = await _users.UpdateOneAsync(u => u.IdUser == idUser, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> RemoveFavoritePropertyAsync(string idUser, string propertyId)
        {
            var update = Builders<User>.Update.Pull(u => u.FavoriteProperties, propertyId);
            var result = await _users.UpdateOneAsync(u => u.IdUser == idUser, update);
            return result.ModifiedCount > 0;
        }

        public async Task<List<PropertyDto>> GetFavoritePropertiesAsync(string idUser)
        {
            var user = await GetUserByIdAsync(idUser);
            if (user == null) return new List<PropertyDto>();

            var properties = new List<PropertyDto>();
            foreach (var propertyId in user.FavoriteProperties)
            {
                var property = await _propertyService.GetPropertyByIdAsync(propertyId);
                if (property != null)
                    properties.Add(property);
            }

            return properties;
        }

        public async Task<bool> UpdateLastLoginAsync(string idUser)
        {
            var update = Builders<User>.Update.Set(u => u.LastLogin, DateTime.UtcNow);
            var result = await _users.UpdateOneAsync(u => u.IdUser == idUser, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> UpdateUserProfileAsync(string idUser, UpdateProfileDto profileDto)
        {
            try
            {
            // Update user profile
                
                // Use UpdateOneAsync instead of ReplaceOneAsync
                var filter = Builders<User>.Filter.Eq(u => u.IdUser, idUser);
                var update = Builders<User>.Update
                    .Set(u => u.FirstName, profileDto.FirstName?.Trim() ?? string.Empty)
                    .Set(u => u.LastName, profileDto.LastName?.Trim() ?? string.Empty)
                    .Set(u => u.Avatar, string.IsNullOrEmpty(profileDto.Avatar) ? null : profileDto.Avatar);

                var result = await _users.UpdateOneAsync(filter, update);
                
                return result.ModifiedCount > 0;
            }
            catch (Exception)
            {
                // Log the exception for debugging
                return false;
            }
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToHexString(hashedBytes).ToLower();
        }

        private bool VerifyPassword(string password, string hash)
        {
            var hashedPassword = HashPassword(password);
            return hashedPassword == hash;
        }
    }
}

