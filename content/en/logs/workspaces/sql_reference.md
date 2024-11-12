---
title: SQL Reference
further_reading:
- link: "/logs/workspaces/"
  tag: "Documentation"
  text: "Learn more about Log Workspaces"
---

## Overview

SQL in Analysis cells allows you to analyze and manipulate data within Log Workspaces. This documentation covers the SQL support available in Log Workspaces and includes:
- [Syntax compatible with PostgreSQL](#syntax)
- [SQL functions](#functions)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Example workspace cell with SQL syntax" style="width:100%;" >}}

## Syntax

* `SELECT (DISTINCT)`  
* `JOIN`  
* `GROUP BY`  
* `WHERE` (including support for `LIKE` filters on strings)  
* `CASE`   
* Basic (standard) arithmetic operations (such as `+`,`-`, `*`, `/`)

## Functions

The following SQL functions are supported:

| Function    | Description                                                              |  Example                                                                                                  |
|-------------|--------------------------------------------------------------------------|----------------|
| `MIN(numerical column)`       | Returns the smallest value in a set of data.                             | {{< code-block lang="sql" >}}SELECT MIN(response_time) AS min_response_time 
FROM logs 
WHERE status_code = 200 {{< /code-block >}} |
| `MAX(numerical column)`       | Returns the maximum value across all input values.                       |  {{< code-block lang="sql" >}}SELECT MAX(response_time) AS max_response_time 
FROM logs 
WHERE status_code = 200 {{< /code-block >}} |
| `COUNT(any column)`     | Returns the number of input values that are not null.                    |  {{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests 
FROM logs 
WHERE status_code = 200 {{< /code-block >}} |
| `SUM(numerical column)`       | Returns the summation across all input values.                           | {{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes 
FROM logs 
GROUP BY service_name {{< /code-block >}} |
| `AVG(numerical column)`       | Returns the average value (arithmetic mean) across all input values.     | {{< code-block lang="sql" >}}SELECT AVG(response_time) 
AS avg_response_time 
FROM logs 
WHERE status_code = 200 
GROUP BY service_name {{< /code-block >}} |
| `CEIL`/`CEILING(numerical column)` | Returns the value rounded up to the nearest integer.                   | {{< code-block lang="sql" >}} ELECT CEIL(price) AS rounded_price 
FROM products {{< /code-block >}} |
| `FLOOR(numerical column)`     | Returns the value rounded down to the nearest integer.                   | {{< code-block lang="sql" >}}SELECT FLOOR(price) AS floored_price 
FROM products {{< /code-block >}} |
| `ROUND(numerical column)`     | Returns the value rounded to the nearest integer.                        | {{< code-block lang="sql" >}}SELECT ROUND(price) AS rounded_price 
FROM products {{< /code-block >}} |
| `LOWER(string column)`     | Returns the string as lower case.                                        | {{< code-block lang="sql" >}}SELECT LOWER(customer_name) AS lowercase_name 
FROM customers {{< /code-block >}} |
| `UPPER(string column)`     | Returns the string as uppercase.                                         | {{< code-block lang="sql" >}}SELECT UPPER(customer_name) AS uppercase_name 
FROM customers {{< /code-block >}} |
| `ABS(numerical column)`       | Returns the absolute value.                                             | {{< code-block lang="sql" >}}SELECT ABS(balance) AS absolute_balance 
FROM accounts {{< /code-block >}} |
| `COALESCE(multiple columns)`  | Returns the first non-null value.                                        | {{< code-block lang="sql" >}}SELECT COALESCE(phone_number, email) AS contact_info 
FROM users {{< /code-block >}} |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}