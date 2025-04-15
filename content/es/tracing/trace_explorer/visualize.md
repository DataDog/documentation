---
description: Visualiza tramos (spans) en una lista o agrega tramos en series temporales,
  listas principales y mucho más.
further_reading:
- link: tracing/trace_explorer/
  tag: Documentación
  text: Trace Explorer
title: Visualizaciones de tramos
---

## Información general

Las visualizaciones definen cómo se muestran los datos de tramos consultados. Selecciona las visualizaciones pertinentes para mostrar información valiosa, como una **lista** para cada evento o como **series temporales** o **listas principales** para agregados. 

## Vista de lista

La vista de lista muestra una lista de tramos que coinciden con el contexto seleccionado, definido por el filtro [consulta de barra de búsqueda][1] y un [intervalo de tiempo][2].

En la tabla, selecciona qué información de interés deseas visualizar como columnas. Administra las columnas de una de las siguientes maneras:

- interactuando con la fila de cabecera de la tabla para **ordenar**, **reorganizar** o **eliminar** columnas.
- seleccionando una faceta desde el panel de facetas de la izquierda o desde el panel lateral de trazas (traces) tras hacer clic en un tramo específico, para **añadir** una columna para un campo. También puedes añadir columnas con el botón **Optons** (**Opciones**).

{{< img src="tracing/trace_explorer/visualize/list_view_table_controls.mp4" alt="Configurar la tabla de visualización" vídeo=true style="width:80%;">}}

El orden por defecto de tramos en la visualización de lista es por fecha y hora, con la tramos más recientes en primer lugar. Para visualizar tramos con el valor más bajo o más alto de una medida en primer lugar o para ordenar tramos lexicográficamente por el valor de una etiqueta (tag), especifica esa columna como columna **por**.


La configuración de las columnas se almacena junto con otros elementos de tu contexto de solución de problemas en las vistas guardadas.

El `Latency Breakdown` de la traza (trace) puede faltar en algunos tramos si la traza tiene un formato incorrecto o está incompleta. Por ejemplo, los muestreadores de errores y poco frecuentes capturan trozos de trazas (traces), sin la garantía de capturar la traza completa. En este caso, los datos se omiten para evitar mostrar información de latencia incoherente o engañosa que solo tendría sentido cuando la traza estuviera completa.

Cuando la consulta se filtra en tramos de errores, selecciona la opción **Agrupar en incidencias** para visualizar una lista de incidencias de [Rastreo de errores][5] en lugar de cada tramo de error. Haz clic en cualquier incidencia de la lista para abrir el panel de incidencias y acceder a información adicional sobre este grupo de errores.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_issue_grouping.png" alt="Agrupación de incidencias de rastreo de errores" style="width:100%;">}}

En los detalles de la incidencia, haz clic en `See all errors` para ver cada tramo de error agrupado en esta incidencia.

**Nota**: Vuelve al agrupamiento de `Errors` para ver cada error, incluidos los errores sin huella digital, es decir, los errores sin una incidencia asociada.

## Series temporales

Utiliza las series temporales para visualizar la evolución de una [medida][3] (o un número de valores únicos de etiquetas) a lo largo de un intervalo de tiempo seleccionado y, opcionalmente, divide los datos en hasta tres etiquetas (agrupación).

**Nota**: El [Explorador en vivo][4] (15 minutos) permite agrupar por una sola dimensión.

Las vistas agregadas utilizan opciones de consulta adicionales, para definir la **dimensión de etiqueta medida**, las dimensiones por las que **agrupar** la consulta y el **periodo de agregación**. Por ejemplo:

1. Selecciona para ver la medida de `Duration`.

   {{< img src="tracing/trace_explorer/visualize/group_by_measured_dimension.png" alt="Dimensión medida" style="width:100%;">}}

2. Selecciona la función de agregación para la medida de`Duration`. La selección de una medida permite elegir la función de agregación mientras que la selección de un atributo cualitativo muestra el número único.

   {{< img src="tracing/trace_explorer/visualize/group_by_aggregation_function.png" alt="Función de agregación" style="width:100%;">}}

3. Agrupa la consulta por una dimensión, por ejemplo, `Resource`.

   {{< img src="tracing/trace_explorer/visualize/group_by_dimension.png" alt="Dimension dividida" style="width:100%;">}}

4. Selecciona si deseas mostrar un número de valores superiores o inferiores en función de la etiqueta seleccionada.

    {{< img src="tracing/trace_explorer/visualize/group_by_top_bottom.png" alt="X values superiores o inferiores" style="width:100%;">}}

5. Selecciona el periodo de acumulación, por ejemplo, `10min`.

    {{< img src="tracing/trace_explorer/visualize/group_by_rollup_period.png" alt="Período de acumulación" style="width:100%;">}}

En la siguiente vista de series temporales de Trace Explorer se muestra la evolución de los diez principales nombres de recursos de la `shopist-web-ui` de servicio según el percentil 95 de `Duration` en las últimas cuatro horas:

{{< img src="tracing/trace_explorer/visualize/timeseries_view.png" alt="Vista de series temporales" style="width:100%;">}}

Selecciona opciones de visualización adicionales para las series temporales: el **intervalo de acumulación**, si **visualizas** los resultados como **barras** (recomendado para números y números únicos), **líneas** (recomendado para agregaciones estadísticas) o **áreas**, y el **conjunto de colores**.

## Lista principal

Utiliza una lista principal para visualizar un número de tramos, un número de valores de etiquetas únicos o una medida dividida por una dimensión de etiqueta.

Por ejemplo, en la siguiente lista principal se muestran los diez principales clientes del sitio web que experimentaron un error en el pago durante el último día, según el número de tramos.

{{< img src="tracing/trace_explorer/visualize/top_list_view.png" alt="Vista de lista principal" style="width:100%;">}}

## Tabla

Utiliza una tabla para visualizar los valores superiores de hasta tres combinaciones de dimensiones según una medida seleccionada o el número de tramos.

**Nota**: Una visualización de tabla agrupada por una sola dimensión es lo mismo que una lista principal, solo que con una visualización diferente.

En la siguiente tabla se muestra el número de tramos de errores por `Env`, `Service` y `Error type`.

{{< img src="tracing/trace_explorer/visualize/table_view.png" alt="Vista de tabla" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_explorer/query_syntax/#search-syntax
[2]: /es/tracing/trace_explorer/query_syntax/#time-range
[3]: /es/tracing/trace_explorer/facets/#quantitative-facets-measures
[4]: /es/tracing/trace_explorer/?tab=timeseriesview#live-search-for-15-minutes
[5]: /es/tracing/error_tracking/