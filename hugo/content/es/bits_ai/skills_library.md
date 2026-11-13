---
description: Cree habilidades reutilizables que proporcionen a Bits AI y a los agentes
  de IA externos conocimientos e instrucciones específicos del dominio de la organización.
further_reading:
- link: /bits_ai/bits_chat/
  tag: Documentación
  text: Bits Chat
- link: /actions/agents/
  tag: Documentación
  text: Bits Agent Builder
- link: /mcp_server/
  tag: Documentación
  text: Datadog MCP Server
title: Biblioteca de habilidades
---
## Descripción general {#overview}

Utilice la Biblioteca de habilidades para definir conocimientos del dominio e instrucciones reutilizables para los agentes de IA. Las habilidades brindan a los agentes contexto específico para la tarea sin requerir que usted repita la misma información en cada mensaje.

Por ejemplo, cree una habilidad que describa el proceso de respuesta a incidentes de una organización, las convenciones de propiedad del servicio o los requisitos para resumir una investigación.

Las habilidades funcionan con [Bits Chat][1], [Bits Agent Builder][2], la aplicación de Datadog para Slack y agentes externos como Claude Code, Codex y Cursor que se conectan a través del [Datadog MCP Server][3].

## Cree una habilidad {#create-a-skill}

Cree una habilidad directamente en la Biblioteca de habilidades, o pídale a Bits Chat que cree una para usted.

### Cree una habilidad en la Biblioteca de habilidades {#create-a-skill-in-the-skills-library}

1. Abra el [{{< ui >}}Skills Library{{< /ui >}}][4] en Datadog.
2. Cree una habilidad o importe un archivo `SKILL.md` existente.
3. Agregue el conocimiento del dominio y las instrucciones que el agente debe seguir.
4. Seleccione la visibilidad de la habilidad:
    - **Privada**: Mantenga la habilidad privada.
    - **Pública**: Comparta la habilidad con la organización de Datadog.
5. Guarde la habilidad.

Utilice instrucciones enfocadas y asigne a la habilidad un nombre descriptivo. Un nombre claro hace que la habilidad sea más fácil de descubrir e invocar con un comando de barra diagonal.

### Cree una habilidad con Bits Chat {#create-a-skill-with-bits-chat}

Pídale a Bits Chat que cree una habilidad:

```text
Create a new Skills Library skill
```

Para crear una habilidad a partir del contexto en una conversación existente de Bits Chat, ingrese:

```text
Turn this conversation into a skill
```

También puede crear una habilidad a partir de un hilo de Slack existente. En el hilo, ingrese:

```text
@Datadog turn this conversation into a skill
```

## Utilice una habilidad en Bits Chat {#use-a-skill-in-bits-chat}

Para que una habilidad esté disponible en Bits Chat:

1. Abra **Settings** en Bits Chat.
2. Seleccione **Skills**.
3. Habilite la habilidad.

Después de habilitar una habilidad, Bits Chat la usa automáticamente cuando la habilidad es relevante para una solicitud.

Invoque una habilidad explícitamente ingresando su comando de barra diagonal en la conversación:

```text
/my-skill
```

Puede incluir contexto adicional en el mismo mensaje o continuar la conversación después de invocar la habilidad.

## Utilice una habilidad en Bits Agent Builder {#use-a-skill-in-bits-agent-builder}

En la configuración del agente, seleccione cada habilidad que el agente necesite. El agente carga automáticamente las habilidades seleccionadas.

Para invocar una habilidad explícitamente durante una conversación, ingrese su comando de barra diagonal:

```text
/my-skill
```

Para obtener más información sobre cómo crear y probar agentes, consulte [Bits Agent Builder][2].

## Utilice una habilidad en Slack {#use-a-skill-in-slack}

Después de conectar la aplicación de Datadog para Slack, mencione `@Datadog` y agregue el comando de barra diagonal de la habilidad:

```text
@Datadog /my-skill
```

Agregue cualquier detalle específico de la tarea después del comando.

## Utilice habilidades con un agente externo {#use-skills-with-an-external-agent}

Los agentes de IA externos que se conectan al Datadog MCP Server pueden descubrir y cargar habilidades desde la biblioteca de habilidades.

El Datadog MCP Server proporciona las siguientes herramientas:

- `list_datadog_skills()`: Enumera las habilidades disponibles para el agente.
- `load_datadog_skill()`: Carga una habilidad seleccionada en el contexto del agente.

Un flujo de trabajo típico de un agente externo es:

1. Conecte el agente al Datadog MCP Server.
2. Descubra las habilidades disponibles con `list_datadog_skills()` o recursos MCP.
3. Cargue la habilidad necesaria para la tarea con `load_datadog_skill()`.
4. Pídale al agente que complete la tarea utilizando las instrucciones y el conocimiento cargados.

Para obtener instrucciones de conexión, consulte la documentación del [Datadog MCP Server][3].

## Disponibilidad {#availability}

La biblioteca de habilidades está disponible en Bits Chat, Bits Agent Builder, Slack y agentes externos que se conectan a través del Datadog MCP Server.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_chat/
[2]: /es/actions/agents/
[3]: /es/mcp_server/
[4]: https://app.datadoghq.com/actions/skills