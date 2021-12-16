---
title: Metrics Summary
kind: documentation
description: "Consult the full list of metrics reporting to Datadog."
aliases:
  - /graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
  - /graphing/metrics/summary/
further_reading:
  - link: "/metrics/explorer/"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "/metrics/distributions/"
    tag: "Documentation"
    text: "Metrics Distributions"
---

## Overview

The [Metrics Summary page][1] displays a list of your metrics reported to Datadog under a specified time frame: the past hour, day, or week. 

Search your metrics by name or tag using the **Metric** or **Tag** search fields:

{{< img src="metrics/summary/tagexplorer2.mp4" alt="Filter by Tag" video=true style="width:75%;">}}

## Facet panel

The search bars provide the most comprehensive set of actions to filter the list of metrics. But facets can also quickly filter your metrics by:
* **Configuration** : Quickly identify metrics with tag configurations or additional percentile aggregations
* **Metric Type** : Quickly identify distributions vs non-distributions (counts, gauges, rates)
* **Distribution Metric Origin**: Quickly identify which product the distribution metrics have originated from (for example, Generate Metrics from Logs, Generate Metrics from Spans, etc.) 

{{< img src="metrics/summary/facets2.jpg" alt="Metrics Facet Panel" style="width:75%;">}}


## Configuration of multiple metrics 
There are two buttons that allow you to configure multiple metrics at a time: 

{{< img src="metrics/summary/configurationbuttons.jpg" alt="Bulk Configuration Buttons" style="width:75%;">}}

* **Calculate Percentiles**: Add percentile aggregations to multiple distribution metrics.

{{< img src="metrics/summary/bulkpercentiles.jpg" alt="Bulk Percentiles" style="width:75%;">}}

* **Configure Tags**: Configure tags on multiple custom metrics matching a namespace using Metrics without Limits™

{{< img src="metrics/summary/bulkconfig.mp4" alt="Bulk Metric Tag Configuration" video=true style="width:75%;">}} 

## Metric details sidepanel

Click on any metric name to display its details sidepanel for more information regarding the metric’s metadata and tags: 

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="Metric panel" style="width:75%;">}}

### Metric name

The name of your metric in the [Metrics Explorer][2], [dashboards][3], etc.

### Ingested Custom Metrics

A metric name may emit multiple ingested custom metrics depending on its associated tag value combinations. Ingested custom metrics represent all of the data originally submitted with code.

Learn more in the [custom metrics][4] documentation.

### Indexed Custom Metrics

Unlike ingested custom metrics, indexed custom metrics represent those that remain queryable across the Datadog platform. This number may be impacted by adding or removing percentile aggregations or by use of Metrics without Limits™. Learn more in the [Metrics without Limits™][10] documentation.

### Hosts

The total number of hosts reporting a metric.

### Tag values

The total number of unique tag values attached to a metric.

[Learn more about tagging][5].

### Metrics metadata

The metadata attached to your metric. Most of the metadata can be edited on the metric summary page or with the [Datadog API][6].

#### Metric unit

The unit for your metric (byte, second, request, query, etc.). See the [metric unit][7] page for more details.

When submitting custom metrics to Datadog, it is possible to change the [unit of measurement][1] that displays when hovering over the metric in your graph.

**Note**: This does not change how a metric graph is displayed. It only changes the units of measurement that raw values are considered as when you hover over a metric. Formatting is automatically applied for readability. For example, bytes (`B`) may be displayed as kilobytes (`KiB`).

#### Metric type

The type for your metric (gauge, rate, count, distribution). See the [metric type][8] page for more details.

**Warning**: Editing the metric type changes that metric's behavior for **ALL** your dashboards and monitors.

#### Integration name

If the metric is coming from a supported [integration][9], the metadata lists the integration name. This information cannot be edited.

#### Interval

The collection interval for the metric in seconds.

#### Metric description

The metric description helps you understand what a metric does. Descriptions are pre-populated for metrics coming from supported [integrations][9]. Use this field to update the descriptions for your [custom metrics][4].

### Tags table

The tags table offers multiple ways to explore all of the tag keys and tag values that are actively reporting in your metric’s data.

Use the tags table to:

- Sort tag keys by the **Count column** (count of unique tag values).
- Search through the paginated table of tags for a particular tag key.
- Export the tags table as a downloadable CSV.
- Toggle between tags you've configured on your metric vs the metric's originally submitted tags

For any particular tag key, you can:

- Inspect all tag values of that tag key.
- Use a specific tag `key:value` to further filter the list of metrics displayed on the Metrics Summary page.
- Open a graph of this metric filtered by your tag `key:value` pair in the Metrics Explorer.
- Copy any tag `key:value` for filtering across the application.

{{< img src="metrics/summary/updated_tags_table.mp4" alt="Tags Table" video=true style="width:75%;">}}

[Learn more about tagging][5].

## Metrics without Limits\*
Metrics without Limits\* provides you control over the size of your custom metrics without requiring any agent or code-level changes. 

**Note:** Metrics without Limits\* is only available for custom metrics.

You can configure tags using the bulk metric tag configuration button or the **Manage Tags** button in a metric's details side panel. 

{{< img src="metrics/distributions/managetags.png" alt="Configuring tags on a distribution" style="width:80%;">}}

1. Click on your custom distribution metric name in the **Metrics Summary** table to open the metrics details side panel.
2. Click the **Manage Tags** button to open the tag configuration modal.
3. Click the **Custom...** tab to customize the tags you'd like to keep available for query. Tag configurations are _allowlists_ of the tags you'd like to keep. 
4. Preview the effects of your proposed allowlist with the cardinality estimator before selecting **Save**.

**Note**: The exclusion of tags is not supported in the allowlist-based customization of tags. Adding tags starting with `!` is not accepted. Also, the cardinality estimator requires the metric to be older than 48 hours.

### Queryable tags 

Once your metric has been configured with Metrics without Limits\*, you can view which tags remain Queryable -- ultimately those that contribute to _Indexed Custom Metrics_ volume. And you can toggle back to all originally submitted and ingested tags that contribute to your _Ingested Custom Metrics_ volume. 

### Optimize your metric with aggregations in Advanced Mode

For custom metrics of the count, gauge, or rate metric type, you can further refine your metric's configurations by optionally including additional aggregations with the advanced mode of Metrics without Limits\*. By default, Datadog stores the most frequently queried aggregation combination depending on the metric's type to preserve the mathematical accuracy of your configured metric's query as listed below: 

- Configured counts/rates are queryable with time/space aggregations of `SUM`
- Configured gauges are queryable in time/space aggregations of `AVG`

{{< img src="metrics/summary/customize_aggr_docs.jpg" alt="Refine aggregations on counts, rates, and gauges" style="width:80%;">}}

More aggregations are available should they be valuable to you. You can add or remove aggregations at any time with no required Agent or code-level changes.

**Note**: Configuring your count, rate, or gauge metric and removing an aggregation may impact existing dashboards and monitors.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[10]:/metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
[2]: /metrics/explorer/
[3]: /dashboards/
[4]: /metrics/custom_metrics/
[5]: /getting_started/tagging/
[6]: /api/v1/metrics/#edit-metric-metadata
[7]: /metrics/units/
[8]: /metrics/types/
[9]: /integrations/
