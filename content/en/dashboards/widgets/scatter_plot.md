---
title: Scatter Plot Widget
description: "Graph a chosen scope over two different metrics with their respective aggregation"
widget_type: "scatterplot"
aliases:
- /graphing/widgets/scatter_plot/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

A scatter plot identifies a possible relationship between changes observed in two different sets of variables. It provides a visual and statistical means to test the strength of a relationship between two variables. The scatter plot visualization allows you to graph a chosen scope over two different metrics with their respective aggregations.

{{< img src="dashboards/widgets/scatterplot/scatterplot2.png" alt="Scatter Plot" >}}

## Setup

### Configuration

1. Select a metric or other data set, and an aggregation for the X and Y axis.
1. Define the scope for each point of the scatter plot, such as `host`, `service`, `app`, or `region`.
1. Optionally: 
    1. Enable a color-by tag.
    1. Set X and Y axis controls.
    1. Add a legend to view the data points in a list.
    1. Configure units as they display on the graph.
    1. Add additional [context links][1], which are enabled by default. Context links bridge dashboard widgets with other pages in Datadog or third party applications.
1. Choose whether your widget has a custom timeframe or the dashboard's global timeframe.
1. Give your graph a title or leave the box blank for the suggested title.

## Navigation

Hover over the scatter plot to display its controls in the top-right corner:

- **Show density**: Overlay density contours that show where datapoints are most concentrated, helping you identify clusters and patterns. After you turn it on, the control changes to **Hide density**.
- **Zoom in** (**+**) and **zoom out** (**-**): Change the zoom level to focus on a region of the data.
- **Reset View**: Return the plot to its default zoom and position.

Click and drag directly on the scatter plot to pan across your data.

The scatter plot automatically labels notable points, such as outliers and maximum values.
<!-- TODO: confirm with PM whether the auto-generated point labels are always on or have a toggle (no control found in the UI). -->

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/context-links/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
