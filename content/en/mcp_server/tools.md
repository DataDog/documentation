---
title: Datadog MCP Server Tools
description: "Browse all tools available in the Datadog MCP Server, organized by toolset, with example prompts."
aliases:
- /bits_ai/mcp_server/tools/
algolia:
  tags: ["mcp", "mcp server", "mcp tools", "tools"]
  rank: 70
further_reading:
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "mcp_server/setup"
  tag: "Documentation"
  text: "Set Up the Datadog MCP Server"
---

The following tools are available in the Datadog MCP Server. Each entry includes the required toolset, permissions, and example prompts. Tools are grouped by [toolsets][1], which allow you to use only the tools you need, saving valuable context window space.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
To enable product-specific tools, include the `toolsets` query parameter at the end of the endpoint URL you use to connect to the Datadog MCP Server. For example, based on your selected [Datadog site][2] ({{< region-param key="dd_site_name" >}}), this URL enables _only_ APM and Agent Observability tools:

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

You can also exclude specific tools with the `omit_tools` query parameter.

[2]: /getting_started/site/
{{< /site-region >}}

See [Set Up the Datadog MCP Server][1] for more information on connecting to the MCP Server, enabling toolsets, and omitting specific tools.

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
Lists services in Datadog's Catalog with details and team information.

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
*Toolset: **core**, **rum***\
*Permissions Required: `RUM Apps Read`*\
Search Datadog RUM events using advanced query syntax.

- Show JavaScript errors and console warnings in RUM.
- Find pages that are loading slowly (more than 3 seconds).
- Show recent user interactions on product detail pages.

### `aggregate_rum_events`
*Toolset: **core**, **rum***\
*Permissions Required: `RUM Apps Read`*\
Aggregates RUM events to compute counts, sums, averages, min, max, cardinality, and percentiles, with grouping support. Use this for statistical analysis and trend data, not for inspecting individual events.

- Count JavaScript errors by page in the last 24 hours.
- Show me the p95 loading time grouped by country for my main RUM application.
- How many sessions had a Core Web Vitals failure this week?

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

### `apm_query_trace`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Queries a trace's span data to filter, aggregate, or rank spans, such as finding the highest self-time spans or tracing an error to its origin service.

- Find the top 5 spans by self-time in trace `abc123`.
- Show all error messages and their originating services in trace `abc123`.
- Which database calls in this trace took longer than 500ms?

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

### `apm_latency_bottleneck_summary`
*Toolset: **apm***\
*Permissions Required: `APM Read`*\
Analyzes latency bottlenecks across traces in an anomaly period using self-time calculations. Identifies which service and resource combinations consume the most self-time, detects cascading call patterns, and surfaces root causes of latency spikes.

- Summarize the latency bottlenecks for the checkout service between 2pm and 3pm today.
- What is consuming the most self-time in the payments service during this latency spike?
- Identify which endpoints are the top bottlenecks for `service:api` between 10:00 and 10:30.

### `get_change_stories`
*Toolset: **apm***\
Retrieves change stories from the Change Tracking API for APM services. Use this to identify what changed (deployments, feature flags, configuration updates, and infrastructure events) during a time range and correlate changes with performance issues or incidents.

- Show me recent deployments and changes for the payments service.
- What infrastructure changes happened around the time of this latency spike?
- Find feature flag and configuration changes for the checkout service in the last hour.

### `semantic_search_change_stories`
*Toolset: **apm***\
Searches change stories using natural language and AI-powered semantic search. Use this to find feature flag or deployment changes related to a behavior, a user-reported issue, or a part of the product you are investigating.

- What changed recently that could affect dashboard loading for trial users?
- Which flags might impact authentication in the billing settings page?
- Find changes related to missing telemetry data in the last week.

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

## Cloud Cost Management

Tools for [Cloud Cost Management][64], including listing cost-saving recommendations ranked by estimated potential daily savings.

### `cost_recommendations`
*Toolset: **cost***\
*Permissions Required: `Cloud Cost Management Read`*\
Lists an organization's Cloud Cost Management cost-saving recommendations, ranked by estimated potential daily savings (highest first). Supports faceted filtering by cloud provider, recommendation type, status, savings threshold, and resource tags, along with pagination and a summary of the total count and total potential daily savings.

#### Examples of queries:

- What are my top cloud cost-saving recommendations?
- How much could I save per day, and how many open recommendations do I have?
- Which of our Kubernetes cluster optimizations does the team already have underway?

## Code Execution

A single tool that runs agent-authored TypeScript in a Datadog-managed sandbox with direct access to Datadog APIs, for multi-signal investigation and ad-hoc data exploration in one call.

<div class="alert alert-info">The <code>code-exec</code> toolset is in Preview. <a href="https://www.datadoghq.com/product-preview/mcp-codexec/">Sign up</a> for the preview or contact <a href="/help">Datadog support</a> to request access.</div>

Code executed by this toolset runs against your Datadog APIs using your own user identity. The sandbox applies your existing [role permissions][56] to every API call, so an agent can only read or modify data that you can already access in Datadog.

### `execute_code`
*Toolset: **code-exec***\
*Permissions Required: Any product-specific role permissions needed to access the underlying Datadog resources the executed code interacts with (for example, `Logs Read` to read logs).*\
Executes AI agent-authored TypeScript in a Datadog-managed sandbox. The code receives a `dd.*` namespace with helpers for querying logs, metrics, traces, services, change events, incidents, monitors, dashboards, and other Datadog APIs, and returns a structured value back to the agent. This can reduce the number of round-trips needed for multi-signal investigations and ad-hoc data exploration.

- For the `checkout-api` service in the last two hours, pull error logs, latency metrics, and recent deployments together and tell me which deployment lines up with the error spike.
- Compare error-span counts, monitor alerts, and config changes for the `payments` service over the last day, and identify anything that moved at the same time.
- For `auth-service`, correlate the top error patterns in logs with CPU and memory metrics from the last hour to see whether errors track resource pressure.

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

## Data Observability

Tools for [Data Observability][70], including searching data entities in the catalog, navigating data lineage, monitoring data quality, analyzing Spark and Databricks jobs, and managing entity metadata.

### `search_data_entities`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Searches for data entities in the data catalog. Supports filtering by name (with wildcards), entity type, platform, schema, database, and account. Entity types include tables, columns, schemas, databases, dbt models, BI dashboards, Spark jobs, S3 buckets, and more. Use `get_data_catalog_schema` to discover available platforms and entity types.

- Find tables named `orders` in the Snowflake platform.
- Search for dbt models starting with `stg_` in the analytics database.
- List all schemas in the `analytics` Snowflake database.

### `get_data_catalog_schema`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Returns the entity type schema for every platform the organization has data in. Discovers active platforms (Snowflake, BigQuery, Databricks, dbt, and so on), their entity types, the containment hierarchy, the filterable attribute names, and the default metrics available for each entity type (such as `dataset.freshness`). Call this at the start of a data catalog conversation to learn which platforms, entity types, and filters are available.

- What platforms and entity types are in my data catalog?
- Which attributes can I filter on when searching for Snowflake tables?

### `get_data_entity_details`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Fetches full details and attributes for one or more data entities by their entity IDs. Returns owner, tags, display name, platform, schema, database, account, and all other attributes. Use `search_data_entities` first to find entity IDs.

- Get full details for entity `<entity_id>`.
- Show me the owner and tags for this Snowflake table.

