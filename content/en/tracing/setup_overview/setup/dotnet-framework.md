---
title: Tracing .NET Framework Applications
kind: documentation
aliases:
    - /tracing/dotnet
    - /tracing/languages/dotnet
    - /tracing/setup/dotnet
    - /tracing/setup_overview/dotnet
    - /agent/apm/dotnet/
    - /tracing/dotnet-framework
    - /tracing/languages/dotnet-framework
    - /tracing/setup/dotnet-framework
    - /agent/apm/dotnet-framework/
    - /tracing/setup_overview/dotnet-framework
    - /tracing/setup_overview/setup/dotnet
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 70
further_reading:
  - link: "/tracing/connect_logs_and_traces/dotnet/"
    tag: "Documentation"
    text: "Connect .NET application logs to traces"
  - link: "/tracing/runtime_metrics/dotnet/"
    tag: "Documentation"
    text: "Runtime metrics"
  - link: "/serverless/azure_app_services/"
    tag: "Documentation"
    text: "Microsoft Azure App Services extension"
  - link: "/tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources, and traces"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/samples"
    tag: "GitHub"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
---
## Compatibility requirements

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Automatic instrumentation

<div class="alert alert-warning"> 
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.
</div>

Follow these instructions to begin tracing .NET applications: 

#### Applications hosted in IIS

To start tracing an application hosted in IIS:

1. Install and configure the [Windows Datadog Agent][2]. 

2. Download the .NET Tracer [MSI installer][3]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

3. Run the .NET Tracer MSI installer with administrator privileges.

4. Stop, then start IIS using the following commands as an administrator: 

    <div class="alert alert-warning"> 
      <strong>Note:</strong> You must use a stop and start command. This is not the same as a reset or restart command.
    </div>

    ```text
    net stop /y was
    net start w3svc
    ```
5. Create application load. 

6. Visit [APM Live Traces][4]. 

#### Applications not hosted in IIS

To enable automatic instrumentation on Windows applications not in IIS, you must set two environment variables before starting your application:

| Name                   | Value                                    |
| ---------------------- | ---------------------------------------- |
| `COR_ENABLE_PROFILING` | `1`                                      |
| `COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |

<div class="alert alert-warning"> 
  <strong>Note:</strong> The .NET runtime tries to load a profiler into any .NET process started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. Don't set these environment variables globally because this causes all .NET processes on the host to load the profiler.
</div>

##### Windows services
To automatically instrument a Windows service, set the `COR_ENABLE_PROFILING` and `COR_PROFILER` environment variables:

1. In the Windows Registry Editor, create a multi-string value named `Environment` in  `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>`
2. Set the value data to: 

   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
     {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Registry Editor"  >}}

Alternatively, you can set the environment variables by using the following PowerShell snippet:

   {{< code-block lang="powershell" filename="add-env-var.ps1" >}}
   [String[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
   {{< /code-block >}}

##### Console applications

To automatically instrument a console application, set the `COR_ENABLE_PROFILING` and `COR_PROFILER` environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
example.exe
```
### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the in-app [Quickstart instructions][2] to enable trace collection within the Datadog Agent.

## Custom instrumentation

<div class="alert alert-warning"> 
  <strong>Note:</strong>  If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.
</div>

To use custom instrumentation in your .NET application:

1. Add the `Datadog.Trace` [NuGet package][5] to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For additional details on custom instrumentation and custom tagging, see [.NET Custom Instrumentation][6]. 

## Configuration

The .NET Tracer has configuration settings which you can set by any of these methods:

- Environment variables
- In the .NET application code
- In the application's `app.config` or `web.config` file (.NET Framework only)
- Using a `datadog.json` file

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the Tracer using environment variables, set the variables before launching the instrumented application.

For example:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

<div class="alert alert-warning"> 
<strong>Note:</strong> To set environment variables for a Windows Service, use the multi-string key <code>HKLM\System\CurrentControlSet\Services\{service name}\Environment</code> in the Windows Registry, as described above.
</div>

{{% /tab %}}

