---
title: Tracing .NET Applications
kind: Documentation
aliases:
  - /tracing/dotnet
  - /tracing/languages/dotnet
further_reading:
  - link: "https://github.com/DataDog/dd-trace-csharp"
    tag: "Github"
    text: Source code
  - link: "tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources and traces"
  - link: "tracing/advanced_usage/?tab=net"
    tag: "Advanced Usage"
    text: "Advanced Usage"
---

<div class="alert alert-warning">
.NET Tracing is in an open Public Beta and will be Generally Available in November 2018.
</div>

## Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1]. The .NET Tracer runs in-process to instrument your applications and sends traces to the Agent.

## Automatic Instrumentation

Automatic instrumentation uses the Profiling API provided by .NET Framework and .NET Core to modify IL instructions at run time and inject instrumentation code. With zero code changes or configuration, the .NET tracer automatically instruments all supported libraries out of the box.

Automatic instrumentation captures:

- Method execution time
- Relevant trace data such as URL and status response codes for web requests or SQL query for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Windows

Automatic instrumentation is available on Windows if your application runs on .NET Framework 4.5+ or .NET Core 2.0+. In addition to [installing the Datadog Agent][1], install the .NET Tracer using the [MSI installer for Windows][3].

#### IIS

If your application is hosted on IIS, restart IIS so it loads new environment variables added by the MSI installer. Note that Microsoft does [not recommend][9] using `iisreset.exe` to restart IIS. Instead, use the `net stop` and `net start` commands:

```
net stop was /y
net start w3svc
```

#### .NET Core

.NET Core doesn't support the Windows Global Assembly Cache (GAC) used by the .NET Framework. Instead, you can deploy Datadog's managed assemblies together with your application by adding the `Datadog.Trace.ClrProfiler.Managed` NuGet package. It is important that you match the versions of the NuGet package and the MSI installer.

For example, if you are using the MSI installer for version `0.5.0-beta`, use:

```
dotnet add package Datadog.Trace.ClrProfiler.Managed --version 0.5.0-beta
```

### Linux

Automatic instrumentation is available on Linux for .NET Core 2.0+. To set up automatic instrumentation, 4 steps are necessary:

#### Install the Datadog Agent

Traces are sent to a local Datadog Agent and then forwarded to Datadog. To install the Agent, follow the [Linux instructions][1].

#### Add the `Datadog.Trace.ClrProfiler.Managed` NuGet Package

To add the `Datadog.Trace.ClrProfiler.Managed` NuGet package to your project run the following:

```bash
dotnet add package Datadog.Trace.ClrProfiler.Managed --version 0.5.0-beta
```

#### Install the `Datadog.Trace.ClrProfiler.Native` Library

Automatic instrumention in Linux is implemented using a shared library available from the `dd-trace-csharp` [releases page][10].

For Debian or Ubuntu, download and install the Debian package:

```bash
curl -LO https://github.com/DataDog/dd-trace-csharp/releases/download/v0.5.0-beta/datadog-dotnet-apm_0.5.0_amd64.deb
sudo apt install ./datadog-dotnet-apm_0.5.0_amd64.deb
```

For CentOS or Fedora, download and install the RPM package

```bash
curl -LO https://github.com/DataDog/dd-trace-csharp/releases/download/v0.5.0-beta/datadog-dotnet-apm-0.5.0-1.x86_64.rpm
sudo rpm -Uvh datadog-dotnet-apm-0.5.0-1.x86_64.rpm
```

A Tar archive is available for other distributions:

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-csharp/releases/download/v0.5.0-beta/datadog-dotnet-apm-0.5.0.tar.gz \
| sudo tar xzf - -C /opt/datadog
```

For Alpine Linux you will also need to install `libc6-compat`

```bash
apk add libc6-compat
```

#### Add Environment Variables

Automatic instrumention for Linux is enabled by setting 4 environment variables:

```bash
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_INTEGRATIONS=/opt/datadog/integrations.json
```

For a systemd service use `Environment=`:

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

[Install]
WantedBy=multi-user.target
```

