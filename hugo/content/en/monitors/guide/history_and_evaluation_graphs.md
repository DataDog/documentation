---
title: Monitor Evaluated Data and Source Data Graphs
description: "Understand the difference between the Evaluated Data and Source Data graphs on the monitor status page and how to troubleshoot evaluated values."
disable_toc: false
further_reading:
- link: "monitors/status/graphs/"
  tag: "Documentation"
  text: "Learn more about monitor status graphs"
- link: "monitors/guide/monitor_aggregators/"
  tag: "Documentation"
  text: "Learn more about Monitor aggregators"
- link: "monitors/guide/as-count-in-monitor-evaluations/"
  tag: "Guide"
  text: "as_count() in monitor evaluations"
---

## Overview

The [monitor status page][1] includes two graphs, {{< ui >}}Evaluated Data{{< /ui >}} and {{< ui >}}Source Data{{< /ui >}}, that provide insight into monitor evaluations. Use the {{< ui >}}Visualize as{{< /ui >}} selector on the status page to switch between them. This guide covers:
- [What the evaluated data and source data graphs show](#evaluated-data-and-source-data-graphs)
- [Why the two graphs display different values](#why-are-the-graphs-different)
- [Replicating an evaluated datapoint outside of a monitor](#troubleshooting-evaluated-data-values)

**Note**: On the [legacy status page][4], the source data graph is labeled {{< ui >}}History{{< /ui >}} and the evaluated data graph is labeled {{< ui >}}Evaluation Graph{{< /ui >}}.

## Evaluated data and source data graphs

Source data
: Shows the datapoints of the monitor query over time, as they appear in a dashboard or notebook graph. The monitor's evaluation aggregation is not applied.

Evaluated data
: Shows the result of each monitor evaluation. Each datapoint is the query's value aggregated over the evaluation window, using the aggregation method set in the monitor's evaluation settings. These values are recorded at evaluation time, so they are not recomputed from current data.

When you submit your raw datapoints to Datadog for monitoring, this information is visualized in the source data graph. For example, you have the following datapoints over the past 5 minutes: [10, 15, 12, 8, 11]. The source data graph shows each value.

{{< img src="monitors/guide/history_and_evaluation_graphs/history_graph_query_config.png" alt="Metric query configuration of the monitor highlighting the section the source data graph displays" style="width:100%;" >}}

When you configure your evaluation of the query, this adds another aggregation to the metric values for your monitor to alert on. For example, you configure your monitor to evaluate the average over the past 5 minutes. The evaluated data graph shows the value of 11.2 as a single datapoint.

`(10+15+12+8+11)/5 = 11.2`

{{< img src="monitors/guide/history_and_evaluation_graphs/eval_graph_evaluation_config.png" alt="Evaluation configuration for a metric monitor highlighting the section the evaluated data graph displays" style="width:100%;" >}}


## Why are the graphs different?

Typically, the two graphs are not visualizing the same datapoint values. In addition, multiple other factors can contribute to the differences in the visualization graphs.

### as_count() metrics

Queries that use `as_count()` follow a different evaluation path. The monitor applies the time aggregation to each query over the evaluation window first, and then computes the formula. For example, if you are using `A / B` and both queries use `as_count()`, it is evaluated as:
```
(1+2+3+4+5) / (10+10+10+10+10)
```

When a query uses `as_count()`, the evaluation aggregation is always `sum`.

<!-- TODO(DOCS-15561): Confirm with the Monitors team which functions (for example, rate() or per_second()) and formula types change this order of operations, and document the exceptions here or in the as_count() guide. -->

For more information, see the [as_count() in Monitor Evaluations][2] guide.

### Using formulas

When using formulas, monitors apply the aggregation function for the monitor evaluation on the formula, not the individual queries. This means, if you are using the AVG (`avg by`) aggregation function on your queries, but are using SUM over the past X minutes in your evaluation configuration, then the values on the edit page and in the source data graph do not match the values in the evaluated data graph. For an example, see [Troubleshooting evaluated data with formulas](#troubleshooting-evaluated-data-with-formulas).

### Evaluation delay

With an [evaluation delay][5], each datapoint in the evaluated data graph is plotted at its evaluation time, but it covers data from an earlier window. For example, if you add a 5 minute evaluation delay, compare the evaluated datapoint with the source data from 5 minutes earlier.

### Metric aggregation method

You can see different results depending on the aggregation method you are using in your query and your evaluation aggregation. The source data graph and the monitor edit page use the aggregation methods from your queries, while the evaluated data graph uses the aggregation method set in the {{< ui >}}Evaluate the{{< /ui >}} option.

Depending on the aggregation method you are choosing in your monitor setup, this can show a different value compared to what you are seeing on the edit page. For example, if your monitor queries are using AVG but you are looking to alert on the MINIMUM value over the last X minutes/hours, then the evaluated data graph shows the MIN value while the source data graph and edit page show the AVG values. This is because the monitor is alerting on the aggregation method set in the monitor evaluation, not the aggregation method set in the metric query.

If your query uses a percentile aggregation, such as `p95`, the monitor automatically uses the matching `percentile` evaluation aggregation.

## Troubleshooting evaluated data values

You can visualize what the monitor is evaluating at a specific time point by using a Notebook [Query Value Widget][3]. Take the query in your monitor (with any formulas or functions) and then set your time frame for the graph to your evaluation window. This shows the data as it is aggregated to one single point.

The value in the Query Value widget can differ from the evaluated datapoint because of:
- **Evaluation delay**: The evaluation window ends at the evaluation time minus the evaluation delay.
- **Rollup interval**: The monitor and the widget can use different rollup intervals for the same time frame.
- **Late data**: Data that arrives after an evaluation is included in the widget, but was not available to the monitor at evaluation time.

In the following example, take a time frame from the evaluated data graph you want to investigate. Hover over the evaluated datapoint to see the value and the time. For example, you want to investigate why your evaluated data graph shows a datapoint of `0.38` at 10:50:35, when your source data graph shows `0.26` around the same time.

To troubleshoot this value you can open the monitor edit page and transfer the monitor configuration to a Notebook Query Value widget.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_monitor_eval_config.png" alt="Example configuration showing metric with a query aggregation of p95 and a monitor evaluation aggregation of p95 over the last 5 minutes" style="width:90%;" >}}

Monitor edit page configuration fields:
- Metric Query **a**: `proc.test_process.cpu.total_pct` p95 by (everything)
- Monitor evaluation aggregation: Evaluate the `percentile (p95)` of the query
- Monitor evaluation window: the `last 5 minutes`

Transfer the same configuration to the Notebook Query Value widget.
1. The widget dropdown should display {{< ui >}}Query Value{{< /ui >}}.
1. Set the time frame to the evaluation window that ends at the datapoint you are troubleshooting. In this example, 10:45:35 - 10:50:35.
1. Input the metric query from your monitor configuration: `proc.test_process.cpu.total_pct`. Add the metric aggregation `p95 by`.
1. Verify the evaluation matches the monitor evaluation, `percentile (p95)`.
1. Verify the query value matches the evaluated datapoint in your monitor.

| Configuration                 | Monitor     | Query Value widget |
| -------------                 | ----------- | ------------------ |
| Metric Query                  |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_query.png" alt="Example configuration showing metric with a query aggregation of p95 and a monitor evaluation aggregation of p95 over the last 5 minutes" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_query.png" alt="Query value widget configuration highlighting field that matches the metric query" style="width:100%;" >}}|
| Monitor Aggregation            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_aggregation.png" alt="Example configuration showing metric with a query aggregation of p95 highlighting the monitor evaluation aggregation of p95" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_aggregation.png" alt="Query value widget configuration highlighting field that matches the monitor aggregation" style="width:100%;" >}}|
| Evaluation Window            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_eval_window.png" alt="Example configuration showing metric with a query aggregation of p95 highlighting the monitor evaluation window of last 5 minutes" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_eval_window.png" alt="Query value widget configuration highlighting field that matches the monitor evaluation window" style="width:100%;" >}}|

