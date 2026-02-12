---
further_reading:
- link: /service_management/incident_management/incident_settings
  tag: Documentación
  text: Personalizar notificaciones en la configuración de incidencias
- link: /monitors/notify/variables/?tab=is_alert
  tag: Documentación
  text: Monitorizar variables de notificación
title: Notificación de incidencia
---

## Información general

Todas las notificaciones de partes interesadas de una incidencia se consolidan en la pestaña de Notificaciones de la incidencia. Puedes crear manualmente, guardar como borrador y enviar notificaciones directamente desde esta página. Las notificaciones automatizadas enviadas por [Reglas de notificación][1] para la incidencia en cuestión también se enumeran en esta sección.

## Añadir una notificación

Para crear una notificación manual:
1. Navega hasta la pestaña **Notifications** (Notificaciones) de una incidencia.
1. Haz clic en el botón **+New Notification** (+ Notificación nueva) en la parte superior derecha de la sección.
1. Introduce los destinatarios deseados. Estos pueden ser cualquier encabezado de notificación compatible con Datadog, incluyendo correos electrónicos, canales de Slack, encabezados de PagerDuty y webhooks.
1. Selecciona una [Plantilla de mensaje](#message-template).
1. Edita el título y el mensaje de tu notificación mediante Markdown y cualquier variable de plantilla de incidencia compatible escribiendo `{{`.
    - [Las variables de plantilla][2] se basan en las propiedades de una incidencia. Antes de enviar un mensaje, todas las variables de plantilla se sustituyen por el valor correspondiente de la propiedad referenciada que esté disponible para el mensaje en el momento de su envío.
1. Utiliza la variable `{{incident.created}}` para personalizar la zona horaria de tu mensaje. Esta variable de plantilla mostrará la opción para establecer tu zona horaria variable.
1. Envía tu notificación o guárdala como borrador.

## Ver todas las notificaciones

{{< img src="/service_management/incidents/notificación/incident_notifications_sent.png" alt="Pestaña de notificación de una incidencia que muestra la lista de ejemplos de mensajes enviados" style="width:90%;" >}}

La pestaña Notificaciones de una incidencia enumera notificaciones como **Drafts** (Borradores) y **Sent** (Enviados). Ambas listas muestran:
- Los destinatarios (previstos) de una notificación.
- El contenido del mensaje de notificación y los mensajes de renotificación que se hayan enviado.
- Fecha de la última actualización de la notificación.
- El autor original de la notificación.

La lista **Sent** (Enviado) también muestra si una notificación fue enviada manual o automáticamente por una [regla de notificación](#customizable-rules). Si la notificación fue automatizada, se muestra la regla que activó la notificación.

## Personalizar las reglas de notificación

Las reglas de notificación te permiten notificar automáticamente a las partes interesadas en función de los criterios de coincidencia de la incidencia. Los criterios de coincidencia incluyen la gravedad de la incidencia, los servicios afectados, el estado, la categoría de causa raíz y un nombre de recurso específico. Por ejemplo, puedes configurar una regla que notifique automáticamente a tu equipo de liderazgo por correo electrónico cada vez que se produzca una incidencia SEV-1. Con esta regla, la persona que declara la incidencia no tiene que saber a quién involucrar en cada escenario.

Para obtener más información sobre cómo configurar una nueva regla de notificación, consulta la documentación [Configuración de incidencias][1].

## Plantillas de mensajes

Las plantillas de mensajes son mensajes dinámicos y reutilizables que pueden usarse en [notificaciones de incidencias manuales](#add-a-notification), o [reglas de notificación](#customize-notification-rules) automatizadas. Las plantillas de mensajes aprovechan las variables de plantilla, como `{{incident.severity}}`, para inyectar de forma dinámica el valor correspondiente de la incidencia para la que se envía la notificación. Las plantillas de mensajes son compatibles con Markdown, de modo que las notificaciones de incidencia pueden incluir formato de texto, tablas, listas con sangría e hipervínculos. Las variables de plantilla son compatibles tanto con el título como con el cuerpo del mensaje.

Para obtener más información sobre cómo crear una plantilla de mensaje, consulta la documentación [Configuración de incidencias][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/incident_settings/notification_rules
[2]: /es/monitors/notify/variables/?tab=is_alert
[3]: /es/service_management/incident_management/incident_settings/templates