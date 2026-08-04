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
title: Instrumentación de una aplicación de contenedor .NET dentro del contenedor
type: multi-code-lang
---

## Instalación

1. **Instala el rastreador de Datadog.NET** en tu archivo Docker.

   Dado que las solicitudes de GitHub están limitadas en cuanto a la tasa, debes pasar un token de GitHub guardado en la variable de entorno `GITHUB_TOKEN` como [un secreto compilado en Docker][1] `--secret id=github-token,env=GITHUB_TOKEN`.

   {{< tabs >}}
   {{% tab "Standard Linux (glibc)" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
    chmod +x /app/dotnet.sh && /app/dotnet.sh
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

   Para obtener más información, consulta [Rastreo de aplicaciones .NET][2].

2. **Instalar serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"dotnet\", \"dotnet.dll\"" %}}

3. **Configura logs**.

   Para activar el registro, establece la variable de entorno `DD_LOGS_ENABLED=true`. Esto permite a `serverless-init` leer los logs de stdout y stderr.

   Datadog también recomienda configurar las variables de entorno `DD_LOGS_INJECTION=true` y `DD_SOURCE=csharp` para activar el parseo avanzado de logs de Datadog.

   Si deseas que los logs de varias líneas se conserven en un único mensaje de log, Datadog recomienda escribir tus logs en formato JSON. Por ejemplo, puedes utilizar una biblioteca de registro de terceros como `Serilog`:

   {{< code-block lang="csharp" disable_copy="false" >}}
using Serilog;

builder.Host.UseSerilog((context, config) =>
{
    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true));
});

logger.LogInformation("Hello World!");
{{< /code-block >}}

   Para obtener más información, consulta [Correlación de logs y trazas de .NET][3].

4. **Configurar tu aplicación**.

{{% serverless-init-configure %}}

5. **Enviar métricas personalizadas**.

   Para enviar métricas personalizadas, [instala el cliente DogStatsD][4] y [consulta ejemplos de código][5]. En serverless, solo se admite el tipo de métrica *distribution*.

{{% serverless-init-env-vars-in-container language="csharp" defaultSource="containerapp" %}}

## Solucionar problemas

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/build/building/secrets/
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[4]: /es/developers/dogstatsd/?tab=dotnet#install-the-dogstatsd-client
[5]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=dotnet#code-examples-5