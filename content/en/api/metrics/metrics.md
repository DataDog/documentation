---
title: Metrics
type: apicontent
order: 26
external_redirect: /api/#metrics
---

## Metrics

The metrics endpoint allows you to:

* Post metrics data so it can be graphed on Datadog's dashboards
* Query metrics from any time period

Note that a graph can only contain a set number of points, and as the timeframe over which a metric is viewed increases, aggregation between points occurs to stay below that set number.

Datadog has a soft limit of 100 timeseries per host, where a timeseries is defined as a unique combination of metric name and tag.