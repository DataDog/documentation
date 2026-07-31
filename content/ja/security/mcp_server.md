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
description: セキュリティシグナルを調査し、Datadog MCP サーバーのセキュリティツールセットを用いてセキュリティ所見を分析するには、AI エージェントを使用します。
further_reading:
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP サーバーのセットアップ
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP サーバーの概要
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

[Datadog MCP サーバー][1]は、AI エージェントが[Model Context Protocol (MCP)][2] を通じてセキュリティデータをクエリできるようにします。`security`ツールセットは、Cursor、Claude Code、OpenAI Codex などのAIクライアントに、セキュリティシグナルとセキュリティ所見へのアクセスを提供するので、自然言語を使用して脅威を調査し、セキュリティポスチャを分析できます。

<div class="alert alert-info">このページでは、リモート Datadog MCP サーバーの <code>security</code> ツールセットを説明します。ローカルで実行され、開発中にソースコードをスキャンする Code Security MCP サーバーについては、<a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP サーバー</a>を参照してください。</div>

### ユースケース {#use-cases}

`security` ツールセットを使用して、次のことができます。

- **セキュリティシグナルを分析し理解する**: AI エージェントに、最近の重大度の高い Cloud SIEM シグナル、App & API Protection アラート、または Workload Protection の脅威を表示してもらい、パターンと影響を受けるリソースの概要を取得します。
- **セキュリティシグナルをトリアージする**: 一致するシグナルのセット全体でトリアージ状態や担当者を一括更新します。
- **セキュリティポスチャを分析する**: Cloud Security と SQL 全体の所見をクエリし、環境全体の誤設定、脆弱性、アイデンティティリスクの分布を理解します。
- **特定のセキュリティ所見を調査する**: 所見のセットの詳細を取得し、スコープ、影響を受けるリソース、および修正のコンテキストを理解します。
- **セキュリティ所見をトリアージする**: 所見に対して Jira の問題、ServiceNow のチケット、または Case Management のケースを作成します。所見をチームメンバーに割り当てたり、誤検出や受け入れられたリスクをミュートしたりできます。
- **シグナルと所見を相関させる**: アクティブなセキュリティシグナルとオープンな所見を相互参照し、アラートが既知のポスチャ問題に関連しているかどうかを判断します。
- **検出ルールを検査および管理する**: シグナルを生成しているロジックを理解するために、検出ルールの定義をリストおよび取得します。
- **抑制を管理する**: 抑制を作成、更新、削除して、特定の条件でノイズの多いルールを完全に無効にすることなく、サイレントにします。
- **AI エージェントで脆弱性を修正する**: ライブラリの脆弱性所見 (コードの場所や修正ガイダンスを含む) を取得し、それらを AI エージェントに渡して、コードベースに直接パッチを適用します。

## クイックスタート{#quickstart}

`security` ツールセットはデフォルトで有効になっていません。URL にパラメータを追加することで有効にすることができ、セキュリティツールが AI クライアントと対話できるようになります。

1. [Datadog MCP サーバーのセットアップ][4]。
2. Datadog MCP サーバーに接続する際は、`security` を `toolsets` パラメータに追加してください。例えば、あなたの [Datadog サイト][3] ({{< region-param key="dd_site_name" >}}) の場合、次を使用します。
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

[1]: /ja/mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /ja/getting_started/site/
[4]: /ja/mcp_server/setup/