---
app_id: snmp-juniper
app_uuid: 783d0088-b478-4b3c-9654-ec4fbfefc18d
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Juniper Networks
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_juniper/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_juniper
integration_id: snmp-juniper
integration_title: Juniper Networks
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: snmp_juniper
public_title: Juniper Networks
short_description: Juniper のネットワークデバイスからメトリクスを収集します。
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
  description: Juniper のネットワークデバイスからメトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Juniper Networks
---



## 概要

Juniper Networks では、ルーター、スイッチ、ネットワーク管理ソフトウェア、ネットワークセキュリティ製品などのネットワーク製品を開発、販売しています。Juniper インテグレーションを構成すると、以下を含むデバイスから SNMP メトリクスを収集できます。

- Juniper EX イーサネットスイッチ
- Juniper MX ルーター
- Juniper SRX ファイアウォール

監視対象となるメトリクスの詳細については、[収集される NDM データ][1]のセクションを参照してください。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[収集される NDM データ][1]のセクションを参照してください。

### サービスのチェック

Juniper には、サービスのチェック機能は含まれません。

### イベント

Juniper には、イベントは含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog での SNMP モニタリング][3]
- [Datadog を使用した Juniper ネットワークデバイスの監視][4]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/network_monitoring/devices/data/
[2]: https://docs.datadoghq.com/ja/network_monitoring/devices/setup/
[3]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[4]: https://www.datadoghq.com/blog/monitor-juniper-network-devices-with-datadog/
[5]: https://docs.datadoghq.com/ja/help/