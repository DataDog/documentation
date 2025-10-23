---
title: PHP Custom Instrumentation using the OpenTelemetry API
description: 'Instrument your PHP application with the OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
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
2. Add your desired manual OpenTelemetry instrumentation to your PHP code following the [OpenTelemetry PHP Manual Instrumentation documentation][5]. 

3. Install the [Datadog PHP tracing library][6].

4. Set `DD_TRACE_OTEL_ENABLED` to `true`.

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

## Adding span events

<div class="alert alert-info">Adding span events requires SDK version 1.3.0 or higher.</div>

You can add span events using the `addEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [_required_]: A string representing the event's name.
- **Attributes** [_optional_]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [_optional_]: A UNIX timestamp representing the event's occurrence time. Expects `nanoseconds`.

The following examples demonstrate different ways to add events to a span:

```php
$span->addEvent("Event With No Attributes");
$span->addEvent(
    "Event With Some Attributes", 
    [ 
        'int_val' => 1, 
        'string_val' => "two", 
        'int_array' => [3, 4], 
        'string_array' => ["5", "6"],
        'bool_array' => [true, false]
    ]
);
```

Read the [OpenTelemetry][14] specification for more information.

### Recording exceptions

To record exceptions, use the `recordException` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```php
$span->recordException(new \Exception("Error Message"));
$span->recordException(new \Exception("Error Message"), [ "status" => "failed" ]);
```

Read the [OpenTelemetry][15] specification for more information.

## Accessing active spans

To access the currently active span:

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/php/manual/
[6]: /tracing/trace_collection/dd_libraries/php#getting-started
[13]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[15]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
