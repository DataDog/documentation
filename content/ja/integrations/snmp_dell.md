---
app_id: snmp-dell
app_uuid: 2d90389f-0e85-49a8-8fd9-715ff1836a23
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Dell
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- notification
- snmp
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_dell/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_dell
integration_id: snmp-dell
integration_title: Dell Inc.
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: snmp_dell
public_title: Dell Inc.
short_description: Dell のデバイスからメトリクスを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notification
  - Category::SNMP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Dell のデバイスからメトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Dell Inc.
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

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[4]: https://docs.datadoghq.com/ja/help/