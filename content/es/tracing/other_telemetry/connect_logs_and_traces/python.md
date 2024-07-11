---
aliases:
- /es/tracing/connect_logs_and_traces/python
code_lang: python
code_lang_weight: 20
description: Conecta tus logs y trazas (traces) de Python para correlacionarlos en
  Datadog.
further_reading:
- link: /tracing/manual_instrumentation/
  tag: Documentación
  text: Instrumenta manualmente tu aplicación para crear trazas.
- link: /tracing/opentracing/
  tag: Documentación
  text: Implementa Opentracing en todas tus aplicaciones.
- link: /tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlacionar automáticamente logs de solicitud con trazas
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas con una correlación entre productos.
kind: documentación
title: Correlación de logs y trazas de Python
type: multi-code-lang
---

## Inyección

### Registro de la biblioteca estándar

Para correlacionar tus [trazas[1] con tus logs, completa los siguientes pasos:

  1. [Activar la instrumentación automática](#step-1---activate-automatic-instrumentation).
  2. [Incluir los atributos requeridos del registro de log](#step-2---include-required-attributes).

#### Paso 1: Activar la instrumentación automática

Activa la instrumentación automática mediante una de las siguientes opciones:

Opción 1: [inyección de biblioteca][5]:
  1. Establece la variable de entorno `DD_LOGS_INJECTION=true` en el archivo `deployment/manifest` de la aplicación.
  2. Sigue las instrucciones de la [Inyección de biblioteca][5] para configurar el rastreo.

Opción 2: `ddtrace-run`:
  1. Establece la variable de entorno `DD_LOGS_INJECTION=true` en el entorno donde se ejecuta la aplicación.
  2. Importa **ddtrace** a la aplicación.
  3. Ejecuta la aplicación con `ddtrace-run` (por ejemplo, `ddtrace-run python appname.py`).

Opción 3: `patch`:
  1. Importa **ddtrace** a la aplicación.
  2. Añade `ddtrace.patch(logging=True)` al principio del código de la aplicación.

#### Paso 2: Incluir los atributos necesarios

Actualiza tu formato de log para incluir los atributos requeridos del registro de log.


Incluye los atributos ``dd.env``, ``dd.service``, ``dd.version``, ``dd.trace_id`` y
``dd.span_id`` para tu registro de log en la cadena de formato.

He aquí un ejemplo que utiliza `logging.basicConfig` para configurar la inyección de log:

``` python
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```

Para obtener más información sobre la inyección de logs, lee la [documentación de ddtrace][6].

### Sin registro de la biblioteca estándar

Si nos utiliza el módulo `logging` de la biblioteca estándar, puedes utilizar el siguiente fragmento de código para inyectar información de rastreo en tus logs:

```python
from ddtrace import tracer

span = tracer.current_span()
correlation_ids = (str((1 << 64) - 1 & span.trace_id), span.span_id) if span else (None, None)
```
Para demostrar este enfoque, el siguiente ejemplo define una función como un *procesador* en `structlog` para añadir campos de rastreo a la salida del log:

``` python
import ddtrace
from ddtrace import tracer

import structlog

def tracer_injection(logger, log_method, event_dict):
    # obtén IDs de correlación del contexto de rastreo actual
    span = tracer.current_span()
    trace_id, span_id = (str((1 << 64) - 1 & span.trace_id), span.span_id) if span else (None, None)

    # añade IDs al diccionario de eventos de structlog
    event_dict['dd.trace_id'] = str(trace_id or 0)
    event_dict['dd.span_id'] = str(span_id or 0)

    # añade el entorno, servicio y versión configurados para el rastreo
    event_dict['dd.env'] = ddtrace.config.env or ""
    event_dict['dd.service'] = ddtrace.config.service or ""
    event_dict['dd.version'] = ddtrace.config.version or ""

    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

Una vez configurado el registrador, la ejecución de una función rastreada que loguea un evento arroja la información del rastreo inyectado:

```text
>>> traced_func()
{"event": "In tracer context", "dd.trace_id": 9982398928418628468, "dd.span_id": 10130028953923355146, "dd.env": "dev", "dd.service": "hello", "dd.version": "abc123"}
```

**Nota**: Si no estás utilizando la [integración de log de Datadog][2] para analizar tus logs, tus reglas personalizadas de parseo de logs deben asegurar que `dd.trace_id` y `dd.span_id` se analizan como cadenas y se reasignan mediante el [Reasignador de traza][3]. Para obtener más información, consulta [Los logs correlacionados no aparecen en el panel de ID de traza][4].

[Consulta la documentación de registro de Python][2] para asegurarte de que la integración de log de Python está correctamente configurada para que tus logs de Python se analicen automáticamente.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/logs/log_collection/python/#configure-the-datadog-agent
[3]: /es/logs/log_configuration/processors/#trace-remapper
[4]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[5]: /es/tracing/trace_collection/library_injection_local/
[6]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#logs-injection