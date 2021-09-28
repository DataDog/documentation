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
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
      tag: 'GitHub'
      text: 'Examples of Custom Instrumentation'
---


- The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic).

- The .NET Tracer library for Datadog is open source. For more information, see the [.NET Tracer repository][1].

## Supported .NET Framework runtimes
The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. It also supports [.NET Core][2].

| Version  | Microsoft End of Life |
| -------- | --------------------- |
| 4.8      |                       |
| 4.7.2    |                       |
| 4.7      |                       |
| 4.6.2    |                       |
| 4.6.1    | 04/26/2022            |
| 4.6      | 04/26/2022            |
| 4.5.2    | 04/26/2022            |
| 4.5.1    | 01/12/2016            | 
| 4.5      | 01/12/2016            |

 Additional information on .NET Framework support policy can be found within [Microsoft's .NET Framework Lifecycle Policy][3]. 

## Supported processor architectures
The .NET Tracer supports automatic instrumentation on the following architectures:

| Processor architectures                                                 |
| ------------------------------------------------------------------------|
| Windows x86 (`win-x86`)                                                 |
| Windows x64 (`win-x64`)                                                 |

## Integrations

The [latest version of the .NET Tracer][4] can automatically instrument the following libraries:

| Framework or library            | NuGet package                                                                             | Integration Name     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | built-in                                                                                  | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (including Web Forms)   | built-in                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+                                                               | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+                                                            | `AspNetWebApi2`      |
| AWS SQS                         | `AWSSDK.SQS`  3.0+                                                                        | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos.Client` 3.6.0                                                     | `CosmosDb`           |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                          | `GraphQL`            |
| HttpClient / HttpMessageHandler | built-in                                                                                  | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | built-in                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+                                                                       | `AdoNet`             |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `AdoNet`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `AdoNet`             |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+                                                                  | `RabbitMQ`           |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | `AdoNet`             |
| WCF (server)                    | built-in                                                                                  | `Wcf`                |
| WebClient / WebRequest          | built-in                                                                                  | `WebRequest`         |

Don’t see your desired libraries? Datadog is continually adding additional support. [Check with the Datadog team][5] for help.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-core/
[3]: https://docs.microsoft.com/en-us/lifecycle/products/microsoft-net-framework
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /help/
