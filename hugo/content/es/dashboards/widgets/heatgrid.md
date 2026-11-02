---
description: Compare datos de series temporales entre muchos grupos de etiquetas,
  con cada grupo mostrado como su propia fila codificada por colores.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de tableros mediante JSON
title: Widget de cuadrícula de calor
widget_type: heatgrid
---
{{< img src="dashboards/widgets/heatgrid/heatgrid.png" alt="Ejemplo de visualización de widget de cuadrícula de calor" style="width:100%;">}}

El widget de cuadrícula de calor muestra datos de series temporales agrupados por etiqueta, con cada grupo mostrado como su propia fila y los valores codificados por color. Esto facilita detectar cambios y comparar grupos directamente, incluso cuando el número de grupos es alto.

## Configuración {#setup}

### Configuración {#configuration}

1. Configure su consulta, agrupando por la etiqueta que desea comparar entre filas. Cada grupo en los resultados de la consulta aparece como su propia fila en la cuadrícula.
   {{< img src="dashboards/widgets/heatgrid/heatgrid_colors.png" alt="Panel de configuración de la cuadrícula de calor que muestra opciones de ordenamiento, ancho de etiqueta de fila, leyenda y color." style="width:90%;">}}
1. {{< ui >}}Sort rows by{{< /ui >}}: Ordene las filas por **valor promedio**, **valor máximo**, **valor mínimo**, **suma de valores**, o **etiqueta**, en orden ascendente o descendente.
1. {{< ui >}}Colors{{< /ui >}}: Configure cómo se asignan los valores de la consulta a los colores de las filas.
   - {{< ui >}}Scheme{{< /ui >}}: Seleccione un esquema de color preestablecido, o edite el color o la posición de un punto individual en **Formato de puntos** para personalizarlo.
   - {{< ui >}}Apply as{{< /ui >}}: Elija **Gradiente continuo** para asignar valores a lo largo de una escala de color suave, o **Condiciones discretas** para asignar rangos de valores a colores específicos.
   - Para un gradiente personalizado, agregue puntos a lo largo de la escala y establezca un color y una posición (0-100%) para cada uno.
   - Para condiciones discretas personalizadas, defina un color y un rango de valores (límite inferior y superior) para cada condición. La primera condición no tiene límite inferior y la última no tiene límite superior, por lo que juntas las condiciones cubren el rango completo de valores. **Nota**: El límite inferior del primer segmento es el valor mínimo en los datos y el límite superior del último segmento es el valor máximo.
   - Cada gradiente o conjunto de condiciones discretas admite de 2 a 6 puntos o condiciones.
1. {{< ui >}}Row label width{{< /ui >}}: Elija un ancho específico para la columna de etiquetas de fila, usando tamaños preestablecidos. De forma predeterminada, Datadog selecciona el tamaño más cercano al ancho de las etiquetas que se deben visualizar.
1. {{< ui >}}Show legend label{{< /ui >}}: Active o desactive para mostrar u ocultar la etiqueta de la leyenda.

### Opciones {#options}

#### Anulación de unidad {#unit-override}

Configure las unidades tal como se muestran en la cuadrícula y en las descripciones emergentes.

#### Enlaces de contexto {#context-links}

Los [enlaces de contexto][1] están habilitados de forma predeterminada; puede activarlos o desactivarlos. Los enlaces de contexto conectan los widgets del panel con otras páginas (en Datadog o de terceros).

## <!-- API

Este widget se puede utilizar con la **[Dashboards API][2]**. Consulte la siguiente tabla para ver la [definición del esquema JSON del widget][3]:

{{< dashboards-widgets-api >}} -->

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/context-links/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/