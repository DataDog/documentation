---
description: Aprenda a enviar registros a un Sumo Logic Hosted Collector utilizando
  el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Sumo Logic Hosted Collector
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino Sumo Logic de Observability Pipelines para enviar registros a su Sumo Logic Hosted Collector.

## Configuración {#setup}

<div class="alert alert-danger">Para la administración de secretos: solo ingrese el identificador para la URL del punto de conexión. <b>No</b> ingrese el valor real.</div>

Configure el destino de Sumo Logic cuando [configure un pipeline][3]. Puede configurar un pipeline en la [UI][1], utilizando la [API][4] o con [Terraform][5]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Sumo Logic en la interfaz de usuario del pipeline, ingrese el identificador para la URL de su punto de conexión. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

1. En el menú desplegable {{< ui >}}Encoding{{< /ui >}}, seleccione si desea codificar la salida de su pipeline en texto `JSON`, `Logfmt` o `Raw`. Si no se selecciona ninguna decodificación, la decodificación predeterminada es JSON.
1. Ingrese un {{< ui >}}source name{{< /ui >}} para anular el valor `name` predeterminado configurado para la fuente de su Sumo Logic Hosted Collector.
1. Ingrese un {{< ui >}}host name{{< /ui >}} para anular el valor `host` predeterminado configurado para la fuente de su Sumo Logic Hosted Collector.
1. Ingrese un {{< ui >}}category name{{< /ui >}} para anular el valor `category` predeterminado configurado para la fuente de su Sumo Logic Hosted Collector.
1. Haga clic en {{< ui >}}Add Header{{< /ui >}} para agregar campos y valores de encabezado personalizados.

#### Opciones de almacenamiento en búfer {#buffering-options}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de la URL del Sumo Logic HTTP Collector:
	- Hace referencia al punto de conexión de la fuente HTTP de Sumo Logic. El Observability Pipelines Worker envía los registros procesados a este punto de conexión. Por ejemplo, `https://<ENDPOINT>.collection.sumologic.com/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>`, donde:
        - `<ENDPOINT>` es su punto de conexión de recopilación de Sumo.
        - `<UNIQUE_HTTP_COLLECTOR_CODE>` es la cadena que sigue a la última barra diagonal (`/`) en la URL de carga para la fuente HTTP.
	- El identificador predeterminado es `DESTINATION_SUMO_LOGIC_HTTP_COLLECTOR_URL`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

## Métricas de salud {#health-metrics}

Para [métricas de componentes][6] y [métricas de búfer de destino][7] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][8]. Para filtrar o agrupar por métricas de destino de Sumo Logic, utilice la etiqueta `component_type:sumo_logic`.

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/