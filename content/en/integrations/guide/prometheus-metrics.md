---
title: Mapping Prometheus Metrics to Datadog Metrics
kind: guide
aliases:
  - /integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: "https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics"
  tag: "Blog"
  text: "Create a stored procedure to generate and collect metrics"
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "Datadog-MySQL integration"
- link: "/agent/kubernetes/prometheus/"
  tag: "Documentation"
  text: "Kubernetes Prometheus and OpenMetrics metrics collection"
---

If you are using Datadog's Prometheus or OpenMetrics checks, you may be interested in how these metrics map to existing Datadog metrics types.

See [Kubernetes Prometheus and OpenMetrics Metrics Collection][1] for more information.

## Prometheus and OpenMetrics metric types

* `counter`: a cumulative metric that represents a single monotonically increasing counter, whose value can only increase—or be reset to zero.
* `gauge`: a metric that represents a single numeric value, which can arbitrarily go up and down.
* `histogram`: samples observations and counts them in configurable buckets; also provides a sum of all observed values.
* `summary`: similar to histogram; samples observations, provides a sum of all observed values, and calculates configurable quantiles over a sliding time window.

## How Prometheus/OpenMetrics metrics map to Datadog metrics

For more information, see [Datadog Metric Types][2].

### Counter

By default, [Prometheus/OpenMetrics `counter`][3] is mapped to Datadog's `monotonic_count`.

However, if the parameter `send_monotonic_counter` is `false`, then this metric is sent as `gauge`. [Read more about monotonic counters][4].

### Gauge

[Prometheus/OpenMetrics `gauge`][5] maps to Datadog's `gauge`.

### Histogram

For [Prometheus/OpenMetrics `histogram`][6], the `_count` and `_sum` values of the histogram are each mapped to Datadog's `gauge`.

If the parameter `collect_histogram_buckets` is `true`, each `_bucket` value is also mapped to Datadog's `gauge`.

If the parameter `send_distribution_buckets` is `true`, each `_bucket` is mapped to Datadog's `distribution`. Prometheus/OpenMetrics histogram data is converted to Datadog distribution metrics to allow for monitoring Kubernetes metrics as percentiles in Datadog. Datadog distribution metrics are based on the [DDSketch algorithm][7]. For more information, see the relevant Datadog [blog post on OpenMetrics and distribution metrics][8].

If the parameter `send_distribution_counts_as_monotonic` is `true`, each metric ending in `_count` is submitted as `monotonic_count`. [Read more about monotonic counters][4].

### Summary

For [Prometheus/OpenMetrics `summary`][9], the `_count` and `_sum` values of the summary are each mapped to Datadog's `count`.

If the parameter `send_distribution_buckets` is `true`, the histogram is converted to a distribution, and each `_bucket` can be fetched using `distribution` tags.

If the parameter `send_distribution_counts_as_monotonic` is `true`, each metric ending in `_count` is submitted as `monotonic_count`. [Read more about monotonic counters][4].

[1]: /agent/kubernetes/prometheus/
[2]: /metrics/types/
[3]: https://prometheus.io/docs/concepts/metric_types/#counter
[4]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[5]: https://prometheus.io/docs/concepts/metric_types/#gauge
[6]: https://prometheus.io/docs/concepts/metric_types/#histogram
[7]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[8]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[9]: https://prometheus.io/docs/concepts/metric_types/#summary
