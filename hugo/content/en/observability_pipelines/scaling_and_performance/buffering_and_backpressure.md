---
title: Buffering and Backpressure
description: Learn how Observability Pipelines uses buffering and backpressure to handle destination outages, and how to configure destination buffer settings.
disable_toc: false
aliases:
  - /observability_pipelines/performance/
  - /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/
further_reading:
- link: "observability_pipelines/set_up_pipelines#set-up-a-pipeline"
  tag: "Documentation"
  text: "Set up a pipeline"
- link: "observability_pipelines/sources"
  tag: "Documentation"
  text: "Sources"
- link: "observability_pipelines/processors"
  tag: "Documentation"
  text: "Processors"
- link: "observability_pipelines/destinations"
  tag: "Documentation"
  text: "Destinations"
- link: "https://www.datadoghq.com/architecture/observability-pipelines-a-guide-to-sizing-scaling-and-performance/"
  tag: "Architecture Center"
  text: "Observability Pipelines: A Guide to Sizing, Scaling and Performance"
---

## Overview

Observability Pipelines are designed for durability and to mitigate the impact when destinations are unavailable. If a destination is unavailable (for example, due to connection issues), the Observability Pipelines Worker retries its connection to the destination until the connection is reestablished or the destination times out. During this time, events accumulate in the pipeline components' internal buffers, eventually blocking the source from ingesting new events. This behavior is called **backpressure**.

