---
algolia:
  tags:
  - log metrics
  - generating logs from metrics
aliases:
- /es/logs/processing/logs_to_metrics/
- /es/logs/logs_to_metrics/
description: Generar métricas a partir de registros ingeridos.
further_reading:
- link: logs/log_configuration/processors
  tag: Documentación
  text: Aprenda cómo procesar sus registros
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilice consultas en notación CIDR para filtrar los registros de tráfico de
    su red
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: Centro de Aprendizaje
  text: Rastree registros para alertas e investigaciones
title: Generar métricas a partir de registros ingeridos.
---
## Resumen {#overview}

<div class="alert alert-info">Las soluciones descritas en esta documentación son específicas para entornos de registro basados en la nube. Para generar métricas a partir de registros locales, consulte la documentación de <a href="https://docs.datadoghq.com/observability_pipelines/configuration/explore_templates#generate-metrics">Observability Pipelines</a>.</div>

El [Logging without Limits][1]* de Datadog le permite decidir dinámicamente qué incluir o excluir de sus índices para almacenamiento y consulta, al mismo tiempo que muchos tipos de registros están destinados a ser utilizados para telemetría para rastrear tendencias, como KPIs, durante largos períodos de tiempo. Las métricas basadas en registros son una forma rentable de resumir los datos de registro de toda la corriente de ingestión. Esto significa que, incluso si utiliza [filtros de exclusión][2] para limitar lo que almacena para la exploración, aún puede visualizar tendencias y anomalías en todos sus datos de registro con una granularidad de 10s durante 15 meses.

Con métricas basadas en registros, puede generar una métrica de conteo de registros que coincidan con una consulta o una [métrica de distribución][3] de un valor numérico contenido en los registros, como la duración de la solicitud.

**Nota de Facturación:** Las métricas creadas a partir de registros ingeridos se facturan como [Custom Metrics][4].

## Genere una métrica basada en registros {#generate-a-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Convierta registros en una métrica." style="width:80%;">}}

Para generar una nueva métrica basada en registros:

1. Navegue a la página de [Generate Metrics][5].
1. Seleccione la pestaña **Generate Metrics**.
1. Haga clic en **+New Metric**.

También puede crear métricas a partir de una búsqueda de Analytics seleccionando la opción "Generate new metric" en el menú de Exportar.

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="Convierta registros en una métrica." style="width:80%;">}}

### Agregue una nueva métrica basada en registros {#add-a-new-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="Convierta registros en una métrica." style="width:80%;">}}

1. **Ingrese una consulta para filtrar el flujo de registros**: La sintaxis de la consulta es la misma que para la [Log Explorer Search][6]. Solo se consideran para la agregación los logs ingeridos con una marca de tiempo dentro de los últimos 20 minutos. El índice debe ser excluido de la consulta.
2. **Seleccione el campo que desea rastrear**: Seleccione `*` para generar un conteo de todos los registros que coincidan con su consulta o ingrese un atributo de registro (por ejemplo, `@network.bytes_written`) para agregar un valor numérico y crear sus correspondientes `count`, `min`, `max`, `sum` y `avg` métricas agregadas. Si la faceta de atributo de registro es una [medida][7], el valor de la métrica es el valor del atributo de registro.
3. **Agrega dimensiones a `group by`**: Por defecto, las métricas generadas a partir de logs no tienen etiquetas a menos que se agreguen explícitamente. Cualquier atributo o dimensión de etiqueta que exista en tus logs (por ejemplo, `@network.bytes_written`, `env`) puede ser utilizado para crear etiquetas de métrica [tags][8]. Los nombres de las etiquetas de métrica son iguales al nombre del atributo o etiqueta de origen, sin el @.
4. **Agregue agregaciones percentiles**: Para métricas de distribución, puede generar opcionalmente percentiles p50, p75, p90, p95 y p99. Las métricas percentiles también se consideran [Custom Metrics], y se facturan en consecuencia.
5. **Nombre su métrica**: Los nombres de las métricas basadas en logs deben seguir la [custom metric naming convention][10].

**Nota**: Los puntos de datos para métricas basadas en logs se generan en intervalos de 10 segundos. Cuando crea un [dashboard graph][11] para métricas basadas en logs, el parámetro `count unique` se basa en los valores dentro del intervalo de 10 segundos.

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="La página de configuración del gráfico de series temporales con el parámetro de consulta único resaltado." style="width:80%;">}}

<div class="alert alert-danger">Las métricas basadas en logs se consideran <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se facturan en consecuencia. Evite agrupar por atributos de cardinalidad no acotada o extremadamente alta, como marcas de tiempo, identificaciones de usuario, identificaciones de solicitud o identificaciones de sesión para evitar afectar su facturación.</div>

### Actualiza una métrica basada en logs {#update-a-log-based-metric}

Después de que se crea una métrica, se pueden actualizar los siguientes campos:

- Consulta de filtro de flujo: Para cambiar el conjunto de registros coincidentes que se agregarán a las métricas
- Grupos de agregación: Para actualizar las etiquetas o gestionar la cardinalidad de las métricas generadas
- Selección de percentiles: Marque o desmarque la casilla **Calcular percentiles** para eliminar o generar métricas de percentiles

Para cambiar el tipo o nombre de la métrica, se debe crear una nueva métrica.

## Métricas de uso de registros {#logs-usage-metrics}

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Métricas de uso recomendadas" style="width:80%;">}}

Las métricas de uso son estimaciones de su uso actual de Datadog en casi tiempo real. Le permiten:

- Grafique su uso estimado.
- Cree monitores en torno a su uso estimado.
- Reciba alertas instantáneas sobre picos o caídas en su uso.
- Evalúe el impacto potencial de los cambios de código en su uso en casi tiempo real.

Las métricas de uso de Log Management vienen con tres etiquetas que se pueden utilizar para un monitoreo más granular:

| Etiqueta                     | Descripción                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | Indica la consulta de enrutamiento que coincide un registro con un índice previsto.  |
|  `datadog_is_excluded`  | Indica si un registro coincide o no con una consulta de exclusión.            |
|  `service`              | El atributo de servicio del registro de evento.                               |

**Nota**: Los campos `datadog_is_excluded` y `datadog_index` pueden tener un valor de `N/A`. Esto indica que los registros fueron ingeridos, pero no coincidieron con ningún criterio de inclusión o exclusión que permitiera asignarlos explícitamente a un índice.

Una etiqueta adicional `status` está disponible en la métrica `datadog.estimated_usage.logs.ingested_events` para reflejar el estado del registro (`info`, `warning`, etc.).

## Lectura adicional {#further-reading}

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