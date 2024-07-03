---
aliases:
- /ja/tracing/setup_overview/open_standards/python
- /ja/tracing/trace_collection/open_standards/python
- /ja/tracing/trace_collection/opentracing/python/
code_lang: python
code_lang_weight: 10
description: OpenTracing instrumentation for Python
kind: documentation
title: Python OpenTracing instrumentation
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing support is based on a deprecated specification. If you want to instrument your code with an open spec, use OpenTelemetry instead. Try the beta support for <a href="/tracing/trace_collection/otel_instrumentation/python/">processing data from OpenTelemetry instrumentation in Datadog Tracing Libraries</a>.</div>

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


[1]: https://opentracing.io/guides/python/