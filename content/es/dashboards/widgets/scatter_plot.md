---
aliases:
- /es/graphing/widgets/scatter_plot/
description: Haz un gráfico de un contexto elegido sobre dos métricas diferentes con
  su agregación respectiva
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de gráfico de dispersión
widget_type: gráfico de dispersión
---

Un gráfico de dispersión identifica una posible relación entre los cambios observados en dos conjuntos diferentes de variables. Proporciona un medio visual y estadístico para comprobar la fuerza de una relación entre dos variables. La visualización del gráfico de dispersión permite representar gráficamente una contexto elegido sobre dos métricas diferentes con sus respectivas agregaciones.

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="Gráfico de dispersión" >}}

## Configuración

### Configuración

1. Selecciona una métrica u otro conjunto de datos, y una agregación para los ejes X e Y.
1. Define el contexto para cada punto del gráfico de dispersión, como `host`, `service`, `app` o `region`.
1. Opcional: activa un color por etiqueta (tag).
1. Opcional: ajusta los controles de los ejes X e Y.
1. Elige si tu widget tiene un marco temporal personalizado o el marco temporal global del dashboard.
1. Dale un título a tu gráfico o deja la casilla en blanco para el título sugerido.

### Opciones

#### Enlaces contextuales

Los [enlaces contextuales][1] están activados por defecto y pueden activarse o desactivarse. Los enlaces contextuales sirven de puente entre widgets de dashboard con otras páginas de Datadog, o con aplicaciones de terceros.

#### Hora mundial

Elige si tu widget tiene un marco temporal personalizado o el marco temporal global del dashboard.

## API

Este widget se puede utilizar con la **[API de dashboards][2]**. Consulta la siguiente tabla para la [definición del esquema del widget JSON][3]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/context-links/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/