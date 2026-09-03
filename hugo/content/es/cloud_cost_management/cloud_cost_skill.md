---
algolia:
  rank: 75
  tags:
  - cloud cost
  - cloud cost management
  - ccm
  - finops
  - cloud cost skill
  - bits ai assistant
  - bits assistant
  - mcp
description: Utilice la Cloud Cost skill en Bits Chat para investigar, explicar y
  compartir hallazgos de Cloud Cost.
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
title: Habilidad de Cloud Cost en Bits Chat
---
## Resumen {#overview}

La habilidad de Cloud Cost es el flujo de trabajo de análisis de Cloud Cost Management en [Bits Chat][1]. Está diseñada para tareas de FinOps, como análisis de causa raíz, seguimiento de presupuestos y responder preguntas generales sobre costos. Por ejemplo, puede pedirle a Bits Chat que:

- Investigue [alertas de monitor de costos][2], [anomalías de costos][3] y [cambios de costos][4]
- Identifique equipos, servicios, cuentas, regiones o recursos que generen gastos
- Responda preguntas ad hoc sobre costos de nube, SaaS, personalizados o de Datadog
- Compare el gasto real y las previsiones contra [presupuestos][5]
- Correlacione los cambios de costos con métricas de observabilidad, como CPU, memoria, volumen de solicitudes o tamaño de almacenamiento
- Cree [Notebooks][15] que capturen una investigación para su entrega o referencia futura

## Requisitos Previos {#prerequisites}

Para utilizar la Cloud Cost skill en Bits Chat, debe:

- [Configurar Cloud Cost Management][6] para las fuentes de costo que desea analizar
- Tenga estos permisos:
  - [Acceso a Bits Chat][7] permiso
  - [Permisos de Cloud Cost Management][8] para los datos que consulta
  - (Opcional) [Permisos de Notebooks][9], si desea crear o editar investigaciones [Notebooks][15]

## Inicie una investigación con la Cloud Cost skill {#start-an-investigation-with-the-cloud-cost-skill}

{{< img src="cloud_cost/cc_skill_anomalies.png" alt="Gráficos de anomalías de costos que muestran el botón Investigar con Bits AI en cada gráfico." style="width:80%;" >}}

Cuando desee iniciar una investigación, como por ejemplo para una [anomalía de costo][3], haga clic en {{< ui >}}Investigate{{< /ui >}} o {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (el ícono de estrellas centelleantes) para abrir la Cloud Cost skill.

Alternativamente, puede hacer clic en {{< ui >}}Ask Bits{{< /ui >}} en la parte superior derecha de la barra de navegación en cualquier página de Datadog para abrir Bits Chat y hacer una pregunta sobre costos.

Ejemplos de solicitudes:

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Why is the infrastructure budget projected to go over this month?`
- `Show total cloud cost by provider for the last 30 complete days.`
- `Find optimization opportunities for idle or over-provisioned cloud infrastructure.`

### Investigaciones de cambios de costo {#cost-change-investigations}

Cuando investiga un cambio de costo con la Cloud Cost skill, Bits Chat proporciona un resumen conciso y luego pregunta qué desea explorar a continuación. El análisis inicial típicamente incluye:

- Un gráfico de costos diario para los períodos de referencia e investigación
- El período de referencia, el período de investigación, el monto total en dólares y el cambio porcentual, y el impacto anual proyectado cuando sea aplicable
- Contexto de tasa versus uso para ayudar a distinguir los cambios de precio de los cambios en el consumo
- Atribución de propietario o equipo basada en sus etiquetas

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Resumen de la investigación de Bits Chat que muestra un análisis inicial." style="width:60%;" >}}

Después del resumen inicial, Bits Chat puede:

- Encuentre los principales servicios, cuentas, regiones, recursos o etiquetas que impulsan el cambio
- Correlacione el cambio de costo con métricas como solicitudes de CPU, solicitudes de memoria, conteo de solicitudes, tamaño de bucket o uso de base de datos
- Encuentre presupuestos relacionados y compare el gasto real o pronosticado con los objetivos del presupuesto
- Cree un Notebook de Datadog para el equipo que posee el servicio y confirmar y actuar sobre los hallazgos
- Capture la investigación para sus registros en un Notebook

### Presupuestos y pronósticos {#budgets-and-forecasting}

Después de configurar [Presupuestos][5], utilice la Cloud Cost skill en Bits Chat para explicar el estado del presupuesto y el gasto. Bits Chat puede ayudar a resumir:

- Gasto real versus monto presupuestado
- Gasto pronosticado versus monto presupuestado
- Qué alcance de costo cubre un presupuesto, basado en los filtros del presupuesto
- Qué entradas de presupuesto, equipos, servicios o proveedores están contribuyendo a un excedente

Después del resumen inicial, Bits Chat puede:

- Encuentre los principales servicios, cuentas, regiones, recursos o etiquetas que impulsan el gasto
- Identifique los equipos que poseen los recursos que contribuyen al cambio de costo
- Actualice su presupuesto
- Capture la investigación para sus registros en un Notebook

## Utilice Datadog MCP Server para el análisis de costos {#use-the-datadog-mcp-server-for-cost-analysis}

El [Datadog MCP Server][10] permite a los agentes de IA externos consultar datos de Datadog. Esto es útil cuando desea hacer preguntas sobre costos desde un IDE, asistente basado en terminal o flujo de trabajo de IA personalizado.

Para utilizar un agente de IA externo, [configure Datadog MCP Server][11]. Si su cliente MCP filtra conjuntos de herramientas, incluya el `core` conjunto de herramientas para utilizar las herramientas métricas que pueden consultar datos de Cloud Cost Management.

Los datos de Cloud Cost Management están disponibles a través de las herramientas métricas principales:

| Herramienta MCP                          | Uso                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][12]         | Consulte métricas de costos, compare períodos y agrupe costos por proveedor, servicio, equipo, cuenta, recurso o etiqueta. |
| [`get_datadog_metric_context`][13] | Descubra metadatos, claves de etiquetas disponibles y valores de etiquetas para una métrica de costo antes de consultarla.               |

Pida a su agente que establezca `use_cloud_cost` en `true` para las métricas de Cloud Cost Management, como `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*` o `datadog.cost.*`. Para métricas de observabilidad que explican un cambio de costo, como la CPU de Kubernetes o el tamaño del bucket S3, utilice el comportamiento estándar de consulta de métricas.

Ejemplos de solicitudes para agentes conectados a MCP:

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

Para instrucciones de conexión, clientes compatibles y configuración de herramientas, consulte [Set Up the Datadog MCP Server][11]. Para la referencia completa de herramientas MCP, consulte [Datadog MCP Server Tools][14].

## Lectura adicional {#further-reading}

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