---
aliases:
- /es/monitors/create/types/audit_logs/
- /es/monitors/create/types/audit_trail/
description: Crea alertas para cuando se detecta un tipo específico de evento de Audit
  Trail o cuando se supera un umbral.
further_reading:
- link: /account_management/audit_trail/
  tag: Documentación
  text: Obtener más información sobre Audit Trail
- link: /monitors/notifications/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
kind: Documentación
title: Monitor Audit Trail
---

## Información general

Los monitores Audit Trail te avisan cuando un tipo específico de evento de auditoría supera un umbral definido por el usuario durante un periodo de tiempo determinado.

## Creación de un monitor

Para crear un [monitor Audit Trail][1] en Datadog utiliza la navegación principal: *Monitors --> New Monitor --> Audit Trail* (Monitores > Nuevo monitor > Audit Trail).

### Definir la consulta de búsqueda

Define una consulta de búsqueda para tus eventos de auditorías. Las consultas de búsqueda siguen la misma [sintaxis de búsqueda][2] que en el Explorador de logs.

Por ejemplo, si quieres recibir una alerta cuando una clave de API específica está realizando un determinado número de solicitudes, configura `count by` con ese ID de clave de API, `@metadata.api_key.id`. A continuación, puede agruparse por un ID de usuario específico, `@usr.id`, o un correo electrónico de usuario, `@usr.email`, para recibir una notificación en la que se especifique qué usuario está realizando la solicitud.

### Definir las condiciones de alerta

Configura un umbral de alerta sobre el valor sobre el que quieres recibir una alerta. Por ejemplo, si quieres recibir una alerta cuando el número de solicitudes de API es 15 o más, configura el umbral de alerta para el número de solicitudes de API en `Alert threshold > 15`. Configura el umbral de alerta en cualquier número menor a 15 para recibir una alerta antes de que se alcance un umbral.

También puedes elegir no resolver nunca o resolver automáticamente un evento desde un estado activado. Configura un valor entre `[Never]` (predeterminado) y `After 24 Hours`.

### Decir qué está ocurriendo

Crea un nombre para la notificación. Por ejemplo, `API requests threshold met for {{[@usr.id].name}}`. Puedes utilizar [variables][3] para rellenar automáticamente un nombre de usuario, una dirección de correo electrónico, etc. en el título para obtener rápidamente información sobre qué cuenta o qué usuario está activando una alerta.

Crea un mensaje de monitor. Puedes incluir los pasos necesarios para que los miembros del equipo resuelvan un incidente si se está produciendo uno.

A continuación, puedes seleccionar un valor de `[Never]` a `Every 24 Hours` para volver a recibir una notificación si no se ha resuelto el monitor. También puedes establecer etiquetas (tags) y prioridades para correlacionar mejor los datos en caso de un incidente.

### Configurar notificaciones y automatizaciones

Selecciona los servicios y los miembros del equipo que quieres notificar. Por ejemplo, puedes enviar alertas a tu equipo de cumplimiento de guardia mediante PagerDuty o alertar a tu equipo mediante Slack o correos electrónicos para que se comience a evaluar la alerta.

También puedes seleccionar si quieres notificar a un servicio o un equipo cuando se modifica una alerta con la opción desplegable `Do Not Notify`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/audit
[2]: /es/logs/explorer/search_syntax/
[3]: /es/monitors/notify/variables/