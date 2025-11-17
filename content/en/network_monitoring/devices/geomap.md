
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

[Device Geomap][1] displays the geographic distribution of your network devices discovered through Network Device Monitoring (NDM). It plots devices on a geographical map based on their configured locations, allowing you to visualize site coverage, assess connectivity, and monitor regional network health. Use it to identify device outages, latency issues, or coverage gaps across distributed environments.

{{< img src="network_device_monitoring/geomap/device_geomap.png" alt="Network Device Geomap tab displaying the location of mapped devices." style="width:100%;" >}}

### Prerequisites

- [Network Device Monitoring][2] configured on your devices.

## Configuring locations

Devices appear on the Device GeoMap when tagged with `geomap:<value>` and mapped to geographic coordinates. Configure device locations using the following steps:

1. From the Device GeoMap page, click **Add locations →** in the top right corner. This opens the [GeoMap locations settings][3] page, which provides multiple tabs to manage device locations:

- **All**: Displays all devices with `geomap` tags, regardless of their mapping status.
- **Needs Coordinates**: Shows devices tagged with `geomap` values that don't have corresponding location coordinates configured.
- **On Map**: Lists tagged devices with configured coordinates that are displayed on the GeoMap.
- **Unused**: Shows location mappings (coordinates) that have been configured but are not associated with any tagged devices.

{{< img src="network_device_monitoring/geomap/settings_on_map.png" alt="Settings page of Device GeoMap, highlighting the All tab." style="width:100%;" >}}

2. On the settings page, click **+ Add mapping** and enter the location value along with its latitude and longitude coordinates in decimal format. To bulk import locations, select **Import from CSV** from the **+ Add mapping** dropdown and use the provided template.

{{< img src="network_device_monitoring/geomap/add_mapping.png" alt="Network Device Geomap tab displaying the location of mapped devices." style="width:100%;" >}}

3. Tag devices using the `geomap:<value>` format, where `<value>` is the location identifier. See the [network device tagging][4] documentation for more information.

{{< img src="network_device_monitoring/geomap/device_side_panel.png" alt="Network Device side panel of a device, highlighting the `geomap:nyc-test` tag." style="width:100%;" >}}

## Viewing devices

After devices are added to the map, you can zoom in to click on individual device or select a device cluster to view all devices in that location. Clicking on any device opens a side panel with detailed device information, including status, tags, and key metrics.

{{< img src="network_device_monitoring/geomap/geomap_device_cluster.mp4" alt="A user zooming in on the map, clicking on a devive cluster, and opening the side panel of a device that is unreachable. " video=true >}}

## Troubleshooting

If you experience issues using Device GeoMap, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][5].

### Device appears in multiple locations

When a device is tagged with multiple `geomap` tags, it displays at only one location on the map. However, when you click on any device cluster containing that device, it appears in the side panel for all tagged locations. 

### CSV upload fails

If your CSV file fails to upload despite appearing correct, verify the following:

- No missing commas between fields
- No extra spaces or special characters
- Proper formatting according to the CSV template

Use the provided template to ensure proper formatting.

### Tagged device not appearing on map

If a device doesn't appear on the map after tagging:

1. Verify that the location tag has coordinates configured on the [Settings][3] page.
2. Allow a few minutes for tag updates to be reflected in the map, as indicated in the application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/maps/geomap
[2]: /network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices/settings/geomap
[4]: /network_monitoring/devices/setup#enrich-network-devices-with-tags
[5]: /help
[8]: /network_monitoring/devices/topology
[9]: /network_monitoring/devices/geomap