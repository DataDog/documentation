---
title: Monitor History and Evaluation Graphs
disable_toc: false
further_reading:
- link: "monitors/manage/status/"
  tag: "Documentation"
  text: "Learn more about the Monitor Status page"
- link: "monitors/guide/monitor_aggregators/"
  tag: "Documentation"
  text: "Learn more about Monitor aggregators"
---

## Overview

The [Monitor Status page][1] contains two graphs, the History Graph and Evaluation Graph, that provide insight into monitor evaluations. This guide covers:
- [Defining the history graph and evaluation graph](#evaluation-vs-history-graph)
- [Which values the two graphs display](#why-are-the-graphs-different)
- [Replicating the Evaluation Graph result outside of a monitor](#troubleshooting-evaluation-graph-values)


## Evaluation vs. History graph

History Graph
: Shows the raw data points being submitted for the monitor query. The monitor status page uses the same graph widget in notebooks and dashboards.

Evaluation Graph
: Shows results from the raw data points of a metric applied against the user defined alert conditions. This graph's data have been aggregated and reduced due to the evaluation window, so the query results are similar to the query value widget for each data point.

When you submit your raw data points to Datadog for monitoring, this information is visualized in the history graph. For example, you have the following data points over the past 5 minutes: [10, 15, 12, 8, 11]. The history graph shows each value.

{{< img src="monitors/guide/history_and_evaluation_graphs/history_graph_query_config.png" alt="Metric query configuration of the monitor highlighting the section the history graph displays" style="width:100%;" >}}

When you configure your evaluation of the query, this adds another aggregation to the metric values for your monitor to alert on. For example, you configure your monitor to evaluate the average over the past 5 minutes. The evaluation graph shows the value of 11.2 as a single data point.

`(10+15+12+8+11)/5 = 11.2`

{{< img src="monitors/guide/history_and_evaluation_graphs/eval_graph_evaluation_config.png" alt="Evaluation configuration for a metric monitor highlighting the section the evaluation graph displays" style="width:100%;" >}}


## Why are the graphs different?

Typically, the two graphs are not visualizing the same data point values. In addition, multiple other factors can contribute to the differences in the visualization graphs.

### as_count() metrics

Queries with `as_count` metrics in the formula, use a different evaluation path. The evaluation applies any aggregation before the formula. For example if you are using `A / B` and both are using the `as_count` evaluation path, it would be evaluated as: 
```
(1+2+3+4+5) / (10+10+10+10+10) 
```

For more information, see the [as_count() in Monitor Evaluations][2] guide.

### Using formulas

When using formulas, monitors apply the aggregation function for the monitor evaluation on the formula, not the individual queries. This means, if you are using the AVG (`avg by`) aggregation function on your queries, but are using SUM (`sum by`) over the past X minutes in your evaluation configuration, then the edit page/history graph values do not match the values of the evaluation graph. For an example, see the [troubleshooting](#troubleshooting-different-graph-values) section.

### Evaluation delay

When using an evaluation delay, the evaluation graph does not match the timing of the history graph one for one. For example, if you add a 5 minute evaluation delay, you need to look at the data point in the history graph from 5 minutes before to correlate it to the evaluation graph.

### Metric aggregation method

You can see different results depending on the aggregation method you are using in your query and your evaluation aggregation. The History and Edit Page use the aggregation methods from your queries while the Evaluation Graph uses the aggregation method determined by the **Evaluate the** option.

Depending on the aggregation method you are choosing in your monitor setup, this can show a different value compared to what you are seeing on the edit page. For example, if your monitor queries are using AVG but you are looking to alert on the MINIMUM value over the last X minutes/hours, then the evaluation graph shows the MIN value while your history/edit page graphs shows the AVG values. This is because the monitor is alerting on the aggregation method set in the monitor evaluation, not the aggregation method set in the metric query.

## Troubleshooting evaluation graph values

You can visualize what the monitor is evaluating at a specific time point by using a Notebook [Query Value Widget][3]. Take the query in your monitor (with any formulas or functions) and then set your time frame for the graph to your evaluation window. This shows the data as it is aggregated to one single point.

In the following example, take a time frame from the Evaluation graph you want to investigate. Hover over the evaluation graph data point to see the value and the time. For example, you want to investigate why your evaluation graph shows a data point of `0.38` at 10:50:35, when your history graph shows `0.26` around the same time.

To troubleshoot this value you can open the monitor edit page and transfer the monitor configuration to a Notebook Query Value widget.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_monitor_eval_config.png" alt="Example configuration showing metric with a query aggregation of p95 and a monitor evaluation aggregation of p95 over the last 5 minutes" style="width:90%;" >}}

Monitor edit page configuration fields:
- Metric Query **a**: `proc.test_process.cpu.total_pct` p95 by (everything)
- Monitor evaluation aggregation: Evaluate the `percentile (p95)` of the query
- Monitor evaluation window: the `last 5 minutes`

Transfer the same configuration to the Notebook Query Value widget.
1. The widget dropdown should display **Query Value**.
1. Select the timeframe corresponding to the data point you are troubleshooting.
1. Input the metric query from your monitor configuration: `proc.test_process.cpu.total_pct`. Add the metric aggregation `p95 by`.
1. Verify the evaluation matches the monitor evaluation, `percentile (p95)`.
1. Verify the query value matches the evaluation data point in your monitor.

| Configuration                 | Monitor     | Query Value widget |
| -------------                 | ----------- | ------------------ |
| Metric Query                  |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_query.png" alt="Example configuration showing metric with a query aggregation of p95 and a monitor evaluation aggregation of p95 over the last 5 minutes" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_query.png" alt="Query value widget configuration highlighting field that matches the metric query" style="width:100%;" >}}|
| Monitor Aggregation            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_aggregation.png" alt="Example configuration showing metric with a query aggregation of p95 highlighting the monitor evaluation aggregation of p95" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_aggregation.png" alt="Query value widget configuration highlighting field that matches the monitor aggregation" style="width:100%;" >}}|
| Evaluation Window            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_eval_window.png" alt="Example configuration showing metric with a query aggregation of p95 highlighting the monitor evaluation window of last 5 minutes" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_eval_window.png" alt="Query value widget configuration highlighting field that matches the monitor evaluation window" style="width:100%;" >}}|

