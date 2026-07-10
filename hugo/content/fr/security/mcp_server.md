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
description: Utilisez des agents d'IA pour enquêter sur les signaux de sécurité et
  analyser les résultats de sécurité avec l'ensemble d'outils de sécurité du serveur
  Datadog MCP.
further_reading:
- link: mcp_server/setup
  tag: Documentation
  text: Configurez le serveur Datadog MCP
- link: mcp_server
  tag: Documentation
  text: Aperçu du serveur Datadog MCP
- link: security/threats/security_signals/
  tag: Documentation
  text: .NET
- link: security/guide/findings-schema/?tab=library_vulnerability
  tag: Documentation
  text: Résultats de sécurité
- link: security/detection_rules/
  tag: Documentation
  text: Règles de détection
- link: security/suppressions/
  tag: Documentation
  text: Suppressions
title: Outils de sécurité MCP
---
## Aperçu {#overview}

Le [serveur Datadog MCP][1] permet aux agents d'IA d'interroger vos données de sécurité via le [Model Context Protocol (MCP)][2]. L'ensemble `security`d'outils donne aux clients d'IA comme Cursor, Claude Code et OpenAI Codex accès à vos signaux et résultats de sécurité, afin que vous puissiez enquêter sur les menaces et analyser votre posture de sécurité en utilisant un langage naturel.

<div class="alert alert-info">Cette page couvre le <code>security</code> ensemble d'outils du serveur Datadog MCP distant. Pour le Code Security MCP Server, qui fonctionne localement et analyse le code source pendant le développement, consultez <a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP Server</a>.</div>

### Cas d'utilisation {#use-cases}

Vous pouvez utiliser l'ensemble `security`d'outils pour :

- **Analyser et comprendre les signaux de sécurité** : Demandez à votre agent d'IA de faire remonter les signaux Cloud SIEM récents de haute sévérité, les alertes App & API Protection, ou les menaces Workload Protection, et obtenez un résumé des patterns et des ressources affectées.
- **Trier les signaux de sécurité** : Mettez à jour l'état de triage ou l'assigné sur un ensemble de signaux correspondants en masse.
- **Analyser votre posture de sécurité** : Interrogez les résultats de la sécurité Cloud avec SQL pour comprendre la répartition des erreurs de configuration, des vulnérabilités et des risques d'identité dans votre environnement.
- **Examinez des résultats spécifiques** : Récupérez les détails complets d'un ensemble de résultats pour comprendre l'étendue, les ressources affectées et le contexte de remédiation.
- **Triage des résultats de sécurité** : Créez des issues Jira, des tickets ServiceNow ou des cas de Case Management pour les résultats. Assignez les résultats aux membres de l'équipe, ou mettez en sourdine les faux positifs et les risques acceptés.
- **Corréler les signaux et les résultats** : Faites un croisement des signaux de sécurité actifs avec les résultats ouverts pour déterminer si une alerte est liée à un problème de posture connu.
- **Inspectez et gérez les règles de détection** : Listez et récupérez les définitions des règles de détection pour comprendre quelle logique génère des signaux.
- **Gérez les suppressions** : Créez, mettez à jour et supprimez des suppressions pour réduire le bruit des règles dans des conditions spécifiques sans les désactiver complètement.
- **Remédiez aux vulnérabilités avec un agent IA** : Extrayez les résultats de vulnérabilité de la bibliothèque, y compris l'emplacement du code et les conseils de remédiation, et transmettez-les à votre agent IA pour appliquer des correctifs directement dans votre code.

## Démarrage rapide {#quickstart}

L'ensemble `security`d'outils n'est pas activé par défaut. Vous pouvez l'activer en ajoutant un paramètre à votre URL, ce qui permet aux outils de sécurité d'interagir avec votre client d'IA.

1. [Configurez le serveur Datadog MCP][4].
2. Lors de la connexion au serveur Datadog MCP, ajoutez `security` au paramètre `toolsets`. Par exemple, pour votre [site Datadog][3] ({{< region-param key="dd_site_name" >}}), utilisez :
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

[1]: /fr/mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /fr/getting_started/site/
[4]: /fr/mcp_server/setup/