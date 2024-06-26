---
title: Propagating Ruby Trace Context
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

<div class="alert alert-info">This documentation is for <code>datadog</code> gem v2.x. If you are looking for <code>ddtrace</code> gem v1.x documentation, see the legacy <a href="/tracing/trace_collection/trace_context_propagation/ruby_v1">Propagating Ruby Trace Context
</a> documentation.</div>

### Headers extraction and injection

Datadog APM tracer supports [B3][6] and [W3C Trace Context][7] header extraction and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection and extraction styles. The following styles are supported:

- Datadog: `datadog`
- B3 Multi Header: `b3multi`
- B3 Single Header: `b3`
- W3C Trace Context: `tracecontext`
- No-op: `none`

Injection styles can be configured using:

- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3`

The value of the environment variable is a comma-separated list of header styles that are enabled for injection. The default setting is `datadog,tracecontext`.

Extraction styles can be configured using:

- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3`

The value of the environment variable is a comma-separated list of header styles that are enabled for extraction. The default setting is `datadog,tracecontext`.

The default extraction styles are, in order, `datadog` and `tracecontext`.

You can also enable or disable the use of these formats in code by using `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

For more information about trace context propagation configuration, read [the Distributed Tracing section][1] in the Ruby Tracing Library Configuration docs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/ruby/#distributed-tracing
[6]: https://github.com/openzipkin/b3-propagation
[7]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
