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

## Overview

The Network Device Monitoring (NDM) **Summary Page** is a command center for network engineers. It surfaces device and interface health, active issues, and recent configuration changes in a single view. Use it to identify problems across your network at a glance and take action.

{{< img src="network_device_monitoring/summary/summary_page.png" alt="The NDM Summary Page, showing network health, top issues, interface and device performance, traffic, and recent changes." style="width:100%;" >}}

## Prerequisites

[Network Device Monitoring][1] must be configured and collecting metrics from at least one SNMP-monitored device. For setup instructions, see [Setup][2].

## Filter and time range

Filter the page by device tag (for example, `device_namespace`, `device_vendor`, `device_type`, `device_model`, `geolocation`, or `subnet`) to narrow the view to a specific scope of your network.

Use the time picker to adjust the lookback window. The default is **Past 1 Hour**.

{{< img src="network_device_monitoring/summary/filter_bar.png" alt="The Summary Page filter bar with dropdowns for namespace, device type, vendor, model, and geolocation, and a time picker." style="width:100%;" >}}

## Network health

The **Network health** section provides an at-a-glance assessment of your overall network status.

{{< img src="network_device_monitoring/summary/network_health.png" alt="The Network health section showing a Bits AI summary card on the left and a topology view with health-coded nodes on the right." style="width:100%;" >}}

Each top-level section on the page reports one of four health states:

| State | Meaning |
|-------|---------|
| Good | All sampled metrics are within healthy thresholds. |
| Degraded | Some metrics have crossed warning thresholds. |
| Poor | Critical thresholds have been crossed on multiple devices or interfaces. |
| Unknown | Not enough data is available to assess health. |

A Bits AI summary card explains the current state of the network. It highlights affected devices, interfaces, and any recent configuration changes that may correlate with the observed behavior. Use this summary to understand what's happening before investigating individual sections.

The section also displays a network topology view with health-coded nodes and a row of counters for total devices, alerts, and monitors.

{{< img src="network_device_monitoring/summary/status_counters.png" alt="A row of status counters showing total devices, OK, Degraded, Unreachable, Offline, and Unmonitored counts, and monitor alert and warn counts." style="width:100%;" >}}

## Issues

The **Issues** list summarizes active alerts on network resources, grouped to reduce noise. Each issue card shows the affected devices and a short description of what was detected. Click an issue to investigate further.

{{< img src="network_device_monitoring/summary/issue_card.png" alt="A critical issue card for a network device, showing the affected device, a summary of the detected issue, the blast radius, and a Fix issue button." style="width:100%;" >}}

## Interface performance

The **Interface performance** section ranks the top 25 interfaces operating outside healthy thresholds. For each interface, the page reports error rate, discard rate, and inbound and outbound bandwidth utilization as a percentage of the configured interface speed.

{{< img src="network_device_monitoring/summary/interface_performance.png" alt="The Interface performance section, showing a Bits AI summary, a table of top interfaces, and aggregate health tiles for bandwidth utilization, errors, and discards." style="width:100%;" >}}

### Interface health thresholds

The following thresholds determine an interface's health state:

| Signal | Warn | Critical |
|--------|------|----------|
| Bandwidth In/Out | 80% | 90% |
| Errors In/Out | 0.10% | 5% |
| Discards In/Out | 0.10% | 5% |

A Bits AI summary card highlights patterns across the affected interfaces. Examples include multiple interfaces saturating at the same site or correlated error spikes after a configuration change.

## Device performance

The **Device performance** section ranks the top 25 devices operating outside healthy thresholds. For each device, the page reports CPU, memory, and fan health, along with any configuration changes recorded in the selected time range.

{{< img src="network_device_monitoring/summary/device_performance.png" alt="The Device performance section, showing a Bits AI summary, a table of top devices, and aggregate health tiles for CPU, memory, and fan." style="width:100%;" >}}

By default, devices are sorted by **CPU**. Sort by **Memory** to surface devices under memory pressure instead.

### Device health thresholds

The following thresholds determine a device's health state:

| Signal | Warn | Critical |
|--------|------|----------|
| CPU | 80% | 90% |
| Memory | 85% | 95% |

A Bits AI summary card explains the current device health state and points to recent changes or anomalies that may have contributed.

## Traffic

The **Traffic** section uses NetFlow data to surface the top applications generating traffic in your current scope. It also lists the top devices by volume (bytes sent or received).

{{< img src="network_device_monitoring/summary/traffic.png" alt="The Traffic section showing two columns, Top applications and Top devices by volume, each with bar graphs of usage." style="width:100%;" >}}

Click any row to investigate further in the [NetFlow][3] explorer.

## Changes

The **Changes** section lists recent network device configuration changes from [Configuration Management][4]. Click **View all changes** to see the full history.

{{< img src="network_device_monitoring/summary/changes.png" alt="The Changes section showing a table of recent network device configuration changes with device, summary, and time columns." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup
[3]: /network_monitoring/netflow/
[4]: /network_monitoring/devices/config_management
