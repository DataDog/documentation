---
assets:
  dashboards:
    F5-Networks: assets/dashboards/f5-networks.json
  logs: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- モニタリング
- notification
- ネットワーク
- autodiscovery
- snmp
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_f5/README.md
display_name: F5 Networks
draft: false
git_integration_title: snmp_f5
guid: e3ce21b2-a360-47ea-b7b2-1f746f98c1f3
integration_id: snmp-f5
integration_title: F5 Networks
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_to_check:
- snmp.sysStatMemoryUsed
- snmp.sysMultiHostCpuUser
- snmp.sysTcpStatConnects
name: snmp_f5
public_title: F5 Networks
short_description: F5 ネットワークデバイスから SNMP メトリクスを収集
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

F5 Networks は、アプリケーションデリバリーネットワーキングとセキュリティの企業です。Big IP と LTM プラットフォームを含む F5 デバイスの健全性とパフォーマンスメトリクスを収集します。

## セットアップ

F5 アプライアンスのすべてのメトリクスは、SNMP から収集されます。メトリクスの収集を開始するには、SNMP インテグレーションをインストールし、構成します。詳細と構成オプションについては、[ネットワークデバイスモニタリング][1]のドキュメントを参照してください。

## 収集データ

### メトリクス

SNMP で収集可能なすべてのメトリクスは、ネットワークデバイスモニタリングのドキュメントの[収集データ][2]に記載されています。F5 アプライアンスから収集されたすべてのメトリクスは、[F5] ネームスペースの下で見つけることができます。

### サービスのチェック

F5 インテグレーションに含まれるサービスチェックはありません。

### イベント

F5 プラットフォームのどのコンポーネントからも、Datadog に追加のイベントが送信されることはありません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog でデータセンターおよびネットワークデバイスを監視][3]
* [Datadog による SNMP モニタリング][4]

[1]: https://docs.datadoghq.com/ja/network_monitoring/devices/setup
[2]: https://docs.datadoghq.com/ja/network_monitoring/devices/data
[3]: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/