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

<div class="alert alert-info">Beyond the integrations shown below, NDM includes built-in SNMP profiles for over 80 <a href="/network_monitoring/devices/supported_devices/">supported vendors</a>.</div>

## Software Defined Networking

The following integrations cover **software-defined and edge networking platforms** that support NDM collection. SD-WAN is a type of networking technology that uses software-defined networking (SDN) principles to manage and optimize the performance of wide area networks (WANs). They provide visibility into link health, throughput, and connectivity across distributed sites.

| Integration | Summary | Collection type | Setup guide |
|---|---|---|---|
| [Cisco ACI](/integrations/cisco-aci/) | Monitors Cisco Application Centric Infrastructure (ACI) fabric topology, endpoint group health, and tenant policy status through the APIC REST API. | Agent-based | [Setup guide](/integrations/cisco-aci/) |
| [Cisco SD-WAN](/integrations/cisco-sdwan/) | Collects device health, tunnel status, and WAN link performance metrics from Cisco Catalyst SD-WAN (vManage) through the vManage REST API. | Agent-based | [Setup guide](/integrations/cisco-sdwan/) |
| [VMware VeloCloud SD-WAN](/integrations/velocloud-sd-wan/) | Monitors SD-WAN edge device health, link quality, and application performance from the VMware VeloCloud Orchestrator API. | Agent-based | [Setup guide](/integrations/velocloud-sd-wan/) |
| [Fortinet FortiManager](/integrations/fortinet-fortimanager/) | Collects managed device inventory, policy deployment status, and system health metrics from Fortinet FortiManager through its JSON-RPC API. | Agent-based | [Setup guide](/integrations/fortinet-fortimanager/) |
| [Versa Networks](/integrations/versa/) | Monitors Versa SD-WAN appliances for device health, SLA performance, and application-aware routing metrics through the Versa Director API. | Agent-based | [Setup guide](/integrations/versa/) |
| [Cisco Meraki](/integrations/meraki/) | Collects network device status, client counts, and uplink performance from Cisco Meraki cloud-managed networks through the Meraki Dashboard API. | Crawler-based | [Setup guide](/integrations/meraki/) |

{{< partial name="ndm/sd-wan.html" >}}

<br>

## Wireless Networking

The following integrations cover **wireless networking platforms** that support NDM collection. These integrations provide visibility into wireless access points, client connections, and network performance across your wireless infrastructure.

{{< partial name="ndm/wireless.html" >}}

<br>

## Virtualization

NDM can also monitor **virtualized environments** that expose network telemetry through SNMP or API-based integrations. These integrations help you correlate host-level performance with physical network metrics.

| Integration | Summary | Collection type | Setup guide |
|---|---|---|---|
| [VMware vSphere](/integrations/vsphere/) | Monitors vSphere hosts, virtual machines, data stores, and clusters for resource utilization and network performance through the vCenter API. | Agent-based | [Setup guide](/integrations/vsphere/) |
| [OpenStack](/integrations/openstack/) | Collects hypervisor, VM, and virtual network metrics from OpenStack services including Nova, Neutron, and Cinder. | Agent-based | [Setup guide](/integrations/openstack/) |
| [Proxmox VE](/integrations/proxmox/) | Monitors Proxmox Virtual Environment nodes, VMs, and containers for resource usage and cluster health through the Proxmox REST API. | Agent-based | [Setup guide](/integrations/proxmox/) |

{{< partial name="ndm/virtualization.html" >}}

<br>

## Next steps

- Review the [supported NDM devices][1] list for a complete view of profiles available out of the box.
- Learn how to [add custom SNMP profiles][2] to extend NDM to devices not listed here.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/supported_devices
[2]: /network_monitoring/devices/profiles/