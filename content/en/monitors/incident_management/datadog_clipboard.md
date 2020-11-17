---
title: Datadog Clipboard
kind: documentation
disable_toc: true
description: Create and manage incidents
---

**The Datadog Clipboard is currently in public beta**

# Overview

The Datadog Clipboard is a cross-platform tool for collecting and sharing signals across contexts. It is personal to each user and stores all copied graphs alongside any saved links. Signals can be grouped and exported to a Dashboard, Notebook, or Incident.

https://a.cl.ly/OAuJkv6y

## Cross-Page Exploration

The Clipboard works on all pages in Datadog and keeps a record of all graphs copied by an individual user. The Clipboard does not automatically copy query text, event JSON, or other text-based content. 

## Opening the Clipboard

To open the Clipboard, copy any graph and click “Open Clipboard” in the toast.

https://a.cl.ly/2NujGo6W

Or, click “`Cmd + Shift + X` to open” on the minimized Clipboard. 

The Clipboard can also be opened and closed using `Cmd + Shift + X`. To minimize the Clipboard, click the Minimize icon. The minimized Clipboard persists on all pages of Datadog.

## Adding Clips

To add a graph, copy it with `Cmd+C` or click “Copy” in the export menu. Once the Clipboard is open, copied graphs get added automatically. 

To add a URL, open the Clipboard and click “Add Current URL.”

https://a.cl.ly/X6udZjXn 

## Managing Clips

Each item in the Clipboard can be opened, cloned, or deleted; these options are available when you hover over any signal. Opening an item navigates to the link of the original signal. Open the source of any graph (like the dashboard it was clipped from) by clicking the title at the bottom of the item.



The Clipboard holds a maximum of 20 graphs. Remove graphs by deleting them individually, or by clicking “Clear Clipboard” on the bottom left. If more than 20 graphs are added, the oldest graphs, stored furthest to the left, are removed automatically.

## Exporting

Items on the Clipboard can be exported to Dashboards, Notebooks, or Incidents. `Shift + Click` to select multiple items. In the export menu, choose a new export destination, or search through existing Dashboards, Notebooks, and Incidents. 

https://a.cl.ly/12urXj8v 

URLs cannot be exported to Dashboards. Only [supported graphs][1] can be exported to Notebooks. 

[1]: https://docs.datadoghq.com/notebooks/#visualization