### `get_data_entity_hierarchy`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Fetches the containment hierarchy (ancestors and descendants) for one or more entities. Use this for containment navigation, such as finding which schema and database a table belongs to, or listing the columns in a table. This tool is for containment, not data lineage (use `get_data_entity_lineage` for lineage).

- What schema and database does this table belong to?
- List all columns in the `orders` table.
- What tables are in the `landing` schema?

### `get_data_entity_lineage`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Fetches the live reachable lineage subgraph from one or more anchor entities. Returns upstream or downstream data-flow relationships (nodes and edges) up to a configurable depth. For large or unknown graphs, use `summarize_data_entity_lineage` first.

- Show me what downstream tables depend on the `raw_orders` table.
- What data sources feed into the `fct_revenue` table?
- Trace lineage from `stg_orders` downstream with a depth of 3.

### `summarize_data_entity_lineage`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Gets aggregate statistics about the lineage graph reachable from anchor entities, such as counts and breakdowns by node type, depth, and attributes, without returning the full node and edge payload. Use this before `get_data_entity_lineage` when working with large or unknown graphs.

- How many tables does `fct_revenue` depend on upstream?
- What types of entities are downstream from this Spark job?
- Give me a summary of the lineage graph from `raw_orders`.

### `rank_data_entities_by_lineage_degree`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Ranks entities by their transitive lineage connectivity using a pre-built snapshot. Returns entities such as tables, dashboards, and jobs ranked by how many other entities they connect to (downstream or upstream). Useful for identifying the most critical or widely consumed tables.

- Which tables have the most downstream consumers?
- Rank tables by upstream dependency count to find raw ingestion points.
- Find the most widely consumed entities in the data catalog.

### `get_data_observability_monitor`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read`, `Timeseries`, and `APM Read`*\
Retrieves data quality metrics timeseries data for a given data observability monitor ID. For anomaly monitors, the response includes upper and lower bounds that define the expected normal range.

- Get the row count timeseries for monitor `12345` on the `orders` table.
- Show me the anomaly bounds for monitor `67890` over the last 24 hours.

### `get_spark_job_health`
*Toolset: **data-observability***\
*Permissions Required: `APM Read`*\
Retrieves detailed health metrics for a single Spark or Databricks job run, including duration, CPU time, executor allocation, memory usage, shuffle read, spill, and skew. Accepts either a trace ID or a job name to identify the run.

- Show me the health metrics for the latest run of the `process_orders` Spark job.
- What were the worst-performing stages in Spark job trace `abc123`?
- Find Databricks job runs for `nightly_aggregation` in the last 7 days.

### `get_spark_sql_plan`
*Toolset: **data-observability***\
*Permissions Required: `APM Read`*\
Retrieves the Spark SQL physical execution plan from a `spark.stage` span. Shows node types (Exchange, SortMergeJoin, HashAggregate, and so on), join strategies, shuffle and partitioning information, and child node relationships. Use `get_spark_job_health` to find stage span IDs.

- Show me the SQL execution plan for stage span `def456` in trace `abc123`.
- What join strategy is used in this Spark stage?
- Inspect the physical plan for the slowest stage in this job.

### `get_warehouse_query_history`
*Toolset: **data-observability***\
*Permissions Required: `Logs Read Data` and `Logs Read Index Data`*\
Fetches recent queries that touched one or more data entities, in reverse chronological order. Supports filtering by access type (read or write) and time range. Use `search_data_entities` to find entity IDs first.

- Who has been querying the `orders` table in the last 7 days?
- Show me write operations on the `fct_revenue` table from yesterday.
- What SQL queries have touched this entity recently?

### `get_popular_warehouse_tables_by_query_frequency`
*Toolset: **data-observability***\
*Permissions Required: `Logs Read Data`, `Logs Read Index Data`, and `APM Read`*\
Ranks database tables by query activity, broken out by user type (human analysts, BI tools, orchestrators, ETL tools, and internal apps). Useful for identifying business-critical tables and prioritizing monitoring coverage.

- Which tables are most queried by human analysts in Snowflake?
- What are the top tables powering BI dashboards?
- Show me the most frequently queried tables by orchestration tools like dbt and Airflow.

### `get_entity_descriptions`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Gets the custom user-defined descriptions for data entities by their IDs. Returns a map of entity ID to description with created and updated timestamps.

- Show me the custom descriptions for these three tables.
- What description has been set for entity `<entity_id>`?

### `update_entity_description`
*Toolset: **data-observability***\
*Permissions Required: `Data Observability Catalog Write`*\
Sets or updates the custom user-defined description for a data entity.

- Set the description of the `orders` table to "Contains all customer orders."
- Update the description for entity `<entity_id>`.

### `get_entity_tags`
*Toolset: **data-observability***\
*Permissions Required: `Monitors Read` or `APM Read`*\
Gets the custom user-defined tags for data entities. Returns entity IDs with their associated key:value tags. These are custom tags distinct from built-in entity attributes.

- Show me the custom tags on the `orders` table.
- What tags have been applied to these entities?

### `update_entity_tags`
*Toolset: **data-observability***\
*Permissions Required: `Data Observability Catalog Write`*\
Adds or removes custom user-defined tags on data entities. Tags are key:value strings.

- Add the tag `team:data-eng` to the `orders` table entity.
- Remove the `env:staging` tag from these entities.

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

### `analyze_datadog_error_tracking_errors`
*Toolset: **error-tracking***\
*Permissions Required: `Error Tracking Read` and `Timeseries`*\
Analyzes Datadog Error Tracking errors using SQL queries for counting, aggregations, and numerical analysis. Operates on individual error samples, not Issues (groups of errors).

- Count errors by service in the last hour.
- Show me the top error types in the checkout service over the past week.
- Break down errors by version to identify which deployment introduced an issue.

### `update_datadog_error_tracking_issue`
*Toolset: **error-tracking***\
*Permissions Required: `Cases Read`, `Cases Write`, `Error Tracking Read`, and `Error Tracking Write`*\
Updates the state or assignee of an Error Tracking Issue in Datadog.

- Mark Error Tracking Issue `550e8400-e29b-41d4-a716-446655440000` as resolved.
- Assign Error Tracking Issue `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f` to me.
- Set the state of Error Tracking Issue `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f` to ignored.

### `manage_datadog_error_tracking_issue_comments`
*Toolset: **error-tracking***\
*Permissions Required: `Cases Read`, `Cases Write`, `Error Tracking Read`, and `Error Tracking Write`*\
Adds, updates, or deletes a comment on a Datadog Error Tracking Issue.

- Add a comment to Error Tracking Issue `550e8400-e29b-41d4-a716-446655440000` saying "Investigating this now".
- Update the comment we just added to say "Fixed in version 2.3.1".
- Delete the comment we just added from that issue.

## Experiments

Tools for managing and analyzing [Experiments][62], including creating and concluding experiments, running diagnostics, and investigating metric movements.

<div class="alert alert-info">The <code>experiments</code> toolset is not enabled by default. See <a href="/mcp_server/setup">Set Up the Datadog MCP Server</a> for instructions on enabling toolsets.</div>

### `list_experiments`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`*\
Lists experiments for the organization, with optional name search, limit, and offset for pagination.

- Show me all running experiments.
- Find experiments with "checkout" in the name.

### `get_experiment`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`*\
Gets a single experiment by ID, including status, linked feature flag, subject type, primary metric, assignment dates, and decision.

- Get the details for experiment `abc123`.
- What is the current status and linked flag for experiment `abc123`?

### `create_experiment`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Write`*\
Creates a new experiment with a name, hypothesis, subject type, and primary metric.

- Create an experiment called "New Checkout Flow" to test whether the redesign improves conversion rate.

