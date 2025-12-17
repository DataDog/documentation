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

## In-memory buffering for components

All components in Observability Pipelines have a small in-memory buffer between them. In-memory buffering can also be configured for all Observability Pipelines destinations (in Preview). The buffer is the channel that two components communicate over. It ensures that there is a small amount of space, typically 100 events, that can be used to send events even if the component on the receiving end is busy. This allows maximizing throughput when workloads are not entirely uniform.

Buffering protects against temporary overloads or outages for a given workload. The buffering model prioritizes performance when handling an excess of events, an amount that is beyond what a destination can process, by using in-memory buffers on destinations. By default, a destination's default buffer size is increased from 100 events to 500 events. The buffer capacity is increased because destinations are typically the primary source of backpressure in any given Observability Pipelines topology. They communicate to services over the network, where latency may be introduced or outages may temporarily occur.

Observability Pipelines destination's buffers are configured to block events, which means it waits indefinitely to write to a buffer that is full. This is to make sure observability data is reliably processed in the order it was given. Additionally, as mentioned earlier, blocking induces backpressure and signals upstream components to slow down event acceptance or consumption. As a result, although the system retains all data, it accumulates at the edge.

## Disk buffers

Observability Pipelines destinations can be configured with disk buffers (in Preview). When disk buffering is enabled for a destination, every event is first sent through the buffer and written to the data files, before the data is sent to the downstream integration. By default, data is not synchronized for every write, but instead synchronized on an interval (500 milliseconds), which allows for high throughput with a reduced risk of data loss.

### Kubernetes persistent volumes

If you enable disk buffering for destinations, you can enable Kubernetes [persistent volumes][1] in the Observability Pipelines helm chart to handle back pressure when a destination is unavailable or can't keep up with the volume of data that the Worker is sending.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/23624b6e49eef98e84b21689672bb63a7a5df48b/charts/observability-pipelines-worker/values.yaml#L268