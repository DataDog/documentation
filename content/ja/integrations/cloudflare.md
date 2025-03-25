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
    source_type_id: 215
    source_type_name: Cloudflare
  monitors:
    Cache hit rate is abnormally low: assets/monitors/hit_ratio.json
    Error Rate is higher than normal: assets/monitors/error_rate.json
    Threat number is high: assets/monitors/threats.json
    Worker script errors are increasing: assets/monitors/worker_error.json
    Zone bandwidth is abnormal: assets/monitors/bandwidth.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- ログの収集
- キャッシュ
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudflare
integration_id: cloudflare
integration_title: Cloudflare
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cloudflare
public_title: Cloudflare
short_description: Cloudflare の Web トラフィック、DNS クエリ、セキュリティ上の脅威などを監視します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Log Collection
  - Category::Caching
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Cloudflare の Web トラフィック、DNS クエリ、セキュリティ上の脅威などを監視します。
  media:
  - caption: Cloudflare 概要ダッシュボード
    image_url: images/overview-dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/cloudflare-monitoring-datadog/
  support: README.md#Support
  title: Cloudflare
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Cloudflare と統合することで、Web トラフィック、DNS クエリ、脅威に関するインサイトなど、ゾーンのメトリクスを取得できます。このインテグレーションは [Cloudflare の分析 API][1] に基づいています。[当社のドキュメント][2]で、どのリソースがどのメトリクスに対応しているかについて詳しく確認できます。

**ログ収集**: これらのメトリクスに加え、Cloudflare では Cloudflare Logpush を使用してログを直接 Datadog に送信することが可能です。これらの詳細なログには、Cloudflare 製品によって生成されたメタデータが含まれており、特に他のソースからのログと組み合わせることで、デバッグや分析の作成に役立ちます。これらのメトリクスと組み合わせて [Cloudflare のログ収集を有効にする][3]ことで、Cloudflare 環境を完全に可視化することができます。

すぐに使えるダッシュボードは、アプリケーションのセキュリティとパフォーマンスを向上させます。この一元化されたダッシュボードにより、以下の要素が視覚化されます

- セキュリティ脅威
- HTTP リクエスト量とエラー率
- 往復時間とトラフィックフローの変更を含むロードバランシング
- ワーカースクリプトにおけるパフォーマンスの問題

Cloudflare インフラストラクチャーを深く洞察するリッチ化されたログと詳細なメトリクスにより、問題解決に必要なコンテキストを構築できます。

インテグレーションは [Datadog Cloud SIEM][4] と連携し、以下に対するすぐに使える脅威検出機能を提供します
- 不可能移動
- 危険な誤構成
- DDoS 攻撃

IP アドレスのブロックや Datadog でのケースの作成など、同梱されている Workflow Automation のブループリントを利用して、セキュリティ脅威をより迅速に緩和できます。

## セットアップ

始める前に、[Datadog アカウント][5]と[API キー][6]、そして Enterprise アカウントプランが必要な [Cloudflare Logpush][7] へのアクセスが必要です。

Cloudflare API トークンを使用する場合は、**Zone** > **Zone** > **Read** および **Zone** > **Analytics** > **Read** の権限を保有していることを確認してください。

### インストール

Datadog の [Cloudflare インテグレーションタイル][8]を使用して、インテグレーションをインストールします。

### 構成

1. Datadog [Cloudflare インテグレーションタイル][8]内の **Configure** タブに移動します。
2. 監視するアカウントの電子メールアドレスと、API キーまたはトークンを入力します。Cloudflare API キーと API トークンは、Cloudflare アカウントの **My profile** > **Api Tokens** の下にあります。
3. アカウントの名前を追加します。この名前は任意で、メトリクスの `account` タグ内で使用されます。

### ログ収集

