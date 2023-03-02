---
title: .NET Framework Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET tracer'
aliases:
  - /tracing/compatibility_requirements/dotnet-framework
  - /tracing/setup_overview/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 80
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/dotnet-framework'
      tag: 'Documentation'
      text: 'Instrument Your Application'
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
      tag: 'GitHub'
      text: 'Examples of Custom Instrumentation'
---


The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic). It is open source. For more information, see the [.NET Tracer repository][1].

## Supported .NET Framework runtimes

The .NET Tracer supports automatic and custom instrumentation on the following .NET Framework versions. It also supports [.NET Core][2].

| .NET Framework Version  | Microsoft End of Life | Support level                       | Package version             | Datadog End of Life |
| ----------------------- | --------------------- | ----------------------------------- | --------------------------- | ------------------- |
| 4.8                     |                       | [GA](#support-ga)                   | latest                      |                     |
| 4.7.2                   |                       | [GA](#support-ga)                   | latest                      |                     |
| 4.7                     |                       | [GA](#support-ga)                   | latest                      |                     |
| 4.6.2                   |                       | [GA](#support-ga)                   | latest                      |                     |
| 4.6.1                   | 04/26/2022            | [GA](#support-ga)                   | latest                      |                     |
| 4.6                     | 04/26/2022            | [EOL](#support-eol)                 | < 2.0.0 (e.g. [1.31.2][3]) | 04/26/2022          |
| 4.5.2                   | 04/26/2022            | [EOL](#support-eol)                 | < 2.0.0 (e.g. [1.31.2][3]) | 04/26/2022          |
| 4.5.1                   | 01/12/2016            | [EOL](#support-eol)                 | < 2.0.0 (e.g. [1.31.2][3]) | 04/26/2022          |
| 4.5                     | 01/12/2016            | [EOL](#support-eol)                 | < 2.0.0 (e.g. [1.31.2][3]) | 04/26/2022          |

Additional information can be found within [Microsoft's .NET Core Lifecycle Policy][4] and in [Runtime support policy for .NET Framework APM](#runtime-support-policy-for-net-framework-apm).

<div class="alert alert-info">
  <div class="alert-info"><b>Note:</b> When deciding which tracer version to use for an automatic instrumentation, use the .NET Framework version installed on the application server. For example, if you compile your application to target .NET Framework 4.5.1, but the application runs on a server that has .NET Framework 4.8 installed, use the latest version of the tracer. To determine which version of .NET Framework is installed on a machine, follow the <a href="https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed">guidance provided by Microsoft</a>.
  </div>
</div>

## Supported processor architectures

The .NET Tracer supports automatic instrumentation on the following architectures:

| Processor architectures                                                 | Support level         | Package version                        |
| ------------------------------------------------------------------------|-----------------------|----------------------------------------|
| Windows x86 (`win-x86`)                                                 | [GA](#support-ga)     | latest                                 |
| Windows x64 (`win-x64`)                                                 | [GA](#support-ga)     | latest                                 |

## Integrations

The [latest version of the .NET Tracer][5] can automatically instrument the following libraries:

| Framework or library            | NuGet package                                                                             | Integration Name     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | All AdoNet integrations                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (including Web Forms)   | built-in                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+                                                               | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+                                                            | `AspNetWebApi2`      |
| AWS SQS                         | `AWSSDK.SQS`  3.0+                                                                        | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos.Client` 3.6.0+                                                    | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                               | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                          | `GraphQL`            |
| gRPC                            | `Grpc.Core` 2.3.0+                                                                        | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                    | `HotChocolate`       |
| HttpClient / HttpMessageHandler | built-in                                                                                  | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | built-in                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `Npgsql`             |
| Process                         | `"System.Diagnostics.Process"` 4.0+                                                       | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+,                                                                 | `RabbitMQ`           |
| Redis (ServiceStack client)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (StackExchange client)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | `SqlClient`     |
| WCF (server)                    | built-in                                                                                  | `Wcf`                |
| WebClient / WebRequest          | built-in                                                                                  | `WebRequest`         |

Don’t see your desired libraries? Datadog is continually adding additional support. [Check with the Datadog team][6] for help.

## Supported Datadog Agent versions

| **Datadog Agent version**   | **Package version** |
|-----------------------------|---------------------|
| [7.x][7]                   | latest              |
| [6.x][7]                   | latest              |
| [5.x][8]                   | latest              |

## Runtime support policy for .NET Framework APM

Datadog APM for .NET Framework depends on the host operating system, .NET Framework runtime, certain .NET Framework libraries, and the Datadog Agent/API. These third party software systems support specific versions of .NET Framework. When the external software no longer supports a version of .NET Framework, Datadog APM for .NET Framework also limits its support for that version.

### Levels of support

| **Level**                                              | **Support provided**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. [Contact customer support for special requests.][9]                                                             |
| <span id="support-beta">Beta</span>                    |  Initial implementation. May not yet contain all features. Support for new features, bug & security fixes provided on a best-effort basis.                                    |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features, bug & security fixes.                                                                                    |
| <span id="support-maintenance">Maintenance</span>      |  Full implementation of existing features. Does not receive new features. Support for bug & security fixes only.                                                              |
| <span id="support-eol">End-of-life (EOL)</span>        |  No support.                                                                                                                                                                  |

### Package versioning

Datadog APM for .NET Framework practices [semantic versioning][10].
Version updates imply the following changes to runtime support:

  - **Major version updates** (for example `1.0.0` to `2.0.0`) may change support for any runtime from [Beta](#support-beta)/[GA](#support-ga) to [Maintenance](#support-maintenance)/[EOL](#support-eol).
  - **Minor version updates** (for example `1.0.0` to `1.1.0`) won't lower the level of support for one runtime but may add support for one.
  - **Patch version updates** (for example `1.0.0` to `1.0.1`) will not change support for any runtime.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-core/
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.31.2
[4]: https://docs.microsoft.com/en-us/lifecycle/products/microsoft-net-framework
[5]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[6]: /help/
[7]: /agent/basic_agent_usage/?tab=agentv6v7
[8]: /agent/basic_agent_usage/?tab=agentv5
[9]: https://www.datadoghq.com/support/
[10]: https://semver.org/
