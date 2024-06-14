---
title: DDSQL Editor
kind: documentation
---

{{< callout url="https://google.com">}}
DDSQL Editor is in private beta.
{{< /callout >}}

## Overview

With [DDSQL Editor][1], you can get deeper visibility into your infrastructure by querying your resources with natural language or with [DDSQL][3], a dialect of SQL with additional support for querying tags and aggregating metrics.

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

[Run query in Datadog][2]

### Explore your infrastructure data

View and filter the list of tables and fields in the schema side panel:

{{< img src="dashboards/ddsql/schema-explorer.png" alt="A list of available tables" style="width:90%;" >}}

Click a table name to view its columns and relationships:

{{< img src="dashboards/ddsql/table-details.png" alt="The details of a table, including its columns and relationships" style="width:60%;" >}}

### Save and share queries

Save useful queries as views, or export the data as CSV.

{{< img src="dashboards/ddsql/save-or-export-result.png" alt="A query result with the save and export actions shown" style="width:90%;" >}}

Browse and re-run saved queries in the side panel.

{{< img src="dashboards/ddsql/saved-queries-panel.png" alt="A list of saved queries" style="width:60%;" >}}

[1]: https://app.datadoghq.com/inventories
[2]: https://app.datadoghq.com/inventories/sql?q=SELECT%20instance_type%2C%20count%28instance_type%29%0AFROM%20aws_ec2_instance%0AWHERE%20env%20%3D%20%27staging%27%20--%20env%20is%20a%20tag%2C%20not%20a%20column%0AGROUP%20BY%20instance_type&saved-view-id=2720754&viz=query
[3]: /dashboards/ddsql_editor/reference