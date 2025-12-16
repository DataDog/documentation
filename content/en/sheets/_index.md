---
title: Sheets
description: "Analyze Datadog data in a familiar spreadsheet interface with pivot tables, lookups, calculated columns, and complex analysis tools."
further_reading:
- link: "/sheets/functions_operators"
  tag: "Documentation"
  text: "Functions and Operators"
- link: "https://www.datadoghq.com/blog/advanced-analysis-tools/"
  tag: "Blog"
  text: "Explore your data with Sheets, DDSQL Editor, and Notebooks for advanced analysis in Datadog"
---

{{< callout url="https://www.datadoghq.com/product-preview/flexible-spreadsheets-in-datadog-sheets/">}}
Create flexible spreadsheets: built to let you start from scratch, build models, track operations, and more.
{{< /callout >}}

## Overview

Sheets is a spreadsheet tool that you can populate with Datadog data, enabling you to perform complex analysis and build reports without requiring technical expertise. It allows teams to use familiar spreadsheet functions like lookups, pivot tables, and calculations on Datadog data, so you don't have to export and use another tool with stale data.

Sheets lets you manipulate, transform, and analyze data from logs, real user monitoring, and cloud cost monitoring in a familiar spreadsheet interface.

## Create a table

Start by creating a table of data, either by building a new query from Sheets or transferring a query from the logs explorer, RUM explorer or metrics explorer.

### Add a new table in Sheets

{{< img src="/sheets/create_table.png" alt="Modal to create to create a table from Sheets, showing a Logs query with status:error" style="width:90%;" >}}

1. On the [Datadog Sheets page][1], click **New Spreadsheet**.
1. Click **Add Data**.<br/>
**Note**: if there is a data source you want that is not available, request it [here][19].
1. Start building your query by selecting your Data source, and adding filtering parameters.
1. Select the columns you want to display and preview the resulting table.
1. Click **Create Table**.

### Transfer your query to a spreadsheet

1. On the page of a supported product (such as the [Log Explorer][2]), build the query of data you want to analyze, such as filtering your Logs view to those that have `status:error`.
1. Click **Open in Sheets**. For a list of product pages you can create a table from, see the [Supported data sources](#supported-data-sources) section.
1. You can create a **New Spreadsheet** or add this table of data to an **Existing Spreadsheet**.
1. Click **Save and Open**.

## Calculated columns

You can use a calculated column to add a formula, parse a log message, extract regex, or add business logic to your data. Your calculated columns can be used in the pivot table you'll create later.

From the header of the far right column of your table, click the Plus icon to **Add calculated column**. Enter a function to view the syntax and description of the function. For a full list of supported functions, see the [Functions and Operators][3] documentation.

{{< img src="/sheets/calculated_columns.png" alt="Added calculated column with the Plus icon, and an example IFS function" style="width:90%;" >}}

## Lookup

Lookup enriches your existing data and adds more context to your table. Click **Add Lookup** at the top of the page to add columns from another table or data source, such as [Reference Tables][4], logs, or RUM data. Lookup is like a left join or a vlookup in Excel or Google Sheets; it matches records on a common column, and returns additional columns of data to enrich your existing Sheets table.

{{< img src="/sheets/lookup.png" alt="Example Lookup which adds a user's team metadata sourced from a reference table" style="width:90%;" >}}

For example, you have a table of RUM data with user emails, and you want to know which teams these users belong to. You can add a lookup that compares the user email column in your table with the work email column in a Reference Table. Lookup pulls the team from the Reference Table and adds it as a new column to your spreadsheet.

## Pivot table

After you add a table of data to a spreadsheet, analyze and add context to your raw data with a Pivot table. Use pivot tables to summarize and organize large amounts of data into customized tables. It helps you analyze data to find patterns and trends, and see comparisons. For example, you can have a table with a hundred rows, but with a pivot table you can break down that data into a summary table that counts your data by method or region. To create a pivot table:
1. From an existing spreadsheet that already has a table of data, click **Add Pivot Table**.
1. In the **Rows** and **Columns** section, select the dimensions you want to analyze, such as the status of logs.
1. In the **Calculations** section, select the dimensions you want to use in calculations, including sum, average, count, min, and max.

{{< img src="/sheets/example_pivot_table.png" alt="Example pivot table configuration panel" style="width:90%;" >}}

### Visualizations

After you have your pivot table, you can click **Show Graphs** and add up to six widgets to graph your data. Supported widget types include **Top List**, **Treemap**, and **Pie Chart** widgets. Hover over the widget title to delete, duplicate, expand, export, and reposition widgets. To edit a widget, click the pencil icon. Editing options allow you to select the widget type, choose which pivot calculation to graph (if there is more than one), and specify the rows, columns, and the number of groupings graphed per row or column.

## Supported data sources

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Advanced Data Sources">}}
If you want to query data sources not yet available, use this form to submit your request.
{{< /callout >}}

Create tables and analyze the data pulled from the following data sources:

| Data Source          | Product page       |
| -------------------- | -----------        |
| APM Spans            | [APM Explorer][18] |
| Audit Trail          | [Audit Trail][15] |
| CI Pipelines         | [CI Visibility][17] |
| Cloud Cost           | [Cloud Cost Analytics][5] |
| Database Queries     | [Database Monitoring][16] |
| Events               | [Event Management][14] |
| Infrastructure       | [DDSQL Editor][6] |
| LLM Observability    | [LLM Observability][13] |
| Logs                 | [Logs Explorer][2] |
| Metrics              | [Metrics Explorer][7] |
| Real User Monitoring | [RUM Explorer][8]  |
| Reference Tables     | [Reference Tables][9] |
| Security Findings    | [Cloud Security][12] |
| Security Signals     | [Security][11] |

## Configuring a spreadsheet

### Permissions

By default, all users have full access to spreadsheets.

Use granular access controls to limit the [roles][10] that may edit a particular spreadsheet:
1. While viewing a spreadsheet, click on the cog in the upper right. The settings menu opens.
1. Select **Permissions**.
1. Click **Restrict Access**. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown to select one or more roles, teams, or users that may edit the spreadsheet.
2. Click **Add**. The dialog box updates to show that the role you selected has the **Editor** permission.
1. Click **Save**.

**Note:** To maintain your edit access to the spreadsheet, you must include at least one role that you are a member of before saving.

You must have edit access to restore general access to a restricted spreadsheet. Complete the following steps:
1. While viewing the spreadsheet, click on the cog in the upper right. The settings menu opens.
1. Select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /sheets/functions_operators
[4]: https://docs.datadoghq.com/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/cost
[6]: https://app.datadoghq.com/ddsql/editor
[7]: https://app.datadoghq.com/metric/explorer
[8]: https://app.datadoghq.com/rum/sessions
[9]: https://app.datadoghq.com/reference-tables
[10]: /account_management/rbac/
[11]: https://app.datadoghq.com/security
[12]: https://app.datadoghq.com/security/compliance
[13]: https://app.datadoghq.com/llm/applications
[14]: https://app.datadoghq.com/event/explorer
[15]: https://app.datadoghq.com/audit-trail
[16]: https://app.datadoghq.com/databases/queries
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/apm/traces
[19]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/
