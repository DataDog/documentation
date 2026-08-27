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
description: セキュリティシグナルを調査し、Datadog MCP サーバーのセキュリティツールセットを用いてセキュリティ所見を分析するには、AI エージェントを使用します。
further_reading:
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP サーバーを設定する
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP サーバーの概要
- link: security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: ドキュメント
  text: IoC エクスプローラー
- link: security/threats/security_signals/
  tag: ドキュメント
  text: セキュリティシグナル
- link: security/guide/findings-schema/?tab=library_vulnerability
  tag: ドキュメント
  text: セキュリティ所見
- link: security/detection_rules/
  tag: ドキュメント
  text: 検出ルール
- link: security/suppressions/
  tag: ドキュメント
  text: 抑制
title: セキュリティ MCP ツール
---
## 概要 {#overview}

[Datadog MCP サーバー][1] は、AI エージェントが [Model Context Protocol (MCP)][2] を通じてセキュリティデータをクエリできるようにします。`security`ツールセットは、Cursor、Claude Code、OpenAI Codex などの AI クライアントに、セキュリティシグナルとセキュリティ所見へのアクセスを提供するので、自然言語を使用して脅威を調査し、セキュリティポスチャを分析できます。

<div class="alert alert-info">このページでは、リモート Datadog MCP サーバーの <code>security</code> ツールセットを説明します。ローカルで実行され、開発中にソースコードをスキャンする Code Security MCP サーバーについては、<a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP サーバー</a>を参照してください。</div>

### ユースケース {#use-cases}

`security` ツールセットを使用して、次のことができます。

- **セキュリティシグナルを分析し理解する**: AI エージェントに、最近の重大度の高い Cloud SIEM シグナル、App & API Protection アラート、または Workload Protection の脅威を表示してもらい、パターンと影響を受けるリソースの概要を取得します。
- **セキュリティシグナルをトリアージする**: 一致するシグナルのセット全体でトリアージ状態や担当者を一括更新します。
- **セキュリティポスチャを分析する**: Cloud Security と SQL 全体の所見をクエリし、環境全体の誤設定、脆弱性、アイデンティティリスクの分布を理解します。
- **特定のセキュリティ所見を調査する**: 所見のセットの詳細を取得し、スコープ、影響を受けるリソース、および修正のコンテキストを理解します。
- **セキュリティ所見をトリアージする**: 所見に対して Jira の問題、ServiceNow のチケット、または Case Management のケースを作成します。所見をチームメンバーに割り当てたり、誤検出や受け入れられたリスクをミュートしたりできます。
- **シグナルと所見を相関させる**: アクティブなセキュリティシグナルとオープンな所見を相互参照し、アラートが既知のポスチャ問題に関連しているかどうかを判断します。
- **検知ルールの調査と管理**: 検知ルールを一覧表示、取得、作成、更新、削除して、シグナルを生成するロジックを把握および管理します。
- **抑制を管理する**: 抑制を作成、更新、削除して、特定の条件でノイズの多いルールを完全に無効にすることなく、サイレントにします。
- **App & API Protection で攻撃に対応**: デナイリスト上の IP、ユーザー、ユーザーエージェントのブロックまたはブロック解除、パスリスト除外フィルターによる誤検知の抑制、特定のサービスまたはエンドポイントを保護するためのカスタム WAF ルールの作成、更新、削除を行います。
- **AI エージェントで脆弱性を修正する**: ライブラリの脆弱性所見 (コードの場所や修正ガイダンスを含む) を取得し、それらを AI エージェントに渡して、コードベースに直接パッチを適用します。
- **侵害指標 (IoCs) の調査**: 脅威インテリジェンスフィードと照合された IP アドレス、ドメイン、URL、ファイルハッシュを検索および取得します。個々の指標を確認し、トリアージ状態を更新します。

## クイックスタート{#quickstart}

`security` ツールセットはデフォルトで有効になっていません。URL にパラメータを追加することで有効にすることができ、セキュリティツールが AI クライアントと対話できるようになります。

1. [Datadog MCP サーバーのセットアップ][4]。
2. Datadog MCP サーバーに接続する際は、`security` を `toolsets` パラメータに追加してください。たとえば、あなたの [Datadog サイト][3] ({{< region-param key="dd_site_name" >}}) の場合、次を使用します。
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

## Further reading 

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /ja/getting_started/site/
[4]: /ja/mcp_server/setup/
[5]: /ja/security/cloud_siem/triage_and_investigate/ioc_explorer/