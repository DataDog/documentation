---
disable_toc: false
title: Fuente del servidor HTTP
---

Utiliza la fuente del servidor HTTP/S de Observability Pipelines para recopilar logs HTTP del cliente. Selecciona y configura esta fuente cuando [configures un pipeline][1].

También puedes [enviar logs de AWS con el Datadog Lambda Forwarder a Observability Pipelines](#send-aws-vended-log-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Requisitos previos

{{% observability_pipelines/prerequisites/http_server %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información se refiere a la configuración de la fuente en la interfaz de usuario del pipeline.

{{% observability_pipelines/source_settings/http_server %}}

## Enviar logs de AWS con el Datadog Lambda Forwarder a Observability Pipelines

Para enviar logs de AWS a Observability Pipelines con la fuente del servidor HTTP/S:

- [Configura un pipeline con la fuente del servidor HTTP/S](#set-up-a-pipeline).
- [Despliega el Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Nota**: Esto está disponible para las versiones del worker 2.51 o posteriores.

### Establecer un pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Despliegue del Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines