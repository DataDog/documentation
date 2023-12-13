---
title: Span Links
kind: documentation
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/signals/traces/#span-links'
      tag: 'Documentation'
      text: 'OpenTelemetry Span Links'
    - link: '/tracing/trace_collection/otel_instrumentation/'
      tag: 'Documentation'
      text: 'Custom Instrumentation with the OpenTelemetry API'
    - link: '/tracing/trace_collection/custom_instrumentation/'
      tag: 'Documentation'
      text: 'Custom Instrumentation with Datadog Libraries'
---

<div class="alert alert-info">Span link support is in beta.</a></div>

## Overview

Span links are an [OpenTelemetry concept][5] and a part of the [OpenTelemetry Tracing API][2]. Datadog supports span links for:

- Applications instrumented with [OpenTelemetry SDKs][6].
- Applications instrumented with Datadog client libraries using the OpenTelemetry API.  
  **Note**: This beta release only supports the [PHP client library][1].

Span links correlate one or more spans together that are causally related but don't have a typical parent-child relationship. These links may correlate spans within the same trace or across different traces.

Span links help trace operations in distributed systems, where workflows often deviate from linear execution patterns. They are useful to trace the flow of operations in systems that execute requests in batches or process events asynchronously.

## Common use cases

Span links are most applicable in fan-in scenarios, where multiple operations converge into a single span. The single span links back to multiple converging operations.

For example:

- **Scatter-Gather and Map-Reduce**: Here, span links trace and correlate multiple parallel processes that converge into a single combined process. They connect the results of these parallel processes to their collective outcome.

- **Message Aggregation**: In systems like Kafka Streams, span links connect each message in a group of messages to their aggregated result, showing how individual messages contribute to the final output.

- **Transactional Messaging**: In scenarios where multiple messages are part of a single transaction, such as in message queues, span links trace the relationship between each message and the overarching transactional process.

- **Event Sourcing**: Span links in event sourcing track how multiple change messages contribute to the current state of an entity.

## Creating span links

If your application is instrumented with:

- The OpenTelemetry SDK, follow the OpenTelemetry manual instrumentation documentation for your language. For example, [Create spans with links for Java][3].
- The PHP Datadog library, follow the [Adding span links][1] examples.

## Viewing span links

You can view span links from the [Trace Explorer][4] in Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/php/#adding-span-links-beta
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /tracing/trace_explorer/trace_view/?tab=spanlinksbeta#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/


