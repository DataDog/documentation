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
.NET Tracing is in an open Public Beta and will be Generally Available in October 2018.
</div>

## Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1]. The .NET Tracer runs in-process to instrument your applications and sends traces to the Agent.

## Automatic Instrumentation

Automatic instrumentation uses the Profiling API provided by .NET Framework and .NET Core to modify IL instructions at run time and inject instrumentation code. With zero code changes or configuration, the .NET tracer automatically instruments all supported libraries out of the box.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data such as URL and status response codes for web requests or SQL query for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g. web requests) flowing through the system

### Windows

Automatic instrumentation is available on Windows if your application runs on .NET Framework 4.5+ or .NET Core 2.0+. In addition to [installing the Datadog Agent][1], install the .NET Tracer using the [MSI installer for Windows][3].

#### IIS

If your application is hosted on IIS, restart IIS so it loads new environment variables created by the MSI installer. Note that Microsost does [not recommended][9] using `iisreset.exe` to restart IIS. Instead, it is recommended you use the `net stop` and `net start` commands:

```
net stop was /y
net start w3svc
```

#### .NET Core

.NET Core doesn't support the Windows Global Assembly Cache (GAC) used by .NET Framework. To get around this, you can deploy our managed assemblies together with your application by adding the `Datadog.Trace.ClrProfiler.Managed` NuGet package. It is important that the versions of NuGet package and the MSI installer match.

```
dotnet add package Datadog.Trace.ClrProfiler.Managed --version 0.4.1-beta
```

### Linux

Automatic instrumention for .NET Core on Linux is coming soon. To instrument your .NET Core applications on Linux today, use [manual instrumentation][8].

### Runtime Compatibility

The .NET tracer supports automatic instrumentation on the following runtimes:

| Runtime        | Versions | OS                | Support Type      |
| :------------- | :------- | :---------------- | :---------------- |
| .NET Framework | 4.5+     | Windows           | Public Beta       |
| .NET Core      | 2.0+     | Windows           | Public Beta       |
| .NET Core      | 2.0+     | Linux             | Coming soon       |

**Note**: Libraries that target .NET Standard 2.0 are supported when running on either .NET Framework 4.6.1+ or .NET Core 2.0+.

Don’t see your desired frameworks? We’re continually adding additional support. [Check with the Datadog team][5] to see if we can help.

### Web Framework Integrations

The .NET tracer can instrument the following web frameworks automatically:

| Web framework     | Versions  | Runtime             | OS      | Support Type      |
| :---------------- | :-------- | :------------------ | :------ | :---------------- |
| ASP.NET MVC 5     | 5.2+      | .NET Framework 4.5+ | Windows | Public Beta       |
| ASP.NET MVC 4     | 4.0.40804 | .NET Framework 4.5+ | Windows | Public Beta       |
| ASP.NET Web API 2 | 2.2+      | .NET Framework 4.5+ | Windows | Public Beta       |
| ASP.NET Core MVC  | 2.0+      | .NET Framework 4.5+ | Windows | Public Beta       |
| ASP.NET Core MVC  | 2.0+      | .NET Core 2.0.x     | Windows | Public Beta       |
| ASP.NET Core MVC  | 2.0+      | .NET Core 2.0.x     | Linux   | Coming soon       |

Don’t see your desired web frameworks? We’re continually adding additional support. [Check with the Datadog team][5] to see if we can help.

### Data Store Integrations

The .NET tracer's ability to automatically instrument data store access depends on the client libraries used:

| Data store    | Library or NuGet package                          | Versions   | Support type    |
| :---------    | :------------------------------------------------ | :-------   | :-------------- |
| MS SQL Server | `System.Data.SqlClient` (.NET Framework)          | (built-in) | Public Beta     |
| MS SQL Server | `System.Data.SqlClient` (NuGet)                   | 4.1+       | Public Beta     |
| Redis         | `StackExchange.Redis`                             | 1.0-1.2.x  | Public Beta     |
| Redis         | `ServiceStack.Redis`                              | 5.2.x      | Public Beta     |
| Elasticsearch | `NEST` / `Elasticsearch.Net`                      | 6.1.0      | Public Beta     |
| MongoDB       | `MongoDB.Driver`                                  |            | Coming soon     |
| PostgreSQL    | `Npgsql`                                          |            | Coming soon     |

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