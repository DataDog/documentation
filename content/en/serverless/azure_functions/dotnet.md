---
title: Instrument Azure Functions for .NET
type: multi-code-lang
code_lang: dotnet
code_lang_weight: 40
---

### Tracer/Extension version usage

| OS | Plan | Manual only instrumentation | Automatic instrumentation |
| -- | -- | -- | -- |
| Linux | Consumption (+ Flex) | Tracer v2 | not supported |
| Windows | Consumption (+ Flex) | Tracer v2 | not supported|
| Linux | Basic/Standard/Premium | Tracer v2 | Tracer v3 |
| Windows | Basic/Standard/Premium | [Datadog Windows Extension][1] | [Datadog Windows Extension][1] |

## Setup

1. Add the following packages to your `csproj` file:

   ```
   <PackageReference Include="Datadog.Sma" Version="*" />
   <PackageReference Include="Datadog.Trace.Bundle" Version="*" />
   ```

   Datadog recommends that you pin the package versions and regularly upgrade to the latest versions of both of these packages. This ensures that you have access to enhancements and bug fixes. 
2.
   {{< tabs >}}
   {{% tab "Automatic Instrumentation" %}}
   <div class="alert alert-info">Automatic instrumentation is supported for Linux users on Basic/Standard/Premium plans. Use Datadog .NET Tracing Library v3.</div>

   Set the following environment variables. Replace `<RUNTIME>` with `linux-x64`, `win-x86`, or `win-x64`, depending on the operating system used by your functions.

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH="/home/site/wwwroot/datadog/<RUNTIME>/Datadog.Trace.ClrProfiler.Native.so"
   DD_DOTNET_TRACER_HOME="/home/site/wwwroot/datadog"
   DD_TRACE_HTTP_CLIENT_EXCLUDED_URL_SUBSTRINGS = "monitor.azure, applicationinsights.azure, metadata/instance/compute, admin/host, AzureFunctionsRpcMessages.FunctionRpc"
   ```
   {{% /tab %}}
   {{% tab "Manual instrumentation" %}}
   <div class="alert alert-info">For manual instrumentation, use Datadog .NET Tracing Library v2.</div>
   Add the following line to your main application entry point file:

   ```cpp
   using Datadog.Trace;
   ```

   Next, wrap your function handlers with the Datadog Tracing Library. For example:

   ```cpp
   using Datadog.Trace;
   using Microsoft.Azure.Functions.Worker;
   using Microsoft.Extensions.Logging;
   using Microsoft.AspNetCore.Http;
   using Microsoft.AspNetCore.Mvc;

   namespace helloWorldDotNetIsolated
   {
       public class HttpExample
       {
           private readonly ILogger<HttpExample> _logger;

           public HttpExample(ILogger<HttpExample> logger)
           {
               _logger = logger;
           }

           [Function("HttpExample")]
           public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
           {
               using (var scope = Tracer.Instance.StartActive("example-span"))
               {
                   _logger.LogInformation("C# HTTP trigger function processed a request.");
                   return new OkObjectResult("Welcome to Azure Functions!");
               }
           }
       }
   }
   ```

   Replace `example-span` with the name you want to use for the span in Datadog.

   For more options for configuring the tracer, see [Datadog .NET tracer settings][1].

   [1]: /tracing/trace_collection/library_config/dotnet-core/?tab=environmentvariables
   {{% /tab %}}
   {{< /tabs >}}
3. Configure the following environment variables:

   - `DD_API_KEY`: your [Datadog API key][2]
   - `DD_SITE`: your [Datadog site][3], {{< region-param key="dd_site" code="true" >}}
   - `DD_ENV`: the environment name to use for [Unified Service Tagging][4]
   - `DD_SERVICE`: the service name to use for Unified Service Tagging
   - `DD_VERSION`: the version name to use for Unified Service Tagging
4. To further extend Unified Service Tagging, install the [Datadog Azure integration][5] and set tags on your Azure Functions. This allows for [Azure Function metrics][6] and other Azure metrics to be correlated with traces.

   You can set additional custom tags by using the `DD_TAGS` environment variable:
   ```
   DD_TAGS="key1:value1,key2:value2"
   ```

## Validation

To view the traces in Datadog, go to your [APM Trace Explorer][5] and search for the service you set in the `DD_SERVICE` environment variable.

You can also view traces on the [Serverless Azure Functions][7] page. This view is enriched with telemetry collected by the [Datadog Azure integration][5].

## Additional features

### Enable trace metrics

[Trace metrics][6] are disabled by default. You can enable them with the `DD_TRACE_TRACER_METRICS_ENABLED` environment variable:

```
DD_TRACE_TRACER_METRICS_ENABLED=true
```

### Correlate logs and traces
To inject trace IDs into logs, see [Correlating .NET logs and traces][8].

## Troubleshooting
By default, the Datadog Tracing Library and Datadog Serverless Agent log at the `INFO` level. You can view more granular logs by configuring environment variables.

Enable debug logs for the Datadog Tracing Library with the `DD_TRACE_DEBUG` environment variable:

```
DD_TRACE_DEBUG=true
```

Enable debug logs for the Datadog Serverless Agent with the `DD_LOG_LEVEL` environment variable:

```
DD_LOG_LEVEL=debug
```

Alternatively disable logs for the Datadog Serverless Agent with the `DD_LOG_LEVEL` environment variable:

```
DD_LOG_LEVEL=off
```

[1]: /serverless/azure_app_services/azure_app_services_windows/?tab=net
[2]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: /getting_started/site/
[4]: /getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/apm/traces
[6]: /tracing/metrics/metrics_namespace/
[7]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[8]: /tracing/other_telemetry/connect_logs_and_traces/dotnet