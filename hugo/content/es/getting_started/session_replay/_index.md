---
further_reading:
- link: /real_user_monitoring/session_replay/browser
  tag: Documentación
  text: Session Replay
- link: /real_user_monitoring/session_replay/mobile/
  tag: Documentación
  text: Session Replay para móvil
- link: https://www.datadoghq.com/knowledge-center/session-replay/
  tag: Centro de aprendizaje
  text: Información general de Session Replay
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliza Session Replay de Datadog para ver en tiempo real los recorridos de
    los usuarios
- link: /real_user_monitoring/browser/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
title: Empezando con Session Replay
---

{{< img src="/getting_started/session_replay/preview.mp4" alt="Vista previa de Session Replay" style="width:100%" video=true >}}

## Información general

Session Replay es una herramienta visual que recrea las sesiones de usuario de tus aplicaciones para ofrecerte una visión detallada, similar a la de vídeo, de cómo interactúan realmente los clientes con tu producto. Session Replay complementa los datos cuantitativos tradicionales —como los recuentos de clics, las tasas de rebote y las métricas de páginas vistadas— con un contexto de calidad para analizar mejor las acciones de tus usuarios.

Esta página te guiará por los primeros pasos con Session Replay en Datadog. Si aún no lo has hecho, [crea una cuenta en Datadog ][1].

## Configurar Session Replays

Session Replay está disponible para aplicaciones de navegador y aplicaciones móviles. Los ejemplos de esta guía muestran el uso de Session Replay con una aplicación de navegador. 

Para empezar a recopilar datos para Session Replay:

1. Configura [Monitorización del navegador de RUM de Datadog][7] creando una aplicación RUM [asegúrate de activar la opción **Session Replay Enabled** (Session Replay habilitada) para acceder a las grabaciones de la repetición].
2. Genera un **Client Token** (Token de cliente). 
3. Inicia el SDK del navegador de RUM insertando el código de configuración generado al crear la aplicación RUM en la fuente de tu aplicación.

Hasta que Datadog empiece a recibir datos, tu aplicación aparecerá como `pending` en la página **Aplicaciones de RUM**.

Para obtener instrucciones más detalladas sobre la recopilación de datos de Session Replay, sigue la [Documentación de configuración de RUM][2] para tu aplicación. Para configurar Session Replay en aplicaciones móviles, consulta [Session Replay para móvil][3].

## Buscar Session Replays concretas

Una vez que estés recopilando datos de Session Replay, ve al [Explorador de RUM][4] y selecciona **Session Replay available** (Session Replay disponible) para ver todas las sesiones con una repetición adjunta. Puedes visualizar estos datos como **List** (Lista), **Timeseries** (Cronologías) u otro formato.

{{< img src="/getting_started/session_replay/session-replay-available.png" alt="Botón que indica que Session Replay está disponible, así como las opciones de visualización" style="width:100%" >}}

Supongamos que te han informado de que un cliente ha tenido problemas con tu aplicación en un dispositivo móvil. Puedes filtrar sesiones utilizando **facetas**. En este caso, filtrar por [faceta][5] es útil para buscar información específica, como un usuario o un tipo de dispositivo concretos.

{{< img src="/getting_started/session_replay/facets-views.png" alt="Filtrar por faceta" style="width:100%" >}}

Es probable que hayas creado una [Vista guardada][6] que te muestra todas las sesiones que contienen un error específico que genera tu aplicación. Abrir esta vista es útil cuando sabes dónde está el problema y quieres ver repeticiones de sesiones de usuarios donde se ha producido.

{{< img src="/getting_started/session_replay/pinned-views.png" alt="Menú desplegable de vistas" style="width:100%" >}}

## Examinar el recorrido del usuario

La repetición de la sesión se muestra en formato de vídeo a la izquierda, con las herramientas de navegación estándar. Inicia la repetición desde el principio haciendo clic en play y observa todo lo que hizo un usuario en particular. 

El **User Journey** (Recorrido del usuario) es una cronología de eventos que se muestra en la parte derecha de la página. Puedes navegar a cualquier momento del recorrido del usuario haciendo clic en un evento en la lista. También puedes llevar un control de todas las acciones y errores que se producen en cada vista haciendo clic en **Session Breakdown** (Desglose de la sesión).

{{< img src="/getting_started/session_replay/user-journey.png" alt="Panel con el recorrido del usuario" style="width:100%" >}}

Selecciona **Events** (Eventos) para filtrar la lista del recorrido del usuario por los siguientes tipos de evento:

- **View** (Vista)
- **Action** (Acción)
- **Error** (Error)
- **Frustration Signal** (Señal de frustración)

Al pasar el ratón por encima de un momento determinado o de una vista del recorrido del usuario, selecciona **Detalles** (Detalles) para examinar Core Web Vitals y otra información pertinente sin salir de la repetición.

