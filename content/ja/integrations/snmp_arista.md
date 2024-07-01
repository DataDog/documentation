---
"app_id": "snmp-arista"
"app_uuid": "b5d6950a-7880-4b47-b9e9-49fe38e00490"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10328"
    "source_type_name": Arista
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- network
- notifications
- snmp
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/snmp_arista/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp_arista"
"integration_id": "snmp-arista"
"integration_title": "Arista"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp_arista"
"public_title": "Arista"
"short_description": "Collect SNMP metrics from your Arista network devices."
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
  "description": Collect SNMP metrics from your Arista network devices.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Arista
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Arista Networks is a computer networking company that designs and sells multilayer network switches.

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## Setup

To install and configure the SNMP integration, see the [Network Device Monitoring][2] documentation.

## Vendor profiles

Specific supported vendor profiles for this integration can be found on the [network vendors][3] page.

## Data Collected

### Metrics

For details of monitored metrics, see the [SNMP Data Collected][1] section.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitor SNMP with Datadog][5]



[1]: https://docs.datadoghq.com/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/network_performance_monitoring/devices/setup
[3]: https://docs.datadoghq.com/network_monitoring/devices/#vendor-profiles
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/

