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
    - link: 'logs/processing'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
    - link: 'logs/explorer/live_tail'
      tag: 'Documentation'
      text: 'The Log Live Tail'
    - link: 'logs/explorer/side_panel'
      tag: 'Documentation'
      text: 'The log side panel'
    - link: 'logs/explorer/saved_views'
      tag: Documentation
      text: 'Automatically configure your Log Explorer'
    - link: 'https://www.datadoghq.com/blog/datadog-clipboard/'
      tag: Blog
      text: 'Add a Log Explorer url to your clipboard'
---

The **Log Explorer** is your home base for troubleshooting and exploration. Whether you start from scratch, from a [Saved View][10] or landing there from any other context (a monitor notification, a widget in a dashboard or whichever even with related logs), the Logs Explorer is designed to incrementally:

1. [**Filter**](#filters-logs) to narrow down, broaden or shift your focus on the subset of logs of current interest,
2. [**Aggregate**](#aggregations-and-measures) queried logs on-the-fly into higher-level entities in order to derive or consolidate information,
3. [**Visualize**](#visualisations) the outcome of filters and aggregations with different visual representations that put your logs into the right perspective to bubble up decisive information. 

At any moment, [**Export**](#export) your exploration to reuse later or in different contexts.

## Filters Logs

The search filter practically consists of a timerange (`Past 5 minutes` in the example below) and a search query mixing key:value and full-text search (`service:payment status:error rejected` in the example below). Refer to our [log search syntax][1] and [timerange][2] documentation for details on advanced use-cases.

[1]: /logs/search-syntax
[2]: /dashboards/guide/custom_time_frames

{{< img src="logs/explorer/search_filter.png" alt="Search Filter" style="width:100%;" >}}

[Indexed Logs][3] support both full-text search and key:value search queries. Note that key:value queries require that you [declare a facet][4] beforehand to enable queries on attributes (log content), or accelerate queries on tags (log context).

[3]: /logs/indexes
[4]: /logs/explorer/facets/


## Aggregate and Measure

Logs can be valuable as individual events but sometimes the valuable information resideslive on higher level entities aggregated from logs.

{{< img src="logs/explorer/aggregations.png" alt="Log Livetail" style="width:100%;" >}}

Aggregations are supported for indexed logs only. If you need to perform aggregation on non-indexed logs, consider [temporary disabling exclusion filters][2], using [logs to metrics][4] and/or running a [rehydration][5] on your archives.

[4]: /logs/logs_to_metrics
[5]: /logs/archives/rehydrating


### Simple Groups

With the simple group aggregation, all logs matching the query filter are aggregated into groups based on the value of that facet for logs. On top of these groups, you can extract the following measures:
* **count of logs** per group
* **unique count** of coded values for a facet
* **statistical operations** (min/max, avg and percentiles) on numerical values of a facet

*Note*. Individual logs having multiple values for a single facet would belong to that many groups. For instance, a log having the `team:sre` and the `team:marketplace` tags would be counted once in the `team:sre` group and once in the `team:marketplace` group.

Groups support the [Timeseries](#timeseries), [Toplist](#toplist) and [Table](#table) visualizations.

### Patterns

With pattern aggregation, logs having messages with similar structures are grouped altogether. The patterns view is helpful for detecting and filtering noisy error patterns that might cause you to miss other issues.

{{< img src="logs/explorer/aggregations_patterns.png" alt="Log Livetail" style="width:60%;" >}}

*Note*. The pattern detection is based on 10,000 log samples. Refine the search to see patterns limited to a specific subset of logs.

[6]: /logs/processing/processors/?tab=ui#grok-parser

Patterns support the [List Aggregates](#list-aggregates-of-logs) visualisation. Clicking a pattern in the list would open the pattern side panel from which you can:
* access a sample of logs from that pattern
* append the search filter to scope it down to logs from this pattern only
* get a kickstart for a [Grok parsing rule][6] to extract structured information logs of that pattern  

{{< img src="logs/explorer/patterns_side_panel.png" alt="Log Livetail" style="width:80%;" >}}

### Transactions

The Log Transactions automatically aggregate indexed logs according to instances of a **sequence** of events, such as a user session or a request processed across multiple micro-services. For example, an e-commerce website would group log events across various user actions, such as catalog search, add to cart, and checkout, to build a transaction view using a common attribute such as `requestId` or `orderId`.

{{< img src="logs/explorer/aggregations_transactions.png" alt="Log Livetail" style="width:80%;" >}}

*Note*. The transaction aggregation differs from the natural group aggregation, in the sense that resulting aggregates not only include logs matching the query, but also all logs belonging to the related transactions.    

- **Finding key items:** For any `facet` with string values, calculate specific log event information using the operations `count unique`, `latest`, `earliest` and `most frequent`.
- **Getting Statistics:** For any `measure`, calculate statistical information using the operations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, and `pc99`.

Transaction support the [List Aggregates](#list-aggregates-of-logs) visualisation. Clicking a pattern in the list would open the pattern side panel from which you can:
* access all logs within that transaction
* search specific logs within that transaction

{{< img src="logs/explorer/transactions_side_panel.png" alt="Log Livetail" style="width:80%;" >}}

## Visualise

Visualisations define how the outcome of filter and aggregates are displayed.

### Lists

List are paginated results of logs or aggregates. They are specifically valuable when individual results matter, but when you have no prior or clear knowledge on what defines a matching result, so that you need to examine a bunch of them.

#### List of Logs

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

{{< img src="logs/explorer/nested_tables.png" alt="table example"  style="width:90%;">}}

## Export

At any moment, and depending on your current aggregation, **export** your exploration:
* as a [Saved View][10] as an investigation starting point for future-yourself or your teammates,
* as a [Dashboard widget][63] for reporting or consolidation purpose,
* as a [Monitor][62] in order to trigger alerts on predefined thresholds 
* as a [Metric][64]
* as a CSV

[62]: /monitors/monitor_types/log/
[63]: /dashboards/
[64]: /logs/logs_to_metrics/
[32]: /logs/explorer/saved_views/

{{< img src="logs/explorer/export.png" alt="Search Filter" style="width:100%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



