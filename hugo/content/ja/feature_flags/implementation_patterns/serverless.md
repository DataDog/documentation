---
description: Datadog Agent の有無にかかわらず、サーバーレス環境で Datadog Feature Flags サーバー SDK を使用します。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: コンセプト
  text: サーバー SDK 構成ソース
- link: /remote_configuration/
  tag: ドキュメント
  text: Remote Configuration
- link: /serverless/
  tag: ドキュメント
  text: Serverless Monitoring
title: サーバーレス環境
---
## 概要 {#overview}

Datadog Feature Flags Java、Node.js、Python、および .NET SDK は、Datadog 管理の CDN から直接フラグ構成を受信できます。この_エージェントレス_構成ソースはフラグ構成に Datadog Agent を必要としないため、オンボーディングが簡素化されます。また、Datadog Agent に接続できないサーバーレスアプリケーションにも対応しています。

構成が読み込まれた後、フラグ評価はアプリケーション内でローカルに行われます。SDK は、評価ごとにネットワークリクエストを行いません。

次のテーブルは、各 SDK バージョンで利用可能な Feature Flags 機能を示しています。

| SDK | 最小バージョン | Agentless 構成とローカル評価 | 実験エクスポージャーイベント | Event Platform Proxy (EVP) フラグ評価イベント | イベント配信 |
|---|---|---|---|---|---|
| Java `dd-openfeature` および `dd-java-agent` | 1.66.0 | サポート対象 | サポート対象 | サポート対象 | 互換性のあるローカルテレメトリリレーを優先し、利用できない場合は直接フォールバックを使用する |
| Node.js `dd-trace` | 6.12.0 | サポート対象 | サポート対象 | サポート対象外 | 互換性のあるローカルテレメトリリレーを優先し、利用できない場合は直接フォールバックを使用する |
| Python `ddtrace` | 4.14.0 | サポート対象 | サポート対象 | サポート対象 | 互換性のあるローカルテレメトリリレー |
| .NET `dd-trace-dotnet` および `Datadog.FeatureFlags.OpenFeature` | 3.54.0 および 2.3.1 | サポート対象 | 互換性のあるリレーでサポート対象 | サポート対象外 | 互換性のあるローカルテレメトリリレー。直接のフォールバックなし |

Java CDN 配信には `dd-openfeature` および `dd-java-agent` が必要です。Java ランタイムは、`-javaagent` JVM オプションを使用して `dd-java-agent` を読み込むことをサポートする必要があります。このオプションは、Java コマンドで、または `JAVA_TOOL_OPTIONS` を通じて渡すことができます。

.NET CDN 配信では、OpenFeature プロバイダーと併せて、[自動インスツルメンテーション][12]を使用して Datadog .NET トレーサーを読み込む必要があります。プロバイダーをインストールするだけでは不十分です。

記載されているバージョンは、テーブルに表示されている機能を提供します。その他のサーバー SDK は、フラグ配信に Agent Remote Configuration を使用します。

Agentless 配信では、フラグ構成ソースのみが変更されます。Feature Flags イベントは、互換性のあるローカルテレメトリリレーまたはサポートされている直接パスへの個別コネクションを使用します。

## エージェントレスアーキテクチャ {#agentless-architecture}

サーバーレスランタイムが Datadog へのアウトバウンド HTTPS リクエストを行える場合は、エージェントレス配信を使用してください。ランタイムは、言語トレーサーの読み込みをサポートしている必要があります。

