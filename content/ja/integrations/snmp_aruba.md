---
app_id: snmp-aruba
app_uuid: 39ecfe88-b733-43f6-b8c5-99450430b776
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10354
    source_type_name: Aruba
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_aruba/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_aruba
integration_id: snmp-aruba
integration_title: Aruba
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_aruba
public_title: Aruba
short_description: Collect SNMP metrics from your Aruba network devices.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Notifications
  - Category::Network
  configuration: README.md#Setup
  description: Collect SNMP metrics from your Aruba network devices.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aruba
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Aruba Networks is a wireless networking subsidiary of Hewlett Packard Enterprise and provides wired, wireless, and SD-WAN solutions. Configure the Aruba integration and collect SNMP metrics from devices such as Aruba switches and access points.

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## Setup

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## ベンダープロファイル

このインテグレーションでサポートされている具体的なベンダープロファイルは、[ネットワークベンダー][3]のページで確認できます。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Monitor SNMP with Datadog][5]



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/network_monitoring/devices/#vendor-profiles
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/