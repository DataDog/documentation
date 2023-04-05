---
title: Propagating Node.js Trace Context
kind: documentation
code_lang: nodejs
code_lang_weight: 40
type: multi-code-lang
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

The Datadog APM Tracer supports [B3][5] and [W3C (TraceParent)][6] header extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The Node.js Tracer supports the following styles:

- Datadog: `Datadog`
- B3 Multi Header: `b3multi` (`B3` is deprecated)
- W3C Trace Context: `tracecontext`
- B3 Single Header: `B3 single header`

For more information about the context propagation settings and other configuration, read [Node.js Tracing Library Configuration][1].

[1]: /tracing/trace_collection/library_config/nodejs/#headers-extraction-and-injection
[5]: https://github.com/openzipkin/b3-propagation
[6]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
