---
title: Toolsets
description: "Learn about available toolsets in the Datadog MCP Server, including the tools, permissions, and example prompts for each."
algolia:
  tags: ["mcp", "mcp server", "toolsets"]
  rank: 80
further_reading:
- link: "bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
---

The Datadog MCP Server supports _toolsets_, which allow you to use only the tools you need, saving valuable context window space.

To use a toolset, include the `toolsets` query parameter in the endpoint URL when connecting to the MCP Server ([remote authentication][27] only).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
For example, based on your selected [Datadog site][36] ({{< region-param key="dd_site_name" >}}):

- Retrieve only the core tools (this is the default if `toolsets` is not specified):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Retrieve only Synthetic Testing-related tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Retrieve core, Synthetic Testing, and Software Delivery tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

[36]: /getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

## Available toolsets

<div class="alert alert-info">Datadog MCP Server tools are under significant development and are subject to change. Use <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">this feedback form</a> to share any feedback, use cases, or issues encountered with your prompts and queries.</div>

### core (default) {#core}

The default toolset for logs, metrics, traces, dashboards, monitors, incidents, hosts, services, events, and notebooks.

**Required permissions**: `LogsReadData`, `LogsReadIndexData`, `TimeseriesQuery`, `MetricsRead`, `MonitorsRead`, `ApmRead`, `DashboardsRead`, `UserAccessRead`, `EventsRead`, `HostsRead`, `IncidentRead`, `NotebooksRead`, `RumAppsRead`, `ApmServiceCatalogRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `search_datadog_logs` | Search logs with filters (time, query, service, host, storage tier) and return log details. | "Show me error logs from the nginx service in the last hour." |
| `analyze_datadog_logs` | Analyze logs using SQL queries for counting, aggregations, and numerical analysis. | "Count error logs by service in the last hour." |
| `get_datadog_metric` | Query and analyze historical or real-time metric data, supporting custom queries and aggregations. | "Show me CPU utilization metrics for all hosts in the last 4 hours." |
| `search_datadog_metrics` | List available metrics, with options for filtering and metadata. | "Show me all available Redis metrics." |
| `get_datadog_metric_context` | Retrieve detailed information about a metric including metadata, available tags, and tag values. | "What tags are available for the `system.cpu.user` metric?" |
| `search_datadog_monitors` | Retrieve information about monitors, including statuses, thresholds, and alert conditions. | "List all monitors that are currently alerting." |
| `get_datadog_trace` | Fetch a complete trace from APM using a trace ID. | "Get the complete trace for ID 7d5d747be160e280504c099d984bcfe0." |
| `search_datadog_spans` | Retrieve spans from APM traces with filters such as service, time, and resource. | "Show me spans with errors from the checkout service." |
| `search_datadog_dashboards` | List available dashboards and key details. | "Show me all available dashboards in our account." |
| `search_datadog_events` | Search events like monitor alerts, deployment notifications, and infrastructure changes. | "Show me all deployment events from the last 24 hours." |
| `search_datadog_hosts` | List and provide information about monitored hosts, supporting filtering and searching. | "Show me all hosts in our production environment." |
| `search_datadog_incidents` | Retrieve a list of incidents, including state, severity, and metadata. | "Show me all active incidents by severity." |
| `get_datadog_incident` | Retrieve detailed information about an incident. | "Get details for incident ABC123." |
| `get_datadog_notebook` | Retrieve detailed information about a specific notebook by ID. | "Get details for notebook abc-123-def." |
| `search_datadog_notebooks` | List and search notebooks with filtering by author, tags, and content. | "Show me all notebooks created by the platform team." |
| `search_datadog_rum_events` | Search RUM events using advanced query syntax. | "Show JavaScript errors and console warnings in RUM." |
| `search_datadog_services` | List services in the Software Catalog with details and team information. | "Show me all services in our microservices architecture." |
| `search_datadog_service_dependencies` | Retrieve service dependencies (upstream/downstream) and services owned by a team. | "Show me all upstream services that call the checkout service." |
| `search_datadog_docs` | Search Datadog documentation. | "Find docs on how to set up log pipelines." |

### alerting {#alerting}

Tools for validating monitors, searching monitor groups, and retrieving monitor templates.

**Required permissions**: `MonitorsRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `generate_monitor_definition` | Generate monitor definitions from natural language. | "Create a monitor for error rate > 5% on payments." |
| `get_notification_handles` | Get popular @-notification handles. | "Show me the available notification handles." |
| `generate_message` | Generate notification messages. | "Generate a notification message for my latency monitor." |
| `validate_monitor_definition` | Validate monitor definitions against the API. | "Validate this monitor definition before I create it." |

