---
title: Monitors
description: "Use the Monitors overlay in Cloudcraft to view monitor states for your resources and services, and investigate alerting monitors with Bits Investigation."
site_support_id: cloudcraft_monitors_overlay
further_reading:
- link: "/bits_ai/bits_investigation/"
  tag: "Documentation"
  text: "Bits Investigation"
---

{{< callout btn_hidden="true" header="" >}}
The Monitors overlay is in Preview.
{{< /callout >}}

## Overview

The Monitors overlay shows monitors associated with your cloud resources and services, along with their current state (`Alert`, `Warn`, or `OK`). Use this overlay to identify and investigate production issues directly in your infrastructure diagram.

## View monitor status

Each resource or service with associated monitors displays an icon showing:

- The count of monitors in the highest state (`Alert` takes priority over `Warn`, which takes priority over `OK`)
- The title of the highest-priority monitor

When only one monitor is in the highest state, the diagram displays the monitor icon instead of a count.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_diagram_2.png" alt="Cloudcraft diagram with the Monitors overlay showing monitor icons and counts on resources" style="width:100%;" >}}

## Filter monitors

Use the legend at the bottom of the diagram to filter monitors by alerting status and monitor priority.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_legend_2.png" alt="Monitors overlay legend in Cloudcraft with filter options for alerting status and monitor priority." style="width:50%;" >}}

## Investigate monitors

### Mini panel

Click a resource or service with monitors to open a mini panel with its health status and service information. Click {{< ui >}}Investigate with Bits{{< /ui >}} to initiate a [Bits Investigation][1] investigation or view an existing one.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_mini_panel.png" alt="Cloudcraft Monitors overlay mini panel showing the health status and service information for a service, with the Investigate with Bits and View Full Details buttons." style="width:80%;" >}}

For more information, see [Bits Investigation][1].

### Side panel

In the mini panel, click {{< ui >}}View Full Details{{< /ui >}} to open a side panel listing all monitors associated with that resource or service, along with a summary of their states. For resource monitors, you can also initiate or view a [Bits Investigation][1] investigation for any alerting monitor from this panel.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_side_panel_2.png" alt="Cloudcraft Monitors overlay side panel showing a monitoring summary and a list of monitors associated with a service." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/
