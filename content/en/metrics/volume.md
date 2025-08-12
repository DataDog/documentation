---
title: Volume
description: "Understand and manage your custom metrics usage and costs with the Volume Management page."
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

## Overview

{{< img src="metrics/volume/metrics_volume_overview_2025-01-27.png" alt="Metrics Volume page set to a timeframe of the past hour (by default) showing the search, filter, facet, and column sorting features available" style="width:100%;" >}}

Cloud-based applications generate massive amounts of data, which can be overwhelming for your organization as it scales. Observability costs become a significant budget item but core observability teams lack visibility into what is truly valuable to each individual engineering team. Individual teams are less incentivized to be proactive in helping manage this growth because they have limited insights into the costs of the metrics and tags they're submitting.

Datadog's [Metrics Volume Management page][1] provides comprehensive visibility and intelligent insights for which metrics you should focus your cost-optimization efforts. When used with [Metrics without Limits™][3], Metrics Volume allows for flexible configuration of metrics ingestion and indexing to reduce costs without sacrificing accuracy. 

With the Metrics Volume Management page you can access the following in real-time: 
- What is my overall account's realtime estimated Indexed Custom Metrics usage?
- What is my overall account's realtime estimated Ingested Custom Metrics usage?
- What are the Top 500 largest Metrics without Limits configured metric names by Ingested Custom Metrics volume?
- What are the Top 500 largest metric names by Indexed Custom Metrics volume?
- What are the Top 500 spiking cardinality metric names?
- Which team owns these Top 500 metric names and is responsible for optimizing?
- Which metrics are actually valuable (or not) to my organization?

## Real-time visibility and monitoring on your organization's Custom Metrics usage
Datadog provides you real-time _estimated_ usage metrics OOTB so you can understand and alert on your usage in real-time. You can see a breakdown of: 
- Your account's indexed custom metrics volume in real-time (and how much of that indexed volume hasn't been optimized with [Metrics without Limits™][3] yet) 
- Your account's ingested custom metrics (emitted from metrics that have been configured with [Metrics without Limits™][3]) in real-time

{{< img src="metrics/volume/volume_graph.png" alt="Estimated real-time indexed and ingested Custom Metrics volume. Upon clicking export, you can easily create a monitor or export the graph to a notebook to share." style="width:100%;" >}}

## Search, filter, and sort

Use the search, filter, and sort features to understand:
- Which team owns what metric names?
- Which metric names your team should focus on optimizing?
- Which metrics have the highest cardinality, and which metric names are spiking (have the highest increase in volume)?
- Which top metrics aren't being queried on assets?

The Metric and Tag search bars provide a set of actions to filter the list of metrics. Enter keywords to search metric names. Type in any tag key value pair in the *Filter by Tag Value* box to filter the list by a specific team, application, or service.

Facets can also filter your metrics by:
- **Configuration**: Metrics with tag configurations
- **Percentiles**: Distribution metrics enabled by percentiles/advanced query capabilities
- **Historical Metrics**: Metrics that have historical metrics ingestion enabled
- **Query Activity**: Metrics not actively queried in Datadog or by the API in the past 30, 60, or 90 days
- **Metric Type**: Differentiate between distribution and non-distribution metrics (counts, gauges, rates)
- **Distribution Metric Origin**: The product from which the metric originated (for example, metrics generated from Logs or APM Spans)

The Volume page displays a list of your metrics reported to Datadog sorted by estimated custom metrics or by the change in volume. To sort metrics by either of these options, click on the column header of the metric table.
| Column | Description |
|--------|-------------|
|**Top 500 Metric Names by Estimated Real-time Cardinality** | Identify the top 500 metric names by cardinality (aka custom metrics volume).| 
|**Top 500 Metric Names by Change in Volume** |Discover the top 500 metric names that have the greatest variance in their cardinality. These metrics may have anomalously (potentially unintentionally) spiked in the time frame of your choosing. If you receive an alert on your account's estimated real-time custom metrics usage, you can use this view to investigate the metric spike. |

## Compare a metric's cardinality (volume) over time 

{{< img src="metrics/volume/compare_metric_cardinality_2025-01-27.png" alt="Metrics Volume filtered down to metric names with “shopist”, sorted by estimated custom metrics" style="width:100%;" >}}

When identifying the top 500 metric names by change in volume, you can hover over the number to compare a metric name's number of indexed custom metrics (its cardinality) over time. As a reminder, a single metric name can emit multiple indexed custom metrics. To learn more, see [Custom Metrics Billing][6].

