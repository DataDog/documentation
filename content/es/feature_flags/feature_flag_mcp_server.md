---
description: Más información sobre el uso del conjunto de herramientas de indicadores
  de funciones en el MCP Server de Datadog
further_reading:
- link: getting_started/feature_flags
  tag: Documentación
  text: Empezando con los indicadores de funciones
- link: bits_ai/mcp_server
  tag: Documentación
  text: MCP Server de Datadog
title: Indicadores de funciones en MCP Server
---

## Información general

El MCP Server de Datadog utiliza el Protocolo de contexto del modelo (MCP) para proporcionar a los agentes de IA acceso a las funciones de gestión de [indicadores de funciones][1], incluyendo la creación de indicadores, configuración y guía de integración React/JavaScript.

## Instalación

Las siguientes configuraciones dan acceso a tu agente de AI al conjunto de herramientas de indicadores de funciones en el MCP Server de Datadog. Debes reiniciar tu agente después de realizar esta configuración.

Para todos los clientes, instala el binario del MCP Server:

```bash
curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
```

A continuación, sigue las instrucciones siguientes para añadir el MCP Server a tu cliente específico.

### Claude Code

```bash
claude mcp add datadog -- ~/.local/bin/datadog_mcp_cli --endpoint-path /api/unstable/mcp-server/mcp?toolsets=feature-flags
```

### Cursor
Añádelo a `~/.cursor/mcp.json` (recuerda guardar el archivo):

```json
{
  "mcpServers": {
    "datadog-ff": {
      "type": "stdio",
      "command": "~/.local/bin/datadog_mcp_cli --endpoint-path /api/unstable/mcp-server/mcp?toolsets=feature-flags",
      "args": [],
      "env": {}
    }
  }
}
```

## Casos prácticos

El MCP Server incluye herramientas para ayudarte a gestionar los indicadores de funciones en tu código base. Los siguientes casos de uso proporcionan ejemplos de mensajes para el uso de las herramientas.

<div class="alert alert-info">
  El MCP Server solo admite aplicaciones React.
</div>

### Crear indicadores de funciones

Utiliza la herramienta `create-feature-flag` para crear indicadores de funciones. No es necesario especificar el nombre de la herramienta en el mensaje, pero hacerlo puede permitir obtener resultados más coherentes.
El MCP Server tiene acceso a la documentación de Datadog y la utiliza para implementar el indicador en tu código base.

Si aún no tienes indicadores de funciones implementados, menciona en el mensaje que quieres implementar indicadores de funciones de Datadog.

Ejemplos de mensajes:
- Utiliza la herramienta `create-feature-flag` para crear un indicador que controle el título en la página principal.
- Quiero mostrar un modal de confirmación cuando ocurra `<SOME_EVENT>`. Utiliza un indicador de función de Datadog para controlar si se muestra el modal de confirmación.

### Comprobar la implementación del indicador de función

Utiliza la herramienta `check-flag-implementation` para comprobar si un indicador de función se ha implementado correctamente.

La herramienta comprueba que se hace referencia al indicador como el tipo de valor correcto, que pasa los atributos del asunto correctos y que proporciona el valor predeterminado correcto que coincide con el predeterminado en los entornos de producción.

Ejemplos de mensajes:
- Comprueba si el indicador `show-confirmation-modal` está correctamente implementado.
- Comprueba si todos los indicadores de funciones en `/some/directory` se implementan correctamente.

**Nota**: Es posible que de esta forma no se puedan encontrar todos los problemas. Comprobar los indicadores individualmente es más fiable.

Esta herramienta también puede utilizarse para añadir indicadores de funciones creados en la interfaz de usuario a tu código base. Por ejemplo:

- Utiliza el indicador `show-confirmation-modal` para controlar si se muestra el modal de confirmación cuando ocurre `<SOME_EVENT>`.

### Lista de indicadores de funciones

Utiliza la herramienta `list-feature-flags` para enumerar todos los indicadores de funciones. Por ejemplo:

- Enumera todos los indicadores de funciones.

### Enumerar entornos

Utiliza la herramienta `list-environments` para enumerar todos los entornos. Por ejemplo:

- Enumera mis entornos de indicadores.

### Actualizar entornos de indicadores de funciones
Utiliza la herramienta `update-feature-flag-environment` para actualizar el entorno de un indicador de función. Esta herramienta puede controlar las variantes por defecto, y activar o desactivar el indicador.
No puedes modificar indicadores en entornos de producción.

Ejemplos de mensajes:

- Quiero que `show-confirmation-modal` sea true en desarrollo.
- Desactiva `show-confirmation-modal` en staging.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/