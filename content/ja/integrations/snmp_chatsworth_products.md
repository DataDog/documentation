---
"app_id": "snmp-chatsworth-products"
"app_uuid": "344b37df-ba82-4352-b277-ba1f1ccf716f"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10330"
    "source_type_name": Chatsworth Products
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- network
- notifications
- snmp
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/snmp_chatsworth_products/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp_chatsworth_products"
"integration_id": "snmp-chatsworth-products"
"integration_title": "Chatsworth Products"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp_chatsworth_products"
"public_title": "Chatsworth Products"
"short_description": "Collect SNMP metrics from your Chatsworth Products network devices."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Network"
  - "Category::Notifications"
  - "Category::SNMP"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Collect SNMP metrics from your Chatsworth Products network devices.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Chatsworth Products
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Chatsworth Products (CPI) is a global manufacturer of products and solutions designed to protect IT and industrial equipment.

Configure the Chatsworth Products integration and collect SNMP metrics from devices such as Chatsworth PDUs.

For details of monitored metrics see the [SNMP Data Collected][1] section.

## セットアップ

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## ベンダープロファイル

このインテグレーションでサポートされている具体的なベンダープロファイルは、[ネットワークベンダー][3]のページで確認できます。

## 収集データ

### メトリクス

監視対象となるメトリクスの詳細については、[収集される SNMP データ][1]のセクションを参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Monitor SNMP with Datadog][5]



[1]: https://docs.datadoghq.com/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/network_monitoring/devices/#vendor-profiles
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/

