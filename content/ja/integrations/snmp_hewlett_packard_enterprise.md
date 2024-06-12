---
app_id: snmp-hewlett-packard-enterprise
app_uuid: 48134faf-2af6-4512-9853-ebe2a8620515
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Hewlett-Packard Enterprise
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_hewlett_packard_enterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_hewlett_packard_enterprise
integration_id: snmp-hewlett-packard-enterprise
integration_title: Hewlett-Packard Enterprise
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: snmp_hewlett_packard_enterprise
public_title: Hewlett-Packard Enterprise
short_description: Hewlett-Packard Enterprise のネットワークデバイスから SNMP メトリクスを収集します。
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
  description: Hewlett-Packard Enterprise のネットワークデバイスから SNMP メトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hewlett-Packard Enterprise
---



## 概要

HPE は、サーバー、ネットワーク、データストレージ、コンテナ化ソフトウェアなどの開発・事業を行う多国籍 IT 企業です。

HPE インテグレーションを構成し、HP iLO や HP Proliant などのデバイスから SNMP メトリクスを収集します。

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



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/