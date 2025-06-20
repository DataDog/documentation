---
title: Configuring Deobfuscated Query Event and Query Error Capture on SQL Server
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

This feature enables collection of deobfuscated queries and query error events from your SQL Server instances using Extended Events (XE). It provides clear insights into:
- Metrics and behavior of SQL queries with deobfuscated parameter values
- What query errors or timeouts occurred

This is useful for:
- Performance analysis
- Debugging app behavior
- Auditing unexpected errors or timeouts

**Note:** The setup instructions below configure the required event sessions and Agent settings to capture deobfuscated query and error event data. However, this data is not yet visible in Datadog, as support for surfacing this data is still under development.

## Before you begin

You must configure Database Monitoring for your [SQL Server][1] before following the steps in this guide.


Supported databases
: SQL Server

Supported deployments
: All deployment types.

Supported Agent versions
: 7.67.0+

## Setup
{{< tabs >}}
{{% tab "All deployment types except Azure DB" %}}

1. In the SQL Server database instance, create the following Extended Events (XE) sessions. You can run these sessions on any database in the instance.

The datadog_query_completions XE session captures long-running SQL queries (over 1 second) from RPC calls, SQL batches, and stored procedures.
```sql
-- 1. Query completions (grouped)
-- Includes RPC completions, batch completions, and stored procedure completions
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO

CREATE EVENT SESSION datadog_query_completions ON SERVER -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
WITH (
    MAX_MEMORY = 2048 KB, -- do not exceed 2048, values above 2 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON SERVER STATE = START;
GO
```

The datadog_query_errors XE session captures SQL errors [of severity ≥ 11][2] and query timeouts, [called attention events][3], allowing Datadog to surface query failures and interruptions.

```sql
-- 2. Errors and Attentions (grouped)
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
CREATE EVENT SESSION datadog_query_errors ON SERVER
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
WITH (
    MAX_MEMORY = 2048 KB, -- do not change, setting this larger than 2 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON SERVER STATE = START;
GO
```

{{% /tab %}}

{{% tab "Azure DB" %}}

1. In the SQL Server database, create the following Extended Events (XE) sessions:

The datadog_query_completions XE session captures long-running SQL queries (over 1 second) from RPC calls, SQL batches, and stored procedures.

```sql
-- 1. Query completions (grouped)
-- Includes RPC completions, batch completions, and stored procedure completions
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON DATABASE;
GO

CREATE EVENT SESSION datadog_query_completions ON DATABASE -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
WITH (
    MAX_MEMORY = 2048 KB, -- do not exceed 2048, values above 2 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON DATABASE STATE = START;
GO
```

The datadog_query_errors XE session captures SQL errors (severity ≥ 11) and query timeouts (attention events), allowing Datadog to surface query failures and interruptions.

```sql
-- 2. Errors and Attentions (grouped)
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON DATABASE;
GO
CREATE EVENT SESSION datadog_query_errors ON DATABASE
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
WITH (
    MAX_MEMORY = 2048 KB, -- do not change, setting this larger than 2 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON DATABASE STATE = START;
GO
```
{{% /tab %}}

{{< /tabs >}}


2. In the Datadog Agent, enable xe_collection in `sqlserver.d/conf.yaml`.
See the [sample conf.yaml.example][5] for all available configuration options.
```yaml
  xe_collection:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
In order to collect deobfuscated versions of query_completion and query_error events, enable collect_raw_query_statement in `sqlserver.d/conf.yaml`. Please note, raw query statements and execution plans may contain sensitive information (e.g., passwords) or personally identifiable information in query text. Enabling this option will allow the collection and ingestion of raw query statements and execution plans into Datadog, which can then become viewable in query samples or explain plans. This option is disabled by default."
```yaml
  collect_raw_query_statement:
    enabled: true
```

### Optional: Tuning for your environment

You can customize the Extended Events sessions to better fit your specific needs:

**[Query Duration Threshold](#query-duration-threshold)**
- Default is `duration > 1000000` (1 second). Adjust this value to capture:
  - More queries: Lower the threshold (e.g., `duration > 500000` for 500ms)
  - Fewer queries: Increase the threshold (e.g., `duration > 5000000` for 5 seconds)
- **Important**: Setting thresholds too low can result in:
  - Excessive event collection affecting server performance
  - Event loss due to buffer overflow
  - Incomplete data as Datadog only collects the most recent 1000 events per collection interval

**Memory Allocation**
- Default is `MAX_MEMORY = 2048 KB`.
- Don't exceed 2048 KB as larger values may cause data loss [due to SQL Server internal limitations][4]
- For high-volume servers, consider keeping this at maximum (2048 KB)
- For lower traffic servers, 1024 KB may be sufficient

**[Event Filtering](#event-filtering)**
- Add additional filters to the WHERE clause to reduce event volume:
  ```sql
  WHERE (
      sql_text <> '' AND
      duration > 1000000 AND
      -- Add custom filters here
      database_name = 'YourImportantDB' -- Only track specific databases
      -- OR --
      username <> 'ReportUser' -- Exclude specific users
  )
  ```

**Performance Considerations**
- Extended Events are designed to be lightweight but still have some overhead
- If you observe performance issues, consider:
  - [Increasing duration thresholds](#query-duration-threshold)
  - [Adding more specific filters](#event-filtering)
  - Disabling one or both sessions during peak load periods by running:
```sql
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
```

**Azure-Specific Considerations**
- In Azure SQL Database, resources are more constrained
- [Consider using more restrictive filtering if you're on lower-tier service levels](#event-filtering)
- For elastic pools, monitor performance impact across all databases

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_sql_server/
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[3]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[4]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838
[5]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example

