---
description: Con Watchdog Insights, puedes ver anomalías y outliers que coinciden
  con tu consulta de búsqueda.
further_reading:
- link: /logs/explorer/watchdog_insights/
  tag: Documentación
  text: Watchdog Insights para logs
- link: /real_user_monitoring/explorer/watchdog_insights/
  tag: Documentación
  text: Watchdog Insights para RUM
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: Blog
  text: Solución de problemas mejorada con Watchdog Insights
- link: https://www.datadoghq.com/blog/watchdog-insights-apm/
  tag: Blog
  text: Detectar automáticamente patrones de error y latencia con Watchdog Insights
    para APM
kind: documentación
title: Watchdog Insights
---

## Información general

Para investigar una incidencia es preciso seguir el método de prueba y error. Por experiencia, los ingenieros familiarizados con un área específica saben dónde indagar primero en busca de posibles problemas. Con Watchdog Insights, todos los ingenieros, incluso los menos experimentados, pueden centrarse en los datos más importantes y agilizar el proceso de investigación de incidencias.

En la mayor parte de las funcionalidades de Datadog, Watchdog ofrece dos tipos de información:

- **Anomalías**: Todas las [alertas de Watchdog][11] precalculadas que coinciden con la consulta de búsqueda activa que Watchdog ha encontrado al analizar los datos de tu organización. Consulta la lista completa en el [explorador de alertas de Watchdog][12].
- **Outliers**: Calculados a partir de los datos de producto que coinciden con la consulta activa, los outliers muestran etiquetas (tags) que aparecen con demasiada frecuencia en algunos tipos de eventos (por ejemplo, errores) o impulsan al alza de algunas métricas continuas (por ejemplo, latencia).

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="Explorador de logs que muestra el banner de Watchdog Insights con cinco anomalías de logs" style="width:100%;" >}}

## Explorar la información

El carrusel de Watchdog Insights se encuentra cerca de la parte superior de las siguientes páginas de productos:

- [Explorador de logs][1]
- APM:
    - [Trace Explorer][2]
    - [Página de servicios][3]
    - [Página de recursos][4]
    - [Explorador de bases de datos][5]
    - [Explorador de perfiles][6]
- Infraestructura:
    - [Explorador de procesos][7]
    - [Explorador serverless][8]
    - [Explorador de Kubernetes][9]
- [Explorador de Real User Monitoring (RUM)][10]
- [Panel lateral de seguimiento de errores][13]

Despliega el carrusel para consultar la información general. Las informaciones de mayor prioridad (basadas en `Insight type`, `State`, `Status`, `Start time`, `Anomaly type`) aparecen a la izquierda.

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="Carrusel de Watchdog Insights en el explorador de logs, que muestra tres anomalías: nuevos logs con errores en servicios de almacenes web, un pico en logs con errores en servicios de recomendación de productos y otro pico en logs con errores en servicios de recomendación de productos" style="width:100%;">}}

Haz clic en **View all** (Ver todo) para expandir el panel. Se abrirá un panel lateral a la derecha, con una lista vertical de informaciones de Watchdog Insights. Cada entrada muestra una vista detallada, con más información que la ficha de resumen.

Cada outlier viene con interacciones integradas y un panel lateral con información para solucionar problemas. Las interacciones y el panel lateral de cada información varían en función del tipo de Watchdog Insight.

### Filtro en la consulta de Insight

Para ajustar la vista actual a fin de que coincida con una información de Watchdog, pasa el cursor arriba de la esquina superior derecha de una ficha de resumen de información. Aparecerán dos iconos. Haz clic en el icono del triángulo invertido, con el texto **Filter on Insight** (Filtro de información). La página se actualiza para mostrar un lista de entradas correspondientes a la información filtrada.

{{< img src="watchdog/filter_on_insight.png" alt="Filtrar el explorador según el contexto de la información" style="width:70%;">}}

### Compartir un outlier

Para compartir un determinado outlier, haz clic en él en el panel de información para abrir el panel lateral de detalles. Haz clic en el botón **Copy Link** (Copiar enlace), situado en la parte superior del panel de detalles:

{{< img src="watchdog/share-outlier.png" alt="Panel lateral del outlier que muestra cómo copiar un enlace" style="width:80%;">}}

El enlace al outlier caduca con la conservación de los datos subyacentes. Por ejemplo, si los logs utilizados para crear el outlier se conservan durante 15 días, el enlace al outlier caduca con el logs al cabo de 15 días.

## Tipos de outliers

{{< tabs >}}
{{% tab "Log Management" %}}

### Outliers con errores

Los outliers con errores muestran campos como [etiquetas o atributos con facetas][1] que contienen características de errores que coinciden con la consulta actual. Los pares `key:value` estadísticamente sobrerrepresentados entre los errores proporcionan pistas sobre las causas de los problemas.

Algunos ejemplos típicos de outliers con errores son `env:staging`, `docker_image:acme:3.1` y `http.useragent_details.browser.family:curl`.

En la vista de la ficha del banner, se puede ver:

  * El nombre del campo
  * La proporción de errores y logs globales a la que contribuye el campo

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="Ficha de outliers con errores que muestra una barra roja con el 73,3% del total de errores y una barra azul con el 8,31% del total de errores" style="width:50%;" >}}

