---
title: SQL Reference
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Overview

SQL in [Analysis cells][1] allows you to analyze and manipulate data within Log Workspaces. This documentation covers the SQL support available in Log Workspaces and includes:
- [Syntax compatible with PostgreSQL](#syntax)
- [SQL functions](#functions)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Example workspace cell with SQL syntax" style="width:100%;" >}}

## Syntax

The following SQL syntax is supported:

| Syntax        | Description                                                                                  | Example                                                                                                  |
|---------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `SELECT (DISTINCT)`<br>DISTINCT: Optional | Retrieves rows from a database, with `DISTINCT` filtering out duplicate records.       | {{< code-block lang="sql" >}}SELECT DISTINCT customer_id 
FROM orders {{< /code-block >}} |
| `JOIN`        | Combines rows from two or more tables based on a related column between them.                | {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name 
FROM orders 
JOIN customers 
ON orders.customer_id = customers.customer_id {{< /code-block >}} |
| `GROUP BY`    | Groups rows that have the same values in specified columns into summary rows.                | {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity) 
FROM sales 
GROUP BY product_id {{< /code-block >}} |
| `WHERE`<br>Includes support for `LIKE` filters on strings for pattern matching.  | Filters records that meet a specified condition.                                             | {{< code-block lang="sql" >}}SELECT * 
FROM employees 
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}} |
| `CASE`        | Provides conditional logic to return different values based on specified conditions.         | {{< code-block lang="sql" >}}SELECT order_id, 
  CASE 
    WHEN quantity > 10 THEN 'Bulk Order' 
    ELSE 'Standard Order' 
  END AS order_type 
FROM orders {{< /code-block >}} |
| `WINDOW` | Performs performs a calculation across a set of table rows that are somehow related to the current row.                 | {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}} |
| Arithmetic Operations | Performs basic calculations using operators like `+`, `-`, `*`, `/`.                 | {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost 
FROM products {{< /code-block >}} |

## Functions

The following SQL functions are supported:

| Function               | Return Type                     | Description                                                             |
|------------------------|---------------------------------|-------------------------------------------------------------------------|
| `min(variable v)`      | typeof v                      | Returns the smallest value in a set of data.                              |
| `max(variable v)`      | typeof v                      | Returns the maximum value across all input values.                        |
| `count(any a)`         | numeric                       | Returns the number of input values that are not null.                     |
| `sum(numeric n)`       | numeric                       | Returns the summation across all input values.                            |
| `avg(numeric n)`       | numeric                       | Returns the average value (arithmetic mean) across all input values.      |
| `ceil(numeric n)`      | numeric                       | Returns the value rounded up to the nearest integer.                      |
| `floor(numeric n)`     | numeric                       | Returns the value rounded down to the nearest integer.                    |
| `round(numeric n)`     | numeric                       | Returns the value rounded to the nearest integer.                         |
| `lower(string s)`      | string                        | Returns the string as lowercase.                                          |
| `upper(string s)`      | string                        | Returns the string as uppercase.                                          |
| `abs(numeric n)`       | numeric                       | Returns the absolute value.                                               |
| `coalesce(args a)`     | typeof first non-null a OR null | Returns the first non-null value or null if all are null.               |
| `cast(value AS type)`  | type                          | Converts the given value to the specified data type.                      |
| `length(string s)`      | integer                       | Returns the number of characters in the string.                           |
| `INTERVAL value unit`  | interval                      | Represents a time duration specified in a given unit.                     |


{{% collapse-content title="Examples" level="h3" %}}

### `MIN`
{{< code-block lang="sql" >}}
SELECT MIN(response_time) AS min_response_time 
FROM logs 
WHERE status_code = 200 
{{< /code-block >}} 

### `MAX`
{{< code-block lang="sql" >}}
SELECT MAX(response_time) AS max_response_time 
FROM logs 
WHERE status_code = 200 
{{< /code-block >}} 

### `COUNT`      
{{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests 
FROM logs 
WHERE status_code = 200 {{< /code-block >}} 

### `SUM`        
{{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes 
FROM logs 
GROUP BY service_name 
{{< /code-block >}} 

### `AVG`        
{{< code-block lang="sql" >}}SELECT AVG(response_time) 
AS avg_response_time 
FROM logs 
WHERE status_code = 200 
GROUP BY service_name 
{{< /code-block >}} 

### `CEIL`
{{< code-block lang="sql" >}} 
SELECT CEIL(price) AS rounded_price 
FROM products 
{{< /code-block >}}

### `FLOOR`      
{{< code-block lang="sql" >}}
SELECT FLOOR(price) AS floored_price 
FROM products 
{{< /code-block >}} 

### `ROUND`      
{{< code-block lang="sql" >}}
SELECT ROUND(price) AS rounded_price 
FROM products 
{{< /code-block >}} 

### `LOWER`   
{{< code-block lang="sql" >}}
SELECT LOWER(customer_name) AS lowercase_name 
FROM customers 
{{< /code-block >}} 

### `UPPER`  
{{< code-block lang="sql" >}}
SELECT UPPER(customer_name) AS uppercase_name 
FROM customers 
{{< /code-block >}} 

### `ABS`        
{{< code-block lang="sql" >}}
SELECT ABS(balance) AS absolute_balance 
FROM accounts 
{{< /code-block >}} 

### `COALESCE`  
{{< code-block lang="sql" >}}
SELECT COALESCE(phone_number, email) AS contact_info 
FROM users 
{{< /code-block >}} 

### `CAST`  
{{< code-block lang="sql" >}}
SELECT
  CAST(order_id AS VARCHAR) AS order_id_string,
  'Order-' || CAST(order_id AS VARCHAR) AS order_label
FROM
  orders
{{< /code-block >}} 

### `LENGTH`  
{{< code-block lang="sql" >}}
SELECT
  customer_name,
  LENGTH(customer_name) AS name_length
FROM
  customers
{{< /code-block >}} 

### `INTERVAL`  
{{< code-block lang="sql" >}}
SELECT
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date
{{< /code-block >}} 

{{% /collapse-content %}} 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/workspaces/#analysis-cell