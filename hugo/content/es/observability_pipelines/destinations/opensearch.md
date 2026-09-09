---
description: Aprenda a enviar registros a OpenSearch utilizando Observability Pipelines
  Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de OpenSearch
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de OpenSearch de Observability Pipelines para enviar registros a OpenSearch.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese los identificadores para la URL del punto de conexión, el nombre de usuario y la contraseña de OpenSearch. <b>No</b> ingrese los valores reales.</div>

Configure el destino de OpenSearch cuando [configure una canalización][6]. Puede configurar una canalización en la [UI][1], utilizando la [API][7] o con [Terraform][8]. Los pasos en esta sección se configuran en la UI.

Después de seleccionar el destino de OpenSearch en la UI de la canalización:

1. Ingrese el identificador para la URL del punto de conexión de OpenSearch. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador para su nombre de usuario de OpenSearch. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador para su contraseña de OpenSearch. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. En el menú desplegable {{< ui >}}Mode{{< /ui >}}, seleccione {{< ui >}}Bulk{{< /ui >}} o {{< ui >}}Data streams{{< /ui >}}.
	- {{< ui >}}Bulk{{< /ui >}} modo
		- Utiliza la [Bulk API][4] de OpenSearch para enviar eventos por lotes directamente a un índice estándar.
		- Elija este modo cuando desee un control directo sobre la nomenclatura de índices y la gestión del ciclo de vida. Los datos se añaden al índice que especifique, y usted es responsable de gestionar los rollovers, las eliminaciones y los mappings.
		- Para configurar el modo {{< ui >}}Bulk{{< /ui >}}:
			- En el campo {{< ui >}}Index{{< /ui >}}, ingrese opcionalmente el nombre del índice de OpenSearch. Puede usar la [sintaxis de plantilla][3] para enrutar dinámicamente los registros a diferentes índices según campos específicos de sus registros, por ejemplo `logs-{{service}}`.
	- {{< ui >}}Data streams{{< /ui >}} modo
		- Uses  [OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} modo, defina opcionalmente el nombre del flujo de datos (el valor predeterminado es `logs-generic-default`) by entering the following information:
			- In the {{< ui >}}Type{{< /ui >}} campo, ingrese la categoría de los datos que se están ingiriendo, por ejemplo `logs`.
			- In the {{< ui >}}Dataset{{< /ui >}} campo, especifique el formato o la fuente de datos que describe la estructura, por ejemplo `apache`.
			- In the {{< ui >}}Namespace{{< /ui >}} campo, ingrese la agrupación para organizar sus flujos de datos, por ejemplo `production`.
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}, {{< ui >}}Dataset{{< /ui >}} y {{< ui >}}Namespace{{< /ui >}} campos para construir dinámicamente el nombre del flujo de datos basado en campos específicos de sus registros.
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Índice de OpenSearch {#opensearch-index}

Ingrese el nombre del índice de OpenSearch. Consulte la [sintaxis de plantilla][3] si desea enrutar registros a diferentes índices según campos específicos de sus registros.

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secreto {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de URL del punto de conexión de OpenSearch:
	- El identificador predeterminado es `DESTINATION_OPENSEARCH_ENDPOINT_URL`.
- Identificador de nombre de usuario de autenticación de OpenSearch:
	- El identificador predeterminado es `DESTINATION_OPENSEARCH_USERNAME`.
- Identificador de contraseña de autenticación de OpenSearch:
	- El identificador predeterminado es `DESTINATION_OPENSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud {#health-metrics}

Para [métricas de componente][9] y [métricas de búfer de destino][10] emitidas por todos los destinos, consulte la documentación de [Pipelines Usage Metrics][11]. Para filtrar o agrupar por métricas de destino de Elasticsearch, use la etiqueta `component_type:elasticsearch`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Procesamiento por lotes de eventos de destinos][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/destinations/#template-syntax
[4]: https://docs.opensearch.org/latest/api-reference/document-apis/bulk/
[5]: https://docs.opensearch.org/latest/im-plugin/data-streams/
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: /es/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/