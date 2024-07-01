---
title: Datadog Clipboard
kind: documentation
description: Create and manage incidents
aliases:
- /monitors/incident_management/datadog_clipboard
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-clipboard/"
  tag: Blog
  text: Explore your data effortlessly with the Datadog Clipboard
---

## Overview

The Datadog Clipboard is a cross-platform tool for collecting and sharing signals across contexts. It is personal to each user and stores all copied graphs alongside any saved links. Signals can be grouped and exported to a dashboard, notebook, or incident.

{{< img src="service_management/incidents/clipboard-full.png" alt="The main clipboard">}}

## Cross-page exploration

The Clipboard works on all pages in Datadog and keeps a record of all graphs copied by an individual user. The Clipboard does not automatically copy query text, event JSON, or other text-based content.

## Opening the Clipboard

To open the Clipboard, copy any graph and click **Open Clipboard** in the popup.

{{< img src="service_management/incidents/open-clipboard.png" alt="Open a graph in the Clipboard" style="width:80%;">}}

Or, click "`Cmd/Ctrl + Shift + K` to open" on the minimized Clipboard.

The Clipboard can also be opened and closed using `Cmd/Ctrl + Shift + K`. To minimize the Clipboard, click the Minimize icon. The minimized Clipboard persists on all pages of Datadog.

## Adding clips

To add a graph, copy it with `Cmd/Ctrl + C` or click **Copy** in the export menu. Once the Clipboard is open, copied graphs get added automatically.

To add a URL, open the Clipboard and click **Add current page**.

{{< img src="service_management/incidents/add-page.png" alt="Add a dashboard to the Clipboard" style="width:80%;">}}

## Managing clips

Each item in the Clipboard can be opened, cloned, or deleted; these options are available when you hover over any signal. Opening an item navigates to the link of the original signal. Open the source of any graph (like the dashboard it was clipped from) by clicking the title of the item.

{{< img src="service_management/incidents/managing-clips.png" alt="Manage your clips" style="width:80%;">}}

The Clipboard holds a maximum of 20 signals. Remove signals by deleting them individually, or by clicking **Remove All**. If more than 20 signals are added, the oldest signals, stored furthest to the left, are removed automatically.

## Exporting

Items on the Clipboard can be exported to Dashboards, Notebooks, or Incidents using keyboard shortcuts or the export menu. To copy an individual signal, hover over it and use `Cmd/Ctrl + C` to copy, and paste it into a dashboard or notebook with `Cmd/Ctrl + V`. To copy multiple signals, use  `Shift + Click` to select graphs and links, and use `Cmd/Ctrl + C` to copy them.

Alternatively, export your selection to a new or existing dashboard, notebook, or incident using the export menu. Only [supported graphs][1] can be exported to Notebooks.

{{< img src="service_management/incidents/exporting.png" alt="Export from the Clipboard" style="width:80%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/notebooks/#visualization
