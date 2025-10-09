---
title: OTLP Metrics Types
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Reference > OTLP Metrics Types
---

# OTLP Metrics Types

## Overview{% #overview %}

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

**Note**: OpenTelemetry protocol supports two ways of representing metrics in time: [Cumulative and Delta temporality](https://opentelemetry.io/docs/reference/specification/metrics/data-model/#temporality), affecting the metrics described below. Set the temporality preference of the OpenTelemetry implementation to **DELTA**, because setting it to CUMULATIVE may discard some data points during application (or collector) startup. For more information, read [Producing Delta Temporality Metrics with OpenTelemetry](http://localhost:1313/opentelemetry/guide/otlp_delta_temporality/).

## Metric types{% #metric-types %}

### Mapping{% #mapping %}

{% tab title="Sum" %}
An OTLP Sum represents a sum of reported measurements over a time window. For example, a Sum can be used to track the total number of connections made to a database or the total number of requests to an endpoint. Sums have two features that influence the mapping:

- *Aggregation temporality*, which can be cumulative or delta. Delta metrics have no overlap in their time windows, while cumulative metrics represent a time window from a fixed start point in time.
- *Monotonicity*. Monotonic sums never decrease and only support adding to the underlying count.

The default mapping is as follows:

1. For cumulative monotonic sums, the delta between consecutive points is calculated and reported to Datadog as a count. The first point is stored but omitted. To recover the value in the OTLP payload, use the [`cumsum` arithmetic function](http://localhost:1313/dashboards/functions/arithmetic/#cumulative-sum).
1. Cumulative non-monotonic sums are exported as Datadog gauges.
1. Delta sums are exported as Datadog counts.

{% /tab %}

{% tab title="Gauge" %}
An OTLP Gauge represents a sampled value at a given time. Only the last value on a given time window is included in the OTLP metrics.

OTLP Gauges are mapped to Datadog Gauges, since they do not provide an aggregation semantic. Both integer and floating-point Gauge data points are mapped to floating point numbers in the Datadog format.
{% /tab %}

{% tab title="Histogram" %}
An OTLP Histogram represents the statistical distribution of a set of values on a given time window, by storing certain aggregation metrics such as the population sum or count together with a series of bucket counts. Histograms have one feature that influences the mapping:

- *Aggregation temporality*, which can be cumulative or delta. Delta metrics have no overlap in their time windows, while cumulative metrics represent a time window from a fixed start point in time.

The default mapping is as follows:

1. Delta histograms are reported as Datadog distributions. [Read more about distributions](http://localhost:1313/metrics/distributions) to understand the available aggregations. Histograms with a count of 0 are dropped.
1. For cumulative histograms, the delta between consecutive points is calculated and reported to Datadog as a distribution. Deltas with a count of 0 are not reported. You may use the [`cumsum` arithmetic function](http://localhost:1313/dashboards/functions/arithmetic/#cumulative-sum) on individual aggregations to recover the value in the OTLP payload.

**Note**: Histogram metrics in OTLP are mapped by default to Distribution metrics. Because of how OTLP sends this data, percentile aggregations and the max and min (if not available on the original OTLP data) are approximations, not accurate calculations.

The Datadog Agent and the OpenTelemetry Collector Datadog exporter allow changing the Histogram export in the `histogram` subsection.

- If the `mode` is set to `counters`, the following metrics are produced:

{% dl %}

{% dt %}
`<METRIC_NAME>.bucket`, tagged by `lower_bound` and `upper_bound`
{% /dt %}

{% dd %}
Bucket count in the time window for the bucket with the specified lower and upper bounds.**Datadog In-App Type**: COUNT
{% /dd %}

{% /dl %}

- If the `send_aggregation_metrics` flag is enabled, the following metrics are produced:

{% dl %}

{% dt %}
`<METRIC_NAME>.sum`
{% /dt %}

{% dd %}
Sum of the values submitted during the time window.**Datadog In-App Type**: COUNT
{% /dd %}

{% dt %}
`<METRIC_NAME>.count`
{% /dt %}

{% dd %}
Number of values submitted during the time window.**Datadog In-App Type**: COUNT
{% /dd %}

{% dt %}
`<METRIC_NAME>.min`
{% /dt %}

{% dd %}
Minimum of values submitted during the time window. Only available for delta OTLP Histograms. Available since: Datadog exporter v0.75.0 and Datadog Agent v6.45.0 and v7.45.0.**Datadog In-App Type**: GAUGE
{% /dd %}

{% dt %}
`<METRIC_NAME>.max`
{% /dt %}

{% dd %}
Maximum of values submitted during the time window. Only available for delta OTLP Histograms. Available since: Datadog exporter v0.75.0 and Datadog Agent v6.45.0 and v7.45.0.**Datadog In-App Type**: GAUGE
{% /dd %}

{% /dl %}

**Note**: `send_aggregation_metrics` is useful only when not using the distributions mode. Before the Datadog exporter v0.75.0 and the Datadog Agent v6.45.0 and v7.45.0 use `send_count_sum_metrics` instead.
{% /tab %}

{% tab title="Summary" %}
An OTLP Summary is a legacy type that conveys quantile information about a population over a time window. OTLP Summary types are not produced by OpenTelemetry SDKs but may be produced by other components for backwards compatibility.

{% dl %}

{% dt %}
`<METRIC_NAME>.sum`
{% /dt %}

{% dd %}
Sum of the values since the application started producing the metric.**Datadog In-App Type**: COUNT
{% /dd %}

{% dt %}
`<METRIC_NAME>.count`
{% /dt %}

{% dd %}
Number of values in the population .**Datadog In-App Type**: COUNT
{% /dd %}

{% dt %}
`<METRIC_NAME>.quantile`, tagged by `quantile`
{% /dt %}

{% dd %}
Value of a given quantile.**Datadog In-App Type**: GAUGE
{% /dd %}

{% /dl %}

{% /tab %}

### Attribute mapping{% #attribute-mapping %}

OTLP supports two kinds of attributes: datapoint-level attributes and resource attributes. These attributes may follow OpenTelemetry semantic conventions and have well-known semantics.

The Datadog Agent and the OpenTelemetry Collector Datadog exporter map the datapoints-level attributes as tags. Resource attributes following OpenTelemetry semantic conventions are mapped to the equivalent Datadog conventions if they exist.

You may add all resource attributes as tags by using the `resource_attributes_as_tags` flag.

### Example{% #example %}

{% tab title="Sum" %}
Suppose you are using an OpenTelemetry Counter instrument from a single application, which, by default, exports metrics of a cumulative **monotonic** Sum type. The following table summarizes Datadog behavior:

| Collection period | Counter values    | OTLP Sum value | Value reported to Datadog | Datadog In-App Type | Notes                                          |
| ----------------- | ----------------- | -------------- | ------------------------- | ------------------- | ---------------------------------------------- |
| \#1               | [1,1,1,2,2,2,3,3] | 15             | None                      | COUNT               | First collection period value is not reported. |
| \#2               | [3,4,1,2]         | 25             | 10                        | COUNT               | The difference between values is reported.     |
| \#3               | []                | 25             | 0                         | COUNT               | No new values were reported in this period.    |

Suppose you are using an OpenTelemetry UpDownCounter instrument from a single application, which, by default, exports metrics of a cumulative Sum type. The following table summarizes Datadog behavior:

| Collection period | UpDownCounter values | OTLP Sum value | Value reported to Datadog | Datadog In-App Type |
| ----------------- | -------------------- | -------------- | ------------------------- | ------------------- |
| \#1               | [1,1,1,2,2,2,3,3]    | 15             | 15                        | GAUGE               |
| \#2               | [3,-4,1,2]           | 17             | 17                        | GAUGE               |
| \#3               | [-1]                 | 16             | 16                        | GAUGE               |

{% /tab %}

{% tab title="Gauge" %}
Suppose you are using an OpenTelemetry Gauge instrument, `temperature`, from a single application. The following table summarizes Datadog behavior:

| Collection period | Gauge instrument | OTLP Gauge value | Value reported to Datadog | Datadog In-App Type |
| ----------------- | ---------------- | ---------------- | ------------------------- | ------------------- |
| \#1               | 71.5             | 71.5             | 71.5                      | GAUGE               |
| \#2               | 72               | 72               | 72                        | GAUGE               |
| \#3               | 70               | 70               | 70                        | GAUGE               |

{% /tab %}

{% tab title="Histogram" %}
Suppose you are using an OpenTelemetry Histogram instrument, `request.response_time.histogram`, from two web servers: `webserver:web_1` and `webserver:web_2`. Suppose in a given collection period, `webserver:web_1` reports the metric with the values `[1,1,1,2,2,2,3,3]`, and `webserver:web_2` reports the same metric with the values `[1,1,2]`. Over this collection period, the following five aggregations represent the global statistical distribution of all values collected from both web servers:

| Metric Name                                | Value  | Datadog In-App Type |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

[Read more about distributions](http://localhost:1313/metrics/distributions) to understand how to configure further aggregations.

Alternatively, if you are using the `counters` mode, the `send_aggregation_metrics` flag is enabled, and the histogram bucket boundaries are set to `[-inf, 2, inf]`, the following metrics are reported:

| Metric Name                                 | Value | Tags                                | Datadog In-App Type |
| ------------------------------------------- | ----- | ----------------------------------- | ------------------- |
| `request.response_time.distribution.count`  | `8`   | n/a                                 | COUNT               |
| `request.response_time.distribution.sum`    | `15`  | n/a                                 | COUNT               |
| `request.response_time.distribution.max`    | `3`   | n/a                                 | GAUGE               |
| `request.response_time.distribution.min`    | `1`   | n/a                                 | GAUGE               |
| `request.response_time.distribution.bucket` | `6`   | `lower_bound:-inf`, `upper_bound:2` | GAUGE               |
| `request.response_time.distribution.bucket` | `2`   | `lower_bound:2`, `upper_bound:inf`  | GAUGE               |

{% /tab %}

{% tab title="Summary" %}
Suppose you are submitting a legacy OTLP Summary metric, `request.response_time.summary`, from one web server. Suppose in a given collection period, the web server reports the metric with the values `[1,1,1,2,2,2,3,3]`. The following metrics would be reported, if min, max, and median quantiles are enabled:

| Metric Name                                   | Value | Tags           | Datadog In-App Type |
| --------------------------------------------- | ----- | -------------- | ------------------- |
| `request.response_time.distribution.count`    | `8`   | n/a            | COUNT               |
| `request.response_time.distribution.sum`      | `15`  | n/a            | COUNT               |
| `request.response_time.distribution.quantile` | `1`   | `quantile:0`   | GAUGE               |
| `request.response_time.distribution.quantile` | `2`   | `quantile:0.5` | GAUGE               |
| `request.response_time.distribution.quantile` | `3`   | `quantile:1.0` | GAUGE               |

{% /tab %}

## Further reading{% #further-reading %}

- [Learn more about distributions](http://localhost:1313/metrics/distributions)
- [Learn more about OpenTelemetry](http://localhost:1313/opentelemetry/)
- [Producing delta temporality metrics with OpenTelemetry](http://localhost:1313/opentelemetry/guide/otlp_delta_temporality/)