### Troubleshooting an evaluation graph with formulas

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_eval_graph.png" alt="Evaluation graph showing data point of 9.17 at 13:55:29 on hover" style="width:100%;" >}}

In this example, troubleshoot a value in the monitor evaluation graph with multiple queries and a formula, in a Notebook Query Value widget. On the evaluation graph, hover over the data point you want to investigate, in this example, you want to troubleshoot the evaluation graph value of `9.17` at 13:55:29.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_monitor_config.png" alt="Monitor configuration showing two metric queries and a formula 'a+b', which evaluates the minimum of the query over the last 5 minutes" style="width:80%;" >}}

Monitor edit page configuration fields:
- Metric Query **a**: `proc.test_process.cpu.total_pct` avg by (everything)
- Metric Query **b**: `system.cpu.user` avg by (everything)
- Monitor evaluation aggregation: Evaluate the `min` of the query
- Monitor evaluation window: the `last 5 minutes`

Transfer the same configuration to the Notebook Query Value widget one metric at a time.

**Metric a**
1. The widget dropdown should display **Query Value**.
1. Select the timeframe corresponding to 5 minutes around 13:55:29. In this case, 13:50 - 13:55 (1:50 - 1:55).
1. Input the metric query from your monitor configuration: `proc.test_process.cpu.total_pct`. Add the metric aggregation `avg`.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_a.png" alt="Query value widget showing a metric with the avg aggregation" style="width:80%;" >}}

**Metric b**
1. The widget dropdown should display **Query Value**.
1. Select the timeframe corresponding to 5 minutes around 13:55:29. In this case, 13:50 - 13:55 (1:50 - 1:55).
1. Input the metric query from your monitor configuration: `system.cpu.user`. Add the metric aggregation `avg`.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_b.png" alt="Query value widget showing a metric with the avg aggregation" style="width:80%;" >}}

The monitor evaluation `Min` takes the minimum value of the queries over the past 5 minutes.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_formulas_multi_query.png" alt="Query value widget showing two queries each with an avg metric aggregation, and a min evaluation aggregation" style="width:80%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/status
[2]: /monitors/guide/as-count-in-monitor-evaluations/
[3]: /dashboards/widgets/query_value/
