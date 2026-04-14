---
app_id: oci-database
app_uuid: 9091c2d3-1ce1-4b02-bd68-57660acd766a
assets:
  dashboards:
    OCI-Database-Overview: assets/dashboards/oci-database-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.database.block_changes
      - oci.database.cpu_utilization
      - oci.database.current_logons
      - oci.database.execute_count
      - oci.database.parse_count
      - oci.database.storage_allocated
      - oci.database.storage_allocated_by_tablespace
      - oci.database.storage_used
      - oci.database.storage_used_by_tablespace
      - oci.database.storage_utilization
      - oci.database.storage_utilization_by_tablespace
      - oci.database.transaction_count
      - oci.database.user_calls
      - oci.database_cluster.asmdiskgroup_utilization
      - oci.database_cluster.cpu_utilization
      - oci.database_cluster.filesystem_utilization
      - oci.database_cluster.load_average
      - oci.database_cluster.memory_utilization
      - oci.database_cluster.node_status
      - oci.database_cluster.ocpus_allocated
      - oci.database_cluster.swap_utilization
      - oci.oracle_oci_database.allocated_storage_utilization_by_tablespace
      - oci.oracle_oci_database.apply_lag
      - oci.oracle_oci_database.apply_lag_data_refresh_elapsed_time
      - oci.oracle_oci_database.avg_gc_cr_block_receive_time
      - oci.oracle_oci_database.backup_duration
      - oci.oracle_oci_database.backup_size
      - oci.oracle_oci_database.block_changes
      - oci.oracle_oci_database.blocking_sessions
      - oci.oracle_oci_database.cputime
      - oci.oracle_oci_database.cpu_utilization
      - oci.oracle_oci_database.current_logons
      - oci.oracle_oci_database.dbtime
      - oci.oracle_oci_database.estimated_failover_time
      - oci.oracle_oci_database.execute_count
      - oci.oracle_oci_database.fraspace_limit
      - oci.oracle_oci_database.frautilization
      - oci.oracle_oci_database.gc_cr_blocks_received
      - oci.oracle_oci_database.gc_current_blocks_received
      - oci.oracle_oci_database.iops
      - oci.oracle_oci_database.io_throughput
      - oci.oracle_oci_database.interconnect_traffic
      - oci.oracle_oci_database.invalid_objects
      - oci.oracle_oci_database.logical_blocks_read
      - oci.oracle_oci_database.max_tablespace_size
      - oci.oracle_oci_database.memory_usage
      - oci.oracle_oci_database.monitoring_status
      - oci.oracle_oci_database.non_reclaimable_fra
      - oci.oracle_oci_database.ocpus_allocated
      - oci.oracle_oci_database.parse_count
      - oci.oracle_oci_database.parses_by_type
      - oci.oracle_oci_database.problematic_scheduled_dbmsjobs
      - oci.oracle_oci_database.process_limit_utilization
      - oci.oracle_oci_database.processes
      - oci.oracle_oci_database.reclaimable_fra
      - oci.oracle_oci_database.reclaimable_fraspace
      - oci.oracle_oci_database.recovery_window
      - oci.oracle_oci_database.redo_apply_rate
      - oci.oracle_oci_database.redo_generation_rate
      - oci.oracle_oci_database.redo_size
      - oci.oracle_oci_database.session_limit_utilization
      - oci.oracle_oci_database.sessions
      - oci.oracle_oci_database.storage_allocated
      - oci.oracle_oci_database.storage_allocated_by_tablespace
      - oci.oracle_oci_database.storage_used
      - oci.oracle_oci_database.storage_used_by_tablespace
      - oci.oracle_oci_database.storage_utilization
      - oci.oracle_oci_database.storage_utilization_by_tablespace
      - oci.oracle_oci_database.transaction_count
      - oci.oracle_oci_database.transactions_by_status
      - oci.oracle_oci_database.transport_lag
      - oci.oracle_oci_database.transport_lag_data_refresh_elapsed_time
      - oci.oracle_oci_database.unprotected_data_window
      - oci.oracle_oci_database.unusable_indexes
      - oci.oracle_oci_database.usable_fra
      - oci.oracle_oci_database.used_fraspace
      - oci.oracle_oci_database.user_calls
      - oci.oracle_oci_database.wait_time
      - oci.oracle_oci_database.dbmgmt_job_executions_count
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24362850
    source_type_name: OCI Database
  monitors:
    An OCI Database is approaching CPU saturation: assets/monitors/oci-db-cpu.json
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
git_integration_title: oci_database
integration_id: oci-database
integration_title: OCI Database
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_database
public_title: OCI Database
short_description: OCI Database (Base、RAC、Exadata) は、あらゆるアプリケーションを対象に、信頼性、拡張性、安全性の高いデータベースソリューションを提供します。
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
  description: OCI Database (Base、RAC、Exadata) は、あらゆるアプリケーションを対象に、信頼性、拡張性、安全性の高いデータベースソリューションを提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Database
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) は、あらゆるワークロードに対応する柔軟で高性能、かつセキュアなデータベースを提供します。

このインテグレーションは、CPU とストレージの使用率、データベースへのログオンおよび接続の成功回数と失敗回数、データベース操作、SQL クエリ、トランザクションを監視およびアラートに使用する主要なメトリクスを収集します。

以下のネームスペースの [Oracle Base Databases][1] および [Exadata VM Clusters][2] リソースからタグとメトリクスを収集します。

- [`oci_database`][3]
- [`oci_database_cluster`][3]

[Oracle Database Management][4] が有効になっている場合、このインテグレーションは [`oracle_oci_database`][3] ネームスペースを通じて、フリートモニタリングや SQL Tuning Advisor などの機能からのメトリクスも受信します。

Oracle Databases に [Datadog Agent][5] をインストールすると、アクティブセッション、ディスク使用量、表領域の使用状況といった追加のメトリクスをリアルタイムで把握できるようになります。

Datadog の [Database Monitoring (DBM)][6] を有効にすると、クエリのパフォーマンスとデータベースの健全性について詳細なインサイトを取得できます。標準のインテグレーション機能に加え、Datadog DBM では、クエリレベルのメトリクス、リアルタイムおよび過去のクエリスナップショット、待機イベントの分析情報、データベースの負荷、クエリ実行計画、ブロッキングを引き起こしているクエリについてのインサイトが提供されます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][7] インテグレーションをセットアップしたら、`oci_database` および `oci_database_cluster` のネームスペースが [Connector Hub][8] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_database" >}}


### イベント

OCI Database インテグレーションには、イベントは含まれません。

### サービスチェック

OCI Database インテグレーションには、サービス チェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.oracle.com/database/base-database-service/
[2]: https://www.oracle.com/engineered-systems/exadata/database-service/
[3]: https://docs.oracle.com/en-us/iaas/database-management/doc/oracle-cloud-database-metrics.html
[4]: https://www.oracle.com/manageability/database-management/
[5]: https://docs.datadoghq.com/ja/integrations/oracle
[6]: https://docs.datadoghq.com/ja/database_monitoring/
[7]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[8]: https://cloud.oracle.com/connector-hub/service-connectors
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_database/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/