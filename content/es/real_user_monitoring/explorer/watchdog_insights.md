---
description: Descubre cómo investigar los problemas de tus aplicaciones de RUM con
  Watchdog Insights.
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Monitoriza las métricas de Core Web Vitals con RUM
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Mejora tu experiencia de uso móvil con Mobile RUM de Datadog
- link: /watchdog/insights
  tag: Documentación
  text: Obtén información sobre Watchdog Insights
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Descubre cómo buscar en el navegador RUM
title: Watchdog Insights para RUM
---

## Información general

La herramienta Real User Monitoring (RUM) de Datadog incluye la función Watchdog Insights para ayudarte a llegar al origen de los problemas con datos contextuales en el navegador de RUM. Watchdog Insights complementa tu experiencia y tu instinto al recomendarte outliers y posibles cuellos de botella en el rendimiento que afectan a un subconjunto de usuarios.

Para más información, consulta [Watchdog Insights][1].

## Explora la información recopilada

El banner rosa de Watchdog Insights se puede ver en el [navegador de RUM][2] y muestra la información relacionada con las consultas de búsqueda realizadas durante un período de tiempo concreto. En este ejemplo, se puede ver cómo señala Watchdog Insights los problemas presentes en una instancia de una aplicación implementada de `view.url_host:www.shopist.io` que han causado un determinado número de errores durante un intervalo de tiempo concreto (por ejemplo, “ayer”).

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Fichas del banner de Watchdog Insights en el navegador de RUM" style="width:100%;" >}}

Haz clic en un [outlier con errores](#error-outliers) o [de latencia](#latency-outliers) para trabajar con las visualizaciones insertadas en el panel lateral y buscar vistas en la lista de eventos afectados. Haz clic en **View all** (Ver todo) para consultar todos los outliers con errores pendientes en un panel lateral.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card.png" alt="Vista de la ficha del banner de un outlier con errores y de la ficha de un panel lateral en el navegador de RUM" style="width:100%;" >}}

Pasa el cursor por encima de una ficha del banner y haz clic en **Filter on Insight** (Filtrar información) para que tu consulta de búsqueda tenga en cuenta el comportamiento anómalo de la información proporcionada. Por ejemplo, puedes definir la ruta de una vista en particular o un continente concreto, como `North America`, para acotar la búsqueda.

Haz clic en **View in Analytics** (Ver en análisis) para configurar automáticamente las fórmulas `Group into fields` y selecciona el tipo `Visualize as` en la consulta de búsqueda para reflejar el comportamiento del outlier de la ficha. Por ejemplo, puedes crear el gráfico cronológico de un error que se produzca con una frecuencia inusualmente alta en una prueba sintética usando el parámetro `synthetics.test_id` en una fórmula de búsqueda y exportarlo a un monitor o dashboard.

## Outliers con errores

Los outliers con errores muestran campos como [atributos o etiquetas en categorías][3], los cuales incluyen características de errores que coinciden con la consulta de búsqueda actual. Los pares `key:value` con sobrerrepresentación estadística entre los errores dan pistas sobre el origen de los problemas. Algunos ejemplos habituales de outliers con errores son `env:staging`, `version:1234` y `browser.name:Chrome`.

En la vista **ficha del banner**, se muestra lo siguiente:

* El nombre del campo
* La proporción de errores totales y eventos RUM generales a los que contribuye el campo
* Etiquetas relacionadas

En el **panel lateral completo**, puedes ver un gráfico cronológico del número total de errores RUM con ese campo, así como una lista de eventos RUM que contienen el campo.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Vista del panel lateral completo de outliers con errores" style="width:100%;" >}}

## Outliers de latencia

Los outliers de latencia muestran campos como [atributos o etiquetas en categorías][3] que están relacionados con cuellos de botella en el rendimiento y que coinciden con la consulta de búsqueda actual. Los pares `key:value` con peor rendimiento que la base de referencia pueden dar pistas sobre los atascos en el rendimiento entre un subconjunto de usuarios reales.

Los outliers de latencia se calculan para las métricas de [Core Web Vitals][4], como First Contentful Paint (despliegue del contenido más extenso), First Input Delay (respuesta a la primera interacción) y Cumulative Layout Shift (movimiento inesperado de contenido), y para el [tiempo de carga][3]. Si necesitas más información, consulta la sección [Rendimiento de las páginas de monitorización][4].

En la vista **ficha del banner**, se muestra lo siguiente:

* El nombre del campo
* El valor de la métrica de rendimiento que contiene el campo y la base de referencia para el resto de datos

En el **panel lateral completo**, puedes ver un gráfico cronológico de la métrica de rendimiento con un eje X de incrementos de `p50`, `p75`, `p99` y `max`, así como una lista de eventos RUM que contienen el campo.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Vista del panel lateral completo de outliers de latencia" style="width:100%;" >}}

Es gráfico cronológico puede servirte de punto de partida a la hora de investigar el origen de un problema de rendimiento.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/watchdog/insights/
[2]: /es/real_user_monitoring/explorer
[3]: /es/real_user_monitoring/explorer/search/#facets
[4]: /es/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[5]: /es/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa