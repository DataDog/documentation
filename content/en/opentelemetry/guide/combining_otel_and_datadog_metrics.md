---
title: Combining OpenTelemetry and Datadog Metrics
further_reading:
    - link: '/metrics/'
      tag: 'Documentation'
      text: 'Metrics Documentation'
---

## Overview

Datadog and OpenTelemetry (OTel) use different naming conventions for integration metrics. This guide explains how to combine metrics from both systems in a single query using Datadog's `equiv_otel` function.

## Understanding the Problem

Subtleties that may arise when trying to combine Datadog and equivalent OTel integration metrics is best illustrated with an example.

If nginx is monitored by a Datadog integration, the metric emitted for the number of current active connections is named `nginx.net.connections`. OTel integrations do not emit a specific metric just for active connections. Rather OTel integrations emit a metric named `nginx.connections_current` to capture all connections regardless of their state, whether active or waiting. You can filter this metric down by filtering with the tag `state:active` to measure only active connections.

If you want to show the average number of active nginx connections using a metrics query, there are two challenges:

1. You need to know the names (and optionally metric filters) for both Datadog and OTel style naming conventions. It is often the case the query author has familiarity with one schema or the other. It would be uncommon, and burdensome, to understand the complete mapping of equivalences between integration metrics between these two standards.

2. Combining two separate metric queries together using [metrics functions][1] restricts you to combining the result of two metric queries, rather than aggregate all timeseries across both metric names as a single metric.

As an example, if we have two queries: `avg:nginx.net.connections`, and `avg:nginx.connections_current{state:active}`, we cannot represent the average of all contributing time series by combining these results. You cannot take an average of averages.

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
