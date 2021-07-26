---
categories:
  - web
ddtype: crawler
dependencies: []
description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/cloudflare/'
draft: false
git_integration_title: cloudflare
has_logo: true
integration_id: ''
integration_title: Cloudflare
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: cloudflare
public_title: Datadog-Cloudflare インテグレーション
short_description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
version: '1.0'
---
## 概要

Datadog を Cloudflare アカウントに接続して、Web トラフィックと DNS のメトリクスを表示します。

## セットアップ

### インストール

Datadog の [Cloudflare インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィグレーション

1. Datadog [Cloudflare インテグレーションタイル][1]内の Configuration タブに移動します。
2. 監視するアカウントのメールアドレスと、API キーまたはトークンを入力します。Cloudflare API キーと API トークンは、Cloudflare アカウントの _My profile > Api Tokens_ で確認できます。
3. アカウントの名前を追加します。この名前は任意で、メトリクスの `account` タグ内で使用されます。

API トークンを使用する際は、トークンに以下のアクセス許可があることを確認してください。

- _Zone_ > _Zone_ > _Read_
- _Zone_ > _Analytics_ > _Read_

### ログの収集

Cloudflare では、Cloudflare Logpush を使用して顧客がログを直接 Datadog にプッシュできます。

1. Logpush ジョブエンドポイントへ POST をリクエストし、Logpush ジョブを作成します。以下のフィールドを含めます。
    * `name` (任意): ドメイン名をジョブ名として使用。
    * `destination_conf`: 以下のパラメーターからなるログの出力先。
        * `<DATADOG_ENDPOINT_URL>`: Datadog HTTP ログのインテークエンドポイント。エンドポイントは、`http-intake.logs.`{{< region-param key="dd_site" code="true" >}}`/v1/input` になります
        * `<DATADOG_API_KEY>`: 使用する Datadog API キー。
        * `ddsource`: `cloudflare` に設定。
        * `service` (任意): サービス名を指定。
        * `host` (任意): ホスト名を指定。
        * `ddtags` (任意): タグを指定。
    * `dataset`: 受信するログのカテゴリー。サポートされるすべてのデータセットについては、[Cloudflare ドキュメント][2]を参照。
    * `logpull_options` (任意): フィールド、サンプルレート、タイムスタンプの形式を構成するには、[Logpush API オプション][3]を参照。

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
       "destination_conf": "datadog://http-intake.logs.datadoghq.com/v1/input?header_DD-API-KEY=<DD-API-KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
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
        "destination_conf": "datadog://<DATADOG-ENDPOINT-URL>?header_DD-API-KEY=<DATADOG-API-KEY>",
        "last_complete": null,
        "last_error": null,
        "error_message": null
      },
      "success": true
    }
    ```

## 収集データ

### メトリクス
{{< get-metrics-from-git "cloudflare" >}}


### イベント

Cloudflare インテグレーションには、イベントは含まれません。

### サービスのチェック

Cloudflare インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[2]: https://developers.cloudflare.com/logs/log-fields
[3]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/