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

- The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic).
 
- The .NET Tracer supports instrumentation on:
  - .NET 5
  - .NET Core 3.1
  - .NET Core 2.1. 
  It also supports [.NET Framework][1].

- The .NET Tracer library for Datadog is open-source. For more information see the [tracer Github repository][2].

<div class="alert alert-warning"> 
  <strong>Notes:</strong><br><ul><li>Datadog automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution within your application environment.</li><li> If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.</li></ul>
</div>

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
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+                                                | `RabbitMQ`           |

<div class="alert alert-info">
<strong>Note:</strong> The ADO.NET integration instruments calls made through the <code>DbCommand</code> abstract class or the <code>IDbCommand</code> interface, regardless of the underlying implementation. It also instruments direct calls to <code>SqlCommand</code>.
</div>

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][3] for help.

## Out of Support .NET Core versions

The .NET Tracer works on .NET Core 2.0, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][4] for more details. We recommend using the latest patch version of .NET Core 2.1 or 3.1. Older versions of .NET Core may encounter the following runtime issues when enabling automatic instrumentation:

| Issue                                         | Affected .NET Core Versions               | Solution                                                               | More information                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| JIT Compiler bug on Linux/x64                 | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5  | Upgrade .NET Core to the latest patch version, or follow steps in the linked issue | [DataDog/dd-trace-dotnet/issues/302][5] |
| Resource lookup bug with a non `en-US` locale | 2.0.0                                     | Upgrade .NET Core to 2.0.3 or above                                    | [dotnet/runtime/issues/23938][6]        |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-framework/
[2]: https://github.com/DataDog/dd-trace-dotnet
[3]: /help/
[4]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[5]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[6]: https://github.com/dotnet/runtime/issues/23938
