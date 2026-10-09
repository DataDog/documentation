---
title: Database Monitoring PR Reviews
description: Catch risky database query and schema changes in GitHub pull requests, using query metrics from Database Monitoring.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/database_monitoring_workbench/"
  tag: "Documentation"
  text: "Database Monitoring Workbench"
- link: "/database_monitoring/query_metrics/"
  tag: "Documentation"
  text: "Exploring Query Metrics"
- link: "/source_code/features/#pr-comments"
  tag: "Documentation"
  text: "Source Code Integration PR comments"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Database Monitoring PR Reviews is in preview. To request access, contact your Datadog account team.
{{< /callout >}}

## Overview

A diff alone can't show the risk of a database change. A one-line query edit can shift load on your busiest table, and dropping a column can break a query that another service still runs. Database Monitoring PR Reviews brings production context into code review, so you can catch these problems before you merge instead of after you deploy.

When a GitHub pull request changes a database query or schema, Datadog checks the change against what [Database Monitoring][1] observes in production. Authors and reviewers see the impact where they already work, without switching tools or relying on guesswork.

With PR Reviews:

- See how much production traffic a changed query carries before you merge it
- Catch migrations that drop or rename a table or column that live queries still reference
- Get index and query optimizations for new and changed Postgres queries
- Test migrations and new queries on a [Workbench][2] instance to catch failures, broken queries, and plan changes before you merge

## Requirements

