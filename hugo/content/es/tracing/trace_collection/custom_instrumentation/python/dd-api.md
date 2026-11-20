---
aliases:
- /es/tracing/opentracing/python
- /es/tracing/manual_instrumentation/python
- /es/tracing/custom_instrumentation/python
- /es/tracing/setup_overview/custom_instrumentation/python
- /es/tracing/trace_collection/custom_instrumentation/python
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/python
code_lang: dd-api
code_lang_weight: 1
description: Instrumenta manualmente tu aplicación Python para enviar trazas (traces)
  personalizadas a Datadog.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conectar tus logs y trazas
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Instrumentación personalizada de Python mediante la API de Datadog
type: multi-code-lang
---

Si no has leído las instrucciones de configuración de la instrumentación automática, empieza por las [Instrucciones de configuración de Python][6].

Si no utilizas la instrumentación de biblioteca compatible (consulta [Compatibilidad de bibliotecas][1]), puede que desees instrumentar manualmente tu código.

También es posible que desees ampliar la funcionalidad de la biblioteca `ddtrace` u obtener un control más preciso sobre la instrumentación de tu aplicación. La biblioteca proporciona varias técnicas para conseguirlo.

## Creación de tramos

La biblioteca `ddtrace` crea tramos automáticamente con `ddtrace-run` para [muchas bibliotecas y marcos][1]. Sin embargo, es posible que desees obtener visibilidad de tu propio código y esto se logra utilizando tramos.

Dentro de tu solicitud web (por ejemplo, `make_sandwich_request`), puedes realizar varias operaciones, como `get_ingredients()` y `assemble_sandwich()`, que son útiles para hacer mediciones.

```python
def make_sandwich_request(request):
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Decorator" %}}

`ddtrace` proporciona un decorador `tracer.wrap()` que puede utilizarse para añadir las funciones de interés. Esto es útil si deseas rastrear la función independientemente de desde donde se está llamando.


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

Para obtener más información, lee [Detalles de la API del decorador para `ddtrace.Tracer.wrap()`][1].


[1]: https://ddtrace.readthedocs.io/en/stable/api.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Context Manager" %}}

Para rastrear un bloque arbitrario de código, utiliza el gestor de contexto `ddtrace.Span` como se indica a continuación, o consulta la [documentación de uso avanzado][1].

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

Para más información, lee todos los [detalles de la API de `ddtrace.Tracer()`][2].

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
{{% /tab %}}
{{% tab "Manual" %}}

Si los métodos del decorador y del gestor de contexto aún no alcanzan para tus necesidades de rastreo, se proporciona una API manual que te permite iniciar y finalizar [tramos][1] como lo necesites:

```python

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create", resource="resource_name")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # remember to finish the span
```

Para más detalles de la API del decorador, lee la [documentación de `ddtrace.Tracer.trace`][2] o la [documentación de `ddtrace.Span.finish`][3].



[1]: /es/tracing/glossary/#spans
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace
[3]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{< /tabs >}}


## Acceso a tramos activos

La instrumentación incorporada y tu propia instrumentación personalizada crean tramos alrededor de operaciones significativas. Puedes acceder al tramo activo para incluir datos significativos.

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


## Añadir etiquetas

{{< tabs >}}
{{% tab "Locally" %}}

Pueden añadirse etiquetas a un tramo utilizando el método `set_tag` en un tramo:

```python
from ddtrace import tracer

def make_sandwich_request(request):
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```
{{% /tab %}}
{{% tab "Globally" %}}

Pueden establecerse etiquetas globalmente en el rastreador. Estas etiquetas se aplican a cada tramo que se crea.

```python
from ddtrace import tracer
from myapp import __version__

# This will be applied to every span
tracer.set_tags({"version": __version__, "<TAG_KEY_2>": "<TAG_VALUE_2>"})
```
{{% /tab %}}
{{% tab "Errors" %}}

La información de la excepción se captura y se adjunta a un tramo si hay uno activo cuando se produce la excepción.

```python
from ddtrace import tracer

with tracer.trace("throws.an.error") as span:
    raise Exception("Oops!")

