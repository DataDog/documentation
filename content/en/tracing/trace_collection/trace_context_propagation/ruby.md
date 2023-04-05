---
title: Propagating Ruby Trace Context
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

### B3 headers extraction and injection

Datadog APM tracer supports [B3][6] and [W3C (TraceParent)][7] header extraction and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection and extraction styles. The following styles are supported:

- `Datadog`: the default
- `b3multi`: B3 multiple-headers
- `b3`: B3 single-header
- `tracecontext`: W3C Trace Context
- `none`: No-op.

Injection styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,b3`

The value of the environment variable is a comma separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,b3`

The value of the environment variable is a comma separated list of header styles that are enabled for extraction. 

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

You can also enable or disable the use of these formats in code by using `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'Datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'Datadog' ]
end
```

For more information about trace context propagation configuration, read [the Distributed Tracing section][1] in the Ruby Tracing Library Configuration docs.

[1]: /tracing/trace_collection/dd_libraries/ruby/#distributed-tracing
[6]: https://github.com/openzipkin/b3-propagation
