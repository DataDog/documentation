---
title: trace context propagation
core_product:
  - apm
---
Trace context propagation is the method of passing trace identifiers between services in a distributed system. It enables Datadog to stitch together individual spans from different services into a single distributed trace. Trace context propagation works by injecting identifiers, such as the trace ID and parent span ID, into HTTP headers as the request flows through the system. The downstream service then extracts these identifiers and continues the trace. This allows the Datadog to reconstruct the full path of a request across multiple services.

For more information, see <a href="/tracing/trace_collection/trace_context_propagation">propagating the trace context</a> for your application's language.