# `span` will be flagged as erroneous and have
# the stack trace and exception message attached as tags
```

También se puede marcar manualmente una traza como errónea:

```python
from ddtrace import tracer

span = tracer.trace("operation")
span.error = 1
span.finish()
```

En caso que desees marcar el tramo raíz local con el error planteado:

```python
import os
from ddtrace import tracer

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


## Propagación de contexto con extracción e inyección de encabezados

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][2] para obtener información.

### Baggage

Manipulación de [Baggage][3] en un span (tramo):

```python
from ddtrace import tracer

# Start a new span and set baggage
with tracer.trace("example") as span:
    # set_baggage_item
    span.context.set_baggage_item("key1", "value1")
    span.context.set_baggage_item("key2", "value2")

    # get_all_baggage_items
    all_baggage = span.context.get_all_baggage_items()
    print(all_baggage) # {'key1': 'value1', 'key2': 'value2'}

    # remove_baggage_item
    span.context.remove_baggage_item("key1")
    print(span.context.get_all_baggage_items()) # {'key2': 'value2'}

    # get_baggage_item
    print(span.context.get_baggage_item("key1")) # None
    print(span.context.get_baggage_item("key2")) # value2

    # remove_all_baggage_items
    span.context.remove_all_baggage_items()
    print(span.context.get_all_baggage_items()) # {}
```

Para ver un ejemplo en acción, consulta [flask-baggage en trace-examples][7].

## ddtrace-api

{{< callout btn_hidden="true" header="ddtrace-api está en vista previa">}}
El paquete <code>ddtrace-api</code> de Python está en vista previa y puede que no incluya todas las llamadas a la API que necesitas. Si necesitas una funcionalidad más completa, utiliza la API como se describe en las secciones anteriores.
<br><br>Los siguientes pasos sólo son necesarios si deseas experimentar con el paquete <code>ddtrace-api</code> en vista previa .{{< /callout >}}

El paquete [ddtrace-api][8] proporciona una API pública estable para la instrumentación personalizada de Python de Datadog APM. Este paquete implementa sólo la interfaz de la API, no la funcionalidad subyacente que crea y envía tramos a Datadog.

Esta separación entre interfaz (`ddtrace-api`) e implementación (`ddtrace`) ofrece varias ventajas:

- Puedes confiar en una API que cambia con menos frecuencia y de forma más predecible para tu instrumentación personalizada
- Si sólo utilizas la instrumentación automática, puedes ignorar por completo los cambios de la API
- Si implementas tanto el paso único como la instrumentación personalizada, evitarás depender de múltiples copias del paquete `ddtrace`

Para utilizar `ddtrace-api`:

1. Instala las bibliotecas `ddtrace` y `ddtrace-api`:
   ```python
   pip install 'ddtrace>=3.1' ddtrace-api
   ```

2. Instrumenta tu aplicación de Python mediante el uso de `ddtrace-run` anteponiendo tu comando de punto de entrada de Python:
   ```shell
   ddtrace-run python app.py
   ```

3. Una vez configurado esto, puedes escribir instrumentación personalizada exactamente igual que en los ejemplos de las secciones anteriores, pero importando desde `ddtrace_api` en lugar de `ddtrace`.

   Por ejemplo:
   ```python
   from ddtrace_api import tracer

   @tracer.wrap(service="my-sandwich-making-svc", resource="resource_name")
   def get_ingredients():
       # go to the pantry
       # go to the fridge
       # maybe go to the store
       return
   ```

Consulte la [definición de la API][9] del paquete para conocer la lista completa de las llamadas a la API compatibles.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/python
[2]: /es/tracing/trace_collection/trace_context_propagation/
[3]: /es/tracing/trace_collection/trace_context_propagation/#baggage
[4]: /es/tracing/security
[5]: /es/tracing/guide/ignoring_apm_resources/
[6]: /es/tracing/setup/python/
[7]: https://github.com/DataDog/trace-examples/tree/master/python/flask-baggage
[8]: https://pypi.org/project/ddtrace-api/
[9]: https://datadoghq.dev/dd-trace-api-py/pdocs/ddtrace_api.html