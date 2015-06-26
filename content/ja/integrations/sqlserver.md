---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-SQL Server Integration
integration_title: SQL Server
doclevel: basic
kind: integration
---

### Overview
{:#int-overview}

Connect SQL Server to Datadog in order to:

- Visualize your database performance.
- Correlate the performance of SQL Server with the rest of your applications.

From the open-source Agent:

* [SQL Server YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/sqlserver.yaml.example)
* [SQL Server checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/sqlserver.py)

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
