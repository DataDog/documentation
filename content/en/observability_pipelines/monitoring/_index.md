---
title: Monitoring
disable_toc: false
further_reading:
- link: "observability_pipelines/set_up_pipelines"
  tag: "Documentation"
  text: "Set up a pipeline"
- link: "/monitors/types/metric/"
  tag: "Documentation"
  text: "Configure a metric monitor"
- link: "/observability_pipelines/monitoring/metrics/"
  tag: "Documentation"
  text: "Observability Pipelines metrics"
---

## Overview

A pipeline consists of components that collect, process, and route your observability data. You can track the status of your pipelines and components by:

- Viewing health graphs of your [pipelines](#view-the-status-of-your-pipelines), [Workers](#view-the-status-of-your-workers), and [components](#view-the-status-of-your-pipeline-components) (sources, processors, and destinations).
- Enabling [out-of-the-box monitors](#out-of-the-box-monitors) that alert you if:
    - An Observability Pipelines Worker has high CPU or memory usage, or is dropping data.
    - A component is emitting errors.
    - A defined quota has been reached.
- You can also create your own dashboards, notebooks, and monitors with the available [Observability Pipelines metrics][5].

## View the status of your pipelines

1. Navigate to [Observability Pipelines][1] to see how many bytes your pipelines are receiving and sending out.
1. Select your pipeline.
1. Click the **Health** tab to see details about the pipeline and its components. Specifically, view graphs of:
    - How much each component is being utilized and the total number of events that the component receives and sends out.
    - The number of requests made to destinations and the number of errors encountered.
    - How many events are intentionally and unintentionally discarded.
    - Any changes over the week with the number of requests and errors for each component.

You can export a health graph to a dashboard, notebook, or monitor. The exported graph shows you how the metric is grouped by the specific pipeline and component tags.

## View the status of your Workers

To view graphs of your Observability Pipelines Workers' resource utilization and the amount of data sent through:

1. Navigate to [Observability Pipelines][1].
1. Select your pipeline.
1. Click the **Workers** tab to see the Workers' memory and CPU utilization, traffic stats, and any errors.

## View the status of your pipeline components

To view metrics for a source, process, or destination:

1. Navigate to [Observability Pipelines][1].
1. Select your pipeline.
1. Click the cog next to the source's, processor's, or destination's name, and then select **View details** to see health graphs for that component.
1. Click the export icon on a graph if you want to export it to an [incident][2], [dashboard][3], or [notebook][4]. The exported graph shows you how the metric is grouped by the specific pipeline and component tags.

## Out-of-the-box monitors

To see the available out-of-the-box monitors:

1. Navigate to [Observability Pipelines][1].
1. Click **Enable monitors** in the **Monitors** column for your pipeline.
1. Click **Enable** to set up a monitor for that use case.
1. The new metric monitor page is configured based on the use case you selected. You can update the configuration to further customize it. See the [Metric monitor documentation][3] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /service_management/incident_management/
[3]: /getting_started/dashboards/
[4]: /notebooks/
[5]: /observability_pipelines/monitoring/metrics/