1. [サポートされている SDK バージョン](#overview)を使用します。
2. Java の場合、`dd-java-agent` を `-javaagent` または `JAVA_TOOL_OPTIONS` で読み込みます。例については、[Cloud Run Functions][7] または [Cloud Run コンテナ][8] の Java セットアップを参照してください。.NET の場合は、[自動インスツルメンテーション][12]を使用してトレーサーを読み込んでください。
3. サーバーレスアプリケーションで API キー、Datadog サイト、および環境を構成します。

   {{< code-block lang="bash" >}}
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   DD_ENV=<YOUR_ENVIRONMENT>{{< /code-block >}}

4. [Java][6]、[Node.js][3]、[Python][9]、または [.NET][13] のセットアップで説明されているように、Datadog OpenFeature プロバイダーの初期化またはアクセスを行います。これにより、CDN ポーリングが開始されます。Feature Flags の有効化やソース設定は必要ありません。
5. `DD_API_KEY` をサーバーレスプラットフォームのシークレットマネージャーに保存し、アプリケーションプロセスにのみ公開します。

SDK はデフォルトで 30 秒ごとに Datadog 管理の CDN をポーリングし、変更されていない構成には ETag を使用します。一時的なエラーが発生した場合でも、最後に受け取った構成を保持します。構成が受け取られていない場合、OpenFeature 評価は呼び出し元が提供したデフォルト値を返します。

トレーサーのインストールと初期化だけでは、CDN ポーリングは開始されません。CDN へのリクエストは、アプリケーションコードがプロバイダーを有効化した後にのみ、サーバーの Feature Flags の請求対象となります。

Agentless モードでは、_フラグ構成_のための Datadog Agent の依存関係がなくなります。言語固有のトレーサー要件がなくなるわけではありません。また、APM やサーバーレステレメトリの構成や有効化も行われません。Datadog Lambda Extension、`serverless-init`、Agent サイドカー、またはその他の対応テレメトリパスを個別に利用できます。

## Feature Flags のテレメトリを送信する {#send-feature-flag-telemetry}

`serverless-init` は、互換性のあるローカルテレメトリリレーの 1 つです。これは Feature Flags の構成ソースではありません。CDN から構成を読み込むには、デフォルトの `agentless` ソースを維持してください。

`remote_config` を選択する際、Datadog Agent の代わりとして `serverless-init` を使用しないでください。Agent Remote Configuration には Datadog Agent が必要です。

ダイレクトフォールバックとは、互換性のあるローカルテレメトリリレーを使用できない場合に SDK が認証済み EVP イベントを Datadog に送信することです。

以下の動作に注意してください。

- 実験エクスポージャーイベントは、実験に関連付けられたフラグに対してのみ発生します。
- Java および Python は、EVP フラグ評価イベントを集約し、デフォルトで送信します。
- .NET 3.54.0 は、構成された Agent トランスポートを通じて実験エクスポージャーを送信します。直接の EVP フォールバックや集約された EVP フラグ評価イベントは提供されません。互換性のあるリレーがない場合、エクスポージャーは配信されません。
- EVP フラグ評価イベントパスのみを無効にするには、`DD_FLAGGING_EVALUATION_COUNTS_ENABLED=false` を設定してください。

`feature_flag.evaluations` メトリクスは、個別の OpenTelemetry (OTLP) シグナルです。ポート 8126 での標準的な `serverless-init` コネクションでは、このメトリクスの OTLP エンドポイントは構成されません。Agent を使用しないサーバーレス環境の場合は、このメトリクスを有効にする前にプラットフォームのサーバーレステレメトリパスを構成します。[サーバーサイドのフラグ評価メトリクスをセットアップする][10]を参照してください。

### serverless-init を構成する {#configure-serverless-init}

1. プラットフォームの [Serverless Monitoring][11] セットアップを完了します。これらの手順には、サポート対象コンテナ内およびサイドカーの構成、必要な環境変数、およびネットワーク設定が記載されています。

1. 以下の Feature Flags 要件を適用します。
   - `serverless-init` 1.9.13 以降を使用します。以前のバージョンは、必要な EVP ルートに対応していません。
   - エージェントレス CDN 構成配信のアプリケーション環境で `DD_API_KEY` と `DD_SITE` を保持します。サイドカーでもテレメトリの送信にそれらが必要です。
   - Feature Flags 専用のエンドポイントを構成しないでください。SDK は、Serverless Monitoring セットアップによって構成された標準のトレーサーコネクションを使用します。
   - Node.js および Java は、ローカル EVP プロキシを検出するためにトレーサー URL で `GET /info` を呼び出します。Python および .NET 3.54.0 は、この検出リクエストなしでサポート対象 EVP イベントを同じ URL に送信します。

### テレメトリの送信を検証する {#verify-telemetry-egress}

1. OpenFeature プロバイダーを初期化し、準備が完了していることを確認します。
2. 実験に関連付けられたフラグを評価し、実験がエクスポージャーイベントを受信することを確認します。
3. ローカルテレメトリリレーを使用する場合は、アプリケーションおよび `serverless-init` のログでポート 8126 へのコネクションエラーをチェックします。
4. Java および Python の場合、EVP フラグ評価イベントが必要なときは `DD_FLAGGING_EVALUATION_COUNTS_ENABLED` が `false` に設定されていないことを確認してください。
5. `feature_flag.evaluations` メトリクスを使用する場合は、[サーバーサイドのフラグ評価メトリクスをセットアップする][10]を参照して、その個別の OTLP パスを検証してください。

## Agent-backed Remote Configuration {#agent-backed-remote-configuration}

既存の Agent Remote Configuration パスを明示的に使用するために `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` を設定します。

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

Java の場合は、互換性のある `dd-openfeature` および `dd-java-agent` バージョンを使用してください。両方のコンポーネントでバージョン 1.66.0 以降を使用してください。

Remote Configuration と API キーで Agent を構成します。

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

サーバーレスワークロードはプライベートネットワーク上で Agent にリーチできる必要があり、Agent は HTTPS 経由で Datadog にリーチできる必要があります。Agent のトレース取り込みを公開しないでください。

`remote_config` を明示的に選択すると、アプリケーションコードがプロバイダーを初期化していない場合でも、Feature Flags Remote Configuration サブスクリプションが有効になります。これらのリクエストは、サーバー Feature Flags の請求対象となります。

## 運用上の検討事項 {#operational-considerations}

- **コールドスタート**: プロバイダーの初期化をブロックすると、最初の構成を待機するため、コールドスタートのレイテンシーが増加する可能性があります。起動時に呼び出し元が提供したデフォルト値を使用しても問題ない場合は、非同期で初期化してください。
- **アウトバウンド接続**: Agentless 配信には、Datadog 管理のフラグ構成サービスへのアウトバウンド HTTPS アクセスが必要です。
- **API キーの所有権**: エージェントレスモードでは、アプリケーションが構成用の `DD_API_KEY` を所有します。`serverless-init` サイドカーでもテレメトリの送信にキーが必要です。`remote_config` モードでは、Agent が API キーを所有します。
- **フラグの更新**: 配信は最終的に安定します。変更をテストする際は、SDK のポーリング間隔とアプリケーションの起動時間を考慮してください。
- **Last-known-good 動作**: 構成が受け入れられた後、一時的なネットワーク障害や不正な形式の応答によって構成が置き換えられることはありません。
- **ランタイムサポート**: Java には Java 11 以降が必要です。Node.js、Python、および .NET については、トレーサーのランタイム互換性要件をチェックしてください。.NET ランタイムは、自動インスツルメンテーションされたトレーサーの読み込みをサポートしている必要があります。
- **キルスイッチ**: `DD_FEATURE_FLAGS_ENABLED` のデフォルトは `true` です。`false` に設定すると、プロバイダーと両方の構成配信パスが無効になります。その場合、評価は呼び出し元が提供したデフォルト値を返します。

これらのバージョンの Datadog for Government では、Datadog 管理エージェントレス配信は利用できません。そのサイトでは Agent Remote Configuration を使用してください。

デプロイメントで `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` を使用している場合は、[従来のプロバイダー設定から移行する][5]を参照してください。

## 環境に関するメモ {#environment-notes}

### AWS Lambda {#aws-lambda}

Java、Node.js、および Python の Lambda 関数は、最小 SDK バージョンを実行しており、HTTPS 経由で Datadog にリーチできる場合、エージェントレス構成配信を使用できます。Java 関数は、直接または `JAVA_TOOL_OPTIONS` を介して `dd-java-agent` を `-javaagent` で読み込む必要があります。Java トレーシングレイヤーがこのセットアップを提供できます。Datadog Lambda Extension は、フラグ構成には不要です。

### Google Cloud サーバーレス環境 {#google-cloud-serverless-environments}

Java ワークロードは、ランタイムが `dd-java-agent` を読み込める場合、Java 11 以降でエージェントレス構成配信を使用できます。[Cloud Run Functions][7] および [Cloud Run コンテナ][8]の Java セットアップでは、`JAVA_TOOL_OPTIONS` を使用して `-javaagent` を設定します。Node.js および Python のワークロードには、サポート対象のトレーサーランタイムが必要です。すべてのランタイムにアウトバウンド HTTPS アクセスが必要です。

### Azure Functions {#azure-functions}

Java 関数アプリは、ランタイムが `dd-java-agent` を読み込める場合、Java 11 以降でエージェントレス構成配信を使用できます。Node.js および Python の関数アプリには、サポート対象のトレーサーランタイムが必要です。すべてのランタイムにアウトバウンド HTTPS アクセスが必要です。外部の Datadog Agent は、`remote_config` が選択されている場合にのみ必要です。

### エッジランタイム {#edge-runtimes}

一部のエッジランタイムは、Feature Flags プロバイダーが必要とする Datadog Node.js トレーサー API に対応していません。エージェントレス構成配信を利用する前に、ターゲットプラットフォームのトレーサー互換性を確認してください。

## パブリック API とローカル評価 {#public-api-and-local-evaluation}

パブリック [Feature Flags API][4]は、フラグと環境を管理するためのものです。これは、サーバーサイドアプリケーション向けのリクエストごとのフラグ評価 API ではありません。

フラグを評価するためにサーバーレスの呼び出しごとに Datadog API へのクエリを実行しないでください。定期的にフラグ設定を読み込んでローカルで評価を行うサーバー SDK を使用してください。

## セットアップを検証する {#validate-your-setup}

本番環境で Feature Flags を有効にする前に、以下を行います。

1. アプリケーションが[最小サポート対象 SDK バージョン](#overview)を使用していることを確認します。Java の場合は、JVM が `dd-java-agent` を読み込むことを確認します。.NET については、自動インスツルメンテーションによってトレーサーが読み込まれることを確認してください。
2. エージェントレス配信の場合は、アプリケーションに `DD_API_KEY`、`DD_SITE`、および `DD_ENV` があることを確認します。Agent Remote Configuration の場合は、Agent に API キーと Remote Configuration が有効になっていることを確認します。
3. OpenFeature プロバイダーを初期化し、準備が完了していることを確認します。
4. Datadog で非本番環境のフラグを変更し、ポーリング間隔の経過後にワークロードが更新された値を受け取ることを確認します。
5. コールドスタート時に構成が利用できない場合、アプリケーションが呼び出し元から提供されたデフォルト値を処理することを確認します。
6. テレメトリについては、サポート対象リレーを構成し、各必須シグナルを検証します。`feature_flag.evaluations` には個別の OTLPセットアップを使用してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/remote_configuration/
[2]: /ja/feature_flags/server/
[3]: /ja/feature_flags/server/nodejs/
[4]: /ja/api/latest/feature-flags/
[5]: /ja/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[6]: /ja/feature_flags/server/java/
[7]: /ja/serverless/google_cloud_run/functions/java/?tab=maven
[8]: /ja/serverless/google_cloud_run/containers/in_container/java/
[9]: /ja/feature_flags/server/python/
[10]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[11]: /ja/serverless/
[12]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/
[13]: /ja/feature_flags/server/dotnet/