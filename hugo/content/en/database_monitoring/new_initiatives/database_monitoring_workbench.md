---
title: Database Monitoring Workbench
description: Create a disposable PostgreSQL database shaped like a monitored production database, and test query, index, and schema changes against it before they ship.
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

Teams ship more SQL and schema change than ever, and an increasing share of it is written by coding agents rather than typed by hand. Migrations, new queries, index additions, and index removals all carry the same question: what will this do to the database?

That question usually goes unanswered until it is expensive to answer. You can run `EXPLAIN` against a local development database, but a hundred rows and a million rows produce different plans: the local plan uses the index, the production plan falls back to a sequential scan, and nobody finds out until the p99 moves. In practice, most changes get their first real test in production.

Database Monitoring Workbench gives you a database with the *shape* of production — the tables, the indexes, the row counts, and the cardinalities the planner actually reasons about — without production's data, and without standing up an environment yourself.

This page covers:

- What Workbench is, and how to reach it from a coding agent or from `psql`
- The changes you can check before you merge them: queries, index drops, and migrations
- Where Workbench fits into upgrades, CI, and incident investigation
- What Workbench is deliberately not suited for

Workbench supports PostgreSQL only.

## What Workbench is

Workbench turns telemetry the Datadog Agent is already collecting into a live, disposable PostgreSQL instance.

Three things go into it:

1. **Your schema**: tables, columns, types, indexes, and foreign keys, from Database Monitoring [schema collection][1].
2. **Your statistics**: row counts and cardinalities, so the planner makes the decisions it would make in production rather than the decisions it makes against an empty table.
3. **An ephemeral PostgreSQL instance** on Datadog infrastructure, materialized from the two above. It reproduces the source database's major version, schema, indexes, and foreign keys, and it holds synthetic rows or no rows at all — never customer row values.

### From your coding agent

The most direct path is the [Datadog MCP server][2], which exposes Workbench as three tools. The agent you are already pairing with can reach them without you leaving the editor.

| Tool | Description |
| ---- | ----------- |
| `create_datadog_database_workbench` | Builds a sandbox from a monitored database and waits for it to be ready. |
| `get_datadog_database_workbench` | Checks whether a sandbox is ready. |
| `delete_datadog_database_workbench` | Deletes a sandbox, revoking its connection string and releasing its compute. |

That is the whole surface, and it is deliberately small: the agent gets a real database and then works in it the way you would. It reads the schema, writes a statement, reads the plan, adds an index, and reads the plan again. The difference is not the tooling — it is that the schema, the indexes, and the row counts are the real ones.

A skill, `datadog/dbm-workbench`, ships alongside the tools. It teaches the agent what a tool description cannot: which source databases are usable, which results are trustworthy given synthetic rows, and that the connection string is a live credential to be handled as a secret. An agent that reads a directional cost estimate as a benchmark result confidently tells you the wrong thing.

### From the API or `psql`

The same sandbox is available over HTTP. Creating a session returns a standard PostgreSQL DSN and a TTL:

{{< code-block lang="json" >}}
POST /api/unstable/databases/workbench/session
{
  "database_instance": "orders-db-primary",
  "database_name": "shop"
}
{{< /code-block >}}

{{< code-block lang="text" >}}
postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require
{{< /code-block >}}

From there it is ordinary PostgreSQL. Connect with `psql`, a GUI, or your ORM's test harness — anything that accepts a connection string. The instance is writable, so you can create an index, re-run `EXPLAIN`, and watch the plan change.

There is no setup, no database dump, no staging environment to keep in sync, and no data-access request, because the schema comes from telemetry you already send and the rows are synthetic.

<div class="alert alert-warning">The connection string is a live database credential. Treat it as a secret: do not commit it, log it, or paste it into a shared channel.</div>

## Review a query before you commit it

The most common way to learn that a query is bad is to merge it.

Database Monitoring already catches a class of these in code review by analyzing query changes in a pull request and commenting when a new query looks likely to scan a large table. That is still a feedback loop measured in review cycles: you write the query, push, wait, read the comment, rewrite, and push again.

Workbench moves that loop to the moment you write the query. Create a sandbox shaped like the database the query will run against, `EXPLAIN` it there, and read the plan against real cardinalities:

{{< code-block lang="sql" >}}
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = $1 AND created_at > $2
ORDER BY created_at DESC;
{{< /code-block >}}

If that returns `Sort -> Seq Scan on orders`, you know before the commit, before the review, and before production. Add the composite index in the sandbox, re-plan, confirm the plan flips to an index scan, and ship the index alongside the query.

## Determine whether an index is safe to drop

Unused indexes are one of the most common items on a database cleanup list and one of the least commonly acted on. The reason is asymmetry: keeping an unnecessary index costs write throughput and storage, but dropping an index that something quietly depends on causes an incident. Faced with that trade-off, most teams keep the index.

The question is answerable, but only empirically: drop the index, re-plan the queries that matter, and see which plans regress. Production is the one place you cannot try that. A Workbench sandbox has zero blast radius and your cardinalities.