### `link_feature_flag_to_experiment`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Write`*\
Links a feature flag to an experiment.

- Link feature flag `new-checkout-flow` to experiment `abc123`.

### `start_experiment`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Write`*\
Starts an experiment. Requires a linked flag with an active allocation, a subject type, and a primary metric.

- Start experiment `abc123`.

### `conclude_experiment`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Write`*\
Concludes a running experiment with a permanent winning variant decision.

- Conclude experiment `abc123` with the treatment variant as the winner.

### `cancel_experiment`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Write`*\
Cancels a running experiment with a required reason.

- Cancel experiment `abc123` because an SRM issue was detected.

### `get_experiment_diagnostics`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`*\
Returns a health summary for an experiment before interpreting results: sample ratio mismatch (SRM) status, total subjects, per-variant exposure counts and fractions, and per-metric health including unreliable and zero-data metrics. Call this before `get_experiment_results` — if `srm.has_warning` is true, variant-level comparisons are not safe to interpret.

- Run diagnostics on experiment `abc123` before I look at the results.
- Is there a sample ratio mismatch in experiment `abc123`?

### `get_experiment_results`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`*\
Returns computed per-variant, per-metric results. The `verdict` field (`better`, `worse`, `inconclusive`, or `unreliable`) is authoritative — do not recalculate significance from raw p-values or confidence intervals.

- Show me the results for experiment `abc123`.
- What is the verdict on the primary metric for experiment `abc123`?

### `explore_experiment_results`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*\
Segments results by an assignment property (device type, country, plan tier, and so on) or over time. Use after `get_experiment_results` for deeper analysis.

- Break down the results for experiment `abc123` by device type.
- How did the lift for experiment `abc123` trend over the last two weeks?

### `list_experiment_segmentation_properties`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*\
Lists the assignment properties an experiment can be split by. Call this before `explore_experiment_results` to get valid property IDs — do not guess them.

- What segmentation properties can I use to break down experiment `abc123`?

### `get_experiment_segmentation_property_values`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*\
Returns the concrete values for a segmentation property (for example, `["mobile", "desktop", "tablet"]` for device type). Use this before filtering in `explore_experiment_results` to avoid invalid filter strings.

- What values are available for the device type property in experiment `abc123`?

### `get_metric_definition`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Metrics Read`*\
Returns the definition of an experiment metric — the underlying event query, data source, and the recommended Datadog MCP tool for investigating why the metric moved. For `datadog`-sourced metrics, the response includes a `recommended_tool_call` field with the structured parameters needed to query the raw event data. Not for Datadog infrastructure or APM metrics; use `get_datadog_metric` for those.

- What is the event query behind the primary metric for experiment `abc123`?
- Which MCP tool should I use to investigate why this metric moved?

### `diagnose_experiment_run_failure`
*Toolset: **experiments***\
*Permissions Required: `Product Analytics Experiments Read`*\
Diagnoses why the latest (or a specific) analysis pipeline run for an experiment failed. Returns the root-cause task, a categorized failure explanation, and actionable next steps. Use `get_experiment_diagnostics` for result quality and SRM issues instead.

- Why did the latest analysis run for experiment `abc123` fail?
- Diagnose the pipeline failure for experiment `abc123`.

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

## Kubernetes

Tools for searching and describing [Kubernetes][55] resources and retrieving manifests across all clusters.

### `search_datadog_k8s_resources`
*Toolset: **kubernetes***\
*Permissions Required: `Hosts Read` and `Teams Read`*\
Searches for [Kubernetes][55] resources across all clusters. Use this tool instead of `kubectl` to determine the state of Kubernetes resources such as deployments, pods, nodes, etc. This tool does not require local cluster access, works across all clusters, and returns enriched data with tags. You can include specific tag keys on each result, and include parent resource names to investigate relationships between resources (for example, the deployment a pod belongs to).

- Show me all pods in the `production` namespace with `CrashLoopBackOff` status.
- Find deployments with in-progress rollouts in the `general2` cluster.
- List all nodes in my cluster sorted by CPU usage.
- Group deployments by `service` and `env` to see how my services are distributed across environments.

### `describe_datadog_k8s_resource`
*Toolset: **kubernetes***\
*Permissions Required: `Hosts Read`*\
Gets detailed information about a specific [Kubernetes][55] resource, including resource-specific details such as CPU and memory requests and limits, and optionally tags, labels, annotations, manifest history, parent resources, and a deep link to the [Kubernetes Explorer][55]. Use this tool instead of `kubectl describe`. Identify a resource by its UID from a previous search or by providing resource identifiers (cluster, namespace, and resource name). For the full raw manifest, use `get_datadog_k8s_manifest`.

- Describe pod `my-app` in cluster `prod`, namespace `default`.
- Get details for deployment `api-server` in namespace `default`, cluster `staging`.
- Show me the tags and annotations for this Kubernetes resource.

### `get_datadog_k8s_manifest`
*Toolset: **kubernetes***\
*Permissions Required: `Hosts Read`*\
Retrieves the YAML manifest for a specific [Kubernetes][55] resource. Use this tool instead of `kubectl get -o yaml`. Supports extracting specific subtrees with a `kubectl` JSONPath expression and a concise mode that omits `status` and `managedFields` to reduce response size.

- Get the manifest for pod `my-app` in cluster `prod`, namespace `default`.
- Show me the container ports for deployment `api-server` in namespace `default`, cluster `staging`.
- Get the container images from the manifest of pod `my-app`.

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
Guides you through onboarding Agent Observability in Datadog.

- Help me set up Agent Observability for my AI application.

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

## Product Analytics

Tools for querying [Product Analytics][68] data, including org vocabulary lookup, semantic search, aggregations, journeys, pathways, and retention.

<div class="alert alert-info">The <code>product-analytics</code> toolset is not enabled by default. See <a href="/mcp_server/setup">Set Up the Datadog MCP Server</a> for instructions on enabling toolsets.</div>

### `search_product_analytics_events`
*Toolset: **product-analytics***\
*Permissions Required: `RUM Apps Read`*\
Finds Product Analytics views and actions matching a natural-language description using semantic search, including org-curated labeled actions.

- Find the view and action for adding an item to the cart.
- What's the event for completing checkout?

### `search_product_analytics_org_entities`
*Toolset: **product-analytics***\
*Permissions Required: `RUM Apps Read`*\
Looks up org-specific Product Analytics entities by name or keyword (feature flags, context attribute keys, saved charts, and segments).

- Find the segment for "power users".
- What feature flags are available to filter Product Analytics data by?

**Note**: Use the segment filter expression returned by this tool verbatim rather than constructing one manually.

### `get_product_analytics_saved_chart`
*Toolset: **product-analytics***\
*Permissions Required: `RUM Apps Read` and `Product Analytics Saved Widgets Read`*\
Retrieves the full definition of a saved Product Analytics chart by ID, including its query parameters, filters, and time interval. Use `search_product_analytics_org_entities` first to find the chart ID.

- Load the saved chart `abc-123-def` and show me its query parameters.
- Reproduce the "weekly retention" saved chart with an updated time range.

### `aggregate_product_analytics_events`
*Toolset: **product-analytics***\
*Permissions Required: `RUM Apps Read`*\
Aggregates Product Analytics event data as a scalar or timeseries, supporting count, cardinality, average, sum, min, max, and percentile calculations with optional grouping.

- How many sessions did we have today?
- Show me daily active users over the past 30 days.

