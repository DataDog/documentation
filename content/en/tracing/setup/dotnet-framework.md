---
title: Tracing .NET Framework Applications
kind: documentation
aliases:
  - /tracing/dotnet
  - /tracing/languages/dotnet
  - /tracing/setup/dotnet
  - /agent/apm/dotnet/
further_reading:
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources and traces"
  - link: "tracing/"
    tag: "Advanced Usage"
    text: "Advanced Usage"
---

## Getting Started

<div class="alert alert-info">If you already have a Datadog account you can find step-by-step instructions in our in-app guides for <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=net" target=_blank> host-based</a> and <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=net" target=_blank>container-based</a> set ups.</div>

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1]. The .NET Tracer runs in-process to instrument your applications and sends traces to the Agent.

**Note**: The .NET Tracer supports all .NET-based languages (C#, VB.Net, etc).

## Automatic Instrumentation

Automatic instrumentation uses the Profiling API provided by .NET Framework to modify IL instructions at runtime and inject instrumentation code into your application. With zero code changes and minimal configuration, the .NET Tracer automatically instruments all supported libraries out of the box.

Automatic instrumentation captures:

- Execution time of instrumented libraries
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Installation

Install the .NET Tracer on the host using the [MSI installer for Windows][9]. Choose the installer for the architecture that matches the operating system (x64 or x86).

After installing the .NET Tracer, restart applications so they can read the new environment variables. To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

### Required Environment Variables

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started while these environment variables are set. You should limit instrumentation only to the applications that need to be traced. **Do not set these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

If your application runs in IIS and you used the MSI installer, you don't need to configure environment variables manually. The .NET Tracer will be enabled after restarting IIS.

To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

If your application runs in IIS, you may skip the rest of this section. For applications _not_ running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

For example, to set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
example.exe
```

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

### Runtime Compatibility

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. It also supports [.NET Core][10].

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

### Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library           | NuGet package name                       | Package versions | Integration Name     |
|--------------------------------|------------------------------------------|------------------|----------------------|
| ASP.NET                        | built-in                                 |                  | `AspNet`             |
| ASP.NET MVC                    | `Microsoft.AspNet.Mvc`                   | 4.0+             | `AspNetMvc`          |
| ASP.NET Web API 2              | `Microsoft.AspNet.WebApi`                | 5.1+             | `AspNetWebApi2`      |
| WCF                            | built-in                                 |                  | `Wcf`                |
| ADO.NET                        | built-in or `System.Data.SqlClient`      |                  | `AdoNet`             |
| HttpClient / HttpClientHandler | built-in or `System.Net.Http`            | 4.0+             | `HttpMessageHandler` |
| WebClient / WebRequest         | built-in                                 |                  | `WebRequest`         |
| Redis (StackExchange client)   | `StackExchange.Redis`                    | 1.0.187+         | `StackExchangeRedis` |
| Redis (ServiceStack client)    | `ServiceStack.Redis`                     | 4.0.48+          | `ServiceStackRedis`  |
| Elasticsearch                  | `NEST` / `Elasticsearch.Net`             | 5.3.0+           | `ElasticsearchNet`   |
| MongoDB                        | `MongoDB.Driver.Core`                    | 2.1.0+           | `MongoDb`            |

**Note**: The ASP.NET integration adds instrumentation to any ASP.NET application based on `System.Web.HttpApplication`, which includes applications developed with Web Forms, MVC, Web API, and other web frameworks. The integration for MVC, Web API, and WCF may add additional tags to the root web spand or add child spans to the trace.

**Note**: The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][5] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][6].

### Runtime Compatibility

Manual instrumentation is supported on .NET Framework 4.5 and above on Windows and on .NET Core 2.0 and above on Windows and Linux. Manual instrumentation may also work on other platforms that implements .NET Standard 2.0, but these are not tested by Datadog.

| Runtime        | Versions   | OS                    |
|----------------|------------|-----------------------|
| .NET Framework | 4.5+       | Windows               |
| .NET Core      | 2.0+, 3.0+ | Windows, Linux, macOS |
| Mono           | 5.4+       | Windows, Linux, macOS |

For more details on supported platforms, see the [.NET Standard documentation][7].

## Configuration

There are multiple ways to configure the .NET Tracer:

* in .NET code
* setting environment variables
* editing the application's `app.config`/`web.config` file (.NET Framework only)
* creating a `datadog.json` file

{{< tabs >}}
{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` from the default configuration sources. Set properties on this `TracerSettings` instance before passing it to a `Tracer` constructor. For example:

```csharp
using Datadog.Trace;

// read default configuration sources (env vars, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// change some settings
settings.ServiceName = "MyService";
settings.AgentUri = new Uri("http://localhost:8126/");

// disable the AdoNet integration
settings.Integrations["AdoNet"].Enabled = false;

// create a new Tracer using these settings
var tracer = new Tracer(settings);

// set the global tracer
Tracer.Instance = tracer;
```

**Note**: Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created may be ignored.

{{% /tab %}}

{{% tab "Environment variables" %}}

To configure the Tracer using environment variables, set the variables before launching the instrumented application.

For example:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_SERVICE_NAME=MyService
SET DD_ADONET_ENABLED=false

rem Launch application
example.exe
```

**Note**: To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

{{% /tab %}}

{{% tab "web.config" %}}

To configure the Tracer using an `app.config` or `web.config` file, use the `<appSettings>` section. For example:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_SERVICE_NAME" value="MyService"/>
    <add key="DD_ADONET_ENABLED" value="false"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be a hash with a key/value pair for each setting. For example:

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_SERVICE_NAME": "MyService",
  "DD_ADONET_ENABLED": "false"
}
```

{{% /tab %}}

{{< /tabs >}}

### Configuration Variables

The following tables list the supported configuration variables. In each table, the first column, _Setting Name_, indicates the variable name used when using environment variables or configuration files. The second column, _Property Name_, indicates the name of the equivalent property on the `TracerSettings` class when changing settings in the code.

The first table below lists configuration variables that are available for both automatic and manual instrumentation.

| Setting Name            | Property Name          | Description                                                                                                                                                                                                       |
|-------------------------|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`    | `AgentUri`             | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`         | N/A                    | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`   | N/A                    | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_ENV`                | `Environment`          | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][8] for more details about the `env` tag.                                                              |
| `DD_SERVICE_NAME`       | `ServiceName`          | If specified, sets the default service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). |
| `DD_LOGS_INJECTION`     | `LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_GLOBAL_FLAGS` | `GlobalTags`           | If specified, adds all of the specified tags to all generated spans.                                                                                                                                              |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                 | Property Name              | Description                                                                                                                                                                                                                                                                              |
|------------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`           | `TraceEnabled`             | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_DEBUG`             | N/A                        | Enables or disables debug logs in the Tracer. Valid values are: `true` or `false` (default). Setting this as an environment variable also enabled debug logs in the CLR Profiler.                                                                                                        |
| `DD_TRACE_LOG_PATH`          | N/A                        | Sets the path for the CLR profiler's log file.<br/><br/>Default: `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`                                                                                                                                                            |
| `DD_DISABLED_INTEGRATIONS`   | `DisabledIntegrationNames` | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations](#integrations) section above.           |
| `DD_TRACE_ANALYTICS_ENABLED` | `AnalyticsEnabled`         | Shorthand that enables default App Analytics settings for web framework integrations. Valid values are: `true` or `false` (default).                                                                                                                                                     |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. The first column, _Setting Name_, indicates the variable name used when using environment variables or configuration files. The second column, _Property Name_, indicates the name of the equivalent property on the `IntegrationSettings` class when changing settings in the code. Access these properties through the `TracerSettings.Integrations[string integrationName]` indexer. Integration names are listed in the [Integrations](#integrations) section above.

| Setting Name                             | Property Name         | Description                                                                                                           |
|------------------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_<INTEGRATION>_ENABLED`               | `Enabled`             | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED`     | `AnalyticsEnabled`    | Enables or disable App Analytics for a specific integration. Valid values are: `true` or `false` (default).           |
| `DD_<INTEGRATION>_ANALYTICS_SAMPLE_RATE` | `AnalyticsSampleRate` | Sets the App Analytics sampling rate for a specific integration. A floating number between `0.0` and `1.0` (default). |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces
[3]: /help
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /tracing/manual_instrumentation/?tab=net
[7]: https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support
[8]: /tracing/guide/setting_primary_tags_to_scope/#environment
[9]: https://github.com/DataDog/dd-trace-dotnet/releases
[10]: /tracing/dotnet-core
