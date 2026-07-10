---
aliases:
- /ja/tracing/compatibility_requirements/dotnet-framework
- /ja/tracing/setup_overview/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 80
description: .NET Tracer の互換性要件
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-framework
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: ソースコード
  text: カスタムインスツルメンテーションの例
title: .NET Framework 互換性要件
type: multi-code-lang
---


Datadog .NET Tracer は、すべての .NET ベースの言語 (例: C#、F#、Visual Basic) をサポートします。

.NET トレーサーはオープンソースです。詳細については、[.NET トレーサーリポジトリ][1]を参照してください。

## サポートされている .NET フレームワークのランタイム

.NET Tracer は、以下の .NET Framework バージョンで自動およびカスタム インスツルメンテーションをサポートします。さらに、[.NET Core および .NET 5+][2] もサポートします。.NET Tracer は、部分信頼環境で実行されるコードをサポートしません。

| .NET Framework バージョン  | マイクロソフトサポート終了 | サポートレベル                       | パッケージバージョン            | Datadog サポート終了 |
| ----------------------- | --------------------- | ----------------------------------- | -------------------------- | ------------------- |
| 4.8.1                   |                       | [GA](#support-ga)                   | 最新                     |                     |
| 4.8                     |                       | [GA](#support-ga)                   | 最新                     |                     |
| 4.7.2                   |                       | [GA](#support-ga)                   | 最新                     |                     |
| 4.7                     |                       | [GA](#support-ga)                   | 最新                     |                     |
| 4.6.2                   |                       | [GA](#support-ga)                   | 最新                     |                     |
| 4.6.1                   | 04/26/2022            | [GA](#support-ga)                   | 最新                     |                     |
| 4.6                     | 04/26/2022            | [EOL](#support-eol)                 | < 2.0.0 (例: [1.31.2][3]) | 04/26/2022          |
| 4.5.2                   | 04/26/2022            | [EOL](#support-eol)                 | < 2.0.0 (例: [1.31.2][3]) | 04/26/2022          |
| 4.5.1                   | 01/12/2016            | [EOL](#support-eol)                 | < 2.0.0 (例: [1.31.2][3]) | 04/26/2022          |
| 4.5                     | 01/12/2016            | [EOL](#support-eol)                 | < 2.0.0 (例: [1.31.2][3]) | 04/26/2022          |

詳細は、[Microsoft の .NET Framework ライフサイクル ポリシー][4] および [.NET ランタイム サポート ポリシー](#net-runtime-support-policy) を参照してください。

<div class="alert alert-info">
  <div class="alert-info"><b>注:</b> 自動インスツルメンテーションに使用するトレーサーのバージョンを決定する場合、アプリケーションサーバーにインストールされている .NET Framework のバージョンを使用します。たとえば、.NET Framework 4.5.1 をターゲットとしてアプリケーションをコンパイルしたが、アプリケーションは .NET Framework 4.8 がインストールされているサーバー上で実行されている場合、トレーサーの最新バージョンを使用します。マシンにインストールされている .NET Framework のバージョンを確認するには、<a href="https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed">Microsoft が提供するガイダンス</a>に従います。
  </div>
</div>

## 対応プロセッサアーキテクチャー

.NET トレーサーは、次のアーキテクチャーの自動インスツルメンテーションをサポートします:

| プロセッサアーキテクチャー | サポートレベル       | パッケージバージョン       |
| ----------------------- | ------------------- | --------------------- |
| Windows x64 (`win-x64`) | [GA](#support-ga)   | 最新                |
| Windows x86 (`win-x86`) | [EOL](#support-eol) | 3.0.0 未満 (例: 2.56.0) |

なお、Windows x64 上で x86 アプリケーションを実行することはサポートされています。

## インテグレーション

[最新版 .NET トレーサー][5]では、以下のライブラリの自動インスツルメンテーションが可能です。

| フレームワークまたはライブラリ            | NuGet パッケージ                                                                             | インテグレーション名     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| .NET Remoting                   | 組み込み                                                                                  | `Remoting`           |
| ADO.NET                         | すべての AdoNet インテグレーション                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (Web Forms を含む)   | 組み込み                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+                                                               | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+                                                            | `AspNetWebApi2`      |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2`  3.0+                                                                 | `AwsDynamoDb`        |
| Amazon Kinesis                  | `AWSSDK.Kinesis`  3.0+                                                                    | `AwsKinesis`         |
| Amazon SNS                      | `AWSSDK.SNS`  3.0+                                                                        | `AwsSns`             |
| Amazon SQS                      | `AWSSDK.SQS`  3.0+                                                                        | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos` 3.6.0+                                                    | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                               | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                          | `GraphQL`            |
| gRPC                            | `Grpc.Core` 2.3.0+                                                                        | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0+                                                                    | `HotChocolate`       |
| HttpClient / HttpMessageHandler | 組み込み                                                                                  | `HttpMessageHandler` |
| IBM MQ                          | `amqmdnetstd` 9.0.0+                                                                      | `IbmMq`              |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | 組み込み                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `Npgsql`             |
| プロセス                         | `"System.Diagnostics.Process"` 4.0+                                                       | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+、                                                                 | `RabbitMQ`           |
| Redis (ServiceStack クライアント)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (StackExchange クライアント)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | WebClient / WebRequest     |
| WCF (サーバー)                    | 組み込み                                                                                  | `Wcf`                |
| WebClient / WebRequest          | 組み込み                                                                                  | `WebRequest`         |

お探しのライブラリが見つかりませんか？まず、そのライブラリが OpenTelemetry と互換の可観測性データを生成するかどうかを確認してください (詳細は [OpenTelemetry インスツルメンテーション ライブラリの使用][11] を参照)。該当しない場合でも、Datadog は継続的に追加のサポートを提供しています。[Datadog チームに問い合わせてください][6]。

## サポートされている Datadog Agent バージョン

| **Datadog Agent バージョン**   | **パッケージバージョン** |
|-----------------------------|---------------------|
| [7.x][7]                    | 最新              |
| [6.x][7]                    | 最新              |
| [5.x][8]                    | 最新              |

## .NET ランタイム サポート ポリシー

.NET Tracer は、ホスト オペレーティング システム、.NET Framework ランタイム、特定の .NET Framework ライブラリ、そして Datadog Agent/API に依存します。これらのサード パーティ ソフトウェア システムは、特定の .NET Framework バージョンをサポートしています。これらのサード パーティ ソフトウェアが特定の .NET Framework バージョンのサポートを終了した場合、.NET Tracer もそのバージョンのサポートを制限します。

### サポートレベル

| **レベル**                                              | **サポート内容**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。[特別なご要望はカスタマーサポートにお問い合わせください][9]。                                                             |
| <span id="support-beta">Preview</span>                 |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。                                    |
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能、バグ、セキュリティフィックスを完全サポート。                                                                                    |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は受けません。バグフィックス、セキュリティフィックスのみの対応となります。                                                              |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                                                                  |

### パッケージのバージョニング

Datadog APM for .NET Framework は、[セマンティックバージョニング][10]を実践しています。
バージョンの更新は、ランタイムサポートの以下の変更を意味します。

  - **メジャー バージョン アップデート** (例: `1.0.0` から `2.0.0`) によって、いずれかのランタイムのサポート ステータスが [プレビュー](#support-beta)/[GA](#support-ga) から [メンテナンス](#support-maintenance)/[EOL](#support-eol) に変更される場合があります。
  - **マイナーバージョンアップ** (例えば `1.0.0` から `1.1.0`) は、あるランタイムのサポートレベルを下げることはありませんが、あるランタイムのサポートは追加されるかもしれません。
  - **パッチバージョンアップ** (例えば `1.0.0` から `1.0.1`) によって、ランタイムのサポートが変更されることはありません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /ja/tracing/compatibility_requirements/dotnet-core/
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.31.2
[4]: https://docs.microsoft.com/en-us/lifecycle/products/microsoft-net-framework
[5]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[6]: /ja/help/
[7]: /ja/agent/basic_agent_usage/?tab=agentv6v7
[8]: /ja/agent/basic_agent_usage/?tab=agentv5
[9]: https://www.datadoghq.com/support/
[10]: https://semver.org/
[11]: /ja/opentelemetry/interoperability/instrumentation_libraries/?tab=dotnet