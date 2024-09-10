---
app_id: snmp-cisco
app_uuid: 91202d4a-1af4-4c64-88e4-5ba02b23c69f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10136
    source_type_name: Cisco
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- notifications
- snmp
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_cisco/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_cisco
integration_id: snmp-cisco
integration_title: Cisco
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_cisco
public_title: Cisco
short_description: Cisco ネットワークデバイスから SNMP メトリクスを収集
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco ネットワークデバイスから SNMP メトリクスを収集
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Cisco
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Cisco は、IT、ネットワーク、そしてサイバーセキュリティのソリューションを世界的にけん引する企業です。インテグレーションをインストールすると、ルーター、スイッチ、ボイスギア、セキュリティ アプライアンスなど、すべての Cisco アプライアンスを監視できます。

Cisco アプライアンスから、以下を含む SNMP メトリクスを収集:

- Cisco Catalyst
- [Cisco ASA (Adaptive Security Appliance: 適応型セキュリティアプライアンス)][1]
- [Cisco Meraki][2]
   **注**: [Meraki インテグレーションタイル][3]を通じて、追加イベントを Meraki から収集することができます
- Cisco Nexus
- Cisco ICM
- Cisco ISR
- [Cisco SD-WAN][4]
- Cisco UC Virtual Machines

**注**: このインテグレーションでサポートされている追加のベンダープロファイルは、[ネットワークベンダー][5]のページで確認できます。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][6]のドキュメントを参照してください。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[SNMP インテグレーションタイル][7]を参照してください。

### サービスチェック

SNMP Cisco には、サービスのチェック機能は含まれません。

### イベント

SNMP Cisco には、イベントは含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog を使用した SNMP の監視][8]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/crest_data_systems_cisco_asa/
[2]: https://docs.datadoghq.com/ja/integrations/meraki/
[3]: https://app.datadoghq.com/account/settings#integrations/meraki
[4]: https://docs.datadoghq.com/ja/integrations/cisco_sdwan/
[5]: https://docs.datadoghq.com/ja/network_monitoring/devices/#vendor-profiles
[6]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[7]: https://app.datadoghq.com/account/settings#integrations/snmp
[8]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[9]: https://docs.datadoghq.com/ja/help/
