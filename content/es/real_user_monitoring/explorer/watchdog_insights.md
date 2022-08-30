---
description: Obtén información sobre dónde empezar o hacer un seguimiento de tus investigaciones
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Más información sobre la búsqueda en el navegador RUM
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Monitoriza las métricas de Core Web Vitals con RUM
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Mejora tu experiencia de uso móvil con Mobile RUM de Datadog
kind: documentación
title: Watchdog Insights para RUM
---

## Información general

La herramienta Real User Monitoring (RUM) de Datadog incluye la función Watchdog Insights para ayudarte a llegar al origen de los problemas con datos contextuales en el navegador RUM. Watchdog Insights complementa tu experiencia y tu instinto al recomendarte outliers y posibles cuellos de botella en el rendimiento que afectan a un subconjunto de usuarios.

En este ejemplo, Watchdog Insights identifica que la instancia de la aplicación implementada en `view.url_host:www.shopist.io` ha provocado la mayoría de los errores en un periodo determinado (por ejemplo, el día anterior).

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navegación

El banner de Watchdog Insights aparece en la página de **resultados del navegador RUM** y muestra datos sobre la consulta actual:

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_collapsed.png" alt="Banner de Watchdog Insights (contraído)" style="width:100%;" >}}

Para ver un resumen con toda la información clave, amplía el banner de Watchdog Insight:

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_expanded.png" alt="Banner de Watchdog Insights (ampliado)" style="width:100%;" >}}

Para acceder al panel completo de Watchdog Insights, haz clic en **Ver todo**: 

{{< img src="real_user_monitoring/explorer/watchdog_insights/side_panel.png" alt="Panel lateral de Watchdog Insights" style="width:100%;" >}}

Toda la información viene acompañada de interacciones integradas y un panel lateral sobre cómo solucionar problemas. Las interacciones de información y el panel lateral varían según el [tipo de información de Watchdog Insights] (#colecciones).

## Recopilaciones

### Outliers con errores

Los tipos de información contienen outliers con errores que muestran campos como [atributos o etiquetas en categorías][1], los cuales incluyen características de errores que coinciden con la consulta actual. Los pares `key:value` con sobrerrepresentación estadística entre los errores dan pistas sobre el origen de los problemas.

Algunos ejemplos habituales de outliers con errores son `env:staging`, `version:1234` y `browser.name:Chrome`.

En las vistas de **ficha del banner** y **ficha del panel lateral**, se muestra lo siguiente:

* El nombre del campo.
* La proporción de errores y eventos RUM generales a los que contribuye el campo.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card.png" alt="Vista de la ficha del banner de outliers con errores y de la ficha del panel lateral" style="width:100%;" >}}

En el **panel lateral completo**, puedes ver una cronología de los errores RUM que contienen el campo.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Panel lateral completo de outliers con errores" style="width:100%;" >}}

### Outliers de latencia

Otro tipo de información incluye valores atípicos de latencia que muestran campos como [atributos o etiquetas en categorías][1]) relacionados con cuellos de botella en el rendimiento y que coinciden con la consulta actual. Los pares `key:value` con peor rendimiento que la base de referencia dan pistas sobre los atascos en el rendimiento entre un subconjunto de usuarios reales.

Los outliers de latencia se calculan para las métricas de [Core Web Vitals][2], como First Contentful Paint (despliegue del contenido más extenso), First Input Delay (respuesta a la primera interacción) y Cumulative Layout Shift (movimiento inesperado de contenido), y para el [tiempo de carga][3].

En la vista **ficha del banner**, se muestra lo siguiente:

* El nombre del campo.
* El valor de la métrica de rendimiento que contiene el campo y la base de referencia para el resto de datos.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_s_card.png" alt="Vista de la ficha del banner de outliers de latencia" style="width:100%;" >}}

En la vista de la **ficha del panel lateral**, encontrarás una cronología de la métrica de rendimiento para el campo y la base de referencia para el resto de los datos.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_l_card.png" alt="Vista del panel lateral de outliers de latencia" style="width:100%;" >}}

En la vista del **panel lateral completo**, se muestra una lista de eventos RUM que contienen el campo. Busca el origen del problema en el [gráfico de cascada del rendimiento][4].

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Vista del panel lateral completo de outliers de latencia" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/facets/
[2]: /es/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /es/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[4]: /es/real_user_monitoring/explorer/?tab=facets#event-side-panel