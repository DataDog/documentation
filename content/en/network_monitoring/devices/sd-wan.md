---
title: SD-WAN 
description: Get started with your SD-WAN devices
further_reading:
    - link: '/network_monitoring/devices/supported_devices'
      tag: 'doc'
      text: 'Supported NDM Devices'
    - link: 'network_monitoring/devices/data/'
      tag: 'Doc'
      text: 'NDM Data Collected'
---

## SD-WAN monitoring

Alongside SNMP devices, you can monitor wireless and SD-WAN (Software-Defined Wide Area Network) environments for select vendors. Collect metrics from wireless access points, and monitor the health of SD-WAN tunnels and edge devices.

{{< img src="network_device_monitoring/getting_started/sd-wan-datadog-integration_no_numbers.png" alt="SD-WAN reference architecture" style="width:90%;" >}}

SD-WAN is a type of networking technology that uses software-defined networking (SDN) principles to manage and optimize the performance of wide area networks (WANs). It is mainly used to interconnect remote offices and data centers across different transports (MPLS, Broadband, 5G, and so on). SD-WAN benefits from automatic load balancing and failure detection across these transports. For more information on Datadog SD-WAN, see the [SD-WAN reference architecture][25].

Datadog supports the following vendors for SD-WAN network monitoring:

  - [Meraki SD-WAN][15] 
  - [Cisco SD-WAN][14] 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[14]: https://docs.datadoghq.com/integrations/cisco_sdwan/
[15]: https://docs.datadoghq.com/integrations/meraki/
[23]: /network_monitoring/devices/profiles
[24]: /network_monitoring/devices/guide/device_profiles/
[25]: https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/