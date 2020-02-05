---
title: Tracing .NET Core Applications
kind: documentation
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

Automatic instrumentation uses the Profiling API provided by .NET Core to modify IL instructions at runtime and inject instrumentation code into your application. With zero code changes and minimal configuration, the .NET Tracer automatically instruments all supported libraries out of the box.

Automatic instrumentation captures:

- Execution time of instrumented libraries
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Installation

{{< tabs >}}

{{% tab ".NET Core on Windows" %}}

Install the .NET Tracer on the host using the [MSI installer for Windows][1]. Choose the installer for the architecture that matches the operating system (x64 or x86).

After installing the .NET Tracer, restart applications so they can read the new environment variables. To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

**Note:** The `Datadog.Trace.ClrProfiler.Managed` NuGet package is no longer required for automatic instrumentation in .NET Core since version `1.11.0` of the .NET Tracer. Instead, a new environment variable, `DD_DOTNET_TRACER_HOME`, was added. See [Required Environment Variables][2]] below for details.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: ?tab=netcoreonwindows#required-environment-variables
{{% /tab %}}

{{% tab ".NET Core on Linux" %}}

Install the .NET Tracer in the environment where your application is running using one of the packages available from the `dd-trace-dotnet` [releases page][1].

For Debian or Ubuntu, download and install the Debian package:

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
```

For CentOS or Fedora, download and install the RPM package

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
sudo rpm -Uvh datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
```

A tar archive is available for other distributions:

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz \
| sudo tar xzf - -C /opt/datadog
```

For Alpine Linux, you also need to install the following packages:

```bash
# All Alpine versions
apk add libc6-compat

# Alpine versions 3.9 and higher
apk add gcompat
```

In addition to installing the .NET Tracer package, several environment variables are required to enabled automatic instrumentation in your application. See [Required Environment Variables][2]] below for details.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: ?tab=netcoreonlinux#required-environment-variables
{{% /tab %}}

{{< /tabs >}}

### Required Environment Variables

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started while these environment variables are set. You should limit profiling only to the applications that need to be traced. **Do not set these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

{{< tabs >}}

{{% tab ".NET Core on Windows" %}}

If your application runs in IIS and you used the MSI installer, you don't need to configure environment variables manually. The .NET Tracer will be enabled after restarting IIS.

To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

If your application runs in IIS, you may skip the rest of this section. For applications _not_ running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

For example, to set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

{{% /tab %}}

{{% tab ".NET Core on Linux" %}}

On Linux, the following environment variables are required to enable automatic instrumentation:

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
`CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
`DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
`DD_DOTNET_TRACER_HOME`    | `/opt/datadog`
```

**Note:** You may need to changed the paths above if you install the .NET Tracer into a non-default path.

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

To set the environment variables for a `systemd` service, use `Environment=`:

```ini
[Unit]
Description=example

[Service]
ExecStart=/usr/bin/dotnet /app/example.dll
Restart=always
Environment=CORECLR_ENABLE_PROFILING=1
Environment=CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
Environment=CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
Environment=DD_INTEGRATIONS=/opt/datadog/integrations.json
Environment=DD_DOTNET_TRACER_HOME=/opt/datadog

[Install]
WantedBy=multi-user.target
```

To set the environment variables on a Linux Docker container, use `ENV`:

```text
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
ENV DD_DOTNET_TRACER_HOME=/opt/datadog

CMD ["dotnet", "example.dll"]
```

{{% /tab %}}

{{< /tabs >}}

### Runtime Compatibility

The .NET Tracer supports automatic instrumentation on .NET Core 2.1, 3.0, and 3.1. It also supports [.NET Framework][9].

**Note:**: The .NET Tracer may work on .NET Core 2.0, but it is not longer supported by Microsoft since it reached the end of life in 2018-10-01. .NET Core 3.0 will also reach end of line in 2020-03-03.

**Note:** In .NET Core 2.1, there is an issue in versions 2.1.0, 2.1.1, and 2.1.2 that can prevent profilers from working correctly. This issue is fixed in .NET Core 2.1.3. See [this GitHub issue][2] for more details.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

### Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library           | NuGet package name                          | Package versions | Integration Name     |
|--------------------------------|---------------------------------------------|------------------|----------------------|
| ASP.NET Core                   | `Microsoft.AspNetCore`                      | 2.0+             | `AspNetCore`         |
| ASP.NET Core MVC               | `Microsoft.AspNetCore.Mvc`                  | 2.0+             | `AspNetCore`         |
| ADO.NET                        | `System.Data.Common`/`System.Data.SqlClient`|                  | `AdoNet`             |
| WebClient / WebRequest         |                                             | 4.0+             | `WebRequest`         |
| HttpClient / HttpClientHandler | `System.Net.Http`                           | 4.0+             | `HttpMessageHandler` |
| Redis (StackExchange client)   | `StackExchange.Redis`                       | 1.0.187+         | `StackExchangeRedis` |
| Redis (ServiceStack client)    | `ServiceStack.Redis`                        | 4.0.48+          | `ServiceStackRedis`  |
| Elasticsearch                  | `NEST` / `Elasticsearch.Net`                | 5.3.0+           | `ElasticsearchNet`   |
| MongoDB                        | `MongoDB.Driver.Core`                       | 2.1.0+           | `MongoDb`            |

**Note**: The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][5] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][6].

### Runtime Compatibility

Manual instrumentation is supported on .NET Framework 4.5+ on Windows and on any platform that implements .NET Standard 2.0 or above:

| Runtime        | Versions | OS                    |
|----------------|----------|-----------------------|
| .NET Framework | 4.5+     | Windows               |
| .NET Core      | 2.0+     | Windows, Linux, macOS |
| Mono           | 5.4+     | Windows, Linux, macOS |

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

**Note**: Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.

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
MyApplication.exe
```

**Note**: To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

On Linux:

```bash
# Set environment variables
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_SERVICE_NAME=MyService
export DD_ADONET_ENABLED=false

# Launch application
dotnet MyApplication.dll
```

{{% /tab %}}

{{% tab "web.config" %}}

_This section applies only applications running on .NET Framework._

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

To configure the Tracer using an JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be a hash with a key/value pair for each setting. For example:

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
| `DD_TRACE_DEBUG`             | N/A                        | Enables or disables the CLR profiler's debug mode. Valid values are: `true` or `false` (default).                                                                                                                                                                                        |
| `DD_TRACE_LOG_PATH`          | N/A                        | Sets the path for the CLR profiler's log file.<br/><br/>Windows default: `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Linux default: `/var/log/datadog/dotnet-profiler.log`                                                                                     |
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
[2]: https://github.com/dotnet/coreclr/issues/18448
[3]: /help
[4]: https://www.nuget.org/packages/Datadog.Trace.ClrProfiler.Managed
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /tracing/manual_instrumentation/?tab=net
[7]: https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support
[8]: /tracing/guide/setting_primary_tags_to_scope/#environment
[9]: /tracing/dotnet-framework
