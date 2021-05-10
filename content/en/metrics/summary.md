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

The [Metrics Summary page][1] displays a list of your metrics reported to Datadog under a specified time frame: the past hour, day, or week. Search your metrics by name or tag using the **Metric** or **Tag** search fields:

{{< img src="metrics/summary/tagexplorer2.gif" alt="Filter by Tag"  style="width:75%;">}}

## Metric details sidepanel

Click on any metric name to display its details sidepanel for more information regarding the metric’s metadata and tags: 

{{< img src="metrics/summary/metric_panel3.png" alt="Metric panel"  style="width:75%;">}}

### Metric name

The name of your metric in the [Metrics Explorer][2], [dashboards][3], etc.

### Distinct metrics reported

A metric name may emit multiple distinct metrics depending on its associated tag value combinations. This number varies with the timeframe chosen on the page.

Learn more in the [custom metrics][4] documentation.

### Hosts

The total number of hosts reporting a metric.

### Tag values

The total number of unique tag values attached to a metric.

[Learn more about tagging][5].

### Metrics metadata

The metadata attached to your metric. Most of the metadata can be edited on the metric summary page or with the [Datadog API][6].

#### Metric unit

The unit for your metric (byte, second, request, query, etc.). See the [metric unit][7] page for more details.

When submitting custom metrics to Datadog, it is possible to change the [unit of measurement][1] that displays when hovering over the metric in your graph. **Note**: This does not change how a metric graph is displayed—it only changes the units of measurement that raw values are considered as, when hovering over a metric. Formatting is automatically applied for readability. For example, bytes (`B`) may be displayed as kibibytes (`KiB`).

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

The tags table offers a variety of ways to explore all the tag keys and tag values that are actively reporting in your metric’s data.

Use the tags table to:

- Sort tag keys by the **Count column** (count of unique tag values).
- Search through the paginated table of tags for a particular tag key.
- Export the tags table as a downloadable CSV.

For any particular tag key, you can:

- Inspect all tag values of that tag key.
- Use a specific tag `key:value` to further filter the list of metrics displayed on the Metrics Summary page.
- Open a graph of this metric filtered by your tag `key:value` pair in the Metrics Explorer.
- Copy any tag `key:value` for filtering across the application.

{{< img src="metrics/summary/tags_table.gif" alt="Tags Table"  style="width:75%;">}}

[Learn more about tagging][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /metrics/explorer/
[3]: /dashboards/
[4]: /developers/metrics/custom_metrics/
[5]: /getting_started/tagging/
[6]: /api/v1/metrics/#edit-metric-metadata
[7]: /developers/metrics/units/
[8]: /developers/metrics/types/
[9]: /integrations/
