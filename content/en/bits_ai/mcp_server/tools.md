---
title: Datadog MCP Server Tools
description: "Browse all tools available in the Datadog MCP Server, organized by toolset, with example prompts."
algolia:
  tags: ["mcp", "mcp server", "mcp tools", "tools"]
  rank: 70
further_reading:
- link: "bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
---

The following tools are available in the Datadog MCP Server. Each entry includes the required toolset, permissions, and example prompts. Tools are grouped by [toolsets][1], which allow you to use only the tools you need, saving valuable context window space.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
To enable product-specific tools, include the `toolsets` query parameter at the end of the endpoint URL you use to connect to the Datadog MCP Server. For example, based on your selected [Datadog site][2] ({{< region-param key="dd_site_name" >}}), this URL enables _only_ APM and LLM Observability tools:

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

[2]: /getting_started/site/
{{< /site-region >}}

See [Set Up the Datadog MCP Server][1] for more information on connecting to the MCP Server and enabling toolsets.

<div class="alert alert-info">Datadog MCP Server tools are under significant development and are subject to change. Use <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">this feedback form</a> to share any feedback, use cases, or issues encountered with your prompts and queries.</div>

## Core tools

The default toolset for logs, metrics, traces, dashboards, monitors, incidents, hosts, services, events, and notebooks.

### `search_datadog_events`
*Toolset: **core***\
*Permissions Required: `Events` and `Timeseries`*\
Searches events like monitor alerts, deployment notifications, infrastructure changes, security findings, and service status changes.

- Show me all deployment events from the last 24 hours.
- Find events related to our production environment with error status.
- Get events tagged with `service:api` from the past hour.

**Note**: See the [Event Management API][15] for more details.

### `get_datadog_incident`
*Toolset: **core***\
*Permissions Required: `Incidents Read`*\
Retrieves detailed information about an incident.

- Get details for incident ABC123.
- What's the status of incident ABC123?
- Retrieve full information about the Redis incident from yesterday.

**Note**: The tool is operational, but does not include incident timeline data.

### `get_datadog_metric`
*Toolset: **core***\
*Permissions Required: `Cloud Cost Management Read` or `Metrics` or `Timeseries`*\
Queries and analyzes historical or real-time metric data, supporting custom queries and aggregations.

- Show me CPU utilization metrics for all hosts in the last 4 hours.
- Get Redis latency metrics for the production environment.
- How much did my cloud costs change from January to February?

### `get_datadog_metric_context`
*Toolset: **core***\
*Permissions Required: `Cloud Cost Management Read` or `Metrics`*\
Retrieves detailed information about a metric including metadata, available tags, and tag values for filtering and grouping.

- What tags are available for the `system.cpu.user` metric?
- Show me all possible values for the `env` tag on `redis.info.latency_ms`.
- Get metadata and dimensions for the `requests.count` metric.

### `search_datadog_monitors`
*Toolset: **core***\
*Permissions Required: `Monitors Read`*\
Retrieves information about Datadog monitors, including their statuses, thresholds, and alert conditions.

- List all monitors that are currently alerting.
- Show me monitors related to our payment service.
- Find monitors tagged with `team:infrastructure`.

### `get_datadog_trace`
*Toolset: **core***\
*Permissions Required: `APM Read`*\
Fetches a complete trace from Datadog APM using a trace ID.

- Get the complete trace for ID 7d5d747be160e280504c099d984bcfe0.
- Show me all spans for trace abc123 with timing information.
- Retrieve trace details including database queries for ID xyz789.

**Note**: Large traces with thousands of spans may be truncated (and indicated as such) without a way to retrieve all spans.

### `search_datadog_dashboards`
*Toolset: **core***\
*Permissions Required: `Dashboards Read` and `User Access Read`*\
Lists available Datadog dashboards and key details.

- Show me all available dashboards in our account.
- List dashboards related to infrastructure monitoring.
- Find shared dashboards for the engineering team.

**Note**: This tool lists relevant dashboards but provides limited detail about their contents. Use `get_datadog_dashboard` to retrieve full widget definitions.

### `get_datadog_notebook`
*Toolset: **core***\
*Permissions Required: `Notebooks Read`*\
Retrieves detailed information about a specific notebook by ID, including name, status, and author.

- Get details for notebook abc-123-def.
- Show me the contents of the debugging notebook from yesterday.

### `search_datadog_notebooks`
*Toolset: **core***\
*Permissions Required: `Notebooks Read`*\
Lists and searches Datadog notebooks with filtering by author, tags, and content.

- Show me all notebooks created by the platform team.
- Find notebooks related to performance investigation.
- List notebooks tagged with `incident-response`.

### `search_datadog_hosts`
*Toolset: **core***\
*Permissions Required: `Hosts Read` and `Timeseries`*\
Lists and provides information about monitored hosts, supporting filtering and searching.

- Show me all hosts in our production environment.
- List unhealthy hosts that haven't reported in the last hour.
- Get all hosts tagged with `role:database`.

### `search_datadog_incidents`
*Toolset: **core***\
*Permissions Required: `Incidents Read`*\
Retrieves a list of Datadog incidents, including their state, severity, and metadata.

