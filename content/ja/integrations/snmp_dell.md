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
  - 'https://github.com/DataDog/integrations-core/blob/master/snmp_dell/README.md'
display_name: Dell
draft: false
git_integration_title: snmp_dell
guid: 67aa0ef7-7c1d-4c03-8723-6beb4f531f6b
integration_id: snmp-dell
integration_title: Dell Inc.
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snmp.
metric_to_check:
  - snmp.fanSpeed
  - snmp.systemStateChassisStatus
  - snmp.cacheDeviceStatus
name: snmp_dell
public_title: Datadog-Dell Inc.
short_description: Dell のデバイスからメトリクスを収集します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Dell Inc. は、中小企業と大企業の両方で高性能ネットワーキング用のコンピュータとネットワークハードウェアを開発するテクノロジー企業です。次のような Dell のハードウェアから監視およびアラートのメトリクスを収集します。

* Dell PowerEdge
* Dell iDRAC
* Dell EMC Isilon

Dell のデバイスから収集されるすべてのメトリクスの完全なリストについては、[ネットワークデバイスの監視に関するドキュメント][1]を参照してください。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## 収集データ

### メトリクス

監視対象のメトリクスの詳細については、[ネットワークデバイスの監視に関するドキュメント][1]を参照してください。

### サービスのチェック

Dell インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Dell インテグレーションには、イベントは含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][3]

[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/