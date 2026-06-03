---
title: Metrics Experience Changes for Metric Name Pricing
description: "Learn how the custom metrics experience in Datadog has been updated to reflect Metric Name Pricing, including changes to the Manage Tags modal, Metric side panel, Volume Management page, Plan & Usage page, and estimated usage metrics."
further_reading:
- link: "/account_management/billing/metric_name_pricing/"
  tag: "Documentation"
  text: "Metric Name Pricing for Custom Metrics"
- link: "/metrics/metrics-without-limits/"
  tag: "Documentation"
  text: "Metrics without Limits™"
- link: "/account_management/billing/usage_metrics/"
  tag: "Documentation"
  text: "Estimated Usage Metrics"
- link: "/metrics/volume/"
  tag: "Documentation"
  text: "Metrics Volume Management"
algolia:
  tags: ['metric name pricing', 'custom metrics', 'estimated usage metrics']
private: true
---

## Overview

With the [Metric Name Pricing billing model][1] for custom metrics, Datadog has updated the metrics experience to reflect how usage is measured. This guide describes what has changed in the Datadog UI and APIs for organizations on Metric Name Pricing.

**Note**: This page applies only if your organization is on [Metric Name Pricing][1]. If your contract uses Timeseries (cardinality) pricing, your metrics experience is unchanged.

## Summary of changes

| Feature | What changed |
|---------|-------------|
| [Manage Tags modal](#manage-tags-modal) | Estimates the impact of tag changes on point volume instead of cardinality volume. |
| [Metric side panel](#metric-side-panel) | Displays ingested and indexed point volume instead of timeseries volume. |
| [Volume Management page](#volume-management-page) | Displays ingested and indexed point volume, plus billing dimension graphs for Metric Name Pricing. |
| [Plan & Usage page](#plan--usage-page) | Reflects the Metric Name Pricing billing breakdown. |
| [Estimated usage metrics](#estimated-usage-metrics) | New points-volume metrics replace cardinality-based estimated usage metrics. |
| [Metric volume API endpoints](#metric-volume-api-endpoints) | Behavior changes for the metric volume estimate and volumes endpoints. |

## Manage Tags modal

When configuring tags on custom metrics, the **Manage Tags** modal estimates the impact of tag changes on **point volume** instead of cardinality volume.

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="The Manage Tags modal showing a usage projection chart with three lines: month-to-date usage, usage with current configuration, and usage with proposed configuration. Tags datacenter and service are configured in the Include tags tab." style="width:100%;" >}}

For more information on configuring tags, see [Metrics without Limits™][2].

## Metric side panel

The metric details side panel displays **ingested and indexed point volume** instead of timeseries volume.

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="The metric details side panel showing INGESTED POINTS and INDEXED POINTS at the top, alongside Hosts and Tag Values." style="width:100%;" >}}

To open the metric side panel, click any metric name on the [Metrics Summary page][3].

## Volume Management page

The [Metrics Volume Management page][4] displays **ingested and indexed point volume**.

The Volume Overview graphs also display billing dimensions specific to Metric Name Pricing, including:

- Estimated unique metric names
- Billable indexed point volume
- Ingested-to-indexed points ratio

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="Three Volume Overview graphs for Metric Name Pricing: Estimated Unique Metric Names (count of metrics with more than 100 indexed points month-to-date), Estimated Total Points (total indexed points exceeding the 10M per-metric allotment month-to-date), and Estimated Ingested to Indexed Points Ratio." style="width:100%;" >}}

## Plan & Usage page

The [Plan & Usage page][5] reflects the Metric Name Pricing billing breakdown for organizations on the new model.

## Estimated usage metrics

Datadog provides estimated usage metrics so you can monitor your Metric Name Pricing usage in real time. Use these metrics to set up monitors and dashboards for cost visibility.

<div class="alert alert-warning">Cardinality-based estimated usage metrics (<code>datadog.estimated_usage.metrics.custom</code> and related metrics) are no longer available for organizations on Metric Name Pricing. Any monitors, dashboards, or other assets that use the cardinality-based metrics stop receiving data. Use the points-volume metrics listed below instead.</div>

### Billable usage metrics

Use these metrics to estimate your month-to-date billable usage under Metric Name Pricing:

| Metric | What it represents |
|--------|-------------------|
| `datadog.estimated_usage.billable.metrics` | Count of metric names with more than 100 indexed points, month-to-date. |
| `datadog.estimated_usage.billable.points` | Sum of indexed points above the included 10M points per metric name, month-to-date. |
| `datadog.estimated_usage.metrics.points.ratio` | Comparison of total ingested points to total indexed points. |

### Points-volume usage metrics

For more granular analysis, use the following real-time and hourly metrics:

| Metric | What it represents |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | Estimated indexed custom metric points over a rolling 60-minute window. |
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | Estimated indexed custom metric points over a rolling 60-minute window, broken down by usage attribution tags. |
| `datadog.estimated_usage.metrics.points.indexed.hourly` | Estimated total indexed custom metric points submitted each hour, for cumulative month-to-date calculations. |
| `datadog.estimated_usage.metrics.points.ingested` | Estimated ingested custom metric points over a rolling 60-minute window. |
| `datadog.estimated_usage.metrics.points.ingested.hourly` | Estimated total ingested custom metric points submitted each hour, for cumulative month-to-date calculations. |

For more information, see [Estimated Usage Metrics][6].

## Metric volume API endpoints

The following API changes apply for organizations on Metric Name Pricing:

- **`/api/v2/metrics/{metric_name}/estimate`**: This endpoint returns a 403 error. Use `/api/unstable/metrics/{metric_name}/points/estimate` instead to estimate point volume.
- **`/api/v2/metrics/{metric_name}/volumes`**: This endpoint returns the **total point volume** in the look-back window.

## Troubleshooting

For technical questions, contact [Datadog support][7].

For billing questions, contact your [Customer Success][8] Manager.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/metric_name_pricing/
[2]: /metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/summary
[4]: https://app.datadoghq.com/metric/volume
[5]: https://app.datadoghq.com/billing/usage
[6]: /account_management/billing/usage_metrics/
[7]: /help/
[8]: mailto:success@datadoghq.com
