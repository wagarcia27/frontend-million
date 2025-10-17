using System.ComponentModel.DataAnnotations;

namespace PropertyApi.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterDto
    {
        [Required]
        [MinLength(3)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserDto User { get; set; } = new UserDto();
        public DateTime ExpiresAt { get; set; }
    }

    public class UserDto
    {
        public string IdUser { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public List<string> FavoriteProperties { get; set; } = new List<string>();
        public UserPreferencesDto Preferences { get; set; } = new UserPreferencesDto();
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLogin { get; set; }
    }

    public class UserPreferencesDto
    {
        public string Theme { get; set; } = "light";
        public bool Notifications { get; set; } = true;
        public string Language { get; set; } = "en";
    }

    public class UpdatePreferencesDto
    {
        public string? Theme { get; set; }
        public bool? Notifications { get; set; }
        public string? Language { get; set; }
    }

    public class UpdateProfileDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Avatar { get; set; }
    }
}

