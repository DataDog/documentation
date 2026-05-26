---
code_lang: go
code_lang_weight: 30
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
  tag: Documentación
  text: Rastreo de aplicaciones de Go
- link: /tracing/other_telemetry/connect_logs_and_traces/go/
  tag: Documentación
  text: Correlación de logs y traces (trazas) de Go
title: Instrumentación de una función de ejecución de Go Cloud
type: multi-code-lang
---

<div class="alert alert-info">Una aplicación de ejemplo está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/go">disponible en GitHub</a>.</div>

## Configuración

1. **Instalar el rastreador de Datadog Go**.

   1. En tu aplicación principal, añade la biblioteca de rastrei de `dd-trace (traza)-go`.

      {{< code-block lang="shell" disable_copy="false" >}}
go get github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
{{< /code-block >}}

   2. Añade lo siguiente al código de tu aplicación para inicializar el rastreador:
      {{< code-block lang="go" disable_copy="false" >}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

   También puedes añadir paquetes adicionales:
   {{< code-block lang="shell" disable_copy="false" >}}
# Activar perfiles
go get github.com/DataDog/dd-trace-go/v2/profiler

# Patch /net/http
go get github.com/DataDog/dd-trace-go/contrib/net/http/v2
{{< /code-block >}}

   Para obtener más información, consulta [Tracing Go Applications][1] y el [Tracer README][2].

2. **Instalar serverless-init como sidecar**.

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Otros" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Configurar registros**.

   En el anterior step (UI) / paso (generic), creaste un volumen compartido. Es posible que también hayas configurado la variable de entorno `DD_SERVERLESS_LOG_PATH`, que en forma predeterminada es `/shared-volume/logs/app.log`.

   En este step (UI) / paso (generic), configura tu biblioteca de registro para escribir logs en el archivo configurado en `DD_SERVERLESS_LOG_PATH`. En Go, Datadog recomienda escribir logs en formato JSON. Por ejemplo, puedes utilizar una biblioteca de registro de terceros como `logrus`:
   {{< code-block lang="go" disable_copy="false" >}}
const LOG_FILE = "/shared-volume/logs/app.log"

os.MkdirAll(filepath.Dir(LOG_FILE), 0755)
logFile, err := os.OpenFile(LOG_FILE, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
defer logFile.Close()

logrus.SetOutput(logFile)
logrus.SetFormatter(&logrus.JSONFormatter{})
logrus.AddHook(&dd_logrus.DDContextLogHook{})

logrus.WithContext(ctx).Info("Hello World!")
{{< /code-block >}}

   Datadog recomienda configurar la variable de entorno `DD_SOURCE=go` en el contenedor sidecar para permitir el análisis avanzado logs de Datadog.

   Para obtener más información, consulta [Correlación de logs y traces (trazas) de Go][3].

4. {{% gcr-service-label %}}

5. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente de DogStatsD ][4] y [visualiza ejemplos de código][5]. En Serverless Monitoring, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-sidecar language="go" function="true" defaultSource="cloudrun" %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/go/
[4]: /es/developers/dogstatsd/?tab=go#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=go#code-examples-5