---
aliases:
- /es/graphing/widgets/funnel/
description: Realice un seguimiento de las tasas de conversión e identifique cuellos
  de botella en los flujos de trabajo de usuario con la visualización de análisis
  de embudo.
further_reading:
- link: https://docs.datadoghq.com/product_analytics/journeys/funnel_analysis/
  tag: Documentación
  text: Más información sobre Funnel Analysis
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilice Funnel Analysis para comprender y optimizar los flujos clave de usuario
title: Funnel Widget
widget_type: funnel
---
Funnel Analysis le ayuda a realizar un seguimiento de las tasas de conversión en flujos de trabajo clave para identificar y abordar cualquier cuello de botella en las rutas de recorrido de extremo a extremo de los usuarios. Funnel Widget visualiza las tasas de conversión en los flujos de trabajo de usuario y en las rutas de recorrido de extremo a extremo.

{{< img src="dashboards/widgets/funnel/funnel.png" alt="Funnel Widget que visualiza las tasas de abandono de un usuario en un sitio de comercio electrónico" >}}

## Configuración {#setup}

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="Pantalla de configuración de Funnel Widget" >}}

### Configuración {#configuration}

1. Elija los datos para graficar:
    * RUM: Consulte la [documentación de búsqueda de eventos RUM][1] para configurar una consulta RUM.
2. Seleccione {{< ui >}}View{{< /ui >}} o {{< ui >}}Action{{< /ui >}} y elija una consulta del menú desplegable.
3. Haga clic en el botón {{< ui >}}\+{{< /ui >}} y seleccione otra consulta del menú desplegable para visualizar el embudo. Consulte la [documentación de visualización de RUM][2] para obtener más información sobre cómo visualizar Funnel Analysis.

### Opciones {#options}

#### Tiempo global {#global-time}

En los tableros y cuadernos, elija si su widget tiene un marco de tiempo personalizado o utiliza el marco de tiempo global.

## API {#api}

Funnel Widget se puede utilizar con la [Dashboards API][3]. Consulte la siguiente tabla para ver la [definición del esquema JSON del widget][4]:

{{< dashboards-widgets-api >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/search/
[2]: /es/product_analytics/journeys/funnel_analysis
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/