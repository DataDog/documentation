---
title: OTLP Metrics Types
kind: documentation
further_reading:
    - link: 'metrics/distributions'
      tag: 'Documentation'
      text: 'Learn more about distributions'
    - link: 'tracing/setup_overview/open_standards/'
      tag: 'Documentation'
      text: 'Learn more about OpenTelemetry'
---

## Overview

The Datadog Agent and the OpenTelemetry Collector Datadog exporter can ingest metrics in the OpenTelemetry format (OTLP), which can be produced by OpenTelemetry-instrumented applications. 

The following OTLP metric types can be ingested by the Datadog Agent and the OpenTelemetry Collector Datadog exporter:
- Sums
- Gauges
- Histograms
- Summaries

These OTLP metric types are mapped to Datadog metric types:

- COUNT
- GAUGE
- DISTRIBUTION

A single OTLP metric may be mapped to several Datadog metrics with a suffix indicating their meaning.

**Note**: OpenTelemetry provides metric API instruments (`Gauge`, `Counter`, `UpDownCounter`, `Histogram`, and so on), whose measurements can be exported as OTLP metrics (Sum, Gauge, Histogram). Other sources for OTLP metrics are possible. Applications and libraries may provide customization into the OTLP metrics they produce. Read the documentation of your OpenTelemetry SDK or OTLP-producing application to understand the OTLP metrics produced and how to customize them.

## Metric types

### Mapping


{{< tabs >}}
{{% tab "Sum" %}}

An OTLP Sum represents a sum of reported measurements over a time window. For example, a Sum can be used to track the total number of connections made to a database or the total number of requests to an endpoint. Sums have two features that influence the mapping:

- *Aggregation temporality*, which can be cumulative or delta. Delta metrics have no overlap in their time windows, while cumulative metrics represent a time window from a fixed start point in time.
- *Monotonicity*. Monotonic sums never decrease and only support adding to the underlying count.

The default mapping is as follows:
1. For cumulative monotonic sums, the delta between consecutive points is calculated and reported to Datadog as a count. The first point is stored but omitted. To recover the value in the OTLP payload, use the [`cumsum` arithmetic function][1].
2. Cumulative non-monotonic sums are exported as Datadog gauges.
3. Delta sums are exported as Datadog counts.

[1]: /dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Gauge" %}}

An OTLP Gauge represents a sampled value at a given time. Only the last value on a given time window is included in the OTLP metrics.

OTLP Gauges are mapped to Datadog Gauges, since they do not provide an aggregation semantic. Both integer and floating-point Gauge data points are mapped to floating point numbers in the Datadog format. 

{{% /tab %}}
{{% tab "Histogram" %}}

An OTLP Histogram represents the statistical distribution of a set of values on a given time window, by storing certain aggregation metrics such as the population sum or count together with a series of bucket counts. Histograms have one feature that influences the mapping:

- *Aggregation temporality*, which can be cumulative or delta. Delta metrics have no overlap in their time windows, while cumulative metrics represent a time window from a fixed start point in time.

The default mapping is as follows:
1. Delta histograms are reported as Datadog distributions. [Read more about distributions][1] to understand the available aggregations.
2. For cumulative histograms, the delta between consecutive points is calculated and reported to Datadog as a distribution. You may use the [`cumsum` arithmetic function][2] on individual aggregations to recover the value in the OTLP payload.

The Datadog Agent and the OpenTelemetry Collector Datadog exporter allow changing the Histogram export in the `histogram` subsection.
- If the `mode` is set to `counters`, the following metrics are produced:

`<METRIC_NAME>.bucket`, tagged by `lower_bound` and `upper_bound`
: Bucket count in the time window for the bucket with the specified lower and upper bounds.<br>
**Datadog In-App Type**: COUNT

- If the `send_count_sum_metrics` flag is enabled, the following metrics are produced:

`<METRIC_NAME>.sum`
: Sum of the values submitted during the time window.<br>
**Datadog In-App Type**: COUNT

`<METRIC_NAME>.count`
: Number of values submitted during the time window.<br>
**Datadog In-App Type**: COUNT

**Note**: `send_count_sum_metrics` is useful only when not using the distributions mode.

[1]: /metrics/distributions
[2]: /dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Summary" %}}

An OTLP Summary is a legacy type that conveys quantile information about a population over a time window. OTLP Summary types are not produced by OpenTelemetry SDKs but may be produced by other components for backwards compatibility.

`<METRIC_NAME>.sum`
: Sum of the values since the application started producing the metric.<br>
**Datadog In-App Type**: COUNT

`<METRIC_NAME>.count`
: Number of values in the population . <br>
**Datadog In-App Type**: COUNT

`<METRIC_NAME>.quantile`, tagged by `quantile`
: Value of a given quantile.<br>
**Datadog In-App Type**: GAUGE

{{% /tab %}}
{{< /tabs >}}

### Attribute mapping

OTLP supports two kinds of attributes: datapoint-level attributes and resource attributes. These attributes may follow OpenTelemetry semantic conventions and have well-known semantics.