Pull your top queries from [query metrics][3], capture their plans in the sandbox, drop the index, and plan them again:

{{< code-block lang="sql" >}}
EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Index Scan using idx_orders_status on orders  (cost=0.42..88.20 rows=312 width=20)

DROP INDEX idx_orders_status;

EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Seq Scan on orders  (cost=0.00..14200.00 rows=312 width=20)
{{< /code-block >}}

Run that over your top queries and you have a decision you can bring to a review: not "the index looks unused in the last 30 days," but "these three queries fall back to a sequential scan on `orders`, and here are their plans."

The same loop answers the mirror-image question. Add a candidate index instead of dropping one, re-plan, and confirm that the query you meant to help flipped to an index scan and that nothing else changed shape.

## Rehearse a migration

Migrations fail in ways a local test database cannot reproduce, because the failures are about scale and distribution rather than syntax:

- An `ALTER TABLE ... SET NOT NULL` that passes locally because the development table has no nulls, and fails in production because ten million rows do.
- A `UNIQUE` or `CHECK` constraint that conflicts with real value distributions.
- A `CREATE INDEX` that should have been `CREATE INDEX CONCURRENTLY`, and holds a write lock for the length of the build.
- An `ALTER` that takes a stronger lock than expected on a table that is never idle.

Run the migration against a Workbench instance and these surface in a sandbox rather than in an incident. The `SET NOT NULL` fails there, on synthetic rows, and you add the default before anyone else sees the branch. Inspect `pg_locks` while the DDL runs to see what it actually takes, and re-plan your important queries afterward to see what the new schema did to them.

The migration does not run in the same wall-clock time it takes in production, and it should not be read that way. The structural outcome is the same one production produces.

## Plan a major version upgrade

PostgreSQL major version upgrades are often planned on faith: read the release notes, look for planner changes that sound relevant, upgrade a replica, and hope.

Workbench supports PostgreSQL 12 through 18, and the sandbox major version follows the source instance. That makes the comparison mechanical: materialize the same schema on your current major and on your target major, run your top queries against both, and diff the plans. The queries whose plan shape changes are your upgrade risk list.

## Gate plan regressions in CI

Because a Workbench instance is API-created and disposable, it fits into a pipeline. For each pull request that touches SQL or schema, create a sandbox, apply the change, plan your top queries against it, and assert the invariants that matter to you: no new sequential scan on a large table, no plan-shape change on a query in your critical path, and no index dropped that something still uses.

## Reproduce a slow query

When you are looking at a slow query in Database Monitoring, the next step is usually the hard part: to try a rewrite, you need somewhere to try it. Production is off-limits, staging has a fraction of the data, and a realistic local copy means a data-access request.

One call gives you a sandbox shaped like the instance the query came from. Iterate on rewrites there, compare plans, and bring the result to the pull request.

## Explore a schema safely

New engineers spend their first weeks reconstructing the data model from code. A Workbench instance gives them the real thing: run joins, follow foreign keys, see which tables are enormous and which are lookup tables, break things, and create another one. No privacy review is required, because there is no customer data in it.

## Limitations

Workbench is precise about a specific class of questions. It is worth being equally precise about what it cannot answer.

- **It is not a benchmark rig.** Sandbox instances are small and are not sized to resemble your production hardware. Absolute timings from a Workbench instance are not meaningful. Read plan shape, row estimates, index usage, and relative before-and-after comparisons, not "this query takes 40ms." To benchmark a specific rewrite or index, use [Bits Database Optimization][4].
- **The data is synthetic and cardinality is approximated.** Rows are generated from collected statistics, so table sizes are in the right neighborhood, but skew, correlation between columns, and value distributions do not match production. Plans can still diverge on distribution-sensitive choices.
- **It cannot find data-specific bugs.** A query that breaks on one particular customer's row is unanswerable here by design, because that row does not exist in the sandbox.
- **Schema reconstruction is best-effort.** It may skip an index or a foreign key, or drop an expression that calls a function it does not have. Views, functions, triggers, roles, and grants are not reconstructed, so a change that depends on one of those is not reproduced faithfully.
- **Instances are ephemeral, and wide schemas may be truncated.** Sandboxes expire after a short TTL, so nothing long-running survives without re-creating it, and schemas past a certain table count are not materialized whole.

Workbench is trustworthy for structural, planning, and order-of-magnitude consequences. That covers most of what goes wrong with a database change, and it deliberately does not cover the rest.

## Requirements

- The source database must be PostgreSQL and monitored by [Database Monitoring][5].
- Schema collection must be enabled and must cover the specific logical database, not only the instance. An instance can report metrics for several databases while schema is collected for only one of them.
- Your account needs the `dbm_read` permission.
- Workbench must be enabled for your organization. Use the preview form at the top of this page to request access.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/schema_explorer/
[2]: /mcp_server/
[3]: /database_monitoring/query_metrics/
[4]: /database_monitoring/bits_database_optimization/
[5]: /database_monitoring/
