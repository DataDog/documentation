---
title: Table Widget
kind: documentation
widget_type: "query_table"
aliases:
    - /graphing/widgets/table/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

## Overview

The table visualization displays columns of aggregated data grouped by tag key. For example, see `system.cpu.system` and `system.cpu.user` grouped by `service`:

{{< img src="dashboards/widgets/table/table_widget_1.png" alt="Table widget" style="width:80%;">}}

**Note:** Only numerical data is supported for the table widget.

## Setup

### Configuration

1. Choose the data to graph:
    * Metric: See the [Main graphing documentation][1] to configure a metric query.
    * Log Events: See the [Log search documentation][2] to configure a log event query.
    * Indexed Spans: See the [Trace search documentation][3] to configure an indexed span query.
    * RUM Events: See the [RUM search syntax documentation][4] to configure a RUM query.
    * Profiling Metrics: See the [Search profiles documentation][5] to configure a profiling query.
    * Security Signals: See the [Security signals explorer documentation][6] to configure a security signals query.
    * APM Statistics: See the [APM stats documentation][7] to configure an APM stats query.
2. Add additional columns to the table by using the **+ Add Query** and **+ Add Formula** buttons.

### Options
* Rename column headers by setting aliases, click the **as...** button.
* Customize the visualization of cell values for each column with Visual Formatting Rules.
* Configure whether or not the search bar displays. **Auto** is the default and shows the search bar depending on the size of the widget, this means if your screen gets too small, it prioritizes displaying the data on the widget and hides the search bar, but is still available in full-screen mode.
* Customize context links to specify the pages users are directed to. See the [Context Links][10] Guide.
* Apply mathematic functions to your queries. See the [Dashboard Graphing documentation][11].

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
[5]: /profiler/search_profiles
[6]: /security_monitoring/explorer/
[7]: /dashboards/guide/apm-stats-graph
[8]: /api/v1/dashboards/
[9]: /dashboards/graphing_json/widget_json/
[10]: /dashboards/guide/context-links/
[11]: /dashboards/querying/#advanced-graphing
