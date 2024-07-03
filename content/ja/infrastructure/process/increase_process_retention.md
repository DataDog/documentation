---
aliases:
- /ja/infrastructure/process/generate_process_metrics/
- /ja/processes/processing/process_to_metrics/
- /ja/infrastructure/generate_process_metrics/
description: Generate metrics from processes.
further_reading:
- link: metrics/distributions/
  tag: Documentation
  text: Distribution Metrics
- link: monitors/monitor_types/metric/?tab=threshold
  tag: Documentation
  text: Create a Metrics monitor
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: Blog
  text: Practical tips for rightsizing your Kubernetes workloads
kind: documentation
title: Increase Process Retention
---

## Overview

While Live Processes data is stored for 36 hours, you can generate global and percentile distribution metrics from your processes to monitor your resource consumption long-term. Process-based metrics are stored for 15 months like any other Datadog metric. This can help you:

- Debug past and ongoing infrastructure issues
- Identify trends in the resource consumption of your critical workloads
- Assess the health of your system before and after load or stress tests
- Track the effect of software deployments on the health of your underlying hosts or containers

{{< img src="infrastructure/process/process2metrics_overview_2.png" alt="Generate process-based metrics" style="width:80%;">}}

## Generate a process-based metric

You can generate a new process-based metric directly from queries in the [**Live Processes** page][2], or in the [**Manage Metrics** tab][1], by clicking **+ New Metric**.

### Add a new process-based metric

{{< img src="infrastructure/process/process2metrics_create.png" alt="Create a process-based metric" style="width:80%;">}}

1. **Select tags to filter your query**: The query syntax is the same as for [Live Processes][2]. Only processes matching the scope of your filters are considered for aggregation. Text search filters are supported only on the Live Processes page.
2. **Select the measure you would like to track**: Enter a measure such as `Total CPU %` to aggregate a numeric value and create its corresponding `count`, `min`, `max`, `sum`, and `avg` aggregated metrics.
3. **Add tags to `group by`**: Select tags to be added as dimensions to your metrics, so they can be filtered, aggregated, and compared. By default, metrics generated from processes do not have any tags unless explicitly added. Any tag available for Live Processes queries can be used in this field.
4. **Name your metric**: Fill in the name of your metric. Process-based metrics always have the prefix _proc._ and suffix _[measure_selection]_.
5. **Add percentile aggregations**: Select the _Include percentile aggregations_ checkbox to generate p50, p75, p90, p95, and p99 percentiles. Percentile metrics are also considered customer metrics, and billed accordingly.

You can create multiple metrics using the same query by selecting the **Create Another** checkbox at the bottom of the metric creation modal. When selected, the modal remains open after your metric has been created, with the filters and aggregation groups already filled in.

**Note**: Data points for process-based metrics are generated at ten second intervals. There may be up to a 3-minute delay from the moment the metric is created or updated, to the moment the first data point is reported.

<div class="alert alert-warning">Process-based metrics are considered <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality tags like <code>command</code> and <code>user</code> to avoid impacting your billing.</div>

### Update a process-based metric

{{< img src="infrastructure/process/process2metrics_update.png" alt="Updating distribution metrics" style="width:80%;">}}

After a metric is created, the following fields can be updated:

- Filter query: Add or remove tags from the 'Filter by' field to change the set of matching processes for which metrics are generated.
- Aggregation groups: Add or remove tags from the 'Group by' field to break down your metrics in different ways, or manage their cardinality.
- Percentile selection: Check or uncheck the 'Include percentile aggregations' box to remove or generate percentile metrics.

To change the metric type or name, a new metric must be created.

## Leverage process metrics across the Datadog platform

{{< img src="infrastructure/process/process2metrics_dashboard_widget.png" alt="Graphing process distribution metrics in dashboards" style="width:80%;">}}

Once created, you can use process distribution aggregate and percentile metrics like any other in Datadog. For instance:

- Graph process-based metrics in dashboards and notebooks to track the historical resource consumption of important workloads
- Create threshold or anomaly-based monitors on top of process-based metrics to detect when CPU or RSS memory dips or spikes unexpectedly
- Use [Metric Correlations][4] to contextualize changes in resource consumption against internal and third-party software performance

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/process?view=metrics
[2]: https://app.datadoghq.com/process
[3]: /ja/metrics/custom_metrics/
[4]: /ja/dashboards/correlations/