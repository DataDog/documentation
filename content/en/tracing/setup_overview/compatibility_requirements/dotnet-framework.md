---
title: .NET Framework Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET tracer'
aliases:
  - /tracing/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 80
further_reading:
    - link: 'tracing/setup/dotnet-framework'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatiblity

The .NET Datadog Trace library is open source - view the [Github repository][1] for more information.

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. It also supports [.NET Core][2].

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

## Integrations

The .NET Tracer can instrument the following libraries automatically:

| Framework or library            | NuGet package                  | Integration Name     |
| ------------------------------- | ------------------------------ | -------------------- |
| ASP.NET (including Web Forms)   | built-in                       | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+    | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+ | `AspNetWebApi2`      |
| WCF (server)                    | built-in                       | `Wcf`                |
| ADO.NET                         | built-in                       | `AdoNet`             |
| HttpClient / HttpMessageHandler | built-in                       | `HttpMessageHandler` |
| WebClient / WebRequest          | built-in                       | `WebRequest`         |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+ | `StackExchangeRedis` |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+   | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+     | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+   | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                  | `AdoNet`             |

**Update:** Starting with .NET Tracer version `1.12.0`, the ASP.NET integration is enabled automatically. The NuGet packages `Datadog.Trace.AspNet` or `Datadog.Trace.ClrProfiler.Managed` are no longer required. Remove them from your application when you update the .NET Tracer.

**Note:** The ADO.NET integration instruments calls made through the `DbCommand` abstract class or the `IDbCommand` interface, regardless of the underlying implementation. It also instruments direct calls to `SqlCommand`.

Don’t see your desired frameworks? Datadog is continually adding additional support. To request a framework, contact our awesome [support team][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-core/
[3]: /help/
