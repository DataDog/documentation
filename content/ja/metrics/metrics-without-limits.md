---
title: Metrics without LimitsTM
aliases:
  - /metrics/faq/metrics-without-limits/
  - /metrics/guide/metrics-without-limits-getting-started/
further_reading:
  - link: "https://www.datadoghq.com/blog/metrics-without-limits"
    tag: Blog
    text: Dynamically control custom metrics volume with Metrics without LimitsTM
  - link: "https://dtdg.co/fe"
    tag: Foundation Enablement
    text: Join an interactive session to unlock the full potential of metrics
algolia:
  tags: [metrics without limits]
---

## Overview

Metrics without LimitsTM provides you flexibility and control over your custom metrics volumes by decoupling custom metric ingestion and indexing. You only pay for custom metric tags that are valuable to your organization.

Metrics without LimitsTM provides you with the ability to configure tags on all metric types in-app. You can also customize aggregations on counts, rates, and gauges without having to re-deploy or change any code. With Metrics without LimitsTM, you can configure an allowlist of tags in-app to remain queryable throughout the Datadog platform; this automatically drops nonessential tags attached to application-level or business metrics (for example, `host`). Alternatively, you can configure a blocklist of tags in-app to quickly drop and exclude tags; this automatically retains remaining essential tags that provide business value to your teams. These configuration functionalities are located in the [Metrics Summary][1] page.

This page identifies key components of Metrics without LimitsTM that can help you manage your custom metrics volumes within your observability budget.

### Configuration of tags

#### Allowlist of tags 
1. Click any metric name to open its details side panel. 
2. Click **Manage Tags** -> **"Include Tags..."** to configure the tags you'd like to remain as queryable in dashboards, notebooks, monitors, and other Datadog products.
3. Define your allowlist of tags. 
By default, the tag configuration modal pre-populates with a Datadog recommended allowlist of tags that have been actively queried on dashboards, notebooks, monitors, or through the API in the past 30 days. Recommended tags are distinguished with a graph line icon. 
4. Review the *Estimated New Volume* of indexed custom metrics that results from this potential tag configuration.
5. Click **Save**.

{{< img src="metrics/mwl_example_include_tags-compressed.mp4" alt="Configuration of Tags with Allowlist" video=true style="width:100%" >}}

You can [create][2], [edit][3], [delete][4], and [estimate the impact][5] of your tag configuration through the Metrics APIs.

#### Blocklist of tags 
1. Click on any metric name to open its details side panel.
2. Click **Manage Tags** -> **"Exclude Tags..."** to drop tags you don't want to query. 
3. Define your blocklist of tags. Tags defined in the blocklist are **not** queryable on dashboards and monitors. Tags that have been actively queried on dashboards, notebooks, monitors, and through the API in the past 30 days are distinguished with a graph line icon.
5. Review the *Estimated New Volume* of indexed custom metrics that results from this potential tag configuration.
6. Click **Save**.

{{< img src="metrics/mwl-example-tag-exclusion-compressed.mp4" alt="Configuration of Tags with Tag Exclusion" video=true style="width:100%" >}}

Set the parameter `exclude_tags_mode: true` on the Metrics API to [create][2] and [edit][3] a blocklist of tags.

When configuring tags for counts, rates, and gauges, the most frequently queried time/space aggregation combination is available for query by default.

### Configure multiple metrics at a time

Optimize your custom metrics volumes by using the [bulk metric tag configuration feature][7]. To specify a namespace for your metrics, click **Configure Tags*** on Metrics Summary. You can configure all metrics matching that namespace prefix with the same allowlist of tags under ***Include tags...*** or the same blocklist of tags under ***Exclude tags...***.

You can [configure][13] and [delete][14] tags for multiple metrics through the API. To [configure a blocklist of tags][13] for multiple metrics, set the parameter `exclude_tags_mode: true` on the API.

### Refine and optimize your aggregations

You can further adjust your custom metrics filters by opting in to more [metrics aggregations][6] on your count, gauge, or rate metrics. To preserve the mathematical accuracy of your queries, Datadog only stores the most frequently queried time/space aggregation combination for a given metric type: 

