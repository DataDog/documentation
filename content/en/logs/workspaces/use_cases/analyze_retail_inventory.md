---
title: Analyze Login Attempts for e-PHI
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Use case


Use Log Workspaces to perform a detailed analysis of products with low stock and high recent sales various different regions or countries. This guide walks you through the steps to:
- Join inventory, sales, and location data in a workspace
- Filter for products with low stock and high demand
- Visualize sales of each of these products by country

This process helps retailers prioritize restocking in geographic regions where demand is high, ensuring products in high demand remain available to customers.

## Setup

This guide assumes that you are:
- Already submitting logs to Datadog for a similar use case.
- Able to [create a workspace][1] and add cells. 

### 1. Bring in your data source

To get started, bring in the logs from the service(s) you want to analyze.
1. [Create a new Workspace][1].
1. Select **Logs Query** as your data source.

### 2. Query for inventory and sales data

To search for inventory data, set up your logs query to filter for your specific service, index, or attributes that contain this data.

{{< img src="/logs/workspace/use_cases/analyze_retail_inventory/query_inventory_sales_data.png" alt="Example workspace query to find logs from service:product-inventory" style="width:100%;" >}}

You can add any additional filters, facets, or attributes to narrow your search based on your requirements and what is available in your logs.

Add a **Data source** cell, and search for your sales data in the same manner.


### 3. Join inventory and sales data

Analyze products with low stock and recent high sales by joining inventory and sales logs with an Analysis cell using SQL.

1. Add an [Analysis cell][3] to your workspace.
1. Create a SQL query to join the inventory and sales data to identify products with low stock and recently high sales.
1. Run this SQL query.
    ```sql
    SELECT 
      inventory.product_id,
      inventory.store_id,
      inventory.stock_level,
      inventory.threshold_level,
      sales.quantity_sold,
    FROM
      inventory_data AS inventory
    JOIN
      sales_data AS sales
      ON inventory.product_id = sales.product_id
      AND inventory.store_id = sales.store_id
    WHERE 
      inventory.stock_level < inventory.threshold_level
      AND sales.quantity_sold > 30;
    ```
    {{< img src="/logs/workspace/use_cases/analyze_retail_inventory/join_inventory_sales_data.png" alt="SQL query to join the inventory and sales data to identify products with low stock and recently high sales" style="width:100%;" >}}

This analysis helps identify products with limited availability despite recent sales, indicating potential need for restocking. Additionaly, you can reveal other patterns, such as products with unexpected spikes in sales.

### 4. Analyze by location

You can further analyze your product sales by location. After identifying products with low stock and high recent sales, determine the countries where these products are most popular or experience the highest sales. 

Achieve this by joining your inventory and sales data with a [Reference Table][5] that includes store location information. Use the store ID to assess in which locations specific products are most popular.
1. **Add a Data Source Cell**: Select the Reference Table.
2. **Select the Reference Table**: Ensure you choose the correct table containing store location information.
  {{< img src="/logs/workspace/use_cases/analyze_retail_inventory/analyze_by_location.png" alt="Data source cell with the Reference table selected in Data source dropdown field" style="width:100%;" >}}
3. Write a SQL query to join the inventory and sales data, identifying products with low stock and recent high sales.
  ```sql
  SELECT
    lsa.product_id,
    location.store_country,
    sum(lsa.quantity_sold)
  FROM
    low_stock_analysis AS lsa
  JOIN
    store_location_data AS location
    ON lsa.store_id = location.store_id
  GROUP BY lsa.product_id, location.store_country
  ```

For each product, we are summing the total quantity sold in each country and grouping them in a way that will allow us to visualize by product, what were the quantities sold in each country. 

### 5. Visualize product sales by country

Create a visualization to display product sales distribution by country. 
1. Add a [Visualization cell][4].
1. Select your location analysis as the source dataset.
1. Select **Pie Chart** from the "Visualize as" dropdown.
1. Group by product and country to view total quantities sold for each product across different regions.
  {{< img src="/logs/workspace/use_cases/analyze_retail_inventory/visualize_product_sales_by_country.png" alt="Group by product and country to see total quantities sold for each product across different regions" style="width:100%;" >}}
  {{< img src="/logs/workspace/use_cases/analyze_retail_inventory/visualize_pie_chart.png" alt="Pie chart of example inventory product by country" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/workspaces/#create-a-workspace-and-add-a-data-source
[2]: /logs/workspaces/
[3]: /logs/workspaces/#analysis-cell
[4]: /logs/workspaces/#visualization-cell
[5]: /integrations/guide/reference-tables/