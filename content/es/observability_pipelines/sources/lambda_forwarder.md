---
disable_toc: false
title: Enviar logs del Lambda Forwarder a Observability Pipelines
---

Este documento explica cómo enviar logs de AWS con el Datadog Lambda Forwarder a Observability Pipelines. Los pasos de configuración son:

- [Configurar un pipeline con la fuente del servidor HTTP/S](#set-up-a-pipeline).
- [Desplegar el Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Nota**: Esto está disponible para las versiones del worker 2.51 o posteriores.

## Establecer un pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Despliegue del Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}