using Microsoft.AspNetCore.Mvc;
using PropertyApi.Models;
using PropertyApi.Services;

namespace PropertyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyTraceController : ControllerBase
    {
        private readonly IPropertyTraceService _traceService;
        private readonly ILogger<PropertyTraceController> _logger;

        public PropertyTraceController(IPropertyTraceService traceService, ILogger<PropertyTraceController> logger)
        {
            _traceService = traceService;
            _logger = logger;
        }

        [HttpGet("property/{propertyId}")]
        [ProducesResponseType(typeof(List<PropertyTrace>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetTracesByProperty(string propertyId)
        {
            try
            {
                var traces = await _traceService.GetTracesByPropertyAsync(propertyId);
                return Ok(traces);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting traces for property {PropertyId}", propertyId);
                return StatusCode(500, "Error getting property traces");
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<PropertyTrace>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllTraces()
        {
            try
            {
                var traces = await _traceService.GetAllTracesAsync();
                return Ok(traces);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all traces");
                return StatusCode(500, "Error getting property traces");
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(PropertyTrace), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> CreateTrace([FromBody] PropertyTrace trace)
        {
            try
            {
                if (trace == null || string.IsNullOrEmpty(trace.Name) || string.IsNullOrEmpty(trace.IdProperty))
                {
                    return BadRequest("Invalid trace data");
                }

                var createdTrace = await _traceService.CreateTraceAsync(trace);
                return CreatedAtAction(nameof(GetTracesByProperty), 
                    new { propertyId = trace.IdProperty }, createdTrace);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating trace");
                return StatusCode(500, "Error creating property trace");
            }
        }

        [HttpDelete("{traceId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> DeleteTrace(string traceId)
        {
            try
            {
                var result = await _traceService.DeleteTraceAsync(traceId);
                if (result)
                    return NoContent();
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting trace {TraceId}", traceId);
                return StatusCode(500, "Error deleting property trace");
            }
        }
    }
}
