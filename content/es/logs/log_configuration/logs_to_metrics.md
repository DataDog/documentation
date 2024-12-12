---
algolia:
  tags:
  - Métricas de logs
  - Generación de logs a partir de métricas
aliases:
- /es/logs/processing/logs_to_metrics/
- /es/logs/logs_to_metrics/
description: Genera métricas a partir de logs consumidos.
further_reading:
- link: logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Uso de consultas con notación de CIDR para filtrar tus logs de tráfico de
    red
title: Generar métricas a partir de logs consumidos
---

## Información general

Datadog [Logging without Limits][1]\* te permite decidir de forma dinámica qué incluir o excluir de tus índices para el almacenamiento y las consultas. Al mismo tiempo, muchos tipos de logs se utilizan en telemetrías como los KPI, para el seguimiento de tendencias durante largos periodos de tiempo. Las métricas basadas en logs son una forma rentable de resumir los datos de logs de todo el flujo (stream) de consumo. Esto significa que, incluso si utilizas [filtros de exclusión][2] para limitar lo que se almacena para la exploración, puedes seguir visualizando las tendencias y las anomalías de todos los datos de tus logs, con una granularidad de 10s durante 15 meses.

Con las métricas basadas en logs puedes generar una métrica de recuento de los logs que coinciden con una consulta o una [métrica de distribución][3] de un valor numérico contenido en los logs, como la duración de la solicitud.

**Nota de facturación:** las métricas creadas a partir de logs consumidos se facturan como [Métricas personalizadas][4].

## Generar una métrica basada en logs

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Generar logs para métricas" style="width:80%;">}}

Para generar una métrica basada en logs:

1. Ve a la página [Generar métricas][5].
1. Selecciona la pestaña **Generate Metrics** (Generar métricas).
1. Haz clic en **+New Metric** (+Nueva métrica).

También puedes crear métricas a partir de una búsqueda de Analytics, seleccionando la opción "Generate new metric" (Generar nueva métrica) del menú Export (Exportar).

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="Generar logs para métricas" style="width:80%;">}}

### Añadir una nueva métrica basada en logs

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="Crear logs para métricas" style="width:80%;">}}

1. **Introduce una consulta para filtrar el flujo de logs**: la sintaxis de la consulta es la misma que la de las [búsquedas del Explorador de logs][6]. Para la agregación, sólo se tienen en cuenta los logs con marcas de tiempo, consumidos en los últimos 20 minutos.
2. **Selecciona el campo del que quieres realizar el seguimiento**: selecciona `*` para generar un recuento de todos los logs que coinciden con tu consulta o introduce un atributo de log (por ejemplo, `@network.bytes_written`), para agregar un valor numérico y crear sus correspondientes métricas agregadas `count`, `min`, `max`, `sum` y `avg`. Si la faceta del atributo de log es una [medida][7], el valor de la métrica es el valor del atributo de log.
3. **Añade dimensiones a `group by`**: por defecto, las métricas generadas a partir de logs no tienen ninguna etiqueta (tags), a menos que se añadan explícitamente. Cualquier atributo o dimensión de etiqueta presente en tus logs (por ejemplo, `@network.bytes_written`, `env`) puede utilizarse para crear [etiquetas][8] de métricas. Los nombres de etiquetas de métricas son iguales al atributo o nombre de etiqueta de origen, sin el símbolo @.
4. **Añade agregaciones de percentiles**: para las métricas de distribución, también puedes generar los percentiles p50, p75, p90, p95 y p99. Las métricas de percentiles también se consideran métricas personalizadas y se [facturan en consecuencia][9].
5. **Ponle un nombre a tu métrica**: los nombres de los logs basados en métricas deben seguir la [convención de nomenclatura de métricas personalizadas][10].

**Nota**: Los puntos de datos para métricas basadas en logs se generan a intervalos de 10 segundos. Cuando creas un [gráfico de dashboard][11] para métricas basadas en logs, el parámetro `count unique` se basa en los valores del intervalo de 10 segundos.

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="Página de configuración del gráfico de series temporales con el parámetro de consulta de recuento único resaltado" style="width:80%;">}}

<div class="alert alert-warning">Las métricas basadas en logs se consideran <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se facturan en consecuencia. Evita agrupar por atributos no limitados o de cardinalidad extremadamente alta, como marcas de tiempo, ID de usuario, ID de solicitud o ID de sesión, para no afectar a tu facturación.</div>

### Actualizar una métrica basada en logs

Después de crear una métrica, se pueden actualizar los siguientes campos:

- Consulta del filtro de flujo: para cambiar el conjunto de logs coincidentes que se agregarán a las métricas
- Grupos de agregación: para actualizar las etiquetas o gestionar la cardinalidad de las métricas generadas
- Selección de percentiles: selecciona o deselecciona la casilla **Calculate percentiles** (Calcular percentiles) para eliminar o generar métricas de percentiles

Para cambiar el tipo o el nombre de la métrica, debe crearse una nueva métrica.

## Métricas del uso de logs

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Métricas de uso recomendadas" style="width:80%;">}}

Las métricas de uso son estimaciones de tu uso actual de Datadog casi en tiempo real y te permiten:

- Presentar de forma gráfica tu uso estimado.
- Crear monitores de tu uso estimado.
- Recibir alertas instantáneas sobre picos o caídas en tu uso.
- Evaluar el impacto potencial de los cambios de código en tu uso casi en tiempo real.

Las métricas de uso de Log Management vienen con tres etiquetas que se pueden utilizar para una monitorización más específica:

| Etiqueta                     | Descripción                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | Indica la consulta de enrutamiento que empareja un log con un índice previsto.  |
|  `datadog_is_excluded`  | Indica si un log coincide o no con una consulta de exclusión.            |
|  `service`              | El atributo servicio del evento de log.                               |

Existe una etiqueta `status` adicional disponible en la métrica `datadog.estimated_usage.logs.ingested_events` para reflejar el estado del log (`info`, `warning`, etc.).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/
[2]: /es/logs/indexes/#exclusion-filters
[3]: /es/metrics/distributions/#overview
[4]: /es/metrics/custom_metrics/
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /es/logs/search_syntax/
[7]: /es/logs/explorer/facets/#quantitative-facets-measures
[8]: /es/getting_started/tagging/
[9]: /es/account_management/billing/custom_metrics/?tab=countrategauge
[10]: /es/metrics/custom_metrics/#naming-custom-metrics
[11]: /es/dashboards/querying/