---
title: Analyze E-Commerce Operations Using Payment and Customer Feedback Data
aliases:
- /logs/workspaces/use_cases/analyze_ecommerce_ops
further_reading:
- link: "/notebooks/advanced_analysis/"
  tag: "Documentation"
  text: "Learn more about Notebooks Analysis features"
---

## Overview

Notebooks Analysis features enables e-commerce businesses to gain valuable insights into their online stores by analyzing transaction data, customer behavior, and system performance. This guide shows how to use Notebooks Analysis features to monitor your e-commerce platform, detect issues, and optimize the shopping experience.

## Benefits

Using Notebooks Analysis features for e-commerce monitoring offers several advantages:

* **Real-time transaction visibility**: Track sales, cart abandonment, and checkout processes as they happen
* **Customer experience insights**: Identify pain points in the customer journey
* **Revenue impact analysis**: Quantify the financial impact of technical issues
* **Performance optimization**: Pinpoint and address bottlenecks affecting conversion rates

This guide demonstrates how to use Notebooks Analysis features with an example focusing on payment failures and customer ratings.

## Understanding the data
Follow this example to understand how to correlate **payment processing errors** from your `web-store` service with **negative customer ratings and reviews** from the `shopist-customer-feedback` service. It also demonstrates how to quantify the **revenue impact** of bad ratings caused by failed payment experiences.

The example focuses on two critical aspects of e-commerce operations:

* **Payment Processing**: Logs from the payment gateway indicating successful and failed transactions
* **Customer Feedback**: Ratings and reviews submitted after purchase attempts

## Bringing in your data source and building your queries

Create a notebook and add data sources for payment transactions and customer feedback. For more information, see [Notebooks Analysis features][1].

### 1. Customer feedback with bad ratings

This data source cell contains customer feedback logs with negative ratings collected by the ratings service, focusing on customers who reported issues.

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/customer_feedback_bad_ratings.png" alt="Data source configuration for customer feedback logs showing negative ratings filter" caption="Data source cell for customer feedback, filtering to show only negative ratings to identify problematic experiences." style="width:100%;" >}}

### 2. Webstore payment errors

This data source cell shows payment error logs from the e-commerce platform, including the merchant ID and cart value to help identify high-impact failures.

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/webstore_payment_errs.png" alt="Data source configuration for payment error logs with cart value and merchant information" caption="Data source cell for payment errors, showing transaction details including cart value and merchant information." style="width:100%;" >}}

## SQL query analysis

### Query purpose and structure

This query correlates payment errors with customer feedback, categorizing transactions by value to understand the relationship between technical issues, customer satisfaction, and revenue impact.

{{< code-block lang="sql" filename="Complete SQL query" collapsible="true" >}}
SELECT
    wpe.timestamp,
    wpe.Merchant,
    wpe.cart_value,
    wpe.display_id,
    CASE
        WHEN wpe.cart_value > 50 THEN 'high value'
        ELSE 'low value'
    END AS tier
FROM
    webstore_payment_errs wpe
JOIN
    customer_feedback_bad_ratings cfbr ON wpe.display_id = cfbr.display_id
WHERE
    cfbr.status = 'info'
ORDER BY
    cart_value DESC
{{< /code-block >}}

{{% collapse-content title="Query breakdown" level="h4" expanded=false %}}

This SQL query performs several important functions:

1. **Data correlation**: Joins payment error logs with customer feedback logs using the `display_id` to connect the same transaction
2. **Value segmentation**: Categorizes transactions as "high value" (>$50) or "low value" to prioritize issues
3. **Merchant identification**: Includes the merchant information to identify patterns by seller
4. **Chronological tracking**: Timestamps help identify when issues occurred
5. **Prioritization**: Orders results by cart value to highlight highest revenue impact first

The query focuses on payment errors that also received bad ratings, providing a view of technical issues that directly affected customer satisfaction.
{{% /collapse-content %}}

### Query output

The query from the Analysis cell populates a table showing payment errors that resulted in negative customer feedback, categorized by value tier. By analyzing this data, you can prioritize fixes based on revenue impact and improve both technical reliability and customer satisfaction.

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/analysis_join_bad_ratings_with_payment_errors.png" alt="SQL query results showing payment errors with associated customer feedback, merchant information, and value categorization" caption="Analysis results showing correlated payment errors and customer feedback, with transactions categorized by value tier for prioritization." style="width:100%;" >}}

## Visualize the data

Notebooks Analysis features provides powerful visualization capabilities to transform your e-commerce data into actionable insights:

* **Time series charts**: Track payment errors and bad ratings over time to identify patterns or spikes
* **Merchant performance comparisons**: Compare success rates across different sellers on your platform
* **Value tier distribution**: Visualize the proportion of issues affecting high vs. low value transactions
* **Geo-distribution maps**: See where payment issues are occurring geographically

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/visualization_most_bad_ratings.png" alt="Visualization of e-commerce data showing payment errors by merchant and value tier" caption="Treemap graph showing the distribution of payment errors by merchant and value tier, highlighting which sellers have the most high-value transaction issues." style="width:100%;" >}}

## Advanced analysis on SQL queries

Reference tables in Notebooks Analysis features allow you to import additional contextual data to enrich your analysis. For e-commerce operations, reference tables can provide critical business context that isn't available in your logs alone.

In this example, we'll use a reference table containing merchant details to enhance our payment error analysis:

### 1. Create a reference table
Upload a CSV file with merchant information or query it from another data source.
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/merch_details.png" alt="Reference table showing merchant details including merchant ID, name, contact information, and tier status for e-commerce analysis" style="width:100%;" >}}

### 2. Join with log data
Use the merchant ID as the common key to connect log data with merchant details. In the example, analysis combines payment error logs with merchant reference data to provide business context for troubleshooting.
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/combined_salesforce.png" alt="SQL query joining log data with merchant reference table to provide business context for payment errors"  style="width:100%;" >}}

### 3. Calculated field queries
Add business context like merchant tier, contract details, or support contacts. The following [Calculated Field][2] query computes the sum of lost revenue from failed transactions, grouped by merchant tier to identify high-impact segments:
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/sum_lost_revenue.png" alt="SQL query calculating total lost revenue from failed transactions by merchant tier" style="width:100%;" >}}

### 4. Visualize the results
Create charts to visualize the lost revenue by merchant tier for clearer business impact assessment. The following pie chart displays the distribution of lost revenue across different merchant tiers, highlighting which segments contribute most to revenue loss and require immediate attention. This graph makes it easier for stakeholders to quickly identify which merchant categories are experiencing the highest financial impact from failed transactions.
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/visualize_total_loss_revenue.png" alt="Visualization of total lost revenue from failed transactions by merchant tier" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/advanced_analysis/
[2]: /notebooks/advanced_analysis/#calculated-fields-queries