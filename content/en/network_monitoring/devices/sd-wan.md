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
    - link: "https://www.datadoghq.com/blog/monitor-software-defined-networks"
      tag: "Blog"
      text: "Monitor software-defined networks with Datadog"
    - link: "https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/"
      tag: "Architecture Center"
      text: "Network Observability: SD-WAN Reference Architecture"
---

## SD-WAN monitoring

Alongside SNMP devices, you can monitor wireless and software-defined wide area network (SD-WAN) environments for select vendors. Collect metrics from wireless access points, and monitor the health of SD-WAN tunnels and edge devices.

{{< img src="network_device_monitoring/getting_started/sd-wan-datadog-integration_no_numbers.png" alt="SD-WAN reference architecture" style="width:90%;" >}}

SD-WAN is a type of networking technology that uses software-defined networking (SDN) principles to manage and optimize the performance of wide area networks (WANs). It is often used to interconnect remote offices and data centers across different transports (MPLS, broadband, 5G, and so on). SD-WAN benefits from automatic load balancing and failure detection across these transports. For more information on Datadog's SD-WAN observability capabilities, see the [SD-WAN reference architecture][1].

## Supported vendors

Datadog supports the following vendors for SD-WAN network monitoring:

  - [Meraki SD-WAN][2] 
  - [Cisco SD-WAN][3] 
  - [VmWare VeloCloud][4] (In Preview)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/
[2]: https://docs.datadoghq.com/integrations/meraki/
[3]: https://docs.datadoghq.com/integrations/cisco_sdwan/
[4]: https://docs.datadoghq.com/integrations/velocloud_sd_wan/
