---
title: Metrics Types
kind: documentation
aliases:
 - /developers/metrics/counts/
 - /developers/metrics/distributions/
 - /developers/metrics/gauges/
 - /developers/metrics/histograms/
 - /developers/metrics/rates/
 - /developers/metrics/sets/
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

The "Datadog in-app type" affects how a given metric is interpreted in query results and graph visualizations across the application. This type is visible and can be changed on the [metric summary page][1]. Be aware that changing the metric type may render historical data nonsensical.

There are three metric types in the Datadog web application (though one is deprecated):

* COUNT
* GAUGE
* RATE

A metric's type is stored as metrics metadata and is used to determine how a metric is interpreted throughout the application by determining default time aggregation function and `as_rate()`/`as_count()` behavior. The `as_count()` and `as_rate()` modifiers behave differently for different web application metric types.

## Metric type definition.

To better understand the different metrics types, what they represent, and how to manipulate them within Datadog, let's start with an example:

You have two web servers `web_1` and `web_2`. Each one of them deals with HTTP requests over time.

They both receive:

  * 1 request per second for 10 seconds
  * 2 requests per second for 10 seconds
  * 0 request for 10 seconds

{{< tabs >}}
{{% tab "Count" %}}

**Metrics of type `Count` are used to count things over a period of time (usually _per second_).**

For instance let's say the `number.of.requests` metrics is reported every 10 seconds to Datadog with the `count` type for `web_1`.

Each data point represents the number of requests received during the 10 second interval. The metric has then the following shape:

* `10` for the first 10 seconds
* `20` for the second interval of 10 seconds
* `0` for the last interval of 10 seconds

Note: StatsD counters can show a decimal value within Datadog since they are normalized over the flush interval to report a per-second units.

{{% /tab %}}
{{% tab "Gauge" %}}

**Gauges measure the value of a particular thing over time. It's a snapshot of a value associated with a timestamp.**

For instance let's say the `number.of.requests` metrics is reported every 10 seconds to Datadog with the `gauge` type for `web_1`.

Each data point represent the overall amount of requests received at a point in time. The metric has then the following shape:

* `10` for the first 10 seconds
* `30` for the second interval of 10 seconds
* `30` for the last interval of 10 seconds

{{% /tab %}}
{{% tab "Rate" %}}

**Rates represent the derivative of a metric: the value variation of a metric on a defined time interval.**

For instance let's say the `number.of.requests` metrics is reported every 10 seconds to Datadog with the `gauge` type for `web_1`.

Each data point represent the "rate" of requests. The metric has then the following shape:

* `1` for the first 10 seconds
* `2` for the second interval of 10 seconds
* `0` for the last interval of 10 seconds

{{% /tab %}}

{{% tab "Distribution" %}}

<div class="alert alert-warning">
This feature is in beta. <a href="https://docs.datadoghq.com/help/">Contact Datadog support</a> to enable distribution metrics for your account.
</div>

Distributions are a metric type that aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure. Distribution metrics are designed to instrument logical objects, like services, independently from the underlying hosts, and solve the problem created by Agent-level aggregation.

Unlike the histogram metric type that aggregates on the Agent-side, distributions send all raw data collected during the flush interval, and aggregations occur server-side. Because the underlying data structure has not been aggregated and represents raw data, distributions provide two major features:

* Calculation of percentile aggregations
* Customization of tagging

For instance let's say the `request.response_time` metrics is reported to Datadog with the `distribution` type for `web_1` and `web_2`

Say host `web_1` reports a metric with the values [1,1,1,2,2,2,3,3] and host `web_2` reports the same metric with the values [1,1,2] during a flush interval.

Here, the p50 (median) for `web_1` is 2 and the p50 for `web_2` is 1.  Aggregating by the average value server-side would result in 1.5.

In reality, the global p50 (median) is the median of the combined set: [1,1,1,1,1,2,2,2,2,3,3] which is 2. This is the statistically accurate value that can be returned by a distribution metric.

### Calculation of percentile aggregations

Like other metric types, such as `gauge` or `histogram`, the  `distribution` metric type has the following aggregations available: `count`, `min`, `max`, `sum`, `avg`. A distribution metric is initially tagged the same way as other metrics (with custom tags set in the code) and are resolved to any host tag based on the host that reported the metric.

A distribution metric, however, has additional percentile aggregations available (`p50`, `p75`, `p90`, `p95`, `p99`). That is, for a distribution metric with percentile aggregations during a 10 second flush interval, the following aggregations are available: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, and `p99`.

Percentile aggregations can be added in-app at the [Datadog Distribution Metric page][1].

### Customization of tagging

This functionality allows you to control tagging for metrics where host-level granularity is not necessary. See the [Distribution Metric page][1] to learn more about whitelist-based tagging control. **Note**: The exclusion of tags with `!` is not accepted with this feature.

[1]: /graphing/metrics/distributions
{{% /tab %}}
{{% tab "Histogram" %}}

