---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Buscar tus eventos
title: Visualizar
---

## Información general

Las visualizaciones definen los resultados de los filtros y agregados que aparecen en el [Analytucs Explorer][1]. Selecciona el tipo de visualización pertinente para mostrar la información que necesitas en la consulta de búsqueda.

## Serie temporal

Visualiza la evolución de una única medida (un atributo con un valor numérico contenido en tus eventos de Product Analytics) o una faceta (número único de valores) a lo largo de un periodo de tiempo seleccionado.

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-1.png" alt="Gráfico de series temporales en el Analytics Explorer" style="width:90%;" >}}

El gráfico de series temporales muestra la evolución del número de páginas vistas en una aplicación web de ejemplo durante el último día para cada ruta de visualización.

Puedes elegir opciones de visualización adicionales como:

- Visualización: Los resultados se muestran en forma de barras (recomendado para counts y counts únicos), líneas (recomendado para agregaciones estadísticas), áreas y se dispone de varios conjuntos de colores.
- El intervalo de acumulación: determina el ancho de los buckets en las barras.

## Lista de principales

Visualiza los principales valores de una faceta en función de la medida elegida.

{{< img src="product_analytics/analytics/visualize/analytics-top-list-1.png" alt="Gráfico de barras de la lista de principales en el Analytics Explorer" style="width:90%;" >}}

La lista de principales incluye los principales navegadores utilizados para visitar el sitio web de Shopist durante el último día.

## Tablas anidadas

Visualiza los valores superiores de hasta tres facetas según la medida elegida (la primera medida que elijas en la lista) y visualiza el valor de las medidas adicionales de los elementos que aparecen en la tabla anidada. Actualiza la consulta de búsqueda o investiga los eventos correspondientes a cualquiera de las dimensiones.

* Cuando haya varias medidas, la lista superior o inferior se determina en función de la primera medida.
* El subtotal puede diferir de la suma real de valores de un grupo, ya que sólo se muestra un subconjunto (superior o inferior). Los eventos con un valor nulo o vacío para esta dimensión no se muestran como subgrupo.

 **Nota**: Una visualización de tabla utilizada para una sola medida y una sola dimensión es lo mismo que una [lista de principales](#top-list), sólo que con una visualización diferente.

 En la siguiente tabla de Analytics, se muestran las **5 principales rutas URL** para **dos países**, EE.UU. y Japón, agrupadas por navegador, durante el último día:

{{< img src="product_analytics/analytics/visualize/analytics-nested-table-1.png" alt="Tabla anidada en el Analytics Explorer" style="width:90%;">}}

## Distribuciones

Puedes visualizar la distribución de los atributos de medidas a lo largo del periodo de tiempo seleccionado para ver la fluctuación de los valores. 

{{< img src="product_analytics/analytics/visualize/analytics-distribution.png" alt="Gráfico de distribución en el Analytics Explorer" style="width:90%;">}}

En el gráfico de distribución, se muestra la distribución de la pintura de mayor contenido que mide la experiencia de usuario de la página de destino de Shopist. 

## Mapas de árbol
Un mapa de árbol te ayuda a organizar y mostrar datos como porcentaje de un todo en un formato visualmente atractivo. En los mapas de árbol se muestran los datos en rectángulos anidados. Compara diferentes dimensiones utilizando el tamaño y los colores de los rectángulos. También puedes seleccionar varios atributos para ver una jerarquía de rectángulos.

En el siguiente mapa de árbol se muestra el desglose porcentual por **nombre de vista**.

{{< img src="product_analytics/analytics/visualize/analytics-tree-maps.png" alt="Mapa de árbol en el Analytics Explorer" style="width:90%;">}}

## Gráficos circulares
Un gráfico circular te ayuda a organizar y mostrar los datos como un porcentaje de un todo. Es útil cuando se compara la relación entre diferentes dimensiones, como servicios, usuarios, hosts, y países. En tus datos de logs.

En el siguiente gráfico circular se muestra el desglose porcentual por **Ruta de vista**.

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart.png" alt="Gráfico circular en el Analytics Explorer" style="width:90%;">}}

## Geomapas

Visualiza una única medida (un atributo con un valor numérico contenido en tus eventos de Product Analytics) o una faceta (número único de valores) en el mapamundi.

{{< img src="product_analytics/analytics/visualize/analytics-geomaps.png" alt="Mapa geográfico en el Analytics Explorer" style="width:90%;">}}

En el geomapa de Analytics se muestra el percentil 75 de la **Pintura de mayor contenido** durante el último día.

## Listas

Las listas son resultados paginados de eventos y son ideales cuando importan los resultados individuales. Para utilizar las listas no es necesario tener conocimientos previos de lo que define un resultado coincidente.

{{< img src="product_analytics/analytics/visualize/analytics-lists.mp4" alt="Listas en el Analytics Explorer" vídeo="true" style="width:70%;" >}}

La información que buscas se muestra en columnas. Puedes gestionar lo siguiente:

- La tabla con las interacciones disponibles en la primera fila. Puedes ordenar, reorganizar y eliminar columnas.
- La lista desplegable de facetas en la parte superior de cada columna.

En forma predeterminada, los eventos en la visualización de listas están organizados por fecha y hora, con los eventos más recientes en primer lugar. Puedes ordenar eventos de la forma que desees, por ejemplo con facetas. Ordena eventos con el valor más bajo o más alto para una medida primero, luego ordena tus eventos lexicográficamente por el valor único de una faceta. Esto ordena una columna según la faceta.

## Eventos relacionados

Para todas las visualizaciones aparte del [embudo](#funnels), selecciona una sección del gráfico o haz clic en el gráfico para ampliarlo o ver un lista de eventos que corresponda a tu selección.

{{< img src="product_analytics/analytics/visualize/analytics-related-events.png" alt="Enlace a eventos relacionados disponibles cuando haces clic en el gráfico" width="90%" >}}

Para los gráficos de embudo, haz clic en el gráfico para ver una lista de las sesiones convertidas y abandonadas que correspondan a tus consultas.

Para el resto de las opciones de visualización, haz clic en el gráfico y en **Ver eventos** para ver una lista de eventos que correspondan a tu selección. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/product_analytics/analytics_explorer/