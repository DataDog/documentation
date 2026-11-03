---
description: Abra Bits Chat desde la aplicación web de Datadog, la aplicación móvil
  o Slack.
further_reading:
- link: /bits_ai/bits_chat/
  tag: Documentación
  text: Bits Chat
- link: /bits_ai/bits_code/slack_code_channels/
  tag: Documentación
  text: Canales de código con Bits Code
title: Utilice Bits Chat
---
Bits Chat tiene contexto sobre la documentación pública, la telemetría y la propiedad de Datadog. Utilice Bits Chat para hacer preguntas sobre su sistema o incidente activo. Bits Chat está disponible en la aplicación web de Datadog, la aplicación móvil y Slack.

## Aplicación web {#web-application}
Existen varias formas de abrir Bits Chat en la aplicación web de Datadog:
- Vaya directamente a [Bits Chat][1].
- En la parte superior derecha de la barra de navegación, haga clic en {{< ui >}}Ask Bits{{< /ui >}}.
- En un producto de Datadog integrado con Bits Chat, haga clic en el botón de activación de IA (por ejemplo, {{< ui >}}Ask Bits{{< /ui >}}) o {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px" alt="">}} (el icono de estrellas centelleantes).
- Presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.
- En el panel de navegación izquierdo, haga clic en {{< ui >}}Bits AI{{< /ui >}}, luego seleccione {{< ui >}}Bits Chat{{< /ui >}}.

## Aplicación móvil {#mobile-application}

Haga preguntas a Bits Chat sobre su sistema o incidente activo desde la [Aplicación móvil][2]. 

1. En la pantalla de inicio, toque {{< ui >}}Bits Chat{{< /ui >}}.
1. Comience a chatear con Bits Chat por voz o texto.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Vista del dashboard de inicio de la aplicación móvil con Bits AI" style="width:40%;" >}}

## Slack {#slack}
Haga preguntas a Bits Chat, declare incidentes, inicie investigaciones o realice cambios en el código. Bits Chat responde en el hilo del mensaje para que su equipo pueda mantener la pregunta, el contexto y la respuesta en un solo lugar.

1. Seleccione su espacio de trabajo de Slack en [Bits Chat Settings][3].
2. Haga clic en **Connect Slack account** para otorgar a Datadog permiso para reconocerlo en ambos productos.
3. (Opcional) Haga clic en **Grant permissions** a su espacio de trabajo para que Bits Chat pueda leer las conversaciones relevantes de Slack.

Una vez completada la configuración, puede enviar consultas a `@Datadog` en lenguaje natural a los canales de su espacio de trabajo con la Datadog App. 

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Resultado de una consulta de ejemplo de dependencia de servicio en Slack" style="width:60%;">}}

### Canales de código con Bits Code {#code-channels-with-bits-code}

Pídale a Bits Chat que realice un cambio de código y creará un [canal de código][4] dedicado para la tarea. En el canal de código, [Bits Code][5] trabaja en el cambio junto con usted y su equipo.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ask
[2]: /es/mobile/#installing
[3]: https://app.datadoghq.com/ask/settings
[4]: /es/bits_ai/bits_code/slack_code_channels/
[5]: /es/bits_ai/bits_code/