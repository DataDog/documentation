---
title: Collect SQL Server Custom Metrics
kind: guide
aliases:
  - /integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: "https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics"
  tag: "Blog"
  text: "Create a stored procedure to generate and collect metrics"
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "Datadog-MySQL integration"
---

By default the [Datadog-SQL server Check][1] only captures *some* of the metrics available in the `sys.dm_os_performance_counters` table. Add additional metrics by following the `custom_metrics` structure.

## Collecting metrics from DMV

Find below an example for a basic custom metric collection. There is no instance associated with this counter. **Note**: You can specify optional `tags` to be sent with your metrics:

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
    tags:
      - tag_name:value
```

Parameter descriptions:

| Parameter      | Description                                           |
|----------------|-------------------------------------------------------|
| `name`         | Name of your metric inside Datadog.                   |
| `counter_name` | The counter name of [SQL server database objects][2]. |

If a counter has multiple instances associated with it, you can choose to fetch a single instance with the `instance_name` parameter name:

```yaml
custom_metrics:
  - name: sqlserver.exec.in_progress
    counter_name: OLEDB calls
    instance_name: Cumulative execution time (ms) per second
```

For finer granularity, query by the `object_name` :

```yaml
custom_metrics:
- name: sqlserver.cache.hit_ratio
  counter_name: Cache Hit Ratio
  instance_name: SQL Plans
  object_name: SQLServer:Plan Cache
```

To collect all instances of a counter with multiple instances use the special, case-sensitive value `ALL` for the `instance_name` parameter which **requires** a value for the `tag_by` parameter. This example gets metrics tagged as `db:mydb1`, `db:mydb2`:

```yaml
- name: sqlserver.db.commit_table_entries
  counter_name: Commit table entries
  instance_name: ALL
  tag_by: db
```

The default table from which counters are drawn is the `sys.dm_os_performance_counters` table.  The Datadog-SQL server check also supports `sys.dm_os_wait_stats`, `sys.dm_os_memory_clerks`, and `sys.dm_io_virtual_file_stats`.

To report a metric drawn from one of the additional tables, specify the table in the counter definition with the `table` parameter, as well as the counter columns to be reported with the `columns` parameter:

```yaml
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

```yaml
custom_metrics:
  - name: sqlserver.io_file_stats
    table: sys.dm_io_virtual_file_stats
    columns:
      - num_of_reads
      - num_of_writes
```

The above example reports two metrics, `sqlserver.io_file_stats.num_of_reads` and `sqlserver.io_file_stats.num_of_writes` each tagged with the database ID and file ID.

## Collecting metrics from a custom procedure

Collecting metrics from a custom procedure produces a large amount of custom metrics that may affect your billing.

**Note**: If you are using Agent < 6.11, you need to have set up the `adodbapi` driver in order for this to work.

### Setup a stored procedure

A temporary table must be setup to collect the custom metrics for reporting to Datadog. The table needs the following columns:

| Column   | Description                                               |
|----------|-----------------------------------------------------------|
| `metric` | The name of the metric as it appears in Datadog.          |
| `type`   | The [metric type][3] (gauge, rate, or [histogram][4]).    |
| `value`  | The value of the metric (must be convertible to a float). |
| `tags`   | The tags that appear in Datadog separated by a comma.     |

The following stored procedure is created within the master database:

```text
-- Create a stored procedure with the name <PROCEDURE_NAME>
CREATE PROCEDURE [dbo].[<PROCEDURE_NAME>]
AS
BEGIN

  -- Create a temporary table per integration instructions
  CREATE TABLE #DataDog
  (
    [metric] varchar(255) not null,
    [type] varchar(50) not null,
    [value] float not null,
    [tags] varchar(255)
  )

  -- Remove row counts from result sets
  SET NOCOUNT ON;

  -- Create variable count and set it equal to the number of User Connections
  DECLARE @count float;
  SET @count = (select cntr_value from sys.dm_os_performance_counters where counter_name = 'User Connections');

  -- Insert custom metrics into the table #Datadog
  INSERT INTO #Datadog (metric, type, value, tags)
  VALUES ('sql.test.test', 'gauge', @count, 'db:master,env:staging')
        ,('sql.test.gauge', 'gauge', FLOOR(RAND()*20), 'tag:test')
        ,('sql.test.rate', 'rate', FLOOR(RAND()*20), 'metric:gauge')
        ,('sql.test.histogram', 'histogram', FLOOR(RAND()*20), 'metric:histogram')
  SELECT * from #DataDog
END
GO

-- Grant permission to run the stored procedure
GRANT EXECUTE ON [dbo].[<PROCEDURE_NAME>] To Public
GO
```

The stored procedure outputs the following custom metrics:

* `sql.test.test`
* `sql.test.gauge`
* `sql.test.rate`
* `sql.test.histogram.95percentile`
* `sql.test.histogram.avg`
* `sql.test.histogram.count`
* `sql.test.histogram.max`
* `sql.test.histogram.median`

### Update the SQL Server integration configuration

To collect metrics from a custom procedure, create a new instance definition inside your `sqlserver.d/conf.yaml` file with the procedure to execute. A separate instance is required for any existing configuration. Instances with a stored procedure do not process anything but the stored procedure, for example:

```yaml
  - host: 127.0.0.1,1433
    username: datadog
    password: "<PASSWORD>"
    database: master
  - host: 127.0.0.1,1433
    username: datadog
    password: "<PASSWORD>"
    stored_procedure: "<PROCEDURE_NAME>"
    database: master
```

You can also specify:

| Parameter                 | Description                                                                               | Default            |
|---------------------------|-------------------------------------------------------------------------------------------|--------------------|
| `ignore_missing_database` | If the DB specified doesn't exist on the server then don't do the check.                  | `False`            |
| `proc_only_if`            | Run this SQL before each call to `stored_procedure`. If it returns 1, call the procedure. |                    |
| `proc_only_if_database`   | The database to run the `proc_only_if` SQL in.                                            | database attribute |

**Note**: The `proc_only_if` guard condition is useful for HA scenarios where a database can move between servers.

### Troubleshooting

If your custom metrics are not appearing in Datadog, check the Agent log file. If you see the following error: `Could not call procedure <PROCEDURE_NAME>: You must supply -1 parameters for this stored procedure`, it could be one of the following issues:

* The `<PROCEDURE_NAME>` is typed incorrectly.
* The database username specified in the configuration may not have permission to run the stored procedure.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /developers/metrics/#metric-types
[4]: /developers/metrics/histograms/
