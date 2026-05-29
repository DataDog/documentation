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

{{< callout btn_hidden="true" header="Preview">}}
The NDM Summary Page is in Preview.
{{< /callout >}}

## Overview

The Network Device Monitoring (NDM) **Summary Page** is a command center for network engineers. It surfaces device and interface health, active issues, and recent configuration changes in a single view. Use it to identify problems across your network at a glance and take action.

{{< img src="network_device_monitoring/summary/summary_page.png" alt="The NDM Summary Page, showing network health, top issues, interface and device performance, traffic, and recent changes." style="width:100%;" >}}

The **Network health**, **Interface health**, and **Device health** sections each report one of four health states:

| State | Meaning |
|-------|---------|
| Good | All sampled metrics are within healthy thresholds. |
| Degraded | Some metrics have crossed warning thresholds. |
| Poor | Critical thresholds have been crossed on multiple devices or interfaces. |
| Unknown | Not enough data is available to assess health. |

**Note**: [Network Device Monitoring][1] must be configured and collecting metrics from at least one SNMP-monitored device. For setup instructions, see [Setup][2].

## Page sections

Use the filter bar to scope the page by device tag (for example, `device_namespace`, `device_vendor`, `device_type`, or `geolocation`) and the time picker to set the lookback window. The default time range is **Past 1 Hour**.

{{< img src="network_device_monitoring/summary/filter_bar.png" alt="The Summary Page filter bar with dropdowns for namespace, device type, vendor, model, and geolocation, and a time picker." style="width:100%;" >}}

### Network health

The **Network health** section provides an at-a-glance assessment of your overall network status.

{{< img src="network_device_monitoring/summary/network_health.png" alt="The Network health section showing a Bits AI summary on the left and a topology view with health-coded nodes on the right." style="width:100%;" >}}

A Bits AI summary explains the current state of your network, highlighting affected devices, interfaces, and any recent configuration changes that may correlate with the observed behavior. Click **Chat with Bits Assistant** to ask follow-up questions.

Below the summary, a status panel shows the total device count broken down by status (OK, unreachable, degraded, offline, and unmonitored), active monitor alert and warning counts, and the number of active issues. Click **View Health** to open the [Device Health][5] view.

<!-- TODO: [5] is a placeholder path for the Device Health page, which does not yet have its own documentation. Update the link once the Device Health doc is published. -->

### Issues

The **Issues** list summarizes active alerts on network resources, grouped to reduce noise. Each issue card shows the affected devices, a description of what was detected, and the blast radius. Click an issue to open a side panel showing what happened, a proposed fix, and an option to investigate further with Bits AI.

{{< img src="network_device_monitoring/summary/issues-view.png" alt="The Device Health view showing the Open Issues list with a high-severity issue card for a network interface and its dependencies." style="width:100%;" >}}

### Interface health

The **Interface health** section ranks the top interfaces operating outside healthy thresholds. For each interface, the page reports error rate, discard rate, and inbound and outbound bandwidth utilization as a percentage of the configured interface speed. Click any interface to open the [device side panel](#device-side-panel).

{{< img src="network_device_monitoring/summary/interface-performance.png" alt="The Interface health section showing a Bits AI summary, a table of top interfaces with error, discard, and bandwidth columns, and aggregate health cards for bandwidth utilization, errors, and discards." style="width:100%;" >}}

**Interface health thresholds**

The following thresholds determine an interface's health state:

| Signal | Warn | Critical |
|--------|------|----------|
| Bandwidth In/Out | 80% | 90% |
| Errors In/Out | 0.10% | 5% |
| Discards In/Out | 0.10% | 5% |

A Bits AI summary highlights patterns across the affected interfaces, such as multiple interfaces saturating at the same site or correlated error spikes after a configuration change.

Three cards below the list surface aggregate health for the fleet: [Bandwidth utilization][6], [Errors][7], and [Discards][8]. Click a card to see the full list of affected interfaces with average, minimum, and maximum values. In the Errors and Discards detail views, click any interface to open a side panel with additional context and an **Ask Bits** button for AI-assisted investigation.

### Device health

The **Device health** section ranks the top devices operating outside healthy thresholds. For each device, the page reports CPU, memory, and fan health, along with any configuration changes recorded in the selected time range. Click any device to open the [device side panel](#device-side-panel).

{{< img src="network_device_monitoring/summary/device-perf.png" alt="The Device health section showing a Bits AI summary, a table of top devices with CPU and memory columns, and aggregate health cards at the bottom." style="width:100%;" >}}

By default, devices are sorted by **CPU**. Sort by **Memory** to surface devices under memory pressure instead.

**Device health thresholds**

The following thresholds determine a device's health state:

| Signal | Warn | Critical |
|--------|------|----------|
| CPU | 80% | 90% |
| Memory | 85% | 95% |

A Bits AI summary explains the current device health state and points to recent changes or anomalies that may have contributed. Two cards below the list surface aggregate health: [CPU][9] and [Memory][10]. Click a card to see the full list of affected devices with minimum, maximum, and past 24-hour trend data.

### Traffic

The **Traffic** section uses [NetFlow][3] data to visualize how traffic moves across your network as a Sankey diagram. The diagram shows traffic volume between sources and destinations within the current scope and time range. Click **View NetFlow** to explore flow data in detail.

### Changes

The **Changes** section lists recent network device configuration changes from [Configuration Management][4].

{{< img src="network_device_monitoring/summary/changes-detail.png" alt="The Changes view showing a table of recent network device configuration changes with device name, change summary, and timestamp columns." style="width:100%;" >}}

Click **[View all changes][11]** to open the full change history for your current scope and time range.

## Device side panel

Click any device or interface in the **Interface health** or **Device health** sections to open the device side panel. The panel provides a detailed overview of the selected device, including its active issues, triggered monitors, interface status, dependencies, metrics, configuration, and recent events.

{{< img src="network_device_monitoring/summary/device-side-panel.png" alt="The device side panel showing sections for device summary, interfaces with status and utilization, dependencies, and metrics." style="width:100%;" >}}

Click **Open Device Page** in the top-right corner to navigate to the full device page.

**Note**: Full device page documentation is in development.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup
[3]: /network_monitoring/netflow/
[4]: /network_monitoring/devices/config_management
[5]: /network_monitoring/devices/health
[6]: https://app.datadoghq.com/devices/summary/interface-bandwidth
[7]: https://app.datadoghq.com/devices/summary/interface-errors
[8]: https://app.datadoghq.com/devices/summary/interface-discards
[9]: https://app.datadoghq.com/devices/summary/device-cpu
[10]: https://app.datadoghq.com/devices/summary/device-memory
[11]: https://app.datadoghq.com/devices/summary/changes
