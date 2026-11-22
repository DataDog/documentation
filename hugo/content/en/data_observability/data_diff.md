---
title: Data Diff
description: "Compare a source and a target dataset in Snowflake row by row to find the rows that were removed, added, or modified."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/data_observability/data_catalog/'
    tag: 'Documentation'
    text: 'Data Catalog'
  - link: '/data_observability/quality_monitoring/data_warehouses/snowflake/'
    tag: 'Documentation'
    text: 'Snowflake'
  - link: '/account_management/rbac/'
    tag: 'Documentation'
    text: 'Role Based Access Control'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Diff is in Preview. To request access, contact your Datadog representative.
{{< /callout >}}

## Overview

Data Diff compares two datasets row by row. Each diff has a source dataset and a target dataset, and a Snowflake dataset can be a table or a SQL query. Datadog matches rows across the two datasets on the primary key columns you choose and compares the values in the columns you map. It reports each difference as one of the following:

- {{< ui >}}Removed{{< /ui >}}: The row exists only in the source.
- {{< ui >}}Added{{< /ui >}}: The row exists only in the target.
- {{< ui >}}Modified{{< /ui >}}: The primary key exists in both datasets, and at least one compared value differs.

Use Data Diff to confirm that a migration or replication job copied a table correctly. You can also compare a table with an earlier version of itself.

To alert on a schedule when a metric such as row count differs between two assets, use a [source to target monitor][1]. Data Diff finds the individual rows that differ.

## Prerequisites

