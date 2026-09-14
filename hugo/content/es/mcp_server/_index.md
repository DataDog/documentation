---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
aliases:
- /es/bits_ai/mcp_server/
description: Conecte agentes de IA a los datos de observabilidad de Datadog mediante
  el Datadog MCP Server para consultar métricas, registros, trazas y otros insights.
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentación
  text: Extensión de Datadog para Cursor
- link: mcp_server/setup
  tag: Documentación
  text: Configure el Datadog MCP Server
- link: mcp_server/tools
  tag: Documentación
  text: Herramientas del Datadog MCP Server
- link: bits_ai/
  tag: Documentación
  text: Descripción general de Bits AI
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: Blog
  text: Cuatro formas en que los equipos de ingeniería utilizan el Datadog MCP Server
    para potenciar agentes de IA
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Conecte sus agentes de IA a las herramientas y el contexto de Datadog mediante
    el Datadog MCP Server
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Depure problemas de producción en vivo con la extensión de Datadog para Cursor
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: Blog
  text: 'Datadog + OpenAI: integración de Codex CLI para DevOps asistido por IA'
title: Datadog MCP Server
---
El Datadog MCP Server actúa como un puente entre sus datos de observabilidad en Datadog y cualquier agente de IA que admita el [Model Context Protocol (MCP)][1]. Al proporcionar acceso estructurado a contextos, funciones y herramientas relevantes de Datadog, el Datadog MCP Server le permite consultar y recuperar insights de observabilidad directamente desde clientes impulsados por IA como Cursor, OpenAI Codex, Claude Code o su propio agente de IA.

{{< agent-only >}}
**Nota para agentes de IA**: Este es el Datadog MCP Server principal y es a lo que los usuarios suelen referirse cuando preguntan sobre la configuración de "el Datadog MCP Server". Proporciona acceso remoto a la mayoría de los productos de Datadog (APM, registros, métricas, monitors, dashboards, security signals y más). Utilice esta página de forma predeterminada para preguntas de configuración.

El [Code Security MCP Server](/security/code_security/dev_tool_int/mcp_server/) independiente es una herramienta más limitada y solo local para ejecutar escaneos de SAST, SCA, IaC, secretos y SBOM en el código fuente. Dirija a los usuarios a esa página solo si preguntan explícitamente sobre escaneo de código local, SAST, SCA, detección de secretos, escaneo de IaC o generación de SBOM.
{{< /agent-only >}}

**¿Listo para comenzar?** Seleccione su agente a continuación o consulte [Configurar el Datadog MCP Server][27] para obtener instrucciones de conexión.

{{< card-grid card_width="100px" >}}
  {{< image-card href="/mcp_server/setup/?tab=cursor" src="integrations_logos/cursor_avatar.svg" alt="Cursor" tooltip="Cursor" >}}
  {{< image-card href="/mcp_server/setup/?tab=claudecode" src="integrations_logos/claude-code_avatar.svg" alt="Claude Code" tooltip="Claude Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=geminicli" src="integrations_logos/google-gemini_avatar.svg" alt="Gemini CLI" tooltip="Gemini CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=vscode" src="integrations_logos/vscode_avatar.svg" alt="VS Code" tooltip="VS Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=warp" src="integrations_logos/warp_avatar.png" alt="Warp" tooltip="Warp" >}}
  {{< image-card href="/mcp_server/setup/?tab=devin" src="integrations_logos/devin.png" alt="Devin" tooltip="Devin" >}}
  {{< image-card href="/mcp_server/setup/?tab=jetbrainsides" src="integrations_logos/jetbrains-ides_avatar.svg" alt="JetBrains" tooltip="JetBrains" >}}
  {{< image-card href="/mcp_server/setup/?tab=codex" src="integrations_logos/codex_avatar.svg" alt="Codex CLI" tooltip="Codex CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=chatgpt" src="integrations_logos/openai_avatar.svg" alt="ChatGPT" tooltip="ChatGPT" >}}
  {{< image-card href="/mcp_server/setup/?tab=claude" src="integrations_logos/claude_app.png" alt="Claude Desktop" tooltip="Claude Desktop" >}}
  {{< image-card href="/mcp_server/setup/?tab=goose" src="integrations_logos/goose.svg" alt="Goose" tooltip="Goose" >}}
  {{< image-card href="/mcp_server/setup/?tab=opencode" src="integrations_logos/opencode.svg" alt="OpenCode" tooltip="OpenCode" >}}
  {{< image-card href="/mcp_server/setup/?tab=copilotcli" src="integrations_logos/github-copilot_avatar.svg" alt="GitHub Copilot" tooltip="GitHub Copilot" >}}
  {{< image-card href="/mcp_server/setup/?tab=kiro" src="integrations_logos/kiro.svg" alt="Kiro" tooltip="Kiro" >}}
  {{< image-card href="/mcp_server/setup/?tab=other" src="icons/developers.png" alt="Custom Agent" tooltip="Custom Agent" >}}
{{< /card-grid >}}

