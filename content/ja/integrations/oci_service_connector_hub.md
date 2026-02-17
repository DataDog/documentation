---
app_id: oci-service-connector-hub
app_uuid: c7144268-2a76-4578-964d-5e59f7619d8d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.service_connector_hub.bytes_read_from_source
      - oci.service_connector_hub.bytes_read_from_task
      - oci.service_connector_hub.bytes_written_to_target
      - oci.service_connector_hub.bytes_written_to_task
      - oci.service_connector_hub.data_freshness
      - oci.service_connector_hub.errors_at_source
      - oci.service_connector_hub.errors_at_target
      - oci.service_connector_hub.errors_at_task
      - oci.service_connector_hub.latency_at_source
      - oci.service_connector_hub.latency_at_target
      - oci.service_connector_hub.latency_at_task
      - oci.service_connector_hub.messages_read_from_source
      - oci.service_connector_hub.messages_read_from_task
      - oci.service_connector_hub.messages_written_to_target
      - oci.service_connector_hub.messages_written_to_task
      - oci.service_connector_hub.service_connector_hub_errors
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303353
    source_type_name: OCI サービスコネクタハブ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- クラウド
- oracle
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_service_connector_hub
integration_id: oci-service-connector-hub
integration_title: OCI サービスコネクタハブ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_service_connector_hub
public_title: OCI サービスコネクタハブ
short_description: OCI Service Connector Hub は OCI サービス間でデータを接続およびルーティングし、クラウド運用を効率化します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Service Connector Hub は OCI サービス間でデータを接続およびルーティングし、クラウド運用を効率化します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI サービスコネクタハブ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Connector Hub はクラウドエンジニアが Oracle Cloud Infrastructure (OCI) サービス間、また OCI からサードパーティサービスへのデータを管理および移動できるよう支援します。

このインテグレーションでは、[oci_service_connector_hub][1] ネームスペースからメトリクスとタグを収集することで、Connector Hub のスループット、レイテンシ、エラーを監視しアラートできます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] インテグレーションをセットアップしたら、上記で言及したネームスペースが [Connector Hub][3] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci-service-connector-hub" >}}


### サービスチェック

OCI Service Connector Hub にはサービスチェックが含まれていません。

### イベント

OCI Service Connector Hub にはイベントが含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.oracle.com/en-us/iaas/Content/connector-hub/metrics-reference.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_service_connector_hub/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/