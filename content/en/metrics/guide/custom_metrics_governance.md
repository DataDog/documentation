---
title: Best Practices for Custom Metrics Governance
further_reading:
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Learn more about Custom Metrics"
- link: "/account_management/billing/custom_metrics/?tab=countrate"
  tag: "Documentation"
  text: "Custom Metrics Billing"
- link: "/metrics/metrics-without-limits/"
  tag: "Documentation"
  text: "Metrics without Limits™"
- link: "/metrics/volume/"
  tag: "Documentation"
  text: "Metrics Volume Management"
---

## Overview

Cloud-based applications can generate massive amounts of data and large observability costs, ultimately placing pressure on organizations to reduce this budget line item. To reduce observability costs, many teams resort to collecting fewer metrics; however, for centralized SRE and observability teams, effective custom metrics governance should increase monitoring efficiency rather than cut visibility entirely.

This guide gives a walkthrough of the best practices for managing your custom metrics volumes through the three key components of effective metrics governance: **Visibility and Attribution**, **Actionable Custom Metrics Governance**, and **Monitoring and Prevention**. Learn how to use available Datadog tools to help you maintain cost-effective observability With the three key components of custom metrics governance. You'll learn how to:
- [Find and understand your metrics usage and billing information](#visibility-and-attribution)
- [Identify your largest cost drivers](#account-level-visibility)
- [Filter down to the teams or services that are responsible for your largest cost drivers](#team-level-visibility-and-attribution)
- [Take action to reduce unused metrics](#actionable-custom-metrics-governance)
- [Monitor and control usage before it becomes an end of the month billing headache](#monitoring-and-prevention)


## Prerequisites

<div class="alert alert-warning">Some product features require Administrator access.</div> 

{{< whatsnext desc="This guide assumes you have an understanding of the following concepts in custom metrics:" >}}
    {{< nextlink href="/metrics/custom_metrics/" >}}What is considered a custom metric{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/custom_metrics/?tab=countrate" >}}How custom metrics are billed{{< /nextlink >}}
{{< /whatsnext >}}


## Visibility and attribution

The first step of managing your custom metrics volumes and costs is understanding what the key drivers of your metric costs are and attributing those drivers to their respective owners. Review your total account's monthly metric usage and also see a breakdown of your account's usage by team or any arbitrary tag key you choose.

### Account-level visibility

<div class="alert alert-warning">You must have the <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> to access the Plan & Usage page.</div>

Get a summary of your monthly billable custom metrics usage and its associated costs through the [Plan and Usage][1] details. This is an out-of-the-box (OOTB) summary of your account's monthly metrics usage that provides you detailed insights on your monthly Custom Metrics usage, costs, burn rate, and Top Custom Metric Names. 

   1. From the [Plan & Usage page][2], scroll down to the *Usage Summary* section.
   1. Click the **Custom Metrics** tab to view your organization's billable usage, usage trends, and top custom metrics.
   1. Scroll down to the *Top Custom Metrics for \<MONTH YEAR\>*, to see the top metrics that drive up your custom metrics costs.

Additionally, review [Usage Attribution][3] information for a total breakdown of your account's billable usage by tag attributes. From here, you can identify your largest cost drivers by tags such as team, service, or organization. 

**Note**: Usage Attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or Customer Success to request this feature.

Knowing which metrics are the largest contributor of your account's monthly usage and costs is the recommended starting point for using [Metrics without Limits™][4]. With this knowledge, you can find the source of these metric submissions whether by teams, service, organization, or other tag attribute.

### Team-level visibility and attribution

Individual teams may have limited insights into the costs of the metrics and tags they're submitting. This results in teams being less motivated to control their usage or even limit usage growth. It is crucial for everyone to have visibility into their usage and feel empowered to take ownership in managing those volumes and associated costs. Team-level visibility gives account administrators the ability to hold teams accountable, but more importantly, gives teams the opportunity to understand and reduce their impact on metrics volume.

#### Find out where your largest custom metrics are coming from
<div class="alert alert-warning">You must have the <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> to access the Plan & Usage page.</div>

{{< img src="metrics/guide/custom_metrics_governance/team_attribution_plan_usage_table.png" alt="Navigate to the Metrics Summary from the Plan & Usage page through the Top Custom Metrics table" style="width:90%;" >}}

To identify which team or service is responsible for any custom metric:

1. From the [Plan & Usage page][2], scroll down to the *Usage Summary* section.
1. Click the **Custom Metrics** tab to view your organization's billable usage, usage trends, and top custom metrics.
1. Under the table for *Top Custom Metrics for <MONTH YEAR>*, click  the icon to **See in Metrics Summary** for the top custom metric.
1. This takes you to the *Metrics Summary* page with the opened metric details sidepanel. 
1. In the sidepanel, scroll down to the *Tags* section to view associated tags such as teams and service.

You can also view the responsible teams through the [Usage Attribution page][5]. See a breakdown of your account's bill by any arbitrary tag key of your choosing. For example, `team:X` emits a volume of 10K custom metrics. 

#### View the custom metrics your team is submitting

All teams should have visibility into which metrics are driving their bill spikes in real-time and feel confident that their cost optimization efforts do not impact another team's visibility.

To see all actively reporting metrics submitted by your team:
1. On the [Metrics Summary page][6], type in the tag key value pair (for example, `team:dev` or `service:demo`) in the **Filter by Tag Value** field.
1. Review and analyze the filtered list to see the impact your team has on your organization's metrics volume.

#### Identify metrics that have the biggest impact on monthly bill

All users in your organization can see real-time estimated custom metrics usage on the [Metrics Volume Management page][7]. Identify which metrics to focus your cost-optimization efforts on. Use Metrics Volume Management with Metrics without Limits™, to configure your metrics ingestion and indexing and reduce costs without sacrificing accuracy.

With the Metrics Volume Management page you can identify your organization's largest metrics as well as the metric names spiking in volume (likely culprits of any unexpected overage).

For more information, see the [Metrics Volume Management][8] documentation.

## Actionable custom metrics governance

Effective custom metrics governance should increase monitoring efficiency. After you understand what your usage is and can narrow down the source of usage spikes, you can take action to reduce your metrics. These actions should help you maximize the ROI and value you get from your observability spend without sacrificing the visibility that your team actively relies on. Cut out the metrics you're not getting as much value from and have more control over your costs by: 
- Taking advantage of Datadog's Metrics without Limits™ to specify which metrics you want to index or ingest
- Restricting the configuration of Metrics without Limits™ to designated roles with RBAC
- Identifying unqueried metrics and metrics that are not being used in Datadog asets

### Metrics without Limits™

Datadog's [Metrics without Limits™][4] is a first in industry cost management feature that decouples metric ingestion from indexing. Not all your metrics are equally valuable at every moment, and with Metrics without Limits™, you only pay for metrics that you get value from. Reduce your indexed custom metrics volumes on any metric name by setting a tag configuration that you'd like to preserve for querying. It reduces your cost and preserves the mathematical accuracy of your configured metrics (all within the platform without any code-level changes).

{{< img src="metrics/volume/reduce_metric_vol_cost_tags.png" alt="Example using Metrics Volume Management and Metrics without Limits™ to reduce volume by limiting the allowlist through tag configuration" style="width:80%;" >}}

With Metrics without Limits™, Datadog automatically provides the following:
- Up to date recommended tag configurations (based on our intelligent query insights) to help you maximize the ROI and value you get from your observability spend.
- Continuous analysis of all metrics submitted to Datadog along with user interactions with those metrics anywhere within the Datadog platform and API over the past 30 days. 
- Ability to roll back changes at any time to get full visibility into all your originally submitted data.

For more information on getting started, see the [Metrics without Limits™][4] documentation.

### Prevent Configuration changes that cause inadvertent loss of observability

A custom metric is uniquely identified by a combination of a metric name and tag values (including the host tag). Any change in configuration could lead to a spike in usage or a loss in your observability. 

To prevent unexpected changes, use [RBAC permissions][9]. You can edit an existing user role to include the `metrics_tags_write` permission, or create a custom role. This gives your organization better control over which members can impact metrics [cardinality][10] and who can change Metrics without Limits™ tag configurations.

Datadog provides an [audit trail][11] of all Metrics without Limits™ configurations---detailing the configuration and which user made the configuration---so you can attribute any spikes or dips in your custom metrics usage. To view your audit trail events, enter the following query in the [Events Explorer][12]:
```
tags:audit "Queryable tag configuration" 
```

{{< img src="/metrics/guide/custom_metrics_governance/metrics_rbac_audit_trail_query.png" alt="Event Explorer with the metrics audit trail query" style="width:90%;" >}}

### Find and reduce unqueried metrics

Differentiate the metrics your team actively queries and relies on from the metrics that aren't queried anywhere within the Datadog platform or through the API. 

Identify your organization's entire list of unqueried metrics over the past 30 days: 
1. On the [Metrics Summary page][6], find the **Query Activity (past 30 days)** facets on the left side.
1. Select **Not Actively Queried**. 
1. Review the resulting table of metrics names. Are there any patterns or are they submitted from a specific service? Find tags associated with these unqueried metrics.
1. (Optional) To export this list, click **Export as CSV** above the metric table.

After you identify the metrics that your developers don't need, you can safely reduce your custom metrics volumes and reduce the costs with Metrics without Limits™. 

{{< img src="metrics/guide/custom_metrics_governance/manage_tags_fm_metrics_summary.png" alt="The Configure Metrics drop menu with the Manage tags selection highlighted" style="width:90%;" >}}

1. At the top of the the [Metrics Summary page][6], click the **Configure Metrics** dropdown menu.
1. Select **Manage tags** to open the [Metrics without Limits™ Tag configuration modal][13].
1. Configure Tags to create an [Allowlist or a Blocklist][14] of tags. Use the tags associated with unqueried metrics.

You can optimize without fear of losing key visibility provided on any dashboards, notebooks, monitors, SLOS or API workflows. Based on Datadog's intelligent query insights across thousands of custom metrics customers, we found that using **Metrics without Limits™ on unqueried metrics can reduce the average customer's custom metrics volumes by up to 70%**.

## Understand the relative utility of your metrics

Even though a metric is not queried for the past 30 days, your teams might still derive value from it for incident management and outage remediation. Conversely, your teams could be underutilizing existing actively queried metrics. So understanding the relative utility of your metrics is the next recommended step in your governance workflow. 

Metrics without Limits™ provides you with OOTB insights to assess the value of your actively queried metrics with [Metrics Related Assets][15]. A metrics related asset refers to any Datadog asset, such as a dashboard, notebook, monitor, or SLO that queries a particular metric. Use related asset popularity and quantity to evaluate metric utility within your organization, enabling data-driven decisions. Gain a better understanding of how your team can use existing metrics to get more value from your observability spend. 

{{< img src="metrics/volume/related_assets.png" alt="Metric detail side panel showing the Related Assets section. The example metric is applied to one dashboard" style="width:100%;" >}}

To view a metric's related assets:
1. Click on the metric name to open its details side panel.
1. Scroll down to the section of the side panel titled **Related Assets**.
1. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can use the search bar to validate specific assets. 

## Monitoring and prevention

After you have an understanding of your account's metric usage and the teams responsible for those costs, build monitors to alert you when your cardinality exceeds a certain threshold. Get alerts for overages and spikes in custom metric usage, so you can stay ahead of your monthly bill. 

Datadog offers OOTB metrics that measures [estimated custom metrics usage][15]. You can use these metrics in your dashboard visualizations and monitor alerts. 

| Usage Type                    | Metric                                   | Description |
|-------------------------------|------------------------------------------| ----------- |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` | Unique indexed Custom Metrics seen in the last hour. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` | Unique ingested Custom Metrics seen in the last hour. |

### Monitor overages and suddent spikes in custom metric usage

{{< img src="metrics/guide/custom_metrics_governance/estimated_usage_metric_monitor.png" alt="Example metric monitor configuration with the estimated usage metric and a threshold of 700,000" style="width:80%;" >}}

You can see an analysis of your realtime estimated custom metrics usage by metric name with either the dashboard timeseries widget, or a metric monitor. Use the `datadog.estimated_usage.metrics.custom` metric to build a monitor so you can always have up-to-date visibility into each of your metric names' volumes. 

### Additional monitoring use cases

{{< whatsnext desc="Additional use cases to build monitors for with the estimated usage metrics:" >}}
    {{< nextlink href="/monitors/types/change-alert/" >}}Alert when the volume changes beyond a certain percent.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/anomaly/" >}}Alert on anomalous changes in usage.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/forecast/" >}}Forecast future metrics growth and alert on any unexpected overall deviation.{{< /nextlink >}}
{{< /whatsnext >}}

## Summary of best practices

1. Start by identifying your largest metric names (your Top Custom Metrics table or the Metrics Volume Page), begin using Metrics without Limits™ to optimize these top metrics to the most cost-effective volume. 
1. Use the Metrics Volume Management page to attribute any existing custom metrics usage spikes to the top spiking metric names causing that spike.
1. For immediate cost savings, identify your unqueried custom metrics and use Metrics without Limits™ to configure these metrics with empty tag configurations.
1. Set up monitors on your custom metrics usage using any of Datadog's OOTB estimated custom metrics usage metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/plan_and_usage/
[2]: https://app.datadoghq.com/billing/usage
[3]: /account_management/billing/usage_attribution/
[4]: /metrics/metrics-without-limits/
[5]: https://app.datadoghq.com/billing/usage-attribution?view=table
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/volume
[8]: /metrics/volume/
[9]: https://docs.datadoghq.com/account_management/rbac/permissions/?tab=ui#metrics
[10]: /glossary/#cardinality
[11]: /account_management/audit_trail/
[12]: https://app.datadoghq.com/event/explorer
[13]: https://app.datadoghq.com/metric/volume?bulk_manage_tags=true&facet.query_activity=-queried&sort=volume_total
[14]: https://docs.datadoghq.com/metrics/metrics-without-limits/#configuration-of-tags
[15]: /metrics/summary/#metrics-related-assets
