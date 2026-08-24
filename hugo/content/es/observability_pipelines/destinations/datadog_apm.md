---
description: Aprenda a enviar trazas a Datadog utilizando el Observability Pipelines
  Worker.
disable_toc: false
products:
- icon: apm
  name: Trazas
  url: /observability_pipelines/configuration/?tab=traces#pipeline-types
title: Destino de Datadog APM
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice Observability Pipelines' {{< tooltip text="Datadog APM destination" tooltip="Comuníquese con su administrador de cuenta para solicitar acceso." >}} para enviar trazas a Datadog.

## Configuración {#setup}

Configure el destino de Datadog APM cuando [configure una canalización][1] en la interfaz de usuario.

### Almacenamiento en búfer opcional {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secretos {#secret-defaults}

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

Para enviar trazas desde Observability Pipelines a Datadog utilizando AWS PrivateLink, consulte [Conectarse a Datadog a través de AWS PrivateLink][7] para obtener instrucciones de configuración. Los dos puntos de conexión que necesita configurar son:

- Trazas: {{< region-param key=traces_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Nota**: El punto de conexión `obpipeline-intake.datadoghq.com` se utiliza para Live Capture y no está disponible como punto de conexión de PrivateLink.

## Métricas de salud {#health-metrics}

Consulte [Métricas de componentes][5] y [Métricas de búfer de destino][6] para obtener más información sobre las métricas emitidas por todos los destinos.

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/?tab=destinations#buffer
[7]: /es/agent/guide/private-link/?tab=crossregionprivatelinkendpoints