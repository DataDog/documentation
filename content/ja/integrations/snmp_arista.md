---
app_id: snmp-arista
app_uuid: b5d6950a-7880-4b47-b9e9-49fe38e00490
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10328
    source_type_name: Arista
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- notifications
- snmp
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_arista/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_arista
integration_id: snmp-arista
integration_title: Arista
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snmp_arista
public_title: Arista
short_description: Arista ネットワークデバイスから SNMP メトリクスを収集
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Arista ネットワークデバイスから SNMP メトリクスを収集
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  support: README.md#Support
  title: Arista
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Arista Networks は、マルチレイヤーネットワークスイッチ製品を設計・販売しているコンピューターネットワーク企業です。

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## ベンダープロファイル

このインテグレーションでサポートされている具体的なベンダープロファイルは、[ネットワークベンダー][3]のページで確認できます。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog を使用した SNMP の監視][5]



[1]: https://docs.datadoghq.com/ja/network_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/network_monitoring/devices/supported_devices/
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/