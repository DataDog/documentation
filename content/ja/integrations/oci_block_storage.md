---
app_id: oci-block-storage
app_uuid: 92d6b86f-d892-4290-88f9-c4c61d3700fa
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.blockstore.volume_guaranteed_iops
      - oci.blockstore.volume_guaranteed_throughput
      - oci.blockstore.volume_guaranteed_vpus_per_gb
      - oci.blockstore.volume_read_ops
      - oci.blockstore.volume_read_throughput
      - oci.blockstore.volume_replication_seconds_since_last_sync
      - oci.blockstore.volume_replication_seconds_since_last_upload
      - oci.blockstore.volume_throttled_ios
      - oci.blockstore.volume_write_ops
      - oci.blockstore.volume_write_throughput
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303190
    source_type_name: OCI Block Storage
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- クラウド
- oracle
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_block_storage
integration_id: oci-block-storage
integration_title: OCI Block Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_block_storage
public_title: OCI Block Storage
short_description: OCI Block Storage は高性能で耐久性のあるブロック ストレージを提供しており、任意のコンピュート インスタンスにアタッチできます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Block Storage は高性能で耐久性のあるブロック ストレージを提供しており、任意のコンピュート インスタンスにアタッチできます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Block Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) Block Volumes は、仮想マシンのライフサイクルを超えても保持される、信頼性が高く高性能で低コストなブロック ストレージを提供します。冗長性とスケーラビリティを標準で備えています。

このインテグレーションでは、 [oci_blockstore][1] ネームスペースからメトリクスとタグを収集することで、 Block Volume リソースのパフォーマンスとレプリケーション ステータスを監視し、アラートを設定できます。

## セットアップ

### インストール

Once you set up the [Oracle Cloud Infrastructure][2] integration, ensure that any namespaces mentioned above are included in your [Connector Hub][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_block_storage" >}}


### サービスチェック

OCI Block Storage にはサービス チェックは含まれません。

### イベント

OCI Block Storage にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。
[1]: https://docs.oracle.com/en-us/iaas/Content/Block/References/volumemetrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_block_storage/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/