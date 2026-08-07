---
description: Realiza el seguimiento y análisis del uso, costo y rendimiento de los
  agentes de codificación y de Bits AI en toda tu organización en Datadog Agent Console.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentación
  text: Configurar Datadog Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentación
  text: Integración de Uso y Costos de Anthropic
- link: /integrations/cursor/
  tag: Documentación
  text: Integración de Cursor
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: Blog
  text: Monitorea la adopción de Claude Code en tu organización con Datadog Agent
    Console
title: Datadog Agent Console
---
{{< callout url="#" btn_hidden="true" header="Vista previa">}}
Datadog Agent Console está en Vista previa y disponible para todos los clientes de Datadog.
{{< /callout >}}

La [Datadog Agent Console][1] proporciona seguimiento centralizado para los agentes de IA en toda tu organización. Recopila registros y métricas de los agentes de codificación y de los propios [agentes de Bits AI](#bits-ai-agents) de Datadog, presentándolos en tiempo real para darte visibilidad sobre el uso, costo, latencia, impacto en la productividad y patrones emergentes de problemas.

Datadog Agent Console soporta los siguientes agentes de codificación:

| Herramienta | Descripción |
|------|-------------|
| [Claude Code][2] | Herramienta de codificación agente de Anthropic |
| [Cursor][3] | Editor de código potenciado por IA |
| [GitHub Copilot][4] | Herramienta de finalización de código potenciada por IA de GitHub |


## Agentes de codificación {#coding-agents}

La {{< ui >}}Coding Agents{{< /ui >}} pestaña te brinda una vista general de la actividad de los agentes de codificación en toda tu organización. Por defecto, la vista agrega todos los agentes de codificación y se puede filtrar a un solo agente.

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="La pestaña de Agentes de Codificación en Datadog Agent Console muestra un resumen de los hallazgos de los agentes con métricas y tendencias para Claude Code, Cursor y GitHub Copilot." style="width:100%;" >}}

### Hallazgos del agente {#agent-findings}

El {{< ui >}}Agent Findings{{< /ui >}} panel resume la actividad de alto nivel para el rango de tiempo seleccionado, incluyendo el gasto total, el total de usuarios, sesiones, tiempo para fusionar, líneas de código y giros promedio por sesión. El gráfico apilado desglosa la actividad por agente (por ejemplo, Claude Code y Cursor) para que puedas comparar la adopción a lo largo del tiempo.

### Métricas de impacto {#impact-metrics}

El {{< ui >}}Impact Metrics{{< /ui >}} panel mide el efecto del desarrollo asistido por IA en tu ciclo de vida de entrega de software utilizando métricas al estilo DORA, con comparaciones lado a lado entre el trabajo asistido por IA y el trabajo no asistido por IA.

- **Adopción**: rastrea cuánto código está siendo producido por IA, incluyendo commits asistidos por IA y PRs asistidos por IA.
- **Velocidad**: mide qué tan rápido los cambios llegan a producción, incluyendo el tiempo de entrega de cambios y el tiempo de revisión de PR.
- **Estabilidad**: rastrea cuán confiables son los cambios después del lanzamiento, incluyendo la tasa de fallos de cambios y el tiempo de recuperación.

### Problemas detectados {#detected-problems}

El {{< ui >}}Detected Problems{{< /ui >}} tablero destaca patrones de problemas comunes que tu equipo está encontrando y recomienda soluciones recomendadas. El diagrama de Sankey muestra cómo los patrones de problemas (como verificaciones omitidas, bucles de reintento y relecturas de archivos) fluyen desde agentes individuales hacia repositorios específicos, con un costo mensual estimado para cada patrón.

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Diagrama de Sankey de Problemas Detectados que muestra cómo las sesiones de Claude Code, Cursor y GitHub Copilot se mapean a patrones de problemas, destacando las verificaciones omitidas." style="width:90%;" >}}

Haz clic en un {{< ui >}}Problem Pattern{{< /ui >}} nodo para abrir una vista de detalle que incluye la definición del patrón, el costo mensual estimado en toda tu organización, una lista de sesiones marcadas y una solución recomendada.

