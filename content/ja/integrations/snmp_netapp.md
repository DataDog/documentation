---
app_id: snmp-netapp
app_uuid: d50aeab6-c26b-49df-aeb1-910d5d1a3e48
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10333
    source_type_name: NetApp
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_netapp/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_netapp
integration_id: snmp-netapp
integration_title: NetApp
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: snmp_netapp
public_title: NetApp
short_description: NetApp ネットワークデバイスから SNMP メトリクスを収集
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
  description: NetApp ネットワークデバイスから SNMP メトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

NetApp はクラウドデータ管理とデータサービスを専門とする企業で、データやアプリケーションを管理するためのクラウドデータサービスをオンラインと物理サーバーの両方で提供しています。

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## 計画と使用

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## リアルユーザーモニタリング

### データセキュリティ

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][4]



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/