---
code_lang: dotnet
code_lang_weight: 50
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
  tag: Documentación
  text: Rastreo de aplicaciones .NET Core
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Correlación de logs y trazas de .NET
title: Instrumentación de Cloud Run Function de .NET
type: multi-code-lang
---

<div class="alert alert-info">Una aplicación de ejemplo está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/dotnet">disponible en GitHub</a>.</div>

## Configuración

1. **Instalar el rastreador de .NET de Datadog**

   Añade el [paquete NuGet][1] `Datadog.Trace.Bundle` a tu aplicación.

   Establece las siguientes variables de entorno para activar la instrumentación automática:
   {{< code-block lang="text" disable_copy="false" >}}
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/layers/google.dotnet.publish/publish/bin/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so
DD_DOTNET_TRACER_HOME=/layers/google.dotnet.publish/publish/bin/datadog
{{< /code-block >}}

   Para obtener más información, consulta [Rastreo de aplicaciones .NET][2].

2. **Instalar serverless-init como auxiliar**.

   {{< tabs >}}

   {{% tab "CLI de Datadog" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Configura logs**.

   En el paso anterior, creaste un volumen compartido. Es posible que también hayas establecido la variable de entorno `DD_SERVERLESS_LOG_PATH`, que por defecto es `/shared-volume/logs/app.log`.

   En este paso, configura tu biblioteca de registro para escribir logs en el archivo establecido en `DD_SERVERLESS_LOG_PATH`. En .NET, Datadog recomienda escribir logs en formato JSON. Por ejemplo, puedes utilizar una biblioteca de registro de terceros como `Serilog`:
   {{< code-block lang="csharp" disable_copy="false" >}}
using Serilog;

const string LOG_FILE = "/shared-volume/logs/app.log";

builder.Host.UseSerilog((context, config) =>
{
    // Ensure the directory exists
    Directory.CreateDirectory(Path.GetDirectoryName(LOG_FILE)!);

    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true))
          .WriteTo.File(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true), LOG_FILE);
});

logger.LogInformation("Hello World!");
{{< /code-block >}}

   Datadog recomienda configurar las variables de entorno `DD_LOGS_INJECTION=true` (en el contenedor principal) y `DD_SOURCE=csharp` (en el contenedor secundario) para permitir el parseo avanzado de logs de Datadog.

   Para obtener más información, consulta [Correlación de logs y trazas de .NET][3].

4. {{% gcr-service-label %}}

5. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente DogStatsD][4] y [consulta ejemplos de código][5]. En Serverless Monitoring, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-sidecar language="csharp" function="true" defaultSource="cloudrun" %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Servicios de Cloud Run" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[4]: /es/developers/dogstatsd/?tab=dotnet#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=dotnet#code-examples-5