---
title: Mapping Prometheus Metrics to Datadog Metrics
kind: guide
aliases:
  - /integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: "/integrations/openmetrics/"
  tag: "Documentation"
  text: "Learn about the OpenMetrics integration"
- link: "/agent/kubernetes/prometheus/"
  tag: "Documentation"
  text: "Kubernetes Prometheus and OpenMetrics metrics collection"
---

## Overview

This page walks you through how Prometheus or OpenMetrics check metrics map to existing Datadog metric types.

## Prometheus and OpenMetrics metric types

* `counter`: A cumulative metric that represents a single monotonically increasing counter, whose value can only increase—or be reset to zero.
* `gauge`: A metric that represents a single numeric value, which can arbitrarily go up and down.
* `histogram`: Samples observations and counts them in configurable buckets; also provides a sum of all observed values.
* `summary`: Similar to `histogram`; samples observations, provides a sum of all observed values, and calculates configurable quantiles over a sliding time window.

## How Prometheus/OpenMetrics metrics map to Datadog metrics

For more information, see [OpenMetrics Metric Types][2] and [Datadog Metric Types][3].

{{< tabs >}}
{{% tab "Latest Version" %}}


| Metric Type | OpenMetrics | Datadog | 
| --- | --- | --- |
| [counter][110] | `counter` | `count` |
| [gauge][111] | `gauge` | `gauge` |
| [histogram][112] | `_count`, `_sum`, `_bucket` | The `_count`, `_sum`, and `_bucket` values of the histogram are each mapped to Datadog's `count` type and include a `.count`, `.sum`, and `.bucket` suffix, respectively. |
| [summary][113] | `_count`, `_sum`, `_created` | The `_count` and `_sum` values are mapped to Datadog's `count` type and include a `.count` and `.sum` suffix in their name, respectively. Quantile samples are mapped to a metric of type `gauge` with the `.quantile` suffix. | 

### Histogram

For [Prometheus/OpenMetrics `histogram`][104], the `_count`, `_sum`, and `_bucket` values of the histogram are each mapped to Datadog's `count` type and include a `.count`, `.sum`, and `.bucket` suffix in their names, respectively.

If the `histogram_buckets_as_distributions` parameter is `true`, `_bucket` samples are aggregated into a Datadog `distribution`. [Datadog distribution metrics][108] are based on the [DDSketch algorithm][109] and allow for more advanced statistical aggregations such as quantiles. For more information, see the Datadog Engineering Blog [post on OpenMetrics and distribution metrics][105].

`collect_counters_with_distributions` can be used to send `_count` and `_sum` values as `count`s alongside the distribution.


### Summary

For [Prometheus/OpenMetrics `summary`][107], `_count` and `_sum` values are mapped to Datadog's `count` type and include a `.count` and `.sum` suffix in their name, respectively. Quantile samples are mapped to a metric of type `gauge` with the `.quantile` suffix.

[101]: https://prometheus.io/docs/concepts/metric_types/#gauge
[102]: https://prometheus.io/docs/concepts/metric_types/#counter
[103]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://prometheus.io/docs/concepts/metric_types/#counter
[108]: /metrics/distributions/
[109]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[110]: https://prometheus.io/docs/concepts/metric_types/#gauge
[111]: https://prometheus.io/docs/concepts/metric_types/#counter
[112]: /integrations/guide/prometheus-metrics/?tab=latestversion#histogram
[113]: /integrations/guide/prometheus-metrics/?tab=latestversion#summary

{{% /tab %}}
{{% tab "Legacy Version" %}}
### Counter

By default, [Prometheus/OpenMetrics `counter`][101] maps to Datadog's `count`.

However, if the parameter `send_monotonic_counter` is `false`, then this metric is sent as `gauge`.

### Gauge

[Prometheus/OpenMetrics `gauge`][103] maps to Datadog's `gauge`.

### Histogram

For [Prometheus/OpenMetrics `histogram`][104], the `_count` and `_sum` values of the histogram are each mapped to Datadog's `gauge` type and include a `.count` and `.sum` suffix in their name, respectively.

If the `send_histograms_buckets` parameter is `true`, `_bucket` samples are sent to Datadog with a `.bucket` suffix, and are also mapped to Datadog's `gauge` by default.

Setting the `send_distribution_counts_as_monotonic` parameter to `true` causes the `_count` and `_bucket` metrics to be sent as type `count` instead. Setting `send_distribution_sums_as_monotonic` does the same for `_sum` metrics.

If the `send_distribution_buckets` parameter is `true`, `_bucket` samples are aggregated into a Datadog `distribution`. [Datadog distribution metrics][108] are based on the [DDSketch algorithm][107], and allow for more advanced statistical aggregations such as quantiles. For more information, see the Datadog Engineering Blog [post on OpenMetrics and distribution metrics][106].


### Summary

For [Prometheus/OpenMetrics `summary`][105], `_count` and `_sum` values are mapped to Datadog's `gauge` type by default, and include a `.count` and `.sum` suffix in their names, respectively. Quantile samples are mapped to a metric of type `gauge` with the `.quantile` suffix.

Setting the `send_distribution_counts_as_monotonic` parameter to `true` causes the `_count` and `_sum` metrics to be sent as type `count` instead. Setting `send_distribution_sums_as_monotonic` does the same for `_sum` metrics.

[101]: https://prometheus.io/docs/concepts/metric_types/#counter
[102]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[103]: https://prometheus.io/docs/concepts/metric_types/#gauge
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://prometheus.io/docs/concepts/metric_types/#summary
[106]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[108]: /metrics/distributions/

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">All <code>count</code> metrics are processed by the Agent as <em>monotonic counts</em>, meaning the Agent actually sends the difference between consecutive raw values. For more information, see <a href="/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count">Metric Submission: Custom Agent Check</a>.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/prometheus/
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#metric-types
[3]: /metrics/types/

