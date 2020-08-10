---
title: Tracing .NET Core Applications
kind: documentation
aliases:
  - /tracing/dotnet-core
  - /tracing/languages/dotnet-core
  - /tracing/setup/dotnet-core
  - /agent/apm/dotnet-core/
further_reading:
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "/tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources and traces"
  - link: "/tracing/"
    tag: "Advanced Usage"
    text: "Advanced Usage"
---

## Compatibility

The .NET Tracer supports automatic instrumentation on .NET Core 2.1 and 3.1, as well as Microsoft-deprecated versions 2.0, 2.2 and 3.0.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Getting Started

If you already have a Datadog account you can find [step-by-step instructions][2] in our in-app guides for either host-based or container-based set ups.

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

{{< tabs >}}

{{% tab "Windows" %}}

To use automatic instrumentation on Windows, install the .NET Tracer on the host using the [MSI installer for Windows][1]. Choose the installer for the architecture that matches the operating system (x64 or x86).

After installing the .NET Tracer, restart applications so they can read the new environment variables. To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

**Update:** Starting with .NET Tracer version `1.8.0`, the `Datadog.Trace.ClrProfiler.Managed` NuGet package is no longer required for automatic instrumentation in .NET Core. Remove it from your application when you update the .NET Tracer.


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

To use automatic instrumentation on Linux, follow these three steps:

1. Install the .NET Tracer in the environment where your application is running using one of the packages available from the `dd-trace-dotnet` [releases page][1].

2. Create the required environment variables. See [Required Environment Variables](#required-environment-variables) below for details.

3. Run the `/opt/datadog/createLogPath.sh` script, which creates a directory for the log files and sets appropriate directory permissions. The default directory for log files is `/var/log/datadog/dotnet`.

**Update:** Starting with .NET Tracer version `1.8.0`, the `Datadog.Trace.ClrProfiler.Managed` NuGet package is no longer required for automatic instrumentation in .NET Core and is deprecated. Remove it from your application when you update the .NET Tracer and add the new environment variable, `DD_DOTNET_TRACER_HOME`. See [Required Environment Variables](#required-environment-variables) below for details.

**Update:** .NET Tracer version `1.13.0` adds support for Alpine and other [Musl-based distributions][2].

For Debian or Ubuntu, download and install the Debian package:

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
```

For CentOS or Fedora, download and install the RPM package:

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
sudo rpm -Uvh datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
```

For Alpine or other [Musl-based distributions][2], download the tar archive with the musl-linked binary:

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz \
| sudo tar xzf - -C /opt/datadog
```

For other distributions, download the tar archive with the glibc-linked binary:

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz \
| sudo tar xzf - -C /opt/datadog
```


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://en.wikipedia.org/wiki/Musl
{{% /tab %}}

{{< /tabs >}}

### Required Environment Variables

{{< tabs >}}

{{% tab "Windows" %}}

If your application runs in IIS, skip the rest of this section.

For Windows applications **not** running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

#### Windows Services

To automatically instrument a Windows Service, set the environment variables for that Service in the Windows Registry. Create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key. Then set the key's data to the values in the table:
```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

This can be done either through the Registry Editor as in the image below, or through a PowerShell snippet:

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Registry Editor"  >}}

{{< code-block lang="powershell" filename="add-env-var.ps1" >}}
[String[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
{{< /code-block >}}

#### Console Apps

Set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}

{{% tab "Linux" %}}

On Linux, the following environment variables are required to enable automatic instrumentation:

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
`CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
`DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
`DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

**Note:** You must change the paths above if you install the .NET Tracer into a non-default path.

For example, to set the environment variables them from a bash file before starting your application:

```bash
# Set environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_INTEGRATIONS=/opt/datadog/integrations.json
export DD_DOTNET_TRACER_HOME=/opt/datadog

# Start your application
dotnet example.dll
```

To set the environment variables on a Linux Docker container, use [`ENV`][1]:

```docker
# Set environment variables
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
ENV DD_DOTNET_TRACER_HOME=/opt/datadog

# Start your application
CMD ["dotnet", "example.dll"]
```

[1]: https://docs.docker.com/engine/reference/builder/#env
{{% /tab %}}

{{< /tabs >}}

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][4] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][5].

Manual instrumentation is supported on .NET Framework 4.5 and above on Windows and on .NET Core 2.1, 3.0, and 3.1 on Windows and Linux.

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

## Configuration

There are multiple ways to configure the .NET Tracer:

* setting environment variables
* in .NET code
* creating a `datadog.json` file

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the Tracer using environment variables, set the variables before launching the instrumented application.

For example, on Windows:

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

On Linux:

```bash
# Set environment variables
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_ENV=prod
export DD_SERVICE=MyService
export DD_VERSION=abc123

# Launch application
dotnet example.dll
```

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

// disable the AdoNet integration
settings.Integrations["AdoNet"].Enabled = false;

// create a new Tracer using these settings
var tracer = new Tracer(settings);

// set the global tracer
Tracer.Instance = tracer;
```

**Note:** Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.

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
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][8] for more details about the `env` tag.  Available for versions 1.17.0+.                                                            |
| `DD_SERVICE`<br/><br/>`ServiceName`            | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). Available for versions 1.17.0+  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | If specified, sets the version of the service. Available for versions 1.17.0+
| `DD_TAGS`<br/><br/>`GlobalTags`       | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`). Available for versions 1.17.0+                                                                                                                                              |

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][6] documentation for recommendations on how to configure these environment variables.

#### Instrumentation

The following table below lists configuration variables that are available for both automatic and manual instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_GLOBAL_TAGS`<br/><br/>`GlobalTags`        | If specified, adds all of the specified tags to all generated spans.                                                                                                                                              |
| `DD_TRACE_DEBUG`                                    | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                 |
| `DD_TRACE_HEADER_TAGS`                              | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. (e.g. : `CASE-insensitive-Header:my-tag-name,User-ID:userId`). Available for version 1.18.3+  |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_DEBUG`                                               | Enables or disables debug logs in the Tracer. Valid values are: `true` or `false` (default). Setting this as an environment variable also enabled debug logs in the CLR Profiler.                                                                                                        |
| `DD_TRACE_LOG_PATH`                                            | Sets the path for the CLR profiler's log file.<br/><br/>Windows default: `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Linux default: `/var/log/datadog/dotnet/dotnet-profiler.log`                                                                              |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations](#integrations) section above.           |
| `DD_TRACE_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`       | Shorthand that enables default App Analytics settings for web framework integrations. Valid values are: `true` or `false` (default).                                                                                                                                                     |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` property to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. Integration names are listed in the [Integrations][1] section. **Note:** On Linux, the names of environment variables are case-sensitive.

| Setting Name                                                                  | Description                                                                                                           |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |
| `DD_TRACE_<INTEGRATION>_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`        | Enables or disable App Analytics for a specific integration. Valid values are: `true` or `false` (default).           |
| `DD_TRACE_<INTEGRATION>_ANALYTICS_SAMPLE_RATE`<br/><br/>`AnalyticsSampleRate` | Sets the App Analytics sampling rate for a specific integration. A floating number between `0.0` and `1.0` (default). |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-core
[2]: https://app.datadoghq.com/apm/install
[3]: /tracing/send_traces/
[4]: https://www.nuget.org/packages/Datadog.Trace
[5]: /tracing/custom_instrumentation/dotnet/
[6]: /getting_started/tagging/unified_service_tagging/
