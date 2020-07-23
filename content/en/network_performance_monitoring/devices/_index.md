---
title: Network Device Monitoring
kind: documentation
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
- link: "https://www.datadoghq.com/blog/monitor-meraki/"
  tag: "Blog"
  text: "Monitor Cisco Meraki with Datadog"
---

## Overview

Datadog Network Device Monitoring is designed to give you visibility into your network-connected devices, such as routers, switches, servers, and firewalls with Simple Network Management Protocol (SNMP).

{{< img src="network_performance_monitoring/devices/snmp_dashboard.png" alt="SNMP Generic Dashboard" responsive="true" style="width:100%;">}}

SNMP uses sysOIDs (System Object Identifiers) to uniquely identify devices, and OIDs (Object Identifiers) to uniquely identify managed objects. OIDs follow a hierarchical tree pattern: under the root is ISO, which is numbered 1. The next level is ORG and numbered 3 and so on, with each level being separated by a `.`.

A MIB (Management Information Base) acts as a translator between OIDs and human readable names, and organizes a subset of the hierarchy. Because of the way the tree is structured, most SNMP values start with the same set of objects:

* `1.3.6.1.1`: (MIB-II) A standard that holds system information like uptime, interfaces, and network stack.
* `1.3.6.1.4.1`: A standard that holds vendor specific information.

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="network_performance_monitoring/devices/setup" >}}<u>Setup</u>: Configure the Agent to collect network device data.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/devices/data" >}}<u>Data Collected</u>: View the metrics, events, and service checks collected.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
