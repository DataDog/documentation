---
title: Aggregate Processor
description: Learn how to use the Aggregate processor to combine multiple metrics with the same tag values into a single sample.
disable_toc: false
products:
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

## Overview

The Aggregate processor combines multiple metrics with the same tag values into a single sample based on the selected aggregation mode. Aggregating metrics can help reduce your metric volume and costs.

## Setup

To set up the Aggregate processor:

1. Define a filter query. See [Metrics Search Syntax][1] for information on creating queries.
    - Metrics that do not match the filter query are sent to the next step in the pipeline.
    - Metrics that match the query are aggregated and the aggregated metrics are sent to the next step in the pipeline.
1. In the **Mode** dropdown menu, select the aggregation function to use. See the [Modes](#modes) section for details.
1. In the **Interval** field, enter the time window in seconds for aggregating metrics. The maximum value is 60 seconds.

### Optional settings

**Use event timestamp** is enabled by default and groups metrics into time windows based on each metric's timestamp. Toggle it off to group metrics by when the Worker processes them. See [Grouping by timestamp](#grouping-by-timestamp) for more information.

If **Use event timestamp** is enabled, in the **Allowed lateness** field, enter the number of seconds a time window accepts late metrics after its end time. Enter `0` to drop all late metrics. See [Late metrics](#late-metrics) for more information.

**Note**: A longer allowed lateness increases memory usage.

## How the processor works

### Grouping by timestamp

When **Use event timestamp** is enabled, the processor groups metrics by each metric's timestamp, not by ingestion time (when the Worker processes the metric).

Event time windows start at fixed times based on the interval. For example, with a 10-second interval, the windows are:

- 12:00:00 to 12:00:10
- 12:00:10 to 12:00:20
- 12:00:20 to 12:00:30, and so on.

A metric with a timestamp of 12:00:07 always goes into the first window, as long as the metric arrives within the grace period.

Grouping metrics by timestamp is useful for destinations that use the metric timestamp as a key. For example, Datadog Metrics overwrites earlier values that have the same timestamp. Grouping metrics by timestamps prevents distinct samples from overwriting one another.

### Late metrics

The **Allowed lateness** grace period starts at a window's end time and is based on the Worker's system clock. After the grace period, the window stops accepting metrics, the aggregated metrics are sent, and the window is permanently closed. Any late metrics for that window are dropped and counted in the `pipelines.component_discarded_events_total` metric. See [Pipeline Usage Metrics][3] for more information.

For example, with a 10-second interval and an allowed lateness of 5 seconds, the 12:00:00 to 12:00:10 window accepts metrics until 12:00:15 on the Worker's system clock. For a metric with a timestamp of 12:00:07:

- If the metric arrives at 12:00:13, it is added to the 12:00:00 to 12:00:10 window.
- If the metric arrives at 12:00:16, it is dropped because the window closed at 12:00:15.

At 12:00:15, the processor sends the aggregated metrics for the 12:00:00 to 12:00:10 window.

## Modes

The Aggregate processor can combine metrics into a single metric based on the following modes. Some modes are available only for specific [metric kinds][2], incremental or absolute.

| Mode   | Description                                                                            | Incremental metrics | Absolute metrics |
| ------ | -------------------------------------------------------------------------------------- | :-----------------: | :--------------: |
| Auto   | Default mode. Sums incremental metrics and uses the latest value for absolute metrics. | {{< X >}}           | {{< X >}}        |
| Sum    | Sums the metric values.                                                                | {{< X >}}           |                  |
| Count  | Counts the number of times the metric is received.                                     | {{< X >}}           | {{< X >}}        |
| Latest | Returns the latest metric value.                                                       |                     | {{< X >}}        |
| Max    | Returns the maximum metric value.                                                      |                     | {{< X >}}        |
| Mean   | Returns the mean metric value.                                                         |                     | {{< X >}}        |
| Min    | Returns the minimum metric value.                                                      |                     | {{< X >}}        |

[1]: /observability_pipelines/search_syntax/metrics/
[2]: /observability_pipelines/configuration/?tab=metrics#metrics-data
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
