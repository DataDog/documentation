---
aliases:
- /es/real_user_monitoring/guide/session-replay-getting-started/
- /es/real_user_monitoring/session_replay/
- /es/product_analytics/session_replay/
- /es/real_user_monitoring/session_replay/developer_tools
- /es/real_user_monitoring/session_replay/browser/developer_tools
- /es/product_analytics/session_replay/browser/developer_tools
description: Aprenda cómo capturar y reproducir visualmente la experiencia de navegación
  web o de aplicaciones móviles de sus usuarios con Session Replay.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualice sus datos de RUM en el Explorer
- link: /integrations/content_security_policy_logs
  tag: Documentación
  text: Detecte y agregue violaciones de CSP con Datadog
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centro de aprendizaje
  text: Introducción a Real User Monitoring (RUM)
- link: https://www.datadoghq.com/blog/session-replay-custom-heatmap-backgrounds/
  tag: Blog
  text: Capture y analice mapas de calor personalizados en Session Replay
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: Blog
  text: Comprenda Session Replay más rápido con resúmenes de IA y capítulos inteligentes
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utilice Datadog Session Replay para visualizar los recorridos de usuario en
    tiempo real
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilice el análisis de embudo para comprender y optimizar los flujos clave
    de usuario
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Reproduzca visualmente problemas orientados al usuario con Zendesk y Datadog
    Session Replay
- link: https://www.datadoghq.com/blog/session-replay-investigate-collaborate/
  tag: Blog
  text: Encuentre, analice y colabore en sesiones de usuario en Datadog Session Replay
title: Session Replay
---
## Descripción general
 {#overview}

Session Replay amplía su monitoreo de experiencia de usuario al permitirle capturar y reproducir visualmente la experiencia de navegación web o de aplicaciones móviles de sus usuarios. Session Replay está disponible tanto en [RUM][1] como en [Product Analytics][2], lo que le ayuda a identificar y reproducir errores, comprender los recorridos de usuario y obtener información sobre los patrones de uso y los errores de diseño de su aplicación.

## Browser Session Replay
 {#browser-session-replay}

Browser Session Replay amplía su monitoreo de experiencia de usuario al permitirle capturar y reproducir visualmente la experiencia de navegación web de sus usuarios. Combinado con los datos de rendimiento de RUM, Session Replay es beneficioso para la identificación, reproducción y resolución de errores, y proporciona información sobre los patrones de uso y los errores de diseño de su aplicación web.

El SDK de RUM para navegador es [open source][3] y aprovecha el proyecto de código abierto [rrweb][4].

Obtenga más información sobre [Session Replay for Browsers][5].

## Mobile Session Replay
 {#mobile-session-replay}

Mobile Session Replay amplía la visibilidad de sus aplicaciones móviles al reproducir visualmente cada interacción de usuario, como toques, deslizamientos y desplazamientos. Está disponible para aplicaciones nativas tanto en Android como en iOS. Reproducir visualmente las interacciones de usuario en sus aplicaciones facilita la reproducción de fallos y errores, así como comprender el recorrido de usuario para realizar mejoras en la interfaz de usuario.

Obtenga más información sobre [Session Replay for Mobile][6].

## Resúmenes con tecnología de IA y capítulos inteligentes
 {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Esta función no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

Los resúmenes y los capítulos inteligentes le brindan contexto sobre lo que sucedió en una sesión antes de verla.

**Los resúmenes** describen la intención del usuario, las acciones clave, las señales de fricción y el resultado. Los momentos específicos en el resumen tienen hipervínculos para que pueda saltar directamente a ese punto en Session Replay. En la lista de sesiones, pase el cursor sobre una Session Replay para obtener una vista previa del resumen o abra la Session Replay directamente. Si una sesión se ha resumido anteriormente, el resumen aparece al instante cuando abre la Session Replay.

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="Resumen con tecnología de IA en el reproductor de Session Replay, que muestra la intención del usuario, acciones clave, señales de fricción y momentos con hipervínculos" style="width:100%;" >}}

**Capítulos inteligentes** segmenta automáticamente la línea de tiempo de Session Replay en etapas etiquetadas del recorrido del usuario. Por ejemplo, en una sesión de comercio electrónico, los capítulos podrían incluir "Explorar iluminación", "Comprar ropa de cama y sillas" y "Revisar carrito y finalizar compra". Los capítulos aparecen cuando pasa el cursor sobre la línea de tiempo y en el menú desplegable de los controles de Session Replay, lo que le permite saltar directamente entre ellos.

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="Menú desplegable de capítulos inteligentes en Session Replay que muestra las etapas etiquetadas del recorrido del usuario" style="width:100%;" >}}

Los resúmenes de IA y los capítulos inteligentes se generan para sesiones con al menos cuatro acciones de usuario y una duración de al menos 45 segundos.

## Comentarios
 {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Esta función no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}). Si requiere esta capacidad, comuníquese con <a href="/help/">Datadog Support</a>.</div>{{< /site-region >}}

