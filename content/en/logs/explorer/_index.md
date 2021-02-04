---
title: Log Explorer
kind: documentation
description: 'Search through all of your logs and perform Log Analytics'
aliases:
    - /logs/explore
    - /logs/explorer/list
    - /logs/explorer/patterns
    - /logs/explorer/analytics
    - /logs/explorer/transactions/
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Perform Log Analytics'
    - link: 'logs/processing'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
    - link: 'logs/explorer/saved_views'
      tag: Documentation
      text: 'Automatically configure your Log Explorer'
    - link: 'logs/explorer/patterns'
      tag: Documentation
      text: 'Detect patterns inside your logs'
    - link: 'https://www.datadoghq.com/blog/datadog-clipboard/'
      tag: Blog
      text: 'Add a Log Explorer url to your clipboard'
---

The Logs Explorer is your home base for troubleshooting and exploration with different types of visualistions built out of your log data.

## Search Filter

The search filter defines the subset of your logs you want to focus on. It consists of a [timerange][3] (`Past 5 minutes` in the example below) and a search query (`service:payment status:error rejected` in the example below). Refer to our [search syntax][1] documentation for all details on how to use full-text and faceted search.

[1]: /logs/search-syntax

{{< img src="logs/explorer/search_filter.png" alt="Search Filter" style="width:100%;" >}}


## Live and Indexed Data

### Livetail

Choose the Livetail option in the **Timerange** to query logs as they flow into Datadog. 

{{< img src="logs/explorer/livetail.gif" alt="Log Livetail" style="width:60%;" >}}

Live Tail logs do not persist, but the view provides visibility on **all** logs, whether you choose to index them or not - see our section on [Exclusion Filters][2] on Logs Indexes. The Livetail is specifically useful, for instance, to check if a process has correctly started, or if a new deployment went smoothly.

[2]: /logs/indexes#exclusion-filters

Any query that works in other views works in the Live Tail view, but you can even go further and **filter on attributes that are not defined as facets**.

For example, to filter on the following `filename` attribute there are two options:

{{< img src="logs/explorer/live_tail_save.png" alt="Live tail save"  style="width:50%;">}}

1. Click on the attribute and add it to the search:

    {{< img src="logs/explorer/live_tail_click_attribute.png" alt="Live tail click attribute"  style="width:50%;">}}

2. Use the following query `@filename:runner.go`:

To filter on all logs with a line number above 150 use the following query: `@linenumber:>150`


*Note*. For the sake of readability, the livetail output is sampled when too many logs matching the query are flowing in. The sampling applied is uniformly random. Scope your query down with additional search filters if you need visibility on every single log flowing in.    

