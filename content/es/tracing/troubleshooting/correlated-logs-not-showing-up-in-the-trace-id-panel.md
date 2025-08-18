---
aliases:
- /es/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/
- /es/tracing/troubleshooting/correlating-logs-not-showing-up-in-the-trace-id-panel/
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: Documentación
  text: Correlacionar trazas y logs
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Documentación
  text: Facilita la solución de problemas con una correlación entre productos
title: Los logs correlacionados no aparecen en el panel de ID de rastreo
---

## Información general

El panel de [traza][1] contiene información sobre la traza (trace), host y logs correlacionados.

{{< img src="tracing/troubleshooting/tracing_no_logs_in_trace.png" alt="Una página de traza que muestra una sección de log vacía" style="width:90%;">}}

Hay cuatro tipos de logs que aparecen en una [traza][1]:

- `trace_id`: muestra logs que tienen el ID de traza correspondiente.
- `host`: muestra logs del host de la traza dentro del marco temporal de la traza.
- `container_id`: muestra logs del contenedor de la traza dentro del marco temporal de la traza.
- `pod_name`: muestra logs del pod de la traza dentro del marco temporal de la traza.

{{< img src="tracing/troubleshooting/tracing_logs_display_option.png" alt="Un menú desplegable de log de la traza que muestra el ID de traza y opciones de host" style="width:80%;">}}

En algunos casos, la sección **Logs** del panel de traza puede aparecer vacía. En esta guía, se explica cómo solucionar este problema.

## Opciones de infraestructura

Si la sección **Log** está vacía para las opciones `host`, `container_id`, o `pod_name`, navega hasta el [Explorador de logs][2] y asegúrate de que se cumplan las siguientes condiciones:

1. Los logs se envían desde el host/contenedor/pod que emitió la traza.
2. Hay logs para ese host dentro del marco temporal de la traza.
3. La marca temporal del log está correctamente configurada. Para obtener más información, consulta [Los logs no muestran la marca temporal esperada][3].

## Opción de ID de traza

Si la sección **Log** está vacía para la opción `trace_id`, asegúrate de que tienes un atributo `trace_id` estándar en tus logs. Si tus logs no contienen `trace_id`, [correlaciona tus trazas y logs][4] para hacer lo siguiente:

1. Extrae el ID de traza en un atributo de log.
2. Reasigna este atributo al atributo reservado `trace_id`.

   {{< tabs >}}
   {{% tab "JSON logs" %}}

   Para logs JSON, los pasos 1 y 2 son automáticos. El rastreador inyecta los ID de [traza][1] y [tramo][2] en logs, que son reasignados automáticamente por los [reasignadores de atributos reservados][3].

   Si este proceso no funciona como se espera, asegúrate de que el nombre del atributo de logs que contiene el ID de traza es `dd.trace_id` y comprueba que el atributo está correctamente configurado en la sección [atributos reservados][4] de ID de traza.

{{< img src="tracing/troubleshooting/trace_id_reserved_attribute_mapping.png" alt="El preprocesamiento de la página de logs JSON con la sección de ID de traza resaltada" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/tracing/glossary/#spans
[3]: /es/logs/log_configuration/processors/#remapper
[4]: https://app.datadoghq.com/logs/pipelines/remapping
   {{% /tab %}}
   {{% tab "With Log integration" %}}

   Para logs sin procesar (donde estás recopilando logs usando una [integración de log][1] para un lenguaje específico), establece el atributo `source` al lenguaje, como `java`, `python`, `ruby` y más. La integración correlaciona automáticamente trazas y logs.

   Este ejemplo muestra el pipeline de integración de Java:

{{< img src="tracing/troubleshooting/tracing_java_traceid_remapping.png" alt="Pipeline de logs Java con el reasignador de ID de rastreo resaltado" style="width:90%;">}}

   Es posible que el formato de log no sea reconocido por el pipeline de integración. En este caso, clona el pipeline y sigue la [guía para solucionar problemas de parseo][2] para asegurarte de que el pipeline acepta el formato de log.

[1]: /es/logs/log_collection/?tab=application#setup
[2]: /es/logs/faq/how-to-investigate-a-log-parsing-issue/
   {{% /tab %}}
   {{% tab "Custom" %}}

   En el caso de logs sin procesar, en el que no se utiliza una integración para recopilar los logs:

   1. Asegúrate de que la regla de parseo personalizada extrae los ID de [traza][1] y [tramo][2] como una cadena, como en el siguiente ejemplo:

      {{< img src="tracing/troubleshooting/tracing_custom_parsing.png" alt="Un parseo personalizado con el ID de traza resaltado en el log de ejemplo, regla de parseo y secciones de extracción" style="width:90%;">}}

   2. A continuación, define un [reasignador de traza][3] en el atributo extraído para reasignarlo al ID de traza oficial de los logs.

[1]: /es/tracing/glossary/#trace
[2]: /es/tracing/glossary/#spans
[3]: /es/logs/log_configuration/processors/#trace-remapper
{{% /tab %}}
{{< /tabs >}}

Una vez que los ID estén correctamente inyectados y reasignados a tus logs, podrás ver los logs correlacionados con la traza en el panel de traza.

{{< img src="tracing/troubleshooting/trace_id_injection.png" alt="Una página de traza que muestra la sección de logs con los logs correlacionados" style="width:90%;">}}

**Nota**: Los ID de traza y los ID de tramo no se muestran en tus logs o atributos de logs en la interfaz de usuario.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: https://app.datadoghq.com/logs
[3]: /es/logs/guide/logs-not-showing-expected-timestamp/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/