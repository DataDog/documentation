---
title: Device Topology Map
aliases:
- /network_monitoring/devices/network_topology_map
further_reading:
- link: "https://www.datadoghq.com/blog/visualize-network-device-topology/"
  tag: "Blog"
  text: "Visualize relationships across your on-premise network with the Device Topology Map"
- link: "/network_monitoring/devices/data"
  tag: "Documentation"
  text: "Data Collected with Network Device Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Overview

The [Network Device Topology Map][2] provides an overview of your network's physical connections, so you can more easily identify issues in your devices and understand their upstream and downstream impacts.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_search_3.mp4" alt="The network device topology map, with vendor:cisco added to the search bar, and then the Filter nodes box filtered by nyc. A node is selected and the inspect option chosen, showing its connected nodes. One of the connected nodes is then selected, and the inspect option is selected again, displaying additional connected nodes" video="true" >}}

## Setup

The Datadog Agent version 7.52 and later automatically collects topology data. No additional installation is necessary.

### Prerequisites

1. Devices have LLDP (Link Layer Discovery Protocol) and/or CDP (Cisco Discovery Protocol) enabled with SNMP. Use the same protocol on connected devices so that they can discover each other. LLDP is generally preferred as it is a more common option.
2. Datadog Agent version 7.52 or later is installed.

## Navigation options

In the Network Topology Map, the following navigation options are available:

### View

1. In **View By**, use tags to select how you want to visualize devices: 

{{< img src="/network_device_monitoring/network_topology_map/device-topology-grouped.png" alt="The navigation option, with view by devices and tags selected, highlighting view by location" style="width:80%;" >}}

### Color

2. Under **Color By**, change how nodes on the Device Topology Map are colored based on:

- **Device State**: Display nodes on the Device Topology Map by SNMP reachability.
- **Ping State**: Display nodes on the Device Topology Map by [Ping status][6]. 

{{< img src="/network_device_monitoring/network_topology_map/device-topology-overview-intro.png" alt="The navigation option, with view by color selected, highlighting view by device state" style="width:80%;" >}}

   The following are the definitions of the nodes for each color state:
   <div style="width:80%; margin: 0 auto;">

   | Color    | Description               |
   |----------|---------------------------|
   | Green   | Device is reachable.      |
   | Red   | Issue with device, such as unreachable through SNMP.  |
   | Gray    | Device is monitored by NDM; however, no data has been received. For example, if the ping wasn't configured and you opted to `color by` **Ping State** in the Device Topology Map, the devices are displayed in gray. |
   | No color | Shadow devices that are not directly monitored by NDM, but are discoverable through LLDP/CDP from a connected device that NDM is monitoring. You can toggle on/off the [Hide _N_ unmonitored device section](#filter-devices) if you want these devices to be shown on the Device Topology Map.         |

   </div>

### Filter devices

3. Under **Filter Devices**, gain further granular control over what devices are shown on the Device Topology Map. 

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_devices_hide.png" alt="The navigation option, with view filer option selected, toggling by hide unmonitored devices " style="width:80%;" >}}

**Note:** The **Filter Devices** setting impacts what devices are shown on the Device Topology Map for _all_ queries you might make. For example, if you filter by a device facet in the search bar. 

Hide _N_ Unmonitored Devices - Turned OFF by default.
: Toggling this on hides devices on the Device Topology Map that are not directly monitored by Network Device Monitoring, but still discovered by LLDP/CDP, and shown on the map from adjacent devices that are monitored by Network Device Monitoring.

Hide _N_ Unconnected Devices - Turned OFF by default.
: Toggling this on hides any devices that have no link connections. Devices can be unconnected for reasons such as improper configuration, or the device does not support [LLDP/CDP](#troubleshooting).

### Icon legend 

SNMP devices are matched to a representative icon based on their device type in each device node, as defined in their [device profiles][4]. 

<table>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <tr>
    <th>Icon</th>
    <th>Description</th>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="Access point icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Access Point</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="Firewall icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Firewall</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="Router icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Router</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="Server icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Server</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="Switch icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Switch</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Device icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Device</td>
  </tr>
</table>


## Investigating devices

In addition to providing an overview of your network's physical connections, you can investigate individual devices to understand their connections, flows, and overall status. Hovering over a device displays its overall status and key metrics. You can also click on a device to see the following options:

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_3.png" alt="The network device topology map with a device selected, displaying information about the device as well as the options to Inspect, View device details, and view flow details" style="width:80%;" >}}

### Inspect

Choose **Inspect** to see the device's interface connections. Click on any of the connected interfaces for further investigation.
This view shows only the physical interfaces that are actually connected to another device. This means that it shows a subset of the total set of interfaces of a network device.

{{< img src="/network_device_monitoring/network_topology_map/ndm_topology_interface_updated.png" alt="The Inspect view of an individual device, displaying the device's interface connections" style="width:80%;" >}}

### View device details

Choose **View device details** to see information such as the device's IP address and tags, as well as data related to throughput, CPU, and memory.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_device_details_2.png" alt="The View device details tab of an individual device" style="width:80%;" >}}

From this view, you can also view the device's connected interfaces in the **Connected Interfaces** tab.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_devices_interface_2.png" alt="The View device details tab of an individual device with the Interfaces tab selected" style="width:80%;" >}}

### View flow details

Choose **View flow details** to open the NetFlow tab filtered by the device's `@device.ip` for a detailed exploration of the device's sources, destinations, and volume. See the [NetFlow Monitoring][1] page for more information.

## Troubleshooting

If you experience issues using the Network Topology Map, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][5].

### Missing topology data message box

{{< img src="/network_device_monitoring/network_topology_map/missing_topology_map.png" alt="The missing topology data message that is displayed when the rendered map has no links" style="width:80%;" >}}

This message is displayed when the rendered map has no links.

**Note**: Since the "Hide _N_ Unconnected Devices" toggle is enabled by default, this message displays with an empty map. 

### Empty map message

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="The no devices found message that is displayed when NDM is either not configured or because of filtering." style="width:80%;" >}}

