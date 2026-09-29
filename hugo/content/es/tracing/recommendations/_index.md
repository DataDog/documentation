---
algolia:
  tags:
  - apm recommendations
  - apm recommendation
  - application performance monitoring
  - performance recommendations
  - reliability recommendations
  - tracing
description: Aprenda a optimizar el rendimiento y la confiabilidad de su aplicación
  con las recomendaciones de APM.
further_reading:
- link: /tracing/
  tag: Documentación
  text: Obtenga información sobre Application Performance Monitoring (APM)
- link: /tracing/guide/apm_dashboard/
  tag: Documentación
  text: Guía del Dashboard de APM
- link: /cloud_cost_management/recommendations/
  tag: Documentación
  text: Recomendaciones de Cloud Cost
- link: /database_monitoring/recommendations/
  tag: Documentación
  text: Recomendaciones de DBM
- link: https://www.datadoghq.com/blog/proactive-app-recommendations/
  tag: Blog
  text: Mejore el rendimiento y la confiabilidad con las recomendaciones proactivas
    de aplicaciones
- link: https://www.datadoghq.com/blog/apm-recommendations
  tag: Blog
  text: Mejore el rendimiento y la confiabilidad con las recomendaciones de APM
multifiltersearch:
  data:
  - category: Performance
    recommendation_description: Una aplicación de backend llama a la misma base de
      datos de forma secuencial en lugar de procesar las consultas por lotes.
    recommendation_prerequisite: APM
    recommendation_type: N+1 Queries on Database
    scope: Backend services
  - category: Performance
    recommendation_description: Una aplicación de backend realiza múltiples llamadas
      a la misma API descendente de forma secuencial en lugar de ejecutarlas en paralelo,
      lo que aumenta innecesariamente la latencia de las solicitudes y ralentiza el
      rendimiento general del servicio.
    recommendation_prerequisite: APM
    recommendation_type: Repeated Sequential API calls
    scope: Backend services
  - category: Performance
    recommendation_description: Una aplicación de backend emite un número excesivo
      de intentos de reintento al llamar a una API descendente, lo que prolonga la
      duración de la solicitud y arriesga fallas en cascada bajo presión.
    recommendation_prerequisite: APM
    recommendation_type: Persistent Retries
    scope: Backend services
  - category: Performance
    recommendation_description: El plan de ejecución de la consulta realiza escaneos
      secuenciales costosos. Cuando se detecta, Datadog recomienda usar un índice
      para acelerar la consulta.
    recommendation_prerequisite: APM + DBM
    recommendation_type: Missing index
    scope: Databases
  - category: Performance
    recommendation_description: Un servicio está realizando consultas de solo lectura
      a una instancia de base de datos principal cuando hay réplicas disponibles.
      Dirigir estas consultas a las réplicas puede reducir la carga principal y mejorar
      el rendimiento.
    recommendation_prerequisite: APM + DBM
    recommendation_type: Unbalanced Read Load
    scope: Databases
  - category: Reliability
    recommendation_description: Una aplicación de backend activa intentos de reintento
      rápidos sin un retroceso adecuado, manteniendo una alta presión sobre las dependencias
      con problemas y arriesgando interrupciones prolongadas al evitar la recuperación
      del sistema durante fallas transitorias.
    recommendation_prerequisite: APM
    recommendation_type: Aggressive Retries
    scope: Backend services
  - category: Reliability
    recommendation_description: Una aplicación de backend está generando una gran
      cantidad de excepciones como flujo de control, lo que añade una sobrecarga de
      CPU y memoria.
    recommendation_prerequisite: APM + Continuous Profiler
    recommendation_type: High Exception Volumes
    scope: Backend services
  - category: Reliability
    recommendation_description: Una aplicación de backend agota el tiempo de espera
      mientras llama a una dependencia descendente porque la dependencia responde
      demasiado lentamente, lo que provoca fallas en las solicitudes que afectan a
      los usuarios finales y aumenta el riesgo de fallas en cascada ascendentes.
    recommendation_prerequisite: APM + RUM
    recommendation_type: Dependency Timeouts
    scope: Backend services
  - category: Performance
    recommendation_description: Un servicio realiza un trabajo costoso y repetido
      en la ruta de solicitud que podría servirse desde una caché de corta duración,
      lo que reduce la latencia de cola y la carga descendente.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Missing Cache
    scope: Backend services
  - category: Performance
    recommendation_description: Un servicio presenta una latencia de cola extrema
      impulsada por tramos descendentes lentos en la ruta crítica, a menudo debido
      a una latencia de dependencia ilimitada o llamadas secuenciales que podrían
      ejecutarse simultáneamente.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Tail Latency
    scope: Backend services
  - category: Performance
    recommendation_description: Un servicio dedica una parte importante del tiempo
      de solicitud a tareas de serialización o parseo vinculadas a la CPU, lo que
      añade latencia y sobrecarga de CPU evitables.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Excessive Serialization
    scope: Backend services
  - category: Performance
    recommendation_description: Un servicio acepta parámetros de solicitud sin límites
      de tamaño o rango, lo que permite que las entradas de gran tamaño generen un
      trabajo descendente costoso, latencia de cola y tiempos de espera.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Unbounded Payload
    scope: Backend services
  - category: Performance
    recommendation_description: El manejo de solicitudes se serializa detrás de una
      primitiva de sincronización o una sección crítica de larga duración, lo que
      provoca latencia de cola bajo concurrencia.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Resource Contention
    scope: Backend services
  - category: Reliability
    recommendation_description: Un servicio agota repetidamente su grupo de conexiones
      a una dependencia descendente, lo que pone en cola las solicitudes y provoca
      picos de latencia o fallas bajo carga.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Connection Pool Exhaustion
    scope: Backend services
  - category: Reliability
    recommendation_description: Un servicio muestra resultados esperados como errores
      en APM, lo que infla las tasas de error de los puntos de conexión y oculta regresiones
      de confiabilidad reales.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Error Misclassification
    scope: Backend services
  headers:
  - filter_by: true
    id: category
    name: Categoría de recomendación
  - filter_by: true
    id: recommendation_type
    name: Tipo de recomendación
  - filter_by: true
    id: scope
    name: Alcance de la recomendación
  - id: recommendation_description
    name: Descripción de la recomendación
  - filter_by: true
    id: recommendation_prerequisite
    name: Requisito previo de la recomendación
