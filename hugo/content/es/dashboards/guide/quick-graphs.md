---
title: Quick Graphs
---

## Información general

Puedes utilizar los Quick Graphs para representar gráficamente tus datos desde cualquier lugar de Datadog. 

Abre el editor de Quick Graphs con cualquiera de las siguientes opciones:

* Pulsando `G` en cualquier página.
* El menú (`Cmd+K` en MacOS, `Ctrl+K` en Windows) de búsqueda global.
* El submenú dashboards.

{{< img src="dashboards/guide/quick_graph_editor.png" alt="editor de quick graph" style="width:80%;">}}


## Grafica tus datos

### Métricas de Crear gráficas

Para consultar métricas, sigue este proceso descrito en [Dashboard Querying (consultas de dashboard)][1]:
1. [Choose the metric to graph (elige la métrica para realizar el gráfico)][1].
2. [Filter (filtro)][2].
3. [Aggregate and rollup (agregado y rollup)][3].
4. [Apply additional functions (aplicar funciones adicionales)][4].

### Eventos de Crear gráficas
Esta sección proporciona una breve información general de la consulta de fuentes de datos de la plataforma de evento como [logs][5], [APM][6], [RUM][7], [Security (seguridad)][8], [Events (eventos)][9], [CI Pipelines (tuberías CI)][10], [CI Tests (pruebas CI)][11], y [Findings (hallazgos)][12]. Elige la fuente de datos de evento utilizando el menú desplegable que por defecto es **Metrics** (métricas). 

Para consultar los datos de evento, sigue este proceso:
1. **Filtro:** reduce, amplía o cambia tu enfoque en el subconjunto de datos de interés actual. El campo superior te permite introducir una consulta de búsqueda mezclando key:value y búsqueda de texto completo. 

{{< img src="dashboards/guide/quick_graph_event_filter.png" alt="filtrado de evento" style="width:80%;">}}

2. **Choose the measure or facet:** (elige la medida o la faceta:) la medida te permite elegir la función de agregación mientras que la faceta muestra el recuento único. 

{{< img src="dashboards/guide/quick_graph_event_measure.png" alt="elegir medida" style="width:80%;">}}

3. **Aggregate:** (agregar:) si estás graficando una medida, selecciona la función de agregación para la medida que deseas graficar y utiliza una faceta para dividir tu gráfico.

{{< img src="dashboards/guide/quick_graph_event_group.png" alt="elegir agregación" style="width:80%;">}}

4. **Rollup:** elige el intervalo de tiempo para tu gráfico. Al cambiar el marco de tiempo global cambia la lista de valores de intervalo de tiempo disponibles.

5. **[Apply additional functions (Aplicar funciones adicionales)][4]** (igual que métricas).

## Selecciona una visualización

Quick Graphs es compatible con:
* [Timeseries (series temporales)][13]
* [Top List (lista principal)][14]
* [Query value (Valor de consulta)][15]
* [Geomap (mapa geográfico)][16]

## Ponle título a tu gráfico

Si no introduces un título, se generará automáticamente uno basado en tus selecciones. Sin embargo, se recomienda que crees un título que describa el propósito del gráfico.

## Exportar y compartir

Haz clic en **Export** (exportar) para guardar tu trabajo en dashboard o notebook. Siempre puedes volver al editor para modificar el gráfico. Si quieres compartir un enlace directamente a tu gráfico sin dashboard o notebook, haz clic en **Copy to Clipboard** (Copiar al portapapeles).

[1]: /es/dashboards/querying/#define-the-metric
[2]: /es/dashboards/querying/#filter
[3]: /es/dashboards/querying/#aggregate-and-rollup
[4]: /es/dashboards/querying/#advanced-graphing
[5]: /es/logs/explorer/
[6]: /es/tracing/trace_explorer/
[7]: /es/real_user_monitoring/explorer/search/
[8]: /es/security/
[9]: /es/events/
[10]: /es/continuous_integration/pipelines/
[11]: /es/continuous_integration/tests/
[12]: /es/security/cloud_security_management/misconfigurations/findings/
[13]: /es/dashboards/widgets/timeseries/
[14]: /es/dashboards/widgets/top_list/
[15]: /es/dashboards/widgets/query_value/
[16]: /es/dashboards/widgets/geomap/