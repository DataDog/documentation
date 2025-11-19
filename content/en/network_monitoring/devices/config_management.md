---
title: Network Device Configuration Management
description: "View and compare device configuration changes in NDM."
further_reading:
  - link: "/network_monitoring/devices/troubleshooting"
    tag: "Documentation"
    text: "NDM Troubleshooting"
---

<div class="alert alert-info">Network Configuration Management is in Preview. Contact your Datadog representative to sign up.</div>

## Overview

Network Configuration Management (NCM) extends [Network Device Monitoring (NDM)][1] to include configuration awareness and change tracking. NCM allows you to:

- Monitor how device configurations change over time
- Compare two configuration versions side by side
- Use AI-generated summaries to understand changes and their potential impact during incidents

<!-- Placeholder image -->
{{< img src="/network_device_monitoring/config_mgmt/network_device_config.png" alt="Network Device Management configuration tab" style="width:100%;" >}}

**Note**: This feature is read-only in preview. You can inspect and compare configurations, but you cannot push, roll back, or otherwise modify them. 

## Prerequisites

- [Network Device Monitoring][3] must be configured on your devices.
- Datadog Agent version `7.74.0` and higher.

## Setup

Enable Network Configuration Management by configuring the following:

1. Create a configuration file at `network_config_management.d/conf.yaml` within the `conf.d` folder at the root of your Agent's configuration directory. 

   Example:

   ```yaml
   init_config:
     namespace: 'default'
   instances:
   - ip_address: "1.2.3.4"
     auth:
       username: "user"
       password: "pass"
   ```

   **Note**: Ensure the namespace matches the namespace used for device monitoring to enable proper correlation.

2. Restart the Agent to apply the configuration changes.

## Viewing configurations

Configuration Management is accessible from the device side panel in Network Device Monitoring:

1. Navigate to [Network Device Monitoring][3].
2. Select a device from the device list or from any NDM visualization such as [Device Geomap][4] or the [Device Topology][5] map.
3. Open the **Configuration** tab in the device side panel.

The configuration tab provides a timeline of configuration versions, a time picker for selecting the inspection window, and tools to view configurations at specific points in time, compare versions, and review AI-generated summaries.

### Time picker and retention

The time controls at the top of the page allow you to select which configuration history to view. By default, the view shows the last 2 days of configuration changes. You can extend this range to view older versions, up to the retention limit (1 year).

The timeline and configuration version list automatically update based on your selected time range.

**Note**: Configuration history begins only from when this feature was enabled for your account. Historical data prior to enablement is not available.

### View a configuration at a point in time

Selecting a configuration event from the timeline or list opens a single-configuration view showing the exact state of the device at that moment. This prevents confusion about comparing versions when you first access the page.

The single-configuration view displays:

- The complete configuration for the selected timestamp
- Device metadata including time and device identity

You can scroll through the configuration to investigate the device state during an incident, or adjust the time range to view configurations from different time periods.

### Compare configuration versions

To see what changed between configuration versions:

1. Select two configurations from the history list or timeline using the checkboxes.
2. Click **Compare** to open the comparison view.

The comparison view shows both configurations side by side with inline diffs that highlight changed lines. You can switch between different configuration pairs without closing the comparison view.

## AI summaries

Network Configuration Management includes an AI-powered summary panel that translates configuration changes into natural language explanations.

When you compare two configuration versions, the AI summary automatically:

- Describes changes in human-readable terms
- Categorizes changes by type (for example, security-related, routing-related)
- Highlights changes that may be relevant for incident investigation or risk analysis

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices
[4]: /network_monitoring/devices/geomap
[5]: /network_monitoring/devices/topology