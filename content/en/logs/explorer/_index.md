---
title: Log Explorer
kind: documentation
description: 'Search through all of your logs and perform Log Analytics'
aliases:
    - /logs/explore
    - /logs/patterns
    - /logs/graph
    - /logs/analytics
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

The **Log Explorer** is your home base for log troubleshooting and exploration. Whether you start from scratch, from a [Saved View][1], or land here from any other context like monitor notifications or dashboard widgets, the Log Explorer is designed to iteratively:

1. [**Filter**](#filters-logs) logs; to narrow down, broaden, or shift your focus on the subset of logs of current interest.
2. [**Aggregate**](#aggregations-and-measures) queried logs into higher-level entities in order to derive or consolidate information.
3. [**Visualize**](#visualizations) the outcome of filters and aggregations to put your logs into the right perspective and bubble up decisive information.

At any moment, [**Export**](#export) your Log Explorer view to reuse it later or in different contexts.

With [Watchdog Insights][11] (Beta), kickstart, unlock, or accelerate your troubleshooting sessions with contextual hints on where you could focus your attention.


## Filters Logs

The search filter consists of a timerange and a search query mixing `key:value` and full-text search. Refer to our [log search syntax][2] and [timerange][3] documentation for details on advanced use cases. For example, the search query `service:payment status:error rejected` over a `Past 5 minutes` timerange:

{{< img src="logs/explorer/search_filter.png" alt="Search Filter" style="width:100%;" >}}

[Indexed Logs][4] support both full-text search and `key:value` search queries.

**Note**: `key:value` queries require that you [declare a facet][5] beforehand.

## Aggregate and Measure

Logs can be valuable as individual events, but sometimes valuable information lives in a subset of events. In order to expose this information, aggregate your logs.

{{< img src="logs/explorer/aggregations.png" alt="Log Livetail" style="width:100%;" >}}

**Note**: Aggregations are supported for **indexed logs only**. If you need to perform aggregation on non-indexed logs, consider [temporary disabling exclusion filters][3], using [logs to metrics][6] and/or running a [rehydration][7] on your archives.

### Fields

With the field aggregation, all logs matching the query filter are aggregated into groups based on the value of a log facet. On top of these aggregates, you can extract the following measures:

- **count of logs** per group
- **unique count** of coded values for a facet per group
- **statistical operations** (`min`, `max`, `avg`, and `percentiles`) on numerical values of a facet per group

**Note**: Individual logs having multiple values for a single facet belong to that many aggregates. For instance, a log having the `team:sre` and the `team:marketplace` tags are counted once in the `team:sre` aggregate and once in the `team:marketplace` aggregate.

Groups support the [Timeseries](#timeseries), [Toplist](#toplist) and [Table](#table) visualizations.

### Patterns

With pattern aggregation, logs that have a `message` with similar structures, belong to the same `service` and have the same `status` are grouped altogether. The patterns view is helpful for detecting and filtering noisy error patterns that could cause you to miss other issues:

{{< img src="logs/explorer/aggregations_patterns.png" alt="Log Livetail" style="width:80%;" >}}

**Note**: The pattern detection is based on 10,000 log samples. Refine the search to see patterns limited to a specific subset of logs.

Patterns support the [List Aggregates](#list-aggregates-of-logs) visualization. Clicking a pattern in the list opens the pattern side panel from which you can:

- Access a sample of logs from that pattern
- Append the search filter to scope it down to logs from this pattern only
- Get a kickstart for a [grok parsing rule][7] to extract structured information logs of that pattern

{{< img src="logs/explorer/patterns_side_panel.png" alt="Log Livetail" style="width:80%;" >}}

### Transactions

Transactions aggregate indexed logs according to instances of a **sequence** of events, such as a user session or a request processed across multiple micro-services. For example, an e-commerce website groups log events across various user actions, such as catalog search, add to cart, and checkout, to build a transaction view using a common attribute such as `requestId` or `orderId`.

{{< img src="logs/explorer/aggregations_transactions.png" alt="Log Livetail" style="width:80%;" >}}

**Note**: The transaction aggregation differs from the natural group aggregation, in the sense that resulting aggregates not only include logs matching the query, but also all logs belonging to the related transactions.

- **Duration**: The difference of timestamps for the last and first log in the transaction. _This measure is automatically added_.
- **Maximum Severity** found in logs in the transaction. _This measure is automatically added_.
- **Finding key items:** For any `facet` with string values, calculate specific log event information using the operations `count unique`, `latest`, `earliest` and `most frequent`.
- **Getting Statistics:** For any `measure`, calculate statistical information using the operations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, and `pc99`.

Transactions support the [List Aggregates](#list-aggregates-of-logs) visualization. Clicking a pattern in the list opens the pattern side panel from which you can:

- Access all logs within that transaction
- Search specific logs within that transaction

{{< img src="logs/explorer/transactions_side_panel.png" alt="Log Livetail" style="width:80%;" >}}

## Visualize

Visualizations define how the outcome of filter and aggregates are displayed.

### Lists

Lists are **paginated** results of logs or aggregates. They are valuable when individual results matter, but you have no prior or clear knowledge on what defines a matching result. Lists allow you examine a group of results.

Lists displaying individual logs and lists displaying aggregates of logs have slightly different capabilities.

#### List of logs

For a list of individual logs, choose which information of interest to display as columns. **Manage the columns** of the table using either:

- The **table**, with interactions available in the first row. This is the preferred method to **sort**, **rearrange**, or **remove** columns.
- The **facet panel** the the left, or the _log side panel_ on the right. This is the preferred option to **add** a column for a field.

With the **Options** button, control the **number of lines** displayed in the table per log event.

{{< img src="logs/explorer/table_controls.gif" alt="configure display table"  style="width:80%;">}}

The default **sort** for logs in the list visualization is by timestamp, with the most recent logs on top. This is the fastest and therefore recommended sorting method for general purposes. Surface logs with lowest or highest value for a measure first, or sort your logs lexicographically for the unique value of facet, ordering a column according to that facet. Note that sorting your table according to a specific field requires that you [declare a facet][5] beforehand.

The configuration of the log table is stored alongside other elements of your troubleshooting context in [Saved Views][1]

#### List aggregates of logs

The columns displayed in list of aggregates are columns **derived from the aggregation**.

Results are sorted according to:

- Number of matching events per aggregate for **pattern** aggregation (default to descending: more to less)
- Lexicographic order of the transaction id for **transaction** aggregation (default to ascending: A to Z)

### Timeseries

Visualize the evolution of a single [measure][2] (or a [facet][2] unique count of values) over a selected time frame, and (optionally) split by an available [facet][2].

The following Timeseries log analytics shows the evolution of the **top 5 URL Paths** according to the number of **unique client IPs** over the last month.

{{< img src="logs/explorer/timeseries.png" alt="timeserie example"  style="width:90%;">}}

Choose additional display options for timeseries: the **roll-up interval**, whether you **display** results as **bars** (recommended for counts and unique counts), **lines** (recommended for statistical aggregations) or **areas**, and the **colorset**.

### Toplists

Visualize the top values from a [facet][2] according to the chosen [measure][2].

For example, the following Toplist shows the **top 15 Customers** on a merchant website according to the number of **unique sessions** they had over the last day.

{{< img src="logs/explorer/toplists.png" alt="top list example"  style="width:90%;">}}

### Nested Tables

Visualize the top values from a [facet][2] according to a chosen [measure][2] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this top. Update a search query or drill through logs corresponding to either dimension.

- When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.
- When there are multiple measures, the top or bottom list is determined according to the first measure.
- The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

**Note**: A table visualization used for one single measure and one single dimension is the same as a Toplist, just with a different display.

The following table log analytics show the evolution of the **Top 10 Availability zones**, and for each Availability Zone the **Top 10 Versions** according to their **number or error logs**, along with the number of unique count of **Hosts** and **Container ID** for each.

{{< img src="logs/explorer/nested_tables.png" alt="table example"  style="width:90%;">}}

## Export

At any moment, and depending on your current aggregation, **export** your exploration as a:

- [**Saved View**][1] to use as an investigation starting point for future-yourself or your teammates
- [**Dashboard widget**][8] for reporting or consolidation purpose
- [**Monitor**][9] to trigger alerts on predefined thresholds
- [**Metric**][6] to aggregate your logs into long term KPIs, as they are ingested in Datadog
- **CSV** (for individual logs and transactions). You can export up to 5,000 logs at once for individual logs, 500 for Transactions.
- **Share** View: Share a link to the current view with your teammates through email, Slack, and more. See all of the [Datadog notification integrations][10] available for this feature.

{{< img src="logs/explorer/export.png" alt="Search Filter" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/saved_views/
[2]: /logs/search-syntax
[3]: /dashboards/guide/custom_time_frames
[4]: /logs/indexes
[5]: /logs/explorer/facets/
[6]: /logs/logs_to_metrics
[7]: /logs/processing/processors/#grok-parser
[8]: /dashboards/
[9]: /monitors/monitor_types/log/
[10]: /integrations/#cat-notification
[11]: /logs/explorer/watchdog-insights
