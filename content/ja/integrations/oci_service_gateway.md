---
app_id: oci-service-gateway
app_uuid: 8f64cdf9-ed18-4b5d-8159-b358e01306be
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.service_gateway.bytes_from_service
      - oci.service_gateway.bytes_to_service
      - oci.service_gateway.packets_from_service
      - oci.service_gateway.packets_to_service
      - oci.service_gateway.sgw_drops_from_service
      - oci.service_gateway.sgw_drops_to_service
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303366
    source_type_name: OCI Service Gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- ネットワーク
- クラウド
- oracle
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_service_gateway
integration_id: oci-service-gateway
integration_title: OCI Service Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_service_gateway
public_title: OCI Service Gateway
short_description: OCI Service Gateway は、仮想クラウド ネットワーク (VCN) 内から Oracle Cloud サービスへのプライベートかつセキュアなアクセスを可能にします。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Service Gateway は、Virtual Cloud Network (VCN) 内の Oracle Cloud サービスへのプライベートでセキュアなアクセスを可能にします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Service Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) Service Gateway は、複数の Oracle Cloud サービスへのプライベートかつセキュアなアクセスを提供します。仮想クラウド ネットワーク (VCN) 内またはオンプレミス ネットワークから、インターネットを経由せずに単一のゲートウェイを介して複数の Oracle Cloud サービスに同時にアクセスできます。

このインテグレーションでは、 [oci_service_gateway][1] ネームスペースからメトリクスとタグを収集し、Service Gateway のステータス、スループット、エラーを監視してアラートを設定できます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] インテグレーションを設定した後、上記に記載のネームスペースが [Connector Hub][3] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_service_gateway" >}}


### サービスチェック

OCI Service Gateway にはサービス チェックは含まれません。

### イベント

OCI Service Gateway にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/SGWmetrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_service_gateway/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/