site_support_id: apm_recommendations
title: Recomendaciones de APM
---
Las recomendaciones de APM le ayudan a mejorar el rendimiento y la confiabilidad de sus aplicaciones al mostrar oportunidades de optimización a partir de la telemetría recopilada. Estas recomendaciones están diseñadas para:

- Identificar y resolver cuellos de botella en el rendimiento
- Mejorar la confiabilidad y el tiempo de actividad del servicio
- Mejorar la experiencia del usuario final

{{< img src="/tracing/recommendations/apm_recommendations-3.png" alt="Página de recomendaciones de APM con tarjetas de resumen para problemas de confiabilidad y rendimiento y una lista de recomendaciones para revisar" style="width:100%;" >}}

{{< callout url="https://www.datadoghq.com/product-preview/apm-ai-recommendations/" header="¡Únase a la vista previa de recomendaciones de IA!" >}}
Ya están disponibles los tipos de recomendaciones impulsadas por IA, lo que amplía el conjunto de [oportunidades de optimización](?recommendation_prerequisite=APM+%2B+AI+Recs+%28Preview%29#supported-recommendations) que Datadog puede detectar.
{{< /callout >}}

## Requisitos previos {#prerequisites}

Ciertas recomendaciones dependen de productos específicos de Datadog. Use el menú desplegable {{< ui >}}Recommendation Prerequisite{{< /ui >}} para filtrar las recomendaciones por los productos de Datadog en su configuración.

Si planea usar [Bits Code][3] para implementar recomendaciones, debe [completar su configuración][4].

## Cómo funciona {#how-it-works}

Las recomendaciones se basan en datos recopilados de diferentes partes de su stack:

- Trazas distribuidas de Application Performance Monitoring (APM)
- Telemetría de base de datos de Database Monitoring (DBM)
- Sesiones y recorridos de usuario de Real User Monitoring (RUM)

Datadog correlaciona estas fuentes para identificar oportunidades de mejora en el rendimiento, la confiabilidad y la experiencia del usuario.

Datadog clasifica las recomendaciones calculando una puntuación de prioridad que pondera el impacto potencial de un problema frente a las señales de telemetría, como el volumen relativo de solicitudes y las tendencias de rendimiento. Las perspectivas más críticas para mejorar la confiabilidad y el rendimiento del servicio aparecen primero.

## Uso de recomendaciones {#using-recommendations}

Para revisar las recomendaciones que requieren su atención:

1. Vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Recommendations{{< /ui >}}][1].
2. Filtre sus recomendaciones por estado o tipo.
3. Seleccione una recomendación de la lista para ver una descripción detallada del problema.
4. Revise el problema, el impacto y la recomendación de Datadog para resolverlo.
5. (Opcional) Para usar [Bits Code][3] y generar una corrección de código, en {{< ui >}}Next Steps{{< /ui >}}, haga clic en {{< ui >}}Fix with Bits{{< /ui >}}.
6. (Opcional) Para realizar un seguimiento de la corrección en Jira o Work Management, en {{< ui >}}Triage{{< /ui >}}, haga clic en {{< ui >}}Add Jira Ticket{{< /ui >}} o {{< ui >}}Add Work Item{{< /ui >}}.

