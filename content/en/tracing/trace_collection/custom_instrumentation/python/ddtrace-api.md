---
title: Python Custom Instrumentation using ddtrace-api-py (pre-release)
description: '(pre-release) Manually instrument your Python application to send custom traces to Datadog.'
code_lang: dd-api-alpha
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

<div class="alert alert-warning">The ddtrace-api Python package is in preview and may not include the API calls you need. If you'd rather use something more complete, use the [Datadog API (ddtrace)][9].</div>

If you have not read the setup instructions for automatic instrumentation, start with the [Python Setup Instructions][6]

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code. You may also want to gain finer control
over your application's instrumentation.

## Additional Setup

The stable public API for Datadog APM's custom Python instrumentation is implemented by the [ddtrace-api package][8]. This package doesn't implement any of the underlying functionality that creates and
sends spans to Datadog; it *only* implements the API interface. This separation between interface in `ddtrace-api` and implementation in `ddtrace` allows users of cusom instrumentation to rely on
an API that changes less frequently and more predictably, while allowing autoinstrumentation-only users to ignore API changes.

The separation of interface and implementation means that setting up custom instrumentation requires installing two libraries: `ddtrace` as explained in the [Python Setup Instructions][6] and `ddtrace-api`:

```python
pip install ddtrace ddtrace-api
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

## Creating spans

Basic visibility into your own code is achieved with spans.

Within your web request (for example, `make_sandwich_request`), you may perform several operations, like `get_ingredients()` and `assemble_sandwich()`, which are useful to measure.

```python
def make_sandwich_request(request):
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Decorator" %}}

`ddtrace-api` provides a decorator `tracer.wrap()` that can be used to decorate the functions of interest. This is useful if you would like to trace the function regardless of where it is being called from.


```python
  from dd_trace_api import tracer

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

To learn more, read [API details for the decorator for `dd_trace_api.Tracer.wrap()`][1].


[1]: https://github.com/DataDog/dd-trace-api-py/blob/fa22b35c8661615a23a11519b135e7ba82d0c8f9/dd_trace_api/written.py#L19
{{% /tab %}}
{{% tab "Context Manager" %}}

To trace an arbitrary block of code, use the `dd_trace_api.Span` context manager as below, or view the [advanced usage documentation][1].

```python
from dd_trace_api import tracer

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

To learn more, read the full [API details for `dd_trace_api.Tracer()`][2]

[1]: https://github.com/DataDog/dd-trace-api-py/blob/fa22b35c8661615a23a11519b135e7ba82d0c8f9/api.yaml#L90
[2]: https://github.com/DataDog/dd-trace-api-py/blob/fa22b35c8661615a23a11519b135e7ba82d0c8f9/api.yaml#L56
{{% /tab %}}
{{% tab "Manual" %}}

If the decorator and context manager methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish [spans][1] however you may require:

```python
from dd_trace_api import tracer

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create", resource="resource_name")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # remember to finish the span
```

For more API details of the decorator, read the [`dd_trace_api.Tracer.trace` documentation][2] or the [`dd_trace_api.Span.finish` documentation][3].



[1]: /tracing/glossary/#spans
[2]: https://github.com/DataDog/dd-trace-api-py/blob/fa22b35c8661615a23a11519b135e7ba82d0c8f9/api.yaml#L175
[3]: https://github.com/DataDog/dd-trace-api-py/blob/fa22b35c8661615a23a11519b135e7ba82d0c8f9/api.yaml#L47
{{% /tab %}}
{{< /tabs >}}


## Accessing active spans

The built-in instrumentation and your own custom instrumentation create spans around meaningful operations. You can access the active span in order to include meaningful data.

```python
from dd_trace_api import tracer

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.make") as my_span:
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Current span" %}}

```python
def get_ingredients():
    # Get the active span
    span = tracer.current_span()
    # this span is my_span from make_sandwich_request above
```

{{% /tab %}}

{{% tab "Root span" %}}

```python
def assemble_sandwich(ingredients):
    with tracer.trace("another.operation") as another_span:
        # Get the active root span
        span = tracer.current_root_span()
        # this span is my_span from make_sandwich_request above
```
{{% /tab %}}
{{< /tabs >}}


## Adding tags

{{< tabs >}}
{{% tab "Locally" %}}

Tags can be added to a span using the `set_tag` method on a span:

```python
from dd_trace_api import tracer

def make_sandwich_request(request):
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```
{{% /tab %}}
{{% tab "Globally" %}}

Tags can be globally set on the tracer. These tags are be applied to every span that is created.

```python
from dd_trace_api import tracer
from myapp import __version__

# This will be applied to every span
tracer.set_tags({"version": __version__, "<TAG_KEY_2>": "<TAG_VALUE_2>"})
```
{{% /tab %}}
{{% tab "Errors" %}}

Exception information is captured and attached to a span if there is one active when the exception is raised.

```python
from dd_trace_api import tracer

with tracer.trace("throws.an.error") as span:
    raise Exception("Oops!")

# `span` will be flagged as erroneous and have
# the stack trace and exception message attached as tags
```

Flagging a span as erroneous can also be done manually:

```python
from dd_trace_api import tracer

span = tracer.trace("operation")
span.error = 1
span.finish()
```

In the event you want to flag the local root span with the error raised:

```python
import os
from dd_trace_api import tracer

try:
    raise TypeError
except TypeError as e:
    root_span = tracer.current_root_span()
    (exc_type, exc_val, exc_tb) = sys.exc_info()
    # this sets the error type, marks the span as an error, and adds the traceback
    root_span.set_exc_info(exc_type, exc_val, exc_tb)
```
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: /tracing/trace_collection/trace_context_propagation/
[3]: /tracing/trace_collection/trace_context_propagation/#baggage
[4]: /tracing/security
[5]: /tracing/guide/ignoring_apm_resources/
[6]: /tracing/setup/python/
[7]: https://github.com/DataDog/trace-examples/tree/master/python/flask-baggage
[8]: https://pypi.org/project/ddtrace-api/
[9]: /tracing/custom_instrumentation/python
