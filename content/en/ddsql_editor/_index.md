---
title: DDSQL Editor
aliases:
- /dashboards/ddsql_editor/
- /ddsql_editor/reference/
further_reading:
- link: "/ddsql_editor/reference"
  tag: "Documentation"
  text: "References for DDSQL Queries"
- link: "/ddsql_editor/guide/ddsql_use_cases"
  tag: "Guide"
  text: "Common queries and use cases"
---


{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL Editor is in Preview.
{{< /callout >}}

## Overview

With [DDSQL Editor][1], you can get deeper visibility into your infrastructure by querying your resources with natural language or with [DDSQL](#use-sql-syntax-ddsql), a dialect of SQL with additional support for querying tags.

{{< img src="ddsql_editor/query-result.png" alt="The result of a SQL query shown on the DDSQL page in Datadog" style="width:100%;" >}}

## Query in natural language

Type your question into the search box, and Datadog builds the SQL query for you. You must have BitsAI enabled to be able to use this. 

{{< img src="ddsql_editor/natural-language-query.png" alt="A query inputted into the natural language search box" style="width:90%;" >}}

## Use SQL syntax (DDSQL)

DDSQL is a query language for Datadog data. It implements several standard SQL operations, such as `SELECT`, and allows queries against unstructured data, such as [tags][2]. Get exactly the data you want by writing your own `SELECT` statement. Query tags as if they are standard table columns. 

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws_ec2_instance
WHERE env = 'staging' -- env is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

{{< whatsnext desc="For more information on DDSQL queries, see the DDSQL References:" >}}
    {{< nextlink href="ddsql_editor/reference/functions" >}}Functions{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/data_types" >}}Data Types{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/expressions_and_operators" >}}Expressions and Operators{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/statements" >}}Statements{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/tags" >}}Tags{{< /nextlink >}}
{{< /whatsnext >}}

### Explore your infrastructure data

View and filter the list of tables and fields in the schema side panel:

{{< img src="ddsql_editor/schema-explorer.png" alt="A list of available tables" style="width:90%;" >}}

Click a table name to view its columns and relationships:

{{< img src="ddsql_editor/table-details.png" alt="The details of a table, including its columns and relationships" style="width:60%;" >}}

### Save and share queries

Save useful queries, or export the data as CSV.

{{< img src="ddsql_editor/save-or-export-result.png" alt="A query result with the save and export actions shown" style="width:90%;" >}}

Browse and re-run saved queries in the side panel.

{{< img src="ddsql_editor/saved-queries-panel.png" alt="A list of saved queries" style="width:60%;" >}}

## Permissions

To access the DDSQL Editor app, users need the `ddsql_editor_read` permission. This permission is included in the Datadog Read Only Role by default. If your organization uses custom roles, add this permission to the appropriate role. For more information on managing permissions, see the [RBAC documentation][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /dashboards/ddsql_editor/reference/tags
[3]: /account_management/rbac/