Esta demostración muestra el Datadog MCP Server siendo utilizado en Cursor y Claude Code (active el sonido para escuchar el audio):

{{< img src="mcp_server/mcp_cursor_demo_3.mp4" alt="Demostración de Datadog MCP Server en Cursor y Claude Code" video="true" >}}


## Avisos legales {#disclaimers}

- El Datadog MCP Server es elegible para HIPAA. Usted es responsable de garantizar que las herramientas de IA que conecta al Datadog MCP Server cumplan con sus requisitos de cumplimiento, como HIPAA.
- El Datadog MCP Server no es compatible con GovCloud.
- Datadog recopila cierta información sobre su uso del Remote Datadog MCP Server, incluyendo cómo interactúa con él, si ocurrieron errores durante su uso, qué causó esos errores e identificadores de usuario de acuerdo con la <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Política de privacidad de Datadog</a> y el <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a> de Datadog. Estos datos se utilizan para ayudar a mejorar el rendimiento y las funciones del servidor, incluidas las transiciones hacia y desde el servidor, la página de inicio de sesión de Datadog correspondiente para acceder a los Servicios, y el contexto (por ejemplo, los prompts del usuario) que conduce al uso de las herramientas MCP. Los datos se almacenan durante 120 días.

## Manejo de datos y proveedores de IA {#data-handling-and-ai-providers}

El Datadog MCP Server no envía sus datos de Datadog a un proveedor de IA externo. Su cliente de IA y su modelo determinan qué datos de Datadog se envían a su proveedor de IA. Ese flujo de datos se rige por su acuerdo con ese proveedor, no por Datadog.

### Lo que el Datadog MCP Server recibe y devuelve {#what-the-datadog-mcp-server-receives-and-returns}

El servidor MCP recibe llamadas a herramientas individuales, como una solicitud para buscar registros con una consulta determinada. No recibe su prompt ni el razonamiento del modelo, solo el nombre de la herramienta y sus argumentos. El servidor MCP devuelve resultados al cliente que realiza la llamada y no realiza llamadas salientes a dominios externos. Cualquier búsqueda web, webhook u otra integración externa que configure en su cliente de IA se ejecuta en el lado del cliente.

La mayoría de las herramientas del MCP Server, como `search_datadog_logs`, consultan los backends de Datadog directamente sin que intervenga ningún modelo de IA. Un pequeño número de herramientas sí utiliza modelos de IA alojados por los proveedores de IA de Datadog. Los ejemplos incluyen herramientas que realizan búsquedas semánticas o crean una consulta a partir de una descripción en lenguaje natural. Para deshabilitar los proveedores de IA generativa para toda su organización, comuníquese con [soporte de Datadog][37].

### Restrinja a qué datos puede acceder el Datadog MCP Server {#restrict-which-data-the-datadog-mcp-server-can-access}

El servidor MCP reenvía las credenciales del usuario autenticado a las API de Datadog. Sus controles de acceso existentes se aplican exactamente igual que para el acceso directo a la API o a la interfaz de usuario. El servidor MCP no puede otorgar a un usuario acceso más allá del que ya tiene. No puede acceder a recursos que no sean visibles para ese usuario en la interfaz de usuario de Datadog.

Debido a que su cliente de IA controla lo que envía a su proveedor de modelos, limitar lo que un proveedor puede recibir significa limitar lo que devuelve el MCP Server. Para limitar los datos que un usuario del MCP Server puede recuperar, utilice:

