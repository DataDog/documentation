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

## Overview

Each metric submitted to Datadog has a **metric type**. Metric type affects how the metric is stored, queried, and graphed, as well as how the metric interacts with additional [metric type modifiers][1] and functions.

Datadog allows you to submit, store, and display the following metric types:

| Types                                    | Definition                                                              |
|------------------------------------------|-------------------------------------------------------------------------|
| [COUNT](?tab=count#count-rate-and-gauge) | The total number of events that occur in one time interval.             |
| [RATE](?tab=rate#count-rate-and-gauge)   | The total number of events occurences per second.                       |
| [GAUGE](?tab=gauge#count-rate-and-gauge) | A snapshot of events one time interval.                                 |

In addition to those three metric types, Datadog DogStatsD and Agent Check librairies allow you to submit statistical distribution of a set of events:

| Types                                                        | Definition                                                                  |
|--------------------------------------------------------------|-----------------------------------------------------------------------------|
| [HISTOGRAM](?tab=histogram#histogram-and-distribution)       | The statistical distribution of a set of events **calculated Client side**. |
| [DISTRIBUTION](?tab=distribution#histogram-and-distribution) | The statistical distribution of a set of events **calculated Server side**. |

**Note**: Those statistical distributions are represented with multiple COUNT and GAUGE type metrics within Datadog in order to accuretly represent the client or server side associated distribution of a set of events. See the [HISTOGRAM](?tab=histogram#histogram-and-distribution) and [DISTRIBUTION](?tab=distribution#histogram-and-distribution) dedicated section to learn more.

### Submission vs. in-app type

Metrics and statistical distributions are submitted to Datadog in three main ways:

* [Custom Agent check][2]
* [DogStatsD][3]
* [Datadog's HTTP API][4]

Most of the data received by Datadog is submitted via the Agent. For data submitted through an Agent Check or DogStatsD, [aggregation occurs when multiple points arrive in a short time interval][5]. During that time interval, the Agent combines values that belong in the same time series (i.e. values with identical tags) and sends a single representative value for that interval. This combined value is stored with a single timestamp. The way in which values are combined and aggregated varies, depending on metric type. Data submitted directly to the Datadog API is not aggregated by Datadog before storage (except in the case of DISTRIBUTION metrics). The raw values sent to Datadog are stored as-is.

**Note**: See the [Mapping between submission and in-app type][6] FAQ to see the full mapping between Submission vs. in-app type.

## Count, rate, and gauge

// Insert overview here \\

### Definition

{{< tabs >}}
{{% tab "COUNT" %}}

**The `COUNT` metric submission type represents the total number of events that occur in one time interval.** A `COUNT` is used to add up the values of something in that time—total connections made to a database, or the total number of requests to an endpoint, for example. This number can accumulate or decrease over time. It is not monotonically increasing.

**Note**: A `COUNT` is different from the `RATE` metric type, which represents this count of events normalized _per second_ given the defined time interval.

{{% /tab %}}
{{% tab "RATE" %}}

**The `RATE` metric submission type represents the total number of events occurences per second.** A `RATE` is used to track how often something is happening—like the frequency of connections made to a database, or the flow of requests made to an endpoint.

**Note**: A `RATE` is different from the `COUNT` metric submission type, which represents the number of events in the flush interval.

{{% /tab %}}
{{% tab "GAUGE" %}}

**The `GAUGE` metric submission type represents a snapshot of one time interval.**  This representative snapshot value is the last value submitted to the Agent during the time interval. `GAUGE` metrics are ideal for taking a measure of something reporting continuously.

{{% /tab %}}
{{< /tabs >}}

### Submission

{{< tabs >}}
{{% tab "COUNT" %}}

To submit COUNT metrics:

| Submission Source | Submission Method (python)           | Submission Type | Datadog In-App Type |
|-------------------|--------------------------------------|-----------------|---------------------|
| [API][1]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][2]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][2]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][2]    | `dog.decrement(...)`                 | COUNT           | RATE                |
| [Agent check][3]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent check][4]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |

**Note**: When a `COUNT` metric is submited through DogStatsD, it's stored as a `RATE` within Datadog. This is to ensure relevant comparasion accross different Agent. As a consequence, StatsD counts might show a decimal value within Datadog, since they are normalized over the flush interval to report units per second.

[1]: /api/?lang=python#post-timeseries-points
[2]: /developers/metrics/dogstatsd_metrics_submission/#count
[3]: /developers/metrics/agent_metrics_submission/?tab=count#count
[4]: /developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
{{% /tab %}}
{{% tab "RATE" %}}

To submit RATE metrics:

| Submission Source | Submission Method (python)          | Submission Type | Datadog In-App Type |
|-------------------|-------------------------------------|-----------------|---------------------|
| [API][1]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |
| [Agent check][2]  | `self.rate(...)`                    | RATE            | GAUGE               |

**Note**: When a `RATE` metric type is submited through an Agent Check, it's stored as a `GAUGE` within Datadog. This is to ensure relevant comparasion accross different Agent.

[1]: /api/?lang=python#post-timeseries-points
[2]: /developers/metrics/agent_metrics_submission/?tab=rate
{{% /tab %}}
{{% tab "GAUGE" %}}

To submit GAUGE metrics:

| Submission Source | Submission Method (python)           | Submission Type | Datadog In-App Type |
|-------------------|--------------------------------------|-----------------|---------------------|
| [API][1]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][2]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |
| [Agent check][3]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |

[1]: /api/?lang=python#post-timeseries-points
[2]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[3]: /developers/metrics/agent_metrics_submission/?tab=gauge
{{% /tab %}}
{{< /tabs >}}

### Example

To better understand the differences between the in-app metrics types and what they represent, consider the following example:

You have one web server with an Agent running on the same host. This web servers receives over a [flush interval][5] one, then three, then five, then 7 requests or `[1;3;5;7]` requests. Depending of the metric type used to monitor the amount of request received you would send the following data points to Datadog:

{{< tabs >}}
{{% tab "COUNT" %}}

A COUNT metric type would give your **the total** of requests received over the flush interval: 1 + 3 + 5 + 7 = 16 requests

{{% /tab %}}
{{% tab "RATE" %}}

A RATE metric type would give you **the rate** of requests received over the flush interval, if the flush interval is 10 seconds (default value): 1.5 requests / second

{{% /tab %}}
{{% tab "GAUGE" %}}

A GAUGE metric type would give your **the last** amount of requests received over the flush interval: 7 requests

{{% /tab %}}
{{< /tabs >}}

## Histogram and Distribution

// Insert overview here \\

### Definition {#definition-histo-distri}

{{< tabs >}}
{{% tab "HISTOGRAM" %}}

**The `HISTOGRAM` metric submission type allows you to measure the statistical distribution of a set of values**. Datadog's `HISTOGRAM` metric type is an extension of the [StatsD timing metric type][1]: it aggregates (on the Agent-side) the values that are sent during a defined time interval (the default flush interval is 10s) and produces different timeseries representing the different aggregations possible for the set of values. Depending on the aggregation, the metric type stored by Datadog is different.

For example: if you send `X` values for a `HISTOGRAM` metric `<METRIC_NAME>` during an Agent flush interval, the following timeseries are produced by the Agent by default:

| Aggregation                  | Description                                                                                                                                               | Datadog Metric Type |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `<METRIC_NAME>.avg`          | Gives you the average of those `X` values during the flush interval.                                                                                      | GAUGE               |
| `<METRIC_NAME>.median`       | Gives you the median of those `X` values in the flush interval.                                                                                           | GAUGE               |
| `<METRIC_NAME>.95percentile` | Gives you the 95th percentile of those `X` values in the flush interval.                                                                                  | GAUGE               |
| `<METRIC_NAME>.max`          | Gives you the maximum value of those `X` values sent during the flush interval.                                                                           | GAUGE               |
| `<METRIC_NAME>.count`        | Gives you the number of points sampled during the interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                |

**Note**:

* Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][2]. By default, only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog. `sum` and `min` are available for addition.
* Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][2]. By default, only the `95pc` percentile is sent out to Datadog.

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
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

