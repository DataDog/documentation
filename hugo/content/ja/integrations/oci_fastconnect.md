---
app_id: oci-fastconnect
app_uuid: 24bb3f3f-03f6-4733-9f01-34838e3eed72
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.fastconnect.bits_received
      - oci.fastconnect.bits_sent
      - oci.fastconnect.bytes_received
      - oci.fastconnect.bytes_sent
      - oci.fastconnect.connection_state
      - oci.fastconnect.ipv_4bgp_session_state
      - oci.fastconnect.ipv_6bgp_session_state
      - oci.fastconnect.packets_discarded
      - oci.fastconnect.packets_error
      - oci.fastconnect.packets_received
      - oci.fastconnect.packets_sent
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303293
    source_type_name: OCI FastConnect
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
git_integration_title: oci_fastconnect
integration_id: oci-fastconnect
integration_title: OCI FastConnect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_fastconnect
public_title: OCI FastConnect
short_description: OCI FastConnect は、オンプレミス ネットワークと Oracle Cloud を結ぶ専用のプライベート接続を提供します。
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
  description: OCI FastConnect は、オンプレミス ネットワークと Oracle Cloud を結ぶ専用のプライベート接続を提供します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI FastConnect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) FastConnect は、OCI とお客様の環境を結ぶ専用のプライベート接続です。

このインテグレーションでは、 [oci_fastconnect][1] ネームスペースからメトリクスとタグを収集し、 FastConnect 接続の健全性、容量、パフォーマンスを監視してアラートを設定できます。

## セットアップ

### インストール

Once you set up the [Oracle Cloud Infrastructure][2] integration, ensure that any namespaces mentioned above are included in your [Connector Hub][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_fastconnect" >}}


### サービスチェック

OCI FastConnect には、サービス チェックは含まれません。

### イベント

OCI FastConnect には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。
[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/fastconnectmetrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_fastconnect/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/