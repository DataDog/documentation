---
title: Metrics Explorer
kind: documentation
description: "Explore all of your metrics and perform analytics."
aliases:
  - /graphing/metrics/explorer/
further_reading:
  - link: "/metrics/summary/"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "/metrics/distributions/"
    tag: "Documentation"
    text: "Metrics Distributions"
---

## Overview

The [Metrics Explorer][1] is a basic interface for examining your metrics in Datadog. For more advanced options, create a [notebook][2] or dashboard ([screenboard][3], or [timeboard][4]).

## Graphing

Click on the **Graph** text box to see a list of metrics you have submitted to Datadog within the last 24 hours. Begin by typing in the text box to filter the metrics, then click a metric to select it. Each metric you select creates a real-time graph visualization on the right side of the page.

Above your graphs, you can specify the timeframe and graph size.

{{< img src="metrics/explorer/graphs.png" alt="Metrics Explorer" style="width:80%;" >}}

**Note**: The **Calculate as count where applicable** check box appears for metrics with the `RATE` type.

Metrics that are not reported in the last 24 hours do not appear in the drop down menu. You can add these metrics to your graphs manually by entering the metric name or full query. 

### Scope

Define a filtering scope with the **Over** text box by selecting or searching for tag values. For example, you can use the **Over** text box to filter metric values from a specific host, cluster, environment, region, etc.

### Grouping

Define the grouping with the **One graph per** text box by selecting or searching for tag keys. For example, you can split a single metric into multiple graphs by host, container, region, environment, etc. Metrics tagged with the `<KEY>:<VALUE>` format can be grouped.

### Space aggregation

Define the [space aggregation][5] used to combine a metric's values with the **On each graph, aggregate with the** text box. The possible options are:

* Average of reported values (default)
* Max of reported values
* Min of reported values
* Sum of reported values

**Note**: The options may differ based on the metric type selected.

### Options

You can update the following options for the metrics explorer:

* Prefix graph titles with `<VALUE>`: The default is blank.
* Show up to `<NUMBER>` graphs at a time: The default is 20.

### Export

Export all graphs to a new or existing timeboard with the buttons at the bottom left. Individual graphs can be exported by clicking the export icon on the top right of each graph.

### Snapshot

Create a snapshot of an individual graph by using the share icon in the upper right. Clicking on the icon displays a dropdown menu with the **Send snapshot...** option.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /notebooks/
[3]: /dashboards/#screenboards
[4]: /dashboards/#timeboards
[5]: /metrics/introduction/#space-aggregation
