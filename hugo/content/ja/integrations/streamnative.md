---
app_id: streamnative
app_uuid: e92fa53b-f620-4167-bdaa-31ac3bc6be35
assets:
  dashboards:
    StreamNative - Health: assets/dashboards/streamnative_health.json
    StreamNative - Kafka Connect: assets/dashboards/streamnative_kafka_connect.json
    StreamNative - Pulsar Resource: assets/dashboards/streamnative_pulsar_resource.json
    StreamNative - Sink Connector: assets/dashboards/streamnative_sink_connector.json
    StreamNative - Source Connector: assets/dashboards/streamnative_source_connector.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - streamnative.pulsar_resource.pulsar_consumers_count
      metadata_path: metadata.csv
      prefix: streamnative.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27153739
    source_type_name: StreamNative
  monitors:
    Backlog size exceeding threshold: assets/monitors/backlog_size_exceeding_threshold.json
    Messaging service is down: assets/monitors/messaging_service_down.json
    Webservice is down: assets/monitors/webservice_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- モニター
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/streamnative/README.md
display_on_public_website: true
draft: false
git_integration_title: streamnative
integration_id: streamnative
integration_title: StreamNative
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: streamnative
public_title: StreamNative
short_description: StreamNative のメトリクス データからインサイトを得られます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: StreamNative のメトリクス データからインサイトを得られます。
  media:
  - caption: StreamNative - Health
    image_url: images/streamnative_health.png
    media_type: image
  - caption: StreamNative - Kafka Connect
    image_url: images/streamnative_kafka_connect.png
    media_type: image
  - caption: StreamNative - Pulsar Resource
    image_url: images/streamnative_pulsar_resource.png
    media_type: image
  - caption: StreamNative - Sink Connector
    image_url: images/streamnative_sink_connector.png
    media_type: image
  - caption: StreamNative - Source Connector
    image_url: images/streamnative_source_connector.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: StreamNative
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[StreamNative][1] は、Apache Pulsar 上に構築されたエンタープライズ グレードのメッセージングとイベント ストリーミング プラットフォームを提供します。マルチ テナンシー、ジオ レプリケーション、クラウド サービスとのシームレスな統合などの機能により、スケーラブルなリアルタイム データ ストリーミング ソリューションを実現します。

StreamNative インテグレーションは、次の種類の [メトリクス][2] を収集します:

1. Health
2. Pulsar リソース
3. Source コネクタ
4. Sink コネクタ
5. Kafka Connect

## セットアップ

### StreamNative で API 認証情報を生成する

1. [StreamNative Cloud Console アカウント][3] にログインします。
2. プロフィール アイコンをクリックし、**Accounts & Accesses** タブに移動します。
3. **Admin** 権限を持つ Service Account または `metrics-viewer` ロールにバインドされた Service Account を見つけます。
   - Service Account が存在しない場合は、**New -> Service Account** を選択して作成し、**Super Admin** オプションを有効にしてください。
   - Service Account を `metrics-viewer` ロールにバインドする方法は、[metrics-viewer ロール バインディング][4] のドキュメントを参照してください。
4. 選択した Service Account の右側にある `...` ボタンをクリックします。
5. **Download OAuth2 Key** を選択して、**Client ID** と **Client Secret** を取得します。

### `Organization ID` と `Instance Name` を取得する

1. プロフィール アイコンをクリックし、**Organizations** を選択します。
2. データを収集する対象の **Organization** を選択します。
3. **Select an Instance** ドロップダウンから **Instance Name** を取得します。


### StreamNative アカウントを Datadog に接続する

1. Organization ID、Instance Name、Client ID、Client Secret を入力します。
    |Parameters|Description|
    |--------------------|--------------------|
    |Organization ID|StreamNative アカウントの Organization ID。|
    |Instance Name|該当する Organization の Instance Name。|
    |Client ID |Service Account の Client ID。|
    |Client Secret|Service Account の Client Secret。|
2. **Save** ボタンをクリックして設定を保存します。


## 収集データ

### ログ

StreamNative インテグレーションには、ログは含まれません。

### メトリクス

StreamNative インテグレーションは、以下のメトリクスを Datadog に収集して転送します。

{{< get-metrics-from-git "streamnative" >}}

### サービスチェック

StreamNative インテグレーションには、サービス チェックは含まれません。

### イベント

StreamNative インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://streamnative.io/
[2]: https://docs.streamnative.io/docs/cloud-metrics-api#metrics-endpoint
[3]: https://console.streamnative.cloud/
[4]: https://docs.streamnative.io/docs/cloud-metrics-api#metrics-authorization
[5]: https://docs.datadoghq.com/ja/help/