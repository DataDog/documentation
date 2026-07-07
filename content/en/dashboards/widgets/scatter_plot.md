---
title: Scatter Plot Widget
description: "Graph a chosen scope over two different metrics with their respective aggregations, or plot raw events to inspect individual datapoints"
widget_type: "scatterplot"
aliases:
- /graphing/widgets/scatter_plot/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

A scatter plot identifies a possible relationship between changes observed in two different sets of variables. It provides a visual and statistical means to test the strength of a relationship between two variables. The scatter plot visualization allows you to graph a chosen scope over two different metrics with their respective aggregations. You can also plot raw events to inspect individual datapoints.

{{< img src="dashboards/widgets/scatterplot/scatterplot2.png" alt="A scatter plot widget. The graph shows Visits by Screen Resolution. The X axis displays Screen Width, the Y axis displays Screen Height." >}}

## Setup

### Configuration

1. Select a metric or other dataset, and an aggregation for the X and Y axis.
1. Define the scope for each point of the scatter plot, such as `host`, `service`, `app`, or `region`.
1. Optionally: 
    1. Enable a color-by tag.
    1. Set X and Y axis controls.
    1. Add a legend to view the datapoints in a list.
    1. Configure units as they display on the graph.
    1. Add additional [context links][1], which are enabled by default. Context links bridge dashboard widgets with other pages in Datadog or third-party applications.
1. Choose whether your widget has a custom time frame or the dashboard's global time frame.
1. Give your graph a title or leave the box blank for the suggested title.

## Aggregated and unaggregated data

The scatter plot supports two data modes, which you can switch between using the **Mode** toggle in the graph editor:

- **Aggregated**: Group data by a field and apply an aggregation, such as `avg` or `sum`. Each point represents an aggregated group.
- **Unaggregated**: Plot raw events, where each point represents a single event, such as a log, span, or RUM event. Use this mode to spot outliers and rare clusters that aggregation would otherwise hide, correlate two fields from the same event (for example, whether payload size predicts latency), or plot individual LLM traces.

### Supported data sources for unaggregated mode

You can plot unaggregated data from the following sources:

- Logs
- RUM
- LLM Observability
- Product Analytics
- Spans
- Audit Trail
- Events
- Security Signals
- CI Pipelines
- Network
- Network Device Flows
- Synthetics Test Runs

### Plot unaggregated data

{{< img src="dashboards/widgets/scatterplot/scatterplot-mode-configuration.png" alt="A scatter plot widget's configuration screen that shows the Graph your data section. In the Configure Points subsection, the Mode is set to Unaggregated." >}}

In [Dashboards][4]:

1. Open or create a scatter plot widget on a dashboard.
1. In the graph editor, select a data source that supports raw events.
1. Set **Mode** to **Unaggregated**.
1. Configure the X and Y axes by clicking **Add Measure**.

Individual events appear as points on the graph.

## Navigation

Hover over the scatter plot to display its controls in the top-right corner:

- **Show density**: Overlay density contours that show where datapoints are most concentrated, helping you identify clusters and patterns. After you turn it on, the control changes to **Hide density**.
- **Zoom in** (**+**) and **zoom out** (**-**): Change the zoom level to focus on a region of the data.
- **Reset View**: Return the plot to its default zoom and position.

Click and drag directly on the scatter plot to pan across your data.

The scatter plot automatically labels notable points, such as outliers and maximum values.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/context-links/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
[4]: https://app.datadoghq.com/dashboard/
