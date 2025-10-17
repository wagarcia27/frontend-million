using Microsoft.AspNetCore.Mvc;

namespace PropertyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { 
            status = "healthy", 
            timestamp = DateTime.UtcNow,
            service = "Property API",
            version = "1.0.0"
        });
    }

    [HttpGet("ping")]
    public IActionResult Ping()
    {
        return Ok(new { 
            message = "pong", 
            timestamp = DateTime.UtcNow 
        });
    }
}
