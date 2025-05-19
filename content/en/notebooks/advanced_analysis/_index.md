---
title: Analysis Features
further_reading:
- link: "/notebooks"
  tag: "Documentation"
  text: "Learn more about Notebooks"
---
{{< callout url="#" header="Join the Preview!">}} 
  Advanced Analysis is in Preview
{{< /callout >}}

## Overview

The analysis feature within Notebooks lets your perform advanced analysis on your Datadog data. You can join multiple datasets together, chain queries and transform your data using predefined transformations or SQL, while still providing all the powerful features Notesbooks offer.

Notebooks are collaborative text editors that let you embed Datadog graphs directly into your documents. While this is great for exploration and storytelling, investigations may require more advanced control over data queries. Use analysis features to run queries that help you:

* Chain queries such as aggregating already aggregated data or joining two set of aggregating data  
* Join data across multiple log sources and other datasets  
* Perform advanced parsing, extract data and add calculated fields at query time  
* Visualize transformed datasets with graphs

## Adding data to your notebook

To run complex queries in a notebook, you first need to add a **Data Source** cell. There are two ways to do this: 

**From a notebook**:
1. Type `/datasource` and press <kbd>Enter</kbd>, or click the **Data Source** tile at the bottom of the page.  
2. Type or select your desired data source from the drop down menu and press <kbd>Enter</kbd>.  
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
- In the preview, click on a row to open the detail side panel. Click the attribute you want to add as a column and from the pop up option, select Add "@your_column" to your "@your_datasource" dataset.

<!-- {{< img src="#" alt="Opened detail side panel with the option to add an attribute column to the data source cell" style="width:100%;" >}} -->

## Transforming and analyzing data

You can add various cell types to enhance your analysis capabilities. These cells allow you to include additional data sources such as reference tables, RUM, or spans. Use SQL to join data, and transform, correlate, and visualize your data effectively. One of the key benefits of this approach is that cells that depend on other cells are automatically updated whenever a dependency changes, ensuring your analysis always reflects the most current data.

### Transformation cell

Add a transformation cell to filter, group, or join, or extract data defined in a data source cell.

1. Type `/transformation` and press <kbd>Enter</kbd> or click on the transform dataset tile at the bottom of the page.   
2. Select the data source you want to transform in the source dataset dropdown menu.

After adding the transformation cell, you can add any number of transformation operations inside the cell. Choose an operation from the list of supported transformations:
| Operation | Description |
|-----------|-------------|
| Parse | Enter [grok syntax][2] to extract data into a separate column. In the "from" dropdown menu, select the column the data is getting extracted from. |
| Group | Select what you want to group the data by in the dropdown menus. |
| Join | Select the type of join, the dataset to join against, and the fields to join on. |
| Filter | Add a filter query for the dataset. |
| Calculate | Add a name for the field and the function formula, using the [calculated field expression language][3]. |
| Limit | Enter the number of rows of the dataset you want to display. |
| Sort | Select the sort order and column to sort on. |
| Convert | Lets you convert a column into a different type. Select the column and the column type to be converted. |

### Analysis cell

You can also transform your data using SQL by adding an analysis cell to your notebook.

1. Type `/sql` or `/analysis` and press <kbd>Enter</kbd> or click the **SQL Query** tile at the bottom of the page.   
2. In the source dataset dropdown, select the data source you want to transform.  
3. Write your SQL query. For supported SQL syntax, see the [DDSQL Reference][4].  
4. Click **Run** in the top-right corner of the analysis cell to execute your query.

## Viewing and exporting data

For any computational cell that includes a dataset preview, you can view the full 100-row preview by clicking the **View dataset** button.

You can save the results of any computational cell to a Dashboard by clicking **Save to Dashboard** and selecting an existing dashboard or creating a new one. Although this creates a sync between your notebook cell and the exported dashboard graph, changes to the query in your notebook do not automatically update the dashboard. 

If you update the published cell or any upstream cells, a badge appears in the upper-right corner of the cell indicating **unpublished changes**. After you publish those changes, the updates sync to **all** dashboards where the query is used.

**Note**: By default, the dataset is tied to the global timeframe of the **dashboard** not to the timeframe of the notebook. However, you have the ability to set a custom timeframe on the dashboard widget.

### Download dataset as a CSV

You can download the data produced by your queries in CSV format for use outside of Datadog. On any computational cell, click the download icon and choose the number of rows to export. 

## Visualizing transformed data

You can graph the data you've transformed using computational cells inside a notebook, customizing the visualization with filters, aggregations, and appearance settings.

To graph your data:

1. Type `/graph` and press <kbd>Enter</kbd> or click the **graph dataset** tile at the bottom of the page.  
2. Type or select your desired data source from the drop down menu and press <kbd>Enter</kbd>.  
3. Select your visualization type from the graph menu and press <kbd>Enter</kbd>.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/log_configuration/parsing/
[3]: /logs/explorer/calculated_fields/expression_language/
[4]: /ddsql_reference/
