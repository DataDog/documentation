---
description: Datadog Agent の有無にかかわらず、サーバーレス環境で Datadog Feature Flags サーバー SDK を使用します。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイド Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: 概念
  text: サーバー SDK 設定ソース
- link: /remote_configuration/
  tag: ドキュメント
  text: Remote Configuration
- link: /serverless/
  tag: ドキュメント
  text: Serverless Monitoring
title: サーバーレス環境
---
## 概要{#overview}

Datadog Feature Flags の Java、Node.js、および Python SDK は、Datadog が管理する CDN から直接フラグ構成を受信できます。この _Agentless_ 構成ソースは、フラグ構成に Datadog Agent を必要としないため、オンボーディングを簡素化します。また、Datadog Agent に接続できないサーバーレスアプリケーションもサポートします。

構成が読み込まれた後、フラグの評価はアプリケーション内でローカルに行われます。SDK は、評価のたびにネットワークリクエストを行いません。

Agentless 構成配信は、以下で利用できます。

| SDK | 最小バージョン |
|---|---|
| Java `dd-openfeature` および `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

Java CDN 配信には `dd-openfeature` と `dd-java-agent` が必要です。Java ランタイムは、`dd-java-agent` を `-javaagent` JVM オプションで読み込める必要があります。このオプションは、Java コマンドまたは `JAVA_TOOL_OPTIONS` を通じて渡すことができます。

その他のサーバー SDK および記載されているバージョンより前のバージョンでは、フラグ配信に Agent Remote Configuration が必要です。

<div class="alert alert-warning">初期の Node.js Agentless リリースでは、構成を読み込み、ローカルでフラグを評価します。これらは評価メトリクスや露出イベントをエクスポートしません。Java および Python の Agentless 配信では、構成ソースのみが変更されます。Java および Python は、サポート対象の Datadog Agent または Serverless テレメトリパスがない場合、これらのシグナルをエクスポートしません。</div>

## Agentless アーキテクチャ {#agentless-architecture}

サーバーレスランタイムが Datadog へのアウトバウンド HTTPS リクエストを行える場合は、Agentless 配信を使用します。Java の場合、ランタイムで `-javaagent` JVM オプションも設定できるようにする必要があります。

1. [サポート対象の SDK バージョン](#overview)を使用します。
2. Java の場合は、`-javaagent` または `JAVA_TOOL_OPTIONS` を使用して `dd-java-agent` を読み込みます。例については、[Cloud Run Functions][7] または [Cloud Run コンテナ][8]の Java セットアップを参照してください。
3. サーバーレスアプリケーションで API キー、Datadog サイト、および環境を構成します。

   {{< code-block lang="bash" >}}
   DD_API_KEY=<DATADOG_API_KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   DD_ENV=<YOUR_ENVIRONMENT>{{< /code-block >}}

4. [Java][6]、[Node.js][3]、または [Python][9] のセットアップで説明されているように、Datadog OpenFeature プロバイダーを初期化またはアクセスします。これにより、CDN ポーリングが開始されます。Feature Flags の有効化やソース設定は不要です。
5. `DD_API_KEY` をサーバーレスプラットフォームのシークレットマネージャーに保存し、アプリケーションプロセスにのみ公開します。

SDK はデフォルトで 30 秒ごとに Datadog が管理する CDN をポーリングし、変更されていない構成には ETag を使用します。一時的なエラーが発生した場合でも、最後に受け入れた構成が保持されます。構成が受け入れられていない場合、OpenFeature の評価は呼び出し元が指定したデフォルト値を返します。

トレーサーのインストールと初期化だけでは、CDN のポーリングは開始されません。CDN へのリクエストは、アプリケーションコードがプロバイダーをアクティブ化した後にのみ、サーバー Feature Flags の課金対象となります。

Agentless モードでは、_フラグ構成_に対する Datadog Agent の依存関係がなくなります。言語固有のトレーサー要件は削除されません。また、APM や serverless テレメトリの構成や有効化も行われません。Datadog Lambda Extension、`serverless-init`、Agent sidecar、またはその他のサポートされているテレメトリパスを個別に利用できます。

## Agent-backed Remote Configuration {#agent-backed-remote-configuration}

既存の Agent Remote Configuration パスを明示的に使用するには、`DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` を設定します。

{{< code-block lang="bash" >}}
# Serverless application
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_AGENT_HOST=<PRIVATE_AGENT_HOSTNAME_OR_IP>
DD_TRACE_AGENT_PORT=8126
{{< /code-block >}}

Java の場合は、互換性のある `dd-openfeature` および `dd-java-agent` のバージョンを使用してください。両方のコンポーネントでバージョン 1.65.0 以降を使用してください。

Remote Configuration と API キーを使用して Agent を構成します。

{{< code-block lang="bash" >}}
DD_REMOTE_CONFIGURATION_ENABLED=true
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
{{< /code-block >}}

サーバーレスワークロードはプライベートネットワーク上で Agent に到達できる必要があり、Agent は HTTPS 経由で Datadog に到達できる必要があります。Agent のトレース取り込みを公開しないでください。

`remote_config` を明示的に選択すると、アプリケーションコードがプロバイダーを初期化しない場合でも、Feature Flags Remote Configuration サブスクリプションが有効になります。これらのリクエストは、サーバー Feature Flags の課金対象となります。

## 運用上の考慮事項 {#operational-considerations}

- **コールドスタート**: プロバイダーの初期化をブロックすると最初の構成を待機するため、コールドスタートのレイテンシーが増加する可能性があります。起動時に呼び出し元が提供したデフォルト値を提供しても問題ない場合は、非同期で初期化してください。
- **アウトバウンド接続**: Agentless 配信には、Datadog が管理するフラグ設定サービスへのアウトバウンド HTTPS アクセスが必要です。
- **API キーの所有権**: Agentless モードでは、アプリケーションが `DD_API_KEY` を所有します。`remote_config` モードでは、Agent が API キーを所有します。
- **フラグの更新**: 配信は結果整合性があります。変更をテストする際は、SDK のポーリング間隔とアプリケーションの起動時間を考慮してください。
- **最後に確認された正常な動作**: 設定が受け入れられた後、一時的なネットワーク障害や不正な形式の応答が発生しても、その設定が置き換えられることはありません。
- **ランタイムサポート**: Java には Java 11 以降が必要です。Node.js および Python については、トレーサーのランタイム互換性要件を確認してください。
- **キルスイッチ**: `DD_FEATURE_FLAGS_ENABLED` のデフォルトは `true` です。プロバイダーと両方の構成配信パスを無効にするには、`false` に設定してください。その場合、評価は呼び出し元が提供したデフォルト値を返します。

Datadog が管理する Agentless 配信は、これらのバージョンの Datadog for Government では利用できません。そのサイトでは Agent Remote Configuration を使用してください。

デプロイメントで `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` を使用している場合は、[レガシープロバイダー設定からの移行][5]を参照してください。

## 環境に関する注記{#environment-notes}

### AWS Lambda {#aws-lambda}

Java、Node.js、および Python の Lambda 関数は、最小 SDK バージョンを満たし、HTTPS 経由で Datadog に接続できる場合、Agentless 構成配信を使用できます。Java 関数は、直接または `JAVA_TOOL_OPTIONS` を介して、`dd-java-agent` と `-javaagent` を読み込む必要があります。Java トレーシングレイヤーでこのセットアップを提供できます。フラグ構成に Datadog Lambda Extension は必要ありません。

### Google Cloud サーバーレス環境 {#google-cloud-serverless-environments}

Java ワークロードでは、ランタイムが `dd-java-agent` を読み込める場合、Java 11 以降で Agentless 構成配信を使用できます。[Cloud Run Functions][7] および [Cloud Run コンテナ][8]の Java セットアップでは、`JAVA_TOOL_OPTIONS` を使用して `-javaagent` を設定します。Node.js および Python ワークロードには、サポートされているトレーサーランタイムが必要です。すべてのランタイムで、アウトバウンド HTTPS アクセスが必要です。

### Azure Functions {#azure-functions}

Java 関数アプリでは、ランタイムが `dd-java-agent` を読み込める場合、Java 11 以降で Agentless 構成配信を使用できます。Node.js および Python 関数アプリには、サポートされているトレーサーランタイムが必要です。すべてのランタイムで、アウトバウンド HTTPS アクセスが必要です。外部 Datadog Agent が必要なのは、`remote_config` が選択されている場合のみです。

### エッジランタイム {#edge-runtimes}

一部のエッジランタイムは、Feature Flags プロバイダーが必要とする Datadog Node.js tracer API をサポートしていません。Agentless 構成配信を利用する前に、ターゲットプラットフォームのトレーサー互換性を確認してください。

## パブリック API とローカル評価 {#public-api-and-local-evaluation}

パブリック [Feature Flags API][4] は、フラグと環境を管理するためのものです。これは、サーバーサイドアプリケーション向けの、リクエストごとのフラグ評価 API ではありません。

フラグを評価するために、サーバーレスの呼び出しごとに Datadog API へクエリを実行しないでください。フラグ構成を定期的に読み込み、ローカルで評価するサーバー SDK を使用してください。

## セットアップの検証 {#validate-your-setup}

本番環境で Feature Flags を有効にする前に、以下を確認してください。

1. アプリケーションが[サポートされている最小 SDK バージョン](#overview)を使用していることを確認してください。Java の場合は、JVM が `dd-java-agent` を読み込むことを確認してください。
2. Agentless 配信の場合は、アプリケーションに `DD_API_KEY`、`DD_SITE`、および `DD_ENV` があることを確認してください。Agent Remote Configuration の場合は、Agent の API キーと Remote Configuration が有効になっていることを確認してください。
3. OpenFeature プロバイダーを初期化し、準備完了状態に達することを確認してください。
4. Datadog で非本番環境のフラグを変更し、ポーリング間隔の経過後にワークロードが更新された値を受け取ることを確認してください。
5. コールドスタート時に構成が利用できない場合、アプリケーションが呼び出し元から提供されたデフォルト値を処理することを確認してください。
6. Node.js の場合、評価メトリクスやエクスポージャーデータに基づいた実験ワークフローを計画しないでください。Java および Python の場合は、これらのシグナルを使用する前に、サポートされている Datadog Agent またはサーバーレステレメトリパスを構成してください。

## 関連資料{#further-reading}

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