- Show me all active incidents by severity.
- List resolved incidents from the past week.
- Find incidents that are customer-impacting.

### `search_datadog_metrics`
*Toolset: **core***\
*Permissions Required: `Metrics`*\
Lists available metrics, with options for filtering and metadata.

- Show me all available Redis metrics.
- List CPU-related metrics for our infrastructure.
- Find metrics tagged with `service:api`.

### `search_datadog_services`
*Toolset: **core***\
*Permissions Required: `Service Catalog Read`*\
Lists services in Datadog's Software Catalog with details and team information.

- Show me all services in our microservices architecture.
- List services owned by the platform team.
- Find services related to payment processing.

### `search_datadog_service_dependencies`
*Toolset: **core***\
*Permissions Required: `APM Read` and `Service Catalog Read` and `Teams Read`*\
Retrieves service dependencies (upstream/downstream) and services owned by a team.

- Show me all upstream services that call the checkout service.
- What downstream services does the payment API depend on?
- List all services owned by the platform team.

### `search_datadog_spans`
*Toolset: **core***\
*Permissions Required: `APM Read`*\
Retrieves spans from APM traces with filters such as service, time, resource, and so on.

- Show me spans with errors from the checkout service.
- Find slow database queries in the last 30 minutes.
- Get spans for failed API requests to our payment service.

### `analyze_datadog_logs`
*Toolset: **core***\
*Permissions Required: `Logs Read Data` and `Logs Read Index Data` and `Timeseries`*\
Analyze Datadog logs using SQL queries for counting, aggregations, and numerical analysis. Use this for statistical analysis.

- Count error logs by service in the last hour.
- Show me the top 10 HTTP status codes with their counts.
- Which services were logging the most during that time period?

### `search_datadog_logs`
*Toolset: **core***\
*Permissions Required: `Logs Read Data` and `Logs Read Index Data`*\
Searches logs with filters (time, query, service, host, storage tier, and so on) and returns log details. Renamed from `get_logs`.

- Show me error logs from the nginx service in the last hour.
- Find logs containing 'connection timeout' from our API service.
- Get all 500 status code logs from production.

### `search_datadog_rum_events`
*Toolset: **core***\
*Permissions Required: `RUM Apps Read`*\
Search Datadog RUM events using advanced query syntax.

- Show JavaScript errors and console warnings in RUM.
- Find pages that are loading slowly (more than 3 seconds).
- Show recent user interactions on product detail pages.

### `create_datadog_notebook`
*Toolset: **core***\
*Permissions Required: `Notebooks Read` and `Notebooks Write`*\
Creates a new Datadog notebook.

- Create a notebook to document the investigation into the checkout service latency spike.
- Make a new notebook for our weekly performance review.

### `edit_datadog_notebook`
*Toolset: **core***\
*Permissions Required: `Notebooks Read` and `Notebooks Write`*\
Edits an existing Datadog notebook.

- Add a section to notebook abc-123-def with the latest log analysis results.
- Update the incident response notebook with today's findings.

## Alerting

Tools for validating monitors, searching monitor groups, and retrieving monitor templates.

### `validate_datadog_monitor`
*Toolset: **alerting***\
*Permissions Required: `Monitors Read`*\
Validates a monitor definition for correctness before creating or updating it.

- Validate this monitor definition before I create it.
- Check if my monitor query syntax is correct.

### `get_datadog_monitor_templates`
*Toolset: **alerting***\
*Permissions Required: `Monitors Read`*\
Retrieves available monitor templates to help you create monitors.

- Show me the available monitor templates.
- What templates can I use to create a new monitor?

### `search_datadog_monitor_groups`
*Toolset: **alerting***\
*Permissions Required: `Monitors Read`*\
Searches monitor groups by name or criteria.

- Show me all monitor groups in an alerting state.
- Find monitor groups related to the checkout service.

### `search_datadog_slos`
*Toolset: **alerting***\
*Permissions Required: `SLOs Read`*\
Searches Datadog SLOs by name, tags, or type. Supports query syntax for filtering by service, team, or other attributes.

- Search for SLOs related to `service:checkout`.
- List all SLOs tagged with `team:backend`.
- List SLOs for the payments service.

### `create_datadog_monitor`
*Toolset: **alerting***\
*Permissions Required: `Monitors Write`*\
Creates a Datadog monitor in draft mode. Monitors created with this tool do not send notifications and are set to priority 5 (low). Use `validate_datadog_monitor` to check the definition before creating and `get_datadog_monitor_templates` for query syntax examples. After creation, publish the monitor in the Datadog UI.

- Create a metric alert monitor for high CPU usage on the web service.
- Set up a log alert monitor for error spikes in the payments service.
- Create a monitor to track p95 latency for the checkout endpoint.

### `get_monitor_coverage`
*Toolset: **alerting***\
*Permissions Required: `Monitors Read`*\
Finds monitoring gaps and coverage for services or hosts. Returns which signals (such as error rate, latency, and request rate) are covered by existing monitors and which are missing. Use with `create_datadog_monitor` to fill gaps.

- Get monitoring coverage for `service:checkout`.
- What monitoring gaps exist for `host:web-01`?
- Find services that are missing error rate monitors.

