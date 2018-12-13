---
title: Tracing .NET Applications
kind: Documentation
aliases:
  - /tracing/dotnet
  - /tracing/languages/dotnet
further_reading:
  - link: "https://github.com/DataDog/dd-trace-csharp"
    tag: "Github"
    text: "Source code"
  - link: "tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources and traces"
  - link: "tracing/advanced_usage/?tab=net"
    tag: "Advanced Usage"
    text: "Advanced Usage"
---

<div class="alert alert-warning">
.NET Tracing is in an open Public Beta.
</div>

## Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1]. The .NET Tracer runs in-process to instrument your applications and sends traces to the Agent.

## Automatic Instrumentation

Automatic instrumentation uses the Profiling API provided by .NET Framework and .NET Core to modify IL instructions at runtime and inject instrumentation code into your application. With zero code changes and minimal configuration, the .NET Tracer automatically instruments all supported libraries out of the box.

Automatic instrumentation captures:

- Method execution time
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Installing libraries

There are three components needed to enable automatic instrumentation.

- Native COM library that implements the Profiling API (a `.dll` file on Windows or `.so` on Linux) to intercept method calls
- Managed libraries (`Datadog.Trace.dll` and `Datadog.Trace.ClrProfiler.Managed.dll`) that interact with your application to measure method execution time and extract data from method arguments
- Several environment variables that enable the Profiling API and configure the .NET Tracer

How these components are installed on the host depends on the runtime environment:

{{< tabs >}}

{{% tab ".NET Framework on Windows" %}}

Install the .NET Tracer on the host using the [MSI installer for Windows][1]. Choose the platform that matches your application: x64 for 64-bits or x86 for 32-bits. You can install both side-by-side if needed.

- Native library: deployed into `Program Files` by default and registered as a COM library in the Windows Registry by the MSI installer.
- Managed libraries: deployed into the Global Assembly Cache (GAC) by the MSI installer, where any .NET Framework application can access them.
- Environment variables: added for IIS only by the MSI installer. Applications that do not run in IIS need [additional configuration][2] to set these environment variables.

[1]: https://github.com/DataDog/dd-trace-csharp/releases
[2]: ?tab=netframeworkonwindows#adding-environment-variables
{{% /tab %}}

{{% tab ".NET Core on Windows" %}}

Install the .NET Tracer on the host using the [MSI installer for Windows][1]. Choose the platform that matches your application: x64 for 64-bits or x86 for 32-bits. You can install both side-by-side if needed.

Add the `Datadog.Trace.ClrProfiler.Managed` [NuGet package][2] to your application, matching the package version to the MSI installer above. Refer to the [NuGet documentation][3] for instructions on how to add a NuGet package to your application.

- Native library: deployed into `Program Files` by default and registered as a COM library in the Windows Registry by the MSI installer.
- Managed libraries: deployed together with your application when it is published (via NuGet package).
- Environment variables: added for IIS only by the MSI installer. Applications that do not run in IIS need [additional configuration][4] to set these environment variables.

[1]: https://github.com/DataDog/dd-trace-csharp/releases
[2]: https://www.nuget.org/packages/Datadog.Trace.ClrProfiler.Managed
[3]: https://docs.microsoft.com/en-us/nuget/consume-packages/ways-to-install-a-package
[4]: ?tab=netcoreonwindows#adding-environment-variables
{{% /tab %}}

{{% tab ".NET Core on Linux" %}}

Add the `Datadog.Trace.ClrProfiler.Managed` [NuGet package][1] to your application, matching the package version to the package below. Refer to the [NuGet documentation][2] for instructions on how to add a NuGet package to your application.

Install the .NET Tracer on the host using the using one of the packages available from the `dd-trace-csharp` [releases page][3].

For Debian or Ubuntu, download and install the Debian package:

```bash
curl -LO https://github.com/DataDog/dd-trace-csharp/releases/download/v0.5.2-beta/datadog-dotnet-apm_0.5.2_amd64.deb
sudo dpkg -i ./datadog-dotnet-apm_0.5.2_amd64.deb
```

For CentOS or Fedora, download and install the RPM package

```bash
curl -LO https://github.com/DataDog/dd-trace-csharp/releases/download/v0.5.2-beta/datadog-dotnet-apm-0.5.2-1.x86_64.rpm
sudo rpm -Uvh datadog-dotnet-apm-0.5.2-1.x86_64.rpm
```

A tar archive is available for other distributions:

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-csharp/releases/download/v0.5.2-beta/datadog-dotnet-apm-0.5.2.tar.gz \
| sudo tar xzf - -C /opt/datadog
```

For Alpine Linux you also need to install `libc6-compat`

```bash
apk add libc6-compat
```

- Native library: deployed into `/opt/datadog/` by default, or manually if using the `tar` package.
- Managed libraries: deployed together with your application when it is published (via NuGet package).
- Environment variables: [additional configuration][4] required.

[1]: https://www.nuget.org/packages/Datadog.Trace.ClrProfiler.Managed
[2]: https://docs.microsoft.com/en-us/nuget/consume-packages/ways-to-install-a-package
[3]: https://github.com/DataDog/dd-trace-csharp/releases
[4]: ?tab=netcoreonlinux#adding-environment-variables
{{% /tab %}}

{{< /tabs >}}

### Adding Environment Variables

**Note:** If your application runs on IIS and you used the MSI installer, you don't need to configure environment variables manually and you may skip this section.

**Note:** The profiler tries to attach to _any_ .NET process that is started while these environment variables are set. You should limit profiling only to the applications that need to be traced. **Do not set these environment variables globally as this causes _all_ .NET processes on the host to be profiled.**

{{< tabs >}}

{{% tab ".NET Framework on Windows" %}}

If you used the MSI installer on Windows, the required environment variables are already set for IIS. After restarting IIS, the .NET Tracer becomes enabled. If your application runs on IIS and you used the MSI installer, you may skip the rest of this section.

For applications not running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

```
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`COR_PROFILER_PATH` is not required because the MSI installer registers the native COM library's path in the Windows Registry, and `DD_INTEGRATIONS` is set globally for all processes.

