---
title: Monitors
description: "Use the Monitors overlay in Cloudcraft to view monitor states for your resources and services, and investigate alerting monitors with Bits AI SRE."
site_support_id: cloudcraft_monitors_overlay
further_reading:
- link: "/bits_ai/bits_ai_sre/"
  tag: "Documentation"
  text: "Bits AI SRE"
---

{{< callout btn_hidden="true" header="Join the Preview!" >}}
The Monitors overlay is in Preview.
{{< /callout >}}

## Overview

The Monitors overlay shows monitors associated with your AWS and Azure resources and services, along with their current state (Alert, Warn, or OK). Use this overlay to identify and investigate production issues directly in your infrastructure diagram.

## View monitor status

Each resource or service with associated monitors displays an icon showing:

- The count of monitors in the highest state (Alert takes priority over Warn, which takes priority over OK)
- The title of the highest-priority monitor

When only one monitor is in the highest state, the diagram displays the monitor icon instead of a count.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_diagram.png" alt="Cloudcraft diagram with the Monitors overlay showing monitor icons and counts on resources." style="width:100%;" >}}

## Filter monitors

Use the legend at the bottom of the diagram to filter monitors by alerting status and monitor priority.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_legend.png" alt="Monitors overlay legend in Cloudcraft with filter options for alerting status and monitor priority." style="width:50%;" >}}

## Investigate monitors

### Hover panel

Hover over a resource or service with monitors to see a count breakdown of associated monitors by status. The hover panel includes an **Investigate with Bits AI SRE** button that loads the three most recent alerting events for the selected monitor. From there, you can initiate an investigation or view an existing one.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_hover_panel.png" alt="Cloudcraft Monitors overlay hover panel showing a monitor count breakdown by status and the Investigate with Bits AI SRE button." style="width:80%;" >}}

For more information, see [Bits AI SRE][1].

### Side panel

Click a monitor pin on the diagram to open a side panel listing all monitors associated with that resource or service. For resource monitors, you can also initiate or view a [Bits AI SRE][1] investigation for any alerting monitor from this panel.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_monitors_overlay_side_panel.png" alt="Cloudcraft Monitors overlay side panel showing a list of monitors associated with a resource." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_ai_sre/
