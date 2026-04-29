---
title: Point Plot Widget
description: "Visualize individual events over time to spot anomalies and outliers without aggregation."
widget_type: "pointplot"
aliases:
- /graphing/widgets/point_plot/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/widgets/timeseries/"
  tag: "Documentation"
  text: "Timeseries Widget"
- link: "/dashboards/widgets/scatter_plot/"
  tag: "Documentation"
  text: "Scatter Plot Widget"
---

{{< callout url="#" btn_hidden="true" header="Point Plot is in Preview">}}
  The Point Plot widget is in preview. Contact your account team to learn more.
{{< /callout >}}

A point plot displays one dot per individual event over time, giving you an unaggregated view of your data. Unlike a [Timeseries widget][1], which visualizes trends as averaged or aggregated lines, a point plot surfaces the raw underlying datapoints. Use it to catch the single slow request hidden in an otherwise healthy p95, identify which specific host or service is the outlier, and click directly into that event to investigate.

Point plots are already available in APM Traces, Database Monitoring, and LLM Observability explorers. This widget lets you bring that same view into your own dashboards.

{{< img src="dashboards/widgets/point_plot/point_plot.png" alt="A Point Plot widget showing individual span latency events over time with outliers visible" style="width:100%;" >}}

## Setup

### Configuration

1. Choose a data source. Supported sources include Logs, RUM, Traces, Spans, Database Monitoring, and LLM Observability.
2. Define a query to filter to the events you want to plot.
3. Choose the attribute or measure to display on the y-axis (for example, `duration` for latency or `error_rate` for error tracking).
4. Optional: group events by a tag or attribute (for example, `service`, `host`, or `env`) to color-code dots by group.
5. Give your graph a title or leave the field blank for a suggested title.

### Options

#### Y-axis controls

| Option      | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| Scale       | Set the y-axis scale to **Linear** or **Log** to handle data with wide value ranges. |
| Min / Max   | Pin the y-axis to a fixed range, or leave as **Auto** to fit the data.      |

#### Horizontal markers

Add reference lines to mark thresholds such as SLO targets or alert boundaries. Each marker can have a label and a color.

#### Cross-widget highlighting

When cross-widget highlighting is enabled, hovering over a datapoint highlights the corresponding time range across other compatible widgets on the dashboard.

#### Context links

[Context links][2] are enabled by default and can be toggled on or off. Context links bridge dashboard widgets with other pages in Datadog or third-party applications, so you can pivot from a point plot directly into the relevant trace, log, or query.

#### Global time

Choose whether your widget has a custom time frame or uses the dashboard's global time frame.

## Supported data sources

| Data source        | Example use case                                              |
|--------------------|---------------------------------------------------------------|
| APM Traces / Spans | Per-span latency, error rate by service                       |
| Logs               | Individual log event values over time                         |
| RUM                | Per-session load times, individual action durations           |
| Database Monitoring | Individual query durations to identify slow queries           |
| LLM Observability  | Per-request token counts, latency, or error rates             |

## Use cases

- **Spot outliers hiding in aggregates**: A healthy p95 can mask a single extremely slow request. The point plot surfaces that individual event so you can investigate it directly.
- **Identify the source of anomalies**: Color-code dots by `service`, `host`, or `env` to pinpoint which specific entity is behaving differently.
- **Monitor per-event performance**: Track individual query durations, span latencies, or error rates without aggregation flattening the data.

## API

This widget can be used with the **[Dashboards API][3]**. See the following table for the [widget JSON schema definition][4]:

{{< dashboards-widgets-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/timeseries/
[2]: /dashboards/guide/context-links/
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
