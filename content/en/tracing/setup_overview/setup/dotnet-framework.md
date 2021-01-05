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
    - link: 'https://github.com/DataDog/dd-trace-dotnet'
      tag: 'GitHub'
      text: 'Source code'
    - link: 'https://www.datadoghq.com/blog/net-monitoring-apm/'
      tag: 'Blog'
      text: '.NET monitoring with Datadog APM and distributed tracing'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
    - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/samples"
      tag: "GitHub"
      text: "Examples of Custom Instrumentation"
---
## Compatibility Requirements

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and Getting Started

### Follow the in-app Documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env` and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

### Automatic Instrumentation

<div class="alert alert-warning" style="font-style: italic;"> 
  <p style="font-weight: bold; margin-bottom: 0px;">Note:<p/> 
    When using both custom and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.
</div>

Otherwise, to begin tracing .NET applications: 

#### IIS Applications 

1. Install and configure the [Windows Datadog Agent][2]. 

2. Download the .NET Tracer [MSI installer][3].

3. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

4. Install the .NET Tracer MSI installer with administrator privileges.

5. Restart IIS using the following command within an a: 

   ```text
   net stop /y was
   net start w3svc
   ```
6. Create application load. 

7. Visit Datadog's [APM Live Traces][4]. 

### Required Environment Variables 

<div class="alert alert-warning" style="font-style: italic;"> 
  <p style="font-weight: bold; margin-bottom: 0px;">Note:<p/> The .NET runtime tries to load a profiler into any .NET process started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. 
  <p style="font-weight: bold; margin-bottom: 0px">We do not recommend setting these environment variables globally as this causes all .NET processes on the host to load the profiler.<p/>
</div>

#### Non-IIS Applications

For Windows applications, set these two environment variables before starting your application to enable automatic instrumentation:


| Name                   | Value                                    |
| ---------------------- | ---------------------------------------- |
| `COR_ENABLE_PROFILING` | `1`                                      |
| `COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |


#### Windows Services
To automatically instrument a Windows Service:

1. Set the environment variables for the Service in the Windows Registry.
2. Create a multi-sting value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>`
3. Set the key's data to the value of: 

   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```

Setting the `COR_ENABLE_PROFILING` & `COR_PROFILER` environment variables can be achieved by:

1. Through the Windows Registry Editor:

     {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Registry Editor"  >}}

2. Through a PowerShell snippet:

   {{< code-block lang="powershell" filename="add-env-var.ps1" >}}
   [String[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
   {{< /code-block >}}

#### Console Applications

Set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
example.exe
```

## Custom Instrumentation

<div class="alert alert-warning" style="font-style: italic;"> 
  <p style="font-weight: bold; margin-bottom: 0px;">Note:<p/> 
    When using both custom and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.
</div>

To utilize custom instrumentation: 
1. Add the `Datadog.Trace` [NuGet package][5] to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For additional details on custom instrumentation and custom tagging, please visit our [.NET Custom Instrumentation][6] documentation. 

## Configuration

The .NET Tracer has additional configuration setting which can be set with these methods:

- By setting the environment variables
- The .NET application code
- By editing the application's `app.config`/`web.config` file (.NET Framework only)
- By creating a `datadog.json` file

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

<div class="alert alert-warning" style="font-style: italic;"> 
<p style="font-weight: bold; margin-bottom: 0px;">Note:</p> 

To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.
</div>

{{% /tab %}}

{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` from the default configuration sources. Set properties on this `TracerSettings` instance before passing it to a `Tracer` constructor. For example:

```csharp
using Datadog.Trace;

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

<div class="alert alert-warning" style="font-style: italic;"> 
<p style="font-weight: bold; margin-bottom: 0px;">Note:</p> 

Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.
</div>
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

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be a hash with a key/value pair for each setting. For example:

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

## Configuration Settings

### Unified Service Tagging

To utilize [Unified Service Tagging][7] we recommend that to configure the `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` settings for your services. 

| Setting Name                                        |Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. Available for versions 1.17.0+                                           |
| `DD_SERVICE`<br/><br/>`ServiceName`                 | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). Available for versions 1.17.0+      |
| `DD_VERSION`<br/><br/>`ServiceVersion`              | If specified, sets the version of the service. Available for versions 1.17.0+
| `DD_TAGS`<br/><br/>`GlobalTags`                     | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`). Available for versions 1.17.0+                                                                                                                                              |

### Automatic Instrumentation Optional Configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation.

| Setting Name                                                    |Description                                                                                                                                                                                                     |
| --------------------------------------------------------------  | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                      | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_LOG_DIRECTORY`                                        | Sets the directory for .NET Tracer logs.<br/><br/>Default: `%ProgramData%\Datadog .NET Tracer\logs\`                                                                                                                                                                                     |
| `DD_TRACE_LOG_PATH`                                             | Sets the path for the automatic instrumentation log file and determines the directory of all other .NET Tracer log files. Ignored if `DD_TRACE_LOG_DIRECTORY` is set.                                                                                                                    |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames`  | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][8] section.                             |
| `DD_TRACE_ADONET_EXCLUDED_TYPES`<br/><br/>`AdoNetExcludedTypes` | Sets a list of `AdoNet` types (for example, `System.Data.SqlClient.SqlCommand`) that will be excluded from automatic instrumentation. |

### Additional Optional Configuration

The following table lists the supported configuration variables that are available for both automatic (`.MSI`) and custom (`NuGet`) instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_DEBUG`<br/><br/>`DebugEnabled`           | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                 |
| `DD_TRACE_HEADER_TAGS`<br/><br/> `HeaderTags`       | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. (e.g. : `CASE-insensitive-Header:my-tag-name,User-ID:userId`). Available for version 1.18.3+      |

### Disable Integration Configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation and can be set for each integration. 

Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` propery to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. 

| Setting Name                                                            | Description                                                                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                     | Enables or disables a specific integration. Valid values are: `true` (default) or `false`. Integration names are listed in the [Integrations][8] section.                           |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-framework
[2]: https://docs.datadoghq.com/agent/basic_agent_usage/windows/?tab=gui
[3]: https://github.com/datadog/dd-trace-dotnet/releases/latest
[4]: https://app.datadoghq.com/apm/traces
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /tracing/custom_instrumentation/dotnet/
[7]: /getting_started/tagging/unified_service_tagging/
[8]: /tracing/setup_overview/compatibility_requirements/dotnet-framework/#integrations
