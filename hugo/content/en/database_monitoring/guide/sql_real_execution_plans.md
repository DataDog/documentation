---
title: Collecting Real Execution Plans on SQL Server
description: Collect the last actual execution plan of SQL Server queries, with runtime statistics, in Database Monitoring.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/setup_sql_server/"
  tag: "Documentation"
  text: "Setting Up SQL Server"
- link: "/database_monitoring/guide/parameterized_queries/"
  tag: "Documentation"
  text: "Capturing SQL Query Parameter Values With Database Monitoring"
- link: "/database_monitoring/setup_sql_server/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Database Monitoring for SQL Server"
---

By default, Database Monitoring collects the estimated execution plan of each SQL Server query. An estimated plan shows the operators SQL Server chose when it compiled the query, with estimated row counts and costs. It doesn't show what happened when the query ran.

With real execution plan collection, the Agent also collects the last actual execution plan of each cached plan, from [`sys.dm_exec_query_plan_stats`][1]. A real plan describes the last execution of that cached plan, with runtime statistics:

- actual rows and executions for each operator
- memory grant and memory used
- actual degree of parallelism
- spill warnings, without the spill size

SQL Server also writes CPU and elapsed times (`QueryTimeStats`) in these plans, but these values are unreliable on SQL Server 2019, 2022, and 2025. For query timings, use [query metrics][10].

A real plan describes one execution: the last one before the Agent read it. It isn't an aggregate of all the executions counted in query metrics.

## Before you begin

You must configure Database Monitoring for your [SQL Server][2] instance before following the steps in this guide.

Supported databases
: SQL Server 2019 and later, Azure SQL Database, and Azure SQL Managed Instance

Supported deployments
: All deployment types

Supported Agent versions
: TODO: add the first Agent version that includes real execution plan collection.

Permissions
: The grants from the Database Monitoring setup are enough. On SQL Server 2022 and later, `VIEW SERVER PERFORMANCE STATE` and `CONNECT ANY DATABASE` are enough. Reading the trace flag status with `DBCC TRACESTATUS` doesn't need an extra grant.

## Setup

### Turn on `LAST_QUERY_PLAN_STATS` for full coverage

SQL Server keeps the last actual plan of every query only when `LAST_QUERY_PLAN_STATS` is on. With the setting off:

- SQL Server 2022 and 2025 still keep actual plans for some queries.
- SQL Server 2019 doesn't keep any.

The Agent collects every real plan that has runtime statistics, whatever the setting. The Agent never changes this setting. For full coverage, turn it on with one of the following options.

**For each database to monitor**, run the following [database scoped configuration][3] in that database:

```sql
ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN_STATS = ON;
```

Changing this setting clears the cached plans of the database, so its queries are compiled again on their next execution.

**For the whole server**, turn on [trace flag 2451][4] globally. For example, add the `-T2451` startup parameter, or run the following command, which lasts until the next restart:

```sql
DBCC TRACEON (2451, -1);
```

Azure SQL Database doesn't support trace flags. If you can't set trace flags on your deployment, use the database scoped configuration.

<div class="alert alert-warning">SQL Server uses its <a href="https://learn.microsoft.com/en-us/sql/relational-databases/performance/query-profiling-infrastructure">lightweight query profiling infrastructure</a> to keep the last actual plan. Microsoft describes its overhead as low, but not zero. Review Microsoft's documentation before you turn on <code>LAST_QUERY_PLAN_STATS</code> on a busy server.</div>

### Configure the Agent

In the SQL Server instance configuration of the Agent, `sqlserver.d/conf.yaml`, turn on `collect_real_plans` under `query_metrics`:

```yaml
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    # ...
    query_metrics:
      collect_real_plans:
        enabled: true
```

Real plans are collected next to estimated plans, so `query_metrics.enabled` and `query_metrics.collect_plans` must stay on. Both are on by default.

The following options are available under `collect_real_plans`:

`enabled`
: Collect real execution plans. Default: `false`.

`samples_per_hour_per_query`
: Maximum number of real plans collected per hour for each plan. Default: `4`. The Agent collects a real plan only when it collects an estimated plan for the same query. This option can lower the rate of real plans, but can't make it higher than the rate of estimated plans.

`max_plan_size_bytes`
: Real plans larger than this size, in bytes, are skipped. Default: `1000000`.

[Restart the Agent][5] to apply the changes.

The Agent skips a real plan when SQL Server returns it without runtime statistics. For example, SQL Server didn't keep the actual plan of that query, or the plan hasn't run since its last compilation.

## Data privacy

Values in real plans, such as parameter values, are obfuscated like in estimated plans.

If you turn on [`collect_raw_query_statement`][6], the Agent also sends the raw version of each real plan. Only users with the **Database Monitoring Parameterized Queries Read** [permission][7] can see raw plans.

## Query real plans with the API

Real plans are plan events (`dbm_type:plan`) with the following attributes:

| Attribute | Value |
|-----------|-------|
| `@db.plan.type` | `real` |
| `@db.plan.source` | `last_query_plan_stats` |
| `@db.plan.signature` | The same plan signature as the estimated plan of the same cached plan |
| `@sqlserver.last_execution_time` | When the statement of the plan last ran, from `sys.dm_exec_query_stats` for the plan's own cache entry and statement. An ISO 8601 timestamp with the UTC offset of the server |

Estimated plans collected by the Agent have no `@db.plan.type`. PostgreSQL plans collected from `auto_explain` logs have `@db.plan.type:explain_analyze`.

For example, to retrieve the real plans of a query, search for `dbm_type:plan @db.plan.type:real @db.query_signature:<QUERY_SIGNATURE>`. For more information about the API, see [Building Applications with the Database Monitoring API][8].

## Troubleshooting

### Real plans are missing for some queries

If `LAST_QUERY_PLAN_STATS` is off in a database, the Agent only collects real plans for the queries SQL Server keeps actual plans of on its own. On SQL Server 2019, that means none.

When `collect_real_plans` is on and `LAST_QUERY_PLAN_STATS` is off in a user database whose queries the Agent monitors, the Agent reports it. These reports are advisory: the Agent keeps collecting estimated plans, and real plans that have runtime statistics. The Agent:

- logs one warning for that database:
  ```text
  LAST_QUERY_PLAN_STATS is off in database '<DATABASE>': real execution plans are only collected for the few queries SQL Server keeps actual plans of on its own. Turn it on in that database for full coverage with `ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN_STATS = ON;`: https://docs.datadoghq.com/database_monitoring/setup_sql_server/
  ```
- reports a `last_query_plan_stats_disabled` health event with a warning status. The event lists the first database found with the setting off in `data.databases`. The status goes back to OK after the setting is on in every database the Agent reported.

When `collect_real_plans` is on, the Agent's [`diagnose` command][9] also reports a `last-query-plan-stats-disabled` warning for each user database where the setting is off:

```text
LAST_QUERY_PLAN_STATS is off in database '<DATABASE>': real execution plans are only collected for the few queries SQL Server keeps actual plans of on its own.
```

It doesn't report a warning when trace flag 2451 is on globally.

For full coverage, run the following command in each listed database, or turn on trace flag 2451. The Agent never changes this setting.

```sql
ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN_STATS = ON;
```

The Agent reads the setting of each database again every 10 minutes. After you change it, the warning can take up to 10 minutes to clear.

### The SQL Server version doesn't support real plans

On SQL Server 2017 and earlier, `sys.dm_exec_query_plan_stats` doesn't exist. If `collect_real_plans` is on, the Agent logs a warning, reports a `real_plans_version_unsupported` health event, and collects only estimated plans. Turn off `collect_real_plans` to remove the warning.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-query-plan-stats-transact-sql
[2]: /database_monitoring/setup_sql_server/
[3]: https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-database-scoped-configuration-transact-sql
[4]: https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql
[5]: /agent/configuration/agent-commands/#restart-the-agent
[6]: /database_monitoring/guide/parameterized_queries/
[7]: /account_management/rbac/permissions/#database-monitoring
[8]: /database_monitoring/guide/build_apps_with_dbm_api/
[9]: /agent/configuration/agent-commands/#other-commands
[10]: /database_monitoring/query_metrics/
