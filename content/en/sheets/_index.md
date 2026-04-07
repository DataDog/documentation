---
title: Sheets
description: "Analyze Datadog data in a familiar spreadsheet interface with tables, pivot tables, lookups, calculated columns, and flexible spreadsheets."
further_reading:
- link: "/sheets/functions_operators"
  tag: "Documentation"
  text: "Functions and Operators"
- link: "https://www.datadoghq.com/blog/advanced-analysis-tools/"
  tag: "Blog"
  text: "Explore your data with Sheets, DDSQL Editor, and Notebooks for advanced analysis in Datadog"
- link: "https://www.datadoghq.com/blog/javascript-css-optimization"
  tag: "Blog"
  text: "How to optimize JavaScript code with CSS"
---

## Overview

Sheets is a spreadsheet tool that you can populate with Datadog data, enabling you to perform complex analysis and build reports without requiring technical expertise. It allows teams to use familiar spreadsheet functions like lookups, pivot tables, and calculations on Datadog data, so you don't have to export and use another tool with stale data.

Sheets lets you manipulate, transform, and analyze data from logs, real user monitoring, and cloud cost monitoring in a familiar spreadsheet interface. It can contain the following tabs:

- **[Table](#table)**: Query live data from a Datadog data source and enrich it with calculated columns, lookups, and filters.
- **[Pivot](#pivot)**: Summarize and aggregate data from a table with custom dimensions and calculations.
- **[Sheet](#sheet-preview)** (Preview): A flexible, blank-canvas spreadsheet where you can write formulas referencing data directly from a table to build models, reports, or track operations.

## Table

Start by creating a table of data, either by building a new query from Sheets or transferring a query from explorer pages, such as Logs, RUM, Metrics, or Cloud Cost.

### Add a new table in Sheets

{{< img src="/sheets/create_table.png" alt="Modal to create a table from Sheets, showing a Logs query with status:error." style="width:90%;" >}}

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

### Calculated columns

You can use a calculated column to add a formula, parse a log message, extract regex, or add business logic to your data. Your calculated columns can be used in the pivot table you'll create later.

From the header of the far right column of your table, click the Plus icon to **Add calculated column**. Enter a function to view the syntax and description of the function. For a full list of supported functions, see the [Functions and Operators][3] documentation.

{{< img src="/sheets/calculated_columns.png" alt="Added calculated column with the Plus icon, and an example IFS function" style="width:90%;" >}}

### Lookup

Lookup enriches your existing data and adds more context to your table. Click **Add Lookup** at the top of the page to add columns from another table or data source, such as [Reference Tables][4], logs, or RUM data. Lookup is like a left join or a vlookup in Excel or Google Sheets; it matches records on a common column, and returns additional columns of data to enrich your existing Sheets table.

{{< img src="/sheets/lookup.png" alt="Example Lookup which adds a user's team metadata sourced from a reference table" style="width:90%;" >}}

For example, you have a table of RUM data with user emails, and you want to know which teams these users belong to. You can add a lookup that compares the user email column in your table with the work email column in a Reference Table. Lookup pulls the team from the Reference Table and adds it as a new column to your spreadsheet.

## Pivot

After you add a table of data to a spreadsheet, analyze and add context to your raw data with a pivot table. Use pivot tables to summarize and organize large amounts of data into customized tables. It helps you analyze data to find patterns and trends, and see comparisons. For example, you can have a table with a hundred rows, but with a pivot table you can break down that data into a summary table that counts your data by method or region. To create a pivot table:
1. From an existing spreadsheet that already has a table of data, click **Add Pivot Table**.
1. In the **Rows** and **Columns** section, select the dimensions you want to analyze, such as the status of logs.
1. In the **Calculations** section, select the dimensions you want to use in calculations, including sum, average, count, min, and max.

{{< img src="/sheets/example_pivot_table.png" alt="Example pivot table configuration panel" style="width:90%;" >}}

### Visualizations

After you have your pivot table, you can click **Show Graphs** and add up to six widgets to graph your data. Supported widget types include **Top List**, **Treemap**, and **Pie Chart** widgets. Hover over the widget title to delete, duplicate, expand, export, and reposition widgets. To edit a widget, click the pencil icon. Editing options allow you to select the widget type, choose which pivot calculation to graph (if there is more than one), and specify the rows, columns, and the number of groupings graphed per row or column.

## Sheet (Preview)

{{< callout url="https://www.datadoghq.com/product-preview/flexible-spreadsheets-in-datadog-sheets/">}}
Create flexible spreadsheets: built to let you start from scratch, build models, track operations, and more.
{{< /callout >}}

A sheet is a flexible, blank-canvas spreadsheet with a full formula engine. Use it to build financial models, operational trackers, planning templates, or any freeform calculation that doesn't fit a query-based workflow.

To add a sheet, click the **+** tab at the bottom of your spreadsheet and select **Add Sheet**.

{{< img src="/sheets/flexible_spreadsheet.png" alt="A flexible sheet showing a 2025 cloud spend by provider model, with SUMIFS and VLOOKUP formulas referencing Cloud cost and Currency conversion table tabs" style="width:90%;" >}}

### Cell references

Cells are referenced using standard A1 notation, where the column is a letter and the row is a number. For example, `A1` is the first cell, `B3` is the third row of column B, and `A1:C5` is a range spanning columns A through C and rows 1 through 5.

| Reference type | Syntax | Description |
| -------------- | ------ | ----------- |
| Relative cell | `A1` | Adjusts when the formula is copied to another cell |
| Absolute cell | `$A$1` | Always refers to the same cell |
| Absolute column, relative row | `$A1` | Column stays fixed; row adjusts |
| Relative column, absolute row | `A$1` | Row stays fixed; column adjusts |
| Range | `A1:C5` | All cells from A1 to C5 |

### Cross-sheet references

You can reference data from other tabs in the same spreadsheet directly in your formulas. Use the sheet name followed by an exclamation mark and the cell or range:

```
='My Table'!A1
='Summary'!B2:B20
```

To reference a specific column from a **table** tab by name, use `#` notation:

```
='Error Logs'#"duration_ms"
='Table 1'#"status"
```

For example, `=SUM('Error Logs'#"duration_ms")` sums every value in the `duration_ms` column of your Error Logs table.

### Formulas

Sheet formulas support all functions listed on the [Functions and Operators][3] page, plus additional lookup, statistical, financial, and other functions available only in sheets. See the [Sheet functions][21] section for the full list.

#### Examples

**Aggregate a table column in a sheet**

Sum all values in the `duration_ms` column of a table tab called "Error Logs":
```
=SUM('Error Logs'#"duration_ms")
```

Count how many rows in that table have `status = "error"`:
```
=COUNTIF('Error Logs'#"status","error")
```

**Safe lookup with a fallback**

Look up a user's team from a reference table, returning "unknown" if not found:
```
=IFNA(VLOOKUP(A2,'User Directory'!A:B,2,0),"unknown")
```

**Days since an incident**

Calculate how long ago an incident was opened, given a timestamp in A2:
```
=DATEDIF(A2,TODAY(),"D")&" days ago"
```

**p95 latency from a table**

Pull the 95th percentile of response times from a connected table:
```
=PERCENTILE('APM Data'#"duration",0.95)
```

**Classify a value into severity tiers**

```
=IFS(A2>500,"critical",A2>200,"warn",A2>0,"ok",TRUE,"no data")
```

**Monthly loan payment**

Calculate the monthly payment on a $50,000 loan at 6% annual interest over 3 years:
```
=PMT(0.06/12,36,-50000)
```

### Error values

| <span style="min-width:80px;display:block">Error</span> | Cause | How to handle |
| -------------------- | ----- | ------------- |
| `#DIV/0!` | Division by zero | `=IFERROR(A1/B1,0)` |
| `#VALUE!` | Wrong argument type; for example, text passed to a math function | Check input types |
| `#NUM!` | Invalid numeric value; for example, `SQRT(-1)` | Validate inputs with `IF` |
| `#N/A` | Value not found; for example, a failed `VLOOKUP` | `=IFNA(VLOOKUP(...),"not found")` |
| `#REF!` | Reference to a cell that no longer exists | Update the formula |
| `#NAME?` | Unrecognized function name | Check spelling |
| `#ERROR!` | Formula could not be parsed | Check syntax |

### Cell formatting

Cells can be formatted as plain text, number, percentage, currency (USD or EUR), or datetime. Formatting affects how values are displayed but not the underlying value used in calculations.

### Limits

Sheets have the following limits on numbers of rows and columns:

| Dimension | Default | Maximum |
| --------- | ------- | ------- |
| Rows | 1,000 | 2,000 |
| Columns | 26 | 52 |

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
| Infrastructure       | [Host List][6] |
| LLM Observability    | [LLM Observability][13] |
| Logs                 | [Logs Explorer][2] |
| Metrics              | [Metrics Explorer][7] |
| Product Analytics    | [Product Analytics Events][20] |
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
[6]: https://app.datadoghq.com/infrastructure/
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
[20]: https://app.datadoghq.com/product-analytics/events
[21]: /sheets/functions_operators#functions