- Configured counts and rates are queryable in time/space with SUM
- Configured gauges are queryable in time/space with AVG

You can add or remove aggregations at any time with no required Agent or code-level changes. 

The tag configuration modal pre-populates with an allowlist of aggregations that have been actively queried on dashboards, notebooks, monitors and through API in the past 30 days (colored in blue with an icon). You can also include your own additional aggregations.

## Metrics without LimitsTM billing

Configuring your tags and aggregations gives you control over which custom metrics can be queried -- ultimately reducing your billable count of custom metrics. Metrics without LimitsTM decouples ingestion costs from indexing costs. You can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you want to remain queryable in the Datadog platform. If the volume of data Datadog is ingesting for your configured metrics differs from the smaller, remaining volume you index, you can see two distinct volumes on your Usage page as well as the Metrics Summary page. 

- **Ingested Custom Metrics**: The original volume of custom metrics based on all ingested tags.
- **Indexed Custom Metrics**: The volume of custom metrics that remains queryable in the Datadog platform (based on any Metrics without LimitsTM configurations) 

**Note: Only configured metrics contribute to your Ingested custom metrics volume.** If a metric is not configured with Metrics without LimitsTM, you're only charged for its indexed custom metrics volume.

Learn more about [Custom Metrics Billing][8].

## Getting started with Metrics without LimitsTM

1. Configure your Top 20 metrics on your [Plan & Usage page][9] from the Metrics Summary page or by using the [API][2].
   You can use bulk metric configuration (`*` syntax) to quickly configure tags on multiple metrics. Datadog notifies you when the bulk configuration job is completed.

**Note:** If you're using the [Create Tag Configuration API][2], use the [tag configuration cardinality estimator API][5] first to validate the potential impact of your tag configurations prior to creating tag configurations. If the UI or the estimator API returns a resulting number of indexed that is larger than ingested, do not save your tag configuration.

2. Configure your unqueried metrics with empty tag configurations.

   As your teams continue cleaning up noisy metrics that are never queried in the Datadog platform, you can instantly minimize the costs of these unqueried metrics by configuring them with an empty allowlist of tags. 

   Ask your Customer Success Manager for an unqueried metrics report.

3. Review your usage and billing. After configuring your metrics, the impact of your changes can be validated in three ways: 

   - Prior to saving your configuration, the tag configuration cardinality estimator returns the estimated resulting number of indexed custom metrics which should be lower than your ingested custom metrics volumes.
   - After saving your configuration, the Metrics Summary details sidepanel should show that your indexed custom metrics are lower than your ingested custom metrics volume.
   - 24 hours after you've saved your configuration, you can also view the impact on your Plan & Usage page's **Top Custom Metrics** table. There should be reduction in the volume of custom metrics between the **Month-to-Date** tab and the **Most Recent Day** tab of this table.

## Best practices

- You can set up alerts on your real-time [estimated custom metrics usage][10] metric so that you can correlate spikes in custom metrics with configurations.

- [Role based access control][11] for Metrics without LimitsTM is also available to control which users have permissions to use this feature that has billing implications.

- Audit events allow you to track any tag configurations or percentile aggregations that have been made that may correlate with custom metrics spikes. Search for "tags:audit" and "queryable tag configuration" or "percentile aggregations" on your [Events Stream][12]

\*Metrics without Limits is a trademark of Datadog, Inc.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /api/latest/metrics/#create-a-tag-configuration
[3]: /api/latest/metrics/#update-a-tag-configuration
[4]: /api/latest/metrics/#delete-a-tag-configuration
[5]: /api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /metrics/#time-and-space-aggregation
[7]: /metrics/summary/#configuration-of-multiple-metrics
[8]: /account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /account_management/billing/usage_metrics/
[11]: /account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[13]: /api/latest/metrics/#configure-tags-for-multiple-metrics
[14]: /api/latest/metrics/#delete-tags-for-multiple-metrics