## APM

Tools for in-depth [APM][50] trace analysis, span search, Watchdog insights, and performance investigation.

<div class="alert alert-info">The <code>apm</code> toolset is in Preview. <a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">Sign up for access.</a></div>

### `apm_search_spans`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Searches for spans using APM query syntax, with support for pagination and tag filtering.

- Show me spans with errors from the checkout service in the last hour.
- Find slow database queries taking more than 2 seconds.
- Search for spans with `service:payments` and `status:error`.

### `apm_explore_trace`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Executes queries on trace data for deep analysis and exploration of specific spans within a trace.

- Explore the spans in trace `abc123` and show me the database calls.
- Analyze the error spans in this trace.

### `apm_trace_summary`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Generates an AI-powered summary of a trace, providing high-level analysis of what the trace shows.

- Summarize trace `7d5d747be160e280504c099d984bcfe0`.
- Give me an overview of what happened in this trace.

### `apm_trace_comparison`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Compares two traces to identify performance differences and bottlenecks between a fast trace and a slow trace.

- Compare these two traces to find out why one is slower.
- What changed between this baseline trace and the slow trace?

### `apm_analyze_trace_metrics`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Analyzes APM trace metrics over time for a specific operation, querying metric data and providing AI-generated analysis.

- Analyze latency trends for the `web.request` operation on `service:api` over the last 6 hours.
- Show me error rate metrics for my database service.

### `apm_discover_span_tags`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Discovers available tag keys on spans within a time range.

- What tags are available on spans for `service:checkout`?
- Show me the tag keys I can filter by in APM.

### `apm_get_primary_tag_keys`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Retrieves the primary tag keys configured for the organization.

- What are my organization's primary tag keys?

### `apm_search_watchdog_stories`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Searches for Watchdog anomaly detection stories for a service within a time range, providing AI-powered insights into latency, error rate, and traffic anomalies.

- Show me Watchdog anomalies for the checkout service in the last 24 hours.
- Are there any latency anomalies detected for my API service?

### `apm_get_watchdog_story`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Retrieves detailed information about a specific Watchdog story by its ID.

- Get the details of Watchdog story `abc123`.

### `apm_search_change_stories`
*Toolset: **apm***\
Searches for change stories (deployments, feature flags, and infrastructure changes) for a service within a time range.

- Show me recent deployments and changes for the payments service.
- What infrastructure changes happened around the time of this latency spike?

### `apm_latency_bottleneck_analysis`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Analyzes latency bottlenecks across traces in an anomaly period by calculating self-time.

- What are the latency bottlenecks for the checkout service during this anomaly?
- Identify which spans are contributing the most to latency.

### `apm_latency_tag_analysis`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Compares span tags between an anomaly period and a baseline period to identify what changed.

- Compare tags between the anomaly window and baseline to find what changed.
- What tag values are different during this latency spike?

### `apm_search_recommendations`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Searches for APM recommendations from Datadog.

- Show me APM recommendations for my services.
- Are there any optimization suggestions for my application?

### `apm_get_recommendation`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Retrieves full details of a specific APM recommendation by ID.

- Get the details of recommendation `abc123`.

### `apm_investigation_methodology`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Provides guidance for investigating APM service issues like latency, errors, and performance problems.

- How should I investigate a latency increase in my API service?
- Guide me through debugging an error spike in production.

## Cases

Tools for [Case Management][38], including creating, searching, and updating cases; managing projects; and linking Jira issues.

### `search_datadog_cases`
*Toolset: **cases***\
*Permissions Required: `Cases Read`*\
Searches [Case Management][38] cases with filters including status, priority, project, and assignee. Supports time range filtering and pagination.

- Show me all open cases assigned to me.
- Are there any open P1 cases in the Security Reviews project?
- Show me all cases opened this week related to the payment service.

### `get_datadog_case`
*Toolset: **cases***\
*Permissions Required: `Cases Read`*\
Retrieves detailed information about a specific case by ID or key, including title, status, priority, assignee, and timestamps. Optionally includes timeline activity (comments and status changes) and custom attributes.

- What's the latest update on CASE-1234? Show me the full timeline.
- Who's working on this case and what progress has been made so far?
- Pull up the details and all comments for the database migration case.

### `create_datadog_case`
*Toolset: **cases***\
*Permissions Required: `Cases Write`*\
Creates a new [Case Management][38] case with a title, project, and optional fields like description, priority, and assignee.

- I'm seeing a latency spike on the checkout service. Create a P2 case to track the investigation.
- Open a security review case for the suspicious login activity we found in the logs.

### `update_datadog_case`
*Toolset: **cases***\
*Permissions Required: `Cases Write`*\
Updates an existing case's fields such as status, priority, title, description, assignee, due date, and custom attributes. Only the fields you provide are updated.

- This issue is now customer-impacting. Escalate CASE-1234 to P1.
- Mark the database migration case as resolved.
- Set a due date for end of week on CASE-1234.

### `add_comment_to_datadog_case`
*Toolset: **cases***\
*Permissions Required: `Cases Write`*\
Adds a comment to a case's timeline. Comments support markdown formatting.

- Add a note to the case summarizing what we found in the logs and traces.
- Post an update that the hotfix has been deployed and we're monitoring.
- Document the root cause analysis findings on this case.

### `link_jira_issue_to_datadog_case`
*Toolset: **cases***\
*Permissions Required: `Cases Write`*

- Link the Jira ticket for the infrastructure migration to this case so we can track both together.
- Connect PROJ-456 to the Datadog case so the engineering team has visibility.

### `list_datadog_case_projects`
*Toolset: **cases***\
*Permissions Required: `Cases Read`*\
Lists available [Case Management][38] projects with optional filtering by name or key.

- What projects are available in Case Management?
- Is there a project related to security in Case Management?

### `get_datadog_case_project`
*Toolset: **cases***\
*Permissions Required: `Cases Read`*\
Retrieves details for a specific case project by ID.

- What project is this case part of?

### `search_datadog_users`
*Toolset: **cases***\
*Permissions Required: `User Access Read`*\
Searches for Datadog users by email, name, or handle. Useful for finding the right person to assign a case to.

- Find the Datadog user account for jane.doe@example.com.

## Dashboards

Tools for retrieving, creating, updating, and deleting [dashboards][46], plus widget schema reference and validation.

### `get_datadog_dashboard`
*Toolset: **core**, **dashboards***\
*Permissions Required: `Dashboards Read` and `User Access Read`*\
Retrieves a Datadog [dashboard][46] by ID, returning its title, description, tags, and widgets. Use `search_datadog_dashboards` first to find dashboard IDs.

- Get the full details of dashboard `ps7-mn3-kwf`.
- Show me the widgets and layout of the infrastructure overview dashboard.
- Retrieve the template variables configured on this dashboard.

### `upsert_datadog_dashboard`
*Toolset: **core**, **dashboards***\
*Permissions Required: `Dashboards Read` and `Dashboards Write`*\
Creates or updates a Datadog [dashboard][46]. To update an existing dashboard, provide the dashboard ID; omit it to create a new one. Call `get_widget_reference` for widget schemas before building widgets.

- Create a dashboard showing CPU and memory usage across all hosts.
- Add a timeseries widget for error rate to dashboard `abc-123-def`.
- Update the title and description of my service overview dashboard.

### `delete_datadog_dashboard`
*Toolset: **dashboards***\
*Permissions Required: `Dashboards Read` and `Dashboards Write`*\
Permanently deletes a Datadog [dashboard][46] by ID. This action cannot be undone. Use `search_datadog_dashboards` first to find dashboard IDs.

- Delete dashboard `ps7-mn3-kwf`.
- Remove the old staging environment dashboard.

### `get_widget_reference`
*Toolset: **dashboards***\
*Permissions Required: `Dashboards Read` or `Dashboards Write` or `Notebooks Read`*\
Returns schemas and building instructions for dashboard widget types. Widget definitions are JSON objects; this tool returns TypeScript type definitions representing their schemas along with building instructions covering query patterns, formula syntax, and common pitfalls. Call this before generating widgets with `upsert_datadog_dashboard`.

- Get the schema for a timeseries widget.
- Show me how to build a toplist and a query table widget.
- What's the schema for the scatterplot widget?

### `validate_dashboard_widget`
*Toolset: **dashboards***\
*Permissions Required: `Dashboards Read` or `Dashboards Write` or `Notebooks Read`*\
Validates a widget definition against the dashboard schema. Use this to check widget JSON before passing it to `upsert_datadog_dashboard`.

- Validate my timeseries widget definition before creating the dashboard.
- Check if this query table widget JSON is correct.

### `ask_widget_expert`
*Toolset: **dashboards***\
*Permissions Required: `Dashboards Read` or `Dashboards Write` or `Notebooks Read`*\
Ask a Datadog widget expert a question about widget configuration, schemas, query syntax, field usage, debugging, or pitfalls. Best for targeted questions: schema lookups, field clarifications, debugging an existing widget definition, or understanding how a specific widget type works.

- What response_format should I use for a toplist?
- What's the schema for the scatterplot widget?
- Help me debug why this widget is showing fractional values when it should be a count.
- How do I configure a timeseries to show both bars and lines?

## Database Monitoring

Tools for interacting with [Database Monitoring][26].

### `find_datadog_database_instances`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Discovers and ranks database instances for DBM investigation. Call this before other DBM tools that require a `database_instance` parameter. Accepts an APM trace or span ID, tags, or both to find matching instances, then assesses and ranks their health.

- Find database instances correlated with trace `abc123` from an hour ago.
- What PostgreSQL instances match `cluster_name:payments-prod`?
- Rank database instances for service `checkout-api` by health.

### `get_datadog_database_calling_services`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Identifies upstream APM services and resources that call database queries. Correlates database activity with application traces for root cause analysis across the APM-database boundary.

- Which services are calling the slowest queries on `db-prod-1`?
- Find the primary caller of query signature `abc123def`.
- Show me APM resources driving load on the payments database.

### `get_datadog_database_explain_plans`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Retrieves PostgreSQL explain plans for a query signature within a time frame. Returns simplified plan structures with operator trees, index usage, and estimated costs, sorted by cost.

