---
description: Aprenda a enviar registros de Lambda Extension a Observability Pipelines
disable_toc: false
title: Enviar registros de Datadog Lambda Extension a Observability Pipelines
---
## Descripción general {#overview}

Este documento describe cómo utilizar Datadog Lambda Extension para enviar registros proporcionados por AWS a Observability Pipelines. Los pasos de configuración son:

- [Configure un pipeline con la fuente del servidor HTTP/S](#set-up-a-pipeline).
- [Implemente Datadog Lambda Extension](#deploy-the-datadog-lambda-extension)

Consulte [Datadog Lambda Extension][1] para obtener más información al respecto.

**Nota**: Datadog Lambda Extension envía registros etiquetados con `ddsource` y `ddtags`, no con `source` y `tags`. Cuando defina consultas o filtros de procesador para estos registros, utilice `ddsource` y `ddtags`.

## Configure un pipeline {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**Nota**: Su Observability Pipeline debe utilizar {{< ui >}}HTTP Server{{< /ui >}} como fuente para procesar los registros de Datadog Lambda Extension. No utilice {{< ui >}}Datadog Agent{{< /ui >}} como fuente.

## Implemente Datadog Lambda Extension {#deploy-the-datadog-lambda-extension}

### Instale Datadog Lambda Extension {#install-the-datadog-lambda-extension}

Siga las instrucciones en [Instrumentar aplicaciones de AWS Lambda][2] para configurar Datadog Lambda Library y recopilar datos de sus aplicaciones de AWS Lambda.

### Establezca variables de entorno para Datadog Lambda Extension {#set-environment-variables-for-datadog-lambda-extension}

{{% observability_pipelines/lambda_extension_source %}}

## Métricas de salud {#health-metrics}

Para [métricas de componente][3] y [métricas de búfer de fuente][4] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][5]. Dado que utiliza la fuente HTTP Server para enviar registros desde Datadog Lambda Extension a Observability Pipelines, utilice la etiqueta `component_type:http_server` para filtrar las métricas relevantes.

[1]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension/
[2]: https://docs.datadoghq.com/es/serverless/aws_lambda/instrumentation/
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/