{{< img src="/getting_started/session_replay/details-panel.png" alt="Panel con detalles adicionales">}}

En la página de detalles, puedes ampliar la vista en cascada para obtener información más exhaustiva.

{{< img src="/getting_started/session_replay/performance-waterfall.png" alt="Cascada de rendimiento expandida">}}

## Solución de problemas mediante herramientas de desarrollo

Abre las [herramientas de desarrollo del navegador][8] de Session Replay para explorar el rendimiento de tu aplicación, la consola de logs, los errores y los atributos de la aplicación o del usuario asociados a la repetición actual. 

{{< img src="/getting_started/session_replay/dev-tools.png" alt="Consola de herramientas de desarrollo" style="width:100%" >}}

## Pasar a datos correlacionados

Session Replay se integra con métricas, trazas y logs de tu aplicación para ofrecerte un contexto útil para la depuración de problemas. El uso de APM y el rastreo de errores junto con Session Replay te permite investigar el origen de los problemas de cara al usuario, independientemente de dónde se originen en tu stack.

### Investigación del rendimiento de las solicitudes con trazas de APM

Las [trazas de APM][9] combinadas con una Session Reply te dan una visión completa de los problemas de frontend y backend, y te permiten ver cómo el código y la infraestructura están afectando a tu experiencia de usuario. Disponer de trazas de stack completas puede ser de utilidad cuando no tienes claro si un error se está produciendo en el frontend o en el backend de tu aplicación. 

Selecciona una repetición con trazas para ver la solicitud del navegador, así como todas las dependencias de backend y servicios a los que se recurre para responder a la solicitud en una página específica.

{{< img src="/getting_started/session_replay/traces-view.png" alt="Panel de trazas" style="width:100%" >}}

Selecciona **View Trace in APM** (Ver traza en APM) para ver información más detallada, incluidos los errores y logs asociados a la traza.

{{< img src="/getting_started/session_replay/APM.png" alt="Página de APM con información más detallada" style="width:100%" >}}

### Investigación con el rastreo de errores

El [rastreo de errores][10] es útil para depurar problemas y llegar a la raíz del problema. Puedes recibir alertas cuando se produce un error, ver la línea exacta de código que lo ha provocado y pivotar para ver la sesión de usuario en la que se ha producido el error.

En la pestaña **Errors** (Errores), selecciona un error para ver el mensaje y la hora en la que se produjo. Haz clic en **Issue in error tracking** (Problema en el rastreo de errores) para ver más detalles y atributos asociados a la sesión.

{{< img src="/getting_started/session_replay/error-tracking.png" alt="Panel de rastreo de errores" style="width:100%" >}}

## ¿Qué toca hacer ahora?

### Crear tests Synthetic de navegador a partir de Session Replays

Puedes [crear un tests Synthetic de navegador][11] a partir de la secuencia exacta de pasos que siguieron tus usuarios en una Session Replay. Datadog ejecuta tests Synthetic en una programación automatizada que tú defines para simular el comportamiento del usuario. Esto te informa de las pruebas que fallan sin que tus usuarios tengan que volver a toparse con el problema.

Para registrar una Session Reply en un tests Synthetic de navegador, haz clic en **Generate Synthetic Browser Test** (Generar test Synthetic de navegador) encima de la cronología del evento.

{{< img src="/getting_started/session_replay/browser-test.png" alt="Ventana emergente de creación de test de navegador" style="width:100%" >}}

Para obtener más información sobre la gestión, ejecución e interpretación de los resultados de los tests, lee [Tests Synthetic de navegador][12].

### Compartir con tu equipo

Puedes compartir la repetición con tu equipo seleccionando el menú desplegable **Share** (Compartir) en la parte superior de la página. Puedes iniciar la repetición en un momento específico para dirigir la atención de tu equipo a un momento y una vista concretos de la repetición.

{{< img src="/getting_started/session_replay/share.png" alt="Compartir tu ventana emergente de repetición" style="width:100%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/?_gl=1*2g30ya*_gcl_au*OTEwMTA2MjI5LjE2OTIxMDc1MzA.*_ga_KN80RDFSQK*MTY5NDAwODQ4OS40OC4xLjE2OTQwMDg2MzcuMC4wLjA.
[2]: /es/real_user_monitoring/#get-started
[3]: /es/real_user_monitoring/session_replay/mobile/
[4]: https://app.datadoghq.com/rum/sessions
[5]: /es/real_user_monitoring/explorer/search/#facets
[6]: /es/real_user_monitoring/explorer/saved_views/
[7]: /es/real_user_monitoring/browser/setup/
[8]: /es/real_user_monitoring/session_replay/browser/developer_tools
[9]: /es/real_user_monitoring/connect_rum_and_traces
[10]: /es/real_user_monitoring/error_tracking/
[11]: /es/synthetics/guide/rum-to-synthetics/
[12]: /es/synthetics/browser_tests/