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
  - ioc
  - ioc explorer
  - indicators of compromise
description: Utilisez des agents IA pour enquêter sur les signaux de sécurité et analyser
  les résultats de sécurité avec la suite d'outils de sécurité du Datadog MCP Server.
further_reading:
- link: mcp_server/setup
  tag: Documentation
  text: Configurer Datadog MCP Server
- link: mcp_server
  tag: Documentation
  text: Présentation de Datadog MCP Server
- link: security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: Documentation
  text: IoC Explorer
- link: security/threats/security_signals/
  tag: Documentation
  text: Signaux de sécurité
- link: security/guide/findings-schema/?tab=library_vulnerability
  tag: Documentation
  text: Résultats de sécurité
- link: security/detection_rules/
  tag: Documentation
  text: Règles de détection
- link: security/suppressions/
  tag: Documentation
  text: Suppressions
title: Outils Security MCP
---
## Présentation {#overview}

Le [Datadog MCP Server][1] permet aux agents IA d'interroger vos données de sécurité via le [Model Context Protocol (MCP)][2]. La suite d'outils `security` donne aux clients IA comme Cursor, Claude Code et OpenAI Codex accès à vos signaux et résultats de sécurité, afin que vous puissiez enquêter sur les menaces et analyser votre posture de sécurité en utilisant le langage naturel.

<div class="alert alert-info">Cette page couvre la <code>security</code> suite d'outils du [Datadog MCP Server] distant. Pour le [Code Security MCP Server], qui s'exécute localement et analyse le code source pendant le développement, consultez <a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP Server</a>.</div>

### Cas d'utilisation {#use-cases}

Vous pouvez utiliser la suite d'outils `security` pour :

- **Analyser et comprendre les signaux de sécurité** : Demandez à votre agent IA de faire ressortir les signaux récents de haute gravité de Cloud SIEM, les alertes de App & API Protection, ou les menaces de Workload Protection, et obtenez un résumé des modèles et des ressources affectées.
- **Trier les signaux de sécurité** : Mettez à jour en masse l'état de tri ou le responsable pour un ensemble de signaux correspondants.
- **Analyser votre posture de sécurité** : Interrogez les résultats dans Cloud Security avec SQL pour comprendre la répartition des erreurs de configuration, des vulnérabilités et des risques liés aux identités dans votre environnement.
- **Enquêter sur des résultats spécifiques** : Récupérez les détails complets d'un ensemble de résultats pour comprendre le périmètre, les ressources affectées et le contexte de remédiation.
- **Trier les résultats de sécurité** : Créez des tickets Jira, des tickets ServiceNow ou des cas Case Management pour les résultats. Assignez des résultats aux membres de l'équipe, ou mettez en sourdine les faux positifs et les risques acceptés.
- **Corréler les signaux et les résultats** : Croisez les signaux de sécurité actifs avec les résultats ouverts pour déterminer si une alerte est liée à un problème de posture connu.
- **Inspecter et gérer les règles de détection** : Listez, récupérez, créez, mettez à jour et supprimez des règles de détection pour comprendre et gérer la logique générant les signaux.
- **Gérer les suppressions** : Créez, mettez à jour et supprimez des suppressions pour mettre en sourdine les règles bruyantes dans des conditions spécifiques sans les désactiver complètement.
- **Répondre aux attaques avec App & API Protection** : Bloquez ou débloquez des adresses IP, des utilisateurs et des user agents sur la liste de refus (denylist) ; mettez en sourdine les faux positifs avec des filtres d'exclusion par liste d'autorisation (passlist) ; et créez, mettez à jour ou supprimez des règles WAF personnalisées pour protéger un service ou un endpoint spécifique.
- **Remédier aux vulnérabilités avec un agent IA** : Récupérez les résultats de vulnérabilité des bibliothèques, y compris l'emplacement du code et les conseils de remédiation, et transmettez-les à votre agent IA pour appliquer les correctifs directement dans votre base de code.
- **Étudiez les indicateurs de compromission (IoC)** : Recherchez et récupérez les adresses IP, les domaines, les URL et les hachages de fichiers correspondants aux flux de renseignements sur les menaces. Examinez les indicateurs individuels et mettez à jour leur état de triage.
- **Créez des règles personnalisées IaC** : Générer, valider et publier des règles personnalisées d'Infrastructure as Code basées sur Rego à partir d'une description en langage naturel.

## Démarrage rapide {#quickstart}

L'ensemble d'outils `security` n'est pas activé par défaut. Vous pouvez l'activer en ajoutant un paramètre à votre URL, ce qui permet aux outils de sécurité d'interagir avec votre client IA.

