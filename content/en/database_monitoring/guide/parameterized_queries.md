---
title: Capturing SQL Query Parameter Values With Database Monitoring
aliases:
- /database_monitoring/parameterized_queries
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

The Database Monitoring integrations collect aggregated query metrics, in-flight query executions, and query explain plans across your database. By default, query SQL texts and explain plans are obfuscated and normalized in the Agent before being sent to Datadog in order to protect sensitive data, which may be exposed in query parameters.

However, exposing query statements with actual parameter values provides enhanced observability and debugging capabilities. Database Monitoring currently supports query capture with parameter values on the PostgreSQL and SQL Server integrations.

Having access to query parameters enables:

- **Performance analysis**: Map explain plans to specific parameter values to understand why certain execution plans are chosen
- **Root cause identification**: Identify which parameter values or query patterns cause performance regressions
- **Hotspot detection**: Discover problematic parameters (for example, 90% of slow queries caused by `org_id:12345`)
- **Query optimization**: Investigate actual execution plans with real parameters to obtain execution statistics and identify optimization opportunities
- **Index tuning**: Fine-tune indexes, rewrite queries, or adjust query hints based on real parameter values

## Before you begin

<div class="alert alert-danger">Query statements and execution plans with parameterized values may contain sensitive information (for example, passwords in query parameters) or personally identifiable information. Enabling this option allows Datadog to collect and ingest raw query statements and execution plans that appear in query samples or explain plans. This option is disabled by default.</div>

You must configure Database Monitoring for your database instance before continuing with this guide.

Supported databases
: PostgreSQL, SQL Server

Supported deployments
: All deployment types.

## Permissions

To view query parameter values in the Database Monitoring UI, users need the **Database Monitoring Parameterized Queries Read** permission. This permission is located under the **Database Monitoring** section in the [Roles page][2]. This permission is enabled by default in the Datadog Admin Role, Datadog Standard Role, and Datadog Read Only Role. If your organization uses custom roles, add this permission to the appropriate role. For more information on managing permissions, see the [RBAC documentation][3].

## Setup
To capture SQL query text and execution plans with parameter values, update the appropriate integration `conf.yaml` file based on your database type:
- For PostgreSQL: edit `postgres.d/conf.yaml`
- For SQL Server: edit `sqlserver.d/conf.yaml`

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">
For SQL Server, capturing parameter values from prepared statements requires enabling query completion capture through Extended Events. See <a href="/database_monitoring/guide/sql_extended_events/">configure your SQL Server instance and integration to capture query completions</a> in order to complete the database set up. </div>

```yaml
  xe_collection:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```

Prepared statement support is currently available only for SQL Server. For more details, see [Why prepared statement parameter values are limited](#why-prepared-statement-parameter-values-are-limited).

## Query parameter value capture by DBMS type

### PostgreSQL

| Query Execution Method | Support | Description | Example | Supported Agent Version |
|------------|---------|-------------|---------|---------------|
| Direct Executions | {{< X >}} | Ad-hoc SQL statements executed directly, including literal values in the query text. | `SELECT * FROM users WHERE id = 123` | 7.64.0+ |
| Functions | {{< X >}} | Scalar or table-valued functions invoked with SELECT. | `SELECT get_user_name(123);` | 7.64.0+ |
| Stored Procedures | {{< X >}} | Procedures invoked with CALL. | `CALL procname(123)` | 7.64.0+ |
| Prepared Statements |  | Not currently supported. See [Why prepared statement parameter values are limited](#why-prepared-statement-parameter-values-are-limited). Parameterized queries executed through prepared statements. Can be created explicitly or through drivers. | `PREPARE stmt AS SELECT * FROM users WHERE id = $1; EXECUTE stmt(123);` | |

### SQL Server

| Query Execution Method | Support | Description | Example | Agent Version |
|------------|---------|-------------|---------|---------------|
| Direct Executions | {{< X >}} | Ad-hoc SQL statements executed directly, including literal values in the query text. | `SELECT * FROM users WHERE id = 123` | 7.64.0+
| Functions | {{< X >}} | Scalar or table-valued functions invoked with SELECT. | `SELECT dbo.GetUserName(123);` | 7.64.0+ |
| Stored Procedures | {{< X >}} |  Procedures invoked with EXEC. | `EXEC GetUser @id = 123;` | 7.64.0+ |
| Prepared Statements | {{< X >}} | Support requires [query completions][1] configuration. Parameterized queries executed through prepared statements. Can be created explicitly or through drivers. | `sp_prepare @handle, N'SELECT * FROM users WHERE id = @id'; sp_execute @handle, @id = 123;` | 7.67.0+ |

### Why prepared statement parameter values are limited

Datadog uses activity sampling to capture currently running SQL queries. However, for prepared statements, the Database Management System replaces parameter values with placeholders at execution time. As a result, activity sampling cannot observe the actual values.

To capture prepared statements with parameter values in SQL Server, you must [configure your SQL Server instance and integration to capture query completions][1], which provides the Datadog Agent rich visibility into prepared statement execution.

Support for PostgreSQL prepared statement parameter value capture is not available at this time.

[1]: /database_monitoring/guide/sql_extended_events/
[2]: /account_management/rbac/permissions/
[3]: /account_management/rbac/
