---
description: Aprenda a crear y trabajar en canales de código temporales en Slack,
  donde puede dirigir a Bits Code, visualizar diferencias de código y crear PRs.
further_reading:
- link: /bits_ai/bits_code/
  tag: Documentación
  text: Bits Code
- link: /bits_ai/bits_chat/#slack
  tag: Documentación
  text: Bits Chat en Slack
- link: /integrations/slack/
  tag: Documentación
  text: Integración de Slack
- link: https://slack.com/features/code-channels
  tag: Documentación de Slack
  text: Canales de código
title: Canales de código en Slack con Bits Code
---
## Descripción general {#overview}

Los canales de código son canales de Slack temporales y dedicados para trabajar con un agente de codificación en una tarea específica. Cuando le pide a [Bits Chat][1] en Slack que realice un cambio de código, [Bits Code][3] crea un canal de código para esa tarea. Usted y su equipo pueden seguir el trabajo, dirigirlo y revisar el resultado allí, sin saturar la conversación original.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel.png" alt="Un canal de código de Slack que muestra una conversación con Bits Code junto a una opción para visualizar los cambios de código propuestos." style="width:100%;" >}}

Obtenga más información sobre los canales de código en la [documentación de Slack][6].

## Crear un canal de código {#create-a-code-channel}

Después de [configurar Bits Code][4], cree un canal de código mencionando a `@Datadog` en Slack y describiendo un cambio de código que le gustaría realizar. Si Bits Chat determina que la solicitud requiere cambios de código, transfiere la tarea a Bits Code, que crea un canal de código. Bits publica un enlace al nuevo canal de código en la ubicación donde se solicitó originalmente.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel_creation.png" alt="Un mensaje de Slack mencionando a @Datadog, seguido de una tarjeta que muestra el canal de código resultante que se creó" style="width:100%;" >}}

Bits Code nombra el canal de código automáticamente según su solicitud inicial. Encuentre sus canales de código en una sección {{< ui >}}Code channels{{< /ui >}} dedicada en su barra lateral de Slack.

### Permisos y acceso {#permissions-and-access}

Solo el usuario que solicitó a `@Datadog` se agrega automáticamente al nuevo canal de código. Los canales de código coinciden con la visibilidad del canal desde el cual se crean (es decir, si mencionó a `@Datadog` en un canal público, el canal de código resultante también es público).

<div class="alert alert-warning">Bits Code puede acceder a repositorios de código fuente con los permisos del usuario que lo solicitó <code>@Datadog</code> y creó el canal. Puede acceder a toda la telemetría de Datadog (con las restricciones de <a href="/account_management/rbac/data_access/">Access Control</a> aplicadas) de todos los usuarios en el canal. Bits Code puede traer estos datos del repositorio y la telemetría al canal de código. Como creador de un canal de código, es su responsabilidad asegurarse de que cualquier persona que pueda visualizar un canal de código esté autorizada para visualizar su contenido, y que cualquier persona que pueda unirse a un canal de código esté autorizada para dirigir a Bits Code.</div>

Cualquier usuario que desee dirigir al agente debe tener una cuenta de Datadog conectada a Slack. (Si publica en un canal de código pero no tiene una cuenta de Datadog conectada, Bits ignora su mensaje.)

## Trabaje en un canal de código {#work-in-a-code-channel}

En otros canales de Slack, cuando desee una respuesta de Bits Chat, debe `@`-mencionarlo cada vez. Un canal de código funciona de manera diferente: Bits Code escucha cada mensaje publicado. No necesita mencionar a `@Datadog` nuevamente para seguir dirigiendo al agente.

Mientras Bits Code trabaja, el canal de código muestra:

- Una opción para visualizar los cambios propuestos en el código.
- Widgets de gráficos de Datadog, cuando sean relevantes para la tarea
- Un botón {{< ui >}}Create PR{{< /ui >}} para abrir una solicitud de extracción o de fusión a partir de los cambios, cuando esté listo

Después de que Bits Code haya generado un diff de código, puede comentar en líneas específicas directamente en el canal de código.

{{< img src="bits_ai/dev_agent/slack_code_channels/commenting_on_code.png" alt="Se redacta una pregunta para líneas de código específicas" style="width:100%;" >}}

Bits Code no abre automáticamente una solicitud de extracción o de fusión desde un canal de código; haga clic en {{< ui >}}Create PR{{< /ui >}} cuando esté listo. El usuario que hace clic en {{< ui >}}Create PR{{< /ui >}} es el autor de la solicitud de extracción o de fusión resultante.

El trabajo en cada canal de código también se refleja en una [sesión de Bits Code][2] en Datadog. Para verlo, en la esquina inferior derecha del canal de código, haga clic en {{< ui >}}</> Code session{{< /ui >}}.

Obtenga más información sobre cómo trabajar en un canal de código en la [documentación de Slack][6].

## Limitaciones {#limitations}

Las [limitaciones generales de Bits Code][5] también se aplican a los canales de código.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_chat/#slack
[2]: /es/bits_ai/bits_code/#sessions
[3]: https://app.datadoghq.com/code
[4]: /es/bits_ai/bits_code/setup/
[5]: /es/bits_ai/bits_code/#limitations
[6]: https://slack.com/help/articles/54310833022355-Build-with-AI-as-a-team-using-Slack-Code