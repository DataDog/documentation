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

## How they map to Datadog metrics

For more information about Datadog metric types, see the [Metric Types documentation][1].

### Counter

By default, Prometheus/OpenMetrics `counter` is mapped to Datadog's `gauge`.

However, if the parameter `send_monotonic_counter` is `true`, then this metric is sent as `monotonic_counter`.

### Gauge

Prometheus/OpenMetrics `gauge` maps to Datadog's `gauge`.

### Histogram

For Prometheus/OpenMetrics `histogram`, the `_count` and `_sum` values of the histogram are each mapped to Datadog's `gauge`.

If the parameter `send_histograms_buckets` is `true`, each `_bucket` value is also mapped to Datadog's `gauge`.

If the parameter `send_distribution_buckets` is `true`, each `_bucket` is mapped to Datadog's `distribution`.

### Summary

For Prometheus/OpenMetrics `summary`, the `_count` and `_sum` values of the summary are each mapped to Datadog's `gauge`.

If the parameter `send_distribution_buckets` is `true`, each `_bucket` is mapped to Datadog's `distribution`.

[1]: /developers/metrics/types/
