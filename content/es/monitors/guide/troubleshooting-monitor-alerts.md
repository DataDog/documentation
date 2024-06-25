---
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/
  tag: Guía
  text: Alerta por falta de variación del valor
- link: https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
  tag: Guía
  text: Configurar una alerta para cuando una etiqueta específica deja de informar
- link: https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
  tag: Guía
  text: Evitar alertas de monitores que estaban en tiempo de inactividad
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Activar alertas preconfiguradas con monitores recomendados
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Monitorizar alertas y eventos con OpsGenie y Datadog
- link: https://www.datadoghq.com/blog/set-and-monitor-slas/
  tag: Blog
  text: Monitorizar servicios y establecer acuerdos de nivel de servicio (SLA) con
    Datadog
kind: guía
title: Solucionar problemas de alertas de monitor
---

## Información general

Esta guía proporciona información general de algunos conceptos básicos que pueden ayudarte a determinar si el comportamiento de alertas de tu monitor es válido. Si sospechas que las evaluaciones de tu monitor no reflejan con precisión los datos subyacentes, consulta las siguientes secciones mientras inspeccionas tu monitor.

### Monitorizar estados

Mientras que las *evaluaciones* de monitor no tienen estado, lo que significa que el resultado de una evaluación no depende de los resultados de evaluaciones anteriores, los propios monitores sí tienen estado y este se actualiza en función de los resultados de evaluación de sus consultas y configuraciones. Una evaluación de monitor con un estado determinado no provocará necesariamente que el estado del monitor cambie al mismo estado. A continuación se indican algunas causas potenciales:

#### Las métricas son demasiado dispersas dentro de una ventana de evaluación de métricas de monitor

Si las métricas están ausentes de la ventana de evaluación de un monitor y el monitor no está configurado para anticipar [condiciones de ausencia de datos][1], la evaluación puede ser `skipped`. En tal caso, el estado monitor no se actualiza, por lo que un monitor que previamente tenía el estado `OK` permanece `OK`. Lo mismo ocurre con un monitor con el estado `Alert`. Utiliza el gráfico del [historial][2] de la página de estado del monitor y selecciona el grupo y el periodo de tiempo que te interesen. Si los datos están escasamente poblados, consulta [Monitorizar la aritmética y las métricas escasas][3] para obtener más información.

#### Monitorizar actualizaciones de estado generadas por condiciones externas

El estado de un monitor también puede actualizarse a veces en ausencia de una evaluación de monitor, por ejemplo, debido a la [resolución automática][4].

### Verificar la presencia de datos

Si el estado de tu monitor no es el que esperabas, confirma el comportamiento de la fuente de datos subyacente. En el caso de un monitor de métricas, puedes utilizar el gráfico del [historial][2] para ver los puntos de datos extraídos por la consulta de métricas. Para investigar más a fondo la evolución de tus métricas, haz clic en **Open in a notebook** (Abrir en un notebook), junto al gráfico de estado. Esto genera un [notebook][20] de investigación con un gráfico formateado de la consulta del monitor.

