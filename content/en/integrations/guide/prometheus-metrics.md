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
---

If you are using Datadog's Prometheus or OpenMetrics checks, you may be interested in how these metrics map to existing Datadog metrics types. 

## Prometheus and OpenMetrics metric types

* `counter`: a cumulative metric that represents a single monotonically increasing counter, whose value can only increase—or be reset to zero.
* `gauge`: a metric that represents a single numerican value, which can arbitrarily go up and down.
* `histogram`: samples observations and counts them in configurable buckets; also provides a sum of all observed values.
* `summary`: similar to histogram; samples observations, provides a sum of all observed values, and calculates configurable quantiles over a sliding time window.

## How Prometheus/OpenMetrics metrics map to Datadog metrics

For more information about Datadog metric types, see the [Datadog Metric Types documentation][1].

### Counter

By default, [Prometheus/OpenMetrics `counter`][2] is mapped to Datadog's `gauge`.

However, if the parameter `send_monotonic_counter` is `true`, then this metric is sent as `monotonic_counter`. [Read more about monotonic counters][8].

### Gauge

[Prometheus/OpenMetrics `gauge`][3] maps to Datadog's `gauge`.

### Histogram

For [Prometheus/OpenMetrics `histogram`][4], the `_count` and `_sum` values of the histogram are each mapped to Datadog's `gauge`.

If the parameter `send_histograms_buckets` is `true`, each `_bucket` value is also mapped to Datadog's `gauge`.

If the parameter `send_distribution_buckets` is `true`, each `_bucket` is mapped to Datadog's `distribution`. Prometheus/OpenMetrics histogram data is converted to Datadog distribution metrics to allow for easily monitoring Kubernetes metrics as percentiles in Datadog. Datadog distribution metrics are based on the [DDSketch algorithm][5]. For more information, see the relevant Datadog [blog post on OpenMetrics and distribution metrics][6].

If the parameter `send_distribution_counts_as_monotonic` is `true`, each metric ending in `_count` is submitted as `monotonic_count`. [Read more about monotonic counters][8].

### Summary

For [Prometheus/OpenMetrics `summary`][7], the `_count` and `_sum` values of the summary are each mapped to Datadog's `gauge`.

If the parameter `send_distribution_buckets` is `true`, the histogram is converted to a distribution, and each `_bucket` can be fetched using `distribution` tags.

If the parameter `send_distribution_counts_as_monotonic` is `true`, each metric ending in `_count` is submitted as `monotonic_count`. [Read more about monotonic counters][8].

[1]: /developers/metrics/types/
[2]: https://prometheus.io/docs/concepts/metric_types/#counter
[3]: https://prometheus.io/docs/concepts/metric_types/#gauge
[4]: https://prometheus.io/docs/concepts/metric_types/#histogram
[5]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[6]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[7]: https://prometheus.io/docs/concepts/metric_types/#summary
[8]: /developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
