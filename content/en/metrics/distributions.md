---
title: Distributions
kind: documentation
description: Compute global percentiles across your entire dataset.
aliases:
  - /developers/faq/characteristics-of-datadog-histograms/
  - /graphing/metrics/distributions/
further_reading:
  - link: "/developers/metrics/dogstatsd_metrics_submission/"
    tag: "Documentation"
    text: "Using Distributions in DogStatsD"
---
## Overview

Distributions are a metric type that aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure.

Global distributions are designed to instrument logical objects, like services, independently from the underlying hosts. Unlike [histograms][1] which aggregate on the Agent-side, global distributions send all raw data collected during the flush interval and the aggregation occurs server-side. Because the underlying data structure has not been aggregated and represents raw data, distributions provide two major features:

* **Calculation of percentile aggregations**: Percentile aggregations (p50, p75, p90, p95, p99) are calculated from the raw data across all hosts, and are therefore globally accurate.

* **Customization of tagging**: This functionality allows you to control the tagging scheme for custom metrics for which host-level granularity is not necessary (for example, transactions per second for a checkout service).

See the [Developer Tools section][1] for more implementation details. 

**Note:** Because distributions are a new metric type, they should be instrumented under new metric names during submission to Datadog.

## Aggregations

Like other metric types, such as `gauges` or `histograms`, distributions have the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distributions are initially tagged the same way as other metrics (with custom tags set in code) and are resolved to any host tag based on the host that reported the metric. You can also calculate percentile aggregations for all queryable tags on your distribution, specified on the [Metrics Summary][2] page. This provides aggregations for `p50`, `p75`, `p90`, `p95`, and `p99`.

{{< img src="metrics/distributions/percentiles.gif" alt="Enable Percentiles"  style="width:80%;">}}

After electing to apply percentile aggregations on a distribution metric, these aggregations are automatically available in the graphing UI:

{{< img src="metrics/distributions/percentilesgraph.jpg" alt="Distribution metric aggregations"  style="width:80%;">}}

## Customize tagging

Distributions provide functionality that allows you to control the tagging for custom metrics where host-level granularity does not make sense. Tag configurations are _allowlists_ of the tags you'd like to keep. 

To customize tagging:

1. Click on your custom distribution metric name in the Metrics Summary table to open the metrics details sidepanel.
2. Click the **Manage Tags** button to open the tag configuration modal.
3. Click the **Custom...** tab to customize the tags you'd like to keep available for query. 

**Note**: The exclusion of tags is not supported in the allowlist-based customization of tags. Adding tags starting with `!` is not accepted.

{{< img src="metrics/distributions/managetags.png" alt="Configuring tags on a distribution"  style="width:80%;">}}
## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /developers/metrics/types/
[2]: https://app.datadoghq.com/metric/distribution_metrics
