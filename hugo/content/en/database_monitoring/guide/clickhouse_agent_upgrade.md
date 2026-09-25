---
title: Upgrading the ClickHouse integration from Agent versions earlier than 7.84
aliases:
- /database_monitoring/clickhouse_agent_upgrade
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/setup_clickhouse/"
  tag: "Documentation"
  text: "Setting up ClickHouse"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Database Monitoring"
---


When you upgrade from an Agent version earlier than 7.84, grant these additional permissions to the `datadog` role:

```sql
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
