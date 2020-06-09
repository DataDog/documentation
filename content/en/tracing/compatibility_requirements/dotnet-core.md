---
title: .NET Core Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET tracer'
further_reading:
    - link: 'tracing/setup/dotnet-core'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

The .NET Tracer supports automatic instrumentation on .NET Core 2.1, 3.0, and 3.1. It also supports [.NET Framework][1].

**Note:** The .NET Tracer works on .NET Core 2.0, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][2] for more details. We recommend using the latest patch version of .NET Core 2.1 or 3.1.

**Note:** Older versions of .NET Core on Linux/x64 have JIT compiler bugs that can cause applications to throw exceptions when using automatic instrumentation. If your application is running on .NET Core 2.0, 2.1.0-2.1.11, or 2.2.0-2.2.5, we strongly recommend you update your .NET Core runtime. If you cannot update, you may need to set the environment variable `DD_CLR_DISABLE_OPTIMIZATIONS=true` to work around the issue. See [DataDog/dd-trace-dotnet/issues/302][3] for more details.

## Integrations

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

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][4] for help.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-framework/
[2]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[3]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[4]: /help/
