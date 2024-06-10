---
title: Logs Workspace
kind: documentation
disable_toc: false
---

{{< callout url="#" header="false" >}}
  Logs Workspace is in private beta.
{{< /callout >}}

## Overview
During an incident investigation, you might need to run complex queries to analyze your logs. However, if you didn't set up the log pipelines and how they are parsed, you have to use the available data, which might not have the data parsed as how you need to use them. For example, maybe you need to combine attributes from multiple log sources or transform and manipulate log data. Use Logs Workspace to perform complex queries such as:

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

[1]: https://app.datadoghq.com/logs/analysis-workspace/list
[2]: https://app.datadoghq.com/logs