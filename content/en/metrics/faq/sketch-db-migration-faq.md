---
title: SketchDB Migration FAq
kind: faq
is_beta: true
further_reading:
- link: "/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/"
  tag: "FAQ"
  text: "How to Send Logs to Datadog via External Log Shippers?"
---

## Why has my Distribution Metrics page been deprecated?

Datadog has a new pipeline for calculating globally accurate percentiles for your distribution metrics - this unlocks more query functionality and an easier configuration workflow for distributions.

## How does this new pipeline for Distributions affect me? 

- Unlocks new query functionalities:
  - Accurate percentiles in time for any historical timeframe (i.e., the past day, week, month) of their choosing.
  - Boolean filtered queries are now available with distribution metrics with percentiles, so that you can write queries like: `p99:request_latency_distribution{app:A OR app:B} by {app}`.
- Easier tag configuration and percentile aggregation workflows:
  - The Metrics Summaray page now centrally manages all tag configuration and percentile aggregations.
  - Use the the “Manage Tags” button on the Metrics Summary details side panel to manage all tag configurations for your distribution metrics.
  - To add percentile aggregations to your distribution, navigate to the new percentiles section on the side panel, click *Edit* and select “Include percentile aggregations” for the same queryable tags defined as your baseline distribution. You’ll no longer need to specify an additional configuration rule.
- More Intuitive number of Custom Metrics from Distributions with Percentiles:
  The number of custom metrics emitted from additional percentile aggregations is no longer 5 percentile timeseries for every potentially queryable tag value combination. The new number of custom metrics emitted from distributions with percentiles is now counted more similarly to our other metric types:

  | Metric Type                               | Query Type                                                                                                     | # of billable custom metrics emitted               |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| Distribution                              | Queryable by `count`, `sum`, `min`, `max`, and `avg`.                                                          | 5 * (tag value combinations emitted in your data)  |
| Distribution with Percentile Aggregations | Queryable by `count`, `sum`, `min`, `max`,`avg` + p50, `avg` + p75, `avg` + p90, `avg` + p95, and `avg` + p99. | 10 * (tag value combinations emitted in your data) |


## How can I configure tags on my Distribution metric? 

{{< img src="metrics/faq/sketch-db-migration-faq/configure-tags.png" alt="Configure tags">}}

Clicking the *Manage Tags* button allows you to configure which tags are queryable on a particular metric. You’ll be able to preview the new number of indexed custom metrics from your tag configuration before saving it.

{{< img src="metrics/faq/sketch-db-migration-faq/manage-tags.png" alt="Manage tags">}}

## How can I add percentiles to my Distribution metric? 

Click *edit* and “Include percentile aggregations” on the same queryable tags defined as your baseline distribution.

{{< img src="metrics/faq/sketch-db-migration-faq/add-percentiles.gif" alt="Add percentiles to a distribution metric">}}

## How can I add percentiles to multiple Distribution metrics?

Click the *Calculate Percentiles* button on the Metrics Summary page and use * for wildcard metric name(s).

{{< img src="metrics/faq/sketch-db-migration-faq/bulk-percentiles.gif" alt="Add percentiles to multiple distribution metrics">}}




