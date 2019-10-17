---
title: Metrics Types
kind: documentation
disable_toc: true
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
  text: "Official and Community created API and DogStatsD client libraries"
---

A metric's type affects how a given metric is interpreted in query results and graph visualizations within Datadog, by determining default time aggregation functions and the impact of [Metric Type modifiers][1]. This type is visible and can be changed on the [Metric Summary page][2]. Note that changing the metric type may render historical data nonsensical.

There are three metric types within the Datadog web application:

* `COUNT`
* `RATE`
* `GAUGE`

But the following metric submission types are accepted:

* [COUNT](?tab=count#metric-type-definition)
* [RATE](?tab=rate#metric-type-definition)
* [GAUGE](?tab=gauge#metric-type-definition)
* [HISTOGRAM](?tab=histogram#metric-type-definition)
* [DISTRIBUTION](?tab=distribution#metric-type-definition)
* [SET](?tab=set#metric-type-definition)
* [TIMERS](?tab=timers#metric-type-definition)


Choosing a submission metric type depends on your use case and how your application is designed:

* If you want to count states, you would use a `GAUGE` type. For instance, if you want to track the number of healthy nodes accross your infrastructure.
* If you want to count events, you would use a `COUNT` or a `RATE` type. For instance, if you want to track the number of requests hitting your webservers.
* If you want to combine multiple sources of submission, you would use a `HISTOGRAM` or a `DISTRIBUTION` type. For instance, if you want to track the 99 percentile response time of different hosts for a given service

Refer to the [Metric Type Definition](#metric-type-definition) section below to learn more about the different metrics types available. Also, refer to the [Submission Types and Datadog In-App Types Section](#submission-types-and-datadog-in-app-types) to see how each metric type behaves between its submission and its storage within Datadog.

## Metric type definition

To better understand the different metrics types, what they represent, and how to manipulate them within Datadog, consider the following example:

You have two web servers: `server:web_1` and `server:web_2`. Both deal with HTTP requests over time.

They both receive:

  * 10 requests for the first 30 seconds, then
  * 20 requests for the next 30 seconds, then
  * 0 request for the last 30 seconds.

Then the pattern starts again.

{{< tabs >}}
{{% tab "COUNT" %}}

**The `COUNT` metric type represents an absolute value variation of a metric's value over a defined time interval**, contrary to the `RATE` metric type, which expresses this variation normalized _per second_.

For instance, say that the `number.of.requests.count` metric is reported every 30 seconds to Datadog with the `COUNT` type for `server:web_1`.

Each data point represents the number of requests—the "count" of requests—received during the 30 second interval. The metric then has the following shape:

* `10` for the first 30 seconds
* `20` for the second interval of 30 seconds
* `0` for the last interval of 30 seconds

Then this pattern starts again, since the `COUNT` is the absolute variation of the number of requests:

{{< img src="developers/metrics/metric_types/count_metric.png" alt="Count Metric" responsive="true">}}

Note: StatsD counters can show a decimal value within Datadog, since they are normalized over the flush interval to report units per second.

Discover how to submit count metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]
* [With the Datadog API][3]

**Note**: for a `COUNT` metric, when a `0` value is submitted, `null` is stored within Datadog.

[1]: /developers/metrics/agent_metrics_submission/?tab=count
[2]: /developers/metrics/dogstatsd_metrics_submission/#count
[3]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "RATE" %}}

**The `RATE` metric type represents a normalized per-second variation of a metric's value over a defined time interval**, contrary to the `COUNT` metric type, which represents this variation with an absolute value.

For instance, say that the `number.of.requests.rate` metric is reported every 30 seconds to Datadog with the `RATE` type for `server:web_1`.

Each data point represents the "rate" of requests. The metric then has the following shape:

* `0.33` for the first 30 seconds
* `0.66` for the second interval of 30 seconds
* `0` for the last interval of 30 seconds

Then this pattern starts again, since the `RATE` is the normalized per-second variation of the number of requests:

{{< img src="developers/metrics/metric_types/rate_metric.png" alt="Rate Metric" responsive="true">}}

Discover how to submit rate metrics:

* [With a custom Agent Check][1]
* [With the Datadog API][2]

**Note**: for a `RATE` metric, when a `0` value is submitted, `null` is stored within Datadog.

[1]: /developers/metrics/agent_metrics_submission/?tab=rate
[2]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "GAUGE" %}}

**The `GAUGE` metric type represents the value of a particular thing over time.** It is a snapshot of a value associated with a timestamp.

For instance, say that the `number.of.requests.gauge` metric is reported every 30 seconds to Datadog with the `GAUGE` type for `server:web_1`.

Each data point represents the overall number of requests received at a point in time. The metric then has the following shape:

* `10` for the first 30 seconds
* `30` for the second interval of 30 seconds
* `30` for the last interval of 30 seconds

Then this pattern starts again, but it increases over time since the `GAUGE` metric type keeps track of how many requests have already been received:

{{< img src="developers/metrics/metric_types/gauge_metric.png" alt="Gauge Metric" responsive="true">}}

Discover how to submit gauge metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]
* [With the Datadog API][3]

[1]: /developers/metrics/agent_metrics_submission/?tab=gauge
[2]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[3]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

The `HISTOGRAM` metric type allows you to measure the statistical distribution of a set of values. Datadog's `HISTOGRAM` metric type is an extension of the [StatsD timing metric type][1]: it aggregates the values that are sent during a defined time interval (usually defaults to 10 seconds with the Agent) and produces different timeseries representing the different aggregations possible for the set of values. Depending on the aggregation, the metric type stored by Datadog is different.

For example: if you send `X` values for a `HISTOGRAM` metric `<METRIC_NAME>` during an Agent flush interval, the following timeseries are produced by the Agent by default:

| Aggregation                  | Description                                                                                                                                               | Datadog Metric Type |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `<METRIC_NAME>.avg`          | Gives you the average of those `X` values during the flush interval.                                                                                      | GAUGE               |
| `<METRIC_NAME>.count`        | Gives you the number of points sampled during the interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                |
| `<METRIC_NAME>.median`       | Gives you the median of those `X` values in the flush interval.                                                                                           | GAUGE               |
| `<METRIC_NAME>.95percentile` | Gives you the 95th percentile of those `X` values in the flush interval.                                                                                  | GAUGE               |
| `<METRIC_NAME>.max`          | Gives you the maximum value of those `X` values sent during the flush interval.                                                                           | GAUGE               |


For instance, say that the `request.response_time.histogram` metric is reported to Datadog through an Agent with the `HISTOGRAM` type for `server:web_1` with the values [1,1,1,2,2,2,3,3] during a flush interval. The following metrics would have then be submitted to Datadog over this flush interval:

| Metric Name                                    | Value  | Datadog Metric Type |
|------------------------------------------------|--------|---------------------|
| `request.response_time.histogram.avg`          | `1,88` | GAUGE               |
| `request.response_time.histogram.count`        | `8`    | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |


**Note**:

* Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][2]. By default, only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog. `sum` and `min` are available for addition.
* Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][2]. By default, only the `95pc` percentile is sent out to Datadog.

