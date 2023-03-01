---
title: Query Value Widget
kind: documentation
description: "Display an aggregated value for a given metric query"
aliases:
    - /graphing/widgets/query_value/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

Query values display the current value of a given metric, APM, or log query. They come with conditional formatting (such as a green/yellow/red background) to convey whether the value is in the expected range. This can be supplemented with optional backgrounds of timeseries data. The values displayed by a query value do not require an instantaneous measurement.

The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure query.

{{< img src="dashboards/widgets/query_value/query_value1.png" alt="Query value widget" style="width:80%;" >}}

## Setup

{{< img src="dashboards/widgets/query_value/query-value-widget-setup1.png" alt="Query value widget setup" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See the [Querying documentation][1] to configure a metric query.
    * Indexed Spans: See the [Trace search documentation][2] to configure an Indexed Span query.
    * Log Events: See the [Log search documentation][3] to configure a log event query.
2. Reduce the query values to a single value, calculated as the `avg`, `min`, `sum`, `max`, or `last` value of all data points in the specified timeframe.
3. Choose the units and the formatting. Autoformat scales the dashboard for you based on the units.
4. Optionally, configure a conditional format depending on the value displayed.
5. Optionally, overlay a timeseries background:
    * Min to Max: A scale graph from minimum to maximum.
    * Line: A scale graph to include zero (0).
    * Bars: Shows discrete, periodic measurements.

### Options

#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][4] for additional reference.

The dedicated [widget JSON schema definition][5] for the query value widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/#overview
[2]: /tracing/app_analytics/search/#search-bar
[3]: /logs/search_syntax/
[4]: /api/v1/dashboards/
[5]: /dashboards/graphing_json/widget_json/
