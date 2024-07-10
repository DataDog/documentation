---
title: Troubleshoot Database Monitoring setup for MySQL
description: Troubleshoot Database Monitoring setup
---

This page details common issues with setting up and using Database Monitoring with MySQL, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Diagnosing common problems

### No data is showing after configuring Database Monitoring

If you do not see any data after following the [setup instructions][1] and configuring the Agent, there is most likely an issue with the Agent configuration or API key. Ensure you are receiving data from the Agent by following the [troubleshooting guide][2].

If you are receiving other data such as system metrics, but not Database Monitoring data (such as query metrics and query samples), there is probably an issue with the Agent or database configuration. Ensure your Agent configuration looks like the example in the [setup instructions][1], double-checking the location of the configuration files.

To debug, start by running the [Agent status command][3] to collect debugging information about data collected and sent to Datadog.

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

When you are confident the Agent configuration is correct, [check the Agent logs][4] for warnings or errors attempting to run the database integrations.

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
### Queries are missing explain plans

Some or all queries may not have plans available. This can be due to unsupported query commands, queries made by unsupported client applications, an outdated Agent, or incomplete database setup. Below are possible causes for missing explain plans.

#### Missing event statements consumer {#events-statements-consumer-missing}
To capture explain plans, you must enable an event statements consumer. You can do this by adding the following option to your configuration files (for example, `mysql.conf`):
```
performance-schema-consumer-events-statements-current=ON
```

Datadog additionally recommends enabling the following:
```
performance-schema-consumer-events-statements-history-long=ON
```
This option enables the tracking of a larger number of recent queries across all threads. Turning it on increases the likelihood of capturing execution details from infrequent queries.

#### Missing explain plan procedure {#explain-plan-procedure-missing}
The Agent requires the procedure `datadog.explain_statement(...)` to exist in the `datadog` schema. Read the [setup instructions][1] for details on the creation of the `datadog` schema.

Create the `explain_statement` procedure to enable the Agent to collect explain plans:

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```
#### Missing full qualified explain plan procedure {#explain-plan-fq-procedure-missing}
The Agent requires the procedure `explain_statement(...)` to exist in **all schemas** the Agent can collect samples from.

Create this procedure **in every schema** from which you want to collect explain plans. Replace `<YOUR_SCHEMA>` with your database schema:

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

#### Agent is running an unsupported version

Ensure that the Agent is running version 7.36.1 or newer. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates.

#### Queries are truncated

See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text.

#### Query cannot be explained

Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans.

#### Query is relatively infrequent or executes quickly

The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][5] to capture the query.

### Query metrics are missing

Before following these steps to diagnose missing query metric data, ensure the Agent is running successfully and you have followed [the steps to diagnose missing agent data](#no-data-is-showing-after-configuring-database-monitoring). Below are possible causes for missing query metrics.

#### `performance_schema` is not enabled {#performance-schema-not-enabled}
The Agent requires the `performance_schema` option to be enabled. It is enabled by default by MySQL, but may be disabled in configuration or by your cloud provider. Follow the [setup instructions][1] for enabling it.

#### Google Cloud SQL limitation
The host is managed by Google Cloud SQL and does not support `performance_schema`. Due to limitations with Google Cloud SQL, Datadog Database Monitoring is [not supported on instances with less than 16GB of RAM][6].

### Certain queries are missing

If you have data from some queries, but are expecting to see a particular query or set of queries in Database Monitoring, follow this guide.


| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected time frame. | It may be grouped into the "Other Queries" row. For more information on which queries are tracked, see [Data Collected][7]. The number of top queries tracked can be raised by contacting Datadog Support. |
| The `events_statements_summary_by_digest` may be full. | The MySQL table `events_statements_summary_by_digest` in `performance_schema` has a maximum limit on the number of digests (normalized queries) it stores. Regular truncation of this table as a maintenance task ensures all queries are tracked over time. See [Advanced configuration][5] for more information. |
| The query has been executed a single time since the agent last restarted. | Query metrics are only emitted after having been executed at least once over two separate ten second intervals since the Agent was restarted. |

### Query samples are truncated

Longer queries may not show their full SQL text due to database configuration. Some tuning is necessary to adjust for your workload.

The MySQL SQL text length visible to the Datadog Agent is determined by the following [system variables][8]:

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### Query activity is missing

<div class="alert alert-warning">Query Activity and Wait Event collection are not supported for Flexible Server, as these features require MySQL settings that are not available on a Flexible Server host.</div>

Before following these steps to diagnose missing query activity, ensure the Agent is running successfully and you have followed [the steps to diagnose missing agent data](#no-data-is-showing-after-configuring-database-monitoring). Below are possible causes for missing query activity.

#### `performance-schema-consumer-events-waits-current` is not enabled {#events-waits-current-not-enabled}
The Agent requires the `performance-schema-consumer-events-waits-current` option to be enabled. It is disabled by default by MySQL, but may be enabled by your cloud provider. Follow the [setup instructions][1] for enabling it. Alternatively, to avoid bouncing your database, consider setting up a runtime setup consumer. Create the following procedure to give the Agent the ability to enable `performance_schema.events_*` consumers at runtime.


```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

**Note:** This option additionally requires `performance_schema` to be enabled.


<!-- TODO: add a custom query recipe for getting the max sql text length -->

### Schema or Database missing on MySQL Query Metrics & Samples

The `schema` tag (also known as "database") is present on MySQL Query Metrics and Samples only when a Default Database is set on the connection that made the query. The Default Database is configured by the application by specifying the "schema" in the database connection parameters, or by executing the [USE Statement][9] on an already existing connection.

If there is no default database configured for a connection, then none of the queries made by that connection have the `schema` tag on them.

[1]: /database_monitoring/setup_mysql/
[2]: /agent/troubleshooting/
[3]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /agent/configuration/agent-log-files
[5]: /database_monitoring/setup_mysql/advanced_configuration/
[6]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[7]: /database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
[9]: https://dev.mysql.com/doc/refman/8.0/en/use.html
