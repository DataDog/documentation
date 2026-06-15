---
aliases:
- /es/real_user_monitoring/guide/session-replay-getting-started/
- /es/real_user_monitoring/session_replay/
- /es/product_analytics/session_replay/
- /es/real_user_monitoring/session_replay/developer_tools
- /es/real_user_monitoring/session_replay/browser/developer_tools
- /es/product_analytics/session_replay/browser/developer_tools
description: Aprende cómo capturar y reproducir visualmente la experiencia de navegación
  web o de aplicaciones móviles de tus usuarios con la reproducción de sesión.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliza la reproducción de sesión de Datadog para ver los recorridos de los
    usuarios en tiempo real
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliza el análisis de embudos para comprender y optimizar los flujos clave
    de usuarios
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Reproduce visualmente los problemas que enfrentan los usuarios con Zendesk
    y la Reproducción de Sesiones de Datadog
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualiza tus datos de RUM en el Explorador
- link: /integrations/content_security_policy_logs
  tag: Documentación
  text: Detecta y agrega violaciones de CSP con Datadog
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centro de Aprendizaje
  text: Introducción a la Monitorización de Usuarios Reales (RUM)
title: Reproducción de sesión
---
## Descripción General {#overview}

La reproducción de sesión amplía tu monitoreo de la experiencia del usuario al permitirte capturar y reproducir visualmente la experiencia de navegación web o de aplicaciones móviles de tus usuarios. La reproducción de sesión está disponible tanto en [RUM][1] como en [Product Analytics][2], ayudándote a identificar y reproducir errores, comprender los recorridos de los usuarios y obtener información sobre los patrones de uso y las fallas de diseño de tu aplicación.

## Reproducción de sesión del navegador {#browser-session-replay}

La reproducción de sesión del navegador amplía tu monitoreo de la experiencia del usuario al permitirte capturar y reproducir visualmente la experiencia de navegación web de tus usuarios. Combinada con los datos de rendimiento de RUM, la reproducción de sesión es beneficiosa para la identificación, reproducción y resolución de errores, y proporciona información sobre los patrones de uso y las fallas de diseño de tu aplicación web.

El SDK del Navegador RUM es [código abierto][3] y aprovecha el proyecto de código abierto [rrweb][4].

Aprende más sobre la [reproducción de sesión para navegadores][5].

## Reproducción de sesión móvil {#mobile-session-replay}

La reproducción de sesión móvil amplía la visibilidad de tus aplicaciones móviles al reproducir visualmente cada interacción del usuario, como toques, deslizamientos y desplazamientos. Está disponible para aplicaciones nativas tanto en Android como en iOS. Reproducir visualmente las interacciones del usuario en tus aplicaciones facilita la reproducción de fallos y errores, así como entender el recorrido del usuario para realizar mejoras en la interfaz de usuario.

Aprende más sobre la [reproducción de sesión para móviles][6].

## Resúmenes impulsados por IA y capítulos inteligentes {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Esta función no es compatible con tu sitio <a href="/getting_started/site">Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

Los resúmenes y capítulos inteligentes te brindan contexto sobre lo que sucedió en una sesión antes de que la veas.

**Los resúmenes** describen la intención del usuario, acciones clave, señales de fricción y resultado. Momentos específicos en el resumen están hipervinculados para que puedas saltar directamente a ese punto en la reproducción. En la lista de sesiones, pasa el cursor sobre una reproducción para previsualizar el resumen, o abre la reproducción directamente. Si una sesión ha sido resumida antes, el resumen aparece instantáneamente cuando abres la reproducción.

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="Resumen impulsado por IA en el reproductor de reproducción de sesión, mostrando la intención del usuario, acciones clave, señales de fricción y momentos hipervinculados." style="width:100%;" >}}

**Los capítulos inteligentes** segmentan automáticamente la línea de tiempo de la reproducción en etapas etiquetadas del recorrido del usuario. Por ejemplo, en una sesión de comercio electrónico, los capítulos podrían incluir "Explorar iluminación", "Comprar ropa de cama y sillas", y "Revisar carrito y pagar". Los capítulos aparecen cuando pasas el cursor sobre la línea de tiempo y en el menú desplegable de los controles del reproductor, permitiéndote saltar directamente entre ellos.

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="Menú desplegable de capítulos inteligentes en el reproductor de reproducción de sesión mostrando etapas etiquetadas del recorrido del usuario." style="width:100%;" >}}

Los resúmenes impulsados por IA y los capítulos inteligentes se generan para sesiones con al menos cuatro acciones de usuario y una duración de al menos 45 segundos.

## Comentarios {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Esta función no es compatible con tu sitio <a href="/getting_started/site">Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}). Si requiere esta capacidad, comuníquese con <a href="/help/">Soporte de Datadog</a>.</div>{{< /site-region >}}

Los comentarios de la reproducción de sesión permiten a su equipo colaborar en errores, problemas de usabilidad y otras observaciones directamente dentro de una reproducción.

Con los comentarios, usted puede:

- Agregar un comentario en un momento específico de la línea de tiempo de la reproducción. Los marcadores de comentarios aparecen en la línea de tiempo y en la pestaña de **Comentarios**.
- @mencionar a un compañero de equipo o a un equipo en un comentario. Los usuarios etiquetados reciben una notificación por correo electrónico con un enlace que abre la reproducción en el momento comentado.
- Copiar un enlace a cualquier comentario y compartirlo externamente. El enlace abre la reproducción en el momento anotado con ese hilo de comentarios abierto.
- Responder en el hilo para colaborar dentro de una reproducción, y editar o eliminar sus propios comentarios según sea necesario.

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="Reproductor de reproducción de sesión con comentarios con marca de tiempo en la línea de tiempo y una pestaña de Comentarios abierta con respuestas en hilo." style="width:100%;" >}}

Para encontrar reproducciones que necesiten su atención, use las listas de reproducción predeterminadas de **Todas las menciones a mí** y **Reproducciones comentadas**. Vea [Listas de reproducción de sesión][7] para más detalles.

## Extender la retención de datos {#extend-data-retention}

Por defecto, los datos de reproducción de sesión se retienen durante 30 días.

Para extender la retención de datos de reproducción de sesión a 15 meses, puede habilitar _Retención Extendida_ en reproducciones de sesiones individuales. Estas sesiones deben ser no activas (el usuario ha completado su experiencia).

Para acceder a cualquier reproducción de sesión en un momento posterior, Datadog recomienda guardar la URL o agregarla a una [Lista de reproducción][7].

La Retención Extendida solo se aplica a la Reproducción de Sesión y no incluye los eventos asociados. Los 15 meses comienzan cuando se habilita la Retención Extendida, no cuando se recopila la sesión.

Puedes desactivar la Retención Extendida en cualquier momento. Si la reproducción de la sesión aún está dentro de su período predeterminado de retención de 30 días, la reproducción expira al final de la ventana inicial de 30 días. Si desactivas la Retención Extendida en una reproducción de sesión que tiene más de 30 días, la reproducción expira de inmediato.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Habilitar retención extendida" style="width:100%;" >}}

Consulta el diagrama a continuación para entender qué datos se retienen con la retención extendida.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Diagrama de qué datos se retienen con la retención extendida" style="width:100%;" >}}

## Historial de reproducciones {#playback-history}

Puedes ver quién ha visto una reproducción de sesión dada haciendo clic en el conteo de **visto** que se muestra en la página del reproductor. Esta función te permite verificar si alguien con quien deseas compartir la grabación ya la ha visto.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Verifica quién ha visto la grabación de una sesión" style="width:100%;" >}}

El historial incluye solo las reproducciones que ocurrieron en la página del reproductor o en un reproductor embebido, como en un [Notebook][8] o panel lateral. Las reproducciones incluidas también generan un evento de [Audit Trail][9]. Las vistas previas en miniatura no están incluidas en el historial.

Para ver tu propio historial de reproducciones, consulta la lista de reproducción de [Mi Historial de Visualización][10].

## Listas de reproducción {#playlists}

Puedes crear una lista de reproducción de Reproducciones de Sesión para organizarlas según cualquier patrón que notes. Aprende más sobre [Listas de Reproducción de Reproducciones de Sesión][7].

## Herramientas de Desarrollo {#dev-tools}

Las Herramientas de Desarrollo son un panel de depuración integrado en la Reproducción de Sesión que expone información clave durante la reproducción. Úsalo para identificar problemas, rastrear solicitudes y entender cuellos de botella en el rendimiento, todo sin reproducir el problema tú mismo. Las herramientas de desarrollo están disponibles para sesiones de [RUM][1].

Aprenda más sobre las herramientas de desarrollo para [navegador][11] y [móvil][12].

## Lectura adicional {#further-reading}

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
[11]: /es/session_replay/browser/dev_tools/
[12]: /es/session_replay/mobile/dev_tools/