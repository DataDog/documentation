---
title: Summary Page
further_reading:
- link: "/network_monitoring/devices/"
  tag: "Documentation"
  text: "Network Device Monitoring"
- link: "/network_monitoring/devices/topology"
  tag: "Documentation"
  text: "Device Maps"
- link: "/network_monitoring/devices/config_management"
  tag: "Documentation"
  text: "Configuration Management"
---

{{< callout btn_hidden="true" header="Join the Preview!">}}
The NDM Summary Page is in Preview.
{{< /callout >}}

## Overview

The Network Device Monitoring (NDM) **Summary Page** is a command center for network engineers. It surfaces device and interface health, active issues, and recent configuration changes in a single view. Use it to identify problems across your network at a glance.

**Note**: To use the Summary Page, [Network Device Monitoring][1] must be configured and collecting metrics from at least one SNMP-monitored device. For setup instructions, see [Setup][2].

{{< img src="network_device_monitoring/summary/summary_page.png" alt="The NDM Summary Page, showing network health, top issues, interface and device health, traffic, and recent changes." style="width:100%;" >}}

## Using the Summary Page

The Summary Page is organized into sections that each cover a different aspect of your network's state and activity. Three of those sections — **Network health**, **Interface health**, and **Device health** — also report a health state to summarize what they're tracking:

| State | Meaning |
|-------|---------|
| Good | All sampled metrics are within healthy thresholds. |
| Degraded | Some metrics have crossed warning thresholds. |
| Poor | Critical thresholds have been crossed on multiple devices or interfaces. |
| Unknown | Not enough data is available to assess health. |

To customize your view, use the filter bar to scope the page by device tag (for example, `device_namespace`, `device_vendor`, `device_type`, or `geolocation`) and the time picker to set the lookback window. The default time range is **Past 1 Hour**.

{{< img src="network_device_monitoring/summary/filter_bar.png" alt="The Summary Page filter bar with dropdowns for namespace, device type, vendor, model, and geolocation, and a time picker." style="width:100%;" >}}

### Network health

The **Network health** section summarizes your overall network state.

{{< img src="network_device_monitoring/summary/network_health.png" alt="The Network health section showing a Bits AI summary on the left and a topology view with health-coded nodes on the right." style="width:100%;" >}}

A Bits AI summary explains the current state of your network, highlighting affected devices, interfaces, and any recent configuration changes that may correlate with the observed behavior. Click **Chat with Bits Assistant** to ask follow-up questions.

Below the summary, a status panel shows the total device count broken down by status, the number of active monitor alerts and warnings, and the number of active issues. Click **View Health** to open the [Device Health][5] view.

### Issues

The **Issues** list summarizes active alerts on network resources, grouped to reduce noise. Each issue card shows the affected devices, a description of what was detected, and the blast radius. Click an issue to open a side panel with a summary of what happened, the affected metric, a proposed fix, and an option to launch a Bits AI SRE investigation. For details, see [Device Health][5].

{{< img src="network_device_monitoring/summary/issues-view.png" alt="The Device Health view showing the Open Issues list with a high-severity issue card for a network interface and its dependencies." style="width:100%;" >}}

### Interface health

The **Interface health** section ranks the top interfaces operating outside healthy thresholds. For each interface, the page reports error rate, discard rate, and inbound and outbound bandwidth utilization as a percentage of the configured interface speed.

{{< img src="network_device_monitoring/summary/interface-performance.png" alt="The Interface health section showing a Bits AI summary, a table of top interfaces with error, discard, and bandwidth columns, and aggregate health cards for bandwidth utilization, errors, and discards." style="width:100%;" >}}

A Bits AI summary highlights patterns across the affected interfaces, such as multiple interfaces saturating at the same site or correlated error spikes after a configuration change.

Three cards below the list show aggregate health for the fleet: [Bandwidth utilization][6], [Errors][7], and [Discards][8]. Click a card to see the full list of affected interfaces with average, minimum, and maximum values. The Errors and Discards detail views also include an **Ask Bits** button for AI-assisted investigation.

Click any interface to open the device side panel, which includes details such as interface status, metrics, configuration, and recent events. From the side panel, click **Open Device Page** in the top-right corner to open the device page, where you can investigate the device in more depth.

**Interface health thresholds**

The following thresholds determine an interface's health state:

| Signal | Warn | Critical |
|--------|------|----------|
| Bandwidth In/Out | 80% | 90% |
| Errors In/Out | 0.10% | 5% |
| Discards In/Out | 0.10% | 5% |

### Device health

The **Device health** section ranks the top devices operating outside healthy thresholds. For each device, the page reports CPU, memory, and fan health, along with any configuration changes recorded in the selected time range. Click any device to open the same device side panel described in [Interface health](#interface-health).

{{< img src="network_device_monitoring/summary/device-perf.png" alt="The Device health section showing a Bits AI summary, a table of top devices with CPU and memory columns, and aggregate health cards at the bottom." style="width:100%;" >}}

By default, devices are sorted by **CPU**. Sort by **Memory** to surface devices under memory pressure.

A Bits AI summary explains the current device health state and points to recent changes or anomalies that may have contributed.

Two cards below the list show aggregate health: [CPU][9] and [Memory][10]. Click a card to see the full list of affected devices with minimum, maximum, and past 24-hour trend data.

**Device health thresholds**

The following thresholds determine a device's health state:

| Signal | Warn | Critical |
|--------|------|----------|
| CPU | 80% | 90% |
| Memory | 85% | 95% |

### Traffic

The **Traffic** section uses [NetFlow][3] data to visualize traffic volume between sources and destinations as a Sankey diagram, scoped to your current filter and time range. Click **View NetFlow** to explore flow data in detail.

### Changes

The **Changes** section lists recent network device configuration changes from [Configuration Management][4]. Each entry shows the affected device, a summary of what changed, and a timestamp.

Click **[View all changes][11]** to open the full Changes view. The view inherits any filter or time range set on the Summary Page, and includes filters for namespace, type, vendor, model, and geolocation. Filters set in the full view persist when you return to the Summary Page. Click any row to open the device side panel with details about the change.

{{< img src="network_device_monitoring/summary/changes-detail.png" alt="The full Changes view with filter dropdowns at the top and a table of recent network device configuration changes with device name, change summary, and timestamp columns." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup
[3]: /network_monitoring/netflow/
[4]: /network_monitoring/devices/config_management
[5]: /network_monitoring/devices/device_health
[6]: https://app.datadoghq.com/devices/summary/interface-bandwidth
[7]: https://app.datadoghq.com/devices/summary/interface-errors
[8]: https://app.datadoghq.com/devices/summary/interface-discards
[9]: https://app.datadoghq.com/devices/summary/device-cpu
[10]: https://app.datadoghq.com/devices/summary/device-memory
[11]: https://app.datadoghq.com/devices/summary/changes
