---
description: Aprenda a utilizar el procesador Reduce para agrupar varios eventos de
  registro en un solo registro según los campos y las estrategias de combinación especificados.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Reduce
---
{{< product-availability >}}

## Descripción general {#overview}

El procesador Reduce agrupa varios eventos de registro en un solo registro, según los campos especificados y las estrategias de combinación seleccionadas. Los registros se agrupan en intervalos de 10 segundos. Una vez transcurrido el intervalo para el grupo, el registro reducido para ese grupo se envía al siguiente paso en el Pipeline.

## Configuración {#setup}

Para configurar el procesador Reduce:
1. Defina un {{< ui >}}filter query{{< /ui >}}. Solo se procesan los registros que coinciden con la consulta de filtro especificada. Los registros reducidos y los registros que no coinciden con la consulta de filtro se envían al siguiente paso en el Pipeline. Consulte [Sintaxis de búsqueda][1] para obtener más información.
2. En la sección {{< ui >}}Group By{{< /ui >}}, ingrese el campo por el cual desea agrupar los registros.
3. Haga clic en {{< ui >}}Add Group by Field{{< /ui >}} para agregar campos adicionales.
4. En la sección {{< ui >}}Merge Strategy{{< /ui >}}:
   - En {{< ui >}}On Field{{< /ui >}}, ingrese el nombre del campo con el que desea combinar los registros.
   - Seleccione la estrategia de combinación en el menú desplegable {{< ui >}}Apply{{< /ui >}}. Esta es la estrategia utilizada para combinar eventos. Consulte la sección [Estrategias de combinación](#merge-strategies) para ver las descripciones de las estrategias disponibles.
   - Haga clic en {{< ui >}}Add Merge Strategy{{< /ui >}} para agregar estrategias adicionales.

### Estrategias de combinación {#merge-strategies}

Estas son las estrategias de combinación disponibles para combinar eventos de registro.


| Nombre           | Descripción                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Array          | Anexa cada valor a un array.                                                                                    |
| Concat         | Concatena cada valor de cadena, delimitado con un espacio.                                                            |
| Concat newline | Concatena cada valor de cadena, delimitado por un salto de línea.                                                          |
| Concat raw     | Concatena cada valor de cadena, sin un delimitador.                                                               |
| Discard        | Descarta todos los valores excepto el primer valor que se recibió.                                                      |
| Flat unique    | Crea un array aplanado de todos los valores únicos que se recibieron.                                                 |
| Longest array  | Conserva el array más largo que se recibió.                                                                         |
| Max            | Conserva el valor numérico máximo que se recibió.                                                                 |
| Min            | Conserva el valor numérico mínimo que se recibió.                                                                 |
| Retain         | Descarta todos los valores excepto el último valor recibido. Funciona como una forma de coalescer al no retener `null`. |
| Shortest array | Conserva el array más corto que se recibió.                                                                        |
| Sum            | Suma todos los valores numéricos que se recibieron.                                                                        |

## Métricas de salud {#health-metrics}

Para [métricas de componentes][2] y [métricas de búfer de procesador][3] emitidas por todos los procesadores, consulte la documentación de [métricas de uso de Pipelines][4].

### Reduce métricas {#reduce-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `reduce` para estas métricas.

`pipelines.stale_events_flushed_total`
: **Descripción**: El número de eventos obsoletos que el procesador ha vaciado.
: **Tipo de métrica**: count

[1]: /es/observability_pipelines/search_syntax/logs/
[2]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/