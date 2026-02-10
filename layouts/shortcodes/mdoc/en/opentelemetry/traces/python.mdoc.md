<!--
This partial contains Python traces content for the OTel API.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Setup {% #setup-otel-python %}

To configure OpenTelemetry to use the Datadog trace provider:

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Python Setup Instructions][110].

2. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

### Creating custom spans {% #creating-custom-spans-otel-python %}

To create custom spans within an existing trace context:

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def do_work():
    with tracer.start_as_current_span("operation_name") as span:
        # Perform the work that you want to track with the span
        print("Doing work...")
        # When the 'with' block ends, the span is automatically closed
```

## Accessing active spans {% #accessing-active-spans-otel-python %}

To access the currently active span, use the `get_current_span()` function:

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# enrich 'current_span' with information
```

## Adding span tags {% #adding-span-tags-otel-python %}

Add attributes to a span to provide additional context or metadata:

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## Adding span events {% #adding-span-events-otel-python %}

{% alert level="info" %}
Adding span events requires SDK version 2.9.0 or higher.
{% /alert %}

You can add span events using the `add_event` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters.

```python
span.add_event("Event With No Attributes")
span.add_event("Event With Some Attributes", {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [True, False]})
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-otel-python %}

To record exceptions, use the `record_exception` API:

```python
span.record_exception(Exception("Error Message"))
span.record_exception(Exception("Error Message"), {"status": "failed"})
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[110]: /tracing/setup/python/
