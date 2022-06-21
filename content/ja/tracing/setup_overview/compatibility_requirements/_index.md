---
aliases:
- /ja/tracing/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 80
description: .NET トレーサーの互換性要件です。
further_reading:
- link: tracing/setup/dotnet-framework
  tag: Documentation
  text: アプリケーションのインスツルメンテーション
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: カスタムインスツルメンテーションの例
kind: documentation
title: .NET Framework 互換性要件
type: multi-code-lang
---


.NET トレーサーは、すべての .NET ベースの言語 (例えば、C#、F#、Visual Basic など) をサポートしています。オープンソースです。詳細は、[.NET トレーサーのリポジトリ][1]を参照してください。

## サポートされている .NET フレームワークのランタイム

.NET トレーサーは、以下の .NET Framework バージョンでの自動インスツルメンテーションに対応しています。また、[.NET Core][2] にも対応しています。

| .NET Framework バージョン  | マイクロソフトサポート終了 | サポートレベル                       | パッケージバージョン | Datadog サポート終了 |
| ----------------------- | --------------------- | ----------------------------------- | --------------- | ------------------- |
| 4.8                     |                       | [GA](#support-ga)                   | 最新          |                     |
| 4.7.2                   |                       | [GA](#support-ga)                   | 最新          |                     |
| 4.7                     |                       | [GA](#support-ga)                   | 最新          |                     |
| 4.6.2                   |                       | [GA](#support-ga)                   | 最新          |                     |
| 4.6.1                   | 04/26/2022            | [GA](#support-ga)                   | 最新          |                     |
| 4.6                     | 04/26/2022            | [メンテナンス](#support-Maintenance) | < 2.0.0         | 04/26/2022          |
| 4.5.2                   | 04/26/2022            | [メンテナンス](#support-Maintenance) | < 2.0.0         | 04/26/2022          |
| 4.5.1                   | 01/12/2016            | [メンテナンス](#support-Maintenance) | < 2.0.0         | 04/26/2022          |
| 4.5                     | 01/12/2016            | [メンテナンス](#support-Maintenance) | < 2.0.0         | 04/26/2022          |

その他の情報は、[マイクロソフトの .NET コアライフサイクルポリシー][3] および [.NET Framework APM のランタイムサポートポリシー](#runtime-support-policy-for-net-framework-apm)に記載されています。

## 対応プロセッサアーキテクチャー

.NET トレーサーは、次のアーキテクチャーの自動インスツルメンテーションをサポートします:

| プロセッサアーキテクチャー                                                 | サポートレベル         | パッケージバージョン                        |
| ------------------------------------------------------------------------|-----------------------|----------------------------------------|
| Windows x86 (`win-x86`)                                                 | [GA](#support-ga)     | 最新                                 |
| Windows x64 (`win-x64`)                                                 | [GA](#support-ga)     | 最新                                 |

## インテグレーション

[最新版 .NET トレーサー][4]では、以下のライブラリの自動インスツルメンテーションが可能です。

| フレームワークまたはライブラリ            | NuGet パッケージ                                                                             | インテグレーション名     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | すべての AdoNet インテグレーション                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0+                                                                 | `Aerospike`          |
| ASP.NET (Web Forms を含む)   | 組み込み                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+                                                               | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+                                                            | `AspNetWebApi2`      |
| AWS SQS                         | `AWSSDK.SQS`  3.0+                                                                        | `AwsSqs`             |
| CosmosDb                        | `Microsoft.Azure.Cosmos.Client` 3.6.0+                                                    | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8+                                                               | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0+                                                                          | `GraphQL`            |
| gRPC                            | `Grpc.Core` 2.3.0+                                            | `Grpc`               |
| HttpClient / HttpMessageHandler | 組み込み                                                                                  | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4+                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                                              | `MongoDb`            |
| MSMQ                            | 組み込み                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0+</br>`MySqlConnector` 0.61.0+                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0+                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0+                                                                             | `Npgsql`             |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9+                                                                  | `RabbitMQ`           |
| Redis (ServiceStack クライアント)     | `ServiceStack.Redis` 4.0.48+                                                              | `ServiceStackRedis`  |
| Redis (StackExchange クライアント)    | `StackExchange.Redis` 1.0.187+                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0+ </br>`Microsoft.Data.Sqlite` 1.0.0+                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0+</br>`System.Data.SqlClient` 4.0.0+</br>`Microsoft.Data.SqlClient` 1.0.0+  | WebClient / WebRequest     |
| WCF (サーバー)                    | 組み込み                                                                                  | `Wcf`                |
| WebClient / WebRequest          | 組み込み                                                                                  | `WebRequest`         |

希望するライブラリが見つかりませんか？Datadog では継続的にサポートを追加しています。[Datadog チーム][5]までお気軽にお問い合わせください。

## サポートされている Datadog Agent バージョン

| **Datadog Agent バージョン**   | **パッケージバージョン** |
|-----------------------------|---------------------|
| [7.x][6]                   | 最新              |
| [6.x][6]                   | 最新              |
| [5.x][7]                   | 最新              |

## .NET Framework APM のランタイムサポートポリシー

Datadog APM for .NET Framework は、ホスト OS、.NET Framework ランタイム、特定の .NET Framework ライブラリ、Datadog Agent/API に依存しています。これらのサードパーティソフトウェアシステムは、.NET Framework の特定のバージョンをサポートしています。外部ソフトウェアが .NET Framework のバージョンをサポートしなくなった場合、Datadog APM for .NET Framework もそのバージョンのサポートを制限します。

### サポートレベル

| **レベル**                                              | **サポート内容**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。[特別なご要望はカスタマーサポートにお問い合わせください][8]。                                                             |
| <span id="support-beta">ベータ版</span>                    |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。                                    |
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能、バグ、セキュリティフィックスを完全サポート。                                                                                    |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は受けません。バグフィックス、セキュリティフィックスのみの対応となります。                                                              |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                                                                  |

### パッケージのバージョニング

Datadog APM for .NET Framework は、[セマンティックバージョニング][9]を実践しています。
バージョンの更新は、ランタイムサポートの以下の変更を意味します。

  - **メジャーバージョンアップ** (例えば `1.0.0` から `2.0.0`) により、ランタイムのサポートが[ベータ版](#support-beta)/[GA](#support-ga)から[メンテナンス](#support-maintenance)/[EOL](#support-eol) に変更される場合があります。
  - **マイナーバージョンアップ** (例えば `1.0.0` から `1.1.0`) は、あるランタイムのサポートレベルを下げることはありませんが、あるランタイムのサポートは追加されるかもしれません。
  - **パッチバージョンアップ** (例えば `1.0.0` から `1.0.1`) によって、ランタイムのサポートが変更されることはありません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /ja/tracing/compatibility_requirements/dotnet-core/
[3]: https://docs.microsoft.com/en-us/lifecycle/products/microsoft-net-framework
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /ja/help/
[6]: /ja/agent/basic_agent_usage/?tab=agentv6v7
[7]: /ja/agent/basic_agent_usage/?tab=agentv5
[8]: https://www.datadoghq.com/support/
[9]: https://semver.org/