For Docker use `ENV`:

```text
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
```

### Runtime Compatibility

The .NET tracer supports automatic instrumentation on the following runtimes:

| Runtime        | Versions | OS      | Support Type |
| :------------- | :------- | :------ | :----------- |
| .NET Framework | 4.5+     | Windows | Public Beta  |
| .NET Core      | 2.0+     | Windows | Public Beta  |
| .NET Core      | 2.0+     | Linux   | Public Beta  |

**Note**: Libraries that target .NET Standard 2.0 are supported when running on either .NET Framework 4.6.1+ or .NET Core 2.0+.

Don’t see your desired frameworks? We’re continually adding additional support. [Check with the Datadog team][5] to see if we can help.

### Web Framework Integrations

The .NET tracer can instrument the following web frameworks automatically:

| Web framework     | Versions  | Runtime             | OS      | Support Type |
| :---------------- | :-------- | :------------------ | :------ | :----------- |
| ASP.NET MVC 5     | 5.2+      | .NET Framework 4.5+ | Windows | Public Beta  |
| ASP.NET MVC 4     | 4.0.40804 | .NET Framework 4.5+ | Windows | Public Beta  |
| ASP.NET Web API 2 | 2.2+      | .NET Framework 4.5+ | Windows | Public Beta  |
| ASP.NET Core MVC  | 2.0+      | .NET Framework 4.5+ | Windows | Public Beta  |
| ASP.NET Core MVC  | 2.0+      | .NET Core 2.0+      | Windows | Public Beta  |
| ASP.NET Core MVC  | 2.0+      | .NET Core 2.0+      | Linux   | Public Beta  |

Don’t see your desired web frameworks? We’re continually adding additional support. [Check with the Datadog team][5] to see if we can help.

### Data Store Integrations

The .NET tracer's ability to automatically instrument data store access depends on the client libraries used:

| Data store    | Library or NuGet package                 | Versions   | Support type |
| :------------ | :--------------------------------------- | :--------- | :----------- |
| MS SQL Server | `System.Data.SqlClient` (.NET Framework) | (built-in) | Public Beta  |
| MS SQL Server | `System.Data.SqlClient` (NuGet)          | 4.1+       | Public Beta  |
| Redis         | `StackExchange.Redis`                    | 1.0-1.2.x  | Public Beta  |
| Redis         | `ServiceStack.Redis`                     | 5.2.x      | Public Beta  |
| Elasticsearch | `NEST` / `Elasticsearch.Net`             | 6.1.0      | Public Beta  |
| MongoDB       | `MongoDB.Driver`                         |            | Coming soon  |
| PostgreSQL    | `Npgsql`                                 |            | Coming soon  |

Don’t see your desired data store libraries? We’re continually adding additional support. [Check with the Datadog team][5] to see if we can help.

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` package from [NuGet][4] to your application. In your code, access the global tracer through `Datadog.Trace.Tracer.Instance` to create new spans.

For more details on manual instrumentation and custom tagging, see [Advanced Usage][2].

### Runtime Compatibility

Manual instrumentation is supported on .NET Framework 4.5+ on Windows and on any platform that implements .NET Standard 2.0 or above:

| Runtime        | Versions | OS                    | Support type |
| :------------- | :------- | :-------------------- | :----------- |
| .NET Framework | 4.5+     | Windows               | Public Beta  |
| .NET Core      | 2.0+     | Windows, Linux, macOS | Public Beta  |
| Mono           | 5.4+     | Windows, Linux, macOS | Public Beta  |

For more details on supported platforms, see the [.NET Standard documentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/setup
[2]: /tracing/advanced_usage/?tab=net
[3]: https://github.com/DataDog/dd-trace-csharp/releases
[4]: https://www.nuget.org/packages/Datadog.Trace/
[5]: /help
[6]: https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support
[8]: #manual-instrumentation
[9]: https://support.microsoft.com/en-us/help/969864/using-iisreset-exe-to-restart-internet-information-services-iis-result
[10]: https://github.com/DataDog/dd-trace-csharp/releases/tag/v0.5.0-beta
