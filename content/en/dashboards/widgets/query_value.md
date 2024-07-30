---
title: Query Value Widget
widget_type: query_value
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
4. Optionally, configure a conditional format depending on the value displayed. See [Visual Formatting Rules](#visual-formatting-rules) for more examples.
5. Optionally, overlay a timeseries background:
    * Min to Max: A scale graph from minimum to maximum.
    * Line: A scale graph to include zero (0).
    * Bars: Shows discrete, periodic measurements.

### Options

#### Visual formatting rules

<div class="alert alert-info">Visual formatting rules should be based on the metric's raw value. If the metric base unit is in nanoseconds, but the Query Value autoformats to seconds, your conditional rules should be based on nanoseconds.</div>

Customize the background of your Query Value widget with conditional rules. You have the option of adding a background color, font color, or a custom image. With custom images, internal servers must be updated to support cross origin requests to reference internal images.

{{< img src="dashboards/widgets/query_value/visual_formatting_rules_custom_img.png" alt="Query value widget visual formatting rules with custom image background" style="width:90%;" >}}

#### Context links

[Context links][4] are enabled by default, and can be toggled on or off. Context links bridge dashboard widgets with other pages in Datadog, or third party applications.

#### Global time

Choose whether your widget has a custom timeframe or the dashboard's global timeframe.

## API

This widget can be used with the **[Dashboards API][5]**. See the following table for the [widget JSON schema definition][6]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/#overview
[2]: /tracing/trace_explorer/query_syntax/#search-bar
[3]: /logs/search_syntax/
[4]: /dashboards/guide/context-links/
[5]: /api/latest/dashboards/
[6]: /dashboards/graphing_json/widget_json/
