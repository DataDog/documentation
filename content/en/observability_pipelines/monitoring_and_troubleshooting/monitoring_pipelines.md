---
title: Monitoring Pipelines
disable_toc: false
aliases:
  - /observability_pipelines/monitoring/
further_reading:
- link: "observability_pipelines/set_up_pipelines"
  tag: "Documentation"
  text: "Set up a pipeline"
- link: "/monitors/types/metric/"
  tag: "Documentation"
  text: "Configure a metric monitor"
- link: "/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/"
  tag: "Documentation"
  text: "Observability Pipelines usage metrics"
---

## Overview

A pipeline consists of components that collect, process, and route your observability data. You can track the status of your pipelines and components in the following ways:

- View health graphs of your [pipelines](#view-the-status-of-your-pipelines), [Workers](#view-the-status-of-your-workers), and [components](#view-the-status-of-your-pipeline-components) (sources, processors, and destinations).
- Enable [out-of-the-box monitors](#out-of-the-box-monitors) that alert you if:
    - An Observability Pipelines Worker has high CPU or memory usage, or is dropping data.
    - A component is emitting errors.
    - A defined quota has been reached.
- Create your own dashboards, notebooks, and monitors with the available [Observability Pipelines metrics][5].

## View the status of your pipelines

1. Navigate to [Observability Pipelines][1] to see how many events or bytes your pipelines are receiving and sending out. The **events/s** and **bytes/s** metrics shown on this page are based on an average over 15 minutes.
1. Select a pipeline.
1. Click the **Health** tab to see details about the pipeline and its components. You can view graphs of:
    - How much each component is being used, and the total number of events that the component receives and sends out.
    - The number of requests made to destinations, and the number of errors encountered by those requests.
    - How many events are intentionally and unintentionally discarded.
    - Any changes in the number of requests and errors for each component over the previous week.

You can export a health graph to a dashboard, notebook, or monitor. The exported graph shows you that the metric is grouped by the specific pipeline and component tags.

## View the status of your Workers

To view graphs of resource usage and data sent through Observability Pipelines Workers:

1. Navigate to [Observability Pipelines][1].
1. Select a pipeline.
1. Click the **Workers** tab to see the Workers' memory and CPU utilization, traffic stats, and any errors.

## View the status of your pipeline components

To view metrics for a source, process, or destination:

1. Navigate to [Observability Pipelines][1].
1. Select a pipeline.
1. Click the cog next to the source's, processor's, or destination's name, then select **View details**. Datadog displays health graphs for the component you selected.
1. If you want to export a graph to an [incident][2], [dashboard][3], or [notebook][4], click the export icon on the graph. The exported graph shows that the metric is grouped by the specific pipeline and component tags.

## Out-of-the-box monitors

To see available out-of-the-box monitors:

1. Navigate to [Observability Pipelines][1].
1. Click **Enable monitors** in the **Monitors** column for your pipeline.
1. Click **Start** to set up a monitor for one of the suggested use cases.<br>
    The new metric monitor page is configured based on the use case you selected. You can update the configuration to further customize it. See the [Metric monitor documentation][3] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /service_management/incident_management/
[3]: /monitors/types/metric/
[4]: /notebooks/
[5]: /observability_pipelines/monitoring_and_troubleshooting/metrics/
