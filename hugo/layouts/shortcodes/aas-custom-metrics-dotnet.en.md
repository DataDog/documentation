1. Add the [DogStatsD NuGet package](https://www.nuget.org/packages/DogStatsD-CSharp-Client) to your Visual Studio project.
2. Initialize DogStatsD and write custom metrics in your application.
3. Deploy your code to Azure App Service.
4. If you have not already, install the Datadog App Service extension.

To send metrics, use this code:

```csharp
// Configure your DogStatsd client and configure any tags
if (!DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } }))
{
    // `Configure` returns false if the necessary environment variables are not present.
    // These environment variables are present in Azure App Service, but
    // need to be set in order to test your custom metrics: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
    // Ignore or log the error as it suits you
    Console.WriteLine("Cannot initialize DogstatsD.");
}

// Send a metric
DogStatsd.Increment("sample.startup");
```