### apm {#apm}

Tools for in-depth [APM][28] trace analysis, span search, Watchdog insights, and performance investigation.

**Required permissions**: `ApmRead`, `UserAccessRead`, `TeamsRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `apm_trace_summary` | Generate an AI-powered summary of a trace. | "Summarize trace 7d5d747be160e280504c099d984bcfe0." |
| `apm_explore_trace` | Execute queries on trace data for deep analysis and exploration. | "Explore the spans in trace abc123 and show me the database calls." |
| `apm_search_spans` | Search for spans using APM query syntax, with support for pagination and tag filtering. | "Show me spans with errors from the checkout service in the last hour." |
| `apm_discover_span_tags` | Discover available tag keys on spans within a time range. | "What tags are available on spans for service:checkout?" |
| `apm_get_primary_tag_keys` | Retrieve the primary tag keys configured for the organization. | "What are my organization's primary tag keys?" |
| `apm_analyze_trace_metrics` | Analyze APM trace metrics over time for a specific operation. | "Analyze latency trends for the web.request operation over the last 6 hours." |
| `apm_trace_comparison` | Compare two traces to identify performance differences and bottlenecks. | "Compare these two traces to find out why one is slower." |
| `apm_search_recommendations` | Search for APM recommendations. | "Show me APM recommendations for my services." |
| `apm_get_recommendation` | Retrieve full details of a specific APM recommendation by ID. | "Get the details of recommendation abc123." |
| `apm_search_change_stories` | Search for change stories (deployments, feature flags, infrastructure changes). | "Show me recent deployments and changes for the payments service." |
| `apm_search_watchdog_stories` | Search for Watchdog anomaly detection stories for a service. | "Show me Watchdog anomalies for the checkout service in the last 24 hours." |
| `apm_get_watchdog_story` | Retrieve detailed information about a specific Watchdog story. | "Get the details of Watchdog story abc123." |
| `apm_investigation_methodology` | Guidance for investigating APM service issues like latency, errors, and performance problems. | "How should I investigate a latency increase in my API service?" |
| `apm_latency_bottleneck_analysis` | Analyze latency bottlenecks across traces in an anomaly period. | "What are the latency bottlenecks for the checkout service during this anomaly?" |
| `apm_latency_tag_analysis` | Compare span tags between an anomaly period and a baseline period. | "Compare tags between the anomaly window and baseline to find what changed." |
| `apm_whoami` | Retrieve user identity information. | "Who am I in Datadog?" |

### cases {#cases}

Tools for [Case Management][38], including creating, searching, and updating cases; managing projects; and linking Jira issues.

**Required permissions**: `CasesRead`, `CasesWrite`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `search_datadog_cases` | Search cases with filters including status, priority, project, and assignee. | "Show me all open cases assigned to me." |
| `get_datadog_case` | Retrieve detailed information about a specific case by ID or key. | "What's the latest update on CASE-1234? Show me the full timeline." |
| `create_datadog_case` | Create a new case with a title, project, and optional fields. | "Create a P2 case to track the checkout service latency spike." |
| `update_datadog_case` | Update an existing case's fields such as status, priority, and assignee. | "Escalate CASE-1234 to P1." |
| `add_comment_to_datadog_case` | Add a comment to a case's timeline. | "Add a note summarizing what we found in the logs." |
| `link_jira_issue_to_datadog_case` | Link a Jira issue to a Datadog case. | "Link PROJ-456 to this case." |
| `list_datadog_case_projects` | List available Case Management projects. | "What projects are available in Case Management?" |
| `get_datadog_case_project` | Retrieve details for a specific case project by ID. | "What project is this case part of?" |
| `search_datadog_users` | Search for Datadog users by email, name, or handle. | "Find the Datadog user account for jane.doe@example.com." |

### dbm {#dbm}

Tools for interacting with [Database Monitoring][26].

**Required permissions**: `DbmRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `search_datadog_dbm_samples` | Search query samples, which represent individual query executions with performance metrics. | "Show me query samples with duration greater than 1 second from db:mydb." |
| `search_datadog_dbm_plans` | Search query execution plans showing how the database engine executes queries. | "Show me execution plans for slow queries on host:db-prod-1." |

### error-tracking {#error-tracking}

