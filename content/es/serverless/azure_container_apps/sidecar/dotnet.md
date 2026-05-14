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
title: Instrumentación de una aplicación de contenedor .NET con un auxiliar
type: multi-code-lang
---

## Instalación

1. **Instala el rastreador de Datadog.NET** en tu archivo Docker.

   {{< tabs >}}
   {{% tab "Standard Linux (glibc)" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
ARG TRACER_VERSION
RUN curl -L -s "https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm_${TRACER_VERSION}_amd64.deb" --output datadog-dotnet-apm.deb && \
   dpkg -i datadog-dotnet-apm.deb
{{< /code-block >}}
   {{% /tab %}}

   {{% tab "Alpine (musl)" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
# Para alpine utilizar datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
{{< /code-block >}}
   {{% /tab %}}
   {{< /tabs >}}

   Consulta las [versiones de dd-trace-dotnet][1] para ver la última versión del rastreador.

   Para obtener más información, consulta [Rastreo de aplicaciones .NET][2].

2. **Instalar serverless-init como auxiliar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "CLI de Datadog" %}}
   {{% aca-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% aca-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "Bicep" %}}
   {{% aca-install-sidecar-bicep %}}
   {{% /tab %}}

   {{% tab "ARM Template" %}}
   {{% aca-install-sidecar-arm-template %}}
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% aca-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Configura logs**.

   En el paso anterior, creaste un volumen compartido. En este paso, configura tu biblioteca de registro para escribir logs en ese conjunto de archivos en `DD_SERVERLESS_LOG_PATH`. En .NET, recomendamos escribir logs en formato JSON. Por ejemplo, puedes utilizar una biblioteca de registro de terceros como `Serilog`:
   {{< code-block lang="csharp" disable_copy="false" >}}
using Serilog;

const string LOG_FILE = "/LogFiles/app.log";

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

4. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente DogStatsD][4] y [consulta ejemplos de código][5]. En serverless, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-sidecar language="csharp" defaultSource="containerapp" %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[4]: /es/developers/dogstatsd/?tab=dotnet#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=dotnet#code-examples-5