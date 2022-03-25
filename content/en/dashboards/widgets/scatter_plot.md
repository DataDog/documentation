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

{{< img src="dashboards/widgets/scatterplot/scatterplot_setup.png" alt="Scatter Plot Setup" style="width:80%;">}}

### Configuration

1. Select a metric and an aggregation for the X and Y axis.
2. Define the scope for each point of the scatter plot, such as `host`, `service`, `app`, `region`, etc.
3. Optional: enable a color-by tag.
4. Optional: set X and Y axis controls.

## Options

#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the scatter plot widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
