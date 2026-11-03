---
description: Datadog Feature Flags サーバー SDK がどのようにフラグ構成を受信するかを学習します。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags をセットアップする
- link: /feature_flags/implementation_patterns/serverless/
  tag: ドキュメント
  text: サーバーレス環境で Feature Flags を使用する
- link: /remote_configuration/
  tag: ドキュメント
  text: Remote Configuration について学習する
title: サーバー SDK 構成ソース
---
Datadog Feature Flags [サーバーサイド SDK][3] は、フラグ構成からローカルでフラグを評価します。_構成ソース_は、SDK がその構成をどのように受信するかを決定します。OpenFeature の評価セマンティクスは変更されません。

## 構成ソースを選択する{#choose-a-configuration-source}

サポートされているサーバー SDK では、以下の構成ソースオプションを利用できます。

`agentless`
: SDK は、Datadog が管理する CDN から HTTPS 経由で定期的にフラグ構成をフェッチします。
  - ポーリングは、アプリケーションコードが Datadog OpenFeature プロバイダーを初期化またはアクセスしたときに開始されます。
  - フラグ構成に Datadog Agent は不要です。

`remote_config`
: Datadog Agent は、Remote Configuration を通じてフラグ構成を受信し、それを SDK に配信します。
  - `remote_config` を選択すると、Feature Flags Remote Configuration サブスクリプションが有効になります。
  - Remote Configuration が有効な Datadog Agent が必要です。

