---
description: Integre Session Replay con Zendesk para ayudar a los equipos de soporte
  a solucionar problemas de los usuarios viendo las Session Replay directamente desde
  los tickets.
title: Investigue tickets de Zendesk con Session Replay
---
## Descripción general {#overview}

Al solucionar problemas reportados por los usuarios en tickets de Zendesk, los ingenieros a menudo tienen dificultades para entender el contexto en el que ocurrió el problema. Con la integración de Zendesk y Session Replay, los equipos de soporte pueden reproducir inmediatamente el contexto del usuario desde un ticket de Zendesk con un solo clic. Esto permite a los equipos de soporte solucionar problemas de manera más eficiente y reduce el tiempo necesario para brindar soluciones a los clientes.

Con esta integración, los ingenieros de soporte pueden:
- Ver una [Session Replay][3] de las acciones del usuario
- Examinar llamadas de backend relacionadas
- Organizar Session Replay relacionadas en una lista de reproducción


## Configuración {#setup}

Para configurar la integración de Zendesk, complete la sección **Cómo instalar** de la [página de Zendesk Marketplace para Datadog RUM][2].

## Explore una Session Replay desde Zendesk {#explore-a-session-replay-from-zendesk}

Para visualizar las Session Replay asociadas con un ticket de Zendesk:

1. Navegue hasta el ticket en Zendesk.
2. Haga clic en el icono de Datadog en la barra lateral derecha para visualizar una lista de Session Replay.
3. Haga clic en una Session Replay para visualizarla en Datadog.

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Acceso a una Session Replay desde Zendesk" video=true >}}

Desde la página de Session Replay, puede visualizar una lista de las acciones del usuario, junto con las llamadas de backend asociadas con cada acción. Pase el cursor sobre un evento y haga clic en {{< ui >}}Details{{< /ui >}} para visualizar los traces, errores y más información asociados.

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt="Vista al pasar el cursor sobre un evento de Session Replay con el botón Detalles resaltado." style="width:60%;" >}}

También puede agregar la Session Replay a una lista de reproducción para agrupar problemas relacionados y facilitar su exploración y uso compartido. Para obtener más información, consulte la [documentación de listas de reproducción de Session Replay][4].

[1]: /es/integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /es/session_replay/
[4]: /es/session_replay/playlists