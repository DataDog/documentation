---
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: Documentación
  text: Seguimiento de aplicaciones Node.js
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: Documentación
  text: Correlación de registros y trazas de Node.js
title: Instrumentación de una función de Node.js en Cloud Run
type: multi-code-lang
---
<div class="alert alert-info">Una aplicación de muestra está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/node">disponible en GitHub</a>.</div>

## Configuración {#setup}

1. **Instale el SDK de Datadog para Node.js**.

   1. En su aplicación principal, instale el paquete `dd-trace`.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Inicialice el trazador de Node.js con la variable de entorno `NODE_OPTIONS`:
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   Para obtener más información, consulte [Seguimiento de aplicaciones Node.js][1].

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

   En este paso, configure su biblioteca de registro para escribir registros en el archivo establecido en `DD_SERVERLESS_LOG_PATH`. En Node.js, Datadog recomienda escribir los registros en formato JSON. Por ejemplo, puede utilizar una biblioteca de registro de terceros como `winston`:
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const LOG_FILE = "/shared-volume/logs/app.log"

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: LOG_FILE }),
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Datadog recomienda configurar las variables de entorno `DD_LOGS_INJECTION=true` (en su contenedor principal) y `DD_SOURCE=nodejs` (en su contenedor sidecar) para habilitar el parseo avanzado de registros de Datadog.

   Para obtener más información, consulte [Correlación de registros y trazas de Node.js][2].

4. {{% gcr-service-label %}}

5. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [vea ejemplos de código][3]. En Serverless Monitoring, solo se admite el tipo de métrica *distribution*.

6. **Habilite la generación de perfiles (vista previa)**.

   Para habilitar el [Continuous Profiler][6], establezca la variable de entorno `DD_PROFILING_ENABLED=true` en el contenedor de su aplicación.

   <div class="alert alert-info">El Continuous Profiler de Datadog está disponible en vista previa para las funciones de Cloud Run de segunda generación.</div>

{{% serverless-init-env-vars-sidecar language="nodejs" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Seguimiento distribuido con Pub/Sub {#distributed-tracing-with-pubsub}

{{% gcr-pubsub-push-tracing %}}

## Solución de problemas {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[6]: /es/profiler/