Tools for interacting with Datadog [Error Tracking][25].

**Required permissions**: `ErrorTrackingRead`, `CasesRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `search_datadog_error_tracking_issues` | Search Error Tracking Issues across data sources (RUM, Logs, Traces). | "Show me all Error Tracking Issues in the checkout service from the last 24 hours." |
| `get_datadog_error_tracking_issue` | Retrieve detailed information about a specific Error Tracking Issue. | "Help me solve Error Tracking Issue 550e8400-e29b-41d4-a716-446655440000." |

### feature-flags {#feature-flags}

Tools for managing [feature flags][29], including creating, listing, and updating flags and their environments.

**Required permissions**: `FeatureFlagConfigRead`, `FeatureFlagConfigWrite`, `FeatureFlagEnvironmentConfigRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `list-feature-flags` | List feature flags with pagination support. | "Show me all feature flags in my organization." |
| `get-feature-flag` | Retrieve details about a specific feature flag. | "Get details for the dark-mode-enabled feature flag." |
| `create-feature-flag` | Create a new feature flag. | "Create a feature flag called enable-new-dashboard for gradual rollout." |
| `list-environments` | List environments configured for feature flags. | "Show me the available feature flag environments." |
| `list-allocations-for-feature-flag` | List allocations for a feature flag in a specific environment. | "Show me the allocation rules for flag new-checkout-flow in production." |
| `update-feature-flag-environment` | Update a feature flag configuration in a specific environment. | "Roll out flag new-checkout-flow to 50% of users in production." |
| `check-flag-implementation` | Check if a feature flag is implemented in code. | "Verify that the enable-new-dashboard flag is implemented in my codebase." |
| `sync-allocations-for-feature-flag-environment` | Sync feature flag allocations for a specific environment. | "Sync the allocations for flag new-checkout-flow in production." |
| `get-canary-results` | Get canary analysis results for a feature flag. | "What are the canary results for the new-checkout-flow flag?" |
| `list-guardrail-metrics` | List guardrail metrics for a feature flag. | "Show me the guardrail metrics for my feature flag." |
| `get-guardrail-metric` | Retrieve a specific guardrail metric. | "Get details on the guardrail metric for checkout conversion." |

### llmobs {#llmobs}

Tools for searching and analyzing [LLM Observability][30] spans and experiments.

**Required permissions**: `LlmObservabilityRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `search_datadog_llmobs_spans` | Search LLM Observability spans including model interactions, token usage, costs, and metadata. | "Show the most expensive LLM calls this hour." |

### networks {#networks}

Tools for [Cloud Network Monitoring][31] analysis and [Network Device Monitoring][32].

**Required permissions**: `NetworkPathConfigRead`, `BuiltInFeatures`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `analyze_cloud_network_monitoring` | Investigate network-level issues using Cloud Network Monitoring data. | "Analyze network traffic between my web servers and the database cluster." |
| `search_ndm_devices` | Search network devices (routers, switches, firewalls) monitored by Network Device Monitoring. | "Show me all network devices in the us-east-1 datacenter." |
| `get_ndm_device` | Retrieve detailed information about a specific network device. | "Get details for network device device:abc123." |
| `search_ndm_interfaces` | Retrieve all network interfaces for a specific device. | "Show me all interfaces on device device:abc123." |
| `get_network_path_test_runs` | Search and retrieve Network Path test runs showing hop latency and packet loss. | "Show network path results between app server and DB." |

### onboarding {#onboarding}

Agentic onboarding tools for guided Datadog setup and configuration.

**Required permissions**: `RumAppsWrite` (for browser and devices onboarding)

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `browser_onboarding` | Guide through onboarding Browser RUM to Datadog. | "Help me set up Browser RUM monitoring for my web application." |
| `devices_onboarding` | Guide through onboarding devices to Datadog monitoring. | "Help me set up device monitoring in Datadog." |
| `kubernetes_onboarding` | Guide through onboarding Kubernetes clusters to Datadog. | "Help me set up Datadog monitoring for my Kubernetes cluster." |
| `llm_observability_onboarding` | Guide through onboarding LLM Observability in Datadog. | "Help me set up LLM Observability for my AI application." |
| `test_optimization_onboarding` | Guide through onboarding Test Optimization in Datadog. | "Help me set up Test Optimization for my CI pipeline." |
| `serverless_onboarding` | Guide through onboarding serverless applications to Datadog. | "Help me monitor my AWS Lambda functions with Datadog." |
| `source_map_uploads` | Guide through uploading source maps for RUM error mapping. | "Help me upload source maps so my RUM errors show original source code." |
| `ecs_onboarding` | Guide through onboarding ECS services to Datadog. | "Help me set up Datadog monitoring for my ECS cluster." |
| `studio_onboarding` | Guide through onboarding Datadog Studio. | "Help me get started with Datadog Studio." |
| `aap_onboarding` | Guide through onboarding Application and API Protection. | "Help me set up Application and API Protection." |

### security {#security}

Tools for code security scanning and searching [security signals][33] and [security findings][34].

**Required permissions**: `SecurityMonitoringSignalsRead`, `SecurityMonitoringFindingsRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `datadog_code_security_scan` | Run a comprehensive security scan that detects vulnerabilities and secrets in parallel. | "Scan my code for security vulnerabilities and hardcoded secrets." |
| `datadog_sast_scan` | Scan code for security vulnerabilities using static analysis (SAST). | "Scan this file for security vulnerabilities." |
| `datadog_secrets_scan` | Scan code for hardcoded secrets and credentials. | "Scan my code for hardcoded secrets." |
| `search_datadog_security_signals` | Search security signals from Security Monitoring. | "Show me security signals from the last 24 hours." |
| `security_findings_schema` | Return the schema for security findings. | "What fields are available for security findings?" |
| `analyze_security_findings` | Analyze security findings using SQL queries. | "Show me the top 10 rules with the most critical findings." |
| `search_security_findings` | Retrieve full security finding details. | "Get full details for critical findings in my AWS environment." |

