---
title: Datadog MCP Server
description: "Connect AI agents to Datadog observability data using the MCP Server to query metrics, logs, traces, and other insights."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Connect your AI agents to Datadog tools and context using the Datadog MCP Server"
- link: "ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "https://www.datadoghq.com/blog/datadog-cursor-extension/"
  tag: "Blog"
  text: "Debug live production issues with the Datadog Cursor extension"
- link: "https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/"
  tag: "Blog"
  text: "Datadog + OpenAI: Codex CLI integration for AI‑assisted DevOps"
algolia:
  tags: ["mcp", "mcp server", "setup"]
  rank: 90
---

The Datadog MCP Server acts as a bridge between your observability data in Datadog and any AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP Server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

Ready to get started? See [Set Up the Datadog MCP Server][27] for connection instructions.

This demo shows the Datadog MCP Server being used in Cursor and Claude Code (unmute for audio):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Demo of Datadog MCP Server in Cursor and Claude Code" video="true" >}}


## Disclaimers

- The Datadog MCP Server is HIPAA-eligible. You are responsible for ensuring that the AI tools you connect to the Datadog MCP Server meet your compliance requirements, such as HIPAA.
- The Datadog MCP Server has fair-use rate limits in place. For questions or requests, [contact Datadog support][37].
- The Datadog MCP Server is not GovCloud compatible.
- Datadog collects certain information about your usage of the Remote Datadog MCP Server, including how you interact with it, whether errors occurred while using it, what caused those errors, and user identifiers in accordance with the <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog Privacy Policy</a> and Datadog's <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>. This data is used to help improve the server's performance and features, including transitions to and from the server and the applicable Datadog login page for accessing the Services, and context (for example, user prompts) leading to the use of MCP tools. The data is stored for 120 days.

## Monitoring the Datadog MCP Server usage

You can track Datadog MCP Server usage for your organization using Datadog metrics and Audit Trail.

