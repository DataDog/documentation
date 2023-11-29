---
title: Span Links
kind: documentation
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/signals/traces/#span-links'
      tag: 'Documentation'
      text: 'OpenTelemetry Span Links'
---

## Requirements

<div class="alert alert-info">Span link support is in beta.</a></div>

You can use span links:

- For any application instrumented with OpenTelemetry SDKs.
- In the Datadog PHP native library.

## Overview

Span links associate one or more spans together that are causally related but don't have a typical parent-child relationship. These links may correlate spans within the same trace or across different traces.

Span links help trace operations in distributed systems, where workflows often deviate from linear execution patterns. They are useful to trace the flow of operations in systems that execute requests in batches or process events asynchronously.

## Use cases

Span links are most applicable in fan-in scenarios, where multiple operations converge into a single span. The single span links back to multiple converging operations.

For example:

- **Scatter-Gather and Map-Reduce**: Here, span links trace and correlate multiple parallel processes that converge into a single combined process. They connect the results of these parallel processes to their collective outcome.

- **Message Aggregation**: In systems like Kafka Streams, span links connect each message in a group of messages to their aggregated result, showing how individual messages contribute to the final output.

- **Transactional Messaging**: In scenarios where multiple messages are part of a single transaction, such as in message queues, span links trace the relationship between each message and the overarching transactional process.

- **Event Sourcing**: Span links in event sourcing track how multiple change messages contribute to the current state of an entity.

Span links are also applicable in fan-out scenarios, where a single operation initiates multiple parallel operations. The single span links to multiple diverging operations.

For example:

- **Batch System Feeding Processing Pipeline**: In large batch processing systems, span links divide the trace into more manageable segments, connecting each segment of the processing pipeline back to the initial batch intake.

- **Multiple Receivers and Event Logging**: In transaction systems with primary and secondary processing paths, such as analytics or summarization, span links separate secondary pathways and reconnect them to the main transaction pathway.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: /tracing/visualization/#span-tags
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /tracing/setup_overview/configure_data_security/
[5]: /tracing/trace_collection/library_config/
