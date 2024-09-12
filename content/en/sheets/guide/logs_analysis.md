---
title: Analyzing Error Logs Using Sheets
further_reading:
- link: "/sheets/"
  tag: "Documentation"
  text: "Learn more about Datadog Sheets"
---

## Overview

Datadog Sheets is a spreadsheet tool that you can populate with Datadog data to perform complex analyses and build reports without requiring technical expertise. 

This guide walks through creating a table of error logs, adding calculated columns to extract specific error details from error messages, using pivot tables to summarize the data and identify patterns, and offers an [example use case](#example-use-case-analyzing-retail-application-error-logs) of this workflow.

## Creating a Table in Sheets

1. Start from a supported product page, such as the Log Explorer.
2. Build the query of data that you want to analyze. For instance, to filter your logs to show only those with `status:error` that contain the word “returns” in the log message:
   ```
   status:error service:shopist-returns-prod returns
   ```
3. Click **Open in Sheets**. 
4. Choose to create a **New Spreadsheet** or add the table to an **Existing Spreadsheet**.
5. Click **Save and Open**.

## Adding Calculated Columns

To gain more insight into your return errors, you might want to extract specific parts of the error messages. You can achieve this by adding calculated columns in Sheets.

1. From the header of the far-right column of your table, click the **Plus** icon to add a calculated column.
2. Use the `REGEXEXTRACT` function to pull out the actual issue with the return. For example, to extract the next word after "Failed" or "Failed to":
   ```plaintext
   =REGEXEXTRACT(#'Message', "Failed (?:to )?(\w+)")
   ```
   This function helps you identify whether the error is in *getting*, *calculating*, or *handling* returns.

## Using Pivot Tables for Analysis

Pivot tables help you summarize and organize large datasets to find patterns and trends.

1. From an existing spreadsheet that already has a table of data, click **Add Pivot Table**.
2. In the **Rows** section, select the dimensions you want to analyze, such as the status of logs.
3. In the **Calculations** section, choose the dimensions for calculations, like sum, average, count, min, and max.

## Example use case: Analyzing retail application error logs

### Problem Statement

You have a retail web application that generates a series of error logs related to "returns." You want to analyze different types of errors causing these issues.

### Example Logs

- `Failed getting returns for the customer!`
- `Failed to calculate returns for the customer!`
- `Failed to handle returns for the customer!`

### Steps to Analyze Error Logs

1. **[Start from the Logs Explorer][1]**:
   - Build a logs query that filters down to Error logs from your retail application with the words “returns” in the log message.
        ```
        status:error service:shopist-returns-prod returns
        ```
        {{< img src="/sheets/guide/logs_analysis/error_logs_returns.png" alt="Logs Explorer showing the query for Erros Logs from example retail application that contain the word returns in the log message" style="width:80%;" >}}

   - Click **Open in Sheets** to create a new table to analyze these logs.
        {{< img src="/sheets/guide/logs_analysis/open_in_sheets.png" alt="Modal to add a title to your new spreadsheet from Logs, for example: Returns error analysis" style="width:80%;" >}}

2. **Extract Specific Error Data**:
   - Add a calculated column in Sheets to pull out the specific issue with the return using the `REGEXEXTRACT` function:
     ```
     =REGEXEXTRACT(#'Message', "Failed (?:to )?(\w+)")
     ```

3. **Analyze Error Types**:
   - Create a pivot table to count the number of errors per error type (getting, calculating, handling).
   - Summarize the data to understand the distribution and total impact of each error type.
        {{< img src="/sheets/guide/logs_analysis/calculated_column_pivot_table.mp4" alt="Video walkthrough of the steps to analyze error logs" video=true >}}

By following these steps, you can effectively analyze your error logs, identify patterns, and gain insights into the underlying issues causing errors in your retail application. Apply this example to your use case to gain a deeper understanding of your logs and make data-driven decisions.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs