---
aliases:
- /es/real_user_monitoring/guide/session-replay-getting-started/
description: Descubre cómo capturar y reproducir visualmente la experiencia de navegación
  web o con aplicaciones móviles de tus usuarios con Session Replay.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Uso de Datadog Session Replay para ver los recorridos de los usuarios en tiempo
    real
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilizar el análisis del embudo para comprender y optimizar los flujos de
    usuarios clave
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Reproducir visualmente los problemas de los usuarios con Zendesk y Datadog
    Session Replay
- link: /integrations/content_security_policy_logs
  tag: Documentación
  text: Detectar y agregar las infracciones de la CSP con Datadog
title: Reproducción de la actividad del usuario
---


## Información general

Session Replay amplía tu experiencia de monitorización de usuarios, ya que te permite capturar y reproducir visualmente la experiencia de navegación web o con aplicaciones móviles de tus usuarios. Combinada con los datos de rendimiento de RUM, Session Replay es útil para identificar, reproducir y solucionar errores, y proporciona información sobre los patrones de uso y los fallos de diseño de tu aplicación.

## Session Replay de navegador

Session Replay de navegador amplía tu experiencia de monitorización de usuarios, ya que te permite capturar y reproducir visualmente la experiencia de navegación web de tus usuarios. Combinada con los datos de rendimiento de RUM, Session Replay es útil para identificar, reproducir y solucionar errores, y proporciona información sobre los patrones de uso y los fallos de diseño de tu aplicación web.

El SDK del navegador RUM es de [código abierto][1] y aprovecha el proyecto de código abierto [rrweb][2].

Más información sobre [Session Replay para navegadores][3].

## Session Replay para móviles

Session Replay para móviles amplía la visibilidad de tus aplicaciones móviles reproduciendo visualmente cada interacción del usuario, como toques, deslizamientos y desplazamientos. Está disponible para aplicaciones nativas, tanto en Android como en iOS. La reproducción visual de las interacciones del usuario en tus aplicaciones facilita la reproducción de fallos y errores, así como la comprensión del recorrido del usuario para introducir mejoras en la interfaz de usuario.

Más información sobre [Session Replay para móviles][4].

## Historial de reproducción

Puedes ver quién ha visto la repetición de una sesión determinada haciendo clic en el recuento de **vistos** que aparece en la página del reproductor. Esta función te permite consultar si alguien con quien quieres compartir la grabación ya la ha visto.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Consultar quién ha visto la grabación de una sesión" style="width:100%;" >}}

El historial sólo incluye las reproducciones que se han realizado en la página del reproductor o en un reproductor integrado, como en un [notebook][5] o panel lateral. Las reproducciones incluidas también generan un evento de [Audit Trail][6]. Las previsualizaciones en miniatura no se incluyen en el historial.

Para ver tu propio historial de reproducción, consulta la lista de reproducción [Mi historial de vistas][7].

## Listas de reproducción

Puedes crear una lista de reproducción de Session Replays para organizarlas según los patrones que observes. Para obtener más información, consulta [Listas de reproducción de Session Replay][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: /es/product_analytics/session_replay/browser/
[4]: /es/product_analytics/session_replay/mobile/
[5]: https://docs.datadoghq.com/es/notebooks/
[6]: https://docs.datadoghq.com/es/account_management/audit_trail/
[7]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
[8]: /es/product_analytics/session_replay/playlists