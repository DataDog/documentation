---
"app_id": "snmp-netapp"
"app_uuid": "d50aeab6-c26b-49df-aeb1-910d5d1a3e48"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10333"
    "source_type_name": NetApp
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
- "https://github.com/DataDog/integrations-core/blob/master/snmp_netapp/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp_netapp"
"integration_id": "snmp-netapp"
"integration_title": "NetApp"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp_netapp"
"public_title": "NetApp"
"short_description": "Collect SNMP metrics from your NetApp network devices."
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
  "description": Collect SNMP metrics from your NetApp network devices.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": NetApp
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

NetApp is a cloud data management and data services company that offers online and physical cloud data services to manage data and applications.

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## セットアップ

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## 収集データ

### メトリクス

For details of monitored metrics, see the [SNMP Data Collected][1] section.


## トラブルシューティング

Need help? Contact [Datadog support][3].

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitor SNMP with Datadog][4]



[1]: https://docs.datadoghq.com/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/

