using Microsoft.AspNetCore.Mvc;
using PropertyApi.DTOs;
using PropertyApi.Services;

namespace PropertyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;
    private readonly ILogger<PropertiesController> _logger;

    public PropertiesController(IPropertyService propertyService, ILogger<PropertiesController> logger)
    {
        _propertyService = propertyService;
        _logger = logger;
    }

    /// <summary>
    /// Gets all properties with optional filters
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<PropertyDto>>> GetProperties([FromQuery] PropertyFilterDto? filter)
    {
        try
        {
            var properties = await _propertyService.GetAllPropertiesAsync(filter);
            return Ok(properties);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving properties");
            return StatusCode(500, new { message = "An error occurred while retrieving properties", error = ex.Message });
        }
    }

    /// <summary>
    /// Gets a property by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<PropertyDto>> GetProperty(string id)
    {
        try
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            
            if (property == null)
                return NotFound(new { message = $"Property with ID {id} not found" });

            return Ok(property);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving property {PropertyId}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving the property", error = ex.Message });
        }
    }

    /// <summary>
    /// Creates a new property
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<PropertyDto>> CreateProperty([FromBody] PropertyDto propertyDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdProperty = await _propertyService.CreatePropertyAsync(propertyDto);
            return CreatedAtAction(nameof(GetProperty), new { id = createdProperty.IdProperty }, createdProperty);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating property");
            return StatusCode(500, new { message = "An error occurred while creating the property", error = ex.Message });
        }
    }

    /// <summary>
    /// Updates an existing property
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateProperty(string id, [FromBody] PropertyDto propertyDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _propertyService.UpdatePropertyAsync(id, propertyDto);
            
            if (!updated)
                return NotFound(new { message = $"Property with ID {id} not found" });

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating property {PropertyId}", id);
            return StatusCode(500, new { message = "An error occurred while updating the property", error = ex.Message });
        }
    }

    /// <summary>
    /// Deletes a property
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteProperty(string id)
    {
        try
        {
            var deleted = await _propertyService.DeletePropertyAsync(id);
            
            if (!deleted)
                return NotFound(new { message = $"Property with ID {id} not found" });

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting property {PropertyId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the property", error = ex.Message });
        }
    }
}