### software-delivery {#software-delivery}

Tools for interacting with Software Delivery ([CI Visibility][21] and [Test Optimization][24]).

**Required permissions**: `CiVisibilityRead`, `TestOptimizationRead`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `search_datadog_ci_pipeline_events` | Search CI events with filters and return details. | "Show me the latest pipeline failure in branch my-branch." |
| `aggregate_datadog_ci_pipeline_events` | Aggregate CI pipeline events to produce statistics and grouped analytics. | "What's the average job duration for the last 7 days?" |
| `get_datadog_flaky_tests` | Search for flaky tests and return triage details. | "Find active flaky tests for the checkout service, sorted by failure rate." |
| `aggregate_datadog_test_events` | Aggregate Test Optimization events to quantify reliability and performance trends. | "Count the number of failed tests over the last week, grouped by branch." |
| `search_datadog_test_events` | Search test events with filters and return details. | "Show me failed tests on branch main from the last 24 hours." |

### synthetics {#synthetics}

Tools for interacting with Datadog [Synthetic tests][20].

**Required permissions**: `SyntheticsRead`, `SyntheticsGlobalVariableRead`, `SyntheticsWrite`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `get_synthetics_tests` | Search Datadog Synthetic tests. | "Find all the failing Synthetic tests on the domain api.mycompany.com." |
| `edit_synthetics_tests` | Edit Datadog Synthetic HTTP API tests. | "Pause the test aaa-bbb-ccc and set the locations to only European locations." |
| `synthetics_test_wizard` | Preview and create Datadog Synthetics HTTP API Tests. | "Create a Synthetics test on /path/to/endpoint." |

### workflows {#workflows}

Tools for [Workflow Automation][39], including listing, inspecting, executing, and configuring workflows for agent use.

**Required permissions**: `WorkflowsRead`, `WorkflowsWrite`

| Tool | Description | Example prompts |
|------|-------------|-----------------|
| `list_datadog_workflows` | List and search workflows with filtering by name, tags, owner, and trigger type. | "Show me all published workflows tagged with team:platform." |
| `get_datadog_workflow` | Retrieve detailed information about a specific workflow, including triggers, steps, and input schema. | "Show me the input parameters and steps for the deployment rollback workflow." |
| `execute_datadog_workflow` | Execute a published workflow that has an agent trigger, with optional input parameters. | "Run the incident escalation workflow for service checkout-api with severity high." |
| `get_datadog_workflow_instance` | Retrieve the status and details of a workflow execution instance. | "Did the incident escalation workflow complete successfully?" |
| `update_datadog_workflow_with_agent_trigger` | Add an agent trigger to a workflow and publish it, enabling execution by AI agents. | "Add an agent trigger to the deployment rollback workflow." |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

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
[36]: /getting_started/site/#navigate-the-datadog-documentation-by-site
[38]: /service_management/case_management/
[39]: /actions/workflows/
