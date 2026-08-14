<!--
This partial contains PHP traces content for the OTel API.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Setup {% #setup-otel-php %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Install [OpenTelemetry API packages][160]:
   ```php
   composer require open-telemetry/sdk
   ```

2. Add your desired manual OpenTelemetry instrumentation to your PHP code following the [OpenTelemetry PHP Manual Instrumentation documentation][161].

3. Install the [Datadog PHP tracing library][162].

4. Set `DD_TRACE_OTEL_ENABLED` to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Adding span tags {% #adding-span-tags-otel-php %}

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

## Setting errors on a span {% #setting-errors-on-a-span-otel-php %}

Exception information is captured and attached to a span if one is active when the exception is raised:

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

try {
    throw new \Exception('Oops!');
} catch (\Exception $e) {
    $rootSpan = Span::fromContext(Context::getRoot());
    $rootSpan->recordException($e);
}
```

## Adding spans {% #adding-spans-otel-php %}

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

## Adding span events {% #adding-span-events-otel-php %}

{% alert level="info" %}
Adding span events requires SDK version 1.3.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API:

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

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-otel-php %}

To record exceptions, use the `recordException` API:

```php
$span->recordException(new \Exception("Error Message"));
$span->recordException(new \Exception("Error Message"), [ "status" => "failed" ]);
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

## Accessing active spans {% #accessing-active-spans-otel-php %}

To access the currently active span:

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[160]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[161]: https://opentelemetry.io/docs/instrumentation/php/manual/
[162]: /tracing/trace_collection/dd_libraries/php#getting-started
