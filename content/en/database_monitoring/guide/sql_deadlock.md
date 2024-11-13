---
title: Configuring Deadlock monitoring on SQL Server
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

The Deadlock view allows you to explore deadlocks events in your SQL Server database.
This guide assumes you have configured Database Monitoring for your [SQL Server][1].

## Before you begin

Supported databases
: SQL Server

Supported deployments
: All deployment types except Azure DB (Azure Managed Instance is supported)

Supported Agent versions
: 7.59.0+

## Setup
1. In the SQL Server Database Instance, create a datadog extended events (XE) session. This can be run on any database within the instance.
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

To access the deadlock view, navigate to the **APM** > **Database Monitoring** > **Databases** tab > select your SQL Server host > **Deadlocks** tab.


## Notes

- Only the first 1024 characters of the SQL statement are captured.
- If the datadog XE session is not created in the database, the agent will still attempt to collect deadlock events from a default SQL Server XE view which writes to the buffer pool, but there is a higher chance to miss events due to a size limitation on the XML that is queried from this view. More background on [this Microsoft thread][2].
- Deadlocks in general are a rare occurrence, so you likely will not see data in the platform immediately upon enabling.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_sql_server/
[2]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838
