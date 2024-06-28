---
aliases:
- /es/logs/explorer/insights
description: Obtén información sobre dónde empezar o hacer un seguimiento de tus investigaciones
further_reading:
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: Blog
  text: Acelera tus investigaciones en logs con Watchdog Insights
- link: logs/explorer/side_panel
  tag: Documentación
  text: Más información en el panel lateral de log
- link: logs/explorer/#list-of-logs
  tag: Documentación
  text: Más información sobre el Log Explorer
kind: documentación
title: Watchdog Insights para logs
---

## Información general

Datadog Log Management ofrece Watchdog Insights para ayudar a resolver incidencias más rápidamente con información contextual en el Log Explorer. Watchdog Insights complementa tu experiencia e instintos sacando a la luz anomalías sospechosas, outliers, y posibles cuellos de botella de rendimiento que afectan a un subconjunto de usuarios.

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="El Log Explorer muestra el banner de Watchdog Insights con cinco anomalías de log" style="width:100%;" >}}

## Navegación

El banner de Watchdog Insights aparece en el [Log Explorer][1] y muestra información sobre la consulta actual:

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="Banner de Watchdog Insights banner en la vista contraída" style="width:100%;" >}}

Para ver un resumen con toda la información clave, amplía el banner de Watchdog Insights:

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="El banner de Watchdog Insights que muestra tres outliers de error" style="width:100%;" >}}

Para acceder al panel lateral completo de Watchdog Insights, haz clic en **View all** (Ver todo):

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="El panel lateral de Watchdog Insights que muestra más detalles sobre los outliers de error" style="width:100%;" >}}

Cada información viene con interacciones integradas y un panel lateral con información de la solución de problemas. Las interacciones y el panel lateral varían en función del tipo de Watchdog Insight.

## Tipos de información

[Watchdog Insights][8] destaca anomalías y outliers detectados en etiquetas específicas, lo que permite investigar la causa raíz de un problema. La [información][9] se obtiene a partir de APM, Continuous Profiler, Log Management y datos de infraestructura que incluyen la etiqueta `service`. Los dos tipos de información específicos de Log Management son:

- [Detección de anomalía de log](#log-anomaly-detection)
- [Outliers de error](#error-outliers)

### Detección de anomalía de log

Los logs ingeridos se analizan a nivel de ingesta, donde Watchdog realiza agregaciones sobre los patrones detectados, así como las etiquetas `environment`, `service`, `source` y `status`.
Estos logs agregados se analizan en busca de comportamientos anómalos, como los siguientes:

- Una aparición de logs con un estado de advertencia o error.
- Un aumento repentino de logs con un estado de advertencia o error.


Los logs aparecen como Información en el Log Explorer, coincidiendo con el contexto de búsqueda y cualquier restricción aplicada a tu rol.

{{< img src="logs/explorer/watchdog_insights/log-anomalies-light-cropped.mp4" alt="Un usuario que pasa por los detalles de una información específica" video="true">}}

Haz clic en una información concreta para ver la descripción completa de la anomalía detectada, así como la lista de los patrones que contribuyen a ella.

Las anomalías que Watchdog considera especialmente graves también aparecen en la [fuente de alertas de Watchdog][6] y se puede alertar sobre ellas configurando un [monitor de logs de Watchdog][7].
Una anomalía grave se define de la siguiente manera:

* contiene logs de error
* dura como mínimo 10 minutos (para evitar errores transitorios)
* tiene un aumento significativo (para evitar pequeños aumentos)

Para obtener más información sobre la búsqueda en logs en el Log Explorer, consulta [Sintaxis de búsqueda de log][2] y [Marcos temporales personalizados][3].

### Outliers de error

Los outliers de error muestran campos como [etiquetas con facetas o atributos][4] que contienen características de los errores que coinciden con la consulta actual. Los pares `key:value` estadísticamente sobrerrepresentados entre los errores proporcionan pistas sobre la causa raíz de los problemas.

Algunos ejemplos típicos de outliers de error son `env:staging`, `docker_image:acme:3.1` y `http.useragent_details.browser.family:curl`.

En la vista **ficha del banner**, se muestra lo siguiente:

  * El nombre del campo.
  * La proporción de errores y logs generales a la que contribuye el campo.

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="La tarjeta de outlier de error que muestra una barra roja con el 73.3% de errores totales y una barra azul con el 8.31% de errores totales" style="width:50%;" >}}

En la vista de **tarjeta del panel lateral**, se puede ver el [patrón de log][5] principal de los logs de error con el campo.

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Tarjeta de outlier de error (L)" style="width:100%;" >}}

En la vista del **panel lateral completo**, puedes ver:

  * La serie temporal de logs de errores que contiene el campo.
  * Las etiquetas que suelen asociarse a los logs de errores.
  * Una lista completa de [patrones de logs][5].

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Panel lateral de outlier de error" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/logs
[2]: /es/logs/search-syntax
[3]: /es/dashboards/guide/custom_time_frames
[4]: /es/logs/explorer/facets/
[5]: /es/logs/explorer/analytics/patterns
[6]: https://app.datadoghq.com/watchdog
[7]: /es/monitors/types/watchdog/
[8]: /es/watchdog/
[9]: /es/watchdog/insights/?tab=logmanagement#outlier-types