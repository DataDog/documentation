---
app_id: snmp-netapp
app_uuid: d50aeab6-c26b-49df-aeb1-910d5d1a3e48
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: NetApp
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_netapp/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_netapp
integration_id: snmp-netapp
integration_title: NetApp
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: snmp_netapp
oauth: {}
public_title: NetApp
short_description: NetApp ネットワークデバイスから SNMP メトリクスを収集
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
  - Category::Monitoring
  - Category::Notification
  - Category::Network
  - Category::SNMP
  configuration: README.md#Setup
  description: NetApp ネットワークデバイスから SNMP メトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp
---



## 概要

NetApp はクラウドデータ管理とデータサービスを専門とする企業で、データやアプリケーションを管理するためのクラウドデータサービスをオンラインと物理サーバーの両方で提供しています。

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][4]



[1]: https://docs.datadoghq.com/ja/network_device_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_device_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
