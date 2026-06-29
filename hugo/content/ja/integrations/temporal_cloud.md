---
app_id: temporal-cloud
app_uuid: 4fc358f8-ab2d-43ae-86e5-129ef4e4e6a1
assets:
  dashboards:
    Temporal Cloud - Overview: assets/dashboards/temporal_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: temporal.cloud.v0_frontend_service_request
      metadata_path: metadata.csv
      prefix: temporal.cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32597071
    source_type_name: Temporal Cloud
  monitors:
    High gRPC error percentage: assets/monitors/high_grpc_error_percentage.json
    High service latency: assets/monitors/high_service_latency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- 開発ツール
- モニター
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/temporal_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: temporal_cloud
integration_id: temporal-cloud
integration_title: Temporal Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: temporal_cloud
public_title: Temporal Cloud
short_description: お使いのインスタンスにおけるシステムの健全性、ワークフローの効率、タスクの実行、パフォーマンス ボトルネックに関するインサイトを得られます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Developer Tools
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: お使いのインスタンスにおけるシステムの健全性、ワークフローの効率、タスクの実行、パフォーマンス ボトルネックに関するインサイトを得られます。
  media:
  - caption: Temporal Cloud - Overview 1
    image_url: images/temporal_cloud_overview_1.png
    media_type: image
  - caption: Temporal Cloud - Overview 2
    image_url: images/temporal_cloud_overview_2.png
    media_type: image
  - caption: Temporal Cloud - Overview 3
    image_url: images/temporal_cloud_overview_3.png
    media_type: image
  - caption: Temporal Cloud - Overview 4
    image_url: images/temporal_cloud_overview_4.png
    media_type: image
  - caption: Temporal Cloud - Overview 5
    image_url: images/temporal_cloud_overview_5.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Temporal Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Temporal Cloud][1] は、複雑なワークフローをオーケストレーションするためのスケーラブルなプラットフォームです。これにより、開発者はフォールト トレランスと一貫性を気にすることなく、アプリケーションの構築に集中できます。

このインテグレーションは Temporal Cloud のメトリクスを Datadog に取り込み、システムの健全性、ワークフローの効率、タスクの実行、およびパフォーマンス ボトルネックに関するインサイトを提供します。

## セットアップ

### Temporal Cloud でメトリクス エンドポイントの URL を生成する

1. CA 証明書とエンド エンティティ証明書を生成するには、[証明書管理][2] を参照してください。
    - **注**: 期限切れのルート CA 証明書は、下流のすべての証明書を無効にします。システムの中断を避けるため、有効期間の長い証明書を使用してください。
2. Account Owner または Global Admin ロールで [Temporal Cloud][3] にログインします。
3. **Settings** に移動し、**Observability** タブを選択します。
4. **Certificates** セクションで、ルート CA 証明書 (`.pem` ファイルの内容) を追加して保存します。
    - **注**: すでに Observability エンドポイントが設定されている場合は、ルート CA 証明書を追加できます。
5. **Save** をクリックすると、**Endpoint** セクションにエンドポイントの URL が生成されます。URL は次のようになります: `https://<account_id>.tmprl.cloud/prometheus`。


### Temporal Cloud アカウントを Datadog に接続する

1. Account ID、End-entity Certificate file content、End-entity Certificate key file content を追加します
    |パラメーター|説明|
    |--------------------|--------------------|
    |Account ID|メトリクス エンドポイント URL の一部として使用する Temporal Cloud アカウント ID: `https://<account_id>.tmprl.cloud/prometheus`。|
    |End-entity certificate file content|メトリクス エンドポイントへのセキュアなアクセスと通信のためのエンド エンティティ証明書の内容。|
    |End-entity certificate key file content|メトリクス エンドポイントへのセキュアなアクセスと通信のためのエンド エンティティ証明書キーの内容。|

2. **Save** ボタンをクリックして設定を保存します。


## 収集データ

### メトリクス
{{< get-metrics-from-git "temporal_cloud" >}}



### サービスチェック

Temporal Cloud インテグレーションにはサービス チェックは含まれていません。

### イベント

Temporal Cloud インテグレーションにはイベントは含まれていません。

## サポート

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://temporal.io/cloud/
[2]: https://docs.temporal.io/cloud/certificates#use-certstrap/
[3]: https://cloud.temporal.io/
[4]: https://github.com/DataDog/integrations-core/blob/master/temporal_cloud/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/