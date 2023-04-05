---
title: Propagating Python Trace Context
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

The Datadog APM tracer supports extraction and injection of [B3][2] and [W3C][3] headers for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection and extraction styles. Supported styles are:
`tracecontext`, `Datadog`, `B3` and `B3 single header`.

- Configure injection styles using the `DD_PROPAGATION_STYLE_INJECT=tracecontext,B3` environment variable.
- Configure extraction styles using the `DD_PROPAGATION_STYLE_EXTRACT=tracecontext,B3` environment variable.
- Configure both injection and extraction styles using the `DD_TRACE_PROPAGATION_STYLE=tracecontext,B3` environment variable.

The values of these environment variables are comma-separated lists of
header styles enabled for injection or extraction. By default,
the `tracecontext,Datadog` styles are enabled.

To disable trace context propagation, set the value of the environment variables to `none`.
- Disable injection styles using the `DD_PROPAGATION_STYLE_INJECT=none` environment variable.
- Disable extraction styles using the `DD_PROPAGATION_STYLE_EXTRACT=none` environment variable.
- Disable all trace context propagation (both inject and extract) using the `DD_PROPAGATION_STYLE=none` environment variable.

If multiple environment variables are set, `DD_PROPAGATION_STYLE_INJECT` and `DD_PROPAGATION_STYLE_EXTRACT`
override any value provided in `DD_TRACE_PROPAGATION_STYLE`.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.

[2]: https://github.com/openzipkin/b3-propagation
[3]: https://github.com/w3c/trace-context
