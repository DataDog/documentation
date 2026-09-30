---
app_id: oci-object-storage
app_uuid: 360a1cb0-ba5e-4913-9659-f56f08071fea
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.objectstorage.all_requests
      - oci.objectstorage.client_errors
      - oci.objectstorage.enabled_olm
      - oci.objectstorage.first_byte_latency
      - oci.objectstorage.object_count
      - oci.objectstorage.post_requests
      - oci.objectstorage.put_requests
      - oci.objectstorage.stored_bytes
      - oci.objectstorage.total_request_latency
      - oci.objectstorage.uncommitted_parts
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303208
    source_type_name: OCI Object Storage
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
git_integration_title: oci_object_storage
integration_id: oci-object-storage
integration_title: OCI Object Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_object_storage
public_title: OCI Object Storage
short_description: OCI Object Storage は、非構造化データ向けに安全でスケーラブルなストレージを提供し、さまざまなクラウド アプリケーションを支えます。
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
  description: OCI Object Storage は、非構造化データ向けに安全でスケーラブルなストレージを提供し、さまざまなクラウド アプリケーションを支えます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Object Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) Object Storage は、あらゆる種類のデータに対応する、スケーラブルで耐久性が高く低コストなストレージを提供します。

このインテグレーションでは、[oci_objectstorage][1] ネームスペースからメトリクスとタグを収集し、バケットとオブジェクトのストレージ使用量やリクエスト レイテンシーを監視し、アラートを設定できます。

## セットアップ

### インストール

Once you set up the [Oracle Cloud Infrastructure][2] integration, ensure that any namespaces mentioned above are included in your [Connector Hub][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_object_storage" >}}


### サービスチェック

OCI Object Storage には、サービス チェックは含まれません。

### イベント

OCI Object Storage には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。
[1]: https://docs.oracle.com/en-us/iaas/Content/Object/Reference/objectstoragemetrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_object_storage/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/