Después de revisar la recomendación, puede usar el menú desplegable {{< ui >}}FOR REVIEW{{< /ui >}} para cambiar el estado de la recomendación a {{< ui >}}REVIEWED{{< /ui >}}, {{< ui >}}IGNORED{{< /ui >}} o {{< ui >}}RESOLVED{{< /ui >}}.

**Nota**: En la [página de inicio de APM][5], las secciones {{< ui >}}Watchdog{{< /ui >}} y {{< ui >}}Error Tracking{{< /ui >}} también respetan el filtro de servicio seleccionado (o sus servicios personalizados cuando no hay ningún filtro establecido), lo que coincide con el alcance de las recomendaciones. Cuando se selecciona un servicio y no hay alertas o problemas que coincidan, la sección muestra un estado vacío con un botón {{< ui >}}Clear filter{{< /ui >}}, y el enlace {{< ui >}}View all{{< /ui >}} de Error Tracking está prefiltrado para ese servicio.

## Visualización de recomendaciones en un Dashboard {#viewing-recommendations-on-a-dashboard}

Agregue un widget de lista con APM Recommendations como fuente para revisar las recomendaciones junto con las métricas de rendimiento de su equipo.

{{< img src="tracing/recommendations/apm_recommendations_dashboard_widget.png" alt="Un widget de lista configurado con APM Recommendations como fuente, que muestra las recomendaciones por prioridad, servicio, resumen, problema y estado" style="width:100%;" >}}

1. En cualquier Dashboard, cree un widget y seleccione {{< ui >}}List{{< /ui >}} como visualización.
2. Seleccione {{< ui >}}APM Recommendations{{< /ui >}} como fuente de datos.
3. Filtre por entorno, servicio, equipo, tipo de recomendación y estado.

## Recomendaciones admitidas {#supported-recommendations}

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}}

**Nota**: Si utiliza tanto APM como Database Monitoring (DBM), es posible que vea menos recomendaciones de índices faltantes aquí que en la [página de recomendaciones de DBM][2]. Las recomendaciones de APM solo muestran problemas de índices faltantes que Datadog puede asociar con un servicio de aplicación instrumentado. Las recomendaciones de índices faltantes que no se pueden vincular a un servicio específico aparecen solo en DBM.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
[2]: /es/database_monitoring/recommendations/
[3]: /es/bits_ai/bits_code/
[4]: /es/bits_ai/bits_code/setup/
[5]: https://app.datadoghq.com/apm/home