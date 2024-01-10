---
title: Network Device Monitoring
kind: documentation
disable_sidebar: true
description: Gain visibility into your network-connected devices, such as routers, switches, servers, and firewalls.
aliases:
    - /network_performance_monitoring/devices/
further_reading:
    - link: 'https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/'
      tag: 'Knowledge Center'
      text: 'SNMP Monitoring Overview'
    - link: 'https://www.datadoghq.com/blog/monitor-snmp-with-datadog/'
      tag: 'Blog'
      text: 'Monitor SNMP with Datadog'
    - link: 'https://www.datadoghq.com/blog/monitor-meraki/'
      tag: 'Blog'
      text: 'Monitor Cisco Meraki with Datadog'
    - link: 'https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/'
      tag: 'Blog'
      text: 'Monitor datacenters and network devices with Datadog'
    - link: 'https://www.datadoghq.com/blog/network-device-monitoring/'
      tag: 'Blog'
      text: 'Introducing Network Device Monitoring'
    - link: 'https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/'
      tag: 'Blog'
      text: 'Monitor and diagnose network performance issues with SNMP Traps'
algolia:
  tags: ['network device monitoring']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Device Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Overview

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/673243317/rendition/1080p/file.mp4?loc=external&signature=cadf7020caa33b97a62ecb01216b83e5d04b35a4ca3a1b8b0a22323b9e79d0c3" poster="/images/poster/ndm.png" >}}

<br/>

Network Device Monitoring gives you visibility into your on-premise and virtual network devices, such as routers, switches, and firewalls. Automatically discover devices on any network, and quickly start collecting metrics like bandwidth utilization, volume of bytes sent, and determine whether devices are up/down.

## Getting started

1. Install the Datadog Agent (usually on a server that is not the monitored device).
2. Configure the SNMP integration by either [monitoring individual devices][1], or using [device autodiscovery][2].
3. Start monitoring your entire network infrastructure on the Network Devices explore page.
4. View metrics collected on Datadog's out-of-the-box dashboards:
    - [Overview of all devices monitored][3]
    - [Across the performance on all interfaces][4]
5. Catch issues before they arise with proactive monitoring on any [SNMP metric][5].

## Supported devices

### Generic profile

The generic profile collects metrics for all devices not supported by a vendor profile. Metrics include TCP, UDP, IP, and interface metrics such as bandwidth utilization, volume sent/received, etc.

### Vendor profiles

The following vendor devices are supported with dedicated profiles. If a vendor/device type is supported but the specific model isn't supported, refer to the [FAQ page][6].

-   Cisco Catalyst
-   Cisco ASA
-   Cisco CSR 1000v
-   Cisco ISR 4431
-   Cisco Nexus
-   Cisco ICM
-   Cisco UC Virtual Machines
-   Arista
-   Aruba
-   Checkpoint Firewall
-   Chatsworth PDU
-   APC UPS
-   F5 Big IP
-   Fortinet FortiGate
-   HP iLO
-   HP Proliant
-   Dell iDRAC
-   EMC Isilon
-   Juniper EX Series
-   Juniper MX Series
-   Juniper SRX
-   Meraki Cloud
-   Meraki On-Prem
-   NetApp
-   Palo Alto

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/snmp_metrics/#monitoring-individual-devices
[2]: /network_monitoring/devices/snmp_metrics/#autodiscovery
[3]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[4]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[5]: /monitors/types/metric/
[6]: /network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
