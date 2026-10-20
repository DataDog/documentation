---
description: Aprenda a adoptar RUM y Session Replay en su organización de Soluciones
  o Soporte.
further_reading:
- link: /real_user_monitoring/correlate_with_other_telemetry/apm/
  tag: Documentación
  text: Aprenda a conectar RUM con trazas de APM
- link: /session_replay/
  tag: Documentación
  text: Más información sobre Session Replay
- link: /session_replay/dev_tools
  tag: Documentación
  text: Aprenda sobre las herramientas de desarrollo del navegador (Browser Dev Tools)
title: Utilice Session Replay en su flujo de trabajo de soporte técnico
---
## Descripción general {#overview}

Puede habilitar a sus equipos de soluciones técnicas y de soporte para solucionar mejor los problemas de los clientes mediante [Session Replay][1]. Con RUM y Session Replay, puede localizar sesiones de usuario específicas, observar los recorridos de los usuarios y acceder a herramientas de desarrollo para ver eventos, registros, errores y atributos. 

Esta guía describe un flujo de trabajo que las organizaciones pueden replicar y usar como un activo para que los equipos de soluciones lo integren en sus flujos de trabajo.

{{< img src="real_user_monitoring/guide/session-replay/session-replay-recording.png" alt="Grabación de Session Replay de una sesión de usuario en la aplicación Shopist" style="width:100%;">}}

## Evalúe los problemas de los usuarios {#assess-user-issues}

Suponga que un cliente encuentra un problema al usar Datadog. Su equipo de Soluciones Técnicas puede usar una solución de soporte, como Zendesk o ServiceNow, que crea un ticket cuando este cliente informa que no puede actualizar o guardar una prueba de API en varios pasos de Synthetics. 

El equipo puede solicitar más información al cliente (como el ID de prueba específico y una grabación de pantalla con las [Browser Dev Tools][2] abiertas) que pueda proporcionar contexto adicional sobre por qué la prueba del cliente no se actualiza o guarda. Si no se registraron errores de consola, el equipo no tendría ninguna pista para comenzar a investigar el problema de la prueba de API en varios pasos. 

El equipo de Soluciones Técnicas puede intentar comprender las siguientes preguntas:

- ¿Cuál es el error exacto que está experimentando el cliente?
- ¿El cliente está viendo una notificación en la aplicación que indique un problema en particular (como un error de consola o un mensaje de error)?
- ¿En qué botones hizo clic el cliente y en qué orden? ¿Ocurrió una acción inesperada antes de que el cliente hiciera clic en un botón?

## Investigue la causa raíz {#investigate-the-root-cause}

Si hubiera una forma de visualizar el recorrido del usuario del cliente en Datadog y ver las solicitudes de backend asociadas, el equipo de Soluciones Técnicas tendría una mejor comprensión de lo que podría estar causando este problema.

{{< img src="real_user_monitoring/guide/session-replay/apm-traces-in-session-replay.png" alt="Una traza de pila de APM asociada con una acción de visualizar de RUM." style="width:100%;">}}

Con la integración de APM, puede conectar solicitudes de su aplicación web con las trazas de backend correspondientes para acceder a los datos de traza de APM desde un evento de RUM y descubrir cualquier error de backend en la pestaña {{< ui >}}Errors{{< /ui >}}. 

Para obtener más información, consulte [Conectar RUM y trazas][3].

## Vea sesiones de usuario en Session Replay {#watch-user-sessions-in-session-replay}

El equipo de Soluciones Técnicas puede tener herramientas internas que conectan una plataforma de soporte, como Zendesk, con productos de Datadog, como RUM & Session Replay. Por ejemplo, un enlace contextual en Zendesk puede redirigirlo al [Explorador de RUM][4] y completar automáticamente el ID de usuario en la consulta de búsqueda. Filtre por sesiones de usuario individuales desde la lista de eventos.

El equipo de Soluciones Técnicas puede usar Session Replay para visualizar una réplica del recorrido del usuario en Datadog y usar las herramientas de desarrollo del navegador para acceder a errores adicionales que puedan aparecer en el frontend. Con acceso a errores de frontend y trazas de backend, su equipo de Soluciones Técnicas está facultado para utilizar la integración de RUM & Session Replay y APM para ayudar a solucionar problemas de los clientes.

Haga clic en una sesión de usuario con una grabación de reproducción para observar el comportamiento del usuario en la plataforma Datadog. Al usar Session Replay, puede localizar los eventos de RUM correspondientes e identificar la acción `click` específica para guardar la prueba de API en varios pasos. Hacer clic en {{< ui >}}Save{{< /ui >}} en la interfaz de usuario activa la llamada de backend para guardar la configuración de la prueba.

## Descubra errores en las trazas de backend {#uncover-errors-in-backend-traces}

Al examinar los errores en la traza de APM de la prueba de API en varios pasos, el equipo de Soluciones Técnicas puede encontrar un `APIInvalidInputError` relacionado con el `maxLength` de una configuración `​​https://properties.steps.items.properties.name/`, que parece ser la causa raíz del error al guardar la prueba. 

{{< img src="real_user_monitoring/guide/session-replay/view-traces.png" alt="Una traza de pila de APM asociada con una acción de visualizar de RUM." style="width:100%;">}}

La prueba de API en varios pasos no se guardó debido a un límite de caracteres en el nombre del paso. 

## Resuelva los problemas de los usuarios {#resolve-user-problems}

Para resolver este problema del cliente, el equipo de Soluciones Técnicas puede solicitar al equipo de Producto que actualice el flujo de trabajo de la prueba de API en varios pasos con ayuda contextual para cuando una prueba no se pueda guardar. 

También se puede alentar al equipo de Frontend a implementar un mensaje de error en la interfaz de usuario que garantice que los usuarios sean notificados cuando superen el límite máximo de caracteres para el nombre del paso de la prueba.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/session_replay/
[2]: /es/session_replay/dev_tools
[3]: /es/real_user_monitoring/connect_rum_and_traces
[4]: https://app.datadoghq.com/rum/explorer