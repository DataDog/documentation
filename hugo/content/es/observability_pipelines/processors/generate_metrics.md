---
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Generar métricas basadas en registros
---
{{< product-availability >}}

## Descripción general {#overview}

Se utilizan muchos tipos de registros para realizar un seguimiento de las tendencias, como los KPI, durante largos períodos de tiempo. Generar métricas a partir de sus registros es una forma rentable de resumir datos provenientes de registros de alto volumen, como los registros de CDN, registros de flujo de VPC, registros de firewall y registros de red. Utilice el procesador Generar métricas para generar métricas de conteo, gauge o distribución a partir de registros que coincidan con una consulta, y envíe las métricas a su destino.

**Nota**: Las métricas generadas a partir de registros y enviadas a Datadog son [Custom Metrics][1] y se facturan en consecuencia. Consulte [Custom Metrics Billing][2] para obtener más información.

## Configuración {#setup}

Para configurar el procesador:

Haga clic en {{< ui >}}Manage Metrics{{< /ui >}} para crear nuevas métricas o editar las existentes. Esto abre un panel lateral.

- Si aún no ha creado ninguna métrica, ingrese los parámetros de la métrica como se describe en la sección [Agregar una métrica](#add-a-metric) para crear una métrica.
- Si ya ha creado métricas, haga clic en la fila de la métrica en la tabla de resumen para editarla o eliminarla. Utilice la barra de búsqueda para encontrar una métrica específica por su nombre y, luego, seleccione la métrica para editarla o eliminarla. Haga clic en {{< ui >}}Add Metric{{< /ui >}} para agregar otra métrica.

### Agregar una métrica {#add-a-metric}

<div class="alert alert-warning">El procesador Generar métricas utiliza el <code>timestamp</code> campo en un registro para establecer la marca de tiempo de la métrica. Si el registro <code>timestamp</code> es un valor de cadena, se utiliza en su lugar el tiempo de procesamiento del registro. Consulte <a href="#convert-string-timestamp-to-timestamp-format">Convertir marca de tiempo de cadena a formato de marca de tiempo</a> para obtener más información.</div>

1. Ingrese una consulta de filtro. Consulte [Sintaxis de búsqueda de registros][5] para obtener más información. 
   - Solo se procesan los registros que coinciden con el filtro.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
   - **Nota**: Dado que un solo procesador puede generar múltiples métricas, puede definir una consulta de filtro diferente para cada métrica.
1. Ingrese un nombre para la métrica.
1. En la sección {{< ui >}}Define parameters{{< /ui >}}, seleccione el tipo de métrica (conteo, gauge o distribución). Consulte el [ejemplo de métrica de conteo](#count-metric-example) y el [ejemplo de métrica de distribución](#distribution-metric-example). Consulte también [Tipos de métricas](#metrics-types) para obtener más información.
    - Para los tipos de métricas gauge y distribución, seleccione un campo de registro que tenga un valor numérico (o una cadena numérica analizable) que se utilice para el valor de la métrica generada.
    - Para el tipo de métrica de distribución, el valor del campo de registro puede ser una matriz de valores numéricos (analizables), que se utiliza para el conjunto de muestras de la métrica generada.
    - El campo {{< ui >}}Group by{{< /ui >}} determina cómo se agrupan los valores de las métricas. Por ejemplo, si tiene cientos de servidores distribuidos en cuatro regiones, agrupar por región le permite graficar una línea para cada región. Los campos enumerados en la configuración {{< ui >}}Group by{{< /ui >}} se establecen como etiquetas en la métrica configurada.
1. Haga clic en {{< ui >}}Add Metric{{< /ui >}}.

### Configure un destino de métricas {#configure-a-metrics-destination}

{{< callout url="#" btn_hidden="true" header="¡Únase a la vista previa!">}}
El envío de métricas generadas a partir de registros al destino Splunk HEC, Elasticsearch o cliente HTTP/S se encuentra en versión preliminar. Comuníquese con su administrador de cuenta para solicitar acceso.
{{< /callout >}}

<div class="alert alert-info">La opción de enviar métricas generadas a un destino que no sea <a href="/observability_pipelines/destinations/datadog_metrics/">Datadog Metrics</a> está disponible para las versiones 2.18 y posteriores de Worker.<br><br>Si actualiza a la versión 2.18 o posterior de Worker para una canalización existente que ya tiene un procesador Generar métricas y desea seleccionar un destino que no sea Datadog Metrics, debe:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Eliminar el procesador Generar métricas anterior.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Agregar y configurar un nuevo procesador Generar métricas.</div>

{{< img src="observability_pipelines/processors/generate_metrics_destination.png" alt="El procesador Generar métricas con la selección de un destino resaltada." style="width:50%;" >}}

1. En el procesador Generar métricas, haga clic en **Add Metrics Destination**.<br>**Nota**: Si está utilizando Pipeline Simulation, regrese a la página de la canalización para configurar su destino de métricas. Haga clic en **Back to pipeline** en la esquina superior derecha de la página Pipeline Simulation.
1. [Datadog Metrics][6] es el destino predeterminado. Para seleccionar un destino diferente, haga clic en el icono de lápiz en el destino Datadog Metrics y seleccione **Change metrics destination**.
1. Seleccione su destino y siga las instrucciones de configuración para el [destino][7] específico.

## Tipos de métricas {#metrics-types}

Puede generar estos tipos de métricas para sus registros. Consulte la documentación de [Tipos de métricas][3] y [Distribuciones][4] para obtener más detalles.

| Tipo de métrica  | Descripción                                                                                                                                         | Ejemplo                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNT        | El número total de ocurrencias de eventos en un intervalo de tiempo. Se puede restablecer a cero, pero no se puede disminuir.                                          | Desea contar el número de registros con `status:error`.                                     |
| GAUGE        | Una instantánea de un valor en el momento en que se informa.                                                                                                   | Desea realizar un seguimiento de la última utilización de CPU por servidor.                                        |
| DISTRIBUTION | Valores sin procesar enviados a Datadog para que las agregaciones de percentiles (como p95, p99) se calculen en el servidor, globalmente en todos los servidores que informan la métrica. | Desea el p95 global de `response_time_seconds` en todos los servidores que sirven un punto de conexión de API. |

### Ejemplo de métrica de conteo {#count-metric-example}

Para este ejemplo de registro `status:error`:

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

Para crear una métrica de conteo que cuente el número de registros que contienen `"status":"error"` y los agrupe por `env` y `host`, ingrese la siguiente información:

| Parámetros de entrada | Valor               |
|------------------|---------------------|
| Consulta de filtro     | `@status:error`     |
| Nombre de la métrica      | `status_error_total`|
| Tipo de métrica      | Conteo               |
| Agrupar por         | `env`, `prod`       |

### Ejemplo de métrica de distribución {#distribution-metric-example}

Para este ejemplo de un registro de respuesta de API:

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

Para crear una métrica de distribución que mida el tiempo promedio que toma realizar una llamada a la API, ingrese la siguiente información:

| Parámetros de entrada       | Valor                   |
|------------------------|-------------------------|
| Consulta de filtro           | `@method`               |
| Nombre de la métrica            | `status_200_response`   |
| Tipo de métrica            | Distribución            |
| Seleccione un atributo de registro | `response_time_seconds` |
| Agrupar por               | `method`                |

## Convertir marca de tiempo de cadena a formato de marca de tiempo {#convert-string-timestamp-to-timestamp-format}

El procesador Generate Metrics solo puede usar el campo de registro `timestamp` para establecer la marca de tiempo de la métrica si el campo de registro es de tipo marca de tiempo. Si el campo `timestamp` es una cadena, se utiliza en su lugar la hora en que se procesa el registro. Para usar el registro `timestamp`, debe convertir la cadena a un tipo de marca de tiempo antes de enviar el registro al procesador Generar métricas.

Para convertir una cadena de marca de tiempo al formato de marca de tiempo:

1. Agregue un [Custom Processor][8] a su canalización antes del procesador Generar métricas.
1. Agregue una función con el siguiente script personalizado:
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][9] for more information.

## Métricas de salud {#health-metrics}

Para [métricas de componentes][10] y [métricas de búfer del procesador][11] emitidas por todos los procesadores, consulte la documentación de [métricas de uso de canalizaciones][12].

### Métricas del procesador Generar métricas {#generate-metrics-processor-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `generate_metrics` para las métricas de este procesador.

`pipelines.generated_metrics_from_logs_total`
: **Descripción**: La cantidad de métricas generadas a partir de eventos de registro por el procesador.
: **Tipo de métrica**: count

[1]: /es/metrics/custom_metrics/
[2]: /es/account_management/billing/custom_metrics/
[3]: /es/metrics/types/
[4]: /es/metrics/distributions/
[5]: /es/observability_pipelines/search_syntax/logs/
[6]: /es/observability_pipelines/destinations/datadog_metrics/
[7]: /es/observability_pipelines/destinations/?tab=metrics#destinations
[8]: /es/observability_pipelines/processors/custom_processor/#setup
[9]: /es/observability_pipelines/processors/custom_processor/#parse_timestamp
[10]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[12]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/