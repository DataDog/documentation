---
aliases:
- /ja/tracing/compatibility_requirements/dotnet-framework
- /ja/tracing/setup_overview/compatibility_requirements/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 80
description: .NET トレーサーの互換性要件
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-framework
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: ソースコード
  text: カスタムインスツルメンテーションの例
title: .NET Framework の互換性要件
type: multi-code-lang
---
Datadog .NET トレーサーは、すべての .NET ベースの言語 (例: C#、F#、Visual Basic) をサポートしています。

.NET トレーサーはオープンソースです。詳細については、[.NET トレーサーリポジトリ][1] を参照してください。

## サポートされている .NET Framework のランタイム {#supported-net-framework-runtimes}

.NET トレーサーは、以下の .NET Framework バージョンでの自動およびカスタム インスツルメンテーションをサポートしています。また、[.NET Core および .NET 5+][2] もサポートしています。.NET トレーサーは、部分的に信頼される環境で実行されるコードはサポートしていません。

| .NET Framework バージョン  | Microsoft のサポート終了日 | サポートレベル       | パッケージバージョン            | Datadog のサポート終了日 |
| ----------------------- | --------------------- | --------------------| -------------------------- | ------------------- |
| 4.8.1                   |                       | [GA](#support-ga)   | 最新版                     |                     |
| 4.8                     |                       | [GA](#support-ga)   | 最新版                     |                     |
| 4.7.2                   |                       | [GA](#support-ga)   | 最新版                     |                     |
| 4.7.1                   |                       | [GA](#support-ga)   | 最新版                     |                     |
| 4.7                     |                       | [GA](#support-ga)   | 最新版                     |                     |
| 4.6.2                   |                       | [GA](#support-ga)   | 最新版                     |                     |
| 4.6.1                   | 2022 年 4 月 26 日        | [GA](#support-ga)   | 最新版                     |                     |
| 4.6                     | 2022 年 4 月 26 日        | [EOL](#support-eol) | 2.0.0 未満 (例: [1.31.2][3]) | 2022 年 4 月 26 日      |
| 4.5.2                   | 2022 年 4 月 26 日        | [EOL](#support-eol) | 2.0.0 未満 (例: [1.31.2][3]) | 2022 年 4 月 26 日      |
| 4.5.1                   | 2016 年 1 月 12 日      | [EOL](#support-eol) | 2.0.0 未満 (例: [1.31.2][3]) | 2022 年 4 月 26 日      |
| 4.5                     | 2016 年 1 月 12 日      | [EOL](#support-eol) | 2.0.0 未満 (例: [1.31.2][3]) | 2022 年 4 月 26 日      |

詳細については、[Microsoft の .NET Framework ライフサイクルポリシー][4]および [.NET ランタイムサポートポリシー](#net-runtime-support-policy)を参照してください。

<div class="alert alert-info">自動インスツルメンテーションに使用する Datadog SDK のバージョンを決定する際は、アプリケーションサーバーにインストールされている .NET Framework のバージョンを使用してください。たとえば、.NET Framework 4.5.1 を対象としてアプリケーションをコンパイルする場合でも、アプリケーションが実行されているサーバーに .NET Framework 4.8 がインストールされている場合は、最新バージョンの SDK を使用してください。マシンにインストールされている .NET Framework のバージョンを確認するには、<a href="https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed">Microsoft が提供するガイダンス</a>に従ってください。
</div>

## サポートされているオペレーティングシステム {#supported-operating-systems}

.NET トレーサーは、Windows オペレーティングシステム上の .NET Framework アプリケーションの自動インスツルメンテーションをサポートしています。.NET Framework でサポートされているオペレーティングシステムの詳細については、[.NET Framework のシステム要件][12]をご覧ください。

### Windows {#windows}

| オペレーティングシステム             | バージョン      | サポートレベル       | パッケージバージョン       |
| -----------------------------|--------------|---------------------|-----------------------|
| Windows Server               | 2012 以降        | [GA](#support-ga)   | 最新版                |
| Windows Client               | 8.1 以降         | [GA](#support-ga)   | 最新版                |
| Windows Server (x86)         | すべてのバージョン | [EOL](#support-eol) | 3.0.0 未満 (例: 2.48.0) |
| Windows Server               | 2012 未満       | [EOL](#support-eol) | 3.0.0 未満 (例: 2.48.0) |

**注:**「Windows Server」には、すべてのエディションとインストールオプションが含まれます。
- **エディション:**Datacenter、Standard、Essentials など。
- **インストールオプション:**Server Core、Server with Desktop Experience、Nano Server (コンテナイメージのみ)

32 ビット (x86) アプリケーションのインスツルメンテーションは、64 ビット (x64) Windows でサポートされています。ARM64 版 Windows はサポートされていません。

## インテグレーション {#integrations}

[.NET トレーサーの最新バージョン][5]では、以下のライブラリを自動的にインスツルメントできます。

| フレームワークまたはライブラリ            | NuGet パッケージ                                                                             | 統合名     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- |
| .NET Remoting                   | 組み込み                                                                                  | `Remoting`           |
| ADO.NET                         | すべての AdoNet 統合                                                                   | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0 以降                                                                 | `Aerospike`          |
| ASP.NET (Web フォームを含む)   | 組み込み                                                                                  | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0 以降                                                               | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1 以降                                                            | `AspNetWebApi2`      |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2`  3.0 以降                                                                 | `AwsDynamoDb`        |
| Amazon Kinesis                  | `AWSSDK.Kinesis`  3.0 以降                                                                    | `AwsKinesis`         |
| Amazon SNS                      | `AWSSDK.SNS`  3.0 以降                                                                        | `AwsSns`             |
| Amazon SQS                      | `AWSSDK.SQS`  3.0 以降                                                                        | `AwsSqs`             |
| Azure Cosmos DB                 | `Microsoft.Azure.Cosmos` 3.6.0 以降                                                           | `CosmosDb`           |
| Couchbase                       | `CouchbaseNetClient` 2.2.8 以降                                                               | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0 以降                                                                | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0 以降                                                                          | `GraphQL`            |
| gRPC                            | `Grpc.Core` 2.3.0 以降                                                                        | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0 以降                                                                    | `HotChocolate`       |
| HttpClient / HttpMessageHandler | 組み込み                                                                                  | `HttpMessageHandler` |
| IBM MQ                          | `amqmdnetstd` 9.0.0 以降                                                                      | `IbmMq`              |
| Kafka                           | `Confluent.Kafka` 1.4 以降                                                                    | `Kafka`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0 以降                                                              | `MongoDb`            |
| MSMQ                            | 組み込み                                                                                  | `Msmq`               |
| MySql                           | `MySql.Data` 6.7.0 以降</br>`MySqlConnector` 0.61.0 以降                                          | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0 以降                                                       | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0 以降                                                                             | `Npgsql`             |
| Process                         | 組み込み                                                                                  | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9 以降                                                                 | `RabbitMQ`           |
| Redis (ServiceStack クライアント)     | `ServiceStack.Redis` 4.0.48 以降                                                              | `ServiceStackRedis`  |
| Redis (StackExchange クライアント)    | `StackExchange.Redis` 1.0.187 以降                                                            | `StackExchangeRedis` |
| SQLite                          | `System.Data.Sqlite` 2.0.0 以降 </br>`Microsoft.Data.Sqlite` 1.0.0 以降                           | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0 以降</br>`System.Data.SqlClient` 4.0.0 以降</br>`Microsoft.Data.SqlClient` 1.0.0 以降  | `SqlClient`     |
| WCF (サーバー)                    | 組み込み                                                                                  | `Wcf`                |
| WebClient / WebRequest          | 組み込み                                                                                  | `WebRequest`         |

**注**: Redis 6.0+ は、`HELLO`、`MIGRATE`、`ACL SETUSER` などのコマンドでインライン認証をサポートしています。

  - **Datadog Trace Agent**: 必要最小限の推奨バージョンは `7.76.1` です。これは、トレースメタデータ内の認証パラメーターが自動的に難読化されるようにするためです。
  - **Datadog Lambda Extension** (Serverless 環境): 必要最小限のバージョンは `v28.0.0` です。

お探しのライブラリが見つかりませんか?まず、そのライブラリが OpenTelemetry と互換性のあるオブザーバビリティデータを生成するかどうかを確認してください (詳細については、[OpenTelemetry インスツルメンテーションライブラリの使用][11]を参照してください)。生成しない場合、Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog チームにお問い合わせください][6]。

## サポートされている Datadog Agent のバージョン {#supported-datadog-agent-versions}

| Datadog Agent バージョン | パッケージバージョン |
|-----------------------|-----------------|
| [7.x][7]              | 最新版          |
| [6.x][7]              | 最新版          |
| [5.x][8]              | 最新版          |

## .NET ランタイムのサポートポリシー {#net-runtime-support-policy}

.NET トレーサーは、ホストオペレーティングシステム、.NET Framework ランタイム、特定の .NET Framework ライブラリ、および Datadog Agent/API を利用しています。これらのサードパーティ製ソフトウェアシステムは、特定のバージョンの .NET Framework をサポートしています。外部ソフトウェアで .NET Framework のバージョンがサポートされなくなった場合、.NET トレーサーでもそのバージョンへのサポートが制限されます。

### サポートのレベル {#levels-of-support}

| **レベル**                                              | **サポート内容**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。[特別なリクエストについては、カスタマーサポートにお問い合わせください。][9]                                                             |
| <span id="support-beta">プレビュー</span>                 |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。                                   |
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能のサポート、バグやセキュリティの修正を全面的に提供します。                                                                                   |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は追加されません。バグとセキュリティの修正のみの対応となります。                                                             |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                                                                 |

### パッケージのバージョン管理 {#package-versioning}

.NET Framework 向け Datadog APM では、[セマンティックバージョニング][10]を採用しています。
バージョン更新に伴い、ランタイムサポートに以下の変更が適用されます。

  - **メジャーバージョン更新** (例: `1.0.0` から `2.0.0` へ) では、ランタイムのサポートレベルが [Preview](#support-beta)/[GA](#support-ga) から [Maintenance](#support-maintenance)/[EOL](#support-eol) に変更される可能性があります。
  - **マイナーバージョン更新** (例: `1.0.0` から `1.1.0` へ) では、ランタイムのサポートレベルが低下することはありませんが、サポートが追加される場合があります。
  - **パッチバージョン更新** (例: `1.0.0` から `1.0.1` へ) では、ランタイムのサポートに変更はありません。

## 参考資料{#further-reading}

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
[11]: /ja/opentelemetry/instrument/ddot_sdks/instrumentation_libraries/?tab=net
[12]: https://learn.microsoft.com/en-us/dotnet/framework/get-started/system-requirements