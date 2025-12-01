---
title: Install Serverless Monitoring for Azure Functions
further_reading:
  - link: "/serverless/guide/disable_serverless"
    tag: "Documentation"
    text: "Disable Serverless Monitoring"
  - link: 'http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/'
    tag: 'Blog'
    text: 'Build secure and scalable Azure serverless applications with the Well-Architected Framework'
---

## Overview
This page explains how to collect traces, trace metrics, runtime metrics, and custom metrics from your Azure Functions. To collect additional metrics, install the [Datadog Azure integration][5].

For .NET Windows Azure Functions on Dedicated/App Service or Premium plans, use the [Datadog .NET APM Extension][9]. For all other runtime, operating system, and hosting plan combinations use the instructions below to install the Serverless Compatibility Layer.

## Setup

If you haven't already, install the [Datadog-Azure integration][5] to collect metrics and logs. Then instrument your application with the following steps:

{{< programming-lang-wrapper langs="nodejs,python,java,dotnet" >}}
{{< programming-lang lang="nodejs" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog recommends pinning the package versions and regularly upgrading to the latest versions of both `@datadog/serverless-compat` and `dd-trace` to ensure you have access to enhancements and bug fixes.

2. **Start the Datadog Serverless Compatibility Layer and initialize the Datadog Node.js tracer**. Add the following lines to your main application entry point file (for example, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module.
   const tracer = require('dd-trace').init()
   ```

3. **Configure the Datadog Node.js tracer**

   [Configuring the Node.js Tracing Library][1]

[1]:/tracing/trace_collection/library_config/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog recommends using the latest versions of both `datadog-serverless-compat` and `ddtrace` to ensure you have access to enhancements and bug fixes.

2. **Start the Datadog Serverless Compatibility Layer and initialize the Datadog Python tracer**. Add the following lines to your main application entry point file:

   ```python
   from datadog_serverless_compat import start
   import ddtrace.auto

   start()
   ```

3. **Configure the Datadog Python tracer**

   [Configuring the Python Tracing Library][1]

[1]:/tracing/trace_collection/library_config/python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **Install dependencies**. Download the Datadog JARs and deploy them with your function:
   ```bash
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   See Datadog's [Maven Repository][1] for any specific version of the Datadog Serverless Compatibility Layer.

   Datadog recommends regularly upgrading to the latest versions of both `dd-serverless-compat-java-agent` and `dd-java-agent` to ensure you have access to enhancements and bug fixes.

2. **Start the Datadog Serverless Compatibility Layer and initialize the Datadog Java tracer**. Add the following `-javaagent` arguments to the JVM options.:

   ```bash
   -javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **Note**: the environment variable to set JVM options depends on the hosting plan (example, Consumption, Elastic Premium, Dedicated). See [Azure Functions Java developer guide][2] for more details on the appropriate environment variable for your hosting plan.

3. **Configure the Datadog Java tracer**

   [Configuring the Java Tracing Library][3]

[1]: https://repo1.maven.org/maven2/com/datadoghq/dd-serverless-compat-java-agent/
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /tracing/trace_collection/library_config/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   dotnet package add Datadog.AzureFunctions
   ```

   Datadog recommends regularly upgrading to the latest version of `Datadog.AzureFunctions` to ensure you have access to enhancements and bug fixes.

2. **Start the Datadog Serverless Compatibility Layer**.

   If your Azure Function app uses the Isolated Worker model, add the following lines to your main application entry point file:
   ```csharp
   Datadog.Serverless.CompatibilityLayer.Start();
   ```

   If your Azure Function app uses the In-Container model, add a NuGet package reference to `Microsoft.Azure.Functions.Extensions`:
   ```shell
   dotnet package add Microsoft.Azure.Functions.Extensions
   ```

   And add the following `.cs` file to your application:
   ```csharp
   using Datadog.Serverless;
   using Microsoft.Azure.Functions.Extensions.DependencyInjection;

   [assembly: FunctionsStartup(typeof(MyFunctionApp.Startup))]

   namespace MyFunctionApp
   {
      public class Startup : FunctionsStartup
      {
         public override void Configure(IFunctionsHostBuilder builder)
         {
               Datadog.Serverless.CompatibilityLayer.Start();
         }
      }
   }
   ```

3. **Configure Automatic Instrumentation**

   If your Azure Function app runs on Windows, add the following environment variables to your Function app:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH_64=
   C:\home\site\wwwroot\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll

   CORECLR_PROFILER_PATH_32=
   C:\home\site\wwwroot\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll

   DD_DOTNET_TRACER_HOME=C:\home\site\wwwroot\datadog

   ```

   If your Azure Function app runs on Linux, add the following environment variables to your Function app:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH=
      /home/site/wwwroot/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so

   DD_DOTNET_TRACER_HOME=/home/site/wwwroot/datadog

   ```

4. **Configure the Datadog .NET tracer**

   - [Configuring the .NET Core Tracing Library][1]
   - [Configuring the .NET Framework Tracing Library][2]

[1]:/tracing/trace_collection/library_config/dotnet-core
[2]:/tracing/trace_collection/library_config/dotnet-framework
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Deploy your function**.

6. **Configure Datadog intake**. Add the following environment variables to your function's application settings:

   | Name | Value |
   | ---- | ----- |
   | `DD_API_KEY` | Your [Datadog API key][1]. |
   | `DD_SITE` | Your [Datadog site][2]. For example, {{< region-param key=dd_site code="true" >}}. |
   | `DD_AZURE_RESOURCE_GROUP` | Your Azure resource group. Only required for Azure Functions on the [Flex Consumption plan][8]. |

7. **Configure Unified Service Tagging**. You can collect metrics from your Azure Functions by installing the [Datadog Azure integration][5]. To correlate these metrics with your traces, first set the `env`, `service`, and `version` tags on your resource in Azure. Then, configure the following environment variables.

   | Name | Value |
   | ---- | ----- |
   | `DD_ENV` | How you want to tag your env for [Unified Service Tagging][7]. For example, `prod`. |
   | `DD_SERVICE` | How you want to tag your service for [Unified Service Tagging][7].  |
   | `DD_VERSION` | How you want to tag your version for [Unified Service Tagging][7]. |

## What's next?

- You can view your Azure Functions traces in [Trace Explorer][3]. Search for the service name you set in the `DD_SERVICE` environment variable to see your traces.
- You can use the [Serverless > Azure Functions][4] page to see your traces enriched with telemetry collected by the [Datadog Azure integration][5].

## Troubleshooting

### Enable debug logs

You can collect [debug logs][6] for troubleshooting. To configure debug logs, use the following environment variables:

`DD_TRACE_DEBUG`
: Enables (`true`) or disables (`false`) debug logging for the Datadog Tracing Library. Defaults to `false`.

  **Values**: `true`, `false`

`DD_LOG_LEVEL`
: Sets logging level for the Datadog Serverless Compatibility Layer. Defaults to `info`.

  **Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

[1]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /getting_started/site
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[5]: /integrations/azure/
[6]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[7]: /getting_started/tagging/unified_service_tagging/
[8]: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan
[9]: /serverless/azure_app_service/windows_code/?tab=net
