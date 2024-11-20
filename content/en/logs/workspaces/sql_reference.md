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
| Arithmetic Operations | Performs basic calculations using operators like `+`, `-`, `*`, `/`.                 | {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost 
FROM products {{< /code-block >}} |

## Functions

The following SQL functions are supported:

| Function    | Description                                                                            |  Example                                                                                                  |
|-------------|----------------------------------------------------------------------------------------|----------------|
| `MIN`       | Returns the smallest value in a set of data.                         | {{< code-block lang="sql" >}}SELECT MIN(response_time) AS min_response_time 
FROM logs 
WHERE status_code = 200 {{< /code-block >}} |
| `MAX`       | Returns the maximum value across all input values.                   | {{< code-block lang="sql" >}}SELECT MAX(response_time) AS max_response_time 
FROM logs 
WHERE status_code = 200 {{< /code-block >}} |
| `COUNT`     | Returns the number of input values that are not null.                      | {{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests 
FROM logs 
WHERE status_code = 200 {{< /code-block >}} |
| `SUM`       | Returns the summation across all input values.                       | {{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes 
FROM logs 
GROUP BY service_name {{< /code-block >}} |
| `AVG`       | Returns the average value (arithmetic mean) across all input values. | {{< code-block lang="sql" >}}SELECT AVG(response_time) 
AS avg_response_time 
FROM logs 
WHERE status_code = 200 
GROUP BY service_name {{< /code-block >}} |
| `CEIL`/`CEILING(numerical column)` | Returns the value rounded up to the nearest integer.            | {{< code-block lang="sql" >}} SELECT CEIL(price) AS rounded_price 
FROM products {{< /code-block >}} |
| `FLOOR`     | Returns the value rounded down to the nearest integer.               | {{< code-block lang="sql" >}}SELECT FLOOR(price) AS floored_price 
FROM products {{< /code-block >}} |
| `ROUND`     | Returns the value rounded to the nearest integer.                    | {{< code-block lang="sql" >}}SELECT ROUND(price) AS rounded_price 
FROM products {{< /code-block >}} |
| `LOWER`     | Returns the string as lower case.                                       | {{< code-block lang="sql" >}}SELECT LOWER(customer_name) AS lowercase_name 
FROM customers {{< /code-block >}} |
| `UPPER`     | Returns the string as uppercase.                                        | {{< code-block lang="sql" >}}SELECT UPPER(customer_name) AS uppercase_name 
FROM customers {{< /code-block >}} |
| `ABS`       | Returns the absolute value.                                          | {{< code-block lang="sql" >}}SELECT ABS(balance) AS absolute_balance 
FROM accounts {{< /code-block >}} |
| `COALESCE`  | Returns the first non-null value.                                    | {{< code-block lang="sql" >}}SELECT COALESCE(phone_number, email) AS contact_info 
FROM users {{< /code-block >}} |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/workspaces/#analysis-cell