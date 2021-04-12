---
title: Datadog Clipboard
kind: documentation
description: Create and manage incidents
---

# Overview

The Datadog Clipboard is a cross-platform tool for collecting and sharing signals across contexts. It is personal to each user and stores all copied graphs alongside any saved links. Signals can be grouped and exported to a dashboard, notebook, or incident.

{{< img src="monitors/incidents/clipboard-full.png" alt="The main clipboard">}}

## Cross-Page Exploration

The Clipboard works on all pages in Datadog and keeps a record of all graphs copied by an individual user. The Clipboard does not automatically copy query text, event JSON, or other text-based content.

## Opening the Clipboard

To open the Clipboard, copy any graph and click “Open Clipboard” in the toast.

{{< img src="monitors/incidents/open-clipboard.png" alt="Open a graph in the Clipboard"  style="width:80%;">}}

Or, click “`Cmd/Ctrl + Shift + K` to open” on the minimized Clipboard.

The Clipboard can also be opened and closed using `Cmd/Ctrl + Shift + K`. To minimize the Clipboard, click the Minimize icon. The minimized Clipboard persists on all pages of Datadog.

## Adding Clips

To add a graph, copy it with `Cmd/Ctrl + C` or click “Copy” in the export menu. Once the Clipboard is open, copied graphs get added automatically.

To add a URL, open the Clipboard and click “Add current page.”

{{< img src="monitors/incidents/add-page.png" alt="Add a dashboard to the Clipboard"  style="width:80%;">}}

## Managing Clips

Each item in the Clipboard can be opened, cloned, or deleted; these options are available when you hover over any signal. Opening an item navigates to the link of the original signal. Open the source of any graph (like the dashboard it was clipped from) by clicking the title of the item.

{{< img src="monitors/incidents/managing-clips.png" alt="Manage your clips"  style="width:80%;">}}

The Clipboard holds a maximum of 20 signals. Remove signals by deleting them individually, or by clicking “Remove All.” If more than 20 signals are added, the oldest signals, stored furthest to the left, are removed automatically.

## Exporting

Items on the Clipboard can be exported to dashboards, notebooks, or incidents. `Shift + Click` to select multiple items. In the export menu, choose a new export destination, or search through existing dashboards, notebooks, and incidents. Only [supported graphs][1] can be exported to Notebooks.

{{< img src="monitors/incidents/exporting.png" alt="Export from the Clipboard"  style="width:80%;">}}

[1]: https://docs.datadoghq.com/notebooks/#visualization