### Troubleshooting evaluated data with formulas

<!-- TODO(DOCS-15561): Confirm this example with the Monitors team. The monitor applies the min evaluation aggregation to the result of a+b over the window, but the widget steps below reduce each query to min before adding them, which computes min(a) + min(b). The time frame should also be the 5 minutes ending at the datapoint (13:50:29 - 13:55:29). Update the steps and screenshots after confirmation. -->

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_eval_graph.png" alt="Evaluated data graph showing datapoint of 9.17 at 13:55:29 on hover" style="width:100%;" >}}

In this example, troubleshoot a value in the monitor's evaluated data graph with multiple queries and a formula, in a Notebook Query Value widget. On the evaluated data graph, hover over the datapoint you want to investigate. In this example, you want to troubleshoot the evaluated value of `9.17` at 13:55:29.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_monitor_config.png" alt="Monitor configuration showing two metric queries and a formula 'a+b', which evaluates the minimum of the query over the last 5 minutes" style="width:80%;" >}}

Monitor edit page configuration fields:
- Metric Query **a**: `proc.test_process.cpu.total_pct` avg by (everything)
- Metric Query **b**: `system.cpu.user` avg by (everything)
- Monitor evaluation aggregation: Evaluate the `min` of the query
- Monitor evaluation window: the `last 5 minutes`

Transfer the same configuration to the Notebook Query Value widget one metric at a time.

**Metric a**
1. The widget dropdown should display {{< ui >}}Query Value{{< /ui >}}.
1. Select the time frame corresponding to 5 minutes around 13:55:29. In this case, 13:50 - 13:55 (1:50 - 1:55).
1. Input the metric query from your monitor configuration: `proc.test_process.cpu.total_pct`. Add the metric aggregation `avg`.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_a.png" alt="Query value widget showing a metric with the avg aggregation" style="width:80%;" >}}

**Metric b**
1. The widget dropdown should display {{< ui >}}Query Value{{< /ui >}}.
1. Select the time frame corresponding to 5 minutes around 13:55:29. In this case, 13:50 - 13:55 (1:50 - 1:55).
1. Input the metric query from your monitor configuration: `system.cpu.user`. Add the metric aggregation `avg`.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_b.png" alt="Query value widget showing a metric with the avg aggregation" style="width:80%;" >}}

The monitor evaluation `Min` takes the minimum value of the queries over the past 5 minutes.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_formulas_multi_query.png" alt="Query value widget showing two queries each with an avg metric aggregation, and a min evaluation aggregation" style="width:80%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/status
[2]: /monitors/guide/as-count-in-monitor-evaluations/
[3]: /dashboards/widgets/query_value/
[4]: /monitors/status/status_legacy/
[5]: /monitors/configuration/#evaluation-delay
