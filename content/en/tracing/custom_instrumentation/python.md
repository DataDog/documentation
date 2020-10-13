---
title: Python Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/python
    - /tracing/manual_instrumentation/python
decription: 'Manually instrument your Python application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
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

API details for the decorator can be found for `ddtrace.Tracer.wrap()` [here][1].


[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.wrap
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
    with tracer.trace("sandwich.create") as outer_span:
        with tracer.trace("get_ingredients") as span:
            ingredients = get_ingredients()

        with tracer.trace("assemble_sandwich") as span:
            sandwich = assemble_sandwich(ingredients)
```

Full API details for `ddtrace.Tracer()` can be found [here][2]

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
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

API details of the decorator can be found in the `ddtrace.Tracer.trace` [documentation][2] or the `ddtrace.Span.finish`[documentation][3].



[1]: /tracing/visualization/#spans
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace
[3]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish
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

Tags can be globally set on the tracer. These tags will be applied to every span that is created.

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

## Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][2] page.

## OpenTracing

OpenTracing support is included in the `ddtrace` package. Use `pip` to install the required `opentracing` package:

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

The tracer can now be used like in any other OpenTracing application. See [opentracing.io][3] for OpenTracing Python usage.

## OpenTelemetry

OpenTelemetry support is available by using the `opentelemetry-ext-datadog` package to export traces from OpenTelemetry to Datadog.

<div class="alert alert-warning">
This feature is currently in beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

### Installation

To install:

```python
pip install opentelemetry-ext-datadog
```

### Usage

Install the Datadog processor and exporter in your application and configure the options. Then use the OpenTelemetry interfaces to produce traces and other information:

```python
from opentelemetry import trace
from opentelemetry.ext.datadog import (
    DatadogExportSpanProcessor,
    DatadogSpanExporter,
)
from opentelemetry.sdk.trace import TracerProvider

trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

exporter = DatadogSpanExporter(
    agent_url="http://localhost:8126", service="example"
)

span_processor = DatadogExportSpanProcessor(exporter)
trace.get_tracer_provider().add_span_processor(span_processor)


with tracer.start_as_current_span("foo"):
    with tracer.start_as_current_span("bar"):
        with tracer.start_as_current_span("baz"):
            print("Hello world from OpenTelemetry Python!")
```

### Configuration Options

The Datadog Agent URL and span tag values can be configured if necessary or desired based upon your environment and Agent location.

#### Datadog Agent URL

By default, the OpenTelemetry Datadog Exporter transmits traces to `http://localhost:8126`. Send traces to a different URL by configuring the following environment variables:

- `DD_TRACE_AGENT_URL`: The `<host>:<port>` where Datadog Agent listens for traces. For example, `agent-host:8126`.

You can override these values at the trace exporter level:

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126", service="example"
)
```

#### Tagging

Configure the application to automatically tag your Datadog exported traces by setting the following environment variables:

- `DD_ENV`: Your application environment, for example, `production`, `staging`.
- `DD_SERVICE`: Your application's default service name, for example, `billing-api`.
- `DD_VERSION`: Your application version, for example, `2.5`, `202003181415`, or `1.3-alpha`.
- `DD_TAGS`: Custom tags in value pairs, separated by commas, for example, `layer:api,team:intake`.
- If `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` is set, it will override any corresponding `env`, `service`, or `version` tag defined in `DD_TAGS`.
- If `DD_ENV`, `DD_SERVICE` and `DD_VERSION` are _not_ set, you can configure environment, service, and version by using corresponding tags in `DD_TAGS`.

Tag values can also be overridden at the trace exporter level. This lets you set values on a per-application basis, so you can have multiple applications reporting for different environments on the same host:

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126",
    service="example",
    env='prod',
    version='1.5-alpha',
    tags='team:ops,region:west'
)

```

Tags that are set directly on individual spans supersede conflicting tags defined at the application level.

### OpenTelemetry Links

- See [github][4], [opentelemetry examples][5], or [readthedocs][6] for more OpenTelemetry Python Datadog Exporter usage.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: /tracing/security
[3]: https://opentracing.io/guides/python/
[4]: https://github.com/open-telemetry/opentelemetry-python/tree/master/ext/opentelemetry-ext-datadog
[5]: https://github.com/open-telemetry/opentelemetry-python/tree/master/docs/examples/datadog_exporter
[6]: https://opentelemetry-python.readthedocs.io/en/stable/ext/datadog/datadog.html
