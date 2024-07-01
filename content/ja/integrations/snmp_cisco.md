---
"app_id": "snmp-cisco"
"app_uuid": "91202d4a-1af4-4c64-88e4-5ba02b23c69f"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10136"
    "source_type_name": Cisco
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
- "https://github.com/DataDog/integrations-core/blob/master/snmp_cisco/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp_cisco"
"integration_id": "snmp-cisco"
"integration_title": "Cisco"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp_cisco"
"public_title": "Cisco"
"short_description": "Collect SNMP metrics from your Cisco network devices."
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
  "description": Collect SNMP metrics from your Cisco network devices.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cisco
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Cisco is the worldwide leader in IT, networking, and cybersecurity solutions. Install the integration to monitor all of your Cisco appliances, including routers, switches, voice gear, security appliances and more.

Collect SNMP metrics from Cisco appliances, including:

- Cisco Catalyst
- [Cisco Adaptive Security Appliance][1] (ASA)
- [Cisco Meraki][2] 
    **Note**: Additional events can be collected from Meraki through the [Meraki integration tile][3]
- Cisco Nexus
- Cisco ICM
- Cisco ISR
- [Cisco SD-WAN][4]
- Cisco UC Virtual Machines

**Note**: Additional supported vendor profiles for this integration can be found on the [network vendors][5] page.

## Setup

To install and configure the SNMP integration, see the [Network Device Monitoring][6] documentation.

## Data Collected

### Metrics

For details of monitored metrics see the [SNMP integration tile][7].

### Service Checks

Snmp Cisco does not include any service checks.

### Events

Snmp Cisco does not include any events.

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitor SNMP with Datadog][8]

## Troubleshooting

Need help? Contact [Datadog support][9].

[1]: https://docs.datadoghq.com/integrations/crest_data_systems_cisco_asa/
[2]: https://docs.datadoghq.com/integrations/meraki/
[3]: https://app.datadoghq.com/account/settings#integrations/meraki
[4]: https://docs.datadoghq.com/integrations/cisco_sdwan/
[5]: https://docs.datadoghq.com/network_monitoring/devices/#vendor-profiles
[6]: https://docs.datadoghq.com/network_performance_monitoring/devices/setup
[7]: https://app.datadoghq.com/account/settings#integrations/snmp
[8]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[9]: https://docs.datadoghq.com/help/