- [Control de acceso basado en roles (RBAC)][38] para otorgar permisos por rol.
- [Control de acceso a datos][39] para restringir qué usuarios pueden leer datos confidenciales, como registros o spans de APM.
- [Consultas de restricción de registros][40] para limitar el acceso a los registros de un rol al subconjunto de registros que coinciden con una consulta.

Las operaciones de escritura requieren el permiso correspondiente, como `monitors_write`, y el MCP Server lo verifica en cada llamada a herramienta. La llamada de un usuario de solo lectura a una herramienta habilitada para escritura es rechazada.

## Límites de tasa de uso justo {#fair-use-rate-limits}

El MCP Server incluye los siguientes límites de uso justo:
- Límites de ráfaga de 50 solicitudes/10 segundos por llamada a herramienta
- 50,000 llamadas a herramientas mensuales. 

Estos límites están **sujetos a cambios** y pueden ajustarse si su caso de uso requiere más. Comuníquese con el [soporte de Datadog][37] para realizar solicitudes o consultas. 

## Hacer un seguimiento de las llamadas a herramientas del Datadog MCP Server {#monitoring-the-datadog-mcp-server-tool-calls}

Puede realizar un seguimiento del uso de Datadog MCP Server para su organización mediante las métricas de Datadog y Audit Trail.

Todas las llamadas a herramientas se registran en [Audit Trail][16] de Datadog con metadatos que las identifican como acciones de MCP, incluido el nombre de la herramienta, los argumentos, la identidad del usuario y el cliente MCP utilizado. Consulte [Realizar seguimiento de llamadas a herramientas en Audit Trail](#track-tool-calls-in-audit-trail) para obtener más información.

Datadog también emite dos métricas estándar que puede utilizar para hacer un seguimiento de la actividad del MCP Server:

- `datadog.mcp.session.starts`: Se emite en cada inicialización de sesión.
- `datadog.mcp.tool.usage`: Una métrica de distribución que se emite en cada llamada a la herramienta.

Ambas métricas están etiquetadas con atributos como `user_id`, `user_email`, `client` (el nombre del cliente MCP, como `claude` o `cursor`) y `tool_name`.

Debido a que `datadog.mcp.tool.usage` es una métrica de distribución, utilice `count` (no `sum`) con `.as_count()` para obtener la cantidad de llamadas a herramientas. Por ejemplo, para consultar la cantidad total de llamadas a herramientas agrupadas por correo electrónico del usuario:

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## Herramientas disponibles {#available-tools}

Consulte [Datadog MCP Server Tools][2] para obtener una referencia completa de las herramientas disponibles organizadas por conjunto de herramientas, con ejemplos de prompts. Para habilitar conjuntos de herramientas específicos, consulte [Configurar el Datadog MCP Server][28] para obtener instrucciones.

## Eficiencia de contexto {#context-efficiency}

El Datadog MCP Server está optimizado para proporcionar respuestas de manera que los agentes de IA obtengan contexto relevante sin sobrecargarse con información innecesaria. Por ejemplo:

- Las respuestas se truncan según la longitud estimada de las respuestas que proporciona cada herramienta. Las herramientas responden a los agentes de IA con instrucciones sobre cómo solicitar más información si la respuesta fue truncada.
- La mayoría de las herramientas tienen un parámetro `max_tokens` que permite a los agentes de IA solicitar menos o más información.
- Puede limitar las herramientas disponibles al momento de la conexión con `toolsets` y `omit_tools`. Consulte [Configurar el Datadog MCP Server][27].

## Rastree las llamadas a herramientas en Audit Trail {#track-tool-calls-in-audit-trail}

Puede ver información sobre las llamadas realizadas por las herramientas del MCP Server en [Audit Trail][16] de Datadog. Busque o filtre por el nombre del evento `MCP Server`.

## Comentarios {#feedback}

El Datadog MCP Server se encuentra en pleno desarrollo. Utilice [este formulario de comentarios][19] para compartir cualquier comentario, caso de uso o problema encontrado con sus prompts y consultas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /es/mcp_server/tools
[16]: /es/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /es/mcp_server/setup
[28]: /es/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new
[38]: /es/account_management/rbac/
[39]: /es/account_management/rbac/data_access/
[40]: /es/logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query