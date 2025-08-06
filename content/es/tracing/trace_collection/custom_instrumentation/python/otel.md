---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/python/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación Python con la API OpenTelemetry para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Instrumentación personalizada de Python con la API OpenTelemetry
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
        # Realiza el trabajo que quieres rastrear con el tramo
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

## Añadir eventos de tramos

<div class="alert alert-info">Para añadir eventos de tramos se requiere la versión 2.9.0 o posterior del SDK.</div>

Puedes añadir eventos de tramos utilizando la API `add_event`. Este método requiere un parámetro `name` y acepta opcionalmente los parámetros `attributes` y `timestamp`. El método crea un nuevo evento de tramo con las propiedades especificadas y lo asocia al tramo correspondiente.

- **Nombre** [_obligatorio_]: Una cadena que representa el nombre del evento.
- **Atributos** [_opcional_]: Cero o más pares clave-valor con las siguientes propiedades:
  - La clave debe ser una cadena no vacía.
  - El valor puede ser:
    - Un tipo primitivo: cadena, booleano o número.
    - Una matriz homogénea de valores de tipo primitivo (por ejemplo, una matriz de cadenas).
  - Las matrices anidadas y las matrices que contienen elementos de distintos tipos de datos no están permitidas.
- **Marca de tiempo** [_opcional_]: Una marca de tiempo UNIX que representa la hora en que se produjo un evento. Se espera en `microseconds`.

Los siguientes ejemplos muestran distintas formas de añadir eventos a un tramo:

```python
span.add_event("Event With No Attributes")
span.add_event("Event With Some Attributes", {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [True, False]})
```

Para obtener más información, consulta la especificación de [OpenTelemetry][2].

### Registro de excepciones

Para registrar excepciones, utiliza la API `record_exception`. Este método requiere un parámetro `exception` y acepta opcionalmente un parámetro UNIX `timestamp`. Crea un nuevo evento de tramo que incluya atributos de excepción estandarizados y lo asocia al tramo correspondiente.

Los siguientes ejemplos muestran diferentes formas de registrar excepciones:

```python
span.record_exception(Exception("Error Message"))
span.record_exception(Exception("Error Message"), {"status": "failed"})
```

Para obtener más información, consulta la especificación de [OpenTelemetry][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/setup/python/
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[3]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception