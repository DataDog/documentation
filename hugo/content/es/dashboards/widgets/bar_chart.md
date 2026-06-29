---
description: Visualiza los datos agregados en barras verticales u horizontales para
  comparar las métricas de diferentes categorías.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /dashboards/widgets/top_list
  tag: Documentación
  text: Widget de lista principal
- link: /dashboards/widgets/treemap
  tag: Documentación
  text: Widget Treemap
- link: /dashboards/widgets/pie_chart
  tag: Documentación
  text: Widget de gráfico circular
- link: /dashboards/guide/context-links/#overview/
  tag: Documentación
  text: Enlaces contextuales
title: Widget de gráfico de barras
widget_type: gráfico_barras
---

## Información general

{{< img src="/dashboards/widgets/bar_chart/bar_chart.png" alt="Visualización de ejemplo de gráfico de barras" style="width:100%;" >}}

El widget de gráfico de barras forma parte de la misma familia de datos que los widgets top list (lista principal), treemap (mapa de árbol) y gráfico circular, utilizando ejes categóricos en lugar de ejes temporales como los gráficos de barras de series temporales. Muestra datos categóricos mediante barras verticales, lo que permite comparar valores entre diferentes categorías o grupos. A diferencia del widget horizontal de top list (lista principal), el gráfico de barras utiliza una orientación vertical que resulta especialmente útil para dashboards con relaciones de aspecto anchas y cortas o cuando se desea centrar la atención en la comparación de valores en lugar de en la clasificación.

Utiliza el gráfico de barras cuando la comparación visual entre categorías sea más importante que la lectura de los valores exactos de las tags (etiquetas). Utiliza la top list (lista principal) para priorizar la legibilidad de las etiquetas (por ejemplo, nombres largos de tags (etiquetas)) o si necesitas un formato de lista ordenada.

## Configuración

### Configuración

1. Selecciona una de las fuentes de datos disponibles.
2. Configura la consulta. Consulta los siguientes recursos para obtener más información:
    * Métricas: consulta la documentación [querying (de consulta)][1] para configurar una consulta métrica.
    * Events: consulta la documentación [log search (buscar log)][2] para configurar una consulta de evento de log.
3. (Opcional) Modifica la consulta con una [fórmula][3].
4. Personaliza tu gráfico.

### Opciones
#### Modo de visualización

El widget de gráfico de barras admite varios niveles de agrupación con visualización apilada, lo que permite desglosar los datos por varias dimensiones.

- **Modo apilado**: Muestra los datos agrupados como barras superpuestas dentro de cada categoría.
- **Modo plano**: Muestra barras individuales para cada grupo.
- **Modo relativo**: Muestra los valores como porcentajes del total (solo para datos escalares).
- **Modo absoluto**: Muestra los valores de número en bruto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/querying
[2]: /es/logs/explorer/search_syntax/
[3]: /es/dashboards/functions/