---
title: Configuring Query Capture with Parameter Values in Database Monitoring
private: true
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/setup_sql_server/"
  tag: "Documentation"
  text: "Setting Up SQL Server"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Database Monitoring"
---

<div class="alert alert-info">This feature is currently in preview, and processing of raw SQL query text and explain plans must be turned on on a per-org basis. Rule Based Access Controls are forthcoming to bring this feature to GA. In the meantime, please reach out to DBM to access this preview</div>

The Database Monitoring integrations collect aggregated query metrics, in-flight query executions, and query explain plans across your database. By default, query SQL texts and explain plans are obfuscated and normalized in the Agent before being sent to Datadog in order to protect sensitive data, which may be exposed in query parameters.

However, exposing query statements with actual parameter values provides enhanced observability and debugging capabilities. Database Monitoring currently supports query capture with parameter values on the PostgreSQL and SQL Server integrations.

Having access to query parameters enables:

- **Performance analysis**: Map explain plans to specific parameter values to understand why certain execution plans are chosen
- **Root cause identification**: Identify which parameter values or query patterns cause performance regressions
- **Hotspot detection**: Discover problematic parameters (for example, 90% of slow queries caused by `org_id:12345`)
- **Query optimization**: Run `EXPLAIN ANALYZE` with actual parameters to obtain execution statistics and identify optimization opportunities
- **Index tuning**: Fine-tune indexes, rewrite queries, or adjust query hints based on real parameter values

## Before you begin

<div class="alert alert-info">Query statements and execution plans with parameterized values may contain sensitive information (for example, passwords in query text) or personally identifiable information. Enabling this option allows Datadog to collect and ingest raw query statements and execution plans, which appear in query samples or explain plans. This option is disabled by default.</div>

You must configure Database Monitoring for your [SQL Server][1] instance before continuing with this guide.

Supported databases
: PostgreSQL, SQL Server

Supported deployments
: All deployment types.

## Setup
To collect SQL query text and explain plans with parameter values, enable `collect_raw_query_statement` in `conf.yaml`.

```yaml
  collect_raw_query_statement:
    enabled: true
```

## Query parameter value capture by DBMS type

### PostgreSQL

| Query Execution Method | Support | Description | Example | Supported Agent Version |
|------------|---------|-------------|---------|---------------|
| Direct Execution | {{< X >}} | Ad-hoc SQL statements executed directly, including literal values in the query text. | `SELECT * FROM users WHERE id = 123` | 7.64.0+ |
| Prepared Statements | {{< X >}} | Parameterized queries executed through prepared statements. Can be created explicitly or through drivers. | `PREPARE stmt AS SELECT * FROM users WHERE id = $1; EXECUTE stmt(123);` | 7.64.0+ |
| Functions | {{< X >}} | Functions invoked with SELECT. | `SELECT get_user_name(123);` | 7.64.0+ |
| Stored Procedures | | Procedures invoked with CALL. Parameters are substituted at the call boundary, and only the inner SQL statements are visible in system views. | `CALL procname(123)` |  |

### SQL Server

| Query Execution Method | Support | Description | Example | Agent Version |
|------------|---------|-------------|---------|---------------|
| Direct Execution | {{< X >}} | Ad-hoc SQL statements executed directly, including literal values in the query text. | `SELECT * FROM users WHERE id = 123` | 7.64.0+ |
| Prepared Statements | {{< X >}} | Parameterized queries executed through prepared statements. Can be created explicitly or through drivers. | `sp_prepare @handle, N'SELECT * FROM users WHERE id = @id'; sp_execute @handle, @id = 123;` | 7.64.0+ |
| Functions | {{< X >}} | Invoked with SELECT. The outer call (with parameter values) is visible in system views; inner SQL statements inside the function body are not. | SELECT dbo.GetUserName(123); | 7.64.0+ |
| Stored Procedures | {{< X >}} * | Procedures invoked with EXEC. Parameters can be passed as named or positional arguments. The procedure body executes with substituted values, so only the inner statements are captured by default. | `EXEC GetUser @id = 123` | 7.67.0+ |

\* Requires [query completions][1] configuration

[1]: /database_monitoring/guide/sql_extended_events/

### Why stored procedure parameters are limited

When a stored procedure is invoked, the database engine substitutes parameter values at the call level. The inner SQL statements that run inside the procedure no longer carry those original parameter bindings—they execute as independent statements.

Database Monitoring collects samples from system views at the statement level, which means:

- Inner statements are visible, but their connection to the original procedure parameters is lost
- The outer procedure call itself (with parameter values) is not captured

This is why stored procedure parameters are not available in PostgreSQL, and only available in SQL Server when query completions are enabled.

In contrast, direct execution and prepared statements retain their parameter values throughout execution, so Database Monitoring can capture and display them.
