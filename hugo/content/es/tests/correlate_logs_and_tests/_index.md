---
description: Correlacione sus registros con sus trazas de prueba.
further_reading:
- link: /tests
  tag: Documentación
  text: Aprenda sobre Test Optimization
title: Correlacione sus registros y pruebas
---
## Descripción general {#overview}

Puede correlacionar los datos de Test Optimization con [registros inyectados en Datadog][1], lo que le permite visualizar y analizar registros para casos de prueba específicos.

{{< img src="continuous_integration/correlate_logs_and_tests.png"
  alt="Examine los registros de casos de prueba específicos mediante la correlación de registros y pruebas." style="width:90%" >}}

## Configuración {#setup}

La correlación se puede configurar de manera diferente según cómo [envíe sus datos de prueba a Datadog][2].

{{< tabs >}}
{{% tab "Proveedor de CI en la nube (Agentless)" %}}

### Java {#java}

El envío de registros Agentless es compatible con los siguientes lenguajes y marcos:

-   `dd-trace-java >= 1.35.2` y Log4j2.

Utilice las siguientes variables de entorno para habilitar y configurar el envío de registros Agentless:

| Nombre                                                | Descripción                                 | Valor predeterminado |
| --------------------------------------------------- | ------------------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (obligatorio)    | Habilita/deshabilita el envío de registros             | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_LEVEL` (opcional)      | Establece el nivel de registro para el envío de registros Agentless     | `INFO`        |
| `DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE` (opcional) | Establece el tamaño máximo de la cola de registros pendientes | `1024`        |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (opcional)        | Establece una URL personalizada para enviar registros Agentless         | -             |

### JavaScript/TypeScript {#javascripttypescript}

El envío de registros Agentless es compatible con las siguientes versiones de trazas y bibliotecas de registro:

- `dd-trace-js v4.48.0 or later` en la línea de lanzamiento v4, o `dd-trace-js v5.24.0 or later` en la línea de lanzamiento v5, con `winston`.
- `dd-trace-js v5.124.0 or later` en la línea de lanzamiento v5, o `dd-trace-js v6.13.0 or later` en la línea de lanzamiento v6, con `pino` o `bunyan`.

Utilice las siguientes variables de entorno para habilitar y configurar el envío de registros Agentless:

| Nombre                                             | Descripción                         | Valor predeterminado |
| ------------------------------------------------ | ----------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (obligatorio) | Habilita/deshabilita el envío de registros     | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (opcional)     | Establece una URL personalizada para el envío de registros Agentless | -             |

### .NET {#net}

El envío de registros Agentless es compatible con los siguientes lenguajes y marcos:

-   `dd-trace-dotnet >= 2.50.0` y XUnit TestOutputHelper.

Utilice las siguientes variables de entorno para habilitar y configurar el envío de registros Agentless:

| Nombre                                      | Descripción                                   | Valor predeterminado |
| ----------------------------------------- | --------------------------------------------- | ------------- |
| `DD_CIVISIBILITY_LOGS_ENABLED` (obligatorio) | Habilita/deshabilita el envío de registros de CI Visibility | `false`       |

### Swift {#swift}

Utilice las siguientes variables de entorno para habilitar y configurar el envío de registros:

| Nombre                               | Descripción                            | Valor predeterminado |
| ---------------------------------- | -------------------------------------- | ------------- |
| `DD_ENABLE_STDOUT_INSTRUMENTATION` | Habilita/deshabilita el envío de registros de stdout | `false`       |
| `DD_ENABLE_STDERR_INSTRUMENTATION` | Habilita/deshabilita el envío de registros de stderr | `false`       |

### Python {#python}

Requisitos: `ddtrace >= 4.8.0`.

El envío de registros es compatible con el marco de pruebas pytest, y solo cuando los registros se emiten con el módulo `logging` de la biblioteca estándar.

Utilice la siguiente variable de entorno para habilitar el envío de registros Agentless:

| Nombre                                             | Descripción                     | Valor predeterminado |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (obligatorio) | Habilita/deshabilita el envío de registros | `false`       |

Si utiliza el **Datadog Agent** en lugar del modo Agentless, establezca en su lugar `DD_LOGS_INJECTION=true` en el entorno.

#### Registros fuera de proceso {#out-of-process-logs}

Cuando un proceso independiente ejecuta código activado por una prueba, necesita un `trace_id` y `span_id` de esa traza de prueba para correlacionar sus registros. Utilice `ddtrace.testing.logs.DDTestLogsHandler` (`ddtrace >= 4.11.0`) para enviar esos registros a la ingesta de registros de Datadog, correlacionados con la traza de prueba de origen.

`DDTestLogsHandler` lee las mismas variables de entorno que el complemento de pytest para detectar el backend (Agentless o proxy EVP). Está disponible en cualquier subproceso donde esas variables estén disponibles.

**Modo Agentless** (establezca `DD_CIVISIBILITY_AGENTLESS_ENABLED=true`):

| Variable     | Descripción     | Predeterminado         |
| ------------ | --------------- | --------------- |
| `DD_API_KEY` | Clave de Datadog API | (obligatorio)      |
| `DD_SITE`    | Sitio de Datadog    | `datadoghq.com` |

**Modo de Agent/proxy EVP** (predeterminado):

| Variable                  | Descripción    | Predeterminado     |
| ------------------------- | -------------- | ----------- |
| `DD_TRACE_AGENT_URL`      | URL completa del Agent | -           |
| `DD_TRACE_AGENT_HOSTNAME` | Nombre de host del Agent | `localhost` |
| `DD_TRACE_AGENT_PORT`     | Puerto del Agent     | `8126`      |

##### Un hilo por trabajador {#thread-per-worker}

Para un hilo por trabajador de prueba, use `ThreadLocalCorrelationFilter` para asociar los registros de cada hilo con la traza de prueba correcta:

```python
import logging
from ddtrace.testing.logs import DDTestLogsHandler, ThreadLocalCorrelationFilter

