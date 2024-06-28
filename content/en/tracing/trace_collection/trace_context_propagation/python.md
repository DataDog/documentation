---
title: Propagating Python Trace Context
kind: documentation
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

The Datadog APM tracer supports extraction and injection of [B3][2] and [W3C Trace Context][3] headers for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection and extraction styles. Supported styles are:
`tracecontext`, `datadog`, `b3multi` and `b3 single header`.

- Configure injection styles using the `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext,b3multi` environment variable.
- Configure extraction styles using the `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext,b3multi` environment variable.
- Configure both injection and extraction styles using the `DD_TRACE_PROPAGATION_STYLE=tracecontext,b3multi` environment variable.

The values of these environment variables are comma-separated lists of
header styles enabled for injection or extraction. By default,
the `datadog,tracecontext` styles are enabled.

To disable trace context propagation, set the value of the environment variables to `none`.
- Disable injection styles using the `DD_TRACE_PROPAGATION_STYLE_INJECT=none` environment variable.
- Disable extraction styles using the `DD_TRACE_PROPAGATION_STYLE_EXTRACT=none` environment variable.
- Disable all trace context propagation (both inject and extract) using the `DD_TRACE_PROPAGATION_STYLE=none` environment variable.

If multiple environment variables are set, `DD_TRACE_PROPAGATION_STYLE_INJECT` and `DD_TRACE_PROPAGATION_STYLE_EXTRACT`
override any value provided in `DD_TRACE_PROPAGATION_STYLE`.

When multiple extraction styles are enabled, the extraction attempt is done in the order those styles are configured
using the first successful extracted value. If valid trace contexts are found later, they are terminated and appended
as span links. Additionally, if the `tracecontext` style is enabled, W3C Tracestate is propagated if W3C Traceparent matches
the extracted context.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/openzipkin/b3-propagation
[3]: https://github.com/w3c/trace-context
