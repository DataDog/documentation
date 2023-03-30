---
title: Python Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/python
    - /tracing/manual_instrumentation/python
    - /tracing/custom_instrumentation/python
    - /tracing/setup_overview/custom_instrumentation/python
description: 'Manually instrument your Python application to send custom traces to Datadog.'
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/python/">Python Setup Instructions</a>.
</div>

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

{{< tabs >}}
{{% tab "Decorator" %}}

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

To learn more, read [API details for the decorator for `ddtrace.Tracer.wrap()`][1].


[1]: https://ddtrace.readthedocs.io/en/stable/api.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Context Manager" %}}

To trace an arbitrary block of code, use the `ddtrace.Span` context manager as below, or view the [advanced usage documentation][1].

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

To learn more, read the full [API details for `ddtrace.Tracer()`][2]

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
{{% /tab %}}
{{% tab "Manual" %}}

If the decorator and context manager methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish [spans][1] however you may require:

```python

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create", resource="resource_name")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # remember to finish the span
```

For more API details of the decorator, read the [`ddtrace.Tracer.trace` documentation][2] or the [`ddtrace.Span.finish` documentation][3].



[1]: /tracing/glossary/#spans
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace
[3]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{< /tabs >}}


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
from ddtrace import tracer

def make_sandwich_request(request):
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```
{{% /tab %}}
{{% tab "Globally" %}}

Tags can be globally set on the tracer. These tags are be applied to every span that is created.

```python
from ddtrace import tracer
from myapp import __version__

# This will be applied to every span
tracer.set_tags({"version": __version__, "<TAG_KEY_2>": "<TAG_VALUE_2>"})
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

## Trace context propagation for distributed tracing

The Datadog APM tracer supports extraction and injection of [B3][2] and [W3C][3] headers for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection and extraction styles. Supported styles are:
`tracecontext`, `Datadog`, `B3` and `B3 single header`.

- Configure injection styles using the `DD_PROPAGATION_STYLE_INJECT=tracecontext,B3` environment variable.
- Configure extraction styles using the `DD_PROPAGATION_STYLE_EXTRACT=tracecontext,B3` environment variable.
- Configure both injection and extraction styles using the `DD_TRACE_PROPAGATION_STYLE=tracecontext,B3` environment variable.

The values of these environment variables are comma-separated lists of
header styles enabled for injection or extraction. By default,
the `tracecontext,Datadog` styles are enabled.

To disable trace context propagation, set the value of the environment variables to `none`.
- Disable injection styles using the `DD_PROPAGATION_STYLE_INJECT=none` environment variable.
- Disable extraction styles using the `DD_PROPAGATION_STYLE_EXTRACT=none` environment variable.
- Disable all trace context propagation (both inject and extract) using the `DD_PROPAGATION_STYLE=none` environment variable.

If multiple environment variables are set, `DD_PROPAGATION_STYLE_INJECT` and `DD_PROPAGATION_STYLE_EXTRACT`
override any value provided in `DD_TRACE_PROPAGATION_STYLE`.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][4] page or in [Ignoring Unwanted Resources][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: https://github.com/openzipkin/b3-propagation
[3]: https://github.com/w3c/trace-context
[4]: /tracing/security
[5]: /tracing/guide/ignoring_apm_resources/