- Get explain plans for query signature `abc123def` on `db-prod-1`.
- Show me the most expensive execution plans for this slow query.
- What plan variations does query signature `xyz789` have over the past day?

### `get_datadog_database_health_signals`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Runs health checks to surface potential PostgreSQL issues such as CPU saturation, restarts, query latency, and blocking. Compares a regression time frame against a baseline period.

- Run health checks on `db-prod-1` for the last hour versus the previous hour.
- Check database health around the incident time frame.
- What signals explain the regression on the payments database?

### `get_datadog_database_query_performance`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Analyzes a specific PostgreSQL query's performance. Returns throughput, average latency, execution time, rows per execution, cache hit ratio, I/O stats, connection activity, wait events, and transaction duration, with both overall statistics and time-bucketed analysis.

- Analyze performance for query signature `abc123def` over the last hour.
- Why is this query slow on the production PostgreSQL instance?
- Show wait events and cache hit ratio for query signature `xyz789`.

### `get_datadog_database_query_statement`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Retrieves the SQL statement text for a given query signature. Use this to map signature hashes back to the concrete SQL for investigation and reporting.

- Get the SQL for query signature `abc123def`.
- Show me the statement behind this query hash on `db-prod-1`.
- What query does signature `xyz789` correspond to?

### `get_datadog_database_recommendations`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Retrieves live database recommendations for a database, query, table, host, or index. Returns the matching recommendations with status, severity, and a normalized scope block highlighting affected instances, query signatures, tables, indexes, services, plans, and infrastructure identifiers.

- Show open database recommendations for `db-prod-1`.
- List missing index recommendations on the payments database.
- Get high-severity recommendations for query signature `abc123def`.

### `get_datadog_database_schemas`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Fetches schema definitions (columns, indexes, foreign keys, partitions) for one or more database objects. Accepts table names with optional schema, database, and instance qualifiers.

- Show me the schema for the `orders` table.
- Get columns and indexes for `public.users` on `db-prod-1`.
- Fetch foreign keys for the `payments` table.

### `optimize_datadog_database_query`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Analyzes a PostgreSQL query for optimization opportunities using deterministic rules. Returns query rewrites, anti-pattern detection (`SELECT *`, `OFFSET` without `ORDER BY`, `ORDER BY` without `LIMIT`), missing index suggestions, and idle-in-transaction impact analysis. Accepts either SQL text or a query signature.

- Optimize query signature `abc123def` on the payments database.
- Check this SQL for missing indexes and anti-patterns.
- Suggest rewrites for the slowest query on `db-prod-1`.

### `search_datadog_database_plans`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Searches [Database Monitoring][26] query execution plans, which show how the database engine executes queries, including index usage, join strategies, and cost estimates. Use this to analyze query performance and identify optimization opportunities.

- Show me execution plans for slow queries on `host:db-prod-1` from the last hour.
- Find query plans with `@db.plan.type:explain_analyze` for the production database.
- Get execution plans for queries by `@db.user:app_user` with duration greater than 1 second.

### `search_datadog_database_samples`
*Toolset: **dbm***\
*Permissions Required: `Database Monitoring Read`*\
Searches [Database Monitoring][26] query samples, which represent individual query executions with performance metrics. Use this to analyze database activity patterns, identify slow queries, and investigate database performance issues.

- Show me query samples with `@duration:>1000000000` (duration greater than 1 second) from `db:mydb`.
- Find slow queries on `host:db-prod-1` filtered by `@db.user:app_user`.
- Get recent query samples for `@db.query_signature:abc123def` and analyze performance patterns.

## DDSQL

Tools for querying Datadog data using [DDSQL][41], a SQL dialect with support for infrastructure resources, logs, metrics, RUM, spans, and other Datadog data sources.

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

## Error Tracking

Tools for interacting with Datadog [Error Tracking][49].

### `search_datadog_error_tracking_issues`
*Toolset: **error-tracking***\
*Permissions Required: `Error Tracking Read`*\
Searches Error Tracking Issues across data sources (RUM, Logs, Traces).

- Show me all Error Tracking Issues in the checkout service from the last 24 hours.
- What are the most common errors in my application over the past week?
- Find Error Tracking Issues in the production environment with `service:api`.

### `get_datadog_error_tracking_issue`
*Toolset: **error-tracking***\
*Permissions Required: `Cases Read` and `Error Tracking Read`*\
Retrieves detailed information about a specific Error Tracking Issue from Datadog.

- Help me solve Error Tracking Issue `550e8400-e29b-41d4-a716-446655440000`.
- What is the impact of Error Tracking Issue `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`?
- Create a test case to reproduce Error Tracking Issue `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`.

## Feature Flags

Tools for managing [feature flags][51], including creating, listing, and updating flags and their environments.

### `list_datadog_feature_flags`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Environment Read` and `Feature Flag Read`*\
Lists feature flags with pagination support.

- Show me all feature flags in my organization.
- List feature flags for the checkout service.

### `get_datadog_feature_flag`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Environment Read` and `Feature Flag Read`*\
Retrieves details about a specific feature flag.

