---
app_id: oci-waf
app_uuid: 9db0bb0a-05d6-44e7-a0f2-3f1352ed3780
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.waf.bandwidth
      - oci.waf.number_of_requests_detected
      - oci.waf.number_of_requests
      - oci.waf.traffic
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303379
    source_type_name: OCI Web Application Firewall
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
- security
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_waf
integration_id: oci-waf
integration_title: OCI Web Application Firewall
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_waf
public_title: OCI Web Application Firewall
short_description: OCI Web Application Firewall (WAF) は、スケーラブルなマネージド型セキュリティで、一般的な脅威から
  Web アプリケーションを保護します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Web Application Firewall (WAF) は、スケーラブルなマネージド型セキュリティで、一般的な脅威から
    Web アプリケーションを保護します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Web Application Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Oracle Web Application Firewall (WAF) は、PCI 準拠のクラウド ベースのグローバルな Web アプリケーション ファイアウォール サービスで、悪意のある、または不要なインターネット トラフィックからアプリケーションを保護します。

このインテグレーションでは、 [oci_waf][1] ネームスペースからメトリクスとタグを収集し、 ファイアウォールの健全性、容量、パフォーマンスを監視してアラートを設定できます。

## セットアップ

### インストール

[Oracle Cloud Infrastructure][2] インテグレーションを設定した後、上記に記載のネームスペースが [Connector Hub][3] に含まれていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_waf" >}}


### サービスチェック

OCI Web Application Firewall にはサービス チェックは含まれません。

### イベント

OCI Web Application Firewall にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.oracle.com/en-us/iaas/Content/WAF/Reference/metricsalarms.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_waf/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/