---
description: Solucione problemas comunes de alertas de monitores, incluyendo discrepancias
  de estado, verificación de datos, condiciones de alerta y problemas de notificación.
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/
  tag: Guía
  text: Alertar cuando no hay cambios en el valor
- link: https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
  tag: Guía
  text: Configure una alerta para cuando una etiqueta específica deje de enviar datos.
- link: https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
  tag: Guía
  text: Evite alertas de monitores que estuvieron en tiempo de inactividad
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Habilite alertas preconfiguradas con plantillas de monitor
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Monitoree alertas y eventos con OpsGenie y Datadog
- link: https://www.datadoghq.com/blog/set-and-monitor-slas/
  tag: Blog
  text: Monitoreo de servicios y establecimiento de SLA con Datadog
title: Solución de problemas de alertas de monitores
---
## Descripción general {#overview}

Esta guía proporciona una descripción general de algunos conceptos fundamentales que pueden ayudarle a determinar si el comportamiento de alerta de su monitor es válido. Si sospecha que las evaluaciones de su monitor no reflejan con precisión los datos subyacentes, utilice esta guía para inspeccionar su monitor y solucionar los siguientes problemas:
- [Comportamiento del estado y estatus del monitor](#monitor-state-and-status)
- [Disponibilidad de datos y problemas de evaluación](#data-availability-and-evaluation-issues)
- [Configuración de condiciones de alerta](#alert-conditions)
- [Grupos de monitores y retención](#monitor-groups-and-retention)
- [Problemas de notificación](#notification-issues)

## Estado y estatus del monitor {#monitor-state-and-status}

Aunque las *evaluaciones* del monitor no tienen estado, lo que significa que el resultado de una evaluación determinada no depende de los resultados de evaluaciones anteriores, los monitores en sí tienen estado, y su estado se actualiza según los resultados de evaluación de sus consultas y configuraciones. Una evaluación de monitor con un estatus determinado no necesariamente hará que el estado del monitor cambie al mismo estatus.

### Cómo se rastrea el estatus {#how-status-is-tracked}

Tanto para las evaluaciones como para el estado del monitor, el estatus se rastrea por grupo. Para un monitor de alertas múltiples, un grupo es un conjunto de etiquetas con un valor para cada clave de agrupación (por ejemplo, `env:dev, host:myhost` para un monitor agrupado por `env` y `host`). Para una alerta simple, solo hay un grupo (`*`), que representa todo lo que está dentro del contexto del monitor.

### Cuando el estado no coincide con la evaluación {#when-state-doesnt-match-evaluation}

El estado de un monitor también puede actualizarse a veces en ausencia de una evaluación del monitor, por ejemplo, debido a la [resolución automática][4].

## Problemas de disponibilidad y evaluación de datos {#data-availability-and-evaluation-issues}

Si el estado o el estatus de su monitor no es el que espera, confirme el comportamiento de la fuente de datos subyacente. Para un monitor de métricas, puede usar el gráfico de [historial][2] para ver los puntos de datos que se están extrayendo mediante la consulta de métricas. `N/A` los grupos no se incluyen en los monitores, pero son visibles en las consultas de los paneles.

### Métricas dispersas {#sparse-metrics}

Si las métricas están ausentes de la ventana de evaluación de un monitor, y el monitor no está configurado para anticipar [condiciones de falta de datos][1], la evaluación puede ser `skipped`. En tal caso, el estado del monitor no se actualiza, por lo que un monitor que estaba previamente en el estado `OK` permanece `OK`, y lo mismo ocurre con un monitor en el estado `Alert`. Utilice el gráfico de [historial][2] en la página de estado del monitor y seleccione el grupo y el marco de tiempo de interés. Si los datos están dispersos, consulte [aritmética de monitores y métricas dispersas][3] para obtener más información.

### Estado "No Data" con funciones de rollup {#no-data-status-with-rollup-functions}

Si sus monitores presentan inesperadamente el estado "No Data" durante la evaluación, considere revisar la configuración de los rollups y las ventanas de evaluación. Por ejemplo, si un monitor tiene un rollup de 4 minutos y una ventana de evaluación de 20 minutos, produce un punto de datos cada 4 minutos, lo que da como resultado un máximo de 5 puntos de datos dentro de la ventana. Si la opción {{< ui >}}Require Full Window{{< /ui >}} está habilitada, la evaluación puede dar como resultado "No Data" porque la ventana no contiene todos los datos.

Para la mayoría de los casos de uso, deshabilite la configuración {{< ui >}}Require Full Window{{< /ui >}} a menos que su escenario específico exija datos completos para una evaluación precisa. Para obtener más información, consulte [Rollups en monitores][21].

### Retrasos de métricas en la nube {#cloud-metric-delays}

Si su monitor realiza consultas de métricas de nube basadas en rastreadores, utilice un [retraso de evaluación][11] para ayudar a garantizar que las métricas hayan llegado antes de que el monitor realice la evaluación. Lea [retraso de métrica de nube][12] para obtener más información sobre los programas de rastreadores de integración en la nube.

## Condiciones de alerta {#alert-conditions}

Un comportamiento inesperado del monitor a veces puede ser el resultado de [condiciones de alerta][5] mal configuradas, las cuales varían según el [tipo de monitor][6]. Si su consulta de monitor utiliza la función `as_count()`, consulte la guía [`as_count()` en Evaluaciones de monitor][7].

Si su monitor está enviando alertas de forma inesperada, verifique que esté utilizando el agregador correcto para su caso de uso. Consulte la [guía de Agregadores de monitor][22] para ver ejemplos de cómo cada método de agregación afecta el comportamiento de la alerta.

Si utiliza umbrales de recuperación, verifique las condiciones enumeradas en la [guía de umbrales de recuperación][8] para ver si el comportamiento es el esperado.

### Retrasos de grupos nuevos {#new-group-delays}

Si prevé crear nuevos grupos de monitores dentro del contexto de sus monitores de alertas múltiples, es posible que desee configurar un retraso para la evaluación de estos nuevos grupos. Esto puede ayudarle a evitar alertas por el comportamiento esperado de los nuevos grupos, como el uso elevado de recursos asociado con la creación de un nuevo contenedor. Lea [retraso de grupo nuevo][10] para obtener más información.

## Grupos de monitores y retención {#monitor-groups-and-retention}

Datadog mantiene los grupos de monitores disponibles en la interfaz de usuario durante un período de retención después de que dejan de informar, a menos que la consulta cambie. Este período de retención afecta cuánto tiempo permanecen visibles los grupos de monitores y continúan siendo evaluados. El período de retención depende del tipo de monitor y de la configuración. Para obtener detalles, consulte [Tiempo de retención de grupo][23].

Para obtener información detallada sobre la persistencia de los grupos de monitores, incluido cómo manejar hosts renombrados o retirados que continúan apareciendo en las alertas, consulte [Los cambios en la configuración del monitor no surten efecto][9].

## Problemas de notificación {#notification-issues}

Si su monitor se comporta como se espera, pero genera notificaciones no deseadas, existen múltiples opciones para reducir o suprimir las notificaciones:

- Para monitores que cambian rápidamente entre estados, lea [cómo reducir las fluctuaciones de las alertas][13] para conocer formas de minimizar la fatiga por alertas.
- Para alertas que se esperan o que de otro modo no son útiles para su organización, utilice [Downtimes][14] para suprimir notificaciones no deseadas.
- Para controlar el enrutamiento de alertas, utilice [variables de plantilla][15] y la separación de estados {{< ui >}}warning{{< /ui >}} o {{< ui >}}alert{{< /ui >}} con [variables condicionales][16].

### Notificaciones faltantes {#missing-notifications}

Si sospecha que las notificaciones no se están entregando correctamente, verifique los elementos a continuación para asegurarse de que las notificaciones puedan entregarse:

- Verifique las [preferencias de correo electrónico][17] del destinatario y asegúrese de que {{< ui >}}Notification from monitor alerts{{< /ui >}} esté marcado.
- Busque `@evt.type:integration_sync_failure` en [Events Explorer][18]. Datadog utiliza este tipo de evento para errores que ocurren al enviar a una integración, como notificaciones fallidas a Slack, Microsoft Teams, PagerDuty, Opsgenie o webhooks. Los títulos varían según la integración, así que revise el título y el mensaje del evento para identificar el destino afectado.
- Las notificaciones por correo electrónico no crean estos eventos.

### Notificaciones múltiples de Opsgenie {#opsgenie-multi-notifications}

Si está utilizando múltiples notificaciones de `@opsgenie-[...]` en su monitor, enviamos esas notificaciones con el mismo alias a Opsgenie. Debido a una [funcionalidad de Opsgenie][19], Opsgenie descartará lo que considere una duplicación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration/?tabs=thresholdalert#no-data
[2]: /es/monitors/status/#history
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
[18]: /es/events/explorer/
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /es/notebooks
[21]: /es/dashboards/functions/rollup/#rollups-in-monitors
[22]: /es/monitors/guide/monitor_aggregators/
[23]: /es/monitors/configuration/?tab=thresholdalert#group-retention-time