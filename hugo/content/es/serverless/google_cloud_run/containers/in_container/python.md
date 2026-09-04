---
aliases:
- /es/serverless/google_cloud_run/containers/in_process/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentación
  text: Trazas de aplicaciones Python
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentación
  text: Correlación de registros y trazas de Python
title: Instrumentación de un contenedor de Python en Cloud Run
type: multi-code-lang
---
## Configuración {#setup}

<div class="alert alert-info">Una aplicación de muestra está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/python">disponible en GitHub</a>.</div>

1. **Instale el SDK de Python de Datadog**.

   Agregue `ddtrace` a su `requirements.txt` o `pyproject.toml`. Puede encontrar la versión más reciente en [PyPI][1]:
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   Alternativamente, puede instalar el SDK en su Dockerfile:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   Luego, envuelva su comando de inicio con `ddtrace-run`:
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   Para obtener más información, consulte [Trazas de aplicaciones Python][2].

2. **Instale serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run", "python", "path/to/your/python/app.py".py\"" %}}

3. **Configure los registros**.

   Para habilitar el registro, establezca la variable de entorno `DD_LOGS_ENABLED=true`. Esto permite que `serverless-init` lea los registros de stdout y stderr.

   Datadog también recomienda las siguientes variables de entorno:
   - `ENV PYTHONUNBUFFERED=1`: Asegúrese de que las salidas de Python aparezcan inmediatamente en los registros del contenedor en lugar de almacenarse en búfer.
   - `ENV DD_LOGS_INJECTION=true`: Habilite la correlación de registros y trazas para los registradores compatibles.
   - `ENV DD_SOURCE=python`: Habilite el parseo avanzado de registros de Datadog.

   Si desea que los registros multilínea se conserven en un solo mensaje de registro, Datadog recomienda escribir sus registros en formato JSON. Por ejemplo, puede utilizar una biblioteca de registro de terceros como `structlog`:
   {{< code-block lang="python" disable_copy="false" >}}
import structlog

def tracer_injection(logger, log_method, event_dict):
    event_dict.update(tracer.get_log_correlation_context())
    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.EventRenamer("msg"),
        structlog.processors.JSONRenderer()
    ],
    logger_factory=structlog.WriteLoggerFactory(file=sys.stdout),
)

logger = structlog.get_logger()

logger.info("Hello world!")
{{< /code-block >}}

   Para obtener más información, consulte [Correlación de registros y trazas de Python][3].

4. **Configure su aplicación**.

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instale el cliente DogStatsD][4] y [vea ejemplos de código][5]. En serverless, solo se admite el tipo de métrica *distribution*.

7. **Habilite el perfilado (vista previa)**.

   Para habilitar el [Continuous Profiler][6], establezca la variable de entorno `DD_PROFILING_ENABLED=true`.

   <div class="alert alert-info">El Continuous Profiler de Datadog está disponible en vista previa para los servicios de Google Cloud Run.</div>

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Seguimiento distribuido con Pub/Sub {#distributed-tracing-with-pubsub}

Establezca `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true`. Esto crea un tramo `gcp.pubsub.receive` inferido para la solicitud push.

La traza de suscripciones push de Google Cloud Pub/Sub requiere la versión 4.8.0 o posterior de `ddtrace`.

{{% gcr-pubsub-push-tracing %}}

## Solución de problemas {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /es/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /es/profiler/