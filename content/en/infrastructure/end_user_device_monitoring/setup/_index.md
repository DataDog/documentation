---
title: Set up End User Device Monitoring
description: Set up End User Device Monitoring to collect performance and connectivity data from employee desktops and laptops.
private: true
further_reading:
   - link: "/infrastructure/end_user_device_monitoring/"
     tag: "Documentation"
     text: "End User Device Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

## Overview

Managing employee devices at scale is difficult when performance issues, connectivity problems, and crashes are hard to detect before they affect users. End User Device Monitoring gives IT teams visibility into the health and performance of employee desktops and laptops, both physical and virtual, from a single location in Datadog. This page covers how End User Device Monitoring works and its key capabilities.

<div class="alert alert-danger">You must receive confirmation of Preview access before data appears in Datadog. After submitting your request, wait for an access confirmation before completing the setup steps below.</div>

## Supported platforms

- Windows 10 and later
- macOS
- Linux

## Set up the Datadog Agent

Confirm that you have received access to the Preview before continuing. If you have not received confirmation, [request access][12] and wait for approval.

<div class="alert alert-danger">The <code>infrastructure_mode: end_user_device</code> setting is required. Without it, devices are billed as hosts and do not appear in the End User Devices view.</div>

Follow the setup instructions for your platform:

- [macOS][14]
- [Windows][15]
- [Linux][16]

## Explore the App

### Overview

The Overview section displays device health status, device type distribution, and OS breakdown. This helps you efficiently identify unhealthy devices, track fleet composition, and understand overall system health at a glance.

### Device-level details

View detailed health and usage information for individual devices.

Select a device to access device-specific metrics and status information. Use this view to investigate anomalies, monitor usage trends, and troubleshoot issues more efficiently.

For a complete list of features, see [Key Capabilities][11].

## Enable related features and integrations

To collect additional data from monitored devices, enable one or more of the following features or integrations:

- [Live Processes][5]
- [Logs][6]
- [Network Path][7]
- [WiFi/WLAN integration][8]
- [Windows Crash Detection integration][9]
- [Windows Event Log][13]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[5]: /infrastructure/process/
[6]: /logs/
[7]: /network_monitoring/network_path/setup
[8]: /integrations/wlan/
[9]: /integrations/wincrashdetect/
[11]: /infrastructure/end_user_device_monitoring/#key-capabilities
[12]: https://www.datadoghq.com/product-preview/end-user-device-monitoring/
[13]: /integrations/event-viewer/?tab=logs
[14]: /infrastructure/end_user_device_monitoring/setup/macos/
[15]: /infrastructure/end_user_device_monitoring/setup/windows/
[16]: /infrastructure/end_user_device_monitoring/setup/linux/