with DDTestLogsHandler(service="my-service") as handler:
    correlation = ThreadLocalCorrelationFilter()
    handler.addFilter(correlation)
    logging.getLogger().addHandler(handler)

    while True:
        job = queue.get()  # queue and run_test are provided by your worker framework
        correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
        run_test(job.item)
```

`DDTestLogsHandler` vacía los registros almacenados en búfer automáticamente cuando se usa como administrador de contexto. Llame a `handler.close()` si no usa la forma de administrador de contexto.

##### Trabajadores de Asyncio {#asyncio-workers}

Para los trabajadores basados en asyncio, `ThreadLocalCorrelationFilter` no es compatible con los trabajadores basados en asyncio porque el almacenamiento local de hilos no se propaga a través de los límites de `asyncio.Task`. Subclase `CorrelationFilter` y use un `contextvars.ContextVar` en su lugar, que el bucle de eventos propaga automáticamente a través de los límites de `await`:

```python
import asyncio
import contextvars
import logging
from ddtrace.testing.logs import CorrelationFilter, DDTestLogsHandler

class ContextVarCorrelationFilter(CorrelationFilter):
    def __init__(self):
        super().__init__()
        self._trace_id = contextvars.ContextVar("dd_trace_id", default=None)
        self._span_id = contextvars.ContextVar("dd_span_id", default=None)

    def set_context(self, trace_id, span_id):
        self._trace_id.set(trace_id)
        self._span_id.set(span_id)

    def get_trace_id(self):
        return self._trace_id.get()

    def get_span_id(self):
        return self._span_id.get()

async def run_one(job, correlation):
    correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
    await run_test(job.item)

async def main(jobs):
    with DDTestLogsHandler(service="my-service") as handler:
        correlation = ContextVarCorrelationFilter()
        handler.addFilter(correlation)
        logging.getLogger().addHandler(handler)
        await asyncio.gather(*(run_one(job, correlation) for job in jobs))
```

### Ruby {#ruby}

El envío de registros Agentless con Test Optimization es compatible con aplicaciones Rails. Antes de habilitarlo, asegúrese de
que su aplicación esté [instrumentada con Datadog tracing][1].

Para usar el envío de registros Agentless, necesita la versión `datadog-ci` `0.16` o posterior. Se admiten las siguientes bibliotecas de registro:

-   `activesupport >= 5.0` (solo cuando se usa `ActiveSupport::TaggedLogging`)
-   `lograge >= 0.14`
-   `semantic_logger >= 4.0`

Utilice la siguiente variable de entorno para habilitar el envío de registros:

| Nombre                                             | Descripción                     | Valor predeterminado |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (obligatorio) | Habilita/deshabilita el envío de registros | `false`       |

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#rails-or-hanami-applications

{{% /tab %}}
{{% tab "Proveedor de CI local (Datadog Agent)" %}}

1. [Configure la recopilación de registros][1] a través del Datadog Agent.
2. Siga los pasos descritos en [Correlacione registros y trazas][2].

[1]: /es/logs/log_collection/
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/
[2]: /es/tests/setup/