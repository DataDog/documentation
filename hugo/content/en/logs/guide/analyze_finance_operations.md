---
title: Analyze Financial Operations Using Payments and Transactions Data
aliases:
- /logs/workspaces/use_cases/analyze_finance_operations
further_reading:
- link: "/notebooks/advanced_analysis/"
  tag: "Documentation"
  text: "Learn more about Notebooks Analysis features"
---

## Overview

Notebooks Analysis features is a powerful tool for analyzing and monitoring financial transactions and system performance. This feature enables you to use SQL queries and visualizations to gain valuable insights into your operations and make data-driven decisions to improve performance and efficiency.

## Benefits

Using Notebooks Analysis features in the finance industry offers several benefits:

* **Real-time monitoring**: Track financial transactions and system performance in real time
* **Issue identification**: Quickly identify and diagnose technical and business-related issues
* **Performance analysis**: Analyze trends and patterns to optimize processes
* **Reporting and auditing**: Generate reports for compliance and auditing purposes

This guide demonstrates how to use Notebooks Analysis features with an example focusing on credit card details and bill payment processing.

## Understanding the data

The example in this guide focuses on two key functions within the finance industry:

* **Credit Card Details:** Processing and managing credit card transactions.
* **Bill Payment:** Processing bill payments.

For each function, the following metrics are tracked:

* **Total Count:** The total number of requests
* **Success:** The number of successful requests
* **Business Failed:** The number of requests that failed due to business-related issues
* **Technical Failed:** The number of requests that failed due to technical issues
* **TechFail %:** The percentage of technical failures

## Bringing in your data source and building your queries

Create a notebook and add a data source. In this example, credit cards and bill payments each have three data source cells, each filtering to the logs that are relevant to the analysis. For more information, see [Notebooks Analysis features][1].

{{< img src="/logs/guide/log_analysis_use_cases/finance/finance_credit_card_data_source.png" alt="Data source configuration for credit card transaction logs showing filters and query parameters" caption="Data source cells for credit card transaction monitoring, showing query filters and parameters to isolate relevant financial log data."style="width:100%;" >}}

{{< img src="/logs/guide/log_analysis_use_cases/finance/finance_billpay_datasource.png" alt="Data source configuration for bill payment logs with relevant filters and query settings" caption="Data source cells for bill payment monitoring, showing query filters and parameters to isolate relevant financial log data."style="width:100%;" >}}

With the data from your credit card and bill payment data sources, you can create an Analysis cell using SQL to calculate and compare key metrics for both processes. This analysis helps you track success rates, identify failure patterns, and monitor performance trends.

{{< img src="/logs/guide/log_analysis_use_cases/finance/sql_query_analysis_0.png" alt="SQL query Analysis cell showing metrics for credit card and bill payment transactions including success rates and failure percentages" caption="SQL query Analysis cell displaying key metrics for credit card and bill payment transactions, highlighting success rates and failure percentages for financial monitoring"  style="width:100%;" >}}

## SQL query analysis

### Query purpose and structure

This query uses a UNION to combine key metrics for two financial processes (Credit Card Details and Bill Payment) into a single comparative view, making it easier to analyze performance across both functions.

{{< code-block lang="sql" filename="Complete SQL query" collapsible="true" >}}

(
    SELECT 'CreditCard Details' AS "Function",
        (totalcount - businesscount - techcount) AS "Success",
        businesscount AS "Business Failed",
        techcount AS "Technical Failed",
        totalcount AS "Total",
        (100 * techcount / totalcount) AS "TechFail %"
    FROM (
            SELECT COUNT(DISTINCT creditcards_totalrequest.requestId) as totalcount,
                COUNT(DISTINCT creditcards_technicalunsuccessful.requestId) AS techcount,
                COUNT(DISTINCT creditcards_businessunsuccessful.requestId) AS businesscount
            FROM creditcards_totalrequest
                FULL JOIN creditcards_technicalunsuccessful ON creditcards_totalrequest.requestId = creditcards_technicalunsuccessful.requestId
                FULL JOIN creditcards_businessunsuccessful ON creditcards_totalrequest.requestId = creditcards_businessunsuccessful.requestId
        )
)
UNION
(
    SELECT 'Bill Payment' AS "Function",
        successcount AS "Success",
        businesscount AS "Business Failed",
        (totalcount - successcount - businesscount) AS "Technical Failed",
        totalcount AS "Total",
        (100 * (totalcount - successcount - businesscount) / totalcount) AS "TechFail %"
    FROM (
            SELECT COUNT(DISTINCT bill_totalrequest.requestId) as totalcount,
                COUNT(DISTINCT bill_successfulrequest.requestId) AS successcount,
                COUNT(DISTINCT bill_businessunsuccessfulrequest.requestId) AS businesscount
            FROM bill_totalrequest
                FULL JOIN bill_successfulrequest ON bill_totalrequest.requestId = bill_successfulrequest.requestId
                FULL JOIN bill_businessunsuccessfulrequest ON bill_totalrequest.requestId = bill_businessunsuccessfulrequest.requestId
        )
)
ORDER BY Total DESC
{{< /code-block >}}