### `run_product_analytics_journey`
*Toolset: **product-analytics***\
*Permissions Required: `RUM Apps Read`*\
Runs funnel, timeseries, scalar, list, and drop-off queries across a multi-step user journey, tracked at the user, session, or account level.

- What's the conversion rate from viewing a product to completing checkout?
- Show me the users who dropped off between adding to cart and checkout.

### `run_product_analytics_pathway`
*Toolset: **product-analytics***\
*Permissions Required: `RUM Apps Read`*\
Runs a Sankey (pathway) analysis showing how users navigate between views, starting from a source view or leading to a target view.

- What are the most common paths users take after landing on the home page?
- Show me the pathways that lead to the checkout page.

### `run_product_analytics_retention`
*Toolset: **product-analytics***\
*Permissions Required: `RUM Apps Read`*\
Runs retention queries on Product Analytics data as a cohort grid, retention curve, timeseries, or scalar value, tracked at the user or account level.

- Show me the weekly retention grid for users who signed up in the last quarter.
- What's the day-7 retention rate for users who joined in January?

## Profiling
Read-only tools for discovering, exploring, and analyzing [Continuous Profiler][62] data across services, runtimes, and traces.

### `get_profiling_profile_types`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns available profile types and families for a given query context (query string and time range) or a trace/span context. Use this first to discover what is queryable.

- Show me what profile types are available for `service:checkout-api` in the last hour.
- What profile families are available for trace `7d5d747be160e280504c099d984bcfe0`?
- List the profile types available in my production environment.

### `get_profiling_services`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Lists profiled services and their profiling families in scope. Results are unordered and do not imply importance or activity level.

- List all services with profiling enabled in production.
- Show me which services have JVM profiling data.
- What services are profiled in the payments team's environment?

### `get_profiling_runtime_ids`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns individual profiled runtime IDs (processes or containers) in scope. Defaults to the top-1 by CPU; the limit parameter controls how many.

- Show me the top 10 runtime IDs by CPU for `service:checkout-api`.
- Get the highest-CPU runtime for my Go service.
- List profiled runtime IDs for the payments service in the last hour.

### `get_profiling_service_insights`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns pre-computed service insights, including a high-level summary, contextual signals (affected methods, packages, processes), and recommended next steps.

- Show me profiling insights for `service:checkout-api`.
- What performance issues are flagged on the payments service?
- Get profiling recommendations for my Java service.

### `explore_profiling_flame_graph`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns top-N stack traces by value contribution for a given profile type. Supports filtering by frame, endpoint, or attribute regex. Single-service. Accepts either `service:family` or a traceContext.

- Show me the CPU flame graph for `service:checkout-api` over the last hour.
- Find the top allocation hotspots for the payments service.
- Explore the flame graph for trace `7d5d747be160e280504c099d984bcfe0`.

### `explore_profiling_call_graph`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns a call-graph view (caller-to-callee edges) of hot functions for a given profile type. Defaults to the top 20 nodes, a 5% cutoff, and 5 edges per node. Single-service.

- Show me the call graph for hot CPU functions in `service:checkout-api`.
- What functions call into the slowest paths in my Go service?
- Get the allocation call graph for the payments service.

### `explore_profiling_timeline`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns a timeline of lane groups (threads, garbage collection, and so on) with CPU and I/O activity. Supports a critical-path mode (Go-only; requires traceContext) to identify latency bottlenecks within a span.

- Show me the thread timeline for `service:checkout-api` over the last 15 minutes.
- Find the critical path for trace `abc123` in my Go service.
- Explore garbage collection and CPU activity around the latency spike.

### `get_profiling_timeseries`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns profiling data aggregated as timeseries (rate metrics). Best for trends, cross-service comparison, and regression detection. Supports groupBy on frame fields, contexts, and tags.

- Show me CPU profile timeseries for `service:checkout-api` over the last 24 hours.
- Compare allocation rates across my Java services grouped by version.
- Detect profile regressions over the last week grouped by deployment.

### `get_profiling_tag_names`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Discovers available tag names (such as service, host, env, version, family, runtime-id, kube_*) for filtering profiling data. Returns up to 50 results, sorted by relevance.

- What tag names are available for filtering profiling data in production?
- List profiling tag names for `service:checkout-api`.

### `get_profiling_tag_values`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns values for a specific profiling tag (for example, all values of the service tag). Returns up to 50 results, sorted by frequency.

- Which versions of the payments service do we have profiling data for in the past hour?
- What are the two datacenters with most profiling data available for `service:checkout-api`?

### `get_profiling_fields`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Discovers frame and context facet fields (such as `@stack.function` and `@labels.trace_endpoint`) usable in `get_profiling_timeseries` groupBy and filter parameters. Scoped by sampleType.

- What frame fields can I group by for CPU profiles?
- Show me available facet fields for allocation profiles.
- List context fields I can filter timeseries by for `service:checkout-api`.

### `get_profiling_field_values`
*Toolset: **profiling***\
*Permissions Required: `Continuous Profiler Read`*\
Returns values for a specific frame or context field discovered with `get_profiling_fields`. Sorted by frequency.

- Show me the top values for `@stack.function` in my CPU profiles.
- Get the top endpoint values from `@labels.trace_endpoint`.
- List values for the package field in allocation profiles.

## Reference Tables

Tools for managing [Reference Tables][45], including listing tables, reading rows, upserting rows, and creating tables synced from cloud storage files or as empty tables you populate directly.

### `list_reference_tables`
*Toolset: **reference-tables***\
Lists and searches [Reference Tables][45] in the organization, with optional filtering by name and sorting.

- List all reference tables in my organization.
- Find reference tables with `customer` in the name.
- Show me the reference tables sorted by last update time.

### `list_reference_table_rows`
*Toolset: **reference-tables***\
Lists all rows in a reference table with optional filtering and pagination. Use `list_reference_tables` first to find the table ID and schema.

- List all rows in the `ip_allowlist` reference table.
- Show me the first 50 rows of the `customer_tiers` table.

### `get_reference_table_rows`
*Toolset: **reference-tables***\
Retrieves specific rows from a reference table by their primary key values. Use `list_reference_tables` first to find the table ID and schema.

- Get the rows with primary keys `user001` and `user002` from the users reference table.
- Look up the entry for account ID `acct-123` in the accounts table.

### `append_reference_table_rows`
*Toolset: **reference-tables***\
Appends new rows to an existing reference table. This operation only adds rows and does not modify or delete existing data. Each row must include all required fields from the table's schema, including the primary key field. If rows may already exist, use `upsert_reference_table_rows` instead.

- Add a new row for user `user003` with name `Carol` and age `28` to the users table.
- Append these five new account entries to the accounts reference table.

### `upsert_reference_table_rows`
*Toolset: **reference-tables***\
Inserts new rows or updates existing rows in a reference table. If a row with the same primary key already exists, its values are overwritten. Use this instead of `append_reference_table_rows` when rows may already exist.

- Update the tier for account `acct-123` in the `customer_tiers` table.
- Add or update these ten service entries in the `service_catalog` reference table.

### `create_reference_table`
*Toolset: **reference-tables***\
Creates a new reference table. Supports two modes: `LOCAL_FILE` creates an empty table you can populate with `append_reference_table_rows` or `upsert_reference_table_rows`. Cloud-backed modes (`S3`, `GCS`, `AZURE`) sync from a CSV file in Amazon S3, Google Cloud Storage, or Azure Blob Storage. Only `INT32` and `STRING` field types are supported.

