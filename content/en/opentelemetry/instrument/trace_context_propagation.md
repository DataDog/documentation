---
title: Trace Context Propagation
aliases:
  - /opentelemetry/interoperability/trace_context_propagation
type: multi-code-lang
description: 'Extract and inject Datadog, B3, and W3C Trace Context headers to propagate the context of a distributed trace.'
aliases:
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Understand APM terminology'
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{< include-markdown "tracing/trace_collection/trace_context_propagation/" >}}

## 128-bit trace IDs

W3C traces implicitly contain 128-bit trace IDs, rather than the 64-bit trace IDs that Datadog traces have historically used. The latest Datadog tracing libraries default configuration uses the setting `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True` so that they also produce trace data with 128-bit trace IDs. 

Following the [W3C Trace Context recommendations][9], Datadog 128-bit trace IDs have randomness in the lower-order 64 bits. This restriction provides backward compatibility for systems that intermix libraries that generate 64-bit trace IDs with newer ones that support 128-bit IDs. In such systems, spans with the full 128-bit trace ID and spans with the truncated lower-order 64-bit trace ID can arrive at the backend and be treated as matching and part of the same trace.

{{< img src="opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.png" alt="128-bit Trace IDs can be passed with trace context to code whose tracing library generates 64-bit trace IDs, and Datadog successfully correlate them in the backend." style="width:100%;" >}}