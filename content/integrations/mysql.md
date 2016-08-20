---
title: Datadog-MySQL Integration
integration_title: MySQL
kind: integration
git_integration_title: mysql
newhlevel: true
---
# Overview

Connect MySQL to Datadog in order to:

  * Visualize your database performance
  * Correlate the performance of MySQL with the rest of your applications

# Installation

1.  Create a ```datadog``` user with replication rights on your MySQL server with the following command, replacing ```<UNIQUEPASSWORD>``` with a unique password:

        sudo mysql -e "CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';"
        sudo mysql -e "GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;"

    If you'd like to get the full metrics catalog please also grant the following privileges:

        sudo mysql -e "GRANT PROCESS ON *.* TO 'datadog'@'localhost';"
        sudo mysql -e "GRANT SELECT ON performance_schema.* TO 'datadog'@'localhost';"

2.  Verify that the user was created successfully using the following command, replacing ```<UNIQUEPASSWORD>``` with the password above:

        mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
        grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
        echo -e "\033[0;31mCannot connect to MySQL\033[0m"
        mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
        echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
        echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"

# Configuration

1. Edit the mysql.yaml file in your agent's conf.d directory, replacing ```<UNIQUEPASSWORD>``` with the password used above.

       init_config:

       instances:
         - server: localhost
           user: datadog
           pass: <UNIQUEPASSWORD>

           tags:
               - optional_tag1
               - optional_tag2
           options:
               replication: 0
               galera_cluster: 1
               extra_status_metrics: true
               extra_innodb_metrics: true
               extra_performance_metrics: true
               schema_size_metrics: false
               disable_innodb_metrics: false

    Agent 5.7 added a new option: `disable_innodb_metrics`. This should only be used with older versions of MySQL without innodb engine support.

    See the metrics section below to see a list of the new metrics provided by each of the metric options.


<%= insert_example_links%>

# Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:


    Checks
    ======
      [...]
      mysql
      -----
          - instance #0 [OK]
          - Collected 8 metrics & 0 events

# Metrics

<%= get_metrics_from_git()%>

|`extra_status_metrics` adds the following metrics:|
|----------|--------|
| mysql.binlog.cache_disk_use | GAUGE |
| mysql.binlog.cache_use | GAUGE |
| mysql.performance.handler_commit | RATE |
| mysql.performance.handler_delete | RATE |
| mysql.performance.handler_prepare | RATE |
| mysql.performance.handler_read_first | RATE |
| mysql.performance.handler_read_key | RATE |
| mysql.performance.handler_read_next | RATE |
| mysql.performance.handler_read_prev | RATE |
| mysql.performance.handler_read_rnd | RATE |
| mysql.performance.handler_read_rnd_next | RATE |
| mysql.performance.handler_rollback | RATE |
| mysql.performance.handler_update | RATE |
| mysql.performance.handler_write | RATE |
| mysql.performance.opened_tables | RATE |
| mysql.performance.qcache_total_blocks | GAUGE |
| mysql.performance.qcache_free_blocks | GAUGE |
| mysql.performance.qcache_free_memory | GAUGE |
| mysql.performance.qcache_not_cached | RATE |
| mysql.performance.qcache_queries_in_cache | GAUGE |
| mysql.performance.select_full_join | RATE |
| mysql.performance.select_full_range_join | RATE |
| mysql.performance.select_range | RATE |
| mysql.performance.select_range_check | RATE |
| mysql.performance.select_scan | RATE |
| mysql.performance.sort_merge_passes | RATE |
| mysql.performance.sort_range | RATE |
| mysql.performance.sort_rows | RATE |
| mysql.performance.sort_scan | RATE |
| mysql.performance.table_locks_immediate | GAUGE |
| mysql.performance.table_locks_immediate.rate | RATE |
| mysql.performance.threads_cached | GAUGE |
| mysql.performance.threads_created | MONOTONIC |
{:.table}

