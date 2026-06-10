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
: 23.x and later (23.x, 24.x, 25.x). Recommended minimum: 23.8 LTS.

Supported Agent versions by feature
: - Query metrics, query samples, query completions: Agent 7.78+
  - Query errors, explain plans, query tagging: Agent 7.79+
  - Parts and merges monitoring: Agent 7.80+
  - Schema collection: Agent 7.81+
  - CPU time per query: Agent 7.82+

## Data collected

Database Monitoring collects the following data from ClickHouse:

**Database instance**
: Periodic collection (every 5 minutes) of instance information including version, hostname, and configuration. Custom tags defined in the `tags` option are attached to the instance for filtering and grouping by environment, region, cluster, or any other custom dimensions.

**Query metrics**
: Aggregated performance metrics for executed queries, enabling analysis of query behavior and trends over time. Collected from `system.query_log`. Starting with Agent 7.82, includes CPU time fields (`total_cpu_virtual_time_us`, `total_cpu_wait_us`) that distinguish CPU-bound queries from I/O-bound ones.

**Query samples**
: Point-in-time snapshots of currently running queries are captured from `system.processes` at a 1-second interval. Because ClickHouse queries often complete in under one second, short-lived queries may not always appear in samples.

**Query completions**
: Records of individual completed query executions, capturing all successfully executed queries. Use query completions alongside query samples to ensure complete visibility into all query activity, including short-lived queries not observed during sampling. Starting with Agent 7.82, each completion record includes per-query CPU fields (`cpu_virtual_time_us`, `cpu_wait_us`).

**Query errors** (Agent 7.79+)
: Records of failed query executions: queries that raised an exception before starting (`ExceptionBeforeStart`) or during processing (`ExceptionWhileProcessing`). Each error record includes the exception message, ClickHouse error code, and stack trace. Enabled by default alongside query completions.

**Explain plans** (Agent 7.79+)
: Logical query execution plans automatically collected for queries observed in query completions. The Agent runs `EXPLAIN json=1` against sampled `SELECT` and `WITH` statements and attaches the obfuscated plan to the corresponding query completion record. Rate-limited to avoid overhead on high-throughput clusters.

**Query tagging** (Agent 7.79+)
: Tags injected into SQL statements as comments using the [sqlcommenter][sqlcommenter] or [marginalia][marginalia] format are automatically extracted and surfaced in DBM as Propagated Tags on query samples, completions, and explain plans. Using any database API that supports SQL execution, add a comment to your SQL statement with comma-separated key-value pairs:

  ```sql
  /*key1='val1',key2='val2'*/ SELECT * FROM foo
  ```

  Tags appear on the Sample Details page under **Propagated Tags** and can be used to filter the Explain Plans and Query Samples views. See [Tagging SQL Statements][tag-statements] for full details.

[sqlcommenter]: https://google.github.io/sqlcommenter
[marginalia]: https://github.com/basecamp/marginalia
[tag-statements]: /database_monitoring/guide/tag_database_statements/

**Parts and merges** (Agent 7.80+)
: Per-table storage health metrics and a real-time event stream consumed by the DBM Storage Health timeline view. The Agent queries `system.parts`, `system.merges`, `system.mutations`, and `system.replication_queue` on each collection cycle and emits the following gauges:

  | Metric | Description |
  |--------|-------------|
  | `clickhouse.table.parts.active` | Active part count per table |
  | `clickhouse.table.parts.level_zero` | Level-zero (unflushed) parts — high values indicate merge backpressure |
  | `clickhouse.table.parts.compact` | Compact-format parts per table |
  | `clickhouse.table.parts.wide` | Wide-format parts per table |
  | `clickhouse.table.parts.rows` | Total rows across active parts |
  | `clickhouse.table.parts.bytes_on_disk` | Compressed bytes on disk |
  | `clickhouse.table.parts.compressed_bytes` | Compressed bytes (storage) |
  | `clickhouse.table.parts.uncompressed_bytes` | Uncompressed bytes (in-memory size) |
  | `clickhouse.table.parts.max_merge_level` | Highest merge level of any active part |
  | `clickhouse.table.detached_parts.count` | Total detached parts per table |
  | `clickhouse.table.detached_parts.corrupted` | Corrupted detached parts |
  | `clickhouse.merges.active` | Active (in-progress) merges per table |
  | `clickhouse.merges.stalled` | Merges running longer than the stall threshold |
  | `clickhouse.mutations.in_progress` | In-progress mutations per table |
  | `clickhouse.mutations.failing` | Mutations with at least one failed attempt |
  | `clickhouse.replication.queue_depth` | Replication queue depth per table |
  | `clickhouse.replication.stuck_tasks` | Replication queue entries with repeated failures |

**Schema collection** (Agent 7.81+)
: Catalog metadata — databases, tables, views, and columns — collected periodically and surfaced in the DBM Schema Explorer. The Agent queries `system.tables` and `system.columns` (and `system.view_refreshes` for ClickHouse 24.3+) and emits one structured payload per cycle. Disabled by default; enable with `collect_schemas.enabled: true`.

  Also available: `schema_metrics` emits per-table size gauges (`clickhouse.table.*`) and per-view refresh status gauges. This is independent of catalog collection and can be enabled without Schema Explorer.

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

