---
aliases:
- /es/tracing/span_to_metrics/
- /es/tracing/generate_metrics/
description: Genera métricas personalizadas a partir de tramos ingestados y trazas
  completas.
further_reading:
- link: tracing/trace_pipeline
  tag: Documentación
  text: Personalizar la ingesta de trazas y retener trazas importantes
- link: tracing/trace_search_and_analytics/query_syntax
  tag: Documentación
  text: Utilizar consultas y monitores de Analytics en función de las trazas retenidas
- link: tracing/trace_explorer/trace_queries
  tag: Documentación
  text: Utilizar las consultas avanzadas de trazas para crear métricas a partir de
    trazas específicas
- link: tracing/metrics/metrics_namespace
  tag: Documentación
  text: Monitorizar el 100 % del tráfico de tu aplicación con métricas de trazas
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric
  tag: Sitio externo
  text: Crear y administrar métricas en función de tramos con Terraform
title: Generar métricas personalizadas a partir de tramos y trazas
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Métricas en función de tramos" >}}

Genera métricas personalizadas a partir de los tramos ingestados para realizar un seguimiento de las tendencias, alimentar dashboards y activar los monitores, incluso para los tramos y las trazas que no se conservan para el análisis completo de la traza.

Las métricas personalizadas se crean a partir de tramos ingestados por Datadog APM, independientemente de si un [filtro de retención][1] indexa esos tramos. Extrae valores numéricos de los tramos (como recuentos, duraciones o etiquetas personalizadas) o trazas (duración de extremo a extremo de la traza) y los almacena como [métricas personalizadas][3] de larga duración con una retención de 15 meses.

**Notas:**
- Datadog genera automáticamente [Métricas de trazas][13] que capturan recuentos de solicitudes, tasas de error y distribuciones de latencia para el 100 % del tráfico de tu aplicación.
- Los tramos disponibles para la generación de métricas personalizadas dependen de tus [ajustes de control de ingesta de APM][12]. Los tramos eliminados por muestreo o filtrado no pueden generar métricas.


Utiliza métricas personalizadas de tramos para:
- Visibilidad detallada de la latencia a nivel de tramo, las tasas de error o el rendimiento a nivel de etiqueta.
- Alimentación de monitores de [anomalías][4] o [previsiones][7] con métricas de baja latencia y alta resolución.
- Extracción de señales clave para tendencias o alertas sin conservar la totalidad del tramo.

#### Cuándo utilizar métricas personalizadas a partir de trazas

Datadog permite generar métricas a partir de [consultas de trazas][15].

Utiliza métricas personalizadas a partir de trazas para:
- Métricas derivadas del contexto completo de la traza, como la duración total de la traza o las operaciones por traza.
- Alerta sobre condiciones que requieren un conocimiento completo de la traza (por ejemplo, detección de consultas N+1 o patrones de fan-out).
- Extracción de señales clave para tendencias o alertas sin conservar la totalidad de la traza.

## Crear una métrica a partir de tramos o trazas

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="Cómo crear una métrica" >}}

1. Ve a [**APM** > **Generate Metrics**][14] (Generar métricas).
2. Haz clic en **New Metric** (Nueva métrica).
3. Nombra tu métrica siguiendo la [convención de nombres de métricas][11]. No se permiten nombres de métricas que empiecen por `trace.*`.
4. Selecciona el tipo de métrica: **Spans** (Tramos) o **Traces** (Trazas). Ambos utilizan la misma [sintaxis de consulta][10] que APM Search and Analytics.
5. Define la consulta de métrica para filtrar e incluir solo los tramos o trazas que desees medir.
6. Elige el valor a agregar:
     - Selecciona `*` para contar todos los tramos o trazas coincidentes.
     - Introduce un atributo numérico (por ejemplo, `@cassandra_row_count`) para agregar y realizar un seguimiento del recuento, el mínimo, el máximo, la suma o los percentiles.
7. Establecer dimensiones de agrupación. Por defecto, las métricas no tienen etiquetas a menos que las añadas. Utiliza cualquier atributo o etiqueta de tramo para crear etiquetas de métrica.
8. Obtén una vista previa del resultado para ver el impacto en tiempo real de tu consulta a través de la visualización de datos y la coincidencia de tramos o trazas en la vista previa en directo.
9. Haz clic en **Crear métrica**.

<div class="alert alert-danger"> Las métricas basadas en tramos se consideran <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se facturan en consecuencia. Evita agrupar por atributos no limitados o de cardinalidad extremadamente alta, como marcas de tiempo, ID de usuario, ID de solicitud o ID de sesión, para no afectar a tu facturación.</div>


## Actualizar las métricas existentes

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Editar una métrica existente" >}}

Tras crear una métrica, solo se pueden actualizar dos campos:

| Campo                                  | Motivo                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Flujo (stream) filtro de consulta                    | Cambia el conjunto de tramos coincidentes que se agregarán en métricas.                                                         |
| Grupos de agregación                     | Actualiza las etiquetas para administrar la cardinalidad de los métricas generadas.                                                         |

**Nota**: Para cambiar el tipo o el nombre de la métrica, crea una nueva métrica y elimina la anterior.


## Disponibilidad de datos

Las métricas generadas a partir de las trazas se emiten cuando finaliza una traza. En el caso de las trazas de larga duración, el retraso aumenta en consecuencia (por ejemplo, una métrica de traza de 45 minutos no puede emitirse hasta la finalización de la traza).

Cuando utilices métricas personalizadas a partir de trazas en monitores, ten en cuenta esta latencia para evitar falsos positivos.

## Referencias adicionales

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
[12]: /es/tracing/trace_pipeline/ingestion_controls
[13]: /es/tracing/metrics/metrics_namespace/ 
[14]: https://app.datadoghq.com/apm/traces/generate-metrics
[15]: /es/tracing/trace_explorer/trace_queries