---
title: Tracing .NET Applications (Beta)
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
- link: "tracing/advanced_usage/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation and Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1].

## Automatic Instrumentation

Automatic instrumentation uses the [Profiling API][2] provided by .NET Framework and .NET Core to modify IL instructions at run time and inject instrumentation code. With zero code changes or configuration, the .NET tracer automatically instruments all supported libraries out of the box.

To use automatic instrumentation on Windows, download the latest Windows installer from the public [GitHub repository][3]. For Windows services (including web applications running on IIS), rebooting is necessary for these services to pick up the environment variables required by the Profiling API.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data such as URL and status response codes for web requests or SQL query for database access
* Unhandled exceptions, including stacktrace if available
* A total count of traces (requests) flowing through the system

## Compatibility

The .NET tracer supports automatic instrumentation on the following .NET runtimes:

| .NET Runtime   | Versions | OS      | Support Type      |
| :------------- | :------- | :------ | :---------------- |
| .NET Framework | 4.5+     | Windows | Fully supported   |
| .NET Core      | 2.0.x    | Windows | Fully supported   |
| .NET Core      | 2.0.x    | Linux   | Coming soon       |
| .NET Core      | 2.1.3+   |         | Coming soon       |

**Note**: Libraries that target .NET Standard 2.0 are fully supported when running on either .NET Framework 4.6.1+ or .NET Core 2.0.x.

### Integrations

#### Web Framework Compatibility

The .NET tracer can instrument the following web frameworks automatically:

| Web framework    | Versions | Runtime             | OS      | Support Type      |
| :--------------- | :------- | :------------------ | :------ | :---------------- |
| ASP.NET MVC      | 5.2.x    | .NET Framework 4.5+ | Windows | Fully supported   |
| ASP.NET Web API  | 2.2.x    | .NET Framework 4.5+ | Windows | Fully supported   |
| ASP.NET Core MVC | 2.0+     | .NET Framework 4.5+ | Windows | Fully supported   |
| ASP.NET Core MVC | 2.0+     | .NET Core 2.0.x     | Windows | Fully supported   |
| ASP.NET Core MVC | 2.0+     | .NET Core 2.0.x     | Linux   | Coming soon       |

Don't see your desired web frameworks? [Check with the Datadog Support team][5] to see if we can help.

#### Data Store Compatibility

The .NET tracer's ability to automatically instrument data store access depends on the client libraries used:

| Data store    | Library or NuGet package            | Versions | Support type    |
| :---------    | :---------------------------------- | :------- | :-------------- |
| MS SQL Server | Built-in .NET Framework `SqlClient` |          | Fully supported |
| MS SQL Server | `System.Data.SqlClient`             | 4.1+     | Fully supported |
| Redis         | `StackExchange.Redis`               |          | Coming soon     |
| Elasticsearch | `NEST` / `Elasticsearch.Net`        |          | Coming soon     |
| MongoDB       | `MongoDB.Driver`                    |          | Coming soon     |
| PostgreSQL    | `Npgsql`                            |          | Coming soon     |

Don't see your desired data store? [Check with the Datadog Support team][5] to see if we can help.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/setup
[2]: https://docs.microsoft.com/en-us/dotnet/framework/unmanaged-api/profiling/
[3]: https://github.com/DataDog/dd-trace-csharp/releases
[4]: https://www.nuget.org/packages/Datadog.Trace/
[5]: /help
