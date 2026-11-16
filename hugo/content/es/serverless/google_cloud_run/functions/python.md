---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentación
  text: Trazas de aplicaciones Python
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentación
  text: Correlación de registros y trazas de Python
title: Instrumentación de una función de Cloud Run en Python
type: multi-code-lang
---
<div class="alert alert-info">Una aplicación de muestra está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/python">disponible en GitHub</a>.</div>

## Configuración {#setup}

1. **Instale el SDK de Python de Datadog**.

   Agregue `ddtrace` a su `requirements.txt` o `pyproject.toml`. Esto garantiza que el SDK se incluya en la imagen de su contenedor cuando se compile y se implemente. Puede encontrar la versión más reciente en [PyPI][1]:
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   Para obtener más información, consulte [Trazas de aplicaciones Python][2].

2. **Instale serverless-init como sidecar**.

   {{< tabs >}}

   {{% tab "CLI de Datadog" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Otro" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Configure los registros**.

   En el paso anterior, creó un volumen compartido. Es posible que también haya configurado la variable de entorno `DD_SERVERLESS_LOG_PATH`, que tiene como valor predeterminado `/shared-volume/logs/app.log`.

   En este paso, configure su biblioteca de registro para escribir registros en el archivo establecido en `DD_SERVERLESS_LOG_PATH`. También puede establecer un formato personalizado para la correlación de registros/trazas y otras funciones. Datadog recomienda configurar las siguientes variables de entorno:
   - `PYTHONUNBUFFERED=1`: En su contenedor principal. Asegúrese de que las salidas de Python aparezcan inmediatamente en los registros del contenedor en lugar de almacenarse en búfer.
   - `DD_LOGS_INJECTION=true`: En su contenedor principal. Habilite la correlación de registros/trazas para los registradores compatibles.
   - `DD_SOURCE=python`: En su contenedor sidecar. Habilite el parseo avanzado de registros de Datadog.

   Luego, actualice su biblioteca de registro. Por ejemplo, puede usar la biblioteca nativa `logging` de Python:
   {{< code-block lang="python" disable_copy="false" >}}
LOG_FILE = "/shared-volume/logs/app.log"
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
        '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
        '- %(message)s')

logging.basicConfig(
    level=logging.INFO,
    format=FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

logger.info('Hello world!')
{{< /code-block >}}

   Para obtener más información, consulte [Correlación de registros y trazas de Python][3].

4. {{% gcr-service-label %}}

5. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instale el cliente DogStatsD][4] y [vea ejemplos de código][5]. En Serverless Monitoring, solo se admite el tipo de métrica *distribution*.

6. **Habilite la generación de perfiles (vista previa)**.

   Para habilitar el [Continuous Profiler][6], establezca la variable de entorno `DD_PROFILING_ENABLED=true` en el contenedor de su aplicación y agregue `import ddtrace.auto` en la parte superior de su archivo de función:

   {{< code-block lang="python" disable_copy="false" >}}
import ddtrace.auto

# ... rest of your function code
{{< /code-block >}}

   <div class="alert alert-info">El Continuous Profiler de Datadog está disponible en vista previa para las funciones de Cloud Run de segunda generación.</div>

{{% serverless-init-env-vars-sidecar language="python" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Seguimiento distribuido con Pub/Sub {#distributed-tracing-with-pubsub}

Establezca `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` en el contenedor de la aplicación. Esto crea un tramo `gcp.pubsub.receive` inferido para la solicitud push.

La traza de suscripciones push de Google Cloud Pub/Sub requiere la versión 4.8.0 o posterior de `ddtrace`.

{{% gcr-pubsub-push-tracing %}}

## Solución de problemas {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /es/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /es/profiler/