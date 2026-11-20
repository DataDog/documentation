---
description: Aprenda a configurar el destino de Datadog Metrics.
disable_toc: false
products:
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Datadog Metrics
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Datadog Metrics de Observability Pipelines para enviar métricas a Datadog. También puede utilizar [AWS PrivateLink](#aws-privatelink) para enviar métricas desde Observability Pipelines a Datadog.

## Configuración {#setup}

Configure el destino de Datadog Metrics cuando [configure una canalización][5]. Puede configurar un pipeline en la [UI][1], utilizando la [API][6] o con [Terraform][7]. Los pasos de esta sección se configuran en la interfaz de usuario.

{{< img src="observability_pipelines/destinations/datadog_metrics_settings.png" alt="La configuración del destino de Datadog Metrics" style="width:40%;" >}}

### Almacenamiento en búfer opcional {#optional-buffering}

Después de seleccionar el destino de Datadog Metrics en la pipeline UI, puede configurar el almacenamiento en búfer.

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores de secreto para este destino.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{< /tabs >}}

## AWS PrivateLink {#aws-privatelink}

Para enviar métricas desde Observability Pipelines a Datadog mediante AWS PrivateLink, consulte [Conectarse a Datadog a través de AWS PrivateLink][3] para obtener instrucciones de configuración. Los dos puntos de conexión que debe configurar son:

- Métricas: {{< region-param key=metrics_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Nota**: El punto de conexión `obpipeline-intake.datadoghq.com` se utiliza para Live Capture y no está disponible como punto de conexión de PrivateLink.

## Cómo funciona el destino {#how-the-destination-works}

### Agregación de métricas {#metrics-aggregation}

El destino de Datadog Metrics agrega métricas que tienen el mismo nombre de métrica, valores de etiqueta y marca de tiempo en una sola métrica antes de enviarlas a Datadog. La ingesta de métricas de Datadog acepta solo un valor por combinación única de nombre de métrica, valores de etiqueta y marca de tiempo, por lo que la agregación en el destino preserva los valores que, de lo contrario, la ingesta descartaría.

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 100,000        | Ninguno              | 2                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://docs.datadoghq.com/es/observability_pipelines/destinations/#event-batching
[3]: https://docs.datadoghq.com/es/agent/guide/private-link/?tab=crossregionprivatelinkendpoints
[4]: http://config.datadoghq.com
[5]: /es/observability_pipelines/configuration/set_up_pipelines/
[6]: /es/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline