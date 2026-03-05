---
title: Handling Load and Backpressure
disable_toc: false
aliases:
  - /observability_pipelines/performance/
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
---

## Overview

Observability Pipelines are designed for durability and to mitigate the impact of destinations becoming unavailable. If a destination is unavailable (for example, due to connection issues), the Observability Pipelines Worker retries to connect to the destination until the connection is reestablished or the destination times out. As a result, events accumulate in the pipeline components' internal buffers, eventually blocking the source from ingesting new events. This behavior is called **backpressure**.

It is important to consider how backpressure propagates through your architecture in the event of a destination outage. For example, backpressure can block your application from sending logs to Observability Pipelines and those logs may contend for memory or disk resources needed by your service. To prevent backpressure from reaching your application, configure a destination buffer and right-size it to your pipeline's throughput, which helps the Worker absorb backpressure due to your destination being unavailable. You may also want to consider configuring the on-full buffer behavior to `drop newest`, which prevents backpressure by dropping incoming events when the buffer is full. See the [destination buffers section](#destination-buffers) for more information on configurable destination buffers.

All components in the Observability Pipelines Worker have an in-memory buffer to help smooth the handoff of events between components. All sources have a buffer with a capacity of 1000 events per worker thread. Sources write events to their respective downstream buffer upon ingestion. All processors have an in-memory buffer with a capacity of 100 events, which the processors consume from upstream. Source and processor buffers are not configurable.

## Destination buffers

By default, destinations have an in-memory buffer with a capacity of 500 events. This buffer is configurable, enabling you to control the following parameters:

- **Buffer type**: Either an in-memory buffer or a disk buffer
- **Buffer size**: The maximum byte capacity of the buffer
- **Buffer on-full behavior**: Determines the overflow behavior of the buffer, to either block events and propagate backpressure or drop incoming events to prevent backpressure propagation.

For each of those settings, choose the option that best aligns with your logging strategy.

### Choosing buffer types

**In-memory buffers** prioritize throughput over durability. They can handle significant bandwidth, but memory buffers do not persist between Worker restarts.

Use an in-memory buffer if you want to prevent backpressure from propagating, and losing all logs in the buffer on restart is acceptable.

**Disk buffers** prioritize durability over throughput. Disk buffers write to the page cache first, then flush to disk if the destination doesn't send the data immediately. Disk buffers wait at most 500 ms before calling fsync and flushing a data file to disk. A disk buffer flushes more frequently if a data file fills up to its maximum 128 MB size before the 500 ms has elapsed since the last flush. Disk buffers are ordered, meaning events are sent downstream in the order they were written to the buffer (first in, first out).

Use a disk buffer if you need to mitigate data loss and the throughput of your pipeline is unlikely to be bottlenecked by I/O when flushing to disk.

### Choosing buffer on-full behavior

**Block (default)**: If the buffer is full, incoming events are blocked from being written to the buffer. Use this option if you want to help ensure no events are dropped.

**Drop Newest**: If the buffer is full, incoming events are dropped. This allows the source to continue to ingest events and prevents backpressure from propagating back to your application. See [Using buffers with multiple destinations](#using-buffers-with-multiple-destinations) for details on how this behaves when you have multiple destinations.

This table compares the differences between the memory and disk buffer.

| Property                                                 | Memory Buffer             | Disk Buffer                          |
| -------------------------------------------------------- | ------------------------- | ------------------------------------ |
| Default size                                             | 500 events                | Configurable<br>Minimum buffer size: 256 MB<br> Maximum buffer size: 500 GB       |
| Performance                                              | Higher                    | Lower                                |
| Durability through an unexpected Worker restart or crash | None                      | Events flushed to disk latest every 500 ms        |
| Data loss due to an unexpected restart or crash          | All buffered data is lost | All buffered data is retained        |
| Data loss on graceful shutdown                           | All buffered data is lost | None, all data in the pipeline is flushed to disk before exit  |

### Using buffers with multiple destinations

After your events are sent through your processors, the events go through a fanout to all of your pipeline's destinations. If backpressure propagates to the fanout from any destination, **all** destinations are blocked. No additional events are sent by any destination until the blocking destination resumes sending events successfully.

Using the `drop_newest` on-full behavior drops incoming events when the destination's buffer is full. This prevents backpressure from propagating to the fanout from this destination, allowing your other destinations to continue ingesting events from the fanout. This can be helpful if you want to help ensure events are delivered reliably to one destination, but are okay with another destination dropping events if it becomes unavailable to prevent backpressure propagation.

## Kubernetes persistent volumes

If you enable disk buffering for destinations, you must enable Kubernetes [persistent volumes][1] in the Observability Pipelines helm chart. With disk buffering enabled, events are first sent to the buffer and written to the persistent volumes, then sent downstream.

## Buffer metrics

Use these metrics to analyze buffer performance. All metrics are emitted on a one-second interval, unless otherwise stated.

### Source buffer metrics

{{% observability_pipelines/metrics/buffer/sources %}}

### Processor buffer metrics

{{% observability_pipelines/metrics/buffer/processors %}}

### Destination buffer metrics

{{% observability_pipelines/metrics/buffer/destinations %}}

### Deprecated buffer metrics

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
