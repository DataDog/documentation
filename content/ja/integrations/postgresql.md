---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-PostgreSQL Integration
---

<div id="int-overview">
<h3>Overview</h3>

Connect PostgreSQL to Datadog in order to:
<ul>
<li> Visualize your database performance.</li>
<li> Correlate the performance of PostgreSQL with the rest of your applications.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/postgres.yaml.example">
PostgreSQL YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/postgres.py">
PostgreSQL checks.d</a>

The following metrics are collected by default with the PostgreSQL integration:

    postgresql.buffer_hit
    postgresql.commits
    postgresql.connections
    postgresql.dead_rows
    postgresql.deadlocks
    postgresql.disk_read
    postgresql.index_rows_fetched
    postgresql.index_rows_read
    postgresql.index_scans
    postgresql.live_rows
    postgresql.rollbacks
    postgresql.rows_deleted
    postgresql.rows_fetched
    postgresql.rows_hot_updated
    postgresql.rows_inserted
    postgresql.rows_returned
    postgresql.rows_updated
    postgresql.seq_rows_read
    postgresql.seq_scans
    postgresql.temp_bytes
    postgresql.temp_files
