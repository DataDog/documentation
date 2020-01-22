---
title: Metrics Summary
kind: documentation
description: "Consult the full list of metrics reporting to Datadog."
aliases:
  - /graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
  - /graphing/metrics/summary/
further_reading:
  - link: "/metrics/explorer"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "/metrics/distributions"
    tag: "Documentation"
    text: "Metrics Distributions"
---

## Overview

The [Metrics Summary page][1] displays a list of your metrics reported to Datadog under a specified time frame: the past hour, day, or week. Search your metrics by name or tag using the **Metric** or **Tag** search fields:

{{< img src="metrics/summary/tagexplorer.gif" alt="Filter by Tag"  style="width:75%;">}}

## Metric panel

Click on a metric name to display a panel with more detailed information. The metric panel displays key information for a given metric.

{{< img src="metrics/summary/metric_panel.png" alt="Metric panel"  style="width:75%;">}}

### Metric name

The name of your metric in the [metric explorer][2], [dashboards][3], etc.
 
### Number of distinct metrics

A metric can correspond to multiple distinct metrics depending on its associated tags. Learn more in the [custom metrics][4] documentation.

### Hosts

The total number of hosts reporting a metric along with a list of hosts. Click on any host to filter the metrics summary or view the filtered metric in the [metrics explorer][2].

### Tags

The total number of tags attached to a metric along with a list of tags. Click on any tag to filter the metrics summary or view the filtered metric in the [metrics explorer][2]:

{{< img src="metrics/summary/tag_click.png" alt="Click on a tag"  style="width:75%;">}}

Learn more about tagging in the [documentation][5].

### Metrics metadata

The metadata attached to your metric. Most of the metadata can be edited on the metric summary page or with the [Datadog API][6].

#### Metric description

The metric description helps you understand what a metric does. Descriptions are pre-populated for metrics coming from supported [integrations][7]. Use this field to update the descriptions for your [custom metrics][4].

#### Metric unit

The unit for your metric (byte, second, request, query, etc.). See the [metric unit][8] page for more details.

When submitting custom metrics to Datadog, it is possible to change the [unit of measurement][1] that displays when hovering over the metric in your graph. **Note**: This does not change how a metric graph is displayed—it only changes the units of measurement that raw values are considered as, when hovering over a metric. Formatting is automatically applied for readability. For example, bytes (`B`) may be displayed as kibibytes (`KiB`).

#### Metric type

The type for your metric (gauge, rate, or count). See the [metric type][8] page for more details.

**Warning**: Editing the metric type changes that metric's behavior for **ALL** your analytics and monitors.

#### Integration name

If the metric is coming from a supported [integration][7], the metadata lists the integration name. This information cannot be edited.

#### Interval

The collection interval for the metric in seconds.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /metrics/explorer
[3]: /dashboards
[4]: /developers/metrics/custom_metrics
[5]: /tagging
[6]: /api/?lang=python#edit-metric-metadata
[7]: /integrations
[8]: /developers/metrics/units
