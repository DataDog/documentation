---
description: Proporciones gráficas de uno o varios conjuntos de datos.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /dashboards/widgets/treemap/
  tag: Documentación
  text: Widget treemap
title: Widget de gráfico circular
widget_type: sunburst
---

El widget de gráfico circular puede mostrar un único conjunto de datos con las proporciones correspondientes, o varios conjuntos de datos con proporciones anidadas.

{{< img src="dashboards/widgets/pie_chart/pie_chart_overview.png" alt="Un widget de gráfico circular. El anillo interior muestra el país del usuario, y el anillo exterior se segmenta proporcionalmente para mostrar la cuota de navegadores utilizados en cada país." style="width:60%;">}}


## Configuración

1. Selecciona una de las fuentes de datos disponibles.
2. Configurar la consulta, consulta los siguientes recursos para obtener más información:
    * Métricas: consulta la documentación [querying (consulta)][1] para configurar una consulta métrica.
    * Events: consulta la documentación [log search (búsqueda de log)][2] para configurar una consulta de evento de log.
3. (Opcional) Modificar la consulta con una [fórmula][3].
4. Personaliza tu gráfico.

## Personalización de gráficos

### Visualización del importe total

Alternar si se muestra un recuento total en el centro del gráfico. Por defecto, la opción **Automatic** (Automático) muestra el recuento total una vez que el gráfico alcanza un determinado tamaño.

### Configuración de leyenda

La leyenda puede desactivarse, mostrarse directamente sobre los segmentos del gráfico con la opción **Aside** (Lado), o como una **Tabla** que enumera cada valor, su color y proporción.

Por defecto, la opción **Automático** muestra una leyenda de Lado etiquetada dentro de un dashboard, y muestra tanto la leyenda de **Lado** como la de **Tabla** cuando se abre en pantalla completa.

{{< img src="dashboards/widgets/pie_chart/legend_automatic.png" alt="Opciones de etiquetado y leyenda de gráfico circular: Automático, Tabla, Lado y Ninguno" style="width:80%;">}}

### Enlaces contextuales

Los [Context links (enlaces contextuales)][4] están activados por defecto y pueden activarse o desactivarse. Los enlaces contextuales sirven de puente entre el widget de dashboard y otras páginas (en Datadog o de terceros).

## Visualización e interacción

### Filtro y enfoque

En el caso de que se tracen varios grupos de datos a la vez, puedes elegir una sola categoría y ver las proporciones dentro de ella.

Para ver una sola categoría, pasa el cursor por encima de la parte exterior del anillo de categorías y haz clic. Para volver a la vista anterior, desplaza el cursor al centro del gráfico y haz clic.

{{< img src="dashboards/widgets/pie_chart/interaction_animation.mp4" alt="Animación de la interacción del gráfico circular para filtrar y centrarse en una sola categoría" video="true" style="width:80%;">}}

### Pantalla completa

La visualización del widget de gráfico circular en pantalla completa muestra el conjunto estándar de [full-screen options (opciones de pantalla completa)][5].

## API

Este widget puede utilizarse con la **[API de dashboards][6]**. Ve la siguiente tabla para la [definición del esquema de JSON de widget][7]:

<div class="alert alert-info">El tipo de widget para gráfico circular es <strong>sunburst</strong>.</div>

{{< dashboards-widgets-api >}}

## Widget treemap

Al igual que el widget de gráfico circular, el [treemap][8] también puede utilizarse para mostrar proporciones anidadas. La principal diferencia entre ambos es que el gráfico circular muestra las proporciones en cortes radiales, y el treemap muestra rectángulos anidados.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/dashboards/querying
[2]: /es/logs/explorer/search_syntax/
[3]: /es/dashboards/functions/
[4]: /es/dashboards/guide/context-links/
[5]: /es/dashboards/widgets/#full-screen
[6]: /es/api/latest/dashboards/
[7]: /es/dashboards/graphing_json/widget_json/
[8]: /es/dashboards/widgets/treemap/