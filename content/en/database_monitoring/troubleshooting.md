---
title: Troubleshooting Database Monitoring
kind: documentation
description: Troubleshoot Database Monitoring setup

---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

This page details common issues with setting up and using Database Monitoring, and how to resolve them. It is recommended to stay on the latest stable Agent version and adhering to the latest [setup documentation][1] as it can change with agent version releases.

## Diagnosing common problems

### No data is showing after configuring Database Monitoring

If you do not see any data after following the [setup instructions][1] and configuring the Agent, there is most likely an issue with the Agent configuration or API key. Ensure you are receiving data from the Agent by following the [troubleshooting guide][2].

If you are receiving other data such as system metrics, but not Database Monitoring data (such as query metrics and query samples), there is probably an issue with the Agent or database configuration. Ensure your Agent configuration looks like the example in the [setup instructions][1], double-checking the location of the configuration files.

{{< tabs >}}
{{% tab "Postgres" %}}

To debug, start by running the [Agent status command][1] to collect debugging information about data collected and sent to Datadog.

Check the `Config Errors` section to ensure the configuration file is valid. For instance, the following indicates a missing instance configuration or invalid file:

```
  Config Errors
  ==============
    postgres
    -----
      Configuration file contains no valid instances
```

If the configuration is valid, the output looks like this:

```
=========
Collector
=========

  Running Checks
  ==============

    postgres (8.0.5)
    ----------------
      Instance ID: postgres:d3dceb9fd36fd57e [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 16,538
      Metric Samples: Last Run: 186, Total: 2,844,362
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
      Database Monitoring Query Samples: Last Run: 1, Total: 17,921
      Service Checks: Last Run: 1, Total: 16,538
      Average Execution Time : 1.765s
      Last Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      Last Successful Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      metadata:
        version.major: 10
        version.minor: 17
        version.patch: 0
        version.raw: 10.17
        version.scheme: semver
```

Ensure that these lines are in the output and have values greater than zero:

```
Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
Database Monitoring Query Samples: Last Run: 1, Total: 17,921
```

[1]: /agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{% tab "MySQL" %}}

To debug, start by running the [Agent status command][1] to collect debugging information about data collected and sent to Datadog.

Check the `Config Errors` section to ensure the configuration file is valid. For instance, the following indicates a missing instance configuration or invalid file:

```
  Config Errors
  ==============
    mysql
    -----
      Configuration file contains no valid instances
```

If the configuration is valid, the output looks like this:

```
=========
Collector
=========

  Running Checks
  ==============

    mysql (5.0.4)
    -------------
      Instance ID: mysql:505a0dd620ccaa2a
      Configuration Source: file:/etc/datadog-agent/conf.d/mysql.d/conf.yaml
      Total Runs: 32,439
      Metric Samples: Last Run: 175, Total: 5,833,916
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
      Database Monitoring Query Samples: Last Run: 1, Total: 74,451
      Service Checks: Last Run: 3, Total: 95,993
      Average Execution Time : 1.798s
      Last Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      Last Successful Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      metadata:
        flavor: MySQL
        version.build: unspecified
        version.major: 5
        version.minor: 7
        version.patch: 34
        version.raw: 5.7.34+unspecified
        version.scheme: semver
```

Ensure that these lines are in the output and have values greater than zero:

```
Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
Database Monitoring Query Samples: Last Run: 1, Total: 74,451
```

[1]: /agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

When you are confident the Agent configuration is correct, [check the Agent logs][3] for warnings or errors attempting to run the database integrations.

You can also explicitly execute a check by running the `check` CLI command on the Datadog Agent and inspecting the output for errors:

```bash
# For self-hosted installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# For container-based installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```

### Query metrics are missing

