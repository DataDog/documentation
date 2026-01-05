---
title: NDM Supported Integrations
description: Learn which integrations are supported by Network Device Monitoring (NDM)
further_reading:
    - link: '/network_monitoring/devices/data'
      tag: 'doc'
      text: 'SNMP Metrics Reference'
    - link: 'https://www.datadoghq.com/blog/monitor-meraki/'
      tag: 'Blog'
      text: 'Monitor Cisco Meraki with Datadog'
    - link: 'https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/'
      tag: 'Architecture Center'
      text: 'SD-WAN Reference Architecture'
aliases:
    - /network_monitoring/devices/sd-wan
---

## Overview

Network Device Monitoring (NDM) supports a growing set of integrations for routers, switches, firewalls, SD-WAN platforms, and virtual infrastructure. Use the integration icons below to explore which integrations include built-in SNMP profiles or metadata that can be collected through NDM.

## SNMP

These integrations use the **SNMP protocol** to collect metrics directly from network hardware such as routers, switches, and firewalls. NDM automatically applies the appropriate SNMP profile when it detects one of these devices. Beyond the integrations shown below, NDM includes built-in SNMP profiles for over 80 [supported vendors][3].

{{< partial name="ndm/ndm_integrations.html" >}}

<br>

## Software Defined Networking

The following integrations cover **software-defined and edge networking platforms** that support NDM collection. SD-WAN is a type of networking technology that uses software-defined networking (SDN) principles to manage and optimize the performance of wide area networks (WANs). They provide visibility into link health, throughput, and connectivity across distributed sites.

{{< partial name="ndm/sd-wan.html" >}}

<br>

## Virtualization

NDM can also monitor **virtualized environments** that expose network telemetry through SNMP or API-based integrations. These integrations help you correlate host-level performance with physical network metrics.

{{< partial name="ndm/virtualization.html" >}}

<br>

## Next steps

- Review the [supported NDM devices][1] list for a complete view of profiles available out of the box.
- Learn how to [add custom SNMP profiles][2] to extend NDM to devices not listed here.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/supported_devices
[2]: /network_monitoring/devices/profiles/
[3]: /network_monitoring/devices/supported_devices/