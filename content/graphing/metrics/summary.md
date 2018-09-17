---
title: Metrics Summary
kind: documentation
description: "Consult the full list of metrics reporting to Datadog."
aliases:
  - graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
further_reading:
  - link: "graphing/metrics/explorer"
    tag: "Documentation"
    text: Metrics Explorer
  - link: "graphing/metrics/distributions"
    tag: "Documentation"
    text: Metrics Distributions
---

The [Metrics Summary page][1] displays a list of all the [metrics][2] reported to Datadog under a specified time frame: the past hour, day, or week. This list can be filtered by name. Clicking on a metric brings up a panel with more detailed information.

{{< img src="graphing/metrics/summary/summary.gif" alt="Summary" responsive="true" style="width:80%;">}}

## Metric panel

The metric panel displays an overview for a given metric:

{{< img src="graphing/metrics/summary/metric_panel.png" alt="Metric panel" responsive="true" style="width:80%;">}}

Key information about your metric can be seen:

* **Metric name**: the name of your metric to be used in the [metric explorer][4] or in [dashboard widgets][5].
* **Number of distinct metrics**: A metric name can correspond to multiple distinct metrics depending of its associated tags, Consult the [custom metrics documentation][3] to learn more.
* **Number of host**: the total number of hosts reporting this metric.
* **Number of tags**: the total number of tags attached to this metric. Read more about [Tagging][6] and [how to assign tags][7].
* **Metrics metadata**: all metadata attached to your metric:
    * the metric description 
    * the [metric unit][10]
    * the [metric type][8] 
    * the integration name, if this metric is coming from an [integration][9]
    * the interval of collection of this metric.

### Metric metadata 

Every metric metadata can be manually edited: 

* Edit the metric description to help understanding what a metric does.

    If a metric is coming from an integration and you notice a wrong description, [open an issue in Datadog documentation Github repository][11] for a fix.

* Edit the metric unit or add a custom unit for a custom metrics

    When submitting custom metrics to Datadog, it is possible to change the [unit of measurement][1] which shows up when hovering over a certain metric in your graph. Do this by selecting your custom metric from the list and then selecting the unit of measurement you would like to use as depicted below:

    {{< img src="graphing/metrics/summary/metrics_metadata.gif" alt="Metrics Metadata" responsive="true" style="width:80%;">}}

    Note: This does not change the way that a metric graph is displayed (only the units of measurement when hovering over a metric)

* Edit the metric type to match the real metric type send. 
    Warning: this changes your metric behavior in **ALL** your analytics and monitor, do this at your own risk.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /developers/metrics
[3]: /developers/metrics/custom_metrics/
[4]: /graphing/metrics/explorer
[5]: /graphing/functions/
[6]: /tagging/
[7]: /tagging/assigning_tags/
[8]: /developers/metrics/#metric-types
[9]: /integrations
[10]: /developers/metrics/#units
[11]: https://github.com/DataDog/documentation/issues/new/choose
