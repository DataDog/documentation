---
title: Combining OpenTelemetry and Datadog Metrics
further_reading:
    - link: '/metrics/'
      tag: 'Documentation'
      text: 'Metrics Documentation'
---

## Overview

Datadog and OpenTelemetry (OTel) use different naming conventions for integration metrics. This guide explains how to combine metrics from both systems in a single query using Datadog's `equiv_otel` function.

## Challenges when combining metrics

When working with both Datadog and OTel metrics, two main challenges arise. Let's examine these using NGINX connection monitoring as an example:

### Different naming conventions

Datadog and OTel handle the same measurements differently:
- Datadog: `nginx.net.connections` (a specific metric for active connections)
- OTel: `nginx.connections_current` (captures all connection states in a single metric)
  - Requires filtering with `state:active` to match Datadog's active connections metric

### Aggregation limitations

Simply combining separate metric queries can lead to incorrect results. For example, if you try to combine these queries:
```
avg:nginx.net.connections
avg:nginx.connections_current{state:active}
```
You get an average of averages, not the true average across all timeseries. This happens because traditional [metrics functions][1] combine the results of separate queries rather than treating the data as a single metric.

## Datadog Makes Combining Datadog and OTel Integration Metrics Easy

The metrics function `equiv_otel` is provided to address both problems illustrated above.

If you have a Datadog style query for `avg:nginx.net.connections` and you want to actually examine the average of all nginx active connections regardless of whether that data is provided by a Datadog or OTel integration, simply specify your query as an argument to the `equiv_otel` function. The `equiv_otel` function will automatically convert the Datadog style query to the equivalent OTel query, and then aggregate the results of both queries together as if they were a single metric.

`equiv_otel(avg:nginx.net.connections)`

Upon seeing a query wrapped in `equiv_otel`, Datadog will first lookup the equivalent OTel named metric, and optionally a filter. In this case its `nginx.connections_current{state:active}`. Next all of the query aggregations, `avg` in this case, will be applied across all time series combined from these two metrics, preserving the aggregation semantics of hte original query.

This function works both ways. If you have an OTel query first, but want to change it to include all equivalent Datadog integration metrics, wrap it in `equiv_otel`. In this example, it would best

`equiv_otel(avg:nginx.current_connections{state:active})`

Datadog will know that the corresponding time series for nginx integrations observed by Datadog is `nginx.net.connections`. It will include these time series in the `avg` aggregation.

Now you don't have to worry about knowing the equivalences between integration metrics.

```
[1]: /dashboards/functions

```