En la vista completa del panel lateral, se puede ver:

  * Las series temporales de logs con errores que contienen el campo
  * Etiquetas que suelen asociarse a logs con errores
  * Una lista completa de [patrones de logs][2]

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Panel lateral de outliers con errores" style="width:100%;" >}}

[1]: /es/logs/explorer/facets/
[2]: /es/logs/explorer/analytics/patterns
{{% /tab %}}
{{% tab "APM" %}}

Los outliers de APM están disponibles en todas las páginas de APM en las que está disponible el carrusel de Watchdog Insights:
 - [Trace Explorer](/tracing/trace_explorer/?tab=listview)
 - [Página de servicios](/tracing/services/service_page/)
 - [Página de recursos](/tracing/services/resource_page/)

### Outliers con errores

Los outliers con errores muestran campos como etiquetas que contienen características de errores que coinciden con la consulta actual. Los pares `key:value` estadísticamente sobrerrepresentados entre los errores proporcionan pistas sobre la causa de los problemas.

Algunos ejemplos típicos de outliers con errores son `env:staging`, `availability_zone:us-east-1a`, `cluster_name:chinook` y `version:v123456`.

En la vista de la ficha del banner, se puede ver:

  * El nombre del campo
  * La proporción de errores y trazas globales a la que contribuye el campo

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_s_card.png" alt="Ficha de outliers con errores que muestra una barra roja con el 24,2% del total de errores y una barra azul con el 12,1% del total de errores" style="width:30%;" >}}

En la vista completa del panel lateral, se puede ver:

  * Las series temporales de trazas de errores que contienen el campo
  * Etiquetas que suelen asociarse a trazas de errores
  * Una lista completa de problemas relacionados con el seguimiento de errores y tramos (spans) con fallos

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_side_panel.png" alt="Panel lateral de outliers con errores" style="width:100%;" >}}

### Outliers con latencia

Los outliers con latencia muestran campos como etiquetas que están asociados a cuellos de botella del rendimiento que coinciden con la consulta de búsqueda actual. Los pares `key:value` con un peor rendimiento que la referencia pueden proporcionar pistas sobre los cuellos de botella del rendimiento entre un subconjunto de tramos de APM.

Los outliers con latencia se calculan para la duración de tramo.

En la vista de la ficha del banner, se puede ver:

* El nombre del campo
* La distribución de latencia para tramos que contienen la etiqueta y la referencia para el resto de los datos.
* Un percentil del valor de la latencia de interés para la etiqueta del outlier y la diferencia con la referencia para el resto de los datos.

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outliers_s_card.png" alt="Ficha del banner de outliers con latencia" style="width:30%;" >}}

En el panel lateral completo, puedes ver un gráfico de distribución de la latencia de las etiquetas y la referencia. El eje X tiene incrementos de `p50`, `p75`, `p99` y `max`, junto con un lista de eventos de APM que contienen el campo.

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Vista de la totalidad del panel lateral de outliers con latencia" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Perfiles" %}}

### Outlier con contención de bloqueo

En la vista de la ficha del banner, se puede ver:

  * El nombre del servicio afectado
  * El número de hilos afectados
  * El ahorro potencial de CPU (y el ahorro de costes estimado)

{{< img src="watchdog/small_card_profiling_lock_pressure.png" alt="Perfilado de información en la contención de bloqueo" style="width:50%;">}}

En el panel lateral completo, puedes ver instrucciones sobre cómo resolver la contención de bloqueo:

{{< img src="watchdog/side_panel_profiling_lock_pressure.png" alt="Panel lateral con toda la información sobre cómo abordar outliers con contención de bloqueo" style="width:100%;">}}

### Outlier con recolección de residuos

En la vista de la ficha del banner, se puede ver:

  * El nombre del servicio afectado
  * La cantidad de tiempo de CPU utilizado para realizar la recolección de residuos

{{< img src="watchdog/small_card_profiling_garbage_collection.png" alt="Perfilado de información en la recolección de residuos" style="width:30%;">}}

En el panel lateral completo, puedes ver instrucciones sobre cómo configurar mejor la recolección de residuos para liberar algo de tiempo de CPU:

{{< img src="watchdog/side_panel_profiling_garbage_collection.png" alt="Panel lateral con toda la información sobre cómo abordar outliers con recolección de residuos" style="width:100%;">}}

### Outlier con compilación de expresiones regulares

En la vista de la ficha del banner, se puede ver:

  * El nombre del servicio afectado
  * Tiempo de CPU dedicado a la compilación de expresiones regulares

{{< img src="watchdog/small_card_profiling_regex_compilation.png" alt="Perfilado de información en la compilación de expresiones regulares" style="width:30%;">}}

En el panel lateral completo, puedes ver instrucciones sobre cómo mejorar el tiempo de compilación de expresiones regulares, así como ejemplos de funciones dentro de tu código que podrían mejorarse:

{{< img src="watchdog/side_panel_profiling_regex_compilation.png" alt="Panel lateral con toda la información sobre cómo abordar outliers con compilación de expresiones regulares" style="width:100%;">}}

