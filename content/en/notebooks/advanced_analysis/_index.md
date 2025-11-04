---
title: Analysis Features
description: "Perform advanced data analysis in Notebooks with SQL queries, data transformations, joins, and visualizations across multiple datasets."
aliases:
- /logs/workspaces/
- /logs/workspaces/export/
further_reading:
- link: "/notebooks"
  tag: "Documentation"
  text: "Learn more about Notebooks"
- link: "/notebooks/advanced_analysis/getting_started"
  tag: "Documentation"
  text: "Getting Started with Analysis Features"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Notebooks Advanced Analysis is not available in the <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Overview

The analysis feature in Notebooks allows you to perform advanced analysis on your Datadog data. You can join multiple datasets, chain queries, and transform your data using either predefined transformations or SQL, while retaining the full capabilities that Notebooks provide.

Notebooks are collaborative text editors that allow you to embed Datadog graphs directly into your documents. While this is ideal for exploration and storytelling, deeper investigations might require more advanced control over data queries. The analysis features enable you to run queries that help you:

* Chain queries such as aggregating existing aggregated data or joining two sets of aggregating data.
* Join data across multiple log sources and other datasets.
* Perform advanced parsing, extract data, and add calculated fields at query time.
* Visualize transformed datasets with graphs.

## Adding data to your notebook

To run complex queries in a notebook, first add a **Data Source** cell. There are two ways to do this:

**From a notebook**:
1. Type `/datasource` and press <kbd>Enter</kbd>, or click the **Data Source** tile at the bottom of the page.
2. Type or select your desired data source from the drop down menu and press <kbd>Enter</kbd>.<br/>
**Note**: if there is a data source you want that is not available, request it [here][5].
3. Enter your query. Reserved attributes from the filtered logs are automatically added as columns.

**From the [Log Explorer][1]**:

1. Enter your query in the Log Explorer.
2. Click **Analyze in Notebooks**.
3. Check the **Use as a computational data source** box and select the notebook you want to use.
4. A data source cell is added to the selected notebook with the same query you entered in the Log Explorer. By default, the columns shown in the Log Explorer are included in the data source cell.

## Configuring a data source cell

After adding a data source cell to a notebook, you can continue modifying it to structure the data to suit your analysis needs.

### Change the time frame for the data

By default, data source cells created from Notebooks use the notebook's global time frame. Data source cells created from the Log Explorer use a local time fixed to the time frame at the time of export.

You can switch any data source cell between a local or global time frame using the toggle button in the top right corner of the cell.

### Filter the data source

Regardless of how you create the data source cell, you can modify the query using the search bar. Any changes to the query automatically re-run the data source cell and any downstream cells, updating the preview of the data.

### Add or modify a column

You can add or modify columns in your data source cell. There are two ways to adjust the columns:

- In the preview section, click **columns** to search through available attributes for your data source.
- In the preview, click on a row to open the detail side panel. Click the attribute you want to add as a column, and from the pop up option, select Add "@your_column" to your "@your_datasource" dataset.

{{< img src="/notebooks/analysis_features/add_column_to_dataset.png" alt="Opened detail side panel with the option to add an attribute column to the data source cell" style="width:100%;" >}}

### Calculated fields queries

You can take existing Log Explorer queries that include [Calculated Fields][4] and open them in Notebooks. To transfer these queries from the Log Explorer, click **More** and select **Analyze in Notebooks**. The Calculated Fields automatically convert into a Transformation cell.

