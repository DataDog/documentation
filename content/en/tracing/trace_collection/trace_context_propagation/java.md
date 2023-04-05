---
title: Propagating Java Trace Context
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---


The Datadog APM Tracer supports [B3][13] and [W3C (TraceParent)][14] header extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The Java Tracer supports the following styles:

- Datadog: `datadog`
- B3 Multi Header: `b3multi` (`b3` alias is deprecated)
- W3C Trace Context: `tracecontext` (Available since 1.11.0)
- B3 Single Header: `b3 single header`

Injection styles can be configured using:

- System Property: `-Ddd.propagation.style.inject=Datadog,b3multi`
- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,b3multi`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- System Property: `-Ddd.propagation.style.extract=Datadog,b3mult`
- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,b3multi`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

For more information about the context propagation settings and other configuration, read [Java Tracing Library Configuration][1].

[1]: /tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format