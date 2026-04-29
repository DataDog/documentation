---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
description: Conecta agentes de IA a los datos de observabilidad de Datadog utilizando
  el Servidor MCP para consultar métricas, registros, trazas y otras perspectivas.
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Extensión de Datadog para Cursor
- link: bits_ai/mcp_server/setup
  tag: Documentation
  text: Configura el Servidor MCP de Datadog
- link: bits_ai/mcp_server/tools
  tag: Documentation
  text: Herramientas del Servidor MCP de Datadog
- link: bits_ai/
  tag: Documentation
  text: Descripción general de Bits AI
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: Blog
  text: Cuatro formas en que los equipos de ingeniería utilizan el Servidor MCP de
    Datadog para potenciar agentes de IA
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Conecta tus agentes de IA a las herramientas y al contexto de Datadog utilizando
    el Servidor MCP de Datadog.
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Depura problemas de producción en vivo con la extensión de Datadog Cursor
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: Blog
  text: 'Datadog + OpenAI: integración de Codex CLI para DevOps asistido por IA'
title: Servidor MCP de Datadog
---
El Servidor MCP de Datadog actúa como un puente entre tus datos de observabilidad en Datadog y cualquier agente de IA que soporte el [Protocolo de Contexto de Modelo (MCP)][1]. Proporcionando acceso estructurado a contextos, características y herramientas relevantes de Datadog, el Servidor MCP te permite consultar y recuperar perspectivas de observabilidad directamente desde clientes impulsados por IA, como Cursor, OpenAI Codex, Claude Code o tu propio agente de IA.

**¿Listo para comenzar?** Selecciona tu agente a continuación o consulta [Configura el Servidor MCP de Datadog][27] para obtener instrucciones de conexión.

{{< partial name="mcp_server/mcp_server_agents.html" >}}

Esta demostración muestra el uso del Servidor MCP de Datadog en Cursor y Claude Code (activa el audio):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Demostración del Servidor MCP de Datadog en Cursor y Claude Code" video="true" >}}


## Avisos {#disclaimers}

- El Servidor MCP de Datadog es elegible para HIPAA. Eres responsable de garantizar que las herramientas de IA que conectes al Servidor MCP de Datadog cumplan con tus requisitos de cumplimiento, como HIPAA.
- El Servidor MCP de Datadog no es compatible con GovCloud.
- Datadog recopila cierta información sobre tu uso del Servidor MCP remoto de Datadog, incluyendo cómo interactúas con él, si ocurrieron errores al usarlo, qué causó esos errores e identificadores de usuario de acuerdo con la <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Política de Privacidad de Datadog</a> y el <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a> de Datadog. Estos datos se utilizan para ayudar a mejorar el rendimiento y las características del servidor, incluyendo las transiciones hacia y desde el servidor y la página de inicio de sesión de Datadog aplicable para acceder a los Servicios, así como el contexto (por ejemplo, indicaciones del usuario) que conduce al uso de las herramientas MCP. Los datos se almacenan durante 120 días.

## Límites de tasa de uso justo {#fair-use-rate-limits}

El Servidor MCP de Datadog viene con los siguientes límites de uso justo:
- Límite de ráfaga: 50 solicitudes cada 10 segundos.
- 5000 llamadas a herramientas diarias
- 50,000 llamadas a herramientas mensuales. 

Estos límites son **sujetos a cambios** y pueden ajustarse si su caso de uso requiere más. Por favor, contacta a [soporte de Datadog][37] para solicitudes o preguntas. 

## Seguimiento de las llamadas a herramientas del Servidor MCP de Datadog {#monitoring-the-datadog-mcp-server-tool-calls}

Puedes rastrear el uso del Servidor MCP de Datadog para tu organización utilizando métricas de Datadog y el Audit Trail.

Todas las llamadas a herramientas se registran en el [Audit Trail][16] de Datadog con metadatos que las identifican como acciones de MCP, incluyendo el nombre de la herramienta, argumentos, identidad del usuario y el cliente MCP utilizado. Vea [Rastrear llamadas a herramientas en el Audit Trail](#track-tool-calls-in-audit-trail) para más información.

Datadog también emite dos métricas estándar que puedes utilizar para monitorear la actividad del Servidor MCP de Datadog:

- `datadog.mcp.session.starts`: Emitido en cada inicialización de sesión.
- `datadog.mcp.tool.usage`: Una métrica de distribución emitida en cada llamada a la herramienta.

Ambas métricas están etiquetadas con atributos como `user_id`, `user_email` y `client` (el nombre del cliente MCP, como `claude` o `cursor`).

Debido a que `datadog.mcp.tool.usage` es una métrica de distribución, utiliza `count` (no `sum`) con `.as_count()` para obtener el número de llamadas a la herramienta. Por ejemplo, para consultar el número total de llamadas a la herramienta agrupadas por correo electrónico de usuario:

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## Herramientas disponibles {#available-tools}

Consulta [Herramientas del Servidor MCP de Datadog][2] para una referencia completa de las herramientas disponibles organizadas por conjunto de herramientas, con ejemplos de solicitudes. Para habilitar conjuntos de herramientas específicos, consulta [Configurar el Servidor MCP de Datadog][28] para obtener instrucciones.

## Eficiencia del contexto {#context-efficiency}

El Servidor MCP de Datadog está optimizado para proporcionar respuestas de modo que los agentes de IA obtengan contexto relevante sin sobrecargarse de información innecesaria. Por ejemplo:

- Las respuestas se truncan en función de la longitud estimada de las respuestas que proporciona cada herramienta. Las herramientas responden a los agentes de IA con instrucciones sobre cómo solicitar más información si la respuesta se trunca.
- La mayoría de las herramientas tienen un parámetro `max_tokens` que permite a los agentes de IA solicitar menos o más información.

## Rastrear llamadas a herramientas en el Audit Trail {#track-tool-calls-in-audit-trail}

Puedes ver información sobre las llamadas realizadas por las herramientas del Servidor MCP en el [Audit Trail][16] de Datadog. Busca o filtra por el nombre del evento `MCP Server`.

## Comentarios {#feedback}

El Servidor MCP de Datadog está en desarrollo activo. Utiliza [este formulario de retroalimentación][19] para compartir cualquier comentario, caso de uso o problemas encontrados con tus indicaciones y consultas.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /es/bits_ai/mcp_server/tools
[16]: /es/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /es/bits_ai/mcp_server/setup
[28]: /es/bits_ai/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new