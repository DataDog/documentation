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
    - /developers/metrics/types/
further_reading:
    - link: 'developers/dogstatsd'
      tag: 'Documentation'
      text: 'Learn more about DogStatsD'
    - link: 'developers/libraries'
      tag: 'Documentation'
      text: 'Official and Community created API and DogStatsD client libraries'
algolia:
  tags: ['metric types']
---

## Overview

Each metric submitted to Datadog should have a type. A metric's type affects how the metric values are displayed when queried, as well as the associated graphing possibilities within Datadog using additional [modifiers][1] and [functions][2]. A metric's type is displayed on the details side panel for the given metric on the [Metrics Summary page][3].

**Note**: Changing the metric type in this details side panel can change metric behavior in all existing visualizations and monitors, potentially rendering historical data as nonsensical.

The following metric submission types are accepted:

- [COUNT](?tab=count#metric-types)
- [RATE](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [SET][4]
- [HISTOGRAM](?tab=histogram#metric-types)
- [DISTRIBUTION](?tab=distribution#metric-types)

These different metric submission types are mapped to four in-app metric types found within the Datadog web application:

- COUNT
- RATE
- GAUGE
- DISTRIBUTION

**Note**: If you submit a metric to Datadog without a type, the metric type appears as `Not Assigned` within Datadog. The `Not Assigned` metric type cannot be further changed to another in-app type until an initial metric type is submitted.

## Submission vs. in-app type

Metrics are submitted to Datadog in three main ways:

- [Agent check][5]
- [DogStatsD][6]
- [Datadog's HTTP API][7]

The majority of data that Datadog receives is submitted by the Agent, either through an Agent check or DogStatsD. For these submission methods, a metric's type determines how multiple values collected on an Agent in [a flush time interval][8] are aggregated. The Agent combines these values into a single representative metric value for that interval. This combined value is stored with a single timestamp in Datadog.

Data submitted directly to the Datadog API is not aggregated by Datadog, with the exception of distribution metrics. The raw values sent to Datadog are stored as-is.

Read the [Submission types and Datadog in-app types](#submission-types-and-datadog-in-app-types) section to learn about how different metric submission types are mapped to their corresponding in-app types.

## Metric types

### Definition

{{< tabs >}}
{{% tab "COUNT" %}}

The COUNT metric submission type represents the total number of event occurrences in one time interval. A COUNT can be used to track the total number of connections made to a database or the total number of requests to an endpoint. This number of events can accumulate or decrease over time—it is not monotonically increasing.

**Note**: A COUNT is different from the RATE metric type, which represents the number of event occurrences normalized per second given the defined time interval.

{{% /tab %}}
{{% tab "RATE" %}}

The RATE metric submission type represents the total number of event occurrences per second in one time interval. A RATE can be used to track how often something is happening—like the frequency of connections made to a database or the flow of requests made to an endpoint.

**Note**: A RATE is different from the COUNT metric submission type, which represents the total number of event occurrences in the given time interval.

{{% /tab %}}
{{% tab "GAUGE" %}}

The GAUGE metric submission type represents a snapshot of events in one time interval. This representative snapshot value is the last value submitted to the Agent during a time interval. A GAUGE can be used to take a measure of something reporting continuously—like the available disk space or memory used.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

The HISTOGRAM metric submission type represents the statistical distribution of a set of values calculated Agent-side in one time interval. Datadog's HISTOGRAM metric type is an extension of the StatsD timing metric type. The Agent aggregates the values that are sent in a defined time interval and produces different metrics which represent the set of values.

If you send `X` values for a HISTOGRAM metric `<METRIC_NAME>` in a given time interval, the following metrics are produced by the Agent by default:

`<METRIC_NAME>.avg`
: Represents the average of those `X` values in the time interval.<br>
**Datadog In-App Type**: GAUGE

`<METRIC_NAME>.count`
: Represents the number of values submitted during the interval, `X`. The Agent submits this number as a RATE so it would show in app the value of `X/interval`. <br>
**Datadog In-App Type**: RATE

`<METRIC_NAME>.median`
: Represents the median of those `X` values in the time interval.<br>
**Datadog In-App Type**: GAUGE

`<METRIC_NAME>.95percentile` 
: Represents the 95th percentile of those `X` values in the time interval.<br>
**Datadog In-App Type**: GAUGE

`<METRIC_NAME>.max`
: Represents the maximum value of those `X` values sent during the time interval.<br>
**Datadog In-App Type**: GAUGE

**Note**:

- Configure which aggregations you want to send to Datadog with the `histogram_aggregates` parameter in your [`datadog.yaml` configuration file][1]. By default, only `max`, `median`, `avg`, and `count` aggregations are sent to Datadog. `sum` and `min` are also available.
- Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [`datadog.yaml` configuration file][2]. By default, only the `95percentile` is sent to Datadog.


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

The DISTRIBUTION metric submission type represents the global statistical distribution of a set of values calculated across your entire distributed infrastructure in one time interval. A DISTRIBUTION can be used to instrument logical objects, like services, independently from the underlying hosts.

Unlike the HISTOGRAM metric type, which aggregates on the Agent during a given time interval, a DISTRIBUTION metric sends all the raw data during a time interval to Datadog. Aggregations occur on the server-side. Because the underlying data structure represents raw, unaggregated data, distributions provide two major features:

- Calculation of percentile aggregations
- Customization of tagging

If you send `X` values for a DISTRIBUTION metric `<METRIC_NAME>` in a given time interval, the following aggregations are available for query by default:

`avg:<METRIC_NAME>`
: Represents the average of those `X` values in the time interval.<br>
**Datadog In-App Type**: GAUGE

`count:<METRIC_NAME>`
: Represents the number of points submitted in the time interval, `X`. The Agent then sends it as a COUNT.<br>
**Datadog In-App Type**: COUNT

`max:<METRIC_NAME>`
: Represents the maximum value of those `X` values sent in the time interval.<br>
**Datadog In-App Type**: GAUGE

`min:<METRIC_NAME>`
: Represents the minimum value of those `X` sent in the time interval.<br>
**Datadog In-App Type**: GAUGE

`sum:<METRIC_NAME>`
: Represents the sum of all `X` values sent in the time interval.<br>
**Datadog In-App Type**: COUNT

{{% /tab %}}
{{< /tabs >}}

### Example

{{< tabs >}}
{{% tab "COUNT" %}}

Suppose you are submitting a COUNT metric, `notifications.sent`, from a single host running the Datadog Agent. This host emits the following values in a flush time interval: `[1,1,1,2,2,2,3,3]`.

The Agent adds all of the values received in one time interval. Then, it submits the total number, in this case `15`, as the COUNT metric's value.

{{% /tab %}}
{{% tab "RATE" %}}

Suppose you are submitting a RATE metric, `queue_messages.rate`, from a single host running the Datadog Agent. This host emits the following values in a flush time interval: `[1,1,1,2,2,2,3,3]`.

The Agent adds all of the values received in one time interval. Then, it submits the total number divided by the total number of seconds in this time interval. In this case, if the flush interval is 10 seconds, the value submitted would be `1.5` as the RATE metric's value.

{{% /tab %}}
{{% tab "GAUGE" %}}

Suppose you are submitting a GAUGE metric, `temperature`, from a single host running the Datadog Agent. This host emits the following values in a flush time interval: `[71,71,71,71,71,71,71.5]`.

The Agent submits the last reported number, in this case `71.5`, as the GAUGE metric's value.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

For example, suppose you are submitting a HISTOGRAM metric, `request.response_time.histogram`, from a web server that reports the values `[1,1,1,2,2,2,3,3]` in a flush time interval. By default, the Agent submits the following metrics to Datadog which represent the statistical distribution of these values in this time interval:

| Metric Name                                    | Value  | Datadog In-App Type |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Suppose you are submitting a DISTRIBUTION metric, `request.response_time.distribution`, from two webservers: `webserver:web_1` and `webserver:web_2`. Suppose in a given flush time interval, `webserver:web_1` reports the metric with the values `[1,1,1,2,2,2,3,3]`, and `webserver:web_2` reports the same metric with the values `[1,1,2]`. Over this time interval, the following five aggregations will represent the global statistical distribution of all values collected from both webservers:

| Metric Name                                | Value  | Datadog In-App Type |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### Calculation of percentile aggregations

Like other metric types, such as GAUGE or HISTOGRAM, the DISTRIBUTION metric type has the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distribution metrics are initially tagged the same way as other metrics (with custom tags set in the code).

Additional percentile aggregations (`p50`, `p75`, `p90`, `p95`, `p99`) can be added to distribution metrics. If you were to add percentile aggregations to your distribution metric in-app, the following five additional aggregations are available for query:

| Metric Name                              | Value | Datadog In-app Type |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

That is, for a distribution metric with added percentile aggregations during a given time interval, the following 10 aggregations are available: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, and `p99`.

#### Customization of tagging

This functionality allows you to control tagging for metrics where host-level granularity is not necessary. Learn more about [Metrics without Limits™][1].

**Note**: The exclusion of tags with `!` is not accepted with this feature.


[1]: /metrics/metrics-without-limits/
{{% /tab %}}
{{< /tabs >}}

### Submission

{{< tabs >}}
{{% tab "COUNT" %}}

Submit your COUNT type metrics from one of the following sources:

| Submission Source | Submission Method (python)           | Submission Type | Datadog In-App Type |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent check][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent check][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**Note**: When submitting a COUNT metric type through DogStatsD, the metric appears as a RATE in-app to ensure relevant comparison across different Agents. Consequently, StatsD counts may appear with a decimal value within Datadog (since they are normalized over a time interval to report units per second).


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /api/v1/metrics/#submit-metrics
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

Submit your RATE type metrics from one of the following sources:

| Submission Source | Submission Method (python)          | Submission Type | Datadog In-App Type |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Agent check][1]  | `self.rate(...)`                    | RATE            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |

**Note**: When submitting a RATE metric type through DogStatsD, the metric appears as a GAUGE in-app to ensure relevant comparison across different Agents.


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /api/v1/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

Submit your GAUGE type metrics from one of the following sources:

| Submission Source | Submission Method (Python)           | Submission Type | Datadog In-App Type |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent check][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /api/v1/metrics/#submit-metrics
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Submit your HISTOGRAM type metrics from one of the following sources:

| Submission Source | Submission Method (Python) | Submission Type | Datadog In-App Types |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Agent check][1]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE          |

Submitting a TIMER metric to the Datadog Agent is equivalent to submitting a HISTOGRAM metric type within DogStatsD (not to be confused with timers in the standard StatsD). [DogStatsD `TIMER`][3] represents duration data only. For example, the amount of time a section of code takes to execute or how long it takes to fully render a page.


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Submit your DISTRIBUTION type metrics from the following source:

| Submission Source | Submission Method (Python) | Submission Type | Datadog In-App Types |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT         |


[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
{{% /tab %}}
{{< /tabs >}}

## Submission types and Datadog in-app types

Below is a summary of all available metric submission sources and methods. This table shows the mapping between the corresponding metric submission type and the in-app types:

| Submission Source | Submission Method (Python)           | Submission Type | Datadog In-App Types |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Agent check][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Agent check][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Agent check][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Agent check][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE          |
| [Agent check][13] | `self.rate(...)`                     | RATE            | GAUGE                |
| [API][7]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | GAUGE           | GAUGE                |
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE, COUNT         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE          |
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/type_modifiers/
[2]: /dashboards/functions/
[3]: /metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /metrics/custom_metrics/agent_metrics_submission/
[6]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /api/v1/metrics/#submit-metrics
[8]: /developers/dogstatsd/#how-it-works
[9]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[10]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[11]: /metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[12]: /metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[13]: /metrics/custom_metrics/agent_metrics_submission/?tab=rate
[14]: /metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
[15]: /metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[16]: /metrics/custom_metrics/dogstatsd_metrics_submission/#count
[17]: /metrics/custom_metrics/dogstatsd_metrics_submission/#set
[18]: /metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
