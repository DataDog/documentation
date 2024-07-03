---
app_id: snmp-dell
app_uuid: 2d90389f-0e85-49a8-8fd9-715ff1836a23
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10147
    source_type_name: Dell
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_dell/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_dell
integration_id: snmp-dell
integration_title: Dell Inc.
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_dell
public_title: Dell Inc.
short_description: Collect metrics from Dell devices.
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
  description: Collect metrics from Dell devices.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Dell Inc.
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Dell Inc. is a technology company that develops computers and network hardware for high performance networking in both small and large businesses. Collect metrics for monitoring and alerting from Dell hardware including:

* Dell PowerEdge
* Dell iDRAC
* Dell EMC Isilon

For a complete list of all the metrics collected from Dell devices, see the [Network Device Monitoring documentation][1].

## セットアップ

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## ベンダープロファイル

このインテグレーションでサポートされている具体的なベンダープロファイルは、[ネットワークベンダー][3]のページで確認できます。

## 収集データ

### メトリクス

監視対象のメトリクスの詳細については、[ネットワークデバイスの監視に関するドキュメント][1]を参照してください。

### サービスチェック

Dell インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Dell インテグレーションには、イベントは含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][4]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/network_monitoring/devices/#vendor-profiles
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://docs.datadoghq.com/ja/help/