|`extra_innodb_metrics` adds the following metrics:|
|----------|--------|
| mysql.innodb.active_transactions | GAUGE |
| mysql.innodb.buffer_pool_data | GAUGE |
| mysql.innodb.buffer_pool_pages_data | GAUGE |
| mysql.innodb.buffer_pool_pages_dirty | GAUGE |
| mysql.innodb.buffer_pool_pages_flushed | RATE |
| mysql.innodb.buffer_pool_pages_free | GAUGE |
| mysql.innodb.buffer_pool_pages_total | GAUGE |
| mysql.innodb.buffer_pool_read_ahead | RATE |
| mysql.innodb.buffer_pool_read_ahead_evicted | RATE |
| mysql.innodb.buffer_pool_read_ahead_rnd | GAUGE |
| mysql.innodb.buffer_pool_wait_free | MONOTONIC |
| mysql.innodb.buffer_pool_write_requests | RATE |
| mysql.innodb.checkpoint_age | GAUGE |
| mysql.innodb.current_transactions | GAUGE |
| mysql.innodb.data_fsyncs | RATE |
| mysql.innodb.data_pending_fsyncs | GAUGE |
| mysql.innodb.data_pending_reads | GAUGE |
| mysql.innodb.data_pending_writes | GAUGE |
| mysql.innodb.data_read | RATE |
| mysql.innodb.data_written | RATE |
| mysql.innodb.dblwr_pages_written | RATE |
| mysql.innodb.dblwr_writes | RATE |
| mysql.innodb.hash_index_cells_total | GAUGE |
| mysql.innodb.hash_index_cells_used | GAUGE |
| mysql.innodb.history_list_length | GAUGE |
| mysql.innodb.ibuf_free_list | GAUGE |
| mysql.innodb.ibuf_merged | RATE |
| mysql.innodb.ibuf_merged_delete_marks | RATE |
| mysql.innodb.ibuf_merged_deletes | RATE |
| mysql.innodb.ibuf_merged_inserts | RATE |
| mysql.innodb.ibuf_merges | RATE |
| mysql.innodb.ibuf_segment_size | GAUGE |
| mysql.innodb.ibuf_size | GAUGE |
| mysql.innodb.lock_structs | RATE |
| mysql.innodb.locked_tables | GAUGE |
| mysql.innodb.locked_transactions | GAUGE |
| mysql.innodb.log_waits | RATE |
| mysql.innodb.log_write_requests | RATE |
| mysql.innodb.log_writes | RATE |
| mysql.innodb.lsn_current | RATE |
| mysql.innodb.lsn_flushed | RATE |
| mysql.innodb.lsn_last_checkpoint | RATE |
| mysql.innodb.mem_adaptive_hash | GAUGE |
| mysql.innodb.mem_additional_pool | GAUGE |
| mysql.innodb.mem_dictionary | GAUGE |
| mysql.innodb.mem_file_system | GAUGE |
| mysql.innodb.mem_lock_system | GAUGE |
| mysql.innodb.mem_page_hash | GAUGE |
| mysql.innodb.mem_recovery_system | GAUGE |
| mysql.innodb.mem_thread_hash | GAUGE |
| mysql.innodb.mem_total | GAUGE |
| mysql.innodb.os_file_fsyncs | RATE |
| mysql.innodb.os_file_reads | RATE |
| mysql.innodb.os_file_writes | RATE |
| mysql.innodb.os_log_pending_fsyncs | GAUGE |
| mysql.innodb.os_log_pending_writes | GAUGE |
| mysql.innodb.os_log_written | RATE |
| mysql.innodb.pages_created | RATE |
| mysql.innodb.pages_read | RATE |
| mysql.innodb.pages_written | RATE |
| mysql.innodb.pending_aio_log_ios | GAUGE |
| mysql.innodb.pending_aio_sync_ios | GAUGE |
| mysql.innodb.pending_buffer_pool_flushes | GAUGE |
| mysql.innodb.pending_checkpoint_writes | GAUGE |
| mysql.innodb.pending_ibuf_aio_reads | GAUGE |
| mysql.innodb.pending_log_flushes | GAUGE |
| mysql.innodb.pending_log_writes | GAUGE |
| mysql.innodb.pending_normal_aio_reads | GAUGE |
| mysql.innodb.pending_normal_aio_writes | GAUGE |
| mysql.innodb.queries_inside | GAUGE |
| mysql.innodb.queries_queued | GAUGE |
| mysql.innodb.read_views | GAUGE |
| mysql.innodb.rows_deleted | RATE |
| mysql.innodb.rows_inserted | RATE |
| mysql.innodb.rows_read | RATE |
| mysql.innodb.rows_updated | RATE |
| mysql.innodb.s_lock_os_waits | RATE |
| mysql.innodb.s_lock_spin_rounds | RATE |
| mysql.innodb.s_lock_spin_waits | RATE |
| mysql.innodb.semaphore_wait_time | GAUGE |
| mysql.innodb.semaphore_waits | GAUGE |
| mysql.innodb.tables_in_use | GAUGE |
| mysql.innodb.x_lock_os_waits | RATE |
| mysql.innodb.x_lock_spin_rounds | RATE |
| mysql.innodb.x_lock_spin_waits | RATE |
{:.table}

|`extra_performance_metrics` adds the following metrics:|
|----------|--------|
| mysql.performance.query_run_time.avg | GAUGE |
| mysql.performance.digest_95th_percentile.avg_us | GAUGE |
{:.table}

|`schema_size_metrics` adds the following metric:|
|----------|--------|
| mysql.info.schema.size | GAUGE |
{:.table}




