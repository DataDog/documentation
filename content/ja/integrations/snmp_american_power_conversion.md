---
app_id: snmp-american-power-conversion
app_uuid: 6b5325b8-443d-42e0-8545-f7dc42acacb4
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: American Power Conversion
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_american_power_conversion/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_american_power_conversion
integration_id: snmp-american-power-conversion
integration_title: American Power Conversion
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: snmp_american_power_conversion
oauth: {}
public_title: American Power Conversion
short_description: American Power Conversion のネットワークデバイスから SNMP メトリクスを収集します。
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
  description: American Power Conversion のネットワークデバイスから SNMP メトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: American Power Conversion
---



## 概要

APC は、サージプロテクションやバッテリーバックアップ電源など、IT 物理インフラストラクチャー製品を提供しています。

APC インテグレーションを構成し、APC 無停電電源装置 (UPS) 製品などのデバイスから SNMP メトリクスを収集します。

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
