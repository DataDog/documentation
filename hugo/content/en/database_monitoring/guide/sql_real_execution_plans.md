---
title: Collecting Real Execution Plans on SQL Server
description: Collect the actual execution plans of slow SQL Server statement executions, with their runtime parameter values, from an Extended Events session.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/setup_sql_server/"
  tag: "Documentation"
  text: "Setting Up SQL Server"
- link: "/database_monitoring/guide/sql_extended_events/"
  tag: "Documentation"
  text: "Configuring Query Completion and Query Error Collection on SQL Server"
- link: "/database_monitoring/guide/parameterized_queries/"
  tag: "Documentation"
  text: "Capturing SQL Query Parameter Values With Database Monitoring"
- link: "/database_monitoring/setup_sql_server/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Database Monitoring for SQL Server"
---

By default, Database Monitoring collects the estimated execution plan of each SQL Server query. An estimated plan shows the operators SQL Server chose when it compiled the query, with estimated row counts and costs. It doesn't show what happened when the query ran.

A real execution plan is the actual plan of one specific execution of a statement. It shows what happened during that execution:

- the runtime parameter values of that execution, next to the values the plan was compiled for
- the actual rows and executions of each operator
- the memory grant: requested, granted, and used memory
- the actual degree of parallelism
- the elapsed time and CPU time of the statement

Because a real plan describes one execution, it shows why that execution was slow. For example, the parameter values of that execution can return far more rows than the values the plan was compiled for. A real plan isn't an aggregate of all the executions counted in [query metrics][1].

## How it works

SQL Server writes the actual plan of a statement execution to an [Extended Events][2] (XE) session named `datadog_query_plans`, which you create. The session keeps the plans of the statements that run longer than a duration you choose. By default, the Agent reads the session every 10 seconds. It sends the plans to Datadog as plan events of the `real` type.

The Agent never creates, changes, starts, or stops the session, and never changes database settings.

Each statement of a stored procedure has its own plan. To limit the number of plans, the Agent collects up to 4 plans per hour for each query and plan shape, by default. Of the executions it reads at the same time, it keeps the slowest one.

## Choose an event

The session uses one of two events. Both events capture the runtime parameter values, the actual rows and executions of each operator, and the memory grant. Both also capture the degree of parallelism, and the statement's elapsed time and CPU time.

