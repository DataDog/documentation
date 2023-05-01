---
title: Propagating Java Trace Context
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
---


The Datadog APM Tracer supports [B3][13] and [W3C (Trace Context)][14] header extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The Java Tracer supports the following styles:

- Datadog: `datadog`
- B3 Multi Header: `b3multi` (`b3` alias is deprecated)
- W3C Trace Context: `tracecontext` (Available since 1.11.0)
- B3 Single Header: `b3 single header` (`b3single`)

Injection styles can be configured using:

- System Property: `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3multi`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- System Property: `-Ddd.trace.propagation.style.extract=datadog,b3multi`
- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3multi`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled, the extraction attempt is done on the order those styles are configured and first successful extracted value is used.

For reference details about the context propagation settings and other configuration, read [Java Tracing Library Configuration][1].

[1]: /tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format