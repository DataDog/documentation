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
---
## Compatibility Requirements

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable ingesting 100% of traces and Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in any language, first [install and configure the Datadog Agent][3]. The .NET Tracer runs in-process to instrument your applications and sends traces from your application to the Agent.

**Note**: The .NET Tracer supports all .NET-based languages (C#, F#, Visual Basic, etc).

## Automatic Instrumentation

Automatic instrumentation can collect performance data about your application with zero code changes and minimal configuration. The .NET Tracer automatically instruments all [supported libraries][1] out of the box.

Automatic instrumentation captures:

- Execution time of instrumented calls
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Installation

To use automatic instrumentation on Windows, install the .NET Tracer on the host using the [MSI installer for Windows][4]. Choose the installer for the architecture that matches the operating system (x64 or x86).

After installing the .NET Tracer, restart applications so they can read the new environment variables. To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

### Required Environment Variables

If your application runs in IIS, skip the rest of this section.

For Windows applications **not** running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

| Name                   | Value                                    |
| ---------------------- | ---------------------------------------- |
| `COR_ENABLE_PROFILING` | `1`                                      |
| `COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |

#### Windows Services

To automatically instrument a Windows Service, set the environment variables for that Service in the Windows Registry. Create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key. Then set the key's data to the values in the table:
```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

This can be done either through the Registry Editor as in the image below, or through a PowerShell snippet:

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Registry Editor"  >}}

{{< code-block lang="powershell" filename="add-env-var.ps1" >}}
[String[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
{{< /code-block >}}

#### Console Apps

Set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
example.exe
```

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][5] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][6].

Manual instrumentation is supported on .NET Framework 4.5 and above on Windows, on .NET Core 2.0 and above on Windows and Linux, and on .NET 5 on Windows and Linux.

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

## Configuration

There are multiple ways to configure the .NET Tracer:

- setting environment variables
- in .NET code
- editing the application's `app.config`/`web.config` file (.NET Framework only)
- creating a `datadog.json` file

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

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

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

**Note:** Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.

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

### Configuration Variables

The following tables list the supported configuration variables. Use the first name (e.g. `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. The second name, if present (e.g. `AgentUri`), indicates the name the `TracerSettings` propery to use when changing settings in the code.

#### Unified Service Tagging

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][8] for more details about the `env` tag. Available for versions 1.17.0+                                                           |
| `DD_SERVICE`<br/><br/>`ServiceName`            | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). Available for versions 1.17.0+  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | If specified, sets the version of the service. Available for versions 1.17.0+
| `DD_TAGS`<br/><br/>`GlobalTags`       | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`). Available for versions 1.17.0+                                                                                                                                              |

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][7] documentation for recommendations on how to configure these environment variables.

#### Instrumentation

| Setting Name                                        | Description                                                                                                                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_DEBUG`                                    | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                    |
| `DD_TRACE_HEADER_TAGS`                              | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. (e.g. : `CASE-insensitive-Header:my-tag-name,User-ID:userId`). Available for version 1.18.3+      |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_LOG_DIRECTORY`                                       | Sets the directory for .NET Tracer logs.<br/><br/>Default: `%ProgramData%\Datadog .NET Tracer\logs\`                                                                                                                                                                                     |
| `DD_TRACE_LOG_PATH`                                            | Sets the path for the automatic instrumentation log file and determines the directory of all other .NET Tracer log files. Ignored if `DD_TRACE_LOG_DIRECTORY` is set.                                                                                                                    |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][1] section.                             |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` propery to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. Integration names are listed in the [Integrations][1] section.

| Setting Name                                                            | Description                                                                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-framework
[2]: https://app.datadoghq.com/apm/docs
[3]: https://docs.datadoghq.com/agent/basic_agent_usage/windows/?tab=gui
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /tracing/custom_instrumentation/dotnet/
[7]: /getting_started/tagging/unified_service_tagging/
