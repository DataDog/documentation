---
title: Metrics without Limits™
aliases:
  - /metrics/faq/metrics-without-limits/
  - /metrics/guide/metrics-without-limits-getting-started/
  - /metrics/faq/why-is-my-save-button-disabled/
further_reading:
  - link: "https://www.datadoghq.com/blog/metrics-without-limits"
    tag: "Blog"
    text: "Dynamically control custom metrics volume with Metrics without Limits™"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session to unlock the full potential of metrics"
algolia:
  tags: ['metrics without limits']
---

## Overview

Metrics without Limits™ provides you flexibility and control over your custom metrics volumes by decoupling custom metric ingestion and indexing. You only pay for custom metric tags that are valuable to your organization.

Metrics without Limits™ lets you configure tags on all metric types in-app by selecting an allowlist of tags to remain queryable throughout Datadog; this automatically drops nonessential tags attached to application-level or business metrics (for example, `host`). Alternatively, you can configure a blocklist of tags in-app to drop and exclude tags; this automatically retains remaining essential tags that provide business value to your teams. These configuration functionalities are located in the [Metrics Summary][1] page.

This page identifies key components of Metrics without Limits™ that can help you manage your custom metrics volumes within your observability budget.

### Configuration of tags for a single metric

#### Allowlist of tags 

1. Click any metric name to open its details side panel. 
2. Click **Manage Tags**, then **Include tags** to configure the tags you'd like to remain as queryable in dashboards, notebooks, monitors, and other Datadog products.
3. Define your allowlist of tags. 
By default, the tag configuration modal pre-populates with a Datadog recommended allowlist of tags that have been actively queried on dashboards, notebooks, monitors, or through the API in the past 30 days. Recommended tags are distinguished with a line graph icon. 
   a.Additionally, include tags that are used on assets (dashboards, monitors, notebooks, and SLOs). These tags are used on assets but not actively queried and are marked with a target icon. Adding these ensures you don't lose visibility on your critical assets. 
4. Review the *Estimated New Volume* of indexed custom metrics that results from this potential tag configuration.
5. Click **Save**.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="Configuration of Tags with Allowlist" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="Showing customers they can add tags used on assets on their MWL configuration" style="width:100%" >}}

You can [create][2], [edit][3], [delete][4], and [estimate the impact][5] of your tag configuration through the Metrics APIs.

#### Blocklist of tags 

1. Click on any metric name to open its details side panel.
2. Click **Manage Tags**, then **Exclude Tags**. 
3. Define your blocklist of tags. Tags defined in the blocklist are **not** queryable on dashboards and monitors. Tags that have been actively queried on dashboards, notebooks, monitors, and through the API in the past 30 days are distinguished with a line graph icon.
4. Review the *Estimated New Volume* of indexed custom metrics that results from this potential tag configuration.
5. Click **Save**.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Configuration of Tags with Tag Exclusion" video=true style="width:100%" >}}

Set the parameter `exclude_tags_mode: true` on the Metrics API to [create][2] and [edit][3] a blocklist of tags.

**Note:** For tags to be managed on a metric, the metric must have a type declared. This is typically done when a metric is submitted, but may also be done manually using the `Edit` button for a metric in Metrics Summary.

#### Use the API

You can [create][2], [edit][3], [delete][4], and [estimate the impact][5] of your tag configuration through the Metrics APIs.

### Configure multiple metrics at a time

