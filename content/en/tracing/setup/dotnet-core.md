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

## Getting Started

If you already have a Datadog account you can find [step-by-step instructions][1] in our in-app guides for either host-based or container-based set ups.

Otherwise, to begin tracing applications written in any language, first [install and configure the Datadog Agent][2]. The .NET Tracer runs in-process to instrument your applications and sends traces from your application to the Agent.

**Note**: The .NET Tracer supports all .NET-based languages (C#, F#, Visual Basic, etc).

## Automatic Instrumentation

Automatic instrumentation can collect performance data about your application with zero code changes and minimal configuration. The .NET Tracer automatically instruments all [supported libraries](#integrations) out of the box.

Automatic instrumentation captures:

- Execution time of instrumented calls
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

The .NET Tracer supports automatic instrumentation on .NET Core 2.1, 3.0, and 3.1. It also supports [.NET Framework][3].

**Note:** The .NET Tracer works on .NET Core 2.0, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][4] for more details. We recommend using the latest patch version of .NET Core 2.1 or 3.1.

**Note:** Older versions of .NET Core on Linux/x64 have JIT compiler bugs that can cause applications to throw exceptions when using automatic instrumentation. If your application is running on .NET Core 2.0, 2.1.0-2.1.11, or 2.2.0-2.2.5, we strongly recommend you update your .NET Core runtime. If you cannot update, you may need to set the environment variable `DD_CLR_DISABLE_OPTIMIZATIONS=true` to work around the issue. See [DataDog/dd-trace-dotnet/issues/302][5] for more details.

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

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

For example, to set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

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

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables are set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

### Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library            | NuGet package                                                           | Integration Name     |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ and 3.0+ | `AspNetCore`         |
| ADO.NET                         | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                   | `AdoNet`             |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                  | `HttpMessageHandler` |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                              | `WebRequest`         |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+                                          | `StackExchangeRedis` |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+                                            | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                              | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                            | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                                                           | `AdoNet`             |

**Note:** The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][6] for help. Alternatively, see the [custom instrumentation instructions][7].

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

#### Tagging

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][8] for more details about the `env` tag.                                                              |
| `DD_SERVICE`<br/><br/>`ServiceName`            | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | If specified, sets the version of the service.
| `DD_TAGS`<br/><br/>`GlobalTags`       | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`).                                                                                                                                              |

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][9] documentation for recommendations on how to configure these environment variables.

#### Instrumentation

The following table below lists configuration variables that are available for both automatic and manual instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of `env`, `service`, `version`, trace IDs, and span IDs into application logs.                                                                                                                         |
| `DD_TRACE_DEBUG`                                    | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                 |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_DEBUG`                                               | Enables or disables debug logs in the Tracer. Valid values are: `true` or `false` (default). Setting this as an environment variable also enabled debug logs in the CLR Profiler.                                                                                                        |
| `DD_TRACE_LOG_PATH`                                            | Sets the path for the CLR profiler's log file.<br/><br/>Windows default: `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Linux default: `/var/log/datadog/dotnet/dotnet-profiler.log`                                                                                     |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations](#integrations) section above.           |
| `DD_TRACE_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`       | Shorthand that enables default App Analytics settings for web framework integrations. Valid values are: `true` or `false` (default).                                                                                                                                                     |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` property to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. Integration names are listed in the [Integrations](#integrations) section above. **Note:** On Linux, the names of environment variables are case-sensitive.

| Setting Name                                                            | Description                                                                                                           |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`        | Enables or disable App Analytics for a specific integration. Valid values are: `true` or `false` (default).           |
| `DD_<INTEGRATION>_ANALYTICS_SAMPLE_RATE`<br/><br/>`AnalyticsSampleRate` | Sets the App Analytics sampling rate for a specific integration. A floating number between `0.0` and `1.0` (default). |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /tracing/send_traces/
[3]: /tracing/setup/dotnet-framework/
[4]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[5]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[6]: /help/
[7]: /tracing/manual_instrumentation/dotnet
[8]: /tracing/guide/setting_primary_tags_to_scope/#environment
[9]: /getting_started/tagging/unified_service_tagging