- Create an empty reference table called `service_catalog` with fields for service name, owner team, and tier.
- Create a reference table called `ip_allowlist` from the file `allowlist.csv` in my S3 bucket `my-data-bucket`.
- Set up a new GCS-backed reference table called `customer_tiers` with automatic sync enabled.

## Remote Actions

<div class="alert alert-info">The <code>remote-actions</code> toolset is in Preview. <a href="https://www.datadoghq.com/product-preview/datadog-agent-mcp/">Sign up for access.</a></div>

Tools for running read-only diagnostics on hosts instrumented with the Datadog Agent. Commands reach the host through the Private Action Runner (PAR) using a [restricted shell interpreter][63]. All commands run as safe Go builtins with no write access, no external binary execution, and no network egress. The allowed command list is controlled per Agent version from the Datadog backend.

### `datadog_remote_action_restricted_shell_run_command`
*Toolset: **remote-actions***\
*Permissions Required: `Connections Resolve` and `Private Action Runner Contribute`*\
Runs a read-only shell command on a specified host. Supported commands include: `cat`, `ls`, `head`, `tail`, `find`, `grep`, `sed`, `cut`, `sort`, `uniq`, `wc`, `ping`, `ss`, and `ip`. Supports pipes, loops, conditionals, variable assignment, and globbing.

- Show me the last 100 lines of the Datadog Agent log on host `prod-web-01`.
- Find all ERROR entries in `/var/log/app/` on host `db-replica-3` from the last hour.
- Get the contents of `/etc/datadog-agent/datadog.yaml` on host `prod-worker-07`.

## RUM

Tools for [Real User Monitoring][58], including resolving applications, summarizing performance, surfacing aggregated insights for views, exploring metrics, inspecting application configuration, managing retention filters, and managing custom RUM metrics.

### `search_rum_applications`
*Toolset: **rum***\
*Permissions Required: `RUM Apps Read`*\
Lists your RUM applications and resolves the `application_id` to use for subsequent RUM tool calls.

- Find the RUM application named "checkout-web" and return its application ID.
- List all my RUM applications.

### `get_rum_summary`
*Toolset: **rum***\
*Permissions Required: `RUM Apps Read` and `Timeseries`*\
Returns a summary of vital metrics for a RUM application, with period-over-period diffs.

- Summarize the performance of the "checkout-web" RUM application for the last 24 hours.
- How did Core Web Vitals on my main RUM app change week-over-week?

### `get_rum_insight`
*Toolset: **rum***\
*Permissions Required: `RUM Apps Read`*\
Returns aggregated insights for RUM Views: waterfall, long tasks, vital distributions, and tag analysis.

- For the `/checkout` view in the "shop" application, show me the aggregated resource waterfall over the last hour.
- Break down INP distribution by device type for the home page.

### `search_rum_metrics`
*Toolset: **rum***\
*Permissions Required: `RUM Apps Read`*\
Explores RUM metrics for an application, including out-of-the-box metrics and custom metrics.

- List the custom RUM metrics defined on the "checkout-web" application.
- Show me available RUM metrics related to page load time on my main app.

### `upsert_rum_metric`
*Toolset: **rum***\
*Permissions Required: `RUM Apps Read` and `RUM Generate Metrics`*\
Creates or updates a custom RUM metric. Checks immutable fields before updating an existing metric. This operation is idempotent.

- Create a distribution metric `rum.view.lcp_by_country` that tracks p95 LCP for view events, grouped by country.
- Update the filter on `rum.error.checkout_errors` to exclude synthetic test traffic.

### `delete_rum_metric`
*Toolset: **rum***\
*Permissions Required: `RUM Apps Read` and `RUM Generate Metrics`*\
Permanently deletes a custom RUM metric by ID. This operation is idempotent.

- Delete the custom RUM metric `rum.view.my_custom_metric`.
- Remove the `rum.view.legacy_page_views` RUM metric from my organization.

### `search_rum_retention_filters`
*Toolset: **rum***\
*Permissions Required: `RUM Retention Filters Read`*\
Lists retention filters configured on a RUM application. Read-only; available for [RUM without Limits][59] customers.

- List the retention filters configured on the "checkout-web" application.
- What retention filters do I have on my main RUM app?

### `append_new_rum_retention_filter`
*Toolset: **rum***\
*Permissions Required: `RUM Retention Filters Write` or `Product Analytics Apps Write`*\
Creates a RUM retention filter, appended to the end of the evaluation order. Retention filters control which RUM events are indexed and retained, which affects billing. Confirm the change before applying.

- Create a retention filter on "checkout-web" that retains 100% of error events.
- Add a filter to my main RUM app that keeps all sessions matching `@view.url_path:/checkout`.

### `update_rum_retention_filter`
*Toolset: **rum***\
*Permissions Required: `RUM Retention Filters Write` or `Product Analytics Apps Write`*\
Updates an existing RUM retention filter's attributes in place, such as its name, event type, query, sample rate, or enabled state. Confirm the change before applying.

- Increase the sample rate on the "checkout errors" retention filter to 100%.
- Disable the "long tasks" retention filter on my main RUM app.

### `reorder_rum_retention_filters`
*Toolset: **rum***\
*Permissions Required: `RUM Retention Filters Write` or `Product Analytics Apps Write`*\
Sets the full evaluation order of a RUM application's retention filters. Filters are evaluated top-down and each event stops at the first match, so order determines which sample rate applies. Confirm the new order before applying.

- Move the "checkout errors" retention filter above the catch-all filter on "checkout-web".
- Reorder my retention filters so the specific filters are evaluated before the broad ones.

### `delete_rum_retention_filter`
*Toolset: **rum***\
*Permissions Required: `RUM Retention Filters Write` or `Product Analytics Apps Write`*\
Permanently deletes a RUM retention filter by ID. Confirm the deletion before applying. This operation is idempotent.

- Delete the "legacy sessions" retention filter from "checkout-web".
- Remove the retention filter with ID `abc-123-def` from my main RUM app.

## Security

Tools for code security scanning, analyzing, searching, and triaging [security signals][53], investigating [IoC Explorer][67] indicators, managing [detection rules][60] and [suppressions][61], and analyzing [security findings][54].

### `datadog_secrets_scan`
*Toolset: **security***\
Scans code for hardcoded secrets and credentials, detecting AWS keys, API keys, passwords, tokens, private keys, and database credentials.

- Scan my code for hardcoded secrets.
- Check if there are any API keys or passwords committed in this file.

### `get_datadog_security_signals_schema`
*Toolset: **security***\
*Permissions Required: `Security Signals Read`*\
Returns the available fields and their types for security signals. Signal types map to `@workflow.rule.type` values such as `Log Detection`, `Application Security`, and `Workload Security`.

- What fields can I use to filter security signals?
- Show me the available fields for Cloud SIEM signals.
- What enum values are valid for the signal rule type field?

### `search_datadog_security_signals`
*Toolset: **security***\
*Permissions Required: `Security Signals Read`*\
Searches and retrieves security signals from Datadog Security Monitoring, including Cloud SIEM signals, App & API Protection signals, and Workload Protection signals.

- Show me security signals from the last 24 hours.
- Find high-severity security signals related to my production environment.
- List Cloud SIEM signals triggered by suspicious login attempts.

### `analyze_datadog_security_signals`
*Toolset: **security***\
*Permissions Required: `Security Signals Read` and `Timeseries`*\
Analyzes security signals using SQL queries for aggregations, grouping, and trend analysis. Use this for counts, top-N, and breakdowns over time. To list or retrieve specific signals, use `search_datadog_security_signals` or `get_datadog_security_signal`.

