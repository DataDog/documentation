---
title: Tracing .NET Applications
kind: documentation
aliases:
  - /tracing/dotnet
  - /tracing/languages/dotnet
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

Automatic instrumentation uses the Profiling API provided by .NET Framework and .NET Core to modify IL instructions at runtime and inject instrumentation code into your application. With zero code changes and minimal configuration, the .NET Tracer automatically instruments all supported libraries out of the box.

Automatic instrumentation captures:

- Execution time of instrumented libraries
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Installation

There are three components needed to enable automatic instrumentation.

- Native COM library that implements the Profiling API (a `.dll` file on Windows or `.so` on Linux) to intercept method calls
- Managed libraries (`Datadog.Trace.dll` and `Datadog.Trace.ClrProfiler.Managed.dll`) that interact with your application to measure method execution time and extract data from method arguments
- Several environment variables that enable the Profiling API and configure the .NET Tracer

How these components are installed on the host depends on the runtime environment:

{{< tabs >}}

{{% tab ".NET Framework on Windows" %}}

Install the .NET Tracer on the host using the [MSI installer for Windows][1]. Choose the platform that matches the OS architecture.

- Native library: deployed into `Program Files` by default and registered as a COM library in the Windows Registry by the MSI installer.
- Managed libraries: deployed into the Global Assembly Cache (GAC) by the MSI installer, where any .NET Framework application can access them.
- Environment variables: added for IIS only by the MSI installer. Applications that do not run in IIS need [additional configuration](?tab=netframeworkonwindows#required-environment-variables) to set these environment variables.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab ".NET Core on Windows" %}}

Install the .NET Tracer on the host using the [MSI installer for Windows][1]. Choose the platform that matches the OS architecture.

- Native library: deployed into `Program Files` by default and registered as a COM library in the Windows Registry by the MSI installer.
- Managed libraries: deployed together with the native library.
- Environment variables: added for IIS only by the MSI installer. Applications that do not run in IIS need [additional configuration](?tab=netcoreonwindows#required-environment-variables) to set these environment variables.

**Note:** The `Datadog.Trace.ClrProfiler.Managed` NuGet package is no longer required for automatic instrumentation in .NET Core after version `1.11.0`. Instead, a new environment variable, `DD_DOTNET_TRACER_HOME`, was added. See [Required Environment Variables](?tab=netcoreonwindows#required-environment-variables) below for details.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
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

For Alpine Linux you also need to install `libc6-compat`

```bash
apk add libc6-compat
```

- Native library: deployed into `/opt/datadog/` by default, or manually if using the `tar` package.
- Managed libraries: deployed together with the native library.
- Environment variables: [additional configuration](?tab=netcoreonlinux#required-environment-variables) required.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{< /tabs >}}

### Required Environment Variables

**Note:** If your application runs on IIS and you used the MSI installer, you don't need to configure environment variables manually and you may skip this section.

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started while these environment variables are set. You should limit profiling only to the applications that need to be traced. **Do not set these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

{{< tabs >}}

{{% tab ".NET Framework on Windows" %}}

If you used the MSI installer on Windows, the required environment variables are already set for IIS. After restarting IIS, the .NET Tracer becomes enabled. If your application runs on IIS and you used the MSI installer, you may skip the rest of this section.

For applications not running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`COR_PROFILER_PATH` is not required because the MSI installer registers the native COM library's path in the Windows Registry, and environment variables `DD_INTEGRATIONS` and `DD_DOTNET_TRACER_HOME` are set globally for all processes.

If you did not use the MSI installer, set all five environment variables:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
COR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer
```

For example, to set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET COR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
set DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer

rem Start application
example.exe
```

**Note**: To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

{{% /tab %}}

{{% tab ".NET Core on Windows" %}}

If you used the MSI installer on Windows, the required environment variables are already set for IIS. After restarting IIS, the .NET Tracer will be enabled. If your application runs on IIS and you used the MSI installer, you may skip the rest of this section.

For applications not running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`CORECLR_PROFILER_PATH` is not required because the MSI installer registers the native COM library's path in the Windows Registry, and environment variables `DD_INTEGRATIONS` and `DD_DOTNET_TRACER_HOME` are set globally for all processes.

If you did not use the MSI installer, set all five environment variables:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer
```

For example, to set them from a batch file before starting your application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET CORECLR_PROFILER_PATH=%PROGRAMFILES%\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=%PROGRAMFILES%\Datadog\.NET Tracer\integrations.json
SET DD_DOTNET_TRACER_HOME=%PROGRAMFILES%\Datadog\.NET Tracer

rem Start application
dotnet.exe example.dll
```

**Note**: To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

{{% /tab %}}

{{% tab ".NET Core on Linux" %}}

On Linux, the following environment variables are required to enable automatic instrumentation:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_INTEGRATIONS=/opt/datadog/integrations.json
DD_DOTNET_TRACER_HOME=/opt/datadog
```

For example, to set them from a bash file before starting your application:

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

To set the environment variables on a Linux container in Docker, use `ENV`:

```text
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
ENV DD_DOTNET_TRACER_HOME=/opt/datadog
```

{{% /tab %}}

{{< /tabs >}}

### Runtime Compatibility

The .NET Tracer supports automatic instrumentation on the following runtimes:

| Runtime                | Versions | OS             |
|------------------------|----------|----------------|
| .NET Framework         | 4.5+     | Windows        |
| .NET Core <sup>1</sup> | 2.0+     | Windows, Linux |

<sup>1</sup> There is an issue in .NET Core versions 2.1.0, 2.1.1, and 2.1.2 that can prevent profilers from working correctly. This issue is fixed in .NET Core 2.1.3. See [this GitHub issue][2] for more details.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

### Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library           | NuGet package name                       | Package versions | Integration Name     |
|--------------------------------|------------------------------------------|------------------|----------------------|
| ASP.NET MVC                    | `Microsoft.AspNet.Mvc`                   | 4.0+             | `AspNetMvc`          |
| ASP.NET Web API 2              | `Microsoft.AspNet.WebApi.Core`           | 5.2+             | `AspNetWebApi2`      |
| ASP.NET Core MVC               | `Microsoft.AspNetCore.Mvc.Core`          | 2.0+             | `AspNetCoreMvc2`     |
| ASP.NET Web Forms              | built-in                                 |                  | `AspNet`             |
| WCF                            | built-in                                 |                  | `Wcf`                |
| ADO.NET <sup>1</sup>           | built-in                                 |                  | `AdoNet`             |
| WebClient / WebRequest         | built-in                                 |                  | `WebRequest`         |
| HttpClient / HttpClientHandler | built-in or `System.Net.Http`            | 4.0+             | `HttpMessageHandler` |
| Redis (StackExchange client)   | `StackExchange.Redis`                    | 1.0.187+         | `StackExchangeRedis` |
| Redis (ServiceStack client)    | `ServiceStack.Redis`                     | 4.0.48+          | `ServiceStackRedis`  |
| Elasticsearch                  | `NEST` / `Elasticsearch.Net`             | 5.3.0+           | `ElasticsearchNet`   |
| MongoDB                        | `MongoDB.Driver` / `MongoDB.Driver.Core` | 2.1.0+           | `MongoDb`            |

<sup>1</sup> The ADO.NET integration tries to instrument **all** ADO.NET providers. Datadog tested SQL Server (`System.Data.SqlClient`) and PostgreSQL (`Npgsql`). Other providers (MySQL, SQLite, Oracle) are untested but should work.

**Note**: The `AspNet` integration adds instrumentation to any ASP.NET application based on `System.Web.HttpApplication`, which can include applications developed with Web Forms, MVC, Web API, and other web frameworks. **To enable the `AspNet` integration, you must add the [`Datadog.Trace.AspNet`][4] NuGet package to your application.** Be sure to keep this package in sync with your MSI version.

To install this package, use one the following commands:

{{< tabs >}}

{{% tab "Package Manager" %}}

```powershell
Install-Package Datadog.Trace.AspNet -Version <TRACER_VERSION>
```

{{% /tab %}}

{{% tab ".NET CLI" %}}

```cmd
dotnet add package Datadog.Trace.AspNet --version <TRACER_VERSION>
```

{{% /tab %}}

{{% tab "Package Reference" %}}

```xml
<PackageReference Include="Datadog.Trace.AspNet" Version="<TRACER_VERSION>" />
```

**Note**: Copy this XML node into your project file.
{{% /tab %}}

{{% tab "Paket CLI" %}}

```cmd
paket add Datadog.Trace.AspNet --version TRACER_VERSION
```

{{% /tab %}}

{{< /tabs >}}

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
