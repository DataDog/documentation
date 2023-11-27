---
title: Network Device Topology Map
kind: documentation
is_beta: true
further_reading:
- link: "/network_monitoring/devices/data"
  tag: "Documentation"
  text: "Data Collected with Network Device Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Device Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-warning">The Network Device Topology Map for Datadog Network Device Monitoring is in public beta.</div>

## Overview

The [Network Device Topology Map][2] provides an overview of your network's physical connections, so you can more easily identify issues in your devices and understand their upstream and downstream impacts.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_search.mp4" alt="The network device topology map, with vendor:cisco added to the search bar, and then the Filter nodes box filtered by nyc. A node is selected and the inspect option chosen, showing its connected nodes. One of the connected nodes is then selected, and the inspect option is selected again, displaying additional connected nodes" video="true" >}}

## Setup

The Datadog Agent version 7.46 and later automatically collects topology data. No additional installation is necessary.

### Prerequisites

1. Devices have LLDP (Link Layer Discovery Protocol) and/or CDP (Cisco Discovery Protocol) enabled with SNMP.
2. Datadog Agent version 7.46 or later is installed.
3. If you're using [device autodiscovery][3], enable `snmp_listener.collect_topology: true` in the `datadog.yaml` file.

## Investigating devices

In addition to providing an overview of your network's physical connections, you can investigate individual devices to understand their connections, flows, and overall status. Hovering over a device displays its overall status and key metrics. You can also click on a device to see the following options:

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_detail_menu.png" alt="The network device topology map with a device selected, displaying information about the device as well as the options to Inspect, View device details, and view flow details" style="width:80%;" >}}

### Inspect

Choose **Inspect** to see the device's interface connections. Click on any of the connected interfaces for further investigation.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view.png" alt="The Inspect view of an individual device, displaying the device's interface connections" style="width:80%;" >}}

### View device details

Choose **View device details** to see information such as the device's IP address and tags, as well as data related to throughput, CPU, and memory.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_details_tab.png" alt="The View device details tab of an individual device" style="width:80%;" >}}

From this view, you can also view the device's interfaces in the **Interfaces** tab.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_interfaces_tab.png" alt="The View device details tab of an individual device with the Interfaces tab selected" style="width:80%;" >}}

### View flow details

Choose **View flow details** to open the NetFlow tab filtered by the device's `@device.ip` for a detailed exploration of the device's sources, destinations, and volume. See the [NetFlow Monitoring][1] page for more information.

### Troubleshooting

If you don't see links or connections to your devices, verify that they are exposing LLDP and CDP data with the following commands:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/devices/netflow/
[2]: https://app.datadoghq.com/infrastructure/devices?viewTab=topology
[3]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
