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

Databases are often used to store many historical, audit, or operational records. For many legacy, enterprise resource planning (ERP), and IoT-based systems, these databases serve as storage layers for important information. Teams often depend on these records for monitoring, alerting, and creating dashboards in their preferred logging or security tool.

The Observability Pipelines' MySQL source (includes AWS Aurora) allows you to connect to your database so you can query and process the data in Observability Pipelines, and route your log events that are stored as database records.

**Note**: The Observability Pipelines Worker can only execute read-only SQL queries against supported databases.

### When to use this source

Common scenarios when you might use this source:

- Periodically extract transaction or access records stored in databases for audit and compliance reporting.
- Analyze, alert, and build dashboards on event data stored in database systems. For example:
  - Application logs that are stored in databases: Many legacy, regulated, or IoT devices write records to database tables. These events often contain session activity, device information, and custom application logs. The Database source lets you extract the data you want and ingest it as logs for downstream alerting and investigation.
  - Operational events and business-critical records: Many organizations store operational events in a database as a system of record. These databases contain data like ERP, billing, order, inventory, ticketing, and fulfillment info. Teams often query tables for dashboards, scheduled alerts, and investigations
  - Edge device telemetry that gets stored in databases: Some smaller devices write events, such as diagnostics, maintenance, and errors, into SQL tables. For example, a pacemaker syncs periodically and saves the records in a database, which a DevOps team then uses in their logging tool.
- Pull user or product information stored in databases to assist in troubleshooting issues or investigating threats.

## Prerequisites

