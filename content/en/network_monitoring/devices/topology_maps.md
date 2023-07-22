---
title: Network Topology Map
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

{{< callout url="#" btn_hidden="true" >}}
  The Network Topology Map is in public beta.
{{< /callout >}}

## Overview

The Network Topology map provides an overview of your network's physical connections, so you can more easily identify issues in your devices and understand their upstream and downstream impacts. 

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_overview.png" alt="The network topology map" style="width:80%;" >}}

## Setup

The Datadog Agent version 7.46 and later automatically collects topology data. No additional installation is necessary.

### Prerequisites

1. LLDP is enabled on the device with LLDP data exposed through SNMP.
2. Datadog Agent version 7.46 or later is installed.

## Investigating devices

In addition to providing an overview of your network's physical connections, you can investigate individual devices to understand their connections, flows, and overall status. Hovering over a device displays its overall status and 

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_hover.png" alt="The network topology map with the cursor hovering over a device" style="width:80%;" >}}

 Click on a device to see the options:

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_options.png" alt="The network topology map with a device selected, displaying the options to Inspect, View device details, and view flow details" style="width:80%;" >}}

### Inspect

Choose **Inspect** to see the device's interface connections. Click on any of the connected interfaces for further investigation.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect.png" alt="The Inspect view of an individual device, displaying the device's interface connections" style="width:80%;" >}}

### View device details

Choose **View device details** to see information such as the device's IP address and tags, as well as data related to throughput, CPU, and memory. 

{{< img src="/network_device_monitoring/network_topology_map/topology_map_device_details.png" alt="The View device details view of an individual device" style="width:80%;" >}}

From this view, you can also view the device's interfaces in the **Interfaces** tab.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_interfaces.png" alt="The View device details view of an individual device with the Interfaces tab selected" style="width:80%;" >}}

### View flow details

Choose **View flow details** to open the NetFlow tab filtered by the device's `@device.ip` for a detailed exploration of the device's sources, destinations, and volume. See the [NetFlow Monitoring][1] page for more information.

### Troubleshooting

If you don't see your device, verify that it's exposing LLDP data with the following command:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/devices/netflow/