- Show me the top 10 SIEM rules by signal count over the last 7 days.
- Count high and critical security signals grouped by severity.
- How many App & API Protection signals fired per service yesterday?

### `get_datadog_security_signal`
*Toolset: **security***\
*Permissions Required: `Security Signals Read`*\
Retrieves the full details of a single security signal by ID, including attributes, rule information, triage state, tags, and case correlations.

- Get the full details of security signal `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`.
- Show me the rule, triage state, and linked cases for this signal.

### `update_datadog_security_signals_triage`
*Toolset: **security***\
*Permissions Required: `Security Signals Write`*\
Updates the triage state or assignee of one or more security signals in bulk (up to 500 signals). Accepts either a list of signal IDs or a filter query matching all signals to update.

- Archive all signals from rule "Brute Force Login" in the last 24 hours.
- Set all open signals for `service:checkout` to under review and assign them to me.
- Mark signal `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu` as archived with reason "testing".

### `search_datadog_security_ioc_indicators`
*Toolset: **security***\
*Permissions Required: `Security Signals Read`*\
List [IoC Explorer][67] indicators (IPs, domains, URLs, file hashes) matched against threat intel feeds. Pair with `get_datadog_security_ioc_indicator` for full detail and `update_datadog_security_ioc_indicator_triage` to mark reviewed.

- Show me the highest-scoring malicious IP indicators.
- List IoC indicators in the `residential_proxy` category with a Medium or higher score.
- Show me threat indicators that have not been reviewed yet.

### `get_datadog_security_ioc_indicator`
*Toolset: **security***\
*Permissions Required: `Security Signals Read`*\
Retrieve full detail for one [IoC Explorer][67] indicator by value (score, category, AS info, GeoIP, log sources, signal counts).

- Get details for the threat indicator `192.0.2.1`.
- Show me everything we know about `malicious.example.com`.

### `update_datadog_security_ioc_indicator_triage`
*Toolset: **security***\
*Permissions Required: `Security Signals Write`*\
Set the triage state of an [IoC Explorer][67] indicator.

- Mark indicator `192.0.2.1` as reviewed.
- Set `evil-domain.example.com` back to not reviewed.

### `get_datadog_security_ioc_schema`
*Toolset: **security***\
*Permissions Required: `Security Signals Read`*\
Discover filterable fields and their values for [IoC Explorer][67]. Omit `filter` to list available fields; supply `filter` to get `[{value, count}]` for that field. Use `query` to scope counts to a subset of indicators.

- What fields are available for IoC indicator filters?
- Show me the available indicator types and how many of each exist.
- Get the values for the `categories` filter scoped to high-score indicators.

### `get_datadog_security_detection_rules_schema`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Rules Read`*\
Returns the authoring reference and schema for detection rules. Covers supported rule types, detection methods, query syntax, tag conventions, and valid search facets. Use this before authoring or querying detection rules. Currently supported rule types: log detection, API security, and AppSec.

- What fields and options are available when creating a threshold detection rule?
- Show me the schema for sequence detection rules.
- What tag conventions and query syntax does the detection rules API use?

### `get_datadog_security_detection_rules`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Rules Read`*\
Retrieves security detection rules. Supports two modes: provide `rule_id` to get the full definition of a single rule by ID, or omit `rule_id` to list rules (optionally filtered with `query` and token-limited with `max_tokens`). The two modes are mutually exclusive.

- List all enabled Cloud SIEM detection rules.
- Show me detection rules tagged with `source:cloudtrail`.
- Get the full definition of detection rule `abc-123-def`.
- What thresholds and group-by fields does this detection rule use?

### `create_datadog_security_detection_rule`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Rules Write`*\
Creates a new detection rule. Call `get_datadog_security_detection_rules_schema` first to fetch the payload grammar, then supply a complete rule payload. On success, returns the full rule including its server-assigned ID.

- Create a threshold detection rule that fires when more than 10 failed logins occur from the same IP in 5 minutes.
- Author a new log detection rule for CloudTrail that alerts on IAM privilege escalation.
- Create a detection rule for `source:nginx` that generates a signal when error rate exceeds 100 per minute.

### `update_datadog_security_detection_rule`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Rules Write`*\
Updates an existing custom detection rule by replacing it entirely. Call `get_datadog_security_detection_rules` first to fetch the current rule body, modify the fields you need, and submit the full updated object. Cannot update Datadog-shipped default rules.

- Enable detection rule `abc-123-def`.
- Disable the brute force detection rule.
- Update the threshold on my brute force detection rule from 10 to 20 failed logins.
- Add a new case to detection rule `abc-123-def` that fires at critical severity.
- Change the group-by field on this rule from `@usr.ip` to `@network.client.ip`.

### `delete_datadog_security_detection_rules`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Rules Write`*\
Deletes one or more custom detection rules by ID. Only custom (non-default) rules can be deleted. Default rules return 403. Each rule is authorized individually; failures appear in `failed_rules` without aborting the batch.

- Delete detection rule `abc-123-def`.
- Remove these three test detection rules I created earlier.

### `get_datadog_security_suppressions`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Suppressions Read`*\
Retrieves security monitoring suppressions. Supports three modes: list all suppressions, get a single suppression by ID, or get suppressions affecting a specific detection rule. Suppressions prevent detection rules from generating signals for matching conditions.

- List all active suppressions.
- Show me suppressions for detection rule `abc-123-def`.
- Get the full details of suppression `sup-456-xyz`.

### `create_datadog_security_suppression`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Suppressions Write`*\
Creates a new suppression rule that prevents a detection rule from generating signals for specific conditions. At least one of `suppression_query` or `data_exclusion_query` must be provided.

- Suppress signals from the brute force rule for IP `10.0.0.1`.
- Create a suppression for the anomaly detection rule that ignores the `staging` environment.
- Suppress signals from rule `abc-123-def` where `@usr.email` matches our test accounts.

### `update_datadog_security_suppression`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Suppressions Write`*\
Updates an existing suppression rule. Only changes provided fields. Providing `version` enables optimistic concurrency control to prevent overwriting concurrent edits.

- Update the suppression for the brute force rule to also exclude `10.0.0.2`.
- Change the expiration date on suppression `sup-456-xyz` to next quarter.
- Disable the suppression for the anomaly detection rule without deleting it.

### `delete_datadog_security_suppression`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Suppressions Write`*\
Deletes a suppression rule.

- Delete suppression `sup-456-xyz`.
- Remove the suppression that was silencing the brute force detection rule.

### `get_datadog_security_findings_schema`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Read`*\
Returns the schema (available fields and their types) for security findings. Call this first before using `analyze_datadog_security_findings` to discover queryable fields. Supports filtering by finding type and controlling response size.

- What fields are available for security findings?
- Show me the schema for library vulnerability findings.
- Get the full schema including descriptions for misconfiguration findings.

### `analyze_datadog_security_findings`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Read` and `Timeseries`*\
Primary tool for analyzing security findings using SQL queries. Queries live data from the last 24 hours with flexible SQL aggregations, filtering, and grouping. Call `get_datadog_security_findings_schema` first to discover available fields, then use this tool to query.

- Show me the top 10 rules with the most critical findings.
- Count open findings grouped by severity and finding type.
- Find library vulnerabilities with exploits available, grouped by resource.

### `search_datadog_security_findings`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Read`*\
Fallback tool for retrieving full security finding details. Prefer `analyze_datadog_security_findings` for most analysis tasks. Use this tool only when you need complete finding objects or when SQL queries are insufficient.

