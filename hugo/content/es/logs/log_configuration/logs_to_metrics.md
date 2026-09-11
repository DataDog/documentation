---
algolia:
  tags:
  - log metrics
  - generating logs from metrics
aliases:
- /es/logs/processing/logs_to_metrics/
- /es/logs/logs_to_metrics/
description: Genere métricas a partir de registros ingeridos.
further_reading:
- link: logs/log_configuration/processors
  tag: Documentación
  text: Aprenda a procesar sus registros
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilice consultas con notación CIDR para filtrar sus registros de tráfico
    de red
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: Centro de aprendizaje
  text: Seguimiento de registros para Alerting e investigaciones
title: Genere métricas a partir de registros ingeridos
---
## Descripción general {#overview}

<div class="alert alert-info">Las soluciones descritas en esta documentación son específicas para entornos de registro basados en la nube. Para generar métricas a partir de registros locales, consulte la documentación de <a href="https://docs.datadoghq.com/observability_pipelines/configuration/explore_templates#generate-metrics">Observability Pipelines</a>.</div>

[Logging without Limits][1]* de Datadog le permite decidir dinámicamente qué incluir o excluir de sus índices para almacenamiento y consulta, al mismo tiempo que muchos tipos de registros están destinados a ser utilizados como telemetría para realizar un seguimiento de tendencias, como los KPI, durante largos períodos de tiempo. Las métricas basadas en registros son una forma rentable de resumir los datos de registro de todo el flujo de ingesta. Esto significa que, incluso si utiliza [filtros de exclusión][2] para limitar lo que almacena para su exploración, aún puede visualizar tendencias y anomalías en todos sus datos de registro con una granularidad de 10 segundos durante 15 meses.

Con las métricas basadas en registros, puede generar una métrica de conteo de registros que coincidan con una consulta o una [métrica de distribución][3] de un valor numérico contenido en los registros, como la duración de la solicitud.

**Nota de facturación:** Las métricas creadas a partir de registros ingeridos se facturan como [Custom Metrics][4].

## Generar una métrica basada en registros {#generate-a-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Generar una métrica a partir de registros" style="width:80%;">}}

Para generar una nueva métrica basada en registros:

1. Navegue a la página [Generate Metrics][5].
1. Seleccione la pestaña {{< ui >}}Generate Metrics{{< /ui >}}.
1. Haga clic en {{< ui >}}+New Metric{{< /ui >}}.

También puede crear métricas desde una búsqueda de Analytics seleccionando la opción {{< ui >}}Generate new metric{{< /ui >}} del menú {{< ui >}}Export{{< /ui >}}.

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="Generar una métrica a partir de registros" style="width:80%;">}}

### Agregar una nueva métrica basada en registros {#add-a-new-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="Crear una métrica a partir de registros" style="width:80%;">}}

1. {{< ui >}}Input a query to filter the log stream{{< /ui >}}: Escriba la consulta utilizando la [Log Explorer search syntax][6]. Datadog evalúa la consulta de filtro de flujo contra el flujo de registros en el momento de la ingesta, no contra los registros indexados. El filtro no admite todas las funciones de búsqueda de Log Explorer, incluida la [búsqueda de texto completo][12] (`*:search_term`). Una consulta que devuelve resultados en Log Explorer aún puede no coincidir con ningún registro aquí. La agregación solo considera los registros ingeridos con una marca de tiempo dentro de los últimos 20 minutos. Excluya el índice de la consulta.

   Después de guardar la métrica, confirme que produce puntos de datos en el [Metrics Explorer][13] antes de confiar en ella. Si la consulta coincide con registros en Log Explorer pero la métrica permanece vacía, reescriba el término como una frase entre comillas; por ejemplo, `message:"Database operation failed."`.
