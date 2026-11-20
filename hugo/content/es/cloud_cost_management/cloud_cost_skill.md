---
algolia:
  rank: 75
  tags:
  - cloud cost
  - cloud cost management
  - ccm
  - finops
  - cloud cost skill
  - savings analysis
  - savings opportunities
  - bits ai assistant
  - bits assistant
  - mcp
description: Utilice la habilidad Cloud Cost en Bits Chat para investigar, explicar
  y compartir hallazgos sobre costos en la nube y para encontrar oportunidades de
  ahorro.
further_reading:
- link: /bits_ai/bits_chat/
  tag: Documentación
  text: Bits Chat
- link: /mcp_server/
  tag: Documentación
  text: Datadog MCP Server
- link: /cloud_cost_management/reporting/explorer/
  tag: Documentación
  text: Cost Explorer
- link: /cloud_cost_management/planning/budgets/
  tag: Documentación
  text: Presupuestos
- link: /cloud_cost_management/recommendations/
  tag: Documentación
  text: Recomendaciones de Cloud Cost
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: Blog
  text: Responda cualquier pregunta sobre costos más rápido con la habilidad Cloud
    Cost en Bits Chat.
title: Cloud Cost Skill en Bits Chat
---
## Descripción general {#overview}

La habilidad Cloud Cost es el flujo de trabajo de análisis de Cloud Cost Management en [Bits Chat][1]. Está diseñada para tareas de FinOps, como el análisis de causa raíz, el seguimiento de presupuestos, la búsqueda de ahorros y la respuesta a preguntas generales sobre costos. Por ejemplo, puede pedirle a Bits Chat que:

- Investigue [alertas del monitor de costos][2], [anomalías de costos][3] y [cambios en los costos][4]
- Identifique equipos, servicios, cuentas, regiones o recursos que impulsan el gasto
- Responda preguntas ad hoc sobre costos de la nube, SaaS, personalizados o de Datadog
- Compare el gasto real y las previsiones frente a los [presupuestos][5]
- Encuentre oportunidades de ahorro en un equipo, servicio u otro contexto, cada una con un propietario, ahorros estimados y evidencia de respaldo
- Correlacione los cambios en los costos con métricas de observabilidad, como CPU, memoria, volumen de solicitudes o tamaño de almacenamiento
- Cree [Notebooks][15] que capturen una investigación para su transferencia o referencia futura

## Requisitos previos {#prerequisites}

Para utilizar la habilidad Cloud Cost en Bits Chat, debe:

- [Configure Cloud Cost Management][6] para las fuentes de costos que desea analizar
- Tener estos permisos:
  - Permiso de [Bits Chat Access][7]
  - [Permisos de Cloud Cost Management][8] para los datos sobre los que pregunta
  - (Opcional) [Permisos de notebook][9], si desea crear o editar [Notebooks][15] de investigación

## Inicie una investigación con la habilidad Cloud Cost {#start-an-investigation-with-the-cloud-cost-skill}

{{< img src="cloud_cost/cc_skill_anomalies.png" alt="Gráficos de anomalías de costos que muestran el botón Investigate with Bits AI en cada gráfico." style="width:80%;" >}}