- Get details for the `dark-mode-enabled` feature flag.
- What are the current settings for flag `new-checkout-flow`?

### `create_datadog_feature_flag`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Environment Read` and `Feature Flag Write`*\
Creates a new feature flag.

- Create a feature flag called `enable-new-dashboard` for gradual rollout.
- Set up a new boolean feature flag for the beta feature.

### `list_datadog_feature_flag_environments`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Environment Read`*\
Lists environments configured for feature flags.

- Show me the available feature flag environments.
- What environments can I target with feature flags?

### `list_datadog_feature_flag_allocations`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Environment Read` and `Feature Flag Read`*\
Lists allocations for a feature flag in a specific environment.

- Show me the allocation rules for flag `new-checkout-flow` in production.

### `update_datadog_feature_flag_environment`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Environment Read` and `Feature Flag Write`*\
Updates a feature flag configuration in a specific environment.

- Enable the `dark-mode` flag in the staging environment.
- Roll out flag `new-checkout-flow` to 50% of users in production.

### `check_datadog_flag_implementation`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Environment Read` and `Feature Flag Read`*\
Checks if a feature flag is implemented in code.

- Verify that the `enable-new-dashboard` flag is implemented in my codebase.

### `sync_datadog_feature_flag_allocations`
*Toolset: **feature-flags***\
*Permissions Required: `Feature Flag Write`*\
Syncs feature flag allocations for a specific environment.

- Sync the allocations for flag `new-checkout-flow` in production.

## Networks

Tools for [Cloud Network Monitoring][31] analysis and [Network Device Monitoring][32].

### `analyze_cloud_network_monitoring`
*Toolset: **networks***\
*Permissions Required: `Network Connections Read`*\
Investigates network-level issues using [Cloud Network Monitoring][31] data, analyzing network flow data to detect anomalies like elevated retransmission rates.

- Analyze network traffic between my web servers and the database cluster.
- Are there any retransmission issues between `service:api` and `service:payments`?
- Investigate network flow data for anomalies in the production environment.

### `search_ndm_devices`
*Toolset: **networks***\
*Permissions Required: `NDM Read`*\
Searches network devices (routers, switches, firewalls) monitored by Datadog [Network Device Monitoring][32].

- Show me all network devices in the `us-east-1` datacenter.
- Find firewalls that are reporting errors.
- List all monitored switches and their statuses.

### `get_ndm_device`
*Toolset: **networks***\
*Permissions Required: `NDM Read`*\
Retrieves detailed information about a specific network device by its device ID.

- Get details for network device `device:abc123`.
- Show me the configuration and status of this router.

### `search_ndm_interfaces`
*Toolset: **networks***\
*Permissions Required: `NDM Read`*\
Retrieves all network interfaces for a specific device.

- Show me all interfaces on device `device:abc123`.
- List the interface statuses for my core router.

## Onboarding

Agentic onboarding tools for guided Datadog setup and configuration.

### `browser_onboarding`
*Toolset: **onboarding***\
*Permissions Required: `RUM Apps Read`*\
Guides you through onboarding Browser RUM to Datadog.

- Help me set up Browser RUM monitoring for my web application.

### `devices_onboarding`
*Toolset: **onboarding***\
*Permissions Required: `RUM Apps Read`*\
Guides you through onboarding devices to Datadog monitoring.

- Help me set up device monitoring in Datadog.

### `kubernetes_onboarding`
*Toolset: **onboarding***\
*Permissions Required: None*\
Guides you through onboarding Kubernetes clusters to Datadog.

- Help me set up Datadog monitoring for my Kubernetes cluster.

### `llm_observability_onboarding`
*Toolset: **onboarding***\
Guides you through onboarding LLM Observability in Datadog.

- Help me set up LLM Observability for my AI application.

### `test_optimization_onboarding`
*Toolset: **onboarding***\
*Permissions Required: None*\
Guides you through onboarding Test Optimization in Datadog.

- Help me set up Test Optimization for my CI pipeline.

### `serverless_onboarding`
*Toolset: **onboarding***\
*Permissions Required: None*\
Guides you through onboarding serverless applications to Datadog, including AWS Lambda functions and GCP Cloud Run and Cloud Run functions (Gen 2).

- Help me monitor my AWS Lambda functions with Datadog.
- Help me monitor my GCP Cloud Run services with Datadog.
- Help me monitor my GCP Cloud Run functions with Datadog.

### `source_map_uploads`
*Toolset: **onboarding***\
Guides you through uploading source maps for RUM error mapping.

- Help me upload source maps so my RUM errors show original source code.

## Reference Tables

Tools for managing [Reference Tables][45], including listing tables, reading rows, appending rows, and creating tables from cloud storage.

### `list_reference_tables`
*Toolset: **reference-tables***\
Lists and searches [Reference Tables][45] in the organization, with optional filtering by name and sorting.

- List all reference tables in my organization.
- Find reference tables with `customer` in the name.
- Show me the reference tables sorted by last update time.

### `get_reference_table_rows`
*Toolset: **reference-tables***\
Retrieves specific rows from a reference table by their primary key values. Use `list_reference_tables` first to find the table ID and schema.