1. [Set up the Datadog MCP Server][4].
2. Lors de la connexion au [Datadog MCP Server], ajoutez `security` au paramètre `toolsets`. Par exemple, pour votre [Datadog site][3] ({{< region-param key="dd_site_name" >}}), utilisez :
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

### IoC Explorer 

`search_datadog_security_ioc_indicators`
: Lists [IoC Explorer][5] indicators (IP addresses, domains, URLs, and file hashes) matched against threat intelligence feeds. Use this to surface and investigate indicators of compromise in your environment.
: *Permissions required: `Security Signals Read`*

`get_datadog_security_ioc_indicator`
: Retrieves full details for a single [IoC Explorer][5] indicator by value, including score, category, Autonomous System (AS) information, GeoIP data, log sources, and signal counts.
: *Permissions required: `Security Signals Read`*

`get_datadog_security_ioc_schema`
: Returns available filterable fields and their values for [IoC Explorer][5]. Omit `filter` to list available fields; supply `filter` to get values with counts. Use `query` to scope results to a subset of indicators.
: *Permissions required: `Security Signals Read`*

`update_datadog_security_ioc_indicator_triage`
: Sets the triage state of an [IoC Explorer][5] indicator to mark it as reviewed or not reviewed.
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
: Returns ranked project suggestions for ticketing security findings. Shows available Case Management, Jira, Linear, and ServiceNow projects with usage data. Call this before `create_datadog_security_findings_ticket` to discover which project to use.
: *Permissions required: `Security Monitoring Findings Read`, `Cases Read`*

`create_datadog_security_findings_ticket`
: Creates a Case Management case, Jira issue, Linear issue, or ServiceNow ticket for security findings. Requires specific finding IDs and a project ID. Use `get_datadog_security_findings_ticket_suggestions` first to discover available projects.
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

`list_datadog_security_findings_automation_rules`
: Lists security findings automation rules of a given type (`mute`, `due_date`, `ticket_creation`, or `severity_modifier`).
: *Permissions required: `Security Pipelines Read`*

`create_datadog_security_findings_automation_rule`
: Creates a security findings automation rule. Choose a `rule_type`: `mute` (suppress findings), `due_date` (set remediation deadlines), `severity_modifier` (adjust finding severity), or `ticket_creation` (auto-create Jira or Case Management tickets).
: *Permissions required: `Security Pipelines Write`, `Security Monitoring Findings Read`*

`update_datadog_security_findings_automation_rule`
: Updates an existing automation rule. Supports partial updates, so only the provided fields are changed. Use it to enable or disable rules, rename them, adjust filters, or change action parameters.
: *Permissions required: `Security Pipelines Write`*

`delete_datadog_security_findings_automation_rule`
: Permanently deletes a security findings automation rule by ID.
: *Permissions required: `Security Pipelines Write`*

`reorder_datadog_security_findings_automation_rules`
: Moves an automation rule up or down in the list. Rules are applied in order, so a rule's position sets its priority.
: *Permissions required: `Security Pipelines Write`*

### Detection Rules 

`get_datadog_security_detection_rules_schema`
: Returns the authoring reference and schema for detection rules. Covers supported rule types, detection methods, query syntax, tag conventions, and field names that can be used as search facets. Use this before authoring or querying detection rules. Currently supported rule types: log detection and API security.
: *Permissions required: `Security Monitoring Rules Read`*

`get_datadog_security_detection_rules`
: Retrieves security detection rules. Supports two modes: provide `rule_id` to get the full definition of a single rule by ID, or omit `rule_id` to list rules (optionally filtered with `query` and token-limited with `max_tokens`). The two modes are mutually exclusive.
: *Permissions required: `Security Monitoring Rules Read`*

`create_datadog_security_detection_rule`
: Creates a new detection rule. Call `get_datadog_security_detection_rules_schema` first to fetch the required payload grammar, then supply a complete rule payload. On success, returns the full rule including its server-assigned ID.
: *Permissions required: `Security Monitoring Rules Write`*

`update_datadog_security_detection_rule`
: Updates an existing custom detection rule by replacing it entirely. Use this to enable or disable a rule, change thresholds, add cases, and more. Call `get_datadog_security_detection_rules` first to fetch the current rule body, modify the fields you need to change, and submit the full updated object. Cannot update Datadog-shipped default rules. On success, returns the full updated rule.
: *Permissions required: `Security Monitoring Rules Write`*

