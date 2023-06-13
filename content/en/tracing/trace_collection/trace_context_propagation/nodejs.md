---
title: Propagating Node.js Trace Context
kind: documentation
code_lang: nodejs
code_lang_weight: 40
type: multi-code-lang
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OTel-instrumented apps with support for W3C Trace Context'
---

The Datadog APM Tracer supports [B3][5] and [W3C (TraceParent)][6] header extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The Node.js Tracer supports the following styles:

- Datadog: `Datadog`
- B3 Multi Header: `b3multi` (`B3` is deprecated)
- W3C Trace Context: `tracecontext`
- B3 Single Header: `B3 single header`

For more information about the context propagation settings, read [Node.js Tracing Library Configuration][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/library_config/nodejs/#headers-extraction-and-injection
[5]: https://github.com/openzipkin/b3-propagation
[6]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
