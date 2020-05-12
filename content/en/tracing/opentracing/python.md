---
title: Python OpenTracing
kind: documentation
description: 'Implement the OpenTracing standard with the Datadog Python APM tracer.'
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

## Setup

OpenTracing support is included in the `ddtrace` package. Use `pip` to install the required `opentracing` package :

```sh
pip install ddtrace[opentracing]
```

## Usage

The OpenTracing convention for initializing a tracer is to define an initialization method that configures and instantiates a new tracer and overwrites the global `opentracing.tracer` reference:

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      'agent_hostname': 'localhost',
      'agent_port': 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span('<OPERATION_NAME>')
  span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  time.sleep(0.05)
  span.finish()

init_tracer('<SERVICE_NAME>')
my_operation()
```

For more advanced usage and configuration information see [Datadog Python Opentracing API docs][1] and the [Python OpenTracing repo][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#opentracing
[2]: https://github.com/opentracing/opentracing-python
