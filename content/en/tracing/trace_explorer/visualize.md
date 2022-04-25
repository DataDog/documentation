---
title: Span Visualizations
kind: documentation
description: 'View spans in a list, or aggregate spans into timeseries, top lists and more.'
further_reading:
    - link: 'tracing/trace_explorer/'
      tag: 'Documentation'
      text: 'Trace Explorer'
---

## Overview

Visualizations define how the queried span data is displayed. Select the relevant visualizations to surface valuable information, as a **list** of individual events, or as **timeseries** or **top list** aggregates.

## List view

The list view displays the list of spans that match the selected context, defined by the [search bar query][1] filter and a [time range][2].

In the choose which information of interest to display as columns. **Manage the columns** of the table using either:

- The **table**, with interactions available in the header row. This is the preferred method to **sort**, **rearrange**, or **remove** columns.
- The **facet panel** on the left, or the trace side panel after clicking on a specific span. This is the preferred option to **add** a column for a field. You can also add columns from with the **Options** button.

{{< img src="tracing/trace_explorer/visualize/list_view_table_controls.mp4" alt="Configuring the display table" video=true style="width:80%;">}}

{{< site-region region="us,eu,us3,us5,gov" >}}
The default **sort** for spans in the list visualization is by timestamp, with the most recent spans on top. Surface spans with lowest or highest value for a measure first, or sort your spans lexicographically for the unique value of a tag, ordering a column according to that tag.

{{< /site-region >}}

The configuration of the columns is stored alongside other elements of your troubleshooting context in [Saved Views][3].

## Timeseries

Visualize the evolution of a [measure][4] (or a tag unique count of values) over a selected time frame, and (optionally) split by up to three tags.

**Note**: The [Live Explorer][5] (15 minutes) only allows to group by one single dimension.

Aggregated views use additional query options, to define the **measured tag dimension**, the dimensions to **group** the query by, and the **aggregation period**. For instance:

1. Choose to view the `Duration` measure.

    {{< img src="tracing/trace_explorer/visualize/group_by_measured_dimension.png" alt="Measured Dimension"  style="width:100%;">}}

2. Select the aggregation function for the `Duration` measure. Selecting the any measure lets you choose the aggregation function whereas selecting a qualitative attribute displays the unique count.

    {{< img src="tracing/trace_explorer/visualize/group_by_aggregation_function.png" alt="Aggregation Function"  style="width:100%;">}}

3. Group the query by any dimension, for instance `Resource`.

    {{< img src="tracing/trace_explorer/visualize/group_by_dimension.png" alt="Split Dimension"  style="width:100%;">}}

4. Choose to display either the `X` top or bottom values according to the selected tag.

    {{< img src="tracing/trace_explorer/visualize/group_by_top_bottom.png" alt="Top Bottom X values"  style="width:100%;">}}

5. Choose the rollup period, for instance `10min`.

    {{< img src="tracing/trace_explorer/visualize/group_by_rollup_period.png" alt="Rollup Period"  style="width:100%;">}}

The following Trace Explorer timeseries view shows the evolution of the **top 10 resource names** of service **shopist-web-ui** according to the 95th percentile of **Duration** over the past 4 hours.

{{< img src="tracing/trace_explorer/visualize/timeseries_view.png" alt="Timeseries view" style="width:100%;">}}

Choose additional display options for timeseries: the **roll-up interval**, whether you **display** results as **bars** (recommended for counts and unique counts), **lines** (recommended for statistical aggregations) or **areas**, and the **colorset**.

## Top List

Visualize a span count, a tag unique count of values, or a measure split by one tag dimension.

For example, the following top list shows the **top 10 Customers** on a merchant website that experienced an error at checkout over the past day (based on the span count).

{{< img src="tracing/trace_explorer/visualize/top_list_view.png" alt="Top list view" style="width:100%;">}}

## Table

Visualize the top values from up to three dimension combinations according to a chosen measure or span count.

**Note**: A table visualization grouped by a single dimension is the same as a Top List, just with a different display.

The following table shows the error spans count by **Env**, **Service** and **Error Type**.

{{< img src="tracing/trace_explorer/visualize/table_view.png" alt="Table view" style="width:100%;">}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/query_syntax/#search-syntax
[2]: /tracing/trace_explorer/query_syntax/#time-range
[3]: /tracing/trace_explorer/saved_views
[4]: /tracing/trace_explorer/facets/#quantitative-facets-measures
[5]: /tracing/trace_explorer/?tab=timeseriesview#live-search-for-15-minutes