The livetail is compatible with the [List](#list-of-logs) Visualisation.


### Indexed Data

All **Timerange** options but the Livetail ()

[3]: /dashboards/guide/custom_time_frames


Navigate all [indexed logs][31] in the Log Explorer: filter and aggregate your logs and visualise the outcome of these queries.
[31]: /logs/indexes


## Aggregations and Measures

Logs can be valuable as individual events. However, the information valuable for troubleshooting or reporting resides on higher level entities aggregated from logs. With the Log Explorer, aggregate logs on-the-fly and derive consolidated information from there.

{{< img src="logs/explorer/aggregations.png" alt="Log Livetail" style="width:60%;" >}}

Aggregation are supported for indexed logs only. If you need to perform aggregation on non-indexed logs, consider [temporary disabling exclusion filters][2], using [logs to metrics][4] or running a [rehydration][5] on your archives.

[4]: /logs/logs_to_metrics
[5]: /logs/archives/rehydrating


### Simple Groups

With the simple group aggregation, all logs matching the query filter are aggregated into groups based on the value of that facet for logs.

On top of these groups, you can extract the following measures:
* **count of logs** per group
* **unique count** of coded values for a facet
* **statistical operations** (min/max, avg and percentiles) on numerical values of a facet

Groups support the [Timeseries](#timeseries), [Toplist](#toplist) and [Table](#table) visualizations.

*Note*. Individual logs having multiple values for a single facet would belong to that many groups. For instance, a log having the `team:sre` and the `team:marketplace` tags would be counted once in the `team:sre` group and once in the `team:marketplace` group.

### Patterns

With pattern aggregation, logs having messages with similar structures are grouped altogether. The patterns view is helpful for detecting and filtering noisy error patterns that might cause you to miss other issues.

{{< img src="logs/explorer/aggregations_patterns.png" alt="Log Livetail" style="width:60%;" >}}

Note that the pattern detection is based on 10,000 log samples. Refine the search to see patterns limited to a specific subset of logs.

Patterns support the [List Aggregates](#list-aggregates-of-logs) visualisation. Clicking a pattern in the list would open the pattern side panel from which you can:

* access a sample of logs from that pattern
* append the search filter to scope it down to logs from this pattern only
* get a kickstart for a [Grok parsing rule][6] to extract structured information logs of that pattern  

{{< img src="logs/explorer/patterns_side_panel.png" alt="Log Livetail" style="width:60%;" >}}

[6]: /logs/processing/processors/?tab=ui#grok-parser

### Transactions

The Log Transactions automatically aggregate indexed logs according to instances of a **sequence** of events, such as a user session or a request processed across multiple micro-services. For example, an e-commerce website would group log events across various user actions, such as catalog search, add to cart, and checkout, to build a transaction view using a common attribute such as `requestId` or `orderId`.

{{< img src="logs/explorer/aggregations_transactions.png" alt="Log Livetail" style="width:60%;" >}}

*Note*. The transaction aggregation differs from the natural group aggregation, in the sense that resulting aggregates not only include logs matching the query, but also all logs belonging to the related transactions.    

- **Finding key items:** For any `facet` with string values, calculate specific log event information using the operations `count unique`, `latest`, `earliest` and `most frequent`.
- **Getting Statistics:** For any `measure`, calculate statistical information using the operations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, and `pc99`.

Transaction support the [List Aggregates](#list-aggregates-of-logs) visualisation.

## Visualisations

The Log Analytics **graph** log queries and see maximums, averages, percentiles, unique counts, and more. Follow the [log graphing guide][6] to learn more about all the graphing options.

### Lists

The Log List displays indexed logs and offers privileged tools to navigate **individual results**.

#### List of Logs

The Log Search is displayed in the logs table.

Manage the columns of the table using either:

- The _table itself_, with interactions available in the first row. This is the preferred option to **sort**, **rearrange**, or **remove** columns.
- The _facet panel_ the the left, or the _log side panel_ on the right. This is the preferred option to **add** a column for a field.

With the _Options_ button, control the **number of lines** displayed in the table per log event.

{{< img src="logs/explorer/table_controls.gif" alt="configure display table"  style="width:80%;">}}

The configuration of the log table is stored alongside other elements of your troubleshooting context in [Saved Views][32]

**Export View**

{{< img src="logs/explorer/list_share.png" alt="configure display table"  style="width:80%;">}}

- Export to **Monitor**: Export the query applied to your Logstream to create a query for a new [log monitor][35].
- Export to **CSV**: Export your current Logstream view with its selected columns to a CSV file. You can export up to 5,000 logs at once.
- **Share** View: Share a link to the current view with your teammates through email, Slack, and more. See all [Datadog notification integrations][36] available.

[32]: /logs/explorer/saved_views/
[35]: /monitors/monitor_types/log/
[36]: /integrations/#cat-notification

#### List Aggregates of Logs

TODO

### Timeseries

Visualize the evolution of a single [measure][1] (or a [facet][1] unique count of values) over a selected time frame, and (optionally) split by an available [facet][1].

{{< img src="logs/explorer/timeseries.png" alt="timeserie example"  style="width:90%;">}}

You have additional display options for timeseries:

- The roll-up interval
- Whether you display lines, bars, or areas
- Color set

Noteworthy facts about stacking:

- Stacking is available only for query requests with a split.
- Stacking options are for bar and area displays only. Line displays are always overlapping.
- When you use a toplist option that hides part of your data, stacking does not show the total overall; rather, it shows only the subtotal for the top/bottom series.
- Stacking may not make sense when you have non-unique values in the split facet.
- Stacking may not make sense for some aggregration methods for measures.

The following timeseries Log Analytics shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.


### Toplists

Visualize the top values from a [facet][1] according to the chosen [measure][1]:

The following Top List Log Analytics shows:
The evolution of the **top 5 URL Paths** according to the number of **unique Client IPs** over the last month.

{{< img src="logs/explorer/toplists.png" alt="top list example"  style="width:90%;">}}

### Nested Tables

Visualize the top values from a [facet][1] according to a chosen [measure][1] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top. Update search query or drill through logs corresponding to either dimension.

- When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.
- When there are multiple measures, the top or bottom list is determined according to the first measure.
- The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

    **Note**: A table visualisation used for one single measure and one single dimension is the same as a toplist, just with a different display.

The following Table Log Analytics shows the evolution of the **top Status Codes** according to their **Throughput**, along with the number of unique **Client IPs**, and over the last 15 minutes:

{{< img src="logs/explorer/nested_table.png" alt="table example"  style="width:90%;">}}


## The Log Side Panel

Datadog displays individual logs following this general side-panel layout:

{{< img src="logs/explorer/log_side_panel.png" alt="Log Side Panel"  style="width:60%;">}}

### Log structured information 

- The upper part of the panel displays general **context** information.
- The lower part of the panel displays the actual **content** of the log.

**Context** refers to the infrastructure and application context in which the log has been generated. Information is gathered from tags—whether automatically attached (host name, container name, log file name, serverless function name, etc.)—or added through custom tags (team in charge, environment, application version, etc.) on the log by the Datadog Agent or Log Forwarder.

**Content** refers to the log itself. This includes the log message, as well as all structured information extracted and enriched from the logs through [Log Pipelines][7]. For logs generated by common components of a technical stack, parsing and enriching comes out-of-the-box:

- For file log collection, make sure you properly set up the source field, which triggers file log collection. See Datadog's [100+ Log Integrations][8] for reference.
- For container log collection, use [Autodiscovery][9].

Some standard fields—for instance, `error.stack`, `http.method`, or `duration`—have specific enhanced displays in the Log Panel for better readability. Make sure you extract corresponding information from your logs and remap your attributes with [standard attribute remappers][10].

### A hub to other data sources

#### Correlation with Infrastructure (Host, Container, Serverless) data

The **View in context** button updates the search request in order to show you the log lines dated just before and after a selected log—even if they don't match your filter. This context is different according to the situation, as Datadog uses the `Hostname`, `Service`, `filename`, and `container_id` attributes, along with tags, in order find the appropriate context for your logs.

Click on the **Metrics Tab** and access underlying infrastructure metrics in a 30 minutes timeframe around the log.

Interact with **Host** in the upper reserved attributes section, the related [host dashboard][11] or [network page][12]. Interact with **Container** sections to jump to the [container page][13] scoped with the underlying parameters.

{{< img src="logs/explorer/log_side_panel_infra.gif" alt="Hub to Infra" style="width:60%;">}}

In case logs comes from a serverless source, the Host Section is replaced with a Serverless section that links jump to the corresponding [serverless page][14].

{{< img src="logs/explorer/log_side_panel_infra-serverless.png" alt="Hub to Serverless" style="width:60%;">}}


#### Correlation with APM data

Make sure you enable [trace injection in logs][15] and follow our [Unified Service Tagging][16] best practices to benefit from all the capabilities of Logs and APM correlation.

Click on the **APM Tab** and see the log in the context of its whole trace, with upstream and downstream services running. Deep dive in the APM data and the [trace in APM][17].

Interact with the **Service** section to refocus the search in the log explorer and see all other logs from the same trace.

{{< img src="logs/explorer/log_side_panel_infra.gif" alt="Hub to APM" style="width:60%;">}}


### Configure your troubleshooting context

Interact with the attributes names and values in the lower JSON section to:

- Add or remove a column from the logs table.
- Append the search request with specific values (include or exclude)

{{< img src="logs/explorer/side_panel_context.gif" alt="Side Panel context"  style="width:60%;">}}

- Build or edit a facet or measure from an attribute. See [Log Facets][18].

{{< img src="logs/explorer/side_panel_facets.gif" alt="Side Panel Facets"  style="width:60%;">}}

### Share a log

Use the **Share** button to share the log opened in side panel to other contexts.

- **Copy to clipboard** or `Ctrl+C` / `Cmd+C` copies the log JSON to your clipboard.
- **Share Event** shares the log (along with the underlying view) with teammates through email, Slack, and more. See all [Datadog notification integrations][19] available.

{{< img src="logs/explorer/upper_log_panel.png" alt="Upper Log Panel"  style="width:50%;">}}

## Share View
### Search Filter

Export your current log visualization with the _share_ functionality:

- Export to **Monitor**: Export the query applied to your log analytics to create the query for a new [log monitor][62].
- Export to **Dashboard**: Export the current analytics as a widget to an existing or new [dashboard][63].
- Generate a new **Metric**: [Generate a new metric][64] out of the current analytic query.

{{< img src="logs/explorer/analytics/analytics_share.png" alt="table example"  style="width:90%;">}}

[62]: /monitors/monitor_types/log/
[63]: /dashboards/
[64]: /logs/logs_to_metrics/


### Saved views

Use saved views to automatically configure your log explorer with a preselected set of facets, measures, searches, time ranges, and visualizations. Check the dedicated [saved views documentation][21] to learn more.

[21]: /logs/explorer/saved_views/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



