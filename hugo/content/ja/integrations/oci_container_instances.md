---
app_id: oci-container-instances
app_uuid: 3ed1e6b8-a260-4b8d-9d1d-e180ed388776
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.computecontainerinstance.container_cpu_used
      - oci.computecontainerinstance.container_ephemeral_storage_used
      - oci.computecontainerinstance.container_memory_used
      - oci.computecontainerinstance.cpu_used
      - oci.computecontainerinstance.cpu_utilization
      - oci.computecontainerinstance.ephemeral_storage_used
      - oci.computecontainerinstance.memory_used
      - oci.computecontainerinstance.memory_utilization
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 37146647
    source_type_name: OCI Container Instances
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- oracle
- モニター
- incident-teams
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_container_instances
integration_id: oci-container-instances
integration_title: OCI Container Instances
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_container_instances
public_title: OCI Container Instances
short_description: OCI Container Instances は、インフラストラクチャー管理を必要としないサーバーレス コンテナ環境を提供します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Container Instances は、インフラストラクチャー管理を必要としないサーバーレス コンテナ環境を提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Container Instances
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) Container Instances は、サーバーレス コンピュート サービスであり、サーバーを管理することなく、すぐにコンテナを実行できます。

このインテグレーションは、 [oci_computecontainerinstance][1] ネームスペースからメトリクスとタグを収集することで、Oracle Cloud Infrastructure (OCI) のコンテナ インスタンスの健全性、キャパシティ、パフォーマンスの監視およびアラートの設定に役立ちます。

## セットアップ

### インストール

OCI Container Instances のメトリクスは現在 **プレビュー** 段階であり、一般提供 (GA) になるまで課金されません。

Once you set up the [Oracle Cloud Infrastructure][2] integration, ensure that any namespaces mentioned above are included in your [Connector Hub][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_container_instances" >}}


### サービスチェック

OCI Container Instances にはサービスチェックは含まれません。

### イベント

OCI Container Instances にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.oracle.com/en-us/iaas/Content/container-instances/container-instance-metrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_container_instances/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/