Cloudflareでは、Cloudflare Logpush を使用してログを直接 Datadog にプッシュすることができます。Logpush のジョブは [Cloudflare API](#cloudflare-api) または [Cloudflare ダッシュボード](#cloudflare-dashboard)内で直接管理できます。

Cloudflare インテグレーションパイプラインをインストールすると、特定の属性が自動的にリマップされます。どの属性がリマップされるかを確認するには

1. [ログパイプライン][9]に移動します。
2. 右上の **Browse Pipeline Library** をクリックします。
3. 検索バーに `Cloudflare` と入力します。
4. **Cloudflare** をクリックすると、インストールされているリマッパーなどのプロセッサーのリストが表示されます。

#### Cloudflare API

1. Logpush ジョブエンドポイントへ POST をリクエストし、Logpush ジョブを作成します。以下のフィールドを含めます。
    * `name` (任意): ドメイン名をジョブ名として使用。
    * `destination_conf`: 以下のパラメーターからなるログの出力先。
        * `<DATADOG_ENDPOINT_URL>`: Datadog HTTP ログインテークエンドポイントで、以下のいずれかです。違いについては、[Datadog API リファレンス][10]を参照してください。
          * **v1:** `http-intake.logs.{{< region-param key="dd_site" >}}/v1/input`
          * **v2 (最新バージョン):** `http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs`
        * `<DATADOG_API_KEY>`: 使用する Datadog API キー。
        * `ddsource`: `cloudflare` に設定。
        * `service` (任意): サービス名を指定。
        * `host` (任意): ホスト名を指定。
        * `ddtags` (任意): タグを指定。
    * `dataset`: 受信するログのカテゴリー。サポートされるデータセットについては、[Cloudflare のログフィールド][11]を参照。
    * `logpull_options` (オプション): フィールド、サンプルレート、タイムスタンプ形式の構成は、[Logpush API オプション][12]を参照してください。Datadog は、Cloudflare の**タイムスタンプ RFC 3339 フォーマット**の使用を義務付けており、これは Cloudflare がデフォルトで使用するオプションです。

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
    http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?ddsource=cloudflare
    ```
    **注**: `ddsource=cloudflare` は必須です。ログを区別するために、オプションで `service`、`host`、`ddtags` などのパラメーターを追加することもできます。

    **例**:

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
    ```

3. Datadog Cloudflare インテグレーションタイルのセットアップに使用した Datadog API キーを入力します。
4. アクセスを確認すると、**Prove ownership** の下に "Ready to push!" と表示されます。`Push` をクリックして完了します。

## 収集データ

### メトリクス

{{< get-metrics-from-git "cloudflare" >}}

#### メトリクスカテゴリー 

以下の表では、収集されるメトリクスの種類と関連するメトリクスのプレフィックスについて説明します。

| **型**          | **説明**                              | **収集されるメトリクスのプレフィックス**                                                                 |
|-------------------|----------------------------------------------|------------------------------------------------------------------------------------------------|
| **Web 分析** | Web トラフィックとパフォーマンスに関するメトリクス。 | `cloudflare.requests.all`<br>`cloudflare.requests.cached`<br>`cloudflare.requests.uncached`<br>`cloudflare.requests.ssl.encrypted`<br>`cloudflare.requests.ssl.unencrypted`<br>`cloudflare.requests.country`<br>`cloudflare.requests.status`<br>`cloudflare.requests.content_type`<br>`cloudflare.requests.ip_class`<br>`cloudflare.bandwidth.all`<br>`cloudflare.bandwidth.cached`<br>`cloudflare.bandwidth.uncached`<br>`cloudflare.bandwidth.ssl.encrypted`<br>`cloudflare.bandwidth.ssl.unencrypted`<br>`cloudflare.bandwidth.country`<br>`cloudflare.bandwidth.content_type`<br>`cloudflare.threats.all`<br>`cloudflare.threats.type`<br>`cloudflare.threats.country`<br>`cloudflare.pageviews.all`<br>`cloudflare.pageviews.search_engine`<br>`cloudflare.uniques.all`<br>`cloudflare.requests.cross_zone_sub_requests.avg`<br>`cloudflare.requests.edge_dns_response_time.avg`<br>`cloudflare.requests.edge_time_to_first_byte.avg`<br>`cloudflare.requests.origin_response_duration.avg` |
| **DNS**           | DNS クエリと応答時間に関するメトリクス。 | `cloudflare.dns.query.all`<br>`cloudflare.dns.query.uncached`<br>`cloudflare.dns.query.stale`<br>`cloudflare.dns.response_time.avg`<br>`cloudflare.dns.response_time.median`<br>`cloudflare.dns.response_time.90p`<br>`cloudflare.dns.response_time.99p` |
| **ロードバランサー** | ロードバランシングプールに関連するメトリクス。          | `cloudflare.load_balancer.pool.round_trip_time.average`<br>`cloudflare.load_balancer.pool.health.status` |
| **ワーカースクリプト** | Cloudflare Workers スクリプトに関するメトリクス。     | `cloudflare.workers.requests.all`<br>`cloudflare.workers.requests.errors`<br>`cloudflare.workers.requests.subrequests`<br>`cloudflare.workers.response_time.75p`<br>`cloudflare.workers.response_time.99p`|

#### 権限
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

### サービスチェック

Cloudflare インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://developers.cloudflare.com/analytics/graphql-api/
[2]: https://docs.datadoghq.com/ja/integrations/cloudflare/#metric-categories
[3]: https://docs.datadoghq.com/ja/integrations/cloudflare/#log-collection
[4]: https://docs.datadoghq.com/ja/security/cloud_siem/
[5]: https://www.datadoghq.com/free-datadog-trial/
[6]: /ja/account_management/api-app-keys/#api-keys
[7]: https://developers.cloudflare.com/logs/about
[8]: https://app.datadoghq.com/integrations/cloudflare
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://docs.datadoghq.com/ja/api/latest/logs/
[11]: https://developers.cloudflare.com/logs/log-fields
[12]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[13]: https://docs.datadoghq.com/ja/help/