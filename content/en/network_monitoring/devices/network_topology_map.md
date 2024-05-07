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

## Overview

The [Network Device Topology Map][2] provides an overview of your network's physical connections, so you can more easily identify issues in your devices and understand their upstream and downstream impacts.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_search.mp4" alt="The network device topology map, with vendor:cisco added to the search bar, and then the Filter nodes box filtered by nyc. A node is selected and the inspect option chosen, showing its connected nodes. One of the connected nodes is then selected, and the inspect option is selected again, displaying additional connected nodes" video="true" >}}

## Setup

The Datadog Agent version 7.46 and later automatically collects topology data. No additional installation is necessary.

### Prerequisites

1. Devices have LLDP (Link Layer Discovery Protocol) and/or CDP (Cisco Discovery Protocol) enabled with SNMP.
2. Datadog Agent version 7.46 or later is installed.
3. If you're using [device autodiscovery][3], enable `snmp_listener.collect_topology: true` in the `datadog.yaml` file.

## Navigation options

In the Network Topology Map, the following navigation options are available:

1. Under **View By**, select to visualize devices in groups according to tags: 

{{< img src="/network_device_monitoring/network_topology_map/network_view_by_hostname.png" alt="The navigation option, with view by devices and tags selected, highlighting view by hostname" style="width:80%;" >}}

2. Under **Color By"**, change how nodes on the Device Topology Map are colored based on **device state** or **ping state**:

{{< img src="/network_device_monitoring/network_topology_map/device_topology_color_by.png" alt="The navigation option, with view by color selected, highlighting view by device state" style="width:80%;" >}}

   The following are the definitions for each color state:
   <div style="width:80%; margin: 0 auto;">

   | Color    | Description               |
   |----------|---------------------------|
   | Green    | Reachable, ok states      |
   | Red      | Unreachable, down states  |
   | Grey     | States not configured for ping |
   | No border| Shadow devices            |

   </div>

3. Under **Filter Devices**, gain further granular control over what devices are shown on the Device Topology Map. 

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_devices_2.png" alt="The navigation option, with view filer option selected, toggling by hide unmonitored devices " style="width:80%;" >}}

**Note:** The filter devices setting impacts what devices are shown on the Device Topology Map for _all_ queries you may make, such as if you filter by a device facet in the search bar. 

Hide _number of_ Unmonitored Devices - Turned OFF by default.
: Toggling this on hides devices on the Device Topology Map that are not directly monitored by Network Device Monitoring, but still discovered by LLDP/CDP, and shown on the map from adjacent devices that are monitored by Network Device Monitoring.

Hide _number of_ Unconnected Devices - Turned ON by default.
: Toggling this on hides any devices that have no link connections. Devices can be unconnected for reasons such as improper configuration, or the device does not support [LLDP/CDP](#troubleshooting).

## Icon Legend 

SNMP devices are matched to a representative icon based on their device type in each device node. 


| Icon        | Details       |
|-------------|-------------|
|      | Access Point
|              |Firewall
|             |Router 
|     |Server 
|             |Switch 
|             |Device 


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
