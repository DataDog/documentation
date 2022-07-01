---
title: Alert Graph Widget
kind: documentation
description: "Graph the current status of any monitor defined on your system."
aliases:
    - /graphing/widgets/alert_graph/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

Alert graphs are timeseries graphs showing the current status of most monitors defined on your system:

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="Alert Graph" >}}

This widget is supported for metric, anomaly, outlier, forecast, APM, and integration monitors.

## Setup

{{< img src="dashboards/widgets/alert_graph/alert_graph_setup.png" alt="Alert Graph Setup" style="width:80%;">}}

### Configuration

1. Choose a previously created monitor to graph.
2. Select a timeframe.
3. Select your visualization:
    * Timeseries
    * Top list

### Options

#### Display preference

{{< img src="dashboards/widgets/options/display_preferences.png" alt="Display preferences" style="width:80%;">}}

##### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

##### Legend

Use *Show legend on graph* to toggle the legend display on your widget. Optionally, select the number of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the alert graph widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
