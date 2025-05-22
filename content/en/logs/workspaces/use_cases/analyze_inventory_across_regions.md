---
title: Analyze Retail Inventory Across Regions
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Overview

This guide demonstrates how to use Log Workspaces to analyze retail inventory across regions, focusing on identifying products with low stock and high sales. By joining inventory, sales, and location data, retailers can make informed decisions about restocking priorities and regional distribution.

**Key benefits include**: preventing stockouts, optimizing regional inventory, correlating sales data, forecasting demand, improving supply chain efficiency, and protecting revenue.

## Setting up your data sources

The following examples demonstrate how to create a workspace with sample data sources for retail inventory analysis. For instructions on workspace creation, see [Log Workspaces][1].

### 1. Inventory data source

In this example, configure a logs query to filter for an inventory service, including stock levels, product IDs, and threshold levels for each store location.

{{< img src="/logs/workspace/use_cases/analyze_inventory_across_regions/retail_inventory_data_source.png" alt="Data source configuration for inventory logs showing stock levels and threshold filters" caption="Data source cell for inventory tracking, showing current stock levels and threshold configurations across store locations." style="width:100%;" >}}

### 2. Sales data source

In this example, add a data source cell for sales transactions, including product IDs, quantities sold, and store location identifiers.

{{< img src="/logs/workspace/use_cases/analyze_inventory_across_regions/retail_sales_data_source.png" alt="Data source configuration for sales transaction logs with product and quantity information" caption="Data source cell for sales transactions, showing product details and quantities sold at different store locations." style="width:100%;" >}}

### 3. Regional store information

For regional analysis, add store metadata including region, size, and other attributes by creating a [Reference Table][2].

{{< img src="/logs/workspace/use_cases/analyze_inventory_across_regions/retail_region_data_source.png" alt="Data source configuration for store location data with regional information" caption="Data source cell for store location metadata, providing regional context for inventory and sales analysis." style="width:100%;" >}}

## SQL analysis with Log Workspaces

After configuring your data sources, create Analysis cells to run SQL queries that combine and analyze your data. For more information about creating and using Analysis cells with SQL, see [Log Workspaces - Analysis cell][4].

### 1. Identifying products with low stock and high sales

Create an Analysis cell with the following SQL query to join inventory and sales logs, identifying products that need immediate attention:

```sql
SELECT
 inventory_product_id,
 inventory_store_id,
 inventory_stock_level,
 inventory_threshold_level,
 sales_quantity_sold
FROM
 inventory_data AS inventory
JOIN
 sales_data AS sales
 ON inventory_product_id = sales_product_id
 AND inventory_store_id = sales_store_id
WHERE
 inventory_stock_level < inventory_threshold_level
 AND sales_quantity_sold > 30;
```

{{< img src="/logs/workspace/use_cases/analyze_inventory_across_regions/retail_analysis_cell.png" alt="SQL analysis results showing products with low stock levels and high sales quantities" caption="Analysis cell results identifying products that need restocking based on low inventory and high sales volume." style="width:100%;" >}}

{{% collapse-content title="Query breakdown" level="h4" expanded=false %}}
This query joins inventory and sales data to identify products that need attention:

- **SELECT fields**: Retrieves product IDs, store IDs, current stock levels, threshold levels, and recent sales quantities
- **JOIN condition**: Matches inventory and sales records by product ID and store ID
- **WHERE clause**: Filters for products where:
  - Current stock is below the defined threshold level (indicating potential stockout)
  - Recent sales exceed 30 units (indicating high demand)
{{% /collapse-content %}}

### 2. Analyzing inventory by geographic region

Reference Tables allow you to enrich your log data with regional context. Create another Analysis cell with this query:

```sql
SELECT
  lsa.inventory_product_id,
  location.store_country,
  sum(lsa.sales_quantity_sold)
FROM
  low_stock_analysis AS lsa
JOIN
  store_location_data AS location
  ON inventory_store_id = location.store_id
GROUP BY lsa.inventory_product_id, location.store_country
```

{{< img src="/logs/workspace/use_cases/analyze_inventory_across_regions/retail_location_analysis_cell.png" alt="SQL query joining inventory data with store location reference table to analyze sales by geographic region" style="width:100%;" >}}

{{% collapse-content title="Query breakdown" level="h4" expanded=false %}}
This query:
- Joins the previous analysis results with location data
- Groups sales by product and country
- Calculates total quantity sold in each region
- Helps identify which regions have the highest demand for specific low-stock products
{{% /collapse-content %}}

## Visualizing the data

Create visualization cells to transform your analysis into intuitive charts that highlight regional inventory patterns. For more information, see [Log Workspaces - Visualization cell][3].

{{< img src="/logs/workspace/use_cases/analyze_inventory_across_regions/retail_visualization.png" alt="Visualization of retail inventory data showing product stock levels by region" style="width:100%;" >}}

These visualizations can be added to a centralized dashboard to make insights accessible to all stakeholders, improving coordination between purchasing, logistics, and sales teams.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/workspaces/
[2]: /reference_tables/
[3]: /logs/workspaces/#visualization-cell
[4]: /logs/workspaces/#analysis-cell