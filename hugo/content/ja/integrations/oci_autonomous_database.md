---
app_id: oci-autonomous-database
app_uuid: 0511a203-b0bb-471b-9900-323fd60dd008
assets:
  dashboards:
    OCI-Autonomous-Database-Overview: assets/dashboards/oci-autonomous-database-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.autonomous_database.apply_lag
      - oci.autonomous_database.block_changes
      - oci.autonomous_database.cpu_time
      - oci.autonomous_database.cpu_utilization
      - oci.autonomous_database.current_logons
      - oci.autonomous_database.dbtime
      - oci.autonomous_database.ecpus_allocated
      - oci.autonomous_database.execute_count
      - oci.autonomous_database.iops
      - oci.autonomous_database.iothroughput
      - oci.autonomous_database.logical_blocks_read
      - oci.autonomous_database.ocpus_allocated
      - oci.autonomous_database.parse_count
      - oci.autonomous_database.parses_by_type
      - oci.autonomous_database.queued_statements
      - oci.autonomous_database.redo_size
      - oci.autonomous_database.running_statements
      - oci.autonomous_database.session_utilization
      - oci.autonomous_database.sessions
      - oci.autonomous_database.storage_allocated
      - oci.autonomous_database.storage_allocated_by_tablespace
      - oci.autonomous_database.storage_used
      - oci.autonomous_database.storage_used_by_tablespace
      - oci.autonomous_database.storage_utilization
      - oci.autonomous_database.storage_utilization_by_tablespace
      - oci.autonomous_database.transaction_count
      - oci.autonomous_database.transactions_by_status
      - oci.autonomous_database.transport_lag
      - oci.autonomous_database.user_calls
      - oci.autonomous_database.wait_time
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24370730
    source_type_name: OCI Autonomous Database
  monitors:
    An Autonomous Database is approaching CPU saturation: assets/monitors/oci-autonomous-db-cpu.json
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
git_integration_title: oci_autonomous_database
integration_id: oci-autonomous-database
integration_title: OCI Autonomous Database
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_autonomous_database
public_title: OCI Autonomous Database
short_description: Oracle Autonomous Database は、自動チューニング、パッチ適用、およびスケーリングによってデータベース管理を自動化します。
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
  description: Oracle Autonomous Database は、自動チューニング、パッチ適用、およびスケーリングによってデータベース管理を自動化します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Autonomous Database
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Autonomous Database は、自然言語をデータベースクエリに自動変換し、SQL、JSON ドキュメント、Oracle Graph、Oracle Spatial、テキスト、およびベクトルを 1 つのデータベースで利用できるようにします。

このインテグレーションでは、[oci_autonomous_database][1] ネームスペースからメトリクスとタグを収集することで、Autonomous Database の現在の接続数、ステートメント数、CPU 使用率、バックアップ時間を監視し、アラートを設定できます。

Oracle Databases に [Datadog Agent][2] をインストールすると、アクティブセッション、ディスク使用量、表領域の使用状況といった追加のメトリクスをリアルタイムで把握できるようになります。

Datadog の [Database Monitoring (DBM)][3] を有効にすると、クエリのパフォーマンスとデータベースの健全性について、より詳細なインサイトを取得できます。標準のインテグレーション機能に加え、Datadog DBM では、クエリ レベルのメトリクス、リアルタイムおよび過去のクエリ スナップショット、待機イベントの分析、データベース負荷、クエリ実行計画、ブロッキング クエリに関するインサイトが提供されます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][4] インテグレーションを設定したら、[Connector Hub][5] に `oci_autonomous_database` ネームスペースが含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_autonomous_database" >}}


### イベント

OCI Autonomous Database インテグレーションには、イベントは含まれません。

### サービスチェック

OCI Autonomous Database インテグレーションには、サービス チェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://docs.oracle.com/en-us/iaas/autonomous-database/doc/monitor-databases-autonomous-database-metrics.html
[2]: https://docs.datadoghq.com/ja/integrations/oracle
[3]: https://docs.datadoghq.com/ja/database_monitoring/
[4]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[5]: https://cloud.oracle.com/connector-hub/service-connectors
[6]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_autonomous_database/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/