To compare your spiking metric's cardinality over time:
1. Select a time frame in the top right hand corner (the recommended time frame is **Past 1 Day** or **Past 4 Weeks**).
2. Select the metric name that you want to view the cardinality over time, and in the same row click on the value under the **Change in Volume** column. This opens up a modal showing a graph comparing your metric's cardinality over time and the percentage increase in its spike.
3. (Optional) Create a Change monitor for `% change` to alert on this spiking metric. For more information, see the [Change Alert Monitor][2] documentation.

## Identify less valuable, unqueried metrics

{{< img src="metrics/volume/id_unqueried_metrics_2025-01-23.png" alt="Facet fields for Query Activity with the 'Not queried in 90 days' facet selected" style="width:100%;" >}}

To start reducing custom metrics costs, start with your largest metric names that aren't actively queried. Datadog's intelligent query insights analyze your queries and surfaces your unqueried metrics over the past 30, 60, or 90 days. This analysis is constantly running in the background ensuring that your unqueried metrics are always up-to-date.

To find the metrics not actively queried, click the time frame of interest in the *Query Activity Facet* box. The list is filtered to show only unused metric names across dashboards, notebooks, monitors, SLOs, Metrics Explorer, and the API.

## How to reduce metric volume and cost

After you identify unqueried metrics, you can eliminate the volume and cost of these metric names by using [Metrics without Limits™][3] without a single line of code. By using Metrics without Limits, you ensure that you pay only for the metrics that you use by eliminating timeseries that are never or rarely leveraged. Use Metrics without Limits™ on your unqueried metric names to reduce custom metrics volume. 

To configure multiple unqueried metrics at once
1. Click the **Configure Metrics** dropdown and select **Manage Tags** to open the [Metrics without Limits™ Tag configuration modal][4].
2. Specify the metric namespace of the unqueried metrics you'd like to apply a bulk tag configuration to.
3. Select **Include tags…** and set an empty allowlist of tags.

{{< img src="metrics/volume/configure_metrics.png" alt="Configure Metric dropdown at the top of the page highlighting the Manage tags option" style="width:100%;" >}}

You have full control over the cardinality of your metrics without the need to change your applications nor the requirement of a remote-write setup. Below is an example of how eliminating timeseries that are rarely used can significantly reduce your custom metrics volumes and costs.

In this example, the tag configuration modal shows a metric with a current volume of 7,139 indexed custom metrics. After you select Include tags… with an allowlist of the tags queried in the past 30 days, the modal shows an estimated new volume of 3. You can reduce the number of indexed custom metrics by 7,136.

{{< img src="metrics/volume/reduce_metric_vol_cost_tags_05292025.png" alt="Tag configuration modal showing an example metric with a current volume of 7,139 index metrics and an estimated new volume of 3, with an allowlist of suggested tags" style="width:80%;" >}}

## Analyze metrics' utility and relative value in Datadog
Metrics without Limits™ allows you to find metrics that are underused in Datadog with the Metrics Related Assets feature. A metrics related asset refers to any dashboard, notebook, monitor, or SLO that queries a particular metric. Datadog's intelligent query insights surface the popularity and quantity of these related assets so you can evaluate metric utility within your organization. The **Tags** column shows exactly which tags are powering each asset, helping you preserve critical visibility while making data-driven decisions when configuring your metrics.

{{< img src="metrics/related_assets_08_05_2025.png" alt="Metric detail side panel showing the Related Assets section. The example metric is applied to three dashboards" style="width:100%;" >}}

To view a metric's related assets:
1. Click on the metric name to open its details side panel.
2. Scroll down to the section of the side panel titled **Related Assets**.
3. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can use the search bar to validate specific assets.

## Identify tags driving up your metric's volume

{{< img src="metrics/tagsexplorer.png" alt="Custom Metrics Tags Cardinality Explorer for a spiking metric name" style="width:80%;">}}

To determine why a particular metric name is emitting a large number of custom metrics, or spiking, use the Custom Metrics Tags Cardinality Explorer. This helps you pinpoint the tag keys driving the spike, which you can immediately exclude using Metrics without Limits™ for cost savings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/volume
[2]: /monitors/types/change-alert/
[3]: /metrics/metrics-without-limits
[4]: https://app.datadoghq.com/metric/volume?bulk_manage_tags=true&facet.query_activity=-queried&sort=volume_total
[5]: #reduce-metric-volume-and-cost
[6]: https://docs.datadoghq.com/account_management/billing/custom_metrics/?tab=countrategauge
