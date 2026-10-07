---
description: Crea visualizaciones a partir de los datos de RUM, incluyendo listas,
  series temporales, tablas y gráficos para analizar el rendimiento y las tendencias
  de comportamiento de los usuarios.
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Búsqueda de tus eventos
title: Visualizar
---

## Información general

Las visualizaciones definen los resultados de los filtros y agregados mostrados en el [Explorador RUM][1]. Selecciona el tipo de visualización pertinente para mostrar la información que necesitas en la consulta de búsqueda.

## Listas

Las listas son resultados paginados de eventos y son ideales cuando importan los resultados individuales. Para utilizar las listas no es necesario tener conocimientos previos de lo que define un resultado coincidente.

{{< img src="real_user_monitoring/explorer/visualize/rum_explorer_lists-1.mp4" alt="Listas en el Explorador RUM" video="true" style="width:70%;" >}}

La información que buscas se muestra en columnas. Puedes gestionar lo siguiente:

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

- Visualización: Los resultados se muestran en forma de barras (recomendado para counts y counts únicos), líneas (recomendado para agregaciones estadísticas), áreas y se dispone de varios conjuntos de colores.
- El intervalo de acumulación: determina el ancho de los buckets en las barras.

## Lista principal

Visualiza los principales valores de una faceta en función de la medida elegida.

{{< img src="real_user_monitoring/explorer/visualize/top-list-2.png" alt="Gráfico de barras de la lista principal en el Explorador RUM" style="width:90%;" >}}

La lista de principales incluye los principales navegadores utilizados para visitar el sitio web de Shopist durante el último día.

## Tablas anidadas

Visualiza los principales valores de hasta tres [facetas][5] según la [medida][5] elegida (la primera medida que elijas en lista) y visualiza el valor de las medidas adicionales para los elementos que aparecen en la tabla anidada. Actualiza la consulta de búsqueda o investiga los eventos RUM correspondientes a cualquiera de las dos dimensiones.

