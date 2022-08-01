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

Use the query editor to customize the graph being displayed on the Metrics Explorer page.

You can specify the timeframe in the top right corner of the page.

{{< img src="metrics/explorer/metrics_explorer.png" alt="Metrics Explorer displaying two queries on a bar graph" style="width:80%;" >}}

**Note**: The **Calculate as count where applicable** check box appears for metrics with the `RATE` type.

Metrics that are not reported in the last 24 hours do not appear in the drop down menu. You can add these metrics to your graphs manually by entering the metric name or full query.

### Scope

Define a filtering scope with the **from** text box by selecting or searching for tag values. For example, you can use the **from** text box to filter metric values from a specific host, cluster, environment, or region.

### Grouping

Your queries are displayed together automatically into a single graph. To split a graph into individual graphs per metric, click **Split Graph in Notebook**. For example, you can split a single metric into multiple graphs by host, container, region, or environment.


### Export

Export your graph to a dashboard or notebook with the buttons at the top right.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /notebooks/
[3]: /dashboards/#screenboards
[4]: /dashboards/#timeboards
