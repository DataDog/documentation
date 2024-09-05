---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Búsqueda de tus eventos
title: Visualizar
---

## Información general

Las visualizaciones definen los resultados de los filtros y agregados mostrados en el [Explorador RUM][1]. Selecciona el tipo de visualización pertinente para mostrar la información que necesitas en la consulta de búsqueda.

## Listas

Las listas son resultados paginados de eventos y son ideales cuando son importantes los resultados individuales. Para utilizar las listas no es necesario tener conocimientos previos de lo que define un resultado coincidente.

{{< img src="real_user_monitoring/explorer/visualize/rum_explorer_lists-1.mp4" alt="Listas en el Explorador RUM" video="true" style="width:70%;" >}}

La información que buscas se muestra en columnas. Puedes administrar lo siguiente:

- La tabla con las interacciones disponibles en la primera fila. Puedes ordenar, reorganizar y eliminar columnas.
- El panel de facetas de la izquierda o el [panel lateral de eventos][2] RUM de la derecha. Puedes añadir una columna para un campo. 

Por defecto, los eventos RUM en la visualización de listas se organizan por marca temporal y se muestran primero los eventos más recientes. Puedes ordenar los eventos de la forma que quieras, por ejemplo, con facetas. primero, muestra eventos RUM con el valor más bajo o más alto de una medida, luego ordena tus eventos lexicográficamente por el valor único de una faceta. Esto ordena la columna en función de la faceta.

Aunque puedes añadir atributos y etiquetas (tags) en las columnas, Datadog recomienda ordenar la tabla si ya has [declarado una faceta][3]. Para ver el valor de un atributo personalizado de una línea de la tabla, puedes añadir atributos no facetados en las columnas, pero es posible que no se ordenen correctamente.

La configuración de la tabla de eventos RUM se almacena con elementos adicionales de tu contexto de resolución de problemas en [Vistas guardadas][4].

### Widget de lista

El [Widget de lista en dashboards][8] muestra los eventos individuales de una fuente de datos determinada, incluidos los datos RUM. Puedes utilizar el widget de lista para ver cualquier evento RUM en un dashboard, como por ejemplo todos los errores de una página determinada. 

Además de utilizar el widget de lista en dashboards, también puedes utilizarlo en notebooks, lo que te permite añadir eventos RUM como parte de informes e investigaciones. 

## Series temporales

Visualiza la evolución de una única medida (o un recuento único de valores de [faceta][5]) a lo largo de un periodo de tiempo seleccionado y también dividido por una [faceta][5] disponible.

{{< img src="real_user_monitoring/explorer/visualize/timeseries-2.png" alt="Gráfico de series temporales en el Explorador RUM" style="width:90%;" >}}

El gráfico de series temporales muestra la evolución del número de páginas vistas en la aplicación Shopist durante el último día para cada ruta de visualización.

Puedes elegir opciones de visualización adicionales como:

- Visualización: Los resultados se muestran en forma de barras (recomendado para recuentos y recuentos únicos), líneas (recomendado para agregaciones estadísticas), áreas. Hay varios conjuntos de colores disponibles.
- Intervalo de roll-up: Determina la anchura de los buckets en las barras.

## Lista principal

Visualiza los principales valores de una faceta en función de la medida elegida.

{{< img src="real_user_monitoring/explorer/visualize/top-list-2.png" alt="Gráfico de barras de la lista principal en el Explorador RUM" style="width:90%;" >}}

La lista principal incluye los principales navegadores utilizados para visitar el sitio web de Shopist durante el último día.

## Tablas anidadas

Visualiza los principales valores de hasta tres [facetas][5] según la [medida][5] elegida (la primera medida que elijas en lista) y visualiza el valor de las medidas adicionales para los elementos que aparecen en la tabla anidada. Actualiza la consulta de búsqueda o investiga los eventos RUM correspondientes a cualquiera de las dos dimensiones.

* Cuando hay varias medidas, la lista principal o inferior se determina en función de la primera medida.
* El subtotal puede diferir de la suma real de valores de un grupo, ya que sólo se muestra un subconjunto (principal o inferior). Los eventos con un valor nulo o vacío para esta dimensión no se muestran como subgrupo.

 **Nota**: Una visualización de tabla utilizada para una sola medida y una sola dimensión es lo mismo que una [lista principal](#top-list), sólo que con una visualización diferente.

 La siguiente tabla de RUM Analytics muestra las **5 principales rutas URL** para **dos países**, EE.UU. y Japón, agrupadas por navegador, durante el último día:

{{< img src="real_user_monitoring/explorer/visualize/nested-table-4.png" alt="Tabla anidada en el Explorador RUM" style="width:90%;">}}

## Distribuciones

Puedes visualizar la distribución de los atributos de medida a lo largo del periodo de tiempo seleccionado para ver la fluctuación de los valores. 

{{< img src="real_user_monitoring/explorer/visualize/distribution-2.png" alt="Gráfico de distribución en el Explorador RUM" style="width:90%;">}}

El gráfico de distribución muestra la distribución del Largest Contentful Paint que mide la experiencia de usuario de la página de inicio de Shopist.

## Geomapas

Visualiza una única [medida][5] (o un recuento único de valores de [faceta][5]) en el mapa del mundo.

{{< img src="real_user_monitoring/explorer/visualize/geomap-2.png" alt="Mapa geográfico en el Explorador RUM" style="width:90%;">}}

El geomapa de RUM Analytics muestra el percentil 75 del **Largest Contentful Paint** durante el último día.

## Gráficos circulares
Un gráfico circular te ayuda a organizar y mostrar los datos como un porcentaje del total. Resulta útil cuando se compara la relación entre diferentes dimensiones como servicios, usuarios, hosts, países, etc. dentro de tus datos de logs.

El siguiente gráfico circular muestra el desglose porcentual por **Ruta de vista**.

{{< img src="real_user_monitoring/explorer/visualize/pie-chart.png" alt="Gráfico circular en el Explorador RUM" style="width:90%;">}}

## Eventos relacionados

Para todas las visualizaciones, selecciona una sección del gráfico o haz clic en el gráfico para ampliarlo o para ver una lista de los eventos que corresponden a tu selección.

{{< img src="real_user_monitoring/explorer/visualize/related-events-2.png" alt="Enlace de eventos relacionados cuando se hace clic en el gráfico" width="90%" >}}

Para el resto de las opciones de visualización, haz clic en el gráfico y luego en **Ver eventos**, para ver una lista de los eventos que corresponden a tu selección. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/
[2]: /es/real_user_monitoring/explorer/events/
[3]: /es/logs/explorer/facets/
[4]: /es/real_user_monitoring/explorer/saved_views/
[5]: /es/real_user_monitoring/explorer/search#setup-facets-and-measures
[6]: /es/notebooks
[7]: /es/real_user_monitoring/explorer/export/
[8]: /es/dashboards/widgets/list/