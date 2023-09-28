---
title: Monitoring
kind: documentation
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

In [Observability Pipelines][1], your pipelines are comprised of components that collect, process, and route your observability data. The health of your pipelines and components are indicated by health statuses and graphs, as well as resource utilization and data delivery graphs.

Health statuses are determined by specific metrics based on thresholds and default time windows. The available statuses are as follows:

- `Healthy`: Indicates the Worker is not falling behind.
- `Warning`: Indicates the Worker is not performing optimally and is at risk of falling behind.
- `Critical`: Indicates that the Worker is falling behind.

You can also view health, resource utilization, and data delivery graphs to determine the state of your pipelines and components.

Health graphs are available for the following metrics:
- Data unintentionally dropped
- Errors
- Lag time (only available for sources)
- Utilization

Data delivery graphs are available for the following metrics:
- Events in/out per second
- Bytes in/out per second

<div class="alert alert-warning pull-left">
Resources utilization graphs are only available for users enrolled in the remote configuration private beta.
</div>

Resource utilization graphs are available for the following metrics:
- CPU usage
- Memory usage
- Disk usage (only available for destinations)

## See the status of your pipelines and components

1. Navigate to [Observability Pipelines][2].
1. Click on a pipeline.
1. Hover over the graphs to see specific data points.

## Pipeline health metrics

| Metric        | OK       | Warning    | Critical  | Description                       |
| ------------  | :------: | :--------: | :-------: | --------------------------------- |
| CPU usage     | <= 0.85  | > 0.85     | N/A       | Tracks how much CPU a Worker process is using. <br> A value of `1` indicates that a Worker process does not have any more headroom in the host or compute units running it. This can lead to possible issues such as processing latency going out of bounds, upstream/downstream overload, and so on.|
| Memory usage  | >= 0.15  | < 0.15     | N/A       | Tracks the amount of used and free memory on the host. The Worker is not memory bound but high memory usage can indicate leaks.

## Component health metrics

| Metric        | Sources   | Transforms| Destinations | OK      | Warning  | Critical  | Description                       |
| ------------  | :-------: | :-------: | :----------: | :-----: | :------: | :-------: | --------------------------------- |
| Data dropped  | {{< X >}} | {{< X >}} |{{< X >}}     | ==0     | N/A      | > 0       |Expected to always be `0`. If you configured the Worker to intentionally drop data, for example using the `filter` transform, that data is not counted here. Therefore, a single error indicates that the Worker is not in a healthy state.|
| Total Errors  |{{< X >}}  |{{< X >}}  |{{< X >}}     | ==0     | >0       | N/A       | The total number of errors encountered by the component. Diagnostic Logs provides more information about specific internal error logs. |
| Utilization   |           |{{< X >}}  |{{< X >}}     | <=0.95 | >0.95   | N/A       | Tracks the component's activity.<br> A value of `0` indicates an idle component that is waiting for input. A value of `1` indicates a component that is never idle. A value greater than `0.95` indicates that the component is busy and likely a bottleneck in the processing topology. |
| Lag Time      | {{< X >}} |           |              | <=0    | >0      | >1       | Indicates whether there is a substantial delay between when the event is generated and when the Worker receives the data. If there is a delay, then the Worker is falling behind in receiving data from the source.<br> A value of `0` indicates there is no additional lag from when the observability data is generated and when the Worker receives the data. A value equal to or greater than `1` indicates that there is backpressure and a bottleneck. |

[1]: /observability_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines/

