---
title: Datadog-SQL Server Integration
integration_title: SQL Server

kind: integration
---

### Overview

Connect SQL Server to Datadog in order to:

  * Visualize your database performance.
  * Correlate the performance of SQL Server with the rest of your applications.



From the open-source Agent:

* [ SQL Server YAML example][1]
* [ SQL Server checks.d][2]


The following metrics are collected by default with the SQL Server integration:

    sqlserver.access.page_splits
    sqlserver.buffer.cache_hit_ratio
    sqlserver.buffer.checkpoint_pages
    sqlserver.buffer.page_life_expectancy
    sqlserver.stats.batch_requests
    sqlserver.stats.connections
    sqlserver.stats.lock_waits
    sqlserver.stats.procs_blocked
    sqlserver.stats.sql_compilations
    sqlserver.stats.sql_recompilations

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/sqlserver.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/sqlserver.py


