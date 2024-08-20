---
title: Getting Started with NDM
description: Get started with your network-connected devices, such as routers, switches, servers, and firewalls.
further_reading:
    - link: 'https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/'
      tag: 'Blog'
      text: 'Monitor datacenters and network devices with Datadog'
    - link: 'https://www.datadoghq.com/blog/network-device-monitoring/'
      tag: 'Blog'
      text: 'Introducing Network Device Monitoring'
    - link: 'https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/'
      tag: 'Blog'
      text: 'Monitor and diagnose network performance issues with SNMP Traps'
---

# Overview

Network Device Monitoring helps you gain insights into the health and performance of your on-prem routers, switches, and firewalls. Once the Datadog Agent is installed on a host that has access to the network, the Agent can autodiscover network devices and collect metrics right out of the box.

This guide explains how to configure Network Device Monitoring on your hosts, enrich device tags, view and set up device profiles, view your data in NetFlow Monitoring, and validate your data in the provided dashboards and Device Topology Map.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page.png" alt="The Network Device Monitoring landing page, showing graphs and interfaces." style="width:100%;" >}}

## Prerequisites

### Install the Agent

Navigate to the [Agent installation page][12], and install the [Datadog Agent][1] on your host (usually a server that is **not** the monitored device).

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="The Agent configuration page, highlighting the Ubuntu installation." style="width:100%;" >}}

## Setup

### Integration Configuration

To begin monitoring your network devices, you need to enable the SNMP integration using one of the following methods:

- Configure SNMP monitoring for [individual devices.][2]
- Configure SNMP monitoring using device [Autodiscovery.][3]
- Additionally, SNMP supports enabling [Ping][13] on your devices.

## Additional integrations 

### SD-WAN

Additional SD-WAN (Software-Defined Wide Area Network) integrations for select vendors can be configured to allow monitoring of these devices. SD-WAN is a type of networking technology that uses software-defined networking (SDN) principles to manage and optimize the performance of wide area networks (WANs). It is mainly used to interconnect remote offices and data centers across different transports (MPLS, Broadband, 5G, and so on). SD-WAN benefits from automatic load balancing and failure detection across these transports. 

Datadog supports the following vendors for SD-WAN network monitoring:

- [Meraki SD-WAN][15] (public beta)
- [Cisco SD-WAN][14] (public beta)


## Enrich network devices with tags 

Once NDM is configured on your devices, you can further enrich them by adding network device tags using the following methods:

- The Agent side can collect device tags when configuring [individual devices][2] or with [Autodiscovery][3].
- Configure the Agent to collect and customize specific metrics and tags by creating [Device profiles][16] directly in the app.
- Add additional network device tags with the [Service Now integration.][4] 
- Utilize the [Network Device Monitoring API][5] to programmatically add tags to network your devices.


## NetFlow Monitoring 

Configure [NetFlow Monitoring][21] to visualize and monitor your flow records from your NetFlow-enabled devices.

## Validate your data

- Start monitoring your entire network infrastructure on the [Network Devices][17] page.
-  View metrics collected on Datadog's out-of-the-box dashboards:
    - [Overview of all devices monitored][8]
    - [Across the performance on all interfaces][18]
- Use the Network [Device Topology Map][19] to identify and troubleshoot issues in your devices.


## Troubleshooting

- See the Network Device [Troubleshooting][20] page for more information on troubleshooting your NDM issues.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[3]: /network_monitoring/devices/snmp_metrics/#autodiscovery
[4]: https://docs.datadoghq.com/integrations/servicenow/#network-device-tagging
[5]: /api/latest/network-device-monitoring/
[6]: https://docs.datadoghq.com/api/latest/network-device-monitoring/
[7]: https://app.datadoghq.com/devices
[8]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[9]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[10]: /monitors/types/metric/?tab=threshold
[11]: /network_monitoring/devices/guide/device_profiles
[12]: https://app.datadoghq.com/account/settings/agent/latest
[13]: /network_monitoring/devices/snmp_metrics?tab=snmpv2#ping
[14]: https://docs.datadoghq.com/integrations/cisco_sdwan/
[15]: https://docs.datadoghq.com/integrations/meraki/
[16]: /network_monitoring/devices/guide/device_profiles/
[17]: https://app.datadoghq.com/devices
[18]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[19]: /network_monitoring/devices/device_topology_map
[20]: /network_monitoring/devices/troubleshooting
[21]: /network_monitoring/netflow/