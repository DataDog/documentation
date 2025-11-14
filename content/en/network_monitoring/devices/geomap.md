
---
title: Device GeoMap
code_lang: geomap
type: multi-code-lang
code_lang_weight: 1
aliases:
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

Maps in Network Device Monitoring provide two views of your network infrastructure:

- **[Device Topology Map][8]**: Visualizes physical network connections between devices, their interfaces, and relationships.
- **[Device GeoMap][9]**: Displays the geographic distribution of your network devices across locations.

## Device GeoMap

The [Device Geomap][1] provides a global visualization of network devices discovered through Network Device Monitoring (NDM). It plots devices on a geographical map based on their configured locations, allowing you to assess connectivity, reachability, and regional network health at a glance.
This view helps your network teams identify device outages, latency issues, or coverage gaps across distributed environments.

{{< img src="network_device_monitoring/geomap/device_geomap.png" alt="Network Device Geomap tab displaying the location of mapped devices." style="width:100%;" >}}


### Prerequisites

[Network Device Monitoring][2] installed on your devices.

## Navigation options



## Configuring locations

Tagging devices with geomap: value
Adding mappings (csv, or manually/individual)


## Troubleshooting

If you experience issues using the Device GeoMap, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][5].

### Device appears in multiple locations

When a device is tagged with multiple `geomap` tags, it displays at only one location on the map. However, when you click on any cluster containing that device, it appears in the side panel for all tagged locations. 

### CSV upload fails

If your CSV file fails to upload despite appearing correct, verify the following:

- No missing commas between fields
- No extra spaces or special characters
- Proper formatting according to the CSV template

Use the provided template to ensure proper formatting.

### Tagged device not appearing on map

If a device doesn't appear on the map after tagging:

1. Verify that the location tag has coordinates configured in the [Settings][3] page.
2. Allow a few minutes for tag updates to be reflected in the map, as indicated in the application.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/maps/geomap
[2]: /network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices/settings/geomap
[5]: /help
[8]: /network_monitoring/devices/topology
[9]: /network_monitoring/devices/geomap