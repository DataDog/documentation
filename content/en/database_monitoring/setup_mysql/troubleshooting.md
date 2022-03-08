---
title: Troubleshooting Database Monitoring
kind: documentation
description: Troubleshoot Database Monitoring setup
---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

This page details common issues with setting up and using Database Monitoring with MySQL, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Diagnosing common problems

### No data is showing after configuring Database Monitoring

If you do not see any data after following the [setup instructions][1] and configuring the Agent, there is most likely an issue with the Agent configuration or API key. Ensure you are receiving data from the Agent by following the [troubleshooting guide][2].

If you are receiving other data such as system metrics, but not Database Monitoring data (such as query metrics and query samples), there is probably an issue with the Agent or database configuration. Ensure your Agent configuration looks like the example in the [setup instructions][1], double-checking the location of the configuration files.

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
### Queries are missing explain plans

Some or all queries may not have plans available. This can be due to unsupported query commands, queries made by unsupported client applications, an outdated Agent, or incomplete database setup.

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The Agent is running an unsupported version. | Ensure that the Agent is running version 7.32.0 or greater. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates. |
| The Agent is not able to execute a required function in this schema of the database. | The Agent requires the function `explain_statement(...)` to exist in **all schemas** the Agent can collect samples from. Ensure this function was created by the root user according to the [setup instructions][1] and that the `datadog` user has permission to execute it. |
| Queries are truncated. | See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text. |
| The query cannot be explained. | Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans. |
| The query is relatively infrequent or executes quickly. | The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][2] to capture the query. |

[1]: /database_monitoring/setup_mysql/
[2]: /database_monitoring/setup_mysql/advanced_configuration/

### Query metrics are missing

Before following these steps to diagnose missing query metric data, ensure the Agent is running successfully and you have followed [the steps to diagnose missing agent data](#no-data-is-showing-after-configuring-database-monitoring).

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The `performance_schema` is not enabled. | The `performance_schema` option is enabled by default by MySQL but may be disabled in configuration or by your cloud provider. Follow the [setup instructions][1] for enabling `performance_schema`. |
| The host is managed by Google Cloud SQL and does not support `performance_schema`. | Due to limitations with Google Cloud SQL, Datadog Database Monitoring is [not supported on instances with less than 26GB of RAM][2]. | |

### Certain queries are missing

If you have data from some queries, but are expecting to see a particular query or set of queries in Database Monitoring, follow this guide.


| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected time frame. | It may be grouped into the "Other Queries" row. For more information on which queries are tracked, see [Data Collected][1]. The number of top queries tracked can be raised by contacting Datadog Support. |
| The `events_statements_summary_by_digest` may be full. | The MySQL table `events_statements_summary_by_digest` in `performance_schema` has a maximum limit on the number of digests (normalized queries) it will store. Regular truncation of this table as a maintenance task will ensure all queries are tracked over time. See [Advanced configuration][2] for more information. |
| The query has been executed a single time since the agent last restarted. | Query metrics are only emitted after having been executed at least once over two separate ten second intervals since the Agent was restarted. |

### Query samples are truncated

Longer queries may not show their full SQL text due to database configuration. Some tuning is necessary to adjust for your workload.

The MySQL SQL text length visible to the Datadog Agent is determined by the following [system variables][1]:

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema=4096
```

Most workloads are able to capture most queries by raising this value to 4096, but you may need to set a higher value for particularly long and complex queries.

<!-- TODO: add a custom query recipe for getting the max sql text length -->


[1]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length

### Queries are missing explain plans

Some or all queries may not have plans available. This can be due to unsupported query commands, queries made by unsupported client applications, an outdated Agent, or incomplete database setup.

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The Agent is running an unsupported version. | Ensure that the Agent is running version 7.32.0 or greater. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates. |
| The Agent is not able to execute a required function in this schema of the database. | The Agent requires the function `explain_statement(...)` to exist in **all schemas** the Agent can collect samples from. Ensure this function was created by the root user according to the [setup instructions][1] and that the `datadog` user has permission to execute it. |
| Queries are truncated. | See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text. |
| The query cannot be explained. | Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans. |
| The query is relatively infrequent or executes quickly. | The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][2] to capture the query. |

[1]: /database_monitoring/setup_mysql/
[2]: /database_monitoring/setup_mysql/advanced_configuration/

### Schema or Database missing on MySQL Query Metrics & Samples

The `schema` tag (also known as "database") is present on MySQL Query Metrics and Samples only when a Default Database is set on the connection that made the query. The Default Database is configured by the application by specifying the "schema" in the database connection parameters, or by executing the [USE Statement][4] on an already existing connection.

If there is no default database configured for a connection, then none of the queries made by that connection have the `schema` tag on them.


[1]: /database_monitoring/data_collected/#which-queries-are-tracked
[2]: /database_monitoring/setup_mysql/advanced_configuration/


[1]: /database_monitoring/setup_mysql/
[2]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema

[1]: /agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[2]: /agent/troubleshooting/
[3]: /agent/guide/agent-log-files