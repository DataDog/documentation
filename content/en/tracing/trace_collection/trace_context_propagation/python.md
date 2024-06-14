---
title: Propagating Python Trace Context
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

For a high-level overview of trace context propagation and the supported propagators, see [Trace Context Propagation][1].

Trace context propagation has two operations:
- _Extraction_ of an upstream trace context into the current trace
- _Injection_ of the current trace into a downstream trace context

By default, the Python tracing library _extracts_ both the Datadog and the W3C Trace Context formats (preferring Datadog if both are valid) and _injects_ both the Datadog and W3C Trace Context formats.

## Configuration
If you need to customize the trace context propagation configuration, there are several environment variables you can use.

**Note:** When multiple extraction styles are enabled, the extraction attempt is done in the order those styles are configured using the first successful extracted value. If valid trace contexts are found later, they are terminated and appended as span links. Additionally, if the `tracecontext` style is enabled, W3C Tracestate is propagated if W3C Traceparent matches the extracted context.

### Supported propagators

| Propagator        | Configuration Value |
|-------------------|---------------------|
| Datadog           | `datadog`           |
| W3C Trace Context | `tracecontext`      |
| B3 Single         | `b3`                |
| B3 Multi          | `b3multi`           |
| None              | `none`              |

### DD_TRACE_PROPAGATION_STYLE_EXTRACT
Specifies propagators (in a comma-separated list) to use for trace context extraction, taking the highest precedence over all other configurations for configuring the extraction propagators.

### DD_TRACE_PROPAGATION_STYLE_INJECT
Specifies propagators (in a comma-separated list) to use for trace context injection, taking the highest precedence over all other configurations for configuring the injection propagators.

### DD_TRACE_PROPAGATION_STYLE
Specifies propagators (in a comma-separated list) to use for both trace context extraction and injection. This may be overridden by the above configurations.

**Default value:** `datadog,tracecontext`

### OTEL_PROPAGATORS
Specifies propagators (in a comma-separated list) to use for both trace context extraction and injection. This configuration takes the lowest precedence.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/trace_context_propagation