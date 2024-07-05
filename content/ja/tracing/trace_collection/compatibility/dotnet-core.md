---
aliases:
- /ja/tracing/compatibility_requirements/dotnet-core
- /ja/tracing/setup_overview/compatibility_requirements/dotnet-core
code_lang: dotnet-core
code_lang_weight: 70
description: .NET トレーサーの互換性要件です。
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-core
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: カスタムインスツルメンテーションの例
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: GitHub
  text: コンテナ化された ASP.NET コアアプリケーションを監視する
title: .NET Core 互換性要件
type: multi-code-lang
---


.NET トレーサーは、すべての .NET ベースの言語 (例えば、C#、F#、Visual Basic など) をサポートしています。[トリミングアプリのベータ版サポート][12]があります。

.NET トレーサーはオープンソースです。詳細については、[.NET トレーサーリポジトリ][1]を参照してください。

## サポートされている .NET Core のランタイム

.NET トレーサーは、以下の .NET Core バージョンでの自動インスツルメンテーションに対応しています。また、[.NET Framework][2] にも対応しています。

| バージョン              | マイクロソフトサポート終了 | サポートレベル        | パッケージバージョン      |
| -------------------- | --------------------- | -------------------- | -------------------- |
| .NET 7               |                       | [GA](#support-ga)    | 最新版 (>= 2.20.0)   |
| .NET 6               |                       | [GA](#support-ga)    | 最新版 (>= 2.0.0)    |
| .NET 5               |                       | [GA](#support-ga)    | 最新版 (>= 2.0.0)    |
| .NET Core 3.1        | 12/03/2022            | [GA](#support-ga)    | 最新               |
| .NET Core 2.1        | 08/21/2021            | [GA](#support-ga)    | 最新               |
| .NET Core 3.0        | 03/03/2020            | [EOL](#support-eol)  | 非推奨       |
| .NET Core 2.2        | 12/23/2019            | [EOL](#support-eol)  | 非推奨       |
| .NET Core 2.0        | 10/01/2018            | [EOL](#support-eol)  | 非推奨       |

その他の情報は、[マイクロソフトの .NET コアライフサイクルポリシー][3]、[APM .NET Core バージョン終了のお知らせ](#end-of-life-net-core-versions)および [.NET Core APM のランタイムサポートポリシー](#runtime-support-policy-for-net-core-apm)に記載されています。

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
| AWS SNS                         | `AWSSDK.SNS`  3.0+                                                                                   | `AwsSns`             |
| AWS SQS                         | `AWSSDK.SQS`  3.0+                                                                                   | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos.Client` 3.6.0+                                                               | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                                          | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                           | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                                     | `GraphQL`            |
| gRPC                            | `Grpc.Net.Client`2.30.0+ (.NET Core 3.0+ のみ)</br>`Grpc.Core` 2.30.0+</br>`Grpc.AspNetCore` 2.30.0+ | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                               | `HotChocolate`       |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                                               | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                               | `Kafka`              |
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
| WCF (サーバー)                    | 組み込み                                                                                             | `Wcf`                |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                                                           | `WebRequest`         |

希望するフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog チーム][5]にお問い合わせください。

## .NET Core バージョン終了のお知らせ

.NET トレーサーは .NET コア 2.0、2.1、2.2、3.0 で動作しますが、これらのバージョンはサポートが終了しており、Microsoft ではサポートされていません。詳細については、[Microsoft のサポートポリシー][3]を参照してください。Datadog では、.NET Core 3.1、.NET 5、.NET 6、または .NET 7 の最新のパッチバージョンを使用することをお勧めします。古いバージョンの .NET Core では、自動インスツルメンテーションを有効にすると、次のようなランタイム問題が発生することがあります。

| 問題                                         | 影響を受ける .NET Core バージョン               | ソリューション                                                               | 詳細                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| Linux/x64 での JIT コンパイラのバグ                 | 2.0.x、</br>2.1.0-2.1.11、</br>2.2.0-2.2.5  | .NET Core を最新のパッチバージョンにアップグレードするか、リンク先の問題の手順に従います | [DataDog/dd-trace-dotnet/issues/302][6] |
| `en-US` 以外のロケールでのリソース参照に関するバグ | 2.0.0                                     | .NET Core を 2.0.3 以上にアップグレードします                                    | [dotnet/runtime/issues/23938][7]        |

## サポートされている Datadog Agent バージョン

| **Datadog Agent バージョン**   | **パッケージバージョン** |
|-----------------------------|---------------------|
| [7.x][8]                    | 最新              |
| [6.x][8]                    | 最新              |
| [5.x][9]                    | 最新              |

## .NET Core APM のランタイムサポートポリシー

Datadog APM for .NET Core は、ホスト OS、.NET Core ランタイム、特定の .NET Core ライブラリ、Datadog Agent/API に依存しています。これらのサードパーティソフトウェアシステムは、.NET Core の特定のバージョンをサポートしています。外部ソフトウェアが .NET Core のバージョンをサポートしなくなった場合、Datadog APM for .NET Core もそのバージョンのサポートを制限します。

### サポートレベル

| **レベル**                                              | **サポート内容**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。[特別なご要望はカスタマーサポートにお問い合わせください][10]。                                                             |
| <span id="support-beta">ベータ版</span>                    |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。                                    |
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能、バグ、セキュリティフィックスを完全サポート。                                                                                    |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は受けません。バグフィックス、セキュリティフィックスのみの対応となります。                                                              |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                                                                  |

### パッケージのバージョニング

Datadog APM for .NET Core は、[セマンティックバージョニング][11]を実践しています。
バージョンの更新は、ランタイムサポートの以下の変更を意味します。

  - **メジャーバージョンアップ** (例えば `1.0.0` から `2.0.0`) により、ランタイムのサポートが[ベータ版](#support-beta)/[GA](#support-ga)から[メンテナンス](#support-maintenance)/[EOL](#support-eol) に変更される場合があります。
  - **マイナーバージョンアップ** (例えば `1.0.0` から `1.1.0`) は、あるランタイムのサポートレベルを下げることはありませんが、あるランタイムのサポートは追加されるかもしれません。
  - **パッチバージョンアップ** (例えば `1.0.0` から `1.0.1`) によって、ランタイムのサポートが変更されることはありません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /ja/tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /ja/help/
[6]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[7]: https://github.com/dotnet/runtime/issues/23938
[8]: /ja/agent/basic_agent_usage/?tab=agentv6v7
[9]: /ja/agent/basic_agent_usage/?tab=agentv5
[10]: https://www.datadoghq.com/support/
[11]: https://semver.org/
[12]: https://www.nuget.org/packages/Datadog.Trace.Trimming/