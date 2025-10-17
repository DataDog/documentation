---
title: MySQL Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > MySQL Metrics
sourceUrl: https://docs.datadoghq.com/opentelemetry/integrations/mysql_metrics/index.html
---

# MySQL Metrics

## Overview{% #overview %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/mysql_metrics.c85e1516ba5fafcd2a34f7f47a25f728.png?auto=format"
   alt="OpenTelemetry MySQL metrics in a MySQL dashboard" /%}

The [MySQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) allows for collection of MySQL metrics and access to the [MySQL Overview](https://app.datadoghq.com/dash/integration/12/mysql---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `mysqlreceiver`.

For more information, see the OpenTelemetry project documentation for the [MySQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver).

## Setup{% #setup %}

To collect MySQL metrics with OpenTelemetry for use with Datadog:

1. Configure the [MySQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) in your OpenTelemetry Collector configuration.
1. Optionally, configure the [host metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver) if your OpenTelemetry Collector is running on the same server as your MySQL database.
1. Optionally, configure the [file log receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver) if your OpenTelemetry Collector is running on the same server as your MySQL database.
1. Configure service pipelines.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

### MySQL receiver{% #mysql-receiver %}

```
receivers:
  mysql/mysql-host-1:
    endpoint: "<HOST>:<PORT>"
    username: "<USERNAME>"
    password: "<PASSWORD>"
    collection_interval: 10s
    metrics:
      mysql.connection.count:
        enabled: true
      mysql.connection.errors:
        enabled: true
      mysql.commands:
        enabled: true
      mysql.query.slow.count:
        enabled: true
      mysql.max_used_connections:
        enabled: true

processors:
  resource/mysql-host-1:
    attributes:
      - action: insert
        key: datadog.host.name
        value: <HOST>
  transform/mysql-host-1:
    metric_statements:
      - convert_sum_to_gauge() where metric.name == "mysql.locks"
  cumulativetodelta: {}
  deltatorate:
    metrics:
      - mysql.connection.count
      - mysql.commands
      - mysql.operations
      - mysql.query.slow.count
      - mysql.connection.errors
      - mysql.log_operations
      - system.network.io
```

See the [MySQL receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) for detailed configuration options and requirements.

### Host metrics receiver{% #host-metrics-receiver %}

```yaml
receivers:
  hostmetrics:
    scrapers:
      load:
      cpu:
        metrics:
         system.cpu.utilization:
           enabled: true
      memory:
      network:
```

### File log receiver{% #file-log-receiver %}

```yaml
receivers:
  filelog:
    include:
      - <PATH_TO_YOUR_MYSQL_ERROR_LOG>
      - <PATH_TO_YOUR_MYSQL_LOG_FILE>
    operators:
      - type: json_parser
        parse_from: body
        timestamp:
          parse_from: attributes.timestamp
          layout: "%Y-%m-%dT%H:%M:%SZ"

processors:
  transform/logs:
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.name"], "<HOST>")
          - set(attributes["datadog.log.source"], "mysql")

  batch: {}
```

### Service pipelines{% #service-pipelines %}

```yaml
service:
  pipelines:
    metrics/mysql-host-1:
      receivers: [mysql/mysql-host-1]
      exporters: [datadog/exporter]
      processors: [resource/mysql-host-1,cumulativetodelta,deltatorate,transform/mysql-host-1]
```

Add `hostmetrics` and `filelog` receiver if you configured them, for example:

```yaml
      receivers: [mysql/mysql-host-1,hostmetrics,filelog]
```

## Data collected{% #data-collected %}

| OTEL                             | DATADOG                                     | DESCRIPTION                                                            | FILTER                            |
| -------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------- |
| mysql.buffer_pool.data_pages     | mysql.innodb.buffer_pool_pages_data         | The number of data pages in the InnoDB buffer pool.                    |
| mysql.buffer_pool.data_pages     | mysql.innodb.buffer_pool_pages_dirty        | The number of data pages in the InnoDB buffer pool.                    | `status`: `dirty`                 |
| mysql.buffer_pool.operations     | mysql.innodb.buffer_pool_read_ahead_rnd     | The number of operations on the InnoDB buffer pool.                    | `operation`: `read_ahead_rnd`     |
| mysql.buffer_pool.operations     | mysql.innodb.buffer_pool_write_requests     | The number of operations on the InnoDB buffer pool.                    | `operation`: `write_requests`     |
| mysql.buffer_pool.operations     | mysql.innodb.buffer_pool_read_ahead         | The number of operations on the InnoDB buffer pool.                    | `operation`: `read_ahead`         |
| mysql.buffer_pool.operations     | mysql.innodb.buffer_pool_read_ahead_evicted | The number of operations on the InnoDB buffer pool.                    | `operation`: `read_ahead_evicted` |
| mysql.buffer_pool.operations     | mysql.innodb.buffer_pool_wait_free          | The number of operations on the InnoDB buffer pool.                    | `operation`: `wait_free`          |
| mysql.buffer_pool.operations     | mysql.innodb.buffer_pool_read_requests      | The number of operations on the InnoDB buffer pool.                    | `operation`: `read_requests`      |
| mysql.buffer_pool.operations     | mysql.innodb.buffer_pool_reads              | The number of operations on the InnoDB buffer pool.                    | `operation`: `reads`              |
| mysql.buffer_pool.page_flushes   | mysql.innodb.buffer_pool_pages_flushed      | The number of requests to flush pages from the InnoDB buffer pool.     |
| mysql.buffer_pool.pages          | mysql.innodb.buffer_pool_pages_free         | The number of pages in the InnoDB buffer pool.                         | `kind`: `free`                    |
| mysql.buffer_pool.pages          | mysql.innodb.buffer_pool_pages_total        | The number of pages in the InnoDB buffer pool.                         |
| mysql.buffer_pool.usage          | mysql.innodb.buffer_pool_data               | The number of bytes in the InnoDB buffer pool.                         |
| mysql.buffer_pool.usage          | mysql.innodb.buffer_pool_dirty              | The number of bytes in the InnoDB buffer pool.                         | `status`: `dirty`                 |
| mysql.client.network.io          | mysql.performance.bytes_sent                | The number of transmitted bytes between server and clients.            | `kind`: `sent`                    |
| mysql.client.network.io          | mysql.performance.bytes_received            | The number of transmitted bytes between server and clients.            | `kind`: `received`                |
| mysql.commands                   | mysql.performance.com_update                | The number of times each type of command has been executed.            | `kind`: `update`                  |
| mysql.commands                   | mysql.performance.com_insert                | The number of times each type of command has been executed.            | `kind`: `insert`                  |
| mysql.commands                   | mysql.performance.com_delete                | The number of times each type of command has been executed.            | `kind`: `delete`                  |
| mysql.commands                   | mysql.performance.com_select                | The number of times each type of command has been executed.            | `kind`: `select`                  |
| mysql.double_writes              | mysql.innodb.dblwr_writes                   | The number of writes to the InnoDB doublewrite buffer.                 | `kind`: `writes`                  |
| mysql.double_writes              | mysql.innodb.dblwr_pages_written            | The number of writes to the InnoDB doublewrite buffer.                 | `kind`: `pages_written`           |
| mysql.handlers                   | mysql.performance.handler_delete            | The number of requests to various MySQL handlers.                      | `kind`: `delete`                  |
| mysql.handlers                   | mysql.performance.handler_commit            | The number of requests to various MySQL handlers.                      | `kind`: `commit`                  |
| mysql.handlers                   | mysql.performance.handler_read_key          | The number of requests to various MySQL handlers.                      | `kind`: `read_key`                |
| mysql.handlers                   | mysql.performance.handler_read_prev         | The number of requests to various MySQL handlers.                      | `kind`: `read_prev`               |
| mysql.handlers                   | mysql.performance.handler_read_rnd          | The number of requests to various MySQL handlers.                      | `kind`: `read_rnd`                |
| mysql.handlers                   | mysql.performance.handler_read_rnd_next     | The number of requests to various MySQL handlers.                      | `kind`: `read_rnd_next`           |
| mysql.handlers                   | mysql.performance.handler_rollback          | The number of requests to various MySQL handlers.                      | `kind`: `rollback`                |
| mysql.handlers                   | mysql.performance.handler_prepare           | The number of requests to various MySQL handlers.                      | `kind`: `prepare`                 |
| mysql.handlers                   | mysql.performance.handler_read_next         | The number of requests to various MySQL handlers.                      | `kind`: `read_next`               |
| mysql.handlers                   | mysql.performance.handler_write             | The number of requests to various MySQL handlers.                      | `kind`: `write`                   |
| mysql.handlers                   | mysql.performance.handler_update            | The number of requests to various MySQL handlers.                      | `kind`: `update`                  |
| mysql.handlers                   | mysql.performance.handler_read_first        | The number of requests to various MySQL handlers.                      | `kind`: `read_first`              |
| mysql.joins                      | mysql.performance.select_full_join          | The number of joins that perform table scans.                          | `kind`: `full`                    |
| mysql.joins                      | mysql.performance.select_full_range_join    | The number of joins that perform table scans.                          | `kind`: `full_range`              |
| mysql.joins                      | mysql.performance.select_range              | The number of joins that perform table scans.                          | `kind`: `range`                   |
| mysql.joins                      | mysql.performance.select_range_check        | The number of joins that perform table scans.                          | `kind`: `range_check`             |
| mysql.joins                      | mysql.performance.select_scan               | The number of joins that perform table scans.                          | `kind`: `scan`                    |
| mysql.locks                      | mysql.performance.table_locks_immediate     | The number of MySQL locks.                                             | `kind`: `immediate`               |
| mysql.locks                      | mysql.performance.table_locks_waited        | The number of MySQL locks.                                             | `kind`: `waited`                  |
| mysql.log_operations             | mysql.innodb.log_write_requests             | The number of InnoDB log operations.                                   | `operation`: `write_requests`     |
| mysql.log_operations             | mysql.innodb.log_writes                     | The number of InnoDB log operations.                                   | `operation`: `writes`             |
| mysql.log_operations             | mysql.innodb.log_waits                      | The number of InnoDB log operations.                                   | `operation`: `waits`              |
| mysql.operations                 | mysql.innodb.data_fsyncs                    | The number of InnoDB operations.                                       | `operation`: `fsyncs`             |
| mysql.page_operations            | mysql.innodb.pages_created                  | The number of InnoDB page operations.                                  | `operation`: `created`            |
| mysql.page_operations            | mysql.innodb.pages_read                     | The number of InnoDB page operations.                                  | `operation`: `read`               |
| mysql.page_operations            | mysql.innodb.pages_written                  | The number of InnoDB page operations.                                  | `operation`: `written`            |
| mysql.replica.time_behind_source | mysql.replication.seconds_behind_source     | This field is an indication of how "late" the replica is.              |
| mysql.row_locks                  | mysql.innodb.current_row_locks              | The number of InnoDB row locks.                                        |
| mysql.row_locks                  | mysql.innodb.row_lock_current_waits         | The number of InnoDB row locks.                                        | `kind`: `waits`                   |
| mysql.row_operations             | mysql.innodb.rows_updated                   | The number of InnoDB row operations.                                   | `operation`: `updated`            |
| mysql.row_operations             | mysql.innodb.rows_read                      | The number of InnoDB row operations.                                   | `operation`: `read`               |
| mysql.row_operations             | mysql.innodb.rows_inserted                  | The number of InnoDB row operations.                                   | `operation`: `inserted`           |
| mysql.row_operations             | mysql.innodb.rows_deleted                   | The number of InnoDB row operations.                                   | `operation`: `deleted`            |
| mysql.sorts                      | mysql.performance.sort_scan                 | The number of MySQL sorts.                                             | `kind`: `scan`                    |
| mysql.sorts                      | mysql.performance.sort_rows                 | The number of MySQL sorts.                                             | `kind`: `rows`                    |
| mysql.sorts                      | mysql.performance.sort_merge_passes         | The number of MySQL sorts.                                             | `kind`: `merge_passes`            |
| mysql.sorts                      | mysql.performance.sort_range                | The number of MySQL sorts.                                             | `kind`: `range`                   |
| mysql.table_open_cache           | mysql.performance.table_cache_hits          | The number of hits, misses or overflows for open tables cache lookups. | `status`: `hit`                   |
| mysql.table_open_cache           | mysql.performance.table_cache_misses        | The number of hits, misses or overflows for open tables cache lookups. | `status`: `miss`                  |
| mysql.threads                    | mysql.performance.threads_running           | The state of MySQL threads.                                            | `kind`: `running`                 |
| mysql.threads                    | mysql.performance.threads_cached            | The state of MySQL threads.                                            | `kind`: `cached`                  |
| mysql.threads                    | mysql.performance.threads_connected         | The state of MySQL threads.                                            | `kind`: `connected`               |
| mysql.threads                    | mysql.performance.threads_created           | The state of MySQL threads.                                            | `kind`: `created`                 |
| mysql.tmp_resources              | mysql.performance.created_tmp_tables        | The number of created temporary resources.                             | `resource`: `tables`              |
| mysql.tmp_resources              | mysql.performance.created_tmp_disk_tables   | The number of created temporary resources.                             | `resource`: `disk_tables`         |
| mysql.tmp_resources              | mysql.performance.created_tmp_files         | The number of created temporary resources.                             | `resource`: `files`               |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/collector_exporter/)
