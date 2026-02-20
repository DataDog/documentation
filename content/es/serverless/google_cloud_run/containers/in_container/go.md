---
aliases:
- /es/serverless/google_cloud_run/containers/in_process/go
code_lang: go
code_lang_weight: 30
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
  tag: Documentación
  text: Rastreo de aplicaciones de Go
- link: /tracing/other_telemetry/connect_logs_and_traces/go/
  tag: Documentación
  text: Correlación de logs y traces (trazas) de Go
title: Instrumentación de un contenedor Go Cloud Run In-Container
type: multi-code-lang
---

## Configuración

<div class="alert alert-info">Una aplicación de ejemplo está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/go">disponible en GitHub</a>.</div>

1. **Instalar el rastreador de Datadog Go**.

   1. En tu aplicación principal, añade la biblioteca de rastreo de `dd-trace (traza)-go`.

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

   Para obtener más información, consulta [Rastreo de aplicaciones de Go][1] y el [Tracer README][2].

2. **Instalar serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="./your-binary" %}}

3. **Configurar logs**.

   Para activar el registro, configura la variable de entorno `DD_LOGS_ENABLED=true`. Esto permite a `serverless-init` leer logs de stdout y stderr.

   Datadog también recomienda configurar la variable de entorno `DD_SOURCE=go` para activar el análisis sintáctico avanzado de logs de Datadog.

   Si deseas que los logs de varias líneas se conserven en un único mensaje de logs, Datadog te recomienda escribir tus logs en formato JSON. Por ejemplo, puedes utilizar una biblioteca de registro de terceros como `logrus`:
   ```go
   logrus.SetFormatter(&logrus.JSONFormatter{})
   logrus.AddHook(&dd_logrus.DDContextLogHook{})

   logrus.WithContext(ctx).Info("Hello World!")
   ```

   Para obtener más información, consulta [Correlación de logs y traces (trazas) de Go][3].

4. **Configurar tu aplicación**.

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente de DogStatsD ][4] y [visualiza ejemplos de código][5]. En serverless, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-in-container language="go" defaultSource="cloudrun" %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/go/
[4]: /es/developers/dogstatsd/?tab=go#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=go#code-examples-5