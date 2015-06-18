---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-MySQL Integration
---

### Overview
{:#int-overview}

Connect MySQL to Datadog in order to:

- Visualize your database performance
-  Correlate the performance of MySQL with the rest of your applications

From the open-source Agent:

* [Example](https://github.com/DataDog/dd-agent/blob/master/conf.d/mysql.yaml.example)
* [MySQL checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/mysql.py)

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
