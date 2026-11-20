---
aliases:
- /ja/tracing/compatibility_requirements/dotnet-core
- /ja/tracing/setup_overview/compatibility_requirements/dotnet-core
code_lang: dotnet-core
code_lang_weight: 70
description: .NET トレーサーの互換性要件
further_reading:
- link: tracing/trace_collection/dd_libraries/dotnet-core
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: ソースコード
  text: カスタムインスツルメンテーションの例
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: ブログ
  text: コンテナ化された ASP.NET コアアプリケーションを監視する
title: .NET および .NET Core の互換性要件
type: multi-code-lang
---
Datadog .NET トレーサーは、すべての .NET ベースの言語 (例: C#、F#、Visual Basic) をサポートしています。[トリミングされたアプリのプレビューサポート][12] があります。

.NET トレーサーはオープンソースです。詳細については、[.NET トレーサーリポジトリ][1] を参照してください。

## サポートされている .NET および .NET Core のランタイム {#supported-net-and-net-core-runtimes}

.NET トレーサーは、以下の .NET および .NET Core バージョンでの自動インスツルメンテーションをサポートしています。[.NET Framework][2] もサポートしています。

| .NET バージョン         | Microsoft のサポート終了日 | サポートレベル        | パッケージバージョン      |
| -------------------- | --------------------- | -------------------- | -------------------- |
| .NET 10              | _2028-11-14_   | [GA](#support-ga)    | 最新版 (3.31.0 以上)   |
| .NET 9               | _2026-11-10_   | [GA](#support-ga)    | 最新版 (3.6.0 以上)    |
| .NET 8               | _2026-11-10_   | [GA](#support-ga)    | 最新版 (2.42.0 以上)   |
| .NET 7               | 2024-05-14          | [GA](#support-ga)    | 最新版 (2.20.0 以上)   |
| .NET 6               | 2024-11-12     | [GA](#support-ga)    | 最新版 (2.0.0 以上)    |
| .NET 5               | 2022-05-10          | [GA](#support-ga)    | 最新版 (2.0.0 以上)    |
| .NET Core 3.1        | 2022-12-13     | [GA](#support-ga)    | 最新版               |
| .NET Core 3.0        | 2020-03-03         | [EOL](#support-eol)  | 非推奨      |
| .NET Core 2.2        | 2019-12-23     | [EOL](#support-eol)  | 非推奨      |
| .NET Core 2.1        | 2021-08-21       | [EOL](#support-eol)  | 非推奨      |
| .NET Core 2.0        | 2018-10-01       | [EOL](#support-eol)  | 非推奨      |

詳細については、[Microsoft の.NET および .NET Core ライフサイクルポリシー][3]、[.NETランタイムバージョンのサポート終了](#end-of-life-net-runtime-versions)、および[.NETランタイムサポートポリシー](#net-runtime-support-policy)を参照してください。

## サポートされているオペレーティングシステム {#supported-operating-systems}

.NET トレーサーは、Windows および Linux オペレーティングシステム上の .NET および .NET Core アプリケーションの自動インスツルメンテーションをサポートしています。macOS については、CI Test Optimization のみをサポートしています。.NET および .NET Core でサポートされているオペレーティングシステムの詳細については、[.NET リリースノート][19] を参照してください。

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

### Linux {#linux}

.NET トレーサーは、最小 libc バージョンとの互換性に基づき、Linux ディストリビューションをベストエフォートでサポートします。

- x64: [glibc][20] 2.17 (CentOS 7 以降)
- arm64: [glibc][20] 2.23 (Debian 10 以降)
- Alpine x64: [musl][21] 1.2.2 (Alpine 3.14 以降)
- Alpine arm64: [musl][21] 1.2.4 (Alpine 3.18 以降)

| オペレーティングシステム         | バージョン | アーキテクチャ | サポートレベル                         | パッケージバージョン                 |
| -------------------------|---------|---------------|---------------------------------------|---------------------------------|
| Alpine Linux (x64)       | 3.14 以降   |  x64          | [GA](#support-ga)                     | 最新版 (.NET 5 以降のみ、v1.27.0 以降) |
| Alpine Linux (arm64)     | 3.18 以降   |  arm64        | [GA](#support-ga)                     | 最新版 (.NET 6 以降のみ、v3.2.0 以降)  |
| CentOS Linux             | 7 以降      |  x64          | [メンテナンス](#support-maintenance)   | 最新版 (v4.0.0 でサポート終了)          |
| CentOS Stream Linux      | 8       |  x64          | [メンテナンス](#support-maintenance)   | 最新版 (v4.0.0 でサポート終了)          |
| Debian                   | 10 以降     |  x64、arm64   | [GA](#support-ga)                     | 最新版                          |
| Fedora                   | 29 以降     |  x64          | [GA](#support-ga)                     | 最新版                          |
| openSUSE                 | 15 以降     |  x64          | [GA](#support-ga)                     | 最新版                          |
| Red Hat Enterprise Linux | 7 以降      |  x64          | [GA](#support-ga)                     | 最新版                          |
| Ubuntu                   | 18.04 以降  |  x64、arm64   | [GA](#support-ga)                     | 最新版                          |

### macOS {#macos}

.NET トレーサーは、CI Test Optimization に限り macOS をサポートしています。

| オペレーティングシステム         | バージョン | アーキテクチャ | サポートレベル           | パッケージバージョン            |
| -------------------------|---------|---------------|-------------------------|----------------------------|
| macOS                    | 14.0 以降   |  x64、arm64   | [GA](#support-ga)       | 最新                     |
| macOS                    | 11.0    |  x64          | [EOL](#support-eol)     | 3.0.0 未満                    |
| macOS                    | 11.0    |  arm64        | [EOL](#support-eol)     | 3.0.0 未満 (2.20.0 で追加)  |

## Integrations {#integrations}

[.NET トレーサーの最新バージョン][4] は、以下のライブラリを自動的にインスツルメントできます。

| フレームワークまたはライブラリ            | NuGet パッケージ                                                                                        | 統合名     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- |
| ADO.NET                         | すべての AdoNet Integrations                                                                              | `AdoNet`             |
| Aerospike                       | `Aerospike.Client` 4.0.0 以降                                                                            | `Aerospike`          |
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0 以降および 3.0 以降                              | `AspNetCore`         |
| Azure Functions                 | `Microsoft.Azure.Webjobs` 3.0 以降                                                                       | `AzureFunctions`     |
| Amazon DynamoDB                 | `AWSSDK.DynamoDBv2`  3.0 以降                                                                            | `AwsDynamoDb`        |
| Amazon Kinesis                  | `AWSSDK.Kinesis`  3.0 以降                                                                               | `AwsKinesis`         |
| Amazon SNS                      | `AWSSDK.SNS`  3.0 以降                                                                                   | `AwsSns`             |
| Amazon SQS                      | `AWSSDK.SQS`  3.0 以降                                                                                   | `AwsSqs`             |
| Azure Cosmos DB                 | `Microsoft.Azure.Cosmos` 3.6.0 以降                                                                      | `CosmosDb`           |
| Azure Event Hubs                | `Azure.Messaging.EventHubs` 5.9.2 以降                                                                   | `AzureEventHubs`     |
| Azure Service Bus               | `Azure.Messaging.ServiceBus` 7.14 以降                                                                   | `AzureServiceBus`    |
| Couchbase                       | `CouchbaseNetClient` 2.2.8 以降                                                                          | `Couchbase`          |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0 以降                                                                           | `ElasticsearchNet`   |
| GraphQL .NET                    | `GraphQL` 2.3.0 以降                                                                                     | `GraphQL`            |
| gRPC                            | `Grpc.Net.Client`2.30.0 以降 (.NET Core 3.0 以降のみ)</br>`Grpc.Core` 2.30.0 以降</br>`Grpc.AspNetCore` 2.30.0 以降 | `Grpc`               |
| HotChocolate                    | `HotChocolate` 11.0.0 以降                                                                               | `HotChocolate`       |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0 以降                                                                               | `HttpMessageHandler` |
| Kafka                           | `Confluent.Kafka` 1.4 以降                                                                               | `Kafka`              |
| IBM MQ                          | `amqmdnetstd` 9.0.0 以降                                                                                 | `IbmMq`              |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0 以降                                                                         | `MongoDb`            |
| MySql                           | `MySql.Data` 6.7.0 以降</br>`MySqlConnector` 0.61.0 以降                                                     | `MySql`              |
| Oracle                          | `Oracle.ManagedDataAccess` 4.122.0 以降                                                                  | `Oracle`             |
| PostgreSQL                      | `Npgsql` 4.0 以降                                                                                        | `Npgsql`             |
| Process                         | `System.Diagnostics.Process` 4.0 以降                                                                    | `Process`            |
| RabbitMQ                        | `RabbitMQ.Client` 3.6.9 以降                                                                          | `RabbitMQ`           |
| Redis (ServiceStack クライアント)     | `ServiceStack.Redis` 4.0.48 以降                                                                         | `ServiceStackRedis`  |
| Redis (StackExchange クライアント)    | `StackExchange.Redis` 1.0.187 以降                                                                       | `StackExchangeRedis` |
| Service Fabric Remoting         | `Microsoft.ServiceFabric.Services.Remoting` 4.0.470 以降                                                 | `ServiceRemoting`    |
| SQLite                          | `System.Data.Sqlite` 2.0.0 以降 </br>`Microsoft.Data.Sqlite` 1.0.0 以降                                      | `Sqlite`             |
| SQL Server                      | `System.Data` 4.0.0 以降</br>`System.Data.SqlClient` 4.0.0 以降</br>`Microsoft.Data.SqlClient` 1.0.0 以降        | `SqlClient`          |
| WebClient / WebRequest          | `System.Net.Requests` 4.0 以降                                                                           | `WebRequest`         |

**注**: Redis 6.0 以降は、`HELLO`、`MIGRATE`、`ACL SETUSER` などのコマンドでインライン認証をサポートしています。

  - **Datadog Trace Agent**: 必要最小限の推奨バージョンは `7.76.1` です。これは、トレースメタデータ内の認証パラメーターが自動的に難読化されるようにするためです。
  - **Datadog Lambda Extension** (Serverless 環境): 必要最小限のバージョンは `v28.0.0` です。

お探しのライブラリが見つかりませんか?まず、そのライブラリが OpenTelemetry と互換性のあるオブザーバビリティデータを生成するかどうかを確認してください (詳細については、[OpenTelemetry インスツルメンテーションライブラリの使用][13] を参照してください)。生成しない場合、Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog チームにお問い合わせください][5]。

## サポート終了した .NET ランタイムバージョン {#end-of-life-net-runtime-versions}

.NET トレーサーは .NET Core 2.0、2.1、2.2、3.0、3.1、および .NET 5 と 7 で動作しますが、これらのバージョンはサポートが終了しており、Microsoft によるサポートは提供されていません。詳細については、[Microsoft のサポートポリシー][3] を参照してください。Datadog では、.NET 6 または .NET 8 の最新パッチバージョンを使用することを推奨しています。古いバージョンの .NET および .NET Core では、自動インスツルメンテーションを有効にすると、以下のランタイムの問題が発生する可能性があります。

| 問題                                                                          | 影響を受ける .NET バージョン                                   | 解決策                                                                           | 詳細情報                        |
|--------------------------------------------------------------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------|-----------------------------------------|
| Linux/x64 での JIT コンパイラのバグ                                                  | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5                 | .NET Core を最新のパッチバージョンにアップグレードするか、リンク先の問題に記載された手順に従ってください | [DataDog/dd-trace-dotnet/issues/302][6] |
| 非 `en-US` ロケールでのリソース検索のバグ                                  | 2.0.0                                                    | .NET Core を 2.0.3 以降にアップグレードしてください                                                | [dotnet/runtime/issues/23938][7]        |
| シャットダウン時にクラッシュを引き起こす JIT コンパイラのバグ                                     | 2.0.0-2.2.x                                              | .NET Core を 3.1.0 以降にアップグレードしてください                                                | [dotnet/runtime/pull/11885][15]         |
| JIT コンパイラのバグ                                                               | 2.x、3.x、5.x、6.x、7.x、8.0.0-8.0.5                     | .NET を 8.0.6 以降にアップグレードしてください                                                     | [dotnet/runtime/pull/73760][16]         |
| JIT コンパイラのバグ                                                               | .NET のすべてのバージョン                                     | 現在、回避策はありません                                                              | [dotnet/runtime/issues/85777][17]       |
| ランタイムメトリクス使用時にクラッシュを引き起こす .NET ランタイムのバグ | 6.0.0-6.0.10 | .NET 6.0.11 以降にアップグレードするか、ランタイムメトリクスを無効にしてください | [dotnet/runtime/pull/76431][18]                                                    |                                         |
| クラッシュを引き起こす JIT コンパイラのバグ                                               | 2.x、3.x、5.x、6.x、7.x、8.x                             | .NET を 9.0.0 以降にアップグレードしてください                                                     | [dotnet/runtime/pull/95653][22]         |
| クラッシュを引き起こす JIT コンパイラのバグ                                               | 2.x、3.x、5.x、6.x、7.x、8.x、9.x、10.x                  | .NET を 10.0.10 以降にアップグレードしてください                                                   | [dotnet/runtime/issues/127957][23]      |
| 例外フィルターでクラッシュを引き起こす .NET ランタイムのバグ (`catch ... when`)       | 9.x、10.x                                                | `DD_PROFILING_EXCEPTION_ENABLED=0` を設定するか、.NET 11 以降にアップグレードしてください             | [dotnet/runtime/issues/132462][24]      |

## サポートされている Datadog Agent のバージョン {#supported-datadog-agent-versions}

| Datadog Agent バージョン | パッケージバージョン |
|-----------------------|-----------------|
| [7.x][8]              | 最新版          |
| [6.x][8]              | 最新版          |
| [5.x][9]              | 最新版          |

## .NET ランタイムのサポートポリシー {#net-runtime-support-policy}

.NET トレーサーは、ホストオペレーティングシステム、.NET ランタイム、特定の .NET ライブラリ、および Datadog Agent/API に依存しています。これらのサードパーティ製ソフトウェアシステムは、特定のバージョンの .NET および .NET Core をサポートしています。外部ソフトウェアが .NET のバージョンをサポートしなくなった場合、.NET トレーサーもそのバージョンに対するサポートを制限します。

### サポートのレベル {#levels-of-support}

| **レベル**                                              | **サポート内容**                                                                                                                       |
|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。[特別なリクエストについては、カスタマーサポートにお問い合わせください。][10]                                                                   |
| <span id="support-beta">プレビュー</span>                 |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。|
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能のサポート、バグやセキュリティの修正を全面的に提供します。                                                |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は追加されません。バグとセキュリティの修正のみの対応となります。                          |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                              |

### パッケージのバージョン管理 {#package-versioning}

.NET トレーサーは [セマンティックバージョニング][11] を採用しています。
バージョン更新に伴い、ランタイムサポートに以下の変更が適用されます。

  - **メジャーバージョン更新** (例: `1.0.0` から `2.0.0` へ) では、ランタイムのサポートレベルが [Preview](#support-beta)/[GA](#support-ga) から [Maintenance](#support-maintenance)/[EOL](#support-eol) に変更される可能性があります。
  - **マイナーバージョン更新** (例: `1.0.0` から `1.1.0` へ) では、ランタイムのサポートレベルが低下することはありませんが、サポートが追加される場合があります。
  - **パッチバージョン更新** (例: `1.0.0` から `1.0.1` へ) では、ランタイムのサポートに変更はありません。

## 参考資料{#further-reading}

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
[13]: /ja/opentelemetry/interoperability/instrumentation_libraries/?tab=dotnet
[15]: https://github.com/dotnet/runtime/pull/73760
[16]: https://github.com/dotnet/runtime/issues/11885
[17]: https://github.com/dotnet/runtime/issues/85777
[18]: https://github.com/dotnet/runtime/pull/76431
[19]: https://github.com/dotnet/core/tree/main/release-notes
[20]: https://www.gnu.org/software/libc/
[21]: https://musl.libc.org/
[22]: https://github.com/dotnet/runtime/issues/95653
[23]: https://github.com/dotnet/runtime/issues/127957
[24]: https://github.com/dotnet/runtime/issues/132462