- Preview access for your organization. To request access, contact your Datadog representative.
- A Snowflake account connected to Data Observability. See [Snowflake][2].
- `SELECT` access for the Datadog role on the source and target tables, and on every table that a SQL dataset reads. The `grant_database_access` procedure in the [Snowflake setup][3] grants this access for each database you list.
- Data Diff turned on for your organization. See [Turn on Data Diff](#turn-on-data-diff).
- The Data Diff permissions for the actions you take. See [Permissions](#permissions).

The source and target datasets can be in the same Snowflake account or in different Snowflake accounts. Diff queries run through the Data Observability connection of each account, on the default warehouse of the Datadog user, and use Snowflake credits.

## Turn on Data Diff

Data Diff is off by default. A user with the Data Observability Data Diff Config Write permission turns it on for the organization. The Datadog Admin role includes this permission.

1. In Data Observability, go to {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Data Diff{{< /ui >}}][4].
2. Under {{< ui >}}Data diff access{{< /ui >}}, turn on {{< ui >}}Enable data diff for this organization{{< /ui >}}.

While Data Diff is off, the [Data Diff page][5] shows a {{< ui >}}Data Diff Settings{{< /ui >}} button that opens the same settings page.

If you turn Data Diff off later, no one in the organization can create or run diffs, and scheduled diffs stop running. A diff's page still shows the results of its past runs.

### Choose where results are stored

Under {{< ui >}}Storage{{< /ui >}} on the Data Diff settings page, choose where Datadog stores the rows that each run finds:

- {{< ui >}}Store in Datadog{{< /ui >}}: Datadog stores the results. This is the default.
- {{< ui >}}Store in a data warehouse{{< /ui >}}: Datadog writes the results to a database and schema in a connected Snowflake account. Select the {{< ui >}}Account{{< /ui >}}, enter the {{< ui >}}Database{{< /ui >}} and {{< ui >}}Schema{{< /ui >}}, and click {{< ui >}}Save changes{{< /ui >}}.

Datadog quotes the database and schema names, so enter them with the case that Snowflake stores. Snowflake stores names created without double quotes in uppercase, for example `ANALYTICS`.

With warehouse storage, Datadog creates a table named `DIFF_RESULTS` in that schema if the table doesn't exist. Datadog then inserts, reads, and deletes result rows in that table through its connection to the Snowflake account. The table holds the column values of the differing rows that each run finds, so anyone with `SELECT` on `DIFF_RESULTS` in Snowflake can read those values.

Grant the Datadog role access to a dedicated schema for results. Replace `DATADOG_ROLE` with the role you created during [Snowflake setup][3]:

```sql
GRANT USAGE ON DATABASE <RESULTS_DATABASE> TO ROLE DATADOG_ROLE;
GRANT USAGE ON SCHEMA <RESULTS_DATABASE>.<RESULTS_SCHEMA> TO ROLE DATADOG_ROLE;
GRANT CREATE TABLE ON SCHEMA <RESULTS_DATABASE>.<RESULTS_SCHEMA> TO ROLE DATADOG_ROLE;
```

The Datadog role creates `DIFF_RESULTS` and owns it, so it needs no other grants on the table. Some schemas have a future grant that gives ownership of new tables to another role. In that case, grant the Datadog role `SELECT`, `INSERT`, and `DELETE` on `DIFF_RESULTS` after Datadog creates it.

Viewing the storage settings requires the Data Observability Data Diff Config Read permission. Changing them requires the Data Observability Data Diff Config Write permission.

## Permissions

Data Diff has its own permissions. The default roles column lists which of the Datadog Read Only, Datadog Standard, and Datadog Admin roles include each permission.

| Permission | Name | Grants | Default roles |
|---|---|---|---|
| Data Observability Data Diff Read | `data_observability_diff_read` | View diffs, runs, and run summaries, including counts of differing rows. Doesn't grant access to row-level data. | Read Only, Standard, Admin |
| Data Observability Data Diff Row-Level Data Read | `data_observability_diff_result_read` | View the row-level data in diff results. | Admin |
| Data Observability Data Diff Write | `data_observability_diff_write` | Create, run, edit, cancel, and delete diffs. | Admin |
| Data Observability Data Diff Config Read | `data_observability_diff_config_read` | View whether Data Diff is turned on and where results are stored. | Read Only, Standard, Admin |
| Data Observability Data Diff Config Write | `data_observability_diff_config_write` | Turn Data Diff on or off and configure where results are stored. | Admin |

With only the Data Observability Data Diff Read permission, a user sees how many rows each run found, but not the rows. These counts are labeled {{< ui >}}Left only{{< /ui >}} for removed rows, {{< ui >}}Right only{{< /ui >}} for added rows, and {{< ui >}}Modified{{< /ui >}}. To see the rows, a user also needs the Data Observability Data Diff Row-Level Data Read permission.

To give these permissions to other users, add them to a custom role. See [Role Based Access Control][6].

## Create a diff

Start a diff from any of these places:

- **The Data Diff page**: Go to the [Data Diff page][5] and click {{< ui >}}Create Data Diff{{< /ui >}}.
- **A table page in the [Data Catalog][7]**: Open the {{< ui >}}Data Diff{{< /ui >}} tab and click {{< ui >}}Create Data Diff{{< /ui >}}. You can also select {{< ui >}}Create Data Diff{{< /ui >}} from the page's actions menu. Datadog fills in the table as the source dataset.

Then configure the diff:

1. Optionally, enter a {{< ui >}}Name{{< /ui >}} and a {{< ui >}}Description{{< /ui >}}. If you leave the name blank, Datadog names the diff after its source and target tables.
2. Select a {{< ui >}}Schedule{{< /ui >}}. {{< ui >}}On Demand{{< /ui >}} runs the diff only when you start it. Recurring schedules use UTC and can run at most every 15 minutes.
3. Under {{< ui >}}Source Dataset{{< /ui >}}, select the Snowflake {{< ui >}}ACCOUNT{{< /ui >}}, then choose {{< ui >}}Table{{< /ui >}} or {{< ui >}}SQL{{< /ui >}}:
   - {{< ui >}}Table{{< /ui >}}: In {{< ui >}}FROM{{< /ui >}}, enter the table path as `DATABASE.SCHEMA.TABLE`, or select a suggested table. You can enter a table that isn't in the catalog. Datadog marks it as {{< ui >}}Unsynced table{{< /ui >}}.
   - {{< ui >}}SQL{{< /ui >}}: In {{< ui >}}Query{{< /ui >}}, enter a single `SELECT` or `WITH ... SELECT` query. Use fully qualified table names, such as `ANALYTICS.PUBLIC.ORDERS`. Each output column needs a unique name, and the column mapping uses these output names.
4. For a table dataset, optionally expand {{< ui >}}Optional Filters{{< /ui >}}:
   - {{< ui >}}WHERE{{< /ui >}}: A SQL expression that filters the table, without the `WHERE` keyword. For example, `created_at >= '2026-01-01'`. To compare the same rows on both sides, use an equivalent filter on the source and the target.
   - {{< ui >}}AT{{< /ui >}}: A date and time, in your Datadog time zone. Datadog uses [Snowflake Time Travel][8] to read the table as it existed at that time. The time is fixed, so a scheduled diff reads the table as of the same time on every run.
5. Configure the {{< ui >}}Target Dataset{{< /ui >}} the same way. To swap the source and target, click {{< ui >}}Switch{{< /ui >}}.
6. Review the column mapping. See [Map columns](#map-columns).
7. Optionally, expand {{< ui >}}Advanced Diff Options{{< /ui >}} and set the {{< ui >}}Differing row limit{{< /ui >}}. This limit is the maximum number of differing rows a run collects, from 0 to 1,000,000. Leave it blank or enter 0 to use the default of 10,000.
8. Click {{< ui >}}Create Data Diff{{< /ui >}}. Datadog saves the diff, starts its first run, and opens the diff page.

### Map columns

After you select both datasets, Datadog suggests a column mapping and a primary key. Datadog makes the suggestion with a Datadog-hosted AI model. The model receives the diff's name and description, the dataset tables or queries, and the {{< ui >}}WHERE{{< /ui >}} filters. It also receives column names, column types, and catalog attributes such as descriptions. It doesn't receive row values. If Datadog can't suggest a mapping, it matches columns by name. Review the primary key before you create the diff.

The mapping has three groups:

- {{< ui >}}Primary Keys{{< /ui >}}: Column pairs that uniquely identify each row in the source and the target. A diff needs at least one primary key pair, with a column selected on both sides. If a key value appears more than once in a dataset, Datadog matches the rows for that key as a group. It reports extra copies as {{< ui >}}Removed{{< /ui >}} or {{< ui >}}Added{{< /ui >}} rows.
- {{< ui >}}Compare columns{{< /ui >}}: Column pairs whose values Datadog compares.
- {{< ui >}}Ignore columns{{< /ui >}}: Columns with no match on the other side. Datadog doesn't compare them. To compare one, select a column for the other side.

To compare columns that have different names, select the matching column on the other side of the pair. Use {{< ui >}}Make Primary Key{{< /ui >}} and {{< ui >}}Remove from primary keys{{< /ui >}} to move a pair into or out of the primary key.

## Run a diff

To start a run, open the diff and click {{< ui >}}Run Diff{{< /ui >}}. Scheduled diffs also run on their schedule. A run's status is {{< ui >}}Pending{{< /ui >}}, {{< ui >}}Running{{< /ui >}}, {{< ui >}}Succeeded{{< /ui >}}, {{< ui >}}Failed{{< /ui >}}, or {{< ui >}}Cancelled{{< /ui >}}.

Data Diff doesn't sample. Each run compares every row that matches the dataset filters. The [run limits](#run-limits) cap how many rows a run reads back and reports.

Each run queries your Snowflake accounts through their Data Observability connections:

1. Datadog reads the column names and types of both datasets.
2. Datadog compares the datasets:
   - If the source and target are in the same Snowflake account, Datadog joins them in Snowflake and reads back only the rows that differ.
   - If the source and target are in different Snowflake accounts, Datadog splits the primary key values into ranges. For each range, it compares row counts and checksums on both sides, then reads rows only from the ranges that don't match.
3. Datadog saves the results to the configured storage.

Only one run of a diff executes at a time. If a scheduled run starts while another run of the same diff is in progress, Datadog skips it. If you start a run while another run of the same diff is in progress, Datadog cancels the new run. The canceled run's message says that another run of the diff was in progress.

After you change a diff's schedule, the new schedule can take up to five minutes to take effect.

### Cancel a run

To cancel a pending or running run, open the diff and click {{< ui >}}Cancel diff{{< /ui >}}. In a list of diffs, {{< ui >}}Cancel diff{{< /ui >}} is also in the diff's actions menu. The run stops issuing new queries. A Snowflake query that has already started keeps running until it finishes or reaches the 15-minute query timeout. A run that you start while the canceled run is still stopping is also canceled.

### Run limits

- Each Snowflake query that a run issues times out after 15 minutes.
- A run that doesn't finish within two hours fails.
- A run collects at most the configured differing row limit. The default is 10,000 rows.

## Comparison rules

- Datadog excludes rows with a NULL value in any primary key column from the comparison. A run can still show {{< ui >}}No differences found{{< /ui >}} when such rows exist. Before you rely on a match, check that the primary key columns have no NULL values.
- Two NULL values match. A NULL value and an empty string don't match.
- String values are compared exactly, so differences in case count.
- Timestamps are compared to the microsecond. `TIMESTAMP_LTZ` and `TIMESTAMP_TZ` values are compared in UTC, and `TIMESTAMP_NTZ` values are compared as stored.
- `VARIANT`, `OBJECT`, and `ARRAY` values are compared as JSON. Differences in key order or number formatting don't count.
- Datadog compares decimal and floating-point values to six decimal places. Differences past the sixth decimal place aren't reported. Integer values are compared exactly.
- A decimal or floating-point value with a magnitude of 1e32 or more fails the run. A non-finite floating-point value, such as NaN or infinity, also fails the run.
- During a run, Datadog can execute a SQL dataset's query more than once. Use queries that return stable, deterministic results. Volatile functions, or changes to the underlying data between reads, can make the result inconsistent.
- {{< ui >}}AT{{< /ui >}} reads historical data with the table's current schema. The time you choose must be within the table's Time Travel retention period, or the run fails.

## View results

Open a diff from the [Data Diff page][5] or from the {{< ui >}}Data Diff{{< /ui >}} tab in the Data Catalog. The {{< ui >}}Data Diff{{< /ui >}} tab appears on the pages for Snowflake accounts, databases, schemas, tables, and columns. On an account, database, or schema page, the tab lists diffs on the tables it contains. On a column page, it lists diffs on the column's table.

The diff page shows:

- A timeline of the diff's runs, and the next scheduled run for a scheduled diff. Select a run to view its results.
- {{< ui >}}Configuration{{< /ui >}}: The datasets, filters, differing row limit, and column mapping that the selected run used.
- The results of the selected run:
  - Toggle {{< ui >}}Removed{{< /ui >}}, {{< ui >}}Modified{{< /ui >}}, and {{< ui >}}Added{{< /ui >}} to choose which rows to show.
  - To include columns whose values match, turn on the toggle that shows unchanged columns.
  - If the datasets match, the page shows {{< ui >}}No differences found{{< /ui >}}.

### Truncated results

If a run's results are partial, the results show a {{< ui >}}Result Truncated{{< /ui >}} badge. Hover over the badge to see the reason:

| Reason | Meaning |
|---|---|
| `DIFFERING_ROW_LIMIT_REACHED` | The run found more differing rows than the differing row limit. The results list the rows found up to the limit. |
| `ROW_PULLDOWN_LIMIT_REACHED` | The run reached the maximum number of rows it reads for comparison. |
| `UNKEYED_ROWS_EXCLUDED` | One or both datasets have rows with a NULL primary key value. Datadog excluded these rows from the comparison. |

In a truncated result, the {{< ui >}}Left only{{< /ui >}}, {{< ui >}}Right only{{< /ui >}}, and {{< ui >}}Modified{{< /ui >}} counts include only the rows the run collected. To avoid truncated results, review the differing row limit, or use a {{< ui >}}WHERE{{< /ui >}} filter to compare fewer rows.

## Edit or delete a diff

Open the diff and click the actions menu:

- {{< ui >}}Edit diff{{< /ui >}}: Change the name, description, schedule, filters, column mapping, and differing row limit. You can't change the source or target account, table, or query after you create the diff. Click {{< ui >}}Save{{< /ui >}}, or click {{< ui >}}Save and Run{{< /ui >}} to save and start a run.
- {{< ui >}}Delete diff{{< /ui >}}: Delete the diff and all of its run history. This can't be undone.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/#source-to-target-monitors
[2]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[3]: /data_observability/quality_monitoring/data_warehouses/snowflake/#set-up-your-account-in-snowflake
[4]: https://app.datadoghq.com/data-obs/settings/data-diff
[5]: https://app.datadoghq.com/data-obs/diffs
[6]: /account_management/rbac/
[7]: /data_observability/data_catalog/
[8]: https://docs.snowflake.com/en/sql-reference/constructs/at-before
