---
app_id: oci-vpn
app_uuid: 5dc51055-a401-4489-82d9-2b37e881985c
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.vpn.bytes_received
      - oci.vpn.bytes_sent
      - oci.vpn.packets_error
      - oci.vpn.packets_received
      - oci.vpn.packets_sent
      - oci.vpn.tunnel_state
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38638772
    source_type_name: OCI VPN
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
git_integration_title: oci_vpn
integration_id: oci-vpn
integration_title: OCI VPN
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_vpn
public_title: OCI VPN
short_description: OCI VPN は、暗号化された Virtual Private Network 接続を介して、オンプレミス ネットワークを
  Oracle Cloud に安全に拡張します。
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
  description: OCI VPN は、暗号化された Virtual Private Network 接続を介して、オンプレミス ネットワークを Oracle
    Cloud に安全に拡張します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI VPN
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) の Site-to-Site バーチャル プライベート ネットワーク (VPN) は、業界標準の IPSec プロトコルを使用して、既存のインターネット接続を通じて企業ネットワークやサイトから OCI へのプライベートでセキュアな接続性を確保します。

このインテグレーションにより、[oci_vpn][1] ネームスペースからメトリクスを収集して、VPN のステータス、スループット、エラーを監視し、アラートを設定できます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] インテグレーションを設定した後、上記に記載のネームスペースが [Connector Hub][3] に含まれていることを確認してください。


## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_vpn" >}}


### サービスチェック

OCI VPN にはサービス チェックは含まれていません。

### イベント

OCI VPN にはイベントは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/ipsecmetrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_vpn/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/