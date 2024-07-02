---
aliases:
- /es/dashboards/widgets/service_map
description: Muestra un mapa de un servicio a todos los servicios que lo llaman, y
  todos los servicios a los que llama.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /tracing/services/services_map/
  tag: Documentación
  text: Mapa de servicios
title: Widget Topology Map
widget_type: topology_map
---

El widget Topology Map muestra una visualización de las fuentes de datos y sus relaciones para ayudar a entender cómo fluyen los datos a través de tu arquitectura. 

## Configuración

### Configuración

1. Elige los datos para graficar:
    * Mapa de servicios: El nodo situado en el centro del widget representa el servicio mapeado. Los servicios que llaman al servicio mapeado se muestran con flechas desde el nodo que llama hasta el servicio. Para obtener más información sobre el mapa de servicios, consulta la [Service Map feature of APM (función de Mapa de servicios de APM][1].

2. Introduce un título para tu gráfico.

## API

Este widget puede utilizarse con la **[API de dashboards][2]**. Ve la siguiente tabla para la [definición del esquema JSON de widget][3]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/services_map/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/