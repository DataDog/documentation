---
title: Setting Up Database Monitoring for Self-Hosted ClickHouse
description: Install and configure Database Monitoring for self-hosted ClickHouse.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/integrations/clickhouse/"
  tag: "Documentation"
  text: "ClickHouse Integration"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Database Monitoring"
- link: "/database_monitoring/guide/database_identifier/"
  tag: "Documentation"
  text: "Specifying a Database Identifier"
---

<div class="alert alert-info">
This feature is in preview and requires Datadog Agent v7.78 or later. Customers who participate in the Datadog Database Monitoring for ClickHouse preview <strong>will not be charged</strong> for usage incurred during the preview period. Contact your Datadog representative or support to enable this feature.
</div>

Datadog Database Monitoring (DBM) for ClickHouse provides deep visibility into your ClickHouse clusters by collecting query metrics, live query samples, and completed query records to help you resolve issues and optimize query performance across your entire fleet.

## Before you begin

Supported ClickHouse versions
: 21.1 and later (21.x, 22.x, 23.x, 24.x, 25.x). Recommended minimum: 21.1 LTS.

Supported Agent versions
: 7.78+

## Data collected

Database Monitoring collects the following data from ClickHouse:

**Database instance**
: Periodic collection (every 5 minutes) of instance information including version, hostname, and configuration. Custom tags defined in the `tags` option are attached to the instance for filtering and grouping by environment, region, cluster, or any other custom dimensions.

**Query metrics**
: Aggregated performance metrics for executed queries, enabling analysis of query behavior and trends over time. Collected from `system.query_log`.

**Query samples**
: Point-in-time snapshots of currently running queries are captured from `system.processes` at a 1-second interval. Because ClickHouse queries often complete in under one second, short-lived queries may not always appear in samples.

**Query completions**
: Records of individual completed query executions, capturing all successfully executed queries. Use query completions alongside query samples to ensure complete visibility into all query activity, including short-lived queries not observed during sampling.

## Setup

### Step 1: Grant Datadog Agent access

Create a dedicated `datadog` user:

```sql
CREATE USER datadog IDENTIFIED BY '<PASSWORD>';
```

Grant the required permissions on system tables:

```sql
GRANT SELECT ON system.metrics TO datadog;
GRANT SELECT ON system.events TO datadog;
GRANT SELECT ON system.asynchronous_metrics TO datadog;
GRANT SELECT ON system.parts TO datadog;
GRANT SELECT ON system.replicas TO datadog;
GRANT SELECT ON system.dictionaries TO datadog;
GRANT SELECT ON system.processes TO datadog;
GRANT SELECT ON system.query_log TO datadog;
```

The `system.processes` and `system.query_log` grants are required for DBM query collection. The remaining grants enable collection of core ClickHouse infrastructure metrics.

### Step 2: Configure the Agent

For self-hosted deployments, the Datadog Agent must connect to each ClickHouse node individually. Add a separate `instances` entry per node. A single Agent can monitor multiple nodes by defining multiple instances in the same configuration file.

<div class="alert alert-info">
This integration uses the ClickHouse <strong>HTTP interface</strong> (port 8123/8443), not the native TCP protocol (port 9000/9440).
</div>

- **HTTP** (default): port `8123`
- **HTTPS/TLS**: port `8443` with `tls_verify: true`

```yaml
# /etc/datadog-agent/conf.d/clickhouse.d/conf.yaml

init_config:

instances:
  - dbm: true
    server: clickhouse-node-01.example.com
    port: 8123
    username: datadog
    password: <PASSWORD>

    tags:
      - env:production
      - node:clickhouse-01

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10

  # Add an entry for each additional node
  - dbm: true
    server: clickhouse-node-02.example.com
    port: 8123
    username: datadog
    password: <PASSWORD>

    tags:
      - env:production
      - node:clickhouse-02

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10
```

## Customizing the database identifier

The `database_identifier` option controls how the database instance appears in DBM. This is useful when you want meaningful, human-readable identifiers instead of the default `server:port` format.

```yaml
instances:
  - dbm: true
    server: clickhouse-01
    port: 8123
    # ... other settings ...

    database_identifier:
      template: "$env-$server:$port"

    tags:
      - env:production
```

With `env:production`, `server: clickhouse-01`, and `port: 8123`, this produces:

| Template | Result |
|----------|--------|
| `$server:$port` (default) | `clickhouse-01:8123` |
| `$env-$server:$port` | `production-clickhouse-01:8123` |

## Configuration reference

### Connection settings

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `server` | string | Yes | - | Hostname or IP address of the ClickHouse server. |
| `port` | integer | No | `8123` | HTTP port. Use `8443` for HTTPS/TLS. The Agent uses the HTTP interface, not the native TCP protocol (port 9000). |
| `username` | string | No | `default` | ClickHouse user account the Agent authenticates as. Datadog recommends a dedicated `datadog` user with limited permissions. |
| `password` | string | No | - | Password for the specified user. |
| `db` | string | No | `default` | Database to connect to. Most metrics come from system tables, so `default` is usually appropriate. |

### TLS settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tls_verify` | boolean | `false` | Enable TLS. Set to `true` when using HTTPS (port 8443). |
| `verify` | boolean | `true` | Validate the server's SSL certificate. Setting `false` in production is a security risk. |
| `tls_ca_cert` | string | - | Path to a custom CA certificate file. Use when ClickHouse is configured with an internal or self-signed certificate. |

### DBM settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dbm` | boolean | `false` | Enable Database Monitoring. Required for query metrics, samples, and completions collection. |

### Database identifier

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `database_identifier.template` | string | `$server:$port` | Template for the unique database identifier. Supports variables: `$server`, `$port`, and any custom tag keys (for example, `$env`, `$region`). Use custom tags to distinguish instances across environments: `$env-$server:$port`. |

### Query metrics

Collects aggregated query statistics from `system.query_log`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `query_metrics.enabled` | boolean | `true` | Enable query metrics collection. Requires `dbm: true`. |
| `query_metrics.collection_interval` | number | `10` | Collection interval in seconds. |

### Query samples

Collects currently running queries from `system.processes`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `query_samples.enabled` | boolean | `true` | Enable query samples collection. Requires `dbm: true`. |
| `query_samples.collection_interval` | number | `1` | Collection interval in seconds. |
| `query_samples.payload_row_limit` | integer | `1000` | Maximum number of active queries per snapshot. |

### Query completions

Collects records of individual completed queries from `system.query_log`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `query_completions.enabled` | boolean | `true` | Enable query completions collection. Requires `dbm: true`. |
| `query_completions.collection_interval` | number | `10` | Collection interval in seconds. |
| `query_completions.samples_per_hour_per_query` | number | `15` | Maximum samples collected per hour per unique query signature. |

{{< partial name="whats-next/whats-next.html" >}}