You can also create Calculated Fields directly within a notebook to define a computed field from existing data sources. These fields can be reused in subsequent analysis:
1. Open a Workspace with a data source.
1. Add a [Transformation cell](#transformation-cell).
1. Click **More operations**.
1. Select **Calculate**.

{{< img src="/logs/workspace/calculated_fields_transformation_cell.png" alt="Screenshot of an example Workspaces interface with the 'Calculate' option selected from the 'More' dropdown menu, demonstrating how to add Calculated Fields to a query." style="width:100%;" >}}

## Transforming and analyzing data

You can add various cell types to enhance your analysis capabilities. These cells enable you to include additional data sources, such as reference tables, RUM, or spans. Use SQL to join, transform, correlate, and visualize your data effectively. One of the key benefits of this approach is that cells that depend on other cells are automatically updated whenever a dependency changes, ensuring your analysis always reflects the most current data.

### Transformation cell

Add a transformation cell to filter, group, join, or extract data defined in a data source cell.

1. Type `/transformation` and press <kbd>Enter</kbd>, or click on the transform dataset tile at the bottom of the page.
2. Select the data source you want to transform in the source dataset dropdown menu.

After adding the transformation cell, you can add any number of transformation operations inside the cell. Choose an operation from the list of supported transformations:
| Operation | Description |
|-----------|-------------|
| Parse | Enter [grok syntax][2] to extract data into a separate column. In the "from" dropdown menu, select the column the data is getting extracted from. |
| Group | Select what you want to group the data by in the dropdown menus. |
| Join | Select the type of join, the dataset to join against, and the fields to join on. |
| Filter | Add a filter query for the dataset. |
| Calculate | Add a name for the field and the function formula, using the [calculated field formulas][3]. |
| Limit | Enter the number of rows of the dataset you want to display. |
| Sort | Select the sort order and column to sort on. |
| Convert | Allows you to convert a column into a different type. Select the column and the column type to be converted. |

### Analysis cell

You can also transform your data using SQL by adding an analysis cell to your notebook.

1. Type `/sql` or `/analysis` and press <kbd>Enter</kbd>, or click the **SQL Query** tile at the bottom of the page.
2. In the source dataset dropdown, select the data source you want to transform.
3. Write your SQL query. For supported SQL syntax, see the [DDSQL Reference][4].
4. Click **Run** in the top-right corner of the analysis cell to execute your query.

{{< img src="/notebooks/analysis_features/analysis_cell_example.png" alt="Example of an analysis cell with SQL query transforming data in a notebook" style="width:100%;" >}}

## Visualizing transformed data

You can graph the data you've transformed using analysis cells inside a notebook, customizing the visualization with filters, aggregations, and appearance settings.

To graph your data:

1. Type `/graph` and press <kbd>Enter</kbd>, or click the **graph dataset** tile at the bottom of the page.
2. Type or select your desired data source from the drop down menu and press <kbd>Enter</kbd>.
3. Select your visualization type from the graph menu and press <kbd>Enter</kbd>.

## Viewing and exporting data

For any analysis cell that includes a dataset preview, you can view the full 100-row preview by clicking the **View dataset** button.

### Export your query to a dashboard

You can save the results of any analysis cell to a dashboard by clicking **Save to Dashboard** and selecting an existing dashboard, or create a new one. Although this creates a sync between your notebook cell and the exported dashboard graph, changes to the query in your notebook do not automatically update the dashboard.

{{< img src="/notebooks/analysis_features/analysis_cell_save_to_dashboard.png" alt="Example of saving an analysis cell to a dashboard from a notebook" style="width:100%;" >}}

If you update the published cell or any upstream cells, a badge appears in the upper-right corner of the cell indicating **unpublished changes**. After you publish those changes, the updates sync to **all** dashboards where the query is used.

**Note**: By default, the dataset is tied to the global time frame of the **dashboard**, not to the time frame of the notebook. However, you have the ability to set a custom time frame on the dashboard widget.

### Download dataset as a CSV

You can download data from cells for use in external tools or further processing outside of Datadog.

To download your dataset as a CSV file:

1. Navigate to any analysis cell that contains a dataset.
2. Click the download icon in the top-right corner of the cell.
3. Select the number of rows you want to export (up to the maximum available).
4. The CSV file automatically downloads to your computer.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/log_configuration/parsing/
[3]: /logs/explorer/calculated_fields/formulas/
[4]: /ddsql_reference/
[5]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/
