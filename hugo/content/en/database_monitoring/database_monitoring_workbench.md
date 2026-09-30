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
---

{{< callout url="https://dd-corpsite.datadoghq.com/forms/share/3a07f186242c2042dce971849535bc95fa0d81b9b6346aafc53f3eda9af80af7" btn_hidden="false" header="Join the Preview!" >}}
Database Monitoring Workbench is in preview. Use this form to request access.
{{< /callout >}}

## Overview

Database Monitoring Workbench is an ephemeral, production-like Postgres database that you can use to develop and test changes. It is built from the schema and statistics that Database Monitoring collects, so it matches your production tables, indexes, row counts, and major version. Datadog never copies or transmits the data in your tables. Workbench is automatically populated with synthetic data generated from the column and table statistics that Database Monitoring collects. If you prefer, you can manually populate it with your own data.

This page explains how to:

- Connect to a Workbench instance with MCP, the API, or a SQL client
- Compare query plans and test index and migration changes
- Catch plan regressions in CI
- Experiment with data model changes

## Requirements

- A Postgres database monitored by [Database Monitoring][5].
- [Schema collection][1] enabled for the specific logical database, not only the instance.
- The **Database Monitoring Read** permission. See [Role-based access control][6] for how to manage permissions.
- Workbench enabled for your organization. To request access, use the preview form at the top of this page.

## Connect to Workbench

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

[TODO: confirm the headers and any required permission or scope.]

| Parameter | Description |
| --------- | ----------- |
| `database_instance` | The name of the instance in Database Monitoring. |
| `database_name` | The name of the logical database inside the `database_instance`. |
| `populate` | Set to `false` to create the instance without generated data. To load your own data, see [Connecting with a SQL client](#connecting-with-a-sql-client). |

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

Creating an instance is asynchronous. To check readiness, send `GET /api/unstable/databases/workbench/session/{id}` until `status` is `ready`. The response also includes `expires_at`.

Instances expire after `ttl_seconds` seconds, 1,800 (30 minutes) by default. You cannot set the TTL in the request.

To delete an instance, send `DELETE /api/unstable/databases/workbench/session/{id}`. A successful request returns `204`.

<div class="alert alert-danger">The connection string is a live database credential. Treat it as a secret: do not commit it, log it, or paste it into a shared channel. Delete the instance when finished. Expiry or deletion closes connections and discards all data.</div>

### Connecting with a SQL client

Use the connection string from the MCP server or the API with any Postgres client, such as `psql`, a GUI, or your ORM's test harness.
{{< code-block lang="shell" >}}
psql "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
{{< /code-block >}}

The instance is writable, so you can create an index, re-run `EXPLAIN`, and compare the plans. For examples, see [How to use the Workbench](#how-to-use-the-workbench). When the instance expires or you delete it, open connections close and in-flight queries can fail.

By default, Workbench populates the instance with synthetic data. To use your own data instead, create the instance with `"populate": false` in the API request. Then load your data with `INSERT`, `COPY FROM STDIN`, or the `psql` `\copy` command, and run `ANALYZE` afterward. Instance resources and the TTL limit how much data you can load.

## How to use the Workbench

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

A query whose plan falls back to a sequential scan depends on the index. Bring those plans to your review instead of relying on "the index looks unused in the last 30 days." To test a new index instead, create it in the instance and re-plan your queries.

### Test a migration before you deploy it

Migration problems often depend on table size and concurrent traffic, so a local test database can miss them. For example:

- A `CREATE INDEX` that should have been `CREATE INDEX CONCURRENTLY`, and holds a write lock for the length of the build.
- An `ALTER` that takes a stronger lock than expected on a table that is never idle.

To test a migration, run it against the instance with your migration tool, using the instance's connection string. While the DDL runs, query `pg_locks` to see which locks it takes. Afterward, re-plan your important queries to see how the new schema affects them.

The migration does not take the same time as in production, but it produces the same structural outcome.

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
- No index dropped that something still uses.

[TODO: add a short CI example, such as a shell script that calls the API, applies the change, and runs `EXPLAIN`.]

### Experiment with data model changes

Changing a data model is one of the riskiest operations you can run on a database. Splitting a table, changing a column type, or adding a foreign key can break queries, block reads and writes, or fail against production data. Most of these changes are hard to undo.

A Workbench instance gives you your real schema to experiment on. Try the change, run your joins and queries against it, follow the foreign keys, and see which tables are large and which are lookup tables. If something breaks, delete the instance and create another one.

With the default synthetic data, no privacy review is required, because Workbench contains none of your customer data.

## Limitations

Workbench answers questions about schema, query plans, and relative cost. It does not reproduce production hardware, data, or every schema object.

- **Only Postgres is supported.** Workbench supports Postgres 12 through 18. Other database engines are not supported.
- **Timings may vary.** Instances are small and not sized like your production hardware. Compare plan shape, row estimates, index usage, and before-and-after results, not absolute timings such as "this query takes 40ms." To benchmark a rewrite or index, use [Bits Database Optimization][4].
- **Generated data is approximate.** By default, Workbench generates rows from collected statistics, so table sizes are close to production. Skew, column correlation, and value distributions can differ, which can change plans that depend on them. Populating Workbench with your own data avoids this.
- **Some indexes and foreign keys may be missing.** Workbench may skip an index or foreign key, or drop an expression that calls an unavailable function.
- **Views, functions, triggers, roles, and grants are not reconstructed.** Changes that depend on them do not reproduce accurately.
- **Instances are temporary.** Instances expire after 30 minutes by default, so re-create any that you need to keep. Schemas over a certain table count are not fully materialized.

Use Workbench to check structure, query plans, and order-of-magnitude effects. It does not cover the rest.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/schema_explorer/
[2]: /mcp_server/
[3]: /database_monitoring/query_metrics/
[4]: /database_monitoring/bits_database_optimization/
[5]: /database_monitoring/
[6]: /account_management/rbac/permissions/
[7]: /mcp_server/setup/
