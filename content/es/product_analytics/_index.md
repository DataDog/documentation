---
aliases:
- /es/real_user_monitoring/product_analytics
- /es/real_user_monitoring/guide/rum-for-product-analytics
description: Análisis de productos te ayuda a comprender el uso de tus aplicaciones
  de un vistazo.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tomar decisiones de diseño basadas en datos con el Análisis de productos
- link: /product_analytics/analytics_explorer/
  tag: Documentación
  text: Analytics Explorer
title: Análisis de productos
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
Análisis de productos tiene disponibilidad limitada. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

## Información general

{{< img src="product_analytics/overview-1.png" alt="Página de inicio del Análisis de productos.">}}

Análisis de productos te ayuda a conocer mejor el comportamiento de los usuarios y a tomar decisiones basadas en datos. Puede ayudar a resolver los siguientes tipos de casos de uso en tu aplicación:

- Entendimiento de la adopción del producto
- Seguimiento de las tasas de conversión y su evolución en el tiempo
- Seguimiento de los principales patrones de comportamiento de los usuarios
- Visualización de los botones con los que más y menos se interactúa en una página determinada

## Para empezar

Para empezar a utilizar el Análisis de productos, actívalo para cada aplicación en la que desees monitorizar el comportamiento de los usuarios:

1. Selecciona la aplicación que deseas monitorizar en la lista de [Gestión de aplicaciones][9].
2. En PRODUCT SETTINGS (CONFIGURACIÓN DEL PRODUCTO), haz clic en **Product Analytics** (Análisis de productos).
3. Haz clic en el botón **Enable** (Habilitar).

{{< img src="product_analytics/enable-product-analytics.png" alt="Habilitar el Análisis de productos desde la página de Gestión de aplicaciones.">}}

Por defecto, los datos de Análisis de productos se conservan durante 15 meses. Más información sobre [Privacidad en Datadog][1].

## Medir la retención de usuarios

La retención de usuarios es una métrica para medir el porcentaje de usuarios activos que siguen utilizando tu producto, aplicación o servicio durante un periodo determinado. Utiliza el [Análisis de retención][2] para medir cómo un grupo de usuarios se involucra con características específicas a lo largo del tiempo y comprender dónde se producen los abandonos.

{{< img src="real_user_monitoring/retention_analysis/differing-events-retention-graph.png" alt="Gráfico de retención para diferentes eventos" style="width:90%;" >}}

## Trazar el recorrido del usuario

[Los recorridos del usuario][3] te permiten medir e informar sobre el impacto de cada cambio de función, desde los cuellos de botella del backend hasta las frustraciones de los usuarios, para que puedan optimizarse adecuadamente. Identifica la ruta ideal para la adopción de funciones y la conversión de usuarios.

{{< img src="/product_analytics/journeys/pa-funnel-1.png" alt="Comprende las conversiones de extremo a extremo con el Análisis de embudo.">}}

Ve diferentes visualizaciones de la experiencia del usuario al interactuar con tu aplicación:

- **[Embudo][4]**: mide la **tasa de conversión** y el **tiempo para convertir** de extremo a extremo de un flujo de trabajo determinado. 
- **[Pathways][5]**: explora flujos de trabajo agregados en una única visualización para ayudar a responder preguntas sobre los recorridos de los usuarios. Además, realiza un seguimiento de las tasas de conversión a lo largo del tiempo y compáralas con atributos específicos que podrían haber afectado a las tasas de conversión, como el tipo de navegador o la geografía.

## Crear segmentos de usuarios

Los segmentos son usuarios agrupados por características o comportamientos específicos. La [segmentación][6] en Datadog te permite analizar y comprender grupos o segmentos específicos de tu base de usuarios.

## Visualizar las interacciones de los usuarios con mapas de calor

Los [mapas de calor][7] visualizan los elementos con los que más se ha interactuado en una página para ver dónde se encuentran los puntos calientes de actividad, junto con el análisis de la profundidad de desplazamiento para ver hasta dónde se han desplazado los usuarios por una página determinada. Puedes ver cada deslizamiento, desplazamiento y clic con una reproducción perfecta de lo que hicieron exactamente los usuarios tanto en el navegador como en las aplicaciones móviles para identificar el contenido de alto o bajo rendimiento.

{{< img src="real_user_monitoring/heatmaps/heatmap_v2.png" alt="Información general de la funcionalidad del mapa de calor." style="width:100%;">}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/privacy/
[2]: /es/product_analytics/user_retention
[3]: /es/product_analytics/journeys
[4]: /es/product_analytics/journeys/funnel_analysis
[5]: /es/product_analytics/journeys/pathways
[6]: /es/product_analytics/segmentation/
[7]: /es/product_analytics/heatmaps
[8]: https://app.datadoghq.com/rum/