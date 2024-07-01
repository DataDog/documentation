---
title: Log Analytics
kind: documentation
description: 'Group queried logs into fields, patterns, and transactions, and create multiple search queries, formulas, and functions for in-depth analysis.'
aliases:
    - /logs/explorer/group
    - /logs/group
further_reading:
    - link: logs/explorer/search
      tag: Documentation
      text: Filter logs
    - link: logs/explorer/visualize
      tag: Documentation
      text: Create visualizations from logs
    - link: /logs/explorer/export
      tag: Documentation
      text: Export Log Explorer views
    - link: "https://www.datadoghq.com/blog/add-context-with-reference-tables/"
      tag: Blog
      text: Add more context to your logs with Reference Tables
---

## Overview

Logs can be valuable as individual events, but sometimes valuable information lives in a subset of events. 

{{< whatsnext desc="In order to expose this information, you can group your logs into:" >}}
    {{< nextlink href="logs/explorer/analytics/#group-logs-by-fields" >}}Fields{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/patterns" >}}Patterns{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/transactions" >}}Transactions{{< /nextlink >}}
{{< /whatsnext >}}

Switch between different aggregations of your queried logs with the logs query editor. The fields you select to group, aggregate, and measure your logs are saved as you switch between different visualizations and aggregation types.

{{< img src="logs/explorer/aggregations.jpg" alt="A bar graph displaying logs and the option to group into fields, patterns, and transactions" style="width:100%;" >}}

You can add [multiple queries](#multiple-queries) to simultaneously analyze different sets of logs, and apply [formulas](#formulas) and [functions](#functions) to your queries for in-depth analysis.

Aggregations are supported for **indexed logs only**. If you need to perform aggregation on non-indexed logs, consider [temporarily disabling exclusion filters][1], generating [log-based metrics][2], and/or running a [rehydration][3] on your archives.

## Group logs by fields

When aggregating indexed logs by **Fields**, all logs matching your query filter are aggregated into groups based on the query search values. 

On top of these aggregates, you can extract the following measures:

- **count of logs** per group
- **count of unique coded values** for a query search value per group (shown in the UI as `count unique of`)
- **statistical operations** (`min`, `max`, `avg`, and `percentiles`) on numerical values of a query search value per group

Individual logs with multiple query search values belong to that many aggregates. For instance, a log with the `team:sre` and the `team:marketplace` tags are counted once in the `team:sre` aggregate and once in the `team:marketplace` aggregate.

### Visualize log groups

The **Fields** aggregation supports one dimension for the [Top List][4] visualization, and up to four dimensions for the [Timeseries][5], [Table][6], [Tree Map][7], and [Pie Chart][8] visualizations. 

When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.

### Multiple queries

Multiple queries are supported in [Timeseries][5] and [Table][6] visualizations. Add multiple queries by clicking on the `+ Add` button next to the query editor. When you add a new query, it is a copy of the last query and its grouping options:

{{< img src="logs/explorer/group/add_multiple_queries.mp4" alt="A user demonstrating how to add multiple queries in the query editor" video=true style="width:100%;" >}}

Select or deselect queries to display in the current visualization by clicking on their letters in the query editor:

{{< img src="logs/explorer/group/select_multiple_queries.jpg" alt="The query editor with two queries, one is labeled A and the other is labeled B" style="width:100%;" >}}

By default, when a new query is added, it is automatically selected to be displayed in the chosen visualization.

Display the timeline for one of your queries by selecting that query in the `Timeline for` dropdown. Scope one of your search queries by selecting that query in the `Use facets with` dropdown and clicking on values in the [Facet Panel][9]. Only the selected query is updated with the chosen facets.

{{< img src="logs/explorer/group/query_selector.jpg" alt="The query editor showing the timeline for selector with dropdown options for query A and query B" style="width:100%;" >}}

### Functions

Functions are supported in all visualizations.

Apply functions to your logs by clicking on the `Fields` aggregation in the query editor. Optionally select a faceted field to apply the function to, then click on the `Σ` icon next to that measure. Select or search for a function to apply to the selected log field.

{{< img src="logs/explorer/group/add_function.mp4" alt="A user demonstrating how to customize a function using the query editor" video=true style="width:100%;" >}}

All functions available for logs in the graphing editor in Dashboards can be applied to logs in the Log Explorer:

- [Arithmetic][10]
- [Interpolation][11]
- [Timeshift][12]
- [Rate][13]
- [Smoothing][14]
- [Rollup][15]
- [Exclusion][16]

Here is an example of how to apply an [Exclusion function][16] to exclude certain values of your logs:

{{< img src="logs/explorer/group/exclusion_function_logs.jpg" alt="A query with the cutoff min exclusion filter set to 100" style="width:100%;" >}}

### Formulas

Apply a formula on one or multiple queries by clicking on the `+ Add` button next to the query editor. In the following example, the formula is used to calculate the ratio of the unique number of `Cart Id` in logs for `Merchant Tier: Enterprise` / `Merchant Tier: Premium` customers:

{{< img src="logs/explorer/group/multiple_query_formula.jpg" alt="The query editor with a formula dividing query A by query B" style="width:100%;" >}}

To apply formulas with multiple queries, all queries must be grouped by the same query search value. In the example above, both queries are grouped by `Webstore Store Name`.

You can apply a function to a formula by clicking on the `Σ` icon. Here is an example of how to apply a [Timeshift function][12] on the proportion of error logs in all logs to compare current data with data from one week before:

{{< img src="logs/explorer/group/timeshift_function_logs.jpg" alt="The query editor showing a formula with the week before timeshift function applied to it" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/indexes/#switch-off-switch-on
[2]: /logs/logs_to_metrics
[3]: /logs/log_configuration/rehydrating/
[4]: /logs/explorer/visualize/#top-list
[5]: /logs/explorer/visualize/#timeseries
[6]: /logs/explorer/visualize/#nested-tables
[7]: /dashboards/widgets/treemap
[8]: /dashboards/widgets/pie_chart
[9]: /logs/explorer/facets/#facet-panel
[10]: /dashboards/functions/arithmetic
[11]: /dashboards/functions/interpolation
[12]: /dashboards/functions/timeshift
[13]: /dashboards/functions/rate
[14]: /dashboards/functions/smoothing
[15]: /dashboards/functions/rollup
[16]: /dashboards/functions/exclusion
