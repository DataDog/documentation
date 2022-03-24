---
title: Python Open Standards
kind: documentation
description: 'Open Standards for Python'
code_lang: python
type: multi-code-lang
code_lang_weight: 10
---

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

The tracer can now be used like in any other OpenTracing application. See [opentracing.io][1] for OpenTracing Python usage.

## OpenTelemetry

<div class="alert alert-warning">
This exporter is deprecated. To export your OTLP traces from OpenTelemetry SDK directly to Datadog Agent, see <a href="/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent">OTLP Ingest in the Agent</a>. <a href="/help/">Reach out to support</a> for questions.
</div>

OpenTelemetry support is available by using the `opentelemetry-exporter-datadog` package to export traces from OpenTelemetry to Datadog.

### Installation

To install:

```python
pip install opentelemetry-exporter-datadog
```

### Usage

Install the Datadog processor and exporter in your application and configure the options. Then use the OpenTelemetry interfaces to produce traces and other information:

```python
from opentelemetry import trace
from opentelemetry.exporter.datadog import (
    DatadogExportSpanProcessor,
    DatadogSpanExporter,
)
from opentelemetry.exporter.datadog.propagator import DatadogFormat
from opentelemetry.propagate import get_global_textmap, set_global_textmap
from opentelemetry.propagators.composite import CompositeHTTPPropagator
from opentelemetry.sdk.trace import TracerProvider

trace.set_tracer_provider(TracerProvider())

trace.get_tracer_provider().add_span_processor(
    DatadogExportSpanProcessor(
        DatadogSpanExporter(
            agent_url="http://localhost:8126", service="example-server"
        )
    )
)

# append Datadog format for propagation to and from Datadog instrumented services
global_textmap = get_global_textmap()
if isinstance(global_textmap, CompositeHTTPPropagator) and not any(
    isinstance(p, DatadogFormat) for p in global_textmap._propagators
):
    set_global_textmap(
        CompositeHTTPPropagator(
            global_textmap._propagators + [DatadogFormat()]
        )
    )
else:
    set_global_textmap(DatadogFormat())

tracer = trace.get_tracer(__name__)


with tracer.start_as_current_span("foo"):
    with tracer.start_as_current_span("bar"):
        with tracer.start_as_current_span("baz"):
            print("Hello world from OpenTelemetry Python!")
```

### Configuration options

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

### OpenTelemetry links

- See [OpenTelemetry examples][2], or [Readthedocs][3] for more OpenTelemetry Python Datadog Exporter usage.

[1]: https://opentracing.io/guides/python/
[2]: https://github.com/open-telemetry/opentelemetry-python/tree/main/docs/examples/datadog_exporter
[3]: https://opentelemetry-python.readthedocs.io/en/latest/examples/datadog_exporter/README.html