Before following these steps to diagnose missing query metric data, ensure the Agent is running successfully and you have followed [the steps to diagnose missing agent data](#no-data-is-showing-after-configuring-database-monitoring).

{{< tabs >}}
{{% tab "Postgres" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The `pg_stat_statements` extension is not installed or not loaded in the correct database. | The extension must be installed through `shared_preload_libraries` in your Postgres configuration (**Note**: A server restart is required to take effect after modifying this variable). You must then run `CREATE EXTENSION pg_stat_statements` in all databases the Agent connects to. By default, the Agent connects to the `postgres` database. For additional details on configuring this variable in your setup, see the [setup instructions][1]. |
| The `datadog` user does not have permission to collect query statistics. | To grant the appropriate permissions to the `datadog` user, see the [setup instructions][1] for your database version. |

To verify `pg_stat_statements` is installed and accessible to the `datadog` user, connect to the `postgres` database and attempt to query as the `datadog` user. There should be at least one row returned successfully. For example:

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

If you specified a `dbname` other than the default `postgres` in your Agent config, you must run `CREATE EXTENSION pg_stat_statements` in that database.


[1]: /database_monitoring/setup_postgres/
{{% /tab %}}
{{% tab "MySQL" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The `performance_schema` is not enabled. | The `performance_schema` option is enabled by default by MySQL but may be disabled in configuration or by your cloud provider. Follow the [setup instructions][1] for enabling `performance_schema`. |
| The host is managed by Google Cloud SQL and does not support `performance_schema`. | Due to limitations with Google Cloud SQL, Datadog Database Monitoring is [not supported on instances with less than 26GB of RAM][2]. | |


[1]: /database_monitoring/setup_mysql/
[2]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
{{% /tab %}}
{{< /tabs >}}

### Certain queries are missing

If you have data from some queries, but are expecting to see a particular query or set of queries in Database Monitoring, follow this guide.

{{< tabs >}}
{{% tab "Postgres" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| For Postgres 9.6, if you only see queries executed by the datadog user, then the instance configuration is likely missing some settings. | For monitoring instances on Postgres 9.6, the Datadog Agent instance config must use the settings `pg_stat_statements_view: datadog.pg_stat_statements()` and `pg_stat_activity_view: datadog.pg_stat_activity()` based on the functions created in the initial setup guide. These functions must be created in all databases. |
| The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected time frame. | The query may be grouped into the "Other Queries" row. For more information on which queries are tracked, see see [Data Collected][1]. The number of top queries tracked can be raised by contacting Datadog Support. |
| The query is not a SELECT, INSERT, UPDATE, or DELETE query. | Non-utility functions are not tracked by default. To collect them, set the Postgres parameter `pg_stat_statements.track_utility` to `true`. See the [Postgres documentation][2] for more information. |
| The query is executed in a function or stored procedure. | To track queries executed in functions or procedures, set the configuration parameter `pg_stat_statements.track` to `true`. See the [Postgres documentation][2] for more information. |
| The `pg_stat_statements.max` Postgres configuration parameter may be too low for your workload. | If a large number of normalized queries are executed in a short period of time (thousands of unique normalized queries in 10 seconds), then the buffer in `pg_stat_statements` may not be able to hold all of the normalized queries. Increasing this value can improve the coverage of tracked normalized queries and reduce the impact of high churn from generated SQL. **Note**: Queries with unordered column names or using ARRAYs of variable lengths can significantly increase the rate of normalized query churn. For instance `SELECT ARRAY[1,2]` and `SELECT ARRAY[1,2,3]` are tracked as separate queries in `pg_stat_statements`. For more information about tuning this setting, see [Advanced configuration][3]. |
| The query has been executed only once since the agent last restarted. | Query metrics are only emitted after having been executed at least once over two separate ten second intervals since the Agent was restarted. |



[1]: /database_monitoring/data_collected/#which-queries-are-tracked
[2]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[3]: /database_monitoring/setup_postgres/advanced_configuration/
{{% /tab %}}
{{% tab "MySQL" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected time frame. | It may be grouped into the "Other Queries" row. For more information on which queries are tracked, see [Data Collected][1]. The number of top queries tracked can be raised by contacting Datadog Support. |
| The `events_statements_summary_by_digest` may be full. | The MySQL table `events_statements_summary_by_digest` in `performance_schema` has a maximum limit on the number of digests (normalized queries) it will store. Regular truncation of this table as a maintenance task will ensure all queries are tracked over time. See [Advanced configuration][2] for more information. |
| The query has been executed a single time since the agent last restarted. | Query metrics are only emitted after having been executed at least once over two separate ten second intervals since the Agent was restarted. |



[1]: /database_monitoring/data_collected/#which-queries-are-tracked
[2]: /database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}


### Query bind parameters cannot be viewed

At this time, the raw query bind parameters are obfuscated for Query Samples and Explain Plans, and are replaced with a `?` character. In a future release, settings to expose the un-obfuscated query bind parameters are planned.


### Query samples are truncated

Longer queries may not show their full SQL text due to database configuration. Some tuning is necessary to adjust for your workload.

{{< tabs >}}
{{% tab "Postgres" %}}

The Postgres setting `track_activity_query_size` indicates the maximum size of the SQL statement Postgres stores and makes visible to the Agent. By default, this value is 1024 bytes. Raising this value to 4096 captures most queries for most workloads. However, a higher value may be appropriate if your queries are complex or use long arrays.

For example, the database will truncate a query with an array with many items such as:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, … , 9999, 10000 ]) LIMIT 5
```

The resulting normalized query will appear in the app as:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

To avoid this, raise the `track_activity_query_size` setting to a value large enough to accommodate the largest expected text size of your queries. For further information, see the [Postgres documentation on runtime statistics][1].


[1]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
{{% /tab %}}
{{% tab "MySQL" %}}

The MySQL SQL text length visible to the Datadog Agent is determined by the following [system variables][1]:

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema=4096
```

Most workloads are able to capture most queries by raising this value to 4096, but you may need to set a higher value for particularly long and complex queries.

<!-- TODO: add a custom query recipe for getting the max sql text length -->


[1]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
{{% /tab %}}
{{< /tabs >}}

### Queries are missing explain plans

Some or all queries may not have plans available. This can be due to unsupported query commands, queries made by unsupported client applications, an outdated Agent, or incomplete database setup.

{{< tabs >}}
{{% tab "Postgres" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The Agent is running an unsupported version. | Ensure that the Agent is running version 7.32.0 or greater. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates. |
| The Agent is not able to execute a required function in the `datadog` schema of the database. | The Agent requires the function `datadog.explain_statement(...)` to exist in **all databases** the Agent can collect queries from. Ensure this function was created by the root user according to the [setup instructions][1] and that the `datadog` user has permission to execute it. |
| Queries are truncated. | See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text. |
| The application client used to execute the query is using the Postgres extended query protocol or prepared statements. | Some client applications using the Postgres [extended query protocol][2] do not support the collection of explain plans due to the separation of the parsed query and raw bind parameters. For instance, the Python client [asyncpg][3] and the Go client [pgx][4] use the extended query protocol by default. To work around this limitation, you can configure your database client to use the simple query protocol. For example: set `preferQueryMode = simple` for the [Postgres JDBC Client][5] or set `PreferSimpleProtocol` on the [pgx][4] connection config. |
| The query is in a database ignored by the Agent instance config `ignore_databases`. | Default databases such as the `postgres` database are ignored in the `ignore_databases` setting. Queries in these databases will not have samples or explain plans. Check the the value of this setting in your instance config and the default values in the [example config file][6]. |
| The query cannot be explained. | Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans. |
| The query is relatively infrequent or executes quickly. | The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][7] to capture the query. |
| The application is relying on [search paths][8] for specifying which schema to query. | Postgres does not expose the current search path in [pg_stat_activity][9] so it's not possible for the Datadog Agent to find out which search path is being used for any active Postgres processes. The only way to work around this limitation is to update the application code to use fully qualified queries instead of relying on search paths. For example, do `select * from schema_A.table_B` instead of `SET search_path TO schema_A; select * from table_B`. |

[1]: /database_monitoring/setup_postgres/
[2]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[3]: https://github.com/MagicStack/asyncpg
[4]: https://github.com/jackc/pgx
[5]: https://jdbc.postgresql.org/documentation/head/connect.html
[6]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[7]: /database_monitoring/setup_postgres/advanced_configuration
[8]: https://www.postgresql.org/docs/14/ddl-schemas.html#DDL-SCHEMAS-PATH
[9]: https://www.postgresql.org/docs/14/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW
{{% /tab %}}
{{% tab "MySQL" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The Agent is running an unsupported version. | Ensure that the Agent is running version 7.32.0 or greater. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates. |
| The Agent is not able to execute a required function in this schema of the database. | The Agent requires the function `explain_statement(...)` to exist in **all schemas** the Agent can collect samples from. Ensure this function was created by the root user according to the [setup instructions][1] and that the `datadog` user has permission to execute it. |
| Queries are truncated. | See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text. |
| The query cannot be explained. | Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans. |
| The query is relatively infrequent or executes quickly. | The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][2] to capture the query. |

[1]: /database_monitoring/setup_mysql/
[2]: /database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}

### Setup fails on `create extension pg_stat_statements`

{{< tabs >}}
{{% tab "Postgres" %}}

Example error output from `create extension pg_stat_statements`:
```
create extension pg_stat_statements;
ERROR:  could not open extension control file "<path>/share/postgresql/extension/pg_stat_statements.control": No such file or directory
SQL State: 58P01
```

This error happens when you are missing the `postgresql-contrib` package that includes the `pg_stat_statements` extension. How to install the missing package varies depending on the host's distribution and your Postgres version. As an example, to install the `contrib` package on Ubuntu for Postgres 10, run:

```
sudo apt-get install postgresql-contrib-10
```

See the appropriate version of the [Postgres `contrib` documentation][1] for more information.


[1]: https://www.postgresql.org/docs/12/contrib.html
{{% /tab %}}
{{< /tabs >}}

### Schema or Database missing on MySQL Query Metrics & Samples

The `schema` tag (also known as "database") is present on MySQL Query Metrics and Samples only when a Default Database is set on the connection that made the query. The Default Database is configured by the application by specifying the "schema" in the database connection parameters, or by executing the [USE Statement][4] on an already existing connection.

If there is no default database configured for a connection, then none of the queries made by that connection have the `schema` tag on them.

### DBM host limit

Depending on how complex the databases being monitored are, too many DBM hosts on one Agent could overload the Agent and cause data collection to be delayed. If the Agent is overloaded, you may see warnings like `Job loop stopping due to check inactivity in the Agent logs`.

It is recommended to have a single Datadog Agent monitor at most 10 DBM hosts. If you have more than 10 DBM hosts then you should consider spreading them over multiple Datadog Agents.

## Need more help?

If you are still experiencing problems, contact [Datadog Support][5] for help.


[1]: /database_monitoring/#getting-started
[2]: /agent/troubleshooting/
[3]: /agent/guide/agent-log-files
[4]: https://dev.mysql.com/doc/refman/8.0/en/use.html
[5]: /help/
