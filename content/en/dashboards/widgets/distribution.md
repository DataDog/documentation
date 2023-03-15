---
title: Distribution Widget
kind: documentation
description: "Graph a metric distribution aggregated across one or several tags."
aliases:
    - /graphing/widgets/distribution/
further_reading:
- link: "https://docs.datadoghq.com/metrics/distributions/"
  tag: "Documentation"
  text: "Distributions"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/graphing_json/widget_json/"
  tag: "Documentation"
  text: "Widget JSON schema"
- link: "/dashboards/graphing_json/request_json/"
  tag: "Documentation"
  text: "Request JSON schema"
- link: "/dashboards/querying/"
  tag: "Documentation"
  text: "Querying"
  
---

The Distribution visualization shows data aggregated across one or several tags, such as *hosts*. Unlike the [heat map][1], a distribution graph's x-axis is quantity rather than time.

This visualization displays only a single query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="/dashboards/widgets/distribution/distribution_fullscreen.png" alt="Distribution graph for JVM heap average by host">}}

## Setup

### Configuration

1. Choose the data to graph.The Distribution visualization supports metrics, live processes, APM request latency, log events, and RUM events. 
**Note**: This visualization type is useful only when data is aggregated across tag keys, such as for each `host`.
1. Make a selection in the "`avg`/`max`/`min`/`sum by`/etc." control to see your data across the associated tags.
1. Customize your graph with the available options.

### Options

#### Percentile markers

With APM request distributions, you can add percentiles markers on the x-axis.

{{< img src="dashboards/widgets/options/distribution_marker_controls.jpg" alt="Marker control preferences" style="width:80%;">}}

#### X-axis and Y-axis controls

Axis controls are available through the UI and the JSON editor. 

They allow you to:

* Clip the x and y-axes to specific ranges.
* Automatically change x-axis bounds based on a percentage or an absolute value threshold. This threshold can be applied to one or both ends of the graph (lower and upper) in order to remove "outlier" bins.
* Change the y-axis scale from linear to log.

{{< img src="dashboards/widgets/options/distribution_axis_controls.jpg" alt="Distribution axis control preferences" style="width:80%;">}}

### Full screen

In addition to the [standard full screen options][2], you can use x-axis controls to zoom in to a specific percentile.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][3] for additional reference.

The dedicated [widget JSON schema definition][4] for the distribution widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/heat_map/
[2]: /dashboards/widgets/#full-screen
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
