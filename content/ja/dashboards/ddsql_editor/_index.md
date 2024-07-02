---
title: DDSQL Editor
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL Editor is in private beta.
{{< /callout >}}

## 概要

With [DDSQL Editor][1], you can get deeper visibility into your infrastructure by querying your resources with natural language or with [DDSQL][2], a dialect of SQL with additional support for querying tags.

{{< img src="dashboards/ddsql/query-result.png" alt="The result of a SQL query shown on the DDSQL page in Datadog" style="width:100%;" >}}

### Query in natural language

Type your question into the search box, and Datadog builds the SQL query for you.

{{< img src="dashboards/ddsql/natural-language-query.png" alt="A query inputted into the natural language search box" style="width:90%;" >}}

### Use SQL syntax (DDSQL)

Get exactly the data you want by writing your own `SELECT` statement. Query tags as if they are standard table columns.

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws_ec2_instance
WHERE env = 'staging' -- env is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

### Explore your infrastructure data

View and filter the list of tables and fields in the schema side panel:

{{< img src="dashboards/ddsql/schema-explorer.png" alt="A list of available tables" style="width:90%;" >}}

Click a table name to view its columns and relationships:

{{< img src="dashboards/ddsql/table-details.png" alt="The details of a table, including its columns and relationships" style="width:60%;" >}}

### Save and share queries

Save useful queries, or export the data as CSV.

{{< img src="dashboards/ddsql/save-or-export-result.png" alt="A query result with the save and export actions shown" style="width:90%;" >}}

Browse and re-run saved queries in the side panel.

{{< img src="dashboards/ddsql/saved-queries-panel.png" alt="A list of saved queries" style="width:60%;" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /dashboards/ddsql_editor/reference