---
title: Sheets
further_reading:
- link: "/sheets/functions_operators"
  tag: "Documentation"
  text: "Functions and Operators"
---

{{< callout url="https://www.datadoghq.com/private-beta/datadog-sheets/" btn_hidden="false" header="Join the Beta!">}}
Sheets is available in <strong>private beta</strong>. To qualify for this product beta, you should have existing use cases where you currently use spreadsheets (such as Excel or Google Sheets) with Datadog’s metrics, logs, or RUM data. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

## Overview

Sheets is a spreadsheet tool that you can populate with Datadog data, enabling you to perform complex analysis and build reports without requiring technical expertise. It allows teams to use familiar spreadsheet functions like lookups, pivot tables, and calculations on Datadog data, so you don’t have to export and use another tool with stale data. 

Sheets lets you manipulate, transform, and analyze data from logs, real user monitoring, and cloud cost monitoring in a familiar spreadsheet interface. 

## Create a table

Start by creating a table of data, either by building a new query from Sheets or transferring a query from the logs explorer, RUM explorer or metrics explorer.

### Add a new table in Sheets

{{< img src="/sheets/create_table.png" alt="Modal to create to create a table from Sheets, showing a Logs query with status:error" style="width:90%;" >}}

1. On the [Datadog Sheets page][1], click **New Spreadsheet**.
1. Click **Add Data**.
1. Start building your query by selecting your Data source, and adding filtering parameters.
1. Select the columns you want to display and preview the resulting table.
1. Click **Create Table**.

### Transfer your query to a spreadsheet

1. On the page of a supported product (such as the [Log Explorer][2]), build the query of data you want to analyze, such as filtering your Logs view to those that have `status:error`.
1. Click **Open in Sheets**. For a list of product pages you can create a table from, see the [Supported data sources](#supported-data-sources) section.
1. You can create a **New Spreadsheet** or add this table of data to an **Existing Spreadsheet**.
1. Click **Save and Open**.

## Calculated columns

You can use a calculated column to add a formula, parse a log message, or add business logic to your data. Your calculated columns can be used in the pivot table you’ll create later.

From the header of the far right column of your table, click the Plus icon to **Add calculated column**. Enter a function to view the syntax and description of the function. For a full list of supported functions, see the [Functions and Operators][3] documentation.

{{< img src="/sheets/calculated_columns.png" alt="Added calculated column with the Plus icon, and an example IFS function" style="width:90%;" >}}

## Lookup

Lookup enriches your existing data and adds more context to your table. Click **Add Lookup** at the top of the page to add columns from another table or data source, such as [Reference Tables][4]. Lookup is like a left join or a vlookup in Excel or Google Sheets; it matches records on a common column, and returns additional columns of data to enrich your existing Sheets table.

{{< img src="/sheets/lookup.png" alt="Example Lookup which adds a user's team metadata sourced from a reference table" style="width:90%;" >}}

For example, you have a table of RUM data with user emails, and you want to know which teams these users belong to. You can add a lookup that compares the user email column in your table with the work email column in a Reference Table. Lookup pulls the team from the Reference Table and adds it as a new column to your spreadsheet.

## Pivot table

After you add a table of data to a spreadsheet, analyze and add context to your raw data with a Pivot table. Use pivot tables to summarize and organize large amounts of data into customized tables. It helps you analyze data to find patterns and trends, and see comparisons. For example, you can have a table of error logs with a hundred rows, but with a pivot table you can break down that data into a summary table that counts your error logs by method or region. To create a pivot table:
1. From an existing spreadsheet that already has a table of data, click **Add Pivot Table**.
1. In the **Rows** section, select the dimensions you want to analyze, such as the status of logs.
1. In the **Calculations** section, select the dimensions you want to use in calculations, including sum, average, count, min, and max.

## Supported data sources

Create tables and analyze the data pulled from the following data sources:

| Data Source          | Product page       |
| -------------------- | -----------        | 
| Logs                 | [Logs Explorer][2] |
| Real User Monitoring | [RUM Explorer][5]  |
| Cloud Cost           | [Metrics Explorer][6] </br> <strong>Note</strong>: The Cloud Cost data sources must be selected. |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /sheets/functions_operators
[4]: https://docs.datadoghq.com/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/rum/sessions
[6]: https://app.datadoghq.com/metric/explorer