It is important to consider how backpressure propagates through your architecture in the event of a destination outage. For example, backpressure can block your application from sending logs to Observability Pipelines and those logs may contend for memory or disk resources needed by your service. To prevent backpressure from reaching your application, [configure a destination buffer](#choosing-buffer-types) and size it according to your pipeline's throughput, which helps the Worker absorb backpressure when the destination is unavailable. You may also want to configure the [on-full buffer behavior](#choosing-buffer-on-full-behavior) to `drop newest`, which prevents backpressure by dropping incoming events when the buffer is full. See the [destination buffers section](#destination-buffers) for more information on configurable destination buffers.

All components in the Observability Pipelines Worker have an in-memory buffer to help smooth the handoff of events between components. All sources have a buffer with a capacity of 1,000 events per worker thread. Sources write events to their respective downstream buffer upon ingestion. All processors have an in-memory buffer with a capacity of 100 events, which the processors consume upstream. Source and processor buffers are not configurable.

## Destination buffers

By default, destinations have an in-memory buffer with a capacity of 500 events. This buffer is configurable, enabling you to control these parameters:

- **Buffer type**: Either an in-memory buffer or a disk buffer
- **Buffer size**: The maximum byte capacity of the buffer
- **Buffer on-full behavior**: Determines the overflow behavior of the buffer, either block events and propagate backpressure or drop incoming events to prevent backpressure propagation.

For each of those settings, choose the option that best aligns with your logging strategy.

### Choosing buffer types

**In-memory buffers** prioritize throughput over durability. They can handle significant bandwidth, but memory buffers do not persist between Worker restarts.

Use an in-memory buffer if you want to prevent backpressure from propagating, and losing all logs in the buffer on restart is acceptable.

**Disk buffers** prioritize durability over throughput. Disk buffers write to the page cache first, then flush to disk if the destination doesn't send the data immediately. Disk buffers wait at most 500 ms before calling fsync and flushing a data file to disk. A disk buffer flushes more frequently if a data file fills up to its maximum 128 MB size before the 500 ms has elapsed since the last flush. Disk buffers are ordered, meaning events are sent downstream in the order they were written to the buffer (first in, first out).

Use a disk buffer if you need to mitigate data loss and the throughput of your pipeline is unlikely to be bottlenecked by I/O when flushing to disk.

### Choosing buffer on-full behavior

**Block** (default): If the buffer is full, incoming events are blocked from being written to the buffer. Use this option if you want to help ensure no events are dropped.

**Drop Newest**: If the buffer is full, incoming events are dropped. This allows the source to continue to ingest events and prevents backpressure from propagating back to your application. See [Using buffers with multiple destinations](#using-buffers-with-multiple-destinations) for details on how this works when you have multiple destinations.

This table compares the differences between the memory and disk buffer.

| Property                                                 | Memory Buffer             | Disk Buffer                          |
| -------------------------------------------------------- | ------------------------- | ------------------------------------ |
| Default size                                             | Configurable<br>Minimum buffer size: 1 MB<br>Maximum buffer size: 128 GB | Configurable<br>Minimum buffer size: 256 MB<br> Maximum buffer size: 5 TB<br>**Note**: For Worker versions older than 2.20.x, the maximum buffer size is 500 GB.       |
| Performance                                              | Higher                    | Lower                                |
| Durability through an unexpected Worker restart or crash | None                      | Events flushed to disk latest every 500 ms        |
| Data loss due to an unexpected restart or crash          | All buffered data is lost | All buffered data is retained        |
| Data loss on graceful shutdown                           | All buffered data is lost | None, all data in the pipeline is flushed to disk before exit  |

**Note**: On Kubernetes, disk buffer data persists through a Worker restart or crash only if the persistent volume persists. See [Kubernetes persistent volumes](#kubernetes-persistent-volumes) for more information.

### Using buffers with multiple destinations

After your events are sent through your processors, the events go through a fanout to all of your pipeline's destinations. If backpressure propagates to the fanout from any destination, **all** destinations are blocked. No additional events are sent by any destination until the blocked destination resumes sending events successfully.

The `drop_newest` on-full behavior drops incoming events when a destination's buffer is full. This prevents backpressure from propagating to the fanout from that destination, allowing your other destinations to continue ingesting events from the fanout. This can be helpful if you want to help ensure events are delivered reliably to one destination, but are okay with another destination dropping events if it becomes unavailable to prevent backpressure propagation.

### Kubernetes persistent volumes

The Worker runs as a Kubernetes [StatefulSet][2]. If you enable disk buffering for destinations, you must enable Kubernetes [persistent volumes][1] in the Observability Pipelines [Helm chart][3] (`persistence.enabled: true`). With disk buffering enabled, events are first sent to the buffer and written to the persistent volumes, then sent downstream.

#### Prerequisites

The Helm chart does not provision storage for you. Before you enable persistence, your cluster must have:

- A [StorageClass][4] that can provision persistent volumes. Some managed Kubernetes services do not include a default StorageClass. For example, Amazon EKS 1.30 and later do not set a default StorageClass. See [Amazon EKS storage][5] for more information.
- A [CSI driver][6] installed for your storage backend.

To use a specific StorageClass, set `persistence.storageClassName` in the Helm chart's `values.yaml` file.

#### Buffered data when a pod or node is replaced

Whether buffered events persist when a Worker pod is rescheduled or a node is recycled depends on your StorageClass:

- **Network-backed storage** (for example, Amazon EBS, Google Compute Engine Persistent Disk, or Azure Disk): The persistent volume generally persists when a node is removed. When Kubernetes reschedules the Worker pod, the volume reattaches to the new pod and the buffered events are retained.
- **Node-local storage** (for example, local volumes): The persistent volume is tied to the node. If the node is removed, the buffered events on that volume are lost.

#### PersistentVolumeClaim retention

By default, Kubernetes retains a StatefulSet's PersistentVolumeClaims when its pods scale down or the StatefulSet is deleted. To change this behavior, set `persistence.retentionPolicy` in the Helm chart. For example, `whenScaled: Delete` deletes a replica's persistent volume, and any events buffered on it, when that replica scales down. This setting does not affect what happens to a persistent volume when a node is removed. See [PersistentVolumeClaim retention][7] for more information.

See [Persistence and pod scheduling][8] for recommended `podManagementPolicy` settings when you use persistent volumes.

## Buffer metrics

Use these metrics to analyze buffer performance. All metrics are emitted on a one-second interval, unless otherwise stated.

{{< tabs >}}
{{% tab "Sources" %}}

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "Processors" %}}

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "Destinations" %}}

{{% observability_pipelines/metrics/buffer/destinations %}}

{{% /tab %}}
{{< /tabs >}}

### Deprecated buffer metrics

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
[2]: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml
[4]: https://kubernetes.io/docs/concepts/storage/storage-classes/
[5]: https://docs.aws.amazon.com/eks/latest/userguide/storage.html
[6]: https://kubernetes-csi.github.io/docs/drivers.html
[7]: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#persistentvolumeclaim-retention
[8]: /observability_pipelines/configuration/install_the_worker/?platform=kubernetes#persistence-and-pod-scheduling
