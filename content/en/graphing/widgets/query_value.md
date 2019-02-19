---
title: Query Value Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

Query values display the current value of a given metric query, with conditional formatting (such as a green/yellow/red background) to convey whether or not the value is in the expected range.
The value displayed by a query value need not represent an instantaneous measurement.

The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure.query

{{< img src="graphing/widgets/query_value/query_value.png" alt="Query value widget" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/query_value/query_value_setup.png" alt="Query value widget setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See [the main graphing documentation][1] to configure a metric query.
    * APM Events: See [the trace search documentation][2] to configure an APM event query.
    * Log Events: See [the log search documentation][3] to configure an APM event query.
2. Chose the units and the formating. 
3. Optional - Configure a conditional format depending of the value displayed.

### Options
#### Global time

On Screenboard only, choose whether your widget has a custom timeframe or the global timeframe of the Screenboard.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## FAQ
### What does "Take the X value from the displayed timeframe" mean?

{{< img src="graphing/widgets/query_value_widget.png" alt="query_value_widget" responsive="true" style="width:50%;">}}

The Query Value Widget only displays one value, unlike a timeseries for example, that displays several points.

If you are on a Timeseries and you are currently displaying the past hour, this button allows you to either display the `avg` / `max` / `min` / `sum` / `last value` of ALL points that are rendered during that 1 hour range timeframe—depending on the aggregation chosen above.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /tracing/visualization/search/#search-bar
[3]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
