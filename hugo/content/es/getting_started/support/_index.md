---
description: Conozca las mejores prácticas para contactar al soporte de Datadog a
  través de chat o tickets para preguntas técnicas y problemas urgentes.
further_reading:
- link: https://docs.datadoghq.com/agent/troubleshooting/
  tag: Documentación
  text: Solución de problemas del Agent
- link: /account_management/guide/manage-your-support-tickets
  tag: Documentación
  text: Administre sus tickets de soporte
title: Introducción al soporte de Datadog
---
## Descripción general {#overview}

Datadog ofrece dos canales principales para los clientes que buscan soporte:
   - [Abrir un ticket de soporte][1].
   - Chatear en vivo con los ingenieros de soporte técnico de Datadog a través de un chat de texto.

Aunque ambas opciones se centran en proporcionar soluciones rápidas y eficaces, una plataforma puede ser más adecuada dependiendo del momento, la naturaleza y la urgencia de la solicitud.

Esta guía proporciona las mejores prácticas para comunicarse con el equipo de soporte y pautas para determinar el canal de soporte adecuado para usted.

## Requisitos previos {#prerequisites}

Para obtener la resolución más eficiente de un problema, esté preparado para proporcionar cualquiera de la información y los recursos relevantes que se enumeran a continuación:

   - Nombre de la organización (si tiene acceso a [más de una][2])
   - [Datadog Site][3]
   - Enlaces a cualquier página que demuestre el problema en su cuenta de Datadog
   - Capturas de pantalla o grabaciones de pantalla del comportamiento en cuestión
   - Pasos que se pueden seguir para replicar el problema
   - Si el problema está relacionado con el funcionamiento del Datadog Agent, un [Agent flare][4]
   - Enlaces a cualquier página de documentación utilizada

Para ayudarnos a resolver su solicitud lo más rápido posible, limite cada incidencia de soporte a un solo problema o pregunta. Los ingenieros de soporte trabajan en una incidencia a la vez, y combinar varias preguntas no relacionadas en una sola incidencia puede ralentizar la resolución. Si tiene varios problemas, abra una incidencia de soporte independiente para cada uno.
Ejemplo: Si necesita ayuda para solucionar un error de integración de AWS y también desea comprender cómo configurar un umbral de seguimiento, abra dos incidencias independientes.

## ¿Chat o ticket de soporte? {#chat-or-support-ticket}

Utilice la tabla a continuación para determinar si debe abrir un [ticket de soporte][1] o [comunicarse por chat](#reaching-out-on-chat).

| Ticket de soporte                  | Chat        |
| ------------------------------- | ----------- |
| Problemas urgentes                   | Soporte de configuración de producto
| Solicitudes de llamada/pantalla compartida       | Preguntas de configuración
| Incidentes e interrupciones           | Aclaración de documentación
| Solución de problemas complejos de soporte en muchos archivos de configuración, registros o consultas | Problemas menores que involucran un archivo de configuración, registro o consulta específico

<div class="alert alert-info">También puede usar el asistente de IA para encontrar respuestas a sus preguntas. Para acceder al asistente de IA, haga clic en el botón {{< ui >}}Support{{< /ui >}} en la esquina inferior izquierda del menú de navegación.</div>

Si no está seguro de qué opción es la mejor, no dude en usar cualquiera de los canales para comunicarse con el soporte de Datadog. Se crea automáticamente un ticket de soporte cada vez que se cierra un chat, por lo que el problema puede seguir investigándose incluso si no se resuelve en el chat.

## Comunicarse por chat {#reaching-out-on-chat}

<div class="alert alert-danger">El chat está disponible cualquier día hábil entre las 10:00 y las 19:00, hora del Este (ET). El chat no está disponible para cuentas habilitadas para HIPAA.</a></div>

Para comenzar, haga clic en {{< ui >}}Support{{< /ui >}} en la esquina inferior izquierda del menú de navegación.

{{< img src="getting_started/support/support_chat_nav.png" alt="El botón de Soporte en la parte inferior del menú de navegación izquierdo de la aplicación" style="width:40%" >}}

El asistente de IA aparece en su pantalla. Puede hacerle preguntas al asistente de IA o seleccionar {{< ui >}}Live Chat With Support{{< /ui >}}.

Cuando se abre un nuevo chat, se le pregunta si tiene una pregunta **técnica** o de **ventas**.
   - Para preguntas técnicas, se le dirige al primer ingeniero de soporte técnico disponible. Esto es ideal para cualquier pregunta que tenga sobre el uso o la configuración de Datadog.
   - Para preguntas de ventas, se le dirige al primer miembro disponible del equipo de ventas de Datadog, quien puede responder preguntas sobre facturación y gestión de cuentas.

**Nota**: Para problemas urgentes, es mejor comunicarse a través de un ticket de soporte e indicar por qué su solicitud es urgente. Esto ayuda a garantizar que el liderazgo de soporte pueda dirigir su incidencia a un experto adecuado de inmediato.

### Mejores prácticas para preguntas técnicas {#best-practices-for-technical-questions}

Asegúrese de tener tantos de los [requisitos previos](#prerequisites) relevantes disponibles como sea posible. El miembro del equipo de Datadog con el que se conecta en el chat hace todo lo posible para recopilar información sobre el problema y resolverlo. No todos los problemas pueden resolverse en una sesión de chat. Si se requiere una investigación más detallada, el soporte de Datadog se enfoca en recopilar la información necesaria para realizar la investigación una vez que termine el chat.

### Seguimiento{#following-up}

Cuando el chat se cierra, se crea automáticamente un ticket de soporte. Si el problema se resolvió en el chat, el ticket puede cerrarse.

Si se requiere una investigación adicional, el ticket se envía a los expertos en las áreas correspondientes, con una transferencia completa de los detalles y el contexto proporcionados durante el chat. Utilice el ticket para comunicarse más con el equipo de soporte de Datadog.

## Soporte de idioma{#language-support}

El soporte en idioma japonés está disponible de lunes a viernes de 09:00 a 17:00 hora estándar de Japón (JST), excluyendo los días festivos locales y del 29 de diciembre al 3 de enero. El soporte por chat en japonés está disponible de 10:00 a 16:00 JST en días hábiles.

El soporte en idioma coreano está disponible de lunes a viernes de 09:00 a 17:00 Hora estándar de Corea (KST), excluyendo los días festivos locales. El soporte por chat en coreano está disponible de 10:00 a 11:30 y de 13:00 a 16:00 KST, en días hábiles.

Cuando el soporte en su idioma preferido no esté disponible, puede continuar trabajando con el soporte de Datadog en inglés.

## Política de retención{#ticket-retention-policy}

Nuestra política de retención cambió el 12 de junio de 2026: los tickets cerrados, incluidos sus archivos adjuntos, ahora se eliminan 15 meses después de su última actualización. Comuníquese con nosotros si tiene alguna pregunta.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.datadoghq.com/hc/
[2]: /es/account_management/org_switching/
[3]: /es/getting_started/site/
[4]: /es/agent/troubleshooting/send_a_flare/