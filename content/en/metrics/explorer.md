---
title: Metrics Explorer
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

Use the query editor to customize the graph displayed on the Metrics Explorer page.

You can specify the time frame in the top right corner of the page. The default is **Past 1 Hour**.

{{< img src="metrics/explorer/metrics_explorer.png" alt="Metrics Explorer displaying two queries on a bar graph" style="width:80%;" >}}

Metrics that are not reported in the last 24 hours do not appear in the query editor. You can add these metrics to your graphs manually by entering the metric name or full query.

### Scope

Define a filtering scope with the **from** text box by selecting or searching for tag values. For example, you can use the **from** text box to filter metric values from a specific host, cluster, environment, or region.

### Space aggregation

Define the [space aggregation][5] used to combine a metric's values.

The possible options are:

* Average of reported values (default)
* Max of reported values
* Min of reported values
* Sum of reported values

**Note**: The options may differ based on the metric type selected.

### Functions and formulas

You can optionally add functions to your query using the function button. Not all functions are available for all metric types. For more information, see the [querying][6] documentation. 

### Export

Export your graph to a dashboard or notebook with the buttons at the top right. You can also use **Split Graph in Notebook** to view the data split into individual graphs by things like region, service, or environment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /notebooks/
[3]: /dashboards/#screenboards
[4]: /dashboards/#timeboards
[5]: /metrics/introduction/#space-aggregation
[6]: https://docs.datadoghq.com/dashboards/querying/#advanced-graphing