- Get the rows with primary keys `user001` and `user002` from the users reference table.
- Look up the entry for account ID `acct-123` in the accounts table.

### `append_reference_table_rows`
*Toolset: **reference-tables***\
Appends new rows to an existing reference table. This operation only adds rows and does not modify or delete existing data. Each row must include all required fields from the table's schema, including the primary key field.

- Add a new row for user `user003` with name `Carol` and age `28` to the users table.
- Append these five new account entries to the accounts reference table.

### `create_reference_table`
*Toolset: **reference-tables***\
Creates a new reference table backed by a CSV file in Amazon S3, Google Cloud Storage, or Azure Blob Storage. Only `INT32` and `STRING` field types are supported.

- Create a reference table called `ip_allowlist` from the file `allowlist.csv` in my S3 bucket `my-data-bucket`.
- Set up a new GCS-backed reference table called `customer_tiers` with automatic sync enabled.

## Security

Tools for code security scanning and searching [security signals][53] and [security findings][54].

### `datadog_secrets_scan`
*Toolset: **security***\
Scans code for hardcoded secrets and credentials, detecting AWS keys, API keys, passwords, tokens, private keys, and database credentials.

- Scan my code for hardcoded secrets.
- Check if there are any API keys or passwords committed in this file.

### `search_datadog_security_signals`
*Toolset: **security***\
*Permissions Required: `Security Signals Read`*\
Searches and retrieves security signals from Datadog Security Monitoring, including Cloud SIEM signals, App & API Protection signals, and Workload Protection signals.

- Show me security signals from the last 24 hours.
- Find high-severity security signals related to my production environment.
- List Cloud SIEM signals triggered by suspicious login attempts.

### `security_findings_schema`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Read`*\
Returns the schema (available fields and their types) for security findings. Call this first before using `analyze_security_findings` to discover queryable fields. Supports filtering by finding type and controlling response size.

- What fields are available for security findings?
- Show me the schema for library vulnerability findings.
- Get the full schema including descriptions for misconfiguration findings.

### `analyze_security_findings`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Read` and `Timeseries`*\
Primary tool for analyzing security findings using SQL queries. Queries live data from the last 24 hours with flexible SQL aggregations, filtering, and grouping. Call `security_findings_schema` first to discover available fields, then use this tool to query.

- Show me the top 10 rules with the most critical findings.
- Count open findings grouped by severity and finding type.
- Find library vulnerabilities with exploits available, grouped by resource.

### `search_security_findings`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Read`*\
Fallback tool for retrieving full security finding details. Prefer `analyze_security_findings` for most analysis tasks. Use this tool only when you need complete finding objects or when SQL queries are insufficient.

- Get full details for critical findings in my AWS environment.
- Retrieve complete finding objects for a specific rule.
- List all open identity risk findings with full metadata.

## Software Delivery

Tools for interacting with Software Delivery ([CI Visibility][48] and [Test Optimization][24]).

### `search_datadog_ci_pipeline_events`
*Toolset: **software-delivery***\
*Permissions Required: `CI Visibility Read`*\
Searches CI events with filters and returns details on them.

- Show me all the pipelines for my commit `58b1488`.
- Show me the latest pipeline failure in branch `my-branch`.
- Propose a fix for the job `integration-test` that fails every time on my branch `my-branch`.

### `aggregate_datadog_ci_pipeline_events`
*Toolset: **software-delivery***\
*Permissions Required: `CI Visibility Read`*\
Aggregates CI pipeline events to produce statistics, metrics, and grouped analytics.

- What's the average job duration for the last 7 days?
- How many failed pipelines have there been in the last 2 weeks?
- Show me the 95th percentile of pipeline duration grouped by pipeline name.

### `get_datadog_flaky_tests`
*Toolset: **software-delivery***\
*Permissions Required: `Test Optimization Read`*\
Searches Datadog [Test Optimization][24] for flaky tests and returns triage details (failure rate, category, owners, history, CI impact), with pagination and sorting.

- Find active flaky tests for the checkout service owned by `@team-abc`, sorted by failure rate.
- Show flaky tests on branch `main` for repo `github.com/org/repo`, most recent first.
- List flaky tests in the `timeout` category with high failure rate (50%+) so I can prioritize fixes.

### `aggregate_datadog_test_events`
*Toolset: **software-delivery***\
*Permissions Required: `Test Optimization Read`*\
Aggregates Datadog Test Optimization events to quantify reliability and performance trends with aggregation functions, optional metrics, group-by facets, and configurable test levels.

- Count the number of failed tests over the last week, grouped by branch.
- Show me the 95th-percentile duration for each test suite to identify the slowest ones.
- Count all passing and failing tests, grouped by code owners.

### `search_datadog_test_events`
*Toolset: **software-delivery***\
*Permissions Required: `Test Optimization Read`*\
Searches [Test Optimization][24] test events with filters and returns details on them.

- Show me failed tests on branch `main` from the last 24 hours.
- Get test executions for commit `abc123` to see what passed and failed.
- Show me all flaky test runs for the checkout service.
- Find tests owned by `@team-name` that are failing.

