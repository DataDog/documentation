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

The Network Device Monitoring (NDM) **Summary Page** is a command center for network engineers. It brings the health of your devices, interfaces, and recent changes into a single view. Use it to identify issues across your network at a glance and take action.

{{< img src="network_device_monitoring/summary/summary_page.png" alt="The NDM Summary Page, showing network health, top issues, interface and device performance, traffic, and recent changes." style="width:100%;" >}}

The Summary Page is available for SNMP-monitored devices.

## Prerequisites

[Network Device Monitoring][1] must be configured and collecting metrics from at least one SNMP-monitored device. For setup instructions, see [Setup][2].

## Filter and time range

The filter bar at the top of the page applies to all sections below it. Filter the page by device tag (for example, `device_namespace`, `device_vendor`, `device_type`, `device_model`, `geolocation`, or `subnet`) to narrow the view to a specific scope of your network.

Use the time picker to adjust the lookback window. The default is **Past 1 Hour**.

## Network health

The **Network health** section provides an at-a-glance assessment of your overall network status. Each section reports one of four health states:

| State | Meaning |
|-------|---------|
| Good | All sampled metrics are within healthy thresholds. |
| Degraded | Some metrics have crossed warning thresholds. |
| Poor | Critical thresholds have been crossed on multiple devices or interfaces. |
| Unknown | Not enough data is available to assess health. |

A Bits AI summary card explains the current state of the network. It highlights affected devices, interfaces, and any recent configuration changes that may correlate with the observed behavior. Use this summary to understand what's happening before investigating individual sections.

The section also includes a topology preview and a row of status metrics for total devices, alerts, and other counters.

## Issues

The **Issues** list summarizes active alerts on network resources, grouped to reduce noise. Each issue card shows the affected devices and a short description of what was detected. Click an issue to investigate further.

## Interface performance

The **Interface performance** section surfaces interfaces that are operating outside healthy thresholds. The table displays the top 25 interfaces (up to 100), sorted by the most severe metric, with the following columns:

- **Interface**: The interface name and the device it belongs to.
- **Error rate**: The percentage of packets received or transmitted with errors.
- **Discard rate**: The percentage of packets dropped on receive or transmit.
- **Bandwidth rate**: Inbound and outbound bandwidth utilization as a percentage of the configured interface speed.

Below the table, three tiles report aggregate health for **Bandwidth utilization**, **Errors**, and **Discards**.

### Interface health thresholds

| Signal | Warn | Critical |
|--------|------|----------|
| Bandwidth In/Out | 80% | 90% |
| Errors In/Out | 0.10% | 5% |
| Discards In/Out | 0.10% | 5% |

A Bits AI summary card highlights patterns across the affected interfaces. Examples include multiple interfaces saturating at the same site, or correlated error spikes after a configuration change.

## Device performance

The **Device performance** section surfaces devices that are operating outside healthy thresholds. The table displays the top 25 devices (up to 100), sorted by the most severe metric, with the following columns:

- **Device**: The device name and IP.
- **Max**: The maximum value over the selected time range.
- **Avg**: The average value over the selected time range.
- **Past 1hr**: A sparkline of recent values.
- **Changes**: Configuration changes recorded for the device in the selected time range.

By default, the table is sorted by CPU. Sort by Memory to surface devices with high memory pressure.

Below the table, tiles report aggregate health for **CPU**, **Memory**, and **Fan**.

### Device health thresholds

| Signal | Warn | Critical |
|--------|------|----------|
| CPU | 80% | 90% |
| Memory | 85% | 95% |

A Bits AI summary card explains the current device health state and points to recent changes or anomalies that may have contributed.

## Traffic

The **Traffic** section uses NetFlow data to show where your network traffic is going.

- **Top applications**: The applications generating the most traffic in your scope.
- **Top devices by volume**: The devices sending or receiving the most bytes in your scope.

Both views use a 1-hour lookback by default. Click any row to investigate further in the [NetFlow][3] explorer.

## Changes

The **Changes** section lists recent network device configuration changes from [Configuration Management][4]. The table shows the device, a summary of the change, and the time it was recorded.

Click **View all changes** to open the full configuration change history.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup
[3]: /network_monitoring/netflow/
[4]: /network_monitoring/devices/config_management
