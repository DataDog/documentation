---
app_id: snmp-aruba
app_uuid: 39ecfe88-b733-43f6-b8c5-99450430b776
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10354
    source_type_name: Aruba
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- notifications
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snmp_aruba/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_aruba
integration_id: snmp-aruba
integration_title: Aruba
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: snmp_aruba
public_title: Aruba
short_description: Aruba ネットワークデバイスから SNMP メトリクスを収集します。
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
  - Category::Notifications
  - Category::Network
  configuration: README.md#Setup
  description: Aruba ネットワークデバイスから SNMP メトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aruba
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Aruba Networks は Hewlett Packard Enterprise のワイヤレスネットワーキングの子会社で、有線、ワイヤレス、SD-WAN ソリューションを提供しています。Aruba インテグレーションを構成し、Aruba スイッチやアクセスポイントなどのデバイスから SNMP メトリクスを収集します。

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## セットアップ

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][2]のドキュメントを参照してください。

## データ収集

### メトリクス

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][4]



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/