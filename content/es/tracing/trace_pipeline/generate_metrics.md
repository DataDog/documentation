---
title: Generar métricas personalizadas a partir de spans y trazas
description: 'Generar métricas personalizadas a partir de spans ingeridos y trazas completas.'
aliases:
- /tracing/span_to_metrics/
- /tracing/generate_metrics/
further_reading:
    - link: 'tracing/trace_pipeline'
      tag: "Documentation"
      text: 'Personaliza la ingesta de traza (trace) y conserva trazas (traces) importantes.'
    - link: 'tracing/trace_search_and_analytics/query_syntax'
      tag: "Documentation"
      text: 'Utiliza consultas y monitores de Analytics en función de las trazas retenidas.'
    - link: 'tracing/trace_explorer/trace_queries'
      tag: "Documentation"
      text: 'Usar consultas avanzadas de trazas para crear métricas a partir de trazas específicas'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: 'Monitorear el 100% del tráfico de tu aplicación con métricas de trazas'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Crear y administrar métricas en función de tramos con Terraform'
---

| ---------------------------------- | ----------------------------------- |

Generar métricas personalizadas a partir de spans ingeridos para rastrear tendencias, alimentar paneles de control y activar monitores, incluso para spans y trazas que no se retienen para un análisis completo de trazas.

Las métricas personalizadas se crean a partir de spans ingeridos por Datadog APM, independientemente de si un [filtro de retención][1] indexa esos spans. Extraer valores numéricos de spans (como conteos, duraciones o etiquetas personalizadas) o trazas (duración de la traza de extremo a extremo) y almacenarlos como [métricas personalizadas][3] de larga duración con retención de 15 meses.

**Notas:**
- Datadog genera automáticamente [Métricas de Trazas][13] que capturan conteos de solicitudes, tasas de error y distribuciones de latencia para el 100% del tráfico de tu aplicación.
- Los spans disponibles para la generación de métricas personalizadas dependen de tus [configuraciones de control de ingestión de APM][12]. Los spans descartados por muestreo o filtrado no pueden generar métricas.


Usar métricas personalizadas de spans para:
- Visibilidad detallada en latencia a nivel de span, tasas de error o rendimiento a nivel de etiqueta
- Potenciar monitores de [anomalía][4] o [pronóstico][7] con métricas de baja latencia y alta resolución.
- Extraer señales clave para tendencias o alertas sin retener el span completo.

#### Cuándo usar métricas personalizadas de trazas

Datadog te permite generar métricas a partir de [Consultas de trazas][15].

{{< llamada url="https://help.datadoghq.com/hc/en-us/requests/new" encabezado="¡Solicita acceso a la Vista Previa!" >}} Las métricas personalizadas de trazas están en Vista Previa. Para solicitar acceso, envía un ticket al equipo de Soporte de APM y proporciona una breve descripción de tu caso de uso. {{< /callout >}}

Usa métricas personalizadas de trazas para:
- Métricas derivadas del contexto completo de la traza, como la duración total de la traza o las operaciones por traza.
- Alertar sobre condiciones que requieren conocimiento completo de la traza (por ejemplo, detección de consultas N+1 o patrones de fan-out).
- Extraer señales clave para tendencias o alertas sin retener la traza completa.

## Crea una métrica a partir de spans o trazas

| ---------------------------------- | ----------------------------------- |

1. Navega a [**APM** > **Generar Métricas**][14].
2. Haz clic en \*\*+New Metric\** (+Nueva métrica).
3. Nombra tu métrica siguiendo la [convención de nombres de métricas][11]. No se permiten nombres de métricas que comiencen con `trace.*`.
4. Selecciona el tipo de métrica: **Spans** o **Trazas**. Ambos utilizan la misma [sintaxis de consulta][10] que APM Search y Analytics.
5. Define la consulta de métrica para filtrar e incluir solo los spans o trazas que deseas medir.
6. Elige el valor a agregar:
     - Selecciona `*` para contar todos los spans o trazas coincidentes.
     - Ingresa un atributo numérico (por ejemplo, `@cassandra_row_count`) para agregar y rastrear el conteo, mínimo, máximo, suma o percentiles.
7. Establece dimensiones de agrupamiento. Por defecto, las métricas no tienen etiquetas a menos que las agregues. Usa cualquier atributo o etiqueta de span para crear etiquetas de métricas.
8. Previsualiza el resultado para ver el impacto en tiempo real de tu consulta a través de la visualización de datos y los spans o trazas coincidentes en la vista previa en vivo.
9. Haz clic en \*\*Crear métrica\*\*.

<div class="alert alert-danger"> Las métricas basadas en spans se consideran <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se facturan en consecuencia. Evita agrupar por atributos de cardinalidad no acotada o extremadamente alta como marcas de tiempo, IDs de usuario, IDs de solicitud o IDs de sesión para evitar afectar tu facturación.</div>


## Actualizar métricas existentes

| ---------------------------------- | ----------------------------------- |

Tras crear una métrica, solo se pueden actualizar dos campos:

| Campo                                  | Motivo                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Flujo (stream) filtro de consulta                    | Cambia el conjunto de tramos coincidentes que se agregarán en métricas.                                                         |
| Grupos de agregación                     | Actualiza las etiquetas para administrar la cardinalidad de los métricas generadas.                                                         |

\*\*NOTA:** Para cambiar el tipo o nombre de la métrica, crea una nueva métrica y elimina la antigua.


## Disponibilidad de datos

Las métricas generadas a partir de trazas se emiten después de que una traza se completa. Para trazas de larga duración, el retraso aumenta en consecuencia (por ejemplo, la métrica de una traza de 45 minutos no se puede emitir hasta que se complete la traza).

Al usar métricas personalizadas de trazas en monitores, ten en cuenta esta latencia para evitar falsos positivos.

## Referencias adicionales

| ---------------------------------- | ----------------------------------- |


[1]: /tracing/trace_pipeline/trace_retention
[2]: /account_management/billing/custom_metrics/
[3]: https://docs.datadoghq.com/metrics/#overview
[4]: /monitors/types/anomaly/#overview
[5]: /tracing/trace_explorer/
[6]: /tracing/trace_explorer/query_syntax/#analytics-query
[7]: /monitors/types/forecasts/
[8]: https://app.datadoghq.com/apm/getting-started
[9]: https://app.datadoghq.com/apm/traces/generate-metrics
[10]: /tracing/trace_explorer/query_syntax/
[11]: /metrics/#naming-metrics
[12]: /tracing/trace_pipeline/ingestion_controls
[13]: /tracing/metrics/metrics_namespace/ 
[14]: https://app.datadoghq.com/apm/traces/generate-metrics
[15]: /tracing/trace_explorer/trace_queries
