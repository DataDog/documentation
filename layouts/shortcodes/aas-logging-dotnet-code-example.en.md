**Code Example: Microsoft Native Logging**

An example of how to set up logging in a .NET application using Microsoft.Extensions.Logging:

```csharp
using Microsoft.Extensions.Logging;

public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Processing weather forecast request");

        // Your business logic here
        var forecast = GetWeatherForecast();

        _logger.LogInformation("Weather forecast retrieved for user: {UserId}", userId);

        return Ok(forecast);
    }
}
```

**Program.cs configuration**

```csharp
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add structured logging with JSON format
builder.Logging.AddJsonConsole(options =>
{
    options.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true
    };
});

var app = builder.Build();
// ... rest of your application configuration
```

**appsettings.json configuration**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "Console": {
      "FormatterName": "json",
      "FormatterOptions": {
        "IncludeScopes": true,
        "TimestampFormat": "yyyy-MM-dd HH:mm:ss "
      }
    }
  }
}
```

This setup automatically includes trace correlation when `DD_LOGS_INJECTION=true` is set in your Azure App Service Application Settings.