Optimize your custom metrics volumes by using the [bulk metric tag configuration feature][7]. To specify the metrics to be configured, click **Configure Metrics**, then **Manage Tags*** on the Metrics Summary page. Select the metric or metric namespace you want to configure, then choose to do either of the following:
   - [Allow all tags](#allow-all-tags) to override any previous tag configurations and make all tags queryable.
   - [Include or exclude tags](#include-or-exclude-tags) to define queryable and non-queryable tags, respectively.

#### Allow all tags

{{< img src="metrics/bulk_allow_all_tags.png" alt="The Manage Tags option with Allow all tags selected in the Configure tags section" style="width:100%" >}}

This option is selected by default, and overrides previously set tag configurations to make all tags queryable.

#### Include or exclude tags

When selecting tags to include or exclude, choose to either [override existing tag configurations](#override-existing-tag-configurations) or [keep existing tag configurations](#keep-existing-tag-configurations).

##### Override existing tag configurations

{{< img src="metrics/bulk_include_tags.png" alt="The Manage Tags option with Include tags and Override selected in the Configure tags section. The options to include tags actively queried on dashboards and monitors from the past 90 days and Specific tags are selected" style="width:100%" >}}

All existing tag configurations for the selected metrics are overridden, and you define a new tag configuration. This allows you to make all tags queryable on all metric names. If you are choosing to **include tags**, you can select to include either or both of the following:
   - Tags actively queried in Datadog from the past 30, 60, or 90 days.
   - A specific set of tags that you define.

##### Keep existing tag configurations

{{< img src="metrics/bulk_exclude_tags.png" alt="The Manage Tags option with Exclude tags and Keep selected in the Configure tags section" style="width:100%" >}}

Existing tag configurations are retained, and you define new tags to be added to the configuration.

#### Use the API

You can [configure][13] and [delete][14] tags for multiple metrics through the API.

**Note**: Use the `include_actively_queried_tags_window` attribute to include only tags actively queried within a given time frame.

## Metrics without Limits™ billing

Configuring your tags gives you control over which custom metrics can be queried -- ultimately reducing your billable count of custom metrics. Metrics without Limits™ decouples ingestion costs from indexing costs. You can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you want to remain queryable in the Datadog platform. If the volume of data Datadog is ingesting for your configured metrics differs from the smaller, remaining volume you index, you can see two distinct volumes on your Usage page as well as the Metrics Summary page. 

- **Ingested Custom Metrics**: The original volume of custom metrics based on all ingested tags.
- **Indexed Custom Metrics**: The volume of custom metrics that remains queryable in the Datadog platform (based on any Metrics without Limits™ configurations).

**Note: Only configured metrics contribute to your Ingested custom metrics volume.** If a metric is not configured with Metrics without Limits™, you're only charged for its indexed custom metrics volume.

Learn more about [Custom Metrics Billing][8].

## Getting started with Metrics without Limits™

1. Configure your Top 20 metrics on your [Plan & Usage page][9] from the Metrics Summary page or by using the [API][2].
   You can use bulk metric configuration (`*` syntax) to quickly configure tags on multiple metrics. Datadog notifies you when the bulk configuration job is completed.

**Note:** If you're using the [Create Tag Configuration API][2], use the [tag configuration cardinality estimator API][5] first to validate the potential impact of your tag configurations prior to creating tag configurations. If the UI or the estimator API returns a resulting number of indexed that is larger than ingested, do not save your tag configuration.

2. Configure your unqueried metrics with empty tag configurations.

   As your teams continue cleaning up noisy metrics that are never queried in the Datadog platform, you can instantly minimize the costs of these unqueried metrics by configuring them with an empty allowlist of tags. 

3. Review your usage and billing. After configuring your metrics, the impact of your changes can be validated in three ways: 

   - Prior to saving your configuration, the tag configuration cardinality estimator returns the estimated resulting number of indexed custom metrics which should be lower than your ingested custom metrics volumes.
   - After saving your configuration, the Metrics Summary details sidepanel should show that your indexed custom metrics are lower than your ingested custom metrics volume.
   - 24 hours after you've saved your configuration, you can also view the impact on your Plan & Usage page's **Top Custom Metrics** table. There should be reduction in the volume of custom metrics between the **Month-to-Date** tab and the **Most Recent Day** tab of this table.

## Best practices

- You can set up alerts on your real-time [estimated custom metrics usage][10] metric so that you can correlate spikes in custom metrics with configurations.

- [Role based access control][11] for Metrics without Limits™ is also available to control which users have permissions to use this feature that has billing implications.

- Audit events allow you to track any tag configurations or percentile aggregations that have been made that may correlate with custom metrics spikes. Search for "tags:audit" and "queryable tag configuration" or "percentile aggregations" on your [Events Stream][12].

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