Los comentarios de Session Replay permiten a su equipo colaborar en errores, problemas de usabilidad y otras observaciones directamente dentro de Session Replay.

Con los comentarios, usted puede:

- Agregue un comentario en una marca de tiempo específica en la línea de tiempo de Session Replay. Los marcadores de comentarios aparecen en la línea de tiempo y en la pestaña {{< ui >}}Comments{{< /ui >}}.
- @mencione a un compañero de equipo o equipo en un comentario. Los usuarios etiquetados reciben una notificación por correo electrónico con un enlace que abre Session Replay en la marca de tiempo comentada.
- Copie un enlace a cualquier comentario y compártalo externamente. El enlace abre Session Replay en el momento anotado con ese hilo de comentarios abierto.
- Responda en el hilo para colaborar dentro de Session Replay, y edite o elimine sus propios comentarios según sea necesario.

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="Reproductor de Session Replay con comentarios con marca de tiempo en la línea de tiempo y una pestaña de Comentarios abierta con respuestas en hilo." style="width:100%;" >}}

Para encontrar Session Replays que necesiten su atención, utilice las listas de reproducción predeterminadas {{< ui >}}All mentions to me{{< /ui >}} y {{< ui >}}Commented replays{{< /ui >}}. Consulte [Listas de reproducción de Session Replay][7] para obtener más detalles.

## Extender la retención de datos
 {#extend-data-retention}

De forma predeterminada, los datos de Session Replay se conservan durante 30 días. Para establecer el período de retención predeterminado para todos los Session Replay a más de 30 días, comuníquese con su equipo de cuenta.

Para extender la retención de datos de Session Replay a 15 meses, puede habilitar {{< ui >}}Extended Retention{{< /ui >}} en Session Replay individuales. Estas sesiones deben estar inactivas (el usuario ha completado su experiencia).

Para acceder a cualquier Session Replay en un momento posterior, Datadog recomienda guardar la URL o agregarla a una [Playlist][7].

Datadog también extiende la retención a 15 meses automáticamente cuando una Session Replay se utiliza en otra parte del producto:

- Agregar una Session Replay a una [Playlist][7].
- Guardar una Session Replay como una captura de pantalla de mapa de calor. Consulte [Análisis de mapas de calor más allá de la retención de Session Replay][12].

La Retención extendida solo se aplica a Session Replay y no incluye los eventos asociados. Los 15 meses comienzan cuando se habilita la Retención extendida, no cuando se recopila la sesión.

Puede deshabilitar la Retención extendida en cualquier momento. Si la Session Replay aún se encuentra dentro de sus 30 días de retención predeterminados, la Session Replay caduca al final del período inicial de 30 días. Si deshabilita la Retención extendida en una Session Replay que tiene más de 30 días, la Session Replay caduca inmediatamente.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Habilitar retención extendida" style="width:100%;" >}}

Consulte el siguiente diagrama para comprender qué datos se conservan con la retención extendida.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagrama de qué datos se conservan con la retención extendida" style="width:100%;" >}}

## Historial de reproducción
 {#playback-history}

Puede ver quién ha visto una determinada Session Replay haciendo clic en el recuento de **watched** que se muestra en la página del reproductor. Esta función le permite verificar si alguien con quien desea compartir la grabación ya la ha visto.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Verifique quién ha visto la grabación de una Session Replay" style="width:100%;" >}}

El historial incluye solo las reproducciones que ocurrieron en la página del reproductor o en un reproductor incrustado, como en un [Notebook][8] o panel lateral. Las reproducciones incluidas también generan un evento de [Audit Trail][9]. Las vistas previas en miniatura no se incluyen en el historial.

Para ver su propio historial de reproducción, consulte la [{{< ui >}}My Watch History{{< /ui >}}Playlist][10].

## Playlists
 {#playlists}

Puede crear una Playlist de Session Replay para organizarlas según los patrones que observe. Obtenga más información sobre [Session Replay Playlists][7].

## Dev Tools
 {#dev-tools}

Dev Tools es un panel de depuración integrado en Session Replay que expone información clave durante la reproducción. Úselo para identificar problemas, rastrear solicitudes y comprender los cuellos de botella en el rendimiento, todo sin tener que reproducir el problema usted mismo. Dev Tools están disponibles para sesiones de [RUM][1].

Obtenga más información sobre [Dev Tools][11].

## Lecturas adicionales
 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/

[2]: /es/product_analytics/

[3]: https://github.com/DataDog/browser-sdk

[4]: https://www.rrweb.io/

[5]: /es/session_replay/browser/

[6]: /es/session_replay/mobile/

[7]: /es/session_replay/playlists

[8]: /es/notebooks/

[9]: /es/account_management/audit_trail/

[10]: /es/rum/replay/playlists/my-watch-history

[11]: /es/session_replay/dev_tools

[12]: /es/session_replay/heatmaps/#analyzing-heatmaps-beyond-replay-retention