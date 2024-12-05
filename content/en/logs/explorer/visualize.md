---
title: Log Visualizations
description: 'Visualize the outcome of filters and aggregations to put your logs into the right perspective and bubble up decisive information.'
aliases:
    - /logs/visualize
further_reading:
    - link: 'logs/explorer/search'
      tag: 'Documentation'
      text: 'Learn how to filter logs'
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Learn how to group logs'
    - link: '/logs/explorer/export'
      tag: 'Documentation'
      text: 'Export views from the Log Explorer'
---

## Overview

Visualizations define how the outcome of filter and aggregates are displayed. Using the logs query editor, select the relevant visualizations to surface crucial information.

## Lists

Lists are **paginated** results of logs or aggregates. They are valuable when individual results matter, but you have no prior or clear knowledge on what defines a matching result. Lists allow you examine a group of results.

Lists displaying individual logs and lists displaying aggregates of logs have slightly different capabilities.

### List of logs

For a list of individual logs, choose which information of interest to display as columns. **Manage the columns** of the table using either:

- The **table**, with interactions available in the first row. This is the preferred method to **sort**, **rearrange**, or **remove** columns.
- The **facet panel** on the left, or the _log side panel_ on the right. This is the preferred option to **add** a column for a field.

With the **Options** button, control the **number of lines** displayed in the table per log.

{{< img src="logs/explorer/table_controls.mp4" alt="Configuring the display table" video=true style="width:80%;">}}

The default **sort** for logs in the list visualization is by timestamp, with the most recent logs on top. This is the fastest and therefore recommended sorting method for general purposes. Surface logs with lowest or highest value for a measure first, or sort your logs lexicographically for the unique value of facet, ordering a column according to that facet.

**Note**: Although any attributes or tags can be added as a column, sorting your table is most reliable if you [declare a facet][3] beforehand. Non-faceted attributes can be added as columns, but it does not produce reliable sorting.

The configuration of the log table is stored alongside other elements of your troubleshooting context in [Saved Views][1].

### List aggregates of logs

The columns displayed in list of aggregates are columns **derived from the aggregation**.

Results are sorted according to:

- Number of matching events per aggregate for **pattern** aggregation (default to descending: more to less)
- Lexicographic order of the transaction id for **transaction** aggregation (default to ascending: A to Z)

## Timeseries

Visualize the evolution of a single [measure][2] (or a [facet][2] unique count of values) over a selected time frame, and (optionally) split by up to three available [facets][2].

The following Timeseries log analytics shows the evolution of the **top 50 URL Paths** according to the 95th percentile of **duration** over the last 15 minutes.

{{< img src="logs/explorer/timeseries.png" alt="Timeseries example" style="width:90%;">}}

Choose additional display options for timeseries: the **roll-up interval**, whether you **display** results as **bars** (recommended for counts and unique counts), **lines** (recommended for statistical aggregations) or **areas**, and the **colorset**.

## Top list

Visualize the top values from a [facet][2] according to the chosen [measure][2].

For example, the following top list shows the **top 15 Customers** on a merchant website according to the number of **unique sessions** they had over the last day.

{{< img src="logs/explorer/toplists.jpg" alt="Top list example" style="width:90%;">}}

## Nested tables

Visualize the top values from up to three [facets][2] according to a chosen [measure][2] (the first measure you choose in the list), and display the value of additional measures for elements appearing in this table. Update a search query or examine the logs corresponding to either dimension.

- When there are multiple measures, the top or bottom list is determined according to the first measure.
- The subtotal may differ from the actual sum of values in a group, since only a subset (top or bottom) is displayed. Events with a null or empty value for this dimension are not displayed as a sub-group.

**Note**: A table visualization used for one single measure and one single dimension is the same as a Toplist, just with a different display.

The following table log analytics show the evolution of the **Top 10 Availability zones**, and for each Availability Zone the **Top 10 Versions** according to their **number or error logs**, along with the number of unique count of **Hosts** and **Container ID** for each.

{{< img src="logs/explorer/nested_tables.jpg" alt="Table example" style="width:90%;">}}

## Pie chart

A pie chart helps you organize and show data as a percentage of a whole. It is useful when comparing the relationship between different dimensions such as services, users, hosts, countries, etc. within your log data.

The following pie chart shows the percentage breakdown by **service**.

{{< img src="logs/explorer/doc_pie_chart.png" alt="Pie chart example showing percentage breakdown by service" style="width:90%;">}}

## Tree map

A tree map helps you organize and show data as a percentage of a whole in a visually appealing format. Tree maps display data in nested rectangles. Compare different dimensions using both size and colors of the rectangles. You can also select multiple attributes to view a hierarchy of rectangles.

The following tree map shows the percentage breakdown by **service**.

{{< img src="logs/explorer/doc_tree_map.png" alt="Tree map example showing percentage breakdown by service" style="width:90%;">}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/saved_views/
[2]: /logs/search-syntax
[3]: /logs/explorer/facets/
