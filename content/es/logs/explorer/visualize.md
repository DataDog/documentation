---
aliases:
- /es/logs/visualize
description: Visualiza el resultado de los filtros y agregaciones para poner tus logs
  en la perspectiva adecuada y englobar información decisiva.
further_reading:
- link: logs/explorer/search
  tag: Documentación
  text: Aprende a filtrar logs
- link: logs/explorer/analytics
  tag: Documentación
  text: Aprende a agrupar logs
- link: /logs/explorer/export
  tag: Documentación
  text: Exportar vistas desde el Log Explorer
kind: documentación
title: Visualizaciones de log
---

## Información general

Las visualizaciones definen cómo se muestran los resultados de los filtros y agregados. A través del editor de consultas de logs, selecciona las visualizaciones pertinentes para obtener información crucial.

## Listas

Las listas son resultados **paginados** de logs o agregados. Son valiosas cuando los resultados individuales importan, pero no se tiene un conocimiento previo o claro de lo que define un resultado coincidente. Las listas permiten examinar un grupo de resultados.

Las listas que muestran logs individualmente y las listas que muestran agregados de logs tienen capacidades ligeramente diferentes.

### Lista de logs

Para una lista de logs individuales, elige qué información de interés mostrar como columnas. **Administra las columnas** de la tabla utilizando cualquiera de las siguientes opciones:

- La **tabla**, con las interacciones disponibles en la primera fila. Este es el método preferido para **ordenar**, **reorganizar** o **eliminar** columnas.
- El **panel de faceta** a la izquierda, o el _panel lateral de log_ a la derecha. Esta es la opción preferida para **añadir** una columna para un campo.

Con el botón **Options** (Opciones), controla el **número de líneas** mostradas en la tabla por log.

{{< img src="logs/explorer/table_controls.mp4" alt="Configuración de la tabla de visualización" video=true style="width:80%;">}}

La **clasificación** por defecto para logs en la visualización de lista es por marca temporal, con los logs más recientes en la parte superior. Este es el método de clasificación más rápido y, por tanto, recomendado para fines generales. Coloca primero los logs con el valor más bajo o más alto para una medida, u ordena tus logs lexicográficamente por el valor único de faceta, ordenando una columna según esa faceta.

**Nota**: Aunque se puede añadir cualquier atributo o etiquetas (tags) como columna, la clasificación de la tabla es más fiable si se [declara una faceta][3] de antemano. Los atributos sin facetas pueden añadirse como columnas, pero no producen una clasificación fiable.

La configuración de la tabla de log se almacena junto con otros elementos de tu contexto de solución de problemas en [Vistas guardadas][1].

### Lista de agregados de logs

Las columnas que aparecen en lista de agregados son columnas **derivadas de la agregación**.

Los resultados se clasifican según:

- Número de eventos coincidentes por agregado para la agregación de **patrones** (descendente por defecto: de más a menos)
- Orden lexicográfico del identificador de transacción para la agregación de **transacciones** (ascendente por defecto: de la A a la Z)

## Series temporales

Visualiza la evolución de una única [medida][2] (o un recuento único de valores de una [faceta][2]) a lo largo de un periodo seleccionado, y (opcionalmente) divídela por hasta tres [facetas][2] disponibles.

El siguiente análisis de log de Series temporales muestra la evolución de las **50 mejores rutas URL** según el percentil 95 de **duración** en los últimos 15 minutos.

{{< img src="logs/explorer/timeseries.png" alt="Ejemplo de serie temporal" style="width:90%;">}}

Elige opciones de visualización adicionales para las series temporales: el **intervalo roll-up**, si **visualizas** los resultados como **barras** (recomendado para recuentos y recuentos únicos), **líneas** (recomendado para agregaciones estadísticas) o **áreas**, y el **conjunto de color**.

## Lista principal

Visualiza los valores principales de una [faceta][2] según la [medida][2] elegida.

Por ejemplo, la siguiente lista principal muestra los **15 mejores clientes** de una web comercial según el número de **sesiones únicas** que han tenido en el último día.

{{< img src="logs/explorer/toplists.jpg" alt="Ejemplo de lista principal" style="width:90%;">}}

## Tablas anidadas

Visualiza los valores principales de hasta tres [facetas][2] según una [medida][2] elegida (la primera medida que elijas en la lista), y visualiza el valor de las medidas adicionales de los elementos que aparecen en esta tabla. Actualiza una consulta de búsqueda o examina los logs correspondientes a cualquiera de las dimensiones.

- Cuando hay varias medidas, la lista principal o inferior se determina en función de la primera medida.
- El subtotal puede diferir de la suma real de valores de un grupo, ya que solo se muestra un subconjunto (principal o inferior). Los eventos con un valor nulo o vacío para esta dimensión no se muestran como subgrupo.

**Nota**: Una visualización de tabla utilizada para una sola medida y una sola dimensión es lo mismo que una lista, solo que con una visualización diferente.

El siguiente análisis de log de tabla muestra la evolución de las **10 zonas de disponibilidad principales**, y para cada zona de disponibilidad las **10 versiones principales** según su **número o logs de error**, junto con el número de recuento único de **hosts** e **Id de contenedor** para cada una.

{{< img src="logs/explorer/nested_tables.jpg" alt="Ejemplo de tabla" style="width:90%;">}}

## Gráfico circular

Un gráfico circular te ayuda a organizar y mostrar datos como porcentaje de un todo. Resulta útil cuando se compara la relación entre diferentes dimensiones como servicios, usuarios, hosts, países, etc. dentro de tus datos de log.

El siguiente gráfico circular muestra el desglose porcentual por **servicio**.

{{< img src="logs/explorer/doc_pie_chart.png" alt="Ejemplo de gráfico circular que muestra el desglose de porcentaje por servicio" style="width:90%;">}}

## Mapa de árbol

Un mapa de árbol te ayuda a organizar y mostrar datos como porcentaje de un todo en un formato visualmente atractivo. Los mapas de árbol muestran los datos en rectángulos anidados. Compara diferentes dimensiones utilizando tanto el tamaño como los colores de los rectángulos. También puedes seleccionar varios atributos para ver una jerarquía de rectángulos.

El siguiente mapa de árbol muestra el desglose porcentual por **servicio**.

{{< img src="logs/explorer/doc_tree_map.png" alt="Ejemplo de mapa de árbol que muestra el desglose de porcentaje por servicio" style="width:90%;">}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/saved_views/
[2]: /es/logs/search-syntax
[3]: /es/logs/explorer/facets/