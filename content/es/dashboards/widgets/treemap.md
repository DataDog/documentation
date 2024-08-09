---
aliases:
- /es/graphing/widgets/treemap/
description: Proporciones gráficas de uno o varios conjuntos de datos
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /dashboards/widgets/pie_chart/
  tag: Documentación
  text: Widget de gráfico circular
title: Widget Treemap
widget_type: treemap
---

El widget treemap te permite visualizar las proporciones de uno o varios conjuntos de datos. Este widget puede mostrar un único conjunto de datos con sus proporciones correspondientes, o varios conjuntos de datos con proporciones anidadas.

{{< img src="dashboards/widgets/treemap/treemap_overview.png" alt="Un widget treemap con páginas vistas únicas procedentes del conjunto de datos Real User Monitoring (RUM) se muestran tanto a nivel de país como de navegador. Los grupos exteriores, distinguidos por colores, muestran el país del usuario.">}}

## Configuración

1. Selecciona una de las fuentes de datos disponibles. 
2. Configura la consulta, consulta los siguientes recursos para obtener más información:
    * Métricas: consulta la documentación [querying (de consulta)][1] para configurar una consulta métrica.
    * Events: consulta la documentación [log search (buscar log)][2] para configurar una consulta de evento de log.
3. (Opcional) Modificar la consulta con una [fórmula][3].
4. Personaliza tu gráfico.

## Personalización

### Enlaces contextuales

Los [Context links (enlaces contextuales)][4] están activados por defecto y pueden activarse o desactivarse. Los enlaces contextuales enlazan widgets de dashboard con otras páginas (en Datadog o de terceros).

## Visualización e interacción

### Filtro y enfoque

En el caso de que se tracen varios grupos de datos a la vez, puedes filtrar el widget a una sola categoría y ver las proporciones dentro de ella.

Para filtrar y enfocarte en una sola categoría, pasa el cursor por encima de la parte exterior de la categoría y haz clic. Para volver a la vista anterior, haz clic en el botón **back** (atrás) de la cabecera superior izquierda del widget.

{{< img src="dashboards/widgets/treemap/focus_animation.mp4" alt="Animación que muestra cómo filtrar y ver una sola categoría a la vez en el widget de treemap." video="true">}}

### Acceder al menú contextual

Para acceder al menú contextual, primero pasa el cursor por encima de una categoría individual: puede ser una categoría anidada o un grupo, como **Canadá** o **Canadá > Edge** en el siguiente ejemplo. Aparecerá un botón desplegable en la esquina superior derecha. Al hacer clic en él, aparece el menú contextual.

{{< img src="dashboards/widgets/treemap/context_menu_dropdown.png" alt="El botón de flecha desplegable se muestra al pasar el cursor por encima de una categoría.">}}

### Pantalla completa

La visualización del widget treemap en pantalla completa muestra el conjunto estándar de [full-screen options (opciones de pantalla completa)][5].

## Gráfico circular widget

Al igual que el widget treemap, el [pie chart widget (widget gráfico circular)][8] también puede utilizarse para mostrar proporciones anidadas. La principal diferencia entre ambos es que el gráfico circular muestra las proporciones en cortes radiales, y el treemap muestra rectángulos anidados.

## API

Este widget puede utilizarse con la **[API de dashboards][6]**. Ve la siguiente tabla para la [definición del esquema JSON widget][7]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/querying
[2]: /es/logs/explorer/search_syntax/
[3]: /es/dashboards/functions/
[4]: /es/dashboards/guide/context-links/
[5]: /es/dashboards/widgets/#full-screen
[6]: /es/api/latest/dashboards/
[7]: /es/dashboards/graphing_json/widget_json/
[8]: /es/dashboards/widgets/pie_chart/