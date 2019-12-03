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
 - /developers/metrics_type/
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

Each metric submitted to Datadog has a **metric type**. Metric type affects how the metric is stored, queried, and graphed, as well as how the metric interacts with additional [metric type modifiers][1] and functions.

## Metric Types: Storage vs. Submission

Datadog accepts a wide range of **metric submission types**:

* [COUNT](?tab=count#metric-type-definition)
* [RATE](?tab=rate#metric-type-definition)
* [GAUGE](?tab=gauge#metric-type-definition)
* [HISTOGRAM](?tab=histogram#metric-type-definition)
* [DISTRIBUTION](?tab=distribution#metric-type-definition)
* [SET](?tab=set#metric-type-definition)
* [TIMERS](?tab=timers#metric-type-definition)

When data is received, the submitted metric type is mapped to one of three in-app **Metric Types**. Datadog stores metric data under the following canonical types:

* `COUNT`
* `RATE`
* `GAUGE`

A metric's type can be viewed on the details sidepanel on the [Metrics Summary page][2]. The metric type can be modified in this side panel. However, this should be done carefully and only if necessary. Modifying metric type *can* change how functions and modifiers interact with your data, potentially affecting graphs and monitors.

## Submission Method

Data is submitted to Datadog in three main ways:

* [Agent Check][5]
* [DogStatsD][4]
* [Datadog API][3]

Most of the data received by Datadog is submitted via the Agent. For data submitted through an Agent Check or DogStatsD, aggregation occurs when multiple points arrive in a short time interval. During that time interval, the Agent combines values that belong in the same time series (i.e. values with identical tags) and sends a single representative value for that interval. This combined value is stored with a single timestamp. The way in which values are combined and aggregated varies, depending on metric type.

Data submitted directly to the Datadog API is not aggregated by Datadog before storage (except in the case of Distributions). The raw values sent to Datadog are stored as-is.

### Metric submission types
This table discusses each metric submission type (through Agent or DogStatsD) and how it is aggregated before being mapped to an in-app metric type. **Note**: no aggregation occurs for API metric submissions.

{{< tabs >}}
{{% tab "COUNT" %}}


**The `COUNT` metric submission type represents the total number of events that occur in one time interval.** A `COUNT` is used to add up the values of something in that time—total connections made to a database, or the total number of requests to an endpoint, for example. This number can accumulate or decrease over time. It is not monotonically increasing.

For example, suppose a webserver is running the Datadog Agent, and you're tracking the number of HTTP requests received as a `COUNT` metric. This webserver receives:

* `30` requests in the first 10 seconds
* `70` requests in the second interval of 10 seconds
* `50` requests in the third interval of 10 seconds

The Agent then reports the following values:

* `30` for the first 10 seconds
* `70` for the second interval of 10 seconds
* `50` for the third interval of 10 seconds

When graphed, this `COUNT` metric looks like the following:


{{< img src="developers/metrics/types/count_of_http_requests2.png" alt="Count Metric" responsive="true">}}

**Note**: DogStatsD counts show a decimal value within Datadog, since they are normalized over the flush interval to report units per second.

Discover how to submit count metrics:

* [With a custom Agent Check][1]
* [With DogStatsD][2]
* [With the Datadog API][3]

[1]: /developers/metrics/agent_metrics_submission/?tab=count
[2]: /developers/metrics/dogstatsd_metrics_submission/#count
[3]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "RATE" %}}

**The `RATE` metric submission type represents the total number of event occurences per second.** A `RATE` is used to track how often something is happening—like the frequency of connections made to a database, or the flow of requests made to an endpoint.

The Agent sums the values received in one time interval, then divides by the length of that time interval, yielding a value per unit time.

For example, suppose a webserver is running the Datadog Agent, and you're tracking the number of HTTP requests received as a `RATE` metric. This webserver receives:

* `30` requests in the first 10 seconds
* `70` requests in the second interval of 10 seconds
* `50` requests in the third interval of 10 seconds

The Agent sums the requests received in a given interval, then divides by the length of that interval. The Agent then reports the following normalized per-second values:

* `3` for the first 10 seconds
* `7` for the second interval of 10 seconds
* `5` for the the third interval of 10 seconds

When graphed, this `RATE` metric looks like the following:

{{< img src="developers/metrics/types/rate_of_http_requests2" alt="Rate Metric" responsive="true">}}

Discover how to submit rate metrics:

* [With a custom Agent Check][1]
* [With the Datadog API][2]

[1]: /developers/metrics/agent_metrics_submission/?tab=rate
[2]: /api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "GAUGE" %}}

**The `GAUGE` metric submission type represents a snapshot of one time interval.**  This representative snapshot value is the last value submitted to the Agent during the time interval.

`GAUGE` metrics are ideal for taking a measure of something reporting continuously. Suppose a webserver is running the Datadog Agent, tracking the request latency in milliseconds. If each request has a latency of 300ms, checking request latency three times in one time interval should not report 900ms—instead, the `GAUGE` reports 300ms.

 For example, suppose the Agent receives the following latency values during each 10 second interval from the webserver:

* `429, 455, and 437` in the first 10 seconds
* `377 and 344` in the second interval of 10 seconds
* `822, 400, and 596` in the third interval of 10 seconds

The Agent reports only the final value seen in each interval:

* `437` for the first 10 seconds
* `344` for the the second interval of 10 seconds
* `596` for the the third interval of 10 seconds

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

**The `HISTOGRAM` metric submission type represents a statistical distribution calculated at the Agent of a set of values in one time interval**. `HISTOGRAM` is stored in-app as five different timeseries representing the distribution of the set of values in that time interval. It is an extension of the [StatsD timing metric type][1]. A `HISTOGRAM` can be used to represent response time on a host or total event duration on a host.

For example: if you send `X` values for a `HISTOGRAM` metric `<METRIC_NAME>` during one time interval, the Agent aggregates the set of values to produce the following five representative timeseries by default:

| Aggregation                  | Description                                                                                                                                                        | Datadog In-App Metric Type |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `<METRIC_NAME>.avg`          | Gives you the average of those `X` values in the time interval.                                                                                                    | GAUGE                      |
| `<METRIC_NAME>.count`        | Gives you the total number of points submitted in the time interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                       |
| `<METRIC_NAME>.median`       | Gives you the median of those `X` values in the time interval.                                                                                                     | GAUGE                      |
| `<METRIC_NAME>.95percentile` | Gives you the 95th percentile of those `X` values in the time interval.                                                                                            | GAUGE                      |
| `<METRIC_NAME>.max`          | Gives you the maximum value of those `X` values sent in the time interval.                                                                                         | GAUGE                      |

For example, suppose a webserver is running the Datadog Agent, and you're tracking the response times received as a `HISTOGRAM` metric. In the one time interval, the webserver receives the set of values [1,1,1,2,2,2,3,3].

The Agent aggregates the set of values to create the five timeseries representing the distribution of the set of values [1,1,1,2,2,2,3,3]. The five timeseries are submitted to Datadog and stored as the following in-app metric types:

| Metric Name                                    | Value  | Datadog In-App Metric Type |
|------------------------------------------------|--------|----------------------------|
| `request.response_time.histogram.avg`          | `1.88` | GAUGE                      |
| `request.response_time.histogram.count`        | `8`    | RATE                       |
| `request.response_time.histogram.median`       | `2`    | GAUGE                      |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE                      |
| `request.response_time.histogram.max`          | `3`    | GAUGE                      |


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

For example, if you send `X` values for a `DISTRIBUTION` metric `<METRIC_NAME>` during an interval, the following five timeseries are available to query by default:

| Aggregation           | Description                                                                                                                                               | Datadog In-App Metric Type |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `avg:<METRIC_NAME>`   | Gives you the average of those `X` values during the flush interval.                                                                                      | GAUGE                      |
| `count:<METRIC_NAME>` | Gives you the number of points sampled during the interval, i.e. `X`. The Agent then sends it as a `RATE` so it would show in app the value `X/interval`. | RATE                       |
| `max:<METRIC_NAME>`   | Gives you the maximum value of those `X` values sent during the flush interval.                                                                           | GAUGE                      |
| `min:<METRIC_NAME>`   | Gives you the minimum value of those `X` sent during the flush interval.                                                                                  | GAUGE                      |
| `sum:<METRIC_NAME>`   | Gives you the sum of all `X` values sent during the flush interval.                                                                                       | GAUGE                      |

For instance, suppose there are two webservers each running the Datadog Agent, and you're tracking the response time of requests received by those webservers as a `DISTRIBUTION` metric. During one time interval, webserver 1 reports the set of response times: [1,1,1,2,2,2,3,3], and webserver 2 reports the set of response times: [1,1,2]. By default, Datadog calculates the following 5 timeseries:

| Metric Name                                | Value  |
|--------------------------------------------|--------|
| `avg:request.response_time.distribution`   | `1.73` |
| `count:request.response_time.distribution` | `11`   |
| `max:request.response_time.distribution`   | `3`    |
| `min:request.response_time.distribution`   | `1`    |
| `sum:request.response_time.distribution`   | `19`   |

Discover how to submit distribution metrics:
* [with DogstatsD][1]
* [with the Datadog API][2]

[1]: /developers/metrics/dogstatsd_metrics_submission/#distribution
[2]: /api/?lang=python#post-timeseries-points

### Calculation of percentile aggregations

Like other metric types, such as `GAUGE` or `HISTOGRAM`, the `DISTRIBUTION` metric type has the following aggregations available by default: `count`, `min`, `max`, `sum`, and `avg`. Distribution metrics are initially tagged the same way as other metrics (with custom tags set in the code).

Additional percentile aggregations (`p50`, `p75`, `p90`, `p95`, `p99`) can be added to distribution metrics such that the following aggregations are available: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, and `p99`.

If you were to add percentile aggregations to your distribution metric (as shown in-app [Datadog Distribution Metric page][2]), the five following timeseries would be additionally created:

| Metric Name                              | Value | Datadog In-App Metric Type |
|------------------------------------------|-------|----------------------------|
| `p50:request.response_time.distribution` | `2 `  | GAUGE                      |
| `p75:request.response_time.distribution` | `2`   | GAUGE                      |
| `p90:request.response_time.distribution` | `3`   | GAUGE                      |
| `p95:request.response_time.distribution` | `3`   | GAUGE                      |
| `p99:request.response_time.distribution` | `3`   | GAUGE                      |

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

These sources submit data as various submission types, which map to the three canonical in-app storage types in Datadog—`COUNT`, `RATE`, and `GAUGE`:


| Submission Source | Submission Method (python)           | Submission Type | Datadog In-App Type |
|-------------------|--------------------------------------|-----------------|---------------------|
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
| [Agent check][13] | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [Agent check][14] | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [Agent check][15] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][16] | `self.rate(...)`                     | RATE            | GAUGE               |
| [Agent check][17] | `self.set(...)`                      | SET             | GAUGE               |

[1]: /developers/metrics/type_modifiers
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
[13]: /developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
[14]: /developers/metrics/agent_metrics_submission/?tab=gauge
[15]: /developers/metrics/agent_metrics_submission/?tab=histogram
[16]: /developers/metrics/agent_metrics_submission/?tab=rate
[17]: /developers/integrations
