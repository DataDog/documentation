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

Each metric submitted to Datadog has a “Metric Type.” This Metric Type affects how [Metric Type modifiers][1] and functions interact with data when queried and graphed, and can affect how the data is handled when ingested via the Agent and DogstatsD.

A metric's type can be viewed on the details sidepanel on the [Metrics Summary page][2]. It is updated (i.e. modified) when Datadog receives that data for that metric with a different type than it had previously, or when modified in the Metric Summary page. Modifying metric type *can* change how functions and modifiers interact with your data, potentially affecting graphs and monitors - it should be done deliberately and with care, and only if necessary.

## Metric Types: Storage vs. Submission

Datadog accepts a wide range of **Metric Submission Types**:

* [COUNT](?tab=count#metric-type-definition)
* [RATE](?tab=rate#metric-type-definition)
* [GAUGE](?tab=gauge#metric-type-definition)
* [HISTOGRAM](?tab=histogram#metric-type-definition)
* [DISTRIBUTION](?tab=distribution#metric-type-definition)
* [SET](?tab=set#metric-type-definition)
* [TIMERS](?tab=timers#metric-type-definition)

When we receive data, we map the submitted metric type to one of three in-app **Metric Types**. Datadog stores metric data under a few canonical types:

* `COUNT`
* `RATE`
* `GAUGE`

We'll go into detail about this mapping after discussing the types themselves.

## Submission Method

Data is submitted to Datadog in three main ways:

* [Agent Check][5]
* [DogStatsD][4]
* [Datadog API][3]

Most data we receive arrives via the Agent. For data submitted through an Agent Check, or via DogstatsD, aggregation will occur when multiple points arrive in a short timeframe (i.e., in one interval). The Agent will combine values that belong in the same time series (i.e. those with identical tags) together before sending a single representative value to Datadog for that interval. This combined value is what we then store, with a single timestamp. How this occurs varies by Metric Type - we'll dig in more below.

In contrast, data submitted directly to our API is not aggregated by Datadog before storage (except in the case of Distributions). The values sent to Datadog are stored as-is, and the Metric Type is updated if necessary.

Let's examine how each Metric Type is aggregated before it's stored. Remember, this won't generally occur for API submissions.


### Metric Aggregation Before Storage, By Type

{{< tabs >}}
{{% tab "COUNT" %}}


**A `COUNT` represents the total sum of the values submitted in one interval.** A `COUNT` is used to add up the number of occurences of something in that time - total connections made to a database, or the number of requests to an endpoint, for example. This number can accumulate or decrease over time - it is not monotonically increasing.

For example, suppose a webserver is running the Datadog Agent, tracking the number HTTP requests received as a `COUNT` metric. This webserver receives:

* `30` requests in the first 10 seconds
* `70` requests in the second interval of 10 seconds
* `50` requests in the third interval of 10 seconds

The Agent then simply reports the following values:

* `30` for the first 10 seconds
* `70` for the next 10 seconds
* `50` for the final 10 seconds

When graphed, this `COUNT` metric looks like the following:

{{< img src="developers/metrics/metric_types/count_of_http_requests2.png" alt="Count Metric" responsive="true">}}

Note: DogstatsD counts show a decimal value within Datadog, since they are normalized over the flush interval to report units per second.

Discover how to submit count metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]
* [With the Datadog API][3]

[1]: /developers/metrics/agent_metrics_submission/?tab=count
[2]: /developers/metrics/dogstatsd_metrics_submission/#count
[3]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "RATE" %}}

**A `RATE` metric represents the frequency at which something occurs, per second.** A `RATE` is used to track how often something is happening - this could be the frequency of connections made to a database, or the flow of requests made to an endpoint.

To get this value, the Agent sums the values received in one interval, then divides by the length of that interval, yielding a value per unit time.

For example, suppose a webserver is running the Datadog Agent, tracking the number HTTP requests received as a `RATE` metric. This webserver receives:

* `30` requests in the first 10 seconds
* `70` requests in the second interval of 10 seconds
* `50` requests in the third interval of 10 seconds

The Agent sums up the requests received in a given interval, then divides by the length of that interval. The Agent then reports the following normalized per-second values:

* `3` for the first 10 seconds
* `7` for the next 10 seconds
* `5` for the final 10 seconds

When graphed, this `RATE` metric looks like the following:

{{< img src="developers/metrics/metric_types/rate_of_http_requests2" alt="Rate Metric" responsive="true">}}

Discover how to submit rate metrics:

* [With a custom Agent Check][1]
* [With the Datadog API][2]

[1]: /developers/metrics/agent_metrics_submission/?tab=rate
[2]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "GAUGE" %}}

**A `GAUGE` metric is a single value summarizing an entire interval.**  A `GAUGE` is a representative snapshot for that period of time. The last value submitted to the Agent during a given interval **is** the value of the metric at that time - no summing, averaging, or aggregation occurs to the data in that interval before storage.

`GAUGE` metrics are ideal for taking a measure of something. Suppose a webserver is running the Datadog agent, tracking the latency of each request in milliseconds. If each request has a latency of 300ms, checking request latency three times in one interval should not report 900ms - a `GAUGE` would correctly report 300ms.

 For example, during each 10 second interval, suppose the Agent receives the following latency values from the webserver:

* `429, 455, and 437` during the first 10 seconds
* `377 and 344` during the second interval of 10 seconds
* `822, 400, and 596` during the last interval of 30 seconds

The Agent then reports only the final value seen in each interval:

* `437` for the first 10 seconds
* `344` for the next 10 seconds
* `596` for the final 10 seconds

When graphed, this `GAUGE` metric looks like the following:

{{< img src="developers/metrics/metric_types/gauge-http_request_latency2.png" alt="Gauge Metric" responsive="true">}}

Discover how to submit gauge metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]
* [With the Datadog API][3]

[1]: /developers/metrics/agent_metrics_submission/?tab=gauge
[2]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[3]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
<!--
{{% tab "HISTOGRAM" %}}

**The `HISTOGRAM` metric submission type allows you to measure the statistical distribution of a set of values**. Datadog's `HISTOGRAM` metric type is an extension of the [StatsD timing metric type][1]: it aggregates (on the Agent-side) the values that are sent during a defined time interval (the default flush interval is 10s) and produces different timeseries representing the different aggregations possible for the set of values. Depending on the aggregation, the metric type stored by Datadog is different.

For example: if you send `X` values for a `HISTOGRAM` metric `<METRIC_NAME>` during an Agent flush interval, the following timeseries are produced by the Agent by default:

| Aggregation                  | Description                                                                                                                                               | Datadog Metric Type |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `<METRIC_NAME>.avg`          | Gives you the average of those `X` values during the flush interval.                                                                                      | GAUGE               |
| `<METRIC_NAME>.count`        | Gives you the number of points sampled during the interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                |
| `<METRIC_NAME>.median`       | Gives you the median of those `X` values in the flush interval.                                                                                           | GAUGE               |
| `<METRIC_NAME>.95percentile` | Gives you the 95th percentile of those `X` values in the flush interval.                                                                                  | GAUGE               |
| `<METRIC_NAME>.max`          | Gives you the maximum value of those `X` values sent during the flush interval.                                                                           | GAUGE               |


For instance, say that the `request.response_time.histogram` metric is reported to Datadog through an Agent with the `HISTOGRAM` type for `server:web_1` with the values [1,1,1,2,2,2,3,3] during a flush interval. The following metrics would have then be submitted to Datadog over this flush interval:

| Metric Name                                    | Value  | Datadog Metric Type |
| ---------------------------------------------- | ------ | ------------------- |
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

**A `DISTRIBUTION` is a metric submission type that allows you to aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure.** `DISTRIBUTION` metrics are designed to instrument logical objects, like services, independently from the underlying hosts.

Unlike the `HISTOGRAM` metric type, which aggregates on the Agent side during the flush interval, a `DISTRIBUTION` metric sends all the raw data during a flush interval to Datadog, and aggregations occur server-side. Because the underlying data structure represents raw, unaggregated data, distributions provide two major features:

* Calculation of percentile aggregations
* Customization of tagging

For example: if you send `X` values for a `DISTRIBUTION` metric `<METRIC_NAME>` during an interval, the following timeseries are available to query by default:

| Aggregation           | Description                                                                                                                                               | Datadog Metric Type |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `avg:<METRIC_NAME>`   | Gives you the average of those `X` values during the flush interval.                                                                                      | GAUGE               |
| `count:<METRIC_NAME>` | Gives you the number of points sampled during the interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                |
| `max:<METRIC_NAME>`   | Gives you the maximum value of those `X` values sent during the flush interval.                                                                           | GAUGE               |
| `min:<METRIC_NAME>`   | Gives you the minimum value of those `X` sent during the flush interval.                                                                                  | GAUGE               |
| `sum:<METRIC_NAME>`   | Gives you the sum of all `X` values sent during the flush interval.                                                                                       | GAUGE               |

For instance, say that the `request.response_time.distribution` metric is reported to Datadog with the `DISTRIBUTION` type for `server:web_1` and `server:web_2`. Say `server:web_1` reports the metric with the values [1,1,1,2,2,2,3,3], and `server:web_2` reports the same metric with the values [1,1,2] during a flush interval. Over a given flush interval, this would create the following metrics within Datadog:

| Metric Name                                | Value  | Datadog Metric Type |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1,73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | RATE                |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | GAUGE               |

Discover how to submit distribution metrics [with DogstatsD][1].

### Calculation of percentile aggregations

Like other metric types, such as `GAUGE` or `HISTOGRAM`, the `DISTRIBUTION` metric type has the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distribution metrics are initially tagged the same way as other metrics (with custom tags set in the code).

Additional percentile aggregations (`p50`, `p75`, `p90`, `p95`, `p99`) can be added to distribution metrics. That is, for a distribution metric with added percentile aggregations during a 10 second flush interval, the following aggregations are available: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, and `p99`.

If you were to add percentile aggregations to your distribution metric (as shown in-app [Datadog Distribution Metric page][2]), the following timeseries would be additionally created:

| Metric Name                              | Value | Datadog Metric Type |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2 `  | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

**Note**: In the example above, the p50 (median) for `server:web_1` is `2` and the p50 for `server:web_2` is `1`. Agent-side aggregation would result in taking the median of these two median values, resulting in `1.5`. In reality, the global p50 (median) is the median of the combined set [1,1,1,1,1,2,2,2,2,3,3], which is `2`. This is the statistically accurate value that can be returned by a distribution metric's server-side aggregation.


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
{{% /tab %}} -->
{{< /tabs >}}

## Mapping to Datadog In-app Types

Datadog accepts metrics submitted from three sources:

* [Agent Check][5]
* [DogStatsD][4]
* [Datadog API][3]

These sources submit data as various submission types, which map to the three canonical in-app storage types in Datadog - `COUNT`, `RATE`, and `GAUGE`:


| Submission Source | Submission Method (python)           | Submission Type | Datadog In-App Type |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [API][6]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [API][6]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [API][6]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                |
| [API][6]          | `<placeholder, may share, may not>`  | DISTRIBUTION    | GAUGE, COUNT        |
| [DogStatsD][7]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |
| [DogStatsD][8]    | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE, COUNT        |
| [DogStatsD][9]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][9]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][9]    | `dog.decrement(...)`                 | COUNT           | RATE                |
| [DogStatsD][10]   | `dog.set(...)`                       | SET             | GAUGE               |
| [DogStatsD][11]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][12] | `self.count(...)`                    | COUNT           | COUNT               |
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
