---
app_id: oci-mysql-database
app_uuid: 8600b5fa-cd4c-4003-b397-99d8784509c1
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.mysql_database.active_connections
      - oci.mysql_database.backup_failure
      - oci.mysql_database.backup_size
      - oci.mysql_database.backup_time
      - oci.mysql_database.cpu_utilization
      - oci.mysql_database.channel_failure
      - oci.mysql_database.channel_lag
      - oci.mysql_database.current_connections
      - oci.mysql_database.db_volume_read_bytes
      - oci.mysql_database.db_volume_read_operations
      - oci.mysql_database.db_volume_utilization
      - oci.mysql_database.db_volume_write_bytes
      - oci.mysql_database.db_volume_write_operations
      - oci.mysql_database.heat_wave_data_load_progress
      - oci.mysql_database.heat_wave_health
      - oci.mysql_database.heat_wave_statements
      - oci.mysql_database.memory_allocated
      - oci.mysql_database.memory_used
      - oci.mysql_database.memory_utilization
      - oci.mysql_database.network_receive_bytes
      - oci.mysql_database.network_transmit_bytes
      - oci.mysql_database.ocpus_allocated
      - oci.mysql_database.ocpus_used
      - oci.mysql_database.statement_latency
      - oci.mysql_database.statements
      - oci.mysql_database.storage_allocated
      - oci.mysql_database.storage_used
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26597073
    source_type_name: OCI MySQL Database
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- oracle
- モニター
- data stores
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_mysql_database
integration_id: oci-mysql-database
integration_title: OCI HeatWave MySQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_mysql_database
public_title: OCI HeatWave MySQL
short_description: OCI HeatWave MySQL は、インメモリ クエリ アクセラレーションにより MySQL を強化し、迅速なリアルタイム
  アナリティクスを実現します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI HeatWave MySQL は、インメモリ クエリ アクセラレーションにより MySQL を強化し、迅速なリアルタイム アナリティクスを実現します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI HeatWave MySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

OCI HeatWave MySQL は、トランザクションおよびレイクハウス スケールのアナリティクスに向けて、自動化かつ統合されたジェネレーティブ AI とマシン ラーニングを 1 つのクラウド サービスで活用します。

このインテグレーションにより、[oci_mysql_database][1] ネームスペースからメトリクスとタグを収集することで、MySQL DB システムの現在の接続数、ステートメント数、CPU 使用率、バックアップ時間を監視し、アラートできます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] のインテグレーションをセットアップしたら、[Connector Hub][3] に `oci_mysql_database` ネームスペースが含まれていることを確認してください。


## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_mysql_database" >}}


### サービスチェック

OCI MySQL Database にはサービス チェックは含まれません。

### イベント

OCI MySQL Database にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.oracle.com/en-us/iaas/mysql-database/doc/metrics.html
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_mysql_database/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/