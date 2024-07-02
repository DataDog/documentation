---
"app_id": "snmp-check-point"
"app_uuid": "ea753ad3-1b17-4b05-bca5-d6933308e55a"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10334"
    "source_type_name": Check Point
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
- "https://github.com/DataDog/integrations-core/blob/master/snmp_check_point/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp_check_point"
"integration_id": "snmp-check-point"
"integration_title": "Check Point"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp_check_point"
"public_title": "Check Point"
"short_description": "Collect SNMP metrics from your Check Point network devices."
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
  "description": Collect SNMP metrics from your Check Point network devices.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Check Point
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Check Point is a provider of software and hardware products for IT security, including network security.

Configure the Check Point integration and collect SNMP metrics from devices such as Check Point firewalls.

## セットアップ

To install and configure the SNMP integration, see the [Network Device Monitoring][1] documentation.

## 収集データ

### メトリクス

For details of monitored metrics see the [SNMP Data Collected][2] section.

## トラブルシューティング

Need help? Contact [Datadog support][3].

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitor SNMP with Datadog][4]



[1]: https://docs.datadoghq.com/network_performance_monitoring/devices/setup
[2]: https://docs.datadoghq.com/network_performance_monitoring/devices/data
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/

