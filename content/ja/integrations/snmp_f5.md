---
app_id: snmp-f5
app_uuid: 07050d86-968b-49e2-970e-599f535eece2
assets:
  dashboards:
    F5-Networks: assets/dashboards/f5-networks.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10179
    source_type_name: F5 Networks
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_f5/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_f5
integration_id: snmp-f5
integration_title: F5 Networks
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: snmp_f5
public_title: F5 Networks
short_description: F5 ネットワークデバイスから SNMP メトリクスを収集
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
  description: F5 ネットワークデバイスから SNMP メトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: F5 Networks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

F5 Networks は、アプリケーションデリバリーネットワーキングとセキュリティの企業です。Big IP と LTM プラットフォームを含む F5 デバイスの健全性とパフォーマンスメトリクスを収集します。

## 計画と使用

F5 アプライアンスのすべてのメトリクスは、SNMP から収集されます。メトリクスの収集を開始するには、SNMP インテグレーションをインストールし、構成します。詳細と構成オプションについては、[ネットワークデバイスモニタリング][1]のドキュメントを参照してください。

## リアルユーザーモニタリング

### データセキュリティ

SNMP で収集可能なすべてのメトリクスは、ネットワークデバイスモニタリングのドキュメントの[収集データ][2]に記載されています。F5 アプライアンスから収集されたすべてのメトリクスは、[F5] ネームスペースの下で見つけることができます。

### ヘルプ

F5 インテグレーションに含まれるサービスチェックはありません。

### ヘルプ

F5 プラットフォームのどのコンポーネントからも、Datadog に追加のイベントが送信されることはありません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog でデータセンターおよびネットワークデバイスを監視][3]
* [Datadog による SNMP モニタリング][4]

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/network_monitoring/devices/setup
[2]: https://docs.datadoghq.com/ja/network_monitoring/devices/data
[3]: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[5]: https://docs.datadoghq.com/ja/help/