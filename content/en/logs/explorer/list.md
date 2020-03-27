---
title: List Logs
kind: documentation
description: "Search through all of your logs."
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/explorer/patterns"
  tag: "Documentation"
  text: "Detect patterns inside your logs"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/saved_views"
  tag: "Documentation"
  text: "Automatically configure your Log Explorer"
---

## Overview

The Log List displays indexed logs and offer priviledged tools to navigate in **individual results**. 

Filter logs with a search query (see [faceted search][2], or [search query syntax][3] for advanced use cases) and time navigation. Explore log results in the table, and focus on any log with the [Log Side Panel][4]. 

{{< img src="logs/explorer/list/list_walkthrough.gif" alt="configure display table"  style="width:50%;">}}


## Logs Table

The Log Search is displayed in the logs table.

Manage the columns of the table using either:

* The *table itself*, with interactions available in the first row. Which is the preferred option to **sort**, **rearrange** or **remove** columns. 
* The *facet panel* the the left, or the *log side panel* on the right. Which is the preferred option to **add** a column for a field.

With the Options button, control the **number of lines** displayed in the Table per log-event.

{{< img src="logs/explorer/list/table_controls.gif" alt="configure display table"  style="width:50%;">}}

The configuration of the log table is stored alongside other elements of your troubleshooting context in [Saved Views][7]


## Export View

{{< img src="logs/explorer/list/list_share.png" alt="configure display table"  style="width:50%;">}}

* Export to **Monitor** : Export the query applied to your logstream to create the query for a new [log monitor][5].
* Export to **CSV**: Export your current logstream view with its selected columns to a CSV file. You can export up to 5,000 logs at once.
* **Share** View: Share a link to the current view with your teammates through email, Slack, and more. See all [Datadog notification integrations][6] available.


[1]: /logs/explorer/search
[2]: /logs/explorer/facets/
[3]: /logs/search-syntax
[4]: /logs/explorer/?tab=logsearch#the-log-side-panel
[5]: /monitors/monitor_types/log
[6]: /integrations/#cat-notification
[7]: /logs/explorer/saved_views/
