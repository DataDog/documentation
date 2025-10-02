---
title: Trace IDs
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Reference > Trace IDs
sourceUrl: https://docs.datadoghq.com/opentelemetry/reference/trace_ids/index.html
---

# Trace IDs

W3C traces implicitly contain 128-bit trace IDs, rather than the 64-bit trace IDs that Datadog traces have historically used. The latest default configuration for Datadog tracing libraries uses the setting `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True` so that Datadog also produces trace data with 128-bit trace IDs.

Following the [W3C Trace Context recommendations](https://www.w3.org/TR/trace-context/#handling-trace-id-for-compliant-platforms-with-shorter-internal-identifiers), Datadog 128-bit trace IDs have randomness in the lower-order 64 bits. This restriction provides backward compatibility for systems that intermix libraries that generate 64-bit trace IDs with newer ones that support 128-bit IDs. In such systems, spans with the full 128-bit trace ID and spans with the truncated lower-order 64-bit trace ID can arrive at the backend and be treated as matching and part of the same trace.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.1a290a3a113157c46cb1900e684fab65.png?auto=format"
   alt="128-bit Trace IDs can be passed with trace context to code whose tracing library generates 64-bit trace IDs, and Datadog successfully correlate them in the backend." /%}

## Further reading{% #further-reading %}

- [Trace Context Propagation](https://docs.datadoghq.com/opentelemetry/reference/trace_context_propagation)
