---
isPrivate: true
title: Combining OpenTelemetry and Datadog Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Guides > Combining OpenTelemetry and Datadog
  Metrics
---

# Combining OpenTelemetry and Datadog Metrics

## Overview{% #overview %}

{% callout %}
##### Join the Preview!

The `equiv_otel()` function is in Preview. If you have feedback related to this feature, reach out to your account team to provide input.
{% /callout %}

Datadog and OpenTelemetry (OTel) use different naming conventions for integration metrics. This guide explains how to combine metrics from both systems in a single query using Datadog's `equiv_otel` function.

{% alert level="info" %}
To query across Datadog and OpenTelemetry metrics in the Datadog UI, read the [Query OpenTelemetry Metrics](http://localhost:1313/metrics/open_telemetry/query_metrics) documentation.
{% /alert %}

## Challenges when combining metrics{% #challenges-when-combining-metrics %}

When working with both Datadog and OTel metrics, two main challenges arise. Let's examine these using NGINX connection monitoring as an example:

### Different naming conventions{% #different-naming-conventions %}

Datadog and OTel handle the same measurements differently:

- Datadog: `nginx.net.connections` (a specific metric for active connections)
- OTel: `nginx.connections_current` (captures all connection states in a single metric)
  - Requires filtering with `state:active` to match Datadog's active connections metric

### Aggregation limitations{% #aggregation-limitations %}

Simply combining separate metric queries can lead to incorrect results. For example, if you try to combine these queries:

```
avg:nginx.net.connections
avg:nginx.connections_current{state:active}
```

You get an average of averages, not the true average across all timeseries. This happens because traditional [metrics functions](http://localhost:1313/dashboards/functions) combine the results of separate queries rather than treating the data as a single metric.

## Combining metrics with the equiv_otel function{% #combining-metrics-with-the-equiv_otel-function %}

The `equiv_otel` function automatically combines equivalent Datadog and OTel metrics in a single query. It:

- Automatically handles metric name translation
- Properly aggregates all timeseries as a single metric
- Works bidirectionally (Datadog to OTel or OTel to Datadog)
- Preserves query aggregation semantics

### Converting from Datadog to OTel{% #converting-from-datadog-to-otel %}

To include the equivalent OTel metrics in your query, wrap your Datadog query in `equiv_otel`:

```
equiv_otel(avg:nginx.net.connections)
```

This query:

1. Identifies the equivalent OTel metric (`nginx.connections_current{state:active}`)
1. Combines timeseries from both metrics
1. Applies the aggregation (`avg`) across all datapoints

### Converting from OTel to Datadog{% #converting-from-otel-to-datadog %}

The same works for including Datadog metrics in an OTel query:

```
equiv_otel(avg:nginx.connections_current{state:active})
```

The function works the same way in reverse, automatically including the equivalent Datadog metric (`nginx.net.connections`).

## Further reading{% #further-reading %}

- [Metrics Documentation](http://localhost:1313/metrics/)
