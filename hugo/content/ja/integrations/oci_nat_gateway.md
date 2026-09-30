---
app_id: oci-nat-gateway
app_uuid: 80e00ce9-4129-4b76-9bd0-8eaecf0d52e4
assets:
  dashboards:
    OCI-NAT-Gateway-Overview: assets/dashboards/oci-nat-gateway-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.nat_gateway.bytes_from_natgw
      - oci.nat_gateway.bytes_to_natgw
      - oci.nat_gateway.connections_closed
      - oci.nat_gateway.connections_established
      - oci.nat_gateway.connections_timed_out
      - oci.nat_gateway.drops_to_natgw
      - oci.nat_gateway.packets_from_natgw
      - oci.nat_gateway.packets_to_natgw
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24742485
    source_type_name: OCI NAT Gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- cloud
- oracle
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_nat_gateway
integration_id: oci-nat-gateway
integration_title: OCI NAT Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_nat_gateway
public_title: OCI NAT Gateway
short_description: OCI NAT Gateway は、 VCN 内のリソースが安全かつ制御された形でアウトバウンドのインターネット アクセスを行えるようにします。
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
  description: OCI NAT Gateway は、 VCN 内のリソースが安全かつ制御された形でアウトバウンドのインターネット アクセスを行えるようにします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI NAT Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Cloud Infrastructure (OCI) は、 Virtual Cloud Network (VCN) 向けに、信頼性が高く可用性にも優れたネットワーク アドレス変換 (NAT) ソリューションを、 NAT ゲートウェイという形で提供します。

このインテグレーションでは、 [`oci_nat_gateway`][1] ネームスペースからメトリクスとタグを収集し、 NAT ゲートウェイとの間のトラフィックやパケット ロスを監視してアラートを設定できます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] インテグレーションを設定したら、 [Connector Hub][3] に `oci_nat_gateway` ネームスペースが含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_nat_gateway" >}}


### イベント

OCI NAT Gateway インテグレーションには、イベントは含まれません。

### サービス チェック

OCI NAT Gateway インテグレーションには、サービス チェックは含まれません。

## トラブル シューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_nat_gateway/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/