---
title: Query Value Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

Query values display the current value of a given metric, APM, or log query. They come with conditional formatting (such as a green/yellow/red background) to convey whether the value is in the expected range.
The values displayed by a query value need not represent an instantaneous measurement.

The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure query.

{{< img src="graphing/widgets/query_value/query_value.png" alt="Query value widget" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/query_value/query_value_setup.png" alt="Query value widget setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See [the main graphing documentation][1] to configure a metric query.
    * APM Events: See [the trace search documentation][2] to configure an APM event query.
    * Log Events: See [the log search documentation][3] to configure a log event query.
2. Choose the units and the formatting. 
3. Optional: configure a conditional format depending on the value displayed.

### Options
#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /tracing/visualization/search/#search-bar
[3]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
