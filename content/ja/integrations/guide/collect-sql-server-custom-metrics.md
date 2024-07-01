---
title: Collect SQL Server Custom Metrics
kind: guide
aliases:
  - /integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Datadog-MySQL integration
---

This guide explains how to collect custom metrics from SQL Server.

## Custom queries

To collect more complex custom metrics with the SQL Server integration, use the `custom_queries` option in the `conf.d/sqlserver.d/conf.yaml` file at the root of your [Agent's configuration directory][5]. See the sample [sqlserver.d/conf.yaml][6] for more details.

### Configuration

`custom_queries` has the following options:

| Option        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Yes      | The SQL to execute. This can be a simple statement or a multi-line script. All rows of the results are evaluated. Use the pipe character (`\|`) if you require a multi-line script.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Yes      | A list representing each column ordered sequentially from left to right.<br><br>There are two required pieces of data:<br>  - **`name`**: The suffix to append to the `metric_prefix` to form the full metric name. If the `type` is specified as `tag`, the column is instead applied as a tag to every metric collected by this query.<br>  - **`type`**: The submission method (`gauge`, `count`, `rate`, etc.). This can also be set to `tag` to tag each metric in the row with the name and value (`<name>:<row_value>`) of the item in this column. |
| tags          | No       | A list of static tags to apply to each metric.


- At least one of the items in defined `columns` should be a metric type (`gauge`, `count`, `rate`, etc.).
- The number of items defined in `columns` must equal the number of columns returned in the query.
- The order in which the items in `columns` are defined must be same order returned in the query.

  ```yaml
  custom_queries:
    - query: Select F3, F2, F1 from Table;
      columns:
        - {name: f3_metric_alias, type: gauge}
        - {name: f2_tagkey      , type: tag  }
        - {name: f1_metric_alias, type: count}
      [...]
  ```

### Example

Below is a `company` table from a `testdb` database. The table contains three employee records:

```text
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

The following SQL query captures the age and salary of Paul as metric values, with Paul's name and address as tags.

```text
SELECT age,salary,name,address FROM company WHERE name = 'Paul'
```

Corresponding `custom_queries` YAML configuration:

```yaml
custom_queries:
  - query: SELECT age,salary,name,address FROM company WHERE name = 'Paul'
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: localisation
        type: tag
    tags:
      - 'query:custom'
```

After you update the SQL Server YAML file, [restart the Datadog Agent][7].

#### Validation

To verify your results, search for the metrics using the [Metrics Explorer][8].

#### Debugging

[Run the Agent's status subcommand][9] and look for `sqlserver` under the Checks section:

```text
sqlserver
--------
  - instance #0 [ERROR]: 'Missing query parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

Additionally, the [Agent's logs][10] may provide useful information.

## Collecting metrics from Performance Counters

By default, the [Datadog-SQL server Check][1] only captures *some* of the metrics available in the `sys.dm_os_performance_counters` table.

Find below an example for a basic metric collection from performance counters. **Note**: You can specify optional `tags` to be sent with your metrics:

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
| `tags`         | A list of key:value tag pairs.                        |

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

To collect all instances of a counter with multiple instances, use the special, case-sensitive value `ALL` for the `instance_name` parameter which **requires** a value for the `tag_by` parameter. This example gets metrics tagged as `db:mydb1`, `db:mydb2`:

```yaml
custom_metrics:
  - name: sqlserver.db.commit_table_entries
    counter_name: Commit table entries
    instance_name: ALL
    tag_by: db
```

The default table from which counters are drawn is the `sys.dm_os_performance_counters` table. The Datadog-SQL Server check also supports `sys.dm_os_wait_stats`, `sys.dm_os_memory_clerks`, and `sys.dm_io_virtual_file_stats`.

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

## Collecting metrics from a custom procedure (legacy)

This is a legacy method of collecting custom metrics from the database. It is recommended to use the `custom_queries` parameter, which requires less setup, provides more flexibility in the types of T-SQL that can be executed, and is easier to debug. Collecting metrics from a custom procedure produces a large volume of custom metrics that may affect your billing.

### Setup a stored procedure

You must set up a temporary table to collect the custom metrics for reporting to Datadog. The table needs the following columns:

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

  -- Create a temporary table
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

  -- Insert any custom metrics into the table #Datadog
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
| `ignore_missing_database` | If the DB specified doesn't exist on the server, then don't do the check.                  | `False`            |
| `proc_only_if`            | Run this SQL before each call to `stored_procedure`. If it returns 1, call the procedure. |                    |
| `proc_only_if_database`   | The database to run the `proc_only_if` SQL in.                                            | database attribute |

**Note**: The `proc_only_if` guard condition is useful for high-availability scenarios where a database can move between servers.

### Troubleshooting

If your custom metrics do not appear in Datadog, check the Agent log file. If you see the following error: `Could not call procedure <PROCEDURE_NAME>: You must supply -1 parameters for this stored procedure`, it could be one of the following issues:

* The `<PROCEDURE_NAME>` is typed incorrectly.
* The database username specified in the configuration may not have permission to run the stored procedure.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /metrics/#metric-types
[4]: /metrics/types/?tab=histogram#metric-types
[5]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[7]: /agent/guide/agent-commands/#restart-the-agent
[8]: /metrics/explorer/
[9]: /agent/guide/agent-commands/#agent-status-and-information
[10]: /agent/guide/agent-log-files