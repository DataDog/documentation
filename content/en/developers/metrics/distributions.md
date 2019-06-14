---
title: Distributions
kind: documentation
beta: true
further_reading:
- link: "graphing/metrics/distributions"
  tag: "Documentation"
  text: "Learn more about the dedicated UI for distribution metrics"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

<div class="alert alert-warning">
This feature is in beta. <a href="https://docs.datadoghq.com/help/">Contact Datadog support</a> to enable distribution metrics for your account.
</div>

## Overview

The distribution metric type is only available in Agent 6. It represent a type of metric that compiles all values sent from multiple sources or hosts during a flush interval to calculate the statistical distributions across your entire infrastructure.  This can be thought of as a the existing [Histogram metric type][1] but server-side.

Global distributions are designed to instrument logical objects, like services, independently from the underlying hosts and solve the problem a host based aggregation poses. Unlike the histogram metric type that represent a distribution aggregation on the agent-side, global distributions send all raw data collected during the flush interval and their aggregation occurs server-side. Because the underlying data structure has not been aggregated and represents raw data, distributions provide two major features:

* Calculation of percentile aggregations
* Customization of Tagging

### Calculation of percentile aggregations

Percentile aggregations (`p50`, `p75`, `p90`, `p95`, `p99`) are calculated from the raw data across all hosts, and are therefore globally accurate. Because of the compression algorithm Datadog developed for this, you are not required to define an expected range of values for your metric, as is common in percentile implementations.  Percentiles are accurate to within 1% of the value of the actual percentile, no matter how precise. That is, the value measured for a p99 is within 1% of the real value of the p99, not the value that represents the p98-p100. Percentile aggregations cannot be calculated on data that has already been aggregated, which means that Datadog must keep a value for every possible query that a customer can make.  To protect against unwanted timeseries growth, we provide a workflow that allows you to provide a whitelist that represents the queries that you expect to make (see customization of tagging point below).

#### Example

Say host `HOST_1` reports a metric with the values [1,1,1,2,2,2,3,3] and host `HOST_2` reports the same metric with the values [1,1,2] during a flush interval.

Here, the p50 (median) for `HOST_1` is 2 and the p50 for `HOST_2` is 1.  Aggregating by the average value server side would result in 1.5.

In reality, the global p50 (median) is the median of the combined set: [1,1,1,1,1,2,2,2,2,3,3] which is 2, this is what a Distribution metric type would have reported server side.

### Customization of Tagging

This functionality allows you to control metric cardinality for metrics for which host-level granularity is not necessary (e.g. transactions per second for a checkout service).


## Aggregations

Like other metric types, such as `gauge` or `histogram`, `distribution` metric type has the following 5 aggregations available: `count`, `min`, `max`, `sum`, `avg`. A distribution metric is initially tagged the same way as any other metrics (via custom tags set in code) and are resolved to any host tag based on the host that shipped the metric.

A distribution metric, however, also uniquely has additional percentile aggregations available (`p50`, `p75`, `p90`, `p95`, `p99`). That is, for a distribution metric with percentile aggregations during a 10 seconds flush interval, the following aggregation are available:

| Aggregation | Description                                                         |
| -------     | -------                                                             |
| `avg`       | The average of all values in the flush interval.                    |
| `count`     | The count, or amount, of values sent during the flush interval.     |
| `50p`       | The 50th percentile, or median, of all values in the flush interval |
| `75p`       | The 75th percentile of all values in the flush interval             |
| `90p`       | The 90th percentile of all values in the flush interval             |
| `95p`       | The 95th percentile of all values in the flush interval             |
| `99p`       | The 99th percentile of all values in the flush interval             |
| `max`       | The maximum value sent during the flush interval                    |
| `min`       | The minimum value sent during the flush interval                    |
| `sum`       | The sum of all values sent during them flush interval               |

At each flush interval, each one of these values above is stored in their respective metric time series that is sent to Datadog. The 10 time series (avg, count, max, min, sum, p50, p75, p90, p95, p99) above are all considered as custom metrics. You can group and filter these time series the same way you aggregate any other metrics.

## Submission

### DogStatsD

| Method | Overview |
| :----- | :------- |
| `dog.distribution(String metric.name, double value, String... tags)` | Track the statistical distribution of a set of values over one or more hosts. |

#### Example

To measure the duration of an HTTP request from multiple host, measure each request time with the metric `http_request.time` created by the following python code snippet:

```python
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('http_request.time', duration,'env:dev')
```

The above instrumentation calculates the following data: sum, count, average, minimum, maximum, 50th percentile (median), 75th percentile, 90th percentile, 95th percentile and 99th percentile. These metrics give insight into how different each request time is. Taking the median would indicates how long the request usually takes from multiple host. Taking the 95th percentile would then indicates how long most requests take from multiple hosts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /developers/metrics/histograms
