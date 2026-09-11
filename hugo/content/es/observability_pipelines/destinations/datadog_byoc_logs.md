---
aliases:
- /es/observability_pipelines/destinations/cloudprem/
description: Aprenda a enviar logs a Datadog BYOC (Bring Your Own Cloud) Logs utilizando
  el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Datadog BYOC Logs
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de logs BYOC (Bring Your Own Cloud) de Observability Pipelines para enviar logs a Datadog BYOC Logs.


## Requisitos previos {#prerequisites}

Antes de configurar el destino, necesita implementar un clúster de BYOC Logs. Aprenda a instalarlo en la [sección de instalación de BYOC Logs][3].

## Configuración {#setup}

Configure el destino de BYOC Logs cuando [configure un pipeline][4]. Puede configurar una canalización en la [interfaz de usuario][1], utilizando la [API][5] o con [Terraform][6]. Los pasos de esta sección se configuran en la interfaz de usuario.

### Almacenamiento en búfer opcional {#optional-buffering}

Después de seleccionar el destino de BYOC Logs en la interfaz de usuario del pipeline, puede configurar el almacenamiento en búfer.

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/cloudprem_settings.png" alt="La configuración del destino de BYOC Logs" style="width:35%;" >}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de URL del punto de conexión de BYOC Logs:
	- Hace referencia al punto de conexión de ingesta al que Observability Pipelines envía los logs.
	- En su gestor de secretos:
		- Defina la URL del clúster, como `http://byoc-logs.acme.internal:7280`. **Nota**: La URL debe incluir el puerto.
		- El Worker añade `/api/v2/logs` y `/api/v1/validate` a la URL del punto de conexión, por lo que estos puntos de conexión deben estar permitidos si utiliza reglas de reenvío o de firewall.
	- El identificador predeterminado es `DESTINATION_CLOUDPREM_ENDPOINT_URL`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{< img src="observability_pipelines/destinations/cloudprem_env_vars.png" alt="La página de instalación que muestra el campo de variable de entorno de BYOC Logs" style="width:75%;" >}}

- URL del punto de conexión de BYOC Logs
	- Observability Pipelines envía logs al punto de conexión de ingesta de BYOC Logs. Defina la URL del clúster, como `http://byoc-logs.acme.internal:7280`. **Nota**: La URL debe incluir el puerto.
	- El Worker añade `/api/v2/logs` y `/api/v1/validate` a la URL del punto de conexión, por lo que estos puntos de conexión deben estar permitidos si utiliza reglas de reenvío o de firewall.
  - Almacenado como la variable de entorno: `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`.

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud {#health-metrics}

Para [métricas de componentes][7] y [métricas de búfer de destino][8] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][9]. Para filtrar o agrupar por métricas de destino de Datadog Logs, utilice la etiqueta `component_type:datadog_logs`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/byoc-logs/install/
[4]: /es/observability_pipelines/configuration/set_up_pipelines/
[5]: /es/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/