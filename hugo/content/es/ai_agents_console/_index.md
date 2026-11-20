---
description: Haga un seguimiento del uso, costo y productividad de los agentes de
  IA en toda su organización en Datadog Agent Console y analícelos, incluidos los
  agentes de codificación, los agentes de conocimiento y los agentes de Bits AI.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentación
  text: Configurar Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentación
  text: Integración de uso y costos de Anthropic
- link: /integrations/openai-codex/
  tag: Documentación
  text: Integración con OpenAI Codex
- link: /integrations/openai/
  tag: Documentación
  text: Integración con OpenAI
- link: /integrations/cursor/
  tag: Documentación
  text: Integración de Cursor
- link: https://github.com/datadog-labs/trajectory
  tag: Código fuente
  text: Trajectory
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: Blog
  text: Haga un seguimiento de la adopción de Claude Code en su organización con Datadog
    Agent Console
- link: https://www.datadoghq.com/blog/datadog-agent-console/
  tag: Blog
  text: Haga un seguimiento de la adopción de agentes con Datadog Agent Console
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console está en Preview y disponible para todos los clientes de Datadog.
{{< /callout >}}

La [Agent Console][1] proporciona seguimiento centralizado para herramientas de IA en toda su organización. Recopila datos de uso, costo y actividad de agentes de codificación, agentes de conocimiento, agentes de escritorio y los propios [agentes de Bits AI](#bits-ai-agents) de Datadog. Úsela para entender a dónde va su gasto en IA, quién utiliza qué herramientas y cómo el trabajo asistido por IA afecta la entrega.

## Herramientas de IA compatibles {#supported-ai-tools}

| Herramienta | Tipo | Fuente de datos |
|------|------|-------------|
| Claude Code | Agente de codificación | Integración con [Anthropic Usage and Costs][2], u OpenTelemetry para planes Claude Team |
| Cursor | Agente de codificación | Integración con [Cursor][3] |
| GitHub Copilot | Agente de codificación | Integración con [GitHub Copilot][4] |
| Codex | Agente de codificación | Integración con [OpenAI Codex][5] |
| Claude Chat, Claude Cowork, Claude Design | Agente de conocimiento | Integración con [Anthropic Usage and Costs][2] |
| ChatGPT Work | Agente de conocimiento | Integración con [OpenAI][13] |
| Microsoft Copilot 365 (Preview) | Agente de conocimiento | Integración con Microsoft Copilot. Para solicitar acceso, contacte a su equipo de cuenta de Datadog. |
| Otros agentes de codificación y de escritorio | Agente de codificación | [Trajectory][6] |

[Trajectory][6] es una herramienta de código abierto que captura sesiones de más de 30 agentes de codificación y de escritorio, incluidos Claude Desktop, Cline, Windsurf, Zed y Goose. Para obtener la lista completa, consulte [Clientes admitidos][7].

Para conectar estas herramientas, consulte [Configurar Agent Console][8].

## Descripción general {#overview}

La pestaña {{< ui >}}Overview{{< /ui >}} muestra el gasto en IA, la adopción y la productividad de su organización en un solo lugar.

{{< img src="/ai_agents_console/agent_console_overview.png" alt="Pestaña Overview de Agent Console que muestra el costo de IA rastreado, el total de usuarios, el costo por PR observada y un desglose del costo rastreado por área de producto y principales contribuyentes al costo" style="width:100%;" >}}

Los mosaicos de resumen en la parte superior muestran el costo de IA rastreado, el total de usuarios y el costo por pull request observada, cada uno comparado con el período anterior.

El gráfico {{< ui >}}Tracked AI cost{{< /ui >}} muestra cómo se distribuye el gasto entre las áreas de producto, como los agentes de codificación y otros agentes, y qué herramientas contribuyen más. Cambie a {{< ui >}}Trend{{< /ui >}} para ver cómo cambia el costo a lo largo del tiempo y seleccione un área de producto para ver más detalles.

### Productividad {#productivity}

La sección {{< ui >}}Productivity{{< /ui >}} muestra las pull requests fusionadas, el tiempo hasta la fusión, el costo por pull request observada y los problemas de Jira resueltos, graficados frente al costo de IA. Estas métricas provienen de sus [herramientas de productividad][9] conectadas, como GitHub y Jira.

{{< img src="/ai_agents_console/agent_console_productivity_overview.png" alt="Sección de productividad que muestra las PR fusionadas, el tiempo hasta la fusión, el costo por PR observada y los problemas de Jira resueltos, cada uno graficado frente al costo" style="width:100%;" >}}

### Integrations {#integrations}

La sección {{< ui >}}Integrations{{< /ui >}} muestra una tarjeta para cada fuente de datos conectada, con su estado, total de usuarios, costo estimado y uso de tokens. Habilite {{< ui >}}Group by Provider{{< /ui >}} para combinar productos del mismo proveedor, como Claude Code, Chat, Design y Cowork bajo Anthropic.

{{< img src="/ai_agents_console/agent_console_integrations_overview.png" alt="Sección de integraciones con tarjetas para Anthropic, OpenAI, Cursor, Claude Code (OTel), GitHub Copilot, Microsoft Copilot, GitHub y Jira" style="width:100%;" >}}

Haga clic en {{< ui >}}View Dashboard{{< /ui >}} en una tarjeta para abrir un panel dedicado para esa integración. Filtre cada panel por equipo, usuario y modelo.

Por ejemplo, el panel de Anthropic desglosa el costo estimado y los tokens por producto y modelo de Claude:

{{< img src="/ai_agents_console/agent_console_integrations_anthropic.png" alt="Panel de Anthropic que muestra el costo estimado y los tokens de la empresa, el costo por producto de Claude (Claude Code, Chat, Design y Cowork), el costo a lo largo del tiempo y los tokens por modelo" style="width:100%;" >}}

El panel de Codex muestra el costo estimado, los usuarios activos, las sesiones, los créditos y los tokens, junto con las tendencias de uso y adopción y los principales usuarios:

{{< img src="/ai_agents_console/agent_console_codex_integration.png" alt="Panel de Codex que muestra el costo estimado, usuarios activos, sesiones, créditos, tokens totales, sesiones y turnos a lo largo del tiempo, tokens por tipo y los principales usuarios por turnos y créditos" style="width:100%;" >}}

## My Usage {#my-usage}

La pestaña {{< ui >}}My Usage{{< /ui >}} muestra su propio uso de IA. Incluye su gasto diario, apilado por proveedor, y un desglose de las tareas para las que utilizó agentes de IA. Filtre por proveedor y modelo.

{{< img src="/ai_agents_console/agent_console_my_usage.png" alt="Pestaña My Usage que muestra un gráfico de gasto diario personal apilado por proveedor y un gráfico de desglose de tareas" style="width:100%;" >}}

Utilice la navegación lateral para cambiar entre {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Productivity{{< /ui >}}, {{< ui >}}Models{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} y {{< ui >}}Sessions{{< /ui >}}. Las vistas Tasks, Skills, Tools y Sessions utilizan datos de sesión de [Trajectory][6]. La vista Models utiliza datos de sus integraciones conectadas.

My Usage y Usage comparten las mismas vistas. Para obtener una descripción de cada vista, consulte [Usage](#usage).

## Uso {#usage}

La pestaña {{< ui >}}Usage{{< /ui >}} ofrece las mismas vistas que My Usage, agregadas en toda su organización. Úsela para comprender para qué utilizan los equipos los agentes de IA, identificar a los usuarios avanzados y casos atípicos, y comparar la adopción entre equipos.

### Tareas {#tasks}

Agent Console clasifica las sesiones de agentes capturadas con [Trajectory][6] en categorías de tareas, como implementación de código, operaciones de ingeniería y artefactos de conocimiento, y en subcategorías más específicas. La vista {{< ui >}}Tasks{{< /ui >}} grafica cada categoría según su proporción de tareas y gasto por usuario activo, y enumera el costo, el costo por tarea y la cantidad de tareas para cada una.

{{< img src="/ai_agents_console/agent_console_tasks.png" alt="Vista Tasks con un gráfico de burbujas de categorías de tareas por proporción de tareas y gasto por usuario activo, y una tabla de costo, costo por tarea y recuento de tareas" style="width:100%;" >}}

Seleccione una categoría de tarea para abrir un panel de detalles con sus subcategorías, costo por tarea, costo total de las tareas, cantidad de tareas y promedio de turnos.

{{< img src="/ai_agents_console/agent_console_tasks_view.png" alt="Panel de detalles de la categoría de tarea Engineering Operations que muestra las tareas por subcategoría, costo por tarea, costo total de las tareas, cantidad de tareas y promedio de turnos" style="width:100%;" >}}

### Productividad de usuarios y equipos {#user-and-team-productivity}

La vista {{< ui >}}Productivity{{< /ui >}} le brinda visibilidad sobre cómo los ingenieros individuales y los equipos utilizan las herramientas de IA. Úselo para:
- Identificar a los usuarios con mayor gasto y a los colaboradores más productivos
- Detecte casos atípicos de eficiencia, como ingenieros con un gasto elevado pero bajo rendimiento
- Ver un desglose completo de costos por usuario, agente y modelo
- Examine el gasto, el historial de pull requests y la combinación de modelos de cualquier persona

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="Panel de detalles del usuario que muestra un desglose para un usuario seleccionado, incluyendo el gasto por agente, la combinación de modelos y el historial de PR" style="width:100%;" >}}

### Modelos, habilidades, herramientas y sesiones {#models-skills-tools-and-sessions}

La vista {{< ui >}}Models{{< /ui >}} muestra qué modelos utiliza su organización, según los datos de sus integraciones conectadas.

Para los agentes capturados con [Trajectory][6], las vistas {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} y {{< ui >}}Sessions{{< /ui >}} muestran qué habilidades y herramientas utilizan los agentes, y le permiten examinar las sesiones individuales de los agentes.

## Agentes de Bits AI {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Pestaña de Agentes de Bits AI con un gráfico combinado de actividad de agentes a lo largo del tiempo y tarjetas individuales para Bits Investigation, Bits Code y Bits Agent Builder que muestran investigaciones, sesiones y ejecuciones recientes" style="width:100%;" >}}

La pestaña {{< ui >}}Bits AI Agents{{< /ui >}} muestra el uso de los agentes de IA integrados de Datadog junto con sus otras herramientas de IA. La visualización combinada de investigaciones, sesiones y ejecuciones en todos los agentes de Datadog le permite correlacionar la actividad de Bits AI con el resto de su organización.

Las tarjetas individuales resumen la actividad de cada agente de Bits AI, incluyendo [Bits Investigation][10], [Bits Code][11] y [Bits Agent Builder][12]. Haga clic en {{< ui >}}View Details{{< /ui >}} en una tarjeta para examinar ese agente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: /es/integrations/anthropic-usage-and-costs/
[3]: /es/integrations/cursor/
[4]: /es/integrations/github-copilot/
[5]: /es/integrations/openai-codex/
[6]: https://github.com/datadog-labs/trajectory
[7]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[8]: /es/ai_agents_console/setup/
[9]: /es/ai_agents_console/setup/#connect-productivity-tools
[10]: /es/bits_ai/bits_investigation/
[11]: /es/bits_ai/bits_code/
[12]: /es/actions/agents/
[13]: /es/integrations/openai/?tab=apikey