If you did not use the MSI installer, set all four environment variables:

```
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
COR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json
```

For example, to set them from a batch file before starting you application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET COR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json

rem Start application
example.exe
```

For Windows Services, you can set environment variables in the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment`.

{{% /tab %}}

{{% tab ".NET Core on Windows" %}}

If you used the MSI installer on Windows, the required environment variables are already set for IIS. After restarting IIS, the .NET Tracer will be enabled. If your application runs on IIS and you used the MSI installer, you may skip the rest of this section.

For applications not running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

`CORECLR_PROFILER_PATH` is not required because the MSI installer registers the native COM library's path in the Windows Registry, and `DD_INTEGRATIONS` is set globally for all processes.

If you did not use the MSI installer, set all four environment variables:

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json
```

For example, to set them from a batch file before starting you application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET CORECLR_PROFILER_PATH=C:\Program Files\Datadog\.NET Tracer\Datadog.Trace.ClrProfiler.Native.dll
SET DD_INTEGRATIONS=C:\Program Files\Datadog\.NET Tracer\integrations.json

rem Start application
dotnet.exe example.dll
```

For Windows Services, you can set environment variables in the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment`.

{{% /tab %}}

{{% tab ".NET Core on Linux" %}}

On Linux, these four environment variables are required to enable automatic instrumentation:

```
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_INTEGRATIONS=/opt/datadog/integrations.json
```

For example, to set them from a bash file before starting you application:

```bash
# Set environment variables
EXPORT CORECLR_ENABLE_PROFILING=1
EXPORT CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
EXPORT CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
EXPORT DD_INTEGRATIONS=/opt/datadog/integrations.json

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

[Install]
WantedBy=multi-user.target
```

To set the environment variables on a Linux container in Docker, use `ENV`:

```
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
```

{{% /tab %}}

{{< /tabs >}}

### Runtime Compatibility

The .NET tracer supports automatic instrumentation on the following runtimes:

| Runtime        | Versions | OS      | Support Type |
| :------------- | :------- | :------ | :----------- |
| .NET Framework | 4.5+     | Windows | Public Beta  |
| .NET Core      | 2.0+     | Windows | Public Beta  |
| .NET Core      | 2.0+     | Linux   | Public Beta  |

**Note**: Libraries that target .NET Standard 2.0 are supported when running on either .NET Framework 4.6.1+ or .NET Core 2.0+.

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][2] for help.

### Web Framework Integrations

The .NET tracer can instrument the following web frameworks automatically:

| Web framework     | Versions  | Runtime             | OS      | Support Type  |
| :---------------- | :-------- | :------------------ | :------ | :------------ |
| ASP.NET MVC 5     | 5.1.3+    | .NET Framework 4.5+ | Windows | Public Beta   |
| ASP.NET MVC 4     | 4.0.40804 | .NET Framework 4.5+ | Windows | Public Beta   |
| ASP.NET Web API 2 | 2.2+      | .NET Framework 4.5+ | Windows | Public Beta   |
| ASP.NET Web Forms | 4.5+      | .NET Framework 4.5+ | Windows | _Coming soon_ |
| ASP.NET Core MVC  | 2.0+      | .NET Framework 4.5+ | Windows | Public Beta   |
| ASP.NET Core MVC  | 2.0+      | .NET Core 2.0+      | Windows | Public Beta   |
| ASP.NET Core MVC  | 2.0+      | .NET Core 2.0+      | Linux   | Public Beta   |

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][2] for help.

### Data Store Integrations

The .NET tracer's ability to automatically instrument data store access depends on the client libraries used:

| Data store    | Library or NuGet package                 | Versions   | Support type  |
| :------------ | :--------------------------------------- | :--------- | :------------ |
| MS SQL Server | `System.Data.SqlClient` (.NET Framework) | (built-in) | Public Beta   |
| MS SQL Server | `System.Data.SqlClient` (NuGet)          | 4.1+       | Public Beta   |
| Redis         | `StackExchange.Redis`                    | 1.0.187+   | Public Beta   |
| Redis         | `ServiceStack.Redis`                     | 4.0.48+    | Public Beta   |
| Elasticsearch | `NEST` / `Elasticsearch.Net`             | 6.0.0+     | Public Beta   |
| MongoDB       | `MongoDB.Driver`                         |            | _Coming soon_ |
| PostgreSQL    | `Npgsql`                                 |            | _Coming soon_ |

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][2] for help.

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][3] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Advanced Usage][4].

### Runtime Compatibility

Manual instrumentation is supported on .NET Framework 4.5+ on Windows and on any platform that implements .NET Standard 2.0 or above:

| Runtime        | Versions | OS                    | Support type |
| :------------- | :------- | :-------------------- | :----------- |
| .NET Framework | 4.5+     | Windows               | Public Beta  |
| .NET Core      | 2.0+     | Windows, Linux, macOS | Public Beta  |
| Mono           | 5.4+     | Windows, Linux, macOS | Public Beta  |

For more details on supported platforms, see the [.NET Standard documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /help
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: /tracing/advanced_usage/?tab=net
[5]: https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support
