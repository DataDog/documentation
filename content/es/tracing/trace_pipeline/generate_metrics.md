---
title: Generar métricas personalizadas a partir de intervalos y trazas
description: 'Genera métricas personalizadas a partir de intervalos ingestados y trazas completas.'
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
      text: 'Utilice consultas de seguimiento avanzadas para crear métricas a partir de seguimientos específicos.'
    - link: 'tracing/metrics/metrics_namespace'
      tag: "Documentation"
      text: 'Supervise el 100 % del tráfico de sus aplicaciones con métricas de seguimiento.'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/spans_metric'
      tag: "External Site"
      text: 'Crear y administrar métricas en función de tramos con Terraform'
---

{{< img src="tracing/apm_lifecycle/span_based_metrics.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Métricas en función de tramos" >}}

Genere métricas personalizadas a partir de los intervalos ingestados para realizar un seguimiento de las tendencias, alimentar paneles de control y activar monitores, incluso para intervalos y trazas que no se conservan para el análisis completo de trazas.

Las métricas personalizadas se crean a partir de los intervalos ingresados por Datadog APM, independientemente de si un [filtro de retención][1] indexa esos intervalos. Extraiga valores numéricos de intervalos (como recuentos, duraciones o etiquetas personalizadas) o trazas (duración de la traza de extremo a extremo) y almacénalos como [métricas personalizadas][3] de larga duración con una retención de 15 meses.

**Notas:**
- Datadog genera automáticamente [métricas de rastreo][13] que capturan el recuento de solicitudes, las tasas de error y las distribuciones de latencia para el 100 % del tráfico de su aplicación.
- Los intervalos disponibles para la generación de métricas personalizadas dependen de [la configuración de control de ingestión de APM][12]. Los intervalos omitidos por el muestreo o el filtrado no pueden generar métricas.


Utilice métricas personalizadas de spans para:
- Visibilidad detallada de la latencia a nivel de intervalo, las tasas de error o el rendimiento a nivel de etiqueta.
- Alimentación de monitores [de anomalías][4] o [previsiones][7] con métricas de baja latencia y alta resolución.
- Extracción de señales clave para detectar tendencias o generar alertas sin conservar el intervalo completo.

#### Cuándo utilizar métricas personalizadas de trazas

Datadog te permite generar métricas a partir de [consultas de rastreo][15].

{{< callout url="https://help.datadoghq.com/hc/en-us/requests/new" header="¡Solicita acceso a la vista previa!" >}} Las métricas personalizadas de los rastreos están en vista previa. Para solicitar acceso, envíe un ticket al equipo de soporte técnico de APM y proporcione una breve descripción de su caso de uso. {{< /callout >}}

Utilice métricas personalizadas de trazas para:
- Métricas derivadas del contexto completo del rastreo, como la duración total del rastreo o las operaciones por rastreo.
- Alertas sobre condiciones que requieren un conocimiento completo del rastreo (por ejemplo, detección de consultas N+1 o patrones de fan-out).
- Extracción de señales clave para detectar tendencias o generar alertas sin conservar el rastro completo.

## Crear una métrica a partir de intervalos o trazas

{{< img src="tracing/span_to_metrics/createspantometrics.png" style="width:100%;" alt="Cómo crear una métrica" >}}

1. Vaya a [**APM** > **Generar métricas**][14].
2. Haz clic en **+New Metric** (+Nueva métrica).
3. Asigne un nombre a su métrica siguiendo la [convención de nomenclatura de métricas][11]. No se permiten nombres métricos que comiencen por « `trace.*` ».
4. Seleccione el tipo de métrica: **Spans** o **Traces**. Ambos utilizan la misma [sintaxis de consulta][10] que APM Search y Analytics.
5. Defina la consulta métrica para filtrar e incluir solo los intervalos o trazas que desea medir.
6. Elija el valor que desea agregar:
     - Seleccione « `*` » (Contar todos los intervalos o trazas coincidentes) para contar todos los intervalos o trazas coincidentes.
     - Introduzca un atributo numérico (por ejemplo, `@cassandra_row_count`) para agregar y realizar un seguimiento del recuento, el mínimo, el máximo, la suma o los percentiles.
7. Establecer dimensiones de agrupación. Por defecto, las métricas no tienen etiquetas a menos que las añadas. Utilice cualquier atributo o etiqueta span para crear etiquetas métricas.
8. Obtenga una vista previa del resultado para ver el impacto en tiempo real de su consulta a través de la visualización de datos y la coincidencia de intervalos o trazas en la vista previa en vivo.
9. Haz clic en **Create Metric**.

<div class="alert alert-danger"> Las métricas basadas en el span se consideran <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se facturan como tales. Evite agrupar atributos de cardinalidad ilimitada o extremadamente alta, como marcas de tiempo, ID de usuario, ID de solicitud o ID de sesión, para evitar que esto afecte a su facturación.</div>


## Actualizar las métricas existentes

{{< img src="tracing/span_to_metrics/editspantometrics.png" style="width:100%;" alt="Editar una métrica existente" >}}

Tras crear una métrica, solo se pueden actualizar dos campos:

| Campo                                  | Motivo                                                                                                                  |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Flujo (stream) filtro de consulta                    | Cambia el conjunto de tramos coincidentes que se agregarán en métricas.                                                         |
| Grupos de agregación                     | Actualiza las etiquetas para administrar la cardinalidad de los métricas generadas.                                                         |

\*\*NOTA:** Para cambiar el tipo o el nombre de la métrica, cree una nueva métrica y elimine la antigua.


## Disponibilidad de datos

Las métricas generadas a partir de los rastreos se emiten una vez que el rastreo ha finalizado. En el caso de los rastreos de larga duración, el retraso aumenta proporcionalmente (por ejemplo, la métrica de un rastreo de 45 minutos no se puede emitir hasta que finalice el rastreo).

Cuando utilice métricas personalizadas de trazas en monitores, tenga en cuenta esta latencia para evitar falsos positivos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



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