2. {{< ui >}}Select the field you would like to track{{< /ui >}}: Seleccione `*` para generar un conteo de todos los registros que coincidan con su consulta o ingrese un atributo de registro (por ejemplo, `@network.bytes_written`) para agregar un valor numérico y crear sus correspondientes métricas agregadas `count`, `min`, `max`, `sum` y `avg`. Si la faceta del atributo de registro es una [medida][7], el valor de la métrica es el valor del atributo de registro.
3. {{< ui >}}Add dimensions to `group by`{{< /ui >}}: De forma predeterminada, las métricas generadas a partir de registros no tienen etiquetas a menos que se agreguen explícitamente. Cualquier atributo o dimensión de etiqueta que exista en sus registros (por ejemplo, `@network.bytes_written`, `env`) puede utilizarse para crear [etiquetas][8] de métrica. Los nombres de las etiquetas de métrica son iguales al nombre del atributo o etiqueta de origen, sin el `@`.
4. {{< ui >}}Add percentile aggregations{{< /ui >}}: Para las métricas de distribución, puede generar opcionalmente percentiles p50, p75, p90, p95 y p99. Las métricas de percentiles también se consideran [Custom Metrics] y [se facturan en consecuencia][9].
5. {{< ui >}}Name your metric{{< /ui >}}: Los nombres de las métricas basadas en registros deben seguir la [convención de nomenclatura de métricas personalizadas][10].

**Nota**: Datadog genera puntos de datos para las métricas basadas en registros en intervalos de 10 segundos. Cuando crea un [gráfico de tablero][11] para métricas basadas en registros, el parámetro `count unique` utiliza los valores dentro del intervalo de 10 segundos.

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="La página de configuración del gráfico de series temporales con el parámetro de consulta de conteo único resaltado" style="width:80%;">}}

<div class="alert alert-danger">Las métricas basadas en registros se consideran <a href="/metrics/custom_metrics/">[Custom Metrics]</a> y se facturan en consecuencia. Evite agrupar por atributos de cardinalidad ilimitada o extremadamente alta, como marcas de tiempo, ID de usuario, ID de solicitud o ID de sesión, para evitar afectar su facturación.</div>

### Actualizar una métrica basada en registros {#update-a-log-based-metric}

Una vez creada una métrica, se pueden actualizar los siguientes campos:

- Consulta de filtro de flujo: Para cambiar el conjunto de registros coincidentes que se agregarán en métricas
- Grupos de agregación: Para actualizar las etiquetas o administrar la cardinalidad de las métricas generadas
- Selección de percentiles: Marque o desmarque la casilla {{< ui >}}Calculate percentiles{{< /ui >}} para eliminar o generar métricas de percentil

Para cambiar el tipo o el nombre de la métrica, se debe crear una nueva métrica.

## Métricas de uso de registros {#logs-usage-metrics}

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Métricas de uso recomendadas" style="width:80%;">}}

Las métricas de uso son estimaciones de su uso actual de Datadog casi en tiempo real. Le permiten:

- Graficar su uso estimado.
- Crear monitores en torno a su uso estimado.
- Recibir alertas instantáneas sobre picos o caídas en su uso.
- Evaluar el impacto potencial de los cambios de código en su uso casi en tiempo real.

Las métricas de uso de Log Management vienen con tres etiquetas que se pueden usar para un monitoreo más granular:

| Etiqueta                     | Descripción                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | Indica la consulta de enrutamiento que hace coincidir un registro con un índice previsto.  |
|  `datadog_is_excluded`  | Indica si un registro coincide o no con una consulta de exclusión.            |
|  `service`              | El atributo de servicio del evento de registro.                               |

**Nota**: Los campos `datadog_is_excluded` y `datadog_index` pueden tener un valor de `N/A`. Esto indica que el o los registros fueron ingeridos, pero no coincidieron con ningún criterio de inclusión o exclusión para ser enrutados explícitamente a un índice.

Una etiqueta `status` adicional está disponible en la métrica `datadog.estimated_usage.logs.ingested_events` para reflejar el estado del registro (`info`, `warning`, etc.).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits es una marca comercial de Datadog, Inc.

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
[12]: /es/logs/explorer/search_syntax/#full-text-search
[13]: /es/metrics/explorer/