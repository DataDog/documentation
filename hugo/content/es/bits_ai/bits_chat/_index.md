---
aliases:
- /es/bits_ai/getting_started/
- /es/bits_ai/chat_with_bits_ai
- /es/bits_ai/bits_assistant/
- /es/tracing/guide/latency_investigator/
description: Utilice Bits Chat en Datadog para explorar y actuar sobre sus datos de
  observabilidad mediante lenguaje natural.
further_reading:
- link: bits_ai/
  tag: Documentación
  text: Descripción general de Bits AI
- link: /incident_response/incident_management/investigate/incident_ai
  tag: Documentación
  text: Coordine incidentes con Incident AI.
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentación
  text: Cloud Cost Skill en Bits Chat
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: Créditos de AI
- link: https://www.datadoghq.com/blog/datadog-mcp-apps/
  tag: Blog
  text: 'Datadog MCP Apps: experiencias interactivas en flujos de trabajo de AI'
- link: https://www.datadoghq.com/blog/introducing-bits-chat/
  tag: Blog
  text: Busque y actúe en todo Datadog para resolver problemas más rápido con Bits
    Chat.
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: Blog
  text: Responda cualquier pregunta sobre costos más rápido con la habilidad Cloud
    Cost en Bits Chat.
- link: https://www.datadoghq.com/blog/bits-chat-slack-incident-response/
  tag: Blog
  text: 'De la alerta a la resolución: gestione incidentes con Bits Chat en Slack'
title: Bits Chat
---
## Descripción general {#overview}

Bits Chat le ayuda a buscar y actuar en todo Datadog mediante lenguaje natural. Pídale que investigue un incidente, explore su telemetría, cree un tablero o consulte sus datos con DDSQL, y le responderá en un chat conversacional en lugar de enviarlo a crear la consulta usted mismo.

Bits Chat está disponible en la aplicación web de Datadog, la aplicación móvil y Slack. Consulte [Usar Bits Chat][1] para abrirlo desde cada superficie.

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Interfaz de Bits Chat de página completa con tareas sugeridas" style="width:100%;">}}

Haga preguntas a Bits Chat como:
- `Why is the error rate spiking on the web-store service?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Investigate why EC2 costs changed between January and February`

## Permisos {#permissions}

### Acceso a Bits Chat {#access-to-bits-chat}

Para usar Bits Chat, su rol debe tener el permiso **Acceso a Bits Chat**. Este permiso está habilitado de forma predeterminada para los tres roles estándar de Datadog: Datadog Admin, Datadog Standard y Datadog Read Only.

Para gestionar este permiso para roles personalizados, puede [actualizar el rol][2] para habilitar **Acceso a Bits Chat**. 

### Acceso a datos a través de Bits Chat {#data-access-through-bits-chat}

Bits Chat utiliza su rol de Datadog para obtener datos, por lo que solo puede acceder a los recursos que usted tiene permiso para visualizar o modificar. Por ejemplo, si su rol restringe el acceso a un conjunto específico de índices de logs, Bits Chat solo puede consultar logs de esos índices. De manera similar, si usted no tiene permiso para editar un tablero, Bits Chat no puede editar ese tablero en su nombre.

## Historial de chat {#chat-history}

Bits Chat guarda sus conversaciones. Para visualizar chats anteriores, abra {{< ui >}}History{{< /ui >}} en [Bits Chat][3], o haga clic en {{< img src="bits_ai/icons/clock_historical.svg" inline="true" style="width:16px;" alt="Icono de historial" >}} en el panel de Bits Chat.

### Gestionar y compartir chats {#manage-and-share-chats}

Haga clic en {{< ui >}}...{{< /ui >}} junto a un chat en {{< ui >}}History{{< /ui >}}, o en el encabezado de un chat abierto, para {{< ui >}}Rename{{< /ui >}}, {{< ui >}}Share{{< /ui >}} o {{< ui >}}Delete{{< /ui >}}. La eliminación de un chat no se puede deshacer.

Los chats son privados de forma predeterminada. Para compartir uno, haga clic en {{< ui >}}...{{< /ui >}} > {{< ui >}}Share{{< /ui >}} > {{< ui >}}Shared Chat{{< /ui >}} y, después, haga clic en {{< ui >}}Copy Link{{< /ui >}}. Cualquier persona con el enlace puede ver el chat, incluidos los mensajes nuevos, pero solo usted puede responder.

<div class="alert alert-warning">Los chats compartidos muestran datos recuperados con sus permisos. Verifique el chat antes de compartirlo.</div>

Los enlaces compartidos caducan automáticamente (consulte la fecha de caducidad en el cuadro de diálogo {{< ui >}}Share Chat{{< /ui >}}). Para dejar de compartir, abra {{< ui >}}Share Chat{{< /ui >}} y seleccione {{< ui >}}Private Chat{{< /ui >}}.

## Informes {#reports}

La página de Reports de Bits Chat proporciona visibilidad sobre cómo su organización utiliza Bits Chat. Vaya a [**Bits AI** > **Chat** > **Informes**][4] para visualizar lo siguiente:

- **Usuarios principales**: vea qué miembros del equipo utilizan más Bits Chat, clasificados por número de conversaciones.
- **Tendencias de uso**: realice un seguimiento del volumen de conversaciones a lo largo del tiempo para comprender la adopción e identificar patrones de uso.
- **Distribución de intención de conversaciones**: vea cómo se desglosan las conversaciones por categoría de intención, como investigar problemas, explorar telemetría, aprender conceptos de Datadog y configurar la observabilidad.

Utilice estos conocimientos para comprender los patrones de adopción, identificar a los usuarios avanzados para compartir las mejores prácticas y evaluar qué casos de uso ofrecen el mayor valor para su organización.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_chat/usage/
[2]: /es/account_management/rbac/?tab=datadogapplication#update-a-role
[3]: https://app.datadoghq.com/ask
[4]: https://app.datadoghq.com/ask/usage