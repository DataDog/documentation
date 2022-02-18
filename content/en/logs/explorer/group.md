---
title: Group Logs
kind: documentation
description: 'Group queried logs into higher-level entities in order to derive or consolidate information.'
aliases:
    - /logs/explorer/group
    - /logs/group
further_reading:
    - link: 'logs/explorer/search'
      tag: 'Documentation'
      text: 'Filter logs'
    - link: 'logs/explorer/visualize'
      tag: 'Documentation'
      text: 'Create visualizations from logs'
    - link: '/logs/explorer/export'
      tag: 'Documentation'
      text: 'Export Log Explorer views'
---

## Overview

Logs can be valuable as individual events, but sometimes valuable information lives in a subset of events. In order to expose this information, group your logs by [fields](#fields), identify [patterns](#patterns), or aggregate your logs into [transactions](#transactions).

Switch between different aggregations of your queried logs with the logs query editor. The fields you select to group, aggregate, and measure your logs are saved as you switch between different visualizations and aggregation types.

{{< img src="logs/explorer/aggregations.jpg" alt="Log Livetail" style="width:100%;" >}}

Add [multiple queries](#multiple-queries) to simultaneously analyze different sets of logs, and apply [formulas](#formulas) and [functions](#functions) to your queries for in-depth analysis.

**Note**: Aggregations are supported for **indexed logs only**. If you need to perform aggregation on non-indexed logs, consider [temporarily disabling exclusion filters][1], using [logs to metrics][2] and/or running a [rehydration][3] on your archives.

## Fields

When aggregating by Fields, all logs matching your query filter are aggregated into groups based on the value of one or multiple log facets. On top of these aggregates, you can extract the following measures:

- **count of logs** per group
- **unique count** of coded values for a facet per group
- **statistical operations** (`min`, `max`, `avg`, and `percentiles`) on numerical values of a facet per group

**Note**: Individual logs with multiple values for a single facet belong to that many aggregates. For instance, a log having the `team:sre` and the `team:marketplace` tags are counted once in the `team:sre` aggregate and once in the `team:marketplace` aggregate.

The Fields aggregation supports one dimension for the [Top list][4] visualization, and up to three dimensions for the [Timeseries][5] and [Table](#nested-tables) visualizations. When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.

### Multiple queries

Multiple queries are supported in [Timeseries][5] and [Top list][4] visualizations. Add multiple queries by clicking on the `+ Add` button next to the query editor. When you add a new query, it is a copy of the last query and its grouping options:

{{< img src="logs/explorer/group/add_multiple_queries.mp4" alt="Log Live Tail" video=true style="width:100%;" >}}

Select or deselect queries to display in the current visualization by clicking on their letters in the query editor:

{{< img src="logs/explorer/group/select_multiple_queries.jpg" alt="Log Live Tail" style="width:100%;" >}}

By default, when a new query is added, it is automatically selected to be displayed in the chosen visualization.

Display the timeline for one of your queries by selecting that query in the `Timeline for` dropdown. Scope one of your search queries by selecting that query in the `Use facets with` dropdown and clicking on values in the [Facet Panel][6]. Only the selected query is updated with the chosen facets.

{{< img src="logs/explorer/group/query_selector.jpg" alt="Log Live Tail" style="width:100%;" >}}

### Functions

**Note**: Functions are only supported in [Timeseries][5] and [Top list][4] visualizations.

Apply functions to your logs by clicking on the `Fields` aggregation in the query editor. Optionally select a faceted field to apply the function to, then click on the `Σ` icon next to that measure. Select or search for a function to apply to the selected log field.

{{< img src="logs/explorer/group/add_function.mp4" alt="Log Live Tail" video=true style="width:100%;" >}}

All functions available for logs in the graphing editor in Dashboards can be applied to logs in the Log Explorer:

- [Arithmetic][7]
- [Interpolation][8]
- [Timeshift][9]
- [Rate][10]
- [Smoothing][11]
- [Rollup][12]
- [Exclusion][13]

Here is an example of how to apply an [Exclusion function][13] to exclude certain values of your logs:

{{< img src="logs/explorer/group/exclusion_function_logs.jpg" alt="Log Livetail" style="width:100%;" >}}

### Formulas

Apply a formula on one or multiple queries by clicking on the `+ Add` button next to the query editor. In the following example, the formula is used to calculate the ratio of the unique number of `Cart Id` in logs for `Merchant Tier: Enterprise` / `Merchant Tier: Premium` customers:

{{< img src="logs/explorer/group/multiple_query_formula.jpg" alt="Log Livetail" style="width:100%;" >}}

**Note**: To apply formulas with multiple queries, all queries must be grouped by the same facet. In the example above, both queries are grouped by `Webstore Store Name`.

You can apply a function to a formula by clicking on the `Σ` icon. Here is an example of how to apply a [Timeshift function][9] on the proportion of error logs in all logs to compare current data with data from one week before:

{{< img src="logs/explorer/group/timeshift_function_logs.jpg" alt="Log Livetail" style="width:100%;" >}}

## Patterns

With pattern aggregation, logs that have a `message` with similar structures are grouped altogether. Optionally select one to three faceted fields to pre-aggregate your logs into groups before patterns are detected within these groupings.

The patterns view is helpful for detecting and filtering noisy error patterns that could cause you to miss other issues:

{{< img src="logs/explorer/aggregations_patterns.png" alt="Log Livetail" style="width:80%;" >}}

**Note**: The pattern detection is based on 10,000 log samples. Refine the search to see patterns limited to a specific subset of logs.

Patterns support the [List Aggregates](#list-aggregates-of-logs) visualization. Clicking a pattern in the list opens the pattern side panel from which you can:

- Access a sample of logs from that pattern
- Append the search filter to scope it down to logs from this pattern only
- Get a kickstart for a [grok parsing rule][3] to extract structured information logs of that pattern

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="Log Livetail" style="width:80%;" >}}

## Transactions

Transactions aggregate indexed logs according to instances of a **sequence** of events, such as a user session or a request processed across multiple micro-services. For example, an e-commerce website groups logs across various user actions, such as catalog search, add to cart, and checkout, to build a transaction view using a common attribute such as `requestId` or `orderId`.

{{< img src="logs/explorer/aggregations_transactions.jpg" alt="Log Livetail" style="width:80%;" >}}

**Note**: The transaction aggregation differs from the natural group aggregation, in the sense that resulting aggregates not only include logs matching the query, but also all logs belonging to the related transactions.

- **Duration**: The difference of timestamps for the last and first log in the transaction. _This measure is automatically added_.
- **Maximum Severity** found in logs in the transaction. _This measure is automatically added_.
- **Finding key items:** For any `facet` with string values, calculate specific log information using the operations `count unique`, `latest`, `earliest` and `most frequent`.
- **Getting Statistics:** For any `measure`, calculate statistical information using the operations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, and `pc99`.

Transactions support the [List Aggregates](#list-aggregates-of-logs) visualization. Clicking a pattern in the list opens the pattern side panel from which you can:

- Access all logs within that transaction
- Search specific logs within that transaction

{{< img src="logs/explorer/transactions_side_panel.png" alt="Log Livetail" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/custom_time_frames
[2]: /logs/logs_to_metrics
[3]: /logs/log_configuration/processors/#grok-parser
[4]: /logs/explorer/visualize/#top-list
[5]: /logs/explorer/visualize/#timeseries
[6]: /logs/explorer/facets/#facet-panel
[7]: /dashboards/functions/arithmetic
[8]: /dashboards/functions/interpolation
[9]: /dashboards/functions/timeshift
[10]: /dashboards/functions/rate
[11]: /dashboards/functions/smoothing
[12]: /dashboards/functions/rollup
[13]: /dashboards/functions/exclusion
