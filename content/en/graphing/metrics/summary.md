---
title: Metrics Summary
kind: documentation
description: "Consult the full list of metrics reporting to Datadog."
aliases:
  - /graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
further_reading:
  - link: "graphing/metrics/explorer"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "graphing/metrics/distributions"
    tag: "Documentation"
    text: "Metrics Distributions"
---

The [Metrics Summary page][1] displays a list of all the [metrics][2] reported to Datadog under a specified time frame: the past hour, day, or week. This list can be filtered by name. Clicking on a metric brings up a panel with more detailed information.

{{< img src="graphing/metrics/summary/summary.mp4" alt="Summary" video="true" responsive="true" width="80%" >}}

## Metric panel

The metric panel displays an overview for a given metric:

{{< img src="graphing/metrics/summary/metric_panel.png" alt="Metric panel" responsive="true" style="width:80%;">}}

Key information about your metric can be seen:

* **Metric name**: The name of your metric in the [metric explorer][3], [dashboard widgets][4], etc.
* **Number of distinct metrics**: A metric name can correspond to multiple distinct metrics depending on its associated tags. Consult the [custom metrics documentation][5] to learn more.
* **Number of hosts**: The total number of hosts reporting this metric.
* **Number of tags**: The total number of tags attached to this metric. Read more about [tagging][6] and [assigning tags][7].
* **Metrics metadata**: All metadata attached to your metric:
    * Metric description
    * [Metric unit][8]
    * [Metric type][9]
    * The integration name, if this metric is coming from an [integration][10]
    * The interval of collection of this metric

### Metric metadata

Every piece of metric metadata can be manually edited:

#### Edit the metric description

Editing the metric description can help you understand what a metric does.
If a metric is coming from an integration and you notice a wrong description, [open an issue in the Datadog documentation GitHub repository][11].

#### Edit the metric unit or add a custom unit

When submitting custom metrics to Datadog, it is possible to change the [unit of measurement][1] which shows up when hovering over a certain metric in your graph. Do this by selecting your custom metric from the list and then selecting the unit of measurement you would like to use as depicted below:

{{< img src="graphing/metrics/summary/metrics_metadata.mp4" alt="Metrics Metadata" video="true" responsive="true" width="80%" >}}

**Note**: This does not change how a metric graph is displayed (only the units of measurement that raw values are considered as when hovering over a metric). Formatting is automatically applied for readability, for example bytes (`B`) may be displayed as kibibytes (`KiB`).

#### Edit the metric type

Editing the metric type can help you match the real metric type send.
**Warning**: This changes your metric behavior in **ALL** your analytics and monitors; do this at your own risk.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /developers/metrics
[3]: /graphing/metrics/explorer
[4]: /graphing/functions
[5]: /developers/metrics/custom_metrics
[6]: /tagging
[7]: /tagging/assigning_tags
[8]: /developers/metrics/units
[9]: /developers/metrics/types
[10]: /integrations
[11]: https://github.com/DataDog/documentation/issues/new/choose
