---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 minutos
  text: Alerta sobre latencia p99 anómala de un servicio de base de datos
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 minutos
  text: Compara la latencia de un servicio con la de la semana anterior
- link: /tracing/guide/apm_dashboard/
  tag: 4 minutos
  text: Crea un dashboard para rastrear y correlacionar métricas de APM
- link: /tracing/guide/
  tag: ''
  text: Todas las guías
title: Depurar la traza (trace) más lenta en el endpoint más lento de un servicio
  web
---

_3 minutos para completarse_

{{< img src="tracing/guide/slowest_request_daily/slowest_trace_1_cropped.mp4" video="true" alt="Identificar la traza más lenta y encontrar las métricas de host para ella" style="width:90%;">}}

Con Datadog APM , puedes investigar el rendimiento de tus endpoints, identificar solicitudes lentas e investigar la causa raíz de los problemas de latencia. Este ejemplo muestra la [traza][1] más lenta del día para un endpoint de pago de comercio electrónico y cómo se ralentiza debido al alto uso de la CPU.

1. **Abra el [Catálogo de servicios][2]**.

   Esta página contiene una lista de todos los servicios que envían datos a Datadog. Ten en cuenta que puedes buscar palabras clave, filtrar por `env-tag` y establecer el marco temporal.

2. **Busca un servicio web relevante y activo y abra la Página de servicios**.

   En este ejemplo se utiliza el servicio `web-store` porque es el servidor principal de la stack tecnológica y controla la mayoría de las llamadas a servicios de terceros.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_2_cropped.png" alt="Identificar la traza más lenta y encontrar el cuello de botella que la causa" style="width:90%;">}}

   Además de información sobre el rendimiento, la latencia y la tasa de errores, la página de detalles del servicio contiene una lista de recursos (operaciones principales como endpoints de API, consultas de SQL y solicitudes web) identificados para el servicio.

3. **Ordena la tabla de recursos por latencia p99** y haz clic en el recurso más lento.
    **Nota**: Si no puedes ver una columna de latencia p99, puedes hacer clic en el icono de engranaje `Change Columns` y activar el conmutador para `p99`.

   La página [Recurso][4] contiene información muy clara de las métricas sobre este recurso, como el rendimiento, la latencia, la tasa de errores y un desglose del tiempo empleado en cada servicio de descarga desde el recurso. Además, contiene las [trazas][1] específicas que pasan por el recurso y una vista agregada de los [tramos][5] que componen estas trazas.

     {{< img src="tracing/guide/slowest_request_daily/slowest_trace_3_cropped.png" alt="Identificar la traza más lenta y encontrar el cuello de botella que la causa" style="width:90%;">}}

4. Establece el filtro de tiempo en `1d One Day`. Desplázate hasta la tabla Traces (Trazas) y **ordénala por duración**, pasa el ratón por encima de la traza superior de la tabla y **haz clic en View Trace (Ver traza)**.

   Esta es la gráfica de llamas y la información asociada. Aquí puedes ver la duración de cada paso en la traza y si es errónea. Esto es útil para identificar componentes lentos y propensos a errores. Puedes ampliar la gráfica de llamas, desplazarte por ella y explorarla de forma natural. Debajo de la gráfica de llamas puedes ver los metadatos asociados, logs y la información de host.

   La gráfica de llamas es una forma excelente de identificar la parte precisa de tu stack que es errónea o latente. Los errores se resaltan en rojo y la duración se representa mediante la longitud horizontal del tramo, lo que significa que los tramos largos son los más lentos. Obtén más información sobre el uso de la gráfica de llamas en la [guía de la Vista de trazas][6].

   Bajo la gráfica de llamas puedes ver todas las etiquetas (incluidas las [personalizadas][7]). Desde aquí también puedes ver los logs asociados (si [conectaste logs a tus trazas][8]), ver información a nivel de host como el uso de CPU y memoria.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_4_cropped.png" alt="Identificar la traza más lenta y encontrar el cuello de botella que la causa" style="width:90%;">}}

5. **Haz clic en la pestaña de host**, observa el rendimiento de la CPU y de la memoria del host subyacente cuando se ejecutaba a solicitud.
6. **Haz clic en Open Host Dashboard (Abrir dashboard de host)** para ver todos los datos relevantes sobre el host

Datadog APM se integra perfectamente con el resto de las métricas e información de Datadog, como métricas de infraestructura y logs. Mediante la gráfica de llamas, esta información está a tu disposición, así como cualquier [metadato personalizado][7] que envías con tus trazas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: https://app.datadoghq.com/services
[3]: /es/tracing/glossary/#services
[4]: /es/tracing/glossary/#resources
[5]: /es/tracing/glossary/#spans
[6]: /es/tracing/trace_explorer/trace_view/?tab=spanmetadata
[7]: /es/tracing/guide/adding_metadata_to_spans/
[8]: /es/tracing/other_telemetry/connect_logs_and_traces/