Discover how to submit histogram metrics:

* [With a custom Agent Check][3]
* [With DogStatsD][4]

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /developers/metrics/agent_metrics_submission/?tab=histogram
[4]: /developers/metrics/dogstatsd_metrics_submission/#histogram
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

<div class="alert alert-warning">
This feature is in beta. <a href="https://docs.datadoghq.com/help/">Contact Datadog support</a> to enable distribution metrics for your account.
</div>

A `DISTRIBUTION` is a metric type that allows you to aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure. `DISTRIBUTION` metrics are designed to instrument logical objects, like services, independently from the underlying hosts, and to solve the problems created by Agent-level aggregation.

Unlike the `HISTOGRAM` metric type, which aggregates on the Agent side during the flush interval, a `DISTRIBUTION` metric sends all the raw data during a flush interval to Datadog, and aggregations occur server-side. Because the underlying data structure represents raw, unaggregated data, distributions provide two major features:

* Calculation of percentile aggregations
* Customization of tagging

For example: if you send `X` values for a `DISTRIBUTION` metric `<METRIC_NAME>` during an interval, the following timeseries are produced within Datadog by default:

| Aggregation                  | Description                                                                                                                                               | Datadog Metric Type |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `<METRIC_NAME>.avg`          | Gives you the average of those `X` values during the flush interval.                                                                                      | GAUGE               |
| `<METRIC_NAME>.count`        | Gives you the number of points sampled during the interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                |
| `<METRIC_NAME>.max`          | Gives you the maximum value of those `X` values sent during the flush interval.                                                                           | GAUGE               |
| `<METRIC_NAME>.min`          | Gives you the minimum value of those `X` sent during the flush interval.                                                                                  | GAUGE               |
| `<METRIC_NAME>.sum`          | Gives you the sum of all `X` values sent during the flush interval.                                                                                       | GAUGE               |

For instance, say that the `request.response_time.distribution` metric is reported to Datadog with the `DISTRIBUTION` type for `server:web_1` and `server:web_2`. Say `server:web_1` reports the metric with the values [1,1,1,2,2,2,3,3], and `server:web_2` reports the same metric with the values [1,1,2] during a flush interval. Over a flush interval this would create the following metrics within Datadog:

| Metric Name                                       | Value  | Datadog Metric Type |
|---------------------------------------------------|--------|---------------------|
| `request.response_time.distribution.avg`          | `1,73` | GAUGE               |
| `request.response_time.distribution.count`        | `11`   | RATE                |
| `request.response_time.distribution.max`          | `3`    | GAUGE               |
| `request.response_time.distribution.min`          | `1`    | GAUGE               |
| `request.response_time.distribution.sum`          | `19`   | GAUGE               |

Discover how to submit distribution metrics [with DogstatsD][1].

### Calculation of percentile aggregations

