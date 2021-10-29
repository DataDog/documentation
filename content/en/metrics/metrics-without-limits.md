---
title: Metrics without Limits™
kind: documentation
---

## Overview

Metrics without Limits™ provides you flexibility and control over your custom metrics volumes by decoupling custom metric ingestion and indexing  -- you only pay for custom metric tags that are valuable to your organization.

Metrics without Limits™ provides you with the ability to configure tags on all metric types in-app and customize aggregations on counts, rates, and gauges without having to re-deploy or change any code. With Metrics without Limits™, you are able to configure an allowlist of tags in-app to remain queryable throughout the Datadog platform -- automatically excluding nonessential tags attached to application-level or business metrics (for example, `host`). This functionality is located in the [Metrics Summary][1] page.

This page identifies key components of Metrics without Limits™ that can help you manage your custom metrics volumes within your observability budget.

### Configuration of tags

Click on any metric name to open its details sidepanel. Then click **Manage Tags** -> **“Custom”** to configure the tags you’d like to remain as queryable on dashboards and monitors. Before selecting **Save**, an estimated new volume of indexed custom metrics that results from this potential tag configuration is displayed.

{{< img src="metrics/mwl_tags.gif" alt="Configuration of Tags">}}

There are also APIs available so you can [create][2], [edit][3], and [delete][4] a tag configuration. There is also an [API][5] for estimating the potential impact of your configuration.

When configuring tags for counts, rates, and gauges, the most frequently queried time/space aggregation combination is available for query by default.

### Fine-tune your aggregations

You can further adjust your custom metrics filters by opting in to more [metrics aggregations][6] you want to query on your count, gauge, or rate metrics. To preserve the mathematical accuracy of your queries, by default Datadog only stores the most frequently queried time/space aggregation combination for a given metric type: 

- Configured counts and rates are queryable in time/space with SUM
- Configured gauges will be queryable in time/space with AVG

You can add or remove aggregations at any time with no required Agent or code-level changes. 

Once you've clicked **Manage Tags** button and then **“Custom”** you can open the **Customize Aggregations** window to view the default aggregation available for your count/rate/gauge metric. You can opt-in to more aggregations should you need them. 

{{< img src="metrics/mwl_aggrs.jpg" alt="Customize Aggregations">}}

### Configure multiple metrics at a time
Quickly optimize your custom metrics volumes by using our [bulk metric tag configuration feature][7]. By clicking **Configure Tags** on Metrics Summary, you can specify a namespace for your metrics and configure all metrics matching that namespace prefix with the same allowlist of tags.

## What is the pricing of Metrics without Limits™?

Configuring your tags/aggregations gives you control over what custom metrics can be queried -- ultimately reducing your billable count of custom metrics. Metrics without Limits™ decouples ingestion costs from indexing costs -- so you can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you'd want to remain queryable in the Datadog platform. Given the volume of data Datadog is ingesting for your configured metrics now differs from the smaller, remaining volume you’ve indexed, you'll see two distinct volumes on your Usage page as well as the Metrics Summary page. 

- **Ingested Custom Metrics**: The original volume of custom metrics based on the all ingested tags (sent via code).
- **Indexed Custom Metrics**: The volume of custom metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations) 

**Note: Only configured metrics contribute to your Ingested custom metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed custom metrics volume.

Learn more about Custom Metrics Billing [here][8]

## How to get started with Metrics without Limits™?

**1. Configure your Top 20 Metrics** on your [Plan&Usage page][9] via the Metrics Summary page or using our [API][2].
   You can use bulk metric configuration (`*` syntax) to quickly configure tags on multiple metrics. Datadog notifies you when the bulk configuration job is completed.

**Note:** If you’re using the [Create Tag Configuration API][2], use the [tag configuration cardinality estimator API][5] first to validate the potential impact of your tag configurations prior to using the API above to create tag configurations. If the UI or the estimator API returns a resulting number of indexed that is larger than ingested, do not save your tag configuration.

2. Configure your unqueried metrics with empty tag configurations.

   As your teams continue cleaning up noisy metrics that are never queried in the Datadog platform, you can instantly minimize the costs of these unqueried metrics by configuring them with an empty allowlist of tags. 

   Ask your Customer Success Manager for an unqueried metrics report.

3. Review your usage and billing. After configuring your metrics, the impact of your changes can be validated in three ways: 

   - Prior to saving your configuration, the tag configuration cardinality estimator returns the estimated resulting number of indexed custom metrics which should be lower than your ingested custom metrics volumes.
   - After saving your configuration, the Metrics Summary details sidepanel should show that your indexed custom metrics are now lower than your ingested custom metrics volume.
   - 24 hours after you've saved your configuration, you can also view the impact on your Plan & Usage page's **Top Custom Metrics** table. There should be reduction in the volume of custom metrics between the **Month-to-Date** tab and the **Most Recent Day** tab of this table.

## Best practices
- You can set up alerts on your real-time [estimated custom metrics usage][10] metric so that you can correlate spikes in custom metrics with configurations.

- [Role based access control][11] for Metrics without Limits™ is also available to control which users have permissions to use this feature that has billing implications.

- Audit events allow you to track any tag configurations or percentile aggregations that have been made that may correlate with custom metrics spikes. Search for "tags:audit" and “queryable tag configuration” or “percentile aggregations” on your [Events Stream][12]

\*Metrics without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/metric/summary
[2]: /api/latest/metrics/#create-a-tag-configuration
[3]: /api/latest/metrics/#update-a-tag-configuration
[4]: /api/latest/metrics/#delete-a-tag-configuration
[5]: /metrics/guide/tag-configuration-cardinality-estimation-tool/
[6]: /metrics/#time-and-space-aggregation
[7]: /metrics/summary/#configuration-of-multiple-metrics
[8]: /account_management/billing/custom_metrics/?tab=countrategauge
[9]: https://app.datadoghq.com/billing/usage
[10]: /account_management/billing/usage_metrics/
[11]: /account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream


