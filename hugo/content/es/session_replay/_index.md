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
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utilice Datadog Session Replay para ver los recorridos de los usuarios en
    tiempo real.
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utilice el análisis de embudo para comprender y optimizar los flujos clave
    de los usuarios
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Reproduzca visualmente los problemas que afectan a los usuarios con Zendesk
    y Datadog Session Replay.
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualice sus datos de RUM en el Explorer.
- link: /integrations/content_security_policy_logs
  tag: Documentación
  text: Detecte y agregue violaciones de CSP con Datadog
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centro de aprendizaje
  text: Introducción a Real User Monitoring (RUM)
title: Session Replay
---
## Descripción general\r {#overview}

Session Replay amplía el seguimiento de la experiencia del usuario al permitirle capturar y reproducir visualmente la experiencia de navegación web o de aplicaciones móviles de sus usuarios. Session Replay está disponible tanto en [RUM][1] como en [Product Analytics][2], lo que le ayuda a identificar y reproducir errores, comprender los recorridos de los usuarios y obtener información sobre los patrones de uso y los errores de diseño de su aplicación.

## Browser Session Replay\r {#browser-session-replay}

Browser Session Replay amplía el seguimiento de la experiencia del usuario al permitirle capturar y reproducir visualmente la experiencia de navegación web de sus usuarios. Combinado con los datos de rendimiento de RUM, Session Replay es beneficioso para la identificación, reproducción y resolución de errores, y proporciona información sobre los patrones de uso y los errores de diseño de su aplicación web.

RUM Browser SDK es [open source][3] y aprovecha el proyecto open source [rrweb][4].

Obtenga más información sobre [Session Replay for Browsers][5].

## Mobile Session Replay\r {#mobile-session-replay}

Mobile Session Replay amplía la visibilidad de sus aplicaciones móviles al reproducir visualmente cada interacción del usuario, como toques, deslizamientos y desplazamientos. Está disponible para aplicaciones nativas tanto en Android como en iOS. Reproducir visualmente las interacciones del usuario en sus aplicaciones facilita la reproducción de fallos y errores, así como comprender el recorrido del usuario para realizar mejoras en la interfaz de usuario.

Obtenga más información sobre [Session Replay for Mobile][6].

## Resúmenes con tecnología de IA y smart chapters\r {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Esta función no es compatible con su <a href="/getting_started/site">sitio de Datadog seleccionado</a> ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

Los resúmenes y los smart chapters le brindan contexto sobre lo que sucedió en una sesión antes de que la vea.

**Los resúmenes** describen la intención del usuario, las acciones clave, las señales de fricción y el resultado. Momentos específicos en el resumen están hipervinculados para que pueda saltar directamente a ese punto en el Session Replay. En la lista de sesiones, pase el cursor sobre un Session Replay para obtener una vista previa del resumen, o ábralo directamente. Si una sesión se ha resumido anteriormente, el resumen aparece al instante cuando abre el Session Replay.

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="Resumen con tecnología de IA en el reproductor de Session Replay, que muestra la intención del usuario, acciones de usuario clave, señales de fricción y momentos hipervinculados." style="width:100%;" >}}

**Smart chapters** segmentan automáticamente la línea de tiempo del Session Replay en etapas etiquetadas del recorrido del usuario. Por ejemplo, en una sesión de comercio electrónico, los capítulos podrían incluir "Explorar iluminación", "Comprar ropa de cama y sillas" y "Revisar carrito y finalizar compra". Los capítulos aparecen cuando pasa el cursor sobre la línea de tiempo y en el menú desplegable de los controles del Session Replay, lo que le permite saltar directamente entre ellos.

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="Menú desplegable de Smart chapters en el reproductor de Session Replay que muestra etapas etiquetadas del recorrido del usuario." style="width:100%;" >}}

Los resúmenes con IA y los Smart chapters se generan para sesiones con al menos cuatro acciones de usuario y una duración de al menos 45 segundos.

## Comentarios {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Esta función no es compatible con su <a href="/getting_started/site">sitio seleccionado de Datadog</a> ({{< region-param key="dd_site_name" >}}). Si requiere esta capacidad, comuníquese con <a href="/help/">Datadog Support</a>.</div>{{< /site-region >}}

Los comentarios de Session Replay permiten que su equipo colabore en errores, problemas de usabilidad y otras observaciones directamente dentro de un Session Replay.

Con los comentarios, usted puede:

- Agregar un comentario en una marca de tiempo específica en la línea de tiempo del Session Replay. Los marcadores de comentarios aparecen en la línea de tiempo y en la pestaña {{< ui >}}Comments{{< /ui >}}.
- @mencionar a un compañero de equipo o a un equipo en un comentario. Los usuarios etiquetados reciben una notificación por correo electrónico con un enlace que abre el Session Replay en la marca de tiempo comentada.
- Copiar un enlace a cualquier comentario y compartirlo externamente. El enlace abre el Session Replay en el momento anotado con ese hilo de comentarios abierto.
- Responda en el hilo para colaborar dentro de un Session Replay, y edite o elimine sus propios comentarios según sea necesario.

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="Reproductor de Session Replay con comentarios con marca de tiempo en la línea de tiempo y una pestaña de Comentarios abierta con respuestas en hilo." style="width:100%;" >}}

Para encontrar los Session Replays que necesitan su atención, utilice las listas de reproducción predeterminadas {{< ui >}}All mentions to me{{< /ui >}} y {{< ui >}}Commented replays{{< /ui >}}. Consulte [Session Replay Playlists][7] para obtener más detalles.

## Extender la retención de datos {#extend-data-retention}

De forma predeterminada, los datos de Session Replay se conservan durante 30 días.

Para extender la retención de datos de Session Replay a 15 meses, puede habilitar {{< ui >}}Extended Retention{{< /ui >}} en los Session Replays individuales. Estas sesiones deben estar inactivas (el usuario ha completado su experiencia).

Para acceder a cualquier Session Replay en un momento posterior, Datadog recomienda guardar la URL o agregarla a una [Playlist][7].

La retención extendida solo se aplica a Session Replay y no incluye los eventos asociados. Los 15 meses comienzan cuando se habilita la retención extendida, no cuando se recopila el Session Replay.

Puede desactivar la Retención extendida en cualquier momento. Si el Session Replay aún se encuentra dentro de sus 30 días de retención predeterminados, éste caduca al final del período inicial de 30 días. Si desactiva la Retención extendida en un Session Replay que tenga más de 30 días, éste caduca inmediatamente.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Habilitar la retención extendida" style="width:100%;" >}}

Consulte el siguiente diagrama para comprender qué datos se conservan con la retención extendida.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagrama de qué datos se conservan con la retención extendida" style="width:100%;" >}}

## Historial de reproducción\r {#playback-history}

Puede ver quién ha visto un Session Replay determinado haciendo clic en el recuento de **vistas** que se muestra en la página del reproductor. Esta función le permite verificar si alguien con quien desea compartir la grabación ya la ha visto.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Verifique quién ha visto la grabación de un Session Replay." style="width:100%;" >}}

El historial solo incluye los Session Replays que ocurrieron en la página del reproductor o en un reproductor incrustado, como en un [Notebook][8] o panel lateral. Los Session Replays incluidos también generan un evento de [Audit Trail][9]. Las vistas previas en miniatura no se incluyen en el historial.

Para ver su propio historial de Session Replay, consulte la lista de reproducción [{{< ui >}}My Watch History{{< /ui >}}][10].

## Listas de reproducción\r {#playlists}

Puede crear una lista de reproducción de Session Replays para organizarlas según cualquier patrón que observe. Obtenga más información sobre [Session Replay Playlists][7].

## Dev Tools\r {#dev-tools}

Dev Tools es un panel de depuración integrado en Session Replay que expone información clave durante la reproducción. Úselo para identificar problemas, rastrear solicitudes y comprender los cuellos de botella en el rendimiento, todo sin tener que reproducir el problema usted mismo. Dev Tools están disponibles para sesiones de [RUM][1].

Obtenga más información sobre Dev Tools para [browser][11] y [mobile][12].

## Lecturas adicionales\r {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/\r
[2]: /es/product_analytics/\r
[3]: https://github.com/DataDog/browser-sdk\r
[4]: https://www.rrweb.io/\r
[5]: /es/session_replay/browser/\r
[6]: /es/session_replay/mobile/\r
[7]: /es/session_replay/playlists\r
[8]: /es/notebooks/\r
[9]: /es/account_management/audit_trail/\r
[10]: /es/rum/replay/playlists/my-watch-history\r
[11]: /es/session_replay/browser/dev_tools/\r
[12]: /es/session_replay/mobile/dev_tools/