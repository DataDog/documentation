---
aliases:
- /ja/tracing/setup_overview/open_standards/ruby
- /ja/tracing/trace_collection/open_standards/ruby
- /ja/tracing/trace_collection/opentracing/ruby
code_lang: ruby
code_lang_weight: 20
description: OpenTracing instrumentation for Ruby
kind: documentation
title: Ruby OpenTracing Instrumentation
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing support is based on a deprecated specification. If you want to instrument your code with an open spec, use OpenTelemetry instead. Try the beta support for <a href="/tracing/trace_collection/otel_instrumentation/ruby/">processing data from OpenTelemetry instrumentation in Datadog Tracing Libraries</a>.</div>

To set up Datadog with OpenTracing, see the Ruby [Quickstart for OpenTracing][1] for details.

## Configuring Datadog tracer settings

The underlying Datadog tracer can be configured by passing options (which match `Datadog::Tracer`) when configuring the global tracer:

```ruby
# Where `options` is a Hash of options provided to Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

It can also be configured by using `Datadog.configure` as described in the [Ruby tracer settings][2] section.

## Activating and configuring integrations

By default, configuring OpenTracing with Datadog does not automatically activate any additional instrumentation provided by Datadog. You will only receive [spans][3] and [traces][4] from OpenTracing instrumentation you have in your application.

However, additional instrumentation provided by Datadog can be activated alongside OpenTracing using `Datadog.configure`, which can be used to enhance your tracing further. To enable this, see [Ruby integration instrumentation][5] for more details.

## Supported serialization formats

| Type                           | Supported? | Additional information                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Yes        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Yes        | Because of the loss of resolution in the Rack format, note that baggage items with names containing either upper case characters or `-` are be converted to lower case and `_` in a round-trip, respectively. Datadog recommends avoiding these characters or accommodating accordingly on the receiving end. |
| `OpenTracing::FORMAT_BINARY`   | No         |                                                                                                                                                                                                                                                                                                               |


[1]: /ja/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /ja/tracing/setup/ruby/#tracer-settings
[3]: /ja/tracing/glossary/#spans
[4]: /ja/tracing/glossary/#trace
[5]: /ja/tracing/setup/ruby/#integration-instrumentation