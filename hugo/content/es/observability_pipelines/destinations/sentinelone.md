---
description: Aprenda a enviar registros a SentinelOne usando el Observability Pipelines
  Worker.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-sentinelone/
  tag: Blog
  text: Optimice los registros EDR y diríjalos a SentinelOne con Observability Pipelines.
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de SentinelOne
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de SentinelOne de Observability Pipelines para enviar registros a SentinelOne.

## Configuración {#setup}

<div class="alert alert-danger">Para la administración de secretos: solo ingrese el identificador del token. <b>No</b> ingrese el valor real.</div>

Configure el destino de SentinelOne cuando [configure a pipeline][4]. Puede configurar una canalización en la [interfaz de usuario][1], utilizando la [API][5] o con [Terraform][6]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de SentinelOne en la UI del pipeline:

1. Ingrese el identificador de su token. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione su entorno de registros de SentinelOne en el menú desplegable.

{{% observability_pipelines/secrets_env_var_note %}}

### Almacenamiento en búfer opcional {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador del token de acceso de escritura de SentinelOne:
	- El identificador predeterminado es `DESTINATION_SENTINEL_ONE_TOKEN`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}

## Ver registros en un clúster de SentinelOne {#view-logs-in-a-sentinelone-cluster}

Después de configurar el pipeline para enviar registros al destino de SentinelOne, puede ver los registros en un clúster de SentinelOne:

1. Inicie sesión en la [consola de S1][2].
2. Navegue a la página de Singularity Data Lake (SDL) {{< ui >}}Search{{< /ui >}}. Para acceder a ella desde la consola, haga clic en {{< ui >}}Visibility{{< /ui >}} en el menú de la izquierda para ir a SDL y asegúrese de estar en la pestaña {{< ui >}}Search{{< /ui >}}.
3. Asegúrese de que el filtro junto a la barra de búsqueda esté configurado en {{< ui >}}All Data{{< /ui >}}.
4. Esta página muestra los registros que envió desde Observability Pipelines a SentinelOne.

## Métricas de salud {#health-metrics}

Para [métricas de componentes][7] y [métricas de búfer de destino][8] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][9]. Para filtrar o agrupar por métricas de destino de Splunk HEC, utilice la etiqueta `component_type:splunk_hec_logs`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][3] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 1                 | 1                   |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://usea1-partners.sentinelone.net/login
[3]: /es/observability_pipelines/destinations/#event-batching
[4]: /es/observability_pipelines/configuration/set_up_pipelines/
[5]: /es/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/