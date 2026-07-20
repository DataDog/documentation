---
cascade:
  algolia:
    category: Guía
    rank: 20
    subcategory: Guías de Serverless Monitoring
disable_toc: true
private: true
title: Guías de Serverless Monitoring
---

## Guías generales sobre las aplicaciones serverless

{{< whatsnext desc="Prácticas recomendadas para la monitorización de tus aplicaciones sin servidor" >}}
    {{< nextlink href="/serverless/guide/connect_invoking_resources" >}}Visibilidad detallada de los recursos que invocan funciones Lambda{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_warnings" >}}Advertencias sin servidor{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tagging" >}}Etiquetado sin servidor{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/agent_configuration" >}}Configuración de Agent{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/opentelemetry" >}}Sin servidor y OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/disable_serverless" >}}Desactivar la monitorización sin servidor{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Azure App Service y Container Apps" >}}
    {{< nextlink href="/serverless/guide/azure_app_service_linux_containers_serverless_init" >}}Instrumentar Azure App Service con serverless-init - Contenedores Linux{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/aca_serverless_init" >}}Instrumentar Azure Container Apps con serverless-init{{< /nextlink >}}
{{< /whatsnext >}}

## Instalar mediante el Datadog Forwarder

{{< whatsnext desc="Installation instructions for applications previously set up to be monitored using the Datadog Forwarder" >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_node" >}}Instrumentación de aplicaciones serverless de Node.js mediante el Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_python" >}}Instrumentación de aplicaciones serverless de Python mediante el Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_java" >}}Instrumentación de aplicaciones serverless de Java mediante el Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_go" >}}Instrumentación de aplicaciones serverless de Go mediante el Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_dotnet" >}}Instrumentación de aplicaciones serverless de .NET mediante el Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/extension_motivation" >}}Decidir migrar a la Datadog Lambda Extension{{< /nextlink >}}
{{< /whatsnext >}}

## Solucionar problemas de instalación

{{< whatsnext desc="Common installation issues and tips for troubleshooting" >}}
    {{< nextlink href="/serverless/troubleshooting" >}}Solucionar problemas de Serverless Monitoring{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tracing_and_webpack" >}}Compatibilidad del rastreo de Lambda y webpack con Node.js{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_package_too_large" >}}Solucionar problemas de errores de paquetes demasiado grandes en las aplicaciones serverless{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/handler_wrapper" >}}Envolver el controlador de Lambda con código{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/layer_not_authorized" >}}Solucionar problemas de errores de capas no autorizadas{{< /nextlink >}}
{{< /whatsnext >}}