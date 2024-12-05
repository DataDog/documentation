---
title: Getting Started
description: Get started with your network-connected devices, such as routers, switches, servers, and firewalls.
further_reading:
    - link: '/network_monitoring/devices/supported_devices'
      tag: 'doc'
      text: 'Supported NDM Devices'
    - link: 'network_monitoring/devices/data/'
      tag: 'Doc'
      text: 'NDM Data Collected'
    - link: 'https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/'
      tag: 'Blog'
      text: 'Monitor and diagnose network performance issues with SNMP Traps'
---

## Overview

Network Device Monitoring helps you gain insights into the health and performance of your on-prem routers, switches, and firewalls. Once the Datadog Agent is installed on a host that has access to the network, the Agent can autodiscover network devices and collect metrics right out of the box.

This guide explains how to configure Network Device Monitoring on your hosts, enrich device tags, view and set up device profiles, view your data in NetFlow Monitoring, and validate your data in the provided dashboards and in the Device Topology Map.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page.png" alt="The Network Device Monitoring landing page, showing graphs and interfaces." style="width:100%;" >}}

## How it works

The following diagram illustrates the data flow between Syslog, SNMP traps, and NetFlow information. The devices send the relevant information to the Datadog Agent over the ports as shown in the diagram (ports can be changed if needed by configuration in the Agent). For API based integrations, the Datadog Agent connects with the network device vendor software controllers or managers on-premise or in the cloud based on specific `https` API integrations instructions per vendor. The Datadog Agent, configured with NDM and deployed on-premises or in the cloud, consolidates all collected device and network data from your network and sends it to Datadog over HTTPS on port `443`. This provides unified, full-stack observability of metrics, logs, traces, monitors, and dashboards.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="NDM Diagram showing the flow for Syslog, trap and Netflow collection." style="width:90%;" >}}

## Next steps

Follow the instructions below to configure Datadog to monitor your network devices.

## Phase 1: Prerequisites

### Install the Agent

Navigate to the [Agent installation page][12], and install the [Datadog Agent][1] on your host (usually a server that is **not** the monitored device).</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="The Agent configuration page, highlighting the Ubuntu installation." style="width:100%;" >}}

## Phase 2: Setup

### Integration Configuration

To begin monitoring your network devices, enable the SNMP integration using one of the following methods:

[Individual devices][2]
: Configure SNMP monitoring on your individual devices.

[Autodiscovery][3]
: Configure SNMP monitoring using Autodiscovery.

[Ping][13]
: Additionally, SNMP supports enabling ping on your devices.

## Phase 3: Additional customizations (optional)

### SD-WAN monitoring

Alongside SNMP devices, you can monitor wireless and SD-WAN (Software-Defined Wide Area Network) environments for select vendors. Collect metrics from wireless access points, and monitor the health of SD-WAN tunnels and edge devices.

{{< img src="network_device_monitoring/getting_started/sd-wan-datadog-integration_no_numbers.png" alt="SD-WAN reference architecture" style="width:90%;" >}}

SD-WAN is a type of networking technology that uses software-defined networking (SDN) principles to manage and optimize the performance of wide area networks (WANs). It is mainly used to interconnect remote offices and data centers across different transports (MPLS, Broadband, 5G, and so on). SD-WAN benefits from automatic load balancing and failure detection across these transports. For more information on Datadog SD-WAN, see the [SD-WAN reference architecture][25].

Datadog supports the following vendors for SD-WAN network monitoring:

  - [Meraki SD-WAN][15] 
  - [Cisco SD-WAN][14] 

### Enrich network devices with tags 

Once NDM is configured on your devices, you can further enrich them by adding network device tags using the following methods:

[Datadog Agent][1]
: The Agent can collect device tags when configuring [individual devices][2] or with [Autodiscovery][3].

[Device profiles][16]
: Configure the Agent to collect and customize specific metrics and tags by creating device profiles directly in the app.

[ServiceNow integration][4]
: Dynamically enrich network devices monitored by Datadog Network Device Monitoring with data defined in ServiceNow's CMDB (Configuration Management Database).

[Network Device Monitoring API][5]
: Utilize the Network Device Monitoring API to programmatically add tags to your network devices.

### Customize metrics and tags

Customize metrics and tags on your devices by viewing the [Supported Devices][22] page to view out-of-the-box device profiles. If you would like to edit or add more metrics, the following options are available:

[Device profiles][23]
: Directly edit metrics and tags in the Datadog Agent `yaml` file with with device profiles.

[GUI based profile authoring][24]
: Take advantage of Datadog Network Monitoring's GUI based device onboarding experience where you can add custom metrics and tags to your devices.

### NetFlow Monitoring 

Configure [NetFlow Monitoring][21] to visualize and monitor your flow records from your NetFlow-enabled devices.

{{< img src="network_device_monitoring/netflow/home.png" alt="The NetFlow Monitoring page containing tabs for top sources, destinations, protocols, source ports, destination ports, and device trends" style="width:100%;" >}}

## Phase 4: Validate your data

- Start monitoring your entire network infrastructure on the [Network Devices][17] page.
- View metrics collected on Datadog's out-of-the-box dashboards:
  - [Overview of all devices monitored][8]
  - [Performance of interfaces on your network devices][18]
- Use the Network [Device Topology Map][19] to identify and troubleshoot issues with your devices.

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
[22]: /network_monitoring/devices/supported_devices
[23]: /network_monitoring/devices/profiles
[24]: /network_monitoring/devices/guide/device_profiles/
[25]: https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/
