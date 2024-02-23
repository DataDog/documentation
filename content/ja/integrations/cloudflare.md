---
app_id: cloudflare
app_uuid: e48a0b64-d3ad-436f-95d3-e0c81e6d51d1
assets:
  dashboards:
    Cloudflare-Overview: assets/dashboards/cloudflare_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: cloudflare.requests.all
      metadata_path: metadata.csv
      prefix: cloudflare
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cloudflare
  monitors:
    '[Cloudflare] Abnormal bandwidth being sent for zone': assets/monitors/bandwidth.json
    '[Cloudflare] Error Rate is higher than normal in zone': assets/monitors/error_rate.json
    '[Cloudflare] Error count is unusually high for worker script': assets/monitors/worker_error.json
    '[Cloudflare] High number of detected threats for zone': assets/monitors/threats.json
    '[Cloudflare] Hit Ratio is abnormally low for zone': assets/monitors/hit_ratio.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- web
- メトリクス
- ログの収集
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudflare
integration_id: cloudflare
integration_title: Cloudflare
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: cloudflare
public_title: Cloudflare
short_description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Web
  - Category::Metrics
  - Category::Log Collection
  configuration: README.md#Setup
  description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
  media:
  - caption: Cloudflare 概要ダッシュボード
    image_url: images/overview-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cloudflare
---

## 概要

Cloudflare と統合することで、Web トラフィック、DNS クエリ、脅威に関するインサイトなど、ゾーンのメトリクスを取得できます。インテグレーションは、[Cloudflare の分析 API][1] を通じて行われます。


## セットアップ

作業を開始するには、[Datadog アカウント][2]のほか、[API キー][3]と [Cloudflare Logpush][4] へのアクセス権が必要です。なお、Logpush へのアクセスには、Enterprise アカウントプランの購入が必要です。

Cloudflare API トークンを使用する場合は、**Zone** > **Zone** > **Read** および **Zone** > **Analytics** > **Read** の権限を保有していることを確認してください。

### インストール

Datadog の [Cloudflare インテグレーションタイル][5]を使用して、インテグレーションをインストールします。

### コンフィギュレーション

1. Datadog [Cloudflare インテグレーションタイル][5]内の **Configuration** タブに移動します。
2. 監視するアカウントの電子メールアドレスと、API キーまたはトークンを入力します。Cloudflare API キーと API トークンは、Cloudflare アカウントの **My profile** > **Api Tokens** の下にあります。
3. アカウントの名前を追加します。この名前は任意で、メトリクスの `account` タグ内で使用されます。

### ログの収集

Cloudflareでは、Cloudflare Logpush を使用してログを直接 Datadog にプッシュすることができます。Logpush のジョブは [Cloudflare API](#cloudflare-api) または [Cloudflare ダッシュボード](#cloudflare-dashboard)で管理できます。

Cloudflare インテグレーションパイプラインをインストールすると、特定の属性が自動的にリマップされます。どの属性がリマップされるかを確認するには

1. [ログパイプライン][6]に移動します。
2. 右上の **Browse Pipeline Library** をクリックします。
3. 検索バーに `Cloudflare` と入力します。
4. **Cloudflare** をクリックすると、インストールされているリマッパーなどのプロセッサーのリストが表示されます。

#### Cloudflare API

1. Logpush ジョブエンドポイントへ POST をリクエストし、Logpush ジョブを作成します。以下のフィールドを含めます。
    * `name` (任意): ドメイン名をジョブ名として使用。
    * `destination_conf`: 以下のパラメーターからなるログの出力先。
        * `<DATADOG_ENDPOINT_URL>`: Datadog HTTP ログのインテークエンドポイント。エンドポイントは、`http-intake.logs.{{< region-param key="dd_site" >}}/v1/input` になります
        * `<DATADOG_API_KEY>`: 使用する Datadog API キー。
        * `ddsource`: `cloudflare` に設定。
        * `service` (任意): サービス名を指定。
        * `host` (任意): ホスト名を指定。
        * `ddtags` (任意): タグを指定。
    * `dataset`: 受信するログのカテゴリー。サポートされるデータセットについては、[Cloudflare のログフィールド][7]を参照。
    * `logpull_options` (オプション): フィールド、サンプルレート、タイムスタンプの形式を構成するには、[Logpush API オプション][8]を参照。

    **リクエスト例**:

    ```bash
    curl -s -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs' \
    --header 'X-Auth-Key: <CLOUDFLARE_AUTH_KEY>' \
    --header 'X-Auth-Email: <CLOUDFLARE_AUTH_EMAIL>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
       "name": "<NAME>",
       "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "dataset": "http_requests"
    }'
    ```

    **応答例**:

    ```bash
    {
     "errors": [],
     "messages": [],
     "result": {
       "id": 100,
       "dataset": "http_requests",
       "enabled": false,
       "name": "<DOMAIN_NAME>",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "destination_conf": "datadog://http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?header_DD-API-KEY=<DD-API-KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "last_complete": null,
       "last_error": null,
       "error_message": null
     },
     "success": true
    }
    ```

    `id` の値をメモしておきます。上記の例では、`100` です。

2. ジョブを有効にします。応答で返されたジョブ ID を使用してリクエスト本文で `{"enabled": true}` を送信します。

    **リクエスト例**:

    ```bash
    curl -s -X PUT \
    https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID> -d'{"enabled":true}' | jq .
    ```

    **応答例**:

    ```bash
    {
      "errors": [],
      "messages": [],
      "result": {
        "id": 100,
        "dataset": "http_requests",
        "enabled": true,
        "name": "<DOMAIN_NAME>",
        "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
        "destination_conf": "datadog://{{< region-param key="dd_site" >}}?header_DD-API-KEY=<DATADOG-API-KEY>",
        "last_complete": null,
        "last_error": null,
        "error_message": null
      },
      "success": true
    }
    ```

#### Cloudflare ダッシュボード

1. Cloudflare ダッシュボードの Logpush セクションでサービスを接続したら、データセットとデータフィールドを選択し、宛先として Datadog を選択します。
2. **Enter destination information** の下で Datadog の URL エンドポイントを入力します。

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?ddsource=cloudflare
    ```

    **注**: `ddsource=cloudflare` は必須です。ログを区別するために、オプションで `service`、`host`、`ddtags` などのパラメーターを追加することもできます。

    **例**:

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
    ```

3. Datadog Cloudflare インテグレーションタイルのセットアップに使用した Datadog API キーを入力します。
4. アクセスを確認すると、**Prove ownership** の下に "Ready to push!" と表示されます。`Push` をクリックして完了します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cloudflare" >}}


#### アクセス許可
Cloudflare API トークンでこれらのアクセス許可が有効になっていることを確認します。

| スコープ       | アクセス許可         |   ステータス    |
| ----------- | ------------------ | ----------- |
| アカウント     | アカウント分析  |    読み取り     |
| アカウント     | アカウント設定    |    読み取り     |
| アカウント     | ワーカースクリプト     |    読み取り     |
| Zone        | Zone               |    読み取り     |
| Zone        | 分析          |    読み取り     |
| Zone        | ワーカールート      |    読み取り     |
| Zone        | ロードバランサー     |    読み取り     |

### イベント

Cloudflare インテグレーションには、イベントは含まれません。

### サービスのチェック

Cloudflare インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://api.cloudflare.com/#zone-analytics-dashboard
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: https://developers.cloudflare.com/logs/about
[5]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[6]: https://app.datadoghq.com/logs/pipelines
[7]: https://developers.cloudflare.com/logs/log-fields
[8]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/