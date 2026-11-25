---
title: Database Monitoring Workbench
description: Develop and test changes against an ephemeral, production-like Postgres database built from the schema and statistics that Database Monitoring collects.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/schema_explorer/"
  tag: "Documentation"
  text: "Schema Explorer"
- link: "/database_monitoring/recommendations/"
  tag: "Documentation"
  text: "Recommendations"
- link: "/mcp_server/"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "/database_monitoring/query_metrics/"
  tag: "Documentation"
  text: "Query Metrics"
- link: "/database_monitoring/bits_database_optimization/"
  tag: "Documentation"
  text: "Bits Database Optimization"
---

{{< callout url="https://app.datadoghq.com/forms/share/45a8d961134a872c7118d345cff413cfd3d88bc1f1558f76bb5067a85ae43118" btn_hidden="false" header="Join the Preview!" >}}
Database Monitoring Workbench is in preview. Use this form to request access.
{{< /callout >}}

## Overview

Database Monitoring Workbench is an ephemeral, production-like Postgres database that you can use to develop and test changes. It is built from the schema and statistics that Database Monitoring collects, so it matches the shape of your production tables, indexes, row counts, and major version. Datadog never copies or transmits the data in your tables. Workbench is automatically populated with synthetic data generated from the column and table statistics that Database Monitoring collects. If you prefer, you can manually populate it with your own data.

This page explains how to:

- Use Workbench in Datadog
- Connect to a Workbench instance with MCP, the API, or a SQL client
- Compare query plans and test index, optimization, and migration changes
- Replay production traffic
- Catch plan regressions in CI
- Experiment with data model changes

## Requirements

- A Postgres database monitored by [Database Monitoring][5].
- [Schema collection][1] enabled for the specific logical database, not only the instance.
- The **Database Monitoring Read** and `built_in_features` permissions. See [Role-based access control][6] for how to manage permissions.
- Workbench enabled for your organization. To request access, use the preview form at the top of this page.
- To use the Bits tabs in Workbench, [Bits Chat][8] and DBM AI enabled for your organization.

## Connect to Workbench

### Using Workbench in Datadog

To open Workbench, go to **Database Monitoring > Workbench**, or click **Workbench** on a query's page.

1. Select a PostgreSQL instance and a logical database.
1. Optionally, check **Monitor this Workbench** to see its metrics in Database Monitoring while you work.
1. Click **Start New Workbench**. The page shows each build step, such as **Reading database schema** and **Building schema and data**, and then a countdown to when the Workbench expires.

To open a Workbench that an agent or a CI job started, click the arrow next to **Start New Workbench** and select **Open a Workbench by id**, or add `?workbench=<WORKBENCH_ID>` to the page's URL. You can keep several Workbenches open as tabs. **View instance** opens the production instance the Workbench copies.

The sidebar groups the Workbench's tools:

| Group | Page | What it does |
| --- | --- | --- |
| Query | **SQL Editor** | Run SQL and **Explain Plan** with autocomplete. The schema sidebar lists each table's columns and types, primary key, indexes, foreign keys, the tables that reference it, and its partitions. |
| Query | **History** | The statements run in this Workbench. |
| Telemetry | **Performance Metrics** | For a monitored Workbench, the instance's performance graphs, and a Workbench dashboard you can create and edit. |
| Telemetry | **Setup** | How closely the Workbench matches production, the Agent configuration, and a planner settings experiment. |
| Test a change | **Migration Test** | Paste a migration and compare the busiest production queries' plans before and after it. |
| Test a change | **Partitioning** | Build a partitioned copy of a table, swap it in, and compare partitions read and plan cost for the queries on it. |
| Test a change | **Optimizations** | Test Database Monitoring's index and query recommendations in the Workbench, and compare the query's plan with production's. |
| Workload | **Replay** | Replay the busiest production queries, weighted by how often production runs them, and compare each query's latency with production's. |
| Data | **Load data** | Load your own rows from a CSV file, or reshape the generated data. |
| Production | **Top queries** | The instance's production queries, ordered by total time, calls, or average duration, with **Test in Workbench**. |

