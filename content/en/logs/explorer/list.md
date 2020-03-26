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


The Log Search is the list of logs that match the selected context. A context is defined by a [search bar][1] filter and a [time range](#time-range).

{{< img src="logs/explorer/list/search.gif" alt="configure display table"  style="width:50%;">}}

### Logs Table

The Log Search is displayed in the logs table.

Configure the logs table content according to your needs and preferences with the "Options" button. Among your custom attributes, only faceted or measures attributes are available for columns.

Log results are sorted by date—the most recent on top by default. You can also inverse-sort by date, with the least recent (within the limits of the time range) on top.

{{< img src="logs/explorer/list/sort_by_measure.png" alt="configure display table"  style="width:50%;">}}

### Log Panel

Click on any log line to open the log panel and see more details about it: raw message, extracted attributes, and tags (with host, service, and source tags on top).

Some standard attributes—for instance, `error.stack`, `http.method`, or `duration`—have specific highlighted displays in the Log Panel for better readability. Make sure you extract corresponding information from your logs and remap your attributes with [standard attribute remappers][2].

Interact with the attributes names and values in the lower JSON section to:

- Build or edit a facet or measure from an attribute. This action does not apply to anterior logs.
- Add or remove a column from the logs table.
- Append the search request with specific values (include or exclude)

{{< img src="logs/explorer/attribute_actions.png" alt="configure display table"  style="width:20%;">}}

Interact with the upper reserved attributes section:

- with **Host**, to access the host dashboard or append the search request with the `host` of the log.
- with **Service**, to see the trace in APM, append the search request with the trace ID (both require a `trace_id` attribute in the log: refer to [trace injection in logs][3]) or append search request with the `service` of the log.
- with **Source**, to append the search request with the `source` of the log.

The **View in context** button updates the search request in order to show you the log lines dated just before and after a selected log—even if they don't match your filter. This context is different according to the situation, as Datadog uses the `Hostname`, `Service`, `filename`, and `container_id` attributes, along with tags, in order find the appropriate context for your logs.

Use the **Share** button to share the log opened in side panel to other contexts.

- **Copy to clipboard** or `Ctrl+C` / `Cmd+C` copies the log JSON to your clipboard.
- **Share Event** shares the log (along with the underlying view) with teammates through email, Slack, and more. See all [Datadog notification integrations][4] available.

{{< img src="logs/explorer/upper_log_panel.png" alt="configure display table"  style="width:50%;">}}


[1]: /logs/explorer/search
[2]: /logs/processing/attributes_naming_convention
[3]: /tracing/connect_logs_and_traces
