---
title: Collect SQL Server Custom Metrics
kind: faq
---

By default the [Datadog-SQL server Check][1] only captures *some* of the metrics available in the `sys.dm_os_performance_counters` table. Add additional metrics by following the `custom_metrics` structure.

## Collecting metrics from DMV

Find below an example for a basic custom metric collection. There is no instance associated with this counter. **Note**: You can specify optional `tags` to be sent with your metrics:

```
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
    tags:
      - tag_name:value
```

Parameter descriptions:

| Parameter      | Description                                           |
| ------         | ------                                                |
| `name`         | Name of your metric inside Datadog.                   |
| `counter_name` | The counter name of [SQL server database objects][2]. |

If a counter has multiple instances associated with it, you can choose to fetch a single instance with the `instance_name` parameter name: 

```
custom_metrics:
  - name: sqlserver.exec.in_progress
    counter_name: OLEDB calls
    instance_name: Cumulative execution time (ms) per second
```

For finer granularity, query by the `object_name` :

```
custom_metrics:
- name: sqlserver.cache.hit_ratio
  counter_name: Cache Hit Ratio
  instance_name: SQL Plans
  object_name: SQLServer:Plan Cache
```

To collect all instances of a counter with multiple instances use the special value `ALL` for the `instance_name` parameter which **requires** a value for the `tag_by` parameter. This example gets metrics tagged as `db:mydb1`, `db:mydb2`:

```
- name: sqlserver.db.commit_table_entries
  counter_name: Commit table entries
  instance_name: ALL
  tag_by: db
```

The default table from which counters are drawn is the `sys.dm_os_performance_counters` table.  The Datadog-SQL server check also supports `sys.dm_os_wait_stats`, `sys.dm_os_memory_clerks`, and `sys.dm_io_virtual_file_stats`.

To report a metric drawn from one of the additional tables, specify the table in the counter definition with the `table` parameter, as well as the counter columns to be reported with the `columns` parameter:

```
custom_metrics:
  - name: sqlserver.LCK_M_S
    table: sys.dm_os_wait_stats
    counter_name: LCK_M_S
    columns:
      - max_wait_time_ms
      - signal_wait_time_ms

```

The above example reports two metrics, `sqlserver.LCK_M_S.max_wait_time.ms` and `sqlserver.LCK_M_S.signal_wait_time_ms`. 

**Note**: If metrics like `sys.dm_io_virtual_file_stats` and `sys.dm_os_memory_clerks` are not associated with a `counter_name` only the columns need to be specified:

```
custom_metrics:
  - name: sqlserver.io_file_stats
    table: sys.dm_io_virtual_file_stats
    columns:
      - num_of_reads
      - num_of_writes
```

The above example reports two metrics, `sqlserver.io_file_stats.num_of_reads` and `sqlserver.io_file_stats.num_of_writes` each tagged with the database ID and file ID.

## Collecting metrics from a custom proc

As well as capturing from the DMV you can also capture from a custom proc
Please note this feature produces a number of custom metrics that might affect your billing. This feature is also only available when using the adodbapi driver (set by default)

To collect metrics from a custom procedure, update the instance definition inside your `sqlserver.d/conf.yaml` file with the procedure to execute:

```
stored_procedure: <PROCEDURE_NAME>
```

The procedure should return this table:

```
CREATE TABLE #Datadog
(
  [metric] varchar(255) not null,
  [type] varchar(50) not null,
  [value] float not null,
  [tags] varchar(255)
)
```

**Note**: SET NOCOUNT to ON inside the procedure to avoid extra result sets that prevent valid query results.

You can also specify:

| Parameter                 | Description                                                                                   | Default            |
| ---------                 | -------                                                                                       | --------           |
| `ignore_missing_database` | If the DB specified doesn't exist on the server then don't do the check.                      | `False`            |
| `proc_only_if`            | Run this SQL before each call to `stored_procedure`. If it returns 1, call the procedure. |                    |
| `proc_only_if_database`   | The database to run the `proc_only_if` SQL in.                                                | database attribute |


**Note**: The `proc_only_if` guard condition is useful for HA scenarios where a database can move between servers.

[1]: /integrations/sqlserver
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
