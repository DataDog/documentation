---
aliases:
- /es/graphing/widgets/alert_value/
description: Grafica el valor actual de una métrica en cualquier monitor de métrica
  de alerta simple definido en tu sistema.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de valor de alerta
widget_type: alert_value
---

El widget de valor de alerta muestra el valor de consulta actual de un monitor de métrica de alerta simple. Los monitores de alertas simples tienen una consulta de métrica que no está agrupada y devuelve un valor. Utiliza los widgets de valor de alerta de tu dashboard para obtener una visión general de los comportamientos y estados de alerta de tu monitor.

{{< img src="dashboards/widgets/alert_value/alert_value_2023.png" alt="Tres widgets de valor de alerta con tres estados de monitor diferentes para el espacio en disco, CPU alta y tasa de error de comprobación" >}}

## Ajuste
{{< img src="dashboards/widgets/alert_value/alert_value_setup_2023.png" alt="Página de configuración del valor de alerta para un monitor de CPU alta" style="width:100%;">}}

### Configuración

1. Elige un monitor de métrica existente para graficar.
2. Selecciona el formato en el que lo quieres visualizar:
    * Decimal
    * Unidades
    * Alineación
3. Ponle un título a tu gráfica.

## API

Este widget se puede utilizar con la **[API de dashboards][1]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget)][2]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/v1/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/