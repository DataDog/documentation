---
aliases:
- /es/tracing/setup_overview/open_standards/python
- /es/tracing/trace_collection/open_standards/python
- /es/tracing/trace_collection/opentracing/python/
code_lang: python
code_lang_weight: 10
description: ' Instrumentación de OpenTracing para Python'
kind: documentación
title: Instrumentación de Python OpenTracing
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing se basa en una especificación obsoleta. Si deseas instrumentar tu código con una especificación abierta, utiliza OpenTelemetry en su lugar. Prueba el soporte de fase beta para <a href="/tracing/trace_collection/otel_instrumentation/python/">procesar datos de la instrumentación de OpenTelemetry en bibliotecas de rastreo de Datadog</a>.</div>

La compatibilidad con OpenTracing se incluye en el paquete `ddtrace`. Utiliza `pip` para instalar el paquete `opentracing` necesario:

```sh
pip install ddtrace[opentracing]
```

La convención de OpenTracing para inicializar un rastreador es definir un método de inicialización que configure e instancie un nuevo rastreador y sobrescriba la referencia global `opentracing.tracer`:

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

El rastreador se puede utilizar ahora como en cualquier otra aplicación de OpenTracing. Consulta [opentracing.io][1] para el uso de OpenTracing Python.


[1]: https://opentracing.io/guides/python/