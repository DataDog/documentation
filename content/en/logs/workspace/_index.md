---
title: Logs Workspace
kind: documentation
disable_toc: false
---

{{< callout url="#" header="false" >}}
  Logs Workspace is in private beta.
{{< /callout >}}

## Overview
During an incident investigation, you might need to run complex queries to analyze your logs. For example, you might need to combine attributes from multiple log sources or transform and manipulate log data. Use Logs Workspace to perform complex queries such as:

- Correlating multiple data sources
- Aggregating multiple levels of data
- Joining data using SQL
- Extracting data or add a calculated field at query time

You can also visualize your transformed datasets.

## Create a workspace and add a data source

You can create a workspace from the Workspaces page or from the Log Explorer.

On the [Logs Workspaces][1] page:

1. Click **New Workspace**.
1. Click the **Data source** tile.
1. Enter a query. The reserved attributes of the filtered logs are added as columns.

In the [Log Explorer][2]:

1. Enter a query.
1. Click **More** and select **Open in Workspace**.
1. The workspace adds the log query to a data source cell. By default, the columns in Log Explorer are added to the data source cell.

## Analyze, transform, and visualize your logs
You can add the following cells to include additional data sources such as reference tables, use SQL to join data, and also transform, correlate, and visualize the data. Cells that depend on other cells are automatically updated when one of the cells it depends on is changed.

Click the dataset on the left side of the page to go directly to that cell.

### Data source cell

You can add a logs query or a reference table as a data source.

1. Click on the **Data source** tile.
    - To add a reference table:
        1. Select **Reference table** in the **Data source** dropdown.
        1. Select the reference table you want to use.
    - To add a logs data source:
    a. Enter a query. The reserved attributes of the filtered logs are added as columns.
        1. Click **datasource_x** at the top of the cell to rename the data source.
        1. Click **Columns** to see the columns available. Click **as** for a column to add an alias.
        1. To add additional columns to the dataset:  
            a. Click on a log.  
            b. Click the cog next to the facet you want to add as a column.  
            c. Select **Add…to…dataset**.  
1. Click the download icon to export the dataset as a CSV.

### Analysis cell

1. Click the **Analysis** tile to add a cell and use SQL to query the data from any of the data sources. You can use natural language or SQL to query your data . An example using natural language: `select only timestamp, customer id, transaction id from the transaction logs`.
1. If you are using SQL, click **Run** to run the SQL commands.
1. Click the download icon to export the dataset as a CSV.

### Visualization cell
Click the **Visualize** tile to add a cell for visualizing your data as a table, top list, treemap, sunburst, or a scatterplot.

1. Click the **Visualize** tile.
1. Select the data source you want to visualize in the **Source dataset** drop down menu.
1. Select your visualization method in the **Visualize as** drop down menu,
1. Enter a filter if you want to filter to a subset of the data. For example, `status:error`. If you are using an analysis cell as your data source, you can also filter the data in SQL first.
1. If you want to group your data, click **Add Aggregation** and select the information you want to group by.
1. Click the download button to export the data as a CSV.

### Transformation cell

Click the **transformation** tile to add a cell for filtering, aggregating, and extracting data.