When [Bits AI][9] is enabled, each tool also has a Bits tab with suggested prompts. Bits gets the Workbench's connection, tables, and busiest queries. **Use Workbench in Bits**, next to **View instance**, starts a Bits chat about the Workbench and the page you're on. In the SQL Editor, **Run in Bits** sends the current statement.

<!-- TODO: add screenshot
{{< img src="database_monitoring/database_monitoring_workbench/sql_editor.png" alt="The Workbench SQL Editor, with the schema sidebar showing a table's columns, indexes and foreign keys" style="width:100%;" >}}
-->

### Connecting with the MCP server

Use the [Datadog MCP server][2] to create and manage Workbench instances from a coding agent. To add it to your agent, see [Set up the Datadog MCP server][7]. The MCP server exposes Workbench as three tools:

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 50%;">Tool</th>
      <th style="width: 50%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>create_datadog_database_workbench</code></td>
      <td>Builds a sandbox from a monitored database and waits for it to be ready.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_workbench</code></td>
      <td>Checks whether a sandbox is ready.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>delete_datadog_database_workbench</code></td>
      <td>Deletes a sandbox, revoking its connection string and releasing its compute.</td>
    </tr>
  </tbody>
</table>

After the agent creates an instance, it can read your schema, run statements, read query plans, add an index, and read the plan again. It works against your real schema, indexes, and row counts.

{{< img src="database_monitoring/database_monitoring_workbench/workbench_mcp_index_demo.mp4" alt="A coding agent creates a Workbench sandbox through the Datadog MCP server, loads production row counts, adds an index that turns a sequential scan into an index scan, and deletes the sandbox" video="true" >}}

### Connecting with the API

Use the Workbench API to create a Workbench instance from a script or CI job.

To create an instance, send a `POST` request that names the monitored database:

```shell
curl -X POST "{{< region-param key="dd_api" >}}/api/unstable/databases/workbench/session" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "database_instance": "orders-db-primary",
    "database_name": "shop"
  }'
```

The application key must belong to a user or service account with the **Database Monitoring Read** permission. If Workbench is not enabled for your organization, the API returns `403`.

