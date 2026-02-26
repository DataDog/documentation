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

{{< callout url="https://www.datadoghq.com/product-preview/datadog-mcp-server/" >}}
The Datadog MCP Server is in Preview. There is no charge for using the Datadog MCP Server during the Preview, but pricing may change when the feature becomes generally available. If you're interested in the MCP server and need access, complete this form.
{{< /callout >}}

The Datadog MCP Server acts as a bridge between your observability data in Datadog and any AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP Server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

Ready to get started? See [Set Up the Datadog MCP Server][27] for connection instructions.

This demo shows the Datadog MCP Server being used in Cursor and Claude Code (unmute for audio):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Demo of Datadog MCP Server in Cursor and Claude Code" video="true" >}}


## Disclaimers

- The Datadog MCP Server is not supported for production use during the Preview.
- Only Datadog organizations that have been specifically allowlisted can use the Datadog MCP Server. It is not available to the general public.
- The Datadog MCP Server is HIPAA-eligible. You are responsible for ensuring that the AI tools you connect to the Datadog MCP Server meet your compliance requirements, such as HIPAA.
- Datadog collects certain information about your usage of the Remote Datadog MCP Server, including how you interact with it, whether errors occurred while using it, what caused those errors, and user identifiers in accordance with the <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog Privacy Policy</a> and Datadog's <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>. This data is used to help improve the server's performance and features, including transitions to and from the server and the applicable Datadog login page for accessing the Services, and context (for example, user prompts) leading to the use of MCP tools. The data is stored for 120 days.


## Requirements

Datadog users must have the `MCP Read` and/or `MCP Write` [permissions][18] to use the MCP server.

For setup instructions, see [Set Up the Datadog MCP Server](/bits_ai/mcp_server/setup).

## Toolsets


The Datadog MCP Server supports _toolsets_, which allow you to use only the tools you need, saving valuable context window space. These toolsets are available:

- `core`: The default toolset for logs, metrics, traces, dashboards, monitors, incidents, hosts, services, events, and notebooks
- `alerting`: Tools for validating monitors, searching monitor groups, and retrieving monitor templates
- `apm`: Tools for in-depth [APM][28] trace analysis, span search, Watchdog insights, and performance investigation
- `dbm`: Tools for interacting with [Database Monitoring][26]
- `error-tracking`: Tools for interacting with Datadog [Error Tracking][25]
- `feature-flags`: Tools for managing [feature flags][29], including creating, listing, and updating flags and their environments
- `llmobs`: Tools for searching and analyzing [LLM Observability][30] spans
- `product-analytics`: Tools for interacting with [Product Analytics][35] queries
- `networks`: Tools for [Cloud Network Monitoring][31] analysis and [Network Device Monitoring][32]
- `onboarding`: Agentic onboarding tools for guided Datadog setup and configuration
- `security`: Tools for code security scanning and searching [security signals][33] and [security findings][34]
- `software-delivery`: Tools for interacting with Software Delivery ([CI Visibility][21] and [Test Optimization][24])
- `synthetics`: Tools for interacting with Datadog [Synthetic tests][20]

To use a toolset, include the `toolsets` query parameter in the endpoint URL when connecting to the MCP Server ([remote authentication](/bits_ai/mcp_server/setup?tab=remote-authentication#connect-in-supported-ai-clients) only). For example:

- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` retrieves only the core tools (this is the default if `toolsets` is not specified).
- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=synthetics` retrieves only Synthetic Testing-related tools.
- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=core,synthetics,software-delivery` retrieves core, Synthetic Testing, and Software Delivery tools.

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
- Display memory usage trends for our database servers.

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

### `search_datadog_llmobs_spans`
*Toolset: **llmobs***\
Retrieves and analyzes [LLM Observability][30] spans from Datadog, showing the complete request flow, model interactions, token usage, costs, and associated metadata.

- Show me LLM Observability spans for my chatbot service in the last hour.
- Find spans where the LLM model returned an error.
- Analyze token usage and costs for my AI application over the past day.

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

### `datadog_code_security_scan`
*Toolset: **security***\
Runs a comprehensive security scan that detects both vulnerabilities (SQL injection, XSS, path traversal, and others) and secrets (API keys, passwords, credentials, and others) in parallel.

- Scan my code for security vulnerabilities and hardcoded secrets.
- Run a full security scan on this pull request.
- Check this file for any security issues.

### `datadog_sast_scan`
*Toolset: **security***\
Scans code for security vulnerabilities using static analysis (SAST), detecting SQL injection, XSS, path traversal, command injection, insecure cryptography, and other security weaknesses.

- Scan this file for security vulnerabilities.
- Check my code for SQL injection and XSS vulnerabilities.

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

### `search_datadog_security_findings`
*Toolset: **security***\
Searches and retrieves security findings from Datadog Security, including misconfigurations, identity risks, and library vulnerabilities.

- Show me critical security findings for my cloud infrastructure.
- Find misconfigurations in my AWS environment.
- List security findings related to identity risks.

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

## Context efficiency

The Datadog MCP Server is optimized to provide responses in a way that AI agents get relevant context without being overloaded with unnecessary information. For example:

- Responses are truncated based on the estimated length of responses each tool provides. The tools respond to AI agents with instructions on how to request more information if the response was truncated.
- Most tools have a `max_tokens` parameter that enables AI agents to request less or more information.

## Track tool calls in Audit Trail

You can view information about calls made by MCP Server tools in Datadog's [Audit Trail][16]. Search or filter by the event name `MCP Server`.

## Feedback

The Datadog MCP Server is under significant development. During the Preview, use [this feedback form][19] to share any feedback, use cases, or issues encountered with your prompts and queries.

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
[30]: /llm_observability/
[31]: /network_monitoring/cloud_network_monitoring/
[32]: /network_monitoring/devices/
[33]: /security/threats/security_signals/
[34]: /security/misconfigurations/findings/
[35]: /product_analytics
