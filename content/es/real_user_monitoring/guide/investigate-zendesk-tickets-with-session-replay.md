---
title: Investigar tickets de Zendesk con Session Replay
---

## Información general

Al solucionar los problemas informados por los usuarios en los tickets de Zendesk, los ingenieros a menudo se esfuerzan por entender el contexto en el que se produjo el problema. Gracias a la integración de Zendesk y Session Replay, los equipos de asistencia pueden reproducir inmediatamente el contexto del usuario a partir de un ticket de Zendesk con un solo clic. Esto permite a los equipos de asistencia solucionar los problemas con más eficacia y reduce el tiempo que se tarda en ofrecer soluciones a los clientes.

Gracias a esta integración, los ingenieros de soporte pueden:
- Ver un vídeo de [Session Replay][3] de las acciones del usuario
- Examinar las llamadas al backend relacionadas
- Organizar los vídeos de Session Replay relacionados en una lista de reproducción


## Configuración

Para configurar la integración Zendesk, completa la sección **Cómo instalar** de la [página de Zendesk Marketplace para RUM Datadog][2].

## Explorar un vídeo de Session Replay de Zendesk

Para ver las repeticiones de sesiones asociadas a un ticket de Zendesk:

1. Ve al ticket en Zendesk.
2. Haz clic en el icono Datadog de la barra lateral derecha para ver una lista de las repeticiones de sesiones.
3. Haz clic en la repetición de una sesión para verla en Datadog.

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Acceder a una repetición de sesión de Zendesk" video=true >}}

En la página de repetición, puedes ver una lista de las acciones del usuario, junto con las llamadas del backend asociadas a cada acción. Pasa el ratón sobre un evento y haz clic en **Detalles** para ver las trazas (traces), los errores y otros datos asociados.

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt="Vista superior de un evento de repetición de sesión con el botón Detalles resaltado" style="width:60%;" >}}

También puedes añadir la repetición a una lista de reproducción para agrupar las incidencias relacionadas y facilitar la navegación y el uso compartido. Para obtener más información, consulta la [documentación sobre listas de reproducción de Session Replay][4].

[1]: /es/integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /es/real_user_monitoring/session_replay/browser/
[4]: /es/real_user_monitoring/session_replay/playlists