{{< img src="monitors/monitor_status/notebook-button2.png" alt="The monitor status page with the mouse cursor hovering over the Open in a notebook button next to one monitor group status bar" "Página de estado de un monitor que muestra un cursor sobre el botón "Abrir en un notebook", junto a la barra de estado de un grupo de monitores) style="width:60%;">}}

### Condiciones de alerta

Algunas veces, el comportamiento inesperado de un monitor puede ser el resultado de una mala configuración de las [condiciones de alerta][5], que varían según el [tipo de monitor][6]. Si tu consulta de monitor utiliza la función `as_count()`, consulta la guía de [`as_count()` en evaluaciones de monitores][7].

Si utilizas umbrales de recuperación, comprueba las condiciones enumeradas en la [guía de umbrales de recuperación][8] para ver si el comportamiento es el esperado.

### Monitorizar estados y grupos

Tanto en las evaluaciones como en los estados de monitor, el seguimiento se realiza por grupos.

Para un monitor de alertas múltiples, un grupo es un conjunto de etiquetas (tags) con un valor para cada clave de agrupación (por ejemplo, `env:dev, host:myhost` para un monitor agrupad por `env` y `host`). Para una alerta simple, sólo hay un grupo (`*`) que representa todo lo que hay dentro del contexto del monitor.

Por defecto, Datadog mantiene los grupos de monitores disponibles en la interfaz de usuario durante 24 horas, o 48 horas para los monitores de host, a menos que se modifique la consulta. Para obtener más información, consulta [Monitorizar los cambios de configuración que no surten efecto][9].

Si anticipas la creación de nuevos grupos de monitores dentro del contexto de tus monitores con alertas múltiples, tal vez quieras configurar un periodo de espera para la evaluación de estos nuevos grupos. Esto puede ayudarte a evitar alertas sobre el comportamiento esperado de los nuevos grupos, como un alto uso de recursos asociado a la creación de un nuevo contenedor. Para obtener más información, consulta [Periodo de espera para nuevo grupo][10].

Si tu monitor realiza consultas de métricas en la nube basadas en crawlers, utiliza un [periodo de espera de evaluación][11] para asegurarte de que hayan llegado las métricas antes de la evaluación del monitor. Consulta [Periodo de espera para métricas en la nube][12] para obtener más información sobre los cronogramas de los crawlers de integraciones en la nube.

### Problemas con las notificacies

Si tu monitor se comporta como se espera, pero produce notificaciones no deseadas, existen varias opciones para reducir o suprimir las notificaciones:

- Para los monitores que cambian rápidamente de estado, consulta [Reducir el flapping de alertas][13] para conocer formas de minimizar la fatiga por alertas.
- Para las alertas esperadas o que no son útiles para tu organización, utiliza los [tiempos de inactividad][14] para suprimir las notificaciones no deseadas.
- Para controlar el enrutamiento de las alertas, utiliza [variables de plantilla][15], y para separar los estados **advertencia** o **alerta** utiliza [variables condicionales][16].

#### Notificaciones de ausencia

Si sospechas que las notificaciones no se están entregando correctamente, consulta los siguientes elementos para garantizar que las notificaciones puedan entregarse:

- Comprueba las [preferencias de correo electrónico][17] del destinatario y asegúrate de que `Notification from monitor alerts` está seleccionado.
- Comprueba el [flujo de eventos][18] de los eventos con la cadena `Error delivering notification`.

#### Notificaciones múltiples Opsgenie

Si utilizas las notificaciones múltiples `@opsgenie-[...]` en tu monitor, enviamos esas notificaciones con el mismo alias Opsgenie.
Debido a una [característica de Opsgenie][19], Opsgenie descartará lo que considere una duplicación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration/?tabs=thresholdalert#no-data
[2]: /es/monitors/manage/status/#history
[3]: /es/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[4]: /es/monitors/configuration/?tabs=thresholdalert#auto-resolve
[5]: /es/monitors/configuration/?tabs=thresholdalert#set-alert-conditions
[6]: /es/monitors/types
[7]: /es/monitors/guide/as-count-in-monitor-evaluations/
[8]: /es/monitors/guide/recovery-thresholds/#behavior
[9]: /es/monitors/guide/why-did-my-monitor-settings-change-not-take-effect
[10]: /es/monitors/configuration/?tabs=thresholdalert#new-group-delay
[11]: /es/monitors/configuration/?tabs=thresholdalert#evaluation-delay
[12]: /es/integrations/faq/cloud-metric-delay/
[13]: /es/monitors/guide/reduce-alert-flapping/
[14]: /es/monitors/guide/suppress-alert-with-downtimes/
[15]: /es/monitors/notify/variables/?tab=is_alert&tabs=is_alert#template-variables
[16]: /es/monitors/notify/variables/?tab=is_alert&tabs=is_alert#conditional-variables
[17]: /es/account_management/#preferences
[18]: /es/events/stream
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /es/notebooks