1. Click the **Transformation** tile.
1.  Select the data source you want to transform  in the **Source dataset** drop down menu.
1. Click **+** to add a **Filter**, **Parse**, or **Aggregate** function.
    - For **Filter**, add a filter query for the dataset.
    - For **Parse**, enter grok syntax to extract data into a separate column. In the **from** drop down menu, select the column the data is getting extracted from. See the [column extraction example](#column-extraction-example).
    - For **Aggregate**, select what you want to group the data by in the drop down menus.
1. Click the download icon to export the dataset into a CSV.

#### Column extraction example

If you want to extract the customer ID from the message to a separate column in this example dataset:

| timestamp           | host             | message                            |
| ------------------- | ---------------- | ---------------------------------- |
| May 29 11:09:28.000 | shopist.internal | Submitted order for customer 21392 |
| May 29 10:59:29.000 | shopist.internal | Submitted order for customer 38554 |
| May 29 10:58:54.000 | shopist.internal | Submitted order for customer 32200 |

Use the following grok syntax to extract the customer ID from the message column and add it to a new column called `customer_id`.

```
Submitted order for customer %{notSpace:customer_id}`
```

This is the dataset in the transformation cell after the extraction:

| timestamp           | host             | message                            | customer_id |
| ------------------- | ---------------- | ---------------------------------- | ----------- |
| May 29 11:09:28.000 | shopist.internal | Submitted order for customer 21392 | 21392       |
| May 29 10:59:29.000 | shopist.internal | Submitted order for customer 38554 | 38554       |
| May 29 10:58:54.000 | shopist.internal | Submitted order for customer 32200 | 32200       |

### Text cell

Click the **Text** cell to add a markdown cell so you can add information and notes.

## An example workspace

{{< img src="logs/workspace/workspace_datasets_example.png" alt="The workspace datasets" style="width:100%;" >}}

This example workspace has:
-  Three data sources:
	- `transaction_start_logs`
	- `transaction_execution_logs`
	- `trading_platform_users`
- Three derived datasets, which are the results of data that has been transformed from filtering, grouping, or querying using SQL:
    - `parsed_executed_logs`
    - `transaction_record`
    - `transaction_record_with_names`

- One treemap visualization.

This diagram shows the different transformation and analysis cells the data sources go through.

{{< img src="logs/workspace/flowchart.png" alt="A flowchart showing the steps that the data sources go through" style="width:60%;"  >}}

The example starts off with two logs data sources:
- `transaction_start_logs`
- `transaction_execution_logs`

The transform cell `parsed_executed_logs` uses the following grok parsing syntax to extract the transaction ID from the `message` column of the `transaction_execution_logs` dataset and adds the transaction ID to a new column called `customer_id`.

```
transaction %{notSpace:transaction_id}
```

An example of the resulting `parsed_executed_logs` dataset:

| timestamp           | host             | message                            | customer_id |
| ------------------- | ---------------- | ---------------------------------- | ----------- |
| May 29 11:09:28.000 | shopist.internal | Executing trade for customer 56519 | 56519       |
| May 29 10:59:29.000 | shopist.internal | Executing trade for customer 23269 | 23269       |
| May 29 10:58:54.000 | shopist.internal | Executing trade for customer 96870 | 96870       |
| May 31 12:20:01.152 | shopist.internal | Executing trade for customer 80207 | 80207       |

The analysis cell `transaction_record` uses the following SQL command to select specific columns from the `transaction_start_logs` dataset and the `transaction_execution_logs`, renames the status `INFO` to `OK`, and then joins the two datasets.

```sql
SELECT
    start_logs.timestamp,
    start_logs.customer_id,
    start_logs.transaction_id,
    start_logs.dollar_value,
    CASE
        WHEN executed_logs.status = 'INFO' THEN 'OK'
        ELSE executed_logs.status
    END AS status
FROM
    transaction_start_logs AS start_logs
JOIN
    transaction_execution_logs AS executed_logs
ON
    start_logs.transaction_id = executed_logs.transaction_id;
```

An example of the resulting `transaction_record` dataset:

| timestamp           | customer_id | transaction_id | dollar_value | status |
| ------------------- | ----------- | -------------- | ------------ | ------ |
| May 29 11:09:28.000 | 92446       | 085cc56c-a54f  | 838.32       | OK     |
| May 29 10:59:29.000 | 78037       | b1fad476-fd4f  | 479.96       | OK     |
| May 29 10:58:54.000 | 47694       | cb23d1a7-c0cb  | 703.71       | OK     |
| May 31 12:20:01.152 | 80207       | 2c75b835-4194  | 386.21       | ERROR  |

The reference table `trading_platform_users` is added as a data source:

| customer_name  | customer_id | account_status |
| -------------- | ----------- | -------------- |
| Meghan Key     | 92446       | verified       |
| Anthony Gill   | 78037       | verified       |
| Tanya Mejia    | 47694       | verified       |
| Michael Kaiser | 80207       | fraudulent     |

The analysis cell `transaction_record_with_names` runs the following SQL command to take the customer name and account status from `trading_platform_users` and appends it as columns and joins it with the `transaction_records` dataset:

```sql
SELECT tr.timestamp, tr.customer_id, tpu.customer_name, tpu.account_status, tr.transaction_id, tr.dollar_value, tr.status
FROM transaction_record AS tr
LEFT JOIN trading_platform_users AS tpu ON tr.customer_id = tpu.customer_id;
```

An example of the resulting `transaction_record_with_names` dataset:

| timestamp           | customer_id | customer_name  | account_status | transaction_id | dollar_value | status |
| ------------------- | ----------- | -------------- | -------------- | -------------- | ------------ | ------ |
| May 29 11:09:28.000 | 92446       | Meghan Key     | verified       | 085cc56c-a54f  | 838.32       | OK     |
| May 29 10:59:29.000 | 78037       | Anthony Gill   | verified       | b1fad476-fd4f  | 479.96       | OK     |
| May 29 10:58:54.000 | 47694       | Tanya Mejia    | verified       | cb23d1a7-c0cb  | 703.71       | OK     |
| May 31 12:20:01.152 | 80207       | Michael Kaiser | fraudulent     | 2c75b835-4194  | 386.21       | ERROR  |

Finally, a treemap visualization cell is created with the `transaction_record_with_names` dataset filtered for `status:error` logs and grouped by `dollar_value`, `account_status`, and `customer_name`.

{{< img src="logs/workspace/treemap.png" alt="The workspace datasets" >}}

[1]: https://app.datadoghq.com/logs/analysis-workspace/list
[2]: https://app.datadoghq.com/logs