- A database monitored by [Database Monitoring][1].
- The [GitHub integration][3] installed for the repositories you want reviewed, with access to pull requests. See [Source code management][4].
- Database Monitoring PR Reviews enabled for your organization. To request access, use the contact information at the top of this page.
- For [impact analysis](#impact-analysis): a Postgres database with [schema collection][5] enabled, and access to [Workbench][2].

## How it works

When you open or update a pull request, Datadog reads the diff and looks for database changes:

1. **Find queries.** Datadog finds SQL in `.sql` files, in string literals and heredocs, and in ORM and query-builder code. For ORM code, it uses AI to reconstruct the SQL that the code generates.
2. **Match queries to production.** Datadog normalizes each query and matches it against the queries Database Monitoring observed in the last 24 hours. A query that matches carries production evidence, such as execution count and share of database load.
3. **Find risky schema changes.** In SQL files and SQL strings, Datadog looks for statements that drop or rename a table or column, and finds the production queries that still reference that object.
4. **Report findings.** Datadog posts an inline comment for each finding that has production evidence or a medium or high severity. Low-severity findings without production evidence are not posted.

<div class="alert alert-info">Datadog only analyzes the forward half of a migration. Rollback code, such as a <code>down</code> method or a <code>-- migrate:down</code> section, and files named like <code>*.down.sql</code> are skipped.</div>

## What it checks

### Production query changes

Datadog flags a pull request that changes or removes a query that runs in production. The comment shows the query before and after the change, and the query's production footprint:

| Field | Description |
| ----- | ----------- |
| **Executions/day** | Average daily executions of the query. |
| **Avg execution time** | Average execution time of the query. |
| **Share of query traffic** | The query's percentage of all query executions on the database. |
| **Share of DB workload** | The query's percentage of total database time. |
| **View in Database Monitoring** | A link to the query in Database Monitoring. |

Severity depends on the query's share of database workload:

| Share of DB workload | Severity |
| -------------------- | -------- |
| 5% or more | High |
| 0.5% to 5% | Medium |
| Less than 0.5%, or unknown | Low |

### Schema changes that break live queries

Datadog flags a migration that drops or renames a table or column that production queries referenced in the last 24 hours. For example, a pull request adds this migration:

{{< code-block lang="sql" >}}
ALTER TABLE orders DROP COLUMN legacy_status;
{{< /code-block >}}

Another service still runs this query in production:

{{< code-block lang="sql" >}}
SELECT id, total, legacy_status
FROM orders
WHERE customer_id = $1;
{{< /code-block >}}

After the migration runs, this query fails because `orders.legacy_status` no longer exists. Datadog comments on the `DROP COLUMN` line and lists the queries that still read `orders.legacy_status`, with execution counts, when each query was last seen, and links to Database Monitoring. If more than four queries are affected, the comment lists the three with the most impact and summarizes the rest.

Datadog detects the following statements:

- `DROP TABLE`
- `ALTER TABLE ... DROP COLUMN`
- `ALTER TABLE ... RENAME TO`
- `ALTER TABLE ... RENAME COLUMN`

Datadog detects these statements in SQL files and in SQL strings in your code.

<div class="alert alert-info">ORM migration methods, such as <code>remove_column</code> or <code>rename_table</code>, are not reviewed.</div>

### Query optimizations

For new and changed Postgres queries, Datadog runs the query through Database Monitoring's query optimizers and flags issues with a suggested fix:

| Suggestion | What Datadog flags |
| ---------- | ------------------ |
| **Missing index** | The query has no index that supports its filter or sort. The comment includes the `CREATE INDEX` statement to add and how many other queries the index would help. |
| **`SELECT *`** | The query selects every column. When possible, the comment includes a rewrite that names the columns. |
| **`OFFSET` without `ORDER BY`** | The query paginates without a deterministic order, so results can be skipped or duplicated across pages. |

### Impact analysis

When you enable the [Database Monitoring Workbench][2], Datadog can run your change against an ephemeral Postgres instance built from the schema and statistics Database Monitoring collects to assess the following:

| Change | What Datadog does | What the comment shows |
| ------ | --------------------- | ---------------------- |
| **Migration** that drops or renames an object, in raw SQL | Applies the changed statements to a Workbench instance and replays the production queries that use the affected tables. | The queries whose plan, index usage, execution time, or logical reads changed. |
| **Migration** that fails | Applies the changed statements to a Workbench instance. | The error that Postgres returned. |
| **Migration** that causes a production query to fail | Applies the changed statements and replays the production queries that use the affected tables. | The query that failed and why. |
| **New query**: a Postgres `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement | Runs the query on a Workbench instance alongside the production workload for the same tables. | Median and p95 execution time, median logical reads, indexes used, and an outline of the query plan. |

<div class="alert alert-info">
<p>Failures caused by objects or data that Workbench does not reproduce, such as a missing function or a constraint violation on synthetic rows, are not reported.</p>
<p>Workbench only replays <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, and <code>RENAME</code> statements, and <code>SET search_path</code>. It never replays data-changing or procedural statements from a migration.</p>
</div>

## Limitations

| Limitation | Details |
| ---------- | ------- |
| **Only GitHub is supported** | Pull requests on GitLab, Azure DevOps, and Bitbucket are not reviewed. |
| **Queries must run on a monitored database to carry evidence** | Evidence comes from the last 24 hours of Database Monitoring data. Queries that ran less recently, or on databases that Database Monitoring does not monitor, are not matched. |
| **Optimizations and impact analysis support Postgres only** | Other database engines are not supported for these features. |
| **Test and generated files are not reviewed** | Queries in test files don't reflect what your application runs, and generated code duplicates its source, so Datadog skips both. |
| **Only some languages are supported** | Datadog reviews Python, Go, JavaScript and TypeScript, Ruby, Java and Kotlin, Rust, PHP, C#, Elixir, and SQL. Files in other languages are skipped. |
| **Migration review requires SQL** | Breaking schema changes are detected in SQL files and SQL strings, not in ORM migration methods. Workbench only runs migrations from SQL files in a migrations directory. |
| **Reconstructed SQL is approximate** | SQL reconstructed from ORM code may not match the exact statement your application sends, so some changed queries are not matched to production. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/
[2]: /database_monitoring/database_monitoring_workbench/
[3]: /integrations/github/
[4]: /source_code/source-code-management/
[5]: /database_monitoring/schema_explorer/