| | Lightweight (default) | Detailed |
|---|---|---|
| Event | `query_post_execution_plan_profile` | `query_post_execution_showplan` |
| SQL Server profiling | [Lightweight profiling][3] | Standard profiling |
| CPU time, elapsed time, and rows read for each operator | No | Yes |
| Reads for each operator | Worktables only | Yes |
| Wait statistics | No | Yes |
| Spill warnings (`SpillToTempDb`, `SortSpillDetails`) | No | Yes |
| Overhead | Lower | Higher. See [Overhead](#overhead) |

Datadog recommends the lightweight event. Use the detailed event to investigate a specific problem, for example, during a short time window.

## Before you begin

You must configure Database Monitoring for your [SQL Server][4] instance before following the steps in this guide.

Supported databases
: SQL Server 2019 and later, SQL Server 2017 CU14 and later, Azure SQL Database, and Azure SQL Managed Instance. The lightweight event isn't available on earlier versions.

Supported deployments
: Self-hosted, Amazon RDS, Google Cloud SQL, Azure SQL Database, and Azure SQL Managed Instance

Supported Agent versions
: TODO: add the first Agent version that includes real execution plan collection.

Permissions
: The grants from the Database Monitoring setup are enough. The Agent needs `VIEW SERVER STATE`, or `VIEW SERVER PERFORMANCE STATE` on SQL Server 2022 and later, to read the session. Create the session with a login that can create event sessions, such as a login with the `ALTER ANY EVENT SESSION` permission, or `ALTER ANY DATABASE EVENT SESSION` on Azure SQL Database. The Agent's login doesn't need this permission.

## Overhead

While the session runs, SQL Server profiles **every statement** on the server (on the database, for Azure SQL Database) to produce its actual plan. This happens whatever the session's `WHERE` clause: the duration filter limits how many plans are captured and sent, not the profiling cost.

In Datadog's tests on SQL Server 2019, 2022, and 2025, the session added the following CPU time to each statement. These numbers are indicative. Measure the overhead on your own workload.

| Event | Small statements | Statements of 30 ms and more |
|---|---|---|
| Lightweight (`query_post_execution_plan_profile`) | About 0.25 ms. For example, about 2 to 2.5 CPU cores at 10,000 small statements per second | 0 to 1% |
| Detailed (`query_post_execution_showplan`) | About 0.35 ms | 2 to 4% |

<div class="alert alert-warning">The detailed event uses standard profiling, which costs more than lightweight profiling. If any session on the server uses <code>query_post_execution_showplan</code>, for example, a session from another monitoring tool, SQL Server uses standard profiling for the lightweight event too.</div>

On busy OLTP servers with many short statements, run the session in time windows instead of all the time. See [Run the session in time windows](#run-the-session-in-time-windows).

## Setup

### Create the session

Run the script for your deployment as an administrator. Datadog requires the session name `datadog_query_plans` and the actions in the script.

In the `WHERE` clause:

- `duration > 1000000` keeps the statements that run longer than 1 second. The duration is in microseconds.
- `sqlserver.username <> N'datadog'` excludes the Agent's own queries. Replace `datadog` with the Agent's login.

To use the detailed event, replace `sqlserver.query_post_execution_plan_profile` with `sqlserver.query_post_execution_showplan` in the script. Use one of the two events, not both.

`TRACK_CAUSALITY = ON` adds an activity ID to each plan. If your `datadog_query_completions` session also uses `TRACK_CAUSALITY = ON`, the activity ID links a plan to the [query completion event][5] of the same request.

{{< tabs >}}
{{% tab "Self-hosted" %}}

The session writes the plans to files in the SQL Server log directory (`event_file` target).

```sql
CREATE EVENT SESSION datadog_query_plans ON SERVER -- Datadog requires this exact session name
ADD EVENT sqlserver.query_post_execution_plan_profile (
    ACTION (
        sqlserver.database_name,
        sqlserver.session_id,
        sqlserver.request_id,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.query_hash,
        sqlserver.query_plan_hash,
        sqlserver.plan_handle,
        sqlserver.tsql_frame
    )
    WHERE (
        duration > 1000000 -- in microseconds: statements that run longer than 1 second
        AND sqlserver.username <> N'datadog' -- the Agent's login
    )
)
ADD TARGET package0.event_file (
    SET filename = N'datadog_query_plans', max_file_size = 64, max_rollover_files = 4
)
WITH (
    MAX_MEMORY = 8192 KB,
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    TRACK_CAUSALITY = ON,
    STARTUP_STATE = ON
);
GO

ALTER EVENT SESSION datadog_query_plans ON SERVER STATE = START;
GO
```

{{% /tab %}}
{{% tab "Amazon RDS" %}}

On Amazon RDS for SQL Server, extended events are available on the Enterprise and Standard editions. The session writes the plans to files in the `D:\rdsdbdata\log` directory, the only directory RDS allows for file targets.

RDS limits the session memory to the `xe_session_max_memory` parameter, which defaults to 4 MB, so this script uses `MAX_MEMORY = 4096 KB`. For more information, see [Using extended events with Amazon RDS for Microsoft SQL Server][1].

```sql
CREATE EVENT SESSION datadog_query_plans ON SERVER -- Datadog requires this exact session name
ADD EVENT sqlserver.query_post_execution_plan_profile (
    ACTION (
        sqlserver.database_name,
        sqlserver.session_id,
        sqlserver.request_id,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.query_hash,
        sqlserver.query_plan_hash,
        sqlserver.plan_handle,
        sqlserver.tsql_frame
    )
    WHERE (
        duration > 1000000 -- in microseconds: statements that run longer than 1 second
        AND sqlserver.username <> N'datadog' -- the Agent's login
    )
)
ADD TARGET package0.event_file (
    SET filename = N'D:\rdsdbdata\log\datadog_query_plans.xel', max_file_size = 64, max_rollover_files = 4
)
WITH (
    MAX_MEMORY = 4096 KB,
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    TRACK_CAUSALITY = ON,
    STARTUP_STATE = ON
);
GO

ALTER EVENT SESSION datadog_query_plans ON SERVER STATE = START;
GO
```

On Multi-AZ deployments, RDS doesn't copy the session to the standby replica, and stops it there. After a failover, create or start the session on the new primary.

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/SQLServer.ExtendedEvents.html
{{% /tab %}}
{{% tab "Google Cloud SQL" %}}

On Cloud SQL for SQL Server, the session writes the plans to files in the `/var/opt/mssql/xevents/` directory, which Cloud SQL requires for file targets. Cloud SQL also enforces limits on the session's memory, file size, and dispatch latency. For more information, see [Analyze database performance with Extended Events][1].

```sql
CREATE EVENT SESSION datadog_query_plans ON SERVER -- Datadog requires this exact session name
ADD EVENT sqlserver.query_post_execution_plan_profile (
    ACTION (
        sqlserver.database_name,
        sqlserver.session_id,
        sqlserver.request_id,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.query_hash,
        sqlserver.query_plan_hash,
        sqlserver.plan_handle,
        sqlserver.tsql_frame
    )
    WHERE (
        duration > 1000000 -- in microseconds: statements that run longer than 1 second
        AND sqlserver.username <> N'datadog' -- the Agent's login
    )
)
ADD TARGET package0.event_file (
    SET filename = N'/var/opt/mssql/xevents/datadog_query_plans.xel', max_file_size = 64, max_rollover_files = 4
)
WITH (
    MAX_MEMORY = 8192 KB,
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    TRACK_CAUSALITY = ON,
    STARTUP_STATE = ON
);
GO

ALTER EVENT SESSION datadog_query_plans ON SERVER STATE = START;
GO
```

Cloud SQL doesn't copy the session to existing read replicas. To collect plans on a read replica, create and start the session there.

[1]: https://cloud.google.com/sql/docs/sqlserver/extended-events
{{% /tab %}}
{{% tab "Azure SQL Database" %}}

On Azure SQL Database, the session is scoped to a database. Create it in each database that the Agent monitors: the Agent reads the session of the database its check instance connects to.

The session can write the plans to Azure Blob Storage (`event_file` target), or keep them in memory (`ring_buffer` target). Blob Storage holds more plans. If you can't set up Blob Storage, use the `ring_buffer` target.

#### Write the plans to Azure Blob Storage

1. Create a storage account and a container, as described in Microsoft's [Create an event session with event_file target in Azure Storage][1]. Use a container dedicated to this session: the Agent reads every blob in the container whose name starts with `datadog_query_plans`.

2. In the database, create a database-scoped credential that gives access to the container. The name of the credential must be the URL of the container, without a trailing slash.

   With a shared access signature (SAS) token for the container: the token needs the `Read`, `Write`, `Delete`, and `List` permissions, and no IP address restrictions. Its expiry time must be after the end of the session.

   ```sql
   CREATE DATABASE SCOPED CREDENTIAL [https://<STORAGE_ACCOUNT>.blob.core.windows.net/<CONTAINER>]
   WITH IDENTITY = 'SHARED ACCESS SIGNATURE',
       SECRET = '<SAS_TOKEN>';
   ```

   With the managed identity of the logical server, after you give it the **Storage Blob Data Contributor** role on the container:

   ```sql
   CREATE DATABASE SCOPED CREDENTIAL [https://<STORAGE_ACCOUNT>.blob.core.windows.net/<CONTAINER>]
   WITH IDENTITY = 'MANAGED IDENTITY';
   ```

3. Create and start the session:

   ```sql
   CREATE EVENT SESSION datadog_query_plans ON DATABASE -- Datadog requires this exact session name
   ADD EVENT sqlserver.query_post_execution_plan_profile (
       ACTION (
           sqlserver.database_name,
           sqlserver.session_id,
           sqlserver.request_id,
           sqlserver.username,
           sqlserver.client_app_name,
           sqlserver.client_hostname,
           sqlserver.query_hash,
           sqlserver.query_plan_hash,
           sqlserver.plan_handle,
           sqlserver.tsql_frame
       )
       WHERE (
           duration > 1000000 -- in microseconds: statements that run longer than 1 second
           AND sqlserver.username <> N'datadog' -- the Agent's user
       )
   )
   ADD TARGET package0.event_file (
       SET filename = N'https://<STORAGE_ACCOUNT>.blob.core.windows.net/<CONTAINER>/datadog_query_plans.xel',
           max_file_size = 64
   )
   WITH (
       MAX_MEMORY = 8192 KB,
       EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
       MAX_DISPATCH_LATENCY = 30 SECONDS,
       TRACK_CAUSALITY = ON,
       STARTUP_STATE = ON
   );
   GO

   ALTER EVENT SESSION datadog_query_plans ON DATABASE STATE = START;
   GO
   ```

SQL Server doesn't delete the session's old blobs by default. To limit the storage they use, delete old blobs with an [Azure Storage management policy][2].

#### Keep the plans in memory

If you can't set up Blob Storage, create the session with the script above, but replace its `ADD TARGET` clause with a `ring_buffer` target:

```sql
ADD TARGET package0.ring_buffer (
    SET MAX_MEMORY = 4096
)
```

SQL Server returns at most about 4 MB of a ring buffer's content, which is about 120 small plans. When the ring buffer is full, new plans replace the oldest ones. If the session captures more plans than that between two reads of the Agent, the oldest plans are lost. To avoid it, increase the duration in the `WHERE` clause, or lower `collection_interval` in the Agent configuration.

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/extended-events/targets-for-extended-events-in-sql-server#create-an-event-session-with-event_file-target-in-azure-storage
[2]: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview
{{% /tab %}}
{{% tab "Azure SQL Managed Instance" %}}

The session can write the plans to Azure Blob Storage (`event_file` target), or keep them in memory (`ring_buffer` target). Blob Storage holds more plans. If you can't set up Blob Storage, use the `ring_buffer` target.

#### Write the plans to Azure Blob Storage

1. Create a storage account and a container, as described in Microsoft's [Create an event session with event_file target in Azure Storage][1]. Use a container dedicated to this session: the Agent reads every blob in the container whose name starts with `datadog_query_plans`.

2. In the `master` database, create a credential that gives access to the container. The name of the credential must be the URL of the container, without a trailing slash.

   With a shared access signature (SAS) token for the container: the token needs the `Read`, `Write`, `Delete`, and `List` permissions, and no IP address restrictions. Its expiry time must be after the end of the session.

   ```sql
   USE master;
   IF NOT EXISTS (SELECT 1 FROM sys.symmetric_keys WHERE name = '##MS_DatabaseMasterKey##')
       CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<PASSWORD>';

   CREATE CREDENTIAL [https://<STORAGE_ACCOUNT>.blob.core.windows.net/<CONTAINER>]
   WITH IDENTITY = 'SHARED ACCESS SIGNATURE',
       SECRET = '<SAS_TOKEN>';
   ```

   With the managed identity of the managed instance, after you give it the **Storage Blob Data Contributor** role on the container:

   ```sql
   USE master;
   CREATE CREDENTIAL [https://<STORAGE_ACCOUNT>.blob.core.windows.net/<CONTAINER>]
   WITH IDENTITY = 'MANAGED IDENTITY';
   ```

3. Create and start the session:

   ```sql
   CREATE EVENT SESSION datadog_query_plans ON SERVER -- Datadog requires this exact session name
   ADD EVENT sqlserver.query_post_execution_plan_profile (
       ACTION (
           sqlserver.database_name,
           sqlserver.session_id,
           sqlserver.request_id,
           sqlserver.username,
           sqlserver.client_app_name,
           sqlserver.client_hostname,
           sqlserver.query_hash,
           sqlserver.query_plan_hash,
           sqlserver.plan_handle,
           sqlserver.tsql_frame
       )
       WHERE (
           duration > 1000000 -- in microseconds: statements that run longer than 1 second
           AND sqlserver.username <> N'datadog' -- the Agent's login
       )
   )
   ADD TARGET package0.event_file (
       SET filename = N'https://<STORAGE_ACCOUNT>.blob.core.windows.net/<CONTAINER>/datadog_query_plans.xel',
           max_file_size = 64
   )
   WITH (
       MAX_MEMORY = 8192 KB,
       EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
       MAX_DISPATCH_LATENCY = 30 SECONDS,
       TRACK_CAUSALITY = ON,
       STARTUP_STATE = ON
   );
   GO

   ALTER EVENT SESSION datadog_query_plans ON SERVER STATE = START;
   GO
   ```

SQL Server doesn't delete the session's old blobs by default. To limit the storage they use, delete old blobs with an [Azure Storage management policy][2].

#### Keep the plans in memory

If you can't set up Blob Storage, create the session with the script above, but replace its `ADD TARGET` clause with a `ring_buffer` target:

```sql
ADD TARGET package0.ring_buffer (
    SET MAX_MEMORY = 4096
)
```

SQL Server returns at most about 4 MB of a ring buffer's content, which is about 120 small plans. When the ring buffer is full, new plans replace the oldest ones. If the session captures more plans than that between two reads of the Agent, the oldest plans are lost. To avoid it, increase the duration in the `WHERE` clause, or lower `collection_interval` in the Agent configuration.

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/extended-events/targets-for-extended-events-in-sql-server#create-an-event-session-with-event_file-target-in-azure-storage
[2]: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview
{{% /tab %}}
{{< /tabs >}}

### Configure the Agent

In the SQL Server instance configuration of the Agent, `sqlserver.d/conf.yaml`, turn on `query_plans` under `collect_xe`:

```yaml
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    # ...
    collect_xe:
      query_plans:
        enabled: true
```

The following options are available under `collect_xe.query_plans`. See the [sample conf.yaml.example][6] for all the options of the SQL Server integration.

`enabled`
: Collect real execution plans from the `datadog_query_plans` session. Default: `false`.

`collection_interval`
: How often the Agent reads the session, in seconds. Default: `10`.

`max_events`
: Maximum number of events the Agent reads from the session on each collection. Default: `1000`.

`samples_per_hour_per_query`
: Maximum number of plans collected per hour for each query and plan shape (query hash and query plan hash). Of the executions read on the same collection, the Agent keeps the slowest one. Default: `4`.

`max_plan_size_bytes`
: Plans larger than this size, in bytes, are skipped. Default: `1000000`.

[Restart the Agent][7] to apply the changes.

On its first collection, the Agent starts from the newest plans in the session's files. It doesn't send the plans captured before.

### Run the session in time windows

To limit the overhead, run the session during chosen time windows, for example, while you investigate a problem or during off-peak hours. You can schedule these commands, for example, with SQL Server Agent jobs.

To stop the session:

```sql
ALTER EVENT SESSION datadog_query_plans ON SERVER STATE = STOP;
```

To start it again:

```sql
ALTER EVENT SESSION datadog_query_plans ON SERVER STATE = START;
```

On Azure SQL Database, replace `ON SERVER` with `ON DATABASE`. Stopping a session with a `ring_buffer` target discards its plans.

If you run the session in time windows, create it with `STARTUP_STATE = OFF`, so that it doesn't start when SQL Server restarts. While the session is stopped, the Agent reports that the session is missing. See [Troubleshooting](#troubleshooting).

On SQL Server 2017, starting a session with the lightweight event turns on lightweight profiling, and stopping it turns lightweight profiling off. If you start and stop the session often, Microsoft recommends turning on lightweight profiling for the whole server with [trace flag 7412][8].

To remove the session:

```sql
DROP EVENT SESSION datadog_query_plans ON SERVER;
```

## Data privacy

Before it sends a plan, the Agent obfuscates the values in the plan, including the runtime and compiled parameter values, and the statement text.

If you turn on [`collect_raw_query_statement`][9], the Agent also sends a raw copy of each plan and its statement, with the parameter values. Only users with the **Database Monitoring Parameterized Queries Read** [permission][10] can see raw plans.

The session's files, and its blobs in Azure Storage, hold the plans with their raw values. Limit the access to these files and blobs.

## Query real plans with the API

Real plans are plan events (`dbm_type:plan`) with the following attributes:

| Attribute | Description |
|-----------|-------------|
| `@db.plan.type` | `real` |
| `@db.plan.source` | `xe_query_post_execution_plan_profile` for the lightweight event, or `xe_query_post_execution_showplan` for the detailed event |
| `@db.plan.signature` | The query plan hash. Estimated plans of the same plan shape have the same signature |
| `@db.plan.definition` | The plan XML (ShowPlanXML) of the execution, obfuscated |
| `@db.plan.collection_errors` | `statement_text_unavailable` when the Agent couldn't find the statement of the plan, for example, because it left the plan cache. The plan is sent without its statement |
| `@db.plan.raw_signature` | With `collect_raw_query_statement`, a hash of the raw plan, which links the plan to its raw copy |
| `@db.query_signature` | The same query signature as the query metrics of the statement |
| `@db.statement` | The statement, obfuscated. For a stored procedure, the statement of the procedure that the plan describes |
| `@db.instance` | The database of the execution |

Each plan also has attributes for its execution, under `@sqlserver`:

| Attribute | Description |
|-----------|-------------|
| `@sqlserver.query_hash`, `@sqlserver.query_plan_hash`, `@sqlserver.plan_handle` | Identifiers of the query, the plan shape, and the cached plan, in lowercase hexadecimal |
| `@sqlserver.event_fire_timestamp` | When the statement ended, in UTC |
| `@sqlserver.query_start` | When the statement started, in UTC |
| `@sqlserver.duration_ms` | Elapsed time of the statement, in milliseconds |
| `@sqlserver.cpu_time` | CPU time of the statement, in **microseconds** |
| `@sqlserver.dop` | Actual degree of parallelism |
| `@sqlserver.granted_memory_kb`, `@sqlserver.used_memory_kb`, `@sqlserver.requested_memory_kb`, `@sqlserver.ideal_memory_kb`, `@sqlserver.serial_ideal_memory_kb` | Memory grant of the statement, in KB. `0` when the statement had no memory grant |
| `@sqlserver.session_id`, `@sqlserver.request_id`, `@sqlserver.nest_level` | Session, request, and nesting level of the execution |
| `@sqlserver.database_name`, `@sqlserver.username`, `@sqlserver.client_app_name`, `@sqlserver.client_hostname` | Database, user, application, and client host of the execution |
| `@sqlserver.object_type`, `@sqlserver.object_name` | Type of the statement's batch or object, such as `ADHOC`, `PREPARED`, or `PROC`, and the name of the stored procedure |
| `@sqlserver.activity_id`, `@sqlserver.activity_id_xfer` | Activity IDs from `TRACK_CAUSALITY` |

Estimated plans collected by the Agent have no `@db.plan.type`.

For example, to retrieve the real plans of a query, search for `dbm_type:plan @db.plan.type:real @db.query_signature:<QUERY_SIGNATURE>`. For more information about the API, see [Building Applications with the Database Monitoring API][11].

## Troubleshooting

When `collect_xe.query_plans` is on, the Agent checks the `datadog_query_plans` session on each collection. The Agent's [`diagnose` command][12] also checks it, as the `query-plans-xe-session` diagnosis.

### The session doesn't exist or isn't running

If the session doesn't exist or is stopped, the Agent:

- logs a warning, with the script to create the session:
  ```text
  The datadog_query_plans XE session doesn't exist or isn't running, so no real execution plans are collected.
  ```
- reports a `query_plans_xe_session_missing` health event with a warning status.

The `diagnose` command reports a warning:

```text
`collect_xe.query_plans` is enabled, but the datadog_query_plans XE session doesn't exist or isn't running.
```

To fix it, [create the session](#create-the-session), or start it:

```sql
ALTER EVENT SESSION datadog_query_plans ON SERVER STATE = START;
```

On Azure SQL Database, create and start the session in the database the Agent connects to, with `ON DATABASE`.

The health event goes back to OK after the session runs again. If you [run the session in time windows](#run-the-session-in-time-windows), this warning is expected while the session is stopped.

### The session has no supported target

If the session has neither an `event_file` nor a `ring_buffer` target, the Agent logs a warning and reports a `query_plans_xe_target_unsupported` health event with a warning status. The `diagnose` command reports:

```text
The datadog_query_plans XE session has no event_file or ring_buffer target.
```

To fix it, drop the session and [create it again](#create-the-session) with the target from the script for your deployment:

```sql
DROP EVENT SESSION datadog_query_plans ON SERVER;
```

### The session has no supported event

If the session has neither the `query_post_execution_plan_profile` nor the `query_post_execution_showplan` event, the session captures no plans. The `diagnose` command reports:

```text
The datadog_query_plans XE session has none of the events query_post_execution_plan_profile, query_post_execution_showplan.
```

To fix it, drop the session and [create it again](#create-the-session) with one of these events.

### Creating the session fails

If `CREATE EVENT SESSION` fails because the event or an action doesn't exist, check your SQL Server version. The lightweight event requires SQL Server 2019 and later, or SQL Server 2017 CU14 and later. The following query lists the events and the `tsql_frame` action available on your server:

```sql
SELECT o.name, o.object_type
FROM sys.dm_xe_objects o
WHERE (o.object_type = 'event' AND o.name IN ('query_post_execution_plan_profile', 'query_post_execution_showplan'))
   OR (o.object_type = 'action' AND o.name = 'tsql_frame');
```

### Plans are missing for some executions

The Agent doesn't send every plan in the session:

- It collects up to `samples_per_hour_per_query` plans per hour for each query and plan shape.
- It skips plans larger than `max_plan_size_bytes`.
- It skips plans that have no runtime statistics.

The session only captures the executions that match its `WHERE` clause. With a `ring_buffer` target, the session can also lose plans between two reads of the Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/query_metrics/
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/extended-events/extended-events
[3]: https://learn.microsoft.com/en-us/sql/relational-databases/performance/query-profiling-infrastructure
[4]: /database_monitoring/setup_sql_server/
[5]: /database_monitoring/guide/sql_extended_events/
[6]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[7]: /agent/configuration/agent-commands/#restart-the-agent
[8]: https://learn.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql
[9]: /database_monitoring/guide/parameterized_queries/
[10]: /account_management/rbac/permissions/#database-monitoring
[11]: /database_monitoring/guide/build_apps_with_dbm_api/
[12]: /agent/configuration/agent-commands/#other-commands
