---
further_reading:
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 minutos
  text: Comparar la latencia de un servicio con la de la semana anterior
- link: /tracing/guide/slowest_request_daily/
  tag: 3 minutos
  text: Depurar la traza (trace) más lenta en el endpoint más lento de un servicio
    web
- link: /tracing/guide/apm_dashboard/
  tag: 4 minutos
  text: Crear un dashboard para rastrear y correlacionar métricas de APM
- link: /tracing/guide/
  tag: ''
  text: Todas las guías
title: Alerta sobre latencia p99 anómala de un servicio de base de datos
---

_3 minutos para completar_

{{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_cropped.mp4" video="true" alt="Vista del monitor con una alerta en curso" style="width:90%;">}}

Datadog te permite configurar monitores para realizar un seguimiento del estado de los servicios con APM para que no tengas que monitorizarlos constantemente. En este ejemplo, utilizaremos un monitor de detección de anomalías. La [detección de anomalías][1] es una función algorítmica que permite identificar cuándo un métrica se comporta de forma diferente a como lo ha hecho en el pasado, teniendo en cuenta tendencias y patrones, estacionales, de día de la semana y de hora del día. Es ideal para métricas con fuertes tendencias y patrones recurrentes que son difíciles o imposibles de monitorizar con alertas basadas en umbrales.

1. **Abre la [página New Monitor (Monitor nuevo)][2] y elige [APM][3]**.
2. **Elige tu entorno** en Primary Tags (Etiquetas principales) y **Elige la base de datos a monitorizar** en Service (Servicio).

    En [Resource (Recurso)][4], puedes elegir monitorizar consultas específicas que se ejecutan en la base de datos. Sin embargo, en este ejemplo, vamos a ver el rendimiento general, así que déjalo como `*`.

    Una vez que elijas un [servicio][5], el siguiente paso estará disponible para que lo configures, y aparecerá un gráfico en la parte superior de la página que muestra el rendimiento de la métrica que rastrea el monitor nuevo.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_2_cropped.png" alt="Vista de monitor con alerta en curso" style="width:90%;">}}

3. **Elige una *Anomaly Alert* (Alerta de anomalía)** y en la opción *For* (Para), selecciona la latencia p99.

    Una vez elegida la alerta de anomalía, el gráfico también muestra el comportamiento de referencia esperado para la métrica seleccionada, en nuestro caso, la latencia p99.

4. **Ajusta el valor del campo *Alert when* (Alertar cuando) al 100 %**.

    Esto significa que todos los eventos de la duración seleccionada tienen que ser anómalos para que se active la alerta. Esta es una práctica recomendada para empezar con la detección de anomalías. Con el tiempo, encontrarás los valores adecuados para tu situación. Puedes obtener más información sobre los monitores de detección de anomalías en las [Preguntas frecuentes][6].

5. **Cambia la notificación de la alerta**.

    En este ejemplo, puedes dejar el contenido de la notificación con el texto predeterminado o elegir miembros del equipo para etiquetar en la alerta.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_3.png" alt="Vista de monitor con alerta en curso" style="width:90%;">}}

    Puedes obtener más información sobre el marcado para el texto de la notificación y sobre qué valores y condiciones puedes establecer en él en la [información general sobre las notificaciones][7].

6. **Asegúrate de que tu nombre de usuario aparezca en el campo *Configure notifications and automations notification* (Configurar notificaciones y la notificación de automatizaciones)** y añade cualquier miembro adicional del equipo que deba ser notificado en caso de que haya una latencia anómala de la base de datos.

    **Nota**: Para añadir otro usuario, escribe `@` al comienzo. **Haz clic en *Save* (Guardar)**.

    Tu alerta ya está configurada; puedes ajustar cualquiera de los parámetros desde esta pantalla y seguir el rendimiento de la métrica.

7. **Pasa de la pestaña *Edit* (Editar) a la pestaña *Status* (Estado)**.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_4_cropped.png" alt="Vista de monitor con alerta en curso" style="width:90%;">}}

    Aquí puedes ver el estado actual de tu monitor, silenciarlo o profundizar en los detalles de una alerta activada.

8. **Ve de nuevo al [Catálogo de servicios][8]** y desde allí encuentra el servicio para el que acabas de activar el monitor. **Haz clic en el Página de servicios** y allí **haz clic en la barra Monitor** debajo del encabezado.

    Aquí deberías **ver el monitor nuevo** junto con cualquier otro monitor configurado para el servicio y monitores sugeridos que se recomienda configurar.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_5_cropped.png" alt="Vista de monitor con alerta en curso" style="width:90%;">}}

    A medida que crees monitores, encontrarás más servicios, métricas y eventos para incluir y condiciones más complejas para configurar en ellos. Cada uno de estos monitores está conectado a un servicio y se puede acceder a ellos desde la Página de servicios así como desde el [Mapa de servicios][9].

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_6_cropped.png" alt="Mapa de servicios" style="width:90%;">}}

    Para cada servicio del mapa: un círculo verde significa que todos los monitores están estables, amarillo significa que uno o más monitores están enviando advertencias, pero ninguno alerta, rojo significa que uno o más monitores alertan, y gris significa que no hay monitores configurados para el servicio.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/anomaly/
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/apm
[4]: /es/tracing/glossary/#resources
[5]: /es/tracing/glossary/#services
[6]: /es/monitors/types/anomaly/#faq
[7]: /es/monitors/notify/?tab=is_alertis_warning
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/service/map