---
"app_id": "snmp"
"app_uuid": "4fc8e176-17ce-4346-9544-bec30ac47a00"
"assets":
  "dashboards":
    "BGP & OSPF Overview": "assets/dashboards/bgp_ospf_overview.json"
    "Datacenter Overview": "assets/dashboards/datacenter_overview.json"
    "Datadog NDM Environment": "assets/dashboards/ndm_troubleshooting.json"
    "Interface Performance": "assets/dashboards/interface_performance.json"
    "Netflow Monitoring": "assets/dashboards/netflow_monitoring.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "snmp.devices_monitored"
      "metadata_path": "metadata.csv"
      "prefix": "snmp."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "78"
    "source_type_name": "SNMP"
  "monitors":
    "[SNMP] BGP peer state between {{snmp_device.name}} and neighbor {{neighbor.name}} is stuck in an unestablished state": "assets/monitors/bgp_peer_state_stuck.json"
    "[SNMP] CPU usage high for {{snmp_device.name}} in namespace {{device_namespace.name}}": "assets/monitors/high_cpu.json"
    "[SNMP] Device Down Alert": "assets/monitors/device_down.json"
    "[SNMP] Device Unreachable Alert": "assets/monitors/device_unreachable.json"
    ? "[SNMP] High interface bandwidth usage for incoming traffic for device {{snmp_device.name}} on interface {{interface.name}} in {{device_namespace.name}}"
    : "assets/monitors/high_interface_bandwidth_usage_in.json"
    ? "[SNMP] High interface bandwidth usage for outgoing traffic for device {{snmp_device.name}} on interface {{interface.name}} in {{device_namespace.name}}"
    : "assets/monitors/high_interface_bandwidth_usage_out.json"
    "[SNMP] High memory usage for device {{snmp_device.name}} in namespace {{device_namespace.name}}": "assets/monitors/high_memory.json"
    "[SNMP] Interface Down Alert": "assets/monitors/interface_down.json"
    "[SNMP] LinkDown Trap Alert": "assets/monitors/traps_linkDown.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "network"
- "notifications"
- "snmp"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/snmp/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp"
"integration_id": "snmp"
"integration_title": "SNMP"
"integration_version": "7.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp"
"public_title": "SNMP"
"short_description": "Collect SNMP metrics from your network devices."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Network"
  - "Category::Notifications"
  - "Category::SNMP"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Collect SNMP metrics from your network devices."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "SNMP"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Simple Network Management Protocol (SNMP) is a standard for monitoring network-connected devices, such as routers, switches, servers, and firewalls. This check collects SNMP metrics from your network devices.

SNMP uses sysObjectIDs (System Object Identifiers) to uniquely identify devices, and OIDs (Object Identifiers) to uniquely identify managed objects. OIDs follow a hierarchical tree pattern: under the root is ISO, which is numbered 1. The next level is ORG and numbered 3 and so on, with each level being separated by a `.`.

A MIB (Management Information Base) acts as a translator between OIDs and human readable names, and organizes a subset of the hierarchy. Because of the way the tree is structured, most SNMP values start with the same set of objects:

* `1.3.6.1.1`: (MIB-II) A standard that holds system information like uptime, interfaces, and network stack.
* `1.3.6.1.4.1`: A standard that holds vendor specific information.

## Setup

To install and configure the SNMP integration, see the [Network Device Monitoring][1] documentation.

## Further Reading

Additional helpful documentation, links, and articles:

* [Monitor SNMP with Datadog][2]
* [Introduction to SNMP][3]

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://docs.datadoghq.com/network_performance_monitoring/devices/setup
[2]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/introduction/
[4]: https://docs.datadoghq.com/help/

