---
title: Mapping Prometheus Metrics to Datadog Metrics
kind: guide
aliases:
  - /integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: "https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics"
  tag: "Blog"
  text: "Create a stored procedure to generate and collect metrics"
- link: "/integrations/openmetrics/"
  tag: "Documentation"
  text: "Learn about the OpenMetrics integration"
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "Learn about the MySQL integration"
- link: "/agent/kubernetes/prometheus/"
  tag: "Documentation"
  text: "Kubernetes Prometheus and OpenMetrics metrics collection"
---

## Overview

This page walks you through how Prometheus or OpenMetrics check metrics map to existing Datadog metric types.

## Prometheus and OpenMetrics metric types

For more information, see [Kubernetes Prometheus and OpenMetrics Metrics Collection][1].

{{< tabs >}}
{{% tab "Latest Version" %}}
* `gauge`: A metric that represents a single numeric value, which can arbitrarily go up and down.
* `counter`: A cumulative metric that represents a single monotonically increasing counter, whose value can only increase—or be reset to zero.
* `stateset`: A metric that represents a series of related boolean values, also known as a bitset. 
* `info`: A metric that exposes textual information which should not change during the process lifetime. For example, an application's version, revision control commit, and the compiler version.
* `histogram`: Samples observations and counts them in configurable buckets; also provides a sum of all observed values.
* `gaugehistogram`: Samples current distributions and counts them in configurable buckets; also provides a sum of all observed values.
* `summary`: Similar to `histogram`; samples observations, provides a sum of all observed values, and calculates configurable quantiles over a sliding time window.

{{% /tab %}}
{{% tab "Before OpenMetrics v2.0.0" %}}

* `counter`: A cumulative metric that represents a single monotonically increasing counter, whose value can only increase—or be reset to zero.
* `gauge`: A metric that represents a single numeric value, which can arbitrarily go up and down.
* `histogram`: Samples observations and counts them in configurable buckets; also provides a sum of all observed values.
* `summary`: Similar to `histogram`; samples observations, provides a sum of all observed values, and calculates configurable quantiles over a sliding time window.
{{% /tab %}}
{{< /tabs >}}

## How Prometheus/OpenMetrics metrics map to Datadog metrics

For more information, see [OpenMetrics Metric Types][2] and [Datadog Metric Types][3].

{{< tabs >}}
{{% tab "Latest Version" %}}
### Gauge

[Prometheus/OpenMetrics `gauge`][101] maps to Datadog's `gauge`.

### Counter

By default, [Prometheus/OpenMetrics `counter`][102] is mapped to Datadog's `monotonic_count`. [Read more about monotonic counters][103].

### StateSet

TBD.

### Info
TBD.

### Histogram

For [Prometheus/OpenMetrics `histogram`][104], the `_count` and `_sum` values of the histogram are each mapped to Datadog's `gauge`.

If the parameter `collect_histogram_buckets` is `true`, each `_bucket` value is also mapped to Datadog's `gauge`.

If the parameter `send_distribution_buckets` is `true`, each `_bucket` is mapped to Datadog's `distribution`. Prometheus/OpenMetrics histogram data is converted to Datadog distribution metrics to allow for monitoring Kubernetes metrics as percentiles in Datadog. Datadog distribution metrics are based on the [DDSketch algorithm]. For more information, see the relevant Datadog [blog post on OpenMetrics and distribution metrics][105].

**Note**: For OpenMetrics v2.0.0, use `collect_counters_with_distributions` instead.

If the parameter `send_distribution_counts_as_monotonic` is `true`, each metric ending in `_count` is submitted as `monotonic_count`. [Read more about monotonic counters][103].

### GaugeHistogram

TBD.

### Summary

By default, [Prometheus/OpenMetrics `summary`][107] is mapped to Datadog's `monotonic_count`. [Read more about monotonic counters][103].

[101]: https://prometheus.io/docs/concepts/metric_types/#gauge
[102]: https://prometheus.io/docs/concepts/metric_types/#counter
[103]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://prometheus.io/docs/concepts/metric_types/#counter

{{% /tab %}}
{{% tab "Before OpenMetrics v2.0.0" %}}
### Counter

By default, [Prometheus/OpenMetrics `counter`][101] is mapped to Datadog's `monotonic_count`.

However, if the parameter `send_monotonic_counter` is `false`, then this metric is sent as `gauge`. [Read more about monotonic counters][102].

### Gauge

[Prometheus/OpenMetrics `gauge`][103] maps to Datadog's `gauge`.

### Histogram

For [Prometheus/OpenMetrics `histogram`][104], the `_count` and `_sum` values of the histogram are each mapped to Datadog's `gauge`.

If the parameter `collect_histogram_buckets` is `true`, each `_bucket` value is also mapped to Datadog's `gauge`.

If the parameter `send_distribution_buckets` is `true`, each `_bucket` is mapped to Datadog's `distribution`. Prometheus/OpenMetrics histogram data is converted to Datadog distribution metrics to allow for monitoring Kubernetes metrics as percentiles in Datadog. Datadog distribution metrics are based on the [DDSketch algorithm]. For more information, see the relevant Datadog [blog post on OpenMetrics and distribution metrics][106].

**Note**: For OpenMetrics v2.0.0, use `collect_counters_with_distributions` instead.

If the parameter `send_distribution_counts_as_monotonic` is `true`, each metric ending in `_count` is submitted as `monotonic_count`. [Read more about monotonic counters][102].

### Summary

For [Prometheus/OpenMetrics `summary`][105], the `_count` and `_sum` values of the summary are each mapped to Datadog's `count`.

If the parameter `send_distribution_buckets` is `true`, the histogram is converted to a distribution, and each `_bucket` can be fetched using `distribution` tags.

If the parameter `send_distribution_counts_as_monotonic` is `true`, each metric ending in `_count` is submitted as `monotonic_count`. [Read more about monotonic counters][102].

[101]: https://prometheus.io/docs/concepts/metric_types/#counter
[102]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[103]: https://prometheus.io/docs/concepts/metric_types/#gauge
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://prometheus.io/docs/concepts/metric_types/#summary
[106]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/prometheus/
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#metric-types
[3]: /metrics/types/