---
title: Python Custom Instrumentation using the OpenTelemetry API
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support > Python Custom Instrumentation using the OpenTelemetry API
---

# Python Custom Instrumentation using the OpenTelemetry API

{% alert level="info" %}
Unsure when to use OpenTelemetry with Datadog? Start with [Custom Instrumentation with the OpenTelemetry API](http://localhost:1313/tracing/trace_collection/custom_instrumentation/otel_instrumentation/) to learn more.
{% /alert %}

## Overview{% #overview %}

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog [supported library instrumentation](http://localhost:1313/tracing/trace_collection/compatibility/).
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Setup{% #setup %}

To configure OpenTelemetry to use the Datadog trace provider:

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Python Setup Instructions](http://localhost:1313/tracing/setup/python/).

1. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

### Creating custom spans{% #creating-custom-spans %}

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

## Accessing active spans{% #accessing-active-spans %}

To access the currently active span, use the `get_current_span()` function:

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# enrich 'current_span' with information
```

## Adding span tags{% #adding-span-tags %}

Add attributes to a span to provide additional context or metadata.

Here's an example of how to add attributes to the current span:

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## Adding span events{% #adding-span-events %}

{% alert level="info" %}
Adding span events requires SDK version 2.9.0 or higher.
{% /alert %}

You can add span events using the `add_event` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [*required*]: A string representing the event's name.
- **Attributes** [*optional*]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [*optional*]: A UNIX timestamp representing the event's occurrence time. Expects `microseconds`.

The following examples demonstrate different ways to add events to a span:

```python
span.add_event("Event With No Attributes")
span.add_event("Event With Some Attributes", {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [True, False]})
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#add-events) specification for more information.

### Recording exceptions{% #recording-exceptions %}

To record exceptions, use the `record_exception` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```python
span.record_exception(Exception("Error Message"))
span.record_exception(Exception("Error Message"), {"status": "failed"})
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception) specification for more information.

## Further reading{% #further-reading %}

- [Explore your services, resources, and traces](http://localhost:1313/tracing/glossary/)
- [Interoperability of OpenTelemetry API and Datadog instrumented traces](http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability)