Agentless 配信は、[サポートされている SDK バージョン](#use-agentless-delivery)のデフォルトです。その他のサーバー SDK は、フラグ配信に [Agent Remote Configuration](#use-agent-remote-configuration) を使用します。

ソースを明示的に選択する場合にのみ、`DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` を設定してください。

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
{{< /code-block >}}

SDK は、初期化中に一度ソースを解決します。ソースを変更するには、アプリケーションを再起動してください。

## Agentless 配信を使用する{#use-agentless-delivery}

Agentless 配信を開始するには、以下のいずれかの最小バージョンを使用してください。

| SDK | 最小バージョン |
|---|---|
| Java `dd-openfeature` および `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

Java CDN 配信には `dd-openfeature` および `dd-java-agent` が必要です。フラグ構成に Datadog Agent は必要ありません。

アプリケーションプロセスで API キー、Datadog サイト、および環境を構成してください。

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

次に、アプリケーションコードで Datadog OpenFeature プロバイダーを初期化するか、アクセスしてください。[Java][4]、[Node.js][2]、または [Python][5] のセットアップ手順を参照してください。

configuration-source や provider-enable の設定は不要です。ポーリングが開始されるのは、アプリケーションコードがプロバイダーを初期化またはアクセスした場合のみ開始です。トレーサーのインストールや初期化だけでは、Feature Flags CDN トラフィックは発生しません。

<div class="alert alert-warning">初期の Node.js Agentless リリースでは、構成配信とローカルフラグ評価のみがサポートされています。評価メトリクスやエクスポージャーイベントはエクスポートされません。Java および Python の Agentless 配信では、構成ソースのみが変更されます。サポートされている Datadog Agent またはサーバーレステレメトリパスがない場合、Java および Python はこれらのシグナルをエクスポートしません。</div>

### Agentless 配信を構成する{#configure-agentless-delivery}

`DD_SITE` を組織の Datadog サイトに設定してください。このドキュメントページで選択したサイトについては、以下を使用してください。 {{< region-param key="dd_site" code="true" >}}Agentless ソースは、以下の運用設定もサポートしています。

| 環境変数 | デフォルト | 説明 |
|---|---|---|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` | Datadog 管理エンドポイント | Agentless フラグ構成エンドポイントまたはベース URL を上書きします。『[カスタム Agentless エンドポイントを使用する](#use-a-custom-agentless-endpoint)』を参照してください。|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | 完了したポーリング試行間の時間を設定する正の整数。Java は試行を制限しませんが、Node.js と Python は値を 3600 秒に制限します。|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `5` | 個別の構成リクエストのタイムアウトを設定する正の整数。|

SDK はバックグラウンドで構成を取得し、フラグをローカルで評価します。個別のフラグ評価では、ネットワークリクエストは行われません。Agentless ソースは、以下の処理を行います。

- デフォルトで 30 秒ごとにポーリングします
- デフォルトで 5 秒のリクエストタイムアウトを使用します
- ETag を使用して、変更されていない構成のダウンロードを回避します
- 一時的なネットワークエラーやペイロードエラーが発生した場合でも、最後に受け取った構成を保持します
- ポーリングの重複の防止

Datadog 管理 CDN は、世界中に分散した拠点、ネットワークピアリング、および冗長ルーティングを使用します。そのため、サービスを提供する場所は、ほとんどのアプリケーションワークロードに対して地理的に近くなる可能性が高いです。

`DD_API_KEY` はシークレットマネージャーに保管し、フラグ設定を読み込むアプリケーションプロセスにのみ公開してください。Agentless 構成配信では、API キーがアプリケーションから Datadog へ HTTPS 経由で直接送信されます。

### カスタム Agentless エンドポイントを使用する{#use-a-custom-agentless-endpoint}

標準的なデプロイメントには、Datadog 管理エンドポイントが推奨されます。高度なテスト、ローカル開発、またはオペレーター管理のプロキシの場合は、`DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` で上書きします。

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL=http://localhost:8080
{{< /code-block >}}

カスタム URL は、HTTP または HTTPS を使用する必要があります。オリジンまたはルートパスしか含まれていない場合、SDK は標準のフラグ構成パスを追加します。ルート以外のパスが含まれている場合、SDK はそのパスを完全なエンドポイントとして使用します。

SDK は、`DD_API_KEY` を HTTPS 経由でのみ、デフォルトの Datadog 管理エンドポイントに送信します。Datadog API キーをカスタムエンドポイントに転送することはありません。カスタムエンドポイントは、制御されたローカル開発環境では HTTP を使用できますが、ローカル開発環境外のエンドポイントには HTTPS を使用してください。

カスタムエンドポイントの設定が無効な場合、SDK はプロバイダーを無効のままにし、構成エラーをログに記録し、評価は呼び出し元が提供したデフォルト値を返します。

サポートされている SDK バージョンの Datadog for Government では、Datadog 管理 Agentless 配信は利用できません。そのサイト上のアプリケーションは、Agent Remote Configuration を使用しない限り、呼び出し元が提供したデフォルト値を使用し続けます。

### 既存の Remote Configuration セットアップを移行する{#migrate-an-existing-remote-configuration-setup}

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`を設定した既存のお客様は、移行期間中、Remote Configuration のままとなります。この非推奨の設定は互換性のためのブリッジであり、長期的な構成ではありません。

Agentless 配信を使用する準備ができた場合、以下の手順に従います。

1. `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` を設定してください。
2. Datadog 管理エンドポイントについては、アプリケーションで `DD_API_KEY`、`DD_SITE`、および`DD_ENV` を設定してください。
3. プロバイダーを初期化し、フラグの更新を受信していることを確認してください。
4. `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` を削除してください。移行が完了した後は、非推奨の設定が有効なままにしないでください。

一時的に Agent Remote Configuration のままにするには、`DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` を設定してから `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` を削除してください。API キーは Agent 上に残ります。

`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` を設定している場合は、`DD_FEATURE_FLAGS_ENABLED=false` に置き換えてください。

明示的な `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` 値は、レガシー設定よりも優先されます。レガシー設定が削除された後、明示的なソースを持たないアプリケーションは Agentless 配信を使用します。Agent 配信を継続したい場合は、非推奨のレガシー設定が削除される前に `remote_config` を明示的に設定してください。

## Agent Remote Configuration を使用する{#use-agent-remote-configuration}

Agent 管理配信を使用するには、ソースを `remote_config` に設定します。

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Java の場合、Remote Configuration には互換性のある `dd-openfeature` および `dd-java-agent` バージョンが必要です。両方のコンポーネントでバージョン 1.65.0 以降を使用してください。

API キーはアプリケーションプロセス内ではなく、Agent 上で設定してください。Agent で Remote Configuration が無効になっている場合は、再度有効にしてください。Agent のセットアップとネットワーク要件については、[Remote Configuration][1] を参照してください。

## 高度な構成 {#advanced-configuration}

### Feature Flags の有効化または無効化{#enable-or-disable-feature-flags}

`DD_FEATURE_FLAGS_ENABLED` はデフォルトで `true` に設定されているため、新規セットアップで設定する必要はありません。`false` に設定すると、プロバイダーと両方の構成配信パスが無効になります。

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_ENABLED=false
{{< /code-block >}}

### アクティベーションと課金{#activation-and-billing}

Server Feature Flags の課金は、Remote Configuration または CDN を介して行われた構成リクエストに基づきます。トレーサーのインストールのみでは、どちらの配信パスもアクティブになりません。

- デフォルトの Agentless ソースの場合、アプリケーションコードが Datadog OpenFeature プロバイダーを初期化またはアクセスしないと、CDN ポーリングは開始されません。
- `remote_config` を明示的に選択すると、Agent Feature Flags サブスクリプションが開始されます。プロバイダーを初期化するためにアプリケーションコードは必要ありません。

### 構成の優先順位{#configuration-precedence}

| 構成 | 結果 |
|---|---|
| `DD_FEATURE_FLAGS_ENABLED=false` | 他の設定に関係なく、プロバイダーと両方の配信パスが無効になります。|
| 明示的な `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` | CDN 配信を選択します。アプリケーションコードがプロバイダーを初期化またはアクセスすると、ポーリングが開始されます。|
| 明示的な `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` | Agent 配信が選択され、Feature Flags Remote Configuration サブスクリプションが有効になります。|
| 空白の、または空白文字のみの `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` | ソースが未設定として扱われるため、レガシー移行設定または Agentless のデフォルトが適用されます。|
| 明示的な `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=offline` またはその他のサポートされていない空白以外の値 | アプリケーションコードがプロバイダーにアクセスしたときに、フェイルクローズします。SDK は CDN または Remote Configuration 配信を選択しません。|
| ソースなし、かつ `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` | 移行期間中は Remote Configuration を保持します。|
| ソースなし、かつ `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` | プロバイダーと両方の配信パスを無効のままにします。|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` も `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` も設定されていない| Agentless 配信が選択されます。アプリケーションコードがプロバイダーを初期化またはアクセスすると、ポーリングが開始されます。|

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/remote_configuration/
[2]: /ja/feature_flags/server/nodejs/
[3]: /ja/feature_flags/server/
[4]: /ja/feature_flags/server/java/
[5]: /ja/feature_flags/server/python/