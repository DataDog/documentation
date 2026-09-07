---
description: Aprenda a enviar registros a Datadog Log Management usando el Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino Datadog Logs
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino Datadog Logs de Observability Pipelines para enviar registros a Datadog Log Management. También puede utilizar [AWS PrivateLink](#aws-privatelink) para enviar registros desde Observability Pipelines a Datadog.

## Configuración {#setup}

Configure el destino Datadog Logs cuando [configure una canalización][4]. Puede configurar una canalización en la [interfaz de usuario][1], utilizando la [API][5] o con [Terraform][6]. Los pasos de esta sección se configuran en la interfaz de usuario.

<div class="alert alert-info">Antes de enrutar los registros a través de Observability Pipelines, revise cualquier índice, canalización o filtro de exclusión que utilice el <code>datadog.pipelines:false</code> etiqueta. Para los registros de una fuente de Datadog Agent, el destino Datadog Logs establece <code>source_type</code> a <code>datadog_agent</code> (<code>@source_type:datadog_agent</code> en la búsqueda de registros). Datadog evalúa entonces esos registros como <code>datadog_agent</code> registros al decidir si aplicar el <code>datadog.pipelines:false</code> etiqueta. Para cambiar este comportamiento antes de que se entreguen los registros, utilice el <a href="/observability_pipelines/processors/edit_fields/">procesador Edit Fields</a> o el <a href="/observability_pipelines/processors/custom_processor/">Custom Processor</a> para eliminar el <code>source_type</code> atributo de los registros.</div>

### Configuración opcional {#optional-settings}

Después de seleccionar el destino Datadog Logs en la interfaz de usuario de la canalización, puede configurar estos ajustes opcionales.

#### Envíe registros a múltiples organizaciones de Datadog {#route-logs-to-multiple-datadog-organizations}

Puede enviar registros a múltiples organizaciones de Datadog. Una vez configurado el envío, puede [ver métricas para el componente o para organizaciones específicas](#view-metrics-for-the-component-or-specific-organizations) a las que está enviando registros.

**Nota**: Puede enviar registros a hasta 100 organizaciones de Datadog.

{{< img src="observability_pipelines/destinations/multi_dd_orgs.png" alt="El destino de Datadog Logs que muestra las organizaciones us1 y us3" style="width:45%;" >}}

Haga clic en {{< ui >}}Route to Multiple Organizations{{< /ui >}} para configurar el envío a múltiples organizaciones de Datadog.

- Si aún no ha agregado ninguna organización, ingrese los detalles de la organización como se describe en la sección [Agregar una organización de Datadog](#add-an-organization).
- Si ya ha agregado organizaciones, puede:
  - Haga clic en una organización en la tabla para editarla o eliminarla.
  - Utilice la barra de búsqueda para encontrar una organización específica por nombre, consulta de filtro o sitio de Datadog, y luego seleccione la organización para editarla o eliminarla.
  - [Ver métricas](#view-metrics-for-the-component-or-specific-organizations) de una organización.
  - Haga clic en {{< ui >}}Add organization{{< /ui >}} para enviar a otra organización de Datadog.

**Nota**: Si no configura el envío a múltiples organizaciones de Datadog, los registros se envían a la organización de Datadog predeterminada. Esta es la organización vinculada a la clave de API cuando instala el Worker.

#### Agregar una organización {#add-an-organization}

<div class="alert alert-warning">Los registros que no coinciden con ninguno de los filtros de organización se descartan. La <a href="#component-level-metrics">métrica del componente</a> <code>Data dropped (intentional)</code> muestra la cantidad de registros que no coinciden con los filtros y se descartan.</div>

1. Ingrese un nombre para la organización.
	- **Nota**: El nombre no tiene que corresponder al nombre real de la organización de Datadog.
1. Defina una consulta de filtro. Solo se envían a la organización los registros que coinciden con la consulta de filtro especificada. Consulte [Observability Pipelines Search Syntax][3] para obtener más información sobre cómo escribir consultas de filtro.
1. Seleccione el sitio de la organización de Datadog.
1. Ingrese el identificador de la clave de API para esa organización de Datadog.
	- **Nota**: Ingrese únicamente el identificador de la clave de API. **No** ingrese la clave de API real.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secretos {#secret-defaults}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores de secreto para este destino.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

<!-- vale Datadog.words_case_sensitive = NO -->
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}
<!-- vale Datadog.words_case_sensitive = YES -->

{{% /tab %}}
{{< /tabs >}}

## Ver métricas para el componente o para organizaciones específicas {#view-metrics-for-the-component-or-specific-organizations}

Puede ver las métricas a [nivel de componente](#component-level-metrics) o a [nivel de organización](#organization-level-metrics).

### Métricas a nivel de componente {#component-level-metrics}

Para ver las métricas del destino general de Datadog Logs:

1. Navegue a [Observability Pipelines][1].
1. Seleccione su canalización.
1. Haga clic en el engranaje del {{< ui >}}Datadog Logs{{< /ui >}} destino y seleccione {{< ui >}}View details{{< /ui >}}.

**Nota**: La métrica {{< ui >}}Data dropped (intentional){{< /ui >}} muestra los registros que no coincidieron con ninguno de los filtros de las organizaciones.

### Métricas a nivel de organización {#organization-level-metrics}

Para ver las métricas de una organización de Datadog específica:

1. Navegue a [Observability Pipelines][1].
1. Seleccione su canalización.
1. Haga clic en el destino {{< ui >}}Datadog Logs{{< /ui >}} para que aparezcan las organizaciones.
  {{< img src="observability_pipelines/destinations/multi_dd_orgs_highlighted.png" alt="El destino Datadog Logs que muestra las organizaciones us1 y us3 resaltadas" style="width:45%;" >}}
1. Haga clic en la organización de la que desea ver las métricas.
1. Haga clic en {{< ui >}}View Health Metrics{{< /ui >}}.

Alternativamente, haga clic en {{< ui >}}Review Configured Organizations{{< /ui >}} en el destino Datadog Logs. Luego, haga clic en el icono de gráfico en la columna {{< ui >}}Metrics{{< /ui >}} para la organización.

## Métricas de estado {#health-metrics}

Para [métricas de componentes][7] y [métricas de búfer de destino][8] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][9].

{{< site-region region="us,ap1,ap2,uk1" >}}

## AWS PrivateLink {#aws-privatelink}

Para enviar registros desde Observability Pipelines a Datadog mediante AWS PrivateLink, consulte [Conectarse a Datadog a través de AWS PrivateLink][1] para obtener instrucciones de configuración. Los dos puntos de conexión que debe configurar son:

- Registros (ingesta HTTP de usuario): {{< region-param key=http_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Nota**: El punto de conexión `obpipeline-intake.datadoghq.com` se utiliza para Live Capture y no está disponible como punto de conexión de PrivateLink.

[1]: /es/agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

<!-- vale Datadog.headings = NO -->
## Azure Private Link {#azure-private-link}
<!-- vale Datadog.headings = YES -->

Para enviar registros desde Observability Pipelines a Datadog mediante Azure Private Link, consulte [Connect to Datadog over Azure Private Link][1] para obtener instrucciones de configuración. Los dos puntos de conexión que debe configurar son:

- Registros (ingesta HTTP de usuario): `http-intake.logs.us3.datadoghq.com`
- Remote Configuration: `config.us3.datadoghq.com`

**Nota**: El punto de conexión `obpipeline-intake.datadoghq.com` se utiliza para Live Capture y no está disponible como punto de conexión de Private Link.

[1]: /es/agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

### Métricas de Datadog Logs {#datadog-logs-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `datadog_logs` para las métricas de destino de Datadog Logs.

`pipelines.datadog_logs_reserved_attribute_conflicts_total`
: **Descripción**: La cantidad de conflictos encontrados al reubicar campos con significado semántico a un [atributo reservado][10] de Datadog. Consulte el [ejemplo](#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute). Disponible en la versión 2.18 de Worker y posteriores.
: **Tipo de métrica**: cuenta

#### Ejemplo de reubicación de campos con significado semántico a un atributo reservado de Datadog {#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute}

La fuente OpenTelemetry decodifica el siguiente evento, donde `severity_text` se asigna semánticamente al atributo reservado `status`:

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "attributes": {
    "status": 404,
    "http.method": "GET"
  },
  "timestamp": "..."
}
```

Un procesador luego aplana el evento, de modo que `status` y `severity_text` existan ambos en el nivel superior:

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "status": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

Debido a que el atributo reservado `status` ya existe, el destino lo renombra a `_RESERVED_severity` para evitar que sea sobrescrito por el campo en conflicto:

```json
{
  "message": "GET /api/users returned 404",
  "status": "WARN",
  "_RESERVED_severity": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations event batching][2] para obtener más información.

| Eventos máximos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: /es/observability_pipelines/search_syntax/logs/
[4]: /es/observability_pipelines/configuration/set_up_pipelines/
[5]: /es/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[10]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes