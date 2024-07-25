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

{{< whatsnext desc="Best practices for monitoring your serverless applications" >}}
    {{< nextlink href="/serverless/guide/connect_invoking_resources" >}}Mayor visibilidad de los recursos que invocan funciones de Lambda{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_warnings" >}}Advertencias de las aplicaciones serverless{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tagging" >}}Etiquetado en las aplicaciones serverless{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/agent_configuration" >}}Configuración del Agent{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/opentelemetry" >}}Serverless y OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Azure App Service and Container Apps" >}}
    {{< nextlink href="/serverless/guide/azure_app_service_linux_sidecar" >}}Instrumentación de contenedores de Linux en Azure App Service con el sidecar de Azure{{< /nextlink >}}
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