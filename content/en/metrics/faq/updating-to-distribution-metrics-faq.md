---
title: Update to Distribution Metrics Workflow FAQ
is_beta: true
further_reading:
- link: "/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/"
  tag: "FAQ"
  text: "How to Send Logs to Datadog via External Log Shippers?"
---

## Why has my distribution metrics page been deprecated?

Datadog has released a new pipeline for calculating globally accurate percentiles for your distribution metrics --- this unlocks more query functionality and an easier configuration workflow for distributions.

## How does this new pipeline for Distributions affect me? 

- **Unlocks new query functionalities:**
  - Accurate percentiles in time for any historical timeframe (such as the past day, week, or month).
  - Boolean filtered queries are now available with distribution metrics with percentiles, so that you can write queries like: `p99:request_latency_distribution{app:A OR app:B} by {app}`.
- **Easier tag configuration and percentile aggregation workflows**:
  - All tag configuration-percentile aggregations are managed in one centralized location on the [Metrics Summary][1] page.
  - Use the "Manage Tags" button on the Metrics Summary details side panel to manage the queryable tags configuration for a distribution metric.
  - To add percentile aggregations to your distribution, navigate to the new percentiles section on the side panel, click *Edit* and select "Include" for percentile aggregations on the same queryable tags defined on your baseline distribution. You'll no longer need to specify an additional configuration rule.
- **More intuitive number of custom metrics from distributions with percentiles**:
  The number of custom metrics emitted from additional percentile aggregations is no longer 5 percentile timeseries for every potentially queryable tag value combination. The new number of custom metrics emitted from distributions with percentiles is now counted more similarly to our other metric types:

  | Metric Type                               | Query Type                                                                                                     | # of custom metrics emitted               |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| Distribution                              | Queryable by `count`, `sum`, `min`, `max`, and `avg`.                                                          | 5 for each tag value combination emitted in your data  |
| Distribution with percentile aggregations | Queryable by `count`, `sum`, `min`, `max`, `p50`,  `p75`,  `p90`, `p95`, and `p99`. | 10 for each tag value combination emitted in your data |


## How can I configure tags on my Distribution metric? 

{{< img src="metrics/faq/sketch-db-migration-faq/configure-tags.png" alt="Configure tags">}}

Click the **Manage Tags** button to configure which tags are queryable on a particular metric. You can preview the new number of indexed custom metrics from your tag configuration before saving it.

{{< img src="metrics/faq/sketch-db-migration-faq/manage-tags.png" alt="Manage tags">}}

## How can I add percentiles to my Distribution metric? 

Click **Edit** and select **Include** to include percentile aggregations on the same queryable tags defined on your baseline distribution.

{{< img src="metrics/faq/sketch-db-migration-faq/add-percentiles.mp4" alt="Add percentiles to a distribution metric" video=true >}}

## How can I add percentiles to multiple Distribution metrics?

Click **Calculate Percentiles** on the Metrics Summary page and use `*` for wildcarding metric names.

{{< img src="metrics/faq/sketch-db-migration-faq/bulk-percentiles.mp4" alt="Add percentiles to multiple distribution metrics" video=true >}}


[1]: https://app.datadoghq.com/metric/summary
