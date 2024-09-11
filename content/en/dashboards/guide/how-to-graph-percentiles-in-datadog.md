---
title: How to graph percentiles in Datadog?
aliases:
  - /graphing/faq/how-to-graph-percentiles-in-datadog
  - /graphing/guide/how-to-graph-percentiles-in-datadog
---

## DogStatsD implementation

It's possible to get percentiles in Datadog by submitting data as a histogram metric through DogStatsD. The Agent embeds a [DogStatsD][1] server that receives [DogStatsD][1] packets, [perform data aggregation][2], and send final percentile metrics to Datadog.

Since this aggregation is taken care of on the collection side, this isn't available as a graphing function in the GUI.

Out of the histogram data, you get: 95th percentile, 50th percentile, avg, max, count.

* A quick [introduction to DogStatsD][1]

* [DogStatsD clients available for each programming language][3].

### Additional percentiles

Through the "histogram_percentiles" line of the configuration file of the Agent, get extra percentiles, such as:

* histogram_percentiles: 0.95, 0.75

[More about histogram][4]

## Local aggregations

Histograms are computed every 10 seconds on a host per host basis by the Datadog Agent. This collection model comes with its advantages and its limitations.

### Advantages

* Raw datapoints used to compute histogram metrics are not exposed nor relayed to the Datadog site.
* StatsD handles the relevant aggregations and submits the calculated data package to the Datadog server directly.

### Disadvantages

* If you have two reporting streams of aggregated data, it is not possible today to aggregate across the raw datapoints from both streams, only aggregate across the aggregates.
    * EX: Averaging across `<METRIC_NAME>.avg` for all regions, takes the average stream values for each region and produces an average of averages.

* Making a change to increase tag complexity (adding additional tags to be more specific) leads to changes in the behavior of a rolled up metric visualization
    * EX: Whereas before the change `<METRIC_NAME>.avg` (without any tags) would be aggregating across all raw points (StatsD takes all the raw datapoints, aggregates it and then ships over a single metric stream), adding a tag like region (US, EU) tag causes StatsD to bin raw datapoints into two region bins, aggregate them, and ship over two streams. This means when graphing `<METRIC_NAME>.avg` AVG by * means an aggregate across the two streams rather than a single one.

[Read more about the Datadog histograms characteristics][5]

[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[3]: /developers/community/libraries/
[4]: /metrics/types/?tab=histogram#metric-types
[5]: /developers/faq/characteristics-of-datadog-histograms/