Before you configure the source, complete the following prerequisites to help ensure that credentials, connectivity, and queries are validated before they are used in Observability Pipelines. These steps must be completed using [external tools](#external-tools-for-testing), such as in your database or with third-party tools.

1. Create a database role for log collection, if you don't already have one. The role must:
    - Only have read-only access, so no permissions to modify or write data.
    - Have permission to execute the target queries used for log collection.
    - Be scoped to only the databases, schemas, and tables required for your log collection
1. Validate the connection string. The connection string must:
    - Be able to authenticate using the role from the previous step.
    - Be able to successfully connect to the database from the environment in which the Observability Pipelines Worker runs.
    - Use the correct host, port, database name, and authentication mechanism.
    - Be tested prior to configuring it in Observability Pipelines, to avoid runtime failures.
1. Write, validate, and test SQL queries using either third-party or native database management tools.
    - All SQL queries must be validated and tested with an external tool prior to configuring it in Observability Pipelines.
    - Ensure that each query executes successfully using the read-only rule and returns the expected schema.

### External tools for testing

Datadog recommends these tools for testing:

- Third-party tools:
  - DBeaver
  - DataGrip
  - TablePlus
  - DbVisualizer
- Native MySQL tools: MySQL Workbench

## Set up the source in the pipeline UI

Set up the Database source and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

1. Ensure you have completed the [prerequisite steps](#prerequisites).
1. Configure the connection between the Observability Pipelines Worker and the database.
    1. Enter the connection string.
        - **MySQL** connection string format: `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
        - **Postgres** connection string format: `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
        - **Note**: Connection strings must be fully validated using external tools before use. See [Prerequisites](#prerequisites) for more information.
    1. Set the following parameters for error handling when connecting the Worker to the database.
        1. Enter the connection timeout.
        1. Enter the maximum retry attempts.
1. Set the SQL query parameters.
  1. Enter the name of your query.
  1. Enter the path to local file containing the validated SQL query.
      - The SQL query the Worker executes needs to be stored in its own local file.
      - See [Incremental query syntax](#incremental-query-syntax) for details about formatting and [Queries](#queries) for additional information.
      - **Note**: All file paths are made relative to the configuration data directory, which is /var/lib/observability-pipelines-worker/config/ by default. See [Advanced Worker Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
        - For example, if the SQL file path is `/DD_OP_DATA_DIR/config/db_queries/retrieve_incremental_with_start.sql`, enter the path `db_queries/retrieve_incremental_with_start.sql`.
5. Select your query type.
    - **Batch**: The Worker executes the same database query each time and returns all the results specified. This option does not keep track of the rows you queried previously.
      - An example use case: You want to pull the same table of monthly financial statements from a database.
    - **Incremental**: The Worker tracks which rows are new from one input execution to another. It relies on using an incremental column to pull the latest sets of data. See [Incremental query syntax](#incremental-query-syntax) for details on creating an incremental query.
      1. Define the incremental column. This is the column that the Worker iterates through to pull data from the latest rows. See [Incremental columns](#incremental-columns) for more information.
      1. Set the starting checkpoint value. This value tells the Worker to start from the specific row that contains the value. See [Checkpoint values](#checkpoint-values) for more information.
6. Define your query scheduling using cron syntax. These are cron syntax examples for different query schedules:
    | Query Schedule             | Cron Expression |
    |----------------------------|-----------------|
    | At minute 17 of every hour | `17 */1 * * *`  |
    | At minute 45 of every hour | `45 * * * *`    |
    | Every 1 min                | `*/1 * * * *`   |
    | Once daily at 8 AM         | `0 8 * * *`     |

## Set the environment variables

- URI connection string
  - THE URI that contains the necessary parameters, such as the database engine, host, port, and credentials, to connect to a database.
  - Stored as environment variable: `DB_SOURCE_DATABASE_CONNECTION_STRING`

## Incremental queries

### Incremental query syntax

For incremental querying, SQL queries must have the following to help ensure consistent results.

- A `WHERE <incremental_column> <operation> <placeholder>` clause so that the source on each scheduled run can replace `placeholder` with the checkpoint value, and retrieve the latest results.
  - `incremental_column`: A column with incremental values. This value must be the same as the column value set in the Database source configuration.
  - `operation`: Input `>` , `<`, `>=`, or `<=`.
  - `placeholder`: Input `?` for MySQL and `$1` for Postgres.
- An `ORDER BY <incremental_column>` clause so that the database returns the rows in a predictable order for the source to retrieve the latest values.
- An example that uses all the options: `SELECT * FROM orders WHERE order_id > ? ORDER BY order_id LIMIT 500;`
  - If the last checkpoint value is `7`. This query retrieves all rows where the `order_id` column's value is greater than `7`.

### Incremental columns

Incremental columns are used to track the progress of each new query. The following column types for incremental querying are supported:

- `Varchar`
- `Int`, `float`, `real`, `bigint`, `number`
- `Timestamp`
- `Datetime`

Datadog recommends using an incremental ID for the incremental column . If you use an identifier that might not be unique, such as timestamps, it could result in data conflicts.

**Notes**:
- There could be data loss if you use strict operators, such as `>` or `<`, in your query.
- There could be duplicated data if you use inclusive operators, such as `>=`.

### Checkpoint values

Checkpoint values are updated every job run. To monitor the checkpoint value, there are Worker logs that contain the message `Checkpoint updated` and the latest value that was published. If a job fails or the Worker is restarted mid-job or it crashes, the checkpoint value reverts to the start value. To recover the checkpoint value:

1. Navigate to [Log Explorer][3] and search for Worker logs with the message `Checkpoint updated`.
1. Check the value found in the latest Worker log to see what the Worker tracked.
1. Check the log in the destination to which your logs were sent and determine the last value sent.
1. Manually reset the checkpoint value in the Database source in the pipelines UI.

## Error handling

- Connection timeouts
  - The time in milliseconds to wait for a connection attempt before timing out. This is used to prevent the source from retrying indefinitely.
- Maximum retry attempts
  - The number of retry attempts the source makes to the database before failing. This is used to prevent infinite retry attempts when the connection is failing.
- Query timeout
  - The time limit for a query before failing. This is used to prevent a long running query from continuing to execute indefinitely.

## Limits and requirements

### Worker and pipelines

#### One database per pipeline

- You can only have one Database source per pipeline.
- Multiple instances of the same database type requires separate pipelines.
- One pipeline can run only one SQL query.

#### Single-node execution requirements

- Observability Pipelines Workers are deployed in a share-nothing architecture.
- Datadog recommends deploying database pipelines using the Database source on one Worker node only. Otherwise, you run the risk of pulling duplicate data across multiple workers.

### Queries

#### Only read-only queries are executed

- Only `SELECT` and `SELECT DISTINCT` statements are supported.
- Queries that modify data (`INSERT`, `UPDATE`, `DELETE`, `DDL`) are all rejected.

#### Validate and storing queries

- SQL queries must be tested and validated outside of Observability Pipelines' UI. Datadog recommends using a third-party tool, such as DBeaver, or native SQL manager, such as MySQL Workbench, for testing.
- To execute a specific SQL query with Observability Pipelines, you must store the query in a local file for the Worker to read.

#### SQL file requirements

- The local file that contains the query for the Worker to run can only have one query.
- Parameterized queries are supported for incremental execution.

### Manage credentials and IAM externally

- Database users, roles, and permission must be created and managed outside of Datadog.
- Connection strings should reference environment variables for secrets.

## Recommended monitors

Datadog recommends creating these monitors:

- Connection timeout monitor to alert you when the Worker cannot connect to the database.
- Query failure monitor to alert you when the query is times out and fails.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/