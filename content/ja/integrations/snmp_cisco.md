---
app_id: snmp-cisco
app_uuid: 91202d4a-1af4-4c64-88e4-5ba02b23c69f
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cisco
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニタリング
- notification
- ネットワーク
- snmp
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_cisco/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_cisco
integration_id: snmp-cisco
integration_title: Cisco
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: snmp_cisco
public_title: Cisco
short_description: Cisco ネットワークデバイスから SNMP メトリクスを収集
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Monitoring
  - Category::Notification
  - Category::Network
  - Category::SNMP
  configuration: README.md#Setup
  description: Cisco ネットワークデバイスから SNMP メトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco
---



## 概要

Cisco は、IT、ネットワーク、そしてサイバーセキュリティのソリューションを世界的にけん引する企業です。インテグレーションをインストールすると、ルーター、スイッチ、ボイスギア、セキュリティ アプライアンスなど、すべての Cisco アプライアンスを監視できます。

Cisco アプライアンスから、以下を含む SNMP メトリクスを収集:

- Cisco Catalyst
- Cisco ASA (Adaptive Security Appliance: 適応型セキュリティアプライアンス)
- Cisco Meraki (注: [Meraki インテグレーションタイル][1]を通じて、追加イベントを Meraki から収集可能)
- Cisco Nexus
- Cisco ICM
- Cisco ISR
- Cisco UC Virtual Machines

監視対象となるメトリクスの詳細については、[SNMP インテグレーションタイル][2]を参照してください。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][3]のドキュメントを参照してください。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[SNMP インテグレーションタイル][2]を参照してください。

### サービスのチェック

SNMP Cisco には、サービスのチェック機能は含まれません。

### イベント

SNMP Cisco には、イベントは含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][4]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/meraki
[2]: https://app.datadoghq.com/account/settings#integrations/snmp
[3]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://docs.datadoghq.com/ja/help/