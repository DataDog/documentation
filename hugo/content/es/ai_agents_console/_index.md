---
description: Haga un seguimiento y analice el uso, el costo y el rendimiento de los
  agentes de codificación y los agentes de Bits AI en toda su organización en Datadog
  Agent Console.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentación
  text: Configurar Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentación
  text: Integración de uso y costos de Anthropic
- link: /integrations/cursor/
  tag: Documentación
  text: Integración de Cursor
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

La [Agent Console][1] proporciona seguimiento centralizado para agentes de IA en toda su organización. Recopila registros y métricas de agentes de codificación y de los propios [agentes de Bits AI](#bits-ai-agents) de Datadog, mostrándolos en tiempo real para brindarle visibilidad sobre el uso, el costo, la latencia, el impacto en la productividad y los patrones de problemas emergentes.

Agent Console admite los siguientes agentes de codificación:

| Herramienta | Descripción |
|------|-------------|
| [Claude Code][2] | Herramienta de codificación con agentes de Anthropic |
| [Cursor][3] | Editor de código con tecnología de IA |
| [GitHub Copilot][4] | Herramienta de autocompletado de código con tecnología de IA de GitHub |


## Agentes de codificación {#coding-agents}

La pestaña {{< ui >}}Coding Agents{{< /ui >}} le ofrece una visualización de alto nivel de la actividad de los agentes de codificación en toda su organización. De forma predeterminada, la visualización agrega todos los agentes de codificación y se puede filtrar para un solo agente.

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="La pestaña de Agentes de Codificación de Agent Console que muestra un resumen de los hallazgos de los agentes con métricas y tendencias para Claude Code, Cursor y GitHub Copilot" style="width:100%;" >}}

### Hallazgos de los agentes {#agent-findings}

El panel {{< ui >}}Agent Findings{{< /ui >}} resume la actividad de alto nivel para el rango de tiempo seleccionado, incluyendo el gasto total, el total de usuarios, las sesiones, el tiempo para fusionar, las líneas de código y el promedio de turnos por sesión. El gráfico apilado desglosa la actividad por agente (por ejemplo, Claude Code y Cursor) para que pueda comparar la adopción a lo largo del tiempo.

### Métricas de impacto {#impact-metrics}

El panel {{< ui >}}Impact Metrics{{< /ui >}} mide el efecto del desarrollo asistido por IA en el ciclo de vida de entrega de software utilizando métricas de estilo DORA, con comparaciones lado a lado entre el trabajo asistido por IA y el trabajo sin IA.

- **Adopción**: Realice un seguimiento de cuánto código se produce mediante IA, incluyendo AI-assisted commits y AI-assisted PRs.
- **Velocidad**: mida qué tan rápido llegan los cambios a producción, incluyendo el tiempo de entrega de cambios y el tiempo de revisión de PR.
- **Estabilidad**: realice un seguimiento de qué tan confiables son los cambios después del lanzamiento, incluyendo la tasa de fallos en los cambios y el tiempo de recuperación.

### Problemas detectados {#detected-problems}

El panel {{< ui >}}Detected Problems{{< /ui >}} destaca los patrones de problemas comunes que su equipo está encontrando y recomienda soluciones. El diagrama de Sankey muestra cómo los patrones de problemas (como comprobaciones omitidas, bucles de reintento y relecturas de archivos) fluyen desde agentes individuales hacia repositorios específicos, con un costo mensual estimado para cada patrón.

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Diagrama de Sankey de Problemas Detectados que muestra cómo las sesiones de Claude Code, Cursor y GitHub Copilot se asignan a patrones de problemas, destacando las comprobaciones omitidas" style="width:90%;" >}}

Haga clic en un nodo {{< ui >}}Problem Pattern{{< /ui >}} para abrir una visualización detallada que incluye la definición del patrón, el costo mensual estimado en toda su organización, una lista de sesiones marcadas y una solución recomendada.

### Tableros de agentes individuales {#individual-agent-dashboards}