{{% /tab %}}
{{% tab "Databases" %}}

En Database Monitoring, Watchdog ofrece información sobre las siguientes métricas:

- `CPU`
- `Commits `
- `IO`
- `Background`
- `Concurrency`
- `Idle`

Encuentra las bases de datos afectadas por uno o varios outliers utilizando el carrusel de información.

{{< img src="watchdog/side_panel_dbm_insights.png" alt="Carrusel para filtrar bases de datos con información" style="width:100%;">}}

A continuación, se establece un recubrimiento de las bases de datos, con píldoras rosas que resaltan las distintas informaciones y ofrecen más información sobre lo ocurrido. 

{{< img src="watchdog/overlay_database_insight.png" alt="Recubrimiento de información de Watchdog en bases de datos para resaltar lo que ocurre" style="width:100%;">}}

{{% /tab %}}
{{% tab "RUM" %}}

### Outlier con error

Los outliers con errores muestran campos como [etiquetas o atributos con facetas][1] que contienen características de errores que coinciden con la consulta de búsqueda actual. Los pares `key:value` estadísticamente sobrerrepresentados entre los errores proporcionan pistas sobre las causas de los problemas. Ejemplos típicos de errores outliers son `env:staging`, `version:1234` y `browser.name:Chrome`.

En la vista de la ficha del banner, se puede ver:

* El nombre del campo
* La proporción de errores totales y eventos RUM generales a la que contribuye el campo
* Etiquetas relacionadas

En el panel lateral completo, puedes ver un gráfico de series temporales sobre el número total de errores RUM con el campo, junto con gráficos circulares de impacto y una lista de eventos RUM que contienen el campo.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Panel lateral completo de outliers con errores" style="width:100%;" >}}

### Outlier con latencia

Los outliers con latencia muestran campos como [etiquetas o atributos de facetas][1] que están asociados a cuellos de botella del rendimiento que coinciden con la consulta de búsqueda actual. Los pares `key:value` con un peor rendimiento que la referencia pueden proporcionar pistas sobre los cuellos de botella del rendimiento entre un subconjunto de usuarios reales.

Los outliers con latencia se calculan para [métricas de Core Web Vitals][2] como First Contentful Paint, First Input Delay, Cumulative Layout Shift y [tiempo de carga][3]. Para más información, consulta [Monitorización del rendimiento de la página][2].

En la vista de la ficha del banner, se puede ver:

* El nombre del campo
* El valor de la métrica de rendimiento que contiene el campo y la referencia para el resto de los datos

En el panel lateral completo, puedes ver un gráfico de series temporales sobre la métrica de rendimiento. El eje X tiene incrementos de `p50`, `p75`, `p99` y `max`, junto con una lista de eventos RUM que contienen el campo.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="Vista del panel lateral completo de outliers con latencia" style="width:100%;" >}}

[1]: /es/real_user_monitoring/explorer/search/#facets
[2]: /es/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[3]: /es/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
{{% /tab %}}
{{% tab "Serverless" %}}

Para las infraestructuras serverless, Watchdog muestra la siguiente información:

- `Cold Start Ratio Up/Down`
- `Error Invocation Ratio Up/Down`
- `Memory Usage Up/Down`
- `OOM Ratio Up/Down`
- `Estimated Cost Up/Down`
- `Init Duration Up/Down`
- `Runtime Duration Up/Down`

Encuentra funciones serverless afectadas por uno o varios outliers utilizando el carrusel de información.

{{< img src="watchdog/side_panel_serverless_facet_insights.png" alt="Faceta para filtrar funciones serverless con información" style="width:30%;">}}

A continuación, se coloca un recubrimiento, con píldoras rosas que resaltan las distintas informaciones y ofrecen más información sobre lo ocurrido.

{{< img src="watchdog/overlay_serverless_insight.png" alt="Recubrimiento de una función con informaciones de Watchdog para resaltar lo que ocurre" style="width:100%;">}}

[1]: /es/serverless/guide/serverless_warnings/#errors
{{% /tab %}}
{{% tab "Processes" %}}

Para el explorador de procesos, el carrusel de Watchdog Insights refleja [todas las anomalías del proceso][1] para el contexto actual del explorador de procesos.

[1]: /es/watchdog/#overview
{{% /tab %}}
{{% tab "Kubernetes" %}}

Para el explorador de Kubernetes, el carrusel de Watchdog Insights refleja [todas las anomalías de Kubernetes][1] para el contexto actual del explorador de Kubernetes.

[1]: /es/watchdog/#overview
{{% /tab %}}
{{< /tabs >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/apm/traces
[3]: /es/tracing/services/service_page/
[4]: /es/tracing/services/resource_page/
[5]: https://app.datadoghq.com/databases/list
[6]: https://app.datadoghq.com/profiling/search
[7]: https://app.datadoghq.com/process
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/orchestration/overview/pod
[10]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aview
[11]: /es/watchdog/#overview
[12]: https://app.datadoghq.com/watchdog
[13]: https://app.datadoghq.com/rum/error-tracking