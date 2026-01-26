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

<div class="alert alert-info">In-memory and disk buffering options for destinations are in Preview. Contact your account manager to request access.</a></div>

## Overview

Sometimes problems can occur even when you try to ensure your Observability Pipelines deployments are sized for the expected load. For example, an application might start generating more data than usual, or the downstream service you are sending data to starts responding slower than expected. To address these issues:
- Observability Pipelines propagates backpressure, which signals that the system cannot process events immediately upon receiving them.
- Observability Pipelines components also have in-memory buffering in case the next component is busy processing incoming data.

## Backpressure

Backpressure is a signal that events cannot be processed as soon as they are received, and that signal is propagated up through the pipeline. For example, if a processor is sending events to a destination, and the destination cannot process it as fast as it is receiving the events, backpressure is propagated from the destination to the processor and all the way back to the source.

Backpressure determines if the system should slow down the consumption or acceptance of events because it is too busy to handle more work. In some cases though, the system should not immediately propagate backpressure, because this could lead to the constant slowing down of upstream components, and potentially cause issues outside of Observability Pipelines. For example, the system prevents processes from slowing down when a component barely exceeds the saturation threshold. It can also handle temporary slowdowns and outages with external services that receive data from destinations.

## Component buffers

All components in Observability Pipelines have a small in-memory buffer between them to ensure smooth handoff of events as they traverse your pipeline. These buffers ensure that variations in the amount of time for an event to be processed through each component do not cause excessive blocking/waiting. These buffers are not intended for large scale buffering, and only have a capacity of 100 events.

By default, destinations have an in-memory buffer which can store 500 events. Destinations in particular are susceptible to intermittent latency and outages, because destinations involve sending events over a network to an external service. The size of destination buffers is configurable, allowing you to set it based on your pipeline's throughput. As long as there is still space in the buffer, your source keeps ingesting events and does not propagate backpressure. See [Configurable buffers for destinations](#configurable-buffers-for-destinations) for more information.

### Destination buffer behavior

If a destination becomes unavailable, events start to fill the destination buffer. The destination retries indefinitely to ensure the pipeline flows again as soon as the destination becomes available. If the buffer fills up during this time, it blocks new events from being processed upstream. This eventually results in backpressure propagation, which stops any new events from being ingested from your source. 

#### Which buffer type to use for a destination

There are two types of buffers you can use for your destination:

- **Memory buffers** prioritize throughput over durability; they can handle significant bandwidth, but memory buffers do not persist between Worker restarts.
- **Disk buffers** prioritize durability over throughput. Disk buffers write to the page cache first, then flush to disk if the data is not immediately transmitted by the destination. Disk buffers wait at most 500 ms before calling fsync and flushing a data file to disk. A disk buffer flushes more frequently if a data file fills up to its maximum 128 MB size before the 500 ms has elapsed since the last flush.

Both types of buffering help to prevent backpressure from propagating back to your source and application when a destination is temporarily unavailable. Specific reasons you might have for choosing:
- **Memory buffers**
  - You plan on sending a high bandwidth of data through your Worker, which a disk buffer might not be able to keep up with.
  - You are okay with potential data loss.
- **Disk buffers**
  - The bandwidth of data you plan on sending through your pipeline is unlikely to get bottlenecked by I/O as the buffer flushes to disk.
  - You need to minimize any potential data loss which might occur if the Worker unexpectedly shuts down.
  
This table compares the differences between the memory and disk buffer.

| Property                                                 | Memory Buffer             | Disk Buffer                          |
| -------------------------------------------------------- | ------------------------- | ------------------------------------ |
| Default size                                             | 500 events                | Configurable<br>Minimum buffer size: 256 MB<br> Maximum buffer size: 500 GB       |
| Performance                                              | Higher                    | Lower                                |
| Durability through an unexpected Worker restart or crash | None                      | Events flushed to disk latest every 500 ms        |
| Data loss due to an unexpected restart or crash                                       | All buffered data is lost | All buffered data is retained        |
| Data loss on graceful shutdown                           | All buffered data is lost | None (All data is flushed to disk before exit)  |

#### Kubernetes persistent volumes

If you enable disk buffering for destinations, you must enable Kubernetes [persistent volumes][1] in the Observability Pipelines helm chart. With disk buffering enabled, events are first sent to the buffer and written to the persistent volumes and then sent downstream.

#### Buffer metrics (when enabled)

{{% observability_pipelines/metrics/buffer %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L278