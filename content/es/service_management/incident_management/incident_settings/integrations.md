---
title: Integraciones
---

## Información general

Las integraciones personalizadas con herramientas de comunicación populares como Slack, Microsoft Teams, Zoom y Jira garantizan que tu equipo pueda utilizar plataformas con las que ya se sienten cómodos. Personaliza el uso de las funciones de integración en Datadog Incident Management para minimizar el tiempo dedicado a configurar nuevos canales de comunicación durante la respuesta a incidentes.

## Integraciones

Navega a [**Incidents > Settings > Integrations**][1] (Incidentes > Configuración > Integraciones).

Activa la opción **Automatically create a channel for each new incident** (Crear automáticamente un canal para cada nueva incidencia) para habilitar lo siguiente:
- Creación automática de canales de Slack o Microsoft Teams para cada nueva incidencia y plantilla de nombres para dichos canales.
- Canal de actualización de incidencias.

Configura estos ajustes para utilizar cualquier espacio de trabajo de Slack o Microsoft Teams que hayas configurado en el [cuadro de integración][2] de tu organización. El *canal de actualizaciones del incidente* envía un mensaje cada vez que se declara un incidente o cambia de estado, gravedad o encargado del incidente.

## Opciones de plantilla de nombre de canal
<div class="alert alert-info">Datadog recomienda que el prefijo sea corto, ya que Slack impone un límite de 80 caracteres en los nombres de los canales. </div>

El cambio de la plantilla de nombre del canal no cambia el nombre de ningún canal de incidente existente. La nueva plantilla de nombre solo se aplica para canales futuros. Por defecto, los canales dedicados a incidentes utilizan `incident-{public_id}` como plantilla de nombre. Añade opciones de título adicionales para mejorar la claridad de los canales de Slack:
- El prefijo `incident` puede cambiarse por cualquier cadena compuesta por letras *minúsculas*, números y guiones. 
- Haz clic en la casilla **Incident ID** (Identificación de la incidencia) para evitar que se dupliquen los nombres de los canales. 
- Haz clic en la casilla **Title of Incident** (Título de la incidencia) para permitir que la aplicación Slack Datadog cambie automáticamente el nombre del canal si cambia el título de una incidencia.

## Funciones de Slack

Las siguientes características están disponibles para su uso con la integración de Slack con Incident Management. Habilita o configura estas opciones en **[Service Management > Incidents > Settings > Integrations][1]** (Gestión de servicios > Incidentes > Configuración > Integraciones).
- Repite los mensajes del canal de Slack, para importar y conservar todas las conversaciones de Slack en la línea de tiempo del incidente. **Nota**: Esto cuenta cada persona que comenta un mensaje de Slack como un usuario activo mensual. Alternativamente, destaca el mensaje anclado en tu línea de tiempo para crear un sistema de registro de todas las conversaciones relacionadas con incidentes.
- Añade enlaces importantes de integraciones, como Jira y Zoom, a los marcadores del canal de incidentes.
- También puedes añadir automáticamente [miembros del equipo][3] a un canal de Slack de incidentes cuando se añade un equipo al incidente. Solo se añaden al canal los miembros que han conectado sus cuentas de Slack y Datadog ejecutando el comando "/Datadog connect" en Slack.
- Archiva automáticamente un canal de Slack después de un tiempo determinado.

## Integraciones con soporte técnico

Además de integrarse con [Slack][4], Incident Management también se integra con:

- [PagerDuty][5] y [Opsgenie][6] para enviar notificaciones de incidentes a tus ingenieros de guardia.
- [CoScreen][7] para iniciar reuniones de colaboración con pantalla compartida multiusuario, control remoto y chat de audio y vídeo integrados.
- [Jira][8] para crear un tique de Jira para un incidente.
- [Webhooks][9] para enviar notificaciones de incidente mediante webhooks (por ejemplo, [envío de SMS a Twilio][10]).
- [Statuspage][11] para crear y actualizar incidentes de Statuspage.
- [ServiceNow][12] para crear un tique de ServiceNow para un incidente.
- [Zoom][13] para crear reuniones de Zoom para un incidente.

[1]: https://app.datadoghq.com/incidents/settings#Integrations
[2]: https://app.datadoghq.com/account/settings#integrations
[3]: /es/account_management/teams/
[4]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[5]: /es/integrations/pagerduty/
[6]: /es/integrations/opsgenie/
[7]: /es/coscreen
[8]: /es/integrations/jira/
[9]: /es/integrations/webhooks/
[10]: /es/integrations/webhooks/#sending-sms-through-twilio
[11]: /es/integrations/statuspage/
[12]: /es/integrations/servicenow/
[13]: /es/integrations/zoom_incident_management/