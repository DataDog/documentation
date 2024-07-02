---
title: .NET and .NET Core Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the .NET Tracer'
aliases:
  - /tracing/compatibility_requirements/dotnet-core
  - /tracing/setup_overview/compatibility_requirements/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: tracing/trace_collection/dd_libraries/dotnet-core
      tag: Documentation
      text: Instrument Your Application
    - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
      tag: ソースコード
      text: Examples of Custom Instrumentation
    - link: "https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/"
      tag: Blog
      text: Monitor containerized ASP.NET Core applications
---


The Datadog .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic). It has [beta support for trimmed apps][12].

The .NET Tracer is open source. For more information, see the [.NET Tracer repository][1].

## Supported .NET and .NET Core runtimes

The .NET Tracer supports automatic instrumentation on the following .NET and .NET Core versions. It also supports [.NET Framework][2].

| .NET Version         | Microsoft End of Life | Support level        | Package version      |
| -------------------- | --------------------- | -------------------- | -------------------- |
| .NET 8               |                       | [GA](#support-ga)    | latest (>= 2.42.0)   |
| .NET 7               | 05/14/2024            | [GA](#support-ga)    | 最新版 (>= 2.20.0)   |
| .NET 6               |                       | [GA](#support-ga)    | 最新版 (>= 2.0.0)    |
| .NET 5               | 05/10/2022            | [GA](#support-ga)    | 最新版 (>= 2.0.0)    |
| .NET Core 3.1        | 12/13/2022            | [GA](#support-ga)    | 最新               |
| .NET Core 2.1        | 08/21/2021            | [GA](#support-ga)    | 最新               |
| .NET Core 3.0        | 03/03/2020            | [EOL](#support-eol)  | 非推奨       |
| .NET Core 2.2        | 12/23/2019            | [EOL](#support-eol)  | 非推奨       |
| .NET Core 2.0        | 10/01/2018            | [EOL](#support-eol)  | 非推奨       |

Additional information can be found in [Microsoft's .NET and .NET Core Lifecycle Policy][3], [End of life .NET runtime versions](#end-of-life-net-runtime-versions), and [.NET runtime support policy](#net-runtime-support-policy).

## 対応プロセッサアーキテクチャー

.NET トレーサーは、次のアーキテクチャーの自動インスツルメンテーションをサポートします:

| プロセッサアーキテクチャー                   | サポートレベル         | パッケージバージョン                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Windows x86 (`win-x86`)                   | [GA](#support-ga)     | 最新                                 |
| Windows x64 (`win-x64`)                   | [GA](#support-ga)     | 最新                                 |
| Linux x64 (`linux-x64`)                   | [GA](#support-ga)     | 最新                                 |
| Alpine Linux x64 (`linux-musl-x64`)       | [GA](#support-ga)     | 最新                                 |
| Linux ARM64 (`linux-arm64`)               | [GA](#support-ga)     | .NET 5+ のみ、バージョン 1.27.0 で追加  |

## インテグレーション

[最新版 .NET トレーサー][4]では、以下のライブラリの自動インスツルメンテーションが可能です。

| フレームワークまたはライブラリ            | NuGet パッケージ                                                                                        | インテグレーション名     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | すべての AdoNet インテグレーション                                                                              | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                            | `Aerospike`          |
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ および 3.0+                              | `AspNetCore`         |
| Azure Functions                 | `Microsoft.Azure.Webjobs` 3.0+                                                                       | `AzureFunctions`     |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2`  3.0+                                                                            | `AwsDynamoDb`        |
| Amazon Kinesis                     | `AWSSDK.Kinesis`  3.0+                                                                               | `AwsKinesis`         |
| Amazon SNS                         | `AWSSDK.SNS`  3.0+                                                                                   | `AwsSns`             |
| Amazon SQS                         | `AWSSDK.SQS`  3.0+                                                                                   | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos` 3.6.0+                                                               | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                                          | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                           | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                                     | `GraphQL`            |
| gRPC                            | `Grpc.Net.Client`2.30.0+ (.NET Core 3.0+ のみ)</br>`Grpc.Core` 2.30.0+</br>`Grpc.AspNetCore` 2.30.0+ | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                               | `HotChocolate`       |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                                               | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                               | `Kafka`              |
| IBM MQ                          | `amqmdnetstd` 9.0.0 以上                                                                      | `IbmMq`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                                         | `MongoDb`            |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                                     | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                                  | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                                        | `Npgsql`             |
| プロセス                         | `"System.Diagnostics.Process"` 4.0+                                                                  | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+                                                                            | `RabbitMQ`           |
| Redis (ServiceStack クライアント)     | `ServiceStack.Redis` 4.0.48+                                                                         | `ServiceStackRedis`  |
| Redis (StackExchange クライアント)    | `StackExchange.Redis` 1.0.187+                                                                       | `StackExchangeRedis` |
| Service Fabric Remoting         | `Microsoft.ServiceFabric.Services.Remoting` 4.0.470+                                                 | `ServiceRemoting`    |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                                      | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+        | WebClient / WebRequest          |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                                                           | `WebRequest`         |

Don't see the library you're looking for? First, check if the library produces observability data compatible with OpenTelemetry (for example, [activity based tracing][13]). If not, Datadog is continually adding additional support. [Check with the Datadog team][5] for help.

## OpenTelemetry based integrations

Some libraries provide built in [Activity based tracing][13]. This is the same mechanism the OpenTelemetry project relies on. By setting `DD_TRACE_OTEL_ENABLED` to `true`, the .NET tracer will automatically resurface traces provided by the libraries themselves. This is possible since [version 2.21.0][4]. Here are a list of libraries that are tested with this setup (more libraries provide such tracing though, they aren't yet expliciitly tested).

| フレームワークまたはライブラリ            | NuGet パッケージ                                                                 | インテグレーション名     | Specific instructions         |
| ------------------------------- | ----------------------------------------------------------------------------- | -------------------- | ----------------------------- |
| Azure Service Bus               | `Azure.Messaging.ServiceBus` 7.14.0+                                          | `AzureServiceBus`    | See `Azure SDK` section below |

### Azure SDK

Azure SDK provides built-in OpenTelemetry support. Enable it by setting the `AZURE_EXPERIMENTAL_ENABLE_ACTIVITY_SOURCE` environment variable to `true` or by setting the `Azure.Experimental.EnableActivitySource` context switch to `true` in your application code. See [Azure SDK documentation][14] for more details.

## End of life .NET runtime versions

The .NET Tracer works on .NET Core 2.0, 2.1, 2.2, 3.0, and 3.1, and on .NET 5 and 7, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][3] for more details. Datadog recommends using the latest patch version of .NET 6 or .NET 8. Older versions of .NET and .NET Core may encounter the following runtime issues when enabling automatic instrumentation:

| 問題                                         | Affected .NET Versions                    | ソリューション                                                               | 詳細                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| Linux/x64 での JIT コンパイラのバグ                 | 2.0.x、</br>2.1.0-2.1.11、</br>2.2.0-2.2.5  | .NET Core を最新のパッチバージョンにアップグレードするか、リンク先の問題の手順に従います | [DataDog/dd-trace-dotnet/issues/302][6] |
| `en-US` 以外のロケールでのリソース参照に関するバグ | 2.0.0                                     | .NET Core を 2.0.3 以上にアップグレードします                                    | [dotnet/runtime/issues/23938][7]        |
| JIT Compiler bug causing crash on shutdown    | 2.0.0-2.2.x                               | Upgrade .NET Core to 3.1.0 or above | [dotnet/runtime/pull/11885][15]   |
| JIT Compiler bug                              | 2.x, 3.x, 5.x, 6.x, 7.x, 8.0.0-8.0.5      | Upgrade .NET to 8.0.6 or above    | [dotnet/runtime/pull/73760][16]   |
| JIT Compiler bug                              | All versions of .NET                      | No current workaround    | [dotnet/runtime/issues/85777][17]   |
| .NET runtime bug causing crashes when used with runtime metrics | 6.0.0-6.0.10            | Upgrade .NET 6.0.11 or above, or disable runtime metrics    | [dotnet/runtime/pull/76431][18]   |

## サポートされている Datadog Agent バージョン

| **Datadog Agent バージョン**   | **パッケージバージョン** |
|-----------------------------|---------------------|
| [7.x][8]                    | 最新              |
| [6.x][8]                    | 最新              |
| [5.x][9]                    | 最新              |

## .NET runtime support policy

The .NET Tracer depends on the host operating system, .NET runtime, certain .NET libraries, and the Datadog Agent/API. These third party software systems support specific versions of .NET and .NET Core. When the external software no longer supports a version of .NET, the .NET Tracer also limits its support for that version.

### サポートレベル

| **レベル**                                              | **サポート内容**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。[特別なご要望はカスタマーサポートにお問い合わせください][10]。                                                             |
| <span id="support-beta">ベータ版</span>                    |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。                                    |
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能、バグ、セキュリティフィックスを完全サポート。                                                                                    |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は受けません。バグフィックス、セキュリティフィックスのみの対応となります。                                                              |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                                                                  |

### パッケージのバージョニング

The .NET Tracer practices [semantic versioning][11].
Version updates imply the following changes to runtime support:

  - **メジャーバージョンアップ** (例えば `1.0.0` から `2.0.0`) により、ランタイムのサポートが[ベータ版](#support-beta)/[GA](#support-ga)から[メンテナンス](#support-maintenance)/[EOL](#support-eol) に変更される場合があります。
  - **マイナーバージョンアップ** (例えば `1.0.0` から `1.1.0`) は、あるランタイムのサポートレベルを下げることはありませんが、あるランタイムのサポートは追加されるかもしれません。
  - **パッチバージョンアップ** (例えば `1.0.0` から `1.0.1`) によって、ランタイムのサポートが変更されることはありません。

## 参考資料

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
[12]: https://www.nuget.org/packages/Datadog.Trace.Trimming/
[13]: https://learn.microsoft.com/en-us/dotnet/core/diagnostics/distributed-tracing
[14]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features
[15]: https://github.com/dotnet/runtime/pull/73760
[16]: https://github.com/dotnet/runtime/issues/11885
[17]: https://github.com/dotnet/runtime/issues/85777
[18]: https://github.com/dotnet/runtime/pull/76431