There are no devices because NDM is not configured.

### No connections found / No connected devices to show

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="The no devices found message that is displayed when NDM is either not configured or because of filtering." style="width:80%;" >}}

- Turn the "Hide _N_ Unconnected Devices" toggle off to show the isolated devices.
- Use categorization tag to help understand your map view with information hierarchy.

### Empty map/ no monitored devices

- Ensure the "Hide _N_ Unconnected Devices" toggle is off.

### Missing devices/connections

The Device Topology Map data is based on LLDP (Link Layer Discovery Protocol) and CDP (Cisco Discovery Protocol) information collected with SNMP. If your map is missing devices and/or connections, ensure the following:

- Datadog Agent version 7.52 or later is installed.
- Devices have LLDP and/or CDP enabled with SNMP.

Verify that your devices are exposing LLDP and CDP data with the following commands:

For LLDP data:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
For CDP data
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### Missing connections or links 

If your device is exposing topology data with LLDP or CDP but some of the connections are missing, ensure that the "Hide _N_ Unmonitored Devices" toggle is off.
If you are using tags to filter nodes on the map, ensure the "Show one hop away on filter" toggle is on to see the connected nodes.

### Un-monitored devices showing on map

The Device Topology Map shows all devices discovered with LLDP or CDP. These can be new devices that are not already monitored with SNMP or existing devices that were not [resolved](#device-resolution) to the equivalent monitored device.
You can use the "Hide _N_ Unmonitored Devices" toggle to hide these nodes.

### Device duplicated on map

The Device Topology Map shows all devices discovered with LLDP and/or CDP. In some cases, these devices are already monitored with SNMP but can not be [resolved](#device-resolution) to the equivalent monitored device. In this case, the device is shown twice: one node representing the monitored device and one node representing the LLDP/CDP discovered device.
Use the "Hide _N_ Unmonitored Devices" toggle to hide the unmonitored nodes.

### Borderless or black nodes on the map 

The borderless or black nodes on the Device Topology Map can represent devices discovered with LLDP or CDP that are not configured to be monitored with NDM, or devices discovered with LLDP or CDP that can not be resolved to the equivalent [monitored device](#device-resolution).

## Device resolution 

The Device Topology Map provides an overview of the devices monitored with NDM and their physical connections. The topology links data is based on LLDP (Link Layer Discovery Protocol) or CDP (Cisco Discovery Protocol) information collected with SNMP. 
The connections discovered with LLDP or CDP can correspond to devices already monitored with SNMP. The device resolution consists in matching the discovered device to the monitored device.

### Device resolution failures

The device resolution can fail if the device is not monitored with NDM, or the LLDP or CDP data is insufficient to match the discovered device to the monitored device.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/devices/netflow/
[2]: https://app.datadoghq.com/infrastructure/devices?viewTab=topology
[3]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /network_monitoring/devices/profiles/
[5]: /help
[6]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping
