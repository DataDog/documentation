---
title: Scatter Plot Widget
kind: documentation
description: "Graph a chosen scope over two different metrics with their respective aggregation"
widget_type: "scatterplot"
aliases:
    - /graphing/widgets/scatter_plot/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The scatter plot visualization allows you to graph a chosen scope over two different metrics with their respective aggregation:

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="Scatter Plot" >}}

## Setup

### Configuration

1. Select a metric and an aggregation for the X and Y axis.
1. Define the scope for each point of the scatter plot, such as `host`, `service`, `app`, or `region`.
1. Optional: enable a color-by tag.
1. Optional: set X and Y axis controls.
1. Choose whether your widget has a custom timeframe or the dashboard's global timeframe.
1. Give your graph a title or leave the box blank for the suggested title.

### Options

#### Context links

[Context links][1] are enabled by default, and can be toggled on or off. Context links bridge dashboard widgets with other pages in Datadog, or third party applications.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][2] for additional reference.

The dedicated [widget JSON schema definition][3] for the scatter plot widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/context-links/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
