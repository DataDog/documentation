---
title: Inventories
kind: documentation
---

{{< img src="infrastructure/inventories/inventories-overview.png" alt="The result of a SQL query shown on the Inventories page in Datadog" style="width:100%;" >}}

## Overview

With [Inventories][1], you can get deeper visibility into your infrastructure by querying your resources with natural language or SQL.

### Query in natural language

Type your question into the search box, and Datadog builds the SQL query for you.

{{< img src="infrastructure/inventories/natural-language-search.png" alt="The results of a natural language search for EC2 instance sizes" style="width:90%;" >}}

### Use SQL syntax

Get exactly the data you want by writing your own `SELECT` statement. Query tags as if they are standard table columns.

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws_ec2_instance
WHERE env = 'staging' -- env is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

[Run query in Datadog][2]

### Explore your infrastructure data

View and filter the list of tables and fields in the sidebar, previewing sample values for the fields:

{{< img src="infrastructure/inventories/preview-sample-values.png" alt="A filtered list of tables and fields, with the sample values pane for one field expanded" style="width:90%;" >}}

Or use the Explore view to visualize your tables and the connections between them:

{{< img src="infrastructure/inventories/inventories-explore-view.png" alt="The Inventories Explore view with visualizations of table relationships" style="width:90%;" >}}

Click on any table name to open a details pane.

{{< img src="infrastructure/inventories/table-details-pane.png" alt="The details pane for a Kubernetes cron jobs table" style="width:70%;" >}}

### Save and share queries

Save useful queries as views that can be shared and re-run, or export the data as CSV.

{{< img src="infrastructure/inventories/save-and-export.png" alt="A query result with the Save and Export buttons highlighted" style="width:90%;" >}}


[1]: https://app.datadoghq.com/inventories
[2]: https://app.datadoghq.com/inventories/sql?q=SELECT%20instance_type%2C%20count%28instance_type%29%0AFROM%20aws_ec2_instance%0AWHERE%20env%20%3D%20%27staging%27%20--%20env%20is%20a%20tag%2C%20not%20a%20column%0AGROUP%20BY%20instance_type&saved-view-id=2720754&viz=query