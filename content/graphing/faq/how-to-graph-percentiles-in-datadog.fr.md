---
title: How to graph percentiles in Datadog?
kind: faq
---

## DogStatsD implementation

It's possible to get percentiles in Datadog by submitting data as a histogram metric through DogStatsD. The datadog-agent embeds a [DogStatsD](/developers/dogstatsd) server that receives [DogStatsD](/developers/dogstatsd) packets, [perform data aggregation](https://github.com/DataDog/dd-agent/blob/master/aggregator.py), and send final percentile metrics to Datadog.

Since this aggregation is taken care of on the collection side, this isn't currently available as a graphing function in the GUI.

Out of your histogram data you'll get: 95th percentile, 50th percentile, avg, max, count. 

* A quick [introduction to DogStatsD](/developers/dogstatsd)

* [DogStatsD clients available for each programming language](/developers/libraries/).

### Additional percentiles

Via the "histogram_percentiles" line of the configuration file of the agent, get extra percentiles, e.g.:

* histogram_percentiles: 0.95, 0.75

[More about histogram](developers/metrics/#histograms)

## Local Aggregations

Histograms are computed every 10 seconds on a host per host basis by the datadog-agents. This collection model comes with its advantages and its limitations. 

### Advantages

* Raw datapoints used to compute histogram metrics are not exposed nor relayed to our site.
* Statsd handles the relevant aggregations and submits the calculated data package to our server directly.

### Disadvantages

* If you have two reporting streams of aggregated data, it is not possible today to aggregate across the raw datapoints from both streams, only aggregate across the aggregates.
    * EX: Averaging across METRIC_NAME.Avg for all regions, takes the average stream values for each region and produces an average of averages.

* Making a change to increase tag complexity (adding additional tags to be more specific) leads to changes in the behavior of a rolled up metric visualization
    * EX: Whereas before the change METRIC_NAME.avg (without any tags) would be aggregating across all raw points (statsd takes all the raw datapoints, aggregates it and then ships over a single metric stream), adding a tag like region (US, EU) tag causes statsd to bin raw datapoints into two region bins, aggregate them, and ship over two streams. This means when graphing METRIC_NAME.avg AVG by * means an aggregate across the two streams rather than a single one

[Read more about the Datadog histograms characteristics](/developers/faq/characteristics-of-datadog-histograms)