{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` instance from the default configuration sources. Set properties on this `TracerSettings` instance before passing it to a `Tracer` constructor. For example:

<div class="alert alert-warning"> 
  <strong>Note:</strong> Settings must be set on <code>TracerSettings</code> <em>before</em> creating the <code>Tracer</code>. Changes made to <code>TracerSettings</code> properties after the <code>Tracer</code> is created are ignored.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// read default configuration sources (env vars, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// change some settings
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.AgentUri = new Uri("http://localhost:8126/");

// create a new Tracer using these settings
var tracer = new Tracer(settings);

// set the global tracer
Tracer.Instance = tracer;
```

{{% /tab %}}

{{% tab "web.config" %}}

To configure the Tracer using an `app.config` or `web.config` file, use the `<appSettings>` section. For example:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be a hash with a key-value pair for each setting. For example:

```json
{
    "DD_TRACE_AGENT_URL": "http://localhost:8126",
    "DD_ENV": "prod",
    "DD_SERVICE": "MyService",
    "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

## Configuration settings

Using the methods described above, customize your tracing configuration with the variables in the following tables. When adding settings by using environment variables or configuration files, use the first name (for example, `DD_TRACE_AGENT_URL`). When adding settings in code, use the `TracerSettings` property that corresponds to the second name, if present  (for example, `AgentUri`). 

### Unified Service Tagging

To use [Unified Service Tagging][7], configure the following settings for your services. 

| Setting Name                                        |Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. Added in version 1.17.0                                           |
| `DD_SERVICE`<br/><br/>`ServiceName`                 | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). Added in version 1.17.0      |
| `DD_VERSION`<br/><br/>`ServiceVersion`              | If specified, sets the version of the service. Added in version 1.17.0  |

### Additional optional configuration

The following table lists the supported configuration variables that are available for both automatic and custom instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_DEBUG`<br/><br/>`DebugEnabled`            | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                 |
| `DD_TRACE_HEADER_TAGS`<br/><br/> `HeaderTags`       | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. (e.g. : `CASE-insensitive-Header:my-tag-name,User-ID:userId`). Added in version 1.18.3      |
| `DD_TAGS`<br/><br/>`GlobalTags`                     | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`). Added in version 1.17.0                                  |
| `DD_TRACE_LOGGING_RATE`                             | Sets rate limiting for log messages. If set, unique log lines will be written once per `x` seconds. For example, to log a given message once per 60s, set to `60`. Setting to `0` disables log rate limiting. Added in version 1.24.0, disabled by default |
| `DD_TRACE_SERVICE_MAPPING`                          | Rename services using configuration. Accepts a map of service name keys to rename, and the name to use instead, in the format `[from-key]:[to-name]`. For example: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`. `from-key` is specific to the integration type, and should exclude the application name prefix. For example, to rename `my-application-sql-server` to `main-db`, use `sql-server:main-db`. Added in version 1.23.0  |

### Automatic instrumentation optional configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation.

| Setting Name                                                    |Description                                                                                                                                                                                                     |
| --------------------------------------------------------------  | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                      | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_LOG_DIRECTORY`                                        | Sets the directory for .NET Tracer logs.<br/><br/>Default: `%ProgramData%\Datadog .NET Tracer\logs\`                                                                                                                                                                                     |
| `DD_TRACE_LOG_PATH`                                             | Sets the path for the automatic instrumentation log file and determines the directory of all other .NET Tracer log files. Ignored if `DD_TRACE_LOG_DIRECTORY` is set.                                                                                                                    |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames`  | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][8] section.                             |
| `DD_HTTP_CLIENT_ERROR_STATUSES`                                 | Sets status code ranges that will cause HTTP client spans to be marked as errors. Default value is `400-499`. |
| `DD_HTTP_SERVER_ERROR_STATUSES`                                 | Sets status code ranges that will cause HTTP server spans to be marked as errors. Default value is `500-599`. |
| `DD_RUNTIME_METRICS_ENABLED`                                    | Enables .NET runtime metrics. Valid values are `true` or `false`. Default value is `false`. Added in version 1.23.0.
| `DD_TRACE_ADONET_EXCLUDED_TYPES`<br/><br/>`AdoNetExcludedTypes` | Sets a list of `AdoNet` types (for example, `System.Data.SqlClient.SqlCommand`) that will be excluded from automatic instrumentation. |


### Disable integration configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation and can be set for each integration. 

| Setting Name                                                            | Description                                                                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_<INTEGRATION_NAME>_ENABLED`<br/><br/>`Integrations[<INTEGRATION_NAME>].Enabled`                     | Enables or disables a specific integration. Valid values are: `true` (default) or `false`. Integration names are listed in the [Integrations][8] section.                           |

#### Experimental features

The following table below lists configuration variables for features which are available for use, but which may change in a future releases. 

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`    | Enables improved resource names for web spans when set to `true`. Uses route template information where available, adds an additional span for ASP.NET Core integrations, and enables additional tags. Default value is `false`. Added in version 1.26.0             |
| `DD_TRACE_PARTIAL_FLUSH_ENABLED`                    | Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans. Valid values are `true` or `false` (default). Added in version 1.26.0, only compatible with the Datadog Agent 7.26.0+             |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-framework
[2]: https://docs.datadoghq.com/agent/basic_agent_usage/windows/?tab=gui
[3]: https://github.com/datadog/dd-trace-dotnet/releases/latest
[4]: https://app.datadoghq.com/apm/traces
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /tracing/custom_instrumentation/dotnet/
[7]: /getting_started/tagging/unified_service_tagging/
[8]: /tracing/setup_overview/compatibility_requirements/dotnet-framework/#integrations
