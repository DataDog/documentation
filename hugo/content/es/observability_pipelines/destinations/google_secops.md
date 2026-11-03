---
description: Aprenda a enviar registros a Google SecOps utilizando Observability Pipelines
  Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Google SecOps
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Google SecOps de Observability Pipelines para enviar registros a Google SecOps.

El Observability Pipelines Worker utiliza métodos de autenticación estándar de Google. Consulte [Authentication methods at Google][3] para obtener más información sobre cómo elegir el método de autenticación para su caso de uso.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese el identificador para la URL del punto de conexión de Google SecOps. <b>No</b> ingrese el valor real.</div>

Configure el destino de Google SecOps cuando [configure un pipeline][8]. Puede configurar un pipeline en la [UI][1], utilizando la [API][9] o con [Terraform][10]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Google SecOps en la UI del pipeline:

1. Ingrese el identificador para la URL de su punto de conexión de Google SecOps. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el ID de cliente para su instancia de Google SecOps.
1. Si tiene un archivo JSON de credenciales, ingrese la ruta a su archivo JSON de credenciales. El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. Alternativamente, puede usar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta de la credencial.
    - Si está utilizando [workload identity][6] en Google Kubernetes Engine (GKE), el `GOOGLE_APPLICATION_CREDENTIALS` se proporciona para usted.
    - El Worker utiliza los [Google authentication methods] estándar.
1. Seleccione la codificación {{< ui >}}JSON{{< /ui >}} o {{< ui >}}Raw{{< /ui >}} en el menú desplegable.
1. Ingrese el tipo de registro. Consulte la [sintaxis de plantilla][4] si desea enrutar registros a diferentes tipos de registro según campos específicos en sus registros.

{{% observability_pipelines/secrets_env_var_note %}}

### Almacenamiento en búfer opcional {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

**Nota**: Los registros enviados al destino de Google SecOps deben tener etiquetas de ingesta. Por ejemplo, si los registros provienen de un balanceador de carga A10, debe tener la etiqueta de ingesta `A10_LOAD_BALANCER`. Consulte [Support log types with a default parser][5] de Google Cloud para obtener una lista de los tipos de registro disponibles y sus respectivas etiquetas de ingesta.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de la URL del punto de conexión de Google Chronicle:
	- El identificador predeterminado es `DESTINATION_GOOGLE_CHRONICLE_UNSTRUCTURED_ENDPOINT_URL`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud {#health-metrics}

Para [component metrics][11] y [destination buffer metrics][12] emitidas por todos los destinos, consulte la documentación de [Pipelines Usage Metrics][13]. Para filtrar o agrupar por métricas de destino de Google SecOps, utilice la etiqueta `component_type:gcp_chronicle_unstructured`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 1                 | 15                  |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: https://cloud.google.com/docs/authentication#auth-flowchart
[4]: /es/observability_pipelines/destinations/#template-syntax
[5]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
[6]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[7]: https://cloud.google.com/docs/authentication#auth-flowchart
[8]: /es/observability_pipelines/configuration/set_up_pipelines/
[9]: /es/api/latest/observability-pipelines/
[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[11]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[12]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/