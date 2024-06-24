---
app_id: snmp-chatsworth-products
app_uuid: 344b37df-ba82-4352-b277-ba1f1ccf716f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10330
    source_type_name: Chatsworth Products
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- notifications
- snmp
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_chatsworth_products/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_chatsworth_products
integration_id: snmp-chatsworth-products
integration_title: Chatsworth Products
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: snmp_chatsworth_products
public_title: Chatsworth Products
short_description: Chatsworth Products のネットワークデバイスから SNMP メトリクスを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notifications
  - Category::SNMP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Chatsworth Products のネットワークデバイスから SNMP メトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Chatsworth Products
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Chatsworth Products (CPI) は、IT 機器や産業機器を保護するための製品やソリューションを提供する世界的なメーカーです。

Chatsworth Products のインテグレーションを構成し、Chatsworth PDU などのデバイスから SNMP メトリクスを収集します。

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## 計画と使用

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## リアルユーザーモニタリング

### データセキュリティ

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][4]



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/