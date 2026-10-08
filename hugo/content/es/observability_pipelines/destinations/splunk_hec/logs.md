---
aliases:
- /es/observability_pipelines/destinations/splunk_hec/
code_lang: logs
description: Aprenda a configurar el destino de Splunk HEC para registros en Observability
  Pipelines.
disable_toc: false
title: Destino Splunk HTTP Event Collector (HEC)
type: multi-code-lang
weight: 1
---
## Descripción general {#overview}

Utilice el destino Splunk HTTP Event Collector (HEC) de Observability Pipelines para enviar registros a Splunk HEC.

**Nota**: Observability Pipelines comprime los registros con el algoritmo gzip (nivel 6).

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese los identificadores para el token y el punto de conexión de Splunk HEC. <b>No</b> ingrese los valores reales.</div>

Configure el destino de Splunk HEC cuando [configure un pipeline][5]. Puede configurar un pipeline en la [UI][1], utilizando la [API][6] o con [Terraform][7]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Splunk HEC en la UI del pipeline:

1. Para el menú desplegable {{< ui >}}Token strategy{{< /ui >}}:
	- Solo seleccione {{< ui >}}From Source{{< /ui >}} si está utilizando una [fuente Splunk HEC][8] y ha habilitado {{< ui >}}Store HEC token{{< /ui >}} en la fuente. De lo contrario, ocurre un error y no puede proceder a instalar el Worker. Esta opción reenvía el token recibido por Observability Pipelines al destino de Splunk HEC.
	- Si utiliza la estrategia de token {{< ui >}}Custom{{< /ui >}} predeterminada, ingrese el identificador de su token. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador para su URL de punto de conexión. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Seleccione el {{< ui >}}Encoding{{< /ui >}} en el menú desplegable ({{< ui >}}JSON{{< /ui >}} o {{< ui >}}Raw{{< /ui >}}).
	- Si selecciona {{< ui >}}JSON{{< /ui >}}, opcionalmente haga clic en {{< ui >}}Add Field{{< /ui >}} para especificar campos a extraer como [campos indexados][4]. Splunk HTTP Event Collector indexa los campos especificados cuando ingiere los registros.
	- **Nota**: El {{< ui >}}Raw{{< /ui >}} [objetivo del punto de conexión](#endpoint-target) no admite {{< ui >}}Index Fields{{< /ui >}}.

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración opcional {#optional-settings}

#### Índice de Splunk {#splunk-index}

Ingrese el nombre del índice de Splunk en el que desea que estén sus datos. Este debe ser un índice permitido para su HEC. Consulte la [sintaxis de plantilla][3] si desea enrutar registros a diferentes índices según campos específicos en sus registros.

#### Destino del punto de conexión {#endpoint-target}

En el menú desplegable {{< ui >}}Endpoint Target{{< /ui >}}, seleccione el punto de conexión de Splunk HEC al que enviar los eventos:
- {{< ui >}}Event{{< /ui >}} (predeterminado): Envía eventos al punto de conexión HEC `/event` de Splunk, el cual admite marcas de tiempo autoextraídas y campos indexados.
- {{< ui >}}Raw{{< /ui >}}: Envía eventos al punto de conexión HEC `/raw` de Splunk.

#### Autoextraer marca de tiempo {#auto-extract-timestamp}

Seleccione si la marca de tiempo debe autoextraerse. Si se establece en `true`, Splunk extrae la marca de tiempo del mensaje con el formato esperado de `yyyy-mm-dd hh:mm:ss`.

**Nota**: El {{< ui >}}Raw{{< /ui >}} [destino del punto de conexión](#endpoint-target) no admite {{< ui >}}Auto-extract timestamp{{< /ui >}}.

#### anulación de tipo de fuente {#sourcetype-override}

Establezca el `sourcetype` para anular el valor predeterminado de Splunk, que es `httpevent` para datos HEC. Consulte la [sintaxis de plantilla][3] si desea enrutar registros a diferentes tipos de fuente según campos específicos en sus registros.

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

{{% observability_pipelines/splunk_hec_secrets %}}

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

## Solución de problemas {#troubleshooting}

### Errores 401 No autorizado {#401-unauthorized-errors}

{{% observability_pipelines/splunk_hec_unauthorized_error %}}

## Métricas de salud {#health-metrics}

Para [métricas de componentes][9] y [métricas de búfer de destino][10] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][11].

### Métricas de Splunk HEC {#splunk-hec-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `splunk_hec_logs` para métricas de Splunk HEC.

`pipelines.splunk_pending_acks`
: **Descripción**: La cantidad de confirmaciones de indexador de Splunk HEC pendientes que esperan una respuesta.
: **Tipo de métrica**: gauge

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Agrupamiento de eventos de destino][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/destinations/#template-syntax
[4]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/9.0/get-data-with-http-event-collector/automate-indexed-field-extractions-with-http-event-collector
[5]: /es/observability_pipelines/configuration/set_up_pipelines/
[6]: /es/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /es/observability_pipelines/sources/splunk_hec/
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/