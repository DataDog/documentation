---
title: Python Manual Instrumentation
kind: documentation
decription: 'Manually instrument your Python application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `ddtrace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

## Creating spans

The `ddtrace` library will create spans automatically with `ddtrace-run` for [many libraries and frameworks][1]. However, you may want to gain visibility into your own code and this is achieved using spans.

For instance, within your make sandwich web request you may perform several operations, `get_ingredients()` and `assemble_sandwich()`  which would be useful to measure.

```python
def make_sandwich_request(request):
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Decorator" %}}

`ddtrace` provides a decorator `tracer.wrap()` that can be used to decorate the functions of interest. This is useful if you would like to trace the function regardless of where it is being called from.


```python
  from ddtrace import tracer

  @tracer.wrap()
  def get_ingredients():
      # go to the pantry
      # go to the fridge
      # maybe go to the store
      return

  # You can provide more information to customize the span
  @tracer.wrap("assemble_sandwich", service="my-sandwich-making-svc")
  def assemble_sandwich(ingredients):
      return
```

API details for the decorator can be found at [`ddtrace.Tracer.wrap()`][1]


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Context Manager" %}}

To trace an arbitrary block of code, you can use the [`ddtrace.Span`][1] context manager:

```python
from ddtrace import tracer

def assemble_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.make"):
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)

def assemble_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.create") as outer_span:
        with tracer.trace("get_ingredients") as span:
            ingredients = get_ingredients()

        with tracer.trace("assemble_sandwich") as span:
            sandwich = assemble_sandwich(ingredients)
```

Full API details can be found at [`ddtrace.Tracer()`][2]


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
{{% /tab %}}
{{% tab "Manual" %}}

If the decorator and context manager methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish [spans][1] however you may require:

```python

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # remember to finish the span
```

API details of the decorator can be found here:

- [`ddtrace.Tracer.trace`][2]
- [`ddtrace.Span.finish`][3]


[1]: /tracing/visualization/#spans
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{< /tabs >}}


## Accessing active spans

The built-in instrumentation and your own custom instrumentation will create spans around meaningful operations. You can access the active span in order to include meaningful data.

```python
from ddtrace import tracer

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
    # this span is my_span
```

{{% /tab %}}

{{% tab "Root span" %}}

```python
def assemble_sandwich(ingredients):
    # Get the active root span
    span = tracer.current_root_span()
    # this span is my_span
```
{{% /tab %}}
{{< /tabs >}}


## Adding tags

{{< tabs >}}
{{% tab "Locally" %}}

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```
{{% /tab %}}
{{% tab "Globally" %}}

Tags can be globally set on the tracer. These tags will be applied to every span that is created.

```python
from ddtrace import tracer
from myapp import __version__

# This will be applied to every span
tracer.set_tag("version", __version__)
```
{{% /tab %}}
{{% tab "Errors" %}}

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
{{% /tab %}}
{{< /tabs >}}


## OpenTracing

OpenTracing support is included in the `ddtrace` package. Use `pip` to install the required `opentracing` package :

```sh
pip install ddtrace[opentracing]
```

The OpenTracing convention for initializing a tracer is to define an initialization method that configures and instantiates a new tracer and overwrites the global `opentracing.tracer` reference:

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      "agent_hostname": "localhost",
      "agent_port": 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span("<OPERATION_NAME>")
  span.set_tag("<TAG_KEY>", "<TAG_VALUE>")
  time.sleep(0.05)
  span.finish()

init_tracer("<SERVICE_NAME>")
my_operation()
```

The tracer can now be used just like in any other OpenTracing application. See [opentracing.io][2] for OpenTracing Python usage.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/python/#compatibility
[2]: opentracing.io/guides/python
