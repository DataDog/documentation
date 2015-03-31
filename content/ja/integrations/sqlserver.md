---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-SQL Server Integration
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/ja/integrations/"
---

<div id="int-overview">
<h3>Overview</h3>

Connect SQL Server to Datadog in order to:
<ul>
<li> Visualize your database performance.</li>
<li> Correlate the performance of SQL Server with the rest of your applications.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/sqlserver.yaml.example">
SQL Server YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/sqlserver.py">
SQL Server checks.d</a>

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
