---
description: Aprenda a enviar registros a Amazon OpenSearch utilizando Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Amazon OpenSearch
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Amazon OpenSearch de Observability Pipelines para enviar registros a Amazon OpenSearch.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese los identificadores para la URL del punto de conexión de Amazon OpenSearch y, si corresponde, el nombre de usuario y la contraseña. <b>No</b> ingrese los valores reales.</div>

Configure el destino de Amazon OpenSearch cuando [configure una canalización][6]. Puede configurar una canalización en la [interfaz de usuario][1], utilizando la [API][7] o con [Terraform][8]. Los pasos en esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Amazon OpenSearch en la interfaz de usuario de la canalización:

1. Ingrese el identificador para su URL de punto de conexión de Amazon OpenSearch. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. En el menú desplegable {{< ui >}}Mode{{< /ui >}}, seleccione {{< ui >}}Bulk{{< /ui >}} o {{< ui >}}Data streams{{< /ui >}}.
	- {{< ui >}}Bulk{{< /ui >}} modo
		- Utiliza la [Bulk API][4] de Amazon OpenSearch para enviar eventos por lotes directamente a un índice estándar.
		- Elija este modo cuando desee un control directo sobre la nomenclatura de índices y la gestión del ciclo de vida. Los datos se añaden al índice que especifique, y usted es responsable de manejar los rollovers, eliminaciones y mapeos.
		- Para configurar el modo {{< ui >}}Bulk{{< /ui >}}:
			- En el campo {{< ui >}}Index{{< /ui >}}, ingrese opcionalmente el nombre del índice de Amazon OpenSearch. Puede usar [template syntax][3] para enrutar dinámicamente los registros a diferentes índices según campos específicos en sus registros, por ejemplo `logs-{{service}}`.
	- {{< ui >}}Data streams{{< /ui >}} modo
		- Uses [Amazon OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want Amazon OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} modo, opcionalmente defina el nombre del flujo de datos (el predeterminado es `logs-generic-default`) by entering the following information:
			- In the {{< ui >}}Type{{< /ui >}} campo, ingrese la categoría de los datos que se están ingiriendo, por ejemplo `logs`.
			- In the {{< ui >}}Dataset{{< /ui >}} campo, especifique el formato o la fuente de datos que describe la estructura, por ejemplo `apache`.
			- In the {{< ui >}}Namespace{{< /ui >}} campo, ingrese la agrupación para organizar sus flujos de datos, por ejemplo `production`.
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}, {{< ui >}}Dataset{{< /ui >}} y {{< ui >}}Namespace{{< /ui >}} campos para construir dinámicamente el nombre del flujo de datos según campos específicos en sus registros.
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.
1. Opcionalmente, ingrese el nombre del índice de Amazon OpenSearch. Consulte [template syntax][3] si desea enrutar registros a diferentes índices según campos específicos en sus registros.
1. Seleccione una estrategia de autenticación, {{< ui >}}Basic{{< /ui >}} o {{< ui >}}AWS{{< /ui >}}. Si seleccionó:
	- {{< ui >}}Basic{{< /ui >}}:
		- Ingrese el identificador de su nombre de usuario de Amazon OpenSearch. Si lo deja en blanco, se usa el [predeterminado](#secret-defaults).
		- Ingrese el identificador de su contraseña de Amazon OpenSearch. Si lo deja en blanco, se usa el [predeterminado](#secret-defaults).
	- {{< ui >}}AWS{{< /ui >}}:
		1. Ingrese la región de AWS.
		1. (Opcional) Seleccione una opción de autenticación de AWS. La opción {{< ui >}}Assume role{{< /ui >}} solo debe usarse si el usuario o rol que creó anteriormente necesita asumir un rol diferente para acceder al recurso de AWS específico y ese permiso debe definirse explícitamente.<br>Si selecciona {{< ui >}}Assume role{{< /ui >}}:
			1. Ingrese el ARN del rol de IAM que desea asumir.
			1. Opcionalmente, ingrese el nombre de sesión del rol asumido y el ID externo.

{{% observability_pipelines/secrets_env_var_note %}}

#### Búfer opcional {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de URL del punto de conexión de Amazon OpenSearch:
	- El identificador predeterminado es `DESTINATION_AMAZON_OPENSEARCH_ENDPOINT_URL`.
- Identificador de nombre de usuario de autenticación de Amazon OpenSearch:
	- El identificador predeterminado es `DESTINATION_AMAZON_OPENSEARCH_USERNAME`.
- Identificador de contraseña de autenticación de Amazon OpenSearch:
	- El identificador predeterminado es `DESTINATION_AMAZON_OPENSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de estado {#health-metrics}

Para [métricas de componente][9] y [métricas de búfer de destino][10] emitidas por todos los destinos, consulte la documentación de [Pipelines Usage Metrics][11]. Para filtrar o agrupar por métricas de destino de Elasticsearch, use la etiqueta `component_type:elasticsearch`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se envía cuando se cumple uno de estos parámetros. Consulte [Procesamiento por lotes de eventos de destinos][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/destinations/#template-syntax
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/gsgupload-data.html
[5]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/data-streams.html
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: /es/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/