Histograms measure the statistical distribution of a set of values. Datadog histogram are extensions on the [StatsD timing metric][1]: they aggregate the values that are sent during the flush interval (usually defaults to 10 seconds) and produces different metric reprensenting the different aggregation possible for the set of value.

**Note**: Depending of the aggregation, the metric type stored by Datadog is different.

For example: if you send `X` values for a metric `<METRIC_NAME>` during the flush interval, a Datadog histogram gives you the aggregation of those values for the flush interval, i.e.:

| Aggregation                  | Description                                                                     | Datadog Metric Type |
| ---------                    | ---------                                                                       | ----------          |
| `<METRIC_NAME>.avg`          | Gives you the average of those `X` values during the flush interval.            | Gauge               |
| `<METRIC_NAME>.count`        | Gives you the count of the values `X` sent during the flush interval.           | Rate                |
| `<METRIC_NAME>.median`       | Gives you the median of those `X` values in the flush interval.                 | Gauge               |
| `<METRIC_NAME>.95percentile` | Gives you the 95th percentile of those `X` values in the flush interval.        | Gauge               |
| `<METRIC_NAME>.max`          | Gives you the maximum value of those `X` values sent during the flush interval. | Gauge               |
| `<METRIC_NAME>.min`          | Gives you the minimum value of those `X` sent during the flush interval.        | Gauge               |
| `<METRIC_NAME>.sum`          | Gives you the sum of all `X` values sent during the flush interval.             | Gauge               |

Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][2].
By default only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog.

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Set" %}}

**Sets are used to count the number of unique elements in a group.**

{{% /tab %}}
{{< /tabs >}}

## Submission types and Datadog in-app types

Datadog accepts metrics submitted from a variety of sources:

* [Datadog API][2]
* [DogStatsD][3]
* [Agent Check][4]

and as a result the "submission type" does not always map exactly to the Datadog in-app type:

| Submission Source   | Submission Method (python)           | Submission Type   | Datadog In-App Type |
| ------------------- | ------------------------------------ | ----------------- | ------------------- |
| [API][5]            | `api.Metric.send(type="count", ...)` | COUNT             | COUNT               |
| [API][5]            | `api.Metric.send(type="gauge", ...)` | GAUGE             | GAUGE               |
| [API][5]            | `api.Metric.send(type="rate", ...)`  | RATE              | RATE                |
| [DogStatsD][6]      | `dog.gauge(...)`                     | GAUGE             | GAUGE               |
| [DogStatsD][7]      | `dog.distribution(...)`              | DISTRIBUTION      | GAUGE, COUNT        |
| [DogStatsD][8]      | `dog.count(...)`                     | COUNT             | RATE                |
| [DogStatsD][8]      | `dog.increment(...)`                 | COUNT             | RATE                |
| [DogStatsD][8]      | `dog.decrement(...)`                 | COUNT             | RATE                |
| [DogStatsD][9]      | `dog.set(...)`                       | SET               | GAUGE               |
| [DogStatsD][10]     | `dog.histogram(...)`                 | HISTOGRAM         | GAUGE, RATE         |
| [Agent check][11]   | `self.count(...)`                    | COUNT             | COUNT               |
| [Agent check][12]   | `self.increment(...)`                | COUNT             | RATE                |
| [Agent check][12]   | `self.decrement(...)`                | COUNT             | RATE                |
| [Agent check][13]   | `self.monotonic_count(...)`          | COUNT             | COUNT               |
| [Agent check][14]   | `self.gauge(...)`                    | GAUGE             | GAUGE               |
| [Agent check][15]   | `self.histogram(...)`                | HISTOGRAM         | GAUGE, RATE         |
| [Agent check][16]   | `self.rate(...)`                     | RATE              | GAUGE               |
| [Agent check][17]   | `self.set(...)`                      | SET               | GAUGE               |

[1]: /graphing/metrics/summary
[2]: /api/?lang=python#post-timeseries-points
[3]: /developers/metrics/dogstatsd_metrics_submission
[4]: /developers/metrics/agent_metrics_submission
[5]: /api/?lang=python#post-timeseries-points
[6]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[7]: /developers/metrics/dogstatsd_metrics_submission/#distribution
[8]: /developers/metrics/dogstatsd_metrics_submission/#count
[9]: /developers/metrics/dogstatsd_metrics_submission/#set
[10]: /developers/metrics/dogstatsd_metrics_submission/#histogram
[11]: /developers/metrics/agent_metrics_submission/?tab=count#count
[12]: /developers/metrics/agent_metrics_submission/?tab=count#increment-decrement
[13]: /developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
[14]: /developers/metrics/agent_metrics_submission/?tab=gauge
[15]: /developers/metrics/agent_metrics_submission/?tab=histogram
[16]: /developers/metrics/agent_metrics_submission/?tab=rate
[17]: /developers/integrations
