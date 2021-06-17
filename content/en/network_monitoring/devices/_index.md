---
title: Network Device Monitoring
kind: documentation
disable_sidebar: true
description: Gain visibility into your network-connected devices, such as routers, switches, servers, and firewalls.
aliases:
    - /network_performance_monitoring/devices/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
- link: "https://www.datadoghq.com/blog/monitor-meraki/"
  tag: "Blog"
  text: "Monitor Cisco Meraki with Datadog"
- link: "https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/"
  tag: "Blog"
  text: "Monitor datacenters and network devices with Datadog"
---

## Overview

{{< img src="network_performance_monitoring/devices/datacenter_dashboard.jpg" alt="Datacenter Overview Dashboard" responsive="true" style="width:100%;">}}

Network Device Monitoring is designed to give you visibility into your on-premise and virtual network devices, such as routers, switches, and firewalls. Automatically discover devices on any network, and quickly start collecting metrics like bandwidth utilization, volume of bytes sent, and determine whether devices are up/down.

## Getting started

1. Install the Datadog Agent.
2. Configure the SNMP integration by either [monitoring individual devices][1], or using [device autodiscovery][2].
3. View metrics collected on Datadog's out of the box dashboards:
    - [Overview of all devices monitored][3]
    - [Across the performance on all interfaces][4]
4. Catch issues before they arise with proactive monitoring on any [SNMP metric][5].

## Supported devices

### Generic profile

The generic profile collects metrics for all devices not supported by a vendor profile. Metrics include TCP, UDP, IP, and interface metrics such as bandwidth utilization, volume sent/received, etc. 

### Vendor profiles

The following vendor devices are supported with dedicated profiles. If a vendor/device type is supported but the specific model isn’t supported, refer to the [FAQ page][6].

- Cisco Catalyst
- Cisco ASA
- Cisco CSR 1000v
- Cisco ISR 4431
- Cisco Nexus
- Cisco ICM
- Cisco UC Virtual Machines 
- Arista
- Aruba
- Checkpoint Firewall
- Chatsworth PDU
- APC UPS
- F5 Big IP
- Fortinet FortiGate 
- HP iLO
- HP Proliant
- Dell iDRAC
- EMC Isilon
- Juniper EX Series
- Juniper MX Series
- Juniper SRX
- Meraki Cloud
- Meraki On-Prem
- NetApp
- Palo Alto


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/setup/#monitoring-individual-devices
[2]: /network_monitoring/devices/setup/#autodiscovery
[3]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[4]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[5]: /monitors/monitor_types/metric/
[6]: /network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
