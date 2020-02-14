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
 - /developers/metrics_type/
 - /developers/metrics/metrics_type/
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

A metric's type affects how the given metric is aggregated in queries and values displayed in graph visualizations within Datadog. Different metric types can have different default time aggregation functions and different [Metric Type modifiers][1]. A metric's type is displayed on the details sidepanel for the given metric on the [Metrics Summary page][2]. Note: Changing the metric type in this details sidepanel can potentially change metric behavior in all existing visualizations and monitors; potentially rendering historical data as nonsensical.

The following metric submission types are accepted:

* [COUNT](?tab=count#metric-type-definition)
* [RATE](?tab=rate#metric-type-definition)
* [GAUGE](?tab=gauge#metric-type-definition)
* [HISTOGRAM](?tab=histogram#metric-type-definition)
* [DISTRIBUTION](?tab=distribution#metric-type-definition)
* [SET](?tab=set#metric-type-definition)
* [TIMERS](?tab=timers#metric-type-definition)

Once a metric is submitted, there are 3 metric storage types within the Datadog web application:

* `COUNT`
* `RATE`
* `GAUGE`

Refer to the [Metric Type Definition](#metric-type-definition) section below to learn more about the different metrics types available. Also, refer to the [Submission Types and Datadog In-App Types Section](#submission-types-and-datadog-in-app-types) to see how each metric type behaves between its submission and its storage within Datadog.

## Metric type definition

To better understand the different metrics types, what they represent, and how to modify them within Datadog, consider the following example:

You have two web servers: `server:web_1` and `server:web_2`. Both web servers continuously receive:

* 10 HTTP requests for the first 30 seconds, then
* 20 HTTP requests for the next 30 seconds, then
* 0 HTTP requests for the next 30 seconds.

### Metric submission types

{{< tabs >}}
{{% tab "COUNT" %}}

**The `COUNT` metric submission type represents the number of events that occur in a defined time interval, otherwise known as a flush interval**. This number of events can accumulate or decrease over time -- it is not monotonically increasing. A `COUNT` can be used to track the number of requests hitting your webservers or number of errors.

**Note**: A `COUNT` is different from the `RATE` metric type, which represents this count of events normalized _per second_ given the defined time interval.

For example, suppose the `number.of.requests.count` metric is reported every 30 seconds to Datadog with the `COUNT` type on `server:web_1`.

Each value/data point for this metric submitted as a `COUNT` represents the number of requests—the "count" of requests—received during the 30 second flush interval. The metric then reports the following values:

* `10` for the first 30 seconds
* `20` for the second interval of 30 seconds
* `null` for the last interval of 30 seconds

**Note**: for a `COUNT` metric, when a `0` value is submitted, `null` is stored within Datadog.

When graphed, this `COUNT` metric looks like the following:

{{< img src="developers/metrics/types/count_metric.png" alt="Count Metric" >}}

Note: StatsD counts show a decimal value within Datadog, since they are normalized over the flush interval to report units per second.

Discover how to submit count metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]
* [With the Datadog API][3]

[1]: /developers/metrics/agent_metrics_submission/?tab=count
[2]: /developers/metrics/dogstatsd_metrics_submission/#count
[3]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "RATE" %}}

**The `RATE` metric submission type represents the number of events over a defined time interval (flush interval) that's normalized per-second.** A `RATE` can be used to track the rate of requests hitting your webservers.

**Note**: A `RATE` is different from the `COUNT` metric submission type, which represents the number of events in the flush interval.

For instance, say that the `number.of.requests.rate` metric is reported every 30 seconds to Datadog with the `RATE` type in `server:web_1`.

Each value/data point represents the "rate" of requests. The metric then reports the following values:

* `0.33` for the first 30 seconds
* `0.66` for the second interval of 30 seconds
* `null` for the last interval of 30 seconds
Then this pattern of `0.33`, `0.66`, `0`, repeats. **Note**: for a `RATE` metric, when a `0` value is submitted, `null` is stored within Datadog.

Since the `RATE` is the normalized per-second variation of the number of requests. When graphed, this `RATE` metric looks like the following:

{{< img src="developers/metrics/types/rate_metric.png" alt="Rate Metric" >}}

Discover how to submit rate metrics:

* [With a custom Agent Check][1]
* [With the Datadog API][2]

[1]: /developers/metrics/agent_metrics_submission/?tab=rate
[2]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "GAUGE" %}}

**The `GAUGE` metric submission type represents a value of a particular thing reporting continuously over time.** It is a snapshot of the last recorded value of a particular thing during a defined time interval (flush interval). A `GAUGE` can be used to represent the temperature or memory usage.

For instance, say that the `number.of.requests.gauge` metric is reported every 30 seconds to Datadog with the `GAUGE` type in `server:web_1`.

Each value/data point represents the total number of requests received at a point in time. The metric then reports the following values:

* `10` for the first 30 seconds
* `30` for the second interval of 30 seconds (10 + 20 requests)
* `30` for the last interval of 30 seconds (no new request are received so the value stays the same)

When graphed, this `GAUGE` metric looks like the following:

{{< img src="developers/metrics/types/gauge_metric.png" alt="Gauge Metric" >}}

Discover how to submit gauge metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]
* [With the Datadog API][3]

[1]: /developers/metrics/agent_metrics_submission/?tab=gauge
[2]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[3]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

**The `HISTOGRAM` metric submission type allows you to measure the statistical distribution of a set of values**. Datadog's `HISTOGRAM` metric type is an extension of the [StatsD timing metric type][1]: it aggregates (on the Agent-side) the values that are sent during a defined time interval (the default flush interval is 10s) and produces different timeseries representing the different aggregations possible for the set of values. Depending on the aggregation, the metric type stored by Datadog is different.

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

**A `DISTRIBUTION` is a metric submission type that allows you to aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure.** `DISTRIBUTION` metrics are designed to instrument logical objects, like services, independently from the underlying hosts.

Unlike the `HISTOGRAM` metric type, which aggregates on the Agent side during the flush interval, a `DISTRIBUTION` metric sends all the raw data during a flush interval to Datadog, and aggregations occur server-side. Because the underlying data structure represents raw, unaggregated data, distributions provide two major features:

* Calculation of percentile aggregations
* Customization of tagging

For example: if you send `X` values for a `DISTRIBUTION` metric `<METRIC_NAME>` during an interval, the following timeseries are available to query by default:

| Aggregation           | Description                                                                                                                                               | Datadog Metric Type |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `avg:<METRIC_NAME>`   | Gives you the average of those `X` values during the flush interval.                                                                                      | GAUGE               |
| `count:<METRIC_NAME>` | Gives you the number of points sampled during the interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                |
| `max:<METRIC_NAME>`   | Gives you the maximum value of those `X` values sent during the flush interval.                                                                           | GAUGE               |
| `min:<METRIC_NAME>`   | Gives you the minimum value of those `X` sent during the flush interval.                                                                                  | GAUGE               |
| `sum:<METRIC_NAME>`   | Gives you the sum of all `X` values sent during the flush interval.                                                                                       | GAUGE               |

For instance, say that the `request.response_time.distribution` metric is reported to Datadog with the `DISTRIBUTION` type for `server:web_1` and `server:web_2`. Say `server:web_1` reports the metric with the values [1,1,1,2,2,2,3,3], and `server:web_2` reports the same metric with the values [1,1,2] during a flush interval. Over a given flush interval, this would create the following metrics within Datadog:

| Metric Name                                | Value  | Datadog Metric Type |
|--------------------------------------------|--------|---------------------|
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
|------------------------------------------|-------|---------------------|
| `p50:request.response_time.distribution` | `2 `  | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

**Note**: In the example above, the p50 (median) for `server:web_1` is `2` and the p50 for `server:web_2` is `1`. Agent-side aggregation would result in taking the median of these two median values, resulting in `1.5`. In reality, the global p50 (median) is the median of the combined set [1,1,1,1,1,2,2,2,2,3,3], which is `2`. This is the statistically accurate value that can be returned by a distribution metric's server-side aggregation.

### Customization of tagging

This functionality allows you to control tagging for metrics where host-level granularity is not necessary. See the [Distribution Metric page][2] to learn more about whitelist-based tagging control. **Note**: The exclusion of tags with `!` is not accepted with this feature.

[1]: /developers/metrics/dogstatsd_metrics_submission/#distribution
[2]: /metrics/distributions
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
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [API][3]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                |
| [DogStatsD][6]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |
| [DogStatsD][7]    | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE, COUNT        |
| [DogStatsD][8]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][8]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][8]    | `dog.decrement(...)`                 | COUNT           | RATE                |
| [DogStatsD][9]   | `dog.set(...)`                       | SET             | GAUGE               |
| [DogStatsD][10]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][11] | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent check][12] | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [Agent check][13] | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [Agent check][14] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][15] | `self.rate(...)`                     | RATE            | GAUGE               |
| [Agent check][16] | `self.set(...)`                      | SET             | GAUGE               |

[1]: /developers/metrics/type_modifiers
[2]: /metrics/summary
[3]: /api/?lang=python#post-timeseries-points
[4]: /developers/metrics/dogstatsd_metrics_submission
[5]: /developers/metrics/agent_metrics_submission
[6]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[7]: /developers/metrics/dogstatsd_metrics_submission/#distribution
[8]: /developers/metrics/dogstatsd_metrics_submission/#count
[9]: /developers/metrics/dogstatsd_metrics_submission/#set
[10]: /developers/metrics/dogstatsd_metrics_submission/#histogram
[11]: /developers/metrics/agent_metrics_submission/?tab=count#count
[12]: /developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
[13]: /developers/metrics/agent_metrics_submission/?tab=gauge
[14]: /developers/metrics/agent_metrics_submission/?tab=histogram
[15]: /developers/metrics/agent_metrics_submission/?tab=rate
[16]: /developers/integrations