La pestaña {{< ui >}}Coding Agents{{< /ui >}} muestra un mosaico para cada agente de codificación conectado (como Claude Code, GitHub Copilot y Cursor). Cada mosaico muestra un resumen de la actividad de ese agente, incluyendo el total de usuarios, el gasto total y el costo por línea de código.

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="El tableros de Claude Code muestra widgets para líneas añadidas, sesiones, confirmaciones y métricas de rendimiento" style="width:100%;" >}}

Haga clic en un mosaico de agente, o seleccione desde el menú desplegable {{< ui >}}All Coding Agents{{< /ui >}} en la parte superior de la página, para abrir un tableros dedicado para ese agente. El tableros dedicado incluye mosaicos de resumen para el gasto total, sesiones, confirmaciones y líneas añadidas, junto con gráficos de rendimiento que cubren el volumen de solicitudes, la latencia, los patrones de uso del modelo, las líneas añadidas frente a las eliminadas y las herramientas aceptadas frente a las rechazadas.

## Analice el uso de agentes {#analyze-agent-usage}

La pestaña {{< ui >}}Analytics{{< /ui >}} proporciona detalles granulares sobre individuos y equipos, ayudándole a identificar a los usuarios más activos, los casos atípicos y los patrones de adopción a nivel de equipo.

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="Pestaña de Análisis de la Consola de Agentes que muestra análisis detallados de usuarios y equipos para el uso de agentes de codificación, incluyendo tablas de clasificación y gráficos" style="width:100%;" >}}

### Comparación de equipos {#team-comparison}

El panel {{< ui >}}Comparison{{< /ui >}} le ayuda a identificar equipos que están invirtiendo demasiado o muy poco en herramientas de IA en relación con su producción. Compare el gasto, el costo por línea y el uso de modelos entre equipos y frente a la línea base de su organización para encontrar dónde es posible obtener ganancias de eficiencia o dónde los costos son inesperadamente altos.

### Análisis de usuarios {#user-analytics}

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="Panel de Análisis de Usuarios de Agent Console que muestra un desglose detallado para un usuario seleccionado, incluyendo el gasto por agente, la combinación de modelos y el historial de PR." style="width:100%;" >}}

El panel {{< ui >}}User Analytics{{< /ui >}} le brinda visibilidad sobre cómo los ingenieros individuales están utilizando las herramientas de IA en toda su organización. Utilice el panel para:
- Identificar a los usuarios con mayor gasto y a los colaboradores más productivos
- Detectar anomalías de eficiencia: ingenieros con un gasto elevado pero bajo rendimiento, o viceversa
- Ver un desglose completo de costos por usuario, agente y modelo
- Examinar el gasto, el historial de PR y la combinación de modelos de cualquier individuo

## Agentes de Bits AI {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Pestaña de Agentes de Bits AI con un gráfico combinado de actividad de agentes a lo largo del tiempo y tarjetas individuales para Bits Investigation, Bits Code y Bits Agent Builder que muestran investigaciones, sesiones y ejecuciones recientes" style="width:100%;" >}}

La pestaña {{< ui >}}Bits AI Agents{{< /ui >}} muestra el uso de los agentes de IA integrados de Datadog junto con sus agentes de codificación. La visualización combinada de investigaciones, sesiones y ejecuciones en todos los agentes de Datadog le permite correlacionar la actividad de Bits AI con el resto de su organización.

Las tarjetas individuales resumen la actividad de cada agente de Bits AI, incluyendo [Bits Investigation][5], [Bits Code][6] y [Bits Agent Builder][7]. Haga clic en {{< ui >}}View Details{{< /ui >}} en una tarjeta para examinar ese agente.

## Configure {#set-up}

Para comenzar a enviar datos a Agent Console, consulte [Set Up Agent Console][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /es/integrations/github-copilot/
[5]: /es/bits_ai/bits_investigation/
[6]: /es/bits_ai/bits_code/
[7]: /es/actions/agents/
[8]: /es/ai_agents_console/setup/