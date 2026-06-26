---
algolia:
  tags:
  - mcp
  - mcp server
  - security
  - security signals
  - security findings
  - detection rules
  - suppressions
description: Utiliza agentes de IA para investigar señales de seguridad y analizar
  hallazgos de seguridad con el conjunto de herramientas de seguridad del servidor
  Datadog MCP.
further_reading:
- link: mcp_server/setup
  tag: Documentación
  text: Configura el servidor Datadog MCP
- link: mcp_server
  tag: Documentación
  text: Descripción general del servidor Datadog MCP
- link: security/threats/security_signals/
  tag: Documentación
  text: Señales de seguridad
- link: security/guide/findings-schema/?tab=library_vulnerability
  tag: Documentación
  text: Hallazgos de seguridad
- link: security/detection_rules/
  tag: Documentación
  text: Reglas de detección
- link: security/suppressions/
  tag: Documentación
  text: Supresiones
title: Herramientas de seguridad MCP
---
## Descripción general {#overview}

El [servidor Datadog MCP][1] permite a los agentes de IA consultar sus datos de seguridad a través del [Model Context Protocol (MCP)][2]. El conjunto de herramientas `security` brinda a clientes de IA como Cursor, Claude Code y OpenAI Codex acceso a sus señales y hallazgos de seguridad, para que pueda investigar amenazas y analizar su postura de seguridad utilizando lenguaje natural.

<div class="alert alert-info">Esta página cubre el <code>security</code> conjunto de herramientas del servidor remoto Datadog MCP. Para el Code Security MCP Server, que se ejecuta localmente y escanea el código fuente durante el desarrollo, consulte <a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP Server</a>.</div>

### Casos de uso {#use-cases}

Puede utilizar el conjunto de herramientas `security` para:

- **Analizar y comprender señales de seguridad**: Pida a su agente de IA que muestre señales recientes de alta severidad de Cloud SIEM, App & API Protection alerts, o Workload Protection threats, y obtenga un resumen de patrones y recursos afectados.
- **Clasificar señales de seguridad**: Actualice el estado de clasificación o el asignado en un conjunto de señales coincidentes en bloque.
- **Analice su postura de seguridad**: Consulte hallazgos en Cloud Security con SQL para entender la distribución de misconfiguraciones, vulnerabilidades y riesgos de identidad en su entorno.
- **Investigue hallazgos específicos**: Recupere detalles completos de un conjunto de hallazgos para entender el alcance, los recursos afectados y el contexto de remediación.
- **Clasificar hallazgos de seguridad**: Cree Jira issues, tickets de ServiceNow o Case Management cases para los hallazgos. Asigne hallazgos a miembros del equipo, o silencie falsos positivos y riesgos aceptados.
- **Correlacione señales y hallazgos**: Referencie señales de seguridad activas con hallazgos abiertos para determinar si una alerta está relacionada con un problema de postura conocido.
- **Inspeccione y gestione reglas de detección**: Liste y recupere definiciones de reglas de detección para entender qué lógica está generando señales.
- **Gestionar supresiones**: Cree, actualice y elimine supresiones para silenciar reglas ruidosas en condiciones específicas sin desactivarlas por completo.
- **Remedie vulnerabilidades con un agente de IA**: Obtenga hallazgos de vulnerabilidades de la biblioteca, incluyendo la ubicación del código y la guía de remediación, y páselos a su agente de IA para aplicar parches directamente en su base de código.

## Inicio rápido {#quickstart}

El `security` conjunto de herramientas no está habilitado por defecto. Puede habilitarlo agregando un parámetro a su URL, lo que permite que las herramientas de seguridad interactúen con su cliente de IA.

1. [Configurar el Datadog MCP Server][4].
2. Al conectarse al Datadog MCP Server, agregue `security` al parámetro `toolsets`. Por ejemplo, para su [sitio de Datadog][3] ({{< region-param key="dd_site_name" >}}), use:
   ```text
   https://mcp.{{< region-param key="dd_site" >}}/v1/mcp?toolsets=core,security
   ```

<div class="alert alert-warning"><code>?toolsets=security</code> must be in the URL. Otherwise, security tools are not available to your AI client, even if the MCP Server is otherwise connected and working.</div>

## Available tools 

The `security` toolset exposes the following tools to your AI client. Each tool performs a specific action on your security data. When you ask a question in natural language, your AI client calls these tools on your behalf to retrieve the information it needs. For general information on how to use MCP tools, see the [Datadog MCP Server Overview][1].

### Security Signals 

`get_datadog_security_signals_schema`
: Returns the available fields and their types for security signals. Signal types map to `@workflow.rule.type` values such as `Log Detection`, `Application Security`, and `Workload Security`.
: *Permissions required: `Security Signals Read`*

`search_datadog_security_signals`
: Searches and retrieves security signals from Datadog, including Cloud SIEM signals, App & API Protection signals, and Workload Protection signals. Use this to surface and investigate suspicious activity.
: *Permissions required: `Security Signals Read`*

`analyze_datadog_security_signals`
: Analyzes security signals using SQL for aggregations, grouping, and trend analysis. Use this for counts, top-N breakdowns, and time-based questions. To list signals or retrieve a single signal, use `search_datadog_security_signals` or `get_datadog_security_signal` instead. Call `get_datadog_security_signals_schema` first to discover queryable fields.
: *Permissions required: `Security Signals Read`, `Timeseries`*

`get_datadog_security_signal`
: Retrieves the full details of a single security signal by ID, including attributes, rule information, triage state, tags, and case correlations. Use `search_datadog_security_signals` to find signal IDs first.
: *Permissions required: `Security Signals Read`*

`update_datadog_security_signals_triage`
: Updates the triage state or assignee of one or more security signals in bulk (up to 500 signals). Accepts either a list of signal IDs or a filter query matching all signals to update.
: *Permissions required: `Security Signals Write`*

### Security Findings 

`get_datadog_security_findings_schema`
: Returns the available fields and their types for security findings. Call this before using `analyze_datadog_security_findings` to discover which fields you can filter and group by. Supports filtering by finding type.
: *Permissions required: `Security Monitoring Findings Read`*

`analyze_datadog_security_findings`
: Primary tool for analyzing security findings using SQL. Queries live data from the last 24 hours with support for aggregations, filtering, and grouping. Call `get_datadog_security_findings_schema` first to discover available fields.
: *Permissions required: `Security Monitoring Findings Read`, `Timeseries`*

`search_datadog_security_findings`
: Retrieves full security finding objects. Use this when you need complete finding details or when SQL-based analysis is not sufficient. Prefer `analyze_datadog_security_findings` for most analysis tasks.
: *Permissions required: `Security Monitoring Findings Read`*

`get_datadog_security_findings_ticket_suggestions`
: Returns ranked project suggestions for ticketing security findings. Shows available Case Management, Jira, and ServiceNow projects with usage data. Call this before `create_datadog_security_findings_ticket` to discover which project to use.
: *Permissions required: `Security Monitoring Findings Read`, `Cases Read`*

`create_datadog_security_findings_ticket`
: Creates a Case Management case, Jira issue, or ServiceNow ticket for security findings. Requires specific finding IDs and a project ID. Use `get_datadog_security_findings_ticket_suggestions` first to discover available projects.
: *Permissions required: `Security Monitoring Findings Write`, `Cases Read`, `Cases Write`*

`detach_datadog_security_findings_ticket`
: Detaches security findings from their linked case or ticket. Since Jira and ServiceNow tickets are linked through Case Management, detaching the case also detaches any downstream ticket.
: *Permissions required: `Security Monitoring Findings Write`, `Cases Write`*

`mute_datadog_security_findings`
: Mutes or unmutes security findings to suppress them from alerts and dashboards. Requires a mute reason (`PENDING_FIX`, `FALSE_POSITIVE`, `ACCEPTED_RISK`, or `OTHER`) and supports an optional description and expiration date.
: *Permissions required: `Security Monitoring Findings Write`*

`assign_datadog_security_findings`
: Assigns or unassigns security findings to a user. Assignment cascades to any linked cases. Omit the assignee ID to unassign.
: *Permissions required: `Security Monitoring Findings Write`*

### Detection Rules 

`get_datadog_security_detection_rules_schema`
: Returns the authoring reference and schema for detection rules. Covers supported rule types, detection methods, query syntax, tag conventions, and field names that can be used as search facets. Use this before authoring or querying detection rules. Currently supported rule types: log detection and API security.
: *Permissions required: `Security Monitoring Rules Read`*

`list_datadog_security_detection_rules`
: Lists detection rules for the organization. Detection rules define the conditions under which security signals are generated. Accepts an optional free-text query to filter results server-side. Use `get_datadog_security_detection_rule` to retrieve the full definition of a specific rule.
: *Permissions required: `Security Monitoring Rules Read`*

`get_datadog_security_detection_rule`
: Retrieves the full definition of a single detection rule by ID, including queries, cases, options, filters, and metadata. Use `list_datadog_security_detection_rules` to find rule IDs.
: *Permissions required: `Security Monitoring Rules Read`*

### Suppressions 

`get_datadog_security_suppressions`
: Retrieves security monitoring suppressions. Supports three modes: list all suppressions, get a single suppression by ID, or get suppressions affecting a specific detection rule. Suppressions prevent detection rules from generating signals for matching conditions.
: *Permissions required: `Security Monitoring Suppressions Read`*

`create_datadog_security_suppression`
: Creates a new suppression rule that prevents a detection rule from generating signals matching specific conditions. At least one of `suppression_query` or `data_exclusion_query` must be provided.
: *Permissions required: `Security Monitoring Suppressions Write`*

`update_datadog_security_suppression`
: Updates an existing suppression rule. Only changes provided fields. Providing `version` enables optimistic concurrency control to prevent overwriting concurrent edits.
: *Permissions required: `Security Monitoring Suppressions Write`*

`delete_datadog_security_suppression`
: Deletes a suppression rule.
: *Permissions required: `Security Monitoring Suppressions Write`*

## Further reading 

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /es/getting_started/site/
[4]: /es/mcp_server/setup/