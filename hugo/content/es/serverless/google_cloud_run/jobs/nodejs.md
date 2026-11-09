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
title: Instrumentación de un trabajo de Node.js en Cloud Run
type: multi-code-lang
---
## Configuración {#setup}

<div class="alert alert-info">Una aplicación de muestra está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/node">disponible en GitHub</a>.</div>
<div class="alert alert-info">
Para obtener visibilidad completa y acceso a todas las funciones de Datadog en los trabajos de Cloud Run,
asegúrese de haber <a href="/integrations/google_cloud_platform/">instalado la integración de Google Cloud</a>
y de estar usando la <a href="https://hub.docker.com/r/datadog/serverless-init">versión 1.9.0 o posterior de serverless-init</a>.
</div>

1. **Instale el SDK de Datadog para Node.js**.

   1. En su aplicación principal, instale el paquete `dd-trace`.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Inicialice el trazador de Node.js con la variable de entorno `NODE_OPTIONS`:
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   **Nota**: Los trabajos de Cloud Run se ejecutan hasta completarse en lugar de atender solicitudes, por lo que la instrumentación automática no creará un tramo de "trabajo" de nivel superior. Para una visibilidad de extremo a extremo, cree su propio tramo raíz. Consulte las instrucciones de [Instrumentación personalizada de Node.js][1].

   Para obtener más información, consulte [Seguimiento de aplicaciones Node.js][2].

2. **Instale serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"/nodejs/bin/node\", \"/path/to/your/app.js\"" cloudservice="jobs" %}}

3. **Configure los registros**.

   Para habilitar el registro, establezca la variable de entorno `DD_LOGS_ENABLED=true`. Esto permite que `serverless-init` lea los registros de stdout y stderr.

   Datadog también recomienda establecer las variables de entorno `DD_LOGS_INJECTION=true` y `DD_SOURCE=nodejs` para habilitar el parseo avanzado de registros de Datadog.

   Si desea que los registros multilínea se conserven en un solo mensaje de registro, Datadog recomienda escribir sus registros en formato JSON. Por ejemplo, puede utilizar una biblioteca de registro de terceros como `winston`:
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Para obtener más información, consulte [Correlación de registros y trazas de Node.js][3].

4. **Configure su aplicación**.

{{% serverless-init-configure cloudrun_jobs="true" %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [visualice ejemplos de código][4]. En serverless, solo se admite el tipo de métrica *distribution*.

8. **Habilite la generación de perfiles (vista previa)**.

   Para habilitar el [Continuous Profiler][7], establezca la variable de entorno `DD_PROFILING_ENABLED=true`.

   <div class="alert alert-info">El Continuous Profiler de Datadog está disponible en vista previa para los trabajos de Google Cloud Run.</div>

{{% serverless-init-env-vars-in-container language="nodejs" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Solución de problemas {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/custom_instrumentation/nodejs/dd-api?tab=locally#creating-spans
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[7]: /es/profiler/