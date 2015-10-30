---
title: Datadog-MySQL Integration
integration_title: MySQL
kind: integration
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

    mysql.innodb.buffer_pool_free
    mysql.innodb.buffer_pool_total
    mysql.innodb.buffer_pool_used
    mysql.innodb.buffer_pool_utilization
    mysql.innodb.data_reads
    mysql.innodb.data_writes
    mysql.innodb.os_log_fsyncs
    mysql.innodb.mutex_spin_waits
    mysql.innodb.mutex_spin_rounds
    mysql.innodb.mutex_os_waits
    mysql.innodb.row_lock_waits
    mysql.innodb.row_lock_time
    mysql.innodb.current_row_locks
    mysql.net.connections
    mysql.net.max_connections
    mysql.performance.created_tmp_tables
    mysql.performance.created_tmp_disk_tables
    mysql.performance.created_tmp_files
    mysql.performance.key_cache_utilization
    mysql.performance.open_files
    mysql.performance.open_tables
    mysql.performance.queries
    mysql.performance.questions
    mysql.performance.slow_queries
    mysql.performance.table_locks_waited
    mysql.performance.threads_connected
    mysql.performance.threads_running
    mysql.performance.com_select
    mysql.performance.com_insert
    mysql.performance.com_update
    mysql.performance.com_delete
    mysql.performance.com_insert_select
    mysql.performance.com_update_multi
    mysql.performance.com_delete_multi
    mysql.performance.com_replace_select
    mysql.performance.qcache_hits
    mysql.replication.slave_running
    mysql.replication.seconds_behind_master

The Agent also collects system metrics from servers running locally:

    mysql.performance.user_time
    mysql.performance.kernel_time

And the following metric for Galera Cluster:

    mysql.galera.wsrep_cluster_size
