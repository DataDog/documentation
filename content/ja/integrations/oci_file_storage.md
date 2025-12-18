---
app_id: oci-file-storage
app_uuid: b41765f3-f739-4f1b-8e83-4b936dab6cfa
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.filestorage.file_system_read_average_latency_by_size
      - oci.filestorage.file_system_read_requests_by_size
      - oci.filestorage.file_system_read_throughput
      - oci.filestorage.file_system_usage
      - oci.filestorage.file_system_write_average_latency_by_size
      - oci.filestorage.file_system_write_requests_by_size
      - oci.filestorage.file_system_write_throughput
      - oci.filestorage.kerberos_errors
      - oci.filestorage.ldap_connection_errors
      - oci.filestorage.ldap_request_average_latency
      - oci.filestorage.ldap_request_errors
      - oci.filestorage.ldap_request_throughput
      - oci.filestorage.metadata_iops
      - oci.filestorage.metadata_request_average_latency
      - oci.filestorage.mount_target_connections
      - oci.filestorage.mount_target_health
      - oci.filestorage.mount_target_read_throughput
      - oci.filestorage.mount_target_write_throughput
      - oci.filestorage.replication_egress_throughput
      - oci.filestorage.replication_recovery_point_age
      - oci.filestorage.replication_throughput
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303322
    source_type_name: OCI File Storage
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
git_integration_title: oci_file_storage
integration_id: oci-file-storage
integration_title: OCI File Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_file_storage
public_title: OCI File Storage
short_description: OCI File Storage は、アプリケーション向けにスケール可能で安全な完全マネージドのファイル システムを提供します。
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
  description: OCI File Storage は、アプリケーション向けにスケール可能で安全な完全マネージドのファイル システムを提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI File Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) File Storage は、完全マネージドで伸縮性のあるエンタープライズ グレードのストレージ サービスです。共有ファイル システムを通じて、サーバーやアプリケーションからデータにアクセスできます。

このインテグレーションでは、 [oci_filestorage][1] ネームスペースからメトリクスとタグを収集し、 File Storage のステータス、スループット、エラーを監視してアラートを設定できます。

## セットアップ

### インストール

Once you set up the [Oracle Cloud Infrastructure][2] integration, ensure that any namespaces mentioned above are included in your [Connector Hub][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_file_storage" >}}


### サービスチェック

OCI File Storage には、サービス チェックは含まれません。

### イベント

OCI File Storage には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。
[1]: https://docs.oracle.com/en-us/iaas/Content/File/Reference/filemetrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_file_storage/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/