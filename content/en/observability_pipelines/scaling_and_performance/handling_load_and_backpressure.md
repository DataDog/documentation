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

Buffering data protects against temporary overloads or outages for a given workload. All components in Observability Pipelines have a small in-memory buffer between them. The buffer is the channel that two components communicate over. It ensures that there is a small amount of space that can be used to send events even if the component on the receiving end is busy. This allows maximizing throughput when workloads are not entirely uniform.

The buffer size is 100 events for source and processors and a default of 500 events for destinations. The buffer size for destinations is configurable. See [Configurable buffers for destinations](#configurable-buffers-for-destinations) for more information. The default destination buffer capacity is more than that of sources and processors because destinations are typically the primary source of backpressure. Destinations communicate to services over the network, where latency may be introduced or outages may temporarily occur.

### Configurable buffers for destinations

Observability Pipelines' buffering model prioritizes performance when handling an excess of events by using buffers on destinations. Destination buffers are configured to block events, which means the Worker waits indefinitely to write to a buffer that is full. This ensures observability data is reliably processed in the order it was given. Additionally, as mentioned earlier, blocking induces backpressure and signals upstream components to slow down event acceptance or consumption. As a result, although the system retains all data, it accumulates at the edge.

Destinations use a memory buffer by default, but can be configured with disk buffers. When disk buffering is enabled for a destination, every event is first sent through the buffer and written to the data files, before the data is sent to the downstream integration. Disk buffers can be used to mitigate backpressure when a destination is unavailable or can't keep up with the volume of data that the Worker is sending. By default, data is not synchronized for every write, but instead synchronized on an interval (500 milliseconds), which allows for high throughput with a reduced risk of data loss.

#### Which buffer type to use for a destination

Where you choose a memory or disk buffer depends on how much durability you want with your data. Memory buffers are faster, but if the Worker restarts unexpectedly, the buffered data is lost because the data is not saved to a disk. Disk buffers perform slower because it has to flush the data to a disk. However, the buffered data is not lost when the Worker unexpectedly restarts because the events are stored on the disk.

Use case for memory buffers:

- You want to prevent backpressure from propagating back to your source and application when a destination is temporarily unavailable.
- You are okay with potential data loss.

Use case for disk buffers:

- Your data needs durability and you want to prevent data loss if there is a temporary slowdown or outage.

This table compares the differences between the memory and disk buffer.

| Property                                                 | Memory Buffer             | Disk Buffer                          |
| -------------------------------------------------------- | ------------------------- | ------------------------------------ |
| Default size                                             | 500 events                | Configurable<br>Minimum buffer size: 256 MB<br> Maximum buffer size: 500 GB       |
| Performance                                              | Higher                    | Lower                                |
| Durability through an unexpected Worker restart or crash | None                      | Events synced every 500 ms           |
| Data loss due to an unexpected restart or crash                                       | All buffered data is lost | All buffered data is retained        |
| Data loss on graceful shutdown                           | All buffered data is lost | None (All data is flushed before exit)  |

#### Kubernetes persistent volumes

If you enable disk buffering for destinations, you must enable Kubernetes [persistent volumes][1] in the Observability Pipelines helm chart. With disk buffering enabled, events are first sent to the buffer and written to the persistent volumes and then sent downstream.

#### Buffer metrics (when enabled)

{{% observability_pipelines/metrics/buffer %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L278