---
aliases:
- /es/tracing/span_to_metrics/
- /es/tracing/generate_metrics/
description: Generar métricas personalizadas a partir de tramos (spans) consumidos.
further_reading:
- link: tracing/trace_pipeline
  tag: Documentación
  text: Personaliza el consumo de trazas (traces) y retén las trazas importantes.
- link: tracing/trace_search_and_analytics/query_syntax
  tag: Documentación
  text: Utiliza consultas y monitores de Analytics en función de las trazas (traces)
    retenidas.
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric
  tag: Sitio externo
  text: Crear y administrar métricas en función de tramos con Terraform
title: Generar métricas a partir de tramos
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Métricas en función de tramos" >}}

Generar métricas a partir del 100% de los tramos consumidos, independientemente de si los tramos están indexados por un [filtro de retención][1].

Utiliza métricas personalizadas para consultas y comparaciones fijas específicas, mientras creas filtros de retención para permitir consultas e investigaciones arbitrarias de la traza retenida y su gráfica de llamas.

**Nota sobre facturación:** Las métricas creadas a partir del consumo de tramos se facturan como [Métricas personalizadas][2].

Por ejemplo, es posible que desees utilizar métricas personalizadas para visualizar anomalías, crear paneles y monitores y ver las tendencias de cualquier parámetro que sea importante para el contexto de tu negocio. Todas las métricas generadas están disponibles durante 15 meses como [métricas personalizadas][3] de Datadog.

| Motivo                        | Métricas personalizadas generadas a partir de tramos                   | Filtros de retención                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- |
| Período de retención                     | 15 meses                    | 15 días             |
| Detección de anomalías                           | Crea un [Monitor de anomalías][4] en función de las métricas generadas.                            | Utiliza Analytics para comparar el comportamiento de los últimos 15 días y mira las trazas completas para investigar la causa raíz.                         |
| Investigación de trazas coincidentes con el contexto completo                          | N/A - Las métricas personalizadas no dan lugar a ninguna retención de trazas asociadas.                            | Conserva exactamente las trazas relevantes para tu contexto de negocio con los [filtros de retención][1].                            |
| Granularidad del comportamiento                           | Crea métricas personalizadas para endpoints importantes u otros grupos con baja cardinalidad.                        | Utiliza [Trace Explorer][5] para endpoints específicos o utiliza la opción "Agrupar por" en [Analytics][6].                    |
| Pronóstico o matemáticas complejas                          | Crea un [Monitor de pronóstico][7] en función de las métricas generadas.                          |   N/D                            |

Para generar métricas a partir de tramos, en la página [Instalación y configuración de APM][8], selecciona la pestaña [Generar métricas][9] y haz clic en el botón **New Metric** (Nueva métrica).

<br>

{{< img src="tracing/span_to_metrics/GenerateMetrics.png" style="width:100%;" alt="Generar métricas a partir de tramos consumidos" >}}


## Crear una métrica en función del tramo

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="Cómo crear una métrica" >}}

1. **Define la consulta métrica:** Empieza por añadir una consulta para filtrar el conjunto de datos que necesites. La [sintaxis de la consulta][10] es la misma que en el Buscador de APM y Analytics.

1. **Define el campo que deseas rastrear:** Selecciona `*` para generar un número de todos los tramos que coincidan con tu consulta o ingresa un atributo (por ejemplo, `@cassandra_row_count`) para agregar un valor numérico y crear su correspondiente número, mínimo, máximo, suma y promedio de métricas agregadas. Si el tipo de atributo es una medida, el valor de la métrica es el valor del atributo del tramo.

   **Nota**: los atributos de tramos que no sean valores numéricos no pueden utilizarse para la agregación. A fin de generar un métrica para contar los valores distintos de un atributo del tramo (por ejemplo, contar el número de ID de usuario que llegan a un endpoint específico), añade esta dimensión al selector `group by` y utiliza la función  `count_nonzero` para contar el número de valores de etiquetas (tags).

1. **Especifica la dimensión agrupar por:** Por defecto, los métricas generadas a partir de tramos no tendrán ninguna etiqueta, a menos que se añada en forma explícita. Cualquier atributo o etiqueta que exista en tus tramos puede utilizarse para crear etiquetas de métricas .

1. **Comprueba la vista previa de Analytics en vivo y Buscar la consulta:** Puedes ver el efecto de tu consulta en tiempo real en la visualización de datos y los tramos coincidentes considerados para tu consulta en una vista previa en vivo.

1. **Nomenclatura de tu métrica:** Los nombres de las métricas deben seguir la [convención de nomenclatura de métricas][11]. Los nombres de las métricas que empiecen con `trace.*` no están permitidos y no se guardarán.

<div class="alert alert-danger"> Las métricas en función de tramos se consideran <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se facturan en consecuencia. Evita agrupar por atributos no limitados o de cardinalidad extremadamente alta, como marcas de tiempo, ID de usuario, ID de solicitud o ID de sesión para no afectar tu facturación.</div>

## Actualizar métricas en función de tramos existentes

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Editar una métrica existente" >}}

Tras crear una métrica, solo se pueden actualizar dos campos:

| Campo                                 | Motivo                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Flujo (stream) filtro de consulta                  | Cambia el conjunto de tramos coincidentes que se agregarán en métricas.            |
| Grupos de agregación             | Actualiza las etiquetas para administrar la cardinalidad de los métricas generadas.                                                     |

**Nota**: Para cambiar el tipo o el nombre de la métrica, crea una nueva métrica y elimina la anterior.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_pipeline/trace_retention
[2]: /es/account_management/billing/custom_metrics/
[3]: https://docs.datadoghq.com/es/metrics/#overview
[4]: /es/monitors/types/anomaly/#overview
[5]: /es/tracing/trace_explorer/
[6]: /es/tracing/trace_explorer/query_syntax/#analytics-query
[7]: /es/monitors/types/forecasts/
[8]: https://app.datadoghq.com/apm/getting-started
[9]: https://app.datadoghq.com/apm/traces/generate-metrics
[10]: /es/tracing/trace_explorer/query_syntax/
[11]: /es/metrics/#naming-metrics
