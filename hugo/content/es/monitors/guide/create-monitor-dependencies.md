---
aliases:
- /es/monitors/faq/can-i-create-monitor-dependencies
further_reading:
- link: /monitors/
  tag: Documentación
  text: Aprender a crear un monitor
- link: /monitors/notify/
  tag: Documentación
  text: Configurar tus notificaciones de monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
title: Crear relaciones de monitor
---

Aunque Datadog es totalmente compatible con [monitores compuestos][1], no existe una forma oficial de crear árboles de alerta.

Algunos usuarios de Datadog han combinado notificaciones de webhook con el contexto de la caída del sistema a través de la API de Datadog para conseguir un resultado similar.

A grandes rasgos, la configuración es la siguiente:

* La alerta A se activa y tiene una `@webhook-notification`.
* La notificación llega a la [API de caída del sistema de Datadog][2] por `$scope` para silenciar cualquier otra alerta.
* Cuando se resuelve la Alerta A, utiliza otra @webhook-notificación para eliminar los tiempos de inactividad del mismo $scope.
Debe tenerse en cuenta que esto puede afectar a las caídas del sistema previamente programadas si tienes una caída del sistema activa que se solapa con el [$scope][3] definido.

Primero, [crea los webhooks][4]:
{{< img src="monitors/guide/mute_demo_webhook.png" alt="mute_demo_webhook" >}}

Texto completo de los endpoints de la API (segunda casilla de entrada para cada uno en la columna de la izquierda):

Silenciar: `https://api.datadoghq.com/api/v1/downtime?api_key=XXX&application_key=XXX`

Desactivar el silencio: `https://api.datadoghq.com/api/v1/downtime/cancel/by_scope?api_key=XXX&application_key=XXX`

Y el contenido del webhook para ambos:

```json
{"scope": "$ALERT_SCOPE"}
```

A continuación, crea una "Alerta A", por ejemplo, una alerta de Faltante de datos para un porcentaje agrupado de hosts para cada zona de disponibilidad.
{{< img src="monitors/guide/alert_exammple.png" alt="alert_example" >}}

A continuación, en el mensaje de alerta, puedes utilizar el webhook @notify para silenciar todos los hosts posteriores en esa zona de disponibilidad cuando se active, y desactivar el silencio cuando se resuelva la alerta:
{{< img src="monitors/guide/mute_demo_msg.png" alt="mute_demo_msg" >}}

Aquí está el ejemplo completo de markup:

```text
That's alot of missing data - check first to see if there is an AWS outage?
{{#is_alert}}
{{availability-zone.name}} is missing 50% of data!! ALL OTHER ALERTS FOR {{availability-zone.name}} WILL BE AUTOMUTED
@webhook-mute-ALL-monitor-scope
{{/is_alert}}

{{#is_alert_recovery}}
{{availability-zone.name}} is NO LONGER missing 50% of data!! ALL OTHER ALERTS FOR {{availability-zone.name}} ARE UNMUTED
@webhook-unmute-ALL-monitor-scope
{{/is_alert_recovery}}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/composite/
[2]: /es/api/v1/downtimes/
[3]: /es/api/v1/downtimes/#cancel-downtimes-by-scope
[4]: https://app.datadoghq.com/account/settings#integrations/webhooks