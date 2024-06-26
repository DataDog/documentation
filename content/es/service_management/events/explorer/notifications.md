---
disable_toc: false
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Más información sobre las opciones de notificación
kind: Documentación
title: Notificaciones
---

## Información general

Datadog admite `@notifications` en los mensajes de eventos cuando los [publica la API][1]. Por ejemplo:

`@all`
: Envía una notificación a todos los miembros de tu organización.

`@test@example.com`
: Envía un correo electrónico a `test@example.com`.

`@slack-<SLACK_ACCOUNT>-<CHANNEL_NAME>`
: Publica el evento o gráfica en el canal de Slack especificado.

`@webhook`
: Alerta o activa el webhook. Consulta la [entrada de blog sobre los webhooks][2].

Consulta la sección de [Notificaciones][3] para obtener más información.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/api/latest/events/#post-an-event
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /es/monitors/notify/