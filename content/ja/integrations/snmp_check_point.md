---
app_id: snmp-check-point
app_uuid: ea753ad3-1b17-4b05-bca5-d6933308e55a
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10334
    source_type_name: Check Point
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
- https://github.com/DataDog/integrations-core/blob/master/snmp_check_point/README.md
display_on_public_website: true
draft: false
git_integration_title: snmp_check_point
integration_id: snmp-check-point
integration_title: Check Point
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: snmp_check_point
public_title: Check Point
short_description: Check Point のネットワークデバイスから SNMP メトリクスを収集します。
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
  description: Check Point のネットワークデバイスから SNMP メトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Check Point
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Check Point は、ネットワークセキュリティをはじめとする IT セキュリティのためのソフトウェアおよびハードウェア製品を提供している企業です。

Check Point とのインテグレーションを構成し、Check Point ファイアウォールなどのデバイスから SNMP メトリクスを収集します。

## 計画と使用

SNMP インテグレーションをインストールして構成するには、[ネットワークデバイスモニタリング][1]のドキュメントを参照してください。

## リアルユーザーモニタリング

### データセキュリティ

監視対象となるメトリクスの詳細については、[収集される SNMP データ][2]のセクションを参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog での SNMP モニタリング][4]



[1]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/setup
[2]: https://docs.datadoghq.com/ja/network_performance_monitoring/devices/data
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/