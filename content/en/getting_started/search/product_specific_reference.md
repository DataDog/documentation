---
title: Product-Specific Search
description: Learn about search capabilities across different Datadog products
further_reading:
- link: "/getting_started/search/"
  tag: "Documentation"
  text: "Getting Started with Search"
---

## Overview

Each Datadog product offers unique search capabilities optimized for its use case. This page provides a comprehensive index of product-specific search syntax resources to help you find the right documentation for your needs.

## Search syntax families

There are two main families of search syntaxes across Datadog products:

**Metrics-based syntax**: Used by Metrics and Cloud Cost Management for time-series data queries with tag-based filtering and aggregation.

**Event-based syntax**: Used by Log Management and adopted by most other Datadog products including traces, RUM, CI/CD, Observability Pipelines, and more. This syntax provides flexible faceted search with boolean operators and pattern matching.

## Metrics

Metrics use a specialized metrics-based syntax for filtering and aggregating time-series data.

For more information, see [Advanced Filtering][1].

### Key capabilities
* Tag-based filtering with boolean logic (`AND`, `OR`, `NOT`) or symbolic operators (`&&`, `||`, `!`)
* Wildcard matching on metric names and tag values
* Aggregation by multiple tag dimensions
* Template variable filtering for dynamic dashboards
* Metric namespace filtering for organized queries
* **Case-sensitive matching** for metric names

{{% collapse-content title="Syntax examples" level="h5" expanded=false %}}
```text
# Filter metrics by tag
system.cpu.idle{host:prod-*}

# Boolean operators for tag filtering
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}

# Combine multiple tag filters
system.disk.used{env:production,datacenter:us-east-1}

# Wildcard filtered query
avg:system.disk.in_use{!device:/dev/loop*} by {device}

# Wildcard matching on tags
aws.ec2.cpuutilization{instance-type:t3.*}

# Exclude specific tags
system.mem.used{env:production AND NOT service:test}
```
{{% /collapse-content %}}


## Logs

Log Management uses event-based search syntax, serving as the foundation for many other products' search capabilities.

For a complete reference for log search operators, wildcards, facets, and advanced queries, see [Log Search Syntax][2].

### Key capabilities
* Full-text search across log messages with wildcards and phrase matching
* Structured faceted search on attributes (tags, custom fields, standard attributes)
* Pattern detection and extraction using parsing patterns
* Advanced boolean operators (AND, OR, NOT) and grouping
* Range queries for numerical values and timestamps

{{% collapse-content title="Syntax examples" level="h5" expanded=false %}}
```text
# Search for error messages containing "timeout"
status:error "timeout"

# Query HTTP errors with status codes 500-599
@http.status_code:[500 TO 599]

# Combine multiple conditions
service:web-api env:(production OR dev) AND @duration:>1000

# Wildcard search for specific services
service:payment-* AND status:error

# Exclude specific values
env:production NOT service:background-worker
```
{{% /collapse-content %}}

## Traces

APM and Distributed Tracing use event-based search syntax for querying spans and traces.

To learn more about querying spans and traces with service, resource, and tag filters, see [Trace Query Syntax][3].

### Key capabilities
* Query spans by service, operation, and resource name
* Filter by trace-level and span-level tags
* Search across distributed traces spanning multiple services
* Duration-based queries for performance analysis
* Error tracking with status codes and error messages

{{% collapse-content title="Syntax examples" level="h5" expanded=false %}}
```text
# Find errors in a specific service
service:payment-api status:error

# Query by resource and HTTP method
resource_name:"/api/v1/checkout" @http.method:POST

# Search for slow traces
service:web-api* @duration:>1s

# Trace queries across service dependencies
@span.parent.service:frontend service:backend

# Filter by custom span tags
service:database @db.statement:"SELECT *" @db.row_count:>1000
```
{{% /collapse-content %}}

## Additional product-specific resources

{{< whatsnext desc="Product-specific search syntax documentation for additional Datadog products:" >}}
  {{< nextlink href="/continuous_integration/explorer/search_syntax" >}}CI Visibility Explorer: Query pipelines, tests, and CI/CD events{{< /nextlink >}}
  {{< nextlink href="/continuous_delivery/explorer/search_syntax" >}}CD Visibility Explorer: Search and filter deployment events and executions{{< /nextlink >}}
  {{< nextlink href="/monitors/manage/search" >}}Monitor Search: Find and filter monitors by status, type, tags, and alert conditions{{< /nextlink >}}
  {{< nextlink href="/observability_pipelines/processors/filter" >}}Observability Pipelines Filter Processor: Query syntax for filtering pipeline data{{< /nextlink >}}
  {{< nextlink href="/product_analytics/analytics_explorer/search_syntax" >}}Product Analytics Explorer Search: Search user interactions and product analytics events{{< /nextlink >}}
  {{< nextlink href="/quality_gates/explorer/search_syntax" >}}Quality Gates Explorer Syntax: Query quality gate rules and evaluation results{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/explorer/search_syntax" >}}RUM Explorer Search: Search user sessions, views, actions, and errors{{< /nextlink >}}
  {{< nextlink href="/security/sensitive_data_scanner/scanning_rules/custom_rules" >}}Sensitive Data Scanner Custom Rules: Regex patterns and matching syntax for scanning sensitive data{{< /nextlink >}}
  {{< nextlink href="/service_management/events/explorer/searching" >}}Service Management Events Search: Query and filter service management events{{< /nextlink >}}
  {{< nextlink href="/logs/workspaces/sql_reference" >}}SQL Reference for Logs: SQL syntax for advanced log analysis in Workspaces{{< /nextlink >}}
  {{< nextlink href="/tests/explorer/search_syntax" >}}Test Optimization Explorer Search Syntax: Search and analyze test execution data{{< /nextlink >}}
  {{< nextlink href="/observability_pipelines/search_syntax" >}}Observability Pipelines Search Syntax: Filter logs for your processors{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/advanced-filtering
[2]: /logs/explorer/search_syntax
[3]: /tracing/trace_explorer/query_syntax