- Get full details for critical findings in my AWS environment.
- Retrieve complete finding objects for a specific rule.
- List all open identity risk findings with full metadata.

### `get_datadog_security_findings_ticket_suggestions`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Read`, `Cases Read`*\
Returns ranked project suggestions for ticketing security findings. Shows available Case Management, Jira, and ServiceNow projects with 30-day usage data. Call this before `create_datadog_security_findings_ticket` to discover which project to use.

- What Jira projects can I use to create tickets for security findings?
- Show me available ServiceNow projects for ticketing.
- Which Case Management projects are most used for findings?

### `create_datadog_security_findings_ticket`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Write`, `Cases Read`, `Cases Write`*\
Creates a Case Management case, Jira issue, or ServiceNow ticket for security findings. Requires specific finding IDs and a project ID. Use `get_datadog_security_findings_ticket_suggestions` first to discover available projects.

- Create a Jira ticket for these critical findings in project SECURITY.
- Open a Case Management case for the findings from this rule.
- Create a ServiceNow ticket for these library vulnerabilities.

### `detach_datadog_security_findings_ticket`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Write`, `Cases Write`*\
Detaches security findings from their linked case or ticket. Since Jira and ServiceNow tickets are linked through Case Management, detaching the case also detaches any downstream ticket.

- Detach these findings from their linked Jira ticket.
- Remove the case association for these findings.

### `mute_datadog_security_findings`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Write`*\
Mutes or unmutes security findings to suppress them from alerts and dashboards. Requires a mute reason (`PENDING_FIX`, `FALSE_POSITIVE`, `ACCEPTED_RISK`, or `OTHER`) and supports an optional description and expiration date.

- Mute these findings as false positives.
- Mute this misconfiguration as accepted risk with a 90-day expiration.
- Unmute findings that were previously marked as pending fix.

### `assign_datadog_security_findings`
*Toolset: **security***\
*Permissions Required: `Security Monitoring Findings Write`*\
Assigns or unassigns security findings to a user. Assignment cascades to any linked cases. Omit the assignee ID to unassign.

- Assign these critical findings to the security team lead.
- Unassign findings that are no longer relevant.
- Assign all findings from this rule to me.

### `list_datadog_security_findings_automation_rules`
*Toolset: **security***\
*Permissions Required: `Security Pipelines Read`*\
Lists security findings automation rules of a given type (`mute`, `due_date`, `ticket_creation`, or `severity_modifier`).

- List all mute automation rules for security findings.
- Show me the ticket-creation rules.
- What due-date automation rules are configured?

### `create_datadog_security_findings_automation_rule`
*Toolset: **security***\
*Permissions Required: `Security Pipelines Write` and `Security Monitoring Findings Read`*\
Creates a security findings automation rule. Choose a `rule_type`: `mute` (suppress findings), `due_date` (set remediation deadlines), `severity_modifier` (adjust finding severity), or `ticket_creation` (auto-create Jira or Case Management tickets).

- Create a rule to automatically mute false-positive misconfiguration findings in staging.
- Set 30-day remediation due dates for high-severity library vulnerabilities.
- Auto-create Jira tickets for critical findings in the SECURITY project.

### `update_datadog_security_findings_automation_rule`
*Toolset: **security***\
*Permissions Required: `Security Pipelines Write`*\
Updates an existing automation rule. Supports partial updates, so only the provided fields are changed. Use it to enable or disable rules, rename them, adjust filters, or change action parameters.

- Enable the automation rule that mutes staging findings.
- Change the due-date rule to give critical findings 14 days instead of 30.
- Update the ticket-creation rule to target a different Jira project.

### `delete_datadog_security_findings_automation_rule`
*Toolset: **security***\
*Permissions Required: `Security Pipelines Write`*\
Permanently deletes a security findings automation rule by ID.

- Delete the severity modifier rule `abc-123-def`.
- Remove the mute rule that is no longer needed.

### `reorder_datadog_security_findings_automation_rules`
*Toolset: **security***\
*Permissions Required: `Security Pipelines Write`*\
Moves an automation rule up or down in the list. Rules are applied in order, so a rule's position sets its priority.

- Move the mute rule `abc-123-def` to the top of the list.
- Lower the priority of this due-date rule by two positions.

### `get_datadog_security_passlist`
*Toolset: **security***\
*Permissions Required: `Application Security Management Protect Read`*\
Returns all WAF exclusion filter (passlist) entries for the organization to review existing suppressions.

- List all App & API Protection passlist entries.
- Show me active WAF exclusion filters.
- Check existing passlist suppressions before I add a new one.

### `upsert_datadog_security_passlist`
*Toolset: **security***\
*Permissions Required: `Application Security Management Protect Write`*\
Creates or updates a WAF exclusion filter (passlist) entry to suppress noisy rules on a specific service or endpoint.

- Add a WAF passlist entry for service "checkout-service" on endpoint "/api/pay" to ignore rule "sqli-detection".
- Update the exclusion filter to suppress rule "xss-rule" for service "auth-api".
- Create an AppSec passlist entry that matches rule ID "lfi-attack" on "/v1/users".

### `delete_datadog_security_passlist`
*Toolset: **security***\
*Permissions Required: `Application Security Management Protect Write`*\
Deletes an existing WAF exclusion filter (passlist) entry.

- Delete WAF exclusion filter "passlist-abc-123".
- Remove the passlist entry that matches rule "sqli-detection" on "/api/pay".

### `get_datadog_security_denylist`
*Toolset: **security***\
*Permissions Required: `Application Security Management Protect Read`*\
Lists blocked IPs, users, and user agents (denylist entries), with optional filtering.

- List all blocked entities on the AppSec denylist.
- Show me blocked IP addresses from yesterday.
- Check if IP "198.51.100.42" is on the security denylist.

### `upsert_datadog_security_denylist_entry`
*Toolset: **security***\
*Permissions Required: `Application Security Management Protect Write`*\
Adds or updates a denylist block for an IP, user, or user agent with an expiration.

- Block IP "198.51.100.42" on the denylist for 24 hours.
- Add user "attacker_user_99" to the blocked entities denylist.
- Create a denylist entry for user-agent "MaliciousScanner/1.0" with an expiration set to next week.

### `delete_datadog_security_denylist_entry`
*Toolset: **security***\
*Permissions Required: `Application Security Management Protect Write`*\
Unblocks a previously denylisted entity by setting its expiration in the past.

- Unblock IP "198.51.100.42" on the denylist.
- Remove user "attacker_user_99" from the blocked entities list.

## Session Replay

Tools for searching [Session Replay][69] recordings and summarizing session activity.

### `search_replays`
*Toolset: **session-replay***\
*Permissions Required: `RUM Apps Read`*\
Searches Session Replay recordings and returns matching sessions. Supports filtering by user identity, device, error count, or any RUM facet, and journey search for sessions that followed a specific sequence of views or actions.

- Find replays of sessions with more than 2 errors in the last 24 hours.
- Show me replays of users who followed the checkout journey but didn't complete it.

### `get_replay_summary`
*Toolset: **session-replay***\
*Permissions Required: `RUM Apps Read` and `RUM Session Replay Read`*\
Generates an AI-powered, time-based play-by-play of what a user did during a specific session replay—pages visited, actions taken, and key moments—organized into chapters. Typically called after `search_replays` to dive into a session of interest.

- Summarize what happened in session `abc-123-def`.
- Give me a play-by-play of the replay for the user who reported a checkout error.

## Software Delivery

Tools for interacting with Software Delivery ([CI Visibility][48], [Test Optimization][24], [Code Coverage][65], and [DORA metrics][66]).

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

