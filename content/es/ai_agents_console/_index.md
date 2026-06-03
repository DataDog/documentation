---
description: Realice el seguimiento del uso, costo y rendimiento de los agentes de
  codificación y de Bits AI Agent en toda su organización en Datadog Agent Console.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentación
  text: Configurar Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentación
  text: Integración de Uso y Costos de Anthropic
- link: /integrations/cursor/
  tag: Documentación
  text: Integración de Cursor
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: Blog
  text: Monitoree la adopción de Claude Code en su organización con Agent Console
    de Datadog
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="Vista previa">}}
Agent Console está en Preview y disponible para todos los clientes de Datadog.
{{< /callout >}}

El [Agent Console][1] proporciona monitoreo centralizado para los agentes de IA en toda su organización. Recopila registros y métricas de los agentes de codificación y de los propios [Bits AI Agent](#bits-ai-agents) de Datadog, presentándolos en tiempo real para brindarle visibilidad sobre el uso, costo, latencia, impacto en la productividad y patrones emergentes de problemas.

Agent Console soporta los siguientes agentes de codificación:

| Herramienta | Descripción |
|------|-------------|
| [Claude Code][2] | Herramienta de codificación agente de Anthropic |
| [Cursor][3] | Editor de código potenciado por IA |
| [GitHub Copilot][10] | Herramienta de finalización de código potenciada por IA de GitHub |


## Agentes de codificación {#coding-agents}

La {{< ui >}}Coding Agents{{< /ui >}} pestaña te brinda una vista general de la actividad de los agentes de codificación en toda tu organización. Por defecto, la vista agrega todos los agentes de codificación y se puede filtrar a un solo agente.

### Hallazgos del agente {#agent-findings}

El {{< ui >}}Agent Findings{{< /ui >}} panel resume la actividad de alto nivel para el rango de tiempo seleccionado, incluyendo el gasto total, total de usuarios, sesiones, tiempo para fusionar, líneas de código y giros promedio por sesión. El gráfico apilado desglosa la actividad por agente (por ejemplo, Claude Code y Cursor) para que puedas comparar la adopción a lo largo del tiempo.

{{< img src="ai_agents_console/agent-findings.png" alt="Panel de Hallazgos del Agente que muestra mosaicos de resumen para Gasto Total, Total de Usuarios, Sesiones, Tiempo para Fusionar, Líneas de Código y Giros Promedio, con un gráfico de barras apiladas de la actividad del agente durante una semana." style="width:100%;" >}}

### Métricas de impacto {#impact-metrics}

El panel {{< ui >}}Impact Metrics{{< /ui >}} mide el efecto del desarrollo asistido por IA en tu ciclo de vida de entrega de software utilizando métricas al estilo DORA, con comparaciones lado a lado entre el trabajo asistido por IA y el trabajo no asistido por IA.

- **Adopción**: Rastree cuánto código se produce mediante IA, incluyendo commits asistidos por IA y PRs asistidos por IA.
- **Velocidad**: Mida la rapidez con la que los cambios llegan a producción, incluyendo el tiempo de entrega de cambios y el tiempo de revisión de PR.
- **Estabilidad**: Rastree qué tan confiables son los cambios después del lanzamiento, incluyendo la tasa de fallos de cambios y el tiempo de recuperación.

{{< img src="ai_agents_console/impact-metrics.png" alt="Panel de Métricas de Impacto con tres tarjetas para Adopción, Velocidad y Estabilidad, cada una que contiene dos gráficos de tendencias que comparan el trabajo asistido por IA con el trabajo no asistido por IA." style="width:100%;" >}}

### Problemas detectados {#detected-problems}

El panel {{< ui >}}Detected Problems{{< /ui >}} destaca patrones de problemas comunes que tu equipo está encontrando y recomienda soluciones. El diagrama de Sankey muestra cómo los patrones de problemas (como verificaciones omitidas, bucles de reintento y relecturas de archivos) fluyen desde agentes individuales hacia repositorios específicos, con un costo mensual estimado para cada patrón.

{{< img src="ai_agents_console/detected-problems.png" alt="Diagrama de Sankey de Problemas Detectados que mapea las sesiones de Claude Code, Cursor y GitHub Copilot a patrones de problemas como verificaciones omitidas, bucles de reintento y relecturas de archivos, luego a repositorios afectados, con un panel lateral que muestra desgloses de costos por repositorio." style="width:100%;" >}}

Seleccione un patrón para abrir una vista de detalle que incluye la definición del patrón, el costo mensual estimado en toda su organización, una lista de sesiones marcadas y una solución recomendada.

{{< img src="ai_agents_console/detected-pattern-detail.png" alt="Vista de detalle del Patrón Detectado para verificaciones omitidas, mostrando la definición del patrón, un costo estimado de $8.5K por mes, un botón de Ver Recomendación y una lista de 12 sesiones marcadas con usuarios, agentes, duraciones y costos." style="width:100%;" >}}

### Paneles de agentes individuales {#individual-agent-dashboards}

Seleccione una tarjeta de agente para abrir un panel dedicado para ese agente de codificación. Cada panel incluye mosaicos de resumen para gasto total, sesiones, commits y líneas añadidas, junto con gráficos de rendimiento que cubren volumen de solicitudes, latencia, patrones de uso del modelo, líneas añadidas vs. eliminadas y aceptaciones vs. rechazos de herramientas.

Filtre cada panel por equipo, usuario, repositorio y rango de tiempo.

{{< img src="ai_agents_console/coding-agent-dashboard.png" alt="Panel de Claude Code en la pestaña de Agentes de Codificación con filtros de Equipos, Usuarios y Repositorio; mosaicos de resumen para Gasto Total, Sesiones, Commits y Líneas Añadidas; y gráficos de Rendimiento para Commits a lo Largo del Tiempo, Pull Requests a lo Largo del Tiempo, Líneas Añadidas vs Eliminadas, y Herramientas Aceptadas vs Rechazadas." style="width:100%;" >}}

## Analiza el uso de los agentes {#analyze-agent-usage}

La pestaña {{< ui >}}Analytics{{< /ui >}} proporciona detalles granulares para individuos y equipos, ayudándole a identificar usuarios destacados, valores anómalos y patrones de adopción a nivel de equipo.

### Comparación de equipos {#team-comparison}

El panel {{< ui >}}Comparison{{< /ui >}} muestra el gasto de su equipo, el costo por línea y el uso del modelo en relación con otros equipos y la organización en general. El gráfico de líneas muestra la métrica seleccionada por ingeniero a lo largo del tiempo, y la tabla desglosa el gasto por ingeniero, el costo por PR, el tiempo para fusionar y las sesiones para cada equipo. Los insights a la derecha destacan tendencias notables, como equipos que están funcionando muy por encima o por debajo del promedio de la organización.

Seleccione {{< ui >}}Team Details{{< /ui >}} en una fila para abrir la vista de ese equipo.

{{< img src="ai_agents_console/team-comparison.png" alt="Panel de comparación con un gráfico de líneas del gasto por ingeniero a través de equipos a lo largo del tiempo, llamadas de insights a la derecha, y una tabla que compara el gasto por ingeniero, el costo por PR, el tiempo para fusionar y las sesiones para cada equipo." style="width:100%;" >}}

### Analítica de usuarios {#user-analytics}

El panel {{< ui >}}User Analytics{{< /ui >}} desglosa la actividad por usuario individual.

#### Usuarios principales {#top-users}

Tres tablas de clasificación clasifican a sus principales contribuyentes por gasto, líneas generadas y PRs fusionados.

{{< img src="ai_agents_console/top-users.png" alt="Panel de Analítica de Usuarios que muestra tres tablas de clasificación: Usuarios Principales por Gasto, Usuarios Principales por Líneas Generadas y Usuarios Principales por PRs Fusionados." style="width:100%;" >}}

#### Líneas generadas vs. gasto {#lines-generated-vs-spend}

El gráfico {{< ui >}}Lines Generated vs Spend{{< /ui >}} representa a cada usuario como un punto, con el tamaño del punto reflejando el número de sesiones. Ambos ejes son configurables para que puedas comparar líneas generadas, PRs o gasto.

{{< img src="ai_agents_console/lines-vs-spend.png" alt="Gráfico de dispersión de Líneas Generadas vs Gasto, con cada usuario como una burbuja de tamaño basado en el número de sesiones y etiquetada con direcciones de correo electrónico." style="width:100%;" >}}

#### Costo por usuario a través de agentes {#user-cost-across-agents}

La {{< ui >}}User Cost Across Agents{{< /ui >}} tabla lista cada usuario, los agentes que usa, el costo de su modelo (con un desglose por modelo), las líneas de código generadas y el número de sesiones. Busque un usuario específico u ordene por cualquier columna.

{{< img src="ai_agents_console/user-cost-across-agents.png" alt="Tabla de Costo por Usuario a través de Agentes que muestra el costo por modelo por usuario, los agentes usados, las líneas de código generadas y las sesiones para 98 usuarios." style="width:100%;" >}}

Seleccione un usuario para abrir una vista de detalles que incluye su gasto, líneas generadas, solicitudes de extracción, porcentaje de adopción de IA, mezcla de modelos y solicitudes de extracción recientes. Cambie a la pestaña {{< ui >}}GitHub Pull Requests{{< /ui >}} para ver el historial completo de PR del usuario.

{{< img src="ai_agents_console/user-detail.png" alt="Vista de detalles del usuario para un usuario individual, mostrando mosaicos de resumen para Gasto del Usuario, Líneas Generadas y Solicitudes de Extracción; un desglose de Adopción de IA y Mezcla de Modelos; y una tabla de Solicitudes de Extracción Recientes." style="width:100%;" >}}

## Bits AI Agent{#bits-ai-agents}

La pestaña {{< ui >}}Bits AI Agents{{< /ui >}} muestra el uso de los agentes de IA integrados de Datadog junto a sus agentes de codificación. La vista combinada de investigaciones, sesiones y ejecuciones a través de todos los agentes de Datadog le permite correlacionar la actividad de Bits AI con el resto de su organización.

Las tarjetas individuales resumen la actividad de cada Bits AI Agent, incluyendo [Bits AI SRE][11], [Bits AI Dev Agent][12] y [Agent Builder][13]. Seleccione {{< ui >}}View Details{{< /ui >}} en una tarjeta para examinar ese agente.

{{< img src="ai_agents_console/bits-ai-agents.png" alt="Pestaña Bits AI Agents con un gráfico combinado de actividad de agentes a lo largo del tiempo y tarjetas individuales para Bits AI SRE, Bits AI Dev Agent y Agent Builder que muestran investigaciones, sesiones y ejecuciones recientes." style="width:100%;" >}}

## Configurar {#set-up}

Para comenzar a enviar datos a Agent Console, consulte [Configurar Agent Console][14].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[10]: /es/integrations/github-copilot/
[11]: /es/bits_ai/bits_ai_sre/
[12]: /es/bits_ai/bits_ai_dev_agent/
[13]: /es/actions/agents/
[14]: /es/ai_agents_console/setup/