| Parameter | Description |
| --------- | ----------- |
| <code style="white-space: nowrap;">database_instance</code> | The name of the instance in Database Monitoring. |
| <code style="white-space: nowrap;">database_name</code> | The name of the logical database inside the `database_instance`. |
| <code style="white-space: nowrap;">populate</code> | Set to `false` to create the instance without generated data. To load your own data, see [Connecting with a SQL client](#connecting-with-a-sql-client). |
| <code style="white-space: nowrap;">monitoring</code> | Set to `true` to monitor the instance with Database Monitoring. The response then includes `monitoring_database_instance`, the name it reports under. <!-- TODO(backend): cost and setup --> |

The request returns `202 Accepted` with the instance ID, its status, and a Postgres connection string:

{{< code-block lang="json" >}}
{
  "id": "workbench-123",
  "status": "pending",
  "connection": {
    "dsn": "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
  }
}
{{< /code-block >}}

Creating an instance is asynchronous. To check readiness, send `GET /api/unstable/databases/workbench/session/{id}` until `status` is `ready`. Stop polling if `status` is `failed` or `cancelled`. A failed instance returns `error.code` and `error.message`.

| `status` | Meaning |
| --- | --- |
| `pending`, `running` | Being built. `phase` shows which step the build is on. |
| `ready` | Accepting connections. |
| `cancelling`, `cancelled` | Deleted or expired. |
| `failed` | The build failed. See `error`. |

`phase` is one of `queued`, `telemetry_extraction`, `population_planning`, `workload_discovery`, `claiming_sandbox`, `initializing_postgres`, `building_schema`, or `ready`. The response also includes `postgres_major`, `schema.tables`, `schema.columns`, `population.populated_rows`, `created_at`, `ready_at`, and `expires_at`.

An instance expires 60 minutes after it's created, including the time it takes to build. <!-- TODO(backend): confirm the default --> Use `expires_at` for the deadline. `ttl_seconds` is the time left when you read the status, not the TTL. You cannot set the TTL in the request.

To run a statement without a database client, send `POST /api/unstable/databases/workbench/session/{id}/query` with `{"sql": "<STATEMENT>"}`. The response includes `columns`, `rows`, `row_count`, `duration_ms`, and `truncated` when the rows were cut short. <!-- TODO(backend): confirm it's public -->

To delete an instance, send `DELETE /api/unstable/databases/workbench/session/{id}`. A successful request returns `204`.

<div class="alert alert-danger">The connection string is a live database credential. Treat it as a secret: do not commit it, log it, or paste it into a shared channel. Delete the instance when finished. Expiry or deletion closes connections and discards all data.</div>

### Connecting with a SQL client

Use the connection string from the MCP server or the API with any Postgres client, such as `psql`, a GUI, or your ORM's test harness.
{{< code-block lang="shell" >}}
psql "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
{{< /code-block >}}

The instance is writable, so you can create an index, re-run `EXPLAIN`, and compare the plans. For examples, see [How to use Workbench](#how-to-use-workbench). When the instance expires or you delete it, open connections close and in-flight queries can fail.

By default, Workbench populates the instance with synthetic data. To use your own data instead, create the instance with `"populate": false` in the API request. Then load your data with `INSERT`, `COPY FROM STDIN`, or the `psql` `\copy` command, and run `ANALYZE` afterward. Instance resources and the TTL limit how much data you can load.

### Loading data from the app

In Workbench, open **Load data**:

- **Load from file:** Load a CSV file into a table. Pick an **Existing table** and **Insert new rows**, **Update matching rows** (matched on the key columns you pick), or **Replace all rows** (in one statement, so a failure leaves the table as it was). Or, pick **New table** to create one shaped like the file. You can load up to 50,000 rows per file.
- **Change the generated data:** Skew a column toward one value, scale a table up, add nulls, or thin a table out, then see how plans change.

To keep personal data out of the Workbench, check **Anonymize before loading** and pick the columns. Values are replaced in your browser, so only the anonymized rows are sent. Each value keeps its shape and type: an email stays an email, a number keeps its digit count and stays within its integer type, a date moves by up to a year, and a UUID stays a UUID. Each distinct value gets one stand-in, so repeats, uniqueness, and joins between columns still hold.

To keep joins working across files, turn on **Match earlier uploads**. The same value then gets the same stand-in in every file you load into that Workbench. The key stays in your browser and can't be read.

**Replace all rows** isn't available when another table's foreign key deletes or resets rows in this one (`ON DELETE CASCADE`, `SET NULL`, or `SET DEFAULT`).

## How to use Workbench

Create an instance with the [MCP server](#connecting-with-the-mcp-server) or the [API](#connecting-with-the-api), and connect to it with a [SQL client](#connecting-with-a-sql-client). Then use it for the tasks in this section.

### Compare query plans before and after a change

Check a query's plan when you write it, before you open a pull request. You can also use these steps to test a rewrite after you find a slow query in Database Monitoring. Create the instance for the database the query ran on.

Run `EXPLAIN` against the instance and read the plan against production-like row counts and cardinalities:

{{< code-block lang="sql" >}}
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 42 AND created_at > '2026-01-01'
ORDER BY created_at DESC;
{{< /code-block >}}

If the plan shows `Sort -> Seq Scan on orders`, the query scans the whole table. Add the composite index in the instance, re-plan, and confirm the plan changes to an index scan:

{{< code-block lang="sql" >}}
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at DESC);
{{< /code-block >}}

Then ship the index with the query. For a slow query, compare the plans before and after your rewrite, and bring the result to the pull request. You can test rewrites without touching production or requesting access to its data.

### Check which queries depend on an index

Dropping an unused index saves write throughput and storage, but dropping one that a query depends on can cause an incident. Test the drop in an instance first. Dropping an index there does not affect production.

1. Get your top queries from [query metrics][3].
2. Run `EXPLAIN` on each query and save the plan.
3. Drop the index in the instance.
4. Run `EXPLAIN` on each query again and compare the plans.

{{< code-block lang="sql" >}}
EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Index Scan using idx_orders_status on orders  (cost=0.42..88.20 rows=312 width=20)

DROP INDEX idx_orders_status;

EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Seq Scan on orders  (cost=0.00..14200.00 rows=312 width=20)
{{< /code-block >}}

A query whose plan falls back to a sequential scan depends on the index. Bring those plans to your review instead of relying on subjective, untested assumptions. To test a new index instead, create it in the instance and re-plan your queries.

### Test a migration before you deploy it

Migration problems often depend on table size and concurrent traffic, so a local test database can miss them. For example:

- A `CREATE INDEX` that should have been `CREATE INDEX CONCURRENTLY`, and holds a write lock for the length of the build.
- An `ALTER` that takes a stronger lock than expected on a table that is never idle.

To test a migration, run it against the instance with your migration tool, using the instance's connection string. While the DDL runs, query `pg_locks` to see which locks it takes. Afterward, re-plan your important queries to see how the new schema affects them.

A test migration takes less time than production, but produces the same structural outcome.

### Catch plan regressions in CI

Use the [API](#connecting-with-the-api) to add a plan check to your pipeline. For each pull request that touches SQL or schema:

1. Create an instance.
2. Poll until the status is `ready`.
3. Prepare the data.
4. If you compare plans before and after the change, capture baseline plans with `EXPLAIN`.
5. Apply the change.
6. Run `EXPLAIN` on your top queries.
7. Fail the build if a plan breaks one of your invariants.
8. Delete the instance, even if an earlier step fails.

Examples of invariants:

- No new sequential scan on a large table.
- No plan-shape change on a query in your critical path.
- No index dropped that is still in use.

The following script runs this flow in a CI job. It requires `curl`, `jq`, and `psql`, and these environment variables:

- `DD_API_KEY` and `DD_APP_KEY`: your Datadog API key and application key.
- `DD_SITE`: your Datadog site, such as `datadoghq.com` or `us3.datadoghq.com`. Defaults to `datadoghq.com`.
- `DB_INSTANCE` and `DB_NAME`: the `database_instance` and `database_name` to create the instance from.

```shell
#!/usr/bin/env bash
set -euo pipefail
API="https://api.${DD_SITE:-datadoghq.com}/api/unstable/databases/workbench/session"
AUTH=(-H "DD-API-KEY: ${DD_API_KEY}" -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" -H "Content-Type: application/json")

# Create (returns 202 with id + connection.dsn)
resp=$(curl -sf -X POST "$API" "${AUTH[@]}" \
  -d "{\"database_instance\":\"${DB_INSTANCE}\",\"database_name\":\"${DB_NAME}\"}")
id=$(jq -r .id <<<"$resp")
dsn=$(jq -r .connection.dsn <<<"$resp")
trap 'curl -sf -X DELETE "$API/$id" "${AUTH[@]}" >/dev/null || true' EXIT  # always delete

# Wait for ready, and stop if the build fails
for _ in $(seq 60); do
  status_json=$(curl -sf "$API/$id" "${AUTH[@]}")
  status=$(jq -r .status <<<"$status_json")
  case "$status" in
    ready) break ;;
    failed|cancelled)
      echo "Workbench $status: $(jq -r '.error.message // "no error message"' <<<"$status_json")" >&2
      exit 1 ;;
  esac
  sleep 5
done
[ "$status" = ready ] || { echo "Workbench not ready in time: $status" >&2; exit 1; }

# Apply the change, then EXPLAIN top queries
psql "$dsn" -v ON_ERROR_STOP=1 -f migrations/change.sql
psql "$dsn" -v ON_ERROR_STOP=1 -f ci/explain_top_queries.sql > plans.txt

# Fail on a broken invariant (example)
if grep -q "Seq Scan on orders" plans.txt; then echo "Plan regression"; exit 1; fi
```

In this example, `migrations/change.sql` contains your change, and `ci/explain_top_queries.sql` contains an `EXPLAIN` statement for each of your top queries. The last check fails the job if a plan includes a sequential scan on `orders`. Replace it with your own invariants. Each statement is limited to 30 seconds, so long migrations and index builds on large tables can fail. <!-- TODO(backend) -->

### Experiment with data model changes

Changing a data model is one of the riskiest operations you can run on a database. Splitting a table, changing a column type, or adding a foreign key can break queries, block reads and writes, or fail against production data. Most of these changes are hard to undo.

A Workbench instance gives you your real schema to experiment on. Try the change, run your joins and queries against it, follow the foreign keys, and see which tables are large and which are lookup tables. If something breaks, delete the instance and create another one.

With the default synthetic data, no privacy review is required, because Workbench contains none of your customer data.

### Test an optimization from Database Monitoring

1. In Workbench, open **Optimizations**, or click **Test in Workbench** on a query in **Top queries**.
1. On a recommendation's card, click **Test in Workbench**. Workbench applies the index or rewrite, explains the query with several sets of parameter values (common values, rare values, values not in the table, and wide ranges), and then removes any index it added.
1. Compare the plan cost before and after for each set. **Compare with production** compares the Workbench plan with the plan production runs most.

For an index, Workbench also lists the production queries on that table as **Faster reads**, **Slower writes**, and **Unaffected**.

### Test a migration in the app

1. Open **Migration Test** and choose how many of the busiest production queries to check, from 1 to 50.
1. Paste the migration and click **Apply change**.
1. Each query shows its plan cost before and after, with **Compare plans**.

Each statement is limited to 30 seconds. <!-- TODO(backend) -->

### Replay production traffic

**Replay** runs the busiest production queries in the Workbench from your browser, weighted by their share of production calls, and compares each query's mean and p95 latency with production's. Pick **Replay reads**, **Replay reads and writes**, or **Stress the busiest**, then a preset such as **Quick check**, or a custom size of up to 50 queries and 2,000 runs. Replays keep running if you leave the page, and each query has **Compare plans** and **Open in editor**.

Workbench hardware isn't production's, so compare the latency ratio between queries, not the absolute numbers.

## How Workbench compares to production

Workbench answers questions about schema, query plans, and relative cost. It does not reproduce production hardware, data, or every schema object.

- **Supports PostgreSQL 12 through 18.**
- **Workbench runs on smaller hardware than production.** Compare plan shape, row estimates, index usage, and before-and-after results, not absolute timings such as "this query takes 40ms." **Optimizations**, **Migration Test**, and **Replay** compare plans, plan cost, and latency against production for you. To benchmark a rewrite or index, use [Bits Database Optimization][4].
- **Generated data is approximate.** By default, Workbench generates rows from collected statistics. Skew, column correlation, and value distributions can differ, which can change plans that depend on them. Populating Workbench with your own data avoids this.
- **Some indexes and foreign keys may be missing.** Workbench may skip an index or foreign key, or drop an expression that calls an unavailable function.
- **Workbench rebuilds tables, columns, indexes, and foreign keys.** Views, functions, triggers, roles, and grants stay out of it, so test changes that depend on them elsewhere.
- **Generated data is capped at 2,000,000 rows per table**, so larger tables have fewer rows than production. Row estimates in plans reflect the Workbench's tables. <!-- TODO(backend) -->
- **Statements are limited to 30 seconds.** Index builds and migrations on large tables can exceed the limit. <!-- TODO(backend) -->
- **Schemas over <N> tables are not fully built.** <!-- TODO(backend): the number and what happens to the rest -->
- **Helper schemas can appear.** `workbench_tools` and `workbench_meta` can appear in a Workbench. The app and Bits add them when you use some features, and they aren't part of your database.
- **Instances are temporary.** Instances expire 60 minutes after creation by default, so re-create any that you need to keep. <!-- TODO(backend): confirm the default -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/schema_explorer/
[2]: /mcp_server/
[3]: /database_monitoring/query_metrics/
[4]: /database_monitoring/bits_database_optimization/
[5]: /database_monitoring/
[6]: /account_management/rbac/permissions/
[7]: /mcp_server/setup/
[8]: /bits_ai/bits_chat/
[9]: /bits_ai/
