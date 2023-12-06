---
title: Propagating Java Trace Context
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---


The Datadog APM Tracer supports [B3][13] and [W3C Trace Context][14] header extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The Java Tracer supports the following styles:

- Datadog: `datadog`
- B3 Multi Header: `b3multi` (`b3` alias is deprecated)
- W3C Trace Context: `tracecontext` (Available since 1.11.0)
- B3 Single Header: `b3 single header` (`b3single`)

Injection styles can be configured using:

- System Property: `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3multi`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for injection. The default setting is `datadog,tracecontext` injection styles.

Extraction styles can be configured using:

- System Property: `-Ddd.trace.propagation.style.extract=datadog,b3multi`
- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3multi`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for extraction. By default, the `datadog` and `tracecontext` extraction styles are enabled using the `datadog,tracecontext` setting, meaning the `datadog` style has higher priority than the `tracecontext` style.

When multiple extraction styles are enabled, the extraction attempt is done on the order those styles are configured, using the first successful extracted value. If later valid trace contexts are found, they are terminated and appended as span links. Moreover, if the `tracecontext` style is enabled, W3C Tracestate is propagated if W3C Traceparent matches the extracted context.

For reference details about the context propagation settings and other configuration, read [Java Tracing Library Configuration][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