Cuando desee iniciar una investigación, como para una [anomalía de costos][3], haga clic en {{< ui >}}Investigate{{< /ui >}} o {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (el ícono de estrellas centelleantes) para abrir la habilidad Cloud Cost.

Alternativamente, puede hacer clic en {{< ui >}}Ask Bits{{< /ui >}} en la parte superior derecha de la barra de navegación en cualquier página de Datadog para abrir Bits Chat y hacer una pregunta sobre costos.

Para encontrar oportunidades de ahorro, haga clic en {{< ui >}}Optimize{{< /ui >}} en la página de [Cloud Cost Recommendations][17]. Para obtener más información, consulte la sección [Análisis de ahorros](#savings-analysis).

Ejemplos de prompts:

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Why is the infrastructure budget projected to go over this month?`
- `Show total cloud cost by provider for the last 30 complete days.`
- `Find savings opportunities for team:payments.`

### Investigaciones de cambios en los costos {#cost-change-investigations}

Cuando investiga un cambio en los costos con la habilidad Cloud Cost, Bits Chat proporciona un resumen conciso y luego pregunta qué desea explorar a continuación. El análisis inicial generalmente incluye:

- Un gráfico de costos diarios para los períodos de referencia y de investigación
- El período de referencia, el período de investigación, el monto total en dólares y el cambio porcentual, y el impacto anual proyectado cuando corresponda
- Contexto de tasa frente a uso para ayudar a distinguir los cambios de precio de los cambios de consumo
- Atribución al propietario o al equipo según sus etiquetas de costo

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Resumen de investigación de Bits Chat que muestra un análisis inicial." style="width:60%;" >}}

Después del resumen inicial, Bits Chat puede:

- Encontrar los principales servicios, cuentas, regiones, recursos o etiquetas que impulsan el cambio
- Correlacionar el cambio de costo con métricas como solicitudes de CPU, solicitudes de memoria, recuento de solicitudes, tamaño del bucket o uso de la base de datos
- Encontrar presupuestos relacionados y comparar el gasto real o previsto con los objetivos presupuestarios
- Crear un notebook de Datadog para que el equipo responsable del servicio confirme los hallazgos y tome medidas
- Registrar la investigación en un notebook para conservarla

### Presupuestos y pronósticos {#budgets-and-forecasting}

Después de configurar [Budgets][5], utilice la habilidad Cloud Cost en Bits Chat para explicar el estado del presupuesto y el gasto. Bits Chat puede ayudar a resumir:

- Gasto real frente al monto presupuestado
- Gasto pronosticado frente al monto presupuestado
- Qué contexto de costos cubre un presupuesto, según los filtros del presupuesto
- Qué entradas de presupuesto, equipos, servicios o proveedores están contribuyendo a un excedente

Después del resumen inicial, Bits Chat puede:

- Encontrar los principales servicios, cuentas, regiones, recursos o etiquetas que impulsan el gasto
- Identificar los equipos responsables de los recursos que contribuyen al cambio en el costo
- Actualizar su presupuesto
- Registrar la investigación en un notebook para conservarla

### Análisis de ahorros {#savings-analysis}

Pídale a Bits Chat que encuentre oportunidades de ahorro en un equipo, servicio u otro contexto, o haga clic en {{< ui >}}Optimize{{< /ui >}} en la barra de filtros de la página [Cloud Cost Recommendations][17]. Bits Chat investiga los datos de costo y uso del contexto y luego resume las oportunidades de ahorro que encuentra. El resumen generalmente incluye:

- El costo anual actual del contexto y el ahorro anual total estimado
- Una tabla de oportunidades de ahorro, cada una con un equipo propietario, el ahorro anual estimado y las calificaciones de **Effort**, **Risk** y **Confidence**
- Elementos de trabajo existentes de [Work Management][18], incidencias de Jira y Cloud Cost Recommendations relacionadas para el contexto

Después del resumen inicial, Bits Chat puede:

- Explicar la evidencia detrás de cualquier oportunidad de ahorro
- Crear un elemento de trabajo o [notebook][15] con una descripción detallada para cada equipo propietario
- Mostrar las descripciones completas en la conversación

## Utilice Datadog MCP Server para el análisis de costos {#use-the-datadog-mcp-server-for-cost-analysis}

[Datadog MCP Server][10] permite que los agentes de IA externos consulten datos de Datadog. Esto es útil cuando desea hacer preguntas sobre costos desde un IDE, un asistente basado en terminal o un flujo de trabajo de IA personalizado.

Para utilizar un agente de IA externo, [configure Datadog MCP Server][11]. Si su cliente MCP filtra conjuntos de herramientas, debe habilitar el conjunto de herramientas relevante antes de que el agente pueda llamar a sus herramientas:

- Habilite el conjunto de herramientas `cost` para enumerar las recomendaciones de ahorro de costos con [`cost_recommendations`][16].
- Habilite el conjunto de herramientas `core` para consultar las métricas de Cloud Cost Management con las herramientas de métricas.

### Enumerar recomendaciones de ahorro de costos {#list-cost-saving-recommendations}

El conjunto de herramientas `cost` proporciona la herramienta [`cost_recommendations`][16], que enumera las recomendaciones de ahorro de costos de su organización clasificadas por el ahorro diario potencial estimado (primero el más alto). Admite el filtrado por proveedor de nube, tipo de recomendación, estado, umbral de ahorro y etiquetas de recursos. Esta herramienta requiere el permiso `Cloud Cost Management Read`.

Ejemplos de prompts para el conjunto de herramientas `cost`:

- `What are my top cloud cost-saving recommendations?`
- `How much could I save per day, and how many open recommendations do I have?`
- `Show me open AWS recommendations for my Kubernetes clusters.`

### Consultar métricas de Cloud Cost Management {#query-cloud-cost-management-metrics}

El conjunto de herramientas `core` proporciona las herramientas de métricas que pueden consultar los datos de Cloud Cost Management:

| Herramienta MCP                          | Uso                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][12]         | Consulte métricas de costos, compare períodos y agrupe costos por proveedor, servicio, equipo, cuenta, recurso o etiqueta. |
| [`get_datadog_metric_context`][13] | Descubra metadatos, claves de etiqueta disponibles y valores de etiqueta para una métrica de costo antes de consultarla.               |

Pídale a su agente que establezca `use_cloud_cost` en `true` para las métricas de Cloud Cost Management, como `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*` o `datadog.cost.*`. Para métricas de observabilidad que expliquen un cambio en los costos, como la CPU de Kubernetes o el tamaño de un bucket de S3, utilice el comportamiento estándar de consulta de métricas.

Ejemplos de prompts para el conjunto de herramientas `core`:

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

Para obtener instrucciones de conexión, clientes compatibles y configuración del conjunto de herramientas, consulte [Configurar Datadog MCP Server][11]. Para ver la referencia completa de las herramientas MCP, consulte [Herramientas de Datadog MCP Server][14].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_chat/
[2]: https://app.datadoghq.com/cost/monitor/monitors
[3]: https://app.datadoghq.com/cost/monitor/anomalies
[4]: https://app.datadoghq.com/cost/summarize/overview
[5]: https://app.datadoghq.com/cost/plan/budgets
[6]: /es/cloud_cost_management/setup/
[7]: /es/account_management/rbac/permissions/#bits-assistant
[8]: /es/cloud_cost_management/setup/permissions/
[9]: /es/account_management/rbac/permissions/#notebooks
[10]: /es/mcp_server/
[11]: /es/mcp_server/setup/
[12]: /es/mcp_server/tools/#get_datadog_metric
[13]: /es/mcp_server/tools/#get_datadog_metric_context
[14]: /es/mcp_server/tools/
[15]: /es/notebooks/
[16]: /es/mcp_server/tools/#cost_recommendations
[17]: https://app.datadoghq.com/cost/optimize/recommendations
[18]: /es/incident_response/work_management/