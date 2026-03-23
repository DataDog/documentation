---
title: Headings and TOC tests
content_filters:
  - trait_id: database
    option_group_id: dd_e2e_database_options
---

## Overview

This is a test page used to verify correctness of the right nav (TOC) throughout filter selection changes.

## Test cases

- The TOC is generated correctly for each filter option, showing only the visible H2 headings on the page each time the user updates their filter selection.
- All headings have unique IDs assigned to them; no two headings share the same ID, even if they have the same display text.
- When the user clicks "Installation", the page scrolls to that heading, and the TOC displays the correct H3 headings for that section.

## Overview

This page tests that the table of contents updates correctly when content filters change which headings are visible. Several headings are intentionally repeated across database options to verify unique ID generation.

## Prerequisites

All databases require a Datadog Agent running on the host. Confirm the Agent is installed and reporting before proceeding.

{% if equals($database, "postgres") %}

## Installation

Install the Postgres integration by adding the following to your Agent configuration directory:

```yaml
instances:
  - host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
```

### Authentication

Postgres supports several authentication methods. The Datadog Agent uses password-based authentication by default. To configure trust-based or certificate-based authentication, update the `pg_hba.conf` file on your database host.

### Permissions

Create a dedicated `datadog` user with read-only access to the tables you want to monitor. Run the following commands from a `psql` session:

```sql
CREATE USER datadog WITH PASSWORD '<PASSWORD>';
GRANT SELECT ON pg_stat_database TO datadog;
```

## Configuration

After installation, configure the integration to collect additional metrics.

### Query metrics

Enable query-level metrics by setting `collect_query_metrics: true` in the instance configuration. This requires the `pg_stat_statements` extension.

### Custom queries

Define custom queries to collect business-specific metrics from your Postgres instance. Each custom query runs at the check interval you configure.

## Vacuuming and maintenance

Postgres requires periodic vacuuming to reclaim storage and update query planner statistics. The Datadog integration collects autovacuum metrics by default, including the number of dead tuples and the last vacuum timestamp for each table.

### Autovacuum tuning

Adjust `autovacuum_vacuum_threshold` and `autovacuum_vacuum_scale_factor` in `postgresql.conf` to control how aggressively autovacuum runs. Lower thresholds result in more frequent vacuuming on write-heavy tables.

## Troubleshooting

### Connection refused

Verify that Postgres is listening on the expected host and port. Check `postgresql.conf` for the `listen_addresses` and `port` settings.

### Permission denied

Confirm the `datadog` user has the required grants. Re-run the permission commands from the Installation section if needed.

{% /if %}

{% if equals($database, "mysql") %}

## Installation

Install the MySQL integration by adding the following to your Agent configuration directory:

```yaml
instances:
  - host: localhost
    port: 3306
    username: datadog
    password: <PASSWORD>
```

### Authentication

MySQL supports native password authentication and caching_sha2_password. The Datadog Agent is compatible with both methods. Configure the authentication plugin in your `my.cnf` if needed.

### Permissions

Create a dedicated `datadog` user with the necessary privileges. Run the following commands from a `mysql` session:

```sql
CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<PASSWORD>';
GRANT REPLICATION CLIENT, PROCESS ON *.* TO 'datadog'@'localhost';
```

## Configuration

After installation, configure the integration to collect additional metrics.

### Query metrics

Enable query-level metrics by setting `collect_query_metrics: true` in the instance configuration. This requires the Performance Schema to be enabled.

### Custom queries

Define custom queries to collect business-specific metrics from your MySQL instance. Custom queries follow the same structure as other database integrations.

### Replication monitoring

If your MySQL instance is part of a replica set, enable replication monitoring to track lag and thread status:

```yaml
options:
  replication: true
```

## InnoDB monitoring

The Datadog integration collects InnoDB-specific metrics, including buffer pool usage, row-level lock waits, and data throughput. These metrics help identify storage engine bottlenecks.

### Buffer pool

Monitor `innodb_buffer_pool_reads` and `innodb_buffer_pool_read_requests` to assess cache hit ratio. A low hit ratio may indicate the buffer pool is undersized for the working dataset.

## Troubleshooting

### Connection refused

Verify that MySQL is running and accepting connections on the configured host and port. Check the `bind-address` setting in `my.cnf`.

### Permission denied

Confirm the `datadog` user has the correct grants. Re-run the permission commands from the Installation section and flush privileges.

{% /if %}

{% if equals($database, "mongo_db") %}

## Installation

Install the MongoDB integration by adding the following to your Agent configuration directory:

```yaml
instances:
  - hosts:
      - localhost:27017
    username: datadog
    password: <PASSWORD>
    database: admin
```

### Authentication

MongoDB supports SCRAM and x.509 certificate authentication. The Datadog Agent uses SCRAM by default. To use x.509, provide the certificate path in the instance configuration.

### Permissions

Create a dedicated `datadog` user with the `clusterMonitor` and `read` roles. Run the following commands from a `mongosh` session:

```javascript
db.createUser({
  user: "datadog",
  pwd: "<PASSWORD>",
  roles: [
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "admin" }
  ]
});
```

## Configuration

After installation, configure the integration to collect additional metrics.

### Query metrics

Enable query-level metrics by setting `collect_query_metrics: true` in the instance configuration. This requires the database profiler to be enabled on the target databases.

### Custom queries

Define custom queries to collect business-specific metrics from your MongoDB instance. Custom queries use the aggregation pipeline syntax.

### Replica set monitoring

If your MongoDB deployment uses replica sets, the integration automatically detects members and collects replication lag metrics. No additional configuration is required.

## Sharding metrics

For sharded clusters, the integration collects chunk distribution and balancer activity metrics. Connect the Agent to a `mongos` router to collect cluster-wide sharding data.

### Chunk distribution

Monitor the number of chunks per shard to detect imbalances. An uneven distribution may indicate the shard key is not distributing writes effectively.

## Troubleshooting

### Connection refused

Verify that `mongod` is running and listening on the expected host and port. Check the `net.bindIp` and `net.port` settings in your MongoDB configuration file.

### Permission denied

Confirm the `datadog` user has the `clusterMonitor` role on the `admin` database. Re-run the user creation commands from the Installation section if needed.

### Replica set lag

If replication lag metrics are missing, verify that the Agent can connect to all replica set members. The Agent resolves members from the replica set configuration automatically.

{% /if %}