### Tableros de agentes individuales {#individual-agent-dashboards}

La {{< ui >}}Coding Agents{{< /ui >}} pestaña muestra un mosaico para cada agente de codificación conectado (como Claude Code, GitHub Copilot y Cursor). Cada mosaico muestra un resumen de la actividad de ese agente, incluyendo el total de usuarios, el gasto total y el costo por línea de código.

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="El tablero de Claude Code muestra widgets para líneas añadidas, sesiones, commits y métricas de rendimiento." style="width:100%;" >}}

Haz clic en un mosaico de agente, o selecciona desde el {{< ui >}}All Coding Agents{{< /ui >}} menú desplegable en la parte superior de la página, para abrir un tablero dedicado para ese agente. El tablero dedicado incluye mosaicos de resumen para el gasto total, sesiones, compromisos y líneas añadidas, junto con gráficos de rendimiento que cubren el volumen de solicitudes, latencia, patrones de uso del modelo, líneas añadidas frente a eliminadas, y aceptaciones frente a rechazos de herramientas.

## Analizar el uso de agentes {#analyze-agent-usage}

La {{< ui >}}Analytics{{< /ui >}} pestaña proporciona detalles granulares para individuos y equipos, ayudándote a identificar usuarios destacados, excepciones y patrones de adopción a nivel de equipo.

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="Pestaña de análisis de la consola de agentes que muestra análisis detallados de usuarios y equipos para el uso de agentes de codificación, incluyendo tablas de clasificación y gráficos." style="width:100%;" >}}

### Comparación de equipos {#team-comparison}

El {{< ui >}}Comparison{{< /ui >}} panel te ayuda a identificar equipos que están sobre- o sub-invirtiendo en herramientas de IA en relación con su producción. Compara el gasto, el costo por línea y el uso del modelo entre equipos y contra la línea base de tu organización para encontrar dónde son posibles las ganancias de eficiencia o dónde los costos son inesperadamente altos.

### Análisis de usuarios {#user-analytics}

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="Panel de análisis de usuarios de la consola de agentes que muestra un desglose detallado para un usuario seleccionado, incluyendo el gasto por agente, mezcla de modelos e historial de PR." style="width:100%;" >}}

El {{< ui >}}User Analytics{{< /ui >}} panel te da visibilidad sobre cómo los ingenieros individuales están utilizando herramientas de IA en toda tu organización. Utiliza el panel para:
- Identificar a tus mayores gastadores y contribuyentes más productivos
- Detectar excepciones de eficiencia: ingenieros con alto gasto pero baja producción, o viceversa
- Ver un desglose completo de costos por usuario, agente y modelo
- Examinar el gasto, historial de PR y mezcla de modelos de cualquier individuo

## Agentes de IA de Bits {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Pestaña de Agentes de IA de Bits con un gráfico de actividad de agentes combinados a lo largo del tiempo y tarjetas individuales para Bits Investigation, Bits Code y Bits Agent Builder mostrando investigaciones recientes, sesiones y ejecuciones." style="width:100%;" >}}

La {{< ui >}}Bits AI Agents{{< /ui >}} pestaña muestra el uso de los agentes de IA integrados de Datadog junto a tus agentes de codificación. La vista combinada de investigaciones, sesiones y ejecuciones a través de todos los agentes de Datadog te permite correlacionar la actividad de Bits AI con el resto de tu organización.

Las tarjetas individuales resumen la actividad de cada agente de Bits AI, incluyendo [Bits Investigation][5], [Bits Code][6] y [Bits Agent Builder][7]. Haz clic en una {{< ui >}}View Details{{< /ui >}} tarjeta para examinar ese agente.

## Configurar {#set-up}

Para comenzar a enviar datos a Agent Console, consulte [Configurar Agent Console][8].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /es/integrations/github-copilot/
[5]: /es/bits_ai/bits_ai_sre/
[6]: /es/bits_ai/bits_ai_dev_agent/
[7]: /es/actions/agents/
[8]: /es/ai_agents_console/setup/