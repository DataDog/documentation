---
title: Ruby Open Standards
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/ruby
description: 'Open Standards for Ruby'
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
---

## OpenTracing

To set up Datadog with OpenTracing, see the Ruby [Quickstart for OpenTracing][1] for details.

### Configuring Datadog tracer settings

The underlying Datadog tracer can be configured by passing options (which match `Datadog::Tracer`) when configuring the global tracer:

```ruby
# Where `options` is a Hash of options provided to Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

It can also be configured by using `Datadog.configure` as described in the [Ruby tracer settings][2] section.

### Activating and configuring integrations

By default, configuring OpenTracing with Datadog does not automatically activate any additional instrumentation provided by Datadog. You will only receive [spans][3] and [traces][4] from OpenTracing instrumentation you have in your application.

However, additional instrumentation provided by Datadog can be activated alongside OpenTracing using `Datadog.configure`, which can be used to enhance your tracing further. To enable this, see [Ruby integration instrumentation][5] for more details.

### Supported serialization formats

| Type                           | Supported? | Additional information                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Yes        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Yes        | Because of the loss of resolution in the Rack format, note that baggage items with names containing either upper case characters or `-` are be converted to lower case and `_` in a round-trip, respectively. Datadog recommends avoiding these characters or accommodating accordingly on the receiving end. |
| `OpenTracing::FORMAT_BINARY`   | No         |                                                                                                                                                                                                                                                                                                               |


[1]: /tracing/setup/ruby/#quickstart-for-opentracing
[2]: /tracing/setup/ruby/#tracer-settings
[3]: /tracing/glossary/#spans
[4]: /tracing/glossary/#trace
[5]: /tracing/setup/ruby/#integration-instrumentation
