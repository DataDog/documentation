---
title: Distributions
kind: documentation
description: Compute global percentiles across your entire dataset.
aliases:
  - /developers/faq/characteristics-of-datadog-histograms/
  - /graphing/metrics/distributions/
further_reading:
  - link: "/metrics/dogstatsd_metrics_submission/"
    tag: "Documentation"
    text: "Using Distributions in DogStatsD"
---
## Overview

Distributions are a metric type that aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure.

Global distributions instrument logical objects, like services, independently from the underlying hosts. Unlike [histograms][1] which aggregate on the Agent-side, global distributions send all raw data collected during the flush interval and the aggregation occurs server-side using Datadog's [DDSketch data structure][2]. 

Distributions provide enhanced query functionality and configuration options that aren’t offered with other metric types (count, rate, gauge, histogram):
* **Calculation of percentile aggregations**: Distributions are stored as DDSketch data structures that represent raw, unaggregated data such that globally accurate percentile aggregations (p50, p75, p90, p95, p99) can be calculated across the raw data from all your hosts. Enabling percentile aggregations can unlock advanced query functionalities such as: 

  * **Single percentile value over any timeframe**:
  
     _“What has the p95 load time for my application been over the past week?”_

  * **Percentile thresholds on metric monitors**:
  
    _“Alert me when the p99 of my application’s request latency is greater than 200 ms for the last 5 min.”_

  * **Threshold Queries for SLOs**:
  
    _“I’d like to define a 30-day SLO where the p95 of request latency is < 5 seconds”_


* **Customization of tagging**: This functionality allows you to control the tagging scheme for custom metrics for which host-level granularity is not necessary (for example, transactions per second for a checkout service).

See the [Developer Tools section][1] for more implementation details. 

**Note:** Because distributions are a new metric type, they should be instrumented under new metric names during submission to Datadog.

## Enabling percentile aggregations

Like other metric types, such as `gauges` or `histograms`, distributions have the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distributions are initially tagged the same way as other metrics, with custom tags set in code. They are then resolved to host tags based on the host that reported the metric. 

However, you can additionally enable the calculation of globally accurate percentile aggregations for all queryable tags on your distribution on the Metrics Summary page. This provides aggregations for `p50`, `p75`, `p90`, `p95`, and `p99` as well as advanced query options like threshold queries for SLOs.

{{< img src="metrics/distributions/percentiles.mp4" alt="Enable Percentiles" video=true style="width:80%;">}}

After electing to apply percentile aggregations on a distribution metric, these aggregations are automatically available in the graphing UI:

{{< img src="metrics/distributions/graph_percentiles.jpg" alt="Distribution metric aggregations" style="width:80%;">}}

You can use percentile aggregations in a variety of other widgets and for alerting: 
* **Single percentile value over any timeframe**

   _“What has the p95 request duration for my application been over the past week?”_ 

{{< img src="metrics/distributions/percentile_QVW.jpg" alt="A query value widget displaying a single value (7.33s) for the p95 aggregation of a single metric" style="width:80%;">}}

* **Percentile thresholds on metric monitors**
  _ “Alert me when the p99 of my application’s request latency is greater than 200 ms for the last 5 min.”_ 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="Percentile threshold being set with a drop down for alert conditions in a monitor " style="width:80%;">}}

### Threshold Queries for SLOs

<div class="alert alert-warning">
Threshold queries are in public beta.
</div>

Enabling DDSketch-calculated globally-accurate percentiles on your distribution metrics unlocks threshold queries for SLOs where you can count the number of raw distribution metric values if they exceed or fall below a numerical threshold. So for example, you can define SLOs for the past 30 days where the p95 request latency is < 10 seconds. 

With threshold queries for distributions with percentiles, you do not need to predefine a threshold value prior to metric submission, and have full flexibility to adjust the threshold value in Datadog.

To use threshold queries: 

1. Enable percentiles on your distribution metric on the Metrics Summary page.
2. Graph your chosen distribution metric using the “count values...” aggregator.
3. Specify a threshold value and comparison operator.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="A timeseries graph being visualized using the count values aggregator, with a threshold of greater than 8 seconds" style="width:80%;" >}}

You can similarly create a metric-based SLO using threshold queries: 
1. Enable percentiles on your distribution metric on the Metrics Summary page.
2. Create a new Metric-Based SLO and define the numerator as the number of "good" events with a query on your chosen distribution metric using the "count values..." aggregator.
3. Specify a threshold value and comparison operator.
{{< img src="metrics/distributions/threshold_SLO.jpg" alt="Threshold Queries for SLOs" style="width:80%;">}}

## Customize tagging

Distributions provide functionality that allows you to control the tagging for custom metrics where host-level granularity does not make sense. Tag configurations are _allowlists_ of the tags you'd like to keep. 

To customize tagging:

1. Click on your custom distribution metric name in the Metrics Summary table to open the metrics details sidepanel.
2. Click the **Manage Tags** button to open the tag configuration modal.
3. Click the **Custom...** tab to customize the tags you'd like to keep available for query. 

**Note**: The exclusion of tags is not supported in the allowlist-based customization of tags. Adding tags starting with `!` is not accepted.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Configuring tags on a distribution with the Manage Tags button" style="width:80%;">}}

## Audit events
Any tag configuration or percentile aggregation changes create an event in the [event stream][3]. This event explains the change and displays the user that made the change.

If you created, updated, or removed a tag configuration on a distribution metric, you can see examples with the following event search:
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

If you added or removed percentile aggregations to a distribution metric, you can see examples with the following event search:
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/stream
