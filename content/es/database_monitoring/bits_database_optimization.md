---
description: Revisar e implementar optimizaciones de consultas de base de datos identificadas
  por Bits AI.
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/query_metrics/
  tag: Documentación
  text: Explorando Métricas de Consultas
- link: /database_monitoring/connect_dbm_and_apm/
  tag: Documentación
  text: Correlacionar Database Monitoring y Trazas
title: Optimización de Base de Datos de Bits
---
<div class="alert alert-info">La optimización de base de datos de Bits solo está disponible para PostgreSQL. Para solicitar soporte para otro sistema de gestión de bases de datos, comuníquese con su representante de Datadog o con <a href="/help/">Datadog Support</a>.</div>

## Resumen {#overview}

La optimización de base de datos de Bits detecta consultas de bajo rendimiento en su flota de bases de datos, identifica optimizaciones validadas contra una copia simulada de su entorno y entrega el resultado como un pull request que corrige el código exacto que activó la consulta.

Los candidatos a optimización se seleccionan automáticamente de la telemetría de Database Monitoring, sin necesidad de configuración adicional. Los candidatos se identifican por su mayor impacto potencial, enfocándose en los tiempos de ejecución de consultas, consultas bloqueadas y consultas con regresión.

<div class="alert alert-info">La optimización de base de datos de Bits no requiere acceso de escritura a su base de datos y no exporta ni utiliza datos reales de su entorno. Las optimizaciones se prueban empíricamente contra simulaciones de base de datos pobladas con datos sintéticos utilizando propiedades estadísticas de su esquema.</div>

{{< img src="database_monitoring/database_optimization_panel_overview.png" alt="Una consulta optimizada en el panel de optimización, mostrando un resumen detallado del problema, un diff para la consulta optimizada y un botón para crear una PR." style="width:100%;">}}

## Requisitos Previos {#prerequisites}

- **Database Monitoring** está configurado para las instancias de base de datos objetivo. Vea [Configuración de Database Monitoring][1].
- **La colección de esquemas** está habilitada en las instancias objetivo.
- Para la creación automatizada de PR:
    - **APM** debe configurarse para los servicios que emiten las consultas que desea abordar. Consulte [Correlate Database Monitoring and Traces][2] para más información.
    - Un **repositorio de GitHub** debe estar vinculado a su organización de Datadog.

## Visualización de optimizaciones {#viewing-optimizations}

### Lista de consultas {#query-list}

En la pantalla [Database Monitoring > Queries][3], las consultas con optimizaciones disponibles tienen un ícono de IA en la columna de Estado. Pase el cursor sobre un ícono para ver un resumen de la optimización y haga clic en el ícono para abrir el panel de Optimización.

Para filtrar la lista de consultas por tipo de optimización, seleccione una opción de **Optimizaciones** sobre la lista.

{{< img src="database_monitoring/database_optimization_queries.png" alt="La columna de estado en la pantalla de Consultas, que muestra íconos de IA en las filas de consulta donde hay optimizaciones disponibles." style="width:100%;">}}

### Panel de optimización {#optimization-panel}

El panel de optimización incluye un resumen del problema de la consulta, la consulta optimizada utilizada en la simulación y una visualización del Impacto de Rendimiento Simulado.

Explore la visualización de impacto de rendimiento simulado para más detalles sobre las mejoras:
  - Pase el cursor sobre el resumen de la mejora (por ejemplo, "96.9x más rápido") para ver los tiempos de ejecución antes y después, lecturas lógicas y bloques compartidos ensuciados. La tabla muestra el promedio, la mediana, P95 y el máximo para cada métrica.
  - Pase el cursor sobre cada elemento en la visualización para ver más detalles.

{{< img src="database_monitoring/database_optimization_simulated_performance_impact.png" alt="Una visualización de impacto de rendimiento simulado de ejemplo, mostrando una consulta optimizada a 96.9x más rápido." style="width:100%;">}}

Haga clic en **Comparar Planes** para ver comparaciones lado a lado de los planes de ejecución actuales y optimizados:
  - **Vista de Lista** muestra una lista jerárquica de las operaciones del plan de ejecución, con costo de nodo y estimaciones de filas para cada paso.
  - **Vista de Mapa** muestra una representación visual del plan de ejecución, con la opción de comparar los planes por diferentes métricas.
  - **Raw** muestra la salida del plan de ejecución en bruto.

{{< img src="database_monitoring/database_optimization_plan_comparison_map_view.png" alt="La Vista de Mapa de Comparación de Planes, mostrando las operaciones añadidas y eliminadas para una consulta optimizada." style="width:100%;">}}

### Revise el pull request {#review-the-pull-request}

Para revisar el pull request para la corrección de optimización de su base de datos, seleccione **Review PR by Bits AI**. El PR de GitHub se abre con una descripción pre-poblada que incluye los resultados de la simulación.

<div class="alert alert-info">Las solicitudes de extracción automatizadas requieren que APM esté configurado para el servicio que emite la consulta, y un repositorio de GitHub vinculado a su organización de Datadog.</div>

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/architecture/
[2]: /es/database_monitoring/connect_dbm_and_apm/
[3]: https://app.datadoghq.com/databases/queries
[4]: /es/monitors/configuration/?tab=evaluateddata