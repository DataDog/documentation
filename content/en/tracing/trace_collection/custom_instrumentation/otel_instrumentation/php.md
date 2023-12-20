---
title: Custom Instrumentation of PHP Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your PHP application with OpenTelemetry API to send traces to Datadog.'
code_lang: php
type: multi-code-lang
code_lang_weight: 50
aliases:
- /tracing/trace_collection/otel_instrumentation/php/
further_reading:
  - link: 'tracing/glossary/'
    tag: 'Documentation'
    text: 'Explore your services, resources, and traces'
  - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
    tag: 'Documentation'
    text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog PHP tracing library `dd-trace-php` version 0.94.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                                | Support notes                                           |
|----------------------------------------|---------------------------------------------------------|
| [OpenTelemetry Context propagation][1] | [W3C Trace Context and Datadog header formats][9] are enabled by default. |
| [Span limits][2]                       | Unsupported                                             |
| [Metrics API][7]                       | Unsupported                                             |
| Trace/span [ID generators][3]          | ID generation is performed by the tracing library, with support for [128-bit trace IDs][12].    |

## Configuring OpenTelemetry to use the Datadog tracing library

1. Add your desired manual OpenTelemetry instrumentation to your PHP code following the [OpenTelemetry PHP Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the [Datadog PHP tracing library][6].

3. Set `DD_TRACE_OTEL_ENABLED` to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/php/propagation/
[2]: https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-limits
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[4]: /tracing/trace_collection/trace_context_propagation/php/
[5]: https://opentelemetry.io/docs/instrumentation/php/manual/
[6]: /tracing/trace_collection/dd_libraries/php#getting-started
[7]: https://opentelemetry.io/docs/specs/otel/metrics/
[9]: /tracing/trace_collection/trace_context_propagation/php/
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/
