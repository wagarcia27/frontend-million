using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PropertyApi.DTOs;
using PropertyApi.Services;
using System.Security.Claims;

namespace PropertyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserService userService, IJwtService jwtService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _jwtService = jwtService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await _userService.ValidateUserAsync(loginDto.Username, loginDto.Password);
                if (user == null)
                    return Unauthorized(new { message = "Invalid username or password" });

                var token = _jwtService.GenerateToken(user);
                var userDto = MapToUserDto(user);

                return Ok(new AuthResponseDto
                {
                    Token = token,
                    User = userDto,
                    ExpiresAt = DateTime.UtcNow.AddDays(7)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, new { message = "An error occurred during login" });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                var user = await _userService.CreateUserAsync(registerDto);
                var token = _jwtService.GenerateToken(user);
                var userDto = MapToUserDto(user);

                return CreatedAtAction(nameof(GetProfile), new { }, new AuthResponseDto
                {
                    Token = token,
                    User = userDto,
                    ExpiresAt = DateTime.UtcNow.AddDays(7)
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during registration");
                return StatusCode(500, new { message = "An error occurred during registration" });
            }
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetProfile()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var user = await _userService.GetUserByIdAsync(userId);
                if (user == null)
                    return NotFound(new { message = "User not found" });

                return Ok(MapToUserDto(user));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user profile");
                return StatusCode(500, new { message = "An error occurred" });
            }
        }

        [HttpPut("preferences")]
        [Authorize]
        public async Task<IActionResult> UpdatePreferences([FromBody] UpdatePreferencesDto preferences)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var success = await _userService.UpdateUserPreferencesAsync(userId, preferences);
                if (!success)
                    return NotFound(new { message = "User not found" });

                return Ok(new { message = "Preferences updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating preferences");
                return StatusCode(500, new { message = "An error occurred" });
            }
        }

        [HttpPost("favorites/{propertyId}")]
        [Authorize]
        public async Task<IActionResult> AddFavorite(string propertyId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var success = await _userService.AddFavoritePropertyAsync(userId, propertyId);
                if (!success)
                    return NotFound(new { message = "User not found" });

                return Ok(new { message = "Property added to favorites" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding favorite");
                return StatusCode(500, new { message = "An error occurred" });
            }
        }

        [HttpDelete("favorites/{propertyId}")]
        [Authorize]
        public async Task<IActionResult> RemoveFavorite(string propertyId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var success = await _userService.RemoveFavoritePropertyAsync(userId, propertyId);
                if (!success)
                    return NotFound(new { message = "User not found" });

                return Ok(new { message = "Property removed from favorites" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing favorite");
                return StatusCode(500, new { message = "An error occurred" });
            }
        }

        [HttpGet("favorites")]
        [Authorize]
        public async Task<ActionResult<List<PropertyDto>>> GetFavorites()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var favorites = await _userService.GetFavoritePropertiesAsync(userId);
                return Ok(favorites);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting favorites");
                return StatusCode(500, new { message = "An error occurred" });
            }
        }

        [HttpPut("profile/update")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto profileDto)
        {
            try
            {
                var idUser = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (idUser == null) return Unauthorized();

                // Validate input
                if (string.IsNullOrWhiteSpace(profileDto.FirstName))
                    return BadRequest(new { message = "First name is required." });
                
                if (string.IsNullOrWhiteSpace(profileDto.LastName))
                    return BadRequest(new { message = "Last name is required." });

                var success = await _userService.UpdateUserProfileAsync(idUser, profileDto);
                if (!success) return BadRequest(new { message = "Failed to update profile." });

                var updatedUser = await _userService.GetUserByIdAsync(idUser);
                if (updatedUser == null) return NotFound(new { message = "User not found after update." });

            var userProfile = new UserDto
            {
                IdUser = updatedUser.IdUser,
                Username = updatedUser.Username,
                Email = updatedUser.Email,
                FirstName = updatedUser.FirstName,
                LastName = updatedUser.LastName,
                Avatar = updatedUser.Avatar,
                FavoriteProperties = updatedUser.FavoriteProperties,
                Preferences = new UserPreferencesDto
                {
                    Theme = updatedUser.Preferences.Theme,
                    Notifications = updatedUser.Preferences.Notifications,
                    Language = updatedUser.Preferences.Language
                },
                CreatedAt = updatedUser.CreatedAt,
                LastLogin = updatedUser.LastLogin
            };

                return Ok(userProfile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating profile");
                return StatusCode(500, new { message = "An error occurred while updating profile." });
            }
        }

        private UserDto MapToUserDto(Models.User user)
        {
            return new UserDto
            {
                IdUser = user.IdUser,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Avatar = user.Avatar,
                FavoriteProperties = user.FavoriteProperties,
                Preferences = new UserPreferencesDto
                {
                    Theme = user.Preferences.Theme,
                    Notifications = user.Preferences.Notifications,
                    Language = user.Preferences.Language
                },
                CreatedAt = user.CreatedAt,
                LastLogin = user.LastLogin
            };
        }
    }
}

