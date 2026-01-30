---
title: MySQL Source
description: Learn how to use the MySQL source in a logs pipeline.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

<div class="alert alert-info">MySQL source is in Preview. Contact your account manager to request access.</div>

Databases often contain large numbers of historical, audit, or operational records. For many legacy, enterprise resource planning (ERP), and IoT-based systems, these databases serve as storage layers for important information. Teams often depend on these records for monitoring, alerting, and creating dashboards in their preferred logging or security tool.

The Observability Pipelines' MySQL source (includes Amazon RDS and AWS Aurora) allows you to connect to your database so you can query and process record data in Observability Pipelines, and route your log events that are stored as database records.

**Note**: The Observability Pipelines Worker can only execute read-only SQL queries against supported databases.

### When to use this source

You can use this source to:

- Periodically extract transaction or access records stored in MySQL for audit and compliance reporting.
- Analyze, alert, and build dashboards on event data stored in MySQL. For example:
  - Application logs: Many legacy, regulated, or IoT devices write records to MySQL tables. These events often contain session activity, device information, and custom application logs. The MySQL source lets you extract the data you want and ingest it as logs for downstream alerting and investigation.
  - Operational events and business-critical records: Many organizations store operational events in MySQL as a system of record. These databases contain data like ERP, billing, order, inventory, ticketing, and fulfillment info. Teams often query tables for dashboards, scheduled alerts, and investigations.
  - Edge device telemetry: Some smaller devices write events, such as diagnostics, maintenance, and errors, into SQL tables. For example, a pacemaker syncs periodically and saves the records in MySQL, which a DevOps team then uses in their logging tool.
- Pull user or product information stored in MySQL to assist in troubleshooting issues or investigating threats.

## Prerequisites

