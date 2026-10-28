---
description: Revise e implemente las optimizaciones de consultas de base de datos
  identificadas por Bits AI.
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/query_metrics/
  tag: Documentación
  text: Exploración de métricas de consultas
- link: /database_monitoring/connect_dbm_and_apm/
  tag: Documentación
  text: Correlacione Database Monitoring y las trazas
- link: https://www.datadoghq.com/blog/how-bits-database-optimization-proves-a-query-rewrite-is-faster/
  tag: Blog
  text: Cómo Bits Database Optimization demuestra que una reescritura de consulta
    es más rápida
title: Bits Database Optimization
---
<div class="alert alert-info">Bits Database Optimization solo está disponible para PostgreSQL y MySQL. Para solicitar soporte para otro sistema de gestión de bases de datos, comuníquese con su representante de Datadog o con <a href="/help/">Datadog Support</a>.</div>

## Descripción general {#overview}

Bits Database Optimization detecta consultas de bajo rendimiento en toda su flota de bases de datos, identifica optimizaciones validadas frente a una copia simulada de su entorno y entrega el resultado como una PR que corrige el código exacto que activó la consulta.

Los candidatos a optimización se seleccionan automáticamente a partir de la telemetría de Database Monitoring. Los candidatos se identifican por el mayor impacto potencial, centrándose en los tiempos de ejecución de consultas, las consultas bloqueantes y las consultas con regresión.

<div class="alert alert-info">Bits Database Optimization no requiere acceso de escritura a su base de datos y no exporta ni utiliza datos reales de su entorno. Las optimizaciones se prueban empíricamente frente a simulaciones de bases de datos pobladas con datos sintéticos utilizando las propiedades estadísticas de su esquema.</div>

{{< img src="database_monitoring/database_optimization_panel_overview.png" alt="Una consulta optimizada en el panel de optimización, que muestra un resumen detallado del problema, una diferencia para la consulta optimizada y un botón para crear una PR." style="width:100%;">}}

## Requisitos previos {#prerequisites}

- **Database Monitoring** está configurado para las instancias de base de datos de destino. Consulte [Database Monitoring Setup][1].
- **Schema collection** está habilitado en las instancias de destino.
- Para la creación automatizada de PR:
    - **APM** debe estar configurado para los servicios que emiten las consultas que desea abordar. Consulte [Correlate Database Monitoring and Traces][2] para obtener más información.
    - Un **repositorio de GitHub** debe estar vinculado en su organización de Datadog.
- Bits Database Optimization está habilitado para su organización. Puede verificar la disponibilidad de [Bits AI][6] en **Plan & Usage** > **AI Credits**.
- Para configurar optimizaciones continuas, necesita los permisos **DBM Read** y **Org Management**.

## Habilitar optimizaciones continuas {#enable-continuous-optimizations}

1. Vaya a [Database Monitoring > Optimizations][7].
1. En la esquina superior derecha, haga clic en **Configure**.
1. Active **Continuous Optimizations**.
1. Revise las instancias incluidas y luego haga clic en **Save**.

Las instancias incluidas en Continuous Optimizations se enumeran debajo del interruptor. Para eliminar una instancia, haga clic en el botón menos (**-**) en el lado derecho de su fila y luego haga clic en **Save**.

Cuando las optimizaciones continuas están habilitadas, Bits Database Optimization selecciona consultas elegibles de las instancias incluidas de forma continua hasta que se alcanza el límite de 50 consultas distintas por instancia de base de datos al mes. Las consultas se priorizan por la duración total de ejecución.

Cada consulta analizada cuenta para este límite, incluso cuando no se encuentra ninguna optimización. Después de que una consulta ha sido analizada, no se vuelve a analizar en el mismo mes. El límite se restablece al inicio de cada mes (UTC).

Bits Database Optimization tiene un precio basado en créditos de IA. Para obtener más detalles, consulte la [página de precios de créditos de IA][5].

## Visualizar optimizaciones {#viewing-optimizations}

### Lista de consultas {#query-list}

En la pantalla [Database Monitoring > Queries][3], las consultas con optimizaciones disponibles tienen un icono de IA en la columna Status. Pase el cursor sobre un icono para ver un resumen de la optimización y haga clic en el icono para abrir el panel de optimización.

Para filtrar la lista de consultas por tipo de optimización, seleccione una opción en **Optimizations** sobre la lista.

{{< img src="database_monitoring/database_optimization_queries.png" alt="La columna de estado en la pantalla Queries, que muestra iconos de IA en las filas de consultas donde hay optimizaciones disponibles." style="width:100%;">}}

### Panel de optimización {#optimization-panel}

El panel de optimización incluye un resumen del problema de la consulta, la consulta optimizada utilizada en la simulación y una visualización del Impacto en el rendimiento simulado.

Explore la visualización del Impacto en el rendimiento simulado para obtener más detalles sobre las mejoras:
  - Pase el cursor sobre el resumen de la mejora (por ejemplo, "96.9x más rápido") para ver los tiempos de ejecución antes y después, las lecturas lógicas y los bloques compartidos ensuciados. La tabla muestra el promedio, la mediana, el P95 y el máximo para cada métrica.
  - Pase el cursor sobre cada elemento en la visualización para ver más detalles.

{{< img src="database_monitoring/database_optimization_simulated_performance_impact.png" alt="Un ejemplo de visualización del Impacto en el rendimiento simulado, que muestra una consulta optimizada 96.9x más rápida." style="width:100%;">}}

Haga clic en **Comparar planes** para visualizar comparaciones lado a lado de los planes de ejecución actuales y optimizados:
  - **Vista de lista** muestra una lista jerárquica de las operaciones del plan de ejecución, con el costo del nodo y las estimaciones de filas para cada paso.
  - **Vista de mapa** muestra una representación visual del plan de ejecución, con la opción de comparar los planes mediante diferentes métricas.
  - **Sin procesar** muestra el resultado del plan de ejecución sin procesar.

{{< img src="database_monitoring/database_optimization_plan_comparison_map_view.png" alt="La vista de mapa de Comparar planes, que muestra las operaciones agregadas y eliminadas para una consulta optimizada." style="width:100%;">}}

### Revisar la PR {#review-the-pull-request}

Para revisar la PR de la corrección de optimización para su base de datos, seleccione **Revisar PR con Bits AI**. La PR de GitHub se abre con una descripción precargada que incluye los resultados de la simulación.

<div class="alert alert-info">Las PR automatizadas requieren que APM esté configurado para el servicio que emite la consulta y un repositorio de GitHub vinculado a su organización de Datadog.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/architecture/
[2]: /es/database_monitoring/connect_dbm_and_apm/
[3]: https://app.datadoghq.com/databases/queries
[4]: /es/monitors/configuration/?tab=evaluateddata
[5]: https://www.datadoghq.com/pricing/?product=ai-credits#products
[6]: /es/bits_ai/
[7]: https://app.datadoghq.com/databases/optimizations