All tool calls are recorded in the Datadog [Audit Trail][16] with metadata identifying them as MCP actions, including the tool name, arguments, user identity, and the MCP client used. See [Track tool calls in Audit Trail](#track-tool-calls-in-audit-trail) for more information.

Datadog also emits two standard metrics that you can use to monitor MCP Server activity:

- `datadog.mcp.session.starts`: Emitted on each session initialization.
- `datadog.mcp.tool.calls`: Emitted on each tool call, tagged with `tool_name`.

Both metrics are tagged with `user_id`, `user_email`, and `client` (the MCP client name, such as `claude` or `cursor`).

## Toolsets


The Datadog MCP Server supports _toolsets_, which allow you to use only the tools you need, saving valuable context window space. These toolsets are available:

- `core`: The default toolset for logs, metrics, traces, dashboards, monitors, incidents, hosts, services, events, and notebooks
- `alerting`: Tools for validating monitors, searching monitor groups, and retrieving monitor templates
- `apm`: Tools for in-depth [APM][28] trace analysis, span search, Watchdog insights, and performance investigation
- `cases`: Tools for [Case Management][38], including creating, searching, and updating cases; managing projects; and linking Jira issues
- `dbm`: Tools for interacting with [Database Monitoring][26]
- `ddsql`: (Preview) Tools for querying Datadog data using [DDSQL][41], a SQL dialect with support for infrastructure resources, logs, metrics, RUM, spans, and other Datadog data sources
- `error-tracking`: Tools for interacting with Datadog [Error Tracking][25]
- `feature-flags`: Tools for managing [feature flags][29], including creating, listing, and updating flags and their environments
- `llmobs`: Tools for searching and analyzing [LLM Observability][30] spans and experiments
- `product-analytics`: Tools for interacting with [Product Analytics][35] queries
- `networks`: Tools for [Cloud Network Monitoring][31] analysis and [Network Device Monitoring][32]
- `onboarding`: Agentic onboarding tools for guided Datadog setup and configuration
- `security`: Tools for code security scanning and searching [security signals][33] and [security findings][34]
- `software-delivery`: Tools for interacting with Software Delivery ([CI Visibility][21] and [Test Optimization][24])
- `synthetics`: Tools for interacting with Datadog [Synthetic tests][20]
- `workflows`: Tools for [Workflow Automation][39], including listing, inspecting, executing, and configuring workflows for agent use

To use a toolset, include the `toolsets` query parameter in the endpoint URL when connecting to the MCP Server ([remote authentication][27] only). Use `toolsets=all` to enable all generally available toolsets at once.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
For example, based on your selected [Datadog site][36] ({{< region-param key="dd_site_name" >}}):

- Retrieve only the core tools (this is the default if `toolsets` is not specified):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Retrieve only Synthetic Testing-related tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Retrieve core, Synthetic Testing, and Software Delivery tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Retrieve all generally available tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Enabling all toolsets increases the number of tool definitions sent to your AI client, which consumes context window space. <code>toolsets=all</code> works best with clients that support tool filtering, such as Claude Code.</div>

[36]: /getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

## Available tools

This section lists the tools available in the Datadog MCP Server and provides example prompts for using them.

<div class="alert alert-info">Datadog MCP Server tools are under significant development and are subject to change. Use <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">this feedback form</a> to share any feedback, use cases, or issues encountered with your prompts and queries.</div>

### `search_datadog_events`
*Toolset: **core***\
Searches events like monitor alerts, deployment notifications, infrastructure changes, security findings, and service status changes.

- Show me all deployment events from the last 24 hours.
- Find events related to our production environment with error status.
- Get events tagged with `service:api` from the past hour.

**Note**: See the [Event Management API][15] for more details.

### `get_datadog_incident`
*Toolset: **core***\
Retrieves detailed information about an incident.

- Get details for incident ABC123.
- What's the status of incident ABC123?
- Retrieve full information about the Redis incident from yesterday.

**Note**: The tool is operational, but does not include incident timeline data.

### `get_datadog_metric`
*Toolset: **core***\
Queries and analyzes historical or real-time metric data, supporting custom queries and aggregations.

- Show me CPU utilization metrics for all hosts in the last 4 hours.
- Get Redis latency metrics for the production environment.
- How much did my cloud costs change from January to February?

### `get_datadog_metric_context`
*Toolset: **core***\
Retrieves detailed information about a metric including metadata, available tags, and tag values for filtering and grouping.

- What tags are available for the `system.cpu.user` metric?
- Show me all possible values for the `env` tag on `redis.info.latency_ms`.
- Get metadata and dimensions for the `requests.count` metric.

### `search_datadog_monitors`
*Toolset: **core***\
Retrieves information about Datadog monitors, including their statuses, thresholds, and alert conditions.

- List all monitors that are currently alerting.
- Show me monitors related to our payment service.
- Find monitors tagged with `team:infrastructure`.

### `get_datadog_trace`
*Toolset: **core***\
Fetches a complete trace from Datadog APM using a trace ID.

- Get the complete trace for ID 7d5d747be160e280504c099d984bcfe0.
- Show me all spans for trace abc123 with timing information.
- Retrieve trace details including database queries for ID xyz789.

**Note**: Large traces with thousands of spans may be truncated (and indicated as such) without a way to retrieve all spans.

### `search_datadog_dashboards`
*Toolset: **core***\
Lists available Datadog dashboards and key details.

- Show me all available dashboards in our account.
- List dashboards related to infrastructure monitoring.
- Find shared dashboards for the engineering team.

**Note**: This tool lists relevant dashboards but provides limited detail about their contents.

### `get_datadog_notebook`
*Toolset: **core***\
Retrieves detailed information about a specific notebook by ID, including name, status, and author.

- Get details for notebook abc-123-def.
- Show me the contents of the debugging notebook from yesterday.

### `search_datadog_notebooks`
*Toolset: **core***\
Lists and searches Datadog notebooks with filtering by author, tags, and content.

- Show me all notebooks created by the platform team.
- Find notebooks related to performance investigation.
- List notebooks tagged with `incident-response`.

### `search_datadog_hosts`
*Toolset: **core***\
Lists and provides information about monitored hosts, supporting filtering and searching.

- Show me all hosts in our production environment.
- List unhealthy hosts that haven't reported in the last hour.
- Get all hosts tagged with `role:database`.

### `search_datadog_incidents`
*Toolset: **core***\
Retrieves a list of Datadog incidents, including their state, severity, and metadata.

- Show me all active incidents by severity.
- List resolved incidents from the past week.
- Find incidents that are customer-impacting.

### `search_datadog_metrics`
*Toolset: **core***\
Lists available metrics, with options for filtering and metadata.

- Show me all available Redis metrics.
- List CPU-related metrics for our infrastructure.
- Find metrics tagged with `service:api`.

### `search_datadog_services`
*Toolset: **core***\
Lists services in Datadog's Software Catalog with details and team information.

- Show me all services in our microservices architecture.
- List services owned by the platform team.
- Find services related to payment processing.

### `search_datadog_service_dependencies`
*Toolset: **core***\
Retrieves service dependencies (upstream/downstream) and services owned by a team.

- Show me all upstream services that call the checkout service.
- What downstream services does the payment API depend on?
- List all services owned by the platform team.

### `search_datadog_spans`
*Toolset: **core***\
Retrieves spans from APM traces with filters such as service, time, resource, and so on.

- Show me spans with errors from the checkout service.
- Find slow database queries in the last 30 minutes.
- Get spans for failed API requests to our payment service.

### `analyze_datadog_logs`
*Toolset: **core***\
Analyze Datadog logs using SQL queries for counting, aggregations, and numerical analysis. Use this for statistical analysis.

- Count error logs by service in the last hour.
- Show me the top 10 HTTP status codes with their counts.
- Which services were logging the most during that time period?

### `search_datadog_logs`
*Toolset: **core***\
Searches logs with filters (time, query, service, host, storage tier, and so on) and returns log details. Renamed from `get_logs`.

- Show me error logs from the nginx service in the last hour.
- Find logs containing 'connection timeout' from our API service.
- Get all 500 status code logs from production.

### `search_datadog_rum_events`
*Toolset: **core***\
Search Datadog RUM events using advanced query syntax.

- Show JavaScript errors and console warnings in RUM.
- Find pages that are loading slowly (more than 3 seconds).
- Show recent user interactions on product detail pages.

### `validate_datadog_monitor`
*Toolset: **alerting***\
Validates a monitor definition for correctness before creating or updating it.

- Validate this monitor definition before I create it.
- Check if my monitor query syntax is correct.

### `get_datadog_monitor_templates`
*Toolset: **alerting***\
Retrieves available monitor templates to help you create monitors.

- Show me the available monitor templates.
- What templates can I use to create a new monitor?

### `search_datadog_monitor_groups`
*Toolset: **alerting***\
Searches monitor groups by name or criteria.

- Show me all monitor groups in an alerting state.
- Find monitor groups related to the checkout service.

### `apm_search_spans`
*Toolset: **apm***\
Searches for spans using APM query syntax, with support for pagination and tag filtering.

- Show me spans with errors from the checkout service in the last hour.
- Find slow database queries taking more than 2 seconds.
- Search for spans with `service:payments` and `status:error`.

### `apm_explore_trace`
*Toolset: **apm***\
Executes queries on trace data for deep analysis and exploration of specific spans within a trace.

- Explore the spans in trace `abc123` and show me the database calls.
- Analyze the error spans in this trace.

### `apm_trace_summary`
*Toolset: **apm***\
Generates an AI-powered summary of a trace, providing high-level analysis of what the trace shows.

- Summarize trace `7d5d747be160e280504c099d984bcfe0`.
- Give me an overview of what happened in this trace.

### `apm_trace_comparison`
*Toolset: **apm***\
Compares two traces to identify performance differences and bottlenecks between a fast trace and a slow trace.

- Compare these two traces to find out why one is slower.
- What changed between this baseline trace and the slow trace?

### `apm_analyze_trace_metrics`
*Toolset: **apm***\
Analyzes APM trace metrics over time for a specific operation, querying metric data and providing AI-generated analysis.

- Analyze latency trends for the `web.request` operation on `service:api` over the last 6 hours.
- Show me error rate metrics for my database service.

### `apm_discover_span_tags`
*Toolset: **apm***\
Discovers available tag keys on spans within a time range.

- What tags are available on spans for `service:checkout`?
- Show me the tag keys I can filter by in APM.

### `apm_get_primary_tag_keys`
*Toolset: **apm***\
Retrieves the primary tag keys configured for the organization.

- What are my organization's primary tag keys?

### `apm_search_watchdog_stories`
*Toolset: **apm***\
Searches for Watchdog anomaly detection stories for a service within a time range, providing AI-powered insights into latency, error rate, and traffic anomalies.

- Show me Watchdog anomalies for the checkout service in the last 24 hours.
- Are there any latency anomalies detected for my API service?

### `apm_get_watchdog_story`
*Toolset: **apm***\
Retrieves detailed information about a specific Watchdog story by its ID.

- Get the details of Watchdog story `abc123`.

### `apm_search_change_stories`
*Toolset: **apm***\
Searches for change stories (deployments, feature flags, and infrastructure changes) for a service within a time range.

- Show me recent deployments and changes for the payments service.
- What infrastructure changes happened around the time of this latency spike?

### `apm_latency_bottleneck_analysis`
*Toolset: **apm***\
Analyzes latency bottlenecks across traces in an anomaly period by calculating self-time.

- What are the latency bottlenecks for the checkout service during this anomaly?
- Identify which spans are contributing the most to latency.

### `apm_latency_tag_analysis`
*Toolset: **apm***\
Compares span tags between an anomaly period and a baseline period to identify what changed.

- Compare tags between the anomaly window and baseline to find what changed.
- What tag values are different during this latency spike?

### `apm_search_recommendations`
*Toolset: **apm***\
Searches for APM recommendations from Datadog.

- Show me APM recommendations for my services.
- Are there any optimization suggestions for my application?

### `apm_get_recommendation`
*Toolset: **apm***\
Retrieves full details of a specific APM recommendation by ID.

- Get the details of recommendation `abc123`.

### `apm_investigation_methodology`
*Toolset: **apm***\
Provides guidance for investigating APM service issues like latency, errors, and performance problems.

- How should I investigate a latency increase in my API service?
- Guide me through debugging an error spike in production.

### `search_datadog_cases`
*Toolset: **cases***\
Searches [Case Management][38] cases with filters including status, priority, project, and assignee. Supports time range filtering and pagination.

- Show me all open cases assigned to me.
- Are there any open P1 cases in the Security Reviews project?
- Show me all cases opened this week related to the payment service.

### `get_datadog_case`
*Toolset: **cases***\
Retrieves detailed information about a specific case by ID or key, including title, status, priority, assignee, and timestamps. Optionally includes timeline activity (comments and status changes) and custom attributes.

- What's the latest update on CASE-1234? Show me the full timeline.
- Who's working on this case and what progress has been made so far?
- Pull up the details and all comments for the database migration case.

### `create_datadog_case`
*Toolset: **cases***\
Creates a new [Case Management][38] case with a title, project, and optional fields like description, priority, and assignee.

- I'm seeing a latency spike on the checkout service. Create a P2 case to track the investigation.
- Open a security review case for the suspicious login activity we found in the logs.

### `update_datadog_case`
*Toolset: **cases***\
Updates an existing case's fields such as status, priority, title, description, assignee, due date, and custom attributes. Only the fields you provide are updated.

- This issue is now customer-impacting. Escalate CASE-1234 to P1.
- Mark the database migration case as resolved.
- Set a due date for end of week on CASE-1234.

### `add_comment_to_datadog_case`
*Toolset: **cases***\
Adds a comment to a case's timeline. Comments support markdown formatting.

- Add a note to the case summarizing what we found in the logs and traces.
- Post an update that the hotfix has been deployed and we're monitoring.
- Document the root cause analysis findings on this case.

### `link_jira_issue_to_datadog_case`
*Toolset: **cases***

- Link the Jira ticket for the infrastructure migration to this case so we can track both together.
- Connect PROJ-456 to the Datadog case so the engineering team has visibility.

### `list_datadog_case_projects`
*Toolset: **cases***\
Lists available [Case Management][38] projects with optional filtering by name or key.

- What projects are available in Case Management?
- Is there a project related to security in Case Management?

### `get_datadog_case_project`
*Toolset: **cases***\
Retrieves details for a specific case project by ID.

- What project is this case part of?

### `search_datadog_users`
*Toolset: **cases***\
Searches for Datadog users by email, name, or handle. Useful for finding the right person to assign a case to.

- Find the Datadog user account for jane.doe@example.com.

### `search_datadog_dbm_plans`
*Toolset: **dbm***\
Searches [Database Monitoring][26] query execution plans, which show how the database engine executes queries, including index usage, join strategies, and cost estimates. Use this to analyze query performance and identify optimization opportunities.

- Show me execution plans for slow queries on `host:db-prod-1` from the last hour.
- Find query plans with `@db.plan.type:explain_analyze` for the production database.
- Get execution plans for queries by `@db.user:app_user` with duration greater than 1 second.

### `search_datadog_dbm_samples`
*Toolset: **dbm***\
Searches [Database Monitoring][26] query samples, which represent individual query executions with performance metrics. Use this to analyze database activity patterns, identify slow queries, and investigate database performance issues.

- Show me query samples with `@duration:>1000000000` (duration greater than 1 second) from `db:mydb`.
- Find slow queries on `host:db-prod-1` filtered by `@db.user:app_user`.
- Get recent query samples for `@db.query_signature:abc123def` and analyze performance patterns.

<div class="alert alert-info">The <code>ddsql</code> toolset is in Preview.</div>

### `ddsql_get_spec`
*Toolset: **ddsql***\
Gets a compact DDSQL capability spec, including supported SQL functions, SQL keywords, and DDSQL-specific differences from standard PostgreSQL. Call this tool before composing queries to understand supported syntax.

- What SQL functions are supported in DDSQL?
- Show me the DDSQL query syntax rules and differences from PostgreSQL.
- What aggregate functions can I use in DDSQL?

### `ddsql_schema_search_tables`
*Toolset: **ddsql***\
Searches DDSQL datasets and returns tables (public data sources and reference tables) and available metrics.

- What tables are available to query in DDSQL?
- Search for DDSQL tables related to Kubernetes.
- Show me the available metrics I can query with DDSQL.

### `ddsql_schema_get_table_columns`
*Toolset: **ddsql***\
Gets static SQL columns for a DDSQL table from schema metadata.

- What columns are available in the `aws.ec2_instance` table?
- Show me the schema for the `k8s.pods` table.

### `ddsql_schema_search_unstructured_fields`
*Toolset: **ddsql***\
Searches and ranks fields for unstructured DDSQL sources, such as logs, RUM, and spans, sorted by frequency. Use this tool for schema discovery on searchable sources before falling back to `ddsql_schema_get_table_columns`.

- What fields are available in DDSQL logs?
- Find fields related to `service` in my RUM data.
- Show me the most common fields in my span data.

### `ddsql_run_query`
*Toolset: **ddsql***\
Runs a DDSQL query and returns results. Supports using SQL syntax to query infrastructure resources, logs, metrics, RUM, spans, and other Datadog data sources. See the [DDSQL Reference][42] for syntax details.

- How many EC2 instances are running in each AWS region?
- Show me the top 10 services by error log count in the last hour.
- Query average CPU usage grouped by host for the past 24 hours.

### `ddsql_create_link`
*Toolset: **ddsql***\
Generates a Datadog UI link to the [DDSQL Editor][41] with a given query pre-populated.

- Generate a DDSQL Editor link for this query.
- Create a shareable link to the DDSQL Editor with my infrastructure query.

### `search_datadog_error_tracking_issues`
*Toolset: **error-tracking***\
Searches Error Tracking Issues across data sources (RUM, Logs, Traces).

- Show me all Error Tracking Issues in the checkout service from the last 24 hours.
- What are the most common errors in my application over the past week?
- Find Error Tracking Issues in the production environment with `service:api`.

### `get_datadog_error_tracking_issue`
*Toolset: **error-tracking***\
Retrieves detailed information about a specific Error Tracking Issue from Datadog.

- Help me solve Error Tracking Issue `550e8400-e29b-41d4-a716-446655440000`.
- What is the impact of Error Tracking Issue `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`?
- Create a test case to reproduce Error Tracking Issue `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`.

### `list_datadog_feature_flags`
*Toolset: **feature-flags***\
Lists feature flags with pagination support.

- Show me all feature flags in my organization.
- List feature flags for the checkout service.

### `get_datadog_feature_flag`
*Toolset: **feature-flags***\
Retrieves details about a specific feature flag.

- Get details for the `dark-mode-enabled` feature flag.
- What are the current settings for flag `new-checkout-flow`?

### `create_datadog_feature_flag`
*Toolset: **feature-flags***\
Creates a new feature flag.

- Create a feature flag called `enable-new-dashboard` for gradual rollout.
- Set up a new boolean feature flag for the beta feature.

### `list_datadog_feature_flag_environments`
*Toolset: **feature-flags***\
Lists environments configured for feature flags.

- Show me the available feature flag environments.
- What environments can I target with feature flags?

### `list_datadog_feature_flag_allocations`
*Toolset: **feature-flags***\
Lists allocations for a feature flag in a specific environment.

- Show me the allocation rules for flag `new-checkout-flow` in production.

### `update_datadog_feature_flag_environment`
*Toolset: **feature-flags***\
Updates a feature flag configuration in a specific environment.

- Enable the `dark-mode` flag in the staging environment.
- Roll out flag `new-checkout-flow` to 50% of users in production.

### `check_datadog_flag_implementation`
*Toolset: **feature-flags***\
Checks if a feature flag is implemented in code.

- Verify that the `enable-new-dashboard` flag is implemented in my codebase.

### `sync_datadog_feature_flag_allocations`
*Toolset: **feature-flags***\
Syncs feature flag allocations for a specific environment.

- Sync the allocations for flag `new-checkout-flow` in production.

### `analyze_cloud_network_monitoring`
*Toolset: **networks***\
Investigates network-level issues using [Cloud Network Monitoring][31] data, analyzing network flow data to detect anomalies like elevated retransmission rates.

- Analyze network traffic between my web servers and the database cluster.
- Are there any retransmission issues between `service:api` and `service:payments`?
- Investigate network flow data for anomalies in the production environment.

### `search_ndm_devices`
*Toolset: **networks***\
Searches network devices (routers, switches, firewalls) monitored by Datadog [Network Device Monitoring][32].

- Show me all network devices in the `us-east-1` datacenter.
- Find firewalls that are reporting errors.
- List all monitored switches and their statuses.

### `get_ndm_device`
*Toolset: **networks***\
Retrieves detailed information about a specific network device by its device ID.

- Get details for network device `device:abc123`.
- Show me the configuration and status of this router.

### `search_ndm_interfaces`
*Toolset: **networks***\
Retrieves all network interfaces for a specific device.

- Show me all interfaces on device `device:abc123`.
- List the interface statuses for my core router.

### `browser_onboarding`
*Toolset: **onboarding***\
Guides you through onboarding Browser RUM to Datadog.

- Help me set up Browser RUM monitoring for my web application.

### `devices_onboarding`
*Toolset: **onboarding***\
Guides you through onboarding devices to Datadog monitoring.

- Help me set up device monitoring in Datadog.

### `kubernetes_onboarding`
*Toolset: **onboarding***\
Guides you through onboarding Kubernetes clusters to Datadog.

- Help me set up Datadog monitoring for my Kubernetes cluster.

### `llm_observability_onboarding `
*Toolset: **onboarding***\
Guides you through onboarding LLM Observability in Datadog.

- Help me set up LLM Observability for my AI application.

### `test_optimization_onboarding`
*Toolset: **onboarding***\
Guides you through onboarding Test Optimization in Datadog.

- Help me set up Test Optimization for my CI pipeline.

### `serverless_onboarding`
*Toolset: **onboarding***\
Guides you through onboarding serverless applications to Datadog.

- Help me monitor my AWS Lambda functions with Datadog.

### `source_map_uploads `
*Toolset: **onboarding***\
Guides you through uploading source maps for RUM error mapping.

- Help me upload source maps so my RUM errors show original source code.

### `datadog_secrets_scan`
*Toolset: **security***\
Scans code for hardcoded secrets and credentials, detecting AWS keys, API keys, passwords, tokens, private keys, and database credentials.

- Scan my code for hardcoded secrets.
- Check if there are any API keys or passwords committed in this file.

### `search_datadog_security_signals`
*Toolset: **security***\
Searches and retrieves security signals from Datadog Security Monitoring, including Cloud SIEM signals, App & API Protection signals, and Workload Protection signals.

- Show me security signals from the last 24 hours.
- Find high-severity security signals related to my production environment.
- List Cloud SIEM signals triggered by suspicious login attempts.

### `security_findings_schema`
*Toolset: **security***\
Returns the schema (available fields and their types) for security findings. Call this first before using `analyze_security_findings` to discover queryable fields. Supports filtering by finding type and controlling response size.

- What fields are available for security findings?
- Show me the schema for library vulnerability findings.
- Get the full schema including descriptions for misconfiguration findings.

### `analyze_security_findings`
*Toolset: **security***\
Primary tool for analyzing security findings using SQL queries. Queries live data from the last 24 hours with flexible SQL aggregations, filtering, and grouping. Call `security_findings_schema` first to discover available fields, then use this tool to query.

- Show me the top 10 rules with the most critical findings.
- Count open findings grouped by severity and finding type.
- Find library vulnerabilities with exploits available, grouped by resource.

### `search_security_findings`
*Toolset: **security***\
Fallback tool for retrieving full security finding details. Prefer `analyze_security_findings` for most analysis tasks. Use this tool only when you need complete finding objects or when SQL queries are insufficient.

- Get full details for critical findings in my AWS environment.
- Retrieve complete finding objects for a specific rule.
- List all open identity risk findings with full metadata.

### `search_datadog_ci_pipeline_events`
*Toolset: **software-delivery***\
Searches CI events with filters and returns details on them.

- Show me all the pipelines for my commit `58b1488`.
- Show me the latest pipeline failure in branch `my-branch`.
- Propose a fix for the job `integration-test` that fails every time on my branch `my-branch`.

### `aggregate_datadog_ci_pipeline_events`
*Toolset: **software-delivery***\
Aggregates CI pipeline events to produce statistics, metrics, and grouped analytics.

- What's the average job duration for the last 7 days?
- How many failed pipelines have there been in the last 2 weeks?
- Show me the 95th percentile of pipeline duration grouped by pipeline name.

### `get_datadog_flaky_tests`
*Toolset: **software-delivery***\
Searches Datadog [Test Optimization][24] for flaky tests and returns triage details (failure rate, category, owners, history, CI impact), with pagination and sorting.

- Find active flaky tests for the checkout service owned by `@team-abc`, sorted by failure rate.
- Show flaky tests on branch `main` for repo `github.com/org/repo`, most recent first.
- List flaky tests in the `timeout` category with high failure rate (50%+) so I can prioritize fixes.

### `aggregate_datadog_test_events`
*Toolset: **software-delivery***\
Aggregates Datadog Test Optimization events to quantify reliability and performance trends with aggregation functions, optional metrics, group-by facets, and configurable test levels.

- Count the number of failed tests over the last week, grouped by branch.
- Show me the 95th-percentile duration for each test suite to identify the slowest ones.
- Count all passing and failing tests, grouped by code owners.

### `search_datadog_test_events`
*Toolset: **software-delivery***\
Searches [Test Optimization][24] test events with filters and returns details on them.

- Show me failed tests on branch `main` from the last 24 hours.
- Get test executions for commit `abc123` to see what passed and failed.
- Show me all flaky test runs for the checkout service.
- Find tests owned by `@team-name` that are failing.

### `get_datadog_code_coverage_branch_summary`
*Toolset: **software-delivery***\
Fetches aggregated code coverage summary metrics for a repository branch, including total coverage, patch coverage, and service/codeowner breakdowns.

- What's the code coverage on the `main` branch for `github.com/my-org/my-repo`?
- Show me the coverage summary for the `release/1.x` branch of `github.com/my-org/my-repo`.

### `get_datadog_code_coverage_commit_summary`
*Toolset: **software-delivery***\
Fetches aggregated code coverage summary metrics for a repository commit, including total coverage, patch coverage, and service/codeowner breakdowns.

- Show me the code coverage for commit `abc123abc123abc123abc123abc123abc123abcd` in `github.com/my-org/my-repo`.
- What's the patch coverage for the latest commit on my branch?

### `get_synthetics_tests`
*Toolset: **synthetics***\
Searches Datadog Synthetic tests.

- Help me understand why the Synthetic test on endpoint `/v1/my/tested/endpoint` is failing.
- There is an outage; find all the failing Synthetic tests on the domain `api.mycompany.com`.
- Are Synthetic tests on my website `api.mycompany.com` still working in the past hour?

### `edit_synthetics_tests`
*Toolset: **synthetics***\
Edits Datadog Synthetic HTTP API tests.

- Improve the assertions of the Synthetic test defined on my endpoint `/v1/my/tested/endpoint`.
- Pause the test `aaa-bbb-ccc` and set the locations to only European locations.
- Add my team tag to the test `aaa-bbb-ccc`.

### `synthetics_test_wizard`
*Toolset: **synthetics***\
Preview and create Datadog Synthetics HTTP API Tests.

- Create Synthetics tests on every endpoint defined in this code file.
- Create a Synthetics test on `/path/to/endpoint`.
- Create a Synthetics test that checks if my domain `mycompany.com` stays up.

### `list_datadog_workflows`
*Toolset: **workflows***\
Lists and searches [Workflow Automation][39] workflows. Supports filtering by name, tags, owner, handle, and trigger type (such as `monitor`, `schedule`, `api`, or `incident`). Results can be sorted by fields like `name` or `updatedAt`.

- Show me all published workflows tagged with `team:platform`.
- List workflows that have an agent trigger configured.
- Find all workflows related to incident response owned by Alice Smith.

### `get_datadog_workflow`
*Toolset: **workflows***\
Retrieves detailed information about a specific workflow, including its triggers, steps, connections, and input schema.

- Get the full details for workflow `00000000-0000-0000-0000-000000000000`.
- Show me the input parameters and steps for the deployment rollback workflow.
- What triggers are configured for this workflow?

### `execute_datadog_workflow`
*Toolset: **workflows***\
Executes a published workflow that has an agent trigger, with optional input parameters matching the workflow's input schema.

- Run the incident escalation workflow for service `checkout-api` with severity `high`.
- Execute the deployment rollback workflow for the payments service.
- Trigger the On-Call notification workflow with the context from this investigation.

**Note**: The workflow must be published and have an agent trigger configured. Use `update_datadog_workflow_with_agent_trigger` to add one if needed.

### `get_datadog_workflow_instance`
*Toolset: **workflows***\
Retrieves the status and details of a workflow execution instance, including step results and outputs.

- What's the status of the workflow execution I triggered?
- Did the incident escalation workflow complete successfully?
- Show me the detailed outputs from workflow instance `00000000-0000-0000-0000-000000000000`.

### `update_datadog_workflow_with_agent_trigger`
*Toolset: **workflows***\
Adds an agent trigger to a workflow and publishes it, enabling the workflow to be executed by AI agents.

- Add an agent trigger to the deployment rollback workflow so I can run it from here.
- Configure the incident response workflow to be triggerable by an agent.

## Context efficiency

The Datadog MCP Server is optimized to provide responses in a way that AI agents get relevant context without being overloaded with unnecessary information. For example:

- Responses are truncated based on the estimated length of responses each tool provides. The tools respond to AI agents with instructions on how to request more information if the response was truncated.
- Most tools have a `max_tokens` parameter that enables AI agents to request less or more information.

## Track tool calls in Audit Trail

You can view information about calls made by MCP Server tools in Datadog's [Audit Trail][16]. Search or filter by the event name `MCP Server`.

## Feedback

The Datadog MCP Server is under significant development. Use [this feedback form][19] to share any feedback, use cases, or issues encountered with your prompts and queries.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[15]: /api/latest/events/
[16]: /account_management/audit_trail/
[18]: /account_management/rbac/permissions/#mcp
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[20]: /synthetics/
[21]: /continuous_integration/
[24]: /tests/
[25]: /error_tracking/
[26]: /database_monitoring/
[27]: /bits_ai/mcp_server/setup
[28]: /tracing/
[29]: /feature_flags/
[30]: /llm_observability/mcp_server/
[31]: /network_monitoring/cloud_network_monitoring/
[32]: /network_monitoring/devices/
[33]: /security/threats/security_signals/
[34]: /security/misconfigurations/findings/
[35]: /product_analytics
[36]: /getting_started/site/#navigate-the-datadog-documentation-by-site
[37]: https://help.datadoghq.com/hc/en-us/requests/new
[38]: /service_management/case_management/
[39]: /actions/workflows/
[40]: /bits_ai/mcp_server/setup#local-binary-authentication
[41]: /ddsql_editor/
[42]: /ddsql_reference/ddsql_default/
