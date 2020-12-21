---
title: Table Widget
kind: documentation
widget_type: "query_table"
aliases:
    - /graphing/widgets/table/
further_reading:
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

## Overview

The table visualization is available on timeboards and screenboards. It displays columns of metrics grouped by tag key. For example, see `system.cpu.system` and `system.cpu.user` grouped by `service`:

{{< img src="dashboards/widgets/table/table_widget.png" alt="Table widget"  style="width:80%;">}}

## Setup

### Configuration

* Choose the data to graph (add additional columns as needed):
  * Metric: See the [main graphing documentation][1] to configure a metric query.
  * Log Events: See the [log search documentation][2] to configure a log event query.
  * Indexed Spans: See the [indexed spans documentation][6] to configure a indexed span query.
  * RUM Events: See the [RUM search syntax documentation][7] to configure a RUM query.
  * Profiling Metrics: See the [search profiles documentation][8] to configure a profiling query.
  * Security Signals: See the [security signals explorer documentation][9] to configure a security signals query.
  * APM Statistics: See the [APM stats documentation][3] to configure an APM stats query.
* You can rename column headers by setting metric aliases.
* For the **Rows**, choose the tag key to **Group by**. The example below displays `service` rows.
* Choose a limit for the number results (defaults to 10).
* Choose a metric for sorting the table (defaults to the first column).
* Optional: 
  * Configure conditional formatting (both **bar/number** and **color**) depending on the cell values for each column.
  * Configure whether or not the search bar displays. **Auto** is the default and shows the search bar depending on the size of the widget, this means if your screen gets too small, it will prioritize displaying the data on the widget and hide the search bar, but will still be available in full-screen mode.

{{< img src="dashboards/widgets/table/table_setup.png" alt="Table setup"  style="width:80%;">}}

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][4] documentation for additional reference.

The dedicated [widget JSON schema definition][5] for the table widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/#configuring-a-graph
[2]: /logs/search_syntax/
[3]: /dashboards/querying/#configuring-an-apm-stats-graph
[4]: /api/v1/dashboards/
[5]: /dashboards/graphing_json/widget_json/
[6]: /tracing/trace_search_and_analytics/query_syntax/
[7]: /real_user_monitoring/explorer/search/#search-syntax
[8]: /tracing/profiler/search_profiles
[9]: /security_monitoring/explorer/
