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

The [Network Device Topology Map][2] uses [Cloudcraft][7] diagrams to provide an interactive visual representation of your network's physical connections. The map automatically discovers and displays devices, their interfaces, and the relationships between them. This visualization helps you identify issues in your network devices, understand their upstream and downstream impacts, troubleshoot connectivity problems, and gain insights into how traffic flows through your infrastructure.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new.mp4" alt="A user adds team, service, and vendor tags to the network device topology map, then selects a device to open its side panel." video="true" >}}

## Setup

The Datadog Agent version 7.52 and later automatically collects topology data. No additional installation is necessary.

### Prerequisites

1. Devices have LLDP (Link Layer Discovery Protocol) and/or CDP (Cisco Discovery Protocol) enabled with SNMP. Use the same protocol on connected devices so that they can discover each other. LLDP is generally preferred as it is a more common option.
2. Datadog Agent version 7.52 or later is installed.

## Navigation options

In the Network Topology Map, the following navigation options are available:

### Group by

Under Group By, use **tags** such as `team`, `service`, and `vendor` to select how you want to visualize your devices:

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by.png" alt="A Group by control showing tags for team, service, and vendor." style="width:80%;" >}}

### Filter devices

Select the **+ Filter** dropdown to refine which devices are displayed on the Device Topology Map.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_2.png" alt="The Device Topology Map with the filter dropdown open." style="width:90%;" >}}

**Note:** The **Filter Devices** setting determines which devices appear on the Device Topology Map for all queries, including those that filter by a device facet in the search bar.

### Resources

Use the **Resource** dropdown to filter the diagram by specific device types, such as Firewalls, Access Points, and Routers.

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="The Device Topology Map with the Resources drop-down open, and Unmonitored Device un-checked." style="width:30%;" >}}

By default, the **Unmonitored Device** option is unchecked, which hides devices that are not directly monitored by Network Device Monitoring but are discovered through LLDP/CDP from adjacent monitored devices. Check this option to display these unmonitored devices on the diagram.

## Investigating devices

In addition to showing an overview of your network's physical connections, the Device Topology Map lets you investigate individual devices to understand their connections, flows, and overall status. Hover over a device to see its status and key metrics, or click a device to open a side panel with details such as its IP address, tags, throughput, CPU, and memory.

You can also view the device's connected interfaces in the **Interfaces** tab:

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_5.png" alt="The Network Device Topology Map with a device selected, displaying information about the device in the side panel." style="width:100%;" >}}

### View flow details

Click the **Flow** tab in the side panel to explore the device's traffic sources, destinations, and volume. The data is automatically filtered by the device's `@device.ip`. For more information, see [NetFlow Monitoring][1].

{{< img src="/network_device_monitoring/network_topology_map/Netflow_tab.png" alt="View of the Device side panel, with the NetFlow tab highlighted." style="width:100%;" >}}

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

## Troubleshooting

If you experience issues using the Network Topology Map, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][5].

### Empty map message

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="The no devices found message that is displayed when NDM is either not configured or because of filtering." style="width:80%;" >}}

There are no devices because NDM is not configured.

### No connections found / No connected devices to show

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="The no devices found message that is displayed when NDM is either not configured or because of filtering." style="width:80%;" >}}

- Turn the **Unmonitored Device** selection on to show the unmonitored devices.
- Use categorization tag to help understand your map view with information hierarchy.

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

If your device is exposing topology data with LLDP or CDP but some of the connections are missing, ensure that the **Unmonitored Device** selection is off.

### Unmonitored devices showing on map

The Device Topology Map shows all devices discovered with LLDP or CDP. These can be new devices that are not already monitored with SNMP or existing devices that were not [resolved](#device-resolution) to the equivalent monitored device.
You can use the **Unmonitored Device** selection to hide these nodes.

### Device duplicated on map

The Device Topology Map shows all devices discovered with LLDP and/or CDP. In some cases, these devices are already monitored with SNMP but can not be [resolved](#device-resolution) to the equivalent monitored device. In this case, the device is shown twice: one node representing the monitored device and one node representing the LLDP/CDP discovered device.
Use the **Unmonitored Device** selection to hide the unmonitored nodes.

### Borderless or black nodes on the map

The borderless or black nodes on the Device Topology Map can represent devices discovered with LLDP or CDP that are not configured to be monitored with NDM, or devices discovered with LLDP or CDP that can not be resolved to the equivalent [monitored device](#device-resolution).

## Device resolution

The Device Topology Map provides an overview of the devices monitored with NDM and their physical connections. The topology links data is based on LLDP (Link Layer Discovery Protocol) or CDP (Cisco Discovery Protocol) information collected with SNMP.
The connections discovered with LLDP or CDP can correspond to devices already monitored with SNMP. The device resolution consists in matching the discovered device to the monitored device.

### Device resolution failures

The device resolution can fail if the device is not monitored with NDM, or the LLDP or CDP data is insufficient to match the discovered device to the monitored device.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices/maps/topology 
[3]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /network_monitoring/devices/profiles/
[5]: /help
[6]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping
[7]: /datadog_cloudcraft/
