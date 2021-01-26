---
assets:
  dashboards: {}
  logs: {}
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
  - 'https://github.com/DataDog/integrations-core/blob/master/snmp_juniper/README.md'
display_name: Juniper Networks
draft: false
git_integration_title: snmp_juniper
guid: 62f074dc-8b6b-466d-bca2-175194221546
integration_id: snmp-juniper
integration_title: Juniper Networks
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snmp.
metric_to_check:
  - snmp.jnxDcuStatsPackets
  - snmp.jnxVirtualChassisPortInPkts
  - snmp.jnxScuStatsPackets
name: snmp_juniper
public_title: Datadog-Juniper Networks
short_description: Juniper のネットワークデバイスからメトリクスを収集します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Juniper Networks では、ルーター、スイッチ、ネットワーク管理ソフトウェア、ネットワークセキュリティ製品などのネットワーク製品を開発、販売しています。Juniper インテグレーションを構成すると、以下を含むデバイスから SNMP メトリクスを収集できます。

- Juniper EX イーサネットスイッチ
- Juniper MX ルーター
- Juniper SRX ファイアウォール

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

### サービスのチェック

Juniper には、サービスのチェック機能は含まれません。

### イベント

Juniper には、イベントは含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog での SNMP モニタリング][3]

[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data/
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/