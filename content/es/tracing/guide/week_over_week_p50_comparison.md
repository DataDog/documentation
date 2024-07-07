---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 minutos
  text: Alerta sobre latencia p99 anómala de un servicio de base de datos
- link: /tracing/guide/apm_dashboard/
  tag: 4 minutos
  text: Crea un dashboard para rastrear y correlacionar métricas de APM
- link: /tracing/guide/slowest_request_daily/
  tag: 3 minutos
  text: Depurar la traza (trace) más lenta en el endpoint más lento de un servicio
    web
- link: /tracing/guide/
  tag: ''
  text: Todas las guías
title: Compara la latencia de un servicio con la de la semana anterior
---

_2 minutos para completarse_

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_3_cropped_small.mp4" alt="video de comparación" video="true" style="width:90%;">}}

Datadog puede mostrarte la latencia de tu aplicación a lo largo del tiempo y cómo se compara con momentos similares en periodos anteriores, como la semana o el mes pasados. Este ejemplo muestra un servidor web para una plataforma de comercio electrónico y monitoriza el rendimiento de latencia del servidor en el último mes.

1. **Abrir el [Catálogo de servicios][1]**.

   Esta página contiene una lista de todos los [servicios][2] que proporcionan datos a Datadog. Puedes buscar en tus servicios por palabras clave, filtrarlos por etiqueta `env` y establecer el marco temporal.

2. **Buscar y abrir un servicio relevante y activo**.

   Este ejemplo utiliza el servicio `web-store` porque es estable. Vuelve a comprobar que no han aparecido problemas en el último mes.

    {{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_2_cropped.png" alt="comparación 2" style="width:90%;">}}

   Haz clic en el servicio para ver su Página de servicios, que muestra análisis de rendimiento, latencia (incluida la distribución percentil) y errores, un resumen de los monitores de Datadog activos para el servicio, y un desglose de los [recursos][3] disponibles por servicio.

3. Selecciona **Find the Latency graph** (Buscar el gráfico de latencia) en la parte superior de la Página de servicios y desmarca todos los percentiles de la leyenda dejando solo la opción p50. A continuación, elige **Expand the Latency graph** (Ampliar el gráfico de latencia) para ver el modo de pantalla completa donde podrás realizar un análisis más exhaustivo.

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_s3_cropped.png" alt="Vista completa de la tabla de latencia con la vista semana a semana activada" style="width:90%;">}}

    Datadog APM te permite comparar los distintos percentiles de latencia del servicio a lo largo del tiempo, pero también ver la distribución completa de las latencias en el gráfico de distribución de latencias que aparece a continuación.

4. **Añade el rendimiento p50 de la semana anterior** al marcar la opción `Week` en la sección *Compare to Last* (Comparar con el último) a la derecha.

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_1.png" alt="Vista completa de la tabla de latencia con la vista semana a semana activada" style="width:90%;">}}

**Nota**: A medida que realices tu análisis, puedes exportar este gráfico a cualquier dashboard desde la vista del servicio, y mostrar estos datos junto a cualquier otro gráfico generado en Datadog, incluyendo tus métricas personalizadas, información de nivel de host y logs.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/tracing/glossary/#services
[3]: /es/tracing/glossary/#resources