Before you configure the MySQL source, complete the following prerequisites to ensure that Observability Pipelines can validate credentials, connectivity, and queries before they are used in Observability Pipelines. Use a [tool](#external-tools-for-validating-queries) external to Observability Pipelines, such as MySQL Workbench or third-party tools, to complete these steps.

1. [Create a database role](#1-create-a-database-role).
1. [Validate the connection string](#2-validate-the-connection-string).
1. [Write, validate, and test SQL queries](#3-write-validate-and-test-sql-queries).
1. [Store the SQL query in a local file](#4-store-the-sql-query-in-a-local-file).

### 1. Create a database role

Create a database [role][4] for log collection, if you don't already have one. The role must:
- Have read-only access, with no permissions to modify or write data.
- Have permission to execute the target queries used for log collection.
- Be scoped to only the databases, schemas, and tables required for your log collection.

### 2. Validate the connection string

The connection string must:

- Be able to authenticate using the role from the previous step.
- Be able to successfully connect to the database from the environment in which the Observability Pipelines Worker runs.
- Be in this format: `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`.
- Use the correct host, port, database name, and authentication mechanism.
- Be tested prior to configuring it in Observability Pipelines, to avoid runtime failures.

### 3. Write, validate, and test SQL queries

Write and test your SQL queries. Validate all SQL queries with a [tool](#external-tools-for-validating-queries) external to Observability Pipelines and prior to configuring it in Observability Pipelines. [Store the SQL query in a local file](#store-the-sql-query-in-a-local-file) for the Worker to execute.

**Notes**:

- Only read-only queries are executed. This mean only `SELECT` and `SELECT DISTINCT` statements are supported. Queries that modify data (`INSERT`, `UPDATE`, `DELETE`, `DDL`) are all rejected.
- Parameterized queries are supported for incremental execution. See [Incremental queries](#incremental-queries) for more information.
- Ensure that each query executes successfully using the read-only role and returns the expected schema.

#### Query types

The Worker can run two kinds of queries:

- **Batch queries**: The Worker executes the same database query each time and returns all the results specified. This option does not keep track of the rows you queried previously. An example use case is if you wanted to pull the same table of monthly financial statements from a database.
- **Incremental queries**: The Worker tracks which rows of data have already been pulled. The Worker uses an [incremental column](#incremental-columns) and the [checkpoint value](#checkpoint-values) to determine the latest set of data to pull.

##### Incremental queries

For incremental querying, SQL queries must have the following to help ensure consistent results.

- A `WHERE <incremental_column> <operation> <placeholder>` clause so that the MySQL source can replace `placeholder` with the [checkpoint value](#checkpoint-values) during each scheduled run, and retrieve the latest results.
  - `incremental_column`: A column with incremental values. This value must be the same as the column value set in the MySQL source configuration.
  - `operation`: Enter `>` , `<`, `>=`, or `<=` based on your use case.
  - `placeholder`: Enter `?`.
- An `ORDER BY <incremental_column>` clause so that the database returns the rows in the expected order for the MySQL source to retrieve the latest values.
- This is an example that uses all the options: `SELECT * FROM orders WHERE order_id > ? ORDER BY order_id LIMIT 500;`
    - If the last checkpoint value is `7`, this query retrieves all rows where the `order_id` column's value is greater than `7`.

##### Incremental columns

Incremental columns are used to track the progress of each new query. The following column types are supported for incremental querying:

- `Varchar`
- `Int`, `float`, `real`, `bigint`, `number`
- `Timestamp`
- `Datetime`

Datadog recommends using a unique incremental identifier for the incremental column. If you use an identifier that is not unique, such as `timestamp`, there could be:

- Data loss if you use strict operators, such as `>` or `<`, in your query.
- Duplicated data if you use inclusive operators, such as `>=`.

##### Checkpoint values

Checkpoint values are updated every job run. To monitor the checkpoint value, there are Worker logs that contain the message `Checkpoint updated` and the latest value that was published. If a job fails or the Worker unexpectedly restarts or shuts down, the checkpoint value reverts to the start value. To determine the checkpoint value for a job that failed:

1. Navigate to [Log Explorer][3] and search for Worker logs with the message `Checkpoint updated`.
1. Check the value found in the latest Worker log to see what the Worker tracked.
1. Check the log in your destination to which your logs were sent and determine the last value sent.
1. Manually reset the checkpoint value in the MySQL source in the pipelines UI.

#### External tools for validating queries

Datadog recommends these tools for validating and testing queries:

- Third-party tools:
  - DBeaver
  - DataGrip
  - TablePlus
  - DbVisualizer
- Native MySQL tool: MySQL Workbench

### 4. Store the SQL query in a local file

Store the SQL query that the Worker executes in a local file.

**Notes**:

- The SQL query file must contain only one query.
- The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- The file must be in the default data directory: `var/lib/observability-pipelines-worker`. See [Advanced Worker Configurations][2] for more information.

## Set up the source while setting up a pipeline

Ensure you have completed the [prerequisite steps](#prerequisites) first. Then, set up the MySQL source and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

1. Enter the connection string.
1. Set the SQL query parameters.
  1. Enter the name of your query.
  1. Enter the path to the local file containing the validated SQL query.
      - **Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. For example, if the SQL file path is `/var/lib/observability-pipelines-worker/config/config/db_queries/retrieve_incremental_with_start.sql`, enter the path `db_queries/retrieve_incremental_with_start.sql`.
5. Select your query type (**Batch** or **Incremental**). See [Query types](#query-types) for more information.
    - For **Incremental**:
      1. Define the [incremental column](#incremental-columns).
      1. Set the starting [checkpoint value](#checkpoint-values).
6. Define your query scheduling using cron syntax. These are cron syntax examples for different query schedules:
    | Query Schedule             | Cron Expression |
    |----------------------------|-----------------|
    | At minute 17 of every hour | `17 */1 * * *`  |
    | At minute 45 of every hour | `45 * * * *`    |
    | Every 1 min                | `*/1 * * * *`   |
    | Once daily at 8 AM         | `0 8 * * *`     |

## Set the environment variables

- URI connection string
  - The URI that contains the necessary parameters, such as the database engine, host, port, and credentials, to connect to a database.
  - Stored as environment variable: `DB_SOURCE_DATABASE_CONNECTION_STRING`

## Limits and requirements

### Worker and pipelines

#### One database per pipeline

- You can have only one MySQL source per pipeline. Multiple instances of the MySQL source requires separate pipelines.
- One pipeline can run only one SQL query.

#### Single-node execution requirements

- Observability Pipelines Workers are deployed in a share-nothing architecture.
- Datadog recommends deploying pipelines using the MySQL source on one Worker node only. Otherwise, you run the risk of pulling duplicate data across multiple Workers.

### Manage credentials and IAM externally

- Database users, roles, and permissions must be created and managed outside of Datadog.
- Connection strings should reference environment variables for secrets.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[3]: https://app.datadoghq.com/logs
[4]: https://dev.mysql.com/doc/refman/9.2/en/create-role.html