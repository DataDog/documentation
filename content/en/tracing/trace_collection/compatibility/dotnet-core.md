---
title: .NET Core Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET tracer'
aliases:
  - /tracing/compatibility_requirements/dotnet-core
  - /tracing/setup_overview/compatibility_requirements/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/dotnet-core'
      tag: 'Documentation'
      text: 'Instrument Your Application'
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
      tag: 'GitHub'
      text: 'Examples of Custom Instrumentation'
    - link: 'https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/'
      tag: 'Blog'
      text: 'Monitor containerized ASP.NET Core applications'
---


The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic). It is open source. For more information, see the [.NET Tracer repository][1].

## Supported .NET Core runtimes

The .NET Tracer supports automatic instrumentation on the following .NET Core versions. It also supports [.NET Framework][2].

| Version              | Microsoft End of Life | Support level        | Package version      |
| -------------------- | --------------------- | -------------------- | -------------------- |
| .NET 7               |                       | [GA](#support-ga)    | latest (>= 2.20.0)   |
| .NET 6               |                       | [GA](#support-ga)    | latest (>= 2.0.0)    |
| .NET 5               |                       | [GA](#support-ga)    | latest (>= 2.0.0)    |
| .NET Core 3.1        | 12/03/2022            | [GA](#support-ga)    | latest               |
| .NET Core 2.1        | 08/21/2021            | [GA](#support-ga)    | latest               |
| .NET Core 3.0        | 03/03/2020            | [EOL](#support-eol)  | Not recommeded       |
| .NET Core 2.2        | 12/23/2019            | [EOL](#support-eol)  | Not recommeded       |
| .NET Core 2.0        | 10/01/2018            | [EOL](#support-eol)  | Not recommeded       |

 Additional information can be found within [Microsoft's .NET Core Lifecycle Policy][3], [End of life APM .NET Core versions](#end-of-life-net-core-versions), and in [Runtime support policy for .NET Core APM](#runtime-support-policy-for-net-core-apm).

## Supported processor architectures

The .NET Tracer supports automatic instrumentation on the following architectures:

| Processor architectures                   | Support level         | Package version                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Windows x86 (`win-x86`)                   | [GA](#support-ga)     | latest                                 |
| Windows x64 (`win-x64`)                   | [GA](#support-ga)     | latest                                 |
| Linux x64 (`linux-x64`)                   | [GA](#support-ga)     | latest                                 |
| Alpine Linux x64 (`linux-musl-x64`)       | [GA](#support-ga)     | latest                                 |
| Linux ARM64 (`linux-arm64`)               | [GA](#support-ga)     | .NET 5+ only, added in version 1.27.0  |

## Integrations

The [latest version of the .NET Tracer][4] can automatically instrument the following libraries:

| Framework or library            | NuGet package                                                                                        | Integration Name     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | All AdoNet integrations                                                                              | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                            | `Aerospike`          |
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ and 3.0+                              | `AspNetCore`         |
| Azure Functions                 | `Microsoft.Azure.Webjobs` 3.0+                                                                       | `AzureFunctions`     |
| AWS SQS                         | `AWSSDK.SQS`  3.0+                                                                                   | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos.Client` 3.6.0+                                                               | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                                          | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                           | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                                     | `GraphQL`            |
| gRPC                            | `Grpc.Net.Client`2.30.0+ (.NET Core 3.0+ only)</br>`Grpc.Core` 2.30.0+</br>`Grpc.AspNetCore` 2.30.0+ | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                               | `HotChocolate`       |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                                               | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                               | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                                         | `MongoDb`            |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                                     | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                                  | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                                        | `Npgsql`             |
| Process                         | `"System.Diagnostics.Process"` 4.0+                                                                  | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+ .                                                                           | `RabbitMQ`           |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+                                                                         | `ServiceStackRedis`  |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+                                                                       | `StackExchangeRedis` |
| Service Fabric Remoting         | `Microsoft.ServiceFabric.Services.Remoting` 4.0.470+                                                 | `ServiceRemoting`    |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                                      | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+        | `SqlClient`          |
| WCF (server)                    | built-in                                                                                             | `Wcf`                |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                                                           | `WebRequest`         |

Don’t see your desired frameworks? Datadog is continually adding additional support. [Check with the Datadog team][5] for help.

## End of life .NET Core versions

The .NET Tracer works on .NET Core 2.0, 2.1, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][3] for more details. Datadog recommends using the latest patch version of .NET Core 3.1, .NET 5, .NET 6, or .NET 7. Older versions of .NET Core may encounter the following runtime issues when enabling automatic instrumentation:

| Issue                                         | Affected .NET Core Versions               | Solution                                                               | More information                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| JIT Compiler bug on Linux/x64                 | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5  | Upgrade .NET Core to the latest patch version, or follow steps in the linked issue | [DataDog/dd-trace-dotnet/issues/302][6] |
| Resource lookup bug with a non `en-US` locale | 2.0.0                                     | Upgrade .NET Core to 2.0.3 or above                                    | [dotnet/runtime/issues/23938][7]        |

## Supported Datadog Agent versions

| **Datadog Agent version**   | **Package version** |
|-----------------------------|---------------------|
| [7.x][8]                    | Latest              |
| [6.x][8]                    | Latest              |
| [5.x][9]                    | Latest              |

## Runtime support policy for .NET Core APM

Datadog APM for .NET Core depends on the host operating system, .NET Core runtime, certain .NET Core libraries, and the Datadog Agent/API. These third party software systems support specific versions of .NET Core. When the external software no longer supports a version of .NET Core, Datadog APM for .NET Core also limits its support for that version.

### Levels of support

| **Level**                                              | **Support provided**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. [Contact customer support for special requests.][10]                                                             |
| <span id="support-beta">Beta</span>                    |  Initial implementation. May not yet contain all features. Support for new features, bug & security fixes provided on a best-effort basis.                                    |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features, bug & security fixes.                                                                                    |
| <span id="support-maintenance">Maintenance</span>      |  Full implementation of existing features. Does not receive new features. Support for bug & security fixes only.                                                              |
| <span id="support-eol">End-of-life (EOL)</span>        |  No support.                                                                                                                                                                  |

### Package versioning

Datadog APM for .NET Core practices [semantic versioning][11].
Version updates imply the following changes to runtime support:

  - **Major version updates** (for example `1.0.0` to `2.0.0`) may change support for any runtime from [Beta](#support-beta)/[GA](#support-ga) to [Maintenance](#support-maintenance)/[EOL](#support-eol).
  - **Minor version updates** (for example `1.0.0` to `1.1.0`) won't lower the level of support for one runtime but may add support for one.
  - **Patch version updates** (for example `1.0.0` to `1.0.1`) will not change support for any runtime.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /help/
[6]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[7]: https://github.com/dotnet/runtime/issues/23938
[8]: /agent/basic_agent_usage/?tab=agentv6v7
[9]: /agent/basic_agent_usage/?tab=agentv5
[10]: https://www.datadoghq.com/support/
[11]: https://semver.org/
