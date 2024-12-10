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
: All deployment types except Azure DB (Azure Managed Instance is supported)

Supported Agent versions
: 7.59.0+

## Setup
1. In the SQL Server database instance, create a Datadog Extended Events (XE) session. You can run the session on any database in the instance.

   **Note**: If the Datadog XE session isn't created in the database, the Agent still attempts to collect deadlock events from a default SQL Server XE view. This view writes to the buffer pool, but there's a higher chance of missing events because of a size limitation on the XML queried from it. For more information, see [You may not see the data you expect in Extended Event Ring Buffer Targets][2] on the SQL Server Support Blog.

```sql
  CREATE EVENT SESSION datadog
  ON SERVER
  ADD EVENT sqlserver.xml_deadlock_report
  ADD TARGET package0.ring_buffer
  WITH (
      MAX_MEMORY = 1024 KB,
      EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
      MAX_DISPATCH_LATENCY = 30 SECONDS,
      STARTUP_STATE = ON
  );
  GO

  ALTER EVENT SESSION datadog ON SERVER STATE = START;
  GO
```

2. In the Datadog Agent, enable deadlocks in `sqlserver.d/conf.yaml`.
```yaml
  deadlocks_collection:
      enabled: true
```

## Exploring deadlock events

To access the deadlock view, navigate to the **APM** > **Database Monitoring** > **Databases** tab, select a SQL Server host, and then click the **Deadlocks** tab.
The deadlock tab displays details about the victim and survivor processes, and includes a link to the deadlock diagram.

**Note**: Because deadlocks occur infrequently, it's unlikely that any deadlock information will be visible right away.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_sql_server/
[2]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838
