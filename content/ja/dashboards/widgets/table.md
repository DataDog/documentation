---
title: Table Widget
widget_type: "query_table"
aliases:
- /graphing/widgets/table/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /dashboards/querying/
  tag: Documentation
  text: Learn how to build a graphing query
---

## Overview

The table visualization displays columns of aggregated data grouped by tag key. Use tables to compare values across many groups of data and see trends, changes, and outliers.

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="Table widget with conditional formatting" style="width:100%;">}}

## Setup

### Configuration

1. Choose the data to graph:
    * Metric: See the [Main graphing documentation][1] to configure a metric query.
    * Non-metric data sources: See the [Log search documentation][2] to configure an event query.

2. Add additional columns to the table by using the **+ Add Query** and **+ Add Formula** buttons.

### Options

* Rename column headers by setting aliases, click the **as...** button.
* Configure whether or not the search bar displays. **Auto** is the default and shows the search bar depending on the size of the widget, this means if your screen gets too small, it prioritizes displaying the data on the widget and hides the search bar, but is still available in full-screen mode.

#### Column formatting
Customize the visualization of cell values for each column with Column Formatting Rules. Create color codes for your data to visualize trends and changes.
* Threshold formatting: highlight cells with colors when specific value ranges are met.
* Range formatting: color code cells with a range of values.
* Text formatting: replace cells with alias text values to improve readability.

{{< img src="/dashboards/widgets/table/range_conditional_formatting.png" alt="Widget configuration showing the column formatting options" style="width:90%;" >}}

#### Context links

[Context links][10] are enabled by default, and can be toggled on or off. Context links bridge dashboard widgets with other pages in Datadog, or third party applications.


## N/A values

Columns in the table widget are queried independently from one another. Overlapping groups with matching names are joined realtime to form the rows of the table. As a result of that process, there might be situations with no total overlap, showing N/A cells. To mitigate this:
  * Extend the limit of queries to higher numbers, to maximize overlap between columns
  * Sort tables according to the one column that you could consider as "driving" the insight

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][8] for additional reference.

The dedicated [widget JSON schema definition][9] for the table widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/#configuring-a-graph
[2]: /logs/search_syntax/
[3]: /tracing/trace_explorer/query_syntax/
[4]: /real_user_monitoring/explorer/search_syntax
[5]: /profiler/profile_visualizations
[6]: /security_monitoring/explorer/
[7]: /dashboards/guide/apm-stats-graph
[8]: /api/latest/dashboards/
[9]: /dashboards/graphing_json/widget_json/
[10]: /dashboards/guide/context-links/
[11]: /dashboards/querying/#advanced-graphing