Like other metric types, such as `GAUGE` or `HISTOGRAM`, the `DISTRIBUTION` metric type has the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distribution metrics are initially tagged the same way as other metrics (with custom tags set in the code) and are resolved to any host tag based on the host that reported the metric.

A distribution metrics also have additional percentile aggregations available (`p50`, `p75`, `p90`, `p95`, `p99`). That is, for a distribution metric with percentile aggregations during a 10 second flush interval, the following aggregations are available: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, and `p99`.

If you were to add percentile aggregations to your distribution metric (as shown in-app [Datadog Distribution Metric page][2]), the following timeseries would be additionally created:

| Metric Name                                       | Value  | Datadog Metric Type |
|---------------------------------------------------|--------|---------------------|
| `request.response_time.distribution.p50`          | `2 `   | GAUGE               |
| `request.response_time.distribution.p75`          | `2`    | GAUGE               |
| `request.response_time.distribution.p90`          | `3`    | GAUGE               |
| `request.response_time.distribution.p95`          | `3`    | GAUGE               |
| `request.response_time.distribution.p99`          | `3`    | GAUGE               |

**Note**: In the example above, the p50 (median) for `server:web_1` is `2` and the p50 for `server:web_2` is `1`. Aggregating by the average value server-side would result in `1.5`. In reality, the global p50 (median) is the median of the combined set [1,1,1,1,1,2,2,2,2,3,3], which is `2`. This is the statistically accurate value that can be returned by a distribution metric.


### Customization of tagging

This functionality allows you to control tagging for metrics where host-level granularity is not necessary. See the [Distribution Metric page][2] to learn more about whitelist-based tagging control. **Note**: The exclusion of tags with `!` is not accepted with this feature.

[1]: /developers/metrics/dogstatsd_metrics_submission/#distribution
[2]: /graphing/metrics/distributions
{{% /tab %}}
{{% tab "SET" %}}

**The `SET` metric type counts the number of unique occurrences of events over a period of time.**

Discover how to submit set metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]

[1]: /developers/metrics/agent_metrics_submission/?tab=set
[2]: /developers/metrics/dogstatsd_metrics_submission/#set
{{% /tab %}}
{{% tab "TIMER" %}}

**The `TIMER` metric type is an implementation of the `HISTOGRAM` metric type within DogStatsD** (not to be confused with timers in the standard StatsD). It measures timing data only: for example, the amount of time a section of code takes to execute, or how long it takes to fully render a page. See the [TIMER DogStatsD documentation][1] to learn how to instrument your code to submit `TIMER`s.

[1]: /developers/metrics/dogstatsd_metrics_submission/#timers
{{% /tab %}}
{{< /tabs >}}

## Submission types and Datadog in-app types

Datadog accepts metrics submitted from a variety of sources:

* [Datadog API][3]
* [DogStatsD][4]
* [Agent Check][5]

Each source has its own limitations, and metric submission types do not always map exactly to the Datadog in-app stored types:

| Submission Source | Submission Method (python)           | Submission Type | Datadog In-App Type |
|-------------------|--------------------------------------|-----------------|---------------------|
| [API][6]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [API][6]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [API][6]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                |
| [DogStatsD][7]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |
| [DogStatsD][8]    | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE, COUNT        |
| [DogStatsD][9]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][9]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][9]    | `dog.decrement(...)`                 | COUNT           | RATE                |
| [DogStatsD][10]   | `dog.set(...)`                       | SET             | GAUGE               |
| [DogStatsD][11]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][12] | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent check][13] | `self.increment(...)`                | COUNT           | RATE                |
| [Agent check][13] | `self.decrement(...)`                | COUNT           | RATE                |
| [Agent check][14] | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [Agent check][15] | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [Agent check][16] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][17] | `self.rate(...)`                     | RATE            | GAUGE               |
| [Agent check][18] | `self.set(...)`                      | SET             | GAUGE               |

[1]: /developers/metrics/metric_type_modifiers
[2]: /graphing/metrics/summary
[3]: /api/?lang=python#post-timeseries-points
[4]: /developers/metrics/dogstatsd_metrics_submission
[5]: /developers/metrics/agent_metrics_submission
[6]: /api/?lang=python#post-timeseries-points
[7]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[8]: /developers/metrics/dogstatsd_metrics_submission/#distribution
[9]: /developers/metrics/dogstatsd_metrics_submission/#count
[10]: /developers/metrics/dogstatsd_metrics_submission/#set
[11]: /developers/metrics/dogstatsd_metrics_submission/#histogram
[12]: /developers/metrics/agent_metrics_submission/?tab=count#count
[13]: /developers/metrics/agent_metrics_submission/?tab=count#increment-decrement
[14]: /developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
[15]: /developers/metrics/agent_metrics_submission/?tab=gauge
[16]: /developers/metrics/agent_metrics_submission/?tab=histogram
[17]: /developers/metrics/agent_metrics_submission/?tab=rate
[18]: /developers/integrations