`delete_datadog_security_detection_rules`
: Deletes one or more custom detection rules by ID. Only custom (non-default) rules can be deleted. Each rule is authorized individually; rules that cannot be deleted appear in `failed_rules` without aborting the batch. Returns `deleted_rules` and `failed_rules`.
: *Permissions required: `Security Monitoring Rules Write`*

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

### App & API Protection 

`get_datadog_security_trace_passlist`
: Returns all WAF exclusion filter (passlist) entries for the organization to review existing suppressions.
: *Permissions required: `Application Security Management Protect Read`*

`upsert_datadog_security_trace_passlist`
: Creates or updates a WAF exclusion filter (passlist) entry to suppress noisy rules on a specific service or endpoint.
: *Permissions required: `Application Security Management Protect Write`*

`delete_datadog_security_trace_passlist`
: Deletes an existing WAF exclusion filter (passlist) entry.
: *Permissions required: `Application Security Management Protect Write`*

`get_datadog_security_aap_denylist`
: Lists blocked IPs, users, and user agents (denylist entries), with optional filtering.
: *Permissions required: `Application Security Management Protect Read`*

`upsert_datadog_security_aap_denylist`
: Adds or updates a denylist block for an IP, user, or user agent with an expiration.
: *Permissions required: `Application Security Management Protect Write`*

`unblock_datadog_security_aap_denylist`
: Unblocks a previously denylisted entity by setting its expiration in the past.
: *Permissions required: `Application Security Management Protect Write`*

`get_datadog_security_aap_custom_rules`
: Retrieves one App & API Protection (AAP) custom WAF rule by ID or lists custom rules. Supports filtering by category, status, service, and environment.
: *Permissions required: `Application Security Management Protect Read`*

`upsert_datadog_security_aap_custom_rule`
: Creates or updates an AAP custom WAF rule in the attack attempt or business logic category. New rules cannot block traffic: create the rule in monitoring mode, then update it to blocking mode after confirming its matches.
: *Permissions required: `Application Security Management Protect Write`*

`delete_datadog_security_aap_custom_rule`
: Permanently deletes an AAP custom WAF rule by ID.
: *Permissions required: `Application Security Management Protect Write`*

`get_datadog_security_aap_blocking_config`
: Retrieves the organization-wide AAP blocking and denylist enforcement settings.
: *Permissions required: `Application Security Management Protect Read`*

### Infrastructure as Code custom rules 

`get_datadog_security_iac_custom_rules`
: Retrieves one Infrastructure as Code (IaC) [custom rule][6] by ID or lists the custom rules in your organization. Supports filtering by platform, provider, published state, or a text query. Listing returns the full custom ruleset without pagination.
: *Permissions required: `Vulnerability Management Read`*

`get_datadog_security_iac_custom_rules_schema`
: Returns the schema for IaC custom rules: allowed platforms, categories, severities, the rule ID format, and the fields each write tool accepts. Call this tool before generating, validating, or creating a rule.
: *Permissions required: `Vulnerability Management Read`*

`generate_datadog_security_iac_custom_rule`
: Generates a Rego IaC custom rule from a natural-language description and validates it with the scanner. Does not save the rule.
: *Permissions required: `Vulnerability Management Write`*

`validate_datadog_security_iac_custom_rule`
: Checks that the Rego for an IaC custom rule compiles. When a sample file is provided, also evaluates the rule against it and requires at least one finding. Does not save the rule.
: *Permissions required: `Vulnerability Management Write`*

`create_datadog_security_iac_custom_rule`
: Creates a draft IaC custom rule. Rules are always created unpublished. To activate a rule for scans, publish it with `publish_datadog_security_iac_custom_rule`.
: *Permissions required: `Vulnerability Management Write`*

`update_datadog_security_iac_custom_rule`
: Creates a new revision of a draft or published IaC custom rule. Omitted fields keep their current values, including the published state. Can also publish or unpublish the rule.
: *Permissions required: `Vulnerability Management Read` and `Vulnerability Management Write`*

`publish_datadog_security_iac_custom_rule`
: Publishes a draft IaC custom rule so it becomes active for scans. To unpublish it later, use `update_datadog_security_iac_custom_rule`.
: *Permissions required: `Vulnerability Management Read` and `Vulnerability Management Write`*

`delete_datadog_security_iac_custom_rule`
: Permanently deletes an IaC custom rule by ID. This action cannot be undone.
: *Permissions required: `Vulnerability Management Write`*

## Further reading 

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /fr/getting_started/site/
[4]: /fr/mcp_server/setup/
[5]: /fr/security/cloud_siem/triage_and_investigate/ioc_explorer/
[6]: /fr/security/code_security/iac_security/custom_rules/