The Datadog Agent and the OpenTelemetry Collector Datadog exporter map the datapoints-level attributes as tags. Resource attributes following OpenTelemetry semantic conventions are mapped to the equivalent Datadog conventions if they exist.

You may add all resource attributes as tags by using the `resource_attributes_as_tags` flag.

### Hostname resolution

OpenTelemetry defines certain semantic conventions related to host names. If an OTLP payload has a known hostname attribute, Datadog honors these conventions and tries to use its value as a hostname. The semantic conventions are considered in the following order:

1. `datadog.host.name`, a Datadog-specific hostname convention
2. `k8s.node.name`, the Kubernetes node name
3. Cloud provider-specific conventions, based on the `cloud.provider` semantic convention
4. `host.id`, the unique host ID
5. `host.name`, the system hostname
6. `container.id`, the container ID

If none are present, Datadog assigns a system-level hostname to payloads.
On the OpenTelemetry Collector, add the ['resource detection' processor][1] to your pipelines for accurate hostname resolution.

### Example

{{< tabs >}}
{{% tab "Sum" %}}

Suppose you are using an OpenTelemetry Counter instrument from a single application, which, by default, exports metrics of a cumulative **monotonic** Sum type. The following table summarizes Datadog behavior:

| Collection period | Counter values    | OTLP Sum value | Value reported to Datadog | Datadog In-App Type | Notes                                          |
|-------------------|-------------------|----------------|---------------------------| ------------------- |------------------------------------------------|
| #1                | [1,1,1,2,2,2,3,3] | 15             | None                      |  COUNT              | First collection period value is not reported. |
| #2                | [3,4,1,2]         | 25             | 10                        |  COUNT              | The difference between values is reported.     |
| #3                | []                | 25             | 0                         |  COUNT              | No new values were reported in this period.    |

Suppose you are using an OpenTelemetry UpDownCounter instrument from a single application, which, by default, exports metrics of a cumulative Sum type. The following table summarizes Datadog behavior:

| Collection period | UpDownCounter values | OTLP Sum value | Value reported to Datadog | Datadog In-App Type |
|-------------------|----------------------|----------------|---------------------------| ------------------- |
| #1                | [1,1,1,2,2,2,3,3]    | 15             | 15                        | GAUGE               |
| #2                | [3,-4,1,2]           | 17             | 17                        | GAUGE               |
| #3                | [-1]                 | 16             | 16                        | GAUGE               |

{{% /tab %}}
{{% tab "Gauge" %}}

Suppose you are using an OpenTelemetry Gauge instrument, `temperature`, from a single application.
The following table summarizes Datadog behavior:

| Collection period | Gauge instrument | OTLP Gauge value | Value reported to Datadog | Datadog In-App Type |
|-------------------|------------------|------------------|---------------------------| ------------------- |
| #1                | 71.5             | 71.5             | 71.5                      | GAUGE               |
| #2                | 72               | 72               | 72                        | GAUGE               |
| #3                | 70               | 70               | 70                        | GAUGE               |

{{% /tab %}}
{{% tab "Histogram" %}}

Suppose you are using an OpenTelemetry Histogram instrument, `request.response_time.histogram`, from two web servers: `webserver:web_1` and `webserver:web_2`. Suppose in a given collection period, `webserver:web_1` reports the metric with the values `[1,1,1,2,2,2,3,3]`, and `webserver:web_2` reports the same metric with the values `[1,1,2]`. Over this collection period, the following five aggregations represent the global statistical distribution of all values collected from both web servers:

| Metric Name                                | Value  | Datadog In-App Type |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

[Read more about distributions][1] to understand how to configure further aggregations.

Alternatively, if you are using the `counters` mode and enabling the `send_count_sum_metrics` flag, the following metrics would be reported if the histogram bucket boundaries are set to `[-inf, 2, inf]`:

| Metric Name                                 | Value  | Tags                                | Datadog In-App Type |
| ------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`  | `8`    | n/a                                 | COUNT               |
| `request.response_time.distribution.sum`    | `15`   | n/a                                 | COUNT               |
| `request.response_time.distribution.bucket` | `6`    | `lower_bound:-inf`, `upper_bound:2` | GAUGE               |
| `request.response_time.distribution.bucket` | `2`    | `lower_bound:2`, `upper_bound:inf`  | GAUGE               |

[1]: /metrics/distributions
{{% /tab %}}
{{% tab "Summary" %}}

Suppose you are submitting a legacy OTLP Summary metric, `request.response_time.summary`, from one web server. Suppose in a given collection period, the web server reports the metric with the values `[1,1,1,2,2,2,3,3]`. The following metrics would be reported, if min, max, and median quantiles are enabled:

| Metric Name                                   | Value  | Tags                                | Datadog In-App Type |
| --------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`    | `8`    | n/a                                 | COUNT               |
| `request.response_time.distribution.sum`      | `15`   | n/a                                 | COUNT               |
| `request.response_time.distribution.quantile` | `1`    | `quantile:0`                        | GAUGE               |
| `request.response_time.distribution.quantile` | `2`    | `quantile:0.5`                      | GAUGE               |
| `request.response_time.distribution.quantile` | `3`    | `quantile:1.0`                      | GAUGE               |


{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
