---
title: Getting Started with DDSQL Editor
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

## Overview

You can write a query in [DDSQL Editor][1] in natural language or in SQL. See the [DDSQL reference documentation][2] for supported SQL expressions and usage details. Example queries are also provided throughout the UI.

{{< img src="dashboards/ddsql/query-ui-overview.png" alt="A list of available tables" style="width:100%;" >}}

- To run a natural language query, type your question into the search bar, or click on one of the provided examples below the search bar.
- To run a SQL query, type a valid DDSQL expression into the top section of the page, or run one of the examples listed under **Queries to get you started**.

## Example querying flow

This example flow highlights the key features of DDSQL Editor. If the example query isn't suitable for your data, you can use your own query instead.

### 1. Run a natural language query

1. Navigate to [DDSQL Editor][1].
2. In the natural language prompt, type `Most common instance types`.

The resulting generated query is similar to the one below.

{{< code-block lang="sql" >}}
SELECT instance_type,
  COUNT(*) AS count
FROM host
GROUP BY instance_type
ORDER BY count DESC;
{{< /code-block >}}

### 2. Modify the query SQL with the schema explorer

If you aren't sure which fields contain the data you want, you can use the schema explorer to examine the available tables, their columns, and their relationships to other tables:

1. Click the database icon in the left sidebar to open the schema explorer.
    {{< img src="dashboards/ddsql/schema-explorer-example.png" alt="The schema explorer's list of available tables" style="width:100%;" >}}
1. The current query is for the `host` table, so click **All Tables > Hosts > host** to view the available fields. Decide which field to add to the query. This example uses `availability_zone`.
    {{< img src="dashboards/ddsql/schema-explorer-table-example.png" alt="The the host table displayed in the schema explorer" style="width:50%;" >}}
1. Edit the query SQL to add the `availability_zone` to the result:

{{< code-block lang="sql" >}}
SELECT instance_type, availability_zone,
  COUNT(*) AS count
FROM host
GROUP BY instance_type, availability_zone
ORDER BY count DESC;
{{< /code-block >}}

### 3. Add a tag-based filter to the query

Tags can be queried as if they are table columns. Add a `WHERE` clause to the query to only count instances in production:

{{< code-block lang="sql" >}}
SELECT instance_type, availability_zone,
  COUNT(*) AS count
FROM host
WHERE #env = 'prod' -- Use '#' in front of tag names
GROUP BY instance_type, availability_zone
ORDER BY count DESC;
{{< /code-block >}}

See [Querying Tags in DDSQL][3] for details.

### 4. Share the query

To generate a share link for the query:

1. Click the gear icon.
1. Click **Copy Share Link**.

### 5. Save and view the query

1. Double-click the title of the query to edit the title, changing it to "Production instance types by availability zone".
1. Click **Save Query**.
1. Click the page icon in the left sidebar to open the Saved Queries panel and find your saved query in the list.

### 6. View the query in recent queries

If you forget to save a useful query before navigating away from it, you can still access it in the **Recent Queries** pane. Click the clock icon in the left sidebar to view a list of recent queries.

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /dashboards/ddsql_editor/reference
[3]: /dashboards/ddsql_editor/reference/tags