To enable **schema collection** (Agent 7.81+), add the following grants:

```sql
GRANT SELECT ON system.tables TO datadog;
GRANT SELECT ON system.columns TO datadog;
GRANT SELECT ON system.view_refreshes TO datadog;  -- required for view refresh status (ClickHouse 24.3+)
```

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

    # Query errors: enabled by default (Agent 7.79+)
    query_errors:
      enabled: true

    # Parts and merges: enabled by default (Agent 7.80+)
    parts_and_merges:
      enabled: true

    # Schema collection: disabled by default, opt in (Agent 7.81+)
    # collect_schemas:
    #   enabled: true

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

### Query errors (Agent 7.79+)

Collects failed query events from `system.query_log`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `query_errors.enabled` | boolean | `true` | Enable query error collection. Requires `dbm: true`. Collects `ExceptionBeforeStart` and `ExceptionWhileProcessing` events including exception message, error code, and stack trace. |
| `query_errors.collection_interval` | number | `10` | Collection interval in seconds. |
| `query_errors.samples_per_hour_per_query` | number | `60` | Maximum error samples collected per hour per unique query signature. |

### Explain plans (Agent 7.79+)

Explain plans are collected automatically for queries observed in query completions. There is no separate `enabled` flag — plans are gathered whenever `query_completions` is active and the Agent version is 7.79+.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `explained_queries_per_hour_per_query` | number | `60` | Maximum explain plans collected per hour per unique query signature. Reduce this on very high-throughput clusters to limit overhead. |
| `explained_queries_cache_maxsize` | integer | `5000` | Maximum number of unique query signatures to track in the explain plan rate-limit cache. |

### Parts and merges (Agent 7.80+)

Collects MergeTree storage health data from `system.parts`, `system.merges`, `system.mutations`, and `system.replication_queue`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `parts_and_merges.enabled` | boolean | `true` | Enable parts and merges monitoring. Requires `dbm: true`. |
| `parts_and_merges.collection_interval` | number | `60` | Collection interval in seconds. |
| `parts_and_merges.max_parts_rows` | integer | `500` | Maximum rows in the per-cycle parts event payload, ordered by active part count descending. |
| `parts_and_merges.max_mutations_rows` | integer | `200` | Maximum rows in the per-cycle mutations payload, ordered by creation time ascending. |
| `parts_and_merges.max_replication_queue_rows` | integer | `1000` | Maximum rows returned from `system.replication_queue` per cycle. |
| `parts_and_merges.table_metrics_include_partition_tag` | boolean | `false` | Add a `partition` tag to parts gauges. Disabled by default to avoid high cardinality. |
| `parts_and_merges.table_metrics_max_tables` | integer | `200` | Cap per-table gauge emission to the top N tables by active part count. |
| `parts_and_merges.stalled_merge_elapsed_threshold_seconds` | integer | `3600` | Seconds a merge must be running before it is counted as stalled. |
| `parts_and_merges.stuck_replication_num_tries` | integer | `3` | Minimum failed attempts before a replication queue entry is counted as stuck. |

### Schema collection (Agent 7.81+)

Collects catalog metadata (databases, tables, views, columns) for the DBM Schema Explorer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `collect_schemas.enabled` | boolean | `false` | Enable catalog metadata collection. Requires `dbm: true`. When enabled, the Agent polls `system.tables`, `system.columns`, and `system.view_refreshes` (ClickHouse 24.3+). |
| `collect_schemas.collection_interval` | number | `600` | Collection interval in seconds. Catalog data changes slowly; 600 s (10 min) is a reasonable default. |
| `collect_schemas.max_tables` | integer | `300` | Maximum number of tables and views to collect per cycle across all databases. |
| `collect_schemas.max_columns` | integer | `1000` | Maximum number of columns to collect per table or view. |
| `collect_schemas.include_databases` | list | - | Regex patterns for databases to include. If empty, all databases (except system databases) are included. |
| `collect_schemas.exclude_databases` | list | - | Regex patterns for databases to exclude. System databases (`system`, `INFORMATION_SCHEMA`, `information_schema`) are always excluded. |
| `collect_schemas.include_tables` | list | - | Regex patterns for tables to include. If empty, all tables are included. |
| `collect_schemas.exclude_tables` | list | - | Regex patterns for tables to exclude. |

### Schema metrics (Agent 7.81+)

Emits per-table size gauges and per-view refresh status gauges. Independent of `collect_schemas` — enable this without Schema Explorer to track table sizes on dashboards.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `schema_metrics.enabled` | boolean | `false` | Enable per-table size and per-view refresh gauges. Requires `dbm: true`. |
| `schema_metrics.collection_interval` | number | `60` | Collection interval in seconds. |

## Coming soon

<div class="alert alert-info">
<strong>Async insert observability</strong> — visibility into ClickHouse async insert buffers and flush history from <code>system.asynchronous_inserts</code> and <code>system.asynchronous_insert_log</code> is planned for a future Agent release. This will surface per-table buffer sizes, flush rates, and error rates as DBM metrics.
</div>

{{< partial name="whats-next/whats-next.html" >}}
