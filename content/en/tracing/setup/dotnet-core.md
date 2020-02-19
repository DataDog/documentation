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
  - link: "tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources and traces"
  - link: "tracing/"
    tag: "Advanced Usage"
    text: "Advanced Usage"
---

## Getting Started

<div class="alert alert-info">If you already have a Datadog account you can find step-by-step instructions in our in-app guides for <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=net" target="_blank">host-based</a> and <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=net" target="_blank">container-based</a> set ups.</div>

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1]. The .NET Tracer runs in-process to instrument your applications and sends traces from your application to the Agent.

**Note**: The .NET Tracer supports all .NET-based languages (C#, F#, Visual Basic, etc).

## Automatic Instrumentation

Automatic instrumentation can collect performance data about your application with zero code changes and minimal configuration. The .NET Tracer automatically instruments all [supported libraries][2] out of the box.

Automatic instrumentation captures:

- Execution time of instrumented calls
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

The .NET Tracer supports automatic instrumentation on .NET Core 2.1, 3.0, and 3.1. It also supports [.NET Framework][3].

**Note:** The .NET Tracer works on .NET Core 2.0 and .NET Core 2.2, but these versions reached their end of life and are no longer supported by Microsoft. .NET Core 3.0 will reach end of life on 03/03/2020.

**Note:** Due to several issues in older versions of the .NET Core 2.1 runtime, we strongly recommend .NET Core versions 2.1.12 or higher. For .NET Core 2.2, we recommend version 2.2.6 or higher. See [dotnet/runtime/issues/10506][12] and [DataDog/dd-trace-dotnet/issues/302][13] for more details.

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

To use automatic instrumentation on Linux, install the .NET Tracer in the environment where your application is running using one of the packages available from the `dd-trace-dotnet` [releases page][1].

In addition to installing the .NET Tracer package, several environment variables are required to enabled automatic instrumentation in your application. See [Required Environment Variables][2] below for details.

To generate Tracer log files for troubleshooting, you must create the logs directory. The default path is `/var/log/datadog/`.

**Update:** Starting with .NET Tracer version `1.8.0`, the `Datadog.Trace.ClrProfiler.Managed` NuGet package is no longer required for automatic instrumentation in .NET Core and is deprecated. Remove it from your application when you update the .NET Tracer and add the new environment variable, `DD_DOTNET_TRACER_HOME`. See [Required Environment Variables][2] below for details.

**Update:** .NET Tracer version `1.13.0` adds support for Alpine and other [Musl-based distributions][3].

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

For Alpine or other [Musl-based distributions][3], download the tar archive with the musl-linked binary:

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
[2]: #required-environment-variables
[3]: https://en.wikipedia.org/wiki/Musl

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

To set the environment variables on a Linux Docker container, use [`ENV`][11]:

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
[11]: https://docs.docker.com/engine/reference/builder/#env

{{% /tab %}}

{{< /tabs >}}

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables are set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

### Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library           | NuGet package                                                           | Integration Name     |
|--------------------------------|-------------------------------------------------------------------------|----------------------|
| ASP.NET Core                   | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ and 3.0+ | `AspNetCore`         |
| ADO.NET                        | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                   | `AdoNet`             |
| HttpClient / HttpClientHandler | `System.Net.Http` 4.0+                                                  | `HttpMessageHandler` |
| WebClient / WebRequest         | `System.Net.Requests` 4.0+                                              | `WebRequest`         |
| Redis (StackExchange client)   | `StackExchange.Redis` 1.0.187+                                          | `StackExchangeRedis` |
| Redis (ServiceStack client)    | `ServiceStack.Redis` 4.0.48+                                            | `ServiceStackRedis`  |
| Elasticsearch                  | `Elasticsearch.Net` 5.3.0+                                              | `ElasticsearchNet`   |
| MongoDB                        | `MongoDB.Driver.Core` 2.1.0+                                            | `MongoDb`            |

**Note:** The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][5] for help.

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][6] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][7].

Manual instrumentation is supported on .NET Framework 4.5 and above on Windows and on .NET Core 2.1, 3.0, and 3.1 on Windows and Linux.

## Configuration

There are multiple ways to configure the .NET Tracer:

* in .NET code
* setting environment variables
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

**Note:** Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.

{{% /tab %}}

{{% tab "Environment variables" %}}

To configure the Tracer using environment variables, set the variables before launching the instrumented application.

For example, on Windows:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_SERVICE_NAME=MyService
SET DD_ADONET_ENABLED=false

rem Launch application
example.exe
```

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

On Linux:

```bash
# Set environment variables
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_SERVICE_NAME=MyService
export DD_ADONET_ENABLED=false

# Launch application
dotnet example.dll
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

The following tables list the supported configuration variables. Use the first name (e.g. `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. The second name, if present (e.g. `AgentUri`), indicates the name the `TracerSettings` propery to use when changing settings in the code.

The first table below lists configuration variables that are available for both automatic and manual instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][9] for more details about the `env` tag.                                                              |
| `DD_SERVICE_NAME`<br/><br/>`ServiceName`            | If specified, sets the default service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_GLOBAL_FLAGS`<br/><br/>`GlobalTags`       | If specified, adds all of the specified tags to all generated spans.                                                                                                                                              |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_DEBUG`                                               | Enables or disables debug logs in the Tracer. Valid values are: `true` or `false` (default). Setting this as an environment variable also enabled debug logs in the CLR Profiler.                                                                                                        |
| `DD_TRACE_LOG_PATH`                                            | Sets the path for the CLR profiler's log file.<br/><br/>Windows default: `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Linux default: `/var/log/datadog/dotnet-profiler.log`                                                                                                                         |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations](#integrations) section above.           |
| `DD_TRACE_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`       | Shorthand that enables default App Analytics settings for web framework integrations. Valid values are: `true` or `false` (default).                                                                                                                                                     |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` propery to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. Integration names are listed in the [Integrations](#integrations) section above.

| Setting Name                                                            | Description                                                                                                           |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED`<br/><br/>`AnalyticsEnabled`        | Enables or disable App Analytics for a specific integration. Valid values are: `true` or `false` (default).           |
| `DD_<INTEGRATION>_ANALYTICS_SAMPLE_RATE`<br/><br/>`AnalyticsSampleRate` | Sets the App Analytics sampling rate for a specific integration. A floating number between `0.0` and `1.0` (default). |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces
[2]: #integrations
[3]: /tracing/setup/dotnet-framework
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: /help
[6]: https://www.nuget.org/packages/Datadog.Trace
[7]: /tracing/manual_instrumentation/?tab=net
[8]: https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support
[9]: /tracing/guide/setting_primary_tags_to_scope/#environment

[11]: https://docs.docker.com/engine/reference/builder/#env
[12]: https://github.com/dotnet/runtime/issues/10506
[13]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-511011364
