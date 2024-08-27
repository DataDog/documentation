---
description: Más información sobre los monitores Sintético creados con tus tests Sintético.
further_reading:
- link: /monitors/manage/
  tag: Documentación
  text: Descubre cómo gestionar monitores
- link: /monitors/guide/integrate-monitors-with-statuspage/
  tag: Documentación
  text: Aprende a integrar monitores con Statuspage
- link: /synthetics/metrics/
  tag: Documentación
  text: Más información sobre las métricas de monitorización Sintético
title: Utilizar Monitors de tests Sintético
---

## Información general

Cuando creas un test Synthetic, Datadog crea automáticamente un monitor asociado. Puedes configurar que se te notifique cuando salte la alerta del monitor del test Synthetic.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Monitor de tests Synthetic" style="width:100%;">}}

## Crear un monitor de test Synthetic

<div class="alert alert-info">No es posible crear o importar un monitor de tests Synthetic en la sección <a href="/monitors/">Monitors</a> (Monitores).</div>

Crea un monitor en la sección **Configure the monitor for this test** (Configurar el monitor para este test) para enviar notificaciones cuando falle un test Synthetic. Los monitores se asocian al test Synthetic que has creado y se vinculan a las opciones de alerta establecidas en la configuración de tu test Synthetic. Para utilizar variables de atributos y etiquetas (tags) de monitores, crea un [monitor de métricas][1].

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test.png" alt="Crear un monitor en tu test Synthetic" style="width:90%;">}}

Personaliza el nombre del monitor para buscarlo en la página [**Administrar monitores**][2]. Para encontrar un monitor de test sintético, utiliza el filtro `type:synthetics` en la barra de búsqueda. Puedes utilizar [variables condicionales][3] del monitor para caracterizar el mensaje de notificación en función del estado del test.

El monitor de test sintético se integra con canales de notificación como el correo electrónico, Slack, Pagerduty y Microsoft Teams. Para obtener más información, consulta la página [Notificaciones][4].

Si tienes varias capas de notificaciones (por ejemplo, notificar a más equipos cuanto más tiempo esté alertando un test Synthetic), Datadog recomienda habilitar la opción [renotification][5] (volver a notificar) en tus monitores Synthetic.

## Personalizar las notificaciones de los monitores

Dependiendo de tu estrategia de gestión de incidentes, tal vez quieras involucrar a varios equipos cuando se active una alerta en un test Synthetic. Para que el equipo B reciba una notificación solo si se producen alertas posteriores a la primera, rodee la notificación al equipo B con `{{#is_renotify}}` y `{{/is_renotify}`. Utiliza [variables condicionales][3] para caracterizar aún más el mensaje de notificación en función de los atributos del monitor.

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle.png" alt="Seleccionar cuánto tiempo tardará el monitor de alertas en volver a notificar" style="width:90%;">}}

Para activar la función de volver a notificar del monitor de alertas, haz clic en el conmutador situado a la izquierda de `If this monitor stays in alert status renotify every` y selecciona una opción de tiempo en el menú desplegable.

## Integra tu monitor de tests Synthetic con Statuspage

Si utilizas [Statuspage de Atlassian][6] para controlar el tiempo de actividad de tus aplicaciones y servicios, puedes actualizar el estado de tus sistemas con las notificaciones del monitor de tests Synthetic.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Añadir una dirección de correo electrónico de Statuspage y el estado al nombre del monitor en tu test Synthetic" style="width:95%;">}}

1. Consulta la [documentación de Statuspage][7] para generar una dirección de correo electrónico específica para cada componente.
2. Añade la dirección de correo electrónico generada en el mensaje de notificación de tu test. Por ejemplo, `@custom-statuspage-email@notifications.statuspage.io`.
3. Personaliza el nombre del monitor para que devuelva `UP` o `DOWN`, en función del estado del test. Por ejemplo, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Completa la sección de notificación del monitor y añade un resumen en el nombre del monitor. Por ejemplo, `Shopist Checkout Functionality`.
5. Una vez que hayas configurado el monitor, haz clic en **Save & Exit** (Guardar y salir).

Para más información, consulta la documentación sobre [integrar monitores con Statuspage][8].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/metric/
[2]: /es/monitors/manage/
[3]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /es/monitors/notify/#integrations/
[5]: /es/monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /es/monitors/guide/integrate-monitors-with-statuspage/