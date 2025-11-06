---
title: Setup
description: Get started with your network-connected devices, such as routers, switches, servers, and firewalls.
aliases:
    - /network_monitoring/devices/getting_started/
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

Network Device Monitoring helps you gain insights into the health and performance of your on-prem routers, switches, and firewalls. After the Datadog Agent is installed on a host that has access to the network, the Agent can automatically detect network devices and collect metrics right out of the box.

This guide covers configuring Network Device Monitoring on your hosts, enriching device tags, setting up and viewing device profiles, viewing data in NetFlow Monitoring, and validating data in the provided dashboards and Device Topology Map.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page.png" alt="The Network Device Monitoring landing page, showing graphs and interfaces." style="width:100%;" >}}

## How it works

The following diagram illustrates the data flow between Syslog, SNMP traps, and NetFlow information. The devices send the relevant information to the Datadog Agent over the ports as shown in the diagram (ports can be changed if needed by configuration in the Agent). For API based integrations, the Datadog Agent connects with the network device vendor software controllers or managers on-premise or in the cloud based on specific `https` API integrations instructions per vendor. The Datadog Agent, configured with NDM and deployed on-premises or in the cloud, consolidates all collected device and network data from your network and sends it to Datadog over HTTPS on port `443`. This provides unified, full-stack observability of metrics, logs, traces, monitors, and dashboards.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="NDM Diagram showing the flow for Syslog, trap and Netflow collection." style="width:90%;" >}}

## Next steps

Follow the instructions below to configure Datadog to monitor your network devices.

## Prerequisites

### Install the Agent

Navigate to the [Agent installation page][1], and install the [Datadog Agent][2] on your host (usually a server that is **not** the monitored device).</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="The Agent configuration page, highlighting the Ubuntu installation." style="width:100%;" >}}

## Setup

### High Availability

{{< site-region region="gov" >}}
<div class="alert alert-danger"> High Availability support of the Datadog Agent is in not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

High Availability (HA) support of the Datadog Agent in Network Device Monitoring allows you to designate an active Agent and a standby Agent, ensuring automatic failover if the active Agent encounters an issue. This setup eliminates the Agent as a single point of failure, maintaining continuous monitoring during unexpected incidents or planned maintenance, such as OS updates and Agent upgrades.

You can configure active and standby Agents to function as an HA pair in NDM. If the active Agent goes down, the standby Agent takes over within 90 seconds, becoming the new active Agent. Additionally, you can designate a preferred active Agent, allowing NDM to automatically revert to it once it becomes available again. This feature allows for proactive Agent switching ahead of scheduled maintenance.

For more information, see [High Availability support of the Datadog Agent][20].

### Configuration

To begin monitoring your network devices, enable SNMP monitoring using one of the following methods:

[Individual devices][3]
: Configure SNMP monitoring on your individual devices.

[Autodiscovery][4]
: Configure SNMP monitoring using Autodiscovery.

[Ping][5]
: Configure the SNMP check to send ICMP pings to your devices.

[Syslog][22]
: Configure your devices to send Syslog messages.

[VPN Monitoring][21]
: Configure VPN monitoring to start monitoring your devices' VPN tunnels.

### Enrich network devices with tags

After NDM is configured on your devices, you can further enrich them by adding network device tags using the following methods:

[Datadog Agent][2]
: The Agent can collect device tags when configuring [individual devices][3] or with [Autodiscovery][4].

[Device profiles][6]
: Configure the Agent to collect and customize specific metrics and tags by creating device profiles directly in the app.

[ServiceNow integration][7]
: Dynamically enrich network devices monitored by Datadog Network Device Monitoring with data defined in ServiceNow's CMDB (Configuration Management Database).

[Network Device Monitoring API](#use-the-network-api)
: Utilize the Network Device Monitoring API to programmatically add tags to your network devices.

### Customize metrics and tags

Customize metrics and tags on your devices by viewing the [Supported Devices][9] page to view out-of-the-box device profiles. If you would like to edit or add more metrics, the following options are available:

[Device profiles][10]
: Directly edit metrics and tags in the Datadog Agent `yaml` file with device profiles.

[GUI based profile authoring][6]
: Take advantage of Datadog Network Monitoring's GUI based device onboarding experience where you can add custom metrics and tags to your devices.

### NetFlow Monitoring

Configure [NetFlow Monitoring][11] to visualize and monitor your flow records from your NetFlow-enabled devices.

{{< img src="network_device_monitoring/netflow/home.png" alt="The NetFlow Monitoring page containing tabs for top sources, destinations, protocols, source ports, destination ports, and device trends" style="width:100%;" >}}

## Validate your data

- Start monitoring your entire network infrastructure on the [Network Devices][12] page.
- View metrics collected on Datadog's out-of-the-box dashboards:
  - [Overview of all devices monitored][13]
  - [Performance of interfaces on your network devices][14]
- Use the Network [Device Topology Map][15] to identify and troubleshoot issues with your devices.

## Use the Network API

- Use the [Network API][8] to extract the following information about your network devices:
  * [Get the list of interfaces for your devices.][16]
  - [Get the list of tags for your devices.][17]
  - [Update the list of tags for your devices.][18]

## Troubleshooting

- See the Network Device [Troubleshooting][19] page for more information on troubleshooting your NDM issues.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /agent
[3]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[4]: /network_monitoring/devices/snmp_metrics/#autodiscovery
[5]: /network_monitoring/devices/ping
[6]: /network_monitoring/devices/guide/device_profiles/
[7]: https://docs.datadoghq.com/integrations/servicenow/#network-device-tagging
[8]: /api/latest/network-device-monitoring/
[9]: /network_monitoring/devices/supported_devices
[10]: /network_monitoring/devices/profiles
[11]: /network_monitoring/netflow/
[12]: https://app.datadoghq.com/devices
[13]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[14]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[15]: /network_monitoring/devices/device_topology_map
[16]: /api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[17]: /api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[18]: /api/latest/network-device-monitoring/#update-the-tags-for-a-device
[19]: /network_monitoring/devices/troubleshooting
[20]: /integrations/guide/high_availability
[21]: /network_monitoring/devices/vpn_monitoring
[22]: /network_monitoring/devices/syslog
