---
title: Volume
description: "Understand and manage your custom metrics usage and costs."
further_reading:
  - link: "/metrics/summary/"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "/metrics/metrics-without-limits/"
    tag: "Documentation"
    text: "Metrics without Limits™"
  - link: "/metrics/custom_metrics/"
    tag: "Documentation"
    text: "Custom Metrics"

---


{{< beta-callout url="#" btn_hidden="true">}}
  Metrics Volume is in <strong>beta</strong>. If you're interested in the feature, reach out to your Technical Account Manager or Customer Success Manager.
{{< /beta-callout >}} 

## Overview

{{< img src="metrics/volume/metrics_volume_overview.png" alt="Metrics Volume page set to a timeframe of the past hour (by default) showing the search, filter, facet and column sorting features available" style="width:100%;" >}}

Cloud-based applications generate massive amounts of data, which can be overwhelming for your organization as it scales. Observability costs become a significant budget item but core observability teams lack visibility into what is truly valuable to each individual engineering team. Individual teams are less incentivized to be proactive in helping manage this growth because they have limited insights into the costs of the metrics and tags they're submitting.

Datadog's [Metrics Volume Management page][1] provides comprehensive visibility and intelligent insights for which metrics you should focus your cost-optimization efforts. When used with [Metrics without Limits™][3], Metrics Volume allows for flexible configuration of metrics ingestion and indexing to reduce costs without sacrificing accuracy. 

## Search, filter, and sort

Use the search, filter, and sort features to understand:
- Which team owns what metric names
- Which metrics your team should focus its cost optimization efforts on
- Which metrics have the highest cardinality, and which metrics have the highest increase in volume

The Metric and Tag search bars provide a set of actions to filter the list of metrics. Enter keywords to search metric names. Type in any tag key value pair in the *Filter by Tag Value* box to filter the list by a specific team, application, or service.

Facets can also filter your metrics by:
- **Configuration**: Metrics with tag configurations
- **Percentiles**: Distribution metrics enabled by percentiles/advanced query capabilities
- **Historical Metrics**: Metrics that have historical metrics ingestion enabled
- **Query Activity** (Beta): Metrics not queried in the app or by the API in the past 30 days
- **Metric Type**: Differentiate between distribution and non-distribution metrics (counts, gauges, rates)
- **Distribution Metric Origin**: The product from which the metric originated (for example, metrics generated from Logs or APM Spans)

The Volume page displays a list of your metrics reported to Datadog sorted by estimated custom metrics or by the change in volume. To sort metrics by either of these options, click on the column header of the metric table.
| Column | Description |
|--------|-------------|
|**Top 500 Metric Names by Estimated Real-time Cardinality** | Identify the top 500 metric names by cardinality/volume.| 
|**Top 500 Metric Names by Change in Volume** |Discover the top 500 metric names that have the greatest variance in their cardinality. These metrics may have anomalously (potentially unintentionally) spiked in the timeframe of your choosing. If you receive an alert on your account's estimated real-time custom metrics usage, you can use this view to investigate the metric spike. |

## Compare metric cardinality

{{< img src="metrics/volume/compare_metric_cardinality.png" alt="Metrics Volume filtered down to metric names with “shopist”, sorted by estimated custom metrics. On hover over the change in volume, displays the cardinality graph of the metric over the past day" style="width:100%;" >}}

Cardinality refers to the number of unique sets of tag values associated with a given key. Tags with large numbers of possible values have a "high cardinality". A custom metric is identified by a unique combination of a metric's name and tag values (including the host tag). 

Compare metric cardinality to understand:
  - Which metric names are causing your custom metrics bill to spike. 
  - What the organization's largest custom metrics are.
  - What metric names have spiked recently in the past day or month.

To view your spiking metric's cardinality over time:
1. Select a time frame in the top right hand corner (the recommended time frame is **Past 1 Day** or **Past 4 Weeks**).
2. Find the metric you want to compare and in the same row click on the value under the **Change in Volume** column. This opens up a modal showing a graph comparing your metric's cardinality over time and the percentage increase in its spike.
3. (Optional) Create a Change monitor for `% change` to proactively alert on this spiking metric. For more information, see the [Change Alert Monitor][2] documentation.

## Identify unqueried metrics

{{< img src="metrics/volume/id_unqueried_metrics.png" alt="Facet fields for Query Activity with the 'Not actively queried' facet selected" style="width:100%;" >}}

To effectively reduce costs with Metrics without Limits, identify your highest volume or spiking metric names. To find the metrics not actively queried in the past 30 days, click on **Not Actively Queried** in the *Query Activity Facet* box. Datadog analyzes query patterns to determine valuable metrics. Selecting **Not Actively Queried** generates a list of unused metric names across dashboards, notebooks, monitors, SLOs, Metrics Explorer, and the API.

## Reduce metric volume and cost

After you identify unqueried metrics, you can eliminate the volume and cost of these metric names by using [Metrics without Limits™][3]:

1. Click on the metric name to open its details side panel.
2. Click the **Manage Tags** button to open the tag configuration modal.
3. Select **Include tags…** and set an empty allowlist of tags.

You can also click the **Configure Metrics** dropdown and select **Manage Tags** to open the [Metrics without Limits™ Tag configuration modal][4]. 

{{< img src="metrics/volume/configure_metrics.png" alt="Configure Metric dropdown at the top of the page highlighting the Manage tags option" style="width:100%;" >}}

You have full control over the cardinality of your metrics without the need to change your applications nor the requirement of a remote-write setup. Below is an example of how eliminating timeseries that are rarely used can significantly reduce your custom metrics volumes and costs.

In this example, the tag configuration modal shows a metric with a current volume of 13690031 indexed custom metrics. After you select Include tags… with an empty allowlist of tags, the modal shows an estimated new volume of 1. You can reduce the number of indexed custom metrics by 13690030.

{{< img src="metrics/volume/reduce_metric_vol_cost_tags.png" alt="Tag configuration modal showing an example metric with a current volume of 13690031 index metrics and an estimated new volume of 1, with an empty allowlist of tags" style="width:80%;" >}}

## Analyze metric utilization in Datadog

<div class="alert alert-info">Related Assets is in public beta</div>

Assess the value of metrics queried but underutilized in Datadog with metrics-related assets. A metrics-related asset refers to any dashboard, notebook, monitor, or SLO that queries a particular metric. Use related asset popularity and quantity to evaluate metric utility within your organization, enabling data-driven decisions. Gain a better understanding of how your team can utilize existing metrics to get more value from your observability spend and [reduce metric volume and cost].

{{< img src="metrics/volume/related_assets.png" alt="Metric detail side panel showing the Related Assets section. The example metric is applied to one dashboard" style="width:100%;" >}}

To view a metric's related assets:
1. Click on the metric name to open its details side panel.
2. Scroll down to the section of the side panel titled **Related Assets**.
3. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can use the search bar to validate specific assets.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/volume
[2]: /monitors/types/change-alert/
[3]: /metrics/metrics-without-limits
[4]: https://app.datadoghq.com/metric/volume?bulk_manage_tags=true&facet.query_activity=-queried&sort=volume_total
[5]: #reduce-metric-volume-and-cost
