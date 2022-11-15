---
title: Collect SQL Server Custom Metrics
kind: guide
aliases:
  - /integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "Datadog-MySQL integration"
---

By default, the [Datadog-SQL server Check][1] only captures *some* of the metrics available in the `sys.dm_os_performance_counters` table. Add additional metrics by following one of the guides below.

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

The default table from which counters are drawn is the `sys.dm_os_performance_counters` table. The Datadog-SQL server check also supports `sys.dm_os_wait_stats`, `sys.dm_os_memory_clerks`, and `sys.dm_io_virtual_file_stats`.

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


## Custom Queries

To collect more complex custom metrics with the SQL Server integration, use the `custom_queries` option in the `conf.d/sqlserver.d/conf.yaml` file at the root of your [Agent's configuration directory](/agent/guide/agent-configuration-files/#agent-configuration-directory). See the sample [sqlserver.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example) for more details.


### Configuration

`custom_queries` has the following options:

| Option        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Yes      | This is the SQL to execute. It can be a simple statement or a multi-line script. All of the rows of the results are evaluated. Use the pipe if you require a multi-line script.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Yes      | This is a list representing each column ordered sequentially from left to right.<br><br>There are 2 required pieces of data:<br>  - **`name`**: This is the suffix to append to the metric_prefix to form the full metric name. If the `type` is specified as `tag`, the column is instead applied as a tag to every metric collected by this query.<br>  - **`type`**: This is the submission method (`gauge`, `count`, `rate`, etc.). This can also be set to `tag` to tag each metric in the row with the name and value (`<name>:<row_value>`) of the item in this column. |
| tags          | No       | A list of static tags to apply to each metric.


### Notes

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

#### Database and table

Below is the `company` table from `testdb` database. The table contains 3 employee records:

```text
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

#### From a SQL query to the YAML configuration

The goal is to capture the age and salary of Paul as metric values with their name and address as tags.

SQL query:

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
      - query:custom
```

After updating the SQL Server YAML file, [restart the Datadog Agent](/agent/guide/agent-commands/#restart-the-agent).

#### Validation

To verify the result, search for the metrics using the [Metrics Explorer](/metrics/explorer/):

{{< img src="integrations/faq/sql_metric_explorer.png" alt="sql_metric_explorer"  >}}

#### Debugging

[Run the Agent's status subcommand](/agent/guide/agent-commands/#agent-status-and-information) and look for `sqlserver` under the Checks section:

```text
sqlserver
--------
  - instance #0 [ERROR]: 'Missing query parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

Additionally, the [Agent's logs](/agent/guide/agent-log-files/) may provide useful information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /metrics/#metric-types
[4]: /metrics/types/?tab=histogram#metric-types