### Calculation of percentile aggregations

Like other metric types, such as `GAUGE` or `HISTOGRAM`, the `DISTRIBUTION` metric type has the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distribution metrics are initially tagged the same way as other metrics (with custom tags set in the code).

Additional percentile aggregations (`p50`, `p75`, `p90`, `p95`, `p99`) can be added to distribution metrics. That is, for a distribution metric with added percentile aggregations during a 10 second flush interval, the following aggregations are available: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, and `p99`.

### Customization of tagging

This functionality allows you to control tagging for metrics where host-level granularity is not necessary. See the [Distribution Metric page][1] to learn more about whitelist-based tagging control. **Note**: The exclusion of tags with `!` is not accepted with this feature.

[1]: /metrics/distributions
{{% /tab %}}
{{< /tabs >}}

### Submission {#submission-histo-distri}

{{< tabs >}}
{{% tab "HISTOGRAM" %}}

To submit HISTOGRAM metrics:

| Submission Source | Submission Method (python) | Submission Type | Datadog In-App Type |
|-------------------|----------------------------|-----------------|---------------------|
| [DogStatsD][1]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][2]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE, RATE         |

**Note**: To submit an histogram you can also use a TIMER metric that is an implementation of the `HISTOGRAM` metric type within DogStatsD (not to be confused with timers in the standard StatsD). It measures timing data only: for example, the amount of time a section of code takes to execute, or how long it takes to fully render a page. See the [TIMER DogStatsD documentation][3] to learn how to instrument your code to submit `TIMER`s.

