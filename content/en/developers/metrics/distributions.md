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

Distributions are a metric type that aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure. Distribution metrics are designed to instrument logical objects, like services, independently from the underlying hosts, and solve the problem created by Agent-level aggregation.

Unlike the histogram metric type that aggregates on the Agent-side, distributions send all raw data collected during the flush interval and aggregations occur server-side. Because the underlying data structure has not been aggregated and represents raw data, distributions provide two major features:

* Calculation of percentile aggregations
* Customization of tagging

#### Example

Say host `HOST_1` reports a metric with the values [1,1,1,2,2,2,3,3] and host `HOST_2` reports the same metric with the values [1,1,2] during a flush interval.

Here, the p50 (median) for `HOST_1` is 2 and the p50 for `HOST_2` is 1.  Aggregating by the average value server-side would result in 1.5.

In reality, the global p50 (median) is the median of the combined set: [1,1,1,1,1,2,2,2,2,3,3] which is 2. This is the statistically accurate value that can be returned by a distribution metric.

### Calculation of percentile aggregations

Like other metric types, such as `gauge` or `histogram`, the  `distribution` metric type has the following aggregations available: `count`, `min`, `max`, `sum`, `avg`. A distribution metric is initially tagged the same way as other metrics (with custom tags set in the code) and are resolved to any host tag based on the host that reported the metric.

A distribution metric, however, has additional percentile aggregations available (`p50`, `p75`, `p90`, `p95`, `p99`). That is, for a distribution metric with percentile aggregations during a 10 second flush interval, the following aggregations are available: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, and `p99`.

Percentile aggregations can be added in-app at the [Datadog Distribution Metric page][1].

### Customization of tagging

This functionality allows you to control tagging for metrics where host-level granularity is not necessary. See the [Distribution Metric page][2] to learn more about whitelist-based tagging control. **Note**: The exclusion of tags with `!` is not accepted with this feature.

## Submission

Different metric types in Datadog should be submitted under different metric names.

### DogStatsD

{{% table responsive="true" %}}

| Method | Overview |
| :----- | :------- |
| `dog.distribution(String metric.name, double value, String... tags)` | Track the statistical distribution of a set of values over one or more hosts. |

#### Example

To measure the duration of an HTTP request, represented by the metric `http_request.time`, use the following python code snippet:

```python
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('http_request.time', duration,'env:dev')
```

The above instrumentation calculates the following aggregations: sum, count, average, minimum, and maximum. For percentiles, refer to the [distributions page] [2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://app.datadoghq.com/metric/distribution_metrics
[2]: /graphing/metrics/distributions/#customize-tagging