{{% collapse-content title="Query breakdown" level="h4" expanded=false %}}


{{< code-block lang="sql" filename="Part 1: Credit Card Details" collapsible="true" >}}
SELECT 'CreditCard Details' AS "Function",
    (totalcount - businesscount - techcount) AS "Success",
    businesscount AS "Business Failed",
    techcount AS "Technical Failed",
    totalcount AS "Total",
    (100 * techcount / totalcount) AS "TechFail %"
FROM (
        SELECT COUNT(DISTINCT creditcards_totalrequest.requestId) as totalcount,
            COUNT(DISTINCT creditcards_technicalunsuccessful.requestId) AS techcount,
            COUNT(DISTINCT creditcards_businessunsuccessful.requestId) AS businesscount
        FROM creditcards_totalrequest
            FULL JOIN creditcards_technicalunsuccessful ON creditcards_totalrequest.requestId = creditcards_technicalunsuccessful.requestId
            FULL JOIN creditcards_businessunsuccessful ON creditcards_totalrequest.requestId = creditcards_businessunsuccessful.requestId
    )
{{< /code-block >}}

The SQL for Credit Card Details calculates metrics for credit card processing by:
* Counting total requests from the `creditcards_totalrequest` data source
* Counting technical failures from the `creditcards_technicalunsuccessful` data source
* Counting business failures from the `creditcards_businessunsuccessful` data source
* Calculating successful requests by subtracting failures from total
* Computing the percentage of technical failures

{{< code-block lang="sql" filename="Part 2: Bill Payment" collapsible="true" >}}
SELECT 'Bill Payment' AS "Function",
    successcount AS "Success",
    businesscount AS "Business Failed",
    (totalcount - successcount - businesscount) AS "Technical Failed",
    totalcount AS "Total",
    (100 * (totalcount - successcount - businesscount) / totalcount) AS "TechFail %"
FROM (
        SELECT COUNT(DISTINCT bill_totalrequest.requestId) as totalcount,
            COUNT(DISTINCT bill_successfulrequest.requestId) AS successcount,
            COUNT(DISTINCT bill_businessunsuccessfulrequest.requestId) AS businesscount
        FROM bill_totalrequest
            FULL JOIN bill_successfulrequest ON bill_totalrequest.requestId = bill_successfulrequest.requestId
            FULL JOIN bill_businessunsuccessfulrequest ON bill_totalrequest.requestId = bill_businessunsuccessfulrequest.requestId
    )
{{< /code-block >}}

The SQL for Bill Payment calculates metrics for bill payment processing by:
* Counting total requests from the `bill_totalrequest` data source
* Counting successful requests from the `bill_successfulrequest` data source
* Counting business failures from the `bill_businessunsuccessfulrequest` data source
* Calculating technical failures by subtracting successful and business failures from total
* Computing the percentage of technical failures


{{% /collapse-content %}}

### Query output

The query from the Analysis cell populates a table, allowing for easy comparison of each function's performance. By analyzing this data, you can identify areas for improvement, such as reducing technical failures or resolving business process issues.

The following is a sample of what you might see from running the SQL analysis:

| Function | Success | Business Failed | Technical Failed | Total | TechFail % |
|----------|---------|-----------------|------------------|-------|------------|
| Bill Payment | 1 | 0 | 0 | 2 | 0 |
| CreditCard Details | 0 | 1 | 1 | 2 | 50 |


## Visualizing the data

Finally, paint a clear picture by visualizing your data. Notebooks Analysis features offers several visualization options, including:

* Tables
* Toplists
* Timeseries
* Treemaps
* Pie charts
* Scatterplots

Filter your datasets by status, environment, and other variables to focus on specific aspects of your data. Financial institutions gain valuable insights through these visualizations. Use them to identify trends in transaction processing, troubleshoot issues across payment systems, make data-driven decisions to improve system reliability, and enhance customer experience by reducing technical failures.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/advanced_analysis/