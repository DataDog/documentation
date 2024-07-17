---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/python/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación Python con la API de OpenTelemetry, para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
kind: documentación
title: Instrumentación personalizada de Python con la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}


## Configuración

Para configurar OpenTelemetry para utilizar el proveedor de traza de Datadog:

1. Si aún no has leído las instrucciones de autoinstrumentación y configuración, comienza por las [Instrucciones de configuración de Python][1].

1. Establece la variable de entorno `DD_TRACE_OTEL_ENABLED` en `true`.

### Creación de tramos personalizados

Para crear tramos personalizados dentro de un contexto de traza existente:

{{< highlight python "hl_lines=6" >}}
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def do_work():
    with tracer.start_as_current_span("operation_name") as span:
        # Realiza el trabajo que deseas rastrear con el tramo
        print("Doing work...")
        # Cuando el bloque 'with' finaliza, el tramo se cierra automáticamente
{{< /highlight >}}

## Acceso a tramos activos

Para acceder al tramo activo en ese momento, utiliza la función `get_current_span()`:

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# mejora 'current_span' con información
```

## Añadir etiquetas al tramo

Añada atributos a un tramo para proporcionar contexto o metadatos adicionales.

Aquí encontrarás un ejemplo de cómo añadir atributos al tramo actual:

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/setup/python/