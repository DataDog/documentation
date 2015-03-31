---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-MySQL Integration
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/ja/integrations/"
---
<div id="int-overview">
<h3>Overview</h3>

Connect MySQL to Datadog in order to:
<ul>
<li> Visualize your database performance</li>
<li> Correlate the performance of MySQL with the rest of your applications</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/mysql.yaml.example">MySQL YAML Example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/mysql.py">MySQL checks.d</a>

The following metrics are collected by default with the MySQL integration:

    mysql.innodb.buffer_pool_size
    mysql.innodb.data_reads
    mysql.innodb.data_writes
    mysql.innodb.os_log_fsyncs
    mysql.net.connections
    mysql.net.max_connections
    mysql.performance.created_tmp_disk_tables
    mysql.performance.open_files
    mysql.performance.queries
    mysql.performance.questions
    mysql.performance.slow_queries
    mysql.performance.table_locks_waited
    mysql.performance.threads_connected
