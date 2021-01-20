---
assets:
  configuration: {}
  dashboards: {}
  logs: {}
  metrics_metadata: ''
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - モニタリング
  - notification
  - ネットワーク
  - オートディスカバリー
  - snmp
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/snmp_cisco/README.md'
display_name: Cisco
draft: false
git_integration_title: snmp_cisco
guid: 4109f288-7460-4ed2-b0c3-04e708fbd5bd
integration_id: snmp-cisco
integration_title: Cisco
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snmp.
metric_to_check:
  - snmp.cefcFRUPowerAdminStatus
  - snmp.devClientCount
name: snmp_cisco
public_title: Datadog-Cisco インテグレーション
short_description: Cisco ネットワークデバイスから SNMP メトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
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

監視されるメトリクスの詳細については、[SNMP インテグレーションタイル][2]を参照してください。

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

[1]: https://app.datadoghq.com/account/settings#integrations/meraki
[2]: https://app.datadoghq.com/account/settings#integrations/snmp
[3]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/