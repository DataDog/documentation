---
further_reading:
- link: /service_management/incident_management/integrations
  tag: Documentación
  text: integraciones de incident (incidente)
title: Integraciones
---

## Información general

Incident Management de Datadog se integra con herramientas de colaboración populares, como Slack, Microsoft Teams, Zoom, Jira, Confluence, ServiceNow, Google Meet y Google Drive.

Para integrar Incident Management con una aplicación de terceros, instala la integración de esa aplicación en la [biblioteca de integraciones de Datadog][1].

A continuación, configura la integración para Incident Management accediendo a [**Incidents > Settings > Integrations**][2] (Incidentes > Configuración > Integraciones).

## Slack

Para obtener una descripción completa de las opciones de configuración de Slack en Incident Management de Datadog, incluida la declaración de incident (incidente), la automatización de canales, la sincronización de mensajes, la gestión de respondedores y la configuración de notificaciones, consulta la [documentación de integración de Slack][4].

## Microsoft Teams

Para obtener una descripción completa de las opciones de configuración de Microsoft Teams en Incident Management de Datadog, incluida la declaración de incident (incidente), la automatización de canales, la sincronización de mensajes, la gestión de respondedores y la configuración de notificaciones, consulta [Integrar Microsoft Teams con Incident Management de Datadog][17].

## Otras integraciones

Además de integrarse con Slack y Microsoft Teams, Incident Management también se integra con los siguientes:

- [PagerDuty][8] y [Opsgenie][9] para enviar notificaciones de incident (incidente) a tus ingenieros de guardia.
- [CoScreen][10] para poner en marcha reuniones de colaboración con pantalla compartida multiusuario, control remoto y chat de audio y vídeo integrado.
- [Jira][11] para crear un ticket Jira para un incident (incidente).
- [Webhooks][12] para enviar notificaciones de incident (incidente) mediante webhooks (por ejemplo, [envío de SMS a Twilio][13]).
- [Statuspage][14] para crear y actualizar incidentes de Statuspage.
- [ServiceNow][15] para crear un ticket ServiceNow para un incident (incidente).
- [Zoom][16] para crear reuniones de Zoom para un incident (incidente).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/incidents/settings#Integrations
[3]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: /es/service_management/incident_management/integrations/slack/
[5]: /es/integrations/microsoft-teams/?tab=datadogapprecommended
[6]: /es/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[7]: /es/service_management/incident_management/incident_settings/notification_rules
[8]: /es/integrations/pagerduty/
[9]: /es/integrations/opsgenie/
[10]: /es/coscreen
[11]: /es/integrations/jira/
[12]: /es/integrations/webhooks/
[13]: /es/integrations/webhooks/#sending-sms-through-twilio
[14]: /es/integrations/statuspage/
[15]: /es/integrations/servicenow/
[16]: /es/integrations/zoom_incident_management/
[17]: /es/service_management/incident_management/integrations/microsoft_teams