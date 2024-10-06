---
title: Monitoring
disable_toc: false
further_reading:
- link: "observability_pipelines/set_up_pipelines"
  tag: "Documentation"
  text: "Set up a pipeline"
- link: "/monitors/types/metric/"
  tag: "Documentation"
  text: "Configuring a metric monitor"
---

## Overview

A pipeline consists of components that collect, process, and route your observability data. You can track the status of your pipelines and components by:

- Viewing health graphs of your [pipelines](#view-the-status-of-your-pipelines), [Workers](#view-the-status-of-your-workers), and [components](#view-the-status-of-your-pipeline-components) (sources, processors, and destinations).
- Enabling [out-of-the-box monitors](#out-of-the-box-monitors) that alert you if:
    - An Observability Pipelines Worker has high CPU or memory usage, or is dropping data.
    - A component is emitting errors.
    - A defined quota has been reached.
- [Creating your own dashboards, notebooks, and monitors](#create-your-own-dashboards-notebooks-and-monitors) with the available metrics.

## View the status of your pipelines

1. Navigate to [Observability Pipelines][1] to see how many bytes your pipelines are receiving and sending out.
1. Select your pipeline.
1. Click the **Health** tab to see details about the pipeline and its components. Specifically, view graphs of:
    - How much each component is being utilized and the total number of events that the component receives and sends out.
    - The number of requests made to destinations and the number of errors encountered.
    - How many events are intentionally and unintentionally discarded.
    - Any changes over the week with the number of requests and errors for each component.

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
1. Click the export icon on a graph if you want to export it to an [incident][2], [dashboard][3], or [notebook][4].

## Out-of-the-box monitors

To see the available out-of-the-box monitors:

1. Navigate to [Observability Pipelines][1].
1. Click **Enable monitors** in the **Monitors** column for your pipeline.
1. Click **Enable** to set up a monitor for that use case.
1. The new metric monitor page is configured based on the use case you selected. You can update the configuration to further customize it. See the [Metric monitor documentation][5] for more information.

## Create your own dashboards, notebooks, and monitors

You can create your own [dashboards][3], [notebooks][4], and [monitors][6] for your specific use case with the available metrics. Use [Metrics Summary][8] to see metadata and tags available for the metrics. You can also see which dashboards, notebooks, monitors, and SLOs are using those metrics.

See [Getting Started with Tags][7] for more information on how to use tags to group metrics by specific pipelines, Workers, and components. When you export a health graph to a dashboard, notebook, or monitor, you can see how the metric is group by the specific pipeline and component tags.

### Pipeline metrics

Bytes in per second
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of events the pipeline receives per second.

Bytes out per second
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **Description:** The number of bytes the pipeline receives per second.

### Component metrics

Bytes in per second
: **Metric**: `pipelines.component_received_bytes_total`
: **Description**: The number of bytes the component receives per second.
: **Available for**: Sources, processors, and destinations.

Bytes out per second
: **Metric**: `pipelines.component_sent_event_bytes_total`
: **Description**: The number of bytes the component sends to the destinations.
: **Available for**: Sources, processors, and destinations.

Events in per second
: **Metric**: `pipelines.component_received_event_bytes_total`
: **Description**: The number of events the component receives per second.
: **Available for**: Sources, processors, and destinations.

Events out per second
: **Metric**: `pipelines.component_sent_event_bytes_total`
: **Description**: The number of events the component sends to the destinations.
: **Available for**: Sources, processors, and destinations.

Errors
: **Metric**: `pipelines.component_errors_total`
: **Description**: The number of errors encountered by the component.
: **Available for**: Sources, processors, and destinations.

Data dropped intentionally or unintentionally
: **Metric**: `pipelines.component_discarded_events_total`
: **Description**: The number of events dropped. Break down the metric by using the `intentional:true` tag to filter for events that are intentionally dropped or the `intentional:false` tag for events that are not intentionally dropped.
: **Available for**: Sources, processors, and destinations.

Utilization
: **Metric**: `pipelines.utilization`
: **Description**: The component's activity. A value of `0` indicates an idle component that is waiting for input. A value of `1` indicates a component that is never idle. A value of `1` indicates that the component is busy and likely a bottleneck in the processing topology and creating backpressure, which could cause events to be dropped.
: **Available for**: Processors and destinations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /service_management/incident_management/
[3]: /getting_started/dashboards/
[4]: /notebooks/
[5]: /monitors/types/metric/
[6]: /getting_started/monitors/
[7]: /getting_started/tagging/
[8]: https://app.datadoghq.com/metric/summary