---
title: Configuring Deadlock Monitoring on SQL Server
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

The Deadlock view enables you to explore deadlock events in your SQL Server database.
A deadlock occurs when two or more processes are unable to proceed because each is waiting for the other to release resources.

## Before you begin

You must configure Database Monitoring for your [SQL Server][1] before following the steps in this guide.


Supported databases
: SQL Server

Supported deployments
: All deployment types. Azure DB is supported for Agent versions 7.64.0 and later.

Supported Agent versions
: 7.59.0+

## Setup
{{< tabs >}}
{{% tab "All deployment types except Azure DB" %}}

1. In the SQL Server database instance, create a Datadog Extended Events (XE) session. You can run the session on any database in the instance.

   **Note**: If the Datadog XE session isn't created in the database, the Agent still attempts to collect deadlock events from the default SQL Server system health XE session.

```sql
  CREATE EVENT SESSION datadog
  ON SERVER
  ADD EVENT sqlserver.xml_deadlock_report
  ADD TARGET package0.ring_buffer
  WITH (
      MAX_MEMORY = 1024 KB,
      EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
      MAX_DISPATCH_LATENCY = 30 SECONDS,
      MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
      STARTUP_STATE = ON
  );
  GO

  ALTER EVENT SESSION datadog ON SERVER STATE = START;
  GO
```

   **Note**: If you're using Amazon RDS for SQL Server, remove the `MEMORY_PARTITION_MODE = PER_NODE` line from the session configuration, as this option is not supported on RDS instances.

2. In the Datadog Agent, enable deadlocks in `sqlserver.d/conf.yaml`.
```yaml
  collect_deadlocks: # Renamed from deadlocks_collection in Agent version 7.70.
      enabled: true
```

{{% /tab %}}

{{% tab "Azure DB" %}}

1. In the SQL Server database, create a Datadog Extended Events (XE) session.

```sql
  CREATE EVENT SESSION datadog
  ON database
  ADD EVENT sqlserver.database_xml_deadlock_report
  ADD TARGET package0.ring_buffer
  WITH (
      MAX_MEMORY = 1024 KB,
      EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
      MAX_DISPATCH_LATENCY = 30 SECONDS,
      STARTUP_STATE = ON
  );
  GO

  ALTER EVENT SESSION datadog ON DATABASE STATE = START;
  GO
```

2. In the Datadog Agent, enable deadlocks in `sqlserver.d/conf.yaml`.
```yaml
  collect_deadlocks: # Renamed from deadlocks_collection in Agent version 7.70.
      enabled: true
```

{{% /tab %}}

{{< /tabs >}}

## Exploring deadlock events

To access the deadlock view, navigate to the **APM** > **Database Monitoring** > **Databases** tab, then select a SQL Server host. Next, select the **Queries** tab, then select the **Deadlocks** tab.
The Deadlocks tab displays details about the victim and survivor processes, and includes a link to the deadlock diagram.

**Note**: Because deadlocks occur infrequently, it's unlikely that any deadlock information will be visible right away.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_sql_server/
[2]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838
