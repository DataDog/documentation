---
description: Aprenda a enviar registros proporcionados por AWS a Observability Pipelines
  utilizando el Datadog Lambda Forwarder.
disable_toc: false
title: Envíe registros del Datadog Lambda Forwarder a Observability Pipelines
---
## Descripción general {#overview}

Este documento explica cómo enviar registros proporcionados por AWS con el Datadog Lambda Forwarder a Observability Pipelines. Los pasos de configuración son:

- [Configure un pipeline con la fuente HTTP/S Server](#set-up-a-pipeline).
- [Implemente el Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

Consulte [Datadog Forwarder][1] para obtener más información al respecto.

**Nota**: El Datadog Forwarder envía registros con la etiqueta `ddsource` y la etiqueta `ddtags`, no con la etiqueta `source` y la etiqueta `tags`. Cuando defina consultas o filtros de procesador para estos registros, utilice `ddsource` y `ddtags`.

## Configure un pipeline {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Implemente el Datadog Lambda Forwarder {#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

## Métricas de salud {#health-metrics}

Para [métricas de componente][2] y [métricas de búfer de fuente][3] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][4]. Dado que utiliza la fuente HTTP Server para enviar registros desde Lambda Forwarder a Observability Pipelines, utilice la etiqueta `component_type:http_server` para filtrar las métricas relevantes.

[1]: /es/logs/guide/forwarder/?tab=cloudformation
[2]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/