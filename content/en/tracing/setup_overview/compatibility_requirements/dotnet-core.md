---
title: .NET Core Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET tracer'
aliases:
  - /tracing/compatibility_requirements/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: 'tracing/setup/dotnet-core'
      tag: 'Documentation'
      text: 'Instrument Your Application'
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/samples'
      tag: 'GitHub'
      text: 'Examples of Custom Instrumentation'
---

## Compatibility

The .NET Datadog Trace library is open source - view the [Github repository][1] for more information.

The .NET Tracer supports automatic instrumentation on .NET 5, .NET Core 3.1, and .NET Core 2.1. It also supports [.NET Framework][2].

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

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

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

## Out of Support .NET Core versions

The .NET Tracer works on .NET Core 2.0, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][4] for more details. We recommend using the latest patch version of .NET Core 2.1 or 3.1. Older versions of .NET Core may encounter the following runtime issues when enabling automatic instrumentation:

| Issue                                         | Affected .NET Core Versions               | Workaround                                                             | More information                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| JIT Compiler bug on Linux/x64                 | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5  | Upgrade .NET Core to latest patch, or follow steps in the linked issue | [DataDog/dd-trace-dotnet/issues/302][5] |
| Resource lookup bug with a non `en-US` locale | 2.0.0                                     | Upgrade .NET Core to 2.0.3+                                            | [dotnet/runtime/issues/23938][6]        |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-framework/
[3]: /help/
[4]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[5]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[6]: https://github.com/dotnet/runtime/issues/23938
