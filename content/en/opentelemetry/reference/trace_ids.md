---
title: Trace IDs
disable_toc: false
aliases:
- /path-to-old-doc/
further_reading:
- link: "/opentelemetry/reference/trace_context_propagation"
  tag: "Documentation"
  text: "Trace Context Propagation"
---

W3C traces implicitly contain 128-bit trace IDs, rather than the 64-bit trace IDs that Datadog traces have historically used. The latest default configuration for Datadog tracing libraries uses the setting `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True` so that Datadog also produces trace data with 128-bit trace IDs. 

Following the [W3C Trace Context recommendations][1], Datadog 128-bit trace IDs have randomness in the lower-order 64 bits. This restriction provides backward compatibility for systems that intermix libraries that generate 64-bit trace IDs with newer ones that support 128-bit IDs. In such systems, spans with the full 128-bit trace ID and spans with the truncated lower-order 64-bit trace ID can arrive at the backend and be treated as matching and part of the same trace.

{{< img src="opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.png" alt="128-bit Trace IDs can be passed with trace context to code whose tracing library generates 64-bit trace IDs, and Datadog successfully correlate them in the backend." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.w3.org/TR/trace-context/#handling-trace-id-for-compliant-platforms-with-shorter-internal-identifiers