* Cuando haya varias medidas, la lista superior o inferior se determina en función de la primera medida.
* El subtotal puede diferir de la suma real de valores de un grupo, ya que sólo se muestra un subconjunto (superior o inferior). Los eventos con un valor nulo o vacío para esta dimensión no se muestran como subgrupo.

 **Nota**: Una visualización de tabla utilizada para una sola medida y una sola dimensión es lo mismo que una [lista de principales](#top-list), sólo que con una visualización diferente.

 La siguiente tabla de RUM Analytics muestra las **5 principales rutas URL** para **dos países**, EE.UU. y Japón, agrupadas por navegador, durante el último día:

{{< img src="real_user_monitoring/explorer/visualize/nested-table-4.png" alt="Tabla anidada en el Explorador RUM" style="width:90%;">}}

## Distribuciones

Puedes visualizar la distribución de los atributos de medidas a lo largo del periodo de tiempo seleccionado para ver la fluctuación de los valores. 

{{< img src="real_user_monitoring/explorer/visualize/distribution-2.png" alt="Gráfico de distribución en el Explorador RUM" style="width:90%;">}}

En el gráfico de distribución, se muestra la distribución de la pintura de mayor contenido que mide la experiencia de usuario de la página de destino de Shopist. 

## Geomapas

Visualiza una única [medida][5] (o un recuento único de valores de [faceta][5]) en el mapa del mundo.

{{< img src="real_user_monitoring/explorer/visualize/geomap-2.png" alt="Mapa geográfico en el Explorador RUM" style="width:90%;">}}

El geomapa de RUM Analytics muestra el percentil 75 del **Largest Contentful Paint** durante el último día.

## Embudos

El análisis del embudo te ayuda a realizar un seguimiento de las tasas de conversión en flujos de trabajo clave, para identificar y abordar los cuellos de botella en recorridos de extremo a extremo de los usuarios. En concreto, puedes:

- Ver si los clientes abandonan el sitio web en un momento determinado debido a un rendimiento deficiente.
- Realizar un seguimiento de la evolución de la tasa de conversión a medida que se incorporan nuevas funciones.
- Medir cómo afecta a la tasa de abandono la adición de nuevos pasos a un flujo de trabajo.

**Nota**: La tasa de conversión es el número de visitantes de tu sitio web que completaron un objetivo deseado (una conversión) del número total de visitantes.

### Construir un embudo

Para construir un embudo, elige tu vista o acción inicial y haz clic en el icono más para construir pasos adicionales. También puedes utilizar la función de arrastrar y soltar para desplazar los pasos.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-building-a-funnel-1.mp4" alt="Filtrar el mapa de red con una búsqueda" video=true >}}

### Próximos pasos sugeridos

Cuando tengas un punto de partida en mente, pero no estés seguro de lo que tus usuarios hicieron a continuación, haz clic en el cuadro de búsqueda donde dice "Search for View or Action Name" (Búsqueda por nombre de vista o acción) para ver los siguientes pasos sugeridos. Este cuadro de entrada carga automáticamente las **vistas** y **acciones** más comunes que los usuarios suelen ver y realizar a continuación. Esto te permite crear embudos más rápido sabiendo los caminos que tus usuarios están tomando en secuencia.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-suggested-next-steps-1.png" alt="Crear un túnel" style="width:90%;" >}}

**Nota**: Cualquier acción o vista que ocurra entre dos pasos de un embudo no afecta a la tasa de conversión paso a paso o global. Mientras el paso 1 y el paso 2 ocurran en el orden correcto en una sesión dada al menos una vez, cuentan como una única sesión convertida.

### Filtrado

Al construir su embudo, puedes añadir atributos [predeterminados][2] (núcleo, dispositivo, sistema operativo, geolocalización y usuario) y atributos [específicos de la sesión][3] para analizar los datos con más detalle. Haz clic en el botón **Add Filter** (Añadir filtro) para ver la lista completa de atributos disponibles.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-filtering.png" alt="Usa atributos para filtrar información al al construir un embudo" style="width:80%;" >}}

### Analizar tu embudo

Después de crear un embudo, haz clic en **View Funnel Insights** (Ver información del embudo) para abrir el panel **Funnel Analysis** (Análisis del embudo), que ofrece datos correlacionados sobre el rendimiento y las tendencias de comportamiento de los usuarios. Esta información te ayuda a comprender la tasa de conversión.

- Para las tendencias generales, puedes ver la tasa de conversión de extremo a extremo para todo tu flujo de trabajo y también ver los pasos individuales para escalonar las tasas de conversión a abandono. Si quieres saber cómo se ve la conversión de alguien en comparación con el abandono de alguien, puedes ver una [Repetición de la sesión][4] para cada caso.

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-analyzing-funnel.jpg" alt="Uso del panel de información del embudo para revisar las tendencias de rendimiento y comportamiento del usuario" style="width:90%;" >}}

- La sección **Performance** (Rendimiento) te permite comprender si un rendimiento deficiente podría haber afectado a la conversión. Puedes ver un gráfico con una correlación entre el tiempo de carga de esa página y la tasa de conversión y también ver si se produce algún problema (detectado por el [Rastreo de errores][5]) en esa página.
- La sección **User Behavior** (Comportamiento del usuario) te permite comparar el recuento medio de frustración (a partir de [señales de frustración][6]) con la tasa de conversión, y analizar con más detalle las señales de frustración detectadas a partir de acciones individuales. Junto a esta sección, hay un gráfico que muestra la conversión y la tasa de abandono para países específicos, lo que te permite comprender si la región geográfica desempeña un papel en la conversión de un usuario. 

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-user-behavior.jpg" alt="Sección de comportamiento del usuario con el análisis de embudo" style="width:90%;" >}}

## Gráficos circulares
Un gráfico circular te ayuda a organizar y mostrar los datos como un porcentaje del total. Resulta útil cuando se compara la relación entre diferentes dimensiones como servicios, usuarios, hosts, países, etc. dentro de tus datos de logs.

En el siguiente gráfico circular se muestra el desglose porcentual por **Ruta de vista**.

{{< img src="real_user_monitoring/explorer/visualize/pie-chart.png" alt="Gráfico circular en el Explorador RUM" style="width:90%;">}}

## Eventos relacionados

Para todas las visualizaciones, selecciona una sección del gráfico o haz clic en el gráfico para ampliarlo o para ver una lista de los eventos que corresponden a tu selección.

{{< img src="real_user_monitoring/explorer/visualize/related-events-2.png" alt="Enlace de eventos relacionados cuando se hace clic en el gráfico" width="90%" >}}

Para el resto de las opciones de visualización, haz clic en el gráfico y en **Ver eventos** para ver una lista de eventos que correspondan a tu selección. 

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