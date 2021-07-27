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
<div class="alert alert-warning">
  <strong>Notes:</strong><br><ul><li>Datadog automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution in your application environment.</li><li> If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.</li></ul>
</div>

## Compatibility

- The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic).

- The .NET Tracer library for Datadog is open-source. For more information, see the [tracer Github repository][1].

### Supported .NET Core runtimes
The .NET Tracer supports instrumentation on .NET Core 2.1 and above. It also supports [.NET Framework][2].

| Version              | Vendor End of Life |
| -------------------- | ------------------ |
| .NET 5               |                    |
| .NET Core 3.1 (LTS)  | 12/03/2022         |
| .NET Core 3.0        | 03/03/2020         |
| .NET Core 2.2        | 12/23/2019         |
| .NET Core 2.1 (LTS)  | 08/21/2021         |

 Additional information on .NET Core support policy can be found at [Microsoft .NET Core Lifecyle Policy][3]. 

### Supported Processor Architectures

| Processor architectures                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ |
| Windows x86 (`win-x86`)                                                                                            |
| Windows x64 (`win-x64`)                                                                                            |
| Linux x64 (`linux-x64`)                                                                                            |
| Alpine Linux x64 (`linux-musl-x64`)                                                                                |
| Linux ARM64 (`linux-arm64`)<br><br>Added in version 1.27.0, automatic instrumentation only supported on .NET 5.    |


## Integrations

The [latest version of the .NET Tracer][4] can automatically instrument the following libraries:

| Framework or library            | NuGet package                                                                             | Integration Name     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                                     | `AdoNet`             |
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ and 3.0+                   | `AspNetCore`         |
| AWS SQS                         | `AWSSDK.SQS`  3.0+                                                                        | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos.Client` 3.6.0                                                     | `CosmosDb`           |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                                    | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | built-in                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+                                                                       | `AdoNet`             |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `AdoNet`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `AdoNet`             |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+                                                                  | `RabbitMQ`           |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| Service Fabric Remoting         | `Microsoft.ServiceFabric.Services.Remoting` 4.0.470+                                      | `ServiceRemoting`    |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | `AdoNet`             |
| WCF (server)                    | built-in                                                                                  | `Wcf`                |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                                                | `WebRequest`         |

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][5] for help.

## Out of support .NET Core versions

The .NET Tracer works on .NET Core 2.0, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][3] for more details. We recommend using the latest patch version of .NET Core 2.1 or 3.1. Older versions of .NET Core may encounter the following runtime issues when enabling automatic instrumentation:

| Issue                                         | Affected .NET Core Versions               | Solution                                                               | More information                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| JIT Compiler bug on Linux/x64                 | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5  | Upgrade .NET Core to the latest patch version, or follow steps in the linked issue | [DataDog/dd-trace-dotnet/issues/302][6] |
| Resource lookup bug with a non `en-US` locale | 2.0.0                                     | Upgrade .NET Core to 2.0.3 or above                                    | [dotnet/runtime/issues/23938][7]        |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /help/
[6]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[7]: https://github.com/dotnet/runtime/issues/23938
