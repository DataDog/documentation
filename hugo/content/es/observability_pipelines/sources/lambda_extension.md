---
description: Aprenda a enviar registros de Lambda Extension a Observability Pipelines
disable_toc: false
title: Enviar registros de Datadog Lambda Extension a Observability Pipelines
---
## Descripción general {#overview}

Este documento describe cómo usar Datadog Lambda Extension para enviar registros proporcionados por AWS a Observability Pipelines. Los pasos de configuración son:

- [Configure una canalización con el HTTP/S Server source](#set-up-a-pipeline).
- [Implemente Datadog Lambda Extension](#deploy-the-datadog-lambda-extension)

Consulte [Datadog Lambda Extension][1] para obtener más información al respecto.

**Nota**: Datadog Lambda Extension envía registros etiquetados con `ddsource` y `ddtags`, no con `source` y `tags`. Cuando defina consultas o filtros de procesador para estos registros, use `ddsource` y `ddtags`.

## Configure una canalización {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**Nota**: Su Observability Pipeline debe usar {{< ui >}}HTTP Server{{< /ui >}} como source para procesar registros de Datadog Lambda Extension. No use {{< ui >}}Datadog Agent{{< /ui >}} como source.

## Implemente Datadog Lambda Extension {#deploy-the-datadog-lambda-extension}

### Instale Datadog Lambda Extension {#install-the-datadog-lambda-extension}

Siga las instrucciones en [Instrument AWS Lambda applications][2] para configurar Datadog Lambda Library para recopilar datos de sus aplicaciones de AWS Lambda.

### Establezca variables de entorno para Datadog Lambda Extension {#set-environment-variables-for-datadog-lambda-extension}

{{% observability_pipelines/lambda_extension_source %}}

## Métricas de estado {#health-metrics}

Para [métricas de componentes][3] y [métricas de búfer de fuente][4] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][5]. Dado que utiliza el HTTP Server source para enviar registros desde Datadog Lambda Extension a Observability Pipelines, use la etiqueta `component_type:http_server` para filtrar las métricas relevantes.

[1]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension/
[2]: https://docs.datadoghq.com/es/serverless/aws_lambda/instrumentation/
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/