---
title: Custom Instrumentation of PHP Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your PHP application with OpenTelemetry API to send traces to Datadog.'
code_lang: php
type: multi-code-lang
code_lang_weight: 0
further_reading:
  - link: 'tracing/glossary/'
    tag: 'Documentation'
    text: 'Explore your services, resources, and traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog PHP tracing library `dd-trace-php` version 0.94.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                                | Support notes                                           |
|----------------------------------------|---------------------------------------------------------|
| [OpenTelemetry Context propagation][1] | [Datadog distributed header format][5] is used instead. |
| [Span processors][2]                   | Partially supported                                     |
| [Span Exporters][3]                    | Partially supported                                     |
| Trace/span [ID generators][4]          | ID generation is performed by `ddtrace`.                |

## Configuring OpenTelemetry to use the Datadog tracing library

1.
1. Add your desired manual OpenTelemetry instrumentation to your PHP code following the [OpenTelemetry PHP Manual Instrumentation documentation][6].
2. Install the [Datadog PHP tracing library][7].
3. Set `DD_TRACE_OTEL_ENABLED` to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/php/propagation/
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: /tracing/trace_collection/trace_context_propagation/php/
[6]: https://opentelemetry.io/docs/instrumentation/php/manual/
[7]: /tracing/trace_collection/dd_libraries/php#getting-started

