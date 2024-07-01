---
"app_id": "snmp-f5"
"app_uuid": "07050d86-968b-49e2-970e-599f535eece2"
"assets":
  "dashboards":
    "F5-Networks": assets/dashboards/f5-networks.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10179"
    "source_type_name": F5 Networks
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
- "https://github.com/DataDog/integrations-core/blob/master/snmp_f5/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp_f5"
"integration_id": "snmp-f5"
"integration_title": "F5 Networks"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp_f5"
"public_title": "F5 Networks"
"short_description": "Collect SNMP metrics from your F5 network devices."
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
  "description": Collect SNMP metrics from your F5 network devices.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": F5 Networks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

F5 Networks is an application delivery networking and security company. Collect health and performance metrics of your F5 devices, including including the Big IP and LTM platforms.

## Setup

All metrics from F5 appliances are collected from SNMP. To start collecting metrics, install and configure the SNMP integration. See the [Network Device Monitoring][1] documentation for more details and configuration options.

## Vendor profiles

Specific supported vendor profiles for this integration can be found on the [network vendors][2] page.

## Data Collected

### Metrics

All possible metrics collected with SNMP can be found in the Network Device Monitoring documentation under [Data Collected][3]. All metrics collected from F5 appliances can be found under the [F5] namespace.

### Service Checks

There are no service checks included with the F5 integration.

### Events

No additional events are sent to Datadog from any component of the F5 platform.

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitoring Datacenters and Network Devices with Datadog][4]
* [SNMP Monitoring with Datadog][5]

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://docs.datadoghq.com/network_monitoring/devices/setup
[2]: https://docs.datadoghq.com/network_monitoring/devices/#vendor-profiles
[3]: https://docs.datadoghq.com/network_monitoring/devices/data
[4]: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
[5]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[6]: https://docs.datadoghq.com/help/