### `get_datadog_code_coverage_branch_summary`
*Toolset: **software-delivery***\
*Permissions Required: `Code Coverage read`*\
Fetches aggregated code coverage summary metrics for a repository branch, including total coverage, patch coverage, and service/codeowner breakdowns.

- What's the code coverage on the `main` branch for `github.com/my-org/my-repo`?
- Show me the coverage summary for the `release/1.x` branch of `github.com/my-org/my-repo`.

### `get_datadog_code_coverage_commit_summary`
*Toolset: **software-delivery***\
*Permissions Required: `Code Coverage read`*\
Fetches aggregated code coverage summary metrics for a repository commit, including total coverage, patch coverage, and service/codeowner breakdowns.

- Show me the code coverage for commit `abc123abc123abc123abc123abc123abc123abcd` in `github.com/my-org/my-repo`.
- What's the patch coverage for the latest commit on my branch?

## Synthetics

Tools for interacting with Datadog [Synthetic tests][47].

### `get_synthetics_tests`
*Toolset: **synthetics***\
*Permissions Required: `Synthetics Read`*\
Searches Datadog Synthetic tests.

- Help me understand why the Synthetic test on endpoint `/v1/my/tested/endpoint` is failing.
- There is an outage; find all the failing Synthetic tests on the domain `api.mycompany.com`.
- Are Synthetic tests on my website `api.mycompany.com` still working in the past hour?

### `edit_synthetics_tests`
*Toolset: **synthetics***\
*Permissions Required: `Synthetics Global Variable Read` and `Synthetics Read` and `Synthetics Write`*\
Edits Datadog Synthetic HTTP API tests.

- Improve the assertions of the Synthetic test defined on my endpoint `/v1/my/tested/endpoint`.
- Pause the test `aaa-bbb-ccc` and set the locations to only European locations.
- Add my team tag to the test `aaa-bbb-ccc`.

### `synthetics_test_wizard`
*Toolset: **synthetics***\
*Permissions Required: `Synthetics Global Variable Read` and `Synthetics Read` and `Synthetics Write`*\
Preview and create Datadog Synthetics HTTP API Tests.

- Create Synthetics tests on every endpoint defined in this code file.
- Create a Synthetics test on `/path/to/endpoint`.
- Create a Synthetics test that checks if my domain `mycompany.com` stays up.

## Workflows

Tools for [Workflow Automation][39], including listing, inspecting, executing, and configuring workflows for agent use.

### `list_datadog_workflows`
*Toolset: **workflows***\
*Permissions Required: `Workflows Read`*\
Lists and searches [Workflow Automation][39] workflows. Supports filtering by name, tags, owner, handle, and trigger type (such as `monitor`, `schedule`, `api`, or `incident`). Results can be sorted by fields like `name` or `updatedAt`.

- Show me all published workflows tagged with `team:platform`.
- List workflows that have an agent trigger configured.
- Find all workflows related to incident response owned by Alice Smith.

### `get_datadog_workflow`
*Toolset: **workflows***\
*Permissions Required: `Workflows Read`*\
Retrieves detailed information about a specific workflow, including its triggers, steps, connections, and input schema.

- Get the full details for workflow `00000000-0000-0000-0000-000000000000`.
- Show me the input parameters and steps for the deployment rollback workflow.
- What triggers are configured for this workflow?

### `execute_datadog_workflow`
*Toolset: **workflows***\
*Permissions Required: `Workflows Run`*\
Executes a published workflow that has an agent trigger, with optional input parameters matching the workflow's input schema.

- Run the incident escalation workflow for service `checkout-api` with severity `high`.
- Execute the deployment rollback workflow for the payments service.
- Trigger the On-Call notification workflow with the context from this investigation.

**Note**: The workflow must be published and have an agent trigger configured. Use `update_datadog_workflow_with_agent_trigger` to add one if needed.

### `get_datadog_workflow_instance`
*Toolset: **workflows***\
*Permissions Required: `Workflows Read`*\
Retrieves the status and details of a workflow execution instance, including step results and outputs.

- What's the status of the workflow execution I triggered?
- Did the incident escalation workflow complete successfully?
- Show me the detailed outputs from workflow instance `00000000-0000-0000-0000-000000000000`.

### `update_datadog_workflow_with_agent_trigger`
*Toolset: **workflows***\
*Permissions Required: `Workflows Write`*\
Adds an agent trigger to a workflow and publishes it, enabling the workflow to be executed by AI agents.

- Add an agent trigger to the deployment rollback workflow so I can run it from here.
- Configure the incident response workflow to be triggerable by an agent.

[1]: /bits_ai/mcp_server/setup#toolsets
[15]: /api/latest/events/
[24]: /tests/
[26]: /database_monitoring/
[31]: /network_monitoring/cloud_network_monitoring/
[32]: /network_monitoring/devices/
[38]: /service_management/case_management/
[39]: /actions/workflows/
[41]: /ddsql_editor/
[42]: /ddsql_reference/ddsql_default/
[45]: /reference_tables/
[46]: /dashboards/
[47]: /synthetics/
[48]: /continuous_integration/
[49]: /error_tracking/
[50]: /tracing/
[51]: /feature_flags/
[53]: /security/threats/security_signals/
[54]: /security/misconfigurations/findings/
