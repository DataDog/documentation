---
app_id: snmp-juniper
app_uuid: 783d0088-b478-4b3c-9654-ec4fbfefc18d
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10146
    source_type_name: Juniper Networks
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- notifications
- snmp
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_juniper/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_juniper
integration_id: snmp-juniper
integration_title: Juniper Networks
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_juniper
public_title: Juniper Networks
short_description: Collect metrics from your Juniper network devices.
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
  description: Collect metrics from your Juniper network devices.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Juniper Networks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Juniper Networks develops and markets networking products, including routers, switches, network management software, and network security products. Configure the Juniper integration and collect SNMP metrics from devices, including:

- Juniper EX Ethernet Switches
- Juniper MX Routers
- Juniper SRX Firewalls

For details of monitored metrics see the [NDM Data Collected][1] section.

## セットアップ

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## ベンダープロファイル

このインテグレーションでサポートされている具体的なベンダープロファイルは、[ネットワークベンダー][3]のページで確認できます。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[収集される NDM データ][1]のセクションを参照してください。

### サービスチェック

Juniper には、サービスのチェック機能は含まれません。

### イベント

Juniper には、イベントは含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog での SNMP モニタリング][4]
- [Monitor Juniper network devices with Datadog][5]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/network_monitoring/devices/data/
[2]: https://docs.datadoghq.com/ja/network_monitoring/devices/setup/
[3]: https://docs.datadoghq.com/ja/network_monitoring/devices/#vendor-profiles
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://www.datadoghq.com/blog/monitor-juniper-network-devices-with-datadog/
[6]: https://docs.datadoghq.com/ja/help/