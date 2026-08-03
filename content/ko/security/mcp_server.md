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
description: Datadog MCP 서버의 보안 도구 세트를 활용해 AI 에이전트로 보안 신호를 조사하고 보안 탐지 결과를 분석하세요.
further_reading:
- link: mcp_server/setup
  tag: 설명서
  text: Datadog MCP 서버 설정
- link: mcp_server
  tag: 설명서
  text: Datadog MCP 서버 개요
- link: security/threats/security_signals/
  tag: 설명서
  text: 보안 시그널
- link: security/guide/findings-schema/?tab=library_vulnerability
  tag: 설명서
  text: 보안 결과
- link: security/detection_rules/
  tag: 설명서
  text: 탐지 규칙
- link: security/suppressions/
  tag: 설명서
  text: 억제
title: 보안 MCP 도구
---
## 개요 {#overview}

[Datadog MCP 서버][1]를 사용하면 AI 에이전트가 [Model Context Protocol(MCP)][2]을 통해 보안 데이터를 쿼리할 수 있습니다. `security` 도구 세트는 Cursor, Claude Code 및 OpenAI Codex와 같은 AI 클라이언트가 보안 신호 및 탐지 결과에 접근할 수 있도록 하여 자연어를 사용해 위협을 조사하고 보안 태세를 분석할 수 있게 합니다.

<div class="alert alert-info">이 페이지에서는 원격 Datadog MCP 서버의 <code>security</code> 도구 세트를 설명합니다. 로컬에서 실행되고 개발 환경에서 소스 코드를 스캔하는 Code Security MCP 서버에 대해서는 <a href="/security/code_security/dev_tool_int/mcp_server/">Code Security MCP 서버</a>를 참조하세요.</div>

### 사용 사례 {#use-cases}

`security` 도구 세트를 사용하여 다음을 수행할 수 있습니다.

- **보안 신호 분석 및 이해하기**: AI 에이전트에게 최근 심각도가 높은 Cloud SIEM 신호, App and API Protection 경보 또는 Workload Protection 위협을 노출하도록 요청하고, 패턴 및 영향을 받는 리소스에 대한 요약을 받으세요.
- **보안 신호 분류하기**: 일치하는 신호 집합에서 분류 상태 또는 담당자를 한 번에 업데이트합니다.
- **보안 태세 분석하기**: SQL을 사용하여 Cloud Security 전반의 탐지 결과를 쿼리하여 잘못된 구성, 취약점 및 ID 위험이 어떻게 분포되어 있는지 이해합니다.
- **특정 탐지 결과 조사하기**: 범위, 영향을 받는 리소스 및 해결 관련 정보를 이해하기 위해 탐지 결과의 전체 세부 정보를 검색합니다.
- **보안 결과 분류하기**: 탐지 결과에 대한 Jira 문제, ServiceNow 티켓 또는 Case Management 케이스를 생성합니다. 탐지 결과를 팀원에게 할당하거나 오탐 및 허용된 위험에 대한 알림을 해제합니다.
- **신호와 탐지 결과의 상관관계 분석하기**: 활성 보안 신호와 미해결 탐지 결과를 교차 분석하여, 경고가 알려진 보안 태세 문제와 관련이 있는지 확인합니다.
- **탐지 규칙 검사 및 관리하기**: 신호를 생성하는 논리를 이해하기 위해 탐지 규칙 정의를 나열하고 검색합니다.
- **억제 관리하기**: 억제를 생성, 업데이트 및 삭제하여 규칙 전체를 비활성화하지 않고도 특정 조건에서 과도하게 발생하는 규칙을 일시적으로 무시할 수 있습니다.
- **AI 에이전트를 사용하여 취약점 해결하기**: 코드 위치 및 수정 지침을 포함한 라이브러리 취약점 탐지 결과를 가져오고 이를 AI 에이전트에 전달하여 코드베이스에서 직접 패치를 적용합니다.

## 빠른 시작{#quickstart}

기본적으로 `security` 도구 세트는 활성화되어 있지 않습니다. URL에 파라미터를 추가하여 보안 도구가 AI 클라이언트와 상호작용할 수 있도록 활성화할 수 있습니다.

1. [Datadog MCP 서버를 설정합니다][4].
2. Datadog MCP 서버에 연결할 때`security`를 `toolsets` 파라미터에 추가하세요. 예를 들어 [Datadog 사이트][3]({{< region-param key="dd_site_name" >}})에는 다음을 사용하세요.
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

[1]: /ko/mcp_server/
[2]: https://modelcontextprotocol.io/
[3]: /ko/getting_started/site/
[4]: /ko/mcp_server/setup/