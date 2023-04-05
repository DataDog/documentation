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

`dd.trace.propagation.style.inject`
: **Environment Variable**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**Default**: `datadog`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.<br>
Available since version 1.9.0

`dd.trace.propagation.style.extract`
: **Environment Variable**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**Default**: `datadog`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.<br>
Available since version 1.9.0

`dd.trace.propagation.style`
: **Environment Variable**: `DD_TRACE_PROPAGATION_STYLE`<br>
**Default**: `datadog`<br>
A comma-separated list of header formats from which to attempt to inject and extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. The more specific `dd.trace.propagation.style.inject` and `dd.trace.propagation.style.extract` configuration settings take priority when present.<br>
Available since version 1.9.0

#### Deprecated extraction and injection settings

These extraction and and injection settings are deprecated since version 1.9.0.

- B3: `b3` (both B3 multi header and B3 single header)

`dd.propagation.style.inject`
: **Environment Variable**: `DD_PROPAGATION_STYLE_INJECT`<br>
**Default**: `datadog`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.<br>
Deprecated since version 1.9.0

`dd.propagation.style.extract`
: **Environment Variable**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**Default**: `datadog`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.<br>
Deprecated since version 1.9.0


[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
