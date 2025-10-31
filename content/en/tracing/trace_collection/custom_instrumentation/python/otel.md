---
title: Python Custom Instrumentation using the OpenTelemetry API
description: 'Instrument your Python application with the OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
- /tracing/trace_collection/otel_instrumentation/python/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
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

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Python Setup Instructions][1].

1. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

### Creating custom spans

To create custom spans within an existing trace context:

{{< highlight python "hl_lines=6" >}}
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def do_work():
    with tracer.start_as_current_span("operation_name") as span:
        # Perform the work that you want to track with the span
        print("Doing work...")
        # When the 'with' block ends, the span is automatically closed
{{< /highlight >}}

## Accessing active spans

To access the currently active span, use the `get_current_span()` function:

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# enrich 'current_span' with information
```

## Adding span tags

Add attributes to a span to provide additional context or metadata.

Here's an example of how to add attributes to the current span:

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## Adding span events

<div class="alert alert-info">Adding span events requires SDK version 2.9.0 or higher.</div>

You can add span events using the `add_event` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [_required_]: A string representing the event's name.
- **Attributes** [_optional_]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [_optional_]: A UNIX timestamp representing the event's occurrence time. Expects `microseconds`.

The following examples demonstrate different ways to add events to a span:

```python
span.add_event("Event With No Attributes")
span.add_event("Event With Some Attributes", {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [True, False]})
```

Read the [OpenTelemetry][2] specification for more information.

### Recording exceptions

To record exceptions, use the `record_exception` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```python
span.record_exception(Exception("Error Message"))
span.record_exception(Exception("Error Message"), {"status": "failed"})
```

Read the [OpenTelemetry][3] specification for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/python/
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[3]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
