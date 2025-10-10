---
title: PHP Custom Instrumentation using the OpenTelemetry API
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support > PHP Custom Instrumentation using the OpenTelemetry API
sourceUrl: https://docs.datadoghq.com/opentelemetry/instrument/api_support/php/index.html
---

# PHP Custom Instrumentation using the OpenTelemetry API

{% alert level="info" %}
Unsure when to use OpenTelemetry with Datadog? Start with [Custom Instrumentation with the OpenTelemetry API](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/) to learn more.
{% /alert %}

## Overview{% #overview %}

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog [supported library instrumentation](https://docs.datadoghq.com/tracing/trace_collection/compatibility/).
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Setup{% #setup %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Install [OpenTelemetry API packages](https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup).

```php
composer require open-telemetry/sdk
```

Add your desired manual OpenTelemetry instrumentation to your PHP code following the [OpenTelemetry PHP Manual Instrumentation documentation](https://opentelemetry.io/docs/instrumentation/php/manual/).

Install the [Datadog PHP tracing library](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/php#getting-started).

Set `DD_TRACE_OTEL_ENABLED` to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Adding span tags{% #adding-span-tags %}

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

## Setting errors on a span{% #setting-errors-on-a-span %}

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

## Adding spans{% #adding-spans %}

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

## Adding span events{% #adding-span-events %}

{% alert level="info" %}
Adding span events requires SDK version 1.3.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [*required*]: A string representing the event's name.
- **Attributes** [*optional*]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [*optional*]: A UNIX timestamp representing the event's occurrence time. Expects `nanoseconds`.

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

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#add-events) specification for more information.

### Recording exceptions{% #recording-exceptions %}

To record exceptions, use the `recordException` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```php
$span->recordException(new \Exception("Error Message"));
$span->recordException(new \Exception("Error Message"), [ "status" => "failed" ]);
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception) specification for more information.

## Accessing active spans{% #accessing-active-spans %}

To access the currently active span:

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

## Further Reading{% #further-reading %}

- [Explore your services, resources, and traces](https://docs.datadoghq.com/tracing/glossary/)
- [Interoperability of OpenTelemetry API and Datadog instrumented traces](https://docs.datadoghq.com/opentelemetry/guide/otel_api_tracing_interoperability)
