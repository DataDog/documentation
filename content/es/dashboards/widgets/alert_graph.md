---
aliases:
- /es/graphing/widgets/alert_graph/
description: Grafica el estado actual de cualquier monitor definido en tu sistema.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de gráfica de alertas
widget_type: alert_graph
---

Las gráficas de alertas son gráficas de series temporales que muestran el estado actual de la mayoría de los monitores definidos en tu sistema:

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="Gráfica de alertas" >}}

Este widget es compatible con monitores de alertas de consultas como métricas, anomalías, outliers, predicciones, APM e integraciones.

## Ajuste

### Configuración

1. Elige un monitor creado previamente para graficar.
2. Selecciona un período de tiempo.
3. Selecciona tu visualización:
    * Serie temporal
    * Lista de principales

## API

Este widget se puede utilizar con la **[API de dashboards][1]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget)][2]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/