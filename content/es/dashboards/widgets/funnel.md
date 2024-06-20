---
aliases:
- /es/graphing/widgets/funnel/
further_reading:
- link: https://docs.datadoghq.com/real_user_monitoring/product_analytics/funnel_analysis/
  tag: Documentación
  text: Más información sobre el análisis de embudos
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilizar el análisis del embudo para comprender y optimizar los flujos de
    usuarios clave
title: Widget embudo
widget_type: embudo
---

El análisis del embudo te ayuda a realizar un seguimiento de las tasas de conversión en los flujos de trabajo clave para identificar y abordar los cuellos de botella en los recorridos de usuario de extremo a extremo. El widget embudo visualiza las tasas de conversión en los flujos de trabajo de los usuarios y en los recorridos integrales de los usuarios.

{{< img src="dashboards/widgets/funnel/funnel.png" alt="Widget embudo que visualiza las tasas de abandono de un usuario en un sitio de comercio electrónico" >}}

## Configuración

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="Pantalla de configuración del widget embudo" >}}

### Configuración

1. Elige los datos para graficar:
    * RUM: consulta la [Search RUM Events documentation (búsqueda de documentación de eventos RUM][1] para configurar una consulta RUM.
2. Selecciona **View** (Ver) o **Action** (Acción) y elige una consulta en el menú desplegable.
3. Haz clic en el botón **+** y selecciona otra consulta del menú desplegable para visualizar el embudo. Consulta la [RUM Visualize documentation (documentación de visualización de RUM)][2] para obtener más información sobre la visualización del análisis del embudo.

### Opciones

#### Hora mundial

En los screenboards y notebooks, elige si tu widget tiene un marco temporal personalizado o utiliza el marco temporal global.

## API

Este widget puede utilizarse con la [Dashboards API (API de dashboards)][3]. Ve la siguiente tabla para la [widget JSON schema definition (definición del esquema de widget JSON)][4]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/search/
[2]: /es/real_user_monitoring/product_analytics/funnel_analysis
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/