---
app_id: oci-goldengate
app_uuid: 6abb75a2-400b-4334-8224-2f381fca27fa
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.goldengate.cpu_utilization
      - oci.goldengate.deployment_health
      - oci.goldengate.deployment_inbound_lag
      - oci.goldengate.deployment_outbound_lag
      - oci.goldengate.distribution_path_lag
      - oci.goldengate.distribution_path_status
      - oci.goldengate.extract_lag
      - oci.goldengate.extract_status
      - oci.goldengate.file_system_usage
      - oci.goldengate.heartbeat_lag
      - oci.goldengate.memory_utilization
      - oci.goldengate.ocpu_consumption
      - oci.goldengate.pipeline_health
      - oci.goldengate.pipeline_memory_usage
      - oci.goldengate.pipeline_processing_rate
      - oci.goldengate.pipeline_scheduling_delay
      - oci.goldengate.pipeline_total_delay
      - oci.goldengate.receiver_path_lag
      - oci.goldengate.receiver_path_status
      - oci.goldengate.replicat_lag
      - oci.goldengate.replicat_status
      - oci.goldengate.swap_space_usage
      - oci.goldengate.temp_space_usage
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 48906972
    source_type_name: OCI GoldenGate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- cloud
- oracle
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_goldengate
integration_id: oci-goldengate
integration_title: OCI GoldenGate
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_goldengate
public_title: OCI GoldenGate
short_description: OCI GoldenGate は、データ ベース間でのデータ レプリケーション、変換、ストリーミングを提供
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
  description: OCI GoldenGate は、データ ベース間でのデータ レプリケーション、変換、ストリーミングを提供
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI GoldenGate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) GoldenGate は、異種のデータ ソース間でリアルタイムのデータ レプリケーション、変換、ストリーミングを実行できる、フル マネージドでスケーラブルなサービスです。オンプレミス環境とクラウド環境の間で継続的なデータ可用性とシームレスな連携を実現し、データ ベースの移行、ディザスター リカバリー、リアルタイム分析など、幅広いユース ケースに対応します。

このインテグレーションでは、[oci_goldengate][1] ネームスペースからメトリクスとタグを収集することで、GoldenGate インスタンスの健全性、容量、パフォーマンスを監視し、必要に応じてアラートを設定できます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] インテグレーションを設定したら、上記のネームスペースが [Connector Hub][3] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_goldengate" >}}


### サービス チェック

OCI GoldenGate にはサービス チェックは含まれていません。

### イベント

OCI GoldenGate にはイベントは含まれていません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート][5] にお問い合わせください。
[1]: https://docs.oracle.com/en-us/iaas/goldengate/doc/metrics.html
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_goldengate/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/