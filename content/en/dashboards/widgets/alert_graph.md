---
title: Alert Graph Widget
kind: documentation
widget_type: alert_graph
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

This widget is supported in default scheduled query alert monitors such as metric, anomaly, outlier, forecast, APM, and integration.

## Setup

### Configuration

1. Choose a previously created monitor to graph.
2. Select a timeframe.
3. Select your visualization:
    * Timeseries
    * Top list

## API

This widget can be used with the **[Dashboards API][1]**. See the following table for the [widget JSON schema definition][2]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /dashboards/graphing_json/widget_json/
