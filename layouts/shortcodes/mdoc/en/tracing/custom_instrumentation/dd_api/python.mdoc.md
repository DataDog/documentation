<!--
This partial contains Python custom instrumentation content for the Datadog API.
-->

If you have not read the setup instructions for automatic instrumentation, start with the [Python Setup Instructions][6].

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `ddtrace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

## Creating spans

The `ddtrace` library creates spans automatically with `ddtrace-run` for [many libraries and frameworks][1]. However, you may want to gain visibility into your own code and this is achieved by using spans.

Within your web request (for example, `make_sandwich_request`), you may perform several operations, like `get_ingredients()` and `assemble_sandwich()`, which are useful to measure.

```python
def make_sandwich_request(request):
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
```

### Using decorators

`ddtrace` provides a decorator `tracer.wrap()` that can be used to decorate the functions of interest. This is useful if you would like to trace the function regardless of where it is being called from.

```python
from ddtrace import tracer

@tracer.wrap(service="my-sandwich-making-svc", resource="resource_name")
def get_ingredients():
    # go to the pantry
    # go to the fridge
    # maybe go to the store
    return

# You can provide more information to customize the span
@tracer.wrap("assemble_sandwich", service="my-sandwich-making-svc", resource="resource_name")
def assemble_sandwich(ingredients):
    return
```

To learn more, read [API details for the decorator for `ddtrace.Tracer.wrap()`][decorator_api].

### Using context managers

To trace an arbitrary block of code, use the `ddtrace.Span` context manager as below, or view the [advanced usage documentation][context_api].

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.make"):
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.create", resource="resource_name") as outer_span:

        with tracer.trace("get_ingredients", resource="resource_name") as span:
            ingredients = get_ingredients()

        with tracer.trace("assemble_sandwich", resource="resource_name") as span:
            sandwich = assemble_sandwich(ingredients)
```

To learn more, read the full [API details for `ddtrace.Tracer()`][tracer_api].

### Manual span creation

If the decorator and context manager methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish [spans][spans] however you may require:

```python
def make_sandwich_request(request):
    span = tracer.trace("sandwich.create", resource="resource_name")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # remember to finish the span
```

For more API details of the decorator, read the [`ddtrace.Tracer.trace` documentation][trace_api] or the [`ddtrace.Span.finish` documentation][finish_api].

## Accessing active spans

The built-in instrumentation and your own custom instrumentation create spans around meaningful operations. You can access the active span in order to include meaningful data.

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.make") as my_span:
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)
```

### Current span

```python
def get_ingredients():
    # Get the active span
    span = tracer.current_span()
    # this span is my_span from make_sandwich_request above
```

### Root span

```python
def assemble_sandwich(ingredients):
    with tracer.trace("another.operation") as another_span:
        # Get the active root span
        span = tracer.current_root_span()
        # this span is my_span from make_sandwich_request above
```

## Adding tags

### Adding tags locally

Tags can be added to a span using the `set_tag` method on a span:

```python
from ddtrace import tracer

def make_sandwich_request(request):
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```

### Adding tags globally

Tags can be globally set on the tracer. These tags are be applied to every span that is created.

```python
from ddtrace import tracer
from myapp import __version__

# This will be applied to every span
tracer.set_tags({"version": __version__, "<TAG_KEY_2>": "<TAG_VALUE_2>"})
```

### Setting errors on a span

Exception information is captured and attached to a span if there is one active when the exception is raised.

```python
from ddtrace import tracer

with tracer.trace("throws.an.error") as span:
    raise Exception("Oops!")

# `span` will be flagged as erroneous and have
# the stack trace and exception message attached as tags
```

Flagging a span as erroneous can also be done manually:

```python
from ddtrace import tracer

span = tracer.trace("operation")
span.error = 1
span.finish()
```

In the event you want to flag the local root span with the error raised:

```python
import os
from ddtrace import tracer

try:
    raise TypeError
except TypeError as e:
    root_span = tracer.current_root_span()
    (exc_type, exc_val, exc_tb) = sys.exc_info()
    # this sets the error type, marks the span as an error, and adds the traceback
    root_span.set_exc_info(exc_type, exc_val, exc_tb)
```

## Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][2] for information.

### Baggage

Manipulating [Baggage][3] on a span:

```python
from ddtrace import tracer

# Start a new span and set baggage
with tracer.trace("example") as span:
    # set_baggage_item
    span.context.set_baggage_item("key1", "value1")
    span.context.set_baggage_item("key2", "value2")

    # get_all_baggage_items
    all_baggage = span.context.get_all_baggage_items()
    print(all_baggage) # {'key1': 'value1', 'key2': 'value2'}

    # remove_baggage_item
    span.context.remove_baggage_item("key1")
    print(span.context.get_all_baggage_items()) # {'key2': 'value2'}

    # get_baggage_item
    print(span.context.get_baggage_item("key1")) # None
    print(span.context.get_baggage_item("key2")) # value2

    # remove_all_baggage_items
    span.context.remove_all_baggage_items()
    print(span.context.get_all_baggage_items()) # {}
```

To see an example in action, see [flask-baggage on trace-examples][7].

## ddtrace-api

{% alert level="info" %}
The `ddtrace-api` Python package is in Preview and may not include all the API calls you need. If you need more complete functionality, use the API as described in the previous sections.
{% /alert %}

The [ddtrace-api package][8] provides a stable public API for Datadog APM's custom Python instrumentation. This package implements only the API interface, not the underlying functionality that creates and sends spans to Datadog.

This separation between interface (`ddtrace-api`) and implementation (`ddtrace`) offers several benefits:

- You can rely on an API that changes less frequently and more predictably for your custom instrumentation
- If you only use automatic instrumentation, you can ignore API changes entirely
- If you implement both single-step and custom instrumentation, you avoid depending on multiple copies of the `ddtrace` package

To use `ddtrace-api`:

1. Install both the `ddtrace` and `ddtrace-api` libraries:
   ```python
   pip install 'ddtrace>=3.1' ddtrace-api
   ```

2. Instrument your Python application using `ddtrace-run` by prefixing your Python entry-point command:
   ```shell
   ddtrace-run python app.py
   ```

3. After this is set up, you can write custom instrumentation exactly like the examples in the previous sections, but you import from `ddtrace_api` instead of `ddtrace`.

   For example:
   ```python
   from ddtrace_api import tracer

   @tracer.wrap(service="my-sandwich-making-svc", resource="resource_name")
   def get_ingredients():
       # go to the pantry
       # go to the fridge
       # maybe go to the store
       return
   ```

See that package's [API definition][9] for the full list of supported API calls.

[1]: /tracing/compatibility_requirements/python
[2]: /tracing/trace_collection/trace_context_propagation/
[3]: /tracing/trace_collection/trace_context_propagation/#baggage
[4]: /tracing/security
[5]: /tracing/guide/ignoring_apm_resources/
[6]: /tracing/setup/python/
[7]: https://github.com/DataDog/trace-examples/tree/master/python/flask-baggage
[8]: https://pypi.org/project/ddtrace-api/
[9]: https://datadoghq.dev/dd-trace-api-py/pdocs/ddtrace_api.html
[spans]: /tracing/glossary/#spans
[decorator_api]: https://ddtrace.readthedocs.io/en/stable/api.html#ddtrace.Tracer.wrap
[context_api]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[tracer_api]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
[trace_api]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace
[finish_api]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish
