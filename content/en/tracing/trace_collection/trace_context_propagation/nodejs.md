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

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Configuration**: `tracePropagationStyle.inject`<br>
**Default**: `Datadog,tracecontext`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Configuration**: `tracePropagationStyle.extract`<br>
**Default**: `Datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.

`DD_TRACE_PROPAGATION_STYLE`
: **Configuration**: `tracePropagationStyle`<br>
**Default**: `Datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to inject and extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. The more specific `DD_TRACE_PROPAGATION_STYLE_INJECT` and `DD_TRACE_PROPAGATION_STYLE_EXTRACT` configurations take priority when present.

[5]: https://github.com/openzipkin/b3-propagation
[6]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
