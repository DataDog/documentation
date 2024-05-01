---
title: PHP Custom Instrumentation using OpenTelemetry API
kind: documentation
description: 'Instrument your PHP application with OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 2
aliases:
- /tracing/trace_collection/otel_instrumentation/php/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
further_reading:
  - link: 'tracing/glossary/'
    tag: 'Documentation'
    text: 'Explore your services, resources, and traces'
  - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
    tag: 'Documentation'
    text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{% otel-custom-instrumentation-lang %}}

## Setup

To configure OpenTelemetry to use the Datadog trace provider:

1. Install [OpenTelemetry API packages][13].
  ```php
  composer require open-telemetry/sdk
  ```
1. Add your desired manual OpenTelemetry instrumentation to your PHP code following the [OpenTelemetry PHP Manual Instrumentation documentation][5]. 

2. Install the [Datadog PHP tracing library][6].

3. Set `DD_TRACE_OTEL_ENABLED` to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Adding span tags

You can add attributes at the exact moment as you are starting the span:

```php
$span = $tracer->spanBuilder('mySpan')
    ->setAttribute('key', 'value')
    ->startSpan();
```

Or while the span is active:

```php
$activeSpan = OpenTelemetry\API\Trace\Span::getCurrent();

$activeSpan->setAttribute('key', 'value');
```


## Setting errors on a span

Exception information is captured and attached to a span if one is active when the exception is raised.

```php
// Create a span
$span = $tracer->spanBuilder('mySpan')->startSpan();

throw new \Exception('Oops!');

// 'mySpan' will be flagged as erroneous and have 
// the stack trace and exception message attached as tags
```

Flagging a trace as erroneous can also be done manually:

```php
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\Context\Context;

// Can only be done after the setup steps, such as initializing the tracer.

try {
    throw new \Exception('Oops!');
} catch (\Exception $e) {
    $rootSpan = Span::fromContext(Context::getRoot());
    $rootSpan->recordException($e);
}
```
## Adding spans

To add a span:

```php
// Get a tracer or use an existing one
$tracerProvider = \OpenTelemetry\API\Globals::tracerProvider();
$tracer = $tracerProvider->getTracer('datadog')

// Create a span
$span = $tracer->spanBuilder('mySpan')->startSpan();

// ... do stuff

// Close the span
$span->end();

```

## Accessing active spans

To access the currently active span:

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

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
[13]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
