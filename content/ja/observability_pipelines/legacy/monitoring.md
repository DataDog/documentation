---
aliases:
- /ja/observability_pipelines/monitoring/
disable_toc: false
title: (LEGACY) Monitoring
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

## 概要

In [Observability Pipelines][1], your pipelines are comprised of components that collect, process, and route your observability data. The health of your pipelines and components are indicated by health statuses and graphs, as well as resource utilization and data delivery graphs.

Health statuses are determined by specific metrics based on thresholds and default time windows. The available statuses are as follows:

- `Healthy`: Indicates the Worker is not falling behind.
- `Warning`: Indicates the Worker is not performing optimally and is at risk of falling behind. The Worker may fall behind due to issues such as a downstream destination or service causing back pressure to build up and there not being enough resources provisioned for the Workers.
- `Critical`: Indicates that the Worker is falling behind. If the Worker is falling behind, it may be at risk of dropping data; however, the Worker will not drop data unintentionally as long as your pipelines are [architected][2] and configured correctly.

Internal metrics, which are grouped by health, data delivery, and resource utilization, drives the overall health status of your pipeline and its components.

Health graphs are available for the following metrics:
- Events unintentionally dropped
- エラー
- Lag time (only available for sources)
- Lag time rate of change (only available for sources)
- Utilization

Data delivery graphs are available for the following metrics:
- Events in/out per second
- Bytes in/out per second

Resource utilization graphs are available for the following metrics:
- CPU の使用率
- メモリ使用量
- Disk usage (only available for destinations)

## See the status of your pipelines and components

1. Navigate to [Observability Pipelines][3].
1. Click on a pipeline.
1. Hover over the graphs to see specific data points.

## Pipeline resource utilization health metrics

| メトリクス        | OK       | Warning    | クリティカル  | 説明                       |
| ------------  | :------: | :--------: | :-------: | --------------------------------- |
| CPU の使用率     | <= 0.85  | > 0.85     | N/A       | Tracks how much CPU a Worker process is using. <br><br> A value of `1` indicates that a Worker process does not have any more headroom in the host or compute units running it. This can lead to possible issues such as processing latency going out of bounds, upstream/downstream overload, and so on.|
| メモリ使用量  | >= 0.15  | < 0.15     | N/A       | Tracks the amount of used and free memory on the host. The Worker is not memory bound but high memory usage can indicate leaks.

## Component health metrics

| メトリクス                    | ソース   | 変換| 送信先 | OK      | Warning  | クリティカル  | 説明                       |
| ------------------------  | :-------: | :-------: | :----------: | :-----: | :------: | :--------:| --------------------------------- |
| Events dropped            | {{< X >}} | {{< X >}} |{{< X >}}     | ==0     | N/A      | > 0       |Expected to always be `0`. If you configured the Worker to intentionally drop data, for example using the `filter` transform, that data is not counted here. Therefore, a single error indicates that the Worker is not in a healthy state.|
| Total errors              |{{< X >}}  |{{< X >}}  |{{< X >}}     | ==0     | >0       | N/A       | The total number of errors encountered by the component. These errors are also emitted as [Diagnostic Logs][4], which provides more information about specific internal error logs. |
| Utilization               |           |{{< X >}}  |{{< X >}}     | <=0.95 | >0.95   | N/A       | Tracks the component's activity.<br><br> A value of `0` indicates an idle component that is waiting for input. A value of `1` indicates a component that is never idle. A value greater than `0.95` indicates that the component is busy and likely a bottleneck in the processing topology. |
| Lag time                  |{{< X >}}  |           |              | N/A    | N/A     | N/A      | This is the raw time difference (in milliseconds) between the timestamp on the event and the timestamp of when the event was ingested by the Worker. High lag time or a change in the lag time (see below) is an indicator of whether the Worker is falling behind due to back pressure from a downstream service, lack of resources provisioned to the Worker, or a bottleneck in the pipeline. |
| Lag time rate of change   | {{< X >}} |           |              | <=0    | >0      | >1       | Indicates whether there is a substantial delay between when the event is generated and when the Worker receives the data. If there is a delay, then the Worker is falling behind in receiving data from the source.<br><br> A value of `0` indicates there is no additional lag from when the observability data is generated and when the Worker receives the data. A value equal to or greater than `1` indicates that there is backpressure and a bottleneck. |
| Disk usage                |           |           |{{< X >}}     | >=0.20 | > 0.20  | N/A     | Measures how full a given disk is. <br><br> A value of `1` indicates that no data can be stored in the disk. A value of `0` indicates that the disk is empty. |

[1]: /ja/observability_pipelines/legacy/
[2]: /ja/observability_pipelines/legacy/architecture/
[3]: https://app.datadoghq.com/observability-pipelines/legacy/
[4]: /ja/observability_pipelines/legacy/troubleshooting/#investigate-diagnostic-logs