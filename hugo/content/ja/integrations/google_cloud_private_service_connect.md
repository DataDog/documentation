---
app_id: google-cloud-private-service-connect
app_uuid: e4c77d0b-1c96-4484-85a5-7066ca938f98
assets:
  dashboards:
    google-cloud-private-service-connect: assets/dashboards/google_cloud_private_service_connect_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - gcp.gce.private_service_connect.consumer.open_connections
      - gcp.gce.private_service_connect.producer.open_connections
      metadata_path: metadata.csv
      prefix: gcp.gce.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 9347815
    source_type_name: Google Cloud Private Service Connect
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- Google Cloud
- ネットワーク
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_private_service_connect
integration_id: google-cloud-private-service-connect
integration_title: Google Cloud Private Service Connect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_private_service_connect
public_title: Google Cloud Private Service Connect
short_description: プライベートサービス接続をモニタリングする
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Google Cloud
  - Category::Network
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: プライベートサービス接続をモニタリングする
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Private Service Connect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

[Google Cloud Private Service Connect][1] は Google Cloud Networking の機能で、VPC ネットワーク内部からマネージドサービスにプライベートにアクセスできるようにし、データ転送のセキュリティを確保すると同時に、ネットワーク egress コストを削減できます。また、プロデューサーが他の Google Cloud カスタマーに自身のサービスをホストおよび公開し、サービスとコンシューマー間でプライベート接続を提供できます。

このインテグレーションを有効にすると、Private Service Connect を介して、接続状況、転送されたデータ、ドロップされたパケットを可視化できます。このインテグレーションにより、Datadog はプロデューサーだけでなくコンシューマーの Private Service Connect 接続からも重要なメトリクスを収集します。

## セットアップ

### インストール

### 構成

メトリクスを収集するために、このインテグレーションは[メインの Google Cloud Platform インテグレーション][2]で設定した資格情報を使用します。

さらに Datadog では、Private Service Connect 機能を利用することで、Google Cloud 環境からメトリクス、トレース、ログをパブリック インターネットを経由せずに Private Link を通じて Datadog に送信できます。これにより ネットワーク egress コストを削減し、転送中のデータのセキュリティを強化できます。詳しくは、[サポート対象データセンターのガイド][3]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google-cloud-private-service-connect" >}}


### サービスチェック

Google Cloud Private Service Connect にはサービスチェックが含まれていません。

### イベント

Google Cloud Private Service Connect にはイベントが含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://app.datadoghq.com/integrations/google-cloud-private-service-connect
[2]: https://app.datadoghq.com/integrations/google-cloud-platform
[3]: https://docs.datadoghq.com/ja/agent/guide/gcp-private-service-connect/?site=us5
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/google_cloud_private_service_connect/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/
