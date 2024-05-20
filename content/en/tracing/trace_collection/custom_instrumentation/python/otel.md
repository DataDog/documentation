---
title: Python Custom Instrumentation using OpenTelemetry API
kind: documentation
description: 'Instrument your Python application with OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 2
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/python/
