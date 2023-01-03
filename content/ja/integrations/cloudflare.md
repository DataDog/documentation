---
categories:
- web
dependencies: []
description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/cloudflare/
draft: false
git_integration_title: cloudflare
has_logo: true
integration_id: cloudflare
integration_title: Cloudflare
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
monitors:
  '[Cloudflare] Abnormal bandwidth being sent for zone: {{zone_name.name}}': assets/monitors/bandwidth.json
  '[Cloudflare] Error Rate is higher than normal in zone: {{zone_name.name}}': assets/monitors/error_rate.json
  '[Cloudflare] Error count is unusually high for worker script: {{worker_script.name}}': assets/monitors/worker_error.json
  '[Cloudflare] High number of detected threats for zone: {{zone_name.name}}': assets/monitors/threats.json
  '[Cloudflare] Hit Ratio is abnormally low for zone: {{zone_name.name}}': assets/monitors/hit_ratio.json
name: cloudflare
public_title: Datadog-Cloudflare インテグレーション
short_description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
team: web-integrations
version: '1.0'
---

## 概要

Datadog を Cloudflare アカウントに接続して、Web トラフィックと DNS のメトリクスを表示します。

## セットアップ

始める前に、[Datadog アカウント][1]と [API キー][2]、そして [Cloudflare Logpush][3] へのアクセスが必要です (Enterprise アカウントプランのご契約が必要です)。

Cloudflare API トークンを使用する場合は、**Zone** > **Zone** > **Read** および **Zone** > **Analytics** > **Read** の権限を保有していることを確認してください。

### インストール

Datadog の [Cloudflare インテグレーションタイル][4]を使用して、インテグレーションをインストールします。

### コンフィギュレーション

1. Datadog [Cloudflare インテグレーションタイル][4]内の **Configuration** タブに移動します。
2. 監視するアカウントの電子メールアドレスと、API キーまたはトークンを入力します。Cloudflare API キーと API トークンは、Cloudflare アカウントの **My profile** > **Api Tokens** の下にあります。
3. アカウントの名前を追加します。この名前は任意で、メトリクスの `account` タグ内で使用されます。

### ログの収集

Cloudflareでは、Cloudflare Logpush を使用してログを直接 Datadog にプッシュすることができます。Logpush のジョブは [Cloudflare API](#cloudflare-api) または [Cloudflare ダッシュボード](#cloudflare-dashboard)で管理できます。

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
    * `dataset`: 受信するログのカテゴリー。サポートされるデータセットについては、[Cloudflare のログフィールド][5]を参照。
    * `logpull_options` (任意): フィールド、サンプルレート、タイムスタンプの形式を構成するには、[Logpush API オプション][6]を参照。

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
2. **Enter destination information** 下で Datadog の URL エンドポイントを入力します。

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?ddsource=cloudflare
    ```

    **注**: `ddsource=cloudflare` は必須です。ログを区別するために、オプションで `service`、`host`、`ddtags` などのパラメーターを追加することもできます。

    **例**:

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
    ```

3. Datadog Cloudflare インテグレーションタイルのセットアップに使用したDatadog API キーを入力します。
4. アクセスを確認すると、**Prove ownership** 下に「Ready to push! 」と表示されます。`Push` をクリックして完了します。

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

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://developers.cloudflare.com/logs/about
[4]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[5]: https://developers.cloudflare.com/logs/log-fields
[6]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/