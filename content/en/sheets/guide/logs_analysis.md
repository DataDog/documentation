---
title: Analyze Error Logs Using Sheets
description: "Extract error details from log messages using calculated columns and pivot tables to identify patterns in retail application return errors."
further_reading:
- link: "/sheets/"
  tag: "Documentation"
  text: "Learn more about Datadog Sheets"
- link: "/sheets/functions_operators/"
  tag: "Documentation"
  text: "Sheets Functions and Operators"
---

## Overview

Datadog Sheets is a spreadsheet tool that you can populate with Datadog data to perform complex analyses and build reports without requiring technical expertise. 

This guide walks through creating a table of error logs, adding calculated columns to extract specific error details from error messages, and using pivot tables to summarize the data and identify patterns. It also offers an [example use case](#example-use-case-analyzing-retail-application-error-logs) of this workflow.

## Creating a table in Sheets

1. Start from a supported product page, such as the Log Explorer.
2. Build the query of data that you want to analyze. For instance, to filter your logs to show only those with `status:error` that contain the word "returns" in the log message:
   ```
   status:error service:shopist-returns-prod returns
   ```
   {{< img src="/sheets/guide/logs_analysis/log_explorer_open_in_sheets.png" alt="Log Explorer showing a query for Error logs from an example retail application that contain 'returns' in the log message" style="width:100%;" >}}
3. Click **Open in Sheets**. 
4. Choose to create a **New Spreadsheet** or add the table to an **Existing Spreadsheet**.
5. Click **Save and Open**.

## Adding calculated columns

To gain more insight into your return errors, you might want to extract specific parts of the error messages. You can achieve this by adding calculated columns in Sheets.

1. From the header of the far-right column of your table, click the **Plus** icon to add a calculated column.
2. Use the `REGEXEXTRACT` function to pull out the actual issue with the return. For example, to extract the next word after "Failed" or "Failed to":
   ```plaintext
   =REGEXEXTRACT(#Message, "Failed (?:to )?(\w+)")
   ```
   This function helps you identify whether the error is in *getting*, *calculating*, or *handling* returns.

## Using pivot tables for analysis

Pivot tables help you summarize and organize large datasets to find patterns and trends.

1. From an existing spreadsheet that already has a table of data, click **Add Pivot Table**.
2. In the **Rows** section, select the dimensions you want to analyze, such as the status of logs.
3. In the **Calculations** section, choose the dimensions for calculations, like sum, average, count, min, and max.

## Example use case: Analyzing retail application error logs

You have a retail web application that generates a series of error logs related to `returns`. You want to analyze what types of errors are causing these issues. Follow these steps to analyze your error logs, identify patterns, and gain insights into the underlying issues causing errors in your retail application. Apply this example to your logs to gain a deeper understanding of your logs and make data-driven decisions.

### Example logs

- `Failed getting returns for the customer!`
- `Failed to calculate returns for the customer!`
- `Failed to handle returns for the customer!`

### Analyze error logs

1. From the [Logs Explorer][1], build a logs query that filters down to Error logs from your retail application with `returns` in the log message. For example:
      ```
      status:error service:shopist-returns-prod returns
      ```
      {{< img src="/sheets/guide/logs_analysis/error_logs_returns.png" alt="Logs Explorer showing a query for Error logs from an example retail application that contain 'returns' in the log message" style="width:100%;" >}}
1. Click **Open in Sheets** to create a new table to analyze these logs.
      {{< img src="/sheets/guide/logs_analysis/open_in_sheets.png" alt="Modal to add a title to your new spreadsheet from Logs, such as 'Returns error analysis'" style="width:100%;" >}}

### Extract specific error data
Add a calculated column in Sheets to pull out the specific issue with the return using the `REGEXEXTRACT` function:
     ```
     =REGEXEXTRACT(#'Message', "Failed (?:to )?(\w+)")
     ```

### Analyze error types
1. Create a pivot table to count the number of errors per error type (`getting`, `calculating`, and `handling`).
1. Summarize the data to understand the distribution and total impact of each error type.
      {{< img src="/sheets/guide/logs_analysis/calculated_column_pivot_table.mp4" alt="Video walkthrough of the steps to analyze error logs" video=true >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