### `update_datadog_flaky_test_states`
*Toolset: **software-delivery***\
*Permissions Required: `Test Optimization Write`*\
Sets the state of one or more flaky tests to `quarantined` (suppress failures), `disabled` (skip test), `fixed` (mark resolved), or `active` (restore). This is a write operation that requires explicit user approval. All state changes are reversible.

- Quarantine all active flaky tests in the `checkout-service` repository.
- Mark the flaky test `AuthServiceTest::testLogin` as fixed.
- Disable flaky tests owned by `@team-payments` with a failure rate above 50%.

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

### `get_datadog_code_coverage_pr_summary`
*Toolset: **software-delivery***\
*Permissions Required: `Code Coverage read`*\
Fetches aggregated code coverage summary metrics for a pull request, including total coverage, patch coverage, and service or codeowner breakdowns.

- Show me the code coverage for PR #123 in `github.com/my-org/my-repo`.
- What's the patch coverage for pull request #456 in `github.com/my-org/my-repo`?

### `get_datadog_code_coverage_files`
*Toolset: **software-delivery***\
*Permissions Required: `Code Coverage read`*\
Fetches per-file code coverage line data for a repository commit, branch, or pull request. Returns executable lines, covered lines, and added lines for each file. Exactly one of `commit_sha`, `branch`, or `pr_number` must be provided. At most one of `service`, `codeowner`, or `flag` may be provided to filter results.

- Show me per-file coverage for PR #123 in `github.com/my-org/my-repo`.
- Get changed-file coverage for commit `abc123abc123abc123abc123abc123abc123abcd` in `github.com/my-org/my-repo`.
- Show coverage for the `main` branch of `github.com/my-org/my-repo`, filtered by codeowner `@my-org/my-team`.`

### `get_datadog_test_optimization_settings`
*Toolset: **software-delivery***\
*Permissions Required: `Test Optimization Read`*\
Retrieves the Test Optimization features that are enabled for a service, including Test Impact Analysis (ITR), Early Flake Detection (EFD), Auto Test Retries (ATR), Failed Test Replay, Code Coverage collection, and PR Comments.

- Which test optimization features are enabled for the `auth-service`?
- Show me the Test Optimization settings for my checkout service.

### `get_datadog_flaky_tests_management_policies`
*Toolset: **software-delivery***\
*Permissions Required: `Test Optimization Read`*\
Retrieves the Flaky Tests Management policies configured for a repository, including auto-quarantine windows, branch rules, failure rate thresholds, disable policies, and retry settings.

- Show me the flaky test management policies for `github.com/my-org/my-repo`.
- What auto-quarantine rules are configured for the checkout service repository?

### `search_dora_deployments`
*Toolset: **software-delivery***\
*Permissions Required: `DORA Metrics Read`*\
Searches DORA deployment events with filters, or fetches full details for a single deployment by ID.

- Show me deployments for the `checkout` service in the last 7 days.
- Get details for DORA deployment `abc123`.
- Find failed deployments in the production environment this month.

### `aggregate_dora_deployments`
*Toolset: **software-delivery***\
*Permissions Required: `Timeseries`*\
Returns DORA metrics (deployment frequency, change lead time, change failure rate, recovery time) for a service, team, or repo, as scalar values or timeseries. Use for questions about software delivery performance over a time window.

- What is the deployment frequency and change failure rate for the `checkout` service over the last 30 days?
- Show me the change lead time trend for the `payments` service over the last quarter.
- Get all four DORA metrics for the `auth-service` team.

## Synthetics

Tools for interacting with Datadog [Synthetic tests][47].

### `get_synthetics_tests`
*Toolset: **synthetics***\
*Permissions Required: `Synthetics Read`*\
Searches Datadog Synthetic HTTP API tests.

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

## Widgets

Tools for [dashboard][46] and [notebook][57] widget visualization, validation, and type conversion.

### `get_widget`
*Toolset: **widgets***\
*Permissions Required: `Dashboards Read` or `Timeseries` or `Monitors Read` or `APM Read` or `RUM Apps Read`*\
Retrieves and visualizes Datadog metrics, traces, logs, and other data as interactive charts. Supports three modes: dashboard lookup, direct definition, or URL resolution.

- Show the CPU usage timeseries for `service:api` over the last hour.
- Fetch the widget data for widget `2228368921512806` on dashboard `abc-123-def`.
- Visualize the data from this Datadog share link.

### `search_datadog_widgets`
*Toolset: **widgets***\
*Permissions Required: `Dashboards Read` or `Dashboards Write` or `Notebooks Read` or `Notebooks Write`*\
Searches and retrieves information about widgets across Datadog dashboards, including their IDs, titles, and underlying queries.

- Find all timeseries widgets that query the `system.cpu.user` metric.
- Search for widgets related to error rates across all dashboards.

### `swap_widget_type`
*Toolset: **widgets***\
*Permissions Required: `Dashboards Read` or `Dashboards Write` or `Notebooks Read` or `Notebooks Write`*\
Converts a widget definition from one visualization type to another while preserving queries. Supports formula-request-based widget types: timeseries, query_value, top list, query_table, treemap, sunburst, distribution, heatmap, geomap, and list_stream.

- Convert this timeseries widget to a top list.
- Change the query table widget to a treemap visualization.

### `validate_notebook_cell`
*Toolset: **widgets***\
*Permissions Required: `Timeseries`*\
Validates notebook cell widget definitions, including SQL correctness for analysis_sql cells. When validating an analysis_sql cell, include its upstream data source widgets so the endpoint can check SQL expressions against their schemas.

- Validate these notebook cell definitions before saving.
- Check if the analysis SQL cell references valid columns from the upstream widget.

### `validate_notebook_cells`
*Toolset: **widgets***\
*Permissions Required: `Timeseries`*\
Validates multiple notebook cell widget definitions in a single call, including SQL correctness for analysis_sql cells.

- Validate all the cells in this notebook before publishing.
- Check these three analysis cells for SQL errors.

### `verify_widget_data`
*Toolset: **widgets***\
*Permissions Required: `Dashboards Read` or `Timeseries` or `Monitors Read` or `APM Read` or `RUM Apps Read`*\
Verifies whether widget definitions return data for the last hour. Call after adding widgets to a dashboard to confirm queries return real data. Returns one result per widget indicating whether data was found, with a reason if not.

- Check if these widget definitions return data.
- Verify the widgets added to the dashboard are showing real metrics.

### `visualize_tabular_data`
*Toolset: **widgets***\
*Permissions Required: No specific permissions required.*\
Renders tabular data as an interactive visualization (sunburst, treemap, or top list). Use after aggregating data from queries to visualize hierarchical relationships or rankings.

- Visualize this grouped metric data as a sunburst chart.
- Show this aggregated data as a treemap breakdown.

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

[1]: /mcp_server/setup#toolsets
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
[55]: /containers/monitoring/kubernetes_explorer/
[60]: /security/detection_rules/
[61]: /security/suppressions/
[62]: /getting_started/profiler/
[56]: /account_management/rbac/permissions/
[57]: /notebooks/
[58]: /real_user_monitoring/
[59]: /real_user_monitoring/rum_without_limits/
[62]: /experiments/
[63]: /agent/guide/rshell/
[64]: /cloud_cost_management/
[65]: /code_coverage/
[66]: /delivery_performance/dora_metrics/
[67]: /security/cloud_siem/triage_and_investigate/ioc_explorer/
[68]: /product_analytics/
[69]: /session_replay/
[70]: /data_observability/