[1]: /developers/metrics/dogstatsd_metrics_submission/#histogram
[2]: /developers/metrics/agent_metrics_submission/?tab=histogram
[3]: /developers/metrics/dogstatsd_metrics_submission/#timers
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

To submit DISTRIBUTION metrics:

| Submission Source | Submission Method (python) | Submission Type | Datadog In-App Type |
|-------------------|----------------------------|-----------------|---------------------|
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT        |

[1]: /developers/metrics/dogstatsd_metrics_submission/#distribution
{{% /tab %}}
{{< /tabs >}}

### Example {#example-histo-distri}

{{< tabs >}}
{{% tab "HISTOGRAM" %}}

For instance, say that the `request.response_time.histogram` metric is reported to Datadog through an Agent with the `HISTOGRAM` type for `server:web_1` with the values [1,1,1,2,2,2,3,3] during a flush interval. The following metrics would have then be submitted to Datadog over this flush interval:

| Metric Name                                    | Value  | Datadog Metric Type |
|------------------------------------------------|--------|---------------------|
| `request.response_time.histogram.avg`          | `1,88` | GAUGE               |
| `request.response_time.histogram.count`        | `8`    | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

For instance, say that the `request.response_time.distribution` metric is reported to Datadog with the `DISTRIBUTION` type for `server:web_1` and `server:web_2`. Say `server:web_1` reports the metric with the values [1,1,1,2,2,2,3,3], and `server:web_2` reports the same metric with the values [1,1,2] during a flush interval. Over a given flush interval, this would create the following metrics within Datadog:

| Metric Name                                | Value  | Datadog Metric Type |
|--------------------------------------------|--------|---------------------|
| `avg:request.response_time.distribution`   | `1,73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | RATE                |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | GAUGE               |

**Calculation of percentile aggregations**:

If you were to add percentile aggregations to your distribution metric (as shown in-app [Datadog Distribution Metric page][1]), the following timeseries would be additionally created:

| Metric Name                              | Value | Datadog Metric Type |
|------------------------------------------|-------|---------------------|
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

**Note**: In the example above, the p50 (median) for `server:web_1` is `2` and the p50 for `server:web_2` is `1`. Agent-side aggregation would result in taking the median of these two median values, resulting in `1.5`. In reality, the global p50 (median) is the median of the combined set [1,1,1,1,1,2,2,2,2,3,3], which is `2`. This is the statistically accurate value that can be returned by a distribution metric's server-side aggregation.

[1]: /metrics/distributions
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/type_modifiers
[2]: /developers/metrics/agent_metrics_submission
[3]: /developers/metrics/dogstatsd_metrics_submission
[4]: /api/?lang=python#post-timeseries-points
[5]: /developers/dogstatsd/data_aggregation
[6]: /developers/faq/mapping_submission_in_app_type
