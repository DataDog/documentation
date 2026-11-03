---
description: サーバーサイドアプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイド Feature Flags
- link: /remote_configuration/
  tag: ドキュメント
  text: Remote Configuration
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドのフラグ評価メトリクスを設定する
- link: /feature_flags/concepts/flag_graphs/
  tag: 概念
  text: Feature Flag グラフ
- link: /feature_flags/implementation_patterns/serverless/
  tag: ドキュメント
  text: サーバーレス環境と Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: 概念
  text: サーバー SDK 設定ソース
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースエンリッチメントを設定する
title: サーバーサイド Feature Flags
---
## 概要{#overview}

サーバーサイドアプリケーション向けの Datadog Feature Flags を使用すると、機能の可用性をリモートで制御し、実験を行い、新しい機能を安心して段階的に展開できます。サーバーサイド SDK はフラグ構成を受け取り、ローカルでフラグを評価します。一部の SDK は、構成の配信やテレメトリに Datadog トレーサーを使用します。

Datadog Feature Flags は、Feature Flag API のオープンソースかつベンダーニュートラルな仕様である、[OpenFeature 標準](https://openfeature.dev/docs/reference/intro/)をベースに構築されています。プロバイダー、評価コンテキスト、フックといった OpenFeature の概念に馴染みがない場合は、[OpenFeature の概念に関するドキュメント](https://openfeature.dev/docs/category/concepts)を参照してください。

## 構成の配信{#configuration-delivery}

Agentless の[構成配信][8]は、これをサポートするサーバー SDK バージョンではデフォルトで使用されます。SDK は、Datadog が管理する CDN から HTTPS 経由でフラグ構成を直接取得し、ローカルでフラグを評価します。フラグ構成を取得するために Datadog Agent は必要ありません。

デフォルトのソースでは、すべてのトレーサーインストールに対して Feature Flags のトラフィックが発生するわけではありません。Agentless のポーリングは、アプリケーションコードが Datadog OpenFeature プロバイダーを初期化するか、アクセスした場合にのみ開始されます。`remote_config` を明示的に選択すると、Feature Flags Remote Configuration サブスクリプションが有効になります。どちらのソースを経由したリクエストも、サーバーの Feature Flags の課金対象となります。

| SDK | Agentless 対応の最小バージョン |
|---|---|
| Java `dd-openfeature` および `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

Java CDN 配信には、`dd-openfeature` と `dd-java-agent` が必要です。フラグ構成を取得するために Datadog Agent は必要ありません。

<div class="alert alert-warning">Node.js の初期の Agentless リリースでは、構成の配信とローカルでのフラグ評価のみがサポートされています。これらは評価メトリクスや露出イベントをエクスポートしません。Java および Python の Agentless 配信では、構成ソースのみが変更されます。Java および Python は、サポート対象の Datadog Agent または Serverless テレメトリパスがない場合、これらのシグナルをエクスポートしません。</div>

Agentless 配信は、リストされている SDK とバージョンで利用可能です。その他のサーバー SDK は、Agent Remote Configuration を使用します。

## 言語の選択 {#choose-a-language}

言語またはフレームワークを選択して、SDK 固有のセットアップ手順を確認してください。

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

サーバーレスランタイムについては、Agent なしのセットアップ、バージョン要件、および初期のテレメトリの制限事項について、[サーバーレス環境][5]を参照してください。

## 前提条件{#prerequisites}

要件は、選択した SDK および構成ソースによって異なります。標準的な要件は次のとおりです。

- SDK ページに記載されている、言語固有のトレーサーまたは OpenFeature プロバイダーのバージョン
- Datadog の [API キー][2]

Java CDN 配信には、アプリケーションプロセス内に Java Agent が必要です。APM トレーシングや別個の Datadog Agent サービスは必要ありません。

ソース固有の要件は次のとおりです。

| ソース | 要件 |
|---|---|
| `agentless`(サポートされている場合のデフォルト) | アプリケーションプロセス内で `DD_API_KEY`、`DD_SITE`、および `DD_ENV` を設定します。フラグ構成を取得するために Agent は必要ありません。|
| `remote_config` | Remote Configuration が有効になっている Datadog Agent 7.55 以降、Agent 上で構成された API キー、および [{{< ui >}}Organization Settings{{< /ui >}}][3] で組織に対して有効になっている Remote Configuration。Java には、互換性のある `dd-openfeature` および `dd-java-agent` バージョンも必要です。|

## Agentless の構成 {#agentless-configuration}

[サポートされている SDK バージョン](#configuration-delivery)で、アプリケーションプロセスに次の設定を行います。

{{< code-block lang="bash" >}}
# Required for direct configuration delivery
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Feature Flags の有効化やソース設定は不要です。依存関係のバージョンと言語固有の初期化方法については、[Java Feature Flags][10]、[Node.js Feature Flags][9]、または [Python Feature Flags][11] を参照してください。プロバイダーを初期化するか、アクセスすると、CDN へのポーリングが開始されます。トレーサーのインストールと初期化だけでは開始されません。

## Agent Remote Configuration {#agent-remote-configuration}

Java、Node.js、Python では、Agent 管理による配信を継続するために、次のようにソースを明示的に設定してください。

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Remote Configuration は、Agent 7.47.0 以降でデフォルトで有効になっています。Agent で Remote Configuration が無効になっている場合は、`DD_REMOTE_CONFIGURATION_ENABLED=true` を設定するか、`datadog.yaml` に`remote_configuration.enabled: true` を追加して再度有効にしてください。

デプロイ環境ごとの詳細なセットアップ手順については、[Remote Configuration のドキュメント][1]を参照してください。

既存の Java、Node.js、Python の実装で `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` を設定している場合は、移行期間中も Remote Configuration が使用されます。この設定は非推奨です。[レガシープロバイダー設定からの移行][7]を参照して、Remote Configuration を明示的に継続して使用するか、Agentless 配信に移行してください。

### Remote Configuration のポーリング間隔 {#remote-configuration-polling-interval}

Agent は、設定可能な間隔で Datadog にポーリングを行い、構成の更新を確認します。

{{< code-block lang="bash" >}}
# Optional: Configure the Agent polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

## 高度なアプリケーション設定 {#advanced-application-configuration}

標準の Datadog 環境変数を使用してアプリケーションを設定します。これらはすべてのサーバーサイド SDK で共通です。

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>

# Optional: Disable Feature Flags and both delivery paths
# DD_FEATURE_FLAGS_ENABLED=false

# Optional: Enable flag evaluation metrics
# See "Set Up Server-Side Flag Evaluation Metrics" documentation
{{< /code-block >}}

<div class="alert alert-info">上記の Java、Node.js、Python のバージョンでは、<code>DD_FEATURE_FLAGS_ENABLED</code> のデフォルト値は <code>true</code>であるため、設定する必要はありません。これを <code>false</code> に設定すると、プロバイダー、CDN へのポーリング、および Feature Flags Remote Configuration サブスクリプションが無効になります。他のサーバー SDK では、各言語のページに記載されているアクティベーション設定が引き続き使用されます。</div>

対応している SDK および配信モードについては、<a href="/feature_flags/guide/server_flag_evaluation_metrics/">サーバーサイドのフラグ評価メトリクスを設定する</a>を参照して、 <code>feature_flag.evaluations</code> メトリクスを有効にしてください。Node.js の初期の Agentless リリースでは、評価メトリクスやエクスポージャーイベントはエクスポートされません。Java および Python でこれらのシグナルをエクスポートするには、サポートされている Datadog Agent またはサーバーレステレメトリの経路が必要です。利用可能なグラフについては、<a href="/feature_flags/concepts/flag_graphs/">Feature Flag グラフ</a>を参照してください。Feature Flag の評価データを APM トレースに付加してフィルタリングや実験を行うには、<a href="/feature_flags/guide/apm_trace_enrichment/">Feature Flags の APM トレースエンリッチメントの設定</a>を参照してください。

## インメモリプロバイダーを使ったテスト {#testing-with-in-memory-providers}

Datadog は次のテスト手法をサポートしています。

- **統合テスト**: `DatadogProvider` を専用のテスト環境に接続し、Datadog UI からフラグの値を制御します。これにより、実際のプロバイダーと選択した構成ソースをエンドツーエンドで検証できます。
- **ユニットテスト**: `DatadogProvider` を OpenFeature の標準の`InMemoryProvider` (使用する言語でインメモリプロバイダーがない場合は同等のテストスタブ) に置き換え、テストコード内で直接フラグの値を設定します。これにより、テストを独立してオフラインで実行できます。

このセクションでは、インメモリ方式について説明します。OpenFeature API は実行時にプロバイダーを入れ替えられるように設計されているため、アプリケーションのコードを変更する必要はありません。テストのセットアップ時に登録するプロバイダーだけを変更します。

一般的なテストは次のパターンに従います。

1. テストのセットアップで、フラグキーとバリアントのマップを作成します。
2. OpenFeature API を介して、そのマップを使う `InMemoryProvider` を登録します。
3. テスト対象のユニットで OpenFeature クライアントを呼び出します。`InMemoryProvider` は、テストのセットアップで構成したフラグの割り当てを返します。
4. テストの後処理でプロバイダーをリセットし、テスト間で状態が引き継がれないようにします。

具体的なテスト例については、各言語の SDK ページ (このページの上部から選択) を参照してください。

## コンテキスト属性の要件 {#context-attribute-requirements}

<div class="alert alert-warning">
評価コンテキストの属性は、フラットなプリミティブ値 (文字列、数値、ブール値) である必要があります。ネストされたオブジェクトや配列は<strong>サポートされておらず</strong>、イベントが通知なく破棄されます。
</div>

評価コンテキストではフラットな属性を使用してください。

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID,
  companyId: req.session?.companyID,
  tier: 'enterprise'
};

const value = client.getBooleanValue('my-flag', false, evaluationContext);
{{< /code-block >}}

ネストされたオブジェクトや配列は避けてください。

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: req.session?.userID,
  company: { id: req.session?.companyID },  // nested object - NOT SUPPORTED
  roles: ['admin', 'user']                   // array - NOT SUPPORTED
};
{{< /code-block >}}

## 関連資料{#further-reading}

パーセンテージベースのロールアウトおよび決定論的なバケット分割については、[トラフィックの分割とランダム化](/feature_flags/concepts/traffic_splitting/)を参照してください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/remote_configuration
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /ja/tracing/guide/#tutorials-enabling-tracing
[5]: /ja/feature_flags/implementation_patterns/serverless/
[7]: /ja/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /ja/feature_flags/concepts/configuration_sources/
[9]: /ja/feature_flags/server/nodejs/
[10]: /ja/feature_flags/server/java/
[11]: /ja/feature_flags/server/python/