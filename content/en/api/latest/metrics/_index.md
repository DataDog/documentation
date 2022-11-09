---
title: Metrics
---
The metrics endpoint allows you to:

- Post metrics data so it can be graphed on Datadog’s dashboards
- Query metrics from any time period
- Modify tag configurations for metrics
- View tags and volumes for metrics

**Note**: A graph can only contain a set number of points
and as the timeframe over which a metric is viewed increases,
aggregation between points occurs to stay below that set number.

The Post, Patch, and Delete `manage_tags` API methods can only be performed by
a user who has the `Manage Tags for Metrics` permission.

## Get a list of metrics

Returns all metrics that can be configured in the Metrics Summary page or with Metrics without Limits™ (matching additional filters if specified).

## Configure tags for multiple metrics

Delete all custom lists of queryable tag keys for a set of existing count, gauge, rate, and distribution metrics.
Metrics are selected by passing a metric name prefix.
Results can be sent to a set of account email addresses, just like the same operation in the Datadog web app.
Can only be used with application keys of users with the `Manage Tags for Metrics` permission.

## Configure tags for multiple metrics

Create and define a list of queryable tag keys for a set of existing count, gauge, rate, and distribution metrics.
Metrics are selected by passing a metric name prefix. Use the Delete method of this API path to remove tag configurations.
Results can be sent to a set of account email addresses, just like the same operation in the Datadog web app.
If multiple calls include the same metric, the last configuration applied (not by submit order) is used, do not
expect deterministic ordering of concurrent calls.
Can only be used with application keys of users with the `Manage Tags for Metrics` permission.

## List active tags and aggregations

List tags and aggregations that are actively queried on dashboards and monitors for a given metric name.

## List tags by metric name

View indexed tag key-value pairs for a given metric name.

## Tag Configuration Cardinality Estimator

Returns the estimated cardinality for a metric with a given tag, percentile and number of aggregations configuration using Metrics without Limits&trade;.

## Delete a tag configuration

Deletes a metric's tag configuration. Can only be used with application
keys from users with the `Manage Tags for Metrics` permission.

## List tag configuration by name

Returns the tag configuration for the given metric name.

## Update a tag configuration

Update the tag configuration of a metric or percentile aggregations of a distribution metric or custom aggregations
of a count, rate, or gauge metric.
Can only be used with application keys from users with the `Manage Tags for Metrics` permission.

## Create a tag configuration

Create and define a list of queryable tag keys for an existing count/gauge/rate/distribution metric.
Optionally, include percentile aggregations on any distribution metric or configure custom aggregations
on any count, rate, or gauge metric.
Can only be used with application keys of users with the `Manage Tags for Metrics` permission.

## List distinct metric volumes by metric name

View distinct metrics volumes for the given metric name.

Custom metrics generated in-app from other products will return `null` for ingested volumes.

## Submit metrics

The metrics end-point allows you to post time-series data that can be graphed on Datadog’s dashboards.
The maximum payload size is 500 kilobytes (512000 bytes). Compressed payloads must have a decompressed size of less than 5 megabytes (5242880 bytes).

If you’re submitting metrics directly to the Datadog API without using DogStatsD, expect:

- 64 bits for the timestamp
- 64 bits for the value
- 20 bytes for the metric names
- 50 bytes for the timeseries
- The full payload is approximately 100 bytes.

Host name is one of the resources in the Resources field.

