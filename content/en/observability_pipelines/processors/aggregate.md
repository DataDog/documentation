---
title: Aggregate Processor
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
    - Only metrics matching the filter are processed.
    - All metrics, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. In the **Mode** dropdown menu, select the aggregation function to use. See the [Modes](#modes) section for details.
1. In the **Interval** field, enter the time window in seconds